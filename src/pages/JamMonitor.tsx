/* ═══════════════════════════════════════════════════════════
   JamMonitor — Real-Time Monitoring Dashboard
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Activity, AlertTriangle, CheckCircle, Clock, Cpu,
  HardDrive, Wifi, Server, Zap, Shield, RefreshCw,
  X, Bell
} from 'lucide-react';

/* ── Types ── */
interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  uptime: string;
  latency: string;
  region: string;
}

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  service: string;
  time: string;
  acknowledged: boolean;
}

interface MetricPoint {
  time: string;
  value: number;
}

/* ── Mock Data ── */
const SERVICES: ServiceStatus[] = [
  { name: 'JamPay API', status: 'operational', uptime: '99.99%', latency: '12ms', region: 'us-east' },
  { name: 'JamDEX Engine', status: 'operational', uptime: '99.97%', latency: '8ms', region: 'us-east' },
  { name: 'JamCloud Compute', status: 'operational', uptime: '99.95%', latency: '22ms', region: 'us-west' },
  { name: 'JamMusic Stream', status: 'degraded', uptime: '98.50%', latency: '145ms', region: 'eu-west' },
  { name: 'JamBoxFlix CDN', status: 'operational', uptime: '99.99%', latency: '5ms', region: 'global' },
  { name: 'XRPL Node', status: 'operational', uptime: '100%', latency: '3ms', region: 'us-east' },
  { name: 'JamGroupChat WS', status: 'operational', uptime: '99.92%', latency: '18ms', region: 'us-west' },
  { name: 'Auth Service', status: 'operational', uptime: '99.99%', latency: '6ms', region: 'us-east' },
  { name: 'JamAR Render', status: 'maintenance', uptime: '95.00%', latency: '—', region: 'ap-south' },
  { name: 'WisdomPay Settle', status: 'operational', uptime: '99.98%', latency: '15ms', region: 'us-east' },
];

const INITIAL_ALERTS: Alert[] = [
  { id: 'a1', severity: 'critical', message: 'JamMusic EU latency > 100ms sustained', service: 'JamMusic Stream', time: '2 min ago', acknowledged: false },
  { id: 'a2', severity: 'warning', message: 'JamCloud us-west CPU > 85%', service: 'JamCloud Compute', time: '5 min ago', acknowledged: false },
  { id: 'a3', severity: 'warning', message: 'JamAR render pool scheduled maintenance', service: 'JamAR Render', time: '15 min ago', acknowledged: true },
  { id: 'a4', severity: 'info', message: 'XRPL node sync complete — ledger 92,451,203', service: 'XRPL Node', time: '32 min ago', acknowledged: true },
  { id: 'a5', severity: 'info', message: 'Auto-scaling triggered: web-prod-01 → 6 instances', service: 'JamCloud Compute', time: '1 hr ago', acknowledged: true },
];

