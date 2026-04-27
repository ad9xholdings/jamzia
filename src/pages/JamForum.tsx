/* ═══════════════════════════════════════════════════════════
   JamForum — Community Forums
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  MessageSquare, Eye, Clock, ChevronUp,
  ChevronDown, Pin, Flame,
  Search, PlusCircle
} from 'lucide-react';

/* ── Types ── */
interface Topic {
  id: string;
  title: string;
  author: string;
  avatar: string;
  category: string;
  categoryColor: string;
  replies: number;
  views: number;
  upvotes: number;
  timestamp: string;
  pinned: boolean;
  hot: boolean;
  preview: string;
  tags: string[];
}

interface Community {
  name: string;
  members: number;
  online: number;
  color: string;
  icon: string;
}

/* ── Mock Data ── */
const COMMUNITIES: Community[] = [
  { name: 'JamZia General', members: 45200, online: 1240, color: '#7096D1', icon: 'JZ' },
  { name: 'WisdomPay', members: 18900, online: 580, color: '#22c55e', icon: 'WP' },
  { name: 'BlackDiamond Media', members: 12300, online: 340, color: '#1F1F1F', icon: 'BD' },
  { name: 'Cotton Brick Road', members: 28700, online: 890, color: '#f59e0b', icon: 'CB' },
  { name: 'NoFear Foundation', members: 34100, online: 720, color: '#ef4444', icon: 'NF' },
  { name: 'XRPL Devs', members: 8900, online: 410, color: '#06b6d4', icon: 'XR' },
];

const TOPICS: Topic[] = [
  { id: '1', title: 'Welcome to JamZia Forums — Start Here!', author: 'CuzCotton', avatar: 'CC', category: 'Announcements', categoryColor: '#f59e0b', replies: 342, views: 12500, upvotes: 892, timestamp: '3 days ago', pinned: true, hot: false, preview: 'Welcome to the JamZia community forums. This is your space to connect, share ideas, and build together.', tags: ['welcome', 'rules'] },
  { id: '2', title: 'WisdomPay™ v3.2 Release Notes — XRPL Smart Contracts', author: 'DevTeam', avatar: 'DT', category: 'Updates', categoryColor: '#22c55e', replies: 128, views: 8400, upvotes: 456, timestamp: '6 hr ago', pinned: true, hot: true, preview: 'Major release with XRPL smart contract integration, multi-sig improvements, and 40% faster settlement.', tags: ['wisdompay', 'release'] },
  { id: '3', title: 'How do I stake JamCoins for passive yield?', author: 'CryptoNewbie', avatar: 'CN', category: 'Ask JamZia', categoryColor: '#7096D1', replies: 45, views: 3200, upvotes: 89, timestamp: '2 hr ago', pinned: false, hot: true, preview: 'I heard about the 8-12% APY staking rewards. Can someone walk me through the process step by step?', tags: ['jamcoins', 'staking'] },
  { id: '4', title: 'BlackDiamond Studios casting call — Open auditions', author: 'BDMedia', avatar: 'BD', category: 'Opportunities', categoryColor: '#ec4899', replies: 67, views: 5600, upvotes: 234, timestamp: '12 hr ago', pinned: false, hot: true, preview: 'We are looking for talented actors, voice artists, and creators for upcoming original productions.', tags: ['blackdiamond', 'casting'] },
  { id: '5', title: 'Cotton Brick Road strategy guide — Level 50+', author: 'BrickMaster99', avatar: 'BM', category: 'Gaming', categoryColor: '#f59e0b', replies: 89, views: 7800, upvotes: 345, timestamp: '1 day ago', pinned: false, hot: true, preview: 'After 200 hours, here is my comprehensive guide to mastering the late game and collecting all 10,000 bricks.', tags: ['cbr', 'guide'] },
  { id: '6', title: 'NoFear Foundation mental health resources megathread', author: 'NoFearAdmin', avatar: 'NF', category: 'Community', categoryColor: '#ef4444', replies: 256, views: 15200, upvotes: 1203, timestamp: '1 week ago', pinned: true, hot: false, preview: 'A comprehensive list of mental health resources, hotlines, and support groups available to all community members.', tags: ['nofear', 'mental-health'] },
  { id: '7', title: 'JamDEX liquidity pool returns — March analysis', author: 'QuantTrader', avatar: 'QT', category: 'Finance', categoryColor: '#22c55e', replies: 34, views: 4200, upvotes: 156, timestamp: '4 hr ago', pinned: false, hot: false, preview: 'Monthly breakdown of LP returns across all pools. XRP/SKYI continues to lead with 24.5% APR.', tags: ['jamdex', 'liquidity'] },
  { id: '8', title: 'Feature request: Dark mode for all platforms', author: 'NightOwl', avatar: 'NO', category: 'Feedback', categoryColor: '#a855f7', replies: 178, views: 9800, upvotes: 678, timestamp: '2 days ago', pinned: false, hot: true, preview: 'Please add a true OLED black mode. The current dark theme still uses too much gray.', tags: ['feature-request', 'ui'] },
];

