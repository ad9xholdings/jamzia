import { useState } from 'react';
import {
  Rocket, TrendingUp, Users, Target, Crown,
  Zap, BarChart3, Lock, ArrowRight,
  Activity, ChevronUp
} from 'lucide-react';
import { brand } from '../config/brand';

const growthTactics = [
  { name: 'Viral Loop Builder', desc: 'Referral mechanics that compound', impact: '+34%', icon: '🔗', stage: 'Month 1-3' },
  { name: 'Network Effect Engine', desc: 'Connect users to multiply engagement', impact: '+28%', icon: '🕸️', stage: 'Month 2-4' },
  { name: 'Content Flywheel', desc: 'UGC that attracts more creators', impact: '+41%', icon: '🔄', stage: 'Month 3-6' },
  { name: 'Churn Prevention AI', desc: 'Predict and save at-risk users', impact: '-52%', icon: '🛡️', stage: 'Month 4-8' },
  { name: 'Expansion Revenue', desc: 'Upsell existing engaged users', impact: '+67%', icon: '💰', stage: 'Month 6-9' },
  { name: 'Enterprise Bridge', desc: 'B2B2C community licensing', impact: '+89%', icon: '🏢', stage: 'Month 9-12' },
];

const milestones = [
  { users: '1M', month: 'Month 3', label: 'Traction', color: '#60a5fa' },
  { users: '5M', month: 'Month 6', label: 'Momentum', color: '#7096D1' },
  { users: '20M', month: 'Month 9', label: 'Viral', color: '#a855f7' },
  { users: '50M', month: 'Month 11', label: 'Scale', color: '#f59e0b' },
  { users: '100M', month: 'Month 12', label: 'Community', color: '#22c55e' },
];

const caseStudies = [
  { network: 'CreatorHub', start: '12K', current: '2.4M', months: 8, tactic: 'Content Flywheel' },
  { network: 'FitFam', start: '45K', current: '8.7M', months: 10, tactic: 'Viral Loop Builder' },
  { network: 'DevConnect', start: '8K', current: '1.2M', months: 6, tactic: 'Network Effect Engine' },
  { network: 'ShopLocal', start: '120K', current: '15M', months: 11, tactic: 'Enterprise Bridge' },
];

