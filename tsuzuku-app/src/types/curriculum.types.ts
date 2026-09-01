// ============================================================
// TSUZUKU — Curriculum Type Definitions
// ============================================================

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type PartOfSpeech =
  | 'noun'
  | 'verb-ichidan'
  | 'verb-godan'
  | 'verb-irregular'
  | 'adjective-i'
  | 'adjective-na'
  | 'adverb'
  | 'particle'
  | 'conjunction'
  | 'expression'
  | 'counter'
  | 'pronoun'
  | 'prefix'
  | 'suffix'
  | 'interjection';

export type ExerciseType =
  | 'multiple_choice'
  | 'matching'
  | 'typing'
  | 'japanese_typing'
  | 'fill_blank'
  | 'sentence_ordering'
  | 'translation_to_jp'
  | 'translation_to_en'
  | 'listening'
  | 'dictation'
  | 'kana_recognition'
  | 'kanji_recognition'
  | 'kanji_writing'
  | 'conjugation'
  | 'particle_selection'
  | 'grammar_selection'
  | 'sentence_production'
  | 'reading_comprehension'
  | 'shadowing'
  | 'speaking'
  | 'error_correction';

export type LessonStepType =
  | 'introduction'
  | 'vocabulary'
  | 'grammar'
  | 'kanji'
  | 'example'
  | 'audio'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'reading'
  | 'exercise'
  | 'review'
  | 'summary';

// ============================================================
// Curriculum Hierarchy
// ============================================================

export interface Level {
  id: JLPTLevel;
  title: string;
  titleJP: string;
  description: string;
  goal: string;
  units: Unit[];
  color: string;
  accentColor: string;
}

export interface Unit {
  id: string;
  levelId: JLPTLevel;
  order: number;
  title: string;
  titleJP: string;
  description: string;
  prerequisiteUnitIds: string[];
  lessonIds: string[];
  estimatedHours: number;
  tags: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  order: number;
  title: string;
  titleJP: string;
  objectives: string[];
  estimatedMinutes: number;
  steps: LessonStep[];
  conceptIds: string[];
  vocabularyIds: string[];
  grammarIds: string[];
  kanjiIds: string[];
}

export interface LessonStep {
  id: string;
  type: LessonStepType;
  title?: string;
  content: LessonStepContent;
  exerciseId?: string;
  skippable?: boolean;
}

export type LessonStepContent =
  | IntroductionContent
  | VocabularyContent
  | GrammarContent
  | KanjiContent
  | ExampleContent
  | AudioContent
  | ExerciseContent
  | SummaryContent;

export interface IntroductionContent {
  type: 'introduction';
  heading: string;
  body: string;
  hookJP?: string;
  hookEN?: string;
  culturalNote?: string;
}

export interface VocabularyContent {
  type: 'vocabulary';
  vocabularyId: string;
  showConjugations?: boolean;
  showRelated?: boolean;
}

export interface GrammarContent {
  type: 'grammar';
  grammarId: string;
  showFormation?: boolean;
  showExamples?: boolean;
  showContrast?: boolean;
}

export interface KanjiContent {
  type: 'kanji';
  kanjiId: string;
  showStrokeOrder?: boolean;
  showWritingCanvas?: boolean;
}

export interface ExampleContent {
  type: 'example';
  japanese: string;
  reading: string;
  english: string;
  highlights?: Array<{ start: number; end: number; label: string; color: string }>;
  audioId?: string;
}

export interface AudioContent {
  type: 'audio';
  text: string;
  reading: string;
  english: string;
  audioId?: string;
  slowAudioId?: string;
}

export interface ExerciseContent {
  type: 'exercise';
  exerciseId: string;
}

export interface SummaryContent {
  type: 'summary';
  heading: string;
  points: string[];
  learnedItems: Array<{ type: string; id: string }>;
}

// ============================================================
// Vocabulary
// ============================================================

export interface VocabularyItem {
  id: string;
  japanese: string;        // The primary display form (kanji if exists, otherwise kana)
  kana: string;            // Hiragana/katakana reading
  kanji?: string;          // Kanji form if different from japanese
  romaji: string;          // Romanization
  english: string;         // Primary English meaning
  alternateEnglish?: string[];
  partOfSpeech: PartOfSpeech;
  jlptLevel: JLPTLevel;
  frequency?: number;      // Lower = more common
  tags: string[];
  examples: VocabularyExample[];
  relatedWords?: string[]; // IDs of related vocabulary
  antonyms?: string[];
  conjugations?: VerbConjugations;
  audioUrl?: string;
  pitchAccent?: string;
  notes?: string;
}

