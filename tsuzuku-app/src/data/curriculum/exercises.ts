// ============================================================
// TSUZUKU — Comprehensive Exercise Database
// Rich interactive exercises with explanations, tokens, and options
// ============================================================

import type { Exercise } from '@/types/curriculum.types';

export const EXERCISES: Record<string, Exercise> = {
  // Kana Vowels exercises
  'ex-kana-a-mc': {
    id: 'ex-kana-a-mc',
    type: 'multiple_choice',
    prompt: 'Which hiragana character represents the sound "a" (ah)?',
    answer: 'あ',
    acceptedAnswers: ['あ'],
    options: ['あ', 'お', 'め', 'ぬ'],
    hints: ['Look for the character with 3 strokes and a loop on the right.'],
    explanation: 'あ is "a". お is "o" (has a separate small dot on top right), め is "me", ぬ is "nu".',
    difficulty: 1,
    targetConceptId: 'kana-a',
    conceptType: 'kana',
  },
  'ex-kana-ai-type': {
    id: 'ex-kana-ai-type',
    type: 'japanese_typing',
    prompt: 'Type the Japanese word for "Love" in Hiragana (romaji: ai):',
    promptJP: 'あい',
    answer: 'あい',
    acceptedAnswers: ['あい', 'ai'],
    hints: ['Spell out the vowel sounds for "a" followed by "i".'],
    explanation: 'あい (ai) means "love". It combines the two vowels あ (a) and い (i).',
    difficulty: 1,
    targetConceptId: 'kana-a',
    conceptType: 'kana',
  },

  // Desu & Question exercises
  'ex-desu-sentence-builder': {
    id: 'ex-desu-sentence-builder',
    type: 'sentence_ordering',
    prompt: 'Build the sentence: "I am a student."',
    promptJP: '私は学生です。',
    answer: '私 は 学生 です 。',
    acceptedAnswers: ['私 は 学生 です 。', '私 は 学生 です'],
    tokens: [
      { id: 't1', text: '私', reading: 'わたし' },
      { id: 't2', text: 'は' },
      { id: 't3', text: '学生', reading: 'がくせい' },
      { id: 't4', text: 'です' },
      { id: 't5', text: '。' },
      { id: 't6', text: 'を', isDistractor: true },
      { id: 't7', text: '先生', reading: 'せんせい', isDistractor: true },
    ],
    hints: ['Start with the topic (私), followed by the topic marker (は), then the noun, ending with です。'],
    explanation: 'Japanese follows Topic (私) + は + Predicate Noun (学生) + Copula (です) + 。',
    difficulty: 1,
    targetConceptId: 'g-desu',
    conceptType: 'grammar',
  },
  'ex-desu-question-mc': {
    id: 'ex-desu-question-mc',
    type: 'multiple_choice',
    prompt: 'How do you ask "Are you a student?" politely in Japanese?',
    answer: '学生ですか？',
    acceptedAnswers: ['学生ですか？', '学生ですか'],
    options: ['学生ですか？', '学生ですね？', '学生でした？', '学生ではない？'],
    hints: ['To form a polite question, simply add the question particle か to です.'] ,
    explanation: 'Appending 〜か to です turns any statement into a polite question (学生ですか？).',
    difficulty: 1,
    targetConceptId: 'p-ka',
    conceptType: 'grammar',
  },

  // Daily Actions exercises
  'ex-taberu-sentence-builder': {
    id: 'ex-taberu-sentence-builder',
    type: 'sentence_ordering',
    prompt: 'Build the sentence: "I eat a meal / rice."',
    promptJP: 'ご飯を食べます。',
    answer: 'ご飯 を 食べます 。',
    acceptedAnswers: ['ご飯 を 食べます 。', 'ご飯 を 食べます'],
    tokens: [
      { id: 't1', text: 'ご飯', reading: 'ごはん' },
      { id: 't2', text: 'を' },
      { id: 't3', text: '食べます', reading: 'たべます' },
      { id: 't4', text: '。' },
      { id: 't5', text: 'が', isDistractor: true },
      { id: 't6', text: '飲みます', reading: 'のみます', isDistractor: true },
    ],
    hints: ['Place the direct object first, then the object marker を, then the action verb 食べます.'] ,
    explanation: 'Object (ご飯) + Object Particle (を) + Verb (食べます) + 。',
    difficulty: 2,
    targetConceptId: 'v-taberu',
    conceptType: 'vocabulary',
  },
  'ex-masu-conjugation-drill': {
    id: 'ex-masu-conjugation-drill',
    type: 'conjugation',
    prompt: 'What is the polite negative form of 飲む (to drink) — "I do not drink"?',
    promptJP: '飲む → ? (polite negative)',
    answer: '飲みません',
    acceptedAnswers: ['飲みません', 'のみません', 'nomimasen'],
    options: ['飲みません', '飲まない', '飲みます', '飲まないです'],
    hints: ['飲む is a Godan verb (む → み), and the polite negative ending is ません.'],
    explanation: '飲む is a Godan verb. Shift む to the い-column (み) and attach ません = 飲みません (I do not drink).',
    difficulty: 2,
    targetConceptId: 'g-masen',
    conceptType: 'grammar',
  },
  'ex-match-verbs-meanings': {
    id: 'ex-match-verbs-meanings',
    type: 'matching',
    prompt: 'Match the Japanese verbs to their English meanings:',
    answer: 'all_matched',
    acceptedAnswers: ['all_matched'],
    pairs: [
      { left: '食べる (たべる)', right: 'to eat' },
      { left: '飲む (のむ)', right: 'to drink' },
      { left: '行く (いく)', right: 'to go' },
      { left: '見る (みる)', right: 'to see / watch' },
    ],
    hints: ['Recall that 食 is related to food/eating, and 飲 has a mouth radical for drinking.'],
    explanation: '食べる (eat), 飲む (drink), 行く (go), 見る (see/watch).',
    difficulty: 2,
    targetConceptId: 'v-taberu',
    conceptType: 'vocabulary',
  },
};

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES[id];
}
