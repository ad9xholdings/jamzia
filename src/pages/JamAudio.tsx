import { useState, useRef, useEffect } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Music, Shuffle, Repeat,
  Send, Swords, Crown, Zap,
} from 'lucide-react';
import TriPanelLayout from '../components/TriPanelLayout';

const tracks = [
  { id: 't1', title: 'Skyline', artist: 'Zara Okafor', album: 'Skyline', duration: 245, plays: '2.4M', emoji: '🎵' },
  { id: 't2', title: 'Cloud Drift', artist: 'Zara Okafor', album: 'Skyline', duration: 198, plays: '1.8M', emoji: '☁️' },
  { id: 't3', title: 'Engine Rev', artist: 'Kai Nakamura', album: 'Pixel Beats', duration: 312, plays: '890K', emoji: '🎮' },
  { id: 't4', title: 'Creator Flow', artist: 'Elara Chen', album: 'Design Waves', duration: 276, plays: '1.1M', emoji: '🎨' },
  { id: 't5', title: 'JamZia Anthem', artist: 'JamZia Official', album: 'The Everything', duration: 220, plays: '3.2M', emoji: '🔥' },
  { id: 't6', title: 'Neural Network', artist: 'Nova AI Labs', album: 'Synthetic', duration: 340, plays: '678K', emoji: '🤖' },
];

const battleChallenges = [
  { id: 'c1', from: 'Viridia', topic: 'Chemistry', reward: 20, color: '#22c55e' },
  { id: 'c2', from: 'Aurelius', topic: 'Finance', reward: 25, color: '#f59e0b' },
  { id: 'c3', from: 'Leo', topic: 'Leadership', reward: 35, color: '#f59e0b' },
];

