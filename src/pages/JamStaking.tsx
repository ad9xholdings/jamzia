/* ═══════════════════════════════════════════════════════════
   JamStaking — Staking Dashboard
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  TrendingUp, Wallet, Zap, Lock, Unlock, Info
} from 'lucide-react';

/* ── Types ── */
interface StakingPool {
  id: string;
  name: string;
  token: string;
  apy: number;
  tvl: string;
  staked: string;
  lockPeriod: string;
  myStake: string;
  myRewards: string;
  color: string;
}

/* ── Mock Data ── */
const POOLS: StakingPool[] = [
  { id: 's1', name: 'XRP Core', token: 'XRP', apy: 8.5, tvl: '$420M', staked: '180M XRP', lockPeriod: '7 days', myStake: '2,400 XRP', myRewards: '45.2 XRP', color: '#22c55e' },
  { id: 's2', name: 'SkyIvy Growth', token: 'SKYI', apy: 14.2, tvl: '$85M', staked: '1.2B SKYI', lockPeriod: '14 days', myStake: '50,000 SKYI', myRewards: '312 SKYI', color: '#7096D1' },
  { id: 's3', name: 'SkyLockr Secure', token: 'SKYL', apy: 10.8, tvl: '$62M', staked: '400M SKYL', lockPeriod: '30 days', myStake: '12,000 SKYL', myRewards: '89.4 SKYL', color: '#f59e0b' },
  { id: 's4', name: 'JamCoin Launch', token: 'JAM', apy: 28.5, tvl: '$18M', staked: '5.2B JAM', lockPeriod: '90 days', myStake: '100,000 JAM', myRewards: '2,450 JAM', color: '#ec4899' },
  { id: 's5', name: 'Wisdom Governance', token: 'WISD', apy: 12.0, tvl: '$32M', staked: '28M WISD', lockPeriod: '14 days', myStake: '5,000 WISD', myRewards: '68 WISD', color: '#06b6d4' },
];

const STATS = [
  { label: 'Total Staked', value: '$617M', icon: Lock, color: '#22c55e' },
  { label: 'Avg APY', value: '14.8%', icon: TrendingUp, color: '#7096D1' },
  { label: 'My Stakes', value: '5', icon: Wallet, color: '#f59e0b' },
  { label: 'Rewards Earned', value: '$2,954', icon: Zap, color: '#ec4899' },
];

/* ── Main Component ── */
export default function JamStaking() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [action, setAction] = useState<'stake' | 'unstake'>('stake');

  const pool = POOLS.find(p => p.id === selectedPool);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-[#22c55e]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamStaking</h1>
                <p className="text-[10px] text-[#6B7280]">Earn Yield · 8-28% APY · Powered by WisdomPay™</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">{s.label}</span>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pool List */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-medium">Staking Pools</h2>
            {POOLS.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedPool(p.id)}
                className={`bg-[#0A0A0A] border rounded-xl p-4 cursor-pointer transition-colors ${
                  selectedPool === p.id ? 'border-[#22c55e]/50' : 'border-[#1F1F1F] hover:border-[#2A2A2A]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style={{ backgroundColor: p.color + '20', color: p.color }}>
                      {p.token[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{p.name}</h3>
                      <p className="text-[10px] text-[#6B7280]">{p.token} · {p.lockPeriod} lock</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: p.color }}>{p.apy}% APY</p>
                    <p className="text-[10px] text-[#6B7280]">TVL: {p.tvl}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-black rounded-lg p-2">
                    <p className="text-[10px] text-[#6B7280]">Total Staked</p>
                    <p className="font-medium">{p.staked}</p>
                  </div>
                  <div className="bg-black rounded-lg p-2">
                    <p className="text-[10px] text-[#6B7280]">My Stake</p>
                    <p className="font-medium">{p.myStake}</p>
                  </div>
                  <div className="bg-black rounded-lg p-2">
                    <p className="text-[10px] text-[#6B7280]">Rewards</p>
                    <p className="font-medium text-emerald-400">{p.myRewards}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stake Panel */}
          <div>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 sticky top-4">
              {pool ? (
                <>
                  <h3 className="text-sm font-medium mb-4">{action === 'stake' ? 'Stake' : 'Unstake'} {pool.token}</h3>

                  <div className="flex items-center gap-1 mb-4 bg-black rounded-lg p-1">
                    <button onClick={() => setAction('stake')} className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${action === 'stake' ? 'bg-[#22c55e] text-black' : 'text-[#6B7280]'}`}>
                      <Lock size={10} className="inline mr-1" />Stake
                    </button>
                    <button onClick={() => setAction('unstake')} className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${action === 'unstake' ? 'bg-[#ef4444] text-white' : 'text-[#6B7280]'}`}>
                      <Unlock size={10} className="inline mr-1" />Unstake
                    </button>
                  </div>

                  <div className="bg-black border border-[#1F1F1F] rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#6B7280]">Amount</span>
                      <span className="text-[10px] text-[#6B7280]">Bal: 12,400 {pool.token}</span>
                    </div>
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={e => setStakeAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-transparent text-xl font-bold outline-none placeholder-[#1F1F1F]"
                    />
                    <div className="flex gap-1 mt-2">
                      {[25, 50, 75, 100].map(pct => (
                        <button key={pct} className="flex-1 py-0.5 rounded text-[9px] bg-[#1F1F1F] text-[#6B7280] hover:text-white transition-colors">{pct}%</button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1F1F1F]/50 rounded-lg p-3 space-y-1.5 text-xs mb-4">
                    <div className="flex justify-between text-[#6B7280]">
                      <span>APY</span>
                      <span style={{ color: pool.color }}>{pool.apy}%</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Lock Period</span>
                      <span>{pool.lockPeriod}</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Est. Daily Reward</span>
                      <span className="text-emerald-400">
                        {stakeAmount ? ((parseFloat(stakeAmount) * pool.apy / 100) / 365).toFixed(4) : '0'} {pool.token}
                      </span>
                    </div>
                  </div>

                  <button className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                    action === 'stake' ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black' : 'bg-[#ef4444] hover:bg-[#dc2626] text-white'
                  }`}>
                    {action === 'stake' ? 'Confirm Stake' : 'Confirm Unstake'}
                  </button>

                  <div className="flex items-start gap-1.5 mt-3 text-[10px] text-[#6B7280]">
                    <Info size={10} className="shrink-0 mt-0.5" />
                    <span>Early unstaking incurs a 2% penalty fee. Rewards are distributed daily.</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp size={32} className="text-[#1F1F1F] mx-auto mb-3" />
                  <p className="text-sm text-[#6B7280]">Select a pool to stake</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
