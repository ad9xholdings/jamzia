/* ═══════════════════════════════════════════════════════════
   APP PORTAL — app.jamzia.tv
   Application Entry Point
   ═══════════════════════════════════════════════════════════ */

import {
  Wallet, Gamepad2, GraduationCap, ShoppingCart,
  Shield, Bot, Zap, Globe, BookOpen, Newspaper,
  TrendingUp, Music, Video, Heart, Car,
  Leaf, Sprout, Sun, Tv, Stethoscope, Scale,
  Code2, Trophy, Users, Sparkles, Search,
} from 'lucide-react';
import { useState } from 'react';

const PLATFORMS = [
  { name: 'Listen', icon: Music, route: '/listen', color: '#ec4899', desc: 'Music & audio', category: 'Hub' },
  { name: 'Watch', icon: Video, route: '/watch', color: '#ef4444', desc: 'Video & movies', category: 'Hub' },
  { name: 'Play', icon: Gamepad2, route: '/play', color: '#f59e0b', desc: 'Games & AR', category: 'Hub' },
  { name: 'Pay', icon: Wallet, route: '/pay', color: '#7096D1', desc: 'Wallet & finance', category: 'Hub' },
  { name: 'Shop', icon: ShoppingCart, route: '/shop', color: '#22c55e', desc: 'Marketplace', category: 'Hub' },
  { name: 'Learn', icon: GraduationCap, route: '/learn', color: '#a855f7', desc: 'Courses & academy', category: 'Hub' },
  { name: 'Connect', icon: Users, route: '/connect', color: '#06b6d4', desc: 'Social & chat', category: 'Hub' },
  { name: 'Build', icon: Zap, route: '/build', color: '#3b82f6', desc: 'Tools & code', category: 'Hub' },
  { name: 'Govern', icon: Scale, route: '/govern', color: '#f97316', desc: 'Legal & government', category: 'Hub' },
  { name: 'JamGames™', icon: Gamepad2, route: '/games', color: '#ef4444', desc: 'All AR games', category: 'Gaming' },
  { name: 'SORME Search', icon: Search, route: '/search', color: '#f59e0b', desc: 'AI search engine', category: 'AI' },
  { name: 'JamMastery', icon: Trophy, route: '/mastery', color: '#a855f7', desc: 'EduTech AR', category: 'Education' },
  { name: 'JamShop', icon: ShoppingCart, route: '/shop', color: '#ec4899', desc: 'Marketplace', category: 'Commerce' },
  { name: 'Command Center', icon: Shield, route: '/command', color: '#22c55e', desc: 'Admin dashboard', category: 'Admin' },
  { name: 'Ask 9x', icon: Bot, route: '#', color: '#7096D1', desc: 'AI concierge', category: 'AI', action: () => window.dispatchEvent(new CustomEvent('open-9x-concierge')) },
  { name: 'JamAuto', icon: Zap, route: '/auto', color: '#22c55e', desc: 'Automation', category: 'Tools' },
  { name: 'JamEarth', icon: Globe, route: '/earth', color: '#3b82f6', desc: 'Earth data', category: 'Data' },
  { name: 'JamNews', icon: Newspaper, route: '/news', color: '#f97316', desc: 'News platform', category: 'Media' },
  { name: 'JamNews Business', icon: TrendingUp, route: '/newsbusiness', color: '#f97316', desc: 'Business news', category: 'Media' },
  { name: 'JamSocial', icon: Users, route: '/social', color: '#ec4899', desc: 'Social hub', category: 'Social' },
  { name: 'JamWise', icon: BookOpen, route: '/wise', color: '#a855f7', desc: 'Wisdom base', category: 'Knowledge' },
  { name: 'JamTech', icon: Code2, route: '/tech', color: '#3b82f6', desc: 'Tech platform', category: 'Tech' },
  { name: 'JamStreet', icon: TrendingUp, route: '/street', color: '#22c55e', desc: 'Markets', category: 'Finance' },
  { name: 'JamAR', icon: Sparkles, route: '/ar', color: '#a855f7', desc: 'AR experiences', category: 'AR' },
  { name: 'JamVideo', icon: Video, route: '/video', color: '#ef4444', desc: 'Video platform', category: 'Media' },
  { name: 'JamAudio', icon: Music, route: '/audio', color: '#ec4899', desc: 'Audio platform', category: 'Media' },
  { name: 'JamKind', icon: Heart, route: '/kind', color: '#f43f5e', desc: 'Kindness network', category: 'Social' },
  { name: 'JamScale', icon: Scale, route: '/scale', color: '#f59e0b', desc: 'Legal scale', category: 'Legal' },
  { name: 'JamMastery', icon: Trophy, route: '/mastery', color: '#a855f7', desc: 'Education', category: 'Education' },
  { name: 'JamAuto', icon: Car, route: '/auto', color: '#22c55e', desc: 'Auto tools', category: 'Tools' },
  { name: 'JamGreen', icon: Leaf, route: '/green', color: '#22c55e', desc: 'Green initiatives', category: 'Environment' },
  { name: 'JamGrow', icon: Sprout, route: '/grow', color: '#16a34a', desc: 'Growth tools', category: 'Tools' },
  { name: 'JamWeather', icon: Sun, route: '/weather', color: '#f59e0b', desc: 'Weather data', category: 'Data' },
  { name: 'JamBox', icon: Tv, route: '/box', color: '#3b82f6', desc: 'TV platform', category: 'Media' },
  { name: 'JamMed', icon: Stethoscope, route: '/med', color: '#22c55e', desc: 'Medical info', category: 'Health' },
  { name: 'JamCode', icon: Code2, route: '/code', color: '#3b82f6', desc: 'Code platform', category: 'Tech' },
];

