// ═══════════════════════════════════════════════════════════════
//  WHITE-LABEL CONFIGURATION TEMPLATE
//  ═══════════════════════════════════════════════════════════════
//  To create a new white-label:
//  1. Copy this file
//  2. Change all values below
//  3. All components read from this config — no other files need changes
//  ═══════════════════════════════════════════════════════════════

// ─── STEP 1: Core Brand Identity ──────────────────────────────
const BRAND_NAME = 'JamZia';              // Your brand name
const BRAND_DOMAIN = 'jamzia.tv';         // Your domain
const BRAND_COMPANY = 'Ad9x Holdings, LLC'; // Legal entity
const BRAND_TAGLINE = 'AI powered Conduit Intelligence Advisory';
const BRAND_SUBLINE = 'The Everything App';  // What your platform IS

// ─── STEP 2: Parent Network ───────────────────────────────────
// Set to null if this IS the parent network (no "powered by")
// const PARENT_NETWORK = null;              // null = this IS the parent
const PARENT_NETWORK = 'Ad9x';            // Shows "Powered by Ad9x™"

// ─── STEP 3: Product Prefix ───────────────────────────────────
const PRODUCT_PREFIX = 'Jam';             // JamVideo, JamAudio, etc.
// const PRODUCT_PREFIX = 'Sky';          // JamVideo, JamAudio, etc.
// const PRODUCT_PREFIX = 'Your';         // YourVideo, YourAudio, etc.

// ─── STEP 4: Visual Identity ──────────────────────────────────
const PALETTE = '#000000 #081F5C #7096D1 #F7F2EB';
const COPYRIGHT_YEAR = 2026;

// ─── STEP 5: Hero Image ───────────────────────────────────────
const HERO_IMAGE = '/creators-engine.jpg';  // Replace with your hero image
const LOGO_IMAGE = '/creators-engine.jpg';  // Footer logo (no lock/cloud imagery)

// ═══════════════════════════════════════════════════════════════
//  DERIVED CONFIG — DO NOT EDIT BELOW THIS LINE
//  ═══════════════════════════════════════════════════════════════

const P = PRODUCT_PREFIX;
const isChildWL = PARENT_NETWORK !== null;
const poweredByText = isChildWL
  ? `Powered by ${PARENT_NETWORK}™`
  : `${BRAND_NAME} Networks™`;

