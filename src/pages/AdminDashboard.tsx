import { useState, useEffect, useRef } from 'react';
import {
  Users, Eye, Zap, TrendingUp, Activity, ArrowUpRight,
  ArrowDownRight, Clock, Globe, Radio, Shield,
} from 'lucide-react';

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(target * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

function StatCard({ label, value, suffix = '', prefix = '', icon: Icon, color, change, changeUp }: {
  label: string; value: number; suffix?: string; prefix?: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string; change: string; changeUp: boolean;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-medium ${changeUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {changeUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {change}
        </div>
      </div>
      <p className="text-xl font-bold text-white">{prefix}{count.toLocaleString()}{suffix}</p>
      <p className="text-[10px] text-[#6B7280] mt-1">{label}</p>
    </div>
  );
}

const ACTIVITY_FEED = [
  { id: 1, user: 'sarah_chen', action: 'Published video', target: 'JamVideo — "Solar Tech 2026"', time: '2 min ago', type: 'create' },
  { id: 2, user: 'admin_system', action: 'Flagged content', target: 'Comment on JamNews', time: '5 min ago', type: 'flag' },
  { id: 3, user: 'marcus_d', action: 'Upgraded to Prime', target: 'Tier change', time: '12 min ago', type: 'upgrade' },
  { id: 4, user: 'jamzia_ai', action: 'Deployed model', target: 'SORME v2.1', time: '18 min ago', type: 'system' },
  { id: 5, user: 'elena_r', action: 'Live stream started', target: 'JamLive — 342 viewers', time: '24 min ago', type: 'live' },
  { id: 6, user: 'system', action: 'XRPL transaction', target: '5,000 SkyIvy transferred', time: '31 min ago', type: 'payment' },
];

const PLATFORM_STATS = [
  { name: 'JamVideo', users: 12400, growth: '+12%', up: true },
  { name: 'JamAudio', users: 8300, growth: '+8%', up: true },
  { name: 'JamLive', users: 5600, growth: '+23%', up: true },
  { name: 'JamShop', users: 9200, growth: '-3%', up: false },
  { name: 'JamNews', users: 15100, growth: '+45%', up: true },
  { name: 'JamPay', users: 4200, growth: '+18%', up: true },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
          <p className="text-xs text-[#6B7280]">Real-time overview of all 50+ platforms</p>
        </div>
        <div className="flex items-center gap-2">
          {['24h', '7d', '30d', '90d'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                timeRange === r
                  ? 'bg-[#7096D1]/15 text-[#7096D1] border border-[#7096D1]/20'
                  : 'text-[#6B7280] hover:bg-white/[0.03]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Users" value={128473} suffix="" icon={Users} color="#7096D1" change="+12.4%" changeUp={true} />
        <StatCard label="Active Now" value={3842} suffix="" icon={Eye} color="#22c55e" change="+8.2%" changeUp={true} />
        <StatCard label="Daily Transactions" value={15203} suffix="" icon={Zap} color="#f59e0b" change="+24.1%" changeUp={true} />
        <StatCard label="Revenue (USD)" value={84750} prefix="$" icon={TrendingUp} color="#ec4899" change="+6.7%" changeUp={true} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Platform Health */}
        <div className="lg:col-span-2 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity size={14} className="text-[#7096D1]" /> Platform Activity
            </h2>
            <span className="text-[10px] text-[#6B7280]">{timeRange} window</span>
          </div>
          <div className="space-y-3">
            {PLATFORM_STATS.map((platform) => (
              <div key={platform.name} className="flex items-center gap-3">
                <div className="w-28 shrink-0">
                  <p className="text-xs font-medium text-white">{platform.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{platform.users.toLocaleString()} users</p>
                </div>
                <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#081F5C] to-[#7096D1]"
                    style={{ width: `${Math.min(100, (platform.users / 20000) * 100)}%` }}
                  />
                </div>
                <span className={`text-[10px] font-medium shrink-0 ${platform.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {platform.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock size={14} className="text-[#7096D1]" /> Live Activity
            </h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-400">Live</span>
            </div>
          </div>
          <div className="space-y-3">
            {ACTIVITY_FEED.map((item) => (
              <div key={item.id} className="flex items-start gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  item.type === 'create' ? 'bg-[#7096D1]/10' :
                  item.type === 'flag' ? 'bg-red-500/10' :
                  item.type === 'upgrade' ? 'bg-amber-500/10' :
                  item.type === 'system' ? 'bg-purple-500/10' :
                  item.type === 'live' ? 'bg-emerald-500/10' :
                  'bg-white/[0.04]'
                }`}>
                  {item.type === 'create' ? <Zap size={12} className="text-[#7096D1]" /> :
                   item.type === 'flag' ? <Shield size={12} className="text-red-400" /> :
                   item.type === 'upgrade' ? <TrendingUp size={12} className="text-amber-400" /> :
                   item.type === 'system' ? <Activity size={12} className="text-purple-400" /> :
                   item.type === 'live' ? <Radio size={12} className="text-emerald-400" /> :
                   <Globe size={12} className="text-[#6B7280]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white">
                    <span className="font-medium">{item.user}</span>{' '}
                    <span className="text-[#A0AEC0]">{item.action}</span>
                  </p>
                  <p className="text-[10px] text-[#6B7280] truncate">{item.target}</p>
                  <p className="text-[9px] text-[#6B7280]/60 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 text-center">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">System Uptime</p>
          <p className="text-2xl font-bold text-emerald-400">99.97%</p>
          <p className="text-[10px] text-[#6B7280] mt-1">Last 30 days</p>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 text-center">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Moderation Queue</p>
          <p className="text-2xl font-bold text-amber-400">12</p>
          <p className="text-[10px] text-[#6B7280] mt-1">Awaiting review</p>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 text-center">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">XRPL TPS</p>
          <p className="text-2xl font-bold text-[#7096D1]">1,502</p>
          <p className="text-[10px] text-[#6B7280] mt-1">3.2s avg latency</p>
        </div>
      </div>
    </div>
  );
}
