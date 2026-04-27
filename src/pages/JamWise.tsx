import { useState } from 'react';
import {
  TrendingUp, DollarSign, BookOpen, Wallet,
  PiggyBank, Landmark, Target
} from 'lucide-react';
import { brand } from '../config/brand';

const watchlist = [
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 582.34, change: '+1.24%', up: true, data: [570, 575, 572, 578, 580, 582] },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', price: 498.21, change: '+0.87%', up: true, data: [485, 490, 488, 492, 495, 498] },
  { symbol: 'BTC', name: 'Bitcoin', price: 94720, change: '+3.45%', up: true, data: [89000, 91000, 90500, 92000, 93500, 94720] },
  { symbol: 'ETH', name: 'Ethereum', price: 3482, change: '-1.12%', up: false, data: [3550, 3520, 3500, 3490, 3520, 3482] },
  { symbol: 'GLD', name: 'Gold ETF', price: 234.56, change: '+0.45%', up: true, data: [228, 230, 231, 232, 233, 234.56] },
  { symbol: 'TLT', name: 'Treasury 20+', price: 89.42, change: '-0.32%', up: false, data: [91, 90.5, 90, 89.8, 89.6, 89.42] },
];

const lessons = [
  { level: 'Beginner', title: 'Building Your First Budget', read: '5 min', icon: '📊' },
  { level: 'Beginner', title: 'Understanding Compound Interest', read: '4 min', icon: '💰' },
  { level: 'Intermediate', title: 'ETF vs Mutual Funds', read: '7 min', icon: '📈' },
  { level: 'Intermediate', title: 'Risk Management Basics', read: '6 min', icon: '🛡️' },
  { level: 'Advanced', title: 'Options Trading Strategies', read: '10 min', icon: '🎯' },
  { level: 'Advanced', title: 'Tax-Efficient Investing', read: '8 min', icon: '🏛️' },
];

const tools = [
  { name: 'Budget Planner', desc: 'Track income and expenses', icon: Calculator },
  { name: 'Retirement Calculator', desc: 'Project your nest egg', icon: Target },
  { name: 'Debt Payoff Planner', desc: 'Avalanche vs Snowball', icon: TrendingUp },
  { name: 'Net Worth Tracker', desc: 'Assets minus liabilities', icon: Wallet },
];

function Calculator({ size, className }: { size?: number; className?: string }) { return <PiggyBank size={size} className={className} />; }

export default function JamWise() {
  const [activeTab, setActiveTab] = useState<'markets' | 'learn' | 'tools'>('markets');
  const [selectedStock, setSelectedStock] = useState(watchlist[0]);

  const maxVal = Math.max(...selectedStock.data);
  const minVal = Math.min(...selectedStock.data);
  const sparkPoints = selectedStock.data.map((v, i) => {
    const x = (i / (selectedStock.data.length - 1)) * 100;
    const y = 100 - ((v - minVal) / (maxVal - minVal)) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2"><Landmark size={20} className="text-amber-400" /><span className="font-display text-lg font-bold">{brand.prefix}Wise</span></div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 mb-3">
            <DollarSign size={12} />WisdomPay Intelligence
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Financial Intelligence</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">Markets, education, and tools for building wealth. Powered by SEC EDGAR and Federal Reserve data.</p>
        </div>

        <div className="flex justify-center gap-1 mb-6">
          {(['markets', 'learn', 'tools'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${activeTab === tab ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'markets' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 space-y-2">
              <h3 className="text-sm font-semibold text-[#A0AEC0] mb-2">Watchlist</h3>
              {watchlist.map(s => (
                <button key={s.symbol} onClick={() => setSelectedStock(s)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${selectedStock.symbol === s.symbol ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-[#0A0F1E] border border-white/[0.06]'}`}>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{s.symbol}</p>
                    <p className="text-[10px] text-[#6B7280]">{s.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">${s.price.toLocaleString()}</p>
                    <p className={`text-[10px] ${s.up ? 'text-green-400' : 'text-red-400'}`}>{s.change}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="lg:col-span-2 bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedStock.symbol}</h3>
                  <p className="text-xs text-[#6B7280]">{selectedStock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${selectedStock.price.toLocaleString()}</p>
                  <p className={`text-sm ${selectedStock.up ? 'text-green-400' : 'text-red-400'}`}>{selectedStock.change}</p>
                </div>
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-48" preserveAspectRatio="none">
                <polyline points={sparkPoints} fill="none" stroke={selectedStock.up ? '#22c55e' : '#ef4444'} strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
              <p className="text-[10px] text-[#6B7280] mt-2">Data: SEC EDGAR • Federal Reserve FRED • Simulated for demo</p>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lessons.map((l, i) => (
              <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 hover:border-amber-500/20 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{l.icon}</span>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${l.level === 'Beginner' ? 'bg-green-500/10 text-green-400' : l.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>{l.level}</span>
                </div>
                <p className="text-sm font-semibold text-white">{l.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-[#6B7280]">{l.read} read</span>
                  <BookOpen size={12} className="text-[#6B7280]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map(t => (
              <div key={t.name} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-amber-500/20 transition-all cursor-pointer group">
                <t.icon size={28} className="mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-[10px] text-[#6B7280] mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
