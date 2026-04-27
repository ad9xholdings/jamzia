import { useState } from 'react';
import {
  BarChart3, GitCompare, TrendingUp, Target,
  Zap, Award, Lock, CheckCircle, Star
} from 'lucide-react';
import { brand } from '../config/brand';

type Tier = 'prime' | 'custom';

const tierConfig: Record<Tier, { name: string; tests: number; leads: string; attribution: string; api: string }> = {
  prime: { name: 'Prime', tests: 5, leads: '10K/mo', attribution: '30-day', api: 'Standard' },
  custom: { name: 'Network', tests: Infinity, leads: 'Unlimited', attribution: 'Lifetime', api: 'Full Access' }};

const abTests = [
  {
    id: 1, name: 'Camping Gear Headline', status: 'running', variantA: { name: 'Original: "Best Tents 2026"', ctr: 3.2, conv: 1.8, spend: 420 },
    variantB: { name: 'Test: "Don’t Get Soaked"', ctr: 5.7, conv: 3.4, spend: 380 }, winner: 'B', autoPivot: true},
  {
    id: 2, name: 'Fitness CTA Button Color', status: 'completed', variantA: { name: 'Blue "Buy Now"', ctr: 2.1, conv: 0.9, spend: 600 },
    variantB: { name: 'Red "Get Strong"', ctr: 2.4, conv: 1.1, spend: 600 }, winner: 'B', autoPivot: true},
  {
    id: 3, name: 'Finance Landing Hero Image', status: 'running', variantA: { name: 'Calculator Image', ctr: 4.1, conv: 2.2, spend: 800 },
    variantB: { name: 'Happy Family Image', ctr: 3.8, conv: 2.0, spend: 750 }, winner: null, autoPivot: false},
];

const funnel = [
  { stage: 'Impression', count: '2.4M', rate: '100%', color: '#60a5fa' },
  { stage: 'Click', count: '142K', rate: '5.9%', color: '#7096D1' },
  { stage: 'Landing', count: '98K', rate: '69%', color: '#a855f7' },
  { stage: 'Lead', count: '12.4K', rate: '12.7%', color: '#f59e0b' },
  { stage: 'Qualified', count: '3.8K', rate: '30.6%', color: '#f97316' },
  { stage: 'Customer', count: '892', rate: '23.5%', color: '#22c55e' },
];

const leadScores = [
  { id: 1, email: 'sarah.k@email.com', source: 'JamKind™ / Camping', score: 94, stage: 'Hot', pages: 12, time: '8m 32s', lastAction: 'Clicked pricing' },
  { id: 2, email: 'mike.r@company.com', source: 'JamLab™ / Target', score: 87, stage: 'Warm', pages: 9, time: '5m 18s', lastAction: 'Watched demo video' },
  { id: 3, email: 'lisa.m@biz.net', source: 'JamSolo™ / Ad', score: 72, stage: 'Warm', pages: 6, time: '3m 45s', lastAction: 'Downloaded guide' },
  { id: 4, email: 'james.t@org.io', source: 'Organic / SORME™', score: 61, stage: 'Cool', pages: 4, time: '2m 12s', lastAction: 'Read blog post' },
  { id: 5, email: 'anna.p@shop.co', source: 'JamKind™ / Fitness', score: 45, stage: 'Cold', pages: 2, time: '45s', lastAction: 'Bounced from home' },
  { id: 6, email: 'david.w@tech.ai', source: 'JamLab™ / Pixel', score: 98, stage: 'Hot', pages: 15, time: '12m 04s', lastAction: 'Started checkout' },
];

const attributionSources = [
  { source: 'JamKind™', leads: '4,200', pct: '34%', color: '#ec4899' },
  { source: 'JamLab™', leads: '3,100', pct: '25%', color: '#14b8a6' },
  { source: 'JamSolo™', leads: '2,800', pct: '23%', color: '#f59e0b' },
  { source: 'Organic/SORME', leads: '1,400', pct: '11%', color: '#7096D1' },
  { source: 'Direct', leads: '900', pct: '7%', color: '#6B7280' },
];

