import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useComingSoonStore } from '../stores/comingSoonStore';
import { isRouteBuilt, getPlatformInfo } from '../config/platformRegistry';
import {
  Volume2, Play, Gamepad2, Wallet, ShoppingCart, GraduationCap, MessageCircle, Wrench, Landmark,
  ChevronRight, Headphones, Tv, Music, Clapperboard, Radio, FileVideo, Ticket, Users, Mic,
  ShoppingBag, Utensils, Car, Tag, BookOpen, Award, Crown, Star, Brain, Globe, Hash, Mail,
  Calendar, Code, Cloud, Database, ScrollText, Gavel, Building2, BarChart3, Sparkles,
  Swords, Rocket, MapPin, Heart, Zap, Wifi, Type, Feather, FlaskConical, CreditCard,
  Coins, Gift, Box, Smartphone, Monitor, LayoutDashboard, Film
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   MEGA MENU — 9 Categories → 9 Deliverables Each (81 Total)
   ═══════════════════════════════════════════════════════════ */

interface Deliverable {
  name: string;
  route: string;
  icon: React.ElementType;
  desc: string;
}

interface Category {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  deliverables: Deliverable[];
}

/* ── Inline SVG icons ── */
const IcoShield = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const IcoSwap = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>
);
const IcoLock = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const IcoHome = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const IcoBot = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
);
const IcoCheck = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

/* ── 9 Categories, 9 Deliverables each ──
   No duplicate routes or names across categories. */