function generateMetrics(count: number, min: number, max: number): MetricPoint[] {
  const points: MetricPoint[] = [];
  const now = Date.now();
  for (let i = count - 1; i >= 0; i--) {
    points.push({
      time: new Date(now - i * 60000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
      value: Math.random() * (max - min) + min,
    });
  }
  return points;
}

/* ── Status helpers ── */
const statusConfig = {
  operational: { color: '#22c55e', bg: '#22c55e15', icon: CheckCircle, label: 'Operational' },
  degraded: { color: '#f59e0b', bg: '#f59e0b15', icon: AlertTriangle, label: 'Degraded' },
  down: { color: '#ef4444', bg: '#ef444415', icon: X, label: 'Down' },
  maintenance: { color: '#7096D1', bg: '#7096D115', icon: Clock, label: 'Maintenance' },
};

/* ── Mini Sparkline ── */
function MiniChart({ data, color, height = 40 }: { data: MetricPoint[]; color: string; height?: number }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${height - ((d.value - min) / range) * height}`).join(' ');

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <polygon points={`0,${height} ${points} 100,${height}`} fill={`${color}20`} />
    </svg>
  );
}

/* ── Main Component ── */
export default function JamMonitor() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [refreshing, setRefreshing] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [cpuMetrics] = useState(() => generateMetrics(30, 30, 90));
  const [memMetrics] = useState(() => generateMetrics(30, 40, 80));
  const [netMetrics] = useState(() => generateMetrics(30, 1000, 5000));

  const ackAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const filteredAlerts = filterSeverity === 'all' ? alerts : alerts.filter(a => a.severity === filterSeverity);
  const activeAlerts = alerts.filter(a => !a.acknowledged);
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const warningCount = activeAlerts.filter(a => a.severity === 'warning').length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
                <Activity size={20} className="text-[#7096D1]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamMonitor</h1>
                <p className="text-[10px] text-[#6B7280]">Platform Monitoring · Collective General Technologies, LLC</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={refresh} className={`p-2 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] text-[#6B7280] hover:text-white ${refreshing ? 'animate-spin' : ''}`}>
                <RefreshCw size={14} />
              </button>
              <div className="relative">
                <Bell size={16} className="text-[#6B7280]" />
                {activeAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[8px] flex items-center justify-center font-bold">{activeAlerts.length}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#6B7280]">Services Up</span>
              <CheckCircle size={14} className="text-emerald-400" />
            </div>
            <p className="text-2xl font-bold">{SERVICES.filter(s => s.status === 'operational').length}<span className="text-sm text-[#6B7280]">/{SERVICES.length}</span></p>
          </div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#6B7280]">Active Alerts</span>
              <AlertTriangle size={14} className={criticalCount > 0 ? 'text-red-400' : 'text-[#f59e0b]'} />
            </div>
            <p className="text-2xl font-bold">{activeAlerts.length}</p>
            <div className="flex gap-2 mt-1">
              {criticalCount > 0 && <span className="text-[10px] px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded">{criticalCount} Critical</span>}
              {warningCount > 0 && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded">{warningCount} Warning</span>}
            </div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#6B7280]">Avg Latency</span>
              <Zap size={14} className="text-[#7096D1]" />
            </div>
            <p className="text-2xl font-bold">18ms</p>
          </div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#6B7280]">Global Uptime</span>
              <Shield size={14} className="text-emerald-400" />
            </div>
            <p className="text-2xl font-bold">99.97%</p>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h2 className="text-sm font-medium mb-3">Service Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICES.map(svc => {
              const cfg = statusConfig[svc.status];
              const Icon = cfg.icon;
              return (
                <div key={svc.name} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 hover:border-[#2A2A2A] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Server size={14} className="text-[#6B7280]" />
                      <span className="text-sm font-medium">{svc.name}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                      <Icon size={10} />
                      {cfg.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[10px] text-[#6B7280]">Uptime</p>
                      <p className="text-xs font-medium">{svc.uptime}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#6B7280]">Latency</p>
                      <p className="text-xs font-medium">{svc.latency}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#6B7280]">Region</p>
                      <p className="text-xs font-medium">{svc.region}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metrics Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'CPU Usage', value: '67%', metric: cpuMetrics, color: '#7096D1', icon: Cpu },
            { label: 'Memory', value: '54%', metric: memMetrics, color: '#f59e0b', icon: HardDrive },
            { label: 'Network I/O', value: '2.4 Gbps', metric: netMetrics, color: '#22c55e', icon: Wifi },
          ].map(chart => (
            <div key={chart.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <chart.icon size={14} style={{ color: chart.color }} />
                  <span className="text-xs font-medium">{chart.label}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: chart.color }}>{chart.value}</span>
              </div>
              <MiniChart data={chart.metric} color={chart.color} />
            </div>
          ))}
        </div>

        {/* Alerts Feed */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-sm font-medium flex items-center gap-2">
              <Bell size={14} className="text-[#6B7280]" />
              Alerts Feed
            </h2>
            <div className="flex items-center gap-2">
              {['all', 'critical', 'warning', 'info'].map(sev => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium capitalize transition-colors ${
                    filterSeverity === sev ? 'bg-[#7096D1] text-white' : 'bg-[#1F1F1F] text-[#6B7280] hover:text-white'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-[#1F1F1F]/50">
            {filteredAlerts.map(alert => {
              const severityColors = {
                critical: { bg: '#ef444415', text: '#ef4444', border: '#ef444430' },
                warning: { bg: '#f59e0b15', text: '#f59e0b', border: '#f59e0b30' },
                info: { bg: '#7096D115', text: '#7096D1', border: '#7096D130' },
              };
              const sc = severityColors[alert.severity];
              return (
                <div key={alert.id} className={`p-4 flex items-start gap-3 ${alert.acknowledged ? 'opacity-50' : ''}`}>
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: sc.text }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium">{alert.service}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-medium uppercase" style={{ backgroundColor: sc.bg, color: sc.text }}>{alert.severity}</span>
                      {!alert.acknowledged && (
                        <button onClick={() => ackAlert(alert.id)} className="text-[9px] text-[#7096D1] hover:underline">
                          Ack
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">{alert.message}</p>
                    <p className="text-[10px] text-[#6B7280] mt-1">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
