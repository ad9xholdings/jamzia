/* ═══════════════════════════════════════════════════════════
   JamEx™ — AI Explainer Video Hub
   100% AI Generated · 5th Grade Level · One Video Per Page
   Bugs, Insects & Animals Guide You Through JamZia™
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Play, Pause, Star, Bug, Feather, Shell, Crown, BookOpen, Tv,
  Music, Gamepad2, ShoppingBag, Wallet, GraduationCap, MessageCircle,
  Wrench, Gavel, Volume2, Film, Radio, ListVideo, Zap, ChevronRight,
  Clock, CheckCircle, Lock, Unlock, Trophy, ArrowRight, Sparkles
} from 'lucide-react';

/* ── AI Video Library — One video per major platform ── */
const VIDEO_CATALOG = [
  {
    id: 'welcome',
    title: 'Welcome to JamZia™',
    guide: 'Luna the Ladybug',
    icon: Bug,
    color: '#C9A03F',
    duration: '2:30',
    videoSrc: '/videos/jamex-welcome.mp4',
    desc: 'What is JamZia? A place where you can listen, watch, play, learn, build, and earn — all in one app.',
    unlocked: true,
    quizDone: true,
  },
  {
    id: 'listen',
    title: 'JamMusic — Your Music World',
    guide: 'Melody the Cricket',
    icon: Music,
    color: '#a855f7',
    duration: '1:45',
    videoSrc: '/videos/cotton-road.mp4',
    desc: 'Play any song, make playlists, discover new artists, and even upload your own beats.',
    unlocked: true,
    quizDone: false,
  },
  {
    id: 'watch',
    title: 'JamBoxFlix+ — Movies & Shows',
    guide: 'Reel the Butterfly',
    icon: Film,
    color: '#ef4444',
    duration: '2:00',
    videoSrc: '',
    desc: 'Watch movies, follow series, and see what your friends are viewing.',
    unlocked: true,
    quizDone: false,
  },
  {
    id: 'play',
    title: 'JamArena — Games & Fun',
    guide: 'Pixel the Firefly',
    icon: Gamepad2,
    color: '#22c55e',
    duration: '1:30',
    videoSrc: '',
    desc: 'Play games, collect coins, solve puzzles, and climb the leaderboard.',
    unlocked: true,
    quizDone: false,
  },
  {
    id: 'pay',
    title: 'JamPay — Your Digital Wallet',
    guide: 'Coin the Beetle',
    icon: Wallet,
    color: '#f59e0b',
    duration: '2:15',
    videoSrc: '',
    desc: 'Send and receive digital money safely. Learn about coins, credits, and payments.',
    unlocked: false,
    quizDone: false,
  },
  {
    id: 'shop',
    title: 'JamShop — Buy & Sell',
    guide: 'Cart the Ant',
    icon: ShoppingBag,
    color: '#ec4899',
    duration: '1:50',
    videoSrc: '',
    desc: 'Buy clothes, tech, food, and tickets. Or open your own store and sell to the world.',
    unlocked: false,
    quizDone: false,
  },
  {
    id: 'learn',
    title: 'JamU — School of the Future',
    guide: 'Wise the Owl',
    icon: GraduationCap,
    color: '#7096D1',
    duration: '2:45',
    videoSrc: '/videos/cotton-castle.mp4',
    desc: 'Take free courses, earn certificates, and learn skills that make you money.',
    unlocked: false,
    quizDone: false,
  },
  {
    id: 'connect',
    title: 'JamSocial — Friends & Events',
    guide: 'Echo the Bird',
    icon: MessageCircle,
    color: '#06b6d4',
    duration: '1:40',
    videoSrc: '',
    desc: 'Make friends, join events, find your community, and build your network.',
    unlocked: false,
    quizDone: false,
  },
  {
    id: 'build',
    title: 'JamDAVE™ — Create Like a Pro',
    guide: 'Wave the Spider',
    icon: Wrench,
    color: '#C9A03F',
    duration: '3:00',
    videoSrc: '',
    desc: 'Record music, edit video, mix audio, and share your creations with the world.',
    unlocked: false,
    quizDone: false,
  },
  {
    id: 'govern',
    title: 'JamVote — Have a Say',
    guide: 'Scale the Lizard',
    icon: Gavel,
    color: '#8b5cf6',
    duration: '2:10',
    videoSrc: '',
    desc: 'Vote on rules, share ideas, and help decide what JamZia becomes next.',
    unlocked: false,
    quizDone: false,
  },
  {
    id: 'dave',
    title: 'JamDAVE™ Engine — Make Music & Film',
    guide: 'Sonic the Moth',
    icon: Volume2,
    color: '#C9A03F',
    duration: '2:30',
    videoSrc: '',
    desc: 'Anyone can upload direct from their DAW into JamDAVE. Mix, master, mint, and monetize.',
    unlocked: false,
    quizDone: false,
  },
  {
    id: 'castle',
    title: 'The Castle — Submit Your Art',
    guide: 'Royal the Bee',
    icon: Crown,
    color: '#C9A03F',
    duration: '2:00',
    videoSrc: '',
    desc: 'Submit songs, music videos, episodes, and films for worldwide distribution.',
    unlocked: false,
    quizDone: false,
  },
];

