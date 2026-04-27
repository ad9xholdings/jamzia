/* ═══════════════════════════════════════════════════════════
   NoFearRouter — Full Ecosystem Router for WL-001
   Maps /nofear/X → actual platform pages with NoFear branding
   All 50+ platforms accessible under Fearless Revolution Foundation
   ═══════════════════════════════════════════════════════════ */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';

/* ── Lazy load ALL 50+ platform pages ── */
const JamVideo = lazy(() => import('../pages/JamVideo'));
const JamAudio = lazy(() => import('../pages/JamAudio'));
const JamSocial = lazy(() => import('../pages/JamSocial'));
const JamFood = lazy(() => import('../pages/JamFood'));
const JamPay = lazy(() => import('../pages/JamPay'));
const JamShop = lazy(() => import('../pages/JamShop'));
const JamEarth = lazy(() => import('../pages/JamEarth'));
const JamGreen = lazy(() => import('../pages/JamGreen'));
const JamGrow = lazy(() => import('../pages/JamGrow'));
const JamWeather = lazy(() => import('../pages/JamWeather'));
const JamBox = lazy(() => import('../pages/JamBox'));
const JamCat = lazy(() => import('../pages/JamCat'));
const JamWise = lazy(() => import('../pages/JamWise'));
const JamTech = lazy(() => import('../pages/JamTech'));
const JamStreet = lazy(() => import('../pages/JamStreet'));
const JamAR = lazy(() => import('../pages/JamAR'));
const JamTok = lazy(() => import('../pages/JamTok'));
const JamWords = lazy(() => import('../pages/JamWords'));
const JamLive = lazy(() => import('../pages/JamLive'));
const JamScale = lazy(() => import('../pages/JamScale'));
const JamLab = lazy(() => import('../pages/JamLab'));
const JamKind = lazy(() => import('../pages/JamKind'));
const JamTribute = lazy(() => import('../pages/JamTribute'));
const JamMed = lazy(() => import('../pages/JamMed'));
const JamDEX = lazy(() => import('../pages/JamDEX'));
const JamGrants = lazy(() => import('../pages/JamGrants'));
const JamCredits = lazy(() => import('../pages/JamCredits'));
const JamCom = lazy(() => import('../pages/JamCom'));
const JamFed = lazy(() => import('../pages/JamFed'));
const JamState = lazy(() => import('../pages/JamState'));
const JamLocal = lazy(() => import('../pages/JamLocal'));
const JamLaw = lazy(() => import('../pages/JamLaw'));
const JamCPA = lazy(() => import('../pages/JamCPA'));
const JamDoctor = lazy(() => import('../pages/JamDoctor'));
const JamCode = lazy(() => import('../pages/JamCode'));
const JamLawyer = lazy(() => import('../pages/JamLawyer'));
const JamAccountant = lazy(() => import('../pages/JamAccountant'));
const JamBattle = lazy(() => import('../pages/JamBattle'));
const JamMastery = lazy(() => import('../pages/JamMastery'));
const JamAuto = lazy(() => import('../pages/JamAuto'));
const JamNews = lazy(() => import('../pages/JamNews'));
const JamNewsBusiness = lazy(() => import('../pages/JamNewsBusiness'));
const JamLearn = lazy(() => import('../pages/JamLearn'));
const JamGames = lazy(() => import('../pages/JamGames'));
const JamCourses = lazy(() => import('../pages/JamCourses'));
const JamProfile = lazy(() => import('../pages/JamProfile'));
const JamPsych = lazy(() => import('../pages/JamPsych'));
const JamTherapy = lazy(() => import('../pages/JamTherapy'));
const JamTerms = lazy(() => import('../pages/JamTerms'));
const JamPrivacy = lazy(() => import('../pages/JamPrivacy'));
const JamRep = lazy(() => import('../pages/JamRep'));
const JamDocs = lazy(() => import('../pages/JamDocs'));
const JamPros = lazy(() => import('../pages/JamPros'));
const NoFearHome = lazy(() => import('../pages/NoFearHome'));
const CommandCenter = lazy(() => import('../pages/CommandCenter'));
const Architecture = lazy(() => import('../pages/Architecture'));
const Integrations = lazy(() => import('../pages/Integrations'));
const AppPortal = lazy(() => import('../pages/AppPortal'));
const HubPage = lazy(() => import('../pages/HubPage'));
const StatusPage = lazy(() => import('../pages/StatusPage'));
const AuditLogs = lazy(() => import('../pages/AuditLogs'));
const ApiRoot = lazy(() => import('../pages/ApiRoot'));

