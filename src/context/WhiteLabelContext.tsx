/* ═══════════════════════════════════════════════════════════
   WhiteLabelContext — Dynamic Brand Switching
   JamZia default → NoFear for Fearless Revolution Foundation
   ═══════════════════════════════════════════════════════════ */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ── Brand Definitions ── */
export interface BrandConfig {
  prefix: string;           // "Jam" or "NoFear"
  parentNetwork: string;    // "JamZia" or "NoFearZia"
  company: string;          // "Ad9x Holdings, LLC" or "Fearless Revolution Foundation"
  tagline: string;
  subline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  isWhiteLabel: boolean;
  wlId?: string;
}

const JAMZIA_BRAND: BrandConfig = {
  prefix: 'Jam',
  parentNetwork: 'JamZia',
  company: 'Ad9x Holdings, LLC',
  tagline: 'The Everything App',
  subline: 'Powered by Ad9x Holdings, LLC',
  primaryColor: '#7096D1',
  secondaryColor: '#f59e0b',
  accentColor: '#081F5C',
  isWhiteLabel: false,
};

const NOFEAR_BRAND: BrandConfig = {
  prefix: 'NoFear',
  parentNetwork: 'NoFearZia',
  company: 'Fearless Revolution Foundation',
  tagline: 'Healing Through Connection',
  subline: "A Message of Hope for the World — Powered by JamZia Networks™",
  primaryColor: '#4A90A4',
  secondaryColor: '#D4A574',
  accentColor: '#1A1A2E',
  isWhiteLabel: true,
  wlId: 'WL-001',
};

/* ── Context ── */
interface WhiteLabelContextType {
  brand: BrandConfig;
  setWhiteLabel: (enabled: boolean) => void;
  r: (name: string) => string; // replace JamX with PrefixX
}

const WhiteLabelContext = createContext<WhiteLabelContextType>({
  brand: JAMZIA_BRAND,
  setWhiteLabel: () => {},
  r: (n) => n,
});

/* ── Name replacer ── */
function replacePrefix(name: string, prefix: string): string {
  if (prefix === 'Jam') return name;
  // Replace "Jam" at start of words with prefix
  return name
    .replace(/\bJam(?=[A-Z])/g, prefix)      // JamVideo → NoFearVideo
    .replace(/\bJam\b/g, prefix)              // standalone Jam
    .replace(/JamZia/g, prefix + 'Zia');      // JamZia → NoFearZia
}

/* ── Provider ── */
export function WhiteLabelProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandConfig>(JAMZIA_BRAND);

  const detectWhiteLabel = useCallback(() => {
    const hash = window.location.hash;
    const isNoFear = hash.startsWith('#/nofear');
    setBrand(isNoFear ? NOFEAR_BRAND : JAMZIA_BRAND);
  }, []);

  useEffect(() => {
    detectWhiteLabel();
    window.addEventListener('hashchange', detectWhiteLabel);
    return () => window.removeEventListener('hashchange', detectWhiteLabel);
  }, [detectWhiteLabel]);

  const setWhiteLabel = useCallback((enabled: boolean) => {
    setBrand(enabled ? NOFEAR_BRAND : JAMZIA_BRAND);
  }, []);

  const r = useCallback((name: string) => replacePrefix(name, brand.prefix), [brand.prefix]);

  return (
    <WhiteLabelContext.Provider value={{ brand, setWhiteLabel, r }}>
      {children}
    </WhiteLabelContext.Provider>
  );
}

/* ── Hook ── */
export function useWhiteLabel() {
  return useContext(WhiteLabelContext);
}

export { JAMZIA_BRAND, NOFEAR_BRAND };
