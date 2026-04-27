// ═══════════════════════════════════════════════════════════════════
// JamZia AI Core — 9-Node Architecture
// Codename registry, intent routing, and mesh orchestration
// Ad9x AI Node Architecture v2.0 — 9-Node Codename Mesh
// ═══════════════════════════════════════════════════════════════════

export interface AINode {
  id: string;
  codename: string;
  role: string;
  domain: string;
  description: string;
  color: string;
  icon: string;
  weight: number;
  affinity: string[]; // keywords that trigger this node
}

export const AI_NODES: AINode[] = [
  {
    id: 'prime',
    codename: 'PRIME-Σ',
    role: 'Strategic Router',
    domain: 'Intent Classification & Mesh Dispatch',
    description: 'Primary orchestration node. Classifies user intent, plans execution paths, and dispatches sub-queries to specialist nodes. Every query passes through PRIME-Σ before fan-out.',
    color: '#C9A03F',
    icon: '◈',
    weight: 0.95,
    affinity: ['route', 'plan', 'strategy', 'orchestrate', 'classify', 'intent', 'dispatch', 'direct', 'manage', 'coordinate'],
  },
  {
    id: 'atlas',
    codename: 'ATLAS-09',
    role: 'Knowledge Graph',
    domain: 'JamZia Entities, Partners, Catalog, Policies',
    description: 'Maps all 50+ JamZia platforms, partner networks, service catalog, and governance policies. Provides entity resolution, relationship tracking, and cross-platform intelligence.',
    color: '#7096D1',
    icon: '◉',
    weight: 0.93,
    affinity: ['platform', 'entity', 'partner', 'catalog', 'policy', 'directory', 'registry', 'index', 'lookup', 'find'],
  },
  {
    id: 'ledge',
    codename: 'LEDGE-09',
    role: 'Commerce Ledger',
    domain: 'Product Creation, SKUs, Royalties, Inventory',
    description: 'Tracks all commercial activity across JamZia — product listings, SKU management, royalty calculations, inventory levels, and revenue attribution per platform and partner.',
    color: '#10B981',
    icon: '◆',
    weight: 0.91,
    affinity: ['commerce', 'product', 'sku', 'royalty', 'inventory', 'revenue', 'sales', 'marketplace', 'shop', 'sell'],
  },
  {
    id: 'vault',
    codename: 'VAULT-09',
    role: 'Payments Risk',
    domain: 'WisdomPay Rails, Fraud, KYC, Settlement',
    description: 'Manages all payment flows via WisdomPay™ on XRPL. Handles fraud detection, KYC verification, transaction settlement, and cross-border compliance. SkyIvy and SkyLockr token tracking.',
    color: '#06B6D4',
    icon: '◊',
    weight: 0.92,
    affinity: ['payment', 'wisdompay', 'xrpl', 'fraud', 'kyc', 'settlement', 'wallet', 'token', 'skyivy', 'skylockr', 'transaction'],
  },
  {
    id: 'covenant',
    codename: 'COVENANT-09',
    role: 'Contract Executor',
    domain: 'Smart Contracts, Splits, Escrow, Royalty Engine',
    description: 'Executes and monitors smart contracts on XRPL Hooks. Handles automated royalty splits, escrow management, content licensing (WILL), and dispute resolution. Immutable audit trail.',
    color: '#F59E0B',
    icon: '▣',
    weight: 0.90,
    affinity: ['contract', 'smart contract', 'escrow', 'split', 'royalty', 'license', 'hook', 'agreement', 'legal', 'binding'],
  },
  {
    id: 'prism',
    codename: 'PRISM-09',
    role: 'Media Intelligence',
    domain: 'Mixing, Mastering, AR/Games, Asset Tagging',
    description: 'Powers RockNext production pipeline — AI-assisted mixing, stem separation, spatial audio, AR asset generation, and game content tagging. Media fingerprinting and content ID.',
    color: '#EC4899',
    icon: '◐',
    weight: 0.88,
    affinity: ['media', 'music', 'video', 'mix', 'master', 'ar', 'game', 'asset', 'tag', 'fingerprint', 'content id', 'production'],
  },
  {
    id: 'conduit',
    codename: 'CONDUIT-09',
    role: 'Distribution Ops',
    domain: 'Streaming, CDN, Transcode, Release Windows',
    description: 'Operates JamStream Engine orchestrator network, CDN edge distribution, adaptive bitrate transcoding, and release window management. Handles JamVideo, JamLive, JamBox, and AR streams.',
    color: '#A855F7',
    icon: '◑',
    weight: 0.89,
    affinity: ['stream', 'cdn', 'transcode', 'live', 'broadcast', 'distribute', 'release', 'video', 'peer', 'edge'],
  },
  {
    id: 'keystone',
    codename: 'KEYSTONE-09',
    role: 'Partner White Label',
    domain: 'Retail Tenant Config, Branding, Advisory Tenants',
    description: 'Manages white-label instances like NoFearZia™ (WL-001). Handles tenant configuration, brand kit binding, custom domain mapping, and advisory tenant onboarding for Conduit Capital AI.',
    color: '#22C55E',
    icon: '◇',
    weight: 0.87,
    affinity: ['white label', 'tenant', 'partner', 'branding', 'domain', 'frf', 'no fear', 'conduit', 'advisory', 'retail'],
  },
  {
    id: 'aegis',
    codename: 'AEGIS-09',
    role: 'Governance & Risk',
    domain: 'Compliance, Moderation, Audit Trail, Policy',
    description: 'Enforces JamZia governance across all platforms — content moderation, KYC/AML compliance, policy enforcement, audit trail sealing, and risk scoring for all AI-generated outputs.',
    color: '#EF4444',
    icon: '◙',
    weight: 0.94,
    affinity: ['governance', 'compliance', 'moderation', 'audit', 'risk', 'policy', 'legal', 'security', 'privacy', 'kyc', 'aml'],
  },
];

