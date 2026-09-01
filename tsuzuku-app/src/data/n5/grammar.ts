// ============================================================
// TSUZUKU — N5 Grammar Points Seed Data
// Core grammar patterns for absolute beginners
// Original explanations and examples
// ============================================================

import type { GrammarPoint } from '@/types/curriculum.types';

export const n5Grammar: GrammarPoint[] = [
  // ============================================================
  // COPULA — です
  // ============================================================
  {
    id: 'g-desu',
    name: '〜です',
    nameEN: 'desu (polite copula)',
    jlptLevel: 'N5',
    meaning: 'am/is/are — polite version of だ',
    detailedMeaning: 'です is the polite copula that links a subject to a noun or adjective. It ends a statement politely and is essential in formal speech.',
    formation: [
      { structure: 'Noun + です', example: '学生です。', reading: 'がくせいです。', english: 'I am a student.' },
      { structure: 'な-Adjective + です', example: '元気です。', reading: 'げんきです。', english: 'I am fine/healthy.' },
      { structure: 'い-Adjective (plain) + です', example: '大きいです。', reading: 'おおきいです。', english: 'It is big.' },
    ],
    attachmentRules: [
      { partOfSpeech: 'noun', form: 'Noun + です', example: '先生です' },
      { partOfSpeech: 'adjective-na', form: 'な-adj + です', example: '静かです' },
      { partOfSpeech: 'adjective-i', form: 'い-adj + です', example: '高いです' },
    ],
    politeness: 'formal',
    examples: [
      { japanese: '私は田中です。', reading: 'わたしはたなかです。', english: 'I am Tanaka.', highlight: 'です' },
      { japanese: '彼女は先生です。', reading: 'かのじょはせんせいです。', english: 'She is a teacher.', highlight: 'です' },
      { japanese: '今日は月曜日です。', reading: 'きょうはげつようびです。', english: 'Today is Monday.', highlight: 'です' },
      { japanese: 'この本はおもしろいです。', reading: 'このほんはおもしろいです。', english: 'This book is interesting.', highlight: 'です' },
    ],
    commonMistakes: [
      {
        wrong: '大きいいです',
        correct: '大きいです',
        explanation: 'Do not add い before です for い-adjectives. The い already ends the adjective.',
      },
      {
        wrong: '静かいです',
        correct: '静かです',
        explanation: 'な-adjectives do NOT have an い ending. 静か + です, NOT 静かい + です.',
      },
    ],
    similarGrammar: [{ grammarId: 'g-da', nuance: 'だ is the plain/casual form of です' }],
    tags: ['copula', 'formal', 'statement'],
  },

  // ============================================================
  // MASU FORM
  // ============================================================
  {
    id: 'g-masu',
    name: '〜ます',
    nameEN: 'masu form (polite verb)',
    jlptLevel: 'N5',
    meaning: 'polite verb ending — do / will do',
    detailedMeaning: 'The ます form is the polite form of verbs used in formal speech and writing. It expresses actions in the present/future tense in an affirmative way.',
    formation: [
      { structure: 'Verb stem + ます', example: '食べます', reading: 'たべます', english: 'eat / will eat' },
      { structure: 'Group 1: Replace う→い + ます', example: '行きます', reading: 'いきます', english: 'go / will go' },
      { structure: 'Group 2: Remove る + ます', example: '見ます', reading: 'みます', english: 'see / will see' },
      { structure: 'Irregular: する→します', example: 'します', reading: 'します', english: 'do / will do' },
      { structure: 'Irregular: くる→きます', example: 'きます', reading: 'きます', english: 'come / will come' },
    ],
    attachmentRules: [
      { partOfSpeech: 'verb-ichidan', form: 'Remove る + ます', example: '食べる→食べます' },
      { partOfSpeech: 'verb-godan', form: 'う→い column + ます', example: '書く→書きます' },
      { partOfSpeech: 'verb-irregular', form: 'Special conjugation', example: 'する→します' },
    ],
    politeness: 'formal',
    examples: [
      { japanese: '毎朝コーヒーを飲みます。', reading: 'まいあさコーヒーをのみます。', english: 'I drink coffee every morning.', highlight: '飲みます' },
      { japanese: '明日、学校に行きます。', reading: 'あした、がっこうにいきます。', english: 'I will go to school tomorrow.', highlight: '行きます' },
      { japanese: '日本語を勉強します。', reading: 'にほんごをべんきょうします。', english: 'I study Japanese.', highlight: 'します' },
    ],
    commonMistakes: [
      {
        wrong: '食べるます',
        correct: '食べます',
        explanation: 'For ichidan verbs, remove the る then add ます. Do NOT keep the る.',
      },
      {
        wrong: '行くます',
        correct: '行きます',
        explanation: 'For godan verbs, change the う-sound to the い-row: く→き then add ます.',
      },
    ],
    similarGrammar: [
      { grammarId: 'g-masen', nuance: 'ません is the negative form of ます' },
      { grammarId: 'g-mashita', nuance: 'ました is the past form of ます' },
    ],
    tags: ['verb', 'polite', 'present', 'future'],
  },

  // ============================================================
  // MASEN FORM
  // ============================================================
  {
    id: 'g-masen',
    name: '〜ません',
    nameEN: 'masen form (polite negative)',
    jlptLevel: 'N5',
    meaning: 'polite negative verb — do not / will not',
    detailedMeaning: 'ません is the negative form of ます. It expresses that an action does not happen or will not happen, in a polite way.',
    formation: [
      { structure: 'ます → ません', example: '食べません', reading: 'たべません', english: 'do not eat' },
      { structure: '行きます → 行きません', example: '行きません', reading: 'いきません', english: 'do not go' },
    ],
    attachmentRules: [
      { partOfSpeech: 'verb-ichidan', form: 'verb stem + ません', example: '食べません' },
      { partOfSpeech: 'verb-godan', form: 'い-row stem + ません', example: '行きません' },
    ],
    politeness: 'formal',
    examples: [
      { japanese: 'お酒を飲みません。', reading: 'おさけをのみません。', english: 'I do not drink alcohol.', highlight: '飲みません' },
      { japanese: '肉を食べません。', reading: 'にくをたべません。', english: 'I do not eat meat.', highlight: '食べません' },
      { japanese: 'わかりません。', reading: 'わかりません。', english: "I don't understand.", highlight: 'わかりません' },
    ],
    commonMistakes: [
      {
        wrong: '食べません',
        correct: '食べません',
        explanation: 'ません attaches to the same verb stem as ます. Never attach ません to the dictionary form.',
      },
    ],
    similarGrammar: [
      { grammarId: 'g-masu', nuance: 'ます is the affirmative form' },
      { grammarId: 'g-nakatta', nuance: 'なかった is the plain past negative' },
    ],
    tags: ['verb', 'polite', 'negative'],
  },

  // ============================================================
  // WA PARTICLE
  // ============================================================
  {
    id: 'p-wa',
    name: '〜は',
    nameEN: 'wa (topic marker)',
    jlptLevel: 'N5',
    meaning: 'topic marker — marks the topic of a sentence',
    detailedMeaning: 'は (wa) marks the topic of the sentence. The topic is what the sentence is about. It often tells us "as for X..." or "speaking of X...". は is written as は (ha) but pronounced "wa" when used as a particle.',
    formation: [
      { structure: 'Topic + は + Comment', example: '私は学生です。', reading: 'わたしはがくせいです。', english: 'I am a student. (As for me, I am a student.)' },
    ],
    attachmentRules: [
      { partOfSpeech: 'noun', form: 'Noun + は', example: '田中さんは...' },
      { partOfSpeech: 'pronoun', form: 'Pronoun + は', example: '私は...' },
    ],
    politeness: 'neutral',
    examples: [
      { japanese: '私は学生です。', reading: 'わたしはがくせいです。', english: 'I am a student.', highlight: 'は' },
      { japanese: 'これは本です。', reading: 'これはほんです。', english: 'This is a book.', highlight: 'は' },
      { japanese: '今日は晴れです。', reading: 'きょうははれです。', english: "Today it's sunny.", highlight: 'は' },
      { japanese: '東京は大きいです。', reading: 'とうきょうはおおきいです。', english: 'Tokyo is big.', highlight: 'は' },
    ],
    commonMistakes: [
      {
        wrong: '私が学生です (when introducing yourself)',
        correct: '私は学生です',
        explanation: 'When stating a fact about yourself as the topic, は is usually correct. が can sound like you are claiming to be THE specific student.',
      },
    ],
    similarGrammar: [{ grammarId: 'p-ga', nuance: 'が marks the grammatical subject, not the topic. は vs が is one of the most nuanced distinctions in Japanese.' }],
    contrastGrammar: [{ grammarId: 'p-ga', difference: 'は establishes the topic (broad context); が marks the specific grammatical subject (new information, emphasis, or specific contrast).' }],
    tags: ['particle', 'topic', 'core', 'fundamental'],
  },

  // ============================================================
  // GA PARTICLE
  // ============================================================
  {
    id: 'p-ga',
    name: '〜が',
    nameEN: 'ga (subject marker)',
    jlptLevel: 'N5',
    meaning: 'subject marker — marks the grammatical subject, emphasizes new information',
    detailedMeaning: 'が (ga) marks the grammatical subject of a sentence. It often introduces new information, answers a "which/who" question, or emphasizes that it is specifically X doing the action.',
    formation: [
      { structure: 'Subject + が + Predicate', example: '猫がいます。', reading: 'ねこがいます。', english: 'There is a cat.' },
      { structure: 'Answer to "who/what" + が', example: 'A: 誰が来ますか？ B: 田中さんが来ます。', reading: 'A: だれがきますか？ B: たなかさんがきます。', english: 'A: Who will come? B: Tanaka will come.' },
    ],
    attachmentRules: [
      { partOfSpeech: 'noun', form: 'Noun + が', example: '猫が...' },
      { partOfSpeech: 'pronoun', form: 'Pronoun + が', example: '私が...' },
    ],
    politeness: 'neutral',
    examples: [
      { japanese: '犬がいます。', reading: 'いぬがいます。', english: 'There is a dog.', highlight: 'が' },
      { japanese: '誰が来ましたか？田中さんが来ました。', reading: 'だれがきましたか？たなかさんがきました。', english: 'Who came? Tanaka came.', highlight: 'が' },
      { japanese: '私が行きます。', reading: 'わたしがいきます。', english: 'I will go (specifically me).', highlight: 'が' },
      { japanese: '日本語が好きです。', reading: 'にほんごがすきです。', english: 'I like Japanese.', highlight: 'が' },
    ],
    commonMistakes: [
      {
        wrong: '日本語を好きです',
        correct: '日本語が好きです',
        explanation: 'すき (like) and きらい (dislike) always use が, not を, for the thing liked/disliked.',
      },
    ],
    similarGrammar: [{ grammarId: 'p-wa', nuance: 'は is the topic marker. The は vs が distinction is one of the most studied aspects of Japanese grammar.' }],
    contrastGrammar: [{ grammarId: 'p-wa', difference: 'は marks the topic (what the sentence is about, often known information). が marks the subject (who/what performs the action, often new/emphasized information).' }],
    tags: ['particle', 'subject', 'core', 'fundamental'],
  },

  // ============================================================
  // WO PARTICLE
  // ============================================================
  {
    id: 'p-wo',
    name: '〜を',
    nameEN: 'wo/o (object marker)',
    jlptLevel: 'N5',
    meaning: 'direct object marker — marks what receives the action of a transitive verb',
    detailedMeaning: 'を (wo, pronounced "o") marks the direct object of a sentence — the thing that receives the action of a transitive verb.',
    formation: [
      { structure: 'Object + を + Transitive Verb', example: 'ご飯を食べます。', reading: 'ごはんをたべます。', english: 'I eat rice.' },
    ],
    attachmentRules: [
      { partOfSpeech: 'noun', form: 'Noun + を', example: 'ご飯を食べる' },
    ],
    politeness: 'neutral',
    examples: [
      { japanese: '本を読みます。', reading: 'ほんをよみます。', english: 'I read a book.', highlight: 'を' },
      { japanese: 'コーヒーを飲みます。', reading: 'コーヒーをのみます。', english: 'I drink coffee.', highlight: 'を' },
      { japanese: '日本語を勉強します。', reading: 'にほんごをべんきょうします。', english: 'I study Japanese.', highlight: 'を' },
      { japanese: '音楽を聞きます。', reading: 'おんがくをききます。', english: 'I listen to music.', highlight: 'を' },
    ],
    commonMistakes: [
      {
        wrong: '日本語が勉強します',
        correct: '日本語を勉強します',
        explanation: 'The thing you study is a direct object → use を, not が.',
      },
    ],
    tags: ['particle', 'object', 'core', 'fundamental'],
  },

  // ============================================================
  // NI PARTICLE
  // ============================================================
  {
    id: 'p-ni',
    name: '〜に',
    nameEN: 'ni (location/direction/time)',
    jlptLevel: 'N5',
    meaning: 'direction, location of existence, time point',
    detailedMeaning: 'に has multiple uses: 1) marks the destination of movement, 2) marks the location of existence (with ある/いる), 3) marks a specific point in time.',
    formation: [
      { structure: 'Place + に + movement verb', example: '学校に行きます。', reading: 'がっこうにいきます。', english: 'I go to school.' },
      { structure: 'Place + に + ある/いる', example: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', english: 'There is a book on the desk.' },
      { structure: 'Time + に + verb', example: '7時に起きます。', reading: 'しちじにおきます。', english: 'I wake up at 7 o\'clock.' },
    ],
    attachmentRules: [
      { partOfSpeech: 'noun', form: 'Place noun + に (direction/location)', example: '東京に行く' },
      { partOfSpeech: 'noun', form: 'Time noun + に (specific time)', example: '三時に来る' },
    ],
    politeness: 'neutral',
    examples: [
      { japanese: '学校に行きます。', reading: 'がっこうにいきます。', english: 'I go to school.', highlight: 'に' },
      { japanese: '椅子の上に猫がいます。', reading: 'いすのうえにねこがいます。', english: 'There is a cat on the chair.', highlight: 'に' },
      { japanese: '六時に起きます。', reading: 'ろくじにおきます。', english: 'I wake up at 6.', highlight: 'に' },
    ],
    commonMistakes: [
      {
        wrong: '学校で行きます',
        correct: '学校に行きます',
        explanation: 'に marks the destination of movement. で marks the location where an activity takes place.',
      },
    ],
    contrastGrammar: [{ grammarId: 'p-de', difference: 'に marks destination/location of existence/time. で marks the location where an activity takes place.' }],
    tags: ['particle', 'direction', 'location', 'time', 'core', 'fundamental'],
  },

  // ============================================================
  // DE PARTICLE
  // ============================================================
  {
    id: 'p-de',
    name: '〜で',
    nameEN: 'de (location of action, means, reason)',
    jlptLevel: 'N5',
    meaning: 'location where action takes place, means/method, scope/range',
    detailedMeaning: 'で has three core uses: 1) marks the place where an action occurs (NOT existence), 2) marks the means or method used, 3) marks quantity or scope.',
    formation: [
      { structure: 'Place + で + action verb', example: '図書館で勉強します。', reading: 'としょかんでべんきょうします。', english: 'I study at the library.' },
      { structure: 'Means + で + verb', example: '電車で行きます。', reading: 'でんしゃでいきます。', english: 'I go by train.' },
    ],
    attachmentRules: [
      { partOfSpeech: 'noun', form: 'Place + で (action location)', example: 'カフェで話す' },
      { partOfSpeech: 'noun', form: 'Tool/method + で (means)', example: '箸で食べる' },
    ],
    politeness: 'neutral',
    examples: [
      { japanese: '公園で遊びます。', reading: 'こうえんであそびます。', english: 'I play at the park.', highlight: 'で' },
      { japanese: 'バスで来ました。', reading: 'バスできました。', english: 'I came by bus.', highlight: 'で' },
      { japanese: 'はしで食べます。', reading: 'はしでたべます。', english: 'I eat with chopsticks.', highlight: 'で' },
      { japanese: '日本語で話しましょう。', reading: 'にほんごではなしましょう。', english: 'Let\'s speak in Japanese.', highlight: 'で' },
    ],
    commonMistakes: [
      {
        wrong: '部屋に勉強します',
        correct: '部屋で勉強します',
        explanation: 'で marks where actions happen. に marks existence location or destination.',
      },
    ],
    contrastGrammar: [{ grammarId: 'p-ni', difference: 'で marks where actions take place (verb describes an activity). に marks destination of movement or where something EXISTS.' }],
    tags: ['particle', 'location', 'means', 'core', 'fundamental'],
  },

  // ============================================================
  // NO PARTICLE
  // ============================================================
  {
    id: 'p-no',
    name: '〜の',
    nameEN: 'no (possessive/connecting particle)',
    jlptLevel: 'N5',
    meaning: 'possessive, connection, explanation (nominalizer)',
    detailedMeaning: 'の connects two nouns, showing possession, categorization, or relationship. It is like "\'s" or "of" in English.',
    formation: [
      { structure: 'Noun A + の + Noun B', example: '私の本', reading: 'わたしのほん', english: 'my book' },
      { structure: 'Category + の + Specific', example: '日本語の本', reading: 'にほんごのほん', english: 'Japanese language book' },
    ],
    attachmentRules: [
      { partOfSpeech: 'noun', form: 'Noun + の + Noun', example: '田中さんの車' },
    ],
    politeness: 'neutral',
    examples: [
      { japanese: '私の名前は田中です。', reading: 'わたしのなまえはたなかです。', english: 'My name is Tanaka.', highlight: 'の' },
      { japanese: '日本語の本を読みます。', reading: 'にほんごのほんをよみます。', english: 'I read a Japanese book.', highlight: 'の' },
      { japanese: 'これは友達のです。', reading: 'これはともだちのです。', english: "This belongs to my friend.", highlight: 'の' },
      { japanese: '東京の大学に行きます。', reading: 'とうきょうのだいがくにいきます。', english: 'I go to a university in Tokyo.', highlight: 'の' },
    ],
    commonMistakes: [
      {
        wrong: '私は本',
        correct: '私の本',
        explanation: 'Use の to show possession between two nouns. は is the topic marker for the whole sentence.',
      },
    ],
    tags: ['particle', 'possessive', 'connection', 'core', 'fundamental'],
  },

  // ============================================================
  // QUESTION PARTICLE KA
  // ============================================================
  {
    id: 'p-ka',
    name: '〜か',
    nameEN: 'ka (question particle)',
    jlptLevel: 'N5',
    meaning: 'turns a statement into a question',
    detailedMeaning: 'Adding か at the end of a ます/です sentence turns it into a yes/no question. In formal speech, questions end with か. In casual speech, a rising intonation on the plain form is used instead.',
    formation: [
      { structure: 'Statement + か？', example: '学生ですか？', reading: 'がくせいですか？', english: 'Are you a student?' },
      { structure: 'Question word + か', example: 'どこに行きますか？', reading: 'どこにいきますか？', english: 'Where are you going?' },
    ],
    attachmentRules: [
      { partOfSpeech: 'any', form: 'Sentence-final + か', example: '食べますか？' },
    ],
    politeness: 'formal',
    examples: [
      { japanese: '日本語を勉強しますか？', reading: 'にほんごをべんきょうしますか？', english: 'Do you study Japanese?', highlight: 'か' },
      { japanese: '今日、暇ですか？', reading: 'きょう、ひまですか？', english: 'Are you free today?', highlight: 'か' },
      { japanese: '何が好きですか？', reading: 'なにがすきですか？', english: 'What do you like?', highlight: 'か' },
    ],
    commonMistakes: [
      {
        wrong: 'Adding か to plain form in formal situations',
        correct: 'Add か to ます/です form in formal situations',
        explanation: 'In formal Japanese, questions use the ます/です + か pattern. Using the plain form + か is too casual.',
      },
    ],
    tags: ['particle', 'question', 'fundamental'],
  },

  // ============================================================
  // TE-FORM + ください
  // ============================================================
  {
    id: 'g-te-kudasai',
    name: '〜てください',
    nameEN: 'te-kudasai (polite request)',
    jlptLevel: 'N5',
    meaning: 'please do ~  (polite request)',
    detailedMeaning: '〜てください is a polite way to ask someone to do something. It uses the て-form of a verb followed by ください.',
    formation: [
      { structure: 'Verb (て-form) + ください', example: '見てください。', reading: 'みてください。', english: 'Please look.' },
      { structure: 'For godan: various て-forms', example: '書いてください。', reading: 'かいてください。', english: 'Please write.' },
    ],
    attachmentRules: [
      { partOfSpeech: 'verb-ichidan', form: 'Remove る + て + ください', example: '食べてください' },
      { partOfSpeech: 'verb-godan', form: 'て-form + ください', example: '聞いてください' },
    ],
    politeness: 'formal',
    examples: [
      { japanese: '名前を書いてください。', reading: 'なまえをかいてください。', english: 'Please write your name.', highlight: 'てください' },
      { japanese: 'ゆっくり話してください。', reading: 'ゆっくりはなしてください。', english: 'Please speak slowly.', highlight: 'てください' },
      { japanese: 'ここに座ってください。', reading: 'ここにすわってください。', english: 'Please sit here.', highlight: 'てください' },
      { japanese: '待ってください。', reading: 'まってください。', english: 'Please wait.', highlight: 'てください' },
    ],
    commonMistakes: [
      {
        wrong: '食べるください',
        correct: '食べてください',
        explanation: 'Use the て-form, NOT the dictionary form. Verb → て-form → add ください.',
      },
    ],
    tags: ['request', 'te-form', 'polite'],
  },

  // ============================================================
  // NEGATIVE FORM DES
  // ============================================================
  {
    id: 'g-dewa-arimasen',
    name: '〜ではありません',
    nameEN: 'dewa arimasen (polite negative copula)',
    jlptLevel: 'N5',
    meaning: 'am not / is not / are not (polite negative)',
    detailedMeaning: 'ではありません is the polite negative form of です. In casual speech, じゃない or じゃないです is more common.',
    formation: [
      { structure: 'Noun + ではありません', example: '学生ではありません。', reading: 'がくせいではありません。', english: 'I am not a student.' },
      { structure: 'な-Adj + ではありません', example: '元気ではありません。', reading: 'げんきではありません。', english: 'I am not well.' },
    ],
    attachmentRules: [
      { partOfSpeech: 'noun', form: 'Noun + ではありません', example: '先生ではありません' },
    ],
    politeness: 'formal',
    examples: [
      { japanese: '私は先生ではありません。', reading: 'わたしはせんせいではありません。', english: 'I am not a teacher.', highlight: 'ではありません' },
      { japanese: 'これは本ではありません。', reading: 'これはほんではありません。', english: 'This is not a book.', highlight: 'ではありません' },
    ],
    commonMistakes: [
      {
        wrong: '大きいではありません',
        correct: '大きくありません',
        explanation: 'For い-adjectives, the negative is NOT ではありません. Change い→く then add ありません: 大きい → 大きくありません.',
      },
    ],
    tags: ['copula', 'negative', 'formal'],
  },
];

export default n5Grammar;