function ScoreBadge({ score }: { score: number }) {
  let color = '#ef4444';
  let label = 'Cold';
  if (score >= 90) { color = '#22c55e'; label = 'Hot'; }
  else if (score >= 70) { color = '#f59e0b'; label = 'Warm'; }
  else if (score >= 50) { color = '#f97316'; label = 'Cool'; }
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
      {label} ({score})
    </span>
  );
}

export default function JamTribute() {
  const [tier] = useState<Tier>('prime');
  const [tab, setTab] = useState<'dashboard' | 'abtests' | 'attribution' | 'leads'>('dashboard');
  const [expandedTest, setExpandedTest] = useState<number | null>(1);

  const config = tierConfig[tier];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-violet-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Tribute™</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/20">{config.name}</span>
          </div>
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs font-semibold text-violet-400 mb-3">
            <Zap size={12} />Exclusive to Prime &amp; Network
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            A/B Test. Auto-Pivot.<br />
            <span className="text-violet-400">Attribute Everything.</span>
          </h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            SORME™-powered attribution, lead scoring, and auto-optimization. Powered by Ad9x™ APIs.
          </p>
        </div>

        {/* Tier Limits Banner */}
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Lock size={16} className="text-violet-400" />
              <div>
                <p className="text-xs font-semibold text-white">Your Plan: {config.name}</p>
                <p className="text-[10px] text-[#6B7280]">
                  {config.tests === Infinity ? 'Unlimited' : config.tests} A/B tests • {config.leads} leads • {config.attribution} attribution • {config.api}
                </p>
              </div>
            </div>
            {tier === 'prime' && (
              <a href="#/landing" className="text-xs text-violet-400 hover:underline no-underline">
                Upgrade to Network →
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-6 flex-wrap">
          {(['dashboard', 'abtests', 'attribution', 'leads'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${
                tab === t ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'
              }`}>
              {t === 'abtests' ? 'A/B Tests' : t === 'leads' ? 'Lead Scores' : t}
            </button>
          ))}
        </div>

        {/* ─── DASHBOARD ─── */}
        {tab === 'dashboard' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Active Tests', value: abTests.filter(t => t.status === 'running').length.toString(), icon: GitCompare, sub: `of ${config.tests === Infinity ? '∞' : config.tests} max` },
                { label: 'Leads Scored', value: '12.4K', icon: Target, sub: 'This month' },
                { label: 'Avg. CTR Lift', value: '+47%', icon: TrendingUp, sub: 'vs. baseline' },
                { label: 'Attribution', value: '5 Sources', icon: Award, sub: 'Full funnel' },
              ].map(s => (
                <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
                  <s.icon size={20} className="mx-auto mb-2 text-violet-400" />
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[10px] text-[#6B7280]">{s.label}</p>
                  <p className="text-[9px] text-violet-400 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Funnel */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Target size={14} className="text-violet-400" />Full Attribution Funnel
              </h3>
              <div className="flex items-end gap-1 h-40 mb-3">
                {funnel.map((f, i) => {
                  const heights = ['100%', '35%', '24%', '12%', '6%', '3%'];
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] text-[#6B7280]">{f.rate}</span>
                      <div className="w-full rounded-t-lg transition-all relative group" style={{ height: heights[i], backgroundColor: f.color, minHeight: '4px' }}>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black border border-white/10 rounded-lg px-2 py-1 text-[9px] text-white whitespace-nowrap z-10">
                          {f.count}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-1">
                {funnel.map(f => (
                  <div key={f.stage} className="flex-1 text-center">
                    <p className="text-[9px] text-white font-medium">{f.stage}</p>
                    <p className="text-[8px] text-[#6B7280]">{f.count}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#6B7280] mt-3">Source: Ad9x™ Attribution API • SORME™ Funnel Tracking</p>
            </div>

            {/* Attribution Pie */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Lead Sources</h3>
                <div className="space-y-2">
                  {attributionSources.map(s => (
                    <div key={s.source} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-[#A0AEC0] flex-1">{s.source}</span>
                      <span className="text-xs text-white font-medium">{s.leads}</span>
                      <span className="text-[10px] text-[#6B7280] w-8 text-right">{s.pct}</span>
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: s.pct, backgroundColor: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Auto-Pivot Status</h3>
                {abTests.map(t => (
                  <div key={t.id} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                    <div className={`w-2 h-2 rounded-full ${t.status === 'running' ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span className="text-xs text-[#A0AEC0] flex-1">{t.name}</span>
                    {t.winner ? (
                      <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <CheckCircle size={10} />Winner: {t.winner}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#6B7280]">Testing...</span>
                    )}
                    {t.autoPivot && t.winner && (
                      <span className="text-[9px] bg-violet-500/10 text-violet-400 px-1.5 py-0.5 rounded-full">Auto-pivoted</span>
                    )}
                  </div>
                ))}
                <p className="text-[10px] text-[#6B7280] mt-2">Budget auto-shifts to winning variants. Powered by Ad9x™ APIs.</p>
              </div>
            </div>
          </>
        )}

        {/* ─── A/B TESTS ─── */}
        {tab === 'abtests' && (
          <div className="space-y-3">
            {tier === 'prime' && abTests.length > config.tests && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 flex items-center gap-2 text-amber-400 text-xs">
                <Lock size={12} />Prime plan limited to {config.tests} active tests. Upgrade to Network for unlimited.
              </div>
            )}
            {abTests.map(test => (
              <div key={test.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer"
                >
                  <GitCompare size={16} className="text-violet-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{test.name}</p>
                    <p className="text-[10px] text-[#6B7280]">
                      Variant A vs B • {test.status === 'running' ? 'Running' : 'Completed'}
                      {test.winner && <span className="text-green-400 ml-2">Winner: {test.winner}</span>}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${test.status === 'running' ? 'bg-green-400' : 'bg-amber-400'}`} />
                </button>

                {expandedTest === test.id && (
                  <div className="px-5 pb-4 border-t border-white/[0.06]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {/* Variant A */}
                      <div className={`p-3 rounded-xl border ${test.winner === 'A' ? 'border-green-500/30 bg-green-500/5' : 'border-white/[0.06]'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-white">Variant A</span>
                          {test.winner === 'A' && <Award size={14} className="text-amber-400" />}
                        </div>
                        <p className="text-[10px] text-[#6B7280] mb-2">{test.variantA.name}</p>
                        <div className="grid grid-cols-3 gap-1 text-center">
                          <div><p className="text-sm font-bold text-white">{test.variantA.ctr}%</p><p className="text-[8px] text-[#6B7280]">CTR</p></div>
                          <div><p className="text-sm font-bold text-white">{test.variantA.conv}%</p><p className="text-[8px] text-[#6B7280]">Conv</p></div>
                          <div><p className="text-sm font-bold text-white">${test.variantA.spend}</p><p className="text-[8px] text-[#6B7280]">Spend</p></div>
                        </div>
                      </div>

                      {/* Variant B */}
                      <div className={`p-3 rounded-xl border ${test.winner === 'B' ? 'border-green-500/30 bg-green-500/5' : 'border-white/[0.06]'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-white">Variant B</span>
                          {test.winner === 'B' && <Award size={14} className="text-amber-400" />}
                        </div>
                        <p className="text-[10px] text-[#6B7280] mb-2">{test.variantB.name}</p>
                        <div className="grid grid-cols-3 gap-1 text-center">
                          <div><p className="text-sm font-bold text-white">{test.variantB.ctr}%</p><p className="text-[8px] text-[#6B7280]">CTR</p></div>
                          <div><p className="text-sm font-bold text-white">{test.variantB.conv}%</p><p className="text-[8px] text-[#6B7280]">Conv</p></div>
                          <div><p className="text-sm font-bold text-white">${test.variantB.spend}</p><p className="text-[8px] text-[#6B7280]">Spend</p></div>
                        </div>
                      </div>
                    </div>

                    {test.autoPivot && test.winner && (
                      <div className="mt-3 flex items-center gap-2 text-[10px] text-green-400 bg-green-500/5 border border-green-500/20 rounded-lg px-3 py-2">
                        <Zap size={12} />Auto-pivoted: Budget shifted to Variant {test.winner} (+{((test.variantB.ctr / test.variantA.ctr - 1) * 100).toFixed(0)}% CTR lift)
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── ATTRIBUTION ─── */}
        {tab === 'attribution' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {attributionSources.map(s => (
              <div key={s.source} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <h3 className="text-sm font-semibold text-white">{s.source}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                    <p className="text-lg font-bold text-white">{s.leads}</p>
                    <p className="text-[10px] text-[#6B7280]">Leads</p>
                  </div>
                  <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                    <p className="text-lg font-bold" style={{ color: s.color }}>{s.pct}</p>
                    <p className="text-[10px] text-[#6B7280]">Share</p>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  Tracked via Ad9x™ {s.source === 'Organic/SORME' ? 'SEO + SORME™ Search' : s.source === 'Direct' ? 'Direct Traffic Pixel' : `${s.source} Integration`}
                </p>
              </div>
            ))}

            <div className="col-span-1 sm:col-span-2 bg-violet-500/5 border border-violet-500/20 rounded-2xl p-5 text-center">
              <p className="text-sm text-[#A0AEC0]">
                Attribution data refreshed every <strong className="text-white">15 minutes</strong> via Ad9x™ API
              </p>
              <p className="text-[10px] text-[#6B7280] mt-1">
                {tier === 'prime' ? 'Prime: 30-day lookback window' : 'Network: Lifetime attribution'}
              </p>
            </div>
          </div>
        )}

        {/* ─── LEAD SCORES ─── */}
        {tab === 'leads' && (
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Star size={14} className="text-violet-400" />Scored Leads
              </h3>
              <span className="text-[10px] text-[#6B7280]">{config.leads} included</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] text-[#6B7280] uppercase tracking-wider border-b border-white/[0.06]">
                    <th className="text-left px-4 py-3">Lead</th>
                    <th className="text-left px-4 py-3">Source</th>
                    <th className="text-left px-4 py-3">Score</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Pages</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Time</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Last Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {leadScores.map(l => (
                    <tr key={l.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-xs text-white">{l.email}</td>
                      <td className="px-4 py-3 text-[10px] text-[#A0AEC0]">{l.source}</td>
                      <td className="px-4 py-3"><ScoreBadge score={l.score} /></td>
                      <td className="px-4 py-3 text-xs text-white hidden sm:table-cell">{l.pages}</td>
                      <td className="px-4 py-3 text-[10px] text-[#6B7280] hidden sm:table-cell">{l.time}</td>
                      <td className="px-4 py-3 text-[10px] text-[#A0AEC0] hidden md:table-cell">{l.lastAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-white/[0.06] text-center">
              <p className="text-[10px] text-[#6B7280]">
                Scoring model: Pages visited (30%) + Time on site (25%) + CTA clicks (25%) + Source quality (20%) • Powered by Ad9x™
              </p>
            </div>
          </div>
        )}

        {/* Bottom */}
        <p className="text-[10px] text-[#6B7280] text-center mt-8">
          {brand.prefix}Tribute™ — Powered by Ad9x™ APIs for SORME™ • {tier === 'prime' ? 'Prime (Limited)' : 'Network (Full)'}
        </p>
      </main>
    </div>
  );
}