/* ── Quiz Questions per video ── */
const QUIZZES: Record<string, { q: string; options: string[]; correct: number }[]> = {
  welcome: [
    { q: 'What is JamZia?', options: ['A social network', 'An everything app for music, movies, games, money, and learning', 'A video game', 'A school'], correct: 1 },
    { q: 'How many main things can you do on JamZia?', options: ['3', '5', '9', '100'], correct: 2 },
    { q: 'Who is Luna the Ladybug?', options: ['A game character', 'Your guide in JamEx videos', 'A singer', 'A teacher'], correct: 1 },
  ],
  listen: [
    { q: 'What can you do on JamMusic?', options: ['Only listen', 'Play songs, make playlists, and upload beats', 'Watch movies', 'Shop for clothes'], correct: 1 },
    { q: 'Can you upload your own music?', options: ['Yes', 'No', 'Only if you are famous', 'Only on Fridays'], correct: 0 },
  ],
  watch: [
    { q: 'What is JamBoxFlix+ for?', options: ['Playing games', 'Watching movies and shows', 'Buying food', 'Learning math'], correct: 1 },
    { q: 'Can you follow a series on JamBoxFlix+?', options: ['Yes', 'No', 'Only old shows', 'Only cartoons'], correct: 0 },
  ],
  play: [
    { q: 'What do you collect in JamArena games?', options: ['Stamps', 'JamCoins', 'Real money', 'Toys'], correct: 1 },
    { q: 'Can you climb a leaderboard?', options: ['Yes by playing and winning', 'No', 'Only adults can', 'Only on weekends'], correct: 0 },
  ],
  dave: [
    { q: 'What does JamDAVE let you do?', options: ['Make music and video', 'Order pizza', 'Buy a car', 'Vote on laws'], correct: 0 },
    { q: 'Can you upload from your DAW to JamDAVE?', options: ['Yes anyone can', 'No', 'Only professionals', 'Only with special permission'], correct: 0 },
  ],
  castle: [
    { q: 'What do you submit at The Castle?', options: ['Homework', 'Songs, videos, and films for distribution', 'Food orders', 'Game scores'], correct: 1 },
    { q: 'Where does your art go after The Castle?', options: ['Only on JamZia', 'Worldwide on every music and film platform', 'In a drawer', 'Nowhere'], correct: 1 },
  ],
};

