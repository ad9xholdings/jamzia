// ═══════════════════════════════════════════════════════════════════
// JamZia Operations Ledger — 6 Artifact Families
// Smart Contract, Storage, Stream, Payment, Moderation, Audit
// Immutable, verifiable, cross-referenced
// ═══════════════════════════════════════════════════════════════════

export type ArtifactFamily = 'contract' | 'storage' | 'stream' | 'payment' | 'moderation' | 'audit';

export interface Artifact {
  id: string;
  family: ArtifactFamily;
  title: string;
  status: 'active' | 'pending' | 'sealed' | 'revoked';
  origin: string;      // which AI node created it
  ledgerIndex: string; // XRPL-style ledger sequence
  timestamp: number;
  hash: string;        // SHA-256 representation
  size: string;
  details: Record<string, string>;
}

export const ARTIFACT_FAMILIES: { id: ArtifactFamily; label: string; color: string; icon: string; description: string }[] = [
  { id: 'contract', label: 'Smart Contracts', color: '#F59E0B', icon: '▣', description: 'XRPL Hooks, escrow, royalty splits, licensing' },
  { id: 'storage', label: 'Storage', color: '#10B981', icon: '◆', description: 'Ad9x Mesh Storage, Ad9x Mesh Storage segments, encryption, redundancy' },
  { id: 'stream', label: 'Streams', color: '#A855F7', icon: '◑', description: 'JamStream Engine, CDN, transcode, broadcast sessions' },
  { id: 'payment', label: 'Payments', color: '#06B6D4', icon: '◊', description: 'WisdomPay, XRPL, SkyIvy, SkyLockr, settlement' },
  { id: 'moderation', label: 'Moderation', color: '#EF4444', icon: '◙', description: 'Content policy, KYC, AML, AEGIS-09 enforcement' },
  { id: 'audit', label: 'Audit Trail', color: '#C9A03F', icon: '◈', description: 'Immutable logs, governance, compliance, risk scoring' },
];

// ── Live Mock Ledger ──
const NOW = Date.now();
const DAY = 86400000;