/* ── Fallback ── */
function NFFallback() {
  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#4A90A4] border-t-transparent animate-spin" />
        <p className="text-xs text-[#7EB5A6]">Loading NoFear platform...</p>
      </div>
    </div>
  );
}

/* ── Page Wrapper with NoFear Header ── */
function NFPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] text-white" style={{ background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)' }}>
      {/* Sticky NoFear Header */}
      <div className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: '#1A1A2E' }}>
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3">
          <a href="#/nofear" className="flex items-center gap-2 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A90A4" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span className="text-xs font-bold text-white">NoFear™ — FRF</span>
          </a>
          <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#4A90A415', color: '#4A90A4' }}>WL-001</span>
          <div className="ml-auto flex items-center gap-3">
            <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">JamZia™</a>
            <a href="#/nofear/therapy" className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold rounded-lg text-white no-underline" style={{ backgroundColor: '#4A90A4' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Get Help
            </a>
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div>{children}</div>
      {/* NoFear Footer */}
      <div className="border-t border-white/[0.06] py-4 mt-auto" style={{ background: '#1A1A2E' }}>
        <div className="max-w-6xl mx-auto px-4 text-center space-y-1">
          <p className="text-[10px] text-[#6B7280]">Fearless Revolution Foundation • WL-001 • A Message of Hope for the World</p>
          <p className="text-[9px] text-[#6B7280]">Powered by JamZia Networks™ • (c) 2026 Ad9x Holdings LLC - a Georgia Limited Liability Company</p>
        </div>
      </div>
    </div>
  );
}

/* ── HubPage Wrappers ── */
function NFListen() { return <HubPage categoryId="listen" />; }
function NFWatch() { return <HubPage categoryId="watch" />; }
function NFPlay() { return <HubPage categoryId="play" />; }
function NFConnect() { return <HubPage categoryId="connect" />; }
function NFBuild() { return <HubPage categoryId="build" />; }
function NFGovern() { return <HubPage categoryId="govern" />; }