export const brand = {
  name: BRAND_NAME,
  domain: BRAND_DOMAIN,
  company: BRAND_COMPANY,
  tagline: BRAND_TAGLINE,
  subline: BRAND_SUBLINE,
  parentNetwork: PARENT_NETWORK,
  poweredBy: poweredByText,
  isChildWhiteLabel: isChildWL,
  heroImage: HERO_IMAGE,
  logoImage: LOGO_IMAGE,

  prefix: PRODUCT_PREFIX,

  pricing: {
    monthly: '$299/mo',
    yearly: '$2,990/year',
    note: 'White-label available',
  },

  stats: [
    { value: 50, suffix: '+', label: 'PLATFORMS' },
    { value: 100, suffix: 'M+', label: 'SONGS' },
    { value: 10, suffix: 'K+', label: 'MOVIES' },
    { icon: '🌎', label: 'GLOBAL' },
  ],

  products: {
    video: {
      name: `${P}Video`,
      icon: '🎬',
      description: 'Original series, films, documentaries, sports & live events — 10K+ movies streaming now',
      layerLabel: `Layer 2: ${P}Movies™`,
      cta: 'Enter Universe →',
      href: '/video',
    },
    audio: {
      name: `${P}Audio`,
      icon: '🎵',
      description: 'Music streaming, podcasts, radio & audio books — 100M+ songs available',
      layerLabel: `Layer 2: ${P}Music™`,
      cta: 'Enter Universe →',
      href: '/audio',
    },
    play: {
      name: `${P}Play`,
      icon: '🎮',
      description: 'AR gaming & tournaments',
      layerLabel: '',
      cta: 'Enter →',
      href: '/architecture',
    },
    learn: {
      name: `${P}Learn`,
      icon: '🎓',
      description: 'Academy & courses',
      layerLabel: '',
      cta: 'Enter →',
      href: '/architecture',
    },
    social: {
      name: `${P}Social`,
      icon: '💬',
      description: 'Community & messaging with timeline fanout, social graph, and recommendation engine',
      layerLabel: '',
      cta: 'Enter →',
      href: '/social',
    },
    ads: {
      name: `${P}Ads`,
      icon: '📢',
      description: 'Advertising platform with targeting and analytics',
      layerLabel: '',
      cta: 'Enter →',
      href: '/architecture',
    },
    pay: {
      name: `WisdomPay™`,
      icon: '💎',
      description: 'Cross-border micropayments powered by Ad9x — minted on XRP Ledger with SkyIvy Coin & SkyLockr Coin (21T supply, 15 decimal places)',
      layerLabel: '',
      cta: 'Enter →',
      href: '/pay',
    },
    shop: {
      name: `${P}Shop`,
      icon: '🛒',
      description: 'Marketplace & store',
      layerLabel: '',
      cta: 'Enter →',
      href: '/shop',
    },
    cloud: {
      name: `${P}Cloud`,
      icon: '☁️',
      description: 'Distributed storage, encrypted file management, and global CDN delivery',
      layerLabel: '',
      cta: 'Enter →',
      href: '/architecture',
    },
    food: {
      name: `${P}Food`,
      icon: '🍔',
      description: 'Food ordering with menu, cart, and checkout',
      layerLabel: '',
      cta: 'Order →',
      href: '/food',
    },
    live: {
      name: `${P}Live`,
      icon: '📺',
      description: 'Live streaming with real-time chat and audience engagement',
      layerLabel: '',
      cta: 'Watch →',
      href: '/live',
    },
    earth: {
      name: `${P}Earth`,
      icon: '🌍',
      description: 'Climate intelligence with NASA, NOAA, and EPA environmental data',
      layerLabel: '',
      cta: 'Explore →',
      href: '/earth',
    },
    green: {
      name: `${P}Green`,
      icon: '🌿',
      description: 'Sustainable eco-marketplace with carbon offset tracking',
      layerLabel: '',
      cta: 'Shop →',
      href: '/green',
    },
    grow: {
      name: `${P}Grow`,
      icon: '🌱',
      description: 'Smart agriculture with crop monitoring and USDA data',
      layerLabel: '',
      cta: 'Grow →',
      href: '/grow',
    },
    weather: {
      name: `${P}Weather`,
      icon: '🌤️',
      description: 'Weather forecasts, air quality, and natural disaster alerts',
      layerLabel: '',
      cta: 'Check →',
      href: '/weather',
    },
    wise: {
      name: `${P}Wise`,
      icon: '🏛️',
      description: 'Financial intelligence, markets, and wealth building tools',
      layerLabel: '',
      cta: 'Invest →',
      href: '/wise',
    },
    box: {
      name: `${P}Box`,
      icon: '📦',
      description: 'Creator engine toolkit with analytics, calendar, and monetization',
      layerLabel: '',
      cta: 'Create →',
      href: '/box',
    },
    cat: {
      name: `${P}Cat`,
      icon: '🐈‍⬛',
      description: 'Premium marketplace with luxury auctions and verified sellers',
      layerLabel: '',
      cta: 'Bid →',
      href: '/cat',
    },
    tech: {
      name: `${P}Tech`,
      icon: '💾',
      description: 'Tech news, startup tracker, and patent intelligence',
      layerLabel: '',
      cta: 'Discover →',
      href: '/tech',
    },
    street: {
      name: `${P}Street`,
      icon: '🏘️',
      description: 'Community events, grassroots movements, and local culture',
      layerLabel: '',
      cta: 'Join →',
      href: '/street',
    },
    ar: {
      name: `${P}AR`,
      icon: '🥽',
      description: 'Augmented reality experiences and immersive worlds',
      layerLabel: '',
      cta: 'Launch →',
      href: '/ar',
    },
    tok: {
      name: `${P}Tok`,
      icon: '📱',
      description: 'Short-form video with trending content and creator discovery',
      layerLabel: '',
      cta: 'Watch →',
      href: '/tok',
    },
    words: {
      name: `${P}Words`,
      icon: '📖',
      description: 'Literacy and learning academy with vocabulary, grammar, and word games',
      layerLabel: '',
      cta: 'Learn →',
      href: '/words',
    },
    lab: {
      name: `${P}Lab`,
      icon: '🧪',
      description: 'Advertiser intelligence — target, identify, match, and activate audiences',
      layerLabel: '',
      cta: 'Control →',
      href: '/lab',
    },
    psych: {
      name: `${P}Psych`,
      icon: '🧠',
      description: "Miss Cotton's Academy — Psychology Mastery & Mental Health. 9 courses from music therapy to trauma recovery. 'A Message of Hope for the World'",
      layerLabel: '',
      cta: 'Heal →',
      href: '/psych',
    },
    therapy: {
      name: `${P}Therapy`,
      icon: '💚',
      description: 'Licensed Mental Health Therapy & Wellness — 4 core services, 6 specialized tracks, 24/7 crisis support, AI therapist matching, HIPAA-compliant. Platform 48.',
      layerLabel: '',
      cta: 'Connect →',
      href: '/therapy',
    },
    docs: {
      name: `${P}Docs`,
      icon: '📚',
      description: 'Complete API & Developer Documentation for DIY white-label replication of the JamZia Networks™ Master Ecosystem. SDKs, webhooks, code examples.',
      layerLabel: '',
      cta: 'Read →',
      href: '/docs',
    },
    pros: {
      name: `${P}Pros`,
      icon: '🛡️',
      description: 'Professional Services Network — JamDoctor™, JamLawyer™, JamCPA™, JamBankers™, JamBrokers™. Licensed professionals, HIPAA, attorney-client privilege.',
      layerLabel: '',
      cta: 'Hire →',
      href: '/pros',
    },
    kind: {
      name: `${P}Kind`,
      icon: '❤️',
      description: 'Custom audience builder — find fans of similar products, auto-sync to JamBuildr™ for solo ads',
      layerLabel: '',
      cta: 'Build →',
      href: '/kind',
    },
    tribute: {
      name: `${P}Tribute`,
      icon: '📊',
      description: 'A/B testing, auto-pivot campaigns, lead scoring, and full attribution funnel — Prime & Network only',
      layerLabel: '',
      cta: 'Optimize →',
      href: '/tribute',
    },
    scale: {
      name: `${P}Scale`,
      icon: '🚀',
      description: 'User Growth Engine — double your community every 12 months until 100M active engaged users — Network only via SORME™',
      layerLabel: '',
      cta: 'Grow →',
      href: '/scale',
    },
    med: {
      name: `${P}Med`,
      icon: '🏥',
      description: 'Medical intelligence — clinical data, provider networks, patient outcomes, and pharmaceutical indexing',
      layerLabel: '',
      cta: 'Search →',
      href: '/med',
    },
    dex: {
      name: `${P}DEX`,
      icon: '📇',
      description: 'Universal index — cross-platform directory engine, decentralized exchange mapping, and protocol aggregation',
      layerLabel: '',
      cta: 'Index →',
      href: '/dex',
    },
    grants: {
      name: `${P}Grants`,
      icon: '📝',
      description: 'Grant intelligence — federal, state, and private funding opportunity tracking with application pipeline',
      layerLabel: '',
      cta: 'Find →',
      href: '/grants',
    },
    credits: {
      name: `${P}Credits`,
      icon: '💳',
      description: 'Credit layer — financial scoring, micro-lending, reward tokenization, and cross-platform credit portability',
      layerLabel: '',
      cta: 'Score →',
      href: '/credits',
    },
    com: {
      name: `${P}Com`,
      icon: '📡',
      description: 'Communications backbone — unified messaging, VoIP, video conferencing, and broadcast infrastructure',
      layerLabel: '',
      cta: 'Connect →',
      href: '/com',
    },
    fed: {
      name: `${P}Fed`,
      icon: '🏛️',
      description: 'Federal layer — US government data aggregation, regulatory tracking, and federal program enrollment',
      layerLabel: '',
      cta: 'Access →',
      href: '/fed',
    },
    state: {
      name: `${P}State`,
      icon: '🏢',
      description: 'State layer — 50-state data hub, legislative tracking, state program portals, and intergovernmental coordination',
      layerLabel: '',
      cta: 'Navigate →',
      href: '/state',
    },
    local: {
      name: `${P}Local`,
      icon: '🏘️',
      description: 'Local layer — municipal data, community boards, neighborhood networks, and hyperlocal service directories',
      layerLabel: '',
      cta: 'Discover →',
      href: '/local',
    },
    law: {
      name: `${P}Law`,
      icon: '⚖️',
      description: 'Legal concepts, terminology, and public resources — entertainment and educational purposes only',
      layerLabel: '',
      cta: 'Explore →',
      href: '/law',
    },
    cpa: {
      name: `${P}CPA`,
      icon: '📊',
      description: 'Accounting concepts, bookkeeping basics, and tax education — entertainment and educational purposes only',
      layerLabel: '',
      cta: 'Learn →',
      href: '/cpa',
    },
    doctor: {
      name: `${P}Doctor`,
      icon: '🩺',
      description: 'Health education, anatomy explorer, and wellness concepts — entertainment and educational purposes only',
      layerLabel: '',
      cta: 'Explore →',
      href: '/doctor',
    },
    code: {
      name: `${P}Code`,
      icon: '💻',
      description: 'Programming concepts, tech stacks, and software architecture education — entertainment purposes only',
      layerLabel: '',
      cta: 'Build →',
      href: '/code',
    },
    mastery: {
      name: `${P}Mastery`,
      icon: '🎓',
      description: 'EduTech Mastery — every course in the world via AR creature collection learning. Never die, just freeze!',
      layerLabel: '',
      cta: 'Learn →',
      href: '/mastery',
    },
    auto: {
      name: `${P}Auto`,
      icon: '⚡',
      description: 'Content automation — create once, post everywhere. AI captions, scheduling, chatbots, comment automation. $597 lifetime.',
      layerLabel: '',
      cta: 'Automate →',
      href: '/auto',
    },
  },

  integrations: [
    {
      name: `${P}Cloud`,
      icon: '☁️',
      description: 'Distributed storage with encryption and global CDN delivery',
      href: '/integrations',
    },
    {
      name: `${P}Video`,
      icon: '🎬',
      description: 'Live streaming, VOD transcoding, and multi-format playback',
      href: '/integrations',
    },
    {
      name: `${P}CRM`,
      icon: '📊',
      description: 'Lead capture, pipeline management, and campaign automation',
      href: '/integrations',
    },
    {
      name: `${P}Ads Solo`,
      icon: '📢',
      description: 'Targeted advertising marketplace with click tracking',
      href: '/integrations',
    },
    {
      name: `${P}Ads Pro`,
      icon: '🎯',
      description: 'AI-powered campaign creation, targeting, and optimization',
      href: '/integrations',
    },
    {
      name: `${P}Monetize`,
      icon: '💰',
      description: 'Subscriptions, pay-per-view, tips, memberships, and revenue tools',
      href: '/integrations',
    },
  ],

  nav: {
    links: [
      { label: 'Platforms', href: '#platforms' },
      { label: 'Pricing', href: '/landing' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Admin', href: '/admin' },
    ],
    loginLabel: 'Login',
    ctaLabel: 'Get Access Now',
  },

  footer: {
    palette: PALETTE,
    copyrightYear: COPYRIGHT_YEAR,
  },
};

// Helper: generate product name with prefix
export function product(name: string): string {
  return `${brand.prefix}${name}`;
}

// Helper: generate "powered by" text for components
export function getPoweredBy(): string {
  return brand.poweredBy;
}
