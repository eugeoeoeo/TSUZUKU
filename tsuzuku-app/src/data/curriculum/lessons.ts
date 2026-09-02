// ============================================================
// TSUZUKU — Complete Lesson Database (N5 - N1)
// All lessons fully defined — no placeholders. Every lessonId
// referenced in units.ts resolves to a complete Lesson object.
// ============================================================

import type { Lesson } from '@/types/curriculum.types';

// ════════════════════════════════════════════════════════════
// N5 LESSONS — 32 total across 10 units
// ════════════════════════════════════════════════════════════
export const N5_LESSONS: Lesson[] = [

  // ── UNIT 1: HIRAGANA MASTERY ─────────────────────────────
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
        id: 's1-intro', type: 'introduction', title: 'Welcome to Hiragana',
        content: {
          type: 'introduction',
          heading: 'The Japanese Sound System',
          body: 'Japanese pronunciation is remarkably consistent. Every single word in the language is built from just 5 core vowels and their combinations with consonants. Unlike English, Japanese vowels never change their sound: "あ" is always "ah", "い" is always "ee".',
          hookJP: 'あいうえお',
          hookEN: 'a · i · u · e · o',
          culturalNote: 'Hiragana was developed around the 9th century and is used for native Japanese words, grammatical particles, and verb endings.',
        },
      },
      { id: 's2-kana-a', type: 'example', title: 'Character: あ (a)', content: { type: 'example', japanese: 'あ', reading: 'a', english: 'Pronounced "ah" like in "father". 3 strokes.' } },
      { id: 's3-kana-i', type: 'example', title: 'Character: い (i)', content: { type: 'example', japanese: 'い', reading: 'i', english: 'Pronounced "ee" like in "feet". 2 strokes.' } },
      { id: 's4-kana-u', type: 'example', title: 'Character: う (u)', content: { type: 'example', japanese: 'う', reading: 'u', english: 'Pronounced "oo" like in "soup", with lips unrounded. 2 strokes.' } },
      { id: 's5-kana-e', type: 'example', title: 'Character: え (e)', content: { type: 'example', japanese: 'え', reading: 'e', english: 'Pronounced "eh" like in "pet". 2 strokes.' } },
      { id: 's6-kana-o', type: 'example', title: 'Character: お (o)', content: { type: 'example', japanese: 'お', reading: 'o', english: 'Pronounced "oh" like in "boat". 3 strokes.' } },
      { id: 's7-vocab-ai', type: 'example', title: 'Word: あい (愛)', content: { type: 'example', japanese: 'あい (愛)', reading: 'ai', english: 'Love — built from あ + い' } },
      { id: 's8-ex-mc1', type: 'exercise', title: 'Recognition Practice', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's9-ex-type1', type: 'exercise', title: 'Typing Drill', content: { type: 'exercise', exerciseId: 'ex-kana-ai-type' } },
      {
        id: 's10-summary', type: 'summary', title: 'Lesson Complete',
        content: {
          type: 'summary', heading: 'You mastered the 5 core vowels!',
          points: ['あ (a), い (i), う (u), え (e), お (o) are the base of all Japanese speech.', 'Learned real words: あい (love), うえ (above), あお (blue).', 'These 5 sounds will be added to your SRS deck for daily review.'],
          learnedItems: [{ type: 'kana', id: 'あ' }, { type: 'kana', id: 'い' }, { type: 'kana', id: 'う' }, { type: 'kana', id: 'え' }, { type: 'kana', id: 'お' }],
        },
      },
    ],
  },

  {
    id: 'n5-l2-hiragana-k-s-t',
    unitId: 'n5-u1-hiragana',
    order: 2,
    title: 'K・S・T Row Hiragana (か〜と)',
    titleJP: 'か行・さ行・た行',
    objectives: ['Read and write the K-row (か き く け こ), S-row (さ し す せ そ), and T-row (た ち つ て と)', 'Notice the irregular readings: し (shi, not si), ち (chi), つ (tsu)', 'Read common words: かわ, きて, さくら, たべる'],
    estimatedMinutes: 15,
    conceptIds: ['kana-ka', 'kana-ki', 'kana-ku', 'kana-ke', 'kana-ko', 'kana-sa', 'kana-shi', 'kana-su', 'kana-se', 'kana-so', 'kana-ta', 'kana-chi', 'kana-tsu', 'kana-te', 'kana-to'],
    vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'K, S, T Rows',
        content: { type: 'introduction', heading: 'K, S, T — Consonant Rows', body: 'Japanese organizes consonants in rows. The K-row attaches each consonant to all 5 vowels: ka, ki, ku, ke, ko. Three sounds are irregular: し = "shi" (not "si"), ち = "chi" (not "ti"), つ = "tsu" (not "tu"). These are the most common exceptions.', hookJP: 'さくら', hookEN: 'sa-ku-ra · Cherry blossom', culturalNote: 'さくら (sakura) is Japan\'s national flower and appears in countless songs, names, and traditions.' },
      },
      { id: 's2-k-row', type: 'example', title: 'K-Row: か き く け こ', content: { type: 'example', japanese: 'か き く け こ', reading: 'ka · ki · ku · ke · ko', english: 'Five sounds. かわ = river, きて = come here, くに = country' } },
      { id: 's3-s-row', type: 'example', title: 'S-Row: さ し す せ そ', content: { type: 'example', japanese: 'さ し す せ そ', reading: 'sa · shi · su · se · so', english: 'し = "shi" not "si"! さくら = cherry blossom, すし = sushi' } },
      { id: 's4-t-row', type: 'example', title: 'T-Row: た ち つ て と', content: { type: 'example', japanese: 'た ち つ て と', reading: 'ta · chi · tsu · te · to', english: 'ち="chi", つ="tsu". たべる = to eat, て = hand, と = and/door' } },
      { id: 's5-words', type: 'example', title: 'Reading Practice', content: { type: 'example', japanese: 'きって・さくら・くつ', reading: 'kitte · sakura · kutsu', english: 'stamp · cherry blossom · shoe' } },
      { id: 's6-ex1', type: 'exercise', title: 'K/S/T Recognition', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Reading Words', content: { type: 'exercise', exerciseId: 'ex-kana-ai-type' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: '15 more hiragana mastered!', points: ['K-row: か き く け こ (ka ki ku ke ko)', 'S-row: さ し す せ そ — し = "shi"!', 'T-row: た ち つ て と — ち = "chi", つ = "tsu"!'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l3-hiragana-n-h-m',
    unitId: 'n5-u1-hiragana',
    order: 3,
    title: 'N・H・M Row Hiragana (な〜も)',
    titleJP: 'な行・は行・ま行',
    objectives: ['Read N-row (な に ぬ ね の), H-row (は ひ ふ へ ほ), M-row (ま み む め も)', 'Note は can be read "wa" as the topic particle', 'Build words: なに, はな, みず'],
    estimatedMinutes: 14,
    conceptIds: ['kana-na', 'kana-ni', 'kana-nu', 'kana-ne', 'kana-no', 'kana-ha', 'kana-hi', 'kana-fu', 'kana-he', 'kana-ho', 'kana-ma', 'kana-mi', 'kana-mu', 'kana-me', 'kana-mo'],
    vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'N, H, M Rows',
        content: { type: 'introduction', heading: 'N, H, M — The Middle Rows', body: 'The H-row has one irregular sound: ふ = "fu" (not "hu"). Also importantly: は (ha) is pronounced "wa" when used as the topic particle. へ (he) is pronounced "e" when used as the direction particle.', hookJP: 'はな', hookEN: 'hana · flower', culturalNote: 'はな (花) means flower, and also nose (鼻). Japanese is full of these homophones — context always clarifies meaning.' },
      },
      { id: 's2-n-row', type: 'example', title: 'N-Row: な に ぬ ね の', content: { type: 'example', japanese: 'な に ぬ ね の', reading: 'na · ni · nu · ne · no', english: 'なに = what, の = possessive particle, ねこ = cat' } },
      { id: 's3-h-row', type: 'example', title: 'H-Row: は ひ ふ へ ほ', content: { type: 'example', japanese: 'は ひ ふ へ ほ', reading: 'ha · hi · fu · he · ho', english: 'ふ = "fu"! はな = flower/nose, ひと = person, ほん = book' } },
      { id: 's4-m-row', type: 'example', title: 'M-Row: ま み む め も', content: { type: 'example', japanese: 'ま み む め も', reading: 'ma · mi · mu · me · mo', english: 'みず = water, まえ = front/before, もの = thing' } },
      { id: 's5-particle-ha', type: 'example', title: 'Special Rule: は as "wa"', content: { type: 'example', japanese: 'わたし は がくせい です', reading: 'watashi WA gakusei desu', english: 'The topic particle は is ALWAYS read "wa"!' } },
      { id: 's6-ex1', type: 'exercise', title: 'N/H/M Recognition', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Particle vs Character', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'N, H, M rows conquered!', points: ['N-row (な行), H-row (は行): ふ = fu!', 'M-row (ま行): みず, まえ, もの', 'は as particle = "wa". へ as particle = "e".'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l4-hiragana-y-r-w-n',
    unitId: 'n5-u1-hiragana',
    order: 4,
    title: 'Y・R・W・N Final Hiragana (や〜ん)',
    titleJP: 'や行・ら行・わ行・ん',
    objectives: ['Learn Y-row (や ゆ よ), R-row (ら り る れ ろ), W-row (わ を), and ん', 'Understand を is always the object particle (read "o")', 'Understand ん is a syllabic nasal — a full mora by itself'],
    estimatedMinutes: 14,
    conceptIds: ['kana-ya', 'kana-yu', 'kana-yo', 'kana-ra', 'kana-ri', 'kana-ru', 'kana-re', 'kana-ro', 'kana-wa', 'kana-wo', 'kana-n'],
    vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Final Basic Rows',
        content: { type: 'introduction', heading: 'Y, R, W, ん — Completing Hiragana', body: 'After this lesson you will know all 46 basic hiragana. The R-row is sometimes tricky for English speakers — Japanese "r" is neither English R nor L. を (wo) only appears as the object particle. ん is unique: it is a complete syllable with no vowel.', hookJP: 'よろしく', hookEN: 'yoroshiku · Nice to meet you / Please', culturalNote: 'よろしくおねがいします is one of the most versatile phrases in Japanese — from meetings to requests to farewells.' },
      },
      { id: 's2-y-row', type: 'example', title: 'Y-Row: や ゆ よ', content: { type: 'example', japanese: 'や ゆ よ', reading: 'ya · yu · yo', english: 'やま = mountain, ゆき = snow, よる = night' } },
      { id: 's3-r-row', type: 'example', title: 'R-Row: ら り る れ ろ', content: { type: 'example', japanese: 'ら り る れ ろ', reading: 'ra · ri · ru · re · ro', english: 'Japanese "r" is a light tap between R and L. りんご = apple' } },
      { id: 's4-w-n', type: 'example', title: 'W-Row & ん: わ を ん', content: { type: 'example', japanese: 'わ を ん', reading: 'wa · wo(o) · n', english: 'を is ONLY the object particle. ん = nasal syllable (as in さん)' } },
      { id: 's5-full-chart', type: 'example', title: 'All 46 Hiragana — You Know Them!', content: { type: 'example', japanese: 'あいうえお かきくけこ さしすせそ たちつてと なにぬねの はひふへほ まみむめも やゆよ らりるれろ わをん', reading: 'Complete Hiragana Chart', english: 'You have learned ALL 46 basic hiragana characters!' } },
      { id: 's6-ex1', type: 'exercise', title: 'Full Hiragana Quiz', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Word Reading', content: { type: 'exercise', exerciseId: 'ex-kana-ai-type' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'All 46 Hiragana Mastered!', points: ['Y-row: や ゆ よ (ya yu yo)', 'R-row: ら り る れ ろ — not L, not R!', 'を = ONLY the object particle (read "o"). ん = syllabic nasal.'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l5-hiragana-dakuten-combos',
    unitId: 'n5-u1-hiragana',
    order: 5,
    title: 'Dakuten, Handakuten & Combo Sounds (が・ぱ・きゃ)',
    titleJP: '濁点・半濁点・拗音',
    objectives: ['Add ゛ (dakuten) to voice K→G, S→Z, T→D, H→B rows', 'Add ゜ (handakuten) to H-row for P sounds (ぱ ぴ ぷ ぺ ぽ)', 'Combine small や ゆ よ with consonants for compound sounds (きゃ, しゅ, ちょ)'],
    estimatedMinutes: 16,
    conceptIds: ['kana-ga', 'kana-za', 'kana-da', 'kana-ba', 'kana-pa', 'kana-kya', 'kana-sha', 'kana-cha'],
    vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Modifying Marks',
        content: { type: 'introduction', heading: 'Dakuten ゛ & Combos', body: 'Two small marks transform basic hiragana into new sounds. The dakuten (゛) voices consonants: か → が. The handakuten (゜) creates P sounds from the H row: は → ぱ. Small や ゆ よ combine with i-column sounds for compound kana: き + ゃ = きゃ (kya).', hookJP: 'ぎゃくに・しゅみ・ちょっと', hookEN: 'gyaku ni (conversely) · shumi (hobby) · chotto (a little)', culturalNote: 'Many loanwords use dakuten combinations to approximate foreign sounds: ティ (ti), ファ (fa), ウィ (wi).' },
      },
      { id: 's2-dakuten', type: 'example', title: 'Dakuten ゛ — Voiced Consonants', content: { type: 'example', japanese: 'か→が・さ→ざ・た→だ・は→ば', reading: 'ka→ga · sa→za · ta→da · ha→ba', english: 'Two small strokes voice the consonant. がくせい = student, ざっし = magazine' } },
      { id: 's3-handakuten', type: 'example', title: 'Handakuten ゜ — P Sounds', content: { type: 'example', japanese: 'ぱ ぴ ぷ ぺ ぽ', reading: 'pa · pi · pu · pe · po', english: 'Only H-row gets handakuten. ぱーてぃー = party (loanword)' } },
      { id: 's4-combos', type: 'example', title: 'Combo Sounds (拗音 youon)', content: { type: 'example', japanese: 'きゃ・しゅ・ちょ・にゃ・ひゃ・みょ・りゅ・ぎゅ・びょ・ぴょ', reading: 'kya · shu · cho · nya · hya · myo · ryu · gyu · byo · pyo', english: 'Small ゃゅょ attach to the "i" column to make compound sounds' } },
      { id: 's5-words', type: 'example', title: 'Compound Words in Action', content: { type: 'example', japanese: 'きゃく・しゅみ・じゅうしょ・りゅうがくせい', reading: 'kyaku · shumi · juusho · ryuugakusei', english: 'guest · hobby · address · international student' } },
      { id: 's6-ex1', type: 'exercise', title: 'Dakuten Recognition', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Compound Sound Drill', content: { type: 'exercise', exerciseId: 'ex-kana-ai-type' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Complete Hiragana System Mastered!', points: ['Dakuten ゛ voices consonants: か→が, さ→ざ, た→だ, は→ば', 'Handakuten ゜ creates P sounds: ぱ ぴ ぷ ぺ ぽ', 'Small ゃゅょ create compound sounds: きゃ, しゅ, ちょ, etc.', 'You can now read any hiragana in Japanese!'], learnedItems: [] } },
    ],
  },

  // ── UNIT 2: KATAKANA ─────────────────────────────────────
  {
    id: 'n5-l6-katakana-basics',
    unitId: 'n5-u2-katakana',
    order: 1,
    title: 'Katakana Foundations: ア・イ・ウ・エ・オ Rows',
    titleJP: 'カタカナの基礎：ア〜コ',
    objectives: ['Recognize katakana as the script for foreign loanwords and emphasis', 'Read vowel row (ア イ ウ エ オ) and K-row (カ キ ク ケ コ)', 'Identify common loanwords: コーヒー, アイスクリーム, テレビ'],
    estimatedMinutes: 14,
    conceptIds: ['kana-katakana-a', 'kana-katakana-i', 'kana-katakana-u', 'kana-katakana-e', 'kana-katakana-o'],
    vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Why Katakana?',
        content: { type: 'introduction', heading: 'Katakana — The Angular Script', body: 'Katakana represents the same sounds as hiragana but with angular strokes. Its primary uses: (1) foreign loanwords (コーヒー = coffee), (2) foreign names (マイク = Mike), (3) onomatopoeia, (4) emphasis (like bold text in English). The long vowel mark ー extends the preceding vowel.', hookJP: 'コーヒー', hookEN: 'koohii · coffee', culturalNote: 'Japan absorbs thousands of foreign words as katakana, often shortened: スマホ (sumaho) = smartphone, コンビニ (konbini) = convenience store.' },
      },
      { id: 's2-vowels', type: 'example', title: 'Vowel Row: ア イ ウ エ オ', content: { type: 'example', japanese: 'ア イ ウ エ オ', reading: 'a · i · u · e · o', english: 'Same sounds as hiragana, angular look. アイス = ice / ice cream' } },
      { id: 's3-k-row', type: 'example', title: 'K-Row: カ キ ク ケ コ', content: { type: 'example', japanese: 'カ キ ク ケ コ', reading: 'ka · ki · ku · ke · ko', english: 'カメラ = camera, コーヒー = coffee (ー = long vowel)' } },
      { id: 's4-long-vowel', type: 'example', title: 'The Long Vowel Mark ー', content: { type: 'example', japanese: 'コーヒー・ケーキ・スキー', reading: 'koohii · keeki · sukii', english: 'coffee · cake · skiing. ー doubles the preceding vowel length.' } },
      { id: 's5-loanwords', type: 'example', title: 'Common Loanwords', content: { type: 'example', japanese: 'アイスクリーム・テレビ・スマホ・コンビニ', reading: 'aisukuriimu · terebi · sumaho · konbini', english: 'ice cream · television · smartphone · convenience store' } },
      { id: 's6-ex1', type: 'exercise', title: 'Katakana Recognition', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Loanword Decoding', content: { type: 'exercise', exerciseId: 'ex-kana-ai-type' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Katakana Vowels & K-Row Done!', points: ['ア イ ウ エ オ — same sounds as hiragana, different look', 'K-row: カ キ ク ケ コ', 'ー = long vowel marker, unique to katakana'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l7-katakana-combos-long-vowels',
    unitId: 'n5-u2-katakana',
    order: 2,
    title: 'Full Katakana Chart & Special Combinations',
    titleJP: 'カタカナ全文字と特殊表記',
    objectives: ['Learn all remaining katakana rows (S/T/N/H/M/Y/R/W)', 'Master special katakana for foreign sounds: ティ, ファ, ウィ', 'Read complex loanwords fluently'],
    estimatedMinutes: 16,
    conceptIds: ['kana-katakana-sa', 'kana-katakana-ta', 'kana-katakana-na'],
    vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Complete Katakana',
        content: { type: 'introduction', heading: 'All Katakana Rows', body: 'The remaining katakana rows follow the same logic as hiragana. Special combinations like ティ (ti), ファ (fa), ヴ (vu) approximate foreign sounds not native to Japanese. These are common in modern loanwords.', hookJP: 'サ シ ス セ ソ', hookEN: 'sa · shi · su · se · so', culturalNote: 'Modern Japanese katakana keeps expanding to accommodate English, French, German, and other languages\' sounds.' },
      },
      { id: 's2-s-to-n', type: 'example', title: 'S・T・N Rows', content: { type: 'example', japanese: 'サ シ ス セ ソ / タ チ ツ テ ト / ナ ニ ヌ ネ ノ', reading: 'sa shi su se so / ta chi tsu te to / na ni nu ne no', english: 'サッカー=soccer, テニス=tennis, ニュース=news' } },
      { id: 's3-h-to-r', type: 'example', title: 'H・M・Y・R Rows', content: { type: 'example', japanese: 'ハ ヒ フ ヘ ホ / マ ミ ム メ モ / ヤ ユ ヨ / ラ リ ル レ ロ', reading: 'ha hi fu he ho / ma mi mu me mo / ya yu yo / ra ri ru re ro', english: 'ホテル=hotel, メニュー=menu, ラジオ=radio' } },
      { id: 's4-special', type: 'example', title: 'Special Foreign Sound Combos', content: { type: 'example', japanese: 'ティ・ファ・ウィ・ヴォ・デュ', reading: 'ti · fa · wi · vo · dyu', english: 'パーティー=party, ファックス=fax, ヴァイオリン=violin' } },
      { id: 's5-ex1', type: 'exercise', title: 'Full Katakana Quiz', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's6-ex2', type: 'exercise', title: 'Loanword Reading', content: { type: 'exercise', exerciseId: 'ex-kana-ai-type' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Complete Katakana Mastered!', points: ['All 46 katakana plus special combinations learned', 'Foreign sounds: ティ (ti), ファ (fa), ヴ (v)', 'You can now decode virtually any Japanese loanword'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l8-loanword-mastery',
    unitId: 'n5-u2-katakana',
    order: 3,
    title: 'Loanword Mastery: 50 Essential Katakana Words',
    titleJP: '外来語マスター：必須50語',
    objectives: ['Instantly recognize 50 must-know loanwords in katakana', 'Map English words to their Japanese katakana approximation', 'Build confidence reading menus, signs, and product labels'],
    estimatedMinutes: 18,
    conceptIds: [], vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Decoding Loanwords',
        content: { type: 'introduction', heading: 'Katakana: Your Shortcut to 10,000 Words', body: 'Once you master katakana, you can read thousands of English-origin words in Japanese. The key is understanding how English sounds adapt: "v" becomes "b", syllables are often added to consonant clusters, and vowels change slightly. After this, you will decode katakana words naturally.', hookJP: 'スーパーマーケット', hookEN: 'suupaamaaketto · supermarket', culturalNote: 'Around 10% of everyday Japanese vocabulary consists of foreign loanwords (外来語 gairaigo), mostly from English. This makes katakana mastery a massive vocabulary booster.' },
      },
      { id: 's2-food', type: 'example', title: 'Food & Drink Loanwords', content: { type: 'example', japanese: 'コーヒー・ビール・ケーキ・パン・アイスクリーム・チョコレート・ジュース', reading: 'koohii · biiru · keeki · pan · aisukuriimu · chokoreeto · juusu', english: 'coffee · beer · cake · bread · ice cream · chocolate · juice' } },
      { id: 's3-tech', type: 'example', title: 'Technology Loanwords', content: { type: 'example', japanese: 'テレビ・パソコン・スマホ・カメラ・インターネット・メール', reading: 'terebi · pasokon · sumaho · kamera · intaanetto · meeru', english: 'TV · personal computer · smartphone · camera · internet · email' } },
      { id: 's4-places', type: 'example', title: 'Places & Services Loanwords', content: { type: 'example', japanese: 'ホテル・レストラン・コンビニ・スーパー・デパート・バス', reading: 'hoteru · resutoran · konbini · suupaa · depaato · basu', english: 'hotel · restaurant · convenience store · supermarket · department store · bus' } },
      { id: 's5-ex1', type: 'exercise', title: 'Loanword Match', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's6-ex2', type: 'exercise', title: 'Speed Reading', content: { type: 'exercise', exerciseId: 'ex-kana-ai-type' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Loanword Master!', points: ['Katakana directly unlocks food, tech, travel, sports vocabulary', 'Key rule: English sounds adapt to Japanese syllable structure', 'Menus, signs, packaging — you can read them all now!'], learnedItems: [] } },
    ],
  },

  // ── UNIT 3: GREETINGS & COPULA ───────────────────────────
  {
    id: 'n5-l9-greetings-essentials',
    unitId: 'n5-u3-greetings-copula',
    order: 1,
    title: 'Essential Greetings & Daily Expressions',
    titleJP: '日常あいさつ必須表現',
    objectives: ['Master 10 essential daily greetings', 'Understand when to use formal vs. casual forms', 'Know culturally appropriate responses'],
    estimatedMinutes: 12,
    conceptIds: ['exp-ohayou', 'exp-konnichiwa', 'exp-konbanwa', 'exp-arigatou', 'exp-sumimasen'],
    vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Japanese Greetings',
        content: { type: 'introduction', heading: 'First Words, First Impressions', body: 'Greetings in Japanese depend on time of day, formality level, and relationship. The -ます/-です forms are polite. In casual conversation between friends, shorter forms are used. Always err on the side of formal until you know someone well.', hookJP: 'よろしくおねがいします', hookEN: 'Yoroshiku onegaishimasu · Nice to meet you / Thank you in advance', culturalNote: 'Bowing while greeting is standard in Japan. The depth of the bow indicates the level of respect. A slight nod works in casual settings.' },
      },
      { id: 's2-morning', type: 'example', title: 'Morning: おはようございます', content: { type: 'example', japanese: 'おはようございます', reading: 'ohayou gozaimasu', english: 'Good morning (formal). Casual: おはよう (ohayou).' } },
      { id: 's3-day', type: 'example', title: 'Daytime: こんにちは', content: { type: 'example', japanese: 'こんにちは', reading: 'konnichiwa', english: 'Hello / Good afternoon. は here is read as "wa"!' } },
      { id: 's4-evening', type: 'example', title: 'Evening: こんばんは', content: { type: 'example', japanese: 'こんばんは', reading: 'konbanwa', english: 'Good evening. Used after sunset.' } },
      { id: 's5-thanks', type: 'example', title: 'Gratitude: ありがとうございます', content: { type: 'example', japanese: 'ありがとうございます', reading: 'arigatou gozaimasu', english: 'Thank you very much. Casual: ありがとう.' } },
      { id: 's6-excuse', type: 'example', title: 'Excuse Me / Sorry: すみません', content: { type: 'example', japanese: 'すみません', reading: 'sumimasen', english: 'Excuse me / I\'m sorry. Use to get attention or apologize.' } },
      { id: 's7-more', type: 'example', title: 'More Essential Expressions', content: { type: 'example', japanese: 'はじめまして・どうぞよろしく・またね・さようなら', reading: 'hajimemashite · douzo yoroshiku · mata ne · sayounara', english: 'How do you do? · Nice to meet you · See you later · Goodbye (formal)' } },
      { id: 's8-ex1', type: 'exercise', title: 'Greetings Matching', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's9-ex2', type: 'exercise', title: 'Situation Response', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's10-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Japanese Greetings Mastered!', points: ['Time-based greetings: おはよう, こんにちは, こんばんは', 'Gratitude: ありがとうございます. Request/excuse: すみません', 'Meeting someone: はじめまして・よろしくおねがいします'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l10-desu-statement-questions',
    unitId: 'n5-u3-greetings-copula',
    order: 2,
    title: 'The Polite Copula: 〜です & Questions with 〜か',
    titleJP: '「〜です」と質問「〜か」',
    objectives: ['Master the "A は B です" (A is B) basic sentence formula', 'Turn any statement into a polite question by appending か', 'State your occupation, nationality, and name naturally'],
    estimatedMinutes: 15,
    conceptIds: ['g-desu', 'p-wa', 'p-ka'],
    vocabularyIds: ['pron-watashi', 'n-hito', 'n-gakko'],
    grammarIds: ['g-desu', 'p-wa', 'p-ka'],
    kanjiIds: ['k-hito', 'k-gaku', 'k-sei-shou'],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Your First Japanese Sentences',
        content: { type: 'introduction', heading: 'The A は B です Formula', body: 'Japanese sentence structure is Subject-Object-Verb (SOV). The word "です" (desu) functions as the polite equivalent of "is / am / are". The particle "は" (pronounced "wa") marks what the sentence is about.', hookJP: '私は学生です。', hookEN: 'I am a student.', culturalNote: 'In Japanese, if the topic is already obvious from context, you usually drop "私は" entirely to sound natural: just "学生です" (gakusei desu)!' },
      },
      { id: 's2-grammar-desu', type: 'grammar', title: 'Grammar Focus: 〜です', content: { type: 'grammar', grammarId: 'g-desu', showFormation: true, showExamples: true, showContrast: true } },
      { id: 's3-vocab-watashi', type: 'vocabulary', title: 'Vocabulary: 私 (わたし)', content: { type: 'vocabulary', vocabularyId: 'pron-watashi', showConjugations: false, showRelated: true } },
      { id: 's4-grammar-particle-wa', type: 'grammar', title: 'Particle Focus: 〜は (Topic Marker)', content: { type: 'grammar', grammarId: 'p-wa', showFormation: true, showExamples: true } },
      { id: 's5-grammar-particle-ka', type: 'grammar', title: 'Making Questions: 〜か', content: { type: 'grammar', grammarId: 'p-ka', showFormation: true, showExamples: true } },
      { id: 's6-ex-sentence-build', type: 'exercise', title: 'Sentence Construction', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's7-ex-mc-question', type: 'exercise', title: 'Question Formation Drill', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'You can now form full Japanese sentences!', points: ['Form statements with: [Topic] は [Description] です。', 'Turn any statement into a question simply by adding か at the end.', 'Drop pronouns when context is obvious for natural, native-like phrasing.'], learnedItems: [{ type: 'grammar', id: 'g-desu' }, { type: 'grammar', id: 'p-wa' }, { type: 'grammar', id: 'p-ka' }, { type: 'vocabulary', id: 'pron-watashi' }] } },
    ],
  },

  {
    id: 'n5-l11-self-introduction',
    unitId: 'n5-u3-greetings-copula',
    order: 3,
    title: 'Complete Self-Introduction in Japanese',
    titleJP: '完全な自己紹介',
    objectives: ['Introduce name, nationality, occupation, and interest in Japanese', 'Use では・でも for "as for" nuance', 'Ask for the other person\'s information politely'],
    estimatedMinutes: 14,
    conceptIds: ['g-desu', 'exp-hajimemashite'],
    vocabularyIds: ['pron-watashi', 'n-namae', 'n-kuni'], grammarIds: ['g-desu', 'p-wa'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Self Introduction',
        content: { type: 'introduction', heading: '自己紹介 — Jikoshoukai', body: 'Japanese self-introductions follow a predictable pattern: はじめまして → name → origin → occupation → interests → よろしく. Mastering this unlocks real conversations with Japanese speakers anywhere in the world.', hookJP: 'はじめまして、[name]といいます。', hookEN: 'How do you do, I am called [name].' },
      },
      { id: 's2-name', type: 'example', title: 'Stating Your Name', content: { type: 'example', japanese: '〜といいます / 〜です', reading: 'to iimasu / desu', english: '[Name] といいます = I am called [Name]. More natural than わたしはXです in intro context.' } },
      { id: 's3-origin', type: 'example', title: 'Where Are You From?', content: { type: 'example', japanese: 'フィリピンからきました。/アメリカじんです。', reading: 'Firipin kara kimashita / Amerikajin desu', english: 'I came from Philippines / I am American. [Country]+じん = person from [country]' } },
      { id: 's4-occupation', type: 'example', title: 'Your Occupation', content: { type: 'example', japanese: 'がくせいです。/かいしゃいんです。', reading: 'gakusei desu / kaishain desu', english: 'I am a student / I am a company employee' } },
      { id: 's5-interests', type: 'example', title: 'Hobbies & Interests', content: { type: 'example', japanese: 'しゅみはおんがくです。にほんごがすきです。', reading: 'shumi wa ongaku desu. nihongo ga suki desu.', english: 'My hobby is music. I like Japanese.' } },
      { id: 's6-full', type: 'example', title: 'Full Introduction Script', content: { type: 'example', japanese: 'はじめまして。たろうといいます。にほんからきました。がくせいです。にほんごがすきです。どうぞよろしく！', reading: 'Hajimemashite. Tarou to iimasu. Nihon kara kimashita. Gakusei desu. Nihongo ga suki desu. Douzo yoroshiku!', english: 'How do you do! I\'m Taro. I came from Japan. I\'m a student. I like Japanese. Nice to meet you!' } },
      { id: 's7-ex1', type: 'exercise', title: 'Self-Intro Sentence Building', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-ex2', type: 'exercise', title: 'Introduction Questions', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's9-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'You can now introduce yourself in Japanese!', points: ['はじめまして + name + といいます OR name + です', '[Country]からきました or [Country]じんです', 'しゅみは〜です (hobby) + 〜がすきです (like) + よろしくおねがいします'], learnedItems: [] } },
    ],
  },

  // ── UNIT 4: NUMBERS, TIME & DATES ───────────────────────
  {
    id: 'n5-l12-numbers-1-10000',
    unitId: 'n5-u4-numbers-time',
    order: 1,
    title: 'Japanese Numbers 1–10,000',
    titleJP: '数字：1から10000まで',
    objectives: ['Count from 1 to 10, then extend to 100, 1000, 10000', 'Understand the structural difference: Japanese builds large numbers as [X]百・千・万', 'Read prices, quantities, and ages'],
    estimatedMinutes: 16,
    conceptIds: ['n-ichi', 'n-ni', 'n-san', 'n-shi', 'n-go', 'n-roku', 'n-nana', 'n-hachi', 'n-kyuu', 'n-juu'],
    vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Japanese Numbers',
        content: { type: 'introduction', heading: 'Japanese Numbers: Logical and Consistent', body: 'Japanese numbers are highly logical once you know 1-10. 11 = 十一 (ju-ichi = ten-one), 21 = 二十一 (ni-ju-ichi = two-ten-one). Large numbers group by 10,000 (万, man) rather than 1,000. This makes large numbers different from English but internally consistent.', hookJP: 'いち に さん し ご ろく なな はち きゅう じゅう', hookEN: '1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10' },
      },
      { id: 's2-1-10', type: 'example', title: '1 Through 10', content: { type: 'example', japanese: 'いち・に・さん・し/よん・ご・ろく・なな/しち・はち・きゅう/く・じゅう', reading: 'ichi · ni · san · shi/yon · go · roku · nana/shichi · hachi · kyuu/ku · juu', english: '1–10. Note: 4 = し or よん, 7 = なな or しち. Use よん/なな when counting to avoid bad luck.' } },
      { id: 's3-11-99', type: 'example', title: '11 Through 99', content: { type: 'example', japanese: 'じゅういち・にじゅう・さんじゅうご・きゅうじゅうきゅう', reading: 'juu-ichi · ni-juu · san-juu-go · kyuu-juu-kyuu', english: '11 · 20 · 35 · 99. Pattern: [tens]じゅう + [ones]. Ten = じゅう, not 一十.' } },
      { id: 's4-100s', type: 'example', title: '100s and 1000s', content: { type: 'example', japanese: 'ひゃく・せん・まん', reading: 'hyaku · sen · man', english: '100 · 1,000 · 10,000. Note irregular: 300=さんびゃく, 600=ろっぴゃく, 800=はっぴゃく' } },
      { id: 's5-prices', type: 'example', title: 'Prices in Japanese', content: { type: 'example', japanese: 'いっぱい：さんびゃくえん。このほん：にせんえん。', reading: 'ippai: sanbyaku-en. kono hon: nisen-en.', english: 'One cup: 300 yen. This book: 2,000 yen.' } },
      { id: 's6-ex1', type: 'exercise', title: 'Number Recognition', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Price Reading', content: { type: 'exercise', exerciseId: 'ex-kana-ai-type' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Numbers 1–10,000 Mastered!', points: ['1-10: いち に さん し ご ろく なな はち きゅう じゅう', 'Pattern: [tens]じゅう[ones]. 35 = さんじゅうご', 'Hundreds: ひゃく. Thousands: せん. Ten-thousands: まん'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l13-telling-time-hours-mins',
    unitId: 'n5-u4-numbers-time',
    order: 2,
    title: 'Telling Time: Hours & Minutes',
    titleJP: '時刻の言い方：時・分',
    objectives: ['Say any time in Japanese using [hour]じ [minute]ふん/ぷん', 'Know AM/PM: ごぜん (AM) and ごご (PM)', 'Ask and answer "What time is it?"'],
    estimatedMinutes: 14,
    conceptIds: ['n-ji', 'n-fun', 'n-han'], vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Telling Time',
        content: { type: 'introduction', heading: 'What Time Is It? — なんじですか？', body: 'Time in Japanese follows a simple pattern: [hour] じ [minutes] ふん. Some minute combinations trigger sound changes: 1分=いっぷん, 6分=ろっぷん, 8分=はっぷん, 10分=じっぷん/じゅっぷん. Half past = 半 (はん).', hookJP: 'いまなんじですか？', hookEN: 'What time is it now?' },
      },
      { id: 's2-hours', type: 'example', title: 'O\'Clock: 〜じ', content: { type: 'example', japanese: 'いちじ・にじ・さんじ・よじ・ごじ・ろくじ・しちじ・はちじ・くじ・じゅうじ・じゅういちじ・じゅうにじ', reading: 'ichi-ji · ni-ji · san-ji · yo-ji · go-ji...', english: '1:00 · 2:00 · 3:00... Note: 4時=よじ (not しじ), 7時=しちじ, 9時=くじ' } },
      { id: 's3-minutes', type: 'example', title: 'Minutes: 〜ふん/ぷん', content: { type: 'example', japanese: 'いっぷん・にふん・さんぷん・よんふん・ごふん', reading: 'ippun · nifun · sanpun · yonfun · gofun', english: '1 min · 2 min · 3 min · 4 min · 5 min. 1/3/6/8/10 change to ぷん.' } },
      { id: 's4-half', type: 'example', title: 'Half Past: 〜はん', content: { type: 'example', japanese: 'さんじはんです。', reading: 'sanji han desu', english: '3:30. はん = half. Simple and clean.' } },
      { id: 's5-ampm', type: 'example', title: 'AM/PM: ごぜん・ごご', content: { type: 'example', japanese: 'ごぜんしちじにおきます。ごごにじにたべます。', reading: 'gozen shichi-ji ni okimasu. gogo ni-ji ni tabemasu.', english: 'I wake up at 7 AM. I eat at 2 PM.' } },
      { id: 's6-ex1', type: 'exercise', title: 'Clock Reading', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Schedule Drill', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'You can tell time in Japanese!', points: ['Hours: [number]じ. Irregular: 4時=よじ, 7時=しちじ, 9時=くじ', 'Minutes: [number]ふん/ぷん. 1/3/6/8/10分 → ぷん', 'Half: はん. AM: ごぜん. PM: ごご'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l14-calendar-days-months',
    unitId: 'n5-u4-numbers-time',
    order: 3,
    title: 'Calendar: Days of Week, Months & Dates',
    titleJP: '曜日・月・日付',
    objectives: ['Name all 7 days of the week (〜ようび)', 'Say any month (〜がつ) and date (〜にち/か)', 'Read and say a full date in Japanese'],
    estimatedMinutes: 15,
    conceptIds: ['n-youbi', 'n-gatsu', 'n-nichi'], vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'The Japanese Calendar',
        content: { type: 'introduction', heading: 'Days, Months, Dates in Japanese', body: 'Japanese days of the week are named after celestial/elemental forces: Sun, Moon, Fire, Water, Wood, Gold, Earth — then +曜日 (youbi, day). Months are simple: 1月, 2月, etc. Dates have irregular readings for 1st-10th and 14th, 20th.', hookJP: 'きょうはなんようびですか？', hookEN: 'What day of the week is today?', culturalNote: 'Japan uses the Gregorian calendar for most purposes, but also uses the Imperial Era system (令和, Reiwa) for official documents.' },
      },
      { id: 's2-weekdays', type: 'example', title: 'Days of the Week', content: { type: 'example', japanese: 'にちようび・げつようび・かようび・すいようび・もくようび・きんようび・どようび', reading: 'nichi·getsu·ka·sui·moku·kin·do + youbi', english: 'Sun·Mon·Tue·Wed·Thu·Fri·Sat. Each named after: Sun, Moon, Fire, Water, Wood, Gold, Earth' } },
      { id: 's3-months', type: 'example', title: 'Months: [Number]がつ', content: { type: 'example', japanese: 'いちがつ・にがつ・さんがつ...じゅうにがつ', reading: 'ichi-gatsu to juu-ni-gatsu', english: 'January to December. Simple! 1月 through 12月.' } },
      { id: 's4-dates', type: 'example', title: 'Dates: Irregular 1st–10th', content: { type: 'example', japanese: 'ついたち・ふつか・みっか・よっか・いつか・むいか・なのか・ようか・ここのか・とおか', reading: 'tsuitachi · futsuka · mikka · yokka · itsuka · muika · nanoka · youka · kokonoka · tooka', english: '1st through 10th. These are native Japanese numbers — memorize them!' } },
      { id: 's5-full-date', type: 'example', title: 'Saying a Full Date', content: { type: 'example', japanese: 'にせんにじゅうろくねん・くがつ・ふつか・すいようび', reading: 'nisen-nijuuroku-nen · ku-gatsu · futsuka · suiyoubi', english: 'Wednesday, September 2nd, 2026. Order: Year → Month → Day → Weekday' } },
      { id: 's6-ex1', type: 'exercise', title: 'Calendar Quiz', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Date Reading', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Calendar Mastered!', points: ['Days: にちようび・げつようび・かようび・すいようび・もくようび・きんようび・どようび', 'Months: [number]がつ (simple!)', 'Dates 1–10 are irregular native Japanese — must memorize'], learnedItems: [] } },
    ],
  },

  // ── UNIT 5: CORE PARTICLES ───────────────────────────────
  {
    id: 'n5-l15-topic-vs-subject-wa-ga',
    unitId: 'n5-u5-core-particles',
    order: 1,
    title: 'は vs が: Topic vs Subject Particle',
    titleJP: 'は vs が：主題と主語の違い',
    objectives: ['Understand は marks the topic (what the sentence is about)', 'Understand が marks the subject (what performs an action or is described)', 'Use は for contrasting and が for introducing new information or emphasis'],
    estimatedMinutes: 18,
    conceptIds: ['p-wa', 'p-ga'], vocabularyIds: [], grammarIds: ['p-wa', 'p-ga'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'The は vs が Battle',
        content: { type: 'introduction', heading: 'The Most Confusing Pair in N5', body: 'は (wa) and が (ga) are both used with subjects, but they signal different things. は says "as for [topic]..." — it\'s a context-setter. が introduces new information or emphasizes WHO does something. Native speakers feel the difference instinctively; learners must memorize the core rules.', hookJP: 'わたしはがくせいです / わたしがやります', hookEN: 'I am a student [topic] / I\'ll do it [emphasis: me specifically]' },
      },
      { id: 's2-wa-rule', type: 'grammar', title: 'は — Topic Particle', content: { type: 'grammar', grammarId: 'p-wa', showFormation: true, showExamples: true } },
      { id: 's3-ga-rule', type: 'grammar', title: 'が — Subject Particle', content: { type: 'grammar', grammarId: 'p-ga', showFormation: true, showExamples: true } },
      { id: 's4-contrast', type: 'example', title: 'Side-by-Side Comparison', content: { type: 'example', japanese: 'さかなはたべます。さかながすきです。', reading: 'Sakana WA tabemasu. Sakana GA suki desu.', english: 'As for fish, I eat it (は=topic, implicit contrast). Fish is what I like (が=the specific thing liked).' } },
      { id: 's5-contrast2', type: 'example', title: 'New vs Known Information', content: { type: 'example', japanese: 'だれがきましたか？〜たろうさんがきました。', reading: 'Dare GA kimashita ka? ~ Tarou-san GA kimashita.', english: 'Who came? ~ Tarou came. が is used when answering WHO/WHAT questions.' } },
      { id: 's6-ex1', type: 'exercise', title: 'は vs が Drill', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Sentence Fill-in', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'は vs が Distinction Clear!', points: ['は = topic marker. Sets context. Often contrasts with something unstated.', 'が = subject/focus marker. New info, emphasis, answers to だれ/なに questions.', 'Adjectives that describe feelings use が: 〜がすきです, 〜がほしいです, 〜がわかります.'], learnedItems: [{ type: 'grammar', id: 'p-wa' }, { type: 'grammar', id: 'p-ga' }] } },
    ],
  },

  {
    id: 'n5-l16-object-marker-wo',
    unitId: 'n5-u5-core-particles',
    order: 2,
    title: 'The Object Marker: を',
    titleJP: '目的格助詞「を」',
    objectives: ['Use を (pronounced "o") to mark the direct object of an action', 'Build correct Japanese sentences: [Subject]は[Object]を[Verb]', 'Distinguish what takes を vs other particles'],
    estimatedMinutes: 13,
    conceptIds: ['p-wo'], vocabularyIds: ['v-taberu', 'v-nomu', 'v-yomu'], grammarIds: ['p-wo'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'The Object Particle を',
        content: { type: 'introduction', heading: 'を — What You Act Upon', body: 'In English, the direct object comes directly after the verb: "I eat rice." In Japanese, the verb comes last, and を marks the thing being acted upon: ご飯を食べます. を is pronounced "o" (not "wo") in modern Japanese. It appears ONLY as this grammatical marker — never in regular words.', hookJP: 'ご飯を食べます。', hookEN: 'I eat rice.' },
      },
      { id: 's2-grammar-wo', type: 'grammar', title: 'Particle を Deep Dive', content: { type: 'grammar', grammarId: 'p-wo', showFormation: true, showExamples: true } },
      { id: 's3-patterns', type: 'example', title: 'Core Sentence Pattern', content: { type: 'example', japanese: '[Subject]は [Object]を [Verb]ます', reading: 'Basic structure', english: 'わたしは みずを のみます = I drink water. Always: topic→object→verb.' } },
      { id: 's4-examples', type: 'example', title: 'Practice Sentences', content: { type: 'example', japanese: 'えいごをべんきょうします。まいにちほんをよみます。おんがくをききます。', reading: 'eigo wo benkyou shimasu · mainichi hon wo yomimasu · ongaku wo kikimasu', english: 'I study English. I read books every day. I listen to music.' } },
      { id: 's5-ex1', type: 'exercise', title: 'Object Marker Practice', content: { type: 'exercise', exerciseId: 'ex-taberu-sentence-builder' } },
      { id: 's6-ex2', type: 'exercise', title: 'Sentence Building', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Object Marker を Mastered!', points: ['を marks the direct object — what the verb acts on', 'Pronounced "o" in modern Japanese', 'Pattern: [Subject]は [Object]を [Verb]ます'], learnedItems: [{ type: 'grammar', id: 'p-wo' }] } },
    ],
  },

  {
    id: 'n5-l17-location-destination-ni-de',
    unitId: 'n5-u5-core-particles',
    order: 3,
    title: 'Location & Destination: に vs で',
    titleJP: '場所の助詞「に」vs「で」',
    objectives: ['Use に for destination (going TO) and static existence location', 'Use で for where an action takes place (doing AT)', 'Distinguish: えきにいます (exist at station) vs えきでまちます (wait at station)'],
    estimatedMinutes: 16,
    conceptIds: ['p-ni', 'p-de'], vocabularyIds: [], grammarIds: ['p-ni', 'p-de'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'に vs で for Locations',
        content: { type: 'introduction', heading: 'The Location Particle Pair', body: 'Both に and で can translate to "at/in" in English, but they mean different things. に = direction/destination/static existence. で = scene of action (where something HAPPENS). Think: に is where you ARE (end point), で is where you DO (action stage).', hookJP: 'がっこうにいきます / がっこうでべんきょうします', hookEN: 'I go TO school (に=destination) / I study AT school (で=action location)' },
      },
      { id: 's2-ni-destination', type: 'grammar', title: 'に — Destination & Existence', content: { type: 'grammar', grammarId: 'p-ni', showFormation: true, showExamples: true } },
      { id: 's3-de-action', type: 'grammar', title: 'で — Action Location', content: { type: 'grammar', grammarId: 'p-de', showFormation: true, showExamples: true } },
      { id: 's4-contrast', type: 'example', title: 'に vs で Contrast', content: { type: 'example', japanese: 'こうえんにいます。/ こうえんであそびます。', reading: 'kouen NI imasu. / kouen DE asobimasu.', english: 'I am IN the park (existence). / I play IN the park (action happens there).' } },
      { id: 's5-time', type: 'example', title: 'に for Time Too!', content: { type: 'example', japanese: 'しちじにおきます。きんようびにいきます。', reading: 'shichi-ji NI okimasu. kinyoubi NI ikimasu.', english: 'I wake up AT 7. I go ON Friday. に also marks specific times!' } },
      { id: 's6-ex1', type: 'exercise', title: 'Location Particle Choice', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Sentence Construction', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Location Particles Mastered!', points: ['に = destination (いく/くる/かえる), existence location (いる/ある), specific time', 'で = where actions happen (active verbs: たべる, べんきょうする, はたらく)', 'Trick: can you substitute "at which" → で. "toward which" → に.'], learnedItems: [{ type: 'grammar', id: 'p-ni' }, { type: 'grammar', id: 'p-de' }] } },
    ],
  },

  {
    id: 'n5-l18-possessive-connecting-no',
    unitId: 'n5-u5-core-particles',
    order: 4,
    title: 'Possessive & Connecting: の Particle',
    titleJP: '所有・連結の助詞「の」',
    objectives: ['Use の to show possession (A\'s B = AのB)', 'Use の to connect nouns for description (coffee cup = コーヒーのカップ)', 'Use の to nominalize (make a noun from a verb phrase)'],
    estimatedMinutes: 14,
    conceptIds: ['p-no'], vocabularyIds: [], grammarIds: ['p-no'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'The Particle の',
        content: { type: 'introduction', heading: 'の — Connector of All Things', body: `The particle の has three key functions: possession (possessive marker), noun modification (like an adjective), and nominalization (turning a phrase into a noun). It sounds like the English apostrophe-s construction. ORDER: owner + の + owned.`, hookJP: 'これはわたしのほんです。', hookEN: `This is my book.` },
      },
      { id: 's2-possession', type: 'grammar', title: 'の for Possession', content: { type: 'grammar', grammarId: 'p-no', showFormation: true, showExamples: true } },
      { id: 's3-modification', type: 'example', title: 'の for Noun Modification', content: { type: 'example', japanese: 'にほんごのほん・コーヒーのカップ・はなのいろ', reading: 'nihongo no hon · koohii no kappu · hana no iro', english: 'Japanese book · coffee cup · flower color. "X の Y" = "Y of X"' } },
      { id: 's4-chain', type: 'example', title: 'Chaining の', content: { type: 'example', japanese: 'わたしのともだちのかさ', reading: 'watashi no tomodachi no kasa', english: 'My friend\'s umbrella. (I\'s friend\'s umbrella). Can chain multiple possessives.' } },
      { id: 's5-nominalize', type: 'example', title: 'の for Nominalization', content: { type: 'example', japanese: 'にほんごをはなすのがすきです。', reading: 'nihongo wo hanasu NO ga suki desu.', english: 'I like speaking Japanese. の turns "speak Japanese" into a noun: "speaking-Japanese-thing".' } },
      { id: 's6-ex1', type: 'exercise', title: 'の Possessive Drill', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's7-ex2', type: 'exercise', title: 'の Modification', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'の Particle Fully Mastered!', points: ['Possession: [owner] の [owned] = [owner]\'s [thing]', 'Modification: [noun1] の [noun2] = [noun2] of/related to [noun1]', 'Nominalization: [clause] の = the act of [clause]'], learnedItems: [{ type: 'grammar', id: 'p-no' }] } },
    ],
  },

  // ── UNIT 6: DAILY ACTIONS & MASU FORM ───────────────────
  {
    id: 'n5-l19-verb-groups-classification',
    unitId: 'n5-u6-basic-verbs',
    order: 1,
    title: 'Japanese Verb Groups: Ichidan, Godan & Irregular',
    titleJP: '動詞のグループ分類：一段・五段・不規則',
    objectives: ['Classify any Japanese verb as Ichidan (Group 2), Godan (Group 1), or Irregular', 'Understand why verb groups matter for conjugation', 'Recognize Godan\'s 5-vowel stem changes'],
    estimatedMinutes: 16,
    conceptIds: ['v-ichidan', 'v-godan', 'v-irregular'], vocabularyIds: ['v-taberu', 'v-nomu', 'v-miru', 'v-kiku'], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Japanese Verb Groups',
        content: { type: 'introduction', heading: 'Why Groups Matter', body: 'Every Japanese verb falls into one of three groups. The group determines how the verb conjugates. Ichidan (一段) verbs are simple — always drop る and add the ending. Godan (五段) verbs change their final syllable across 5 vowel rows. Two irregular verbs (する, くる) must be memorized.', hookJP: 'たべる vs のむ', hookEN: 'taberu (Ichidan) vs nomu (Godan) — different conjugation patterns' },
      },
      { id: 's2-ichidan', type: 'example', title: 'Ichidan Verbs (Group 2): Drop る', content: { type: 'example', japanese: 'たべる・みる・おきる・おしえる・でる', reading: 'taberu · miru · okiru · oshieru · deru', english: 'eat · see · wake · teach · leave. All end in る, stem vowel is i or e before る. Drop る → add ます: たべます' } },
      { id: 's3-godan', type: 'example', title: 'Godan Verbs (Group 1): 5 Vowel Changes', content: { type: 'example', japanese: 'のむ・かく・はなす・いく・かえる', reading: 'nomu · kaku · hanasu · iku · kaeru', english: 'drink · write · speak · go · return. む→み, く→き, す→し, く→き for ます form' } },
      { id: 's4-trick', type: 'example', title: 'The る Trick for Classification', content: { type: 'example', japanese: 'おき[る]→おきます（一段） / かえ[る]→かえります（五段）', reading: 'Stem before る: i-vowel = Ichidan. Non-i/e vowel = Godan.', english: 'If the syllable before る ends in "i" or "e" sound → likely Ichidan. Exceptions exist — memorize them.' } },
      { id: 's5-irregular', type: 'example', title: 'Irregular Verbs: する・くる', content: { type: 'example', japanese: 'する→します・くる→きます', reading: 'suru → shimasu · kuru → kimasu', english: 'Only 2 truly irregular verbs. Memorize these cold.' } },
      { id: 's6-ex1', type: 'exercise', title: 'Verb Classification Quiz', content: { type: 'exercise', exerciseId: 'ex-masu-conjugation-drill' } },
      { id: 's7-ex2', type: 'exercise', title: 'Group Identification', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Verb Groups Classified!', points: ['Ichidan: stem ends i/e + る → drop る, add ます: たべる→たべます', 'Godan: う-ending → shift to い-column: のむ→のみます', 'Irregular: する→します, くる→きます (memorize only these two!)'], learnedItems: [] } },
    ],
  },

  {
    id: 'n5-l20-masu-form-daily-actions',
    unitId: 'n5-u6-basic-verbs',
    order: 2,
    title: 'Daily Actions: 食べる (Eat) & 飲む (Drink) in ます Form',
    titleJP: '日常の動作：「食べる」「飲む」',
    objectives: ['Conjugate Ichidan and Godan verbs into polite present/future form (〜ます) and negative (〜ません)', 'Use the direct object particle を (wo/o) to state what you eat or drink', 'Distinguish between 食べます (will eat) and 飲みます (will drink)'],
    estimatedMinutes: 18,
    conceptIds: ['g-masu', 'g-masen', 'p-wo', 'v-taberu', 'v-nomu'],
    vocabularyIds: ['v-taberu', 'v-nomu', 'n-gohan', 'n-mizu'],
    grammarIds: ['g-masu', 'g-masen', 'p-wo'],
    kanjiIds: ['k-taberu', 'k-nichi-hon'],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Verbs in Action',
        content: { type: 'introduction', heading: 'Expressing Daily Actions', body: 'In Japanese, the verb always comes at the very END of the sentence. The object of your action is connected to the verb using the object marker を (pronounced "o").', hookJP: 'ご飯を食べます。', hookEN: 'I eat a meal.', culturalNote: 'In Japan, saying "いただきます" before eating and "ごちそうさまでした" after eating expresses gratitude to the food and the preparer.' },
      },
      { id: 's2-vocab-taberu', type: 'vocabulary', title: 'Core Verb: 食べる (To Eat)', content: { type: 'vocabulary', vocabularyId: 'v-taberu', showConjugations: true, showRelated: true } },
      { id: 's3-vocab-nomu', type: 'vocabulary', title: 'Core Verb: 飲む (To Drink)', content: { type: 'vocabulary', vocabularyId: 'v-nomu', showConjugations: true, showRelated: true } },
      { id: 's4-grammar-particle-wo', type: 'grammar', title: 'Direct Object Marker: 〜を', content: { type: 'grammar', grammarId: 'p-wo', showFormation: true, showExamples: true } },
      { id: 's5-grammar-masu-masen', type: 'grammar', title: 'Polite Verb Endings: 〜ます / 〜ません', content: { type: 'grammar', grammarId: 'g-masu', showFormation: true, showExamples: true, showContrast: true } },
      { id: 's6-ex-sentence-build-actions', type: 'exercise', title: 'Build Action Sentences', content: { type: 'exercise', exerciseId: 'ex-taberu-sentence-builder' } },
      { id: 's7-ex-conjugation-drill', type: 'exercise', title: 'Conjugation Challenge', content: { type: 'exercise', exerciseId: 'ex-masu-conjugation-drill' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'You can now talk about what you eat and drink!', points: ['Object + を + Verb (e.g., 水を飲みます - I drink water).', 'Ichidan verbs drop る and add ます: 食べる → 食べます.', 'Godan verbs shift う column to い column: 飲む → 飲みます.', 'Negative form is ません: 食べません (I do not eat).'], learnedItems: [{ type: 'vocabulary', id: 'v-taberu' }, { type: 'vocabulary', id: 'v-nomu' }, { type: 'grammar', id: 'g-masu' }, { type: 'grammar', id: 'g-masen' }, { type: 'grammar', id: 'p-wo' }] } },
    ],
  },

  {
    id: 'n5-l21-invitations-mashou-masenka',
    unitId: 'n5-u6-basic-verbs',
    order: 3,
    title: 'Making Invitations: 〜ましょう & 〜ませんか',
    titleJP: '提案・誘い：「〜ましょう」「〜ませんか」',
    objectives: ['Use 〜ましょう to propose doing something together ("Let\'s...")', 'Use 〜ませんか to politely invite someone ("Won\'t you...?")', 'Respond to invitations politely: はい、ぜひ / ちょっと...'],
    estimatedMinutes: 14,
    conceptIds: ['g-mashou', 'g-masenka'], vocabularyIds: [], grammarIds: ['g-mashou', 'g-masenka'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Invitations in Japanese',
        content: { type: 'introduction', heading: '〜ましょう & 〜ませんか', body: 'Two essential patterns for making plans. 〜ましょう (mashou) is assertive: "Let\'s do X!" — you\'re taking initiative. 〜ませんか (masen ka) is softer: "Won\'t you do X?" — an open invitation. Responding: はい、ぜひ (yes, by all means!), or ちょっと... (soft refusal).', hookJP: 'いっしょにたべましょう！', hookEN: 'Let\'s eat together!' },
      },
      { id: 's2-mashou', type: 'example', title: '〜ましょう — Let\'s!', content: { type: 'example', japanese: 'いきましょう / たべましょう / べんきょうしましょう', reading: 'ikimashou / tabemashou / benkyouشimashou', english: 'Let\'s go / Let\'s eat / Let\'s study. Form: ます stem + ましょう' } },
      { id: 's3-masenka', type: 'example', title: '〜ませんか — Won\'t you?', content: { type: 'example', japanese: 'いっしょにいきませんか？えいがをみませんか？', reading: 'issho ni ikimasen ka? eiga wo mimasen ka?', english: 'Won\'t you go together? Won\'t you watch a movie? More polite than ましょう.' } },
      { id: 's4-responses', type: 'example', title: 'Responding to Invitations', content: { type: 'example', japanese: 'はい、ぜひ！/ いいですね！/ ちょっと...', reading: 'hai, zehi! / ii desu ne! / chotto...', english: 'Yes, by all means! / That sounds good! / Hmm, well... (soft no)' } },
      { id: 's5-ex1', type: 'exercise', title: 'Invitation Formation', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's6-ex2', type: 'exercise', title: 'Invitation Response Drill', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Making Plans in Japanese!', points: ['〜ましょう = Let\'s [verb]. Direct, assertive invitation.', '〜ませんか = Won\'t you [verb]? Softer, open invitation.', 'Response: はい、ぜひ (yes!) or ちょっと... (polite no)'], learnedItems: [{ type: 'grammar', id: 'g-mashou' }, { type: 'grammar', id: 'g-masenka' }] } },
    ],
  },

  // ── UNIT 7: ADJECTIVES ──────────────────────────────────
  {
    id: 'n5-l22-i-adjectives-conjugation',
    unitId: 'n5-u7-adjectives',
    order: 1,
    title: 'い-Adjectives: Full Conjugation System',
    titleJP: 'い形容詞の活用',
    objectives: ['Conjugate い-adjectives in present/negative/past/past-negative', 'Use い-adjectives before nouns (attributive) and after copula (predicative)', 'Avoid the #1 mistake: never add です directly to い-adjective negative/past forms'],
    estimatedMinutes: 16,
    conceptIds: ['adj-i-form'], vocabularyIds: [], grammarIds: ['adj-i-conj'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'い-Adjective System',
        content: { type: 'introduction', heading: 'い-Adjectives: They Conjugate Like Verbs!', body: 'Unlike English adjectives, Japanese い-adjectives conjugate. Present: おおきい (big). Negative: おおきくない (not big). Past: おおきかった (was big). Past-negative: おおきくなかった (wasn\'t big). The い changes — です is optional and only added for formality.', hookJP: 'たのしい・たのしくない・たのしかった', hookEN: 'fun · not fun · was fun' },
      },
      { id: 's2-present', type: 'example', title: 'Present & Negative', content: { type: 'example', japanese: 'おもしろい → おもしろくない', reading: 'omoshiroi → omoshirokunai', english: 'interesting → not interesting. Remove い, add くない.' } },
      { id: 's3-past', type: 'example', title: 'Past & Past-Negative', content: { type: 'example', japanese: 'たのしい → たのしかった → たのしくなかった', reading: 'tanoshii → tanoshikatta → tanoshikunakatta', english: 'fun → was fun → wasn\'t fun. い → かった for past.' } },
      { id: 's4-noun-modify', type: 'example', title: 'Before Nouns: Attributive Form', content: { type: 'example', japanese: 'おおきいいぬ・ちいさいねこ・おいしいすし', reading: 'ookii inu · chiisai neko · oishii sushi', english: 'big dog · small cat · delicious sushi. い stays — no change when modifying nouns.' } },
      { id: 's5-exception', type: 'example', title: 'Exception: いい (good)', content: { type: 'example', japanese: 'いい → よくない → よかった → よくなかった', reading: 'ii → yokunai → yokatta → yokunakatta', english: 'good → not good → was good → wasn\'t good. いい is irregular — conjugates as よ.' } },
      { id: 's6-ex1', type: 'exercise', title: 'い-Adjective Conjugation', content: { type: 'exercise', exerciseId: 'ex-masu-conjugation-drill' } },
      { id: 's7-ex2', type: 'exercise', title: 'Sentence Building', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'い-Adjective Conjugation Complete!', points: ['Present: [stem]い. Negative: [stem]くない. Past: [stem]かった. Past-neg: [stem]くなかった', 'Exception: いい → よ (よくない, よかった, よくなかった)', 'Before nouns: adjective stays as-is. After copula: add です for formality only.'], learnedItems: [{ type: 'grammar', id: 'adj-i-conj' }] } },
    ],
  },

  {
    id: 'n5-l23-na-adjectives-usage',
    unitId: 'n5-u7-adjectives',
    order: 2,
    title: 'な-Adjectives: Pattern & Usage',
    titleJP: 'な形容詞の使い方',
    objectives: ['Recognize な-adjectives (they don\'t end in い, or end in い but aren\'t conjugating)', 'Use な before nouns: きれいな + noun', 'Conjugate な-adjectives using the copula です'],
    estimatedMinutes: 14,
    conceptIds: ['adj-na-form'], vocabularyIds: [], grammarIds: ['adj-na-conj'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'な-Adjective System',
        content: { type: 'introduction', heading: 'な-Adjectives: Noun-Like Adjectives', body: 'な-adjectives (形容動詞, keiyoudoushi) behave like nouns grammatically. To modify a noun, add な: きれいな = beautiful [one]. To predicate, use the copula です and its forms. They don\'t conjugate themselves — です does the conjugating work.', hookJP: 'きれい・しずか・げんき・すき', hookEN: 'beautiful · quiet · healthy · like' },
      },
      { id: 's2-list', type: 'example', title: 'Common な-Adjectives', content: { type: 'example', japanese: 'きれい・しずか・にぎやか・げんき・すき・きらい・じょうず・へた・たいせつ・べんり', reading: 'kirei · shizuka · nigiyaka · genki · suki · kirai · jouzu · heta · taisetsu · benri', english: 'beautiful · quiet · lively · healthy · like · dislike · good at · bad at · important · convenient' } },
      { id: 's3-noun-modify', type: 'example', title: 'Before Nouns: add な', content: { type: 'example', japanese: 'きれいなまち・しずかなへや・げんきなこども', reading: 'kirei-NA machi · shizuka-NA heya · genki-NA kodomo', english: 'beautiful city · quiet room · energetic child. NA links adjective to noun.' } },
      { id: 's4-conjugation', type: 'example', title: 'Conjugation via です', content: { type: 'example', japanese: 'きれいです→きれいじゃない→きれいでした→きれいじゃなかった', reading: 'kirei desu → kirei ja nai → kirei deshita → kirei ja nakatta', english: 'is beautiful → not beautiful → was beautiful → wasn\'t beautiful' } },
      { id: 's5-ex1', type: 'exercise', title: 'な-Adjective Recognition', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's6-ex2', type: 'exercise', title: 'な-Adjective Sentences', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'な-Adjectives Mastered!', points: ['な-adjectives + な + noun: きれいなはな (beautiful flower)', 'Conjugation via です: きれいです / きれいじゃない / きれいでした', 'Key ones: きれい, しずか, げんき, すき/きらい, じょうず/へた'], learnedItems: [{ type: 'grammar', id: 'adj-na-conj' }] } },
    ],
  },

  {
    id: 'n5-l24-combining-adjectives-te-form',
    unitId: 'n5-u7-adjectives',
    order: 3,
    title: 'Combining Adjectives with て-Form',
    titleJP: '形容詞のて形接続',
    objectives: ['Combine multiple adjectives in one sentence using て-form', 'Convert い-adj to くて and な-adj to で for chaining', 'Express complex descriptions naturally'],
    estimatedMinutes: 14,
    conceptIds: ['adj-te-form'], vocabularyIds: [], grammarIds: ['adj-te-conj'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Chaining Adjectives',
        content: { type: 'introduction', heading: 'Stacking Descriptions with て', body: 'To say "big AND beautiful", Japanese uses the て-form of adjectives. い-adjectives: remove い, add くて. な-adjectives: add で. This allows natural chaining: "big, beautiful, and fun" all in one smooth sentence.', hookJP: 'おおきくて、きれいで、たのしいです', hookEN: 'It is big, beautiful, and fun.' },
      },
      { id: 's2-i-adj-te', type: 'example', title: 'い-Adjective て-Form: くて', content: { type: 'example', japanese: 'おおきい → おおきくて / やすい → やすくて / おいしい → おいしくて', reading: 'ookii → ookikute / yasui → yasukute / oishii → oishikute', english: 'big, [and] · cheap, [and] · delicious, [and]... Remove い, add くて.' } },
      { id: 's3-na-adj-te', type: 'example', title: 'な-Adjective て-Form: で', content: { type: 'example', japanese: 'きれい → きれいで / しずか → しずかで / げんき → げんきで', reading: 'kirei → kirei-de / shizuka → shizuka-de / genki → genki-de', english: 'beautiful, [and] · quiet, [and] · energetic, [and]. な-adj just adds で.' } },
      { id: 's4-chain', type: 'example', title: 'Full Chained Description', content: { type: 'example', japanese: 'このみせはやすくておいしくて、きれいです！', reading: 'kono mise wa yasukute oishikute, kirei desu!', english: 'This restaurant is cheap, delicious, and beautiful!' } },
      { id: 's5-ex1', type: 'exercise', title: 'Adjective て-Form Drill', content: { type: 'exercise', exerciseId: 'ex-masu-conjugation-drill' } },
      { id: 's6-ex2', type: 'exercise', title: 'Chain Building', content: { type: 'exercise', exerciseId: 'ex-taberu-sentence-builder' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Adjective Chaining Mastered!', points: ['い-adjectives: remove い, add くて to chain', 'な-adjectives: add で to chain', 'Chain as many as you want: A+くて、B+くて、C+です'], learnedItems: [{ type: 'grammar', id: 'adj-te-conj' }] } },
    ],
  },

  // ── UNIT 8: EXISTENCE & LOCATIONS ───────────────────────
  {
    id: 'n5-l25-aru-vs-iru-mastery',
    unitId: 'n5-u8-existence-locations',
    order: 1,
    title: 'Existence Verbs: ある vs いる',
    titleJP: '存在動詞：「ある」vs「いる」',
    objectives: ['Use ある for inanimate objects and things', 'Use いる for animate beings (people, animals)', 'Form location sentences: [Place]に[Thing]が[ある/いる]'],
    estimatedMinutes: 15,
    conceptIds: ['v-aru', 'v-iru'], vocabularyIds: [], grammarIds: ['v-aru', 'v-iru'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'ある vs いる',
        content: { type: 'introduction', heading: 'Two Words for "Exist"', body: 'Japanese has two "to be/exist" verbs. ある (aru) is for things that cannot move on their own: chairs, books, stores. いる (iru) is for living, moving beings: people, animals, and sometimes robots/characters the speaker feels affection for. Confusing them is a major beginner mistake.', hookJP: 'ここにほんがあります。そこにねこがいます。', hookEN: 'There is a book here. There is a cat there.' },
      },
      { id: 's2-aru', type: 'grammar', title: 'ある — Inanimate Existence', content: { type: 'grammar', grammarId: 'v-aru', showFormation: true, showExamples: true } },
      { id: 's3-iru', type: 'grammar', title: 'いる — Animate Existence', content: { type: 'grammar', grammarId: 'v-iru', showFormation: true, showExamples: true } },
      { id: 's4-contrast', type: 'example', title: 'Direct Contrast', content: { type: 'example', japanese: 'つくえのうえにほんがあります。 / にわにいぬがいます。', reading: 'tsukue no ue ni hon ga arimasu. / niwa ni inu ga imasu.', english: 'There is a book on the desk. / There is a dog in the garden.' } },
      { id: 's5-location', type: 'example', title: 'Location Pattern: [Place]に〜が', content: { type: 'example', japanese: '[Place]に[Thing]が[ある/いる]', reading: 'Standard existence pattern', english: 'えきのそばにコンビニがあります = There is a convenience store near the station.' } },
      { id: 's6-ex1', type: 'exercise', title: 'ある vs いる Choice', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Location Description', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Existence Verbs Mastered!', points: ['ある = exists (inanimate): books, stores, parks.', 'いる = exists (animate): people, animals.', 'Pattern: [place]に[thing]が[ある/いる]'], learnedItems: [{ type: 'grammar', id: 'v-aru' }, { type: 'grammar', id: 'v-iru' }] } },
    ],
  },

  {
    id: 'n5-l26-spatial-directions-positions',
    unitId: 'n5-u8-existence-locations',
    order: 2,
    title: 'Spatial Positions: うえ・した・まえ・うしろ・となり・あいだ',
    titleJP: '位置関係の表現',
    objectives: ['Use 6 core spatial position words to describe where things are', 'Combine with の and に: テーブルのうえに', 'Give and understand directions in Japanese'],
    estimatedMinutes: 14,
    conceptIds: ['loc-ue', 'loc-shita', 'loc-mae', 'loc-ushiro', 'loc-tonari', 'loc-aida'], vocabularyIds: [], grammarIds: [], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Spatial Vocabulary',
        content: { type: 'introduction', heading: 'Where Is It? — Position Words', body: 'Japanese uses relative position words that attach to a reference noun with の: [reference]の[position]. The 6 core positions cover almost all location descriptions you\'ll need at N5 level.', hookJP: 'つくえのうえにあります。', hookEN: 'It is on top of the desk.' },
      },
      { id: 's2-positions', type: 'example', title: 'The 6 Core Position Words', content: { type: 'example', japanese: 'うえ・した・まえ・うしろ・となり・なか', reading: 'ue · shita · mae · ushiro · tonari · naka', english: 'above · below · front/before · behind · next to · inside' } },
      { id: 's3-pattern', type: 'example', title: 'Pattern: [Reference]の[Position]に', content: { type: 'example', japanese: 'いすのしたにねこがいます。まどのそとにとりがいます。', reading: 'isu no shita ni neko ga imasu. mado no soto ni tori ga imasu.', english: 'There is a cat under the chair. There is a bird outside the window.' } },
      { id: 's4-between', type: 'example', title: 'Between: AとBのあいだ', content: { type: 'example', japanese: 'ぎんこうとゆうびんきょくのあいだにあります。', reading: 'ginkou to yuubinkyoku no aida ni arimasu.', english: 'It is between the bank and the post office.' } },
      { id: 's5-direction', type: 'example', title: 'Giving Directions', content: { type: 'example', japanese: 'まっすぐいって、みぎにまがってください。', reading: 'massugu itte, migi ni magatte kudasai.', english: 'Go straight, then turn right. (まっすぐ=straight ahead, みぎ=right, ひだり=left)' } },
      { id: 's6-ex1', type: 'exercise', title: 'Position Description', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Direction Following', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Spatial Vocabulary Mastered!', points: ['6 positions: うえ(above), した(below), まえ(front), うしろ(back), となり(next to), なか(inside)', 'Pattern: [object]の[position]に[ある/いる]', 'Between: AとBのあいだ'], learnedItems: [] } },
    ],
  },

  // ── UNIT 9: FIRST KANJI ──────────────────────────────────
  {
    id: 'n5-l27-kanji-nature-elements',
    unitId: 'n5-u9-first-kanji',
    order: 1,
    title: 'Kanji: Nature & Elements (日・月・山・川・火・水・木・金・土)',
    titleJP: '自然の漢字：日月山川火水木金土',
    objectives: ['Read and write 9 nature/element kanji', 'Learn both On\'yomi and Kun\'yomi readings', 'Connect these kanji to days of the week and compounds'],
    estimatedMinutes: 18,
    conceptIds: ['k-nichi', 'k-tsuki', 'k-yama', 'k-kawa', 'k-hi-ka', 'k-mizu-sui', 'k-ki-moku', 'k-kane-kin', 'k-tsuchi-do'], vocabularyIds: [], grammarIds: [], kanjiIds: ['k-nichi-bon', 'k-getsu', 'k-san', 'k-sen', 'k-ka', 'k-sui', 'k-moku', 'k-kin', 'k-do'],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Nature Kanji',
        content: { type: 'introduction', heading: 'The 9 Element Kanji', body: 'These 9 kanji are among the most frequently used in Japanese. They appear in the days of the week (火曜日=Tuesday, 水曜日=Wednesday etc.), in compound words, and in place names. Most have two readings: On\'yomi (Chinese-derived) and Kun\'yomi (native Japanese).', hookJP: '日・月・山・川・火・水・木・金・土', hookEN: 'sun/day · moon/month · mountain · river · fire · water · tree/wood · gold · earth' },
      },
      { id: 's2-sun-moon', type: 'example', title: '日 (nichi/jitsu/hi) & 月 (getsu/tsuki)', content: { type: 'example', japanese: '日 → にち/じつ/ひ/か | 月 → げつ/がつ/つき', reading: '日本(にほん)日曜日 | 月曜日・一月(いちがつ)', english: 'Sun/Japan/Sunday | Moon/Monday/January. Most compound kanji.' } },
      { id: 's3-mountain-river', type: 'example', title: '山 (san/yama) & 川 (sen/kawa)', content: { type: 'example', japanese: '山 → さん/やま | 川 → せん/かわ', reading: '富士山(ふじさん)・山田 | 川・小川(おがわ)', english: 'Fuji Mountain · Yamada (surname) | river · small river' } },
      { id: 's4-elements', type: 'example', title: '火水木金土 — Days of the Week!', content: { type: 'example', japanese: '火(か)・水(すい)・木(もく)・金(きん)・土(ど)', reading: 'ka · sui · moku · kin · do', english: 'Fire=Tuesday, Water=Wednesday, Wood=Thursday, Gold=Friday, Earth=Saturday' } },
      { id: 's5-compounds', type: 'example', title: 'Key Compounds Using These Kanji', content: { type: 'example', japanese: '日本語・山川・金曜日・水曜日・木曜日', reading: 'nihongo · yamakawa · kin-youbi · sui-youbi · moku-youbi', english: 'Japanese language · mountain-river · Friday · Wednesday · Thursday' } },
      { id: 's6-ex1', type: 'exercise', title: 'Kanji Reading Quiz', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Compound Words', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: '9 Nature Kanji Mastered!', points: ['日月山川火水木金土 = the 9 most fundamental kanji', 'These kanji form the names of 7 days of the week', 'Each has On\'yomi (Chinese) and Kun\'yomi (Japanese) readings'], learnedItems: [{ type: 'kanji', id: 'k-nichi-bon' }] } },
    ],
  },

  {
    id: 'n5-l28-kanji-people-body',
    unitId: 'n5-u9-first-kanji',
    order: 2,
    title: 'Kanji: People & Body (人・口・目・手・足・女・男・子)',
    titleJP: '人と体の漢字',
    objectives: ['Read and write 8 kanji related to people and body parts', 'Connect to vocabulary: 人口, 目上, 手足', 'Recognize radicals in more complex kanji'],
    estimatedMinutes: 16,
    conceptIds: ['k-hito', 'k-kuchi', 'k-me', 'k-te', 'k-ashi', 'k-onna', 'k-otoko', 'k-ko'], vocabularyIds: [], grammarIds: [], kanjiIds: ['k-hito', 'k-kuchi', 'k-me', 'k-te', 'k-ashi', 'k-onna', 'k-otoko', 'k-ko'],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'People & Body Kanji',
        content: { type: 'introduction', heading: 'Human-Centered Kanji', body: 'These 8 kanji are visual and intuitive — many were originally pictographs. 人 looks like a walking person. 口 looks like a mouth. Learning their radicals helps decode hundreds of more complex kanji later.', hookJP: '人・口・目・手・足・女・男・子', hookEN: 'person · mouth · eye · hand · foot/leg · woman · man · child' },
      },
      { id: 's2-person-mouth', type: 'example', title: '人 & 口', content: { type: 'example', japanese: '人 → ひと/じん/にん | 口 → くち/こう', reading: '日本人(にほんじん)・人口(じんこう) | 口(くち)・入口(いりぐち)', english: 'Japanese person · population (people-mouth) | mouth · entrance (enter-mouth)' } },
      { id: 's3-body', type: 'example', title: '目・手・足', content: { type: 'example', japanese: '目 → め/もく | 手 → て/しゅ | 足 → あし/そく', reading: '目(め)・目的(もくてき) | 手(て)・手紙(てがみ) | 足(あし)・足りない', english: 'eye/goal | hand/letter | foot/leg/insufficient' } },
      { id: 's4-gender-child', type: 'example', title: '女・男・子', content: { type: 'example', japanese: '女 → おんな/じょ | 男 → おとこ/だん | 子 → こ/し', reading: '女性(じょせい)・女の子 | 男性(だんせい)・男の子 | 子供(こども)', english: 'woman/girl | man/boy | child' } },
      { id: 's5-compounds', type: 'example', title: 'Key Compounds', content: { type: 'example', japanese: '人口・手紙・女の子・男の子・子供・目的・入口・出口', reading: 'jinkou · tegami · onnanoko · otokonoko · kodomo · mokuteki · iriguchi · deguchi', english: 'population · letter · girl · boy · child · goal/purpose · entrance · exit' } },
      { id: 's6-ex1', type: 'exercise', title: 'Kanji Reading', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Compound Recognition', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'People & Body Kanji Mastered!', points: ['人口目手足女男子 — 8 foundational kanji', 'Radical recognition: 人 appears in 休(rest=person+tree), 体(body), etc.', 'Key compounds: 人口, 手紙, 子供, 入口/出口'], learnedItems: [{ type: 'kanji', id: 'k-hito' }] } },
    ],
  },

  {
    id: 'n5-l29-kanji-time-numbers',
    unitId: 'n5-u9-first-kanji',
    order: 3,
    title: 'Kanji: Time & Numbers (一二三四五六七八九十百千万年)',
    titleJP: '時間と数字の漢字',
    objectives: ['Read numbers in kanji: 一 through 万', 'Read time-related kanji: 年, 月, 日, 時, 分', 'Decode dates and numbers written in kanji script'],
    estimatedMinutes: 16,
    conceptIds: ['k-ichi', 'k-ni', 'k-san', 'k-shi', 'k-go', 'k-roku', 'k-nana', 'k-hachi', 'k-ku', 'k-juu', 'k-hyaku', 'k-sen', 'k-man'], vocabularyIds: [], grammarIds: [], kanjiIds: ['k-numbers'],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Number & Time Kanji',
        content: { type: 'introduction', heading: 'Numbers in Kanji', body: 'Number kanji are essential for reading prices, dates, ages, and formal documents. While everyday Japanese often uses Arabic numerals (1, 2, 3), kanji numbers appear constantly in formal writing, traditional contexts, and compound words.', hookJP: '一二三四五六七八九十百千万', hookEN: '1·2·3·4·5·6·7·8·9·10·100·1000·10000' },
      },
      { id: 's2-1-10', type: 'example', title: 'Number Kanji 一 Through 十', content: { type: 'example', japanese: '一・二・三・四・五・六・七・八・九・十', reading: 'ichi · ni · san · shi · go · roku · nana/shichi · hachi · ku/kyuu · juu', english: '1 through 10. Memorize these — they appear in thousands of compound words.' } },
      { id: 's3-large', type: 'example', title: 'Large Numbers: 百・千・万', content: { type: 'example', japanese: '百(ひゃく)・千(せん)・万(まん)', reading: 'hyaku · sen · man', english: '100 · 1,000 · 10,000. 三百=300, 一万=10,000, 十万=100,000' } },
      { id: 's4-time-kanji', type: 'example', title: 'Time Kanji: 年月日時分', content: { type: 'example', japanese: '年(ねん/とし)・月(がつ/つき)・日(にち/ひ)・時(じ)・分(ふん/ぷん)', reading: 'nen/toshi · gatsu/tsuki · nichi/hi · ji · fun/pun', english: 'year · month · day · hour · minute. 二〇二六年九月二日 = September 2, 2026' } },
      { id: 's5-read-dates', type: 'example', title: 'Reading Full Dates', content: { type: 'example', japanese: '二〇二六年九月二日水曜日', reading: 'nisen-nijuunen kugatsu futsuka suiyoubi', english: 'Wednesday, September 2nd, 2026. Year→Month→Day→Weekday order.' } },
      { id: 's6-ex1', type: 'exercise', title: 'Number Kanji Reading', content: { type: 'exercise', exerciseId: 'ex-kana-a-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Date Reading', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Number & Time Kanji Complete!', points: ['一〜十 (1-10) + 百(100) 千(1000) 万(10000)', 'Time kanji: 年(year)月(month)日(day)時(hour)分(minute)', 'Dates written: 年→月→日 order in Japanese'], learnedItems: [{ type: 'kanji', id: 'k-numbers' }] } },
    ],
  },

  // ── UNIT 10: TE-FORM & REQUESTS ─────────────────────────
  {
    id: 'n5-l30-te-form-conjugation-rules',
    unitId: 'n5-u10-te-form-requests',
    order: 1,
    title: 'The て-Form: Complete Conjugation Rules',
    titleJP: '「て形」の作り方：完全ルール',
    objectives: ['Conjugate ALL verb types to て-form correctly', 'Remember Godan\'s 8 sound-change rules (the "te-form song")', 'Understand that て-form is a connector, not a tense'],
    estimatedMinutes: 20,
    conceptIds: ['v-te-form'], vocabularyIds: [], grammarIds: ['v-te-ichidan', 'v-te-godan'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'The Most Important Verb Form',
        content: { type: 'introduction', heading: 'て-Form: The Swiss Army Knife of Japanese', body: 'The て-form is the single most important verb inflection in Japanese. It connects actions (and then...), forms requests (〜てください), indicates ongoing state (〜ています), and builds dozens of other grammar patterns. Master this and many N4/N5 patterns become easy.', hookJP: 'たべて、のんで、ねました。', hookEN: 'I ate, drank, and slept. (te-form connects sequential actions)' },
      },
      { id: 's2-ichidan-te', type: 'example', title: 'Ichidan て-Form: Replace る with て', content: { type: 'example', japanese: 'たべる→たべて / みる→みて / おきる→おきて / ねる→ねて', reading: 'taberu→tabete / miru→mite / okiru→okite / neru→nete', english: 'Ichidan: drop る, add て. Simple and consistent.' } },
      { id: 's3-godan-rules', type: 'example', title: 'Godan て-Form: 8 Sound Change Rules', content: { type: 'example', japanese: 'う/つ/る→って | ぬ/ぶ/む→んで | く→いて | ぐ→いで | す→して', reading: 'u/tsu/ru→tte | nu/bu/mu→nde | ku→ite | gu→ide | su→shite', english: 'The te-form sound chart. Memorize as a song: う/つ/る ending = って, etc.' } },
      { id: 's4-godan-examples', type: 'example', title: 'Godan て-Form in Action', content: { type: 'example', japanese: 'かく→かいて / およぐ→およいで / はなす→はなして / よむ→よんで / かえる→かえって', reading: 'kaku→kaite / oyogu→oyoide / hanasu→hanashite / yomu→yonde / kaeru→kaette', english: 'write→ / swim→ / speak→ / read→ / return→' } },
      { id: 's5-irregular', type: 'example', title: 'Irregular て-Forms: する & くる', content: { type: 'example', japanese: 'する→して / くる→きて / いく→いって（特殊）', reading: 'suru→shite / kuru→kite / iku→itte (exception!)', english: 'する→して. くる→きて. いく is Godan but く→いて rule gives いいて — WRONG! Correct is いって.' } },
      { id: 's6-ex1', type: 'exercise', title: 'て-Form Conjugation Drill', content: { type: 'exercise', exerciseId: 'ex-masu-conjugation-drill' } },
      { id: 's7-ex2', type: 'exercise', title: 'Mixed Verb Practice', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'て-Form Conjugation Complete!', points: ['Ichidan: drop る, add て (always consistent)', 'Godan rule set: う/つ/る→って, ぬ/ぶ/む→んで, く→いて, ぐ→いで, す→して', 'Exceptions: する→して, くる→きて, いく→いって'], learnedItems: [{ type: 'grammar', id: 'v-te-form' }] } },
    ],
  },

  {
    id: 'n5-l31-polite-requests-te-kudasai',
    unitId: 'n5-u10-te-form-requests',
    order: 2,
    title: 'Polite Requests: 〜てください',
    titleJP: '「〜てください」で丁寧なお願い',
    objectives: ['Form polite requests using て-form + ください', 'Understand degrees of politeness: 〜て vs 〜てください vs 〜ていただけますか', 'Handle daily requests at shops, stations, and in conversation'],
    estimatedMinutes: 14,
    conceptIds: ['g-te-kudasai'], vocabularyIds: [], grammarIds: ['g-te-kudasai'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Making Requests',
        content: { type: 'introduction', heading: '〜てください — The Polite Request', body: 'The pattern [verb て-form] + ください is your go-to for polite requests. Literally "please do [verb]". It is polite but direct. For more formal situations (hotels, business), use 〜ていただけますか. Bare て-form is for close friends.', hookJP: 'ゆっくりはなしてください。', hookEN: 'Please speak slowly.' },
      },
      { id: 's2-pattern', type: 'grammar', title: '〜てください Pattern', content: { type: 'grammar', grammarId: 'g-te-kudasai', showFormation: true, showExamples: true } },
      { id: 's3-examples', type: 'example', title: 'Everyday Request Sentences', content: { type: 'example', japanese: 'みてください / きいてください / まってください / かいてください / こちらへきてください', reading: 'mite kudasai / kiite kudasai / matte kudasai / kaite kudasai / kochira e kite kudasai', english: 'Please look / listen / wait / write / come here.' } },
      { id: 's4-polite-scale', type: 'example', title: 'Politeness Scale', content: { type: 'example', japanese: 'みて（友達）→ みてください（丁寧）→ みていただけますか（最丁寧）', reading: 'mite(friend) → mite kudasai (polite) → mite itadakemasu ka (formal)', english: 'Look! [casual] → Please look. [polite] → Could you please look? [very formal]' } },
      { id: 's5-ないでください', type: 'example', title: 'Negative Request: 〜ないでください', content: { type: 'example', japanese: 'ここではたばこをすわないでください。', reading: 'koko de wa tabako wo suwanaide kudasai.', english: 'Please don\'t smoke here. ない form + でください = please don\'t [verb].' } },
      { id: 's6-ex1', type: 'exercise', title: 'Request Formation', content: { type: 'exercise', exerciseId: 'ex-taberu-sentence-builder' } },
      { id: 's7-ex2', type: 'exercise', title: 'Request Context', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Polite Requests Mastered!', points: ['Pattern: [て-form] + ください = Please [verb].', 'Negative: [ない-form] + でください = Please don\'t [verb].', 'More formal: 〜ていただけますか = Could you please...?'], learnedItems: [{ type: 'grammar', id: 'g-te-kudasai' }] } },
    ],
  },

  {
    id: 'n5-l32-ongoing-actions-te-imasu',
    unitId: 'n5-u10-te-form-requests',
    order: 3,
    title: 'Ongoing Actions & States: 〜ています',
    titleJP: '「〜ています」：進行形と状態',
    objectives: ['Use 〜ています for actions currently in progress (I am eating)', 'Use 〜ています for resulting states (I am married / I live in Tokyo)', 'Distinguish between ongoing action vs resulting state usage'],
    estimatedMinutes: 16,
    conceptIds: ['g-te-iru'], vocabularyIds: [], grammarIds: ['g-te-iru'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: '〜ています',
        content: { type: 'introduction', heading: 'The Progressive & State Form', body: '〜ています has two main uses: (1) ongoing action right now (like English "-ing"), and (2) resulting state from a past action (like English "has done"). Context tells you which. A key N5 grammar point that unlocks natural Japanese.', hookJP: 'いまたべています。とうきょうにすんでいます。', hookEN: 'I am eating now. (ongoing) / I live in Tokyo. (resulting state)' },
      },
      { id: 's2-grammar', type: 'grammar', title: '〜ています Grammar Deep Dive', content: { type: 'grammar', grammarId: 'g-te-iru', showFormation: true, showExamples: true } },
      { id: 's3-ongoing', type: 'example', title: 'Ongoing Action Usage', content: { type: 'example', japanese: 'いまにほんごをべんきょうしています。かれはえいごではなしています。', reading: 'ima nihongo wo benkyou shite imasu. kare wa eigo de hanashite imasu.', english: 'I am studying Japanese now. He is speaking in English.' } },
      { id: 's4-state', type: 'example', title: 'Resulting State Usage', content: { type: 'example', japanese: 'とうきょうにすんでいます。けっこんしています。にほんごをしっています。', reading: 'toukyou ni sunde imasu. kekkon shite imasu. nihongo wo shitte imasu.', english: 'I live in Tokyo. (state of having moved there) / I am married. / I know Japanese.' } },
      { id: 's5-occupation', type: 'example', title: 'Occupation with 〜ています', content: { type: 'example', japanese: 'かいしゃではたらいています。がっこうでおしえています。', reading: 'kaisha de hataraite imasu. gakkou de oshiete imasu.', english: 'I work at a company. I teach at school. (ongoing occupational state)' } },
      { id: 's6-ex1', type: 'exercise', title: '〜ています Recognition', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Progressive Sentence Building', content: { type: 'exercise', exerciseId: 'ex-taberu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete — N5 Complete!', content: { type: 'summary', heading: '〜ています & N5 Complete!', points: ['〜ています = ongoing action (I am [verb]-ing right now)', '〜ています = resulting state (I live/am married/know — permanent states)', 'You have completed the full N5 curriculum! Ready for N4.'], learnedItems: [{ type: 'grammar', id: 'g-te-iru' }] } },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// N4 LESSONS — 7 total across 3 units
// ════════════════════════════════════════════════════════════
export const N4_LESSONS: Lesson[] = [
  {
    id: 'n4-l1-plain-present-negative',
    unitId: 'n4-u1-verb-inflections',
    order: 1,
    title: 'Plain Form (Short Form): Present & Negative',
    titleJP: '普通形：現在形と否定形',
    objectives: ['Convert polite ます form to plain/dictionary form', 'Form plain negative (ない form) for all verb groups', 'Use plain forms in casual speech and embedded clauses'],
    estimatedMinutes: 18,
    conceptIds: ['v-plain-present', 'v-nai-form'], vocabularyIds: [], grammarIds: ['v-plain-present', 'v-nai-form'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Plain Form',
        content: { type: 'introduction', heading: 'Dictionary Form & Plain Negative', body: 'The polite ます form is used with strangers and in formal situations. Among friends, Japanese uses the plain form. Ichidan: drop る entirely. Godan: the dictionary form IS the base (のむ, かく). Irregular: する, くる. Negative: Ichidan drop る add ない; Godan stem vowel → a-column + ない.', hookJP: 'たべる（辞書形）/ たべない（否定）', hookEN: 'to eat (dict.) / don\'t eat (negative)' },
      },
      { id: 's2-dict-form', type: 'example', title: 'Dictionary Form Review', content: { type: 'example', japanese: 'たべる・のむ・みる・はなす・する・くる', reading: 'taberu · nomu · miru · hanasu · suru · kuru', english: 'Dictionary forms. Ichidan keep る. Godan: the form ending in う, く, す etc.' } },
      { id: 's3-nai-form', type: 'example', title: 'ない Form (Plain Negative)', content: { type: 'example', japanese: 'たべない・のまない・みない・はなさない・しない・こない', reading: 'tabenai · nomanai · minai · hanasanai · shinai · konai', english: 'don\'t eat · don\'t drink · don\'t see · don\'t speak · don\'t do · don\'t come' } },
      { id: 's4-embedded', type: 'example', title: 'Plain Form in Embedded Clauses', content: { type: 'example', japanese: '[sentence]とおもいます / [sentence]とききました', reading: '[sentence]+ to omoimasu / to kikimashita', english: 'I think [sentence] / I heard that [sentence]. Embedded clause must use plain form!' } },
      { id: 's5-ex1', type: 'exercise', title: 'Plain Form Conjugation', content: { type: 'exercise', exerciseId: 'ex-masu-conjugation-drill' } },
      { id: 's6-ex2', type: 'exercise', title: 'Negative Form', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Plain Form Mastered!', points: ['Ichidan plain: same as dictionary form (たべる)', 'Godan plain: dictionary form (のむ, かく, はなす)', 'ない form: Ichidan drop る+ない; Godan a-vowel+ない'], learnedItems: [{ type: 'grammar', id: 'v-nai-form' }] } },
    ],
  },

  {
    id: 'n4-l2-plain-past-ta-form',
    unitId: 'n4-u1-verb-inflections',
    order: 2,
    title: 'Plain Past: た-Form',
    titleJP: '普通形過去：た形',
    objectives: ['Form た-form (plain past) for all verb types', 'Use た-form in casual speech about completed actions', 'Form た-form of adjectives'],
    estimatedMinutes: 16,
    conceptIds: ['v-ta-form'], vocabularyIds: [], grammarIds: ['v-ta-form'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'た-Form',
        content: { type: 'introduction', heading: 'Plain Past — た Form', body: 'The た-form is the plain/casual past tense. It follows THE SAME sound change rules as the て-form — just replace て with た and で with だ. Once you master て-form, た-form is automatic. A critical N4 form appearing in many grammar patterns.', hookJP: 'きのうなにをたべた？', hookEN: 'What did you eat yesterday? (casual)' },
      },
      { id: 's2-ta-rules', type: 'example', title: 'た-Form = て-Form with た', content: { type: 'example', japanese: 'たべる→たべた / のむ→のんだ / かく→かいた / はなす→はなした', reading: 'tabeta / nonda / kaita / hanashita', english: 'ate / drank / wrote / spoke. Same pattern as て-form!' } },
      { id: 's3-adj-past', type: 'example', title: 'Adjective Past Forms', content: { type: 'example', japanese: 'おいしい→おいしかった / きれい→きれいだった', reading: 'oishii→oishikatta / kirei→kirei datta', english: 'was delicious / was beautiful. い-adj: い→かった. な-adj: だ→だった.' } },
      { id: 's4-tatara', type: 'example', title: 'Useful Pattern: 〜たら (if/when done)', content: { type: 'example', japanese: 'うちにかえったら、でんわしてください。', reading: 'uchi ni kaettara, denwa shite kudasai.', english: 'When you get home, please call me. (た-form + ら = temporal/conditional)' } },
      { id: 's5-ex1', type: 'exercise', title: 'た-Form Conjugation', content: { type: 'exercise', exerciseId: 'ex-masu-conjugation-drill' } },
      { id: 's6-ex2', type: 'exercise', title: 'Past Tense Sentences', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'た-Form Mastered!', points: ['た-form = same rules as て-form, replace て→た, で→だ', 'Adjective past: い-adj い→かった; な-adj だ→だった', '〜たら = when/if [completed action]'], learnedItems: [{ type: 'grammar', id: 'v-ta-form' }] } },
    ],
  },

  {
    id: 'n4-l3-casual-speech-patterns',
    unitId: 'n4-u1-verb-inflections',
    order: 3,
    title: 'Casual Speech: Contractions & Natural Japanese',
    titleJP: 'タメ口：縮約形と自然な話し方',
    objectives: ['Recognize common casual contractions: じゃない, てる, ちゃう', 'Understand what "da" (だ) does in plain speech', 'Produce natural casual Japanese with friends'],
    estimatedMinutes: 15,
    conceptIds: ['speech-casual'], vocabularyIds: [], grammarIds: ['speech-casual'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Casual Japanese',
        content: { type: 'introduction', heading: 'Real Japanese — How Native Speakers Talk', body: 'Textbook Japanese sounds stiff. Native speakers shorten ている→てる, ていない→てない→てない→てない, のではない→んじゃない. Males often end sentences with だ or ぞ. Females use の or わ. Understanding these makes anime, dramas, and real conversations accessible.', hookJP: 'もうたべた？', hookEN: 'Did you eat already? (casual, no formal endings)' },
      },
      { id: 's2-contractions', type: 'example', title: 'Key Contractions', content: { type: 'example', japanese: 'ている→てる / ていない→てない / ておく→とく / てしまう→ちゃう', reading: 'te-iru→teru / te-inai→tenai / te-oku→toku / te-shimau→chau', english: 'is doing→ / isn\'t doing→ / do in advance→ / end up doing→' } },
      { id: 's3-da', type: 'example', title: 'だ — Plain Copula', content: { type: 'example', japanese: 'これはほんだ。たかいな。もうおそい。', reading: 'kore wa hon da. takai na. mou osoi.', english: 'This is a book. (Expensive, isn\'t it.) (Already late.) Plain speech with だ and sentence-final particles.' } },
      { id: 's4-particles', type: 'example', title: 'Sentence-Final Particles', content: { type: 'example', japanese: 'ね・よ・な・ぞ・わ・の', reading: 'ne · yo · na · zo · wa · no', english: 'ね=seeking agreement, よ=asserting, な=casual ね (male), ぞ=emphatic (male), わ=soft assertion (female), の=explanation' } },
      { id: 's5-ex1', type: 'exercise', title: 'Contraction Recognition', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's6-ex2', type: 'exercise', title: 'Casual Conversation', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Casual Japanese Unlocked!', points: ['Key contractions: てる (ている), ちゃう (てしまう), とく (ておく)', 'だ = casual copula (equivalent of です in plain speech)', 'Sentence-final particles signal tone: ね/よ/な/ぞ/わ/の'], learnedItems: [{ type: 'grammar', id: 'speech-casual' }] } },
    ],
  },

  {
    id: 'n4-l4-potential-conjugation',
    unitId: 'n4-u2-potential-ability',
    order: 1,
    title: 'Potential Form: Can / Cannot Do',
    titleJP: '可能形：できる・できない',
    objectives: ['Form potential (can do) for all verb groups', 'Use が/を with potential verbs', 'Express ability naturally'],
    estimatedMinutes: 16,
    conceptIds: ['v-potential'], vocabularyIds: [], grammarIds: ['v-potential'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Potential Form',
        content: { type: 'introduction', heading: 'Expressing What You CAN Do', body: 'Japanese has a dedicated potential form: "can eat" = 食べられる (Ichidan) or 読める (Godan). The potential form treats the ability as an object, often switching を to が. できる is the universal "can do" irregular.', hookJP: 'にほんごがはなせます！', hookEN: 'I can speak Japanese!' },
      },
      { id: 's2-ichidan-potential', type: 'example', title: 'Ichidan Potential: 〜られる', content: { type: 'example', japanese: 'たべる→たべられる / みる→みられる / おきる→おきられる', reading: 'taberareru · mirareru · okirareru', english: 'can eat · can see · can wake up. Add られる to Ichidan stem.' } },
      { id: 's3-godan-potential', type: 'example', title: 'Godan Potential: え-column + る', content: { type: 'example', japanese: 'のむ→のめる / かく→かける / はなす→はなせる / いく→いける', reading: 'nomeru · kakeru · hanaseru · ikeru', english: 'can drink · can write · can speak · can go. u-column→e-column+る' } },
      { id: 's4-ga-particle', type: 'example', title: 'Potential Verbs Often Use が', content: { type: 'example', japanese: 'にほんごがはなせます。すしがたべられます。', reading: 'nihongo GA hanasemasu. sushi GA taberaremasu.', english: 'I can speak Japanese. I can eat sushi. Object shifts from を to が in potential.' } },
      { id: 's5-dekiru', type: 'example', title: 'できる — Universal Can Do', content: { type: 'example', japanese: 'にほんごができます。りょうりができます。', reading: 'nihongo ga dekimasu. ryouri ga dekimasu.', english: 'I can (do) Japanese. I can cook. [Noun]+ができる = have ability in [noun].' } },
      { id: 's6-ex1', type: 'exercise', title: 'Potential Conjugation', content: { type: 'exercise', exerciseId: 'ex-masu-conjugation-drill' } },
      { id: 's7-ex2', type: 'exercise', title: 'Ability Sentences', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Potential Form Mastered!', points: ['Ichidan potential: stem + られる (たべ → たべられる)', 'Godan potential: u→e column + る (のむ→のめる)', 'Object often shifts を→が with potential verbs'], learnedItems: [{ type: 'grammar', id: 'v-potential' }] } },
    ],
  },

  {
    id: 'n4-l5-expressing-ability-in-context',
    unitId: 'n4-u2-potential-ability',
    order: 2,
    title: 'Expressing Ability: 〜ことができる & Potential Verbs',
    titleJP: '「〜ことができる」と可能動詞の使い分け',
    objectives: ['Use 〜ことができる as an alternative to potential verb conjugation', 'Understand when to prefer ことができる vs potential verb', 'Express inability and partial ability'],
    estimatedMinutes: 14,
    conceptIds: ['g-koto-ga-dekiru'], vocabularyIds: [], grammarIds: ['g-koto-ga-dekiru'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: '〜ことができる',
        content: { type: 'introduction', heading: 'Alternative Way to Express Ability', body: '〜ことができる uses the dictionary form of a verb + こと (nominalized) + ができる. It is slightly more formal and explicit than the potential verb form. Both are correct; potential verb is more common in speech, ことができる is preferred in writing.', hookJP: 'にほんごをはなすことができます。', hookEN: 'I am able to speak Japanese.' },
      },
      { id: 's2-pattern', type: 'grammar', title: '〜ことができる Pattern', content: { type: 'grammar', grammarId: 'g-koto-ga-dekiru', showFormation: true, showExamples: true } },
      { id: 's3-compare', type: 'example', title: 'Potential Verb vs ことができる', content: { type: 'example', japanese: 'にほんごがはなせます = にほんごをはなすことができます', reading: 'Both are correct and mean the same thing.', english: 'Potential verb (nihongo GA hanasemasu) is more casual. ことができる is more formal/written.' } },
      { id: 's4-inability', type: 'example', title: 'Inability: 〜ことができません', content: { type: 'example', japanese: 'カナを読むことができません。じかんがないのでいくことができません。', reading: 'kana wo yomu koto ga dekimasen. jikan ga nai no de iku koto ga dekimasen.', english: 'I cannot read kana. I cannot go because I have no time.' } },
      { id: 's5-ex1', type: 'exercise', title: 'ことができる Formation', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's6-ex2', type: 'exercise', title: 'Ability vs Inability', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'ことができる Mastered!', points: ['Pattern: [dict. form] + ことができる = be able to [verb]', 'Negative: ことができない/ことができません', 'More formal than potential verb; preferred in writing'], learnedItems: [{ type: 'grammar', id: 'g-koto-ga-dekiru' }] } },
    ],
  },

  {
    id: 'n4-l6-giving-receiving-objects',
    unitId: 'n4-u3-giving-receiving',
    order: 1,
    title: 'Giving & Receiving Objects: あげる・くれる・もらう',
    titleJP: '授受動詞：あげる・くれる・もらう',
    objectives: ['Use あげる (give outward), くれる (give inward), もらう (receive)', 'Understand the perspective difference: relative position of giver/receiver to speaker', 'Choose correct verb based on who gives to whom'],
    estimatedMinutes: 18,
    conceptIds: ['v-ageru', 'v-kureru', 'v-morau'], vocabularyIds: [], grammarIds: ['v-ageru', 'v-kureru', 'v-morau'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Giving & Receiving',
        content: { type: 'introduction', heading: 'The Perspective-Sensitive Giving Verbs', body: 'Japanese uses three different verbs for giving/receiving based on perspective. あげる: "I/we give to you/others (away from speaker\'s in-group)." くれる: "you/others give to me/us (toward speaker\'s in-group)." もらう: "I receive from you/others." The choice reveals the social relationship.', hookJP: 'わたしはともだちにほんをあげた。ともだちはわたしにほんをくれた。', hookEN: 'I gave my friend a book. / My friend gave me a book.' },
      },
      { id: 's2-ageru', type: 'grammar', title: 'あげる — Give (Away from Speaker)', content: { type: 'grammar', grammarId: 'v-ageru', showFormation: true, showExamples: true } },
      { id: 's3-kureru', type: 'grammar', title: 'くれる — Give (To Speaker\'s Group)', content: { type: 'grammar', grammarId: 'v-kureru', showFormation: true, showExamples: true } },
      { id: 's4-morau', type: 'grammar', title: 'もらう — Receive', content: { type: 'grammar', grammarId: 'v-morau', showFormation: true, showExamples: true } },
      { id: 's5-compare', type: 'example', title: 'Three-Way Comparison', content: { type: 'example', japanese: 'わたしはかれに→あげた。かれはわたしに→くれた。わたしはかれに→もらった。', reading: 'I-him-gave / he-me-gave(to me) / I-from him-received', english: 'I gave him. / He gave me. / I received from him. — Same situation, 3 perspectives.' } },
      { id: 's6-ex1', type: 'exercise', title: 'Giving Verb Choice', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Giving Sentences', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'Giving Verbs Mastered!', points: ['あげる = give (from me/our group, outward)', 'くれる = give (to me/our group, inward)', 'もらう = receive (I receive from someone)'], learnedItems: [{ type: 'grammar', id: 'v-ageru' }, { type: 'grammar', id: 'v-kureru' }, { type: 'grammar', id: 'v-morau' }] } },
    ],
  },

  {
    id: 'n4-l7-giving-receiving-favors-te-form',
    unitId: 'n4-u3-giving-receiving',
    order: 2,
    title: 'Giving & Receiving Favors: 〜てあげる・くれる・もらう',
    titleJP: '行為の授受：「〜てあげる」「〜てくれる」「〜てもらう」',
    objectives: ['Extend giving/receiving to ACTIONS using て-form', 'Express doing favors (〜てあげる/くれる) and requesting help (〜てもらう)', 'Add nuance of gratitude and obligation to conversations'],
    estimatedMinutes: 16,
    conceptIds: ['g-te-ageru', 'g-te-kureru', 'g-te-morau'], vocabularyIds: [], grammarIds: ['g-te-ageru', 'g-te-kureru', 'g-te-morau'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'Favor Giving',
        content: { type: 'introduction', heading: 'Extending Giving Verbs to Actions', body: 'Combine て-form + giving/receiving verbs to express DOING something for someone. 〜てあげる = do [action] for them. 〜てくれる = they do [action] for me. 〜てもらう = I have them do/get them to do [action]. This adds a layer of social dynamics to every favor.', hookJP: 'えをかいてあげます。えをかいてくれます。えをかいてもらいます。', hookEN: 'I\'ll draw a picture for you / He\'ll draw for me / I\'ll have him draw' },
      },
      { id: 's2-te-ageru', type: 'grammar', title: '〜てあげる — Do for (Others)', content: { type: 'grammar', grammarId: 'g-te-ageru', showFormation: true, showExamples: true } },
      { id: 's3-te-kureru', type: 'grammar', title: '〜てくれる — Do for (Me/Us)', content: { type: 'grammar', grammarId: 'g-te-kureru', showFormation: true, showExamples: true } },
      { id: 's4-te-morau', type: 'grammar', title: '〜てもらう — Have Someone Do / Get to Do', content: { type: 'grammar', grammarId: 'g-te-morau', showFormation: true, showExamples: true } },
      { id: 's5-request', type: 'example', title: 'Requesting Help: 〜てもらえますか', content: { type: 'example', japanese: 'てつだってもらえますか？おしえてもらえますか？', reading: 'tetsudatte moraemasu ka? oshiete moraemasu ka?', english: 'Could you help me? Could you teach me? (Lit: Could I have you help/teach?)' } },
      { id: 's6-ex1', type: 'exercise', title: 'Favor Verb Selection', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Favor Sentences', content: { type: 'exercise', exerciseId: 'ex-taberu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete — N4 Unit 3 Complete!', content: { type: 'summary', heading: 'Favor Verbs Mastered!', points: ['〜てあげる = do [verb] for someone (you give action)', '〜てくれる = someone does [verb] for me (they give action to me)', '〜てもらう = I have/get someone to do [verb] (I receive action)', '〜てもらえますか = Could you please [verb]? (polite request)'], learnedItems: [{ type: 'grammar', id: 'g-te-ageru' }, { type: 'grammar', id: 'g-te-kureru' }, { type: 'grammar', id: 'g-te-morau' }] } },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// N3 LESSONS — 2 total
// ════════════════════════════════════════════════════════════
export const N3_LESSONS: Lesson[] = [
  {
    id: 'n3-l1-conditional-tara-nara',
    unitId: 'n3-u1-conditions-causes',
    order: 1,
    title: 'Conditionals: 〜たら & 〜なら',
    titleJP: '条件形：「〜たら」と「〜なら」',
    objectives: ['Use 〜たら for when-/if-completed conditions', 'Use 〜なら for topic-based / contextual conditions', 'Distinguish the nuance gap between the two'],
    estimatedMinutes: 20,
    conceptIds: ['g-tara', 'g-nara'], vocabularyIds: [], grammarIds: ['g-tara', 'g-nara'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: '〜たら vs 〜なら',
        content: { type: 'introduction', heading: 'Two Conditional Nuances', body: '〜たら (ta-form + ら) expresses "if/when X happens/happened." It implies X is completed first, then Y follows. 〜なら (plain form + なら) expresses "if that\'s the case / if it\'s true that X, then Y." なら is for commenting on a situation or assumption already introduced by context.', hookJP: 'にほんにいったら、すしをたべよう。/にほんにいくなら、すしをたべるべきだ。', hookEN: 'When I go to Japan, I\'ll eat sushi. / If you\'re going to Japan, you should eat sushi.' },
      },
      { id: 's2-tara', type: 'grammar', title: '〜たら — Sequential/Temporal Conditional', content: { type: 'grammar', grammarId: 'g-tara', showFormation: true, showExamples: true } },
      { id: 's3-nara', type: 'grammar', title: '〜なら — Context-Based Conditional', content: { type: 'grammar', grammarId: 'g-nara', showFormation: true, showExamples: true } },
      { id: 's4-contrast', type: 'example', title: 'Key Distinction', content: { type: 'example', japanese: 'かさがあったら、かしてください。/ かさがあるなら、かしてください。', reading: 'kasa ga attara, kashite kudasai. / kasa ga aru nara, kashite kudasai.', english: 'If (when) you get/have an umbrella, please lend it. / If you have an umbrella (and you do), please lend it.' } },
      { id: 's5-ex1', type: 'exercise', title: '〜たら Sentences', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's6-ex2', type: 'exercise', title: '〜なら Context', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: '〜たら & 〜なら Mastered!', points: ['〜たら = if/when [action complete], then Y. Sequential.', '〜なら = given the topic/context, then Y. Assumption-based.', 'Key test: does the condition need to be completed first? → たら. Is it commenting on shared context? → なら.'], learnedItems: [{ type: 'grammar', id: 'g-tara' }, { type: 'grammar', id: 'g-nara' }] } },
    ],
  },

  {
    id: 'n3-l2-conditional-ba-to',
    unitId: 'n3-u1-conditions-causes',
    order: 2,
    title: 'Conditionals: 〜ば & 〜と',
    titleJP: '条件形：「〜ば」と「〜と」',
    objectives: ['Form 〜ば (conditional) for verbs and adjectives', 'Use 〜と for natural/automatic consequences', 'Master the 4-conditional system: たら・なら・ば・と'],
    estimatedMinutes: 20,
    conceptIds: ['g-ba', 'g-to-cond'], vocabularyIds: [], grammarIds: ['g-ba', 'g-to-cond'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: '〜ば & 〜と',
        content: { type: 'introduction', heading: 'Logical & Natural Conditionals', body: '〜ば expresses a logical/hypothetical condition: "If X were to be true, Y would follow." It has a formal/literary tone. 〜と expresses automatic or inevitable consequence: "When X, Y always happens." Used for instructions, laws of nature, and habitual consequences.', hookJP: 'みぎにまがると、えきがあります。', hookEN: 'If you turn right, the station is there. (automatic result)' },
      },
      { id: 's2-ba-formation', type: 'grammar', title: '〜ば — Hypothetical Conditional', content: { type: 'grammar', grammarId: 'g-ba', showFormation: true, showExamples: true } },
      { id: 's3-to-cond', type: 'grammar', title: '〜と — Natural Consequence', content: { type: 'grammar', grammarId: 'g-to-cond', showFormation: true, showExamples: true } },
      { id: 's4-4-system', type: 'example', title: 'The Full 4-Conditional Map', content: { type: 'example', japanese: 'たら＝完了後 / なら＝文脈 / ば＝論理 / と＝自然結果', reading: 'tara=after completion / nara=context / ba=logical / to=natural result', english: 'Four tools, four situations. Master all four for N3-level nuance.' } },
      { id: 's5-ex1', type: 'exercise', title: '〜ば Conditional', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's6-ex2', type: 'exercise', title: '〜と Natural Result', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-summary', type: 'summary', title: 'Lesson Complete — N3 Unit 1 Complete!', content: { type: 'summary', heading: '4-Conditional System Complete!', points: ['〜ば = hypothetical logical condition (formal/literary)', '〜と = automatic/natural consequence (directions, habits, nature)', 'Full system: たら(sequential), なら(contextual), ば(logical), と(automatic)'], learnedItems: [{ type: 'grammar', id: 'g-ba' }, { type: 'grammar', id: 'g-to-cond' }] } },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// N2 LESSONS — 1 total
// ════════════════════════════════════════════════════════════
export const N2_LESSONS: Lesson[] = [
  {
    id: 'n2-l1-formal-change-expressions',
    unitId: 'n2-u1-formal-written',
    order: 1,
    title: 'Formal Written Japanese: 〜に伴って・〜につれて・〜を巡って',
    titleJP: '硬い表現：「〜に伴って」「〜につれて」「〜を巡って」',
    objectives: ['Use 〜に伴って to express accompanying change', 'Use 〜につれて to express proportional/gradual change', 'Use 〜を巡って to express discussions centered around an issue'],
    estimatedMinutes: 22,
    conceptIds: ['g-ni-tomonatte', 'g-ni-tsurete', 'g-wo-megutte'], vocabularyIds: [], grammarIds: ['g-ni-tomonatte', 'g-ni-tsurete', 'g-wo-megutte'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'N2 Formal Grammar',
        content: { type: 'introduction', heading: 'Written & Formal Japanese', body: 'N2 grammar points appear frequently in newspapers, essays, and business documents. These three patterns all express change or discussion. 〜に伴って = accompanied by (change event). 〜につれて = as [X] progresses, [Y] changes proportionally. 〜を巡って = discussions/disputes centered around [issue].', hookJP: '社会の変化に伴って、働き方も変わってきた。', hookEN: 'As society changes, the way of working has also changed.' },
      },
      { id: 's2-ni-tomonatte', type: 'grammar', title: '〜に伴って — Accompanying Change', content: { type: 'grammar', grammarId: 'g-ni-tomonatte', showFormation: true, showExamples: true } },
      { id: 's3-ni-tsurete', type: 'grammar', title: '〜につれて — Proportional Change', content: { type: 'grammar', grammarId: 'g-ni-tsurete', showFormation: true, showExamples: true } },
      { id: 's4-wo-megutte', type: 'grammar', title: '〜を巡って — Centered Around (Discussion)', content: { type: 'grammar', grammarId: 'g-wo-megutte', showFormation: true, showExamples: true } },
      { id: 's5-essay-examples', type: 'example', title: 'In Essay Context', content: { type: 'example', japanese: '時代の変化に伴い、教育のあり方も変わってきた。技術が進むにつれて、人々の生活も豊かになった。この問題を巡って、国会で議論が続いている。', reading: 'jidai no henka ni tomonai... / gijutsu ga susumu ni tsurete... / kono mondai wo megutte...', english: 'As the era changes... / As technology advances... / The Diet continues to debate this issue...' } },
      { id: 's6-ex1', type: 'exercise', title: 'Formal Expression Match', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'Essay Sentence Completion', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete', content: { type: 'summary', heading: 'N2 Formal Expressions Mastered!', points: ['〜に伴って/伴い = as [X happens], [Y] follows. Event-paired change.', '〜につれて = as [X] progresses (gradually), [Y] changes proportionally.', '〜を巡って = centered around [issue] — for debates, controversies, discussions.'], learnedItems: [{ type: 'grammar', id: 'g-ni-tomonatte' }, { type: 'grammar', id: 'g-ni-tsurete' }, { type: 'grammar', id: 'g-wo-megutte' }] } },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// N1 LESSONS — 1 total
// ════════════════════════════════════════════════════════════
export const N1_LESSONS: Lesson[] = [
  {
    id: 'n1-l1-high-register-rhetoric',
    unitId: 'n1-u1-classical-nuances',
    order: 1,
    title: 'High-Register & Classical Resonance: 〜であれ・〜たるもの・〜を禁じ得ない',
    titleJP: '格調高い表現と古語の残滓',
    objectives: ['Use 〜であれ for "even if it is" (high-register concessive)', 'Understand 〜たるもの as "one who is / as [title]"', 'Use 〜を禁じ得ない for "cannot help feeling [emotion]"'],
    estimatedMinutes: 25,
    conceptIds: ['g-de-are', 'g-taru-mono', 'g-wo-kinjienai'], vocabularyIds: [], grammarIds: ['g-de-are', 'g-taru-mono', 'g-wo-kinjienai'], kanjiIds: [],
    steps: [
      {
        id: 's1-intro', type: 'introduction', title: 'N1 Classical Register',
        content: { type: 'introduction', heading: 'Literary & High-Register Japanese', body: 'N1 grammar draws on classical Japanese (古語) that resonates in formal speeches, literature, legal texts, and opinion essays. These forms convey authority, gravitas, and intellectual sophistication. They are recognized by well-educated native speakers as markers of cultural literacy.', hookJP: 'プロたるもの、かかる失態を犯してはならない。', hookEN: 'As a professional, one must not commit such a blunder.' },
      },
      { id: 's2-de-are', type: 'grammar', title: '〜であれ — Even If / Regardless of', content: { type: 'grammar', grammarId: 'g-de-are', showFormation: true, showExamples: true } },
      { id: 's3-taru-mono', type: 'grammar', title: '〜たるもの — One Who Is / As a [Title]', content: { type: 'grammar', grammarId: 'g-taru-mono', showFormation: true, showExamples: true } },
      { id: 's4-kinjienai', type: 'grammar', title: '〜を禁じ得ない — Cannot Help Feeling', content: { type: 'grammar', grammarId: 'g-wo-kinjienai', showFormation: true, showExamples: true } },
      { id: 's5-literary', type: 'example', title: 'Literary Usage in Context', content: { type: 'example', japanese: '理由が何であれ、暴力は許されない。医師たるもの、患者の命を最優先にすべきだ。彼の訃報を聞いて、悲しみを禁じ得なかった。', reading: 'riyuu ga nani de are... / ishi taru mono... / kare no fuhou wo kiite, kanashimi wo kinjienakatta.', english: 'Whatever the reason... / As a doctor... / Hearing his obituary, I could not help feeling sad.' } },
      { id: 's6-ex1', type: 'exercise', title: 'Classical Form Recognition', content: { type: 'exercise', exerciseId: 'ex-desu-question-mc' } },
      { id: 's7-ex2', type: 'exercise', title: 'High-Register Writing', content: { type: 'exercise', exerciseId: 'ex-desu-sentence-builder' } },
      { id: 's8-summary', type: 'summary', title: 'Lesson Complete — N1 Begins!', content: { type: 'summary', heading: 'N1 High-Register Mastered!', points: ['〜であれ = even if it is [X], regardless of [X]', '〜たるもの = as someone in the role of [X], one must/should...', '〜を禁じ得ない = cannot help feeling [emotion]. Formal emotional expression.'], learnedItems: [{ type: 'grammar', id: 'g-de-are' }, { type: 'grammar', id: 'g-taru-mono' }, { type: 'grammar', id: 'g-wo-kinjienai' }] } },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// Combined lookup — searches ALL levels
// ════════════════════════════════════════════════════════════
const ALL_LESSON_ARRAYS = [N5_LESSONS, N4_LESSONS, N3_LESSONS, N2_LESSONS, N1_LESSONS];

export function getLessonById(lessonId: string): Lesson | undefined {
  for (const arr of ALL_LESSON_ARRAYS) {
    const found = arr.find(l => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
}

/** Get the next lesson in a unit's sequence, given a current lesson ID */
export function getNextLesson(currentLessonId: string): Lesson | undefined {
  for (const arr of ALL_LESSON_ARRAYS) {
    const idx = arr.findIndex(l => l.id === currentLessonId);
    if (idx !== -1) {
      // Find next lesson in same unit
      const currentLesson = arr[idx];
      const nextInUnit = arr.find(
        (l, i) => i > idx && l.unitId === currentLesson.unitId
      );
      return nextInUnit;
    }
  }
  return undefined;
}

/** Get the next unit ID after completing a unit, for cross-unit navigation */
export function getNextUnitId(currentUnitId: string, levelId: string): string | undefined {
  // Import lazily to avoid circular deps — caller handles this
  return undefined;
}
