/* ═══════════════════════════════════════════════════════════
   JamDEX — Decentralized Exchange
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import {
  ArrowDownUp, Wallet,
  Activity, ChevronDown, BarChart3,
  Globe, Shield, Plus, Layers
} from 'lucide-react';

/* ── Types ── */
interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  tvl: string;
  color: string;
}

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  type: 'bid' | 'ask';
}

interface Trade {
  price: number;
  amount: number;
  time: string;
  type: 'buy' | 'sell';
}

interface Pool {
  pair: string;
  tvl: string;
  apr: string;
  volume24h: string;
  myLiquidity?: string;
}

/* ── Mock Data ── */
const TOKENS: Token[] = [
  { symbol: 'XRP', name: 'Ripple', price: 2.34, change24h: 5.2, volume24h: '$1.2B', tvl: '$890M', color: '#22c55e' },
  { symbol: 'SKYI', name: 'SkyIvy', price: 0.084, change24h: 12.5, volume24h: '$45M', tvl: '$120M', color: '#7096D1' },
  { symbol: 'SKYL', name: 'SkyLockr', price: 0.156, change24h: -3.1, volume24h: '$28M', tvl: '$85M', color: '#f59e0b' },
  { symbol: 'JAM', name: 'JamCoin', price: 0.0034, change24h: 28.4, volume24h: '$12M', tvl: '$45M', color: '#ec4899' },
  { symbol: 'WISD', name: 'Wisdom', price: 1.12, change24h: 1.8, volume24h: '$8M', tvl: '$32M', color: '#06b6d4' },
];

function generateOrderBook(type: 'bid' | 'ask'): OrderBookEntry[] {
  const entries: OrderBookEntry[] = [];
  const basePrice = type === 'bid' ? 0.082 : 0.086;
  const step = type === 'bid' ? -0.0002 : 0.0002;
  for (let i = 0; i < 12; i++) {
    const price = basePrice + step * i;
    const amount = Math.random() * 50000 + 5000;
    entries.push({ price, amount, total: price * amount, type });
  }
  return type === 'bid' ? entries.reverse() : entries;
}

