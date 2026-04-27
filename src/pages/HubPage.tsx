/* ═══════════════════════════════════════════════════════════
   HUB PAGES — 9 Broad Category Landings
   Play • Learn • Watch • Pay • Shop • Connect • Build • Know • Govern
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Gamepad2, GraduationCap, Play, Wallet, ShoppingCart,
  Users, Wrench, Search, Landmark, ChevronRight, Star,
  ArrowRight, Zap, Sparkles, Map, Volume2,
} from 'lucide-react';
import { useComingSoonStore } from '../stores/comingSoonStore';
import { isRouteBuilt } from '../config/platformRegistry';

/* ── 9 Category Configurations ── */
export interface HubCategory {
  id: string;
  label: string;
  tagline: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
  items: HubItem[];
}

export interface HubItem {
  name: string;
  desc: string;
  route: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  color?: string;
  featured?: boolean;
}

export const HUB_CATEGORIES: HubCategory[] = [
  {
    id: 'listen',
    label: 'Listen',
    tagline: 'Music, Podcasts, Audio & Live Sound',
    icon: Volume2,
    color: '#ec4899',
    items: [
      { name: 'JamAudio', desc: 'Music streaming, podcasts & audio content', route: '/audio', color: '#ec4899', featured: true },
      { name: 'JamLive Audio', desc: 'Live audio broadcasts & streams', route: '/live', color: '#f43f5e' },
      { name: 'Sound Loop', desc: "Mrs. Cotton's phonics in audio-visual loops", route: '/academy', color: '#f97316' },
      { name: 'JamBox Radio', desc: 'Scheduled programming & channels', route: '/box', color: '#3b82f6' },
    ],
  },
  {
    id: 'watch',
    label: 'Watch',
    tagline: 'Movies, TV, Video & News',
    icon: Play,
    color: '#ef4444',
    items: [
      { name: 'JamVideo', desc: 'Movies, shows & original video content', route: '/video', color: '#ef4444', featured: true },
      { name: 'JamLive', desc: 'Live video streaming & broadcasts', route: '/live', color: '#f43f5e', featured: true },
      { name: 'JamBox Flix', desc: 'On-demand TV & movie streaming', route: '/boxflix', color: '#3b82f6' },
      { name: 'JamFilms', desc: 'Original films & cinema releases', route: '/films', color: '#f59e0b' },
      { name: 'JamPremiere', desc: 'Premiere events & red carpet content', route: '/premiere', color: '#a855f7' },
      { name: 'JamReels', desc: 'Curated video reels & highlights', route: '/reels', color: '#ec4899' },
      { name: 'JamShorts', desc: 'Short-form vertical video content', route: '/shorts', color: '#f43f5e' },
      { name: 'JamNews™', desc: 'News with 11 Layers of Truth', route: '/news', color: '#f97316' },
      { name: 'JamNews Business', desc: 'Markets, finance & business news', route: '/newsbusiness', color: '#f97316' },
      { name: 'JamTok', desc: 'Short-form video content', route: '/tok', color: '#f43f5e' },
    ],
  },
  {
    id: 'play',
    label: 'Play',
    tagline: 'Games, AR Adventures & Challenges',
    icon: Gamepad2,
    color: '#f59e0b',
    items: [
      { name: 'Cotton Castle™', desc: 'AR Battle Arena — summon creatures and conquer', route: '/battle', color: '#ef4444', featured: true },
      { name: 'Cotton Brick Road™', desc: 'AR Learning RPG — 10,000 bricks to mastery', route: '/cottonbrickroad', color: '#f59e0b', featured: true },
      { name: 'Word Walk AR', desc: 'Discover phonics creatures in the real world', route: '/cottonbrickroad', color: '#22c55e' },
      { name: 'Treasure Trail AR', desc: 'Hunt for phonics treasures near you', route: '/cottonbrickroad', color: '#f59e0b' },
      { name: 'Brick Hop AR', desc: 'Board game with phonics challenges', route: '/cottonbrickroad', color: '#a855f7' },
      { name: 'Word Lock', desc: 'Guess before the icy creature freezes you', route: '/cottonbrickroad', color: '#3b82f6' },
      { name: 'Word Weave', desc: 'Interlock phonics clues into hidden words', route: '/cottonbrickroad', color: '#7096D1' },
      { name: 'Leaderboard', desc: 'Global rankings — climb with bricks earned', route: '/games', color: '#f59e0b' },
    ],
  },
  {
    id: 'pay',
    label: 'Pay',
    tagline: 'WisdomPay™ — The Only Wallet on JamZia',
    icon: Wallet,
    color: '#7096D1',
    items: [
      { name: 'WisdomPay™', desc: 'The only wallet on JamZia — powered by Ad9x. Your financial control layer on XRPL.', route: '/pay', color: '#7096D1', featured: true },
      { name: 'JamDEX', desc: 'Decentralized exchange & trading', route: '/dex', color: '#06b6d4' },
      { name: 'JamGrants', desc: 'Grant discovery & application', route: '/grants', color: '#22c55e' },
      { name: 'JamCredits', desc: 'Credit & lending marketplace', route: '/credits', color: '#f59e0b' },
      { name: 'Command Center', desc: 'Dashboard & audit controls', route: '/command', color: '#22c55e' },
    ],
  },
  {
    id: 'shop',
    label: 'Shop',
    tagline: 'Marketplace, Auto, Food & Auctions',
    icon: ShoppingCart,
    color: '#22c55e',
    items: [
      { name: 'JamShop', desc: 'Universal marketplace', route: '/shop', color: '#ec4899', featured: true },
      { name: 'JamCat', desc: 'Auctions & collectible marketplace', route: '/cat', color: '#f59e0b' },
      { name: 'JamAuto', desc: 'Vehicle tools & automation', route: '/auto', color: '#22c55e' },
      { name: 'JamFood', desc: 'Food ordering & delivery', route: '/food', color: '#f97316' },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    tagline: 'Courses, Academies & Masterclasses — Nursery to Doctoral',
    icon: GraduationCap,
    color: '#a855f7',
    items: [
      { name: "Mrs. Cotton's Academy", desc: 'Mastery of Phonics — Ground Zero for all learning', route: '/courses', color: '#f59e0b', featured: true },
      { name: 'JamZia Academy', desc: 'Nursery School through Doctoral — 29 locked grades', route: '/academy', color: '#a855f7', featured: true },
      { name: 'JamProfile', desc: 'Your transcript, certifications & skill history', route: '/profile', color: '#7096D1' },
      { name: 'JamMastery™', desc: 'Gamified education across all subjects', route: '/mastery', color: '#a855f7' },
      { name: 'JamWords', desc: 'Vocabulary builder & word mastery', route: '/words', color: '#22c55e' },
      { name: 'Tongue Tamer', desc: 'Daily phonics lessons for any language', route: '/academy', color: '#06b6d4' },
      { name: 'First Steps', desc: 'Gentle alphabet adventures ages 2-6', route: '/academy', color: '#ec4899' },
      { name: 'Athena Math', desc: 'Mathematics & logic with AI mentor', route: '/academy', color: '#a855f7' },
      { name: 'Viridia Science', desc: 'Chemistry & biology AR lab', route: '/academy', color: '#22c55e' },
      { name: 'Buzz Data', desc: 'Data science & analytics fundamentals', route: '/academy', color: '#f59e0b' },
      { name: 'Echo Wellness', desc: 'Health literacy & languages', route: '/academy', color: '#3b82f6' },
      { name: 'JamCode Academy', desc: 'Full-stack development masterclass', route: '/code', color: '#3b82f6' },
    ],
  },
  {
    id: 'connect',
    label: 'Connect',
    tagline: 'Social, Messaging & Community',
    icon: Users,
    color: '#06b6d4',
    items: [
      { name: 'JamSocial', desc: 'Feed, stories & social hub', route: '/social', color: '#ec4899', featured: true },
      { name: 'JamCom', desc: 'Communication & messaging', route: '/com', color: '#a855f7' },
      { name: 'JamInsta', desc: 'Photo sharing & stories', route: '/social', color: '#f59e0b' },
      { name: 'JamStreet', desc: 'Local events & community', route: '/street', color: '#22c55e' },
      { name: 'JamKind', desc: 'Audience engagement & outreach', route: '/kind', color: '#f43f5e' },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    tagline: 'Tools, Code, Tech & AR Creation',
    icon: Wrench,
    color: '#3b82f6',
    items: [
      { name: 'JamTech', desc: 'Technology platform & tools', route: '/tech', color: '#3b82f6', featured: true },
      { name: 'JamCode', desc: 'Development & coding platform', route: '/code', color: '#3b82f6' },
      { name: 'JamAR', desc: 'Augmented reality experiences', route: '/ar', color: '#a855f7' },
      { name: 'JamLab', desc: 'Advertising & campaign tools', route: '/lab', color: '#f59e0b' },
      { name: 'JamTribute', desc: 'A/B testing & optimization', route: '/tribute', color: '#ec4899' },
      { name: 'JamScale', desc: 'Growth & scaling tools', route: '/scale', color: '#22c55e' },
      { name: 'Architecture', desc: 'System architecture docs', route: '/architecture', color: '#6B7280' },
      { name: 'Integrations', desc: 'API & platform integrations', route: '/integrations', color: '#7096D1' },
    ],
  },
  {
    id: 'govern',
    label: 'Govern',
    tagline: 'Legal, Government, Medical & Civic',
    icon: Landmark,
    color: '#f97316',
    items: [
      { name: 'JamFed', desc: 'Federal government services', route: '/fed', color: '#06b6d4', featured: true },
      { name: 'JamState', desc: 'State government portal', route: '/state', color: '#ec4899' },
      { name: 'JamLocal', desc: 'Local government & community', route: '/local', color: '#14b8a6' },
      { name: 'JamLaw', desc: 'Legal resources & statutes', route: '/law', color: '#7096D1' },
      { name: 'JamLawyer', desc: 'Attorney marketplace', route: '/lawyer', color: '#3b82f6' },
      { name: 'JamCPA', desc: 'Accounting & tax services', route: '/cpa', color: '#f59e0b' },
      { name: 'JamAccountant', desc: 'Bookkeeping & finance', route: '/accountant', color: '#22c55e' },
      { name: 'JamDoctor', desc: 'Medical & health resources', route: '/doctor', color: '#ef4444' },
      { name: 'JamMed', desc: 'Medical information portal', route: '/med', color: '#ef4444' },
    ],
  },
];

/* ═══════ HUB PAGE COMPONENT ═══════ */
export default function HubPage({ categoryId }: { categoryId: string }) {
  const category = HUB_CATEGORIES.find((c) => c.id === categoryId);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const openModal = useComingSoonStore((s) => s.open);

  const handleItemClick = (route: string, name: string) => {
    if (route === '#') {
      window.dispatchEvent(new CustomEvent('open-9x-concierge'));
      return;
    }
    if (isRouteBuilt(route)) {
      navigate(route);
    } else {
      openModal(route, name);
    }
  };

  if (!category) {
    return (
      <div className="min-h-[100dvh] bg-[#050810] text-white flex items-center justify-center">
        <p className="text-sm text-[#6B7280]">Category not found</p>
      </div>
    );
  }

  const filtered = category.items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const featured = filtered.filter((i) => i.featured);
  const regular = filtered.filter((i) => !i.featured);

  const Icon = category.icon;

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${category.color}15` }}>
              <Icon size={24} style={{ color: category.color }} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{category.label}</h1>
              <p className="text-xs text-[#6B7280]">{category.tagline}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-[10px] text-[#6B7280]">{category.items.length} platforms</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* WisdomPay Exclusive Banner (Pay hub only) */}
        {category.id === 'pay' && (
          <div className="bg-[#0A0F1E] border border-[#7096D1]/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#7096D1]/10 flex items-center justify-center">
                <Wallet size={20} className="text-[#7096D1]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">WisdomPay™</p>
                <p className="text-[10px] text-[#7096D1]">The Only Wallet on JamZia — Powered by Ad9x™</p>
              </div>
            </div>
            <p className="text-xs text-[#A0AEC0] mb-3">
              All financial transactions on JamZia flow through WisdomPay. Self-custody, XRPL-native,
              multi-sig enabled. No third-party wallets permitted.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#7096D1]/10 text-[#7096D1] px-2 py-1 rounded-full">XRPL Mainnet</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">Self-Custody</span>
              <span className="text-[10px] bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-1 rounded-full">Ad9x™ Powered</span>
            </div>
          </div>
        )}

        {/* Mrs. Cotton's Academy Banner (Learn hub only) */}
        {category.id === 'learn' && (
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#081F5C]/20 to-[#0A0F1E] border border-[#f59e0b]/20 rounded-2xl p-5 sm:p-6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#f59e0b]/5 rounded-full blur-3xl" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7096D1] to-[#f59e0b] flex items-center justify-center shrink-0">
                <GraduationCap size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={12} className="text-[#f59e0b] fill-[#f59e0b]" />
                  <span className="text-[10px] text-[#f59e0b] uppercase tracking-wider font-bold">Flagship Masterclass</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Mrs. Cotton's Academy — Mastery of Phonics</h3>
                <p className="text-xs text-[#A0AEC0]">
                  43 years of teaching excellence at The Winston School. Word-picture association methodology
                  for learners ages 2–22+. 245 lessons, 10 levels, AR mini-games, and certificates.
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href="#/academy"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] hover:bg-[#f59e0b]/80 text-black text-sm font-bold rounded-xl transition-colors no-underline"
                >
                  <GraduationCap size={16} /> Enter Academy
                </a>
                <a
                  href="#/cottonbrickroad"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0F1E] border border-white/[0.06] hover:border-white/[0.1] text-white text-sm font-semibold rounded-xl transition-colors no-underline"
                >
                  <Map size={16} className="text-[#f59e0b]" /> Cotton Brick Road
                </a>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-4 text-[10px] text-[#6B7280]">
              <span>Instructor: Margee Cotton (Legacy)</span>
              <span>•</span>
              <span>Contact: Clark Cotton</span>
              <span>•</span>
              <span className="text-rose-400">On medical leave — CRPS treatment</span>
            </div>
          </div>
        )}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder={`Search ${category.label.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0F1E] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-[#6B7280] focus:border-[category.color]/30 focus:outline-none"
          />
        </div>

        {/* Ask 9x Banner */}
        <div
          className="bg-[#0A0F1E] border rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-white/[0.01] transition-colors"
          style={{ borderColor: `${category.color}20` }}
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent('open-9x-concierge', {
                detail: { query: `Help me find the right ${category.label.toLowerCase()} platform` },
              })
            );
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#7096D1]/10 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-[#7096D1]" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-white font-medium">Not sure where to start?</p>
            <p className="text-[10px] text-[#6B7280]">Ask 9x to find your perfect {category.label.toLowerCase()} match</p>
          </div>
          <ChevronRight size={14} className="text-[#6B7280]" />
        </div>

        {/* Featured Items */}
        {featured.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Featured</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featured.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item.route, item.name);
                  }}
                  className="group relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] to-[#050810] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-4 transition-all no-underline cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5" style={{ backgroundColor: item.color }} />
                  <div className="relative flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                      <Star size={20} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-white">{item.name}</p>
                        <Star size={10} className="text-[#f59e0b] fill-[#f59e0b]" />
                      </div>
                      <p className="text-xs text-[#A0AEC0]">{item.desc}</p>
                      <div className="mt-2 flex items-center gap-1 text-[10px]" style={{ color: item.color }}>
                        <span>Open</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Regular Items */}
        <div className="space-y-3">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">All {category.label}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {regular.map((item) => (
              <a
                key={item.name}
                href={`#${item.route}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.route, item.name);
                }}
                className="group flex items-center gap-3 p-3 bg-[#0A0F1E] border border-white/[0.04] hover:border-white/[0.1] rounded-xl transition-all no-underline cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                  <Zap size={16} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white group-hover:text-[#7096D1] transition-colors">{item.name}</p>
                  <p className="text-[10px] text-[#6B7280] truncate">{item.desc}</p>
                </div>
                <ChevronRight size={14} className="text-[#6B7280] group-hover:text-white transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-xs text-[#6B7280]">No matches found. Ask 9x for help.</p>
          </div>
        )}

        {/* 9x CTA */}
        <div className="text-center pt-4 pb-8">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-9x-concierge'))}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 text-[#7096D1] text-xs rounded-xl transition-colors cursor-pointer"
          >
            <Sparkles size={14} /> Ask 9x to find your course
          </button>
        </div>
      </div>
    </div>
  );
}
