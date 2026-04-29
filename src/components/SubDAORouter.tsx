/* ═══════════════════════════════════════════════════════════
   SubDAORouter — Generic White Label Router (v2)
   Handles routing for ALL white-label brands (WL-002+)
   ═══════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import { getBrandById } from '../config/wl-brands';
import type { WLBrand } from '../config/wl-brands';

interface SubDAORouterProps {
  brandId: string;
}

/** Simple brand styles */
function useBrandStyles(brand: WLBrand) {
  useEffect(() => {
    const styleId = `wl-${brand.id}-styles`;
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `.wl-brand-primary{color:${brand.primaryColor}!important}.wl-brand-bg{background:${brand.primaryColor}!important}`;
    document.head.appendChild(style);
    return () => { const e = document.getElementById(styleId); if (e) e.remove(); };
  }, [brand]);
}

/** Home page for each brand */
function SubDAOHome({ brand }: { brand: WLBrand }) {
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
          <a href="#/" className="ml-auto text-[10px] text-[#6B7280] hover:text-white no-underline">JamZia™</a>
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

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {brand.stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: brand.secondaryColor }}>{s.value}</p>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`#${brand.ctaPrimaryLink}`}
               className="px-6 py-3 text-sm font-bold rounded-xl text-white no-underline"
               style={{ backgroundColor: brand.primaryColor }}>
              {brand.ctaPrimary}
            </a>
            <a href={`#${brand.ctaSecondaryLink}`}
               className="px-6 py-3 text-sm font-bold rounded-xl border border-white/[0.12] text-white no-underline">
              {brand.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 space-y-2 border-t border-white/[0.06]">
          <p className="text-sm font-bold" style={{ color: brand.primaryColor }}>{brand.fullLegalName}</p>
          <p className="text-xs italic text-[#A0AEC0]">&quot;{brand.tagline}&quot;</p>
          <p className="text-xs text-[#6B7280] max-w-lg mx-auto">{brand.mission}</p>
          <p className="text-[9px] text-[#6B7280] mt-3">{brand.poweredBy}</p>
          <p className="text-[9px] text-[#6B7280]">{brand.copyright}</p>
          <p className="text-[8px] text-[#6B7280]">White Label {brand.wlId} • SubDAO</p>
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
          <p className="text-sm text-[#6B7280]">{brandId} is not registered.</p>
          <a href="#/" className="text-sm text-[#7096D1] mt-4 block">Back to JamZia™</a>
        </div>
      </div>
    );
  }

  useBrandStyles(brand);

  return <SubDAOHome brand={brand} />;
}
