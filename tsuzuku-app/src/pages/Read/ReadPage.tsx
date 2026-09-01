import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Eye, EyeSlash, CheckCircle, SpeakerHigh, CaretRight } from '@phosphor-icons/react';
import { AudioButton, JLPTBadge } from '@/components/japanese/JapaneseComponents';

interface StoryParagraph {
  japanese: string;
  reading: string;
  english: string;
}

interface GradedStory {
  id: string;
  title: string;
  titleJP: string;
  level: 'N5' | 'N4' | 'N3';
  author: string;
  description: string;
  paragraphs: StoryParagraph[];
  quiz: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
}

const GRADED_STORIES: GradedStory[] = [
  {
    id: 's1-ramen-shop',
    title: 'A Night at the Tokyo Ramen Bar',
    titleJP: 'ラーメン屋の夜',
    level: 'N5',
    author: 'TSUZUKU Editorial',
    description: 'Follow Ken as he orders his favorite hot miso ramen on a rainy evening in Shinjuku.',
    paragraphs: [
      {
        japanese: '雨が降っています。ケンさんは新宿の小さいラーメン屋に入りました。',
        reading: 'あめがふっています。ケンさんはしんじゅくのちいさいラーメンやにはいりました。',
        english: 'It is raining. Ken entered a small ramen shop in Shinjuku.',
      },
      {
        japanese: '「いらっしゃいませ！」と店員さんが元気に言いました。',
        reading: '「いらっしゃいませ！」とてんいんさんがげんきにいいました。',
        english: '"Welcome!" the staff member said energetically.',
      },
      {
        japanese: 'ケンさんは食券を買って、カウンターの席に座りました。味噌ラーメンを注文しました。',
        reading: 'ケンさんはしょっけんをかって、カウンターのせきにすわりました。みそラーメンをちゅうもんしました。',
        english: 'Ken bought a food ticket and sat at the counter seat. He ordered miso ramen.',
      },
      {
        japanese: 'ラーメンはとても熱くて美味しかったです。「ごちそうさまでした」と言って店を出ました。',
        reading: 'ラーメンはとてもあつくておいしかったです。「ごちそうさまでした」といってみせをでました。',
        english: 'The ramen was very hot and delicious. Saying "Thank you for the meal", he left the shop.',
      },
    ],
    quiz: {
      question: 'ケンさんは何のラーメンを注文しましたか？ (What kind of ramen did Ken order?)',
      options: ['味噌ラーメン (Miso Ramen)', '醤油ラーメン (Shoyu Ramen)', '豚骨ラーメン (Tonkotsu Ramen)', '塩ラーメン (Shio Ramen)'],
      answer: '味噌ラーメン (Miso Ramen)',
      explanation: 'In paragraph 3, Ken ordered 味噌ラーメン (Miso ramen).',
    },
  },
  {
    id: 's2-weekend-trip',
    title: 'Weekend Trip to Kamakura',
    titleJP: '週末の鎌倉旅行',
    level: 'N4',
    author: 'TSUZUKU Editorial',
    description: 'Taking the Enoden train along the Pacific coast to visit the Great Buddha of Kamakura.',
    paragraphs: [
      {
        japanese: '先週の土曜日、友達と一緒に電車で鎌倉に行きました。',
        reading: 'せんしゅうのどようび、ともだちといっしょにでんしゃでかまくらにいきました。',
        english: 'Last Saturday, I went to Kamakura by train together with my friend.',
      },
      {
        japanese: '江ノ電に乗って、窓から海を見ることができました。景色がとても綺麗でした。',
        reading: 'えのでんにのって、まどからうみをみることができました。けしきがとてもきれいでした。',
        english: 'Riding the Enoden line, we were able to see the ocean from the window. The view was beautiful.',
      },
      {
        japanese: '有名な大仏を見て、近くのカフェで抹茶アイスクリームを食べました。',
        reading: 'ゆうめいなだいぶつをみて、ちかくのカフェでまっちゃアイスクリームをたべました。',
        english: 'We saw the famous Great Buddha and ate matcha ice cream at a nearby cafe.',
      },
    ],
    quiz: {
      question: 'カフェで何を食べましたか？ (What did they eat at the cafe?)',
      options: ['抹茶アイスクリーム (Matcha ice cream)', '団子 (Dango)', 'クレープ (Crepe)', 'ラーメン (Ramen)'],
      answer: '抹茶アイスクリーム (Matcha ice cream)',
      explanation: 'They ate matcha ice cream (抹茶アイスクリーム) at the cafe near the Buddha.',
    },
  },
];

