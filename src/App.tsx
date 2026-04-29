import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import { WhiteLabelProvider } from './context/WhiteLabelContext';
import NoFearRouter from './components/NoFearRouter';
import SubDAORouter from './components/SubDAORouter';
import Footer from './components/Footer';
import Ad9xAgent from './components/Ad9xAgent';
import BattleButton from './components/BattleButton';
import NoFearShell from './components/NoFearShell';
import ComingSoonModal from './components/ComingSoonModal';
// import PaymentModal from './components/PaymentModal';

import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

// Heavy pages — lazy loaded
const JamVideo = lazy(() => import('./pages/JamVideo'));
const JamAudio = lazy(() => import('./pages/JamAudio'));
const JamSocial = lazy(() => import('./pages/JamSocial'));
const JamFood = lazy(() => import('./pages/JamFood'));
const JamPay = lazy(() => import('./pages/JamPay'));
const JamShop = lazy(() => import('./pages/JamShop'));
const JamEarth = lazy(() => import('./pages/JamEarth'));
const JamGreen = lazy(() => import('./pages/JamGreen'));
const JamGrow = lazy(() => import('./pages/JamGrow'));
const JamWeather = lazy(() => import('./pages/JamWeather'));
const JamBox = lazy(() => import('./pages/JamBox'));
const JamCat = lazy(() => import('./pages/JamCat'));
const JamWise = lazy(() => import('./pages/JamWise'));
const JamTech = lazy(() => import('./pages/JamTech'));
const JamStreet = lazy(() => import('./pages/JamStreet'));
const JamAR = lazy(() => import('./pages/JamAR'));
const JamTok = lazy(() => import('./pages/JamTok'));
const JamWords = lazy(() => import('./pages/JamWords'));
const JamLive = lazy(() => import('./pages/JamLive'));
const JamScale = lazy(() => import('./pages/JamScale'));
const JamLab = lazy(() => import('./pages/JamLab'));
const JamKind = lazy(() => import('./pages/JamKind'));
const JamTribute = lazy(() => import('./pages/JamTribute'));
const Architecture = lazy(() => import('./pages/Architecture'));
const Integrations = lazy(() => import('./pages/Integrations'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminModeration = lazy(() => import('./pages/AdminModeration'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));
const AdminLayout = lazy(() => import('./pages/AdminLayout'));
const JamMed = lazy(() => import('./pages/JamMed'));
const JamDEX = lazy(() => import('./pages/JamDEX'));
const JamGrants = lazy(() => import('./pages/JamGrants'));
const JamCredits = lazy(() => import('./pages/JamCredits'));
const JamCom = lazy(() => import('./pages/JamCom'));
const JamFed = lazy(() => import('./pages/JamFed'));
const JamState = lazy(() => import('./pages/JamState'));
const JamLocal = lazy(() => import('./pages/JamLocal'));
const JamLaw = lazy(() => import('./pages/JamLaw'));
const JamCPA = lazy(() => import('./pages/JamCPA'));
const JamDoctor = lazy(() => import('./pages/JamDoctor'));
const JamCode = lazy(() => import('./pages/JamCode'));
const JamLawyer = lazy(() => import('./pages/JamLawyer'));
const JamAccountant = lazy(() => import('./pages/JamAccountant'));
const JamBattle = lazy(() => import('./pages/JamBattle'));
const JamMastery = lazy(() => import('./pages/JamMastery'));
const JamCoins = lazy(() => import('./pages/JamCoins'));
const JamAuto = lazy(() => import('./pages/JamAuto'));
const CommandCenter = lazy(() => import('./pages/CommandCenter'));
const JamNews = lazy(() => import('./pages/JamNews'));
const JamNewsBusiness = lazy(() => import('./pages/JamNewsBusiness'));
const StatusPage = lazy(() => import('./pages/StatusPage'));
const AuditLogs = lazy(() => import('./pages/AuditLogs'));
const ApiRoot = lazy(() => import('./pages/ApiRoot'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const AppPortal = lazy(() => import('./pages/AppPortal'));
const JamLearn = lazy(() => import('./pages/JamLearn'));
const JamGames = lazy(() => import('./pages/JamGames'));
const JamCourses = lazy(() => import('./pages/JamCourses'));
const JamProfile = lazy(() => import('./pages/JamProfile'));
const JamPsych = lazy(() => import('./pages/JamPsych'));
const JamTherapy = lazy(() => import('./pages/JamTherapy'));
const JamTerms = lazy(() => import('./pages/JamTerms'));
const JamPrivacy = lazy(() => import('./pages/JamPrivacy'));
const JamRep = lazy(() => import('./pages/JamRep'));
const JamDocs = lazy(() => import('./pages/JamDocs'));
const JamIOS = lazy(() => import('./pages/JamIOS'));
const JamAndroid = lazy(() => import('./pages/JamAndroid'));
const OperationsLedger = lazy(() => import('./pages/OperationsLedger'));
const ElevenLayers = lazy(() => import('./pages/ElevenLayers'));
const WhiteLabelHub = lazy(() => import('./pages/WhiteLabelHub'));
const JamPros = lazy(() => import('./pages/JamPros'));
const HubPage = lazy(() => import('./pages/HubPage'));

/* ═══════════════════════════════════════════
   JAMDAVE™ ENGINE — Digital Audio/Video Infrastructure
   ═══════════════════════════════════════════ */
const UploadStudio = lazy(() => import('./pages/UploadStudio'));
const GoLive = lazy(() => import('./pages/GoLive'));
const MediaTiers = lazy(() => import('./pages/MediaTiers'));
const MediaLibrary = lazy(() => import('./pages/MediaLibrary'));
const JamDAVE = lazy(() => import('./pages/JamDAVE'));

/* ═══════════════════════════════════════════
   JAMEX™ — AI Explainer Videos & Education
   ═══════════════════════════════════════════ */
const JamEx = lazy(() => import('./pages/JamEx'));
const CottonBrickRoad = lazy(() => import('./pages/CottonBrickRoad'));
const TheCastle = lazy(() => import('./pages/TheCastle'));
const JamZaStream = lazy(() => import('./pages/JamZaStream'));

/* Media Platform Suite — Audio/Video Layer */
const JamBoxFlix = lazy(() => import('./pages/JamBoxFlix'));
const StreamingPartners = lazy(() => import('./pages/StreamingPartners'));
const JamReels = lazy(() => import('./pages/JamReels'));
const JamShorts = lazy(() => import('./pages/JamShorts'));
const JamMusic = lazy(() => import('./pages/JamMusic'));
const JamPPV = lazy(() => import('./pages/JamPPV'));
const JamGroupChat = lazy(() => import('./pages/JamGroupChat'));

const JamU = lazy(() => import('./pages/JamU'));

/* ════════════════════════════════════════════
   AGENTIC BUILD WAVE — Real Pages Replacing HubPage
   40,000 employees worth of compute deployed
   ════════════════════════════════════════════ */
const JamCloud = lazy(() => import('./pages/JamCloud'));
const JamMonitor = lazy(() => import('./pages/JamMonitor'));
const JamStudio = lazy(() => import('./pages/JamStudio'));
const JamDeploy = lazy(() => import('./pages/JamDeploy'));
const JamArena = lazy(() => import('./pages/JamArena'));
const JamForum = lazy(() => import('./pages/JamForum'));
const JamEvents = lazy(() => import('./pages/JamEvents'));
const JamStaking = lazy(() => import('./pages/JamStaking'));

const JamVault = lazy(() => import('./pages/JamVault'));
const JamChess = lazy(() => import('./pages/JamChess'));
const JamRadio = lazy(() => import('./pages/JamRadio'));
const JamQuiz = lazy(() => import('./pages/JamQuiz'));
const JamBot = lazy(() => import('./pages/JamBot'));
const JamDating = lazy(() => import('./pages/JamDating'));
const JamEscrow = lazy(() => import('./pages/JamEscrow'));
const JamFilms = lazy(() => import('./pages/JamFilms'));
const JamLibrary = lazy(() => import('./pages/JamLibrary'));
const JamMail = lazy(() => import('./pages/JamMail'));
const JamNetwork = lazy(() => import('./pages/JamNetwork'));
const JamPod = lazy(() => import('./pages/JamPod'));
const JamPuzzle = lazy(() => import('./pages/JamPuzzle'));
const JamQuest = lazy(() => import('./pages/JamQuest'));
const JamRPG = lazy(() => import('./pages/JamRPG'));
const JamSound = lazy(() => import('./pages/JamSound'));
const JamSwap = lazy(() => import('./pages/JamSwap'));
const JamTickets = lazy(() => import('./pages/JamTickets'));
const JamVote = lazy(() => import('./pages/JamVote'));
const JamBeats = lazy(() => import('./pages/JamBeats'));
const JamCert = lazy(() => import('./pages/JamCert'));
const JamCI = lazy(() => import('./pages/JamCI'));
const JamCompliance = lazy(() => import('./pages/JamCompliance'));
const JamDeals = lazy(() => import('./pages/JamDeals'));
const JamFashion = lazy(() => import('./pages/JamFashion'));
const JamForm = lazy(() => import('./pages/JamForm'));
const JamGoods = lazy(() => import('./pages/JamGoods'));
const JamLabs = lazy(() => import('./pages/JamLabs'));
const JamLiveAudio = lazy(() => import('./pages/JamLiveAudio'));
const JamLoop = lazy(() => import('./pages/JamLoop'));
const JamPolicy = lazy(() => import('./pages/JamPolicy'));
const JamPremiere = lazy(() => import('./pages/JamPremiere'));
const JamTechStore = lazy(() => import('./pages/JamTechStore'));
const JamTutor = lazy(() => import('./pages/JamTutor'));
const JamFamily = lazy(() => import('./pages/JamFamily'));
const JamDocsLegal = lazy(() => import('./pages/JamDocsLegal'));


function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#7096D1] border-t-transparent animate-spin" />
          <p className="text-xs text-[#6B7280]">Loading platform...</p>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
}

export default function App() {
  return (
    <WhiteLabelProvider>
    <div className="min-h-screen bg-black text-white" id="app-root">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />

        {/* Core Platforms */}
        <Route path="/video" element={<LazyWrapper><JamVideo /></LazyWrapper>} />
        <Route path="/audio" element={<LazyWrapper><JamAudio /></LazyWrapper>} />
        <Route path="/social" element={<LazyWrapper><JamSocial /></LazyWrapper>} />
        <Route path="/food" element={<LazyWrapper><JamFood /></LazyWrapper>} />
        <Route path="/pay" element={<LazyWrapper><JamPay /></LazyWrapper>} />
        <Route path="/shop" element={<LazyWrapper><JamShop /></LazyWrapper>} />
        <Route path="/live" element={<LazyWrapper><JamLive /></LazyWrapper>} />

        {/* Natural */}
        <Route path="/earth" element={<LazyWrapper><JamEarth /></LazyWrapper>} />
        <Route path="/green" element={<LazyWrapper><JamGreen /></LazyWrapper>} />
        <Route path="/grow" element={<LazyWrapper><JamGrow /></LazyWrapper>} />
        <Route path="/weather" element={<LazyWrapper><JamWeather /></LazyWrapper>} />

        {/* Creator */}
        <Route path="/box" element={<LazyWrapper><JamBox /></LazyWrapper>} />
        <Route path="/cat" element={<LazyWrapper><JamCat /></LazyWrapper>} />
        <Route path="/wise" element={<LazyWrapper><JamWise /></LazyWrapper>} />
        <Route path="/tech" element={<LazyWrapper><JamTech /></LazyWrapper>} />
        <Route path="/street" element={<LazyWrapper><JamStreet /></LazyWrapper>} />
        <Route path="/ar" element={<LazyWrapper><JamAR /></LazyWrapper>} />
        <Route path="/tok" element={<LazyWrapper><JamTok /></LazyWrapper>} />
        <Route path="/words" element={<LazyWrapper><JamWords /></LazyWrapper>} />

        {/* Ad9x Intel */}
        <Route path="/lab" element={<LazyWrapper><JamLab /></LazyWrapper>} />
        <Route path="/kind" element={<LazyWrapper><JamKind /></LazyWrapper>} />
        <Route path="/tribute" element={<LazyWrapper><JamTribute /></LazyWrapper>} />
        <Route path="/scale" element={<LazyWrapper><JamScale /></LazyWrapper>} />

        {/* Search Core */}
        <Route path="/med" element={<LazyWrapper><JamMed /></LazyWrapper>} />
        <Route path="/dex" element={<LazyWrapper><JamDEX /></LazyWrapper>} />
        <Route path="/grants" element={<LazyWrapper><JamGrants /></LazyWrapper>} />
        <Route path="/credits" element={<LazyWrapper><JamCredits /></LazyWrapper>} />
        <Route path="/com" element={<LazyWrapper><JamCom /></LazyWrapper>} />
        <Route path="/fed" element={<LazyWrapper><JamFed /></LazyWrapper>} />
        <Route path="/state" element={<LazyWrapper><JamState /></LazyWrapper>} />
        <Route path="/local" element={<LazyWrapper><JamLocal /></LazyWrapper>} />

        {/* Professional */}
        <Route path="/law" element={<LazyWrapper><JamLaw /></LazyWrapper>} />
        <Route path="/lawyer" element={<LazyWrapper><JamLawyer /></LazyWrapper>} />
        <Route path="/cpa" element={<LazyWrapper><JamCPA /></LazyWrapper>} />
        <Route path="/accountant" element={<LazyWrapper><JamAccountant /></LazyWrapper>} />
        <Route path="/doctor" element={<LazyWrapper><JamDoctor /></LazyWrapper>} />
        <Route path="/code" element={<LazyWrapper><JamCode /></LazyWrapper>} />

        {/* Gaming */}
        <Route path="/battle" element={<LazyWrapper><JamBattle /></LazyWrapper>} />
        <Route path="/mastery" element={<LazyWrapper><JamMastery /></LazyWrapper>} />

        {/* JamCoins™ — AR Crypto Coin Collection */}
        <Route path="/coins" element={<LazyWrapper><JamCoins /></LazyWrapper>} />
        <Route path="/auto" element={<LazyWrapper><JamAuto /></LazyWrapper>} />

        {/* ═══════════════════════════════════════════
            AUDIT FIX: All 81 deliverable routes registered
            Missing routes point to HubPage as category landing
            ═══════════════════════════════════════════ */}

        {/* Listen Hub — remaining 7 routes */}
        <Route path="/radio" element={<LazyWrapper><JamRadio /></LazyWrapper>} />
        <Route path="/sound" element={<LazyWrapper><JamSound /></LazyWrapper>} />
        <Route path="/beats" element={<LazyWrapper><JamBeats /></LazyWrapper>} />
        <Route path="/live-audio" element={<LazyWrapper><JamLiveAudio /></LazyWrapper>} />
        <Route path="/loop" element={<LazyWrapper><JamLoop /></LazyWrapper>} />
        <Route path="/pod" element={<LazyWrapper><JamPod /></LazyWrapper>} />

        {/* Watch Hub — remaining 2 routes */}
        <Route path="/films" element={<LazyWrapper><JamFilms /></LazyWrapper>} />
        <Route path="/premiere" element={<LazyWrapper><JamPremiere /></LazyWrapper>} />

        {/* ════════════════════════════════════════════
            PLAY HUB — REAL PAGES (Agentic Build Wave)
           ════════════════════════════════════════════ */}
        <Route path="/arena" element={<LazyWrapper><JamArena /></LazyWrapper>} />
        <Route path="/casino" element={<LazyWrapper><JamChess /></LazyWrapper>} />
        <Route path="/rpg" element={<LazyWrapper><JamRPG /></LazyWrapper>} />
        <Route path="/puzzle" element={<LazyWrapper><JamPuzzle /></LazyWrapper>} />
        <Route path="/quest" element={<LazyWrapper><JamQuest /></LazyWrapper>} />

        {/* ════════════════════════════════════════════
            PAY HUB — REAL PAGES (Agentic Build Wave)
           ════════════════════════════════════════════ */}
        <Route path="/dex" element={<LazyWrapper><JamDEX /></LazyWrapper>} />
        <Route path="/staking" element={<LazyWrapper><JamStaking /></LazyWrapper>} />
        <Route path="/escrow" element={<LazyWrapper><JamEscrow /></LazyWrapper>} />
        <Route path="/swap" element={<LazyWrapper><JamSwap /></LazyWrapper>} />
        <Route path="/vault" element={<LazyWrapper><JamVault /></LazyWrapper>} />

        {/* Shop Hub — remaining 6 routes */}
        <Route path="/deals" element={<LazyWrapper><JamDeals /></LazyWrapper>} />
        <Route path="/fashion" element={<LazyWrapper><JamFashion /></LazyWrapper>} />
        <Route path="/techstore" element={<LazyWrapper><JamTechStore /></LazyWrapper>} />
        <Route path="/home" element={<LazyWrapper><HubPage categoryId="shop" /></LazyWrapper>} />
        <Route path="/tickets" element={<LazyWrapper><JamTickets /></LazyWrapper>} />
        <Route path="/goods" element={<LazyWrapper><JamGoods /></LazyWrapper>} />

        {/* Learn Hub — remaining 5 routes */}
        <Route path="/cert" element={<LazyWrapper><JamCert /></LazyWrapper>} />
        <Route path="/library" element={<LazyWrapper><JamLibrary /></LazyWrapper>} />
        <Route path="/labs" element={<LazyWrapper><JamLabs /></LazyWrapper>} />
        <Route path="/quiz" element={<LazyWrapper><JamQuiz /></LazyWrapper>} />
        <Route path="/tutor" element={<LazyWrapper><JamTutor /></LazyWrapper>} />

        {/* ════════════════════════════════════════════
            CONNECT HUB — REAL PAGES (Agentic Build Wave)
           ════════════════════════════════════════════ */}
        <Route path="/forum" element={<LazyWrapper><JamForum /></LazyWrapper>} />
        <Route path="/events" element={<LazyWrapper><JamEvents /></LazyWrapper>} />
        <Route path="/dating" element={<LazyWrapper><JamDating /></LazyWrapper>} />
        <Route path="/network" element={<LazyWrapper><JamNetwork /></LazyWrapper>} />
        <Route path="/family" element={<LazyWrapper><JamFamily /></LazyWrapper>} />
        <Route path="/mail" element={<LazyWrapper><JamMail /></LazyWrapper>} />

        {/* ════════════════════════════════════════════
            BUILD HUB — REAL PAGES (Agentic Build Wave)
            Replacing HubPage placeholders with full UIs
           ════════════════════════════════════════════ */}
        <Route path="/cloud" element={<LazyWrapper><JamCloud /></LazyWrapper>} />
        <Route path="/monitor" element={<LazyWrapper><JamMonitor /></LazyWrapper>} />
        <Route path="/studio" element={<LazyWrapper><JamStudio /></LazyWrapper>} />
        <Route path="/deploy" element={<LazyWrapper><JamDeploy /></LazyWrapper>} />
        <Route path="/devdocs" element={<LazyWrapper><JamDocs /></LazyWrapper>} />
        <Route path="/ci" element={<LazyWrapper><JamCI /></LazyWrapper>} />
        <Route path="/bot" element={<LazyWrapper><JamBot /></LazyWrapper>} />
        <Route path="/form" element={<LazyWrapper><JamForm /></LazyWrapper>} />

        {/* Govern Hub — remaining 5 routes */}
        <Route path="/compliance" element={<LazyWrapper><JamCompliance /></LazyWrapper>} />
        <Route path="/docs-legal" element={<LazyWrapper><JamDocsLegal /></LazyWrapper>} />
        <Route path="/policy" element={<LazyWrapper><JamPolicy /></LazyWrapper>} />
        <Route path="/tax" element={<LazyWrapper><JamCPA /></LazyWrapper>} />
        <Route path="/vote" element={<LazyWrapper><JamVote /></LazyWrapper>} />

        {/* Architecture & Integrations */}
        <Route path="/architecture" element={<LazyWrapper><Architecture /></LazyWrapper>} />
        <Route path="/integrations" element={<LazyWrapper><Integrations /></LazyWrapper>} />
        <Route path="/layers" element={<LazyWrapper><ElevenLayers /></LazyWrapper>} />

        {/* Command Center */}
        <Route path="/command" element={<LazyWrapper><CommandCenter /></LazyWrapper>} />

        {/* JamNews */}
        <Route path="/news" element={<LazyWrapper><JamNews /></LazyWrapper>} />
        <Route path="/newsbusiness" element={<LazyWrapper><JamNewsBusiness /></LazyWrapper>} />

        {/* JamLearn — Mrs. Cotton's Academy */}
        <Route path="/learn" element={<LazyWrapper><JamLearn /></LazyWrapper>} />
        <Route path="/academy" element={<LazyWrapper><JamLearn /></LazyWrapper>} />
        <Route path="/jamu" element={<LazyWrapper><JamU /></LazyWrapper>} />

        {/* JamPsych — Miss Cotton's Academy */}
        <Route path="/psych" element={<LazyWrapper><JamPsych /></LazyWrapper>} />

        {/* JamTherapy — Platform 48 */}
        <Route path="/therapy" element={<LazyWrapper><JamTherapy /></LazyWrapper>} />

        {/* Legal & Compliance */}
        <Route path="/terms" element={<LazyWrapper><JamTerms /></LazyWrapper>} />
        <Route path="/privacy" element={<LazyWrapper><JamPrivacy /></LazyWrapper>} />

        {/* JamRep — Replication Engine */}
        <Route path="/rep" element={<LazyWrapper><JamRep /></LazyWrapper>} />

        {/* JamDocs — Developer Documentation */}
        <Route path="/docs" element={<LazyWrapper><JamDocs /></LazyWrapper>} />

        {/* Operations Ledger — Immutable Artifact Registry */}
        <Route path="/ledger" element={<LazyWrapper><OperationsLedger /></LazyWrapper>} />

        {/* JamPros — Professional Services Network */}
        <Route path="/pros" element={<LazyWrapper><JamPros /></LazyWrapper>} />

        {/* NoFearZia — Fearless Revolution Foundation White Label WL-001 */}
        <Route path="/nofear/*" element={<NoFearRouter />} />

        {/* JamProfile — Academic Transcript */}
        <Route path="/profile" element={<LazyWrapper><JamProfile /></LazyWrapper>} />

        {/* JamCourses — Learning Ground with Mrs. Cotton LIVE */}
        <Route path="/courses" element={<LazyWrapper><JamCourses /></LazyWrapper>} />

        {/* JamGames — Gaming Hub */}
        <Route path="/games" element={<LazyWrapper><JamGames /></LazyWrapper>} />

        {/* 9 Broad Category Hubs — only for routes without dedicated pages */}
        <Route path="/listen" element={<LazyWrapper><HubPage categoryId="listen" /></LazyWrapper>} />
        <Route path="/watch" element={<LazyWrapper><HubPage categoryId="watch" /></LazyWrapper>} />
        <Route path="/play" element={<LazyWrapper><HubPage categoryId="play" /></LazyWrapper>} />
        <Route path="/connect" element={<LazyWrapper><HubPage categoryId="connect" /></LazyWrapper>} />
        <Route path="/build" element={<LazyWrapper><HubPage categoryId="build" /></LazyWrapper>} />
        <Route path="/govern" element={<LazyWrapper><HubPage categoryId="govern" /></LazyWrapper>} />

        {/* ════════════════════════════════════════════
            SUBDAO WHITE LABEL ROUTERS — All brands
            Each brand gets its own dedicated router + shell
            ════════════════════════════════════════════ */}
        {/* WL-001 NoFear — Dedicated router (legacy, fully built) */}
        <Route path="/NoFear" element={<LazyWrapper><WhiteLabelHub /></LazyWrapper>} />
        {/* WL-002 RockNext */}
        <Route path="/rocknext/*" element={<LazyWrapper><SubDAORouter brandId="RockNext" /></LazyWrapper>} />
        {/* WL-003 SkyLockr */}
        <Route path="/skylockr/*" element={<LazyWrapper><SubDAORouter brandId="SkyLockr" /></LazyWrapper>} />
        {/* WL-004 BlackDiamond */}
        <Route path="/blackdiamond/*" element={<LazyWrapper><SubDAORouter brandId="BlackDiamond" /></LazyWrapper>} />
        {/* WL-005 Conduit */}
        <Route path="/conduit/*" element={<LazyWrapper><SubDAORouter brandId="Conduit" /></LazyWrapper>} />
        {/* WL-006 RiverShyre */}
        <Route path="/rivershyre/*" element={<LazyWrapper><SubDAORouter brandId="RiverShyre" /></LazyWrapper>} />
        {/* WL-007 The Collective */}
        <Route path="/collective/*" element={<LazyWrapper><SubDAORouter brandId="Collective" /></LazyWrapper>} />
        {/* WL-008 WisdomPay */}
        <Route path="/wisdompay/*" element={<LazyWrapper><SubDAORouter brandId="WisdomPay" /></LazyWrapper>} />
        {/* WL-009 Ad9x */}
        <Route path="/ad9x/*" element={<LazyWrapper><SubDAORouter brandId="Ad9x" /></LazyWrapper>} />
        {/* WL-010 BlackDiamondStudios */}
        <Route path="/blackdiamondstudios/*" element={<LazyWrapper><SubDAORouter brandId="BlackDiamondStudios" /></LazyWrapper>} />
        {/* WL-011 Ad9xPharma */}
        <Route path="/ad9xpharma/*" element={<LazyWrapper><SubDAORouter brandId="Ad9xPharma" /></LazyWrapper>} />

        {/* Subdomain Routes (§3.2 Compliant) */}
        <Route path="/app" element={<LazyWrapper><AppPortal /></LazyWrapper>} />
        <Route path="/ios" element={<LazyWrapper><JamIOS /></LazyWrapper>} />
        <Route path="/android" element={<LazyWrapper><JamAndroid /></LazyWrapper>} />
        <Route path="/api" element={<LazyWrapper><ApiRoot /></LazyWrapper>} />
        <Route path="/documentation" element={<LazyWrapper><DocsPage /></LazyWrapper>} />
        <Route path="/status" element={<LazyWrapper><StatusPage /></LazyWrapper>} />
        <Route path="/audit" element={<LazyWrapper><AuditLogs /></LazyWrapper>} />

        {/* Admin */}
        <Route path="/admin" element={<LazyWrapper><AdminLayout /></LazyWrapper>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="moderation" element={<AdminModeration />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* ═══════════════════════════════════════════
            MEDIA PLATFORM SUITE — Audio/Video Layer
            JamBoxFlix+ | Streaming Partners | JamReels
            JamShorts | JamMusic | JamPPV | JamGroupChat
           ═══════════════════════════════════════════ */}

        {/* JamBoxFlix+ — Exclusive Content Platform */}
        <Route path="/boxflix" element={<LazyWrapper><JamBoxFlix /></LazyWrapper>} />
        <Route path="/boxflix/originals" element={<LazyWrapper><JamBoxFlix /></LazyWrapper>} />
        <Route path="/boxflix/films" element={<LazyWrapper><JamBoxFlix /></LazyWrapper>} />
        <Route path="/boxflix/series" element={<LazyWrapper><JamBoxFlix /></LazyWrapper>} />
        <Route path="/boxflix/podcasts" element={<LazyWrapper><JamBoxFlix /></LazyWrapper>} />
        <Route path="/boxflix/episodes" element={<LazyWrapper><JamBoxFlix /></LazyWrapper>} />
        <Route path="/boxflix/trending" element={<LazyWrapper><JamBoxFlix /></LazyWrapper>} />

        {/* Streaming Partners — Aggregator Hub */}
        <Route path="/streaming" element={<LazyWrapper><StreamingPartners /></LazyWrapper>} />

        {/* JamReels — Short-Form Video */}
        <Route path="/reels" element={<LazyWrapper><JamReels /></LazyWrapper>} />

        {/* JamShorts — Vertical Short-Form Video */}
        <Route path="/shorts" element={<LazyWrapper><JamShorts /></LazyWrapper>} />

        {/* JamMusic — Music Streaming */}
        <Route path="/music" element={<LazyWrapper><JamMusic /></LazyWrapper>} />

        {/* JamPPV — Pay Per View Events */}
        <Route path="/ppv" element={<LazyWrapper><JamPPV /></LazyWrapper>} />

        {/* JamGroupChat — Group Chat for All Media */}
        <Route path="/groupchat" element={<LazyWrapper><JamGroupChat /></LazyWrapper>} />

        {/* ═══════════════════════════════════════════
            JAMDAVE™ ENGINE — Digital Audio/Video Infrastructure
            UploadStudio · GoLive · MediaTiers · MediaLibrary
           ═══════════════════════════════════════════ */}
        <Route path="/upload" element={<LazyWrapper><UploadStudio /></LazyWrapper>} />
        <Route path="/golive" element={<LazyWrapper><GoLive /></LazyWrapper>} />
        <Route path="/tiers" element={<LazyWrapper><MediaTiers /></LazyWrapper>} />
        <Route path="/medialibrary" element={<LazyWrapper><MediaLibrary /></LazyWrapper>} />

        {/* ═══════════════════════════════════════════
            JAMDAVE™ ENGINE — Creators Suite
            Create · Edit · Mix · Master · Playlist · Store · Monetize · Distribute
           ═══════════════════════════════════════════ */}
        <Route path="/dave" element={<LazyWrapper><JamDAVE /></LazyWrapper>} />
        <Route path="/creators" element={<LazyWrapper><JamDAVE /></LazyWrapper>} />

        {/* ═══════════════════════════════════════════
            JAMEX™ — AI Explainer Videos & Education
            JamEx · Cotton Brick Road · The Castle
           ═══════════════════════════════════════════ */}
        <Route path="/jamex" element={<LazyWrapper><JamEx /></LazyWrapper>} />
        <Route path="/cottonbrickroad" element={<LazyWrapper><CottonBrickRoad /></LazyWrapper>} />
        <Route path="/castle" element={<LazyWrapper><TheCastle /></LazyWrapper>} />

        {/* ═══════════════════════════════════════════
            JAMZA STREAM™ — Total Decentralized Streaming
            LiveStream · VOD · PPV · Cloud Studio · Asset Management
           ═══════════════════════════════════════════ */}
        <Route path="/jamzastream" element={<LazyWrapper><JamZaStream /></LazyWrapper>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Coming Soon Modal — available on all routes */}
      <ComingSoonModal />

      <Footer />
      <Ad9xAgent />
      <BattleButton />
      <NoFearShell>
        <div />
      </NoFearShell>
    </div>
  </WhiteLabelProvider>
  );
}
