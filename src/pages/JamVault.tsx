/* ═══════════════════════════════════════════════════════════
   JamVault — Secure Asset Vault
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Shield, Lock, Unlock, Key,
  Wallet, Fingerprint, ShieldCheck,
  Users, History
} from 'lucide-react';

/* ── Types ── */
interface VaultAsset {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  usdValue: string;
  type: 'token' | 'nft' | 'document';
  protected: boolean;
  lastAccessed: string;
}

interface AccessLog {
  action: string;
  time: string;
  ip: string;
  status: 'success' | 'denied';
}

/* ── Mock Data ── */
const ASSETS: VaultAsset[] = [
  { id: 'v1', name: 'XRP', symbol: 'XRP', balance: '45,200', usdValue: '$105,768', type: 'token', protected: true, lastAccessed: '2 min ago' },
  { id: 'v2', name: 'SkyIvy', symbol: 'SKYI', balance: '1.2M', usdValue: '$100,800', type: 'token', protected: true, lastAccessed: '1 hr ago' },
  { id: 'v3', name: 'SkyLockr', symbol: 'SKYL', balance: '850K', usdValue: '$132,600', type: 'token', protected: false, lastAccessed: '3 hr ago' },
  { id: 'v4', name: 'JamCoin Genesis NFT', symbol: 'JAM-NFT', balance: '1', usdValue: '$25,000', type: 'nft', protected: true, lastAccessed: '1 day ago' },
  { id: 'v5', name: 'Ad9x Equity Token', symbol: 'A9X', balance: '50,000', usdValue: '$500,000', type: 'token', protected: true, lastAccessed: '5 min ago' },
  { id: 'v6', name: 'Incorporation Docs', symbol: 'DOC', balance: '3 files', usdValue: '—', type: 'document', protected: true, lastAccessed: '2 weeks ago' },
];

const ACCESS_LOGS: AccessLog[] = [
  { action: 'Vault unlocked', time: '2 min ago', ip: '203.0.113.45', status: 'success' },
  { action: 'XRP withdrawal request', time: '15 min ago', ip: '203.0.113.45', status: 'success' },
  { action: 'Failed auth attempt', time: '1 hr ago', ip: '198.51.100.22', status: 'denied' },
  { action: 'Multi-sig approved', time: '2 hr ago', ip: '203.0.113.45', status: 'success' },
  { action: 'Document download', time: '1 day ago', ip: '203.0.113.108', status: 'success' },
];

const SIGNERS = [
  { name: 'Cuz Cotton', role: 'Owner', weight: 3, status: 'active' as const },
  { name: 'Collective General', role: 'Guardian', weight: 2, status: 'active' as const },
  { name: 'Hardware Key', role: 'Cold Storage', weight: 1, status: 'active' as const },
  { name: 'Time Lock', role: 'Emergency', weight: 1, status: 'pending' as const },
];

/* ── Main Component ── */
export default function JamVault() {
  const [locked, setLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'assets' | 'access' | 'settings'>('assets');

  const totalValue = '$864,168';
  const protectedCount = ASSETS.filter(a => a.protected).length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                <Shield size={20} className="text-[#f59e0b]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamVault</h1>
                <p className="text-[10px] text-[#6B7280]">Secure Asset Vault · Multi-Sig · Time-Locked · Audited</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-[#f59e0b]"><ShieldCheck size={12} /> AES-256 + Multi-Sig</span>
              <button
                onClick={() => setLocked(!locked)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  locked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}
              >
                {locked ? <Lock size={12} /> : <Unlock size={12} />}
                {locked ? 'Locked' : 'Unlocked'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Value', value: totalValue, icon: Wallet, color: '#f59e0b' },
            { label: 'Assets', value: ASSETS.length.toString(), icon: Shield, color: '#22c55e' },
            { label: 'Protected', value: `${protectedCount}/${ASSETS.length}`, icon: Lock, color: '#7096D1' },
            { label: 'Signers', value: '3 of 4', icon: Users, color: '#ec4899' },
          ].map(s => (
            <div key={s.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">{s.label}</span>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-1 w-fit">
          {([['assets', 'Assets', Shield], ['access', 'Access Log', History], ['settings', 'Vault Settings', Key]] as const).map(([tab, label, Icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-[#f59e0b] text-black' : 'text-[#6B7280] hover:text-white'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'assets' && (
          <div className="space-y-3">
            {ASSETS.map(asset => (
              <div key={asset.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style={{ backgroundColor: asset.protected ? '#f59e0b15' : '#1F1F1F', color: asset.protected ? '#f59e0b' : '#6B7280' }}>
                      {asset.type === 'token' ? 'T' : asset.type === 'nft' ? 'N' : 'D'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm">{asset.name}</h3>
                        {asset.protected && <Lock size={10} className="text-[#f59e0b]" />}
                      </div>
                      <p className="text-[10px] text-[#6B7280]">{asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{asset.balance}</p>
                    <p className="text-xs text-[#6B7280]">{asset.usdValue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'access' && (
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#1F1F1F]">
              <h2 className="text-sm font-medium">Recent Access</h2>
            </div>
            <div className="divide-y divide-[#1F1F1F]/50">
              {ACCESS_LOGS.map((log, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    <span className="text-xs">{log.action}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span>{log.ip}</span>
                    <span>{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            {/* Multi-sig settings */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3">Multi-Signature Signers</h3>
              <div className="space-y-2">
                {SIGNERS.map((signer, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-black rounded-lg">
                    <div className="flex items-center gap-3">
                      <Fingerprint size={14} className={signer.status === 'active' ? 'text-emerald-400' : 'text-[#6B7280]'} />
                      <div>
                        <p className="text-xs font-medium">{signer.name}</p>
                        <p className="text-[10px] text-[#6B7280]">{signer.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">Weight: {signer.weight}</p>
                      <p className={`text-[10px] ${signer.status === 'active' ? 'text-emerald-400' : 'text-[#6B7280]'}`}>{signer.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#6B7280] mt-3">3 of 5 signatures required for withdrawals over $10,000</p>
            </div>

            {/* Time lock */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3">Time-Lock Settings</h3>
              <div className="space-y-2 text-xs text-[#6B7280]">
                <div className="flex justify-between"><span>Withdrawal delay</span><span className="text-white">24 hours</span></div>
                <div className="flex justify-between"><span>Max daily withdrawal</span><span className="text-white">$100,000</span></div>
                <div className="flex justify-between"><span>Emergency override</span><span className="text-emerald-400">Enabled (7-day cooldown)</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
