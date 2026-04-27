import { useState } from 'react';
import {
  Radio, Eye, Heart, MessageCircle, Share2, Send,
  Swords, Crown, Zap,
} from 'lucide-react';
import TriPanelLayout from '../components/TriPanelLayout';

const streams = [
  { id: 'l1', title: 'Live Coding Session', host: 'Marcus Webb', viewers: '2.4K', category: 'Tech', emoji: '💻', live: true },
  { id: 'l2', title: 'Album Launch Party', host: 'Zara Okafor', viewers: '12.8K', category: 'Music', emoji: '🎵', live: true },
  { id: 'l3', title: 'AR Tournament Finals', host: 'Kai Nakamura', viewers: '5.1K', category: 'Gaming', emoji: '🏆', live: true },
  { id: 'l4', title: 'Design Office Hours', host: 'Elara Chen', viewers: '890', category: 'Design', emoji: '🎨', live: true },
  { id: 'l5', title: 'AI Model Training Live', host: 'Nova AI Labs', viewers: '3.2K', category: 'AI', emoji: '🤖', live: true },
  { id: 'l6', title: 'Behind the Scenes', host: 'Leo Santos', viewers: '1.5K', category: 'Film', emoji: '🎬', live: true },
];

const battleChallenges = [
  { id: 'c1', from: 'Buddy', topic: 'General Knowledge', reward: 15, color: '#f43f5e' },
  { id: 'c2', from: 'Athena', topic: 'Math & Logic', reward: 20, color: '#a855f7' },
  { id: 'c3', from: 'Buzz', topic: 'Data Science', reward: 10, color: '#f59e0b' },
];

const chatMessages = [
  { user: 'skyfan99', msg: 'This is amazing!', time: '2m' },
  { user: 'creator2024', msg: 'Love the energy here', time: '1m' },
  { user: 'techie_dev', msg: 'What stack are you using?', time: '1m' },
  { user: 'musiclover', msg: 'Drop the beat!', time: '30s' },
  { user: 'gamerX', msg: 'That play was insane', time: '15s' },
  { user: 'jamziafan', msg: 'Who else is grinding CBR?', time: '5s' },
];

/* ═══════════════════════════════════════════════════════════ */
export default function JamLive() {
  const [activeStream, setActiveStream] = useState(0);
  const [chatMsg, setChatMsg] = useState('');
  const [chat, setChat] = useState(chatMessages);
  const [liked, setLiked] = useState(false);
  const s = streams[activeStream];

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChat([...chat, { user: 'you', msg: chatMsg.trim(), time: 'now' }]);
    setChatMsg('');
  };

  /* ── Header ── */
  const header = (
    <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-3">
      <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
      <Radio size={24} className="text-red-500 shrink-0 animate-pulse" />
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-lg font-bold text-white">JamLive™</h1>
        <p className="text-[10px] text-[#6B7280]">Powered by Ad9x™</p>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 rounded-full shrink-0">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-red-400">LIVE</span>
      </div>
    </div>
  );

  /* ── Top: Battle Bar ── */
  const topPanel = (
    <div className="px-4 pb-3">
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {/* Active challenges */}
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

        {/* Go to CBR */}
        <button
          onClick={() => { window.location.hash = '/cottonbrickroad'; }}
          className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 hover:bg-[#f59e0b]/20 transition-all cursor-pointer"
        >
          <Crown size={14} className="text-[#f59e0b]" />
          <span className="text-[11px] font-semibold text-[#f59e0b]">Castle</span>
        </button>

        {/* Streak */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0A0F1E]">
          <Zap size={14} className="text-amber-400" />
          <span className="text-[11px] font-semibold text-white">3 Win Streak</span>
        </div>
      </div>
    </div>
  );

  /* ── Middle: Live Player ── */
  const middlePanel = (
    <div className="h-full flex flex-col">
      {/* Main Player */}
      <div className="flex-1 relative bg-[#0A0F1E] overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-8xl sm:text-9xl">{s.emoji}</span>
        </div>
        {/* Overlays */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-xs font-bold text-white">LIVE</span>
        </div>
        <div className="absolute top-4 right-16 flex items-center gap-1.5 px-3 py-1 bg-black/60 rounded-full">
          <Eye size={14} className="text-white" />
          <span className="text-xs font-semibold text-white">{s.viewers}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">{s.title}</h2>
          <p className="text-sm text-[#A0AEC0] drop-shadow-lg">{s.host}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="shrink-0 flex items-center gap-3 px-4 py-2 bg-[#0A0F1E] border-t border-white/[0.06]">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-colors ${
            liked ? 'bg-[#ec4899]/20 text-[#ec4899]' : 'bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          <Heart size={16} className={liked ? 'fill-current' : ''} /> Like
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 bg-white/5 text-white rounded-full text-sm font-semibold hover:bg-white/10 cursor-pointer">
          <MessageCircle size={16} /> Chat
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 bg-white/5 text-white rounded-full text-sm font-semibold hover:bg-white/10 cursor-pointer">
          <Share2 size={16} /> Share
        </button>
        {/* Stream picker */}
        <div className="ml-auto flex items-center gap-1.5">
          {streams.map((st, i) => (
            <button
              key={st.id}
              onClick={() => setActiveStream(i)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all cursor-pointer ${
                i === activeStream
                  ? 'bg-white/10 ring-1 ring-white/20'
                  : 'hover:bg-white/5'
              }`}
              title={st.title}
            >
              {st.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Bottom: Group Chat ── */
  const bottomPanel = (
    <div className="h-full flex flex-col px-4 pb-2">
      {/* Chat feed */}
      <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0 py-1">
        {chat.map((c, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className="font-semibold text-[#7096D1] shrink-0">{c.user}:</span>
            <span className="text-[#A0AEC0]">{c.msg}</span>
            <span className="text-[9px] text-[#6B7280] ml-auto shrink-0">{c.time}</span>
          </div>
        ))}
      </div>
      {/* Input */}
      <div className="shrink-0 flex gap-2 pt-2 border-t border-white/[0.06]">
        <input
          value={chatMsg}
          onChange={(e) => setChatMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendChat()}
          placeholder="Say something..."
          className="flex-1 bg-[#1A1F2E] text-white text-xs placeholder-[#6B7280] rounded-full px-3 py-2 outline-none border border-transparent focus:border-[#7096D1]/50"
        />
        <button
          onClick={sendChat}
          className="p-2 bg-[#7096D1] rounded-full cursor-pointer hover:bg-[#7096D1]/80 transition-colors"
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
