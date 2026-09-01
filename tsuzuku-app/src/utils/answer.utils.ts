// ============================================================
// TSUZUKU — Answer Checking & Normalization Engine
// Handles variations in Japanese answers intelligently
// ============================================================

// ============================================================
// Unicode Normalization
// ============================================================
function normalizeUnicode(str: string): string {
  return str.normalize('NFKC');
}

// ============================================================
// Whitespace normalization
// ============================================================
function normalizeWhitespace(str: string): string {
  return str.replace(/[\s　]+/g, ' ').trim(); // Also removes ideographic spaces
}

// ============================================================
// Strip punctuation for loose matching
// ============================================================
function stripPunctuation(str: string): string {
  return str.replace(/[。、！？\.!?,\s　]/g, '');
}

// ============================================================
// Convert romaji to hiragana (basic mapping)
// Used to accept romaji answers for kana exercises
// ============================================================
const ROMAJI_TO_HIRAGANA: Record<string, string> = {
  'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
  'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
  'sa': 'さ', 'si': 'し', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
  'ta': 'た', 'ti': 'ち', 'chi': 'ち', 'tu': 'つ', 'tsu': 'つ', 'te': 'て', 'to': 'と',
  'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
  'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'hu': 'ふ', 'he': 'へ', 'ho': 'ほ',
  'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
  'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
  'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
  'wa': 'わ', 'wi': 'ゐ', 'we': 'ゑ', 'wo': 'を', 'n': 'ん',
  'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
  'za': 'ざ', 'zi': 'じ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
  'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
  'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
  'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
  'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
  'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
  'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
  'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
  'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
  'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
  'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
  'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
  'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
  'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
  'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ',
};

export function romajiToHiragana(romaji: string): string {
  let result = romaji.toLowerCase();
  // Sort keys by length descending so longer matches take priority
  const keys = Object.keys(ROMAJI_TO_HIRAGANA).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    result = result.replace(new RegExp(key, 'g'), ROMAJI_TO_HIRAGANA[key]);
  }
  return result;
}

// ============================================================
// Check if a string is hiragana/katakana/kanji
// ============================================================
export function isJapanese(str: string): boolean {
  return /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/.test(str);
}

export function isHiragana(str: string): boolean {
  return /^[\u3040-\u309f\s]+$/.test(str);
}

export function isKatakana(str: string): boolean {
  return /^[\u30a0-\u30ff\s]+$/.test(str);
}

// ============================================================
// Convert katakana to hiragana (for loose matching)
// ============================================================
export function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30a1-\u30f6]/g, c =>
    String.fromCharCode(c.charCodeAt(0) - 0x60)
  );
}

// ============================================================
// Main answer checking function
// ============================================================
export interface AnswerCheckResult {
  isCorrect: boolean;
  isCloseEnough: boolean; // Partial credit cases
  normalizedUserAnswer: string;
  normalizedExpected: string;
  feedback?: string;
}

export function checkAnswer(
  userAnswer: string,
  expectedAnswer: string,
  acceptedAnswers: string[] = [],
  options: {
    strict?: boolean;       // Require exact match after normalization
    allowRomaji?: boolean;  // Accept romaji input for kana answers
    ignoreCase?: boolean;   // Case-insensitive for English
    ignoreParticles?: boolean; // For sentence-level answers
  } = {}
): AnswerCheckResult {
  const {
    strict = false,
    allowRomaji = true,
    ignoreCase = true,
  } = options;

  // Normalize user input
  let normalized = normalizeUnicode(normalizeWhitespace(userAnswer));
  const normalizedExpected = normalizeUnicode(normalizeWhitespace(expectedAnswer));

  // Build list of all valid answers
  const validAnswers = [normalizedExpected, ...acceptedAnswers.map(a => normalizeUnicode(a))];

  // Try direct comparison
  const directCheck = (a: string, b: string) => {
    if (ignoreCase) {
      return a.toLowerCase() === b.toLowerCase();
    }
    return a === b;
  };

  // Check direct match
  for (const valid of validAnswers) {
    if (directCheck(normalized, valid)) {
      return {
        isCorrect: true,
        isCloseEnough: true,
        normalizedUserAnswer: normalized,
        normalizedExpected,
      };
    }
  }

  if (!strict) {
    // Try without punctuation
    const strippedUser = stripPunctuation(normalized);
    for (const valid of validAnswers) {
      const strippedValid = stripPunctuation(valid);
      if (directCheck(strippedUser, strippedValid)) {
        return {
          isCorrect: true,
          isCloseEnough: true,
          normalizedUserAnswer: normalized,
          normalizedExpected,
          feedback: 'Correct! (Minor punctuation difference)',
        };
      }
    }

    // Try romaji → hiragana conversion
    if (allowRomaji && !isJapanese(normalized)) {
      const convertedToHiragana = romajiToHiragana(normalized);
      for (const valid of validAnswers) {
        const validHiragana = katakanaToHiragana(valid);
        if (convertedToHiragana === validHiragana || convertedToHiragana === valid) {
          return {
            isCorrect: true,
            isCloseEnough: true,
            normalizedUserAnswer: normalized,
            normalizedExpected,
            feedback: 'Correct! (romaji input accepted)',
          };
        }
      }
    }

    // Try katakana ↔ hiragana interchangeable
    const userAsHiragana = katakanaToHiragana(normalized);
    for (const valid of validAnswers) {
      const validAsHiragana = katakanaToHiragana(valid);
      if (userAsHiragana === validAsHiragana) {
        return {
          isCorrect: true,
          isCloseEnough: true,
          normalizedUserAnswer: normalized,
          normalizedExpected,
        };
      }
    }
  }

  return {
    isCorrect: false,
    isCloseEnough: false,
    normalizedUserAnswer: normalized,
    normalizedExpected,
  };
}

// ============================================================
// Get hint (progressive reveal)
// ============================================================
export function getHint(answer: string, revealCount: number): string {
  const stripped = stripPunctuation(answer);
  const chars = Array.from(stripped); // Handle multi-byte characters
  const revealed = chars.slice(0, revealCount).join('');
  const hidden = chars.slice(revealCount).map(() => '_').join('');
  return revealed + hidden;
}

// ============================================================
// Detect error type from wrong answer
// ============================================================
import type { ErrorType } from '@/types/user.types';

export function detectErrorTypes(
  userAnswer: string,
  correctAnswer: string,
  questionType: string
): ErrorType[] {
  const errors: ErrorType[] = [];

  // Particle errors — check if the answer has wrong particles
  const PARTICLES = ['は', 'が', 'を', 'に', 'で', 'の', 'と', 'も', 'から', 'まで', 'より', 'へ'];
  const userParticles = PARTICLES.filter(p => userAnswer.includes(p));
  const correctParticles = PARTICLES.filter(p => correctAnswer.includes(p));
  if (userParticles.length > 0 || correctParticles.length > 0) {
    const wrongParticle = userParticles.some(p => !correctParticles.includes(p)) ||
                          correctParticles.some(p => !userParticles.includes(p));
    if (wrongParticle) errors.push('wrong_particle');
  }

  // Spelling / close but not exact
  if (userAnswer.length > 0 && !errors.includes('wrong_particle')) {
    if (questionType === 'kanji_writing') errors.push('wrong_kanji');
    else if (isJapanese(correctAnswer)) errors.push('wrong_reading');
    else errors.push('spelling');
  }

  return errors;
}
