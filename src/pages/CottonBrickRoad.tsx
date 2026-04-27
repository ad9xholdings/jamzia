/* ═══════════════════════════════════════════════════════════
   Cotton Brick Road — Gamified Education for JamZia™
   Stage-Based Learning · Animal Guides · Battle Quizzes
   Earn Certificates · Submit to The Castle · We Teach Success
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Map, Star, Lock, Unlock, Trophy, Zap, BookOpen, Music, Film,
  Gamepad2, Wallet, ShoppingBag, GraduationCap, MessageCircle, Wrench,
  Gavel, Crown, ChevronRight, CheckCircle, XCircle, Flag, Target,
  ArrowRight, Sparkles, Gem, Volume2
} from 'lucide-react';

/* ── Cotton Brick Road Stages ── */
const STAGES = [
  {
    id: 1,
    name: 'The Starting Line',
    icon: Flag,
    color: '#22c55e',
    lesson: 'welcome',
    desc: 'Welcome to JamZia. What is it? Why are you here? Let\'s find out.',
    tasks: ['Watch JamEx Welcome Video', 'Pass the Welcome Quiz', 'Set up your profile'],
    reward: 'Explorer Badge',
    xp: 100,
    unlocked: true,
    completed: true,
  },
  {
    id: 2,
    name: 'Music Meadow',
    icon: Music,
    color: '#a855f7',
    lesson: 'listen',
    desc: 'Learn to listen, create playlists, and upload your first beat.',
    tasks: ['Watch JamMusic Video', 'Pass Music Quiz', 'Create a playlist with 5 songs'],
    reward: 'DJ Badge',
    xp: 150,
    unlocked: true,
    completed: false,
  },
  {
    id: 3,
    name: 'Movie Mountain',
    icon: Film,
    color: '#ef4444',
    lesson: 'watch',
    desc: 'Discover films, follow series, and learn how video works.',
    tasks: ['Watch JamBoxFlix+ Video', 'Pass Video Quiz', 'Rate 3 movies'],
    reward: 'Critic Badge',
    xp: 150,
    unlocked: false,
    completed: false,
  },
  {
    id: 4,
    name: 'Game Grove',
    icon: Gamepad2,
    color: '#f59e0b',
    lesson: 'play',
    desc: 'Play games, collect JamCoins, and climb the leaderboard.',
    tasks: ['Watch JamArena Video', 'Pass Gaming Quiz', 'Earn 100 JamCoins'],
    reward: 'Gamer Badge',
    xp: 200,
    unlocked: false,
    completed: false,
  },
  {
    id: 5,
    name: 'Money Mile',
    icon: Wallet,
    color: '#22c55e',
    lesson: 'pay',
    desc: 'Learn digital wallets, payments, and how to earn money.',
    tasks: ['Watch JamPay Video', 'Pass Payments Quiz', 'Send your first tip'],
    reward: 'Banker Badge',
    xp: 250,
    unlocked: false,
    completed: false,
  },
  {
    id: 6,
    name: 'Shop Street',
    icon: ShoppingBag,
    color: '#ec4899',
    lesson: 'shop',
    desc: 'Buy what you need. Sell what you make. Open your store.',
    tasks: ['Watch JamShop Video', 'Pass Shopping Quiz', 'List your first item'],
    reward: 'Merchant Badge',
    xp: 250,
    unlocked: false,
    completed: false,
  },
  {
    id: 7,
    name: 'Learning Lane',
    icon: GraduationCap,
    color: '#7096D1',
    lesson: 'learn',
    desc: 'Take courses, earn certificates, and build your skills.',
    tasks: ['Watch JamU Video', 'Pass Education Quiz', 'Complete 1 course'],
    reward: 'Scholar Badge',
    xp: 300,
    unlocked: false,
    completed: false,
  },
  {
    id: 8,
    name: 'Connection Corner',
    icon: MessageCircle,
    color: '#06b6d4',
    lesson: 'connect',
    desc: 'Make friends, join events, and build your community.',
    tasks: ['Watch JamSocial Video', 'Pass Social Quiz', 'Join 1 group event'],
    reward: 'Networker Badge',
    xp: 300,
    unlocked: false,
    completed: false,
  },
  {
    id: 9,
    name: 'Build Boulevard',
    icon: Wrench,
    color: '#C9A03F',
    lesson: 'build',
    desc: 'Create apps, deploy websites, and code your ideas.',
    tasks: ['Watch JamDAVE Video', 'Pass Build Quiz', 'Upload from your DAW'],
    reward: 'Builder Badge',
    xp: 400,
    unlocked: false,
    completed: false,
  },
  {
    id: 10,
    name: 'Governance Garden',
    icon: Gavel,
    color: '#8b5cf6',
    lesson: 'govern',
    desc: 'Vote, share ideas, and help shape the future.',
    tasks: ['Watch JamVote Video', 'Pass Governance Quiz', 'Cast your first vote'],
    reward: 'Citizen Badge',
    xp: 400,
    unlocked: false,
    completed: false,
  },
  {
    id: 11,
    name: 'The Castle Gates',
    icon: Crown,
    color: '#C9A03F',
    lesson: 'castle',
    desc: 'Submit your songs, videos, and films for worldwide distribution.',
    tasks: ['Watch Castle Video', 'Pass Castle Quiz', 'Submit your first creative work'],
    reward: 'Royal Badge',
    xp: 1000,
    unlocked: false,
    completed: false,
  },
];

