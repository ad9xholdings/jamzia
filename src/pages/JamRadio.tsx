/* ═══════════════════════════════════════════════════════════
   JamRadio — Live Radio Streaming
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { Radio, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart, Share2, Signal, TrendingUp, Plus } from 'lucide-react';;

/* ── Types ── */
interface Station {
  id: string;
  name: string;
  genre: string;
  listeners: string;
  nowPlaying: string;
  host: string;
  liked: boolean;
  color: string;
}

interface Show {
  time: string;
  title: string;
  host: string;
  type: 'live' | 'scheduled';
}

/* ── Mock Data ── */
const STATIONS: Station[] = [
  { id: 'r1', name: 'JamZia FM', genre: 'Hip Hop / R&B', listeners: '45.2K', nowPlaying: 'SkyIvy — Night Lights', host: 'DJ Cotton', liked: true, color: '#ec4899' },
  { id: 'r2', name: 'BlackDiamond Radio', genre: 'Classical / Jazz', listeners: '12.8K', nowPlaying: 'Symphony No. 9 — Beethoven', host: 'Maestro', liked: false, color: '#f59e0b' },
  { id: 'r3', name: 'Wisdom Talk', genre: 'Business / Finance', listeners: '89K', nowPlaying: 'DeFi Daily — XRPL Updates', host: 'MarketWatch', liked: true, color: '#22c55e' },
  { id: 'r4', name: 'NoFear Waves', genre: 'Wellness / Meditation', listeners: '34.5K', nowPlaying: 'Healing Frequencies — 432Hz', host: 'Dr. Peace', liked: false, color: '#7096D1' },
  { id: 'r5', name: 'Cotton Brick Road', genre: 'Gaming / Esports', listeners: '67K', nowPlaying: 'Tournament Live — Cotton Cup', host: 'EsportsCentral', liked: true, color: '#a855f7' },
  { id: 'r6', name: 'Mrs. Cotton Academy', genre: 'Education / Phonics', listeners: '23K', nowPlaying: 'Phonics Mastery — Lesson 7', host: 'Teacher Jane', liked: false, color: '#06b6d4' },
];

const SCHEDULE: Show[] = [
  { time: '06:00', title: 'Morning Meditation', host: 'Dr. Peace', type: 'scheduled' },
  { time: '08:00', title: 'Wisdom Business Briefing', host: 'MarketWatch', type: 'scheduled' },
  { time: '10:00', title: 'Phonics Mastery Hour', host: 'Teacher Jane', type: 'scheduled' },
  { time: '12:00', title: 'JamZia Lunch Mix', host: 'DJ Cotton', type: 'live' },
  { time: '14:00', title: 'Cotton Cup Live Commentary', host: 'EsportsCentral', type: 'live' },
  { time: '16:00', title: 'BlackDiamond Symphony', host: 'Maestro', type: 'scheduled' },
  { time: '18:00', title: 'Evening Vibes', host: 'DJ Cotton', type: 'scheduled' },
  { time: '20:00', title: 'DeFi After Dark', host: 'MarketWatch', type: 'live' },
];

/* ── Main Component ── */
export default function JamRadio() {
  const [playing, setPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<Station>(STATIONS[0]);
  const [volume, setVolume] = useState(75);
  const [liked, setLiked] = useState<Set<string>>(new Set(STATIONS.filter(s => s.liked).map(s => s.id)));
  const [showSchedule, setShowSchedule] = useState(false);

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ec4899]/10 flex items-center justify-center">
                <Radio size={20} className="text-[#ec4899]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamRadio</h1>
                <p className="text-[10px] text-[#6B7280]">Live Streaming · 271.5K Total Listeners</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ec4899] hover:bg-[#db2777] text-white rounded-lg text-xs font-bold transition-colors">
              <Plus size={12} /> Start Station
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Now Playing Card */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Signal size={12} className="text-red-400 animate-pulse" />
                <span className="text-xs text-red-400 font-medium">LIVE</span>
                <span className="text-xs text-[#6B7280]">— {currentStation.listeners} listening</span>
              </div>

              <div className="w-48 h-48 rounded-2xl bg-[#1F1F1F] mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: currentStation.color + '20' }}>
                <Radio size={64} style={{ color: currentStation.color }} className="opacity-40" />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-1">{currentStation.nowPlaying}</h2>
                <p className="text-sm text-[#6B7280]">{currentStation.name} · {currentStation.host}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <button className="p-2 text-[#6B7280] hover:text-white transition-colors"><SkipBack size={20} /></button>
                <button onClick={() => setPlaying(!playing)} className="w-14 h-14 rounded-full bg-[#ec4899] hover:bg-[#db2777] flex items-center justify-center transition-colors">
                  {playing ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <button className="p-2 text-[#6B7280] hover:text-white transition-colors"><SkipForward size={20} /></button>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button onClick={() => toggleLike(currentStation.id)} className={`p-2 rounded-full transition-colors ${liked.has(currentStation.id) ? 'text-red-400' : 'text-[#6B7280] hover:text-white'}`}>
                  <Heart size={18} fill={liked.has(currentStation.id) ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 rounded-full text-[#6B7280] hover:text-white"><Share2 size={18} /></button>
                <div className="flex items-center gap-2">
                  <button onClick={() => setVolume(v => Math.max(0, v - 10))} className="p-1 text-[#6B7280]">
                    {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <div className="w-24 h-1 bg-[#1F1F1F] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ec4899] rounded-full" style={{ width: `${volume}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Stations Grid */}
            <div>
              <h3 className="text-sm font-medium mb-3">Stations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {STATIONS.map(station => (
                  <div
                    key={station.id}
                    onClick={() => { setCurrentStation(station); setPlaying(true); }}
                    className={`bg-[#0A0A0A] border rounded-xl p-3 cursor-pointer transition-colors ${
                      currentStation.id === station.id ? 'border-[#ec4899]/50' : 'border-[#1F1F1F] hover:border-[#2A2A2A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: station.color + '20' }}>
                        <Radio size={16} style={{ color: station.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium truncate">{station.name}</h4>
                          {station.id === currentStation.id && playing && <Signal size={10} className="text-red-400 animate-pulse shrink-0" />}
                        </div>
                        <p className="text-[10px] text-[#6B7280]">{station.genre} · {station.listeners}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); toggleLike(station.id); }} className={`p-1.5 ${liked.has(station.id) ? 'text-red-400' : 'text-[#6B7280]'}`}>
                        <Heart size={14} fill={liked.has(station.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Schedule</h3>
                <button onClick={() => setShowSchedule(!showSchedule)} className="text-xs text-[#6B7280]">
                  {showSchedule ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className="space-y-2">
                {SCHEDULE.map((show, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02]">
                    <div className="w-12 text-[10px] text-[#6B7280] font-mono">{show.time}</div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{show.title}</p>
                      <p className="text-[10px] text-[#6B7280]">{show.host}</p>
                    </div>
                    {show.type === 'live' && <span className="text-[9px] px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded">LIVE</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3">Trending</h3>
              <div className="space-y-2">
                {['Cotton Cup Live', 'Phonics Hour', 'DeFi After Dark'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.02] cursor-pointer">
                    <TrendingUp size={12} className="text-[#f59e0b]" />
                    <span className="text-xs">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
