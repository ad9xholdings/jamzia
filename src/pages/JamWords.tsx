import { useState } from 'react';
import {
  BookOpen, GraduationCap, Trophy, Flame, Lightbulb,
  CheckCircle, Award
} from 'lucide-react';
import { brand } from '../config/brand';

const gradeLevels = ['K-2', '3-5', '6-8', '9-12', 'College', 'Adult'];

const wordOfDay = {
  word: 'Serendipity',
  pronunciation: '/ˌser.ənˈdɪp.ə.ti/',
  partOfSpeech: 'noun',
  definition: 'The occurrence of events by chance in a happy or beneficial way.',
  example: 'It was pure serendipity that we met at the coffee shop right before the interview.',
  origin: 'Coined by Horace Walpole, 1754, from the Persian fairy tale "The Three Princes of Serendip."',
  synonyms: ['Fortune', 'Chance', 'Fate', 'Providence']};

const lessons = [
  { id: 1, title: 'Vocabulary Foundations', level: 'K-2', lessons: 12, completed: 8, icon: '📖', color: 'green' },
  { id: 2, title: 'Reading Comprehension', level: '3-5', lessons: 16, completed: 5, icon: '📚', color: 'blue' },
  { id: 3, title: 'Essay Writing Masterclass', level: '6-8', lessons: 10, completed: 3, icon: '✍️', color: 'purple' },
  { id: 4, title: 'Advanced Grammar', level: '9-12', lessons: 14, completed: 0, icon: '📝', color: 'amber' },
  { id: 5, title: 'Critical Analysis', level: 'College', lessons: 8, completed: 0, icon: '🎓', color: 'red' },
  { id: 6, title: 'Public Speaking', level: 'Adult', lessons: 6, completed: 2, icon: '🎤', color: 'pink' },
];

const wordGames = [
  { name: 'Spelling Bee', desc: 'Test your spelling under pressure', players: '12.4K', icon: '🐝', hot: true },
  { name: 'Word Chain', desc: 'Connect words in a sequence', players: '8.9K', icon: '⛓️', hot: false },
  { name: 'Synonym Match', desc: 'Find the matching pairs', players: '6.7K', icon: '🔄', hot: false },
  { name: 'Crossword Jam', desc: 'Solve the puzzle daily', players: '15.2K', icon: '🔲', hot: true },
  { name: 'Vocab Race', desc: 'Race against the clock', players: '9.8K', icon: '⏱️', hot: true },
  { name: 'Story Builder', desc: 'Create stories from prompts', players: '4.5K', icon: '🏗️', hot: false },
];

const leaderboard = [
  { rank: 1, name: 'Aaliyah M.', points: 24500, streak: 47, badge: '👑' },
  { rank: 2, name: 'Jordan K.', points: 23100, streak: 32, badge: '🥈' },
  { rank: 3, name: 'Sophia R.', points: 22800, streak: 41, badge: '🥉' },
  { rank: 4, name: 'Marcus T.', points: 21500, streak: 28, badge: '⭐' },
  { rank: 5, name: 'Emma L.', points: 20900, streak: 35, badge: '⭐' },
];

const achievements = [
  { name: 'Word Wizard', desc: 'Learn 100 words', progress: 78, total: 100, icon: '🔮' },
  { name: 'Streak Master', desc: '30-day learning streak', progress: 23, total: 30, icon: '🔥' },
  { name: 'Bookworm', desc: 'Complete 10 reading exercises', progress: 6, total: 10, icon: '📚' },
  { name: 'Essay Pro', desc: 'Write 5 essays', progress: 2, total: 5, icon: '📝' },
];

const colorMap: Record<string, string> = {
  green: '#22c55e',
  blue: '#60a5fa',
  purple: '#a855f7',
  amber: '#f59e0b',
  red: '#ef4444',
  pink: '#ec4899'};