function generateTrades(): Trade[] {
  const trades: Trade[] = [];
  const now = Date.now();
  for (let i = 0; i < 20; i++) {
    trades.push({
      price: 0.082 + Math.random() * 0.004,
      amount: Math.random() * 10000 + 1000,
      time: new Date(now - i * 30000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: Math.random() > 0.5 ? 'buy' : 'sell',
    });
  }
  return trades;
}

const POOLS: Pool[] = [
  { pair: 'XRP/SKYI', tvl: '$420M', apr: '24.5%', volume24h: '$85M', myLiquidity: '$2,400' },
  { pair: 'XRP/SKYL', tvl: '$210M', apr: '18.2%', volume24h: '$42M' },
  { pair: 'SKYI/SKYL', tvl: '$95M', apr: '32.1%', volume24h: '$18M', myLiquidity: '$850' },
  { pair: 'XRP/JAM', tvl: '$28M', apr: '45.8%', volume24h: '$12M' },
  { pair: 'WISD/SKYI', tvl: '$18M', apr: '28.4%', volume24h: '$6M' },
];

/* ── Sparkline SVG ── */
function Sparkline({ positive }: { positive: boolean }) {
  const points = Array.from({ length: 20 }, (_, i) => {
    const x = (i / 19) * 60;
    const y = 20 - (positive ? Math.random() * 15 + 2 : Math.random() * 15 + 3);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" className="opacity-60">
      <polyline points={points} fill="none" stroke={positive ? '#22c55e' : '#ef4444'} strokeWidth="1.5" />
    </svg>
  );
}

/* ── Main Component ── */
export default function JamDEX() {
  const [activeTab, setActiveTab] = useState<'swap' | 'pool' | 'tokens'>('swap');
  const [fromToken, _setFromToken] = useState('XRP');
  const [toToken, _setToToken] = useState('SKYI');
  const [fromAmount, setFromAmount] = useState('');
  const [orderBook] = useState(() => [...generateOrderBook('ask'), ...generateOrderBook('bid')]);
  const [trades] = useState(() => generateTrades());
  const [chartData, setChartData] = useState<number[]>([]);

  /* Generate chart data */
  useEffect(() => {
    const data = Array.from({ length: 50 }, () => 0.082 + Math.random() * 0.006);
    setChartData(data);
  }, [fromToken, toToken]);

  const selectedFrom = TOKENS.find(t => t.symbol === fromToken)!;
  const selectedTo = TOKENS.find(t => t.symbol === toToken)!;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
                <ArrowDownUp size={20} className="text-[#7096D1]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamDEX</h1>
                <p className="text-[10px] text-[#6B7280]">Decentralized Exchange · Powered by WisdomPay™</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <Globe size={12} className="text-emerald-400" />
                <span className="text-emerald-400">XRPL Mainnet</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity size={12} className="text-[#7096D1]" />
                <span className="text-[#6B7280]">TPS: 1,502</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={12} className="text-[#f59e0b]" />
                <span className="text-[#6B7280]">Audited</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total TVL', value: '$1.07B', change: '+5.2%', up: true },
            { label: '24h Volume', value: '$186M', change: '+12.8%', up: true },
            { label: 'Active Pairs', value: '48', change: '+3', up: true },
            { label: 'My Portfolio', value: '$4,250', change: '+8.4%', up: true },
          ].map(s => (
            <div key={s.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">{s.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold">{s.value}</span>
                <span className={`text-xs ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-1 w-fit mb-6">
          {([['swap', 'Swap', ArrowDownUp], ['pool', 'Liquidity', Layers], ['tokens', 'Tokens', BarChart3]] as const).map(([tab, label, Icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-[#7096D1] text-white' : 'text-[#6B7280] hover:text-white'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'swap' && (
              <>
                {/* Price Chart */}
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">${selectedTo.price.toFixed(4)}</span>
                        <span className={`text-sm ${selectedTo.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {selectedTo.change24h >= 0 ? '+' : ''}{selectedTo.change24h}%
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] mt-1">{fromToken}/{toToken} · Last 24h</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {['1H', '1D', '1W', '1M'].map(tf => (
                        <button key={tf} className="px-2 py-1 rounded text-[10px] bg-[#1F1F1F] text-[#6B7280] hover:text-white transition-colors">{tf}</button>
                      ))}
                    </div>
                  </div>
                  {/* Simple line chart */}
                  <svg viewBox="0 0 600 120" className="w-full h-32">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={selectedTo.change24h >= 0 ? '#22c55e' : '#ef4444'} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={selectedTo.change24h >= 0 ? '#22c55e' : '#ef4444'} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M0,${120 - (chartData[0] ?? 0) / 0.1} ${chartData.map((d, i) => `L${(i / (chartData.length - 1)) * 600},${120 - d / 0.1}`).join(' ')} L600,120 L0,120 Z`}
                      fill="url(#chartGrad)"
                    />
                    <polyline
                      points={chartData.map((d, i) => `${(i / (chartData.length - 1)) * 600},${120 - d / 0.1}`).join(' ')}
                      fill="none"
                      stroke={selectedTo.change24h >= 0 ? '#22c55e' : '#ef4444'}
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* Order Book + Trades */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                    <h3 className="text-sm font-medium mb-3">Order Book</h3>
                    <div className="space-y-1">
                      {orderBook.filter(o => o.type === 'ask').map((o, i) => (
                        <div key={`ask-${i}`} className="flex items-center text-xs">
                          <span className="w-1/3 text-red-400">{o.price.toFixed(5)}</span>
                          <span className="w-1/3 text-[#6B7280] text-right">{(o.amount / 1000).toFixed(1)}K</span>
                          <div className="w-1/3 pl-2">
                            <div className="h-1.5 bg-red-500/10 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500/30 rounded-full" style={{ width: `${Math.min(o.amount / 50000 * 100, 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="py-2 text-center text-lg font-bold text-[#7096D1]">0.08400</div>
                      {orderBook.filter(o => o.type === 'bid').map((o, i) => (
                        <div key={`bid-${i}`} className="flex items-center text-xs">
                          <span className="w-1/3 text-emerald-400">{o.price.toFixed(5)}</span>
                          <span className="w-1/3 text-[#6B7280] text-right">{(o.amount / 1000).toFixed(1)}K</span>
                          <div className="w-1/3 pl-2">
                            <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500/30 rounded-full" style={{ width: `${Math.min(o.amount / 50000 * 100, 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                    <h3 className="text-sm font-medium mb-3">Recent Trades</h3>
                    <div className="space-y-1 max-h-80 overflow-y-auto">
                      {trades.map((t, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className={t.type === 'buy' ? 'text-emerald-400' : 'text-red-400'}>{t.price.toFixed(5)}</span>
                          <span className="text-[#6B7280]">{(t.amount / 1000).toFixed(1)}K</span>
                          <span className="text-[#6B7280] text-[10px]">{t.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'pool' && (
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between">
                  <h3 className="text-sm font-medium">Liquidity Pools</h3>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7096D1] hover:bg-[#5a7fc0] rounded-lg text-xs font-medium transition-colors">
                    <Plus size={12} />
                    Add Liquidity
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1F1F1F] text-[#6B7280] text-xs">
                        <th className="text-left p-4 font-medium">Pool</th>
                        <th className="text-left p-4 font-medium">TVL</th>
                        <th className="text-left p-4 font-medium">APR</th>
                        <th className="text-left p-4 font-medium">24h Volume</th>
                        <th className="text-left p-4 font-medium">My Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {POOLS.map(pool => (
                        <tr key={pool.pair} className="border-b border-[#1F1F1F]/50 hover:bg-white/[0.02]">
                          <td className="p-4 font-medium">{pool.pair}</td>
                          <td className="p-4 text-[#6B7280]">{pool.tvl}</td>
                          <td className="p-4 text-emerald-400">{pool.apr}</td>
                          <td className="p-4 text-[#6B7280]">{pool.volume24h}</td>
                          <td className="p-4 text-[#7096D1]">{pool.myLiquidity ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'tokens' && (
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[#1F1F1F]">
                  <h3 className="text-sm font-medium">Top Tokens</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1F1F1F] text-[#6B7280] text-xs">
                        <th className="text-left p-4 font-medium">Token</th>
                        <th className="text-right p-4 font-medium">Price</th>
                        <th className="text-right p-4 font-medium">24h Change</th>
                        <th className="text-right p-4 font-medium">Volume</th>
                        <th className="text-right p-4 font-medium">TVL</th>
                        <th className="text-right p-4 font-medium">Chart</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOKENS.map(token => (
                        <tr key={token.symbol} className="border-b border-[#1F1F1F]/50 hover:bg-white/[0.02] transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${token.color}20`, color: token.color }}>
                                {token.symbol[0]}
                              </div>
                              <div>
                                <p className="font-medium">{token.name}</p>
                                <p className="text-xs text-[#6B7280]">{token.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right font-medium">${token.price < 0.01 ? token.price.toFixed(4) : token.price.toFixed(2)}</td>
                          <td className={`p-4 text-right ${token.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                          </td>
                          <td className="p-4 text-right text-[#6B7280]">{token.volume24h}</td>
                          <td className="p-4 text-right text-[#6B7280]">{token.tvl}</td>
                          <td className="p-4 text-right"><Sparkline positive={token.change24h >= 0} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Swap Panel */}
          {activeTab === 'swap' && (
            <div className="space-y-4">
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-medium">Swap</h3>
                {/* From */}
                <div className="bg-black border border-[#1F1F1F] rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">From</span>
                    <span className="text-xs text-[#6B7280]">Bal: 1,240 {fromToken}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={e => setFromAmount(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-xl font-bold outline-none placeholder-[#1F1F1F]"
                    />
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F1F] rounded-lg text-sm font-medium hover:bg-[#2A2A2A]">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: selectedFrom.color + '30', color: selectedFrom.color }}>
                        {fromToken[0]}
                      </div>
                      {fromToken}
                      <ChevronDown size={12} />
                    </button>
                  </div>
                  <div className="flex gap-1">
                    {[25, 50, 75, 100].map(pct => (
                      <button key={pct} className="px-2 py-0.5 rounded text-[10px] bg-[#1F1F1F] text-[#6B7280] hover:text-white transition-colors">{pct}%</button>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1 relative z-10">
                  <button className="p-2 bg-[#1F1F1F] rounded-xl border border-[#2A2A2A] hover:bg-[#2A2A2A] transition-colors">
                    <ArrowDownUp size={14} className="text-[#7096D1]" />
                  </button>
                </div>

                {/* To */}
                <div className="bg-black border border-[#1F1F1F] rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">To (estimated)</span>
                    <span className="text-xs text-[#6B7280]">Bal: 8,420 {toToken}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={fromAmount ? (parseFloat(fromAmount) * selectedFrom.price / selectedTo.price).toFixed(4) : ''}
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-xl font-bold outline-none placeholder-[#1F1F1F]"
                    />
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F1F] rounded-lg text-sm font-medium hover:bg-[#2A2A2A]">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: selectedTo.color + '30', color: selectedTo.color }}>
                        {toToken[0]}
                      </div>
                      {toToken}
                      <ChevronDown size={12} />
                    </button>
                  </div>
                </div>

                {/* Route info */}
                <div className="bg-[#1F1F1F]/50 rounded-lg p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Rate</span>
                    <span>1 {fromToken} = {(selectedFrom.price / selectedTo.price).toFixed(2)} {toToken}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Network Fee</span>
                    <span>~0.0002 XRP</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Slippage</span>
                    <span>0.5%</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-[#7096D1] hover:bg-[#5a7fc0] text-white rounded-xl font-medium transition-colors">
                  Swap
                </button>
              </div>

              {/* Wallet Preview */}
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={14} className="text-[#7096D1]" />
                  <span className="text-xs font-medium">Wallet</span>
                </div>
                <div className="space-y-2">
                  {TOKENS.slice(0, 3).map(t => (
                    <div key={t.symbol} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: t.color + '30', color: t.color }}>
                          {t.symbol[0]}
                        </div>
                        <span className="text-[#6B7280]">{t.symbol}</span>
                      </div>
                      <span className="font-medium">{(Math.random() * 10000 + 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pool sidebar */}
          {activeTab === 'pool' && (
            <div className="space-y-4">
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">My Liquidity</h3>
                <div className="text-center py-6">
                  <p className="text-2xl font-bold">$3,250</p>
                  <p className="text-xs text-[#6B7280] mt-1">Across 2 pools</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B7280]">Fees Earned (24h)</span>
                    <span className="text-emerald-400">+$12.40</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B7280]">Total APR</span>
                    <span className="text-emerald-400">26.8%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
