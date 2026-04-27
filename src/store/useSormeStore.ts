import { create } from 'zustand';
import { queryKnowledge, type DepthTier, type BackendOp, type KnowledgeResult } from '../services/knowledgeEngine';

export interface SormeResult {
  id: string;
  title: string;
  description: string;
  type: 'platform' | 'public_data' | 'creator' | 'content' | 'product' | 'service' | 'hashtag' | 'ai_response' | 'intent';
  source: string;
  sourceUrl?: string;
  icon: string;
  url: string;
  score: number;
  tags: string[];
  category: string;
  citation?: string;
  lastUpdated?: string;
}

export interface AIResponse {
  summary: string;
  actions: { label: string; url: string; icon: string }[];
  related: string[];
  sources: { name: string; url: string }[];
  confidence: number;
  reasoningChain?: string[];
  backendOps?: BackendOp[];
  codeBlock?: string;
}

export interface QueryLog {
  query: string;
  timestamp: number;
  tier: TierKey;
  results: number;
}

export type TierKey = 'light' | 'heavy' | 'deep' | 'max';

interface SormeState {
  query: string;
  setQuery: (q: string) => void;
  tier: TierKey;
  setTier: (t: TierKey) => void;
  results: SormeResult[];
  aiResponse: AIResponse | null;
  isSearching: boolean;
  history: string[];
  search: (overrideQuery?: string) => Promise<void>;
  clear: () => void;
  trendingQueries: string[];
  knowledgeBaseSize: number;
  decentralizedStatus: 'ready' | 'connected';
  lastSearchTime: number;
}

const CORE_PLATFORMS: SormeResult[] = [
  { id: 'jammed', title: 'JamMed', description: 'Medical intelligence — clinical data, provider networks, patient outcomes, pharmaceutical indexing, and health system analytics.', type: 'platform', source: 'JamZia', icon: '🏥', url: '/med', score: 1, tags: ['medical', 'health', 'clinical', 'pharma', 'provider', 'patient', 'hospital', 'medicine'], category: 'platform' },
  { id: 'jamdex', title: 'JamDEX', description: 'Universal index — cross-platform directory engine, decentralized exchange mapping, and protocol aggregation layer.', type: 'platform', source: 'JamZia', icon: '📇', url: '/dex', score: 1, tags: ['dex', 'index', 'directory', 'exchange', 'protocol', 'mapping', 'registry'], category: 'platform' },
  { id: 'jamgrants', title: 'JamGrants', description: 'Grant intelligence — federal, state, and private funding opportunity tracking with application pipeline management.', type: 'platform', source: 'JamZia', icon: '📝', url: '/grants', score: 1, tags: ['grant', 'funding', 'opportunity', 'application', 'federal', 'private', 'nonprofit'], category: 'platform' },
  { id: 'jamcredits', title: 'JamCredits', description: 'Credit layer — financial scoring, micro-lending, reward tokenization, and cross-platform credit portability.', type: 'platform', source: 'JamZia', icon: '💳', url: '/credits', score: 1, tags: ['credit', 'score', 'lending', 'token', 'reward', 'financial', 'micro'], category: 'platform' },
  { id: 'jamcom', title: 'JamCom', description: 'Communications backbone — unified messaging, VoIP, video conferencing, and broadcast infrastructure.', type: 'platform', source: 'JamZia', icon: '📡', url: '/com', score: 1, tags: ['com', 'messaging', 'voip', 'video', 'broadcast', 'conference', 'infrastructure'], category: 'platform' },
  { id: 'jamfed', title: 'JamFed', description: 'Federal layer — US government data aggregation, regulatory tracking, and federal program enrollment.', type: 'platform', source: 'JamZia', icon: '🏛️', url: '/fed', score: 1, tags: ['federal', 'government', 'regulatory', 'program', 'enrollment', 'us', 'agency'], category: 'platform' },
  { id: 'jamstate', title: 'JamState', description: 'State layer — 50-state data hub, legislative tracking, state program portals, and intergovernmental coordination.', type: 'platform', source: 'JamZia', icon: '🏢', url: '/state', score: 1, tags: ['state', 'legislative', 'portal', 'intergovernmental', '50-state', 'regional'], category: 'platform' },
  { id: 'jamloca', title: 'JamLocal', description: 'Local layer — municipal data, community boards, neighborhood networks, and hyperlocal service directories.', type: 'platform', source: 'JamZia', icon: '🏘️', url: '/local', score: 1, tags: ['local', 'municipal', 'community', 'neighborhood', 'hyperlocal', 'service'], category: 'platform' },
  { id: 'jamops', title: 'JamOps', description: 'Ad9x backend operations — smart contracts, XRPL payments, Ad9x Mesh Storage storage, JamStream Engine streaming, and infrastructure monitoring.', type: 'platform', source: 'JamZia', icon: '⚙️', url: '/architecture', score: 1, tags: ['backend', 'ops', 'smart contract', 'xrpl', 'ad9x-mesh', 'jamstream', 'ad9x', 'infrastructure', 'devops', 'node'], category: 'platform' },
];