export default function CottonBrickRoad() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [totalXP, setTotalXP] = useState(100);
  const [badges, setBadges] = useState<string[]>(['Explorer Badge']);

  const stage = selectedStage ? STAGES.find(s => s.id === selectedStage) : null;
  const progress = Math.round((STAGES.filter(s => s.completed).length / STAGES.length) * 100);

  const completeStage = (id: number) => {
    const s = STAGES.find(x => x.id === id);
    if (!s) return;
    s.completed = true;
    setTotalXP(prev => prev + s.xp);
    setBadges(prev => [...prev, s.reward]);
    const next = STAGES.find(x => x.id === id + 1);
    if (next) next.unlocked = true;
    setSelectedStage(null);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#C9A03F]/10 border border-[#C9A03F]/20 flex items-center justify-center">
              <Map size={24} className="text-[#C9A03F]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Cotton Brick Road™</h1>
              <p className="text-sm text-[#6B7280]">Game-Stage Education · Earn Badges · Reach The Castle</p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg">
              <Zap size={14} className="text-[#C9A03F]" />
              <span className="text-xs font-bold">{totalXP} XP</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg">
              <Trophy size={14} className="text-[#C9A03F]" />
              <span className="text-xs text-[#6B7280]">{badges.length} Badges</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg">
              <Target size={14} className="text-[#22c55e]" />
              <span className="text-xs text-[#6B7280]">{STAGES.filter(s => s.completed).length}/{STAGES.length} Stages</span>
            </div>
            <div className="flex-1 h-2 bg-[#1F1F1F] rounded-full max-w-[200px]">
              <div className="h-full bg-[#C9A03F] rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {!selectedStage ? (
          <div className="space-y-6">
            {/* Intro */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 text-center">
              <h2 className="text-lg font-bold mb-2">Walk the Road. Learn the Platform. Earn Your Crown.</h2>
              <p className="text-sm text-[#6B7280] max-w-lg mx-auto">
                Each stage teaches one part of JamZia. Complete tasks, pass battle quizzes, earn badges and XP.
                Reach Stage 11 to enter The Castle — submit your art for worldwide distribution.
              </p>
              <p className="text-xs text-[#C9A03F] mt-2 font-medium">We teach success. We make courses that earn.</p>
            </div>

            {/* Road Map */}
            <div className="space-y-3">
              {STAGES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => s.unlocked && setSelectedStage(s.id)}
                    disabled={!s.unlocked}
                    className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      s.completed
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : s.unlocked
                        ? 'bg-[#0A0A0A] border-[#1F1F1F] hover:border-[#C9A03F]/40'
                        : 'bg-[#0A0A0A]/50 border-[#1F1F1F]/30 opacity-40'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: s.unlocked ? `${s.color}15` : '#111' }}>
                      {s.completed ? <CheckCircle size={24} className="text-emerald-400" /> :
                       !s.unlocked ? <Lock size={20} className="text-[#6B7280]" /> :
                       <Icon size={20} style={{ color: s.color }} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold">Stage {s.id}</span>
                        {s.completed && <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] rounded">DONE</span>}
                        {!s.unlocked && <span className="px-1.5 py-0.5 bg-[#1F1F1F] text-[#6B7280] text-[9px] rounded">LOCKED</span>}
                      </div>
                      <h3 className="text-sm font-bold">{s.name}</h3>
                      <p className="text-xs text-[#6B7280]">{s.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#C9A03F]">+{s.xp} XP</span>
                      <p className="text-[10px] text-[#6B7280]">{s.reward}</p>
                    </div>
                    <ChevronRight size={16} className={`shrink-0 ${s.unlocked ? 'text-[#6B7280]' : 'text-[#1F1F1F]'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        ) : stage ? (
          <div className="max-w-xl mx-auto space-y-4">
            <button
              onClick={() => setSelectedStage(null)}
              className="text-xs text-[#6B7280] hover:text-white flex items-center gap-1"
            >
              <ChevronRight size={12} className="rotate-180" /> Back to the Road
            </button>

            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stage.color}15` }}>
                  <stage.icon size={24} style={{ color: stage.color }} />
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280]">Stage {stage.id}</span>
                  <h2 className="text-xl font-bold">{stage.name}</h2>
                </div>
              </div>

              <p className="text-sm text-[#6B7280] mb-4">{stage.desc}</p>

              {/* Tasks */}
              <div className="space-y-2 mb-4">
                <h3 className="text-xs font-bold text-[#C9A03F] mb-2">TASKS TO COMPLETE</h3>
                {stage.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded border border-[#1F1F1F] flex items-center justify-center">
                      {stage.completed && <CheckCircle size={12} className="text-emerald-400" />}
                    </div>
                    <span className={stage.completed ? 'text-emerald-400' : 'text-[#6B7280]'}>{task}</span>
                  </div>
                ))}
              </div>

              {/* Reward */}
              <div className="bg-black border border-[#1F1F1F] rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase">Reward</p>
                    <p className="text-sm font-bold">{stage.reward}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#6B7280] uppercase">XP</p>
                    <p className="text-sm font-bold text-[#C9A03F]">+{stage.xp}</p>
                  </div>
                </div>
              </div>

              {!stage.completed ? (
                <button
                  onClick={() => completeStage(stage.id)}
                  className="w-full py-3 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle size={16} /> Complete Stage & Earn Badge
                </button>
              ) : (
                <div className="text-center py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                  <CheckCircle size={20} className="mx-auto text-emerald-400 mb-1" />
                  <p className="text-sm font-bold text-emerald-400">Stage Complete!</p>
                  <p className="text-xs text-[#6B7280]">Badge earned: {stage.reward}</p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