const CATEGORIES: Category[] = [
  {
    id: 'listen', label: 'Listen', subtitle: 'Music, Podcasts & Audio', icon: Volume2, color: '#ec4899',
    deliverables: [
      { name: 'JamMusic', route: '/music', icon: Music, desc: 'Streaming music' },
      { name: 'JamAudio', route: '/audio', icon: Headphones, desc: 'Podcasts & audiobooks' },
      { name: 'JamRadio', route: '/radio', icon: Radio, desc: 'Live radio stations' },
      { name: 'JamSound', route: '/sound', icon: Volume2, desc: 'Sound effects library' },
      { name: 'JamBeats', route: '/beats', icon: Mic, desc: 'Beat marketplace' },
      { name: 'JamStudio', route: '/studio', icon: Mic, desc: 'Cloud recording studio' },
      { name: 'JamLiveAudio', route: '/live-audio', icon: Radio, desc: 'Live audio streams' },
      { name: 'JamLoop', route: '/loop', icon: Music, desc: 'Audio loops & samples' },
      { name: 'JamPod', route: '/pod', icon: Mic, desc: 'Podcast hosting' },
    ],
  },
  {
    id: 'watch', label: 'Watch', subtitle: 'Video, Movies & Live', icon: Play, color: '#ef4444',
    deliverables: [
      { name: 'JamBoxFlix+', route: '/boxflix', icon: Clapperboard, desc: 'Exclusive originals' },
      { name: 'JamZa Stream™', route: '/jamzastream', icon: Radio, desc: 'Decentralized streaming engine' },
      { name: 'JamVideo', route: '/video', icon: FileVideo, desc: 'Movies & shows' },
      { name: 'JamLive', route: '/live', icon: Radio, desc: 'Live streaming' },
      { name: 'JamReels', route: '/reels', icon: Play, desc: 'Short-form videos' },
      { name: 'JamShorts', route: '/shorts', icon: FileVideo, desc: 'Quick clips' },
      { name: 'JamPPV', route: '/ppv', icon: Ticket, desc: 'Pay-per-view events' },
      { name: 'JamFilms', route: '/films', icon: Film, desc: 'Documentary films' },
      { name: 'JamPremiere', route: '/premiere', icon: Star, desc: 'Premiere nights' },
    ],
  },
  {
    id: 'play', label: 'Play', subtitle: 'Games, AR & Interactive', icon: Gamepad2, color: '#f59e0b',
    deliverables: [
      { name: 'JamBattle', route: '/cottonbrickroad', icon: Swords, desc: 'Cotton Brick Road' },
      { name: 'JamGames', route: '/games', icon: Gamepad2, desc: 'Game library' },
      { name: 'JamAR', route: '/ar', icon: Rocket, desc: 'Augmented reality' },
      { name: 'JamQuest', route: '/quest', icon: MapPin, desc: 'AR quests & rewards' },
      { name: 'JamCoins', route: '/coins', icon: Coins, desc: 'Crypto coin collection' },
      { name: 'JamArena', route: '/arena', icon: Swords, desc: 'Tournament arena' },
      { name: 'JamChess', route: '/casino', icon: Swords, desc: 'Skill-based strategy games' },
      { name: 'JamRPG', route: '/rpg', icon: Gamepad2, desc: 'Role-playing games' },
      { name: 'JamPuzzle', route: '/puzzle', icon: Brain, desc: 'Brain games' },
    ],
  },
  {
    id: 'pay', label: 'Pay', subtitle: 'Wallet, Finance & DeFi', icon: Wallet, color: '#3b82f6',
    deliverables: [
      { name: 'JamPay', route: '/pay', icon: CreditCard, desc: 'Digital wallet (XRPL)' },
      { name: 'JamDEX', route: '/dex', icon: BarChart3, desc: 'Decentralized exchange' },
      { name: 'JamCredits', route: '/credits', icon: Coins, desc: 'Cross-platform credits' },
      { name: 'JamGrants', route: '/grants', icon: Gift, desc: 'Grant discovery' },
      { name: 'JamWise', route: '/wise', icon: Brain, desc: 'Financial wisdom' },
      { name: 'JamStaking', route: '/staking', icon: Coins, desc: 'Staking rewards' },
      { name: 'JamEscrow', route: '/escrow', icon: IcoShield, desc: 'Smart contract escrow' },
      { name: 'JamSwap', route: '/swap', icon: IcoSwap, desc: 'Token swaps' },
      { name: 'JamVault', route: '/vault', icon: IcoLock, desc: 'Asset vault' },
    ],
  },
  {
    id: 'shop', label: 'Shop', subtitle: 'Marketplace & Commerce', icon: ShoppingCart, color: '#f97316',
    deliverables: [
      { name: 'JamShop', route: '/shop', icon: ShoppingBag, desc: 'General marketplace' },
      { name: 'JamFood', route: '/food', icon: Utensils, desc: 'Food & meal delivery' },
      { name: 'JamAuto', route: '/auto', icon: Car, desc: 'Auto marketplace' },
      { name: 'JamDeals', route: '/deals', icon: Tag, desc: 'Daily deals' },
      { name: 'JamFashion', route: '/fashion', icon: ShoppingBag, desc: 'Fashion hub' },
      { name: 'JamTechStore', route: '/techstore', icon: Smartphone, desc: 'Tech store' },
      { name: 'JamHome', route: '/home', icon: IcoHome, desc: 'Home goods' },
      { name: 'JamTickets', route: '/tickets', icon: Ticket, desc: 'Event tickets' },
      { name: 'JamGoods', route: '/goods', icon: Box, desc: 'Physical goods' },
    ],
  },
  {
    id: 'learn', label: 'Learn', subtitle: 'Academy, Courses & Skills', icon: GraduationCap, color: '#8b5cf6',
    deliverables: [
      { name: 'JamLearn', route: '/learn', icon: BookOpen, desc: 'K-Doctoral academy' },
      { name: 'JamCourses', route: '/courses', icon: Award, desc: 'Online courses' },
      { name: 'JamMastery', route: '/mastery', icon: Crown, desc: 'Skill mastery paths' },
      { name: 'JamAcademy', route: '/academy', icon: GraduationCap, desc: "Mrs. Cotton's Academy" },
      { name: 'JamTutor', route: '/tutor', icon: Users, desc: '1-on-1 tutoring' },
      { name: 'JamCert', route: '/cert', icon: Award, desc: 'Certifications' },
      { name: 'JamLibrary', route: '/library', icon: BookOpen, desc: 'Digital library' },
      { name: 'JamLabs', route: '/labs', icon: FlaskConical, desc: 'Virtual labs' },
      { name: 'JamQuiz', route: '/quiz', icon: Brain, desc: 'Quiz & assessment' },
    ],
  },
  {
    id: 'connect', label: 'Connect', subtitle: 'Social, Chat & Community', icon: MessageCircle, color: '#06b6d4',
    deliverables: [
      { name: 'JamSocial', route: '/social', icon: Globe, desc: 'Social network' },
      { name: 'JamGroupChat', route: '/groupchat', icon: Users, desc: 'Group chat rooms' },
      { name: 'JamTok', route: '/tok', icon: Hash, desc: 'Short video social' },
      { name: 'JamMail', route: '/mail', icon: Mail, desc: 'Secure messaging' },
      { name: 'JamEvents', route: '/events', icon: Calendar, desc: 'Event planner' },
      { name: 'JamForum', route: '/forum', icon: MessageCircle, desc: 'Community forums' },
      { name: 'JamDating', route: '/dating', icon: Heart, desc: 'Social matching' },
      { name: 'JamNetwork', route: '/network', icon: Wifi, desc: 'Professional network' },
      { name: 'JamFamily', route: '/family', icon: Users, desc: 'Family sharing hub' },
    ],
  },
  {
    id: 'build', label: 'Build', subtitle: 'Tools, Code & Developer', icon: Wrench, color: '#22c55e',
    deliverables: [
      { name: 'JamCode', route: '/code', icon: Code, desc: 'IDE & code editor' },
      { name: 'JamCloud', route: '/cloud', icon: Cloud, desc: 'Cloud hosting' },
      { name: 'JamAPI', route: '/api', icon: Database, desc: 'API gateway' },
      { name: 'JamDevDocs', route: '/devdocs', icon: ScrollText, desc: 'Developer docs' },
      { name: 'JamDeploy', route: '/deploy', icon: Rocket, desc: 'One-click deploy' },
      { name: 'JamCI', route: '/ci', icon: Zap, desc: 'CI/CD pipelines' },
      { name: 'JamMonitor', route: '/monitor', icon: BarChart3, desc: 'App monitoring' },
      { name: 'JamBot', route: '/bot', icon: IcoBot, desc: 'Bot builder' },
      { name: 'JamForm', route: '/form', icon: Type, desc: 'Form builder' },
    ],
  },
  {
    id: 'govern', label: 'Govern', subtitle: 'Legal, Gov & Compliance', icon: Landmark, color: '#6366f1',
    deliverables: [
      { name: 'JamLaw', route: '/law', icon: Gavel, desc: 'Legal resources' },
      { name: 'JamFed', route: '/fed', icon: Building2, desc: 'Federal programs' },
      { name: 'JamState', route: '/state', icon: MapPin, desc: 'State services' },
      { name: 'JamLocal', route: '/local', icon: Landmark, desc: 'Local government' },
      { name: 'JamDocsLegal', route: '/docs-legal', icon: ScrollText, desc: 'Legal document hub' },
      { name: 'JamTax', route: '/tax', icon: BarChart3, desc: 'Tax compliance' },
      { name: 'JamCompliance', route: '/compliance', icon: IcoShield, desc: 'Regulatory compliance' },
      { name: 'JamVote', route: '/vote', icon: IcoCheck, desc: 'Voting & polling' },
      { name: 'JamPolicy', route: '/policy', icon: Feather, desc: 'Policy tracker' },
    ],
  },
];

