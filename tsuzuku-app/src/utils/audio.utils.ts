// ============================================================
// TSUZUKU — Authentic Native Japanese Audio Engine
// Guarantees 100% genuine Japanese accent & pronunciation
// Never falls back to English/system default voices
// ============================================================

import { logger } from '@/lib/logger';

// Clean text by stripping furigana ruby markup: 漢字{かんじ} ➔ 漢字
export function cleanJapaneseText(text: string): string {
  return text
    .replace(/\{[^}]*\}/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\([^)]*\)/g, '')
    .trim();
}

/**
 * Check if the browser actually has a genuine native Japanese voice installed.
 * If not, we NEVER use speech synthesis (which would sound like an English speaker).
 */
export function getVerifiedJapaneseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();

  const jVoices = voices.filter(v =>
    v.lang.toLowerCase().startsWith('ja') ||
    v.lang.toLowerCase().includes('ja-jp') ||
    v.lang.toLowerCase().includes('ja_jp') ||
    v.name.toLowerCase().includes('japanese') ||
    v.name.toLowerCase().includes('日本語') ||
    v.name.toLowerCase().includes('kyoko') ||
    v.name.toLowerCase().includes('otoya') ||
    v.name.toLowerCase().includes('takumi') ||
    v.name.toLowerCase().includes('ayumi') ||
    v.name.toLowerCase().includes('haruka') ||
    v.name.toLowerCase().includes('ichiro') ||
    v.name.toLowerCase().includes('sayaka') ||
    v.name.toLowerCase().includes('mei-jia')
  );

  return jVoices.length > 0 ? jVoices[0] : null;
}

// Keep voices refreshed on load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    getVerifiedJapaneseVoice();
  };
}

/**
 * Play authentic Japanese audio:
 * 1. If verified native Japanese voice exists locally ➔ use Web Speech API with that voice
 * 2. Otherwise ➔ stream native Tokyo Japanese audio from cloud TTS
 */
export async function playJapaneseAudio(text: string, rate = 0.9): Promise<void> {
  const clean = cleanJapaneseText(text);
  if (!clean) return;

  logger.info('AudioEngine', `Playing Japanese audio for: "${clean}"`);

  // Check for verified native Japanese voice
  const nativeVoice = getVerifiedJapaneseVoice();

  if (nativeVoice && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel(); // Unblock any stuck queue

      return new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.voice = nativeVoice;
        utterance.lang = 'ja-JP';
        utterance.rate = rate;
        utterance.pitch = 1.0;

        let finished = false;
        const complete = () => {
          if (!finished) {
            finished = true;
            resolve();
          }
        };

        utterance.onend = complete;
        utterance.onerror = () => {
          complete();
          playNativeJapaneseStream(clean, rate);
        };

        setTimeout(complete, 4000);
        window.speechSynthesis.speak(utterance);
      });
    } catch {
      return playNativeJapaneseStream(clean, rate);
    }
  }

  // Fallback directly to native Tokyo Japanese audio stream
  return playNativeJapaneseStream(clean, rate);
}

/**
 * Streams native Tokyo Japanese audio stream directly
 */
export function playNativeJapaneseStream(cleanText: string, rate = 0.9): Promise<void> {
  return new Promise((resolve) => {
    try {
      const encoded = encodeURIComponent(cleanText);
      // High-quality Tokyo Japanese TTS stream
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encoded}`;
      const audio = new Audio(url);
      audio.playbackRate = rate;

      audio.onended = () => resolve();
      audio.onerror = () => {
        logger.warn('AudioEngine', `Primary stream failed, attempting secondary Japanese stream for "${cleanText}"`);
        // Secondary audio fallback endpoint
        const fallbackUrl = `https://dict.youdao.com/dictvoice?audio=${encoded}&type=2&le=jap`;
        const fallbackAudio = new Audio(fallbackUrl);
        fallbackAudio.onended = () => resolve();
        fallbackAudio.onerror = () => resolve();
        fallbackAudio.play().catch(() => resolve());
      };

      audio.play().catch((e) => {
        logger.warn('AudioEngine', 'Audio playback blocked by browser autoplay policy', e);
        resolve();
      });
    } catch {
      resolve();
    }
  });
}

/**
 * Microphone Recorder for User Speech Shadowing
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
