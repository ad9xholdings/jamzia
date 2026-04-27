/* ═══════════════════════════════════════════════════════════
   JamGames™ — The Gaming Hub
   All JamZia games, AR experiences, and mini-games in one place
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Gamepad2, Map, Sword, Crown, Trophy, Sparkles, Star,
  Zap, Target, Snowflake, Heart, Brain, BookOpen,
  Volume2, Globe, Baby, ChevronRight,
  Users, Flame, Crosshair, Compass, Shield,
  ArrowRight, Dices, Grid3x3, Layers,
} from 'lucide-react';

/* ── Main Game Catalog ── */
const MAIN_GAMES = [
  {
    id: 'cottoncastle',
    name: 'Cotton Castle™',
    subtitle: 'AR Battle Arena',
    desc: 'The ultimate AR battle game. Summon creatures, cast spells, and conquer the castle in augmented reality.',
    icon: Crown,
    color: '#ef4444',
    players: 8452,
    rating: 4.8,
    featured: true,
    route: '/battle',
    tags: ['AR', 'Multiplayer', 'Strategy'],
  },
  {
    id: 'cottonbrickroad',
    name: 'Cotton Brick Road™',
    subtitle: 'AR Learning Adventure',
    desc: 'Walk the road of knowledge. Battle Evil Challengers, befriend Guardians, and earn 10,000 bricks to mastery.',
    icon: Map,
    color: '#f59e0b',
    players: 12847,
    rating: 4.9,
    featured: true,
    route: '/cottonbrickroad',
    tags: ['AR', 'Education', 'RPG'],
  },
];

/* ── AR Mini-Games ── */
const AR_GAMES = [
  {
    id: 'wordwalk',
    name: 'Word Walk AR',
    desc: 'Explore the real world to discover and collect phonics creatures hiding in plain sight.',
    icon: Target,
    color: '#22c55e',
    route: '/cottonbrickroad',
  },
  {
    id: 'treasuretrail',
    name: 'Treasure Trail AR',
    desc: 'Hunt for AR phonics treasures scattered throughout your neighborhood.',
    icon: Sparkles,
    color: '#f59e0b',
    route: '/cottonbrickroad',
  },
  {
    id: 'brickhop',
    name: 'Brick Hop AR',
    desc: 'Roll, move, and answer phonics challenges to advance across the board.',
    icon: Dices,
    color: '#a855f7',
    route: '/cottonbrickroad',
  },
  {
    id: 'wordlock',
    name: 'Word Lock',
    desc: 'Guess the word before the icy creature freezes your progress.',
    icon: Snowflake,
    color: '#3b82f6',
    route: '/cottonbrickroad',
  },
  {
    id: 'wordweave',
    name: 'Word Weave',
    desc: 'Interlock phonics clues into a grid of hidden words.',
    icon: Grid3x3,
    color: '#7096D1',
    route: '/cottonbrickroad',
  },
  {
    id: 'tonguetamer',
    name: 'Tongue Tamer',
    desc: 'Daily bite-sized phonics lessons to master any language one sound at a time.',
    icon: Globe,
    color: '#06b6d4',
    route: '/academy',
  },
  {
    id: 'firststeps',
    name: 'First Steps',
    desc: 'Gentle alphabet adventures for early learners ages 2-6. Letters come alive in AR.',
    icon: Baby,
    color: '#ec4899',
    route: '/academy',
  },
  {
    id: 'soundloop',
    name: 'Sound Loop',
    desc: "Mrs. Cotton's proven phonics method in daily audio-visual loops that build fluency.",
    icon: Volume2,
    color: '#f97316',
    route: '/academy',
  },
];