/* ── System links ── */
const SYSTEM_LINKS = [
  { name: 'Desktop', route: '/app', icon: Monitor, desc: 'Desktop App' },
  { name: 'iOS', route: '/ios', icon: Smartphone, desc: 'iPhone & iPad' },
  { name: 'Android', route: '/android', icon: Smartphone, desc: 'Android App' },
  { name: 'Dashboard', route: '/admin/dashboard', icon: LayoutDashboard, desc: 'Admin Panel' },
];

/* ═══════════════════════════════════════════════════════════
   NAVBAR COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Navbar() {
  const navigate = useNavigate();
  const [platOpen, setPlatOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string>('listen');
  const platRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      // Don't close if clicking inside the mega menu or the hamburger button
      const insideMenu = platRef.current && platRef.current.contains(target);
      const insideHamburger = hamburgerRef.current && hamburgerRef.current.contains(target);
      const insideDropdown = document.querySelector('[data-mega-dropdown]')?.contains(target);
      if (!insideMenu && !insideHamburger && !insideDropdown) {
        setPlatOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = platOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [platOpen]);

  const activeCategory = CATEGORIES.find((c) => c.id === activeCat) || CATEGORIES[0];

  const go = (route: string) => {
    if (isRouteBuilt(route)) {
      navigate(route);
      setPlatOpen(false);
    } else {
      const info = getPlatformInfo(route);
      if (info) {
        useComingSoonStore.getState().open(route, info.name);
      }
      setPlatOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0A1628]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => go('/')} className="flex items-center gap-2 no-underline shrink-0 bg-transparent border-none cursor-pointer">
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              JamZia<sup className="text-[9px] font-medium ml-0.5">™</sup>
            </span>
          </button>

          {/* Center — Mega Menu Trigger */}
          <div className="hidden lg:flex items-center gap-1" ref={platRef}>
            <button
              onClick={() => setPlatOpen(!platOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-transparent border-none cursor-pointer ${
                platOpen ? 'bg-[#C9A03F]/20 text-[#C9A03F]' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Platforms
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${platOpen ? 'rotate-90' : ''}`} />
            </button>

            {/* ── DESKTOP MEGA DROPDOWN ── */}
            {platOpen && (
              <div data-mega-dropdown className="fixed top-14 left-0 right-0 bg-[#0a0f1e]/98 backdrop-blur-xl border-b border-white/5 shadow-2xl">
                <div className="max-w-[1400px] mx-auto px-4 py-5">

                  {/* 9 CATEGORY TABS */}
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-2">
                      9 Hubs — Hover or click to explore 81 deliverables
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setActiveCat(cat.id)}
                          onClick={() => setActiveCat(cat.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all border cursor-pointer bg-transparent ${
                            activeCat === cat.id
                              ? 'text-white shadow-lg'
                              : 'text-white/50 bg-white/5 border-transparent hover:text-white/80 hover:bg-white/10'
                          }`}
                          style={
                            activeCat === cat.id
                              ? { backgroundColor: cat.color + '25', borderColor: cat.color }
                              : {}
                          }
                        >
                          <cat.icon className="w-4 h-4" style={{ color: activeCat === cat.id ? cat.color : 'currentColor' }} />
                          <span>{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ACTIVE CATEGORY: 9 DELIVERABLES */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <activeCategory.icon className="w-4 h-4" style={{ color: activeCategory.color }} />
                      <span className="text-sm font-bold text-white">{activeCategory.label}</span>
                      <span className="text-xs text-white/40">— {activeCategory.subtitle}</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2">
                      {activeCategory.deliverables.map((d) => (
                        <button
                          key={d.name}
                          onClick={() => go(d.route)}
                          className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/10 transition-all text-center cursor-pointer"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: activeCategory.color + '15' }}
                          >
                            <d.icon className="w-5 h-5" style={{ color: activeCategory.color }} />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white group-hover:text-white transition-colors leading-tight">{d.name}</p>
                            <p className="text-[10px] text-white/30 leading-tight mt-0.5">{d.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* COMPACT SYSTEM FOOTER */}
                  <div className="border-t border-white/5 pt-3 flex items-center gap-3">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider shrink-0">System</p>
                    <div className="flex flex-wrap gap-2">
                      {SYSTEM_LINKS.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => go(item.route)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-pointer bg-transparent"
                        >
                          <item.icon className="w-3.5 h-3.5 text-[#22c55e]" />
                          <span className="text-[11px] text-white/70">{item.name}</span>
                          <span className="text-[9px] text-white/30 hidden xl:inline">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Right links */}
          <div className="hidden lg:flex items-center gap-1">
            <button onClick={() => go('/command')} className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer bg-transparent border-none">Command</button>
            <button onClick={() => go('/profile')} className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer bg-transparent border-none">Profile</button>
          </div>

          {/* Hamburger — always visible, works on all viewports */}
          <button
            ref={hamburgerRef}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white cursor-pointer border-none"
            onClick={() => setPlatOpen(!platOpen)}
          >
            <span className="text-lg">{platOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULL-SCREEN MEGA MENU ── */}
      {platOpen && (
        <div data-mega-dropdown className="fixed inset-0 z-40 bg-[#0a0f1e] lg:hidden pt-14 overflow-y-auto">
          <div className="p-4 space-y-6">

            {/* 9 Category Tabs (3x3 grid) */}
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">9 Hubs — Tap to explore</p>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all border cursor-pointer bg-transparent ${
                      activeCat === cat.id ? 'text-white' : 'text-white/50 bg-white/5 border-transparent'
                    }`}
                    style={
                      activeCat === cat.id
                        ? { backgroundColor: cat.color + '20', borderColor: cat.color }
                        : {}
                    }
                  >
                    <cat.icon className="w-5 h-5" style={{ color: activeCat === cat.id ? cat.color : 'currentColor' }} />
                    <span className="text-xs font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Category: 9 Deliverables (2-col grid) */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <activeCategory.icon className="w-4 h-4" style={{ color: activeCategory.color }} />
                <span className="text-sm font-bold text-white">{activeCategory.label}</span>
                <span className="text-xs text-white/40">— 9 deliverables</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {activeCategory.deliverables.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => go(d.route)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] cursor-pointer bg-transparent text-left"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: activeCategory.color + '15' }}>
                      <d.icon className="w-4 h-4" style={{ color: activeCategory.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{d.name}</p>
                      <p className="text-[10px] text-white/30 truncate">{d.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* System Footer */}
            <div className="pb-8">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-2">System</p>
              <div className="grid grid-cols-2 gap-2">
                {SYSTEM_LINKS.map((item) => (
                  <button key={item.name} onClick={() => go(item.route)} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] cursor-pointer bg-transparent text-left">
                    <item.icon className="w-4 h-4 text-[#22c55e]" />
                    <div>
                      <span className="text-xs text-white">{item.name}</span>
                      <p className="text-[10px] text-white/30">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
