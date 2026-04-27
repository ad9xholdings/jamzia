/* ═══════════════════════════════════════════════════════════
   NoFearShell — Forces NoFear white-label branding
   Wraps any Jam page and replaces all Jam branding
   ═══════════════════════════════════════════════════════════ */

import { useEffect, type ReactNode } from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

interface NoFearShellProps {
  children: ReactNode;
}

export default function NoFearShell({ children }: NoFearShellProps) {
  const { setWhiteLabel } = useWhiteLabel();

  useEffect(() => {
    setWhiteLabel(true);
    return () => setWhiteLabel(false);
  }, [setWhiteLabel]);

  return <>{children}</>;
}

// NoFear header bar that appears on all white-label pages
export function NoFearHeader() {
  const { r } = useWhiteLabel();
  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#1A1A2E', borderBottom: '1px solid rgba(74,144,164,0.2)' }}>
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3">
        <a href="#/nofear" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A90A420' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A90A4" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <span className="text-xs font-bold text-white">{r('JamZia™')} — FRF</span>
        </a>
        <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#4A90A415', color: '#4A90A4' }}>WL-001</span>
        <a href="#/" className="ml-auto text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">
          Parent: JamZia™
        </a>
      </div>
    </div>
  );
}