export function generateMockLedger(): Artifact[] {
  const artifacts: Artifact[] = [];

  // Contracts
  artifacts.push(
    { id: 'CT-2026-0001', family: 'contract', title: 'ARD-v3.2 — Automated Royalty Distribution', status: 'active', origin: 'COVENANT-09', ledgerIndex: 'L-89734102', timestamp: NOW - DAY * 2, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '4.2 KB', details: { type: 'XRPL Hook', parties: 'JamZia + Creator Pool', revenueShare: '15%', settlement: '3.2s avg' } },
    { id: 'CT-2026-0002', family: 'contract', title: 'WILL-001 — White-Label Instance License', status: 'active', origin: 'COVENANT-09', ledgerIndex: 'L-89734115', timestamp: NOW - DAY * 1.5, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '8.7 KB', details: { type: 'White Label', parties: 'JamZia + Fearless Revolution Foundation', wlId: 'WL-001', brand: 'NoFearZia', domain: 'nofear.jamzia.tv' } },
    { id: 'CT-2026-0003', family: 'contract', title: 'CAL-2.1 — Content Access License', status: 'pending', origin: 'COVENANT-09', ledgerIndex: 'L-89734128', timestamp: NOW - DAY * 0.8, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '2.1 KB', details: { type: 'License', parties: 'JamVideo + Independent Studio', duration: '24 months', territory: 'Global' } },
  );

  // Storage
  artifacts.push(
    { id: 'ST-2026-0001', family: 'storage', title: 'JamVideo Archive — Q1 2026', status: 'active', origin: 'CONDUIT-09', ledgerIndex: 'L-89734001', timestamp: NOW - DAY * 3, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '847 TB', details: { segments: '12.4M', nodes: '22,847', redundancy: '3x', encryption: 'AES-256-GCM', availability: '99.95%' } },
    { id: 'ST-2026-0002', family: 'storage', title: 'JamAR Asset Bundle — Cotton Brick Road', status: 'active', origin: 'PRISM-09', ledgerIndex: 'L-89734045', timestamp: NOW - DAY * 1.2, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '2.3 GB', details: { segments: '34,200', nodes: '1,847', redundancy: '3x', encryption: 'AES-256-GCM', assetType: 'AR Models + Textures' } },
    { id: 'ST-2026-0003', family: 'storage', title: 'Audit Log — April 2026', status: 'sealed', origin: 'AEGIS-09', ledgerIndex: 'L-89734098', timestamp: NOW - DAY * 0.1, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '156 MB', details: { segments: '2,400', nodes: '180', redundancy: '5x', encryption: 'AES-256-GCM + HMAC', integrity: 'Verified' } },
  );

  // Streams
  artifacts.push(
    { id: 'SM-2026-0001', family: 'stream', title: 'JamLive — JamStream Engine Session #4829103', status: 'active', origin: 'CONDUIT-09', ledgerIndex: 'L-89734100', timestamp: NOW - DAY * 0.3, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '12.4 GB/hr', details: { viewers: '34,200', bitrate: '4K/1080p/720p/480p', latency: '<3s', orchestrator: 'lp-orchestrator-us-east-1', region: 'US-East' } },
    { id: 'SM-2026-0002', family: 'stream', title: 'JamBox Creator Stream — Multi-cast', status: 'active', origin: 'CONDUIT-09', ledgerIndex: 'L-89734112', timestamp: NOW - DAY * 0.1, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '3.1 GB/hr', details: { viewers: '8,900', bitrate: '1080p/720p', latency: '<2s', platforms: 'JamBox + JamLive + JamTok', region: 'Global' } },
  );

  // Payments
  artifacts.push(
    { id: 'PM-2026-0001', family: 'payment', title: 'SkyIvy Settlement Batch #892341', status: 'sealed', origin: 'VAULT-09', ledgerIndex: 'L-89734089', timestamp: NOW - DAY * 0.5, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '128 KB', details: { type: 'Batch Settlement', amount: '2,847,391 SkyIvy', parties: '3,421 creators', avgFee: '$0.0032', settlementTime: '3.2s' } },
    { id: 'PM-2026-0002', family: 'payment', title: 'WisdomPay — Cross-Border Remittance', status: 'active', origin: 'VAULT-09', ledgerIndex: 'L-89734120', timestamp: NOW - DAY * 0.2, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '4.2 KB', details: { type: 'Remittance', amount: '$50,000 USD', from: 'US', to: 'Nigeria', fee: '$0.47', settlementTime: '3.1s' } },
    { id: 'PM-2026-0003', family: 'payment', title: 'NoFearZia White-Label License Fee', status: 'sealed', origin: 'VAULT-09', ledgerIndex: 'L-89734135', timestamp: NOW - DAY * 0.6, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '2.8 KB', details: { type: 'License Fee', amount: '$12,000/mo', party: 'Fearless Revolution Foundation', wlId: 'WL-001', contract: 'WILL-001' } },
  );

  // Moderation
  artifacts.push(
    { id: 'MD-2026-0001', family: 'moderation', title: 'Content Policy Enforcement — Batch #48291', status: 'sealed', origin: 'AEGIS-09', ledgerIndex: 'L-89734072', timestamp: NOW - DAY * 0.4, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '89 KB', details: { reviewed: '12,847 items', flagged: '42', action: 'Removed/Warning', accuracy: '99.7%', model: 'AEGIS-09-v3.1' } },
    { id: 'MD-2026-0002', family: 'moderation', title: 'KYC Verification — New Tenant Onboarding', status: 'active', origin: 'AEGIS-09', ledgerIndex: 'L-89734130', timestamp: NOW - DAY * 0.1, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '1.2 MB', details: { type: 'KYC', party: 'New Partner Entity', status: 'Verified', checks: 'Identity + Document + Liveness', region: 'US/Canada' } },
  );

  // Audit
  artifacts.push(
    { id: 'AU-2026-0001', family: 'audit', title: '11-Layer Architecture Health Check', status: 'sealed', origin: 'PRIME-Σ', ledgerIndex: 'L-89734140', timestamp: NOW - DAY * 0.05, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '45 KB', details: { layers: '11/11', uptime: '99.97%', latency: '12ms avg', nodes: '9 active', issues: '0 critical, 2 minor' } },
    { id: 'AU-2026-0002', family: 'audit', title: 'AI Output Governance Review — April 2026', status: 'sealed', origin: 'AEGIS-09', ledgerIndex: 'L-89734142', timestamp: NOW - DAY * 0.02, hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''), size: '234 KB', details: { queries: '1,284,391', hallucinationRate: '0.02%', avgConfidence: '87%', flagged: '247', remediated: '245' } },
  );

  return artifacts;
}

// ── Ledger Statistics ──
export function getLedgerStats(artifacts: Artifact[]) {
  const byFamily = Object.fromEntries(ARTIFACT_FAMILIES.map(f => [f.id, { count: 0, size: 0, active: 0 }])) as Record<ArtifactFamily, { count: number; size: number; active: number }>;

  for (const a of artifacts) {
    byFamily[a.family].count++;
    if (a.status === 'active') byFamily[a.family].active++;
    // Parse size
    const sizeMatch = a.size.match(/([\d.]+)\s*(KB|MB|GB|TB)/);
    if (sizeMatch) {
      const val = parseFloat(sizeMatch[1]);
      const unit = sizeMatch[2];
      const mult = { KB: 1, MB: 1024, GB: 1024 * 1024, TB: 1024 * 1024 * 1024 }[unit] || 1;
      byFamily[a.family].size += val * mult;
    }
  }

  return byFamily;
}