const CATEGORIES = Array.from(new Set(PLATFORMS.map((p) => p.category)));

export default function AppPortal() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? PLATFORMS
    : PLATFORMS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={20} className="text-[#7096D1]" />
            <h1 className="text-xl font-bold">App Portal</h1>
          </div>
          <p className="text-xs text-[#6B7280]">Access all 50+ JamZia platforms from one place</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {[
            { name: 'Listen', icon: Music, route: '/listen', color: '#ec4899', sub: 'Music & Audio' },
            { name: 'Watch', icon: Video, route: '/watch', color: '#ef4444', sub: 'Movies & TV' },
            { name: 'Play', icon: Gamepad2, route: '/play', color: '#f59e0b', sub: 'Games & AR' },
            { name: 'Pay', icon: Wallet, route: '/pay', color: '#7096D1', sub: 'Wallet' },
          ].map((q) => (
            <a
              key={q.name}
              href={`#${q.route}`}
              className="bg-gradient-to-br from-[#0A0F1E] to-[#050810] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-4 transition-all no-underline group"
            >
              <q.icon size={24} style={{ color: q.color }} className="mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">{q.name}</p>
              <p className="text-[9px] text-[#6B7280]">{q.sub}</p>
            </a>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 mb-4 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'All' ? 'bg-[#7096D1]/10 text-[#7096D1]' : 'text-[#6B7280] hover:text-white'
            }`}
          >
            All ({PLATFORMS.length})
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === c ? 'bg-[#7096D1]/10 text-[#7096D1]' : 'text-[#6B7280] hover:text-white'
              }`}
            >
              {c} ({PLATFORMS.filter((p) => p.category === c).length})
            </button>
          ))}
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filtered.map((p) => (
            <a
              key={`${p.name}-${p.route}`}
              href={`#${p.route}`}
              onClick={(e) => { if (p.action) { e.preventDefault(); p.action(); } }}
              className="group flex items-center gap-2.5 p-3 bg-[#0A0F1E] border border-white/[0.06] hover:border-white/[0.1] rounded-xl transition-all no-underline"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${p.color}15` }}>
                <p.icon size={18} style={{ color: p.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate group-hover:text-[#7096D1] transition-colors">{p.name}</p>
                <p className="text-[9px] text-[#6B7280] truncate">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-[10px] text-[#6B7280]">
            JamZia App Portal — {PLATFORMS.length} platforms — Powered by Ad9x™
          </p>
        </div>
      </div>
    </div>
  );
}