export default function JamWords() {
  const [activeTab, setActiveTab] = useState<'learn' | 'games' | 'leaderboard'>('learn');
  const [selectedGrade, setSelectedGrade] = useState('K-2');
  const [wordRevealed, setWordRevealed] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);

  const filteredLessons = selectedGrade === 'All' ? lessons : lessons.filter(l => l.level === selectedGrade);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-rose-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Words</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-xs font-semibold text-rose-400 mb-3">
            <GraduationCap size={12} />
            Mrs. Cotton's Academy
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Literacy & Learning</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            Build vocabulary, master grammar, and develop a lifelong love of language. From kindergarten to college.
          </p>
        </div>

        {/* Word of the Day */}
        <div className="bg-gradient-to-br from-rose-900/20 to-amber-900/10 border border-rose-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400">
              <Lightbulb size={12} />
              Word of the Day
            </span>
            <button
              onClick={() => setWordRevealed(!wordRevealed)}
              className="text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer"
            >
              {wordRevealed ? 'Hide' : 'Reveal'}
            </button>
          </div>

          {wordRevealed ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="font-display text-3xl font-bold text-white">{wordOfDay.word}</h2>
                <span className="text-sm text-[#6B7280] font-mono">{wordOfDay.pronunciation}</span>
                <span className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full">{wordOfDay.partOfSpeech}</span>
              </div>
              <p className="text-sm text-[#A0AEC0] mb-2">{wordOfDay.definition}</p>
              <p className="text-xs text-amber-400/80 italic mb-3">"{wordOfDay.example}"</p>
              <div className="flex items-center gap-2 mb-3">
                {wordOfDay.synonyms.map(s => (
                  <span key={s} className="text-[10px] bg-white/5 text-[#A0AEC0] px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <button
                onClick={() => setShowOrigin(!showOrigin)}
                className="text-[10px] text-[#6B7280] hover:text-rose-400 transition-colors cursor-pointer"
              >
                {showOrigin ? 'Hide' : 'Show'} etymology
              </button>
              {showOrigin && (
                <p className="text-[10px] text-[#6B7280] mt-1 italic">{wordOfDay.origin}</p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-[#A0AEC0]">Tap "Reveal" to learn today's word</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-6">
          {(['learn', 'games', 'leaderboard'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${
                activeTab === tab
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'text-[#6B7280] hover:text-white border border-transparent'
              }`}
            >
              {tab === 'leaderboard' ? 'Rankings' : tab}
            </button>
          ))}
        </div>

        {/* Learn Tab */}
        {activeTab === 'learn' && (
          <>
            {/* Grade Filter */}
            <div className="flex gap-1 overflow-x-auto pb-2 mb-4">
              {gradeLevels.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    selectedGrade === g
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-[#0A0F1E] text-[#6B7280] border border-white/[0.06]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Progress Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Words Learned', value: '1,240', icon: BookOpen },
                { label: 'Lessons Done', value: '18/66', icon: CheckCircle },
                { label: 'Day Streak', value: '23', icon: Flame },
                { label: 'Rank', value: '#42', icon: Trophy },
              ].map(s => (
                <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
                  <s.icon size={20} className="mx-auto mb-2 text-rose-400" />
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[10px] text-[#6B7280]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredLessons.map(l => {
                const c = colorMap[l.color] || '#7096D1';
                const pct = Math.round((l.completed / l.lessons) * 100);
                return (
                  <div key={l.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 hover:border-rose-500/20 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{l.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{l.title}</p>
                        <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${c}20`, color: c }}>{l.level}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#6B7280] mb-2">
                      <span>{l.completed} of {l.lessons} lessons</span>
                      <span style={{ color: c }}>{pct}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: c }} />
                    </div>
                    <button className="w-full mt-3 py-2 bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl cursor-pointer hover:bg-rose-500/30 transition-colors border border-rose-500/20">
                      {pct === 0 ? 'Start' : 'Continue'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-[#A0AEC0] mb-3 flex items-center gap-2">
                <Award size={14} />
                Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {achievements.map(a => {
                  const pct = Math.round((a.progress / a.total) * 100);
                  return (
                    <div key={a.name} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
                      <span className="text-2xl mb-2 block">{a.icon}</span>
                      <p className="text-sm font-semibold text-white">{a.name}</p>
                      <p className="text-[10px] text-[#6B7280] mb-2">{a.desc}</p>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[9px] text-[#6B7280] mt-1">{a.progress}/{a.total}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {wordGames.map(g => (
              <div key={g.name} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-rose-500/20 transition-all group cursor-pointer text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-3xl">{g.icon}</span>
                  {g.hot && (
                    <span className="absolute ml-16 -mt-6 text-[9px] font-semibold bg-amber-500 text-black px-1.5 py-0.5 rounded-full">Hot</span>
                  )}
                </div>
                <p className="text-sm font-semibold text-white">{g.name}</p>
                <p className="text-[10px] text-[#6B7280] mt-1">{g.desc}</p>
                <p className="text-[10px] text-rose-400 mt-2">{g.players} playing</p>
                <button className="mt-3 px-4 py-2 bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl cursor-pointer hover:bg-rose-500/30 transition-colors border border-rose-500/20">
                  Play Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Trophy size={14} className="text-amber-400" />
                Top Learners
              </h3>
              <span className="text-[10px] text-[#6B7280]">This Week</span>
            </div>
            <div className="space-y-2">
              {leaderboard.map((l, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                    i === 0 ? 'bg-amber-500/5 border border-amber-500/20' : 'bg-white/[0.02]'
                  }`}
                >
                  <span className="text-lg">{l.badge}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{l.name}</p>
                    <p className="text-[10px] text-[#6B7280]">{l.points.toLocaleString()} points</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Flame size={12} />
                    <span className="text-xs font-semibold">{l.streak}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 text-center">
              <p className="text-xs text-[#A0AEC0]">You're ranked <strong className="text-white">#42</strong> out of <strong className="text-white">8,940</strong> learners</p>
              <p className="text-[10px] text-[#6B7280] mt-1">Complete 2 more lessons to enter Top 40</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
