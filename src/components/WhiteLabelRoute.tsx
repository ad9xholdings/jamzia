/* ═══════════════════════════════════════════════════════════
   WhiteLabelRoute — NoFear White-Label Router
   /nofear/* → renders NoFearHome with DOM text replacement
   ═══════════════════════════════════════════════════════════ */

import { useEffect } from 'react';

export default function WhiteLabelRoute() {

  useEffect(() => {
    // Activate NoFear branding
    document.body.classList.add('nofear-active');
    sessionStorage.setItem('nofear_active', 'true');

    // Replace text after render
    const timer = setTimeout(replaceTextInDOM, 200);
    const timer2 = setTimeout(replaceTextInDOM, 600);
    const timer3 = setTimeout(replaceTextInDOM, 1000);

    const observer = new MutationObserver(() => replaceTextInDOM());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
      document.body.classList.remove('nofear-active');
      sessionStorage.removeItem('nofear_active');
    };
  }, []);

  return (
    <div className="min-h-[100dvh]" style={{ background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)' }}>
      {/* NoFear Header Bar */}
      <div className="nofear-header">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3">
          <a href="#/nofear" className="flex items-center gap-2 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A90A4" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span className="text-xs font-bold text-white">NoFear™ — FRF</span>
          </a>
          <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#4A90A415', color: '#4A90A4' }}>WL-001</span>
          <a href="#/" className="ml-auto text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">
            Parent: JamZia Networks™
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A90A4" strokeWidth="1.5" className="mx-auto mb-4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <h1 className="text-3xl font-bold text-white mb-2">NoFear™</h1>
          <p className="text-sm text-[#7EB5A6] mb-1">Fearless Revolution Foundation</p>
          <p className="text-xs italic text-[#D4A574] mb-6">"A Message of Hope for the World"</p>
          
          <p className="text-sm text-[#A0AEC0] max-w-lg mx-auto mb-8">
            Welcome to NoFear — your safe space for healing, learning, and growth. 
            All 50+ platforms are available with NoFear branding.
          </p>

          {/* Platform Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
            {[
              { name: 'NoFearPsych', icon: '🧠', href: '/psych', color: '#ec4899' },
              { name: 'NoFearTherapy', icon: '💚', href: '/therapy', color: '#22c55e' },
              { name: 'NoFearPros', icon: '🛡️', href: '/pros', color: '#3b82f6' },
              { name: 'NoFearAudio', icon: '🎵', href: '/audio', color: '#a855f7' },
              { name: 'NoFearVideo', icon: '🎬', href: '/video', color: '#ec4899' },
              { name: 'NoFearLive', icon: '🔴', href: '/live', color: '#ef4444' },
              { name: 'NoFearLearn', icon: '🎓', href: '/learn', color: '#f59e0b' },
              { name: 'NoFearMastery', icon: '👑', href: '/mastery', color: '#f59e0b' },
              { name: 'NoFearShop', icon: '🛒', href: '/shop', color: '#f59e0b' },
              { name: 'NoFearPay', icon: '💎', href: '/pay', color: '#3b82f6' },
              { name: 'NoFearSocial', icon: '💬', href: '/social', color: '#7096D1' },
              { name: 'NoFearCBR', icon: '🏰', href: '/cottonbrickroad', color: '#f59e0b' },
            ].map((p) => (
              <a
                key={p.name}
                href={`#${p.href}`}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all no-underline text-center"
              >
                <span className="text-2xl mb-2 block">{p.icon}</span>
                <span className="text-xs font-semibold text-white group-hover:text-[#4A90A4] transition-colors">{p.name}™</span>
              </a>
            ))}
          </div>

          {/* Crisis Banner */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 max-w-2xl mx-auto mb-6">
            <p className="text-xs font-bold text-red-400 mb-2">🚨 24/7 Crisis Support</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-xs text-white">Text HOME to 741741</span>
              <span className="text-xs text-white">Call 988</span>
              <a href="#/therapy" className="text-xs font-bold text-red-400 no-underline hover:underline">NoFearTherapy →</a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-white/[0.06]">
            <p className="text-[10px] text-[#6B7280]">Fearless Revolution Foundation • WL-001</p>
            <p className="text-[9px] text-[#6B7280] mt-1">Powered by JamZia Networks™ • (c) 2026 Ad9x Holdings LLC - a Georgia Limited Liability Company</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function replaceTextInDOM() {
  if (!document.body.classList.contains('nofear-active')) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodesToReplace: { node: Text; newText: string }[] = [];
  
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const text = node.textContent || '';
    const parent = node.parentElement;
    if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) continue;
    if (!text.includes('Jam') || text.includes('NoFear')) continue;

    let newText = text;
    const replacements: [RegExp, string][] = [
      [/JamZia/g, 'NoFear'],
      [/JamPsych/g, 'NoFearPsych'],
      [/JamTherapy/g, 'NoFearTherapy'],
      [/JamPros/g, 'NoFearPros'],
      [/JamDoctor/g, 'NoFearDoctor'],
      [/JamLawyer/g, 'NoFearLawyer'],
      [/JamCPA/g, 'NoFearCPA'],
      [/JamBankers/g, 'NoFearBankers'],
      [/JamBrokers/g, 'NoFearBrokers'],
      [/JamMastery/g, 'NoFearMastery'],
      [/JamBattle/g, 'NoFearBattle'],
      [/JamLearn/g, 'NoFearLearn'],
      [/JamAudio/g, 'NoFearAudio'],
      [/JamVideo/g, 'NoFearVideo'],
      [/JamLive/g, 'NoFearLive'],
      [/JamSocial/g, 'NoFearSocial'],
      [/JamShop/g, 'NoFearShop'],
      [/JamPay/g, 'NoFearPay'],
      [/JamFood/g, 'NoFearFood'],
      [/JamGames/g, 'NoFearGames'],
      [/JamCourses/g, 'NoFearCourses'],
      [/JamNews/g, 'NoFearNews'],
      [/JamEarth/g, 'NoFearEarth'],
      [/JamWeather/g, 'NoFearWeather'],
      [/JamTech/g, 'NoFearTech'],
      [/JamGreen/g, 'NoFearGreen'],
      [/JamGrow/g, 'NoFearGrow'],
      [/JamAuto/g, 'NoFearAuto'],
      [/JamBox/g, 'NoFearBox'],
      [/JamCat/g, 'NoFearCat'],
      [/JamWise/g, 'NoFearWise'],
      [/JamStreet/g, 'NoFearStreet'],
      [/JamAR/g, 'NoFearAR'],
      [/JamTok/g, 'NoFearTok'],
      [/JamWords/g, 'NoFearWords'],
      [/JamLab/g, 'NoFearLab'],
      [/JamKind/g, 'NoFearKind'],
      [/JamTribute/g, 'NoFearTribute'],
      [/JamScale/g, 'NoFearScale'],
      [/JamMed/g, 'NoFearMed'],
      [/JamDEX/g, 'NoFearDEX'],
      [/JamGrants/g, 'NoFearGrants'],
      [/JamCredits/g, 'NoFearCredits'],
      [/JamCom/g, 'NoFearCom'],
      [/JamFed/g, 'NoFearFed'],
      [/JamState/g, 'NoFearState'],
      [/JamLocal/g, 'NoFearLocal'],
      [/JamLaw/g, 'NoFearLaw'],
      [/JamCode/g, 'NoFearCode'],
      [/JamDocs/g, 'NoFearDocs'],
      [/JamRep/g, 'NoFearRep'],
      [/JamTerms/g, 'NoFearTerms'],
      [/JamPrivacy/g, 'NoFearPrivacy'],
      [/JamProfile/g, 'NoFearProfile'],
      [/\bJam\b/g, 'NoFear'],
    ];
    
    for (const [pattern, replacement] of replacements) {
      newText = newText.replace(pattern, replacement);
    }
    
    if (newText !== text) {
      nodesToReplace.push({ node, newText });
    }
  }

  nodesToReplace.forEach(({ node, newText }) => {
    node.textContent = newText;
  });

  if (document.title.includes('Jam')) {
    document.title = document.title
      .replace(/JamZia/g, 'NoFearZia')
      .replace(/JamPsych/g, 'NoFearPsych')
      .replace(/JamTherapy/g, 'NoFearTherapy')
      .replace(/JamPros/g, 'NoFearPros')
      .replace(/JamAudio/g, 'NoFearAudio')
      .replace(/JamVideo/g, 'NoFearVideo')
      .replace(/JamLive/g, 'NoFearLive')
      .replace(/JamLearn/g, 'NoFearLearn')
      .replace(/JamMastery/g, 'NoFearMastery')
      .replace(/JamBattle/g, 'NoFearBattle')
      .replace(/JamProfile/g, 'NoFearProfile')
      .replace(/\bJam\b/g, 'NoFear');
  }
}
