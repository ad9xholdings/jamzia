/* ═══════════════════════════════════════════════════════════
   NoFear™ — Fearless Revolution Foundation Homepage v2
   White Label WL-001 — Full 50+ Platform Ecosystem
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Heart, Shield, Brain, BookOpen, Users, Play,
  MessageCircle, TrendingUp, Crown, Sparkles, Swords, Castle,
  Stethoscope, Star, Search, Phone, AlertTriangle, ChevronRight,
  Globe, Zap, Award, Leaf, Car, Briefcase, Code, Scale,
  Newspaper, Gamepad2, CreditCard, ShoppingBag, Film, Headphones,
  Tv, FlaskConical, HeartPulse, MapPin, Building2, Landmark,
  Gavel, Plane, Cloud, Sun, Box, Gift, Layers,
  Hash, Rocket, Database, Wifi, Type, Feather, BarChart3,
} from 'lucide-react';
import { FOOTER, HERO } from '../config/nofear-brand';

/* ── Full 50+ Platform Registry (48 shown + 2 extra via links) ── */
const PLATFORM_REGISTRY = [
  { name: 'NoFearPsych', icon: Brain, desc: 'Miss Cotton Academy — 9 mental health courses', href: '/nofear/psych', accent: '#ec4899', category: 'Healing' },
  { name: 'NoFearTherapy', icon: HeartPulse, desc: 'Licensed therapy — 24/7 crisis support', href: '/nofear/therapy', accent: '#22c55e', category: 'Healing' },
  { name: 'NoFearPros', icon: Briefcase, desc: 'Doctor • Lawyer • CPA • Banker • Broker', href: '/nofear/pros', accent: '#3b82f6', category: 'Healing' },
  { name: 'NoFearMastery', icon: Crown, desc: 'Skills mastery & gamified learning', href: '/nofear/mastery', accent: '#f59e0b', category: 'Healing' },
  { name: 'NoFearLearn', icon: BookOpen, desc: "Mrs. Cotton's Academy — K-Doctoral", href: '/nofear/learn', accent: '#f59e0b', category: 'Healing' },
  { name: 'NoFearCourses', icon: Award, desc: 'Educational courses & certifications', href: '/nofear/courses', accent: '#a855f7', category: 'Healing' },
  { name: 'NoFearProfile', icon: Star, desc: 'Academic transcript & economy', href: '/nofear/profile', accent: '#7096D1', category: 'Healing' },
  { name: 'NoFearBattle', icon: Swords, desc: 'Cotton Brick Road™ — Battle & Learn', href: '/nofear/battle', accent: '#f59e0b', category: 'Healing' },

  { name: 'NoFearAudio', icon: Headphones, desc: '100M+ songs & podcasts', href: '/nofear/audio', accent: '#a855f7', category: 'Media' },
  { name: 'NoFearVideo', icon: Film, desc: 'Movies, shows, tutorials', href: '/nofear/video', accent: '#ec4899', category: 'Media' },
  { name: 'NoFearLive', icon: Tv, desc: 'Live streams & events', href: '/nofear/live', accent: '#ef4444', category: 'Media' },
  { name: 'NoFearSocial', icon: MessageCircle, desc: 'Community & support groups', href: '/nofear/social', accent: '#7096D1', category: 'Media' },
  { name: 'NoFearGames', icon: Gamepad2, desc: 'Gaming hub & tournaments', href: '/nofear/games', accent: '#f59e0b', category: 'Media' },
  { name: 'NoFearTok', icon: Hash, desc: 'Short-form video platform', href: '/nofear/tok', accent: '#ec4899', category: 'Media' },
  { name: 'NoFearAR', icon: Rocket, desc: 'Augmented reality experiences', href: '/nofear/ar', accent: '#8b5cf6', category: 'Media' },
  { name: 'NoFearBox', icon: Box, desc: 'Creator streaming platform', href: '/nofear/box', accent: '#f59e0b', category: 'Media' },

  { name: 'NoFearPay', icon: CreditCard, desc: 'Wallet & payments (XRPL)', href: '/nofear/pay', accent: '#3b82f6', category: 'Finance' },
  { name: 'NoFearShop', icon: ShoppingBag, desc: 'Marketplace & goods', href: '/nofear/shop', accent: '#f59e0b', category: 'Finance' },
  { name: 'NoFearFood', icon: Sparkles, desc: 'Meal plans & nutrition', href: '/nofear/food', accent: '#22c55e', category: 'Finance' },
  { name: 'NoFearDEX', icon: BarChart3, desc: 'Decentralized exchange', href: '/nofear/dex', accent: '#3b82f6', category: 'Finance' },
  { name: 'NoFearGrants', icon: Gift, desc: 'Grant discovery & applications', href: '/nofear/grants', accent: '#f59e0b', category: 'Finance' },
  { name: 'NoFearCredits', icon: Database, desc: 'Cross-platform credit scoring', href: '/nofear/credits', accent: '#06b6d4', category: 'Finance' },
  { name: 'NoFearWise', icon: Zap, desc: 'Financial wisdom & literacy', href: '/nofear/wise', accent: '#f59e0b', category: 'Finance' },
  { name: 'NoFearAuto', icon: Car, desc: 'Auto services & marketplace', href: '/nofear/auto', accent: '#ec4899', category: 'Finance' },

  { name: 'NoFearEarth', icon: Globe, desc: 'Environmental data & tracking', href: '/nofear/earth', accent: '#22c55e', category: 'World' },
  { name: 'NoFearGreen', icon: Leaf, desc: 'Sustainability & green living', href: '/nofear/green', accent: '#22c55e', category: 'World' },
  { name: 'NoFearGrow', icon: Sun, desc: 'Agriculture & growing', href: '/nofear/grow', accent: '#22c55e', category: 'World' },
  { name: 'NoFearWeather', icon: Cloud, desc: 'Weather & forecasting', href: '/nofear/weather', accent: '#06b6d4', category: 'World' },
  { name: 'NoFearStreet', icon: MapPin, desc: 'Street-level discovery', href: '/nofear/street', accent: '#6B7280', category: 'World' },
  { name: 'NoFearCat', icon: Plane, desc: 'Travel & experiences', href: '/nofear/cat', accent: '#ec4899', category: 'World' },

  { name: 'NoFearNews', icon: Newspaper, desc: 'News & journalism', href: '/nofear/news', accent: '#ef4444', category: 'Intel' },
  { name: 'NoFearLab', icon: FlaskConical, desc: 'AI research lab', href: '/nofear/lab', accent: '#a855f7', category: 'Intel' },
  { name: 'NoFearKind', icon: Heart, desc: 'Do Good deeds tracker', href: '/nofear/kind', accent: '#22c55e', category: 'Intel' },
  { name: 'NoFearTribute', icon: Feather, desc: 'Memorials & tributes', href: '/nofear/tribute', accent: '#f59e0b', category: 'Intel' },
  { name: 'NoFearScale', icon: Layers, desc: 'Business scaling tools', href: '/nofear/scale', accent: '#3b82f6', category: 'Intel' },
  { name: 'NoFearWords', icon: Type, desc: 'Vocabulary & languages', href: '/nofear/words', accent: '#7096D1', category: 'Intel' },
  { name: 'NoFearTech', icon: Code, desc: 'Technology & engineering', href: '/nofear/tech', accent: '#06b6d4', category: 'Intel' },
  { name: 'NoFearCom', icon: Wifi, desc: 'Communications backbone', href: '/nofear/com', accent: '#06b6d4', category: 'Intel' },

  { name: 'NoFearLaw', icon: Scale, desc: 'Legal resources & forms', href: '/nofear/law', accent: '#3b82f6', category: 'Gov' },
  { name: 'NoFearLawyer', icon: Gavel, desc: 'Attorney marketplace', href: '/nofear/lawyer', accent: '#3b82f6', category: 'Gov' },
  { name: 'NoFearCPA', icon: Zap, desc: 'Tax & accounting', href: '/nofear/cpa', accent: '#06b6d4', category: 'Gov' },
  { name: 'NoFearFed', icon: Landmark, desc: 'Federal programs & data', href: '/nofear/fed', accent: '#ef4444', category: 'Gov' },
  { name: 'NoFearState', icon: Building2, desc: '50-state legislative hub', href: '/nofear/state', accent: '#3b82f6', category: 'Gov' },
  { name: 'NoFearLocal', icon: MapPin, desc: 'Hyperlocal services', href: '/nofear/local', accent: '#22c55e', category: 'Gov' },

  { name: 'NoFearDoctor', icon: Stethoscope, desc: 'Telehealth & doctors', href: '/nofear/doctor', accent: '#22c55e', category: 'Health' },
  { name: 'NoFearMed', icon: HeartPulse, desc: 'Medical reference', href: '/nofear/med', accent: '#ec4899', category: 'Health' },
  { name: 'NoFearCode', icon: Code, desc: 'Health records & codes', href: '/nofear/code', accent: '#06b6d4', category: 'Health' },
  { name: 'NoFearAccountant', icon: Zap, desc: 'Health cost accounting', href: '/nofear/accountant', accent: '#f59e0b', category: 'Health' },
];

