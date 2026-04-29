/* ═══════════════════════════════════════════════════════════
   SubDAORouter — Generic White Label Router
   Handles routing for ALL white-label brands (WL-002+)
   Each brand gets: /brand-name/* → SubDAO Router
   ═══════════════════════════════════════════════════════════ */

import { useEffect, useState } from 'react';
import { getBrandById } from '../config/wl-brands';
import type { WLBrand } from '../config/wl-brands';

interface SubDAORouterProps {
  brandId: string;
}

/** Load brand-specific CSS override */
function useBrandStyles(brand: WLBrand) {
  useEffect(() => {
    const styleId = `wl-${brand.id}-styles`;
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .wl-brand-primary { color: ${brand.primaryColor} !important; }
      .wl-brand-bg { background-color: ${brand.primaryColor} !important; }
      .wl-brand-border { border-color: ${brand.primaryColor} !important; }
      ::selection { background: ${brand.primaryColor}40; }
    `;
    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, [brand]);
}

/** DOM text replacer — swaps "JamZia" with brand name */
function useBrandInjector(brand: WLBrand) {
  useEffect(() => {
    const original = brand.originalName || 'JamZia';
    const replacement = brand.name;
    const tmReplacement = `${brand.name}™`;
    const networksReplacement = `${brand.parentNetwork || brand.name} Networks™`;

    const inject = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      const nodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.nodeValue?.includes('JamZia')) {
          nodes.push(node as Text);
        }
      }
      nodes.forEach(n => {
        n.nodeValue = n.nodeValue!
          .replace(/JamZia Networks™/g, networksReplacement)
          .replace(/JamZia™/g, tmReplacement)
          .replace(/JamZia/g, replacement);
      });
    };

    // Run injection
    inject();

    // Watch for DOM changes
    const observer = new MutationObserver(() => inject());
    observer.observe(document.body, { childList: true, subtree: true });

    // Watch for hash changes
    const handleHash = () => inject();
    window.addEventListener('hashchange', handleHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHash);
    };
  }, [brand]);
}

/** Generic SubDAO Home page */
function SubDAOHome({ brand }: { brand: WLBrand }) {
  const [searchQuery, setSearchQuery] = useState('');

  const platforms = [
    { name: 'JamVideo', category: 'Media', icon: '🎬', desc: 'Movies, shows & original content' },
    { name: 'JamAudio', category: 'Media', icon: '🎧', desc: 'Songs, podcasts & audio' },
    { name: 'JamLive', category: 'Media', icon: '📡', desc: 'Live streaming & broadcasts' },
    { name: 'JamSocial', category: 'Media', icon: '💬', desc: 'Community & messaging' },
    { name: 'JamPay', category: 'Finance', icon: '💳', desc: 'Wallet & payments' },
    { name: 'JamShop', category: 'Finance', icon: '🛒', desc: 'Marketplace' },
    { name: 'JamLearn', category: 'Intel', icon: '📚', desc: 'Education & courses' },
    { name: 'JamMastery', category: 'Intel', icon: '🎓', desc: 'Skills mastery' },
    { name: 'JamBattle', category: 'Gaming', icon: '⚔️', desc: 'Cotton Castle gaming' },
    { name: 'JamCoins', category: 'Gaming', icon: '🪙', desc: 'AR crypto collection' },
    { name: 'JamNews', category: 'Intel', icon: '📰', desc: 'News & journalism' },
    { name: 'JamPsych', category: 'Healing', icon: '🧠', desc: 'Mental health' },
    { name: 'JamTherapy', category: 'Healing', icon: '❤️', desc: 'Licensed therapy' },
    { name: 'JamEarth', category: 'World', icon: '🌍', desc: 'Environmental data' },
    { name: 'JamAR', category: 'Media', icon: '🥽', desc: 'Augmented reality' },
    { name: 'JamBox', category: 'Media', icon: '📦', desc: 'Creator streaming' },
    { name: 'JamWise', category: 'Intel', icon: '⚡', desc: 'Financial wisdom' },
    { name: 'JamAuto', category: 'Finance', icon: '🚗', desc: 'Auto services' },
    { name: 'JamLaw', category: 'Gov', icon: '⚖️', desc: 'Legal resources' },
    { name: 'JamDoctor', category: 'Health', icon: '🩺', desc: 'Telehealth' },
  ].filter(p => brand.platformFilter.includes(p.category));

  const filtered = platforms.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] text-white" style={{ background: brand.bgGradient }}>
      {/* Header */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold"
               style={{ backgroundColor: `${brand.primaryColor}20`, border: `1px solid ${brand.primaryColor}40`, color: brand.primaryColor }}>
            {brand.icon}
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">{brand.fullLegalName}</h1>
            <p className="text-[9px] text-[#6B7280]">{brand.org}</p>
          </div>
          <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${brand.primaryColor}15`, color: brand.primaryColor }}>
            {brand.wlId}
          </span>
          <a href="#/" className="ml-auto text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">
            JamZia™
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
               style={{ backgroundColor: `${brand.primaryColor}20`, border: `1px solid ${brand.primaryColor}40`, color: brand.primaryColor }}>
            {brand.icon}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-2 tracking-tight">{brand.heroTitle}</h2>
          <p className="text-sm italic mb-2" style={{ color: brand.secondaryColor }}>{brand.heroSubtitle}</p>
          <p className="text-base text-[#A0AEC0] max-w-xl mx-auto mb-8">{brand.heroDescription}</p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative mb-8">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">🔍</span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Search ${brand.name} platforms...`}
              className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#6B7280] focus:outline-none"
              style={{ borderColor: searchQuery ? brand.primaryColor : undefined }}
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a href={`#${brand.ctaPrimaryLink}`}
               className="px-6 py-3 text-sm font-bold rounded-xl text-white no-underline transition-all hover:opacity-90"
               style={{ backgroundColor: brand.primaryColor }}>
              {brand.ctaPrimary}
            </a>
            <a href={`#${brand.ctaSecondaryLink}`}
               className="px-6 py-3 text-sm font-bold rounded-xl border border-white/[0.12] text-white hover:bg-white/[0.05] transition-colors no-underline">
              {brand.ctaSecondary}
            </a>
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
              <a key={item.name} href={`#${item.name.toLowerCase().replace('jam', '/')}`}
                 className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all no-underline">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                    <p className="text-[9px] text-[#6B7280] truncate">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#6B7280]">{item.category}</span>
                  <span className="text-[#6B7280]">→</span>
                </div>
              </a>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-[#6B7280]">No platforms match &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>

        {/* 11-Layer Architecture */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">🏗️</span>
            <h3 className="text-sm font-bold text-white">{brand.name} — Powered by JamZia 11-Layer Architecture</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { n: 11, name: 'AI Orchestration — SORME™', color: '#C9A03F' },
              { n: 10, name: 'Platform Shell', color: '#7096D1' },
              { n: 9, name: 'Smart Contract Layer — XRPL', color: '#F59E0B' },
              { n: 8, name: 'Storage Mesh — SkyLockr™', color: '#10B981' },
              { n: 7, name: 'Stream Layer — RockNext™', color: '#A855F7' },
              { n: 6, name: 'Payment Fabric — WisdomPay™', color: '#06B6D4' },
              { n: 5, name: 'Moderation Engine', color: '#EF4444' },
              { n: 4, name: 'Audit Trail — SHA-256', color: '#C9A03F' },
              { n: 3, name: 'Analytics', color: '#7096D1' },
              { n: 2, name: 'Infrastructure — React/Vite', color: '#6B7280' },
              { n: 1, name: 'Identity — Wallet + Profile', color: '#6B7280' },
            ].map(layer => (
              <div key={layer.n} className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg">
                <span className="text-[10px] font-bold" style={{ color: layer.color }}>{layer.n}</span>
                <span className="text-[10px] text-[#A0AEC0]">{layer.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 space-y-2 border-t border-white/[0.06]">
          <p className="text-sm font-bold" style={{ color: brand.primaryColor }}>{brand.fullLegalName}</p>
          <p className="text-xs italic text-[#A0AEC0]">&quot;{brand.tagline}&quot;</p>
          <p className="text-xs text-[#6B7280] max-w-lg mx-auto">{brand.mission}</p>
          <p className="text-[9px] text-[#6B7280] mt-3">{brand.poweredBy}</p>
          <p className="text-[9px] text-[#6B7280]">{brand.copyright}</p>
          <p className="text-[8px] text-[#6B7280]">White Label {brand.wlId} • SubDAO • All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default function SubDAORouter({ brandId }: SubDAORouterProps) {
  const brand = getBrandById(brandId);

  if (!brand) {
    return (
      <div className="min-h-[100dvh] bg-[#0A0F1E] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">SubDAO Not Found</h1>
          <p className="text-sm text-[#6B7280]">{brandId} is not a registered SubDAO instance.</p>
          <a href="#/" className="text-sm text-[#7096D1] mt-4 block">Back to JamZia™</a>
        </div>
      </div>
    );
  }

  useBrandStyles(brand);
  useBrandInjector(brand);

  return <SubDAOHome brand={brand} />;
}
