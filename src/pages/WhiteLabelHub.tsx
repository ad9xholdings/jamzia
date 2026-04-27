/* ═══════════════════════════════════════════════════════════
   WhiteLabelHub — Dynamic Brand Homepage
   Renders a unique branded experience per white-label tenant
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import {
  Brain, BookOpen, Heart,
  MessageCircle, Crown, Sparkles, Swords,
  Stethoscope, Star, Search, ChevronRight,
  Globe, Zap, Award, Leaf, Car, Briefcase, Code, Scale,
  Newspaper, Gamepad2, CreditCard, ShoppingBag, Film, Headphones,
  Tv, FlaskConical, HeartPulse, MapPin, Building2, Landmark,
  Gavel, Plane, Cloud, Sun, Box, Gift, Layers,
  Hash, Rocket, Database, Wifi, Type, Feather, BarChart3,
} from 'lucide-react';
import { getBrandById } from '../config/wl-brands';

const PLATFORM_REGISTRY = [
  { name: 'JamPsych', icon: Brain, desc: '9 mental health courses', href: '/psych', accent: '#ec4899', category: 'Healing' },
  { name: 'JamTherapy', icon: HeartPulse, desc: 'Licensed therapy — 24/7 crisis', href: '/therapy', accent: '#22c55e', category: 'Healing' },
  { name: 'JamPros', icon: Briefcase, desc: 'Doctor • Lawyer • CPA • Broker', href: '/pros', accent: '#3b82f6', category: 'Healing' },
  { name: 'JamMastery', icon: Crown, desc: 'Skills mastery & gamified learning', href: '/mastery', accent: '#f59e0b', category: 'Healing' },
  { name: 'JamLearn', icon: BookOpen, desc: 'K-Doctoral Academy', href: '/learn', accent: '#f59e0b', category: 'Healing' },
  { name: 'JamCourses', icon: Award, desc: 'Courses & certifications', href: '/courses', accent: '#a855f7', category: 'Healing' },
  { name: 'JamProfile', icon: Star, desc: 'Academic transcript', href: '/profile', accent: '#7096D1', category: 'Healing' },
  { name: 'JamBattle', icon: Swords, desc: 'Cotton Brick Road™', href: '/battle', accent: '#f59e0b', category: 'Healing' },
  { name: 'JamAudio', icon: Headphones, desc: '100M+ songs & podcasts', href: '/audio', accent: '#a855f7', category: 'Media' },
  { name: 'JamVideo', icon: Film, desc: 'Movies, shows, tutorials', href: '/video', accent: '#ec4899', category: 'Media' },
  { name: 'JamLive', icon: Tv, desc: 'Live streams & events', href: '/live', accent: '#ef4444', category: 'Media' },
  { name: 'JamSocial', icon: MessageCircle, desc: 'Community & support', href: '/social', accent: '#7096D1', category: 'Media' },
  { name: 'JamGames', icon: Gamepad2, desc: 'Gaming hub', href: '/games', accent: '#f59e0b', category: 'Media' },
  { name: 'JamTok', icon: Hash, desc: 'Short-form video', href: '/tok', accent: '#ec4899', category: 'Media' },
  { name: 'JamAR', icon: Rocket, desc: 'Augmented reality', href: '/ar', accent: '#8b5cf6', category: 'Media' },
  { name: 'JamBox', icon: Box, desc: 'Creator streaming', href: '/box', accent: '#f59e0b', category: 'Media' },
  { name: 'JamPay', icon: CreditCard, desc: 'Wallet & payments (XRPL)', href: '/pay', accent: '#3b82f6', category: 'Finance' },
  { name: 'JamShop', icon: ShoppingBag, desc: 'Marketplace', href: '/shop', accent: '#f59e0b', category: 'Finance' },
  { name: 'JamFood', icon: Sparkles, desc: 'Meal plans & nutrition', href: '/food', accent: '#22c55e', category: 'Finance' },
  { name: 'JamDEX', icon: BarChart3, desc: 'Decentralized exchange', href: '/dex', accent: '#3b82f6', category: 'Finance' },
  { name: 'JamGrants', icon: Gift, desc: 'Grant discovery', href: '/grants', accent: '#f59e0b', category: 'Finance' },
  { name: 'JamCredits', icon: Database, desc: 'Cross-platform credit', href: '/credits', accent: '#06b6d4', category: 'Finance' },
  { name: 'JamWise', icon: Zap, desc: 'Financial wisdom', href: '/wise', accent: '#f59e0b', category: 'Finance' },
  { name: 'JamAuto', icon: Car, desc: 'Auto services', href: '/auto', accent: '#ec4899', category: 'Finance' },
  { name: 'JamEarth', icon: Globe, desc: 'Environmental data', href: '/earth', accent: '#22c55e', category: 'World' },
  { name: 'JamGreen', icon: Leaf, desc: 'Sustainability', href: '/green', accent: '#22c55e', category: 'World' },
  { name: 'JamGrow', icon: Sun, desc: 'Agriculture', href: '/grow', accent: '#22c55e', category: 'World' },
  { name: 'JamWeather', icon: Cloud, desc: 'Weather & forecasting', href: '/weather', accent: '#06b6d4', category: 'World' },
  { name: 'JamStreet', icon: MapPin, desc: 'Street-level discovery', href: '/street', accent: '#6B7280', category: 'World' },
  { name: 'JamCat', icon: Plane, desc: 'Travel & experiences', href: '/cat', accent: '#ec4899', category: 'World' },
  { name: 'JamNews', icon: Newspaper, desc: 'News & journalism', href: '/news', accent: '#ef4444', category: 'Intel' },
  { name: 'JamLab', icon: FlaskConical, desc: 'AI research lab', href: '/lab', accent: '#a855f7', category: 'Intel' },
  { name: 'JamKind', icon: Heart, desc: 'Do Good deeds', href: '/kind', accent: '#22c55e', category: 'Intel' },
  { name: 'JamTribute', icon: Feather, desc: 'Memorials', href: '/tribute', accent: '#f59e0b', category: 'Intel' },
  { name: 'JamScale', icon: Layers, desc: 'Business scaling', href: '/scale', accent: '#3b82f6', category: 'Intel' },
  { name: 'JamWords', icon: Type, desc: 'Vocabulary & languages', href: '/words', accent: '#7096D1', category: 'Intel' },
  { name: 'JamTech', icon: Code, desc: 'Technology & engineering', href: '/tech', accent: '#06b6d4', category: 'Intel' },
  { name: 'JamCom', icon: Wifi, desc: 'Communications', href: '/com', accent: '#06b6d4', category: 'Intel' },
  { name: 'JamLaw', icon: Scale, desc: 'Legal resources', href: '/law', accent: '#3b82f6', category: 'Gov' },
  { name: 'JamLawyer', icon: Gavel, desc: 'Attorney marketplace', href: '/lawyer', accent: '#3b82f6', category: 'Gov' },
  { name: 'JamCPA', icon: Zap, desc: 'Tax & accounting', href: '/cpa', accent: '#06b6d4', category: 'Gov' },
  { name: 'JamFed', icon: Landmark, desc: 'Federal programs', href: '/fed', accent: '#ef4444', category: 'Gov' },
  { name: 'JamState', icon: Building2, desc: '50-state legislative', href: '/state', accent: '#3b82f6', category: 'Gov' },
  { name: 'JamLocal', icon: MapPin, desc: 'Hyperlocal services', href: '/local', accent: '#22c55e', category: 'Gov' },
  { name: 'JamDoctor', icon: Stethoscope, desc: 'Telehealth', href: '/doctor', accent: '#22c55e', category: 'Health' },
  { name: 'JamMed', icon: HeartPulse, desc: 'Medical reference', href: '/med', accent: '#ec4899', category: 'Health' },
  { name: 'JamCode', icon: Code, desc: 'Health records', href: '/code', accent: '#06b6d4', category: 'Health' },
  { name: 'JamAccountant', icon: Zap, desc: 'Health cost accounting', href: '/accountant', accent: '#f59e0b', category: 'Health' },
];

function useBrandFromHash(): string {
  const [brandId, setBrandId] = useState(() => {
    const hash = window.location.hash.replace('#/', '').split('/')[0];
    return hash || '';
  });

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace('#/', '').split('/')[0];
      setBrandId(hash || '');
    };
    window.addEventListener('hashchange', handler);
    handler();
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return brandId;
}

export default function WhiteLabelHub() {
  const brandId = useBrandFromHash();
  const brand = getBrandById(brandId || '');
  const [searchQuery, setSearchQuery] = useState('');

  if (!brand) {
    return (
      <div className="min-h-[100dvh] bg-[#0A0F1E] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Brand Not Found</h1>
          <p className="text-sm text-[#6B7280]">{brandId} is not a registered white-label instance.</p>
          <a href="#/" className="text-sm text-[#7096D1] mt-4 block">Back to JamZia™</a>
        </div>
      </div>
    );
  }

  const filtered = PLATFORM_REGISTRY.filter(p => {
    const q = searchQuery.toLowerCase();
    return brand.platformFilter.includes(p.category) &&
      (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  });

  return (
    <div className="min-h-[100dvh] text-white" style={{ background: brand.bgGradient }}>
      {/* Header */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold" style={{ backgroundColor: `${brand.primaryColor}20`, border: `1px solid ${brand.primaryColor}40`, color: brand.primaryColor }}>
            {brand.icon}
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">{brand.fullLegalName}</h1>
            <p className="text-[9px]" style={{ color: brand.secondaryColor }}>{brand.org}</p>
          </div>
          <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${brand.primaryColor}15`, color: brand.primaryColor }}>{brand.wlId}</span>
          <a href="#/" className="ml-auto text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">JamZia™</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl" style={{ backgroundColor: `${brand.primaryColor}20`, border: `1px solid ${brand.primaryColor}40`, color: brand.primaryColor }}>
            {brand.icon}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-2 tracking-tight">{brand.heroTitle}</h2>
          <p className="text-sm italic mb-2" style={{ color: brand.secondaryColor }}>{brand.heroSubtitle}</p>
          <p className="text-base text-[#A0AEC0] max-w-xl mx-auto mb-8">{brand.heroDescription}</p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative mb-8">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={`Search ${brand.name} platforms...`} className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-opacity-50" style={{ borderColor: searchQuery ? brand.primaryColor : undefined }} />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a href={`#${brand.ctaPrimaryLink}`} className="px-6 py-3 text-sm font-bold rounded-xl text-white no-underline transition-all hover:opacity-90" style={{ backgroundColor: brand.primaryColor }}>{brand.ctaPrimary}</a>
            <a href={`#${brand.ctaSecondaryLink}`} className="px-6 py-3 text-sm font-bold rounded-xl border border-white/[0.12] text-white hover:bg-white/[0.05] transition-colors no-underline">{brand.ctaSecondary}</a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brand.stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: brand.secondaryColor }}>{s.value}</p>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">{brand.name} Platforms</h3>
            <span className="text-[10px] text-[#6B7280]">{filtered.length} platforms</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map(item => (
              <a key={item.name} href={`#${item.href}`} className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all no-underline">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.accent}15` }}>
                    <item.icon size={18} style={{ color: item.accent }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:transition-colors truncate">{item.name}</p>
                    <p className="text-[9px] text-[#6B7280] truncate">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.accent}15`, color: item.accent }}>{item.category}</span>
                  <ChevronRight size={12} className="text-[#6B7280]" />
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

        {/* JamRep CTA */}
        {brand.showJamRep && (
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
            <p className="text-sm font-bold text-white mb-2">Want your own white-label instance?</p>
            <p className="text-xs text-[#6B7280] mb-3">{brand.poweredBy} • JamRep™ Site Replication Engine</p>
            <a href="#/rep" className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl border transition-colors no-underline" style={{ borderColor: `${brand.primaryColor}60`, color: brand.primaryColor }}>
              <Layers size={14} /> Explore JamRep™
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8 space-y-2 border-t border-white/[0.06]">
          <p className="text-sm font-bold" style={{ color: brand.primaryColor }}>{brand.fullLegalName}</p>
          <p className="text-xs italic" style={{ color: brand.secondaryColor }}>&quot;{brand.tagline}&quot;</p>
          <p className="text-xs text-[#A0AEC0] max-w-lg mx-auto">{brand.mission}</p>
          <p className="text-[9px] text-[#6B7280] mt-3">{brand.poweredBy}</p>
          <p className="text-[9px] text-[#6B7280]">{brand.copyright}</p>
          <p className="text-[8px] text-[#6B7280]">White Label {brand.wlId} • All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