const CATEGORY_META: Record<string, { label: string; color: string; icon: any }> = {
  Healing: { label: 'Healing & Growth', color: '#4A90A4', icon: Heart },
  Media: { label: 'Media & Connection', color: '#D4A574', icon: Play },
  Finance: { label: 'Commerce & Finance', color: '#8B6914', icon: TrendingUp },
  World: { label: 'Natural World', color: '#22c55e', icon: Leaf },
  Intel: { label: 'Knowledge & Intel', color: '#a855f7', icon: Brain },
  Gov: { label: 'Government & Law', color: '#3b82f6', icon: Scale },
  Health: { label: 'Health & Medical', color: '#ec4899', icon: HeartPulse },
};

const CRISIS_RESOURCES = [
  { label: 'Crisis Text Line', value: 'Text HOME to 741741', icon: MessageCircle },
  { label: '988 Lifeline', value: 'Call or text 988', icon: Phone },
  { label: 'Emergency', value: 'Call 911', icon: AlertTriangle },
];

const HOPE_MESSAGES = [
  { user: 'survivor2024', msg: 'NoFearPsych helped me understand my trauma for the first time', time: '2m' },
  { user: 'healing_heart', msg: 'My NoFearTherapy session today gave me tools I never had before', time: '1m' },
  { user: 'hopeful_parent', msg: 'My teen is using NoFearLearn and actually engaging', time: '30s' },
  { user: 'nofear_warrior', msg: 'The Cotton Brick Road made learning fun again', time: '15s' },
  { user: 'grateful_soul', msg: 'NoFearPros connected me with a trauma-informed lawyer', time: '5m' },
];

