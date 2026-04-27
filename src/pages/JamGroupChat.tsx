import { useState, useRef, useEffect } from 'react';
import { Send, Users, Lock, Circle, ChevronLeft, Smile, Paperclip, Phone, Video, MoreVertical, Star, Bell, Search, Plus } from 'lucide-react';
import { Link } from 'react-router';

/* ── Types ──────────────────────────────────────── */
interface ChatMessage {
  id: string;
  user: { name: string; avatar: string; color: string; online: boolean };
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  members: number;
  online: number;
  isPrivate: boolean;
  messages: ChatMessage[];
  unread: number;
  pinned: boolean;
}

/* ── Mock Data ──────────────────────────────────── */
const INITIAL_ROOMS: ChatRoom[] = [
  {
    id: 'general', name: 'General', description: 'Welcome to JamZia! Chat with the community.',
    category: 'Community', icon: '🌍', members: 12500, online: 842, isPrivate: false,
    unread: 0, pinned: true,
    messages: [
      { id: 'm1', user: { name: 'JamZia Bot', avatar: 'JZ', color: '#C9A03F', online: true }, content: 'Welcome to JamZia Group Chat! Be kind, be helpful, be fearless. 🚀', timestamp: '9:00 AM', likes: 245, liked: false },
      { id: 'm2', user: { name: 'Sarah M.', avatar: 'SM', color: '#7096D1', online: true }, content: 'Just watched the new JamBoxFlix original — absolutely incredible production quality!', timestamp: '9:15 AM', likes: 18, liked: false },
      { id: 'm3', user: { name: 'David K.', avatar: 'DK', color: '#10B981', online: false }, content: 'Has anyone tried the new JamCoins AR feature? I found a Gold Coin yesterday!', timestamp: '9:22 AM', likes: 32, liked: false },
    ],
  },
  {
    id: 'live-events', name: 'Live Events', description: 'Chat during live streams and PPV events.',
    category: 'Media', icon: '🔴', members: 8400, online: 1203, isPrivate: false,
    unread: 12, pinned: true,
    messages: [
      { id: 'm4', user: { name: 'EventHost', avatar: 'EH', color: '#EF4444', online: true }, content: '🎬 Championship Fight Night starts in 30 minutes! Get your PPV tickets now.', timestamp: '7:30 PM', likes: 89, liked: false },
      { id: 'm5', user: { name: 'Mike T.', avatar: 'MT', color: '#A855F7', online: true }, content: 'Stream quality is amazing tonight. 4K with zero buffering! 🔥', timestamp: '7:45 PM', likes: 45, liked: false },
    ],
  },
  {
    id: 'boxflix', name: 'JamBoxFlix+', description: 'Discuss originals, films, series, and documentaries.',
    category: 'Media', icon: '🎬', members: 6200, online: 534, isPrivate: false,
    unread: 3, pinned: true,
    messages: [
      { id: 'm6', user: { name: 'FilmBuff', avatar: 'FB', color: '#F59E0B', online: true }, content: '"The Cotton Legacy" is a masterpiece. The cinematography is next level.', timestamp: '10:00 AM', likes: 67, liked: false },
      { id: 'm7', user: { name: 'Lisa R.', avatar: 'LR', color: '#EC4899', online: true }, content: 'Just binged all 8 episodes of Mrs. Cotton\'s Classroom. My kids love it!', timestamp: '10:15 AM', likes: 41, liked: false },
    ],
  },
  {
    id: 'music', name: 'JamMusic', description: 'Share playlists, discover new music, discuss artists.',
    category: 'Media', icon: '🎵', members: 4500, online: 312, isPrivate: false,
    unread: 0, pinned: false,
    messages: [
      { id: 'm8', user: { name: 'BeatMaker', avatar: 'BM', color: '#06B6D4', online: true }, content: 'New playlist "Late Night Code" just dropped. Perfect for programming sessions.', timestamp: '11:00 AM', likes: 23, liked: false },
    ],
  },
  {
    id: 'gaming', name: 'Gaming Hub', description: 'Cotton Brick Road, tournaments, and game chat.',
    category: 'Gaming', icon: '🎮', members: 9800, online: 1567, isPrivate: false,
    unread: 8, pinned: false,
    messages: [
      { id: 'm9', user: { name: 'ProGamer', avatar: 'PG', color: '#8B5CF6', online: true }, content: 'Level 50 reached! The new battle arena is insane. Who wants to team up?', timestamp: '2:00 PM', likes: 56, liked: false },
    ],
  },
  {
    id: 'crypto', name: 'XRPL & Crypto', description: 'WisdomPay, XRP Ledger, and blockchain discussion.',
    category: 'Finance', icon: '⛓️', members: 7200, online: 890, isPrivate: false,
    unread: 5, pinned: false,
    messages: [
      { id: 'm10', user: { name: 'CryptoKing', avatar: 'CK', color: '#14B8A6', online: true }, content: 'XRP just hit a new milestone. The integration with WisdomPay is flawless.', timestamp: '3:00 PM', likes: 112, liked: false },
    ],
  },
  {
    id: 'education', name: 'Education Station', description: 'Mrs. Cotton\'s Academy, courses, and learning.',
    category: 'Education', icon: '📚', members: 3400, online: 198, isPrivate: false,
    unread: 0, pinned: false,
    messages: [
      { id: 'm11', user: { name: 'TeacherJane', avatar: 'TJ', color: '#F97316', online: true }, content: 'New Phonics module is live! Perfect for ages 4-7. Check it out in JamLearn.', timestamp: '8:00 AM', likes: 34, liked: false },
    ],
  },
  {
    id: 'nofear', name: 'NoFear™ Community', description: 'Fearless Revolution Foundation official community.',
    category: 'Community', icon: '💪', members: 15600, online: 2340, isPrivate: false,
    unread: 24, pinned: true,
    messages: [
      { id: 'm12', user: { name: 'FearlessLeader', avatar: 'FL', color: '#C9A03F', online: true }, content: 'The Fearless Revolution Summit tickets go on sale Monday! Mark your calendars.', timestamp: '12:00 PM', likes: 189, liked: false },
      { id: 'm13', user: { name: 'Maria G.', avatar: 'MG', color: '#DB2777', online: true }, content: 'Just attended my first NoFear meetup. The community is incredible! 💛', timestamp: '12:15 PM', likes: 78, liked: false },
    ],
  },
  {
    id: 'dev', name: 'Developers', description: 'JamZia dev team, API discussion, and technical chat.',
    category: 'Tech', icon: '💻', members: 1200, online: 156, isPrivate: false,
    unread: 0, pinned: false,
    messages: [
      { id: 'm14', user: { name: 'CodeNinja', avatar: 'CN', color: '#6366F1', online: true }, content: 'The new streaming API is now in beta. Documentation updated at /docs', timestamp: '4:00 PM', likes: 45, liked: false },
    ],
  },
  {
    id: 'vip', name: 'VIP Lounge', description: 'Exclusive chat for premium subscribers.',
    category: 'Premium', icon: '👑', members: 450, online: 67, isPrivate: true,
    unread: 0, pinned: false,
    messages: [
      { id: 'm15', user: { name: 'VIPBot', avatar: 'VIP', color: '#C9A03F', online: true }, content: 'Welcome VIP members! Exclusive behind-the-scenes content drops here first.', timestamp: '1:00 PM', likes: 12, liked: false },
    ],
  },
];