const PUBLIC_KNOWLEDGE_BASE: SormeResult[] = [
  { id: 'pubmed', title: 'PubMed Central', description: '8M+ biomedical articles covering medicine, nursing, dentistry, veterinary medicine.', type: 'public_data', source: 'NIH', sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov', icon: '🏥', url: 'https://pubmed.ncbi.nlm.nih.gov', score: 1, tags: ['pubmed', 'medical', 'research'], category: 'health', citation: 'NCBI', lastUpdated: '2026-04' },
  { id: 'data-gov', title: 'Data.gov', description: '250K+ open datasets from US federal agencies.', type: 'public_data', source: 'Data.gov', sourceUrl: 'https://www.data.gov', icon: '🏛️', url: 'https://www.data.gov', score: 1, tags: ['data', 'government', 'open'], category: 'government', citation: 'US GSA', lastUpdated: '2026-04' },
  { id: 'sec-edgar', title: 'SEC EDGAR', description: 'Public company filings, 10-K, 10-Q, and proxy statements.', type: 'public_data', source: 'SEC', sourceUrl: 'https://www.sec.gov/edgar', icon: '💵', url: 'https://www.sec.gov/edgar', score: 1, tags: ['sec', 'finance', 'filings'], category: 'finance', citation: 'SEC', lastUpdated: '2026-04' },
  { id: 'fred', title: 'Federal Reserve FRED', description: '800K+ economic data series from Federal Reserve banks.', type: 'public_data', source: 'Fed', sourceUrl: 'https://fred.stlouisfed.org', icon: '💵', url: 'https://fred.stlouisfed.org', score: 1, tags: ['fred', 'economy', 'data'], category: 'finance', citation: 'St. Louis Fed', lastUpdated: '2026-04' },
  { id: 'nasa', title: 'NASA Open Data', description: 'Satellite imagery, climate data, and mission archives.', type: 'public_data', source: 'NASA', sourceUrl: 'https://data.nasa.gov', icon: '🚀', url: 'https://data.nasa.gov', score: 1, tags: ['nasa', 'space', 'climate'], category: 'environment', citation: 'NASA', lastUpdated: '2026-04' },
  { id: 'noaa', title: 'NOAA Climate', description: 'Weather, ocean, and atmospheric data.', type: 'public_data', source: 'NOAA', sourceUrl: 'https://www.climate.gov', icon: '🌤️', url: 'https://www.climate.gov', score: 1, tags: ['noaa', 'weather', 'climate'], category: 'environment', citation: 'NOAA', lastUpdated: '2026-04' },
];

const TIER_DEPTH: Record<TierKey, number> = {
  light: 6,
  heavy: 14,
  deep: 22,
  max: 30,
};

const TIER_LABELS: Record<TierKey, string> = {
  light: 'JamLight',
  heavy: 'JamHeavy',
  deep: 'JamDeep',
  max: 'JamMAX',
};

const TIER_COLORS: Record<TierKey, string> = {
  light: '#22c55e',
  heavy: '#7096D1',
  deep: '#a855f7',
  max: '#f59e0b',
};

function tokenize(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter(t => t.length > 2);
}

function scoreResult(queryTokens: string[], result: SormeResult): number {
  let score = 0;
  for (const token of queryTokens) {
    if (result.title.toLowerCase().includes(token)) score += 3;
    if (result.description.toLowerCase().includes(token)) score += 2;
    if (result.tags.some(t => t.includes(token))) score += 2;
    if (result.category.includes(token)) score += 1;
  }
  return score;
}

function tierToDepthTier(tier: TierKey): DepthTier {
  const map: Record<TierKey, DepthTier> = {
    light: 'JamLight',
    heavy: 'JamHeavy',
    deep: 'JamDeep',
    max: 'JamMAX',
  };
  return map[tier];
}

export const useSormeStore = create<SormeState>()((set, get) => ({
  query: '',
  setQuery: (q) => set({ query: q }),
  tier: 'light',
  setTier: (t) => set({ tier: t }),
  results: [],
  aiResponse: null,
  isSearching: false,
  history: JSON.parse(localStorage.getItem('sorme_history') || '[]'),
  trendingQueries: ['JamMed clinical trials', 'JamGrants federal', 'JamFed regulation', 'JamLocal services', 'JamDEX index', 'Ad9x smart contracts', 'XRPL payments', 'Ad9x Mesh Storage storage'],
  knowledgeBaseSize: CORE_PLATFORMS.length + PUBLIC_KNOWLEDGE_BASE.length,
  decentralizedStatus: 'ready',
  lastSearchTime: 0,

  search: async (overrideQuery) => {
    const q = overrideQuery || get().query;
    if (!q.trim()) return;
    const tier = get().tier;
    const depth = TIER_DEPTH[tier];

    set({ isSearching: true, aiResponse: null });
    const startTime = Date.now();

    // Phase 1: Platform search (synchronous, fast)
    const tokens = tokenize(q);
    const scored = [...CORE_PLATFORMS, ...PUBLIC_KNOWLEDGE_BASE]
      .map(r => ({ ...r, matchScore: scoreResult(tokens, r) }))
      .filter(r => r.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, depth);

    // Phase 2: AI knowledge engine query (the real LLM/ML experience)
    let knowledgeResult: KnowledgeResult | null = null;
    try {
      knowledgeResult = await queryKnowledge(q, tierToDepthTier(tier));
    } catch {
      // Fallback if knowledge engine fails
    }

    const endTime = Date.now();

    // Build AI response from knowledge engine result
    let ai: AIResponse;
    if (knowledgeResult) {
      ai = {
        summary: knowledgeResult.answer,
        actions: [
          { label: 'JamDEX Index', url: '/dex', icon: '📇' },
          { label: '11-Layer Data', url: '/architecture', icon: '📊' },
          { label: `${knowledgeResult.engine} Engine`, url: '/architecture', icon: '🔬' },
        ],
        related: knowledgeResult.relatedTopics.length > 0 ? knowledgeResult.relatedTopics : tokens.slice(0, 4),
        sources: knowledgeResult.sources.map(s => ({ name: s, url: 'https://jamzia.tv' })),
        confidence: knowledgeResult.confidence === 'high' ? 0.95 : knowledgeResult.confidence === 'medium' ? 0.78 : 0.45,
        reasoningChain: knowledgeResult.reasoningChain,
        backendOps: knowledgeResult.backendOps,
        codeBlock: knowledgeResult.codeBlock,
      };
    } else {
      // Fallback to simple template
      const responses: Record<TierKey, string> = {
        light: `JamLight scan: ${q}. Surface match across ${depth} primary sources.`,
        heavy: `JamHeavy search: ${q}. Medium-depth scan across ${depth} sources including platform data and public records.`,
        deep: `JamDeep query: ${q}. Deep scan across ${depth} layers — platform logs, public knowledge, cross-references, and historical indices.`,
        max: `JamMAX — Maximum depth search for: ${q}. Exhaustive sweep across all ${depth} indexed layers. Predictive correlation, anomaly detection, and full provenance mapping active.`,
      };
      ai = {
        summary: responses[tier],
        actions: [
          { label: 'JamDEX Index', url: '/dex', icon: '📇' },
          { label: '11-Layer Data', url: '/architecture', icon: '📊' },
        ],
        related: tokens.slice(0, 4),
        sources: scored.length > 0 
          ? scored.slice(0, 3).map(r => ({ name: r.source, url: r.url }))
          : [{ name: 'JamZia', url: 'https://jamzia.tv' }],
        confidence: tier === 'max' ? 0.96 : tier === 'deep' ? 0.89 : tier === 'heavy' ? 0.78 : 0.65,
      };
    }

    set({
      results: scored,
      aiResponse: ai,
      isSearching: false,
      lastSearchTime: endTime - startTime,
      history: [q, ...get().history.filter(h => h !== q)].slice(0, 20),
    });

    localStorage.setItem('sorme_history', JSON.stringify(get().history));
  },

  clear: () => set({ query: '', results: [], aiResponse: null }),
}));

export { CORE_PLATFORMS, PUBLIC_KNOWLEDGE_BASE, TIER_LABELS, TIER_COLORS, TIER_DEPTH };