export interface VocabularyExample {
  japanese: string;
  reading: string;
  english: string;
  audioUrl?: string;
}

export interface VerbConjugations {
  dictionaryForm: string;
  masuForm: string;
  naiForm: string;
  taForm: string;
  teForm: string;
  potentialForm: string;
  passiveForm: string;
  causativeForm: string;
  volitionalForm: string;
  taiForm: string;
  imperativeForm: string;
  conditionalForm: string;
}

// ============================================================
// Kanji
// ============================================================

export interface KanjiItem {
  id: string;
  character: string;
  meanings: string[];
  onyomi: string[];
  kunyomi: string[];
  strokeCount: number;
  radicals: KanjiRadical[];
  mnemonic?: string;
  jlptLevel: JLPTLevel;
  frequency?: number;
  vocabularyExamples: KanjiVocabExample[];
  relatedKanji?: string[];    // Characters
  similarKanji?: string[];    // Visually similar
  audioUrl?: string;
  hzwDataPath?: string;       // For Hanzi Writer data
}

export interface KanjiRadical {
  character: string;
  meaning: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'outer' | 'inner';
}

export interface KanjiVocabExample {
  word: string;
  reading: string;
  meaning: string;
}

// ============================================================
// Grammar
// ============================================================

export interface GrammarPoint {
  id: string;
  name: string;            // e.g., "〜ています"
  nameEN: string;          // e.g., "te-iru form"
  jlptLevel: JLPTLevel;
  meaning: string;
  detailedMeaning: string;
  formation: GrammarFormation[];
  attachmentRules: AttachmentRule[];
  politeness: 'formal' | 'neutral' | 'casual';
  examples: GrammarExample[];
  commonMistakes: CommonMistake[];
  similarGrammar?: SimilarGrammarRef[];
  contrastGrammar?: ContrastGrammarRef[];
  notes?: string;
  tags: string[];
}

export interface GrammarFormation {
  structure: string;       // e.g., "Verb (て-form) + います"
  example: string;
  reading: string;
  english: string;
}

export interface AttachmentRule {
  partOfSpeech: PartOfSpeech | 'any';
  form: string;
  example: string;
}

export interface GrammarExample {
  japanese: string;
  reading: string;
  english: string;
  highlight?: string;      // Part to highlight
  audioUrl?: string;
}

export interface CommonMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

export interface SimilarGrammarRef {
  grammarId: string;
  nuance: string;
}

export interface ContrastGrammarRef {
  grammarId: string;
  difference: string;
}

// ============================================================
// Exercises
// ============================================================

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  promptJP?: string;
  answer: string;
  acceptedAnswers: string[];
  hints: string[];
  explanation: string;
  extendedExplanation?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  targetConceptId: string;
  conceptType: 'vocabulary' | 'kanji' | 'grammar' | 'kana';
  audioUrl?: string;
  mediaUrl?: string;
  options?: string[];      // For multiple choice
  pairs?: Array<{ left: string; right: string }>; // For matching
  tokens?: SentenceToken[]; // For sentence builder
}

export interface SentenceToken {
  id: string;
  text: string;
  reading?: string;
  isDistractor?: boolean;
}

// ============================================================
// Reading Passages
// ============================================================

export interface ReadingPassage {
  id: string;
  title: string;
  titleJP: string;
  jlptLevel: JLPTLevel;
  content: string;         // Japanese text
  furigana?: FuriganaData[];
  translation: string;
  vocabulary: string[];    // VocabularyItem IDs
  grammar: string[];       // GrammarPoint IDs
  comprehensionQuestions: ComprehensionQuestion[];
  audioUrl?: string;
  estimatedMinutes: number;
  tags: string[];
}

export interface FuriganaData {
  kanji: string;
  reading: string;
  start: number;
  end: number;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

// ============================================================
// Dialogues
// ============================================================

export interface Dialogue {
  id: string;
  title: string;
  scenario: string;
  jlptLevel: JLPTLevel;
  lines: DialogueLine[];
  vocabularyIds: string[];
  grammarIds: string[];
  culturalNote?: string;
}

export interface DialogueLine {
  speaker: string;
  speakerJP?: string;
  japanese: string;
  reading: string;
  english: string;
  audioUrl?: string;
  grammarHighlights?: string[];
}