const CATEGORIES = ['All', 'Community', 'Media', 'Gaming', 'Finance', 'Education', 'Tech', 'Premium'];

/* ── Main Component ─────────────────────────────── */
export default function JamGroupChat() {
  const [rooms, setRooms] = useState<ChatRoom[]>(INITIAL_ROOMS);
  const [activeRoomId, setActiveRoomId] = useState('general');
  const [messageInput, setMessageInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  const filteredRooms = activeCategory === 'All'
    ? rooms
    : rooms.filter((r) => r.category === activeCategory);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeRoom.messages]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      user: { name: 'You', avatar: 'ME', color: '#C9A03F', online: true },
      content: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 0,
      liked: false,
    };
    setRooms((prev) => prev.map((r) =>
      r.id === activeRoomId ? { ...r, messages: [...r.messages, newMessage] } : r
    ));
    setMessageInput('');
  };

  const toggleLike = (messageId: string) => {
    setRooms((prev) => prev.map((r) =>
      r.id === activeRoomId
        ? { ...r, messages: r.messages.map((m) => m.id === messageId ? { ...m, liked: !m.liked, likes: m.liked ? m.likes - 1 : m.likes + 1 } : m) }
        : r
    ));
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} flex-shrink-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-all duration-300 overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <Link to="/" className="text-xl font-black">
              <span className="text-[#C9A03F]">Jam</span><span className="text-white">Chat</span>
            </Link>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A03F]"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 p-3 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-[#C9A03F] text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {/* Pinned */}
          {filteredRooms.some((r) => r.pinned) && (
            <div className="mb-2">
              <p className="text-[10px] text-white/30 uppercase tracking-wider px-2 mb-1 flex items-center gap-1"><Star className="w-3 h-3" /> Pinned</p>
              {filteredRooms.filter((r) => r.pinned).map((room) => (
                <RoomItem key={room.id} room={room} isActive={room.id === activeRoomId} onClick={() => setActiveRoomId(room.id)} />
              ))}
            </div>
          )}
          {/* All rooms */}
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-wider px-2 mb-1">Channels</p>
            {filteredRooms.filter((r) => !r.pinned).map((room) => (
              <RoomItem key={room.id} room={room} isActive={room.id === activeRoomId} onClick={() => setActiveRoomId(room.id)} />
            ))}
          </div>
        </div>

        {/* User profile */}
        <div className="p-3 border-t border-white/5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A03F] to-[#7096D1] flex items-center justify-center text-xs font-bold">JZ</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">JamZia User</p>
            <p className="text-[10px] text-white/40 flex items-center gap-1"><Circle className="w-2 h-2 text-green-500 fill-green-500" /> Online</p>
          </div>
          <SettingsButton />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-white/60">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-lg">{activeRoom.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-sm">{activeRoom.name}</h2>
                {activeRoom.isPrivate && <Lock className="w-3 h-3 text-white/40" />}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/40">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {activeRoom.members.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Circle className="w-2 h-2 text-green-500 fill-green-500" /> {activeRoom.online.toLocaleString()} online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"><Phone className="w-4 h-4 text-white/60" /></button>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"><Video className="w-4 h-4 text-white/60" /></button>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"><Search className="w-4 h-4 text-white/60" /></button>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"><Bell className="w-4 h-4 text-white/60" /></button>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"><MoreVertical className="w-4 h-4 text-white/60" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeRoom.messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 group hover:bg-white/[0.02] p-1 -m-1 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: msg.user.color + '20', color: msg.user.color }}>
                {msg.user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold" style={{ color: msg.user.color }}>{msg.user.name}</span>
                  {msg.user.online && <Circle className="w-2 h-2 text-green-500 fill-green-500" />}
                  <span className="text-[10px] text-white/30">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{msg.content}</p>
                <button
                  onClick={() => toggleLike(msg.id)}
                  className={`flex items-center gap-1 mt-1 text-xs transition-colors ${msg.liked ? 'text-[#C9A03F]' : 'text-white/20 hover:text-white/40'}`}
                >
                  <Star className={`w-3 h-3 ${msg.liked ? 'fill-[#C9A03F]' : ''}`} /> {msg.likes}
                </button>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/5 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <button className="text-white/30 hover:text-white/60"><Paperclip className="w-5 h-5" /></button>
            <button className="text-white/30 hover:text-white/60"><Smile className="w-5 h-5" /></button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={`Message #${activeRoom.name}`}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!messageInput.trim()}
              className="w-8 h-8 rounded-full bg-[#C9A03F] flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <Send className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub Components ─────────────────────────────── */
function RoomItem({ room, isActive, onClick }: { room: ChatRoom; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg transition-all text-left ${
        isActive ? 'bg-[#C9A03F]/10' : 'hover:bg-white/5'
      }`}
    >
      <span className="text-lg">{room.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium truncate ${isActive ? 'text-[#C9A03F]' : 'text-white/80'}`}>{room.name}</span>
          {room.unread > 0 && (
            <span className="bg-[#C9A03F] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{room.unread}</span>
          )}
        </div>
        <p className="text-[10px] text-white/30 truncate">{room.members.toLocaleString()} members</p>
      </div>
    </button>
  );
}

function SettingsButton() {
  return (
    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
      <MoreVertical className="w-4 h-4 text-white/40" />
    </button>
  );
}