export default function NoFearHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = PLATFORM_REGISTRY.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    const matchesCategory = activeCategory ? p.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Object.keys(CATEGORY_META);

  return (
    <div className="min-h-[100dvh] text-white" style={{ background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)' }}>
      {/* Header */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <a href="#/nofear" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#4A90A420', border: '1px solid #4A90A440' }}>
              <Heart size={20} className="text-[#4A90A4]" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">NoFear™</h1>
              <p className="text-[9px] text-[#7EB5A6] leading-tight">Fearless Revolution Foundation</p>
            </div>
          </a>
          <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#4A90A415', color: '#4A90A4' }}>WL-001</span>
          <div className="ml-auto flex items-center gap-2">
            <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors hidden sm:block">Parent: JamZia Networks™</a>
            <a href="#/nofear/therapy" className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg text-white no-underline" style={{ backgroundColor: '#4A90A4' }}>
              <Heart size={12} /> Get Help Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Hero */}
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#4A90A420', border: '1px solid #4A90A440' }}>
            <Shield size={40} className="text-[#4A90A4]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3 tracking-tight">{HERO.title}</h2>
          <p className="text-base sm:text-lg text-[#A0AEC0] max-w-xl mx-auto mb-2">{HERO.description}</p>
          <p className="text-sm italic text-[#D4A574] mb-8">"A Message of Hope for the World" — Miss Cotton</p>

          <div className="max-w-lg mx-auto relative mb-8">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 50+ NoFear platforms..."
              className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#6B7280] focus:border-[#4A90A4]/50 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white text-xs">Clear</button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a href="#/nofear/therapy" className="px-6 py-3 text-sm font-bold rounded-xl text-white no-underline transition-all hover:opacity-90" style={{ backgroundColor: '#4A90A4' }}>{HERO.ctaPrimary}</a>
            <a href="#/nofear/learn" className="px-6 py-3 text-sm font-bold rounded-xl border border-white/[0.12] text-white hover:bg-white/[0.05] transition-colors no-underline">{HERO.ctaSecondary}</a>
            <a href="#/nofear/battle" className="px-6 py-3 text-sm font-bold rounded-xl border border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/10 transition-colors no-underline"><Swords size={14} className="inline mr-1" /> Cotton Brick Road</a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {HERO.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: '#D4A574' }}>{s.value}</p>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crisis Banner */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-400" />
            <h3 className="text-sm font-bold text-red-400">24/7 Crisis Support — You Are Not Alone</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CRISIS_RESOURCES.map((res) => (
              <div key={res.label} className="flex items-center gap-3 p-3 bg-black/30 rounded-xl">
                <res.icon size={16} className="text-red-400" />
                <div>
                  <p className="text-xs font-semibold text-white">{res.label}</p>
                  <p className="text-sm font-bold text-red-400">{res.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <a href="#/nofear/therapy" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold rounded-xl transition-colors no-underline"><Heart size={14} /> Access NoFearTherapy</a>
            <a href="#/nofear/psych" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] text-white text-xs font-bold rounded-xl transition-colors no-underline"><Brain size={14} /> NoFearPsych Courses</a>
          </div>
        </div>

        {/* Category Filters */}
        {!searchQuery && (
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <button onClick={() => setActiveCategory(null)} className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${activeCategory === null ? 'text-white' : 'text-[#6B7280] hover:text-white'}`} style={activeCategory === null ? { backgroundColor: '#4A90A440' } : { backgroundColor: 'rgba(255,255,255,0.05)' }}>All 50+</button>
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat];
              const isActive = activeCategory === cat;
              return (
                <button key={cat} onClick={() => setActiveCategory(isActive ? null : cat)} className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer flex items-center gap-1.5`} style={isActive ? { backgroundColor: `${meta.color}30`, color: meta.color, border: `1px solid ${meta.color}40` } : { backgroundColor: 'rgba(255,255,255,0.05)', color: '#6B7280' }}>
                  <meta.icon size={12} /> {meta.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Platform Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">{searchQuery ? `Search: "${searchQuery}"` : activeCategory ? CATEGORY_META[activeCategory].label : 'All 50+ NoFear Platforms'}</h3>
            <span className="text-[10px] text-[#6B7280]">{filtered.length} platforms</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((item) => (
              <a key={item.name} href={`#${item.href}`} className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all no-underline">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.accent}15` }}>
                    <item.icon size={18} style={{ color: item.accent }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-[#4A90A4] transition-colors truncate">{item.name}™</p>
                    <p className="text-[9px] text-[#6B7280] truncate">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.accent}15`, color: item.accent }}>{item.category}</span>
                  <ChevronRight size={12} className="text-[#6B7280] group-hover:text-[#4A90A4] transition-colors" />
                </div>
              </a>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Search size={32} className="text-[#6B7280] mx-auto mb-3" />
              <p className="text-sm text-[#6B7280]">No platforms match &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>

        {/* Cotton Brick Road */}
        <div className="relative overflow-hidden rounded-2xl border border-[#f59e0b]/20" style={{ background: 'linear-gradient(135deg, #0A0F1E, #1a1040)' }}>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Castle size={28} className="text-[#f59e0b]" />
              <div>
                <h3 className="text-lg font-bold text-white">NoFear Cotton Brick Road™</h3>
                <p className="text-[10px] text-[#f59e0b]">Battle, Learn, Heal — Earn Your Certification</p>
              </div>
            </div>
            <p className="text-xs text-[#A0AEC0] leading-relaxed mb-4 max-w-2xl">
              Journey through the Cotton Brick Road. Battle creatures representing challenges in your life.
              Each victory earns you bricks toward your next grade certification — awarded by Mrs. Cotton (The Winston School, NJ).
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#/nofear/battle" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-bold rounded-xl transition-colors no-underline"><Swords size={14} /> Enter the Road</a>
              <a href="#/nofear/learn" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 border border-[#7096D1]/30 text-[#7096D1] text-xs font-bold rounded-xl transition-colors no-underline"><Crown size={14} /> NoFearLearn Academy</a>
              <a href="#/nofear/profile" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white text-xs font-bold rounded-xl transition-colors no-underline"><Star size={14} /> View Transcript</a>
            </div>
          </div>
        </div>

        {/* JamRep Site Replication */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f59e0b15' }}>
              <Layers size={20} className="text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">JamRep™ Site Replication</h3>
              <p className="text-[10px] text-[#6B7280]">White-label deployment engine — Ready for market</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { step: '1', label: 'Clone', desc: 'Clone JamZia base + 50+ platform modules' },
              { step: '2', label: 'Brand', desc: 'Replace colors, logos, org name (like FRF)' },
              { step: '3', label: 'Launch', desc: 'Deploy live with custom domain' },
            ].map((s) => (
              <div key={s.step} className="p-3 bg-black/30 rounded-xl text-center">
                <p className="text-lg font-bold text-[#f59e0b]">{s.step}</p>
                <p className="text-xs font-semibold text-white">{s.label}</p>
                <p className="text-[10px] text-[#6B7280]">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#/nofear/rep" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-bold rounded-xl transition-colors no-underline"><Layers size={14} /> Explore JamRep</a>
            <span className="text-[10px] text-[#6B7280]">11-layer architecture • 65% complete</span>
          </div>
        </div>

        {/* Hope Community */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} className="text-[#7EB5A6]" />
            <h3 className="text-sm font-bold text-white">Hope Community Feed</h3>
            <span className="text-[9px] text-[#6B7280] ml-auto flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOPE_MESSAGES.map((m, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-black/30 rounded-xl">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white" style={{ backgroundColor: '#4A90A4' }}>{m.user[0].toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold text-[#4A90A4]">{m.user}</span>
                    <span className="text-[8px] text-[#6B7280]">{m.time}</span>
                  </div>
                  <p className="text-xs text-[#A0AEC0]">{m.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 space-y-3 border-t border-white/[0.06]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart size={16} className="text-[#4A90A4]" />
            <span className="text-base font-bold text-white">{FOOTER.org}</span>
          </div>
          <p className="text-sm italic text-[#D4A574]">&quot;{FOOTER.tagline}&quot;</p>
          <p className="text-xs text-[#A0AEC0] max-w-lg mx-auto">{FOOTER.mission}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a href="#/nofear/terms" className="text-[10px] text-[#6B7280] hover:text-[#4A90A4] no-underline transition-colors">Terms</a>
            <a href="#/nofear/privacy" className="text-[10px] text-[#6B7280] hover:text-[#4A90A4] no-underline transition-colors">Privacy</a>
            <a href="#/nofear/docs" className="text-[10px] text-[#6B7280] hover:text-[#4A90A4] no-underline transition-colors">Docs</a>
            <a href="#/nofear/api" className="text-[10px] text-[#6B7280] hover:text-[#4A90A4] no-underline transition-colors">API</a>
            <a href="#/nofear/rep" className="text-[10px] text-[#f59e0b] no-underline">JamRep™</a>
            <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">JamZia™ Home</a>
          </div>
          <p className="text-[9px] text-[#6B7280]">{FOOTER.parent}</p>
          <p className="text-[9px] text-[#6B7280]">{FOOTER.whiteLabel}</p>
          <p className="text-[9px] text-[#6B7280]">{FOOTER.copyright}</p>
        </div>
      </div>
    </div>
  );
}