export default function ReadPage() {
  const [selectedStoryId, setSelectedStoryId] = useState(GRADED_STORIES[0].id);
  const [showFurigana, setShowFurigana] = useState(true);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<number, boolean>>({});
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const story = GRADED_STORIES.find(s => s.id === selectedStoryId) ?? GRADED_STORIES[0];

  const toggleTranslation = (idx: number) => {
    setRevealedTranslations(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleQuizAnswer = (opt: string) => {
    setSelectedQuizOption(opt);
    setQuizSubmitted(true);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-vermillion-400)' }}>
            <BookOpen size={16} /> Graded Reading Immersion
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Japanese Graded Reader
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Authentic, level-calibrated stories with furigana toggle, audio narration, and comprehension checks.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className="btn btn-secondary btn-sm gap-2"
          >
            {showFurigana ? <EyeSlash size={16} /> : <Eye size={16} />}
            {showFurigana ? 'Hide Furigana' : 'Show Furigana'}
          </button>
        </div>
      </div>

      {/* ── STORY SELECTOR ── */}
      <div className="flex gap-2 p-1 rounded-xl bg-[var(--color-base-800)] border border-[var(--color-base-600)] overflow-x-auto">
        {GRADED_STORIES.map(s => (
          <button
            key={s.id}
            onClick={() => {
              setSelectedStoryId(s.id);
              setRevealedTranslations({});
              setSelectedQuizOption(null);
              setQuizSubmitted(false);
            }}
            className="px-4 py-2.5 rounded-lg text-left transition-all flex-shrink-0 flex items-center gap-3"
            style={{
              background: selectedStoryId === s.id ? 'var(--color-base-700)' : 'transparent',
              border: selectedStoryId === s.id ? '1px solid var(--color-base-500)' : '1px solid transparent',
            }}
          >
            <JLPTBadge level={s.level} size="sm" />
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.title}</div>
              <div className="font-jp text-xs text-muted">{s.titleJP}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ── STORY READER CARD ── */}
      <div className="card p-8 md:p-10 space-y-8">
        <div className="border-b border-[var(--color-base-600)] pb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <JLPTBadge level={story.level} />
              <span className="text-xs text-muted">Curated Passage · {story.author}</span>
            </div>
            <h2 className="font-jp-serif text-jp-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              {story.titleJP}
            </h2>
            <div className="text-sm font-semibold text-muted">{story.title}</div>
            <p className="text-xs text-dim mt-2">{story.description}</p>
          </div>

          <AudioButton text={story.paragraphs.map(p => p.japanese).join(' ')} size={28} />
        </div>

        {/* Paragraphs */}
        <div className="space-y-6">
          {story.paragraphs.map((p, idx) => {
            const isTranslated = !!revealedTranslations[idx];

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl transition-all border border-[var(--color-base-600)] bg-[var(--color-base-800)] hover:border-[var(--color-base-500)]"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div
                    className="font-jp text-jp-xl font-medium leading-loose"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {showFurigana ? p.reading : p.japanese}
                  </div>
                  <AudioButton text={p.japanese} size={18} />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-base-700)]">
                  <button
                    onClick={() => toggleTranslation(idx)}
                    className="text-xs text-muted hover:text-[var(--color-gold-400)] transition-colors flex items-center gap-1 font-medium"
                  >
                    {isTranslated ? 'Hide English Translation' : 'Reveal English Translation'}
                  </button>
                  <span className="text-2xs font-mono text-dim">¶ {idx + 1}</span>
                </div>

                {isTranslated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 text-sm font-medium"
                    style={{ color: 'var(--color-gold-300)' }}
                  >
                    {p.english}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comprehension Quiz */}
        <div className="p-6 rounded-2xl bg-[var(--color-base-700)] border border-[var(--color-base-500)] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-gold-400)' }}>
            <CheckCircle size={16} weight="fill" /> Comprehension Check
          </div>
          <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {story.quiz.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {story.quiz.options.map(opt => {
              const isSelected = selectedQuizOption === opt;
              const isCorrect = opt === story.quiz.answer;

              return (
                <button
                  key={opt}
                  onClick={() => handleQuizAnswer(opt)}
                  disabled={quizSubmitted}
                  className="p-3.5 rounded-xl text-left text-sm font-medium transition-all border font-jp"
                  style={{
                    background: quizSubmitted
                      ? isCorrect
                        ? 'rgba(46, 168, 123, 0.2)'
                        : isSelected
                        ? 'rgba(232, 64, 64, 0.2)'
                        : 'var(--color-base-800)'
                      : isSelected
                      ? 'rgba(194, 51, 77, 0.15)'
                      : 'var(--color-base-800)',
                    borderColor: quizSubmitted
                      ? isCorrect
                        ? 'var(--color-success)'
                        : isSelected
                        ? 'var(--color-error)'
                        : 'var(--color-base-600)'
                      : 'var(--color-base-600)',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg text-xs leading-relaxed"
              style={{ background: 'var(--color-base-800)', color: 'var(--color-text-secondary)' }}
            >
              <strong>Explanation:</strong> {story.quiz.explanation}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