export const NODE_BY_ID = Object.fromEntries(AI_NODES.map(n => [n.id, n]));

// ── Intent Classification ──
export interface IntentResult {
  primary: string;      // node id
  secondary: string[];  // node ids
  confidence: number;
  domains: string[];
}

export function classifyIntent(query: string): IntentResult {
  const q = query.toLowerCase();
  const scores: { id: string; score: number }[] = AI_NODES.map(node => {
    let score = 0;
    for (const kw of node.affinity) {
      if (q.includes(kw)) score += 3;
      // Partial word matches
      const words = kw.split(/\s+/);
      for (const w of words) {
        if (w.length > 3 && q.includes(w)) score += 1;
      }
    }
    return { id: node.id, score };
  });

  scores.sort((a, b) => b.score - a.score);

  const primary = scores[0].id;
  const secondary = scores.slice(1, 4).filter(s => s.score > 0).map(s => s.id);
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const confidence = Math.min(0.98, 0.45 + (scores[0].score / Math.max(1, totalScore)) * 0.5);

  const domains = AI_NODES
    .filter(n => n.id === primary || secondary.includes(n.id))
    .map(n => n.domain);

  return { primary, secondary, confidence, domains };
}

// ── Routing Path Builder ──
export interface RoutingPath {
  steps: { node: string; action: string; eta: string }[];
  totalLatency: string;
}

export function buildRoutingPath(intent: IntentResult, _tier: string): RoutingPath {
  const steps = [
    { node: 'PRIME-Σ', action: 'Intent classification', eta: '~12ms' },
    ...[intent.primary, ...intent.secondary].map((nodeId, i) => ({
      node: NODE_BY_ID[nodeId]?.codename || nodeId,
      action: i === 0 ? 'Primary query execution' : 'Secondary enrichment',
      eta: `~${20 + i * 15}ms`,
    })),
    { node: 'PRIME-Σ', action: 'Response fusion & governance', eta: '~8ms' },
  ];

  const totalMs = 12 + intent.secondary.length * 25 + 45;
  return {
    steps,
    totalLatency: `${totalMs}ms`,
  };
}

// ── Mesh Votes ──
export interface NodeVote {
  codename: string;
  confidence: number;
  recommendation: string;
  latency: string;
  signal: 'strong' | 'moderate' | 'weak' | 'none';
}

export function buildNodeVotes(intent: IntentResult, query: string): NodeVote[] {
  return AI_NODES.map(node => {
    const isActive = node.id === intent.primary || intent.secondary.includes(node.id);
    const score = isActive
      ? node.id === intent.primary ? 0.92 + Math.random() * 0.06 : 0.65 + Math.random() * 0.20
      : 0.10 + Math.random() * 0.15;

    let recommendation = 'No signal';
    if (isActive) {
      if (node.id === intent.primary) recommendation = `Lead executor for "${query.slice(0, 30)}..."`;
      else recommendation = `Supporting data for ${NODE_BY_ID[intent.primary]?.codename || intent.primary}`;
    }

    return {
      codename: node.codename,
      confidence: Math.round(score * 100) / 100,
      recommendation,
      latency: isActive ? `~${Math.floor(Math.random() * 40 + 10)}ms` : '—',
      signal: score > 0.85 ? 'strong' : score > 0.60 ? 'moderate' : score > 0.25 ? 'weak' : 'none',
    };
  });
}