export default function JamEx() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selected = VIDEO_CATALOG.find(v => v.id === activeVideo);
  const quiz = selected ? (QUIZZES[selected.id] || []) : [];

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correct = quiz.filter((q, i) => quizAnswers[i] === q.correct).length;
    if (correct >= quiz.length * 0.7) {
      // Unlock next video
      const idx = VIDEO_CATALOG.findIndex(v => v.id === activeVideo);
      if (idx >= 0 && idx < VIDEO_CATALOG.length - 1) {
        VIDEO_CATALOG[idx + 1].unlocked = true;
      }
    }
  };

  const completedCount = VIDEO_CATALOG.filter(v => v.quizDone).length;
  const progress = Math.round((completedCount / VIDEO_CATALOG.length) * 100);

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#C9A03F]/10 border border-[#C9A03F]/20 flex items-center justify-center">
              <Sparkles size={24} className="text-[#C9A03F]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">JamEx™</h1>
              <p className="text-sm text-[#6B7280]">AI Explainer Videos · 100% AI Generated · 5th Grade Level</p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg">
              <BookOpen size={14} className="text-[#7096D1]" />
              <span className="text-xs text-[#6B7280]">{VIDEO_CATALOG.length} Lessons</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg">
              <Bug size={14} className="text-[#22c55e]" />
              <span className="text-xs text-[#6B7280]">Animal Guides</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg">
              <Trophy size={14} className="text-[#C9A03F]" />
              <span className="text-xs text-[#6B7280]">{completedCount}/{VIDEO_CATALOG.length} Quizzes Passed</span>
            </div>
            <div className="flex-1 h-2 bg-[#1F1F1F] rounded-full max-w-[200px]">
              <div className="h-full bg-[#C9A03F] rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {!activeVideo ? (
          <div className="space-y-6">
            {/* Hero intro */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 text-center">
              <h2 className="text-lg font-bold mb-2">Learn JamZia™ One Video at a Time</h2>
              <p className="text-sm text-[#6B7280] max-w-xl mx-auto mb-4">
                Each video is 100% AI generated and designed for a 5th grader to understand.
                Friendly bugs, insects, and animals walk you through every page.
                Pass the battle quiz to unlock the next lesson.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="px-3 py-1 bg-[#C9A03F]/10 border border-[#C9A03F]/20 rounded-full text-[10px] font-bold text-[#C9A03F]">Watch</span>
                <ArrowRight size={10} className="text-[#6B7280]" />
                <span className="px-3 py-1 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full text-[10px] font-bold text-[#22c55e]">Quiz</span>
                <ArrowRight size={10} className="text-[#6B7280]" />
                <span className="px-3 py-1 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-full text-[10px] font-bold text-[#a855f7]">Unlock</span>
                <ArrowRight size={10} className="text-[#6B7280]" />
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400">Earn</span>
              </div>
            </div>

            {/* Video grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIDEO_CATALOG.map(video => {
                const Icon = video.icon;
                return (
                  <button
                    key={video.id}
                    onClick={() => video.unlocked && setActiveVideo(video.id)}
                    disabled={!video.unlocked}
                    className={`text-left bg-[#0A0A0A] border rounded-xl p-4 transition-all ${
                      video.unlocked ? 'border-[#1F1F1F] hover:border-[#C9A03F]/40 cursor-pointer' : 'border-[#1F1F1F]/50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${video.color}15` }}>
                        <Icon size={20} style={{ color: video.color }} />
                      </div>
                      <div className="flex items-center gap-1">
                        {!video.unlocked && <Lock size={12} className="text-[#6B7280]" />}
                        {video.quizDone && <CheckCircle size={12} className="text-emerald-400" />}
                        <span className="text-[10px] text-[#6B7280]">{video.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold mb-1">{video.title}</h3>
                    <p className="text-[10px] text-[#6B7280] mb-2">Guide: <span style={{ color: video.color }}>{video.guide}</span></p>
                    <p className="text-xs text-[#6B7280] line-clamp-2">{video.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : selected ? (
          <div className="max-w-3xl mx-auto space-y-4">
            <button
              onClick={() => { setActiveVideo(null); setQuizMode(false); setQuizSubmitted(false); setQuizAnswers({}); }}
              className="text-xs text-[#6B7280] hover:text-white flex items-center gap-1 mb-2"
            >
              <ChevronRight size={12} className="rotate-180" /> Back to all lessons
            </button>

            {/* Video Player */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden">
              <div className="aspect-video bg-[#111] flex items-center justify-center relative">
                {selected.videoSrc ? (
                  <video
                    src={selected.videoSrc}
                    controls
                    className="w-full h-full object-cover"
                    poster=""
                  />
                ) : (
                  <div className="text-center">
                    <Sparkles size={48} className="mx-auto text-[#C9A03F]/30 mb-3" />
                    <p className="text-sm font-medium mb-1">AI Video Generating...</p>
                    <p className="text-xs text-[#6B7280]">{selected.guide} is being animated by AI</p>
                    <div className="w-32 h-1 bg-[#1F1F1F] rounded-full mx-auto mt-3 overflow-hidden">
                      <div className="h-full bg-[#C9A03F] rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#C9A03F]/10 text-[#C9A03F] text-[10px] font-bold rounded">{selected.guide}</span>
                  <span className="text-[10px] text-[#6B7280]"><Clock size={10} className="inline mr-1" />{selected.duration}</span>
                </div>
                <h2 className="text-xl font-bold mb-2">{selected.title}</h2>
                <p className="text-sm text-[#6B7280] mb-4">{selected.desc}</p>

                {!quizMode ? (
                  <button
                    onClick={() => setQuizMode(true)}
                    className="w-full py-3 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trophy size={16} /> Take the Battle Quiz
                  </button>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold flex items-center gap-2"><Trophy size={14} className="text-[#C9A03F]" /> Battle Quiz</h3>
                    {quiz.map((q, i) => (
                      <div key={i} className="bg-black border border-[#1F1F1F] rounded-xl p-4">
                        <p className="text-sm font-medium mb-3">{i + 1}. {q.q}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, j) => (
                            <button
                              key={j}
                              onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [i]: j }))}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                                quizAnswers[i] === j
                                  ? quizSubmitted
                                    ? j === q.correct
                                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                                    : 'bg-[#C9A03F]/10 border border-[#C9A03F]/30 text-[#C9A03F]'
                                  : 'bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-transparent'
                              }`}
                            >
                              {quizSubmitted && j === q.correct && <CheckCircle size={10} className="inline mr-1.5 text-emerald-400" />}
                              {quizSubmitted && quizAnswers[i] === j && j !== q.correct && <span className="inline mr-1.5 text-red-400">✗</span>}
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {!quizSubmitted ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < quiz.length}
                        className="w-full py-3 bg-[#C9A03F] hover:bg-[#d4aa4a] disabled:opacity-50 text-black rounded-xl text-sm font-bold transition-colors"
                      >
                        Submit Quiz
                      </button>
                    ) : (
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 text-center">
                        <p className="text-sm font-bold text-emerald-400 mb-1">
                          {quiz.filter((q, i) => quizAnswers[i] === q.correct).length}/{quiz.length} Correct!
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          {quiz.filter((q, i) => quizAnswers[i] === q.correct).length >= quiz.length * 0.7
                            ? 'Great job! Next lesson unlocked.'
                            : 'Review the video and try again.'}
                        </p>
                        <button
                          onClick={() => { setQuizMode(false); setQuizSubmitted(false); setQuizAnswers({}); }}
                          className="mt-3 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg text-xs transition-colors"
                        >
                          Close Quiz
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
