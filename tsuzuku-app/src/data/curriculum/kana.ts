// ============================================================
// TSUZUKU — Kana Database (Hiragana & Katakana)
// ============================================================

export interface KanaItem {
  id: string;
  character: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  exampleWord: string;
  exampleReading: string;
  exampleMeaning: string;
}

export const KANA_DATABASE: Record<string, KanaItem> = {
  // Hiragana Vowels
  'kana-a': { id: 'kana-a', character: 'あ', romaji: 'a', type: 'hiragana', exampleWord: 'あい', exampleReading: 'ai', exampleMeaning: 'Love' },
  'kana-i': { id: 'kana-i', character: 'い', romaji: 'i', type: 'hiragana', exampleWord: 'いえ', exampleReading: 'ie', exampleMeaning: 'House' },
  'kana-u': { id: 'kana-u', character: 'う', romaji: 'u', type: 'hiragana', exampleWord: 'うえ', exampleReading: 'ue', exampleMeaning: 'Above / Up' },
  'kana-e': { id: 'kana-e', character: 'え', romaji: 'e', type: 'hiragana', exampleWord: 'え', exampleReading: 'e', exampleMeaning: 'Picture / Painting' },
  'kana-o': { id: 'kana-o', character: 'お', romaji: 'o', type: 'hiragana', exampleWord: 'あお', exampleReading: 'ao', exampleMeaning: 'Blue' },

  // K-Row
  'kana-ka': { id: 'kana-ka', character: 'か', romaji: 'ka', type: 'hiragana', exampleWord: 'かさ', exampleReading: 'kasa', exampleMeaning: 'Umbrella' },
  'kana-ki': { id: 'kana-ki', character: 'き', romaji: 'ki', type: 'hiragana', exampleWord: 'き', exampleReading: 'ki', exampleMeaning: 'Tree' },
  'kana-ku': { id: 'kana-ku', character: 'く', romaji: 'ku', type: 'hiragana', exampleWord: 'くるま', exampleReading: 'kuruma', exampleMeaning: 'Car' },
  'kana-ke': { id: 'kana-ke', character: 'け', romaji: 'ke', type: 'hiragana', exampleWord: 'けさ', exampleReading: 'kesa', exampleMeaning: 'This morning' },
  'kana-ko': { id: 'kana-ko', character: 'こ', romaji: 'ko', type: 'hiragana', exampleWord: 'こえ', exampleReading: 'koe', exampleMeaning: 'Voice' },

  // S-Row
  'kana-sa': { id: 'kana-sa', character: 'さ', romaji: 'sa', type: 'hiragana', exampleWord: 'さかな', exampleReading: 'sakana', exampleMeaning: 'Fish' },
  'kana-shi': { id: 'kana-shi', character: 'し', romaji: 'shi', type: 'hiragana', exampleWord: 'しろ', exampleReading: 'shiro', exampleMeaning: 'White' },
  'kana-su': { id: 'kana-su', character: 'す', romaji: 'su', type: 'hiragana', exampleWord: 'すし', exampleReading: 'sushi', exampleMeaning: 'Sushi' },
  'kana-se': { id: 'kana-se', character: 'せ', romaji: 'se', type: 'hiragana', exampleWord: 'せかい', exampleReading: 'sekai', exampleMeaning: 'World' },
  'kana-so': { id: 'kana-so', character: 'そ', romaji: 'so', type: 'hiragana', exampleWord: 'そら', exampleReading: 'sora', exampleMeaning: 'Sky' },

  // T-Row
  'kana-ta': { id: 'kana-ta', character: 'た', romaji: 'ta', type: 'hiragana', exampleWord: 'たまご', exampleReading: 'tamago', exampleMeaning: 'Egg' },
  'kana-chi': { id: 'kana-chi', character: 'ち', romaji: 'chi', type: 'hiragana', exampleWord: 'ちず', exampleReading: 'chizu', exampleMeaning: 'Map' },
  'kana-tsu': { id: 'kana-tsu', character: 'つ', romaji: 'tsu', type: 'hiragana', exampleWord: 'つき', exampleReading: 'tsuki', exampleMeaning: 'Moon' },
  'kana-te': { id: 'kana-te', character: 'て', romaji: 'te', type: 'hiragana', exampleWord: 'て', exampleReading: 'te', exampleMeaning: 'Hand' },
  'kana-to': { id: 'kana-to', character: 'と', romaji: 'to', type: 'hiragana', exampleWord: 'とり', exampleReading: 'tori', exampleMeaning: 'Bird' },
};
