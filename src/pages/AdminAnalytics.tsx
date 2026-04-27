import { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, Eye, Zap, Globe,
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

const TIME_RANGES = ['24h', '7d', '30d', '90d'];

const PLATFORM_METRICS = [
  { name: 'JamVideo', users: 12400, sessions: 48200, revenue: 8400, growth: '+12%', up: true },
  { name: 'JamAudio', users: 8300, sessions: 21500, revenue: 3200, growth: '+8%', up: true },
  { name: 'JamLive', users: 5600, sessions: 18900, revenue: 5600, growth: '+23%', up: true },
  { name: 'JamShop', users: 9200, sessions: 34100, revenue: 12800, growth: '-3%', up: false },
  { name: 'JamNews', users: 15100, sessions: 67200, revenue: 4500, growth: '+45%', up: true },
  { name: 'JamPay', users: 4200, sessions: 15200, revenue: 2100, growth: '+18%', up: true },
  { name: 'JamSocial', users: 7800, sessions: 28400, revenue: 1800, growth: '+5%', up: true },
  { name: 'JamMastery', users: 3400, sessions: 12300, revenue: 6700, growth: '+31%', up: true },
];

const TRAFFIC_SOURCES = [
  { source: 'Direct', percentage: 34, color: '#7096D1' },
  { source: 'Search', percentage: 28, color: '#22c55e' },
  { source: 'Social', percentage: 18, color: '#f59e0b' },
  { source: 'Referral', percentage: 12, color: '#ec4899' },
  { source: 'Email', percentage: 8, color: '#a855f7' },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const totals = {
    users: PLATFORM_METRICS.reduce((s, p) => s + p.users, 0),
    sessions: PLATFORM_METRICS.reduce((s, p) => s + p.sessions, 0),
    revenue: PLATFORM_METRICS.reduce((s, p) => s + p.revenue, 0),
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Analytics</h1>
          <p className="text-xs text-[#6B7280]">Cross-platform metrics and performance insights</p>
        </div>
        <div className="flex items-center gap-2">
          {TIME_RANGES.map((r) => (
            <button key={r} onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${timeRange === r ? 'bg-[#7096D1]/15 text-[#7096D1] border border-[#7096D1]/20' : 'text-[#6B7280] hover:bg-white/[0.03]'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} className="text-[#7096D1]" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Total Users</span>
          </div>
          <p className="text-xl font-bold text-white">{totals.users.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={10} className="text-emerald-400" />
            <span className="text-[10px] text-emerald-400">+12.4%</span>
            <span className="text-[10px] text-[#6B7280]">vs last {timeRange}</span>
          </div>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={14} className="text-[#7096D1]" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Sessions</span>
          </div>
          <p className="text-xl font-bold text-white">{totals.sessions.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={10} className="text-emerald-400" />
            <span className="text-[10px] text-emerald-400">+8.7%</span>
          </div>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-[#7096D1]" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Revenue</span>
          </div>
          <p className="text-xl font-bold text-white">${totals.revenue.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={10} className="text-emerald-400" />
            <span className="text-[10px] text-emerald-400">+15.2%</span>
          </div>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={14} className="text-[#7096D1]" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Conversion</span>
          </div>
          <p className="text-xl font-bold text-white">4.2%</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowDownRight size={10} className="text-red-400" />
            <span className="text-[10px] text-red-400">-0.3%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Platform Breakdown */}
        <div className="lg:col-span-2 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={14} className="text-[#7096D1]" /> Platform Performance
          </h2>
          <div className="space-y-3">
            {PLATFORM_METRICS.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-24 shrink-0">
                  <p className="text-xs font-medium text-white">{p.name}</p>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[10px] text-[#6B7280]">Users</p>
                    <p className="text-xs text-white">{p.users.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280]">Sessions</p>
                    <p className="text-xs text-white">{p.sessions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6B7280]">Revenue</p>
                    <p className="text-xs text-white">${p.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-medium shrink-0 ${p.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {p.up ? <ArrowUpRight size={10} className="inline mr-0.5" /> : <ArrowDownRight size={10} className="inline mr-0.5" />}
                  {p.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#7096D1]" /> Traffic Sources
          </h2>
          <div className="space-y-3">
            {TRAFFIC_SOURCES.map((t) => (
              <div key={t.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#A0AEC0]">{t.source}</span>
                  <span className="text-xs text-white font-medium">{t.percentage}%</span>
                </div>
                <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${t.percentage}%`, backgroundColor: t.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
