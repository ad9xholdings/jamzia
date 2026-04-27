import { useState, useEffect, useRef } from 'react';
import {
  Activity, Wallet, Zap, Users, Award, Globe, Radio,
  Shield, ArrowUpRight, ArrowDownRight, RefreshCw,
  Bot, Gamepad2, GraduationCap, ShoppingCart,
  Lock, Copy, CheckCircle, Play, Volume2,
  Sparkles, Clock, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router';
import { runAutomatedAudit, auditScheduler } from '../services/auditEngine';
import type { AuditReport } from '../services/auditEngine';
import { transactionFeed, type Transaction } from '../services/feedService';
import { auditLedger } from '../services/auditLedger';

/* ── Animated Counter ── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCard({ label, value, suffix = '', prefix = '', icon: Icon, color, sub }: {
  label: string; value: number; suffix?: string; prefix?: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; color: string; sub: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-white">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-[10px] text-[#6B7280] mt-1">{sub}</p>
    </div>
  );
}

/* ── Quick Action ── */
const QUICK_ACTIONS = [
  { name: 'Listen', icon: Volume2, route: '/listen', color: '#ec4899', desc: 'Music & audio' },
  { name: 'Watch', icon: Play, route: '/watch', color: '#ef4444', desc: 'Video & movies' },
  { name: 'Play', icon: Gamepad2, route: '/play', color: '#f59e0b', desc: 'Games & AR' },
  { name: 'Pay', icon: Wallet, route: '/pay', color: '#7096D1', desc: 'Wallet & finance' },
  { name: 'Shop', icon: ShoppingCart, route: '/shop', color: '#22c55e', desc: 'Marketplace' },
  { name: 'Learn', icon: GraduationCap, route: '/learn', color: '#a855f7', desc: 'Courses & academy' },
  { name: 'Connect', icon: Users, route: '/connect', color: '#06b6d4', desc: 'Social & chat' },
  { name: 'Build', icon: Zap, route: '/build', color: '#3b82f6', desc: 'Tools & code' },
  { name: 'Govern', icon: Shield, route: '/govern', color: '#f97316', desc: 'Legal & government' },
  { name: 'Command', icon: Activity, route: '/command', color: '#6B7280', desc: 'Admin dashboard' },
  { name: 'Ask 9x', icon: Bot, route: '#', color: '#7096D1', desc: 'AI concierge', action: () => window.dispatchEvent(new CustomEvent('open-9x-concierge')) },
];

export default function CommandCenter() {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [auditCount, setAuditCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const walletAddress = 'rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj';

  useEffect(() => {
    transactionFeed.start();
    const unsub = transactionFeed.subscribe((tx) => {
      setTxs((p) => [tx, ...p].slice(0, 20));
    });
    setAuditCount(auditLedger.getEvents().length);
    runAutomatedAudit().then(setAuditReport);
    auditScheduler.start((r) => setAuditReport(r));
    return () => { unsub(); transactionFeed.stop(); auditScheduler.stop(); };
  }, []);

  const runAudit = async () => {
    setAuditLoading(true);
    const report = await runAutomatedAudit();
    setAuditReport(report);
    setAuditLoading(false);
  };

  const copyAddress = () => {
    navigator.clipboard?.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-2 mb-1">
            <Activity size={18} className="text-[#7096D1]" />
            <span className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold">JamZia Networks</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Command Center</h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">Unified dashboard for 50+ platform layers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <StatCard label="SkyIvy Balance" value={5000000000} suffix="" prefix="" icon={Sparkles} color="#f59e0b" sub="21T total supply • 15 decimals" />
          <StatCard label="Active Users" value={12847} suffix="" icon={Users} color="#7096D1" sub="+12% this week" />
          <StatCard label="Certificates" value={8932} suffix="" icon={Award} color="#22c55e" sub="Across all courses" />
          <StatCard label="Platforms Live" value={50} suffix="+" icon={Globe} color="#ec4899" sub="7 categories • 100% uptime" />
        </div>

        {/* ── Audit Compliance Panel ── */}
        {auditReport && (
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#7096D1]" />
                <span className="text-sm font-bold text-white">Audit Compliance — v{auditReport.version}</span>
              </div>
              <button
                onClick={runAudit}
                disabled={auditLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 text-[#7096D1] text-[10px] font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={12} className={auditLoading ? 'animate-spin' : ''} />
                {auditLoading ? 'Running...' : 'Run Audit'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-[#050810] border border-white/[0.06] rounded-lg p-3 text-center">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Compliance Score</p>
                <p className={`text-2xl font-bold ${auditReport.status === 'PASS' ? 'text-emerald-400' : auditReport.status === 'WARNING' ? 'text-amber-400' : 'text-red-400'}`}>
                  {auditReport.complianceScore}%
                </p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block ${auditReport.status === 'PASS' ? 'bg-emerald-500/10 text-emerald-400' : auditReport.status === 'WARNING' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                  {auditReport.status}
                </span>
              </div>
              <div className="bg-[#050810] border border-white/[0.06] rounded-lg p-3 text-center">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Violations</p>
                <p className="text-2xl font-bold text-white">{auditReport.violations.length}</p>
                <span className="text-[10px] text-[#6B7280]">{auditReport.violations.filter(v => v.severity === 'CRITICAL').length} critical</span>
              </div>
              <div className="bg-[#050810] border border-white/[0.06] rounded-lg p-3 text-center">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Last Audit</p>
                <p className="text-xs text-white">{new Date(auditReport.timestamp).toLocaleTimeString()}</p>
                <span className="text-[10px] text-[#6B7280]">Auto: every 3h</span>
              </div>
            </div>

            {auditReport.violations.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Violations</p>
                {auditReport.violations.map((v) => (
                  <div key={v.id} className="flex items-start gap-2 bg-[#050810] border border-white/[0.06] rounded-lg p-2.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 ${v.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400' : v.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-400' : 'bg-[#7096D1]/10 text-[#7096D1]'}`}>
                      {v.severity}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-white truncate">{v.message}</p>
                      <p className="text-[10px] text-[#6B7280]">{v.remediation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {auditReport.recommendations.length > 0 && (
              <div className="mt-3 space-y-1">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Recommendations</p>
                {auditReport.recommendations.map((r, i) => (
                  <p key={i} className="text-[11px] text-[#A0AEC0] pl-3 border-l-2 border-[#7096D1]/30">{r}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Main Grid: Wallet + Quick Actions + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Wallet Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#081F5C]/60 to-[#0A0F1E] border border-[#7096D1]/20 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Wallet size={16} className="text-[#7096D1]" />
              <span className="text-sm font-bold text-white">WisdomPay™</span>
              <span className="text-[9px] text-[#7096D1] ml-auto">powered by Ad9x</span>
              <div className="ml-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400">Live</span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-[#050810] border border-white/[0.06] rounded-lg p-2.5 flex items-center gap-2 mb-4">
              <span className="text-[10px] text-[#A0AEC0] truncate flex-1 font-mono">{walletAddress}</span>
              <button onClick={copyAddress} className="shrink-0 p-1 rounded hover:bg-white/[0.04] cursor-pointer">
                {copied ? <CheckCircle size={12} className="text-emerald-400" /> : <Copy size={12} className="text-[#6B7280]" />}
              </button>
            </div>

            {/* Balance */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">XRP Balance</span>
                <span className="text-sm font-bold text-white">12,450.00</span>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">SkyIvy</span>
                <span className="text-sm font-bold text-[#f59e0b]">500M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">SkyLockr</span>
                <span className="text-sm font-bold text-[#22c55e]">2.4M</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Link to="/pay" onClick={() => sessionStorage.setItem('jamPayTab', 'send')} className="block w-full py-2.5 bg-gradient-to-r from-[#081F5C] to-[#7096D1] text-white rounded-xl text-sm font-semibold text-center hover:opacity-90 transition-opacity no-underline">
                Send
              </Link>
              <Link to="/pay" className="block w-full py-2.5 bg-[#0A0F1E] border border-white/[0.06] text-white rounded-xl text-sm font-semibold text-center hover:bg-white/[0.02] transition-colors no-underline">
                Receive
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-[#7096D1]" />
              <span className="text-sm font-bold text-white">Quick Actions</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((a) => (
                <a
                  key={a.name}
                  href={`#${a.route}`}
                  onClick={(e) => { if (a.action) { e.preventDefault(); a.action(); } }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#050810] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01] transition-all no-underline"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${a.color}15` }}>
                    <a.icon size={16} style={{ color: a.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">{a.name}</p>
                    <p className="text-[9px] text-[#6B7280] truncate">{a.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio size={16} className="text-[#7096D1]" />
                <span className="text-sm font-bold text-white">Live Activity</span>
              </div>
              <span className="text-[10px] text-[#6B7280]">{txs.length} txns</span>
            </div>
            <div className="space-y-1 max-h-[280px] overflow-y-auto scrollbar-none">
              {txs.length === 0 ? (
                <div className="text-center py-8">
                  <Clock size={20} className="text-[#6B7280] mx-auto mb-2" />
                  <p className="text-xs text-[#6B7280]">Waiting for transactions...</p>
                </div>
              ) : (
                txs.map((tx) => (
                  <div key={tx.id} className="p-2.5 flex items-center gap-2.5 hover:bg-white/[0.01]">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.type === 'SEND' ? 'bg-red-500/10' : tx.type === 'RECEIVE' ? 'bg-emerald-500/10' : tx.type === 'SWAP' ? 'bg-[#7096D1]/10' : 'bg-amber-500/10'
                    }`}>
                      {tx.type === 'SEND' ? <ArrowUpRight size={12} className="text-red-400" /> :
                       tx.type === 'RECEIVE' ? <ArrowDownRight size={12} className="text-emerald-400" /> :
                       tx.type === 'SWAP' ? <RefreshCw size={12} className="text-[#7096D1]" /> :
                       <Lock size={12} className="text-amber-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">{tx.type} · {tx.amount} {tx.currency}</p>
                      <p className="text-[9px] text-[#6B7280]">{tx.from.slice(0, 8)}... → {tx.to.slice(0, 8)}...</p>
                    </div>
                    <span className={`text-[9px] shrink-0 ${tx.status === 'CONFIRMED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {tx.status}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Audit Ledger */}
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 mb-3">
                <Lock size={14} className="text-[#7096D1]" />
                <span className="text-xs font-bold text-white">Immutable Audit</span>
                <span className="ml-auto text-[10px] text-[#6B7280]">{auditCount} events</span>
              </div>
              <Link to="/pay" onClick={() => sessionStorage.setItem('jamPayTab', 'audit')} className="shrink-0 text-[10px] text-[#7096D1] hover:text-[#F7F2EB] no-underline flex items-center gap-1">
                View Audit Ledger <ChevronRight size={10} />
              </Link>
            </div>

            {/* AI Command */}
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <Bot size={14} className="text-[#7096D1]" />
                <span className="text-xs font-bold text-white">AI Command</span>
              </div>
              <p className="text-[10px] text-[#6B7280] mt-1">
                Type natural language like "send 100 XRP to rN7..." — the AI parses, validates risk, and executes.
              </p>
              <Link to="/pay" onClick={() => sessionStorage.setItem('jamPayTab', 'ai')} className="shrink-0 text-[10px] text-[#7096D1] hover:text-[#F7F2EB] no-underline flex items-center gap-1">
                Try <ChevronRight size={10} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
