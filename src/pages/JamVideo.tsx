import { useState } from 'react';
import {
  Play, Eye, ThumbsUp, Film, Send,
  Swords, Crown, Zap,
} from 'lucide-react';
import TriPanelLayout from '../components/TriPanelLayout';

const videos = [
  { id: 'v1', title: 'Behind the Cloud Ep.1', creator: 'Leo Santos', views: '234K', duration: '42:15', likes: '12K', thumbnail: '🎬', category: 'Documentary' },
  { id: 'v2', title: 'React Advanced Patterns', creator: 'Aria Kim', views: '89K', duration: '1:20:00', likes: '5K', thumbnail: '💻', category: 'Education' },
  { id: 'v3', title: 'Skyline Music Video', creator: 'Zara Okafor', views: '1.2M', duration: '4:32', likes: '89K', thumbnail: '🎵', category: 'Music' },
  { id: 'v4', title: 'AR Gaming Tutorial', creator: 'Kai Nakamura', views: '45K', duration: '28:00', likes: '3K', thumbnail: '🎮', category: 'Gaming' },
  { id: 'v5', title: 'The Future of AI', creator: 'Nova AI Labs', views: '567K', duration: '15:45', likes: '34K', thumbnail: '🤖', category: 'Tech' },
  { id: 'v6', title: 'Design Systems Masterclass', creator: 'Elara Chen', views: '123K', duration: '55:00', likes: '8K', thumbnail: '🎨', category: 'Design' },
];

const battleChallenges = [
  { id: 'c1', from: 'Echo', topic: 'Phonics & Languages', reward: 15, color: '#06b6d4' },
  { id: 'c2', from: 'Arachne', topic: 'Cybersecurity', reward: 25, color: '#6B7280' },
  { id: 'c3', from: 'Smash', topic: 'Physics', reward: 30, color: '#ec4899' },
];

const chatMessages = [
  { user: 'vidfan', msg: 'This documentary is fire', time: '3m' },
  { user: 'reactdev', msg: 'Pattern #3 changed my life', time: '2m' },
  { user: 'musiclover', msg: 'Zara never misses', time: '1m' },
  { user: 'gamerX', msg: 'AR tutorial helped me rank up', time: '45s' },
  { user: 'aifan', msg: 'Nova Labs always delivers', time: '20s' },
];

/* ═══════════════════════════════════════════════════════════ */
export default function JamVideo() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chat, setChat] = useState(chatMessages);
  const v = videos[activeVideo];

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChat([...chat, { user: 'you', msg: chatMsg.trim(), time: 'now' }]);
    setChatMsg('');
  };

  /* ── Header ── */
  const header = (
    <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-3">
      <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
      <Film size={24} className="text-[#ec4899] shrink-0" />
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-lg font-bold text-white">JamVideo™</h1>
        <p className="text-[10px] text-[#6B7280]">Powered by Ad9x™</p>
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
          <span className="text-[11px] font-semibold text-white">5 Win Streak</span>
        </div>
      </div>
    </div>
  );

  /* ── Middle: Video Player ── */
  const middlePanel = (
    <div className="h-full flex flex-col">
      {/* Player */}
      <div className="flex-1 relative bg-[#0A0F1E] overflow-hidden flex items-center justify-center">
        {isPlaying ? (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#ec4899] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-[#A0AEC0]">Streaming from JamVideo CDN...</p>
          </div>
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 bg-[#ec4899]/20 rounded-full flex items-center justify-center group-hover:bg-[#ec4899]/30 transition-colors">
              <Play size={36} className="text-[#ec4899] ml-1" />
            </div>
            <p className="text-sm text-[#A0AEC0]">{v.title}</p>
          </button>
        )}
        {/* Info overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/60 rounded-full">
          <Eye size={14} className="text-white" />
          <span className="text-xs font-semibold text-white">{v.views}</span>
        </div>
        <div className="absolute top-4 right-16 flex items-center gap-2 px-3 py-1 bg-black/60 rounded-full">
          <ThumbsUp size={14} className="text-white" />
          <span className="text-xs font-semibold text-white">{v.likes}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <p className="text-xs text-[#A0AEC0]">{v.creator} • {v.category}</p>
        </div>
      </div>

      {/* Video Strip */}
      <div className="shrink-0 flex gap-2 px-4 py-2 bg-[#0A0F1E] border-t border-white/[0.06] overflow-x-auto">
        {videos.map((vid, i) => (
          <button
            key={vid.id}
            onClick={() => { setActiveVideo(i); setIsPlaying(false); }}
            className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
              i === activeVideo
                ? 'bg-white/10 ring-1 ring-white/20'
                : 'hover:bg-white/5'
            }`}
          >
            <span className="text-lg">{vid.thumbnail}</span>
            <div>
              <p className="text-[11px] font-semibold text-white">{vid.title}</p>
              <p className="text-[9px] text-[#6B7280]">{vid.duration}</p>
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
            <span className="font-semibold text-[#ec4899] shrink-0">{c.user}:</span>
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
          placeholder="Talk to the room..."
          className="flex-1 bg-[#1A1F2E] text-white text-xs placeholder-[#6B7280] rounded-full px-3 py-2 outline-none border border-transparent focus:border-[#ec4899]/50"
        />
        <button
          onClick={sendChat}
          className="p-2 bg-[#ec4899] rounded-full cursor-pointer hover:bg-[#ec4899]/80 transition-colors"
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
      brandColor="#ec4899"
    />
  );
}