/* ── Creature Codex Preview ── */
const CREATURES_PREVIEW = [
  { name: 'Viridia', type: 'challenger', icon: Flame, color: '#22c55e', move: 'The Lethal Dose', domain: 'Chemistry' },
  { name: 'Arachne', type: 'challenger', icon: Shield, color: '#6B7280', move: 'The Trapdoor', domain: 'Cybersecurity' },
  { name: 'Drakon', type: 'challenger', icon: Flame, color: '#f97316', move: 'The Extinction Event', domain: 'History' },
  { name: 'Leo', type: 'challenger', icon: Crown, color: '#f59e0b', move: 'The Royal Decree', domain: 'Leadership' },
  { name: 'Athena', type: 'mentor', icon: Brain, color: '#a855f7', move: 'Socratic Method', domain: 'Mathematics' },
  { name: 'Echo', type: 'mentor', icon: Volume2, color: '#06b6d4', move: 'Immersive Practice', domain: 'Languages' },
  { name: 'Buddy', type: 'companion', icon: Heart, color: '#f43f5e', move: 'Fetch Resource', domain: 'General' },
  { name: 'Ink', type: 'companion', icon: Layers, color: '#a855f7', move: 'Camouflage', domain: 'Creativity' },
];

/* ── Leaderboard ── */
const LEADERBOARD = [
  { rank: 1, name: 'ClarkCotton', bricks: 8942, level: 'Master', avatar: '👑' },
  { rank: 2, name: 'PhonicsQueen', bricks: 7234, level: 'Expert', avatar: '⭐' },
  { rank: 3, name: 'AR_Wizard', bricks: 6512, level: 'Expert', avatar: '🧙' },
  { rank: 4, name: 'WordHunter', bricks: 5431, level: 'Specialist', avatar: '🎯' },
  { rank: 5, name: 'JamZiaFan', bricks: 4890, level: 'Specialist', avatar: '🎮' },
];

