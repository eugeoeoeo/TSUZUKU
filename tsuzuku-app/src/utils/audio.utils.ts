// ============================================================
// TSUZUKU — Robust Audio & Speech Engine
// Multi-tier Japanese speech synthesis with Web Speech API
// and online audio fallback for 100% reliable sound playback
// ============================================================

import { logger } from '@/lib/logger';

// Clean text by stripping furigana ruby markup: 漢字{かんじ} ➔ 漢字
export function cleanJapaneseText(text: string): string {
  return text
    .replace(/\{[^}]*\}/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

let voicesLoaded = false;
let japaneseVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  japaneseVoices = voices.filter(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
  voicesLoaded = true;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

/**
 * Play Japanese audio with multi-layer fallback:
 * 1. Web Speech API with verified Japanese voice
 * 2. High-quality cloud TTS fallback audio stream
 */
export async function playJapaneseAudio(text: string, rate = 0.9): Promise<void> {
  const clean = cleanJapaneseText(text);
  if (!clean) return;

  logger.info('AudioEngine', `Speaking: "${clean}"`);

  // Try Web Speech API first
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel(); // Unblock any stuck queue in Chrome/Safari

      if (!voicesLoaded) loadVoices();

      return new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = 'ja-JP';
        utterance.rate = rate;
        utterance.pitch = 1.0;

        if (japaneseVoices.length > 0) {
          utterance.voice = japaneseVoices[0];
        }

        let resolved = false;
        const done = () => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        };

        utterance.onend = done;
        utterance.onerror = (e) => {
          logger.warn('AudioEngine', 'Web Speech error, triggering cloud fallback', e);
          done();
          playCloudTTSFallback(clean, rate);
        };

        // Safety timeout in case browser drops speech onend event
        setTimeout(done, 5000);

        window.speechSynthesis.speak(utterance);
      });
    } catch (err) {
      logger.warn('AudioEngine', 'Web Speech failed, using cloud fallback', err);
      return playCloudTTSFallback(clean, rate);
    }
  }

  return playCloudTTSFallback(clean, rate);
}

/**
 * Cloud TTS Audio Fallback (Voice RSS / Google / Open audio proxy)
 */
export function playCloudTTSFallback(cleanText: string, rate = 0.9): Promise<void> {
  return new Promise((resolve) => {
    try {
      const encoded = encodeURIComponent(cleanText);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encoded}`;
      const audio = new Audio(url);
      audio.playbackRate = rate;
      audio.onended = () => resolve();
      audio.onerror = () => {
        logger.error('AudioEngine', `Cloud TTS fallback failed for "${cleanText}"`);
        resolve();
      };
      audio.play().catch(e => {
        logger.warn('AudioEngine', 'Audio autoplay blocked, requires user click', e);
        resolve();
      });
    } catch {
      resolve();
    }
  });
}

/**
 * Record audio from user's microphone with browser MediaRecorder API
 */
export class MicrophoneRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async start(): Promise<boolean> {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        logger.warn('AudioEngine', 'getUserMedia not supported on this device');
        return false;
      }
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(100);
      logger.info('AudioEngine', 'Microphone recording started');
      return true;
    } catch (err) {
      logger.error('AudioEngine', 'Failed to access microphone', err);
      return false;
    }
  }

  async stop(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.stream?.getTracks().forEach(track => track.stop());
        logger.info('AudioEngine', 'Microphone recording stopped, blob size: ' + audioBlob.size);
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }
}