function DoublingChart({ currentUsers }: { currentUsers: number }) {
  const months = Array.from({ length: 13 }, (_, i) => i);
  const data = months.map(m => ({
    month: m,
    users: m === 0 ? currentUsers : Math.min(currentUsers * Math.pow(2, m / 12), 100_000_000)}));

  const maxVal = 100_000_000;

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <BarChart3 size={14} className="text-emerald-400" />
        Doubling Projection: {currentUsers.toLocaleString()} → 100M Users
      </h3>
      <div className="flex items-end gap-1 h-48">
        {data.map((d, i) => {
          const height = Math.max((d.users / maxVal) * 100, 1);
          const isMilestone = milestones.some(m => d.users >= parseMilestone(m.users) && (i === 0 || data[i-1].users < parseMilestone(m.users)));
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
              {isMilestone && (
                <span className="absolute -top-4 text-[8px] text-emerald-400 font-bold">{formatUsers(d.users)}</span>
              )}
              <div
                className={`w-full rounded-t transition-all ${isMilestone ? 'bg-emerald-400' : 'bg-emerald-400/20 group-hover:bg-emerald-400/40'}`}
                style={{ height: `${height}%` }}
              />
              <span className="text-[8px] text-[#6B7280]">{i === 0 ? 'Now' : `M${i}`}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-3 text-[10px] text-[#6B7280]">
        <span>Starting: {currentUsers.toLocaleString()}</span>
        <span className="text-emerald-400 font-semibold">Target: 100M in 12 months</span>
      </div>
    </div>
  );
}

function parseMilestone(u: string): number {
  if (u.includes('M')) return parseFloat(u) * 1_000_000;
  if (u.includes('K')) return parseFloat(u) * 1_000;
  return parseFloat(u);
}

function formatUsers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toString();
}

export default function JamScale() {
  const [currentUsers, setCurrentUsers] = useState(50000);
  const [tab, setTab] = useState<'projector' | 'tactics' | 'cases'>('projector');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Rocket size={20} className="text-emerald-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Scale™</span>
          </div>
          <div className="flex items-center gap-2">
            <Crown size={14} className="text-amber-400" />
            <span className="text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">Network Only</span>
          </div>
        </div>
      </div>

      <main className="pt-16">
        {/* ─── HERO ─── */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-[800px] mx-auto text-center relative">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-4">
              <Zap size={12} />Exclusively through SORME™
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Double Your Community.<br />
              Every <span className="text-emerald-400">12 Months.</span>
            </h1>
            <p className="text-[#A0AEC0] text-base sm:text-lg max-w-xl mx-auto mb-4">
              {brand.prefix}Scale™ is the User Growth Engine that compounds until you reach{' '}
              <strong className="text-white">100 million active engaged users</strong>.
            </p>
            <p className="text-xs text-amber-400 mb-8">
              <Lock size={10} className="inline mr-1" />
              Network tier only — accessed exclusively via SORME™
            </p>

            {/* User Input */}
            <div className="max-w-[400px] mx-auto mb-6">
              <label className="text-xs text-[#6B7280] mb-2 block">Your Current Active Users</label>
              <input
                type="range"
                min="1000"
                max="50000000"
                step="1000"
                value={currentUsers}
                onChange={e => setCurrentUsers(Number(e.target.value))}
                className="w-full mb-2 accent-emerald-400"
              />
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  value={currentUsers}
                  onChange={e => setCurrentUsers(Math.min(Number(e.target.value), 50000000))}
                  className="bg-[#1A1F2E] text-white text-lg font-bold text-center rounded-xl px-4 py-2 outline-none border border-white/[0.08] w-40"
                />
                <span className="text-sm text-[#6B7280]">users</span>
              </div>
            </div>

            <DoublingChart currentUsers={currentUsers} />
          </div>
        </section>

        {/* ─── TABS ─── */}
        <section className="max-w-[1200px] mx-auto px-4 pb-12">
          <div className="flex justify-center gap-1 mb-8">
            {(['projector', 'tactics', 'cases'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${
                  tab === t ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'
                }`}>
                {t === 'cases' ? 'Success Stories' : t === 'projector' ? 'Growth Projector' : t}
              </button>
            ))}
          </div>

          {/* ─── PROJECTOR ─── */}
          {tab === 'projector' && (
            <>
              {/* Milestones */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                {milestones.map(m => (
                  <div key={m.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${m.color}20` }}>
                      <Target size={14} style={{ color: m.color }} />
                    </div>
                    <p className="text-xl font-bold text-white">{m.users}</p>
                    <p className="text-[10px] text-[#6B7280]">{m.month}</p>
                    <p className="text-[10px] font-semibold mt-0.5" style={{ color: m.color }}>{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { label: 'Monthly Growth', value: '+5.9%', sub: 'Doubling rate', icon: TrendingUp },
                  { label: 'Engagement Rate', value: '73%', sub: 'DAU / MAU', icon: Activity },
                  { label: 'Viral Coefficient', value: '1.34', sub: 'K-factor', icon: Users },
                  { label: 'Churn Saved', value: '-52%', sub: 'AI prevention', icon: Zap },
                ].map(s => (
                  <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
                    <s.icon size={20} className="mx-auto mb-2 text-emerald-400" />
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className="text-[10px] text-[#6B7280]">{s.label}</p>
                    <p className="text-[9px] text-emerald-400 mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-emerald-900/20 to-amber-900/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
                <Crown size={32} className="mx-auto text-amber-400 mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Network Tier Required</h3>
                <p className="text-sm text-[#A0AEC0] max-w-md mx-auto mb-4">
                  {brand.prefix}Scale™ is exclusively available at the Network tier and accessible only through SORME™. 
                  Upgrade to unlock the full growth engine.
                </p>
                <a href="#/landing" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-bold text-sm rounded-full hover:bg-amber-400 transition-colors no-underline">
                  Upgrade to Network
                  <ArrowRight size={14} />
                </a>
              </div>
            </>
          )}

          {/* ─── TACTICS ─── */}
          {tab === 'tactics' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {growthTactics.map((t, i) => (
                <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-emerald-500/20 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{t.icon}</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">{t.stage}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-[10px] text-[#6B7280] mt-1">{t.desc}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <ChevronUp size={12} className="text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-400">{t.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── CASES ─── */}
          {tab === 'cases' && (
            <div className="space-y-3">
              {caseStudies.map((c, i) => {
                const growth = ((parseFloat(c.current.replace(/[KM]/, '')) * (c.current.includes('M') ? 1_000_000 : 1_000)) / 
                  (parseFloat(c.start.replace(/[KM]/, '')) * (c.start.includes('M') ? 1_000_000 : 1_000)));
                return (
                  <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
                    <div className="sm:w-1/4">
                      <p className="text-lg font-bold text-white">{c.network}</p>
                      <p className="text-[10px] text-emerald-400">{c.tactic}</p>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-xs text-[#6B7280]">Start</p>
                        <p className="text-sm font-bold text-white">{c.start}</p>
                      </div>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style={{ width: `${Math.min((1 / growth) * 100, 100)}%` }} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[#6B7280]">Current</p>
                        <p className="text-sm font-bold text-emerald-400">{c.current}</p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-xs text-[#6B7280]">{c.months} months</p>
                      <p className="text-lg font-bold text-emerald-400">{growth.toFixed(0)}x</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom */}
        <p className="text-[10px] text-[#6B7280] text-center pb-8">
          {brand.prefix}Scale™ — Powered by Ad9x™ APIs for SORME™ • Network Tier Exclusive • 100M User Target
        </p>
      </main>
    </div>
  );
}
