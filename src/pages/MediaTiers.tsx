/* ═══════════════════════════════════════════════════════════
   MediaTiers — Storage & Streaming Pricing
   6 Tiers · Wholesale + Markup · Ad9x 20% · JamZia Margin
   "Let this big dog eat too."
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Layers, Check, X, HelpCircle, Calculator, TrendingUp, Database,
  Wifi, HardDrive, ArrowRight, Sparkles, Crown, Zap, Globe, Star
} from 'lucide-react';
import { trpc } from '@/providers/trpc';

const TIERS = [
  {
    key: 'entry',
    name: 'Entry',
    price: 9.99,
    yearly: 99.99,
    markup: 3.00,
    margin: 200,
    color: '#6B7280',
    icon: Database,
    storage: '5 GB',
    uploadSize: '500 MB',
    uploadDuration: '10 min',
    streams: 1,
    viewers: 100,
    abr: false,
    abrRes: 1,
    support: 'Basic',
    features: [
      '5GB Storage',
      '500MB Max Upload',
      '10min Video Length',
      '1 Simultaneous Stream',
      '100 Viewer Cap',
      'Basic Support',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 29.99,
    yearly: 299.99,
    markup: 2.50,
    margin: 150,
    color: '#22c55e',
    icon: Zap,
    storage: '50 GB',
    uploadSize: '2 GB',
    uploadDuration: '1 hour',
    streams: 2,
    viewers: 1000,
    abr: true,
    abrRes: 3,
    support: 'Priority',
    features: [
      '50GB Storage',
      '2GB Max Upload',
      '1hr Video Length',
      '2 Simultaneous Streams',
      '1,000 Viewer Cap',
      'ABR — 3 Resolutions',
      'Priority Support',
    ],
  },
  {
    key: 'master',
    name: 'Master',
    price: 79.99,
    yearly: 799.99,
    markup: 2.00,
    margin: 100,
    color: '#C9A03F',
    icon: Star,
    storage: '250 GB',
    uploadSize: '10 GB',
    uploadDuration: '2 hours',
    streams: 3,
    viewers: 10000,
    abr: true,
    abrRes: 4,
    support: 'Priority',
    features: [
      '250GB Storage',
      '10GB Max Upload',
      '2hr Video Length',
      '3 Simultaneous Streams',
      '10,000 Viewer Cap',
      'ABR — 4 Resolutions',
      '4K Uploads',
      'Monetization Tools',
    ],
  },
  {
    key: 'prime',
    name: 'Prime',
    price: 199.99,
    yearly: 1999.99,
    markup: 1.75,
    margin: 75,
    color: '#a855f7',
    icon: Crown,
    storage: '1 TB',
    uploadSize: '50 GB',
    uploadDuration: '4 hours',
    streams: 5,
    viewers: 100000,
    abr: true,
    abrRes: 5,
    support: 'Dedicated',
    features: [
      '1TB Storage',
      '50GB Max Upload',
      '4hr Video Length',
      '5 Simultaneous Streams',
      '100,000 Viewer Cap',
      'ABR — 5 Resolutions',
      '4K + 1440p',
      'Analytics Dashboard',
      'API Access',
      'Dedicated Support',
    ],
  },
  {
    key: 'network',
    name: 'Network',
    price: 499.99,
    yearly: 4999.99,
    markup: 1.50,
    margin: 50,
    color: '#ec4899',
    icon: Globe,
    storage: '5 TB',
    uploadSize: '100 GB',
    uploadDuration: '8 hours',
    streams: 10,
    viewers: 500000,
    abr: true,
    abrRes: 6,
    support: 'Account Manager',
    features: [
      '5TB Storage',
      '100GB Max Upload',
      '8hr Video Length',
      '10 Simultaneous Streams',
      '500,000 Viewer Cap',
      'ABR — 6 Resolutions',
      'HDR Support',
      'White Label Options',
      'Custom CDN Routing',
      'SLA 99.99%',
      'Account Manager',
    ],
  },
  {
    key: 'custom',
    name: 'Custom',
    price: 999.99,
    yearly: 9999.99,
    markup: 1.25,
    margin: 25,
    color: '#7096D1',
    icon: Sparkles,
    storage: 'Unlimited',
    uploadSize: 'Unlimited',
    uploadDuration: '24 hours',
    streams: 50,
    viewers: 2000000,
    abr: true,
    abrRes: 10,
    support: '24/7 White Glove',
    features: [
      'Unlimited Storage',
      'Unlimited Upload Size',
      '24hr Video Length',
      '50 Simultaneous Streams',
      '2,000,000 Viewer Cap',
      'All Resolutions + 8K',
      'HDR + Dolby Vision',
      'Custom JamDAVE™ Endpoint',
      'Dedicated Cluster',
      'SLA 99.999%',
      '24/7 White Glove Support',
      'Custom Contracts',
    ],
  },
];

export default function MediaTiers() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcTier, setCalcTier] = useState('custom');
  const [storageGb, setStorageGb] = useState(100);
  const [transferGb, setTransferGb] = useState(500);
  const [computeHours, setComputeHours] = useState(50);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const costQuery = trpc.billing.calculateCost.useQuery(
    { tier: calcTier as any, storageGb, transferGb, computeHours },
    { enabled: calcOpen }
  );

  const cost = costQuery.data;
  const selectedTier = TIERS.find(t => t.key === calcTier) || TIERS[5];

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A03F]/10 flex items-center justify-center">
                <Layers size={20} className="text-[#C9A03F]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Media Tiers</h1>
                <p className="text-[10px] text-[#6B7280]">JamDAVE™ Engine · DAW Integration · Storage · Streaming · ABR</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCalcOpen(!calcOpen)}
                className="px-4 py-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Calculator size={14} /> Cost Calculator
              </button>
              <div className="flex bg-[#1F1F1F] rounded-lg p-0.5">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-[#C9A03F] text-black' : 'text-[#6B7280]'}`}
                >Monthly</button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${billingCycle === 'yearly' ? 'bg-[#C9A03F] text-black' : 'text-[#6B7280]'}`}
                >Yearly <span className="text-[10px] opacity-70">Save 17%</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Business Model Banner */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#C9A03F]/10 flex items-center justify-center shrink-0">
              <TrendingUp size={20} className="text-[#C9A03F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold mb-1">How JamDAVE™ Pricing Works</h2>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Every tier covers wholesale infrastructure costs (storage, transfer, compute) plus a markup that funds platform development.
                <strong className="text-white"> Ad9x takes 20% of gross revenue</strong> as our platform fee — the same way you expect a spread when you invest.
                The markup is highest on Entry (3x) to make the platform accessible, and lowest on Custom (1.25x / 25% markup) for power users who drive volume.
                <strong className="text-[#C9A03F]"> The bottom line: these markups support our treasury, cover subscription expenses, and ensure JamZia remains profitable for all stakeholders.</strong>
                Let this big dog eat too.
              </p>
            </div>
          </div>
        </div>

        {/* Cost Calculator */}
        {calcOpen && (
          <div className="bg-[#0A0A0A] border border-[#C9A03F]/20 rounded-2xl p-6">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2"><Calculator size={16} /> Cost Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Tier</label>
                <select
                  value={calcTier}
                  onChange={e => setCalcTier(e.target.value)}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F]"
                >
                  {TIERS.map(t => <option key={t.key} value={t.key}>{t.name} ({t.margin}% margin)</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Storage (GB)</label>
                <input
                  type="number"
                  value={storageGb}
                  onChange={e => setStorageGb(Number(e.target.value))}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Transfer (GB)</label>
                <input
                  type="number"
                  value={transferGb}
                  onChange={e => setTransferGb(Number(e.target.value))}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Compute (hours)</label>
                <input
                  type="number"
                  value={computeHours}
                  onChange={e => setComputeHours(Number(e.target.value))}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F]"
                />
              </div>
            </div>

            {cost && (
              <div className="bg-black border border-[#1F1F1F] rounded-xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase mb-1">Wholesale Cost</p>
                    <p className="text-lg font-bold">${Number(cost.wholesaleTotal).toFixed(2)}</p>
                    <p className="text-[10px] text-[#6B7280]">What Ad9x pays</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase mb-1">Your Cost ({cost.markupMultiplier}x)</p>
                    <p className="text-lg font-bold text-[#C9A03F]">${Number(cost.retailTotal).toFixed(2)}</p>
                    <p className="text-[10px] text-[#6B7280]">With markup applied</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase mb-1">Ad9x Fee (20%)</p>
                    <p className="text-lg font-bold text-red-400">${Number(cost.ad9xFee).toFixed(2)}</p>
                    <p className="text-[10px] text-[#6B7280]">Platform fee</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase mb-1">JamZia Margin</p>
                    <p className="text-lg font-bold text-emerald-400">${Number(cost.jamziaMargin).toFixed(2)}</p>
                    <p className="text-[10px] text-[#6B7280]">Kept by JamZia</p>
                  </div>
                </div>
                <button onClick={() => setShowBreakdown(!showBreakdown)} className="text-xs text-[#7096D1] hover:underline flex items-center gap-1">
                  <HelpCircle size={12} /> {showBreakdown ? 'Hide' : 'Show'} breakdown
                </button>
                {showBreakdown && (
                  <div className="mt-3 pt-3 border-t border-[#1F1F1F] grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-[#6B7280] mb-1">Storage: ${Number(cost.breakdown.storage.wholesale).toFixed(2)} wholesale → ${Number(cost.breakdown.storage.retail).toFixed(2)} retail</p>
                      <p className="text-[#6B7280]">Transfer: ${Number(cost.breakdown.transfer.wholesale).toFixed(2)} wholesale → ${Number(cost.breakdown.transfer.retail).toFixed(2)} retail</p>
                      <p className="text-[#6B7280]">Compute: ${Number(cost.breakdown.compute.wholesale).toFixed(2)} wholesale → ${Number(cost.breakdown.compute.retail).toFixed(2)} retail</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#6B7280] leading-relaxed">{cost.message}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIERS.map(tier => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.key}
                className={`bg-[#0A0A0A] border rounded-2xl p-5 relative ${
                  tier.key === 'custom' ? 'border-[#7096D1]/40' : 'border-[#1F1F1F]'
                }`}
              >
                {tier.key === 'custom' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#7096D1] text-black text-[10px] font-bold rounded-full">
                    BEST RATE
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tier.color}15` }}>
                    <Icon size={18} style={{ color: tier.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold">{tier.name}</h3>
                    <p className="text-[10px] text-[#6B7280]">{tier.margin}% margin · {tier.markup}x markup</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold">${billingCycle === 'monthly' ? tier.price : tier.yearly}</span>
                  <span className="text-sm text-[#6B7280]">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  {billingCycle === 'yearly' && (
                    <p className="text-[10px] text-emerald-400">Save ${((tier.price * 12) - tier.yearly).toFixed(2)}/year</p>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#6B7280]"><HardDrive size={12} />Storage</span>
                    <span className="font-medium">{tier.storage}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#6B7280]"><Database size={12} />Max Upload</span>
                    <span className="font-medium">{tier.uploadSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#6B7280]"><Wifi size={12} />Streams</span>
                    <span className="font-medium">{tier.streams} simultaneous</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#6B7280]"><Globe size={12} />Viewer Cap</span>
                    <span className="font-medium">{tier.viewers.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  {tier.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs">
                      <Check size={12} style={{ color: tier.color }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setCalcTier(tier.key); setCalcOpen(true); }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold transition-colors"
                  style={{
                    backgroundColor: tier.key === 'custom' ? '#7096D1' : '#1F1F1F',
                    color: tier.key === 'custom' ? '#000' : '#fff',
                  }}
                >
                  {tier.key === 'custom' ? 'Get Custom Rate' : 'Calculate Cost'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Wholesale vs Retail Transparency */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} /> Wholesale vs Retail Transparency</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1F1F1F]">
                  <th className="text-left py-2 px-3 text-[#6B7280] font-medium">Tier</th>
                  <th className="text-right py-2 px-3 text-[#6B7280] font-medium">Storage/GB</th>
                  <th className="text-right py-2 px-3 text-[#6B7280] font-medium">Transfer/GB</th>
                  <th className="text-right py-2 px-3 text-[#6B7280] font-medium">Compute/hr</th>
                  <th className="text-right py-2 px-3 text-[#6B7280] font-medium">Markup</th>
                  <th className="text-right py-2 px-3 text-[#6B7280] font-medium">You Pay</th>
                  <th className="text-right py-2 px-3 text-[#6B7280] font-medium">Ad9x 20%</th>
                  <th className="text-right py-2 px-3 text-[#6B7280] font-medium">JamZia Keeps</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map(t => (
                  <tr key={t.key} className="border-b border-[#1F1F1F]/50">
                    <td className="py-2 px-3 font-medium">{t.name}</td>
                    <td className="text-right py-2 px-3 text-[#6B7280]">$0.023</td>
                    <td className="text-right py-2 px-3 text-[#6B7280]">$0.09</td>
                    <td className="text-right py-2 px-3 text-[#6B7280]">$0.05</td>
                    <td className="text-right py-2 px-3" style={{ color: t.color }}>{t.markup}x</td>
                    <td className="text-right py-2 px-3 text-[#C9A03F]">${(0.122 * t.markup).toFixed(3)}</td>
                    <td className="text-right py-2 px-3 text-red-400">${(0.122 * t.markup * 0.20).toFixed(3)}</td>
                    <td className="text-right py-2 px-3 text-emerald-400">${(0.122 * t.markup * 0.80 - 0.122).toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#6B7280] mt-3">
            Based on combined $0.122/GB blended wholesale rate. Custom tier at 1.25x markup delivers the best per-unit pricing in the industry.
            Ad9x 20% fee is deducted from retail — you always know exactly what you pay and where it goes.
          </p>
        </div>

        {/* ABR Explainer */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
          <h2 className="text-sm font-bold mb-3">Adaptive Bitrate (ABR) — Automatic Quality Adaptation</h2>
          <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
            ABR creates multiple resolution versions of your video automatically. Viewers get the best quality their connection can handle —
            no buffering, no manual quality selection. Higher tiers unlock more resolution variants, including 4K and HDR on Network/Custom.
          </p>
          <div className="flex items-center gap-3 text-xs overflow-x-auto">
            {[
              { res: '240p', rate: '400 kbps', tier: 'Entry+' },
              { res: '360p', rate: '800 kbps', tier: 'Pro+' },
              { res: '480p', rate: '1.2 Mbps', tier: 'Pro+' },
              { res: '720p', rate: '2.5 Mbps', tier: 'Pro+' },
              { res: '1080p', rate: '5 Mbps', tier: 'Master+' },
              { res: '1440p', rate: '8 Mbps', tier: 'Prime+' },
              { res: '4K', rate: '16 Mbps', tier: 'Network+' },
              { res: '8K', rate: '40 Mbps', tier: 'Custom' },
            ].map(r => (
              <div key={r.res} className="bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-center min-w-[80px]">
                <p className="font-bold">{r.res}</p>
                <p className="text-[10px] text-[#6B7280]">{r.rate}</p>
                <p className="text-[9px] text-[#C9A03F]">{r.tier}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