const chatMessages = [
  { user: 'beatmaker', msg: 'This bass is insane', time: '4m' },
  { user: 'zarahive', msg: 'Skyline never gets old', time: '3m' },
  { user: 'gamerX', msg: 'Engine Rev is my grinding track', time: '2m' },
  { user: 'designer', msg: 'Creator Flow helps me focus', time: '1m' },
  { user: 'jamhead', msg: 'Anthem hits different at 3am', time: '30s' },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/* ═══════════════════════════════════════════════════════════ */
export default function JamAudio() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [chatMsg, setChatMsg] = useState('');
  const [chat, setChat] = useState(chatMessages);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const track = tracks[current];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= track.duration) { setIsPlaying(false); return 0; }
          return p + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, track.duration]);

  const playTrack = (i: number) => {
    if (current === i && isPlaying) { setIsPlaying(false); }
    else { setCurrent(i); setProgress(0); setIsPlaying(true); }
  };

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChat([...chat, { user: 'you', msg: chatMsg.trim(), time: 'now' }]);
    setChatMsg('');
  };

  /* ── Header ── */
  const header = (
    <div className="max-w-[800px] mx-auto px-4 py-3 flex items-center gap-3">
      <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
      <Music size={24} className="text-[#a855f7] shrink-0" />
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-lg font-bold text-white">JamAudio™</h1>
        <p className="text-[10px] text-[#6B7280]">100M+ songs</p>
      </div>
    </div>
  );

  /* ── Top: Battle Bar ── */
  const topPanel = (
    <div className="px-4 pb-3">
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {battleChallenges.map((c) => (
          <button
            key={c.id}
            onClick={() => { window.location.hash = '/cottonbrickroad'; }}
            className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer"
          >
            <Swords size={14} style={{ color: c.color }} />
            <div className="text-left">
              <p className="text-[11px] font-semibold text-white">{c.from}</p>
              <p className="text-[9px] text-[#6B7280]">{c.topic}</p>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${c.color}15`, color: c.color }}>
              +{c.reward}
            </span>
          </button>
        ))}
        <button
          onClick={() => { window.location.hash = '/cottonbrickroad'; }}
          className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 hover:bg-[#f59e0b]/20 transition-all cursor-pointer"
        >
          <Crown size={14} className="text-[#f59e0b]" />
          <span className="text-[11px] font-semibold text-[#f59e0b]">Castle</span>
        </button>
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0A0F1E]">
          <Zap size={14} className="text-amber-400" />
          <span className="text-[11px] font-semibold text-white">7 Win Streak</span>
        </div>
      </div>
    </div>
  );

  /* ── Middle: Audio Player ── */
  const middlePanel = (
    <div className="h-full flex flex-col">
      {/* Main Player */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Album Art */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-[#081F5C] to-[#a855f7] flex items-center justify-center text-5xl shadow-lg mb-4">
          {track.emoji}
        </div>
        {/* Track Info */}
        <h2 className="font-display text-xl font-bold text-white text-center">{track.title}</h2>
        <p className="text-sm text-[#A0AEC0] mt-0.5">{track.artist}</p>

        {/* Progress */}
        <div className="w-full max-w-xs mt-4">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#a855f7] rounded-full transition-all"
              style={{ width: `${(progress / track.duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-[#6B7280]">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-3">
          <button className="p-2 text-[#6B7280] hover:text-white cursor-pointer"><Shuffle size={16} /></button>
          <button onClick={() => setCurrent((c) => (c - 1 + tracks.length) % tracks.length)} className="p-2 text-white hover:text-[#a855f7] cursor-pointer"><SkipBack size={20} /></button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-[#a855f7] rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
          </button>
          <button onClick={() => setCurrent((c) => (c + 1) % tracks.length)} className="p-2 text-white hover:text-[#a855f7] cursor-pointer"><SkipForward size={20} /></button>
          <button className="p-2 text-[#6B7280] hover:text-white cursor-pointer"><Repeat size={16} /></button>
        </div>
      </div>

      {/* Track Strip */}
      <div className="shrink-0 flex gap-2 px-4 py-2 bg-[#0A0F1E] border-t border-white/[0.06] overflow-x-auto">
        {tracks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => playTrack(i)}
            className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
              i === current
                ? 'bg-[#a855f7]/15 ring-1 ring-[#a855f7]/30'
                : 'hover:bg-white/5'
            }`}
          >
            <span className="text-lg">{current === i && isPlaying ? '▶️' : t.emoji}</span>
            <div>
              <p className={`text-[11px] font-semibold ${i === current ? 'text-[#a855f7]' : 'text-white'}`}>{t.title}</p>
              <p className="text-[9px] text-[#6B7280]">{t.artist}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  /* ── Bottom: Group Chat ── */
  const bottomPanel = (
    <div className="h-full flex flex-col px-4 pb-2">
      <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0 py-1">
        {chat.map((c, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className="font-semibold text-[#a855f7] shrink-0">{c.user}:</span>
            <span className="text-[#A0AEC0]">{c.msg}</span>
            <span className="text-[9px] text-[#6B7280] ml-auto shrink-0">{c.time}</span>
          </div>
        ))}
      </div>
      <div className="shrink-0 flex gap-2 pt-2 border-t border-white/[0.06]">
        <input
          value={chatMsg}
          onChange={(e) => setChatMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendChat()}
          placeholder="Drop a beat note..."
          className="flex-1 bg-[#1A1F2E] text-white text-xs placeholder-[#6B7280] rounded-full px-3 py-2 outline-none border border-transparent focus:border-[#a855f7]/50"
        />
        <button
          onClick={sendChat}
          className="p-2 bg-[#a855f7] rounded-full cursor-pointer hover:bg-[#a855f7]/80 transition-colors"
        >
          <Send size={12} className="text-white" />
        </button>
      </div>
    </div>
  );

  return (
    <TriPanelLayout
      header={header}
      topPanel={topPanel}
      middlePanel={middlePanel}
      bottomPanel={bottomPanel}
      brandColor="#a855f7"
    />
  );
}
