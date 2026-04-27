/* ═══════════════════════════════════════════════════════════
   JamArena — Tournament Arena
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Trophy, Swords, Users, Clock, Medal, Flame,
  Crown, Target, TrendingUp, Gift, Plus
} from 'lucide-react';

/* ── Types ── */
interface Tournament {
  id: string;
  name: string;
  game: string;
  prize: string;
  entry: string;
  players: number;
  maxPlayers: number;
  status: 'open' | 'live' | 'closed';
  startsIn: string;
  format: string;
  host: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  wins: number;
  tournaments: number;
  trend: 'up' | 'down' | 'same';
}

/* ── Mock Data ── */
const TOURNAMENTS: Tournament[] = [
  { id: 't1', name: 'Cotton Cup Championship', game: 'Cotton Brick Road™', prize: '50,000 JamCoins', entry: '500 JAM', players: 128, maxPlayers: 256, status: 'live', startsIn: 'Running', format: 'Single Elimination', host: 'Ad9x Esports' },
  { id: 't2', name: 'SkyIvy Trading Battle', game: 'JamDEX', prize: '25,000 JamCoins', entry: '1,000 JAM', players: 64, maxPlayers: 128, status: 'open', startsIn: '2h 15m', format: 'Round Robin', host: 'Conduit Capital' },
  { id: 't3', name: 'AR Creature Showdown', game: 'JamAR Arena', prize: '100,000 JamCoins', entry: '2,000 JAM', players: 89, maxPlayers: 128, status: 'live', startsIn: 'Running', format: 'Double Elimination', host: 'RiverShyre' },
  { id: 't4', name: 'Word Weave Masters', game: 'Word Weave', prize: '10,000 JamCoins', entry: 'Free', players: 512, maxPlayers: 1024, status: 'open', startsIn: '1d 4h', format: 'Swiss', host: "Mrs. Cotton's Academy" },
  { id: 't5', name: 'NoFear Invitational', game: 'Multi-Game', prize: '250,000 JamCoins', entry: 'Invite Only', players: 32, maxPlayers: 32, status: 'closed', startsIn: 'Completed', format: 'Bracket', host: 'NoFear Foundation' },
  { id: 't6', name: 'BlackDiamond Chess Masters', game: 'Chess Championship', prize: '75,000 JamCoins', entry: '500 JAM', players: 128, maxPlayers: 256, status: 'open', startsIn: '6h 30m', format: 'Swiss', host: 'BlackDiamond' },
];

const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'CuzCottonOG', points: 45200, wins: 23, tournaments: 31, trend: 'same' },
  { rank: 2, name: 'SkyIvyKing', points: 41800, wins: 19, tournaments: 28, trend: 'up' },
  { rank: 3, name: 'BrickMaster99', points: 39500, wins: 18, tournaments: 35, trend: 'up' },
  { rank: 4, name: 'PhonicsQueen', points: 37100, wins: 16, tournaments: 24, trend: 'down' },
  { rank: 5, name: 'ARwarrior', points: 35400, wins: 15, tournaments: 27, trend: 'up' },
  { rank: 6, name: 'JamZilla', points: 32800, wins: 14, tournaments: 22, trend: 'same' },
  { rank: 7, name: 'CoinHunter', points: 31200, wins: 13, tournaments: 30, trend: 'down' },
  { rank: 8, name: 'NoFearChamp', points: 29800, wins: 12, tournaments: 19, trend: 'up' },
];