/* ═══════ MAIN PAGE ═══════ */
export default function JamGames() {
  const [activeTab, setActiveTab] = useState<'featured' | 'ar' | 'creatures' | 'leaderboard'>('featured');

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ef4444] to-[#f59e0b] flex items-center justify-center">
              <Gamepad2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">JamGames™</h1>
              <p className="text-[10px] text-[#6B7280]">All AR games, battles, and learning adventures</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-[#f59e0b]">21,299</p>
                <p className="text-[9px] text-[#6B7280]">Active Players</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-1">
          {[
            { id: 'featured' as const, label: 'Featured', icon: Star },
            { id: 'ar' as const, label: 'AR Mini-Games', icon: Crosshair },
            { id: 'creatures' as const, label: 'Creatures', icon: Zap },
            { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                activeTab === t.id ? 'bg-[#7096D1]/10 text-[#7096D1]' : 'text-[#6B7280] hover:text-white'
              }`}
            >
              <t.icon size={12} /> {t.label}
            </button>
          ))}
        </div>

        {/* Featured Games */}
        {activeTab === 'featured' && (
          <div className="space-y-6">
            {/* Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MAIN_GAMES.map((game) => (
                <a
                  key={game.id}
                  href={`#${game.route}`}
                  className="group relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] to-[#050810] border border-white/[0.06] hover:border-white/[0.12] rounded-2xl p-5 transition-all no-underline"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: game.color }} />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${game.color}15` }}>
                        <game.icon size={24} style={{ color: game.color }} />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white">{game.name}</p>
                        <p className="text-[10px] text-[#6B7280]">{game.subtitle}</p>
                      </div>
                      {game.featured && <Star size={14} className="text-[#f59e0b] fill-[#f59e0b] ml-auto" />}
                    </div>
                    <p className="text-xs text-[#A0AEC0] mb-3">{game.desc}</p>
                    <div className="flex items-center gap-3 mb-3">
                      {game.tags.map((tag) => (
                        <span key={tag} className="text-[9px] bg-white/[0.04] text-[#6B7280] px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
                        <span className="flex items-center gap-1"><Users size={10} /> {game.players.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Star size={10} className="text-[#f59e0b]" /> {game.rating}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-[#7096D1] group-hover:text-white transition-colors">
                        Play <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Access to Academy Games */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#22c55e]" />
                  <h3 className="text-sm font-bold text-white">Also in Mrs. Cotton's Academy</h3>
                </div>
                <a href="#/academy" className="text-[10px] text-[#7096D1] hover:text-white no-underline">Go to Academy →</a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AR_GAMES.slice(0, 4).map((game) => (
                  <a
                    key={game.id}
                    href={`#${game.route}`}
                    className="bg-[#050810] border border-white/[0.04] hover:border-white/[0.08] rounded-xl p-3 text-center transition-all no-underline"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${game.color}15` }}>
                      <game.icon size={20} style={{ color: game.color }} />
                    </div>
                    <p className="text-[11px] font-bold text-white">{game.name}</p>
                    <p className="text-[9px] text-[#6B7280] mt-0.5">{game.desc.slice(0, 40)}...</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AR Mini-Games */}
        {activeTab === 'ar' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {AR_GAMES.map((game) => (
                <a
                  key={game.id}
                  href={`#${game.route}`}
                  className="group bg-[#0A0F1E] border border-white/[0.06] hover:border-white/[0.1] rounded-xl p-4 transition-all no-underline"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${game.color}15` }}>
                      <game.icon size={20} style={{ color: game.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{game.name}</p>
                      <p className="text-[9px] text-[#6B7280]">{game.id.includes('ar') ? 'AR Enabled' : 'Standard'}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#A0AEC0] mb-3">{game.desc}</p>
                  <span className="flex items-center gap-1 text-[10px] text-[#7096D1] group-hover:text-white transition-colors">
                    Launch <ArrowRight size={10} />
                  </span>
                </a>
              ))}
            </div>

            {/* AR Camera Demo */}
            <div className="bg-black border border-white/[0.06] rounded-2xl overflow-hidden relative aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Compass size={32} className="text-[#7096D1] mx-auto mb-2 animate-pulse" />
                  <p className="text-sm text-white">AR Camera Ready</p>
                  <p className="text-[10px] text-[#6B7280] mt-1">Select a game to activate AR mode</p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-[#7096D1]/30 rounded-2xl m-4" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[#7096D1]/20 animate-pulse" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#7096D1]/20 animate-pulse" />
            </div>
          </div>
        )}

        {/* Creatures */}
        {activeTab === 'creatures' && (
          <div className="space-y-4">
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={16} className="text-[#f59e0b]" />
                <h3 className="text-sm font-bold text-white">Agentic Creatures of Cotton Brick Road</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CREATURES_PREVIEW.map((c) => (
                  <div key={c.name} className="bg-[#050810] border border-white/[0.04] rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}15` }}>
                        <c.icon size={16} style={{ color: c.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{c.name}</p>
                        <p className="text-[8px] text-[#6B7280] capitalize">{c.type}</p>
                      </div>
                    </div>
                    <p className="text-[9px] text-[#A0AEC0] mb-1">{c.domain}</p>
                    <p className="text-[9px] text-[#f59e0b]">{c.move}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <a href="#/cottonbrickroad" className="inline-flex items-center gap-2 px-4 py-2 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 text-[#f59e0b] text-xs rounded-xl no-underline">
                  <Sword size={12} /> Enter Cotton Brick Road to Battle
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={16} className="text-[#f59e0b]" />
              <h3 className="text-sm font-bold text-white">Global Leaderboard</h3>
              <span className="text-[10px] text-[#6B7280] ml-auto">This Week</span>
            </div>
            <div className="space-y-2">
              {LEADERBOARD.map((p) => (
                <div key={p.rank} className="flex items-center gap-3 bg-[#050810] border border-white/[0.04] rounded-xl p-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    p.rank === 1 ? 'bg-[#f59e0b]/20 text-[#f59e0b]' :
                    p.rank === 2 ? 'bg-[#A0AEC0]/20 text-[#A0AEC0]' :
                    p.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-white/[0.04] text-[#6B7280]'
                  }`}>
                    {p.rank}
                  </div>
                  <span className="text-base">{p.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white">{p.name}</p>
                    <p className="text-[9px] text-[#6B7280]">{p.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#f59e0b]">{p.bricks.toLocaleString()}</p>
                    <p className="text-[9px] text-[#6B7280]">bricks</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#6B7280] text-center mt-4">
              Play Cotton Brick Road or Cotton Castle to earn bricks and climb the leaderboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
