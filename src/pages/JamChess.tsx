/* ═══════════════════════════════════════════════════════════
   JamChess — Strategy Gaming Arena
   Built by Collective General Technologies, LLC
   ZERO gambling. Skill-based competitive play only.
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { Crown, Trophy, Star, Users, Brain, Play, Shield, Zap, Flame, Medal, Award, BookOpen } from 'lucide-react';;

/* ── Types ── */
interface Game {
  id: string;
  name: string;
  players: string;
  online: string;
  rating: number;
  type: 'chess' | 'checkers' | 'go' | 'backgammon' | 'reversi';
  skillLevel: string;
  tournaments: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  game: string;
  elo: number;
  wins: number;
  losses: number;
  streak: number;
}

/* ── Mock Data ── */
const GAMES: Game[] = [
  { id: 'c1', name: 'Classic Chess', players: '2.1M', online: '45K', rating: 4.9, type: 'chess', skillLevel: 'All Levels', tournaments: 128 },
  { id: 'c2', name: 'Speed Chess (Blitz)', players: '890K', online: '23K', rating: 4.8, type: 'chess', skillLevel: 'Advanced', tournaments: 64 },
  { id: 'c3', name: 'Checkers Pro', players: '456K', online: '12K', rating: 4.6, type: 'checkers', skillLevel: 'Beginner', tournaments: 32 },
  { id: 'c4', name: 'Go — Weiqi', players: '1.2M', online: '34K', rating: 4.9, type: 'go', skillLevel: 'Expert', tournaments: 48 },
  { id: 'c5', name: 'Backgammon Classic', players: '678K', online: '18K', rating: 4.5, type: 'backgammon', skillLevel: 'Intermediate', tournaments: 24 },
  { id: 'c6', name: 'Reversi / Othello', players: '234K', online: '8K', rating: 4.4, type: 'reversi', skillLevel: 'All Levels', tournaments: 16 },
];

const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'GrandMaster_Cuz', game: 'Chess', elo: 2847, wins: 892, losses: 34, streak: 23 },
  { rank: 2, name: 'SkyIvy_Strategist', game: 'Go', elo: 2654, wins: 756, losses: 89, streak: 12 },
  { rank: 3, name: 'BrickRoad_Tactician', game: 'Chess', elo: 2612, wins: 723, losses: 112, streak: 8 },
  { rank: 4, name: 'NoFear_CalmMind', game: 'Go', elo: 2543, wins: 654, losses: 78, streak: 15 },
  { rank: 5, name: 'QuantumThinker', game: 'Chess', elo: 2498, wins: 612, losses: 145, streak: 6 },
  { rank: 6, name: 'PatternMaster', game: 'Checkers', elo: 2389, wins: 534, losses: 67, streak: 19 },
  { rank: 7, name: 'EndgameWizard', game: 'Backgammon', elo: 2312, wins: 498, losses: 134, streak: 4 },
  { rank: 8, name: 'OpeningTheory', game: 'Chess', elo: 2287, wins: 445, losses: 123, streak: 7 },
];

/* ── Main Component ── */
export default function JamChess() {
  const [activeTab, setActiveTab] = useState<'games' | 'leaderboard' | 'learn'>('games');
  

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
                <Crown size={20} className="text-[#7096D1]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamChess</h1>
                <p className="text-[10px] text-[#6B7280]">Strategy Gaming Arena · Skill-Based · Zero Gambling</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-400"><Shield size={12} /> Skill Only</span>
              <span className="flex items-center gap-1 text-[#f59e0b]"><Trophy size={12} /> 312 Tournaments</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Games', value: '5.6M', color: '#7096D1' },
            { label: 'Online Now', value: '140K', color: '#22c55e' },
            { label: 'Tournaments', value: '312', color: '#f59e0b' },
            { label: 'ELO Ratings', value: '2.8M', color: '#a855f7' },
          ].map(s => (
            <div key={s.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <span className="text-xs text-[#6B7280]">{s.label}</span>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-1 w-fit">
          {(['games', 'leaderboard', 'learn'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === t ? 'bg-[#7096D1] text-white' : 'text-[#6B7280] hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'games' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAMES.map(game => (
              <div key={game.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 hover:border-[#2A2A2A] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1F1F1F] flex items-center justify-center">
                    <Brain size={24} className="text-[#7096D1]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{game.name}</h3>
                    <p className="text-[10px] text-[#6B7280]">{game.type} · {game.skillLevel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#6B7280] mb-3">
                  <span className="flex items-center gap-1"><Users size={10} />{game.players}</span>
                  <span className="flex items-center gap-1"><Zap size={10} className="text-emerald-400" />{game.online} online</span>
                  <span className="flex items-center gap-1"><Trophy size={10} />{game.tournaments}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className={i < Math.floor(game.rating) ? 'text-[#f59e0b]' : 'text-[#1F1F1F]'} fill={i < Math.floor(game.rating) ? 'currentColor' : 'none'} />
                    ))}
                    <span className="text-[10px] text-[#6B7280] ml-1">{game.rating}</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-[#7096D1] hover:bg-[#5a7fc0] text-white rounded-lg text-xs font-bold transition-colors">
                  <Play size={12} className="inline mr-1" /> Play Now
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#1F1F1F]">
              <h3 className="text-sm font-medium">Global Rankings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F1F1F] text-[#6B7280] text-xs">
                    <th className="text-left p-4 font-medium">Rank</th>
                    <th className="text-left p-4 font-medium">Player</th>
                    <th className="text-left p-4 font-medium">Game</th>
                    <th className="text-right p-4 font-medium">ELO</th>
                    <th className="text-right p-4 font-medium">W/L</th>
                    <th className="text-right p-4 font-medium">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADERBOARD.map(entry => (
                    <tr key={entry.rank} className="border-b border-[#1F1F1F]/50 hover:bg-white/[0.02]">
                      <td className="p-4">
                        {entry.rank <= 3 ? (
                          <Medal size={16} className={entry.rank === 1 ? 'text-[#f59e0b]' : entry.rank === 2 ? 'text-gray-300' : 'text-amber-700'} />
                        ) : <span className="text-xs text-[#6B7280]">#{entry.rank}</span>}
                      </td>
                      <td className="p-4 font-medium">{entry.name}</td>
                      <td className="p-4 text-[#6B7280] text-xs">{entry.game}</td>
                      <td className="p-4 text-right font-bold">{entry.elo}</td>
                      <td className="p-4 text-right text-xs text-[#6B7280]">{entry.wins}/{entry.losses}</td>
                      <td className="p-4 text-right">
                        <span className={`text-xs ${entry.streak >= 10 ? 'text-red-400 font-bold' : 'text-[#6B7280]'}`}>
                          {entry.streak >= 10 && <Flame size={10} className="inline mr-1" />}{entry.streak}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="text-center py-16">
            <BookOpen size={48} className="text-[#1F1F1F] mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Strategy Academy</h3>
            <p className="text-sm text-[#6B7280] mb-4">Learn openings, endgames, and advanced tactics from grandmasters.</p>
            <div className="flex items-center justify-center gap-4 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1"><BookOpen size={12} /> 120+ Lessons</span>
              <span className="flex items-center gap-1"><Users size={12} /> Grandmaster Instructors</span>
              <span className="flex items-center gap-1"><Award size={12} /> Certification</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
