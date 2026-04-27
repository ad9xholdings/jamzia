/* ═══════════════════════════════════════════════════════════
   11-Layer Architecture — With Coming Soon Build Roadmap
   Each layer shows: 3 tabs + Connected Platforms + Coming Soon
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Layers, Code, Users, Shield, Lock, Eye, MessageSquare, Gift, BarChart3, Wifi, Server, Cpu, Clock, Sparkles, Database, Globe, ChevronDown, ChevronUp, CheckCircle2, CircleDot, Circle, Link2, Hammer, Rocket
} from 'lucide-react';

interface Layer {
  n: number;
  name: string;
  icon: any;
  color: string;
  status: 'complete' | 'in_progress' | 'coming_soon' | 'planned';
  whatItIs: string;
  whatItDoes: string[];
  howItHelps: string[];
  techStack: string[];
  eta: string;
  buildProgress: number;
  connectedPlatforms: { name: string; route: string }[];
  comingSoon: { item: string; desc: string; eta: string }[];
}

const LAYERS: Layer[] = [
  {
    n: 1, name: 'Identity', icon: Lock, color: '#ef4444', status: 'complete',
    whatItIs: 'The trust foundation. Every user, device, and transaction is cryptographically verified before any platform grants access.',
    whatItDoes: [
      'Single sign-on across all 50+ platforms',
      'Multi-factor authentication (WebAuthn/Passkeys)',
      'KYC verification pipeline for institutional users',
      'Role-based access control (7 permission tiers)',
      'Device fingerprinting and session pinning',
      'Federated identity (OAuth 2.0 / OIDC)',
    ],
    howItHelps: [
      'One login unlocks everything — no password fatigue',
      'Parents control what children access across all platforms',
      'Institutional clients meet compliance without friction',
      'Creators get verified badges that audiences trust',
    ],
    techStack: ['JWT + refresh rotation', 'WebAuthn/Passkeys', 'OAuth 2.0/OIDC', 'RBAC 7-tier', 'KYC Onfido/Jumio', 'Session pinning'],
    eta: 'LIVE',
    buildProgress: 100,
    connectedPlatforms: [
      { name: 'JamZia Login', route: '/' },
      { name: 'Profile', route: '/profile' },
      { name: 'Command Center', route: '/command' },
      { name: 'Dashboard', route: '/admin/dashboard' },
      { name: 'White Label Auth', route: '/wl-brands' },
      { name: 'JamPsych', route: '/psych' },
      { name: 'JamTherapy', route: '/therapy' },
    ],
    comingSoon: [
      { item: 'Passkey Migration', desc: 'Replace passwords with FIDO2/WebAuthn across all 50+ platforms', eta: 'Q2 2026' },
      { item: 'Biometric Auth', desc: 'Face/fingerprint unlock for mobile apps (iOS/Android)', eta: 'Q2 2026' },
      { item: 'Institutional KYC', desc: 'Enterprise-grade identity verification for B2B clients', eta: 'Q3 2026' },
    ],
  },
  {
    n: 2, name: 'Interface', icon: Eye, color: '#f97316', status: 'complete',
    whatItIs: 'The visual and interactive layer. Every screen — from a phone to a TV to an AR headset — renders JamZia perfectly.',
    whatItDoes: [
      'Responsive design across all screen sizes',
      'Dark, light, and auto themes',
      'Accessibility compliance (WCAG 2.2 AA)',
      'AR overlays for immersive experiences',
      'Voice-navigable interfaces',
      'Offline PWA support with caching',
    ],
    howItHelps: [
      'Users access JamZia on any device they own',
      'Visually impaired users navigate via voice and screen readers',
      'AR mode turns any room into a classroom or game stage',
      'No internet? No problem — cached content still works',
    ],
    techStack: ['React 19 + TypeScript', 'Tailwind CSS 3.4', 'CSS Container Queries', 'ARIA WCAG 2.2 AA', 'PWA offline', 'HashRouter SPA'],
    eta: 'LIVE',
    buildProgress: 100,
    connectedPlatforms: [
      { name: 'JamBoxFlix+', route: '/boxflix' },
      { name: 'JamMusic', route: '/music' },
      { name: 'JamReels', route: '/reels' },
      { name: 'JamShorts', route: '/shorts' },
      { name: 'JamGroupChat', route: '/groupchat' },
      { name: 'JamPPV', route: '/ppv' },
      { name: 'JamLive', route: '/live' },
      { name: 'AR Creatures', route: '/ar' },
    ],
    comingSoon: [
      { item: 'TV Mode', desc: '10-foot UI optimized for smart TVs and streaming boxes', eta: 'Q2 2026' },
      { item: 'AR Glasses Support', desc: 'Native Apple Vision Pro and Meta Quest integration', eta: 'Q3 2026' },
      { item: 'Voice-Only Mode', desc: 'Hands-free navigation for accessibility and driving', eta: 'Q3 2026' },
    ],
  },
  {
    n: 3, name: 'Integration', icon: Wifi, color: '#f59e0b', status: 'in_progress',
    whatItIs: 'The nervous system. Connects all 50+ internal platforms to each other and to external services via APIs, webhooks, and event buses.',
    whatItDoes: [
      'RESTful and GraphQL API gateways',
      'Event-driven architecture (BullMQ + in-memory cache)',
      'Webhook delivery with exponential retry',
      'Rate limiting and circuit breakers',
      'Third-party service connectors',
      'Real-time data synchronization',
    ],
    howItHelps: [
      'JamShop inventory syncs with marketplace backends instantly',
      'Live streams multicast to social platforms simultaneously',
      'XRPL wallet balances update in real-time across all apps',
      'Admin alerts fire instantly when systems need attention',
    ],
    techStack: ['tRPC + Hono + Drizzle ORM', 'GraphQL Federation', 'BullMQ event bus', 'in-memory cache Pub/Sub', 'Webhook retry logic', 'Token bucket rate limit'],
    eta: 'Q3 2026',
    buildProgress: 65,
    connectedPlatforms: [
      { name: 'JamShop Sync', route: '/shop' },
      { name: 'JamLive Multicast', route: '/live' },
      { name: 'WisdomPay XRPL', route: '/pay' },
      { name: 'JamSocial Graph', route: '/social' },
      { name: 'Admin Alerts', route: '/admin/dashboard' },
      { name: 'SORME Connectors', route: '/sorme' },
    ],
    comingSoon: [
      { item: 'tRPC Backend', desc: 'Full-stack type-safe API layer with Hono server framework', eta: 'Q2 2026' },
      { item: 'GraphQL Federation', desc: 'Unified schema across all 50+ platform microservices', eta: 'Q3 2026' },
      { item: 'Event Bus v2', desc: 'BullMQ + in-memory cache Pub/Sub for real-time cross-platform events', eta: 'Q3 2026' },
      { item: 'Webhook Portal', desc: 'Self-service webhook configuration for white-label partners', eta: 'Q3 2026' },
    ],
  },
  {
    n: 4, name: 'Intelligence', icon: Cpu, color: '#22c55e', status: 'in_progress',
    whatItIs: 'The brain. 9-node AI mesh, SORME search engine, Ask 9x Concierge, recommendation engines, and predictive analytics power every platform.',
    whatItDoes: [
      '9-node AI mesh (PRIME-Σ to AEGIS-09) routes all queries',
      'SORME 4-tier search (JamLight to JamMAX)',
      'Ask 9x Concierge with reasoning chains',
      'Collaborative + content-based recommendations',
      'NLP: sentiment, entity extraction, summarization',
      'GPU inference cluster (A100/H100)',
    ],
    howItHelps: [
      'Users find answers faster than any traditional search engine',
      'JamLearn adapts curriculum to each student\'s pace automatically',
      'SORME surfaces grants and funding users never knew existed',
      'Auto-captioning makes all video content accessible globally',
    ],
    techStack: ['9-node AI mesh', 'SORME 4-tier engine', 'Reasoning chains', 'Collaborative filtering', 'Transformer NLP', 'GPU inference cluster'],
    eta: 'Q3 2026',
    buildProgress: 70,
    connectedPlatforms: [
      { name: 'Ask 9x', route: '/ask9x' },
      { name: 'SORME Search', route: '/sorme' },
      { name: 'JamLearn', route: '/learn' },
      { name: 'JamGrants', route: '/grants' },
      { name: 'JamRecommender', route: '/video' },
      { name: 'Auto Caption', route: '/live' },
    ],
    comingSoon: [
      { item: 'LLM Pipeline', desc: 'Server-side LLM integration with real-time inference for Ask 9x', eta: 'Q3 2026' },
      { item: 'SORME v2', desc: 'Real semantic search with BM25 + vector hybrid ranking', eta: 'Q3 2026' },
      { item: '9-Node Router', desc: 'Dynamic AI node routing based on query intent classification', eta: 'Q3 2026' },
      { item: 'GPU Cluster', desc: 'A100/H100 inference cluster for large model serving', eta: 'Q4 2026' },
    ],
  },
  {
    n: 5, name: 'Inventory', icon: Database, color: '#14b8a6', status: 'in_progress',
    whatItIs: 'The vault. All content, user data, transactions, media files, and logs stored with redundancy across decentralized and traditional systems.',
    whatItDoes: [
      'relational database 16 with read replicas for relational data',
      'Ad9x Mesh Storage decentralized storage for media and backups',
      'in-memory cache cluster for hot caching and sessions',
      'search engine for full-text content search',
      'time-series database for time-series analytics metrics',
      'Cross-region backup to 3 continents',
    ],
    howItHelps: [
      'JamVideo\'s 847TB archive is accessible from any node globally',
      'JamPsych session notes are encrypted and redundantly stored',
      'Audit logs survive any single data center failure',
      'Real-time analytics feed the Command Center without lag',
    ],
    techStack: ['relational database 16', 'Ad9x Mesh Storage decentralized', 'in-memory cache cluster', 'search engine', 'time-series database', '3-continent backup'],
    eta: 'Q3 2026',
    buildProgress: 60,
    connectedPlatforms: [
      { name: 'JamVideo Archive', route: '/video' },
      { name: 'JamPsych Notes', route: '/psych' },
      { name: 'JamAudio Library', route: '/audio' },
      { name: 'Audit Logs', route: '/admin/dashboard' },
      { name: 'Command Center', route: '/command' },
      { name: 'AR Asset Store', route: '/ar' },
    ],
    comingSoon: [
      { item: 'Ad9x Mesh Storage Integration', desc: 'Decentralized media storage for all JamZia content', eta: 'Q3 2026' },
      { item: 'in-memory cache Cluster', desc: 'Hot caching layer for sub-50ms response times', eta: 'Q3 2026' },
      { item: 'time-series database', desc: 'Time-series database for analytics and metrics', eta: 'Q3 2026' },
      { item: 'Geo-Redundancy', desc: '3-continent backup with automatic failover', eta: 'Q4 2026' },
    ],
  },
  {
    n: 6, name: 'Interaction', icon: MessageSquare, color: '#06b6d4', status: 'in_progress',
    whatItIs: 'The heartbeat. Real-time messaging, notifications, social graphs, and collaboration tools that make JamZia a living network, not just a directory.',
    whatItDoes: [
      'WebSocket clusters for real-time chat and gaming',
      'Push notifications (FCM + APNs)',
      'In-app messaging with end-to-end encryption',
      'Email and SMS routing (SendGrid + Twilio)',
      'Social graph powered by Neo4j',
      'Group chat rooms with 10+ channel categories',
    ],
    howItHelps: [
      'JamLive viewers chat during streams without latency',
      'JamGroupChat hosts 10 specialized community channels',
      'JamBattle multiplayer runs in real-time across devices',
      'Admins get instant alerts for flagged content or system issues',
    ],
    techStack: ['Socket.io WebSocket', 'FCM + APNs push', 'E2EE messaging', 'SendGrid + Twilio', 'Neo4j social graph', 'Room-based chat'],
    eta: 'Q3 2026',
    buildProgress: 55,
    connectedPlatforms: [
      { name: 'JamLive Chat', route: '/live' },
      { name: 'JamGroupChat', route: '/groupchat' },
      { name: 'JamBattle Multiplayer', route: '/battle' },
      { name: 'JamSocial Feed', route: '/social' },
      { name: 'JamTok Comments', route: '/tok' },
      { name: 'Admin Alerts', route: '/admin/dashboard' },
    ],
    comingSoon: [
      { item: 'WebSocket Cluster', desc: 'Socket.io cluster for real-time multiplayer and chat', eta: 'Q3 2026' },
      { item: 'Push Notifications', desc: 'FCM + APNs for mobile push across all platforms', eta: 'Q3 2026' },
      { item: 'E2EE Messaging', desc: 'End-to-end encryption for JamMail and group chats', eta: 'Q4 2026' },
      { item: 'Neo4j Social Graph', desc: 'Relationship database for follower/following networks', eta: 'Q4 2026' },
    ],
  },
  {
    n: 7, name: 'Indexing', icon: Globe, color: '#7096D1', status: 'in_progress',
    whatItIs: 'The map. With millions of items across 50+ platforms, finding the right content instantly requires a world-class search and discovery engine.',
    whatItDoes: [
      'search engine cluster for inverted indexing',
      'BM25 + vector hybrid ranking for relevance',
      'Semantic search with embedding vectors',
      'Auto-suggest with Trie data structures',
      'Daily index rebuilds for fresh content',
      'Cross-platform unified search (SORME)',
    ],
    howItHelps: [
      'SORME finds results across all platforms in under 200ms',
      'JamDEX serves as a universal directory for all services',
      'Creator content gets discovered by the right audiences',
      'JamGrants alerts users to new funding opportunities automatically',
    ],
    techStack: ['search engine cluster', 'BM25 + vector ranking', 'Semantic embeddings', 'Trie auto-suggest', 'Daily rebuilds', 'Cross-platform index'],
    eta: 'Q3 2026',
    buildProgress: 60,
    connectedPlatforms: [
      { name: 'SORME Search', route: '/sorme' },
      { name: 'JamDEX Directory', route: '/dex' },
      { name: 'Creator Discovery', route: '/social' },
      { name: 'JamGrants Alerts', route: '/grants' },
      { name: 'Platform Search', route: '/search' },
      { name: 'Content Discovery', route: '/video' },
    ],
    comingSoon: [
      { item: 'search engine Cluster', desc: 'Distributed search engine for 50+ platform content', eta: 'Q3 2026' },
      { item: 'Vector Search', desc: 'Semantic embeddings for natural language queries', eta: 'Q3 2026' },
      { item: 'Auto-Suggest v2', desc: 'Trie-based prefix matching for sub-10ms suggestions', eta: 'Q3 2026' },
      { item: 'Cross-Platform Index', desc: 'Unified inverted index across all JamZia content', eta: 'Q4 2026' },
    ],
  },
  {
    n: 8, name: 'Incentive', icon: Gift, color: '#a855f7', status: 'coming_soon',
    whatItIs: 'The reward engine. SkyIvy and SkyLockr tokens, gamification, staking, and loyalty programs turn usage into ownership across all platforms.',
    whatItDoes: [
      'SkyIvy Coin: content economy token (21T supply)',
      'SkyLockr Coin: security/storage token',
      'XRPL Hooks for automatic reward distribution',
      'Staking rewards at 8-12% APY',
      'Loyalty tiers: Bronze → Silver → Gold → Platinum → Diamond',
      'Creator royalties on every view, purchase, and share',
    ],
    howItHelps: [
      'Creators earn passive income every time content is consumed',
      'JamBattle players earn Bricks that convert to real value',
      'JamLearn students earn tokens for completing courses',
      'JamKind volunteers accumulate points redeemable across platforms',
    ],
    techStack: ['SkyIvy token', 'SkyLockr token', 'XRPL Hooks', 'Staking 8-12% APY', '5-tier loyalty', 'Auto royalties'],
    eta: 'Q4 2026',
    buildProgress: 35,
    connectedPlatforms: [
      { name: 'JamPay Rewards', route: '/pay' },
      { name: 'JamBattle Bricks', route: '/battle' },
      { name: 'JamLearn Tokens', route: '/learn' },
      { name: 'JamKind Points', route: '/kind' },
      { name: 'Creator Royalties', route: '/boxflix' },
      { name: 'Staking Dashboard', route: '/staking' },
    ],
    comingSoon: [
      { item: 'SkyIvy Token', desc: 'Content economy token with 21T supply on XRPL', eta: 'Q4 2026' },
      { item: 'XRPL Hooks', desc: 'Smart contracts for automatic reward distribution', eta: 'Q4 2026' },
      { item: 'Staking Portal', desc: '8-12% APY staking dashboard for token holders', eta: 'Q4 2026' },
      { item: 'Loyalty Tiers', desc: 'Bronze → Diamond with escalating perks across all platforms', eta: 'Q4 2026' },
    ],
  },
  {
    n: 9, name: 'Integrity', icon: Shield, color: '#ec4899', status: 'coming_soon',
    whatItIs: 'The vault door. Encryption, audit logging, compliance monitoring, fraud detection, and vulnerability management protect every byte of data.',
    whatItDoes: [
      'AES-256-GCM encryption for data at rest',
      'TLS 1.3 for all data in transit',
      'SOC 2 Type II compliance certification',
      'HIPAA readiness for JamPsych and JamTherapy',
      'Quarterly penetration testing',
      'Bug bounty program for white-hat researchers',
    ],
    howItHelps: [
      'Therapy session data is encrypted beyond any breach risk',
      'Immutable audit trails satisfy any regulatory investigation',
      'WisdomPay fraud detection blocks suspicious transactions',
      'AEGIS-09 moderation node flags harmful content automatically',
    ],
    techStack: ['AES-256-GCM', 'TLS 1.3', 'SOC 2 Type II', 'HIPAA ready', 'Quarterly pen tests', 'Bug bounty'],
    eta: 'Q4 2026',
    buildProgress: 40,
    connectedPlatforms: [
      { name: 'JamPsych HIPAA', route: '/psych' },
      { name: 'JamTherapy E2EE', route: '/therapy' },
      { name: 'WisdomPay Fraud', route: '/pay' },
      { name: 'Content Moderation', route: '/groupchat' },
      { name: 'Audit Trail', route: '/admin/dashboard' },
      { name: 'AEGIS-09', route: '/ai-nodes' },
    ],
    comingSoon: [
      { item: 'SOC 2 Type II', desc: 'Compliance certification for institutional clients', eta: 'Q4 2026' },
      { item: 'HIPAA Ready', desc: 'Healthcare compliance for JamPsych and JamTherapy', eta: 'Q4 2026' },
      { item: 'Fraud Detection', desc: 'AI-powered transaction monitoring for WisdomPay', eta: 'Q4 2026' },
      { item: 'Pen Test Cycle', desc: 'Quarterly penetration testing + bug bounty program', eta: 'Q4 2026' },
    ],
  },
  {
    n: 10, name: 'Insight', icon: BarChart3, color: '#f43f5e', status: 'coming_soon',
    whatItIs: 'The lens. Business intelligence dashboards, custom reporting, anomaly detection, and performance metrics turn raw data into actionable strategy.',
    whatItDoes: [
      'Apache Superset BI dashboards',
      'Anomaly detection via Isolation Forest',
      'Drag-drop custom report builder',
      'Real-time Prometheus + Grafana metrics',
      'Predictive forecasting with Prophet',
      'Auto-generated executive summaries',
    ],
    howItHelps: [
      'Command Center monitors all 50+ platforms in real-time',
      'Creators see exactly how revenue flows from each piece of content',
      'White-label partners get branded analytics portals',
      'Investors receive automated reporting for Conduit Capital',
    ],
    techStack: ['Apache Superset', 'Isolation Forest', 'Report builder', 'Prometheus + Grafana', 'Prophet forecasting', 'Auto summaries'],
    eta: 'Q4 2026',
    buildProgress: 30,
    connectedPlatforms: [
      { name: 'Command Center', route: '/command' },
      { name: 'Creator Analytics', route: '/boxflix' },
      { name: 'WL Partner Portal', route: '/wl-brands' },
      { name: 'Investor Reports', route: '/conduit' },
      { name: 'Admin Dashboard', route: '/admin/dashboard' },
      { name: 'Health Metrics', route: '/health' },
    ],
    comingSoon: [
      { item: 'Superset Dashboards', desc: 'Apache Superset BI with 50+ platform metrics', eta: 'Q4 2026' },
      { item: 'Anomaly Detection', desc: 'Isolation Forest for automated system alerts', eta: 'Q4 2026' },
      { item: 'Report Builder', desc: 'Drag-drop custom reports for white-label partners', eta: 'Q4 2026' },
      { item: 'Predictive Forecasting', desc: 'Prophet models for revenue and growth prediction', eta: 'Q1 2027' },
    ],
  },
  {
    n: 11, name: 'Infrastructure', icon: Server, color: '#6b7280', status: 'coming_soon',
    whatItIs: 'The foundation. Kubernetes orchestration, auto-scaling, CDN edge delivery, and disaster recovery ensure 99.99% uptime for all platforms globally.',
    whatItDoes: [
      'Kubernetes clusters (orchestration cluster + orchestration cluster)',
      'Auto-scaling: HPA + VPA for demand spikes',
      'CDN: Ad9x Edge Network + Ad9x Edge CDN edge network',
      'Load balancing: NGINX + load balancer',
      'Disaster recovery: RPO < 1min, RTO < 5min',
      'Multi-region active-active deployment',
    ],
    howItHelps: [
      '99.99% uptime SLA across all platforms globally',
      'Users in any country get low-latency content delivery',
      'Instant failover when any region experiences outage',
      'Cost optimization via spot instances and auto-scaling',
    ],
    techStack: ['orchestration cluster', 'HPA + VPA', 'Ad9x Edge Network + CloudFront', 'NGINX + ALB', 'RPO<1m RTO<5m', 'Multi-region active-active'],
    eta: 'Q4 2026',
    buildProgress: 25,
    connectedPlatforms: [
      { name: 'All 50+ Platforms', route: '/' },
      { name: 'Global CDN Delivery', route: '/video' },
      { name: 'Auto Scaling', route: '/command' },
      { name: 'Disaster Recovery', route: '/admin/dashboard' },
      { name: 'Edge Network', route: '/live' },
      { name: 'Latency Optimization', route: '/music' },
    ],
    comingSoon: [
      { item: 'Kubernetes orchestration cluster', desc: 'Container orchestration for all platform microservices', eta: 'Q4 2026' },
      { item: 'Auto-Scaling', desc: 'HPA + VPA for automatic capacity management', eta: 'Q4 2026' },
      { item: 'Multi-Region Active', desc: 'Active-active deployment across 3 continents', eta: 'Q4 2026' },
      { item: 'Edge CDN', desc: 'Ad9x Edge Network + CloudFront for sub-50ms global delivery', eta: 'Q4 2026' },
    ],
  },
];

const STATUS_META = {
  complete: { label: 'COMPLETE', color: '#10B981', bg: '#10B98115', dot: CheckCircle2 },
  in_progress: { label: 'IN PROGRESS', color: '#F59E0B', bg: '#F59E0B15', dot: CircleDot },
  coming_soon: { label: 'COMING SOON', color: '#7096D1', bg: '#7096D115', dot: Circle },
  planned: { label: 'PLANNED', color: '#6B7280', bg: '#6B728015', dot: Circle },
};

type TabKey = 'is' | 'does' | 'helps' | 'soon';

export default function ElevenLayers() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Record<number, TabKey>>({});

  const getTab = (n: number): TabKey => activeTab[n] || 'is';
  const setTab = (n: number, t: TabKey) => setActiveTab((prev) => ({ ...prev, [n]: t }));

  const overall = Math.round(LAYERS.reduce((s, l) => s + l.buildProgress, 0) / LAYERS.length);

  return (
    <div className="min-h-[100dvh] bg-[#0A0F1E] text-white">
      <header className="sticky top-0 z-30 bg-[#0A0F1E]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center gap-3">
          <a href="#/architecture" className="text-[10px] text-[#6B7280] hover:text-white no-underline shrink-0">← Architecture</a>
          <Layers size={20} className="text-[#7096D1] shrink-0" />
          <div>
            <h1 className="text-sm font-bold text-white">11-Layer Architecture</h1>
            <p className="text-[9px] text-[#6B7280]">Build Status, Roadmap & Connected Platforms</p>
          </div>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-4 py-6 space-y-4">
        {/* Progress Overview */}
        <div className="bg-[#0F172A] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Overall Build Progress</h3>
            <span className="text-xs text-[#7096D1] font-bold">{overall}% Complete</span>
          </div>
          <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${overall}%`, background: 'linear-gradient(90deg, #10B981, #7096D1, #F59E0B)' }} />
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-[10px] text-[#6B7280]">{LAYERS.filter((l) => l.status === 'complete').length} Complete</span>
            <span className="text-[10px] text-[#6B7280]">{LAYERS.filter((l) => l.status === 'in_progress').length} In Progress</span>
            <span className="text-[10px] text-[#6B7280]">{LAYERS.filter((l) => l.status === 'coming_soon').length} Coming Soon</span>
          </div>
        </div>

        {/* Layer Cards */}
        <div className="space-y-3">
          {LAYERS.map((layer) => {
            const status = STATUS_META[layer.status];
            const Icon = layer.icon;
            const Dot = status.dot;
            const isExpanded = expanded === layer.n;
            const tab = getTab(layer.n);

            return (
              <div key={layer.n} className="bg-[#0F172A] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.10] transition-all">
                {/* Header Row */}
                <button
                  onClick={() => {
                    setExpanded(isExpanded ? null : layer.n);
                    if (!isExpanded) setTab(layer.n, 'is');
                  }}
                  className="w-full text-left p-4 flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${layer.color}15` }}>
                    <Icon size={20} style={{ color: layer.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold" style={{ color: layer.color }}>Layer {layer.n}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ backgroundColor: status.bg, color: status.color }}>
                        <Dot size={9} /> {status.label}
                      </span>
                      <span className="text-[9px] text-[#6B7280] ml-auto">{layer.eta}</span>
                    </div>
                    <p className="text-sm font-bold text-white">{layer.name}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-lg font-bold" style={{ color: layer.color }}>{layer.buildProgress}%</span>
                    {isExpanded ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
                  </div>
                </button>

                {/* Progress Bar */}
                <div className="px-4 pb-2">
                  <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${layer.buildProgress}%`, backgroundColor: layer.color }} />
                  </div>
                </div>

                {/* ── EXPANDED CONTENT WITH 4 TABS ── */}
                {isExpanded && (
                  <div className="px-4 pb-4">
                    {/* Tab Buttons */}
                    <div className="flex gap-1 mb-3 bg-black/20 rounded-xl p-1">
                      {([
                        { key: 'is', label: 'What It Is', icon: Eye },
                        { key: 'does', label: 'What It Does', icon: Code },
                        { key: 'helps', label: 'How It Helps', icon: Users },
                        { key: 'soon', label: 'Coming Soon', icon: Rocket },
                      ] as { key: TabKey; label: string; icon: any }[]).map((t) => (
                        <button
                          key={t.key}
                          onClick={() => setTab(layer.n, t.key)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                            tab === t.key
                              ? 'text-white shadow-sm'
                              : 'text-white/40 hover:text-white/60'
                          }`}
                          style={tab === t.key ? { backgroundColor: `${layer.color}25`, color: layer.color } : {}}
                        >
                          <t.icon size={12} /> {t.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-black/20 rounded-xl p-4">
                      {/* TAB: What It Is */}
                      {tab === 'is' && (
                        <div>
                          <p className="text-xs text-[#A0AEC0] leading-relaxed mb-3">{layer.whatItIs}</p>
                          <div className="border-t border-white/[0.06] pt-3">
                            <p className="text-[10px] font-bold text-white/60 mb-1.5 uppercase tracking-wider">Tech Stack</p>
                            <div className="flex flex-wrap gap-1.5">
                              {layer.techStack.map((ts) => (
                                <span key={ts} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-[#A0AEC0] border border-white/[0.04]">{ts}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB: What It Does */}
                      {tab === 'does' && (
                        <div className="space-y-2">
                          {layer.whatItDoes.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${layer.color}15` }}>
                                <span className="text-[9px] font-bold" style={{ color: layer.color }}>{i + 1}</span>
                              </div>
                              <p className="text-xs text-[#A0AEC0] leading-relaxed">{item}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* TAB: How It Helps */}
                      {tab === 'helps' && (
                        <div className="space-y-2">
                          {layer.howItHelps.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${layer.color}15` }}>
                                <Sparkles size={10} style={{ color: layer.color }} />
                              </div>
                              <p className="text-xs text-[#A0AEC0] leading-relaxed">{item}</p>
                            </div>
                          ))}
                          <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06] mt-2">
                            <Clock size={12} style={{ color: layer.color }} />
                            <span className="text-[10px] text-[#A0AEC0]">ETA: <span className="text-white font-semibold">{layer.eta}</span></span>
                          </div>
                        </div>
                      )}

                      {/* TAB: Coming Soon */}
                      {tab === 'soon' && (
                        <div className="space-y-3">
                          {layer.comingSoon.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${layer.color}20` }}>
                                <Rocket size={14} style={{ color: layer.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                  <p className="text-xs font-semibold text-white">{item.item}</p>
                                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${layer.color}15`, color: layer.color }}>{item.eta}</span>
                                </div>
                                <p className="text-[11px] text-[#A0AEC0] leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                            <Hammer size={12} style={{ color: layer.color }} />
                            <span className="text-[10px] text-[#A0AEC0]">Built by <span className="text-white font-semibold">Ad9x Engineering</span></span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Connected Platforms */}
                    <div className="mt-3 pt-3 border-t border-white/[0.06]">
                      <p className="text-[10px] font-bold text-white/40 mb-2 uppercase tracking-wider flex items-center gap-1">
                        <Link2 size={10} /> Connected Platforms
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.connectedPlatforms.map((p) => (
                          <a
                            key={p.name}
                            href={`#${p.route}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors no-underline"
                            style={{
                              backgroundColor: `${layer.color}10`,
                              borderColor: `${layer.color}25`,
                              color: layer.color,
                            }}
                          >
                            {p.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-white/[0.06]">
          <p className="text-[10px] text-[#6B7280]">Built by Ad9x Engineering • Ad9x Holdings, LLC • JamZia Networks™</p>
          <p className="text-[9px] text-[#6B7280] mt-1">Each layer is reviewed, tested, and deployed through the Operations Ledger.</p>
        </div>
      </main>
    </div>
  );
}