/* ── Single route helper ── */
function NFRoute({ el: El }: { el: React.ComponentType }) {
  return (
    <NFPage>
      <El />
    </NFPage>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXPORT — Full NoFear Ecosystem Router
   ═══════════════════════════════════════════════════════════ */
export default function NoFearRouter() {
  return (
    <Suspense fallback={<NFFallback />}>
      <Routes>
        {/* NoFear Homepage */}
        <Route index element={<NoFearHome />} />

        {/* ── Healing & Growth Core ── */}
        <Route path="psych" element={<NFRoute el={JamPsych} />} />
        <Route path="therapy" element={<NFRoute el={JamTherapy} />} />
        <Route path="pros" element={<NFRoute el={JamPros} />} />
        <Route path="mastery" element={<NFRoute el={JamMastery} />} />
        <Route path="learn" element={<NFRoute el={JamLearn} />} />
        <Route path="academy" element={<NFRoute el={JamLearn} />} />
        <Route path="courses" element={<NFRoute el={JamCourses} />} />
        <Route path="profile" element={<NFRoute el={JamProfile} />} />

        {/* ── Media & Entertainment ── */}
        <Route path="video" element={<NFRoute el={JamVideo} />} />
        <Route path="audio" element={<NFRoute el={JamAudio} />} />
        <Route path="live" element={<NFRoute el={JamLive} />} />
        <Route path="social" element={<NFRoute el={JamSocial} />} />
        <Route path="games" element={<NFRoute el={JamGames} />} />

        {/* ── Commerce & Finance ── */}
        <Route path="shop" element={<NFRoute el={JamShop} />} />
        <Route path="pay" element={<NFRoute el={JamPay} />} />
        <Route path="food" element={<NFRoute el={JamFood} />} />
        <Route path="dex" element={<NFRoute el={JamDEX} />} />

        {/* ── Natural World ── */}
        <Route path="earth" element={<NFRoute el={JamEarth} />} />
        <Route path="green" element={<NFRoute el={JamGreen} />} />
        <Route path="grow" element={<NFRoute el={JamGrow} />} />
        <Route path="weather" element={<NFRoute el={JamWeather} />} />

        {/* ── Creator Economy ── */}
        <Route path="box" element={<NFRoute el={JamBox} />} />
        <Route path="cat" element={<NFRoute el={JamCat} />} />
        <Route path="wise" element={<NFRoute el={JamWise} />} />
        <Route path="tech" element={<NFRoute el={JamTech} />} />
        <Route path="street" element={<NFRoute el={JamStreet} />} />
        <Route path="ar" element={<NFRoute el={JamAR} />} />
        <Route path="tok" element={<NFRoute el={JamTok} />} />
        <Route path="words" element={<NFRoute el={JamWords} />} />

        {/* ── Ad9x Intel ── */}
        <Route path="lab" element={<NFRoute el={JamLab} />} />
        <Route path="kind" element={<NFRoute el={JamKind} />} />
        <Route path="tribute" element={<NFRoute el={JamTribute} />} />
        <Route path="scale" element={<NFRoute el={JamScale} />} />

        {/* ── Search Core / Data ── */}
        <Route path="med" element={<NFRoute el={JamMed} />} />
        <Route path="grants" element={<NFRoute el={JamGrants} />} />
        <Route path="credits" element={<NFRoute el={JamCredits} />} />
        <Route path="com" element={<NFRoute el={JamCom} />} />
        <Route path="fed" element={<NFRoute el={JamFed} />} />
        <Route path="state" element={<NFRoute el={JamState} />} />
        <Route path="local" element={<NFRoute el={JamLocal} />} />
        <Route path="law" element={<NFRoute el={JamLaw} />} />

        {/* ── Professional Services ── */}
        <Route path="lawyer" element={<NFRoute el={JamLawyer} />} />
        <Route path="cpa" element={<NFRoute el={JamCPA} />} />
        <Route path="accountant" element={<NFRoute el={JamAccountant} />} />
        <Route path="doctor" element={<NFRoute el={JamDoctor} />} />
        <Route path="code" element={<NFRoute el={JamCode} />} />
        <Route path="bankers" element={<NFRoute el={JamPros} />} />
        <Route path="brokers" element={<NFRoute el={JamPros} />} />

        {/* ── Gaming ── */}
        <Route path="battle" element={<NFRoute el={JamBattle} />} />
        <Route path="cottonbrickroad" element={<NFRoute el={JamBattle} />} />
        <Route path="auto" element={<NFRoute el={JamAuto} />} />

        {/* ── News ── */}
        <Route path="news" element={<NFRoute el={JamNews} />} />
        <Route path="newsbusiness" element={<NFRoute el={JamNewsBusiness} />} />

        {/* ── System ── */}
        <Route path="command" element={<NFRoute el={CommandCenter} />} />
        <Route path="architecture" element={<NFRoute el={Architecture} />} />
        <Route path="integrations" element={<NFRoute el={Integrations} />} />
        <Route path="app" element={<NFRoute el={AppPortal} />} />
        <Route path="api" element={<NFRoute el={ApiRoot} />} />
        <Route path="docs" element={<NFRoute el={JamDocs} />} />
        <Route path="status" element={<NFRoute el={StatusPage} />} />
        <Route path="audit" element={<NFRoute el={AuditLogs} />} />
        <Route path="rep" element={<NFRoute el={JamRep} />} />

        {/* ── Legal ── */}
        <Route path="terms" element={<NFRoute el={JamTerms} />} />
        <Route path="privacy" element={<NFRoute el={JamPrivacy} />} />

        {/* ── Category Hubs ── */}
        <Route path="listen" element={<NFRoute el={NFListen} />} />
        <Route path="watch" element={<NFRoute el={NFWatch} />} />
        <Route path="play" element={<NFRoute el={NFPlay} />} />
        <Route path="connect" element={<NFRoute el={NFConnect} />} />
        <Route path="build" element={<NFRoute el={NFBuild} />} />
        <Route path="govern" element={<NFRoute el={NFGovern} />} />

        {/* Catch-all → NoFearHome */}
        <Route path="*" element={<Navigate to="/nofear" replace />} />
      </Routes>
    </Suspense>
  );
}