/* ── Status badge ── */
function StatusBadge({ status }: { status: Tournament['status'] }) {
  const cfg = {
    open: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Registration Open' },
    live: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'LIVE' },
    closed: { bg: 'bg-gray-500/10', text: 'text-gray-400', label: 'Completed' },
  };
  const c = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${c.bg} ${c.text}`}>
      {status === 'live' && <Flame size={10} className="animate-pulse" />}
      {c.label}
    </span>
  );
}

/* ── Main Component ── */
export default function JamArena() {
  const [activeTab, setActiveTab] = useState<'tournaments' | 'leaderboard' | 'my'>('tournaments');
  const [filter, setFilter] = useState<'all' | 'open' | 'live'>('all');

  const filtered = filter === 'all' ? TOURNAMENTS : TOURNAMENTS.filter(t => t.status === filter);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                <Swords size={20} className="text-[#f59e0b]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamArena</h1>
                <p className="text-[10px] text-[#6B7280]">Tournament Arena · Compete & Win</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Trophy size={12} className="text-[#f59e0b]" />
                <span>510K JAM in prizes</span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-black rounded-lg text-xs font-bold transition-colors">
                <Plus size={12} />
                Host Tournament
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Banner */}
        <div className="relative bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f59e0b10_0%,_transparent_50%)]" />
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown size={16} className="text-[#f59e0b]" />
                <span className="text-xs text-[#f59e0b] font-medium">Featured Event</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Cotton Cup Championship</h2>
              <p className="text-sm text-[#6B7280] mb-3">The biggest tournament in JamZia. 256 players. Single elimination. One champion.</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1"><Gift size={12} className="text-[#f59e0b]" /> 50,000 JAM prize</span>
                <span className="flex items-center gap-1"><Users size={12} className="text-[#7096D1]" /> 128/256 joined</span>
                <span className="flex items-center gap-1"><Flame size={12} className="text-red-400" /> LIVE NOW</span>
              </div>
            </div>
            <button className="px-6 py-3 bg-[#f59e0b] hover:bg-[#d97706] text-black rounded-xl font-bold text-sm transition-colors shrink-0">
              Watch Live
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-1 w-fit">
          {([['tournaments', 'Tournaments', Trophy], ['leaderboard', 'Leaderboard', Medal], ['my', 'My Arena', Target]] as const).map(([tab, label, Icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-[#f59e0b] text-black' : 'text-[#6B7280] hover:text-white'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'tournaments' && (
          <>
            {/* Filter */}
            <div className="flex items-center gap-2">
              {(['all', 'open', 'live'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                    filter === f ? 'bg-[#f59e0b] text-black' : 'bg-[#0A0A0A] text-[#6B7280] border border-[#1F1F1F] hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Tournament Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(t => (
                <div key={t.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden hover:border-[#2A2A2A] transition-colors">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <StatusBadge status={t.status} />
                      <span className="text-[10px] text-[#6B7280] bg-[#1F1F1F] px-2 py-0.5 rounded">{t.format}</span>
                    </div>
                    <h3 className="font-bold mb-1">{t.name}</h3>
                    <p className="text-xs text-[#6B7280] mb-3">{t.game} · Hosted by {t.host}</p>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-black rounded-lg p-2">
                        <p className="text-[10px] text-[#6B7280]">Prize Pool</p>
                        <p className="text-sm font-bold text-[#f59e0b]">{t.prize}</p>
                      </div>
                      <div className="bg-black rounded-lg p-2">
                        <p className="text-[10px] text-[#6B7280]">Entry Fee</p>
                        <p className="text-sm font-bold">{t.entry}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3">
                      <span className="flex items-center gap-1"><Users size={12} /> {t.players}/{t.maxPlayers}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {t.startsIn}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-[#f59e0b] rounded-full transition-all" style={{ width: `${(t.players / t.maxPlayers) * 100}%` }} />
                    </div>

                    <button className={`w-full py-2 rounded-lg text-xs font-bold transition-colors ${
                      t.status === 'live' ? 'bg-red-500 hover:bg-red-600 text-white' :
                      t.status === 'open' ? 'bg-[#f59e0b] hover:bg-[#d97706] text-black' :
                      'bg-[#1F1F1F] text-[#6B7280] cursor-not-allowed'
                    }`}>
                      {t.status === 'live' ? 'Watch Live' : t.status === 'open' ? 'Register Now' : 'View Results'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#1F1F1F]">
              <h2 className="text-sm font-medium">Global Rankings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F1F1F] text-[#6B7280] text-xs">
                    <th className="text-left p-4 font-medium">Rank</th>
                    <th className="text-left p-4 font-medium">Player</th>
                    <th className="text-right p-4 font-medium">Points</th>
                    <th className="text-right p-4 font-medium">Wins</th>
                    <th className="text-right p-4 font-medium">Entered</th>
                    <th className="text-center p-4 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADERBOARD.map(entry => (
                    <tr key={entry.rank} className="border-b border-[#1F1F1F]/50 hover:bg-white/[0.02]">
                      <td className="p-4">
                        {entry.rank === 1 ? <Crown size={16} className="text-[#f59e0b]" /> :
                         entry.rank === 2 ? <Medal size={16} className="text-gray-300" /> :
                         entry.rank === 3 ? <Medal size={16} className="text-amber-700" /> :
                         <span className="text-xs text-[#6B7280]">#{entry.rank}</span>}
                      </td>
                      <td className="p-4 font-medium">{entry.name}</td>
                      <td className="p-4 text-right font-bold">{entry.points.toLocaleString()}</td>
                      <td className="p-4 text-right text-[#6B7280]">{entry.wins}</td>
                      <td className="p-4 text-right text-[#6B7280]">{entry.tournaments}</td>
                      <td className="p-4 text-center">
                        {entry.trend === 'up' ? <TrendingUp size={14} className="text-emerald-400 mx-auto" /> :
                         entry.trend === 'down' ? <TrendingUp size={14} className="text-red-400 mx-auto rotate-180" /> :
                         <span className="text-[#6B7280]">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'my' && (
          <div className="text-center py-16">
            <Target size={48} className="text-[#1F1F1F] mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">No Active Tournaments</p>
            <p className="text-sm text-[#6B7280] mb-4">Join a tournament to see your active competitions here.</p>
            <button
              onClick={() => setActiveTab('tournaments')}
              className="px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-black rounded-lg text-sm font-bold transition-colors"
            >
              Browse Tournaments
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