/* ── Main Component ── */
export default function JamForum() {
  const [sort, setSort] = useState<'hot' | 'new' | 'top'>('hot');
  const [searchQuery, setSearchQuery] = useState('');

  const sorted = [...TOPICS].sort((a, b) => {
    if (sort === 'hot') return (b.hot ? 1 : 0) - (a.hot ? 1 : 0) || b.upvotes - a.upvotes;
    if (sort === 'new') return 0; // already ordered
    if (sort === 'top') return b.upvotes - a.upvotes;
    return 0;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center">
                <MessageSquare size={20} className="text-[#06b6d4]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamForum</h1>
                <p className="text-[10px] text-[#6B7280]">Community Discussions · 148K Members · 3.2K Online</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#7096D1] hover:bg-[#5a7fc0] text-white rounded-lg text-xs font-medium transition-colors">
              <PlusCircle size={14} />
              New Topic
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search & Filter */}
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search topics..."
                  className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-[#7096D1]"
                />
              </div>
              <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-1">
                {(['hot', 'new', 'top'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      sort === s ? 'bg-[#7096D1] text-white' : 'text-[#6B7280] hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="space-y-2">
              {sorted.map(topic => (
                <div
                  key={topic.id}
                  className={`bg-[#0A0A0A] border rounded-xl p-4 hover:border-[#2A2A2A] transition-colors ${
                    topic.pinned ? 'border-[#f59e0b]/30' : 'border-[#1F1F1F]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Vote */}
                    <div className="flex flex-col items-center gap-0.5 shrink-0">
                      <button className="p-1 text-[#6B7280] hover:text-[#7096D1]"><ChevronUp size={16} /></button>
                      <span className="text-xs font-bold">{topic.upvotes}</span>
                      <button className="p-1 text-[#6B7280] hover:text-red-400"><ChevronDown size={16} /></button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {topic.pinned && <Pin size={12} className="text-[#f59e0b]" />}
                        {topic.hot && <Flame size={12} className="text-red-400" />}
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: topic.categoryColor + '20', color: topic.categoryColor }}>
                          {topic.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm mb-1 hover:text-[#7096D1] cursor-pointer">{topic.title}</h3>
                      <p className="text-xs text-[#6B7280] mb-2 line-clamp-2">{topic.preview}</p>
                      <div className="flex items-center gap-3 text-[10px] text-[#6B7280] flex-wrap">
                        <span className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[8px] font-bold">{topic.avatar}</div>
                          {topic.author}
                        </span>
                        <span className="flex items-center gap-1"><Clock size={10} />{topic.timestamp}</span>
                        <span className="flex items-center gap-1"><MessageSquare size={10} />{topic.replies}</span>
                        <span className="flex items-center gap-1"><Eye size={10} />{(topic.views / 1000).toFixed(1)}K</span>
                        <div className="flex gap-1">
                          {topic.tags.map(tag => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-[#1F1F1F] rounded text-[#6B7280]">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Communities */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3">Communities</h3>
              <div className="space-y-2">
                {COMMUNITIES.map(c => (
                  <div key={c.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0" style={{ backgroundColor: c.color + '20', color: c.color }}>
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{c.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{c.members.toLocaleString()} members · {c.online} online</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3">Forum Stats</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-[#6B7280]">Topics</span><span className="font-medium">24,892</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Replies</span><span className="font-medium">187,450</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Members</span><span className="font-medium">148,230</span></div>
                <div className="flex justify-between"><span className="text-[#6B7280]">Online</span><span className="text-emerald-400 font-medium">3,247</span></div>
              </div>
            </div>

            {/* Trending Tags */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3">Trending Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {['wisdompay', 'jamcoins', 'cbr', 'blackdiamond', 'staking', 'xrpl', 'nft', 'dao', 'jamdex', 'nofear'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-[#1F1F1F] rounded-lg text-[10px] text-[#6B7280] hover:text-white cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
