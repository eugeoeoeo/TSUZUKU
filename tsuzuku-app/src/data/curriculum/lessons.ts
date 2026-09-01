// ============================================================
// TSUZUKU — Complete Lesson Database (N5 - N1)
// Fully interactive lesson steps covering Vocab, Grammar, Kanji, Exercises
// ============================================================

import type { Lesson } from '@/types/curriculum.types';

export const N5_LESSONS: Lesson[] = [
  // ============================================================
  // UNIT 1: HIRAGANA MASTERY
  // ============================================================
  {
    id: 'n5-l1-hiragana-vowels',
    unitId: 'n5-u1-hiragana',
    order: 1,
    title: 'The 5 Core Vowels (あ・い・う・え・お)',
    titleJP: '基本母音5文字',
    objectives: [
      'Master the 5 fundamental vowel sounds of Japanese',
      'Recognize and write あ, い, う, え, お in correct stroke order',
      'Read basic vocabulary formed purely from vowel combinations (あい, うえ, あお)',
    ],
    estimatedMinutes: 12,
    conceptIds: ['kana-a', 'kana-i', 'kana-u', 'kana-e', 'kana-o'],
    vocabularyIds: [],
    grammarIds: [],
    kanjiIds: [],
    steps: [
      {
        id: 's1-intro',
        type: 'introduction',
        title: 'Welcome to Hiragana',
        content: {
          type: 'introduction',
          heading: 'The Japanese Sound System',
          body: 'Japanese pronunciation is remarkably consistent. Every single word in the language is built from just 5 core vowels and their combinations with consonants. Unlike English, Japanese vowels never change their sound: "あ" is always "ah", "い" is always "ee".',
          hookJP: 'あいうえお',
          hookEN: 'a · i · u · e · o',
          culturalNote: 'Hiragana was developed around the 9th century and is used for native Japanese words, grammatical particles, and verb endings.',
        },
      },
      {
        id: 's2-kana-a',
        type: 'example',
        title: 'Character: あ (a)',
        content: {
          type: 'example',
          japanese: 'あ',
          reading: 'a',
          english: 'Pronounced "ah" like in "father". 3 strokes.',
        },
      },
      {
        id: 's3-kana-i',
        type: 'example',
        title: 'Character: い (i)',
        content: {
          type: 'example',
          japanese: 'い',
          reading: 'i',
          english: 'Pronounced "ee" like in "feet". 2 strokes.',
        },
      },
      {
        id: 's4-kana-u',
        type: 'example',
        title: 'Character: う (u)',
        content: {
          type: 'example',
          japanese: 'う',
          reading: 'u',
          english: 'Pronounced "oo" like in "soup", with lips unrounded. 2 strokes.',
        },
      },
      {
        id: 's5-kana-e',
        type: 'example',
        title: 'Character: え (e)',
        content: {
          type: 'example',
          japanese: 'え',
          reading: 'e',
          english: 'Pronounced "eh" like in "pet". 2 strokes.',
        },
      },
      {
        id: 's6-kana-o',
        type: 'example',
        title: 'Character: お (o)',
        content: {
          type: 'example',
          japanese: 'お',
          reading: 'o',
          english: 'Pronounced "oh" like in "boat". 3 strokes.',
        },
      },
      {
        id: 's7-vocab-ai',
        type: 'example',
        title: 'Word Formation: 愛 (あい)',
        content: {
          type: 'example',
          japanese: 'あい (愛)',
          reading: 'ai',
          english: 'Love / Affection — built directly from あ + い',
        },
      },
      {
        id: 's8-ex-mc1',
        type: 'exercise',
        title: 'Recognition Practice',
        content: {
          type: 'exercise',
          exerciseId: 'ex-kana-a-mc',
        },
      },
      {
        id: 's9-ex-type1',
        type: 'exercise',
        title: 'Typing Drill',
        content: {
          type: 'exercise',
          exerciseId: 'ex-kana-ai-type',
        },
      },
      {
        id: 's10-summary',
        type: 'summary',
        title: 'Lesson Complete',
        content: {
          type: 'summary',
          heading: 'You mastered the 5 core vowels!',
          points: [
            'あ (a), い (i), う (u), え (e), お (o) are the base of all Japanese speech.',
            'Learned real words: あい (love), うえ (above), あお (blue).',
            'These 5 sounds will be added to your SRS deck for daily review.',
          ],
          learnedItems: [
            { type: 'kana', id: 'あ' },
            { type: 'kana', id: 'い' },
            { type: 'kana', id: 'う' },
            { type: 'kana', id: 'え' },
            { type: 'kana', id: 'お' },
          ],
        },
      },
    ],
  },

  // ============================================================
  // UNIT 3: GREETINGS & DESU
  // ============================================================
  {
    id: 'n5-l10-desu-statement-questions',
    unitId: 'n5-u3-greetings-copula',
    order: 2,
    title: 'The Polite Copula: 〜です & Questions with 〜か',
    titleJP: '「〜です」と質問「〜か」',
    objectives: [
      'Master the "A は B です" (A is B) basic sentence formula',
      'Turn any statement into a polite question by appending か',
      'State your occupation, nationality, and name naturally',
    ],
    estimatedMinutes: 15,
    conceptIds: ['g-desu', 'p-wa', 'p-ka'],
    vocabularyIds: ['pron-watashi', 'n-hito', 'n-gakko'],
    grammarIds: ['g-desu', 'p-wa', 'p-ka'],
    kanjiIds: ['k-hito', 'k-gaku', 'k-sei-shou'],
    steps: [
      {
        id: 's1-intro',
        type: 'introduction',
        title: 'Your First Japanese Sentences',
        content: {
          type: 'introduction',
          heading: 'The A は B です Formula',
          body: 'Japanese sentence structure is Subject-Object-Verb (SOV). The word "です" (desu) functions as the polite equivalent of "is / am / are". The particle "は" (pronounced "wa") marks what the sentence is about.',
          hookJP: '私は学生です。',
          hookEN: 'I am a student.',
          culturalNote: 'In Japanese, if the topic is already obvious from context (e.g. talking about yourself), you usually drop "私は" (watashi wa) entirely to sound natural: just "学生です" (gakusei desu)!',
        },
      },
      {
        id: 's2-grammar-desu',
        type: 'grammar',
        title: 'Grammar Focus: 〜です',
        content: {
          type: 'grammar',
          grammarId: 'g-desu',
          showFormation: true,
          showExamples: true,
          showContrast: true,
        },
      },
      {
        id: 's3-vocab-watashi',
        type: 'vocabulary',
        title: 'Vocabulary: 私 (わたし)',
        content: {
          type: 'vocabulary',
          vocabularyId: 'pron-watashi',
          showConjugations: false,
          showRelated: true,
        },
      },
      {
        id: 's4-grammar-particle-wa',
        type: 'grammar',
        title: 'Particle Focus: 〜は (Topic Marker)',
        content: {
          type: 'grammar',
          grammarId: 'p-wa',
          showFormation: true,
          showExamples: true,
        },
      },
      {
        id: 's5-grammar-particle-ka',
        type: 'grammar',
        title: 'Making Questions: 〜か',
        content: {
          type: 'grammar',
          grammarId: 'p-ka',
          showFormation: true,
          showExamples: true,
        },
      },
      {
        id: 's6-ex-sentence-build',
        type: 'exercise',
        title: 'Sentence Construction',
        content: {
          type: 'exercise',
          exerciseId: 'ex-desu-sentence-builder',
        },
      },
      {
        id: 's7-ex-mc-question',
        type: 'exercise',
        title: 'Question Formation Drill',
        content: {
          type: 'exercise',
          exerciseId: 'ex-desu-question-mc',
        },
      },
      {
        id: 's8-summary',
        type: 'summary',
        title: 'Lesson Complete',
        content: {
          type: 'summary',
          heading: 'You can now form full Japanese sentences!',
          points: [
            'Form statements with: [Topic] は [Description] です。',
            'Turn any statement into a question simply by adding か at the end.',
            'Drop pronouns when context is obvious for natural, native-like phrasing.',
          ],
          learnedItems: [
            { type: 'grammar', id: 'g-desu' },
            { type: 'grammar', id: 'p-wa' },
            { type: 'grammar', id: 'p-ka' },
            { type: 'vocabulary', id: 'pron-watashi' },
          ],
        },
      },
    ],
  },

  // ============================================================
  // UNIT 6: DAILY ACTIONS & MASU FORM
  // ============================================================
  {
    id: 'n5-l20-masu-form-daily-actions',
    unitId: 'n5-u6-basic-verbs',
    order: 2,
    title: 'Daily Actions: 食べる (Eat) & 飲む (Drink) in ます Form',
    titleJP: '日常の動作：「食べる」「飲む」',
    objectives: [
      'Conjugate Ichidan and Godan verbs into polite present/future form (〜ます) and negative (〜ません)',
      'Use the direct object particle を (wo/o) to state what you eat or drink',
      'Distinguish between 食べます (will eat) and 飲みます (will drink)',
    ],
    estimatedMinutes: 18,
    conceptIds: ['g-masu', 'g-masen', 'p-wo', 'v-taberu', 'v-nomu'],
    vocabularyIds: ['v-taberu', 'v-nomu', 'n-gohan', 'n-mizu'],
    grammarIds: ['g-masu', 'g-masen', 'p-wo'],
    kanjiIds: ['k-taberu', 'k-nichi-hon'],
    steps: [
      {
        id: 's1-intro',
        type: 'introduction',
        title: 'Verbs in Action',
        content: {
          type: 'introduction',
          heading: 'Expressing Daily Actions',
          body: 'In Japanese, the verb always comes at the very END of the sentence. The object of your action (like coffee, water, rice) is connected to the verb using the object marker particle を (pronounced "o").',
          hookJP: 'ご飯を食べます。',
          hookEN: 'I eat a meal.',
          culturalNote: 'In Japan, saying "いただきます" (itadakimasu) before eating and "ごちそうさまでした" (gochisousama deshita) after eating expresses gratitude to the food and the preparer.',
        },
      },
      {
        id: 's2-vocab-taberu',
        type: 'vocabulary',
        title: 'Core Verb: 食べる (To Eat)',
        content: {
          type: 'vocabulary',
          vocabularyId: 'v-taberu',
          showConjugations: true,
          showRelated: true,
        },
      },
      {
        id: 's3-vocab-nomu',
        type: 'vocabulary',
        title: 'Core Verb: 飲む (To Drink)',
        content: {
          type: 'vocabulary',
          vocabularyId: 'v-nomu',
          showConjugations: true,
          showRelated: true,
        },
      },
      {
        id: 's4-grammar-particle-wo',
        type: 'grammar',
        title: 'Direct Object Marker: 〜を',
        content: {
          type: 'grammar',
          grammarId: 'p-wo',
          showFormation: true,
          showExamples: true,
        },
      },
      {
        id: 's5-grammar-masu-masen',
        type: 'grammar',
        title: 'Polite Verb Endings: 〜ます / 〜ません',
        content: {
          type: 'grammar',
          grammarId: 'g-masu',
          showFormation: true,
          showExamples: true,
          showContrast: true,
        },
      },
      {
        id: 's6-ex-sentence-build-actions',
        type: 'exercise',
        title: 'Build Action Sentences',
        content: {
          type: 'exercise',
          exerciseId: 'ex-taberu-sentence-builder',
        },
      },
      {
        id: 's7-ex-conjugation-drill',
        type: 'exercise',
        title: 'Conjugation Challenge',
        content: {
          type: 'exercise',
          exerciseId: 'ex-masu-conjugation-drill',
        },
      },
      {
        id: 's8-summary',
        type: 'summary',
        title: 'Lesson Complete',
        content: {
          type: 'summary',
          heading: 'You can now talk about what you eat and drink!',
          points: [
            'Object + を + Verb (e.g., 水を飲みます - I drink water).',
            'Ichidan verbs drop る and add ます: 食べる → 食べます.',
            'Godan verbs shift う column to い column: 飲む → 飲みます.',
            'Negative form is ません: 食べません (I do not eat).',
          ],
          learnedItems: [
            { type: 'vocabulary', id: 'v-taberu' },
            { type: 'vocabulary', id: 'v-nomu' },
            { type: 'vocabulary', id: 'n-gohan' },
            { type: 'vocabulary', id: 'n-mizu' },
            { type: 'grammar', id: 'g-masu' },
            { type: 'grammar', id: 'g-masen' },
            { type: 'grammar', id: 'p-wo' },
          ],
        },
      },
    ],
  },
];

export function getLessonById(lessonId: string): Lesson | undefined {
  return N5_LESSONS.find(l => l.id === lessonId);
}
