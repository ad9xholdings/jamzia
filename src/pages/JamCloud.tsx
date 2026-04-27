/* ═══════════════════════════════════════════════════════════
   JamCloud — Cloud Hosting Platform
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Cloud, Server, Cpu, HardDrive, Plus,
  Play, Square, Trash2, Globe, Shield,
  X, CheckCircle, AlertTriangle,
  RefreshCw, Database, Network, Loader2
} from 'lucide-react';

/* ── Types ── */
interface Instance {
  id: string;
  name: string;
  region: string;
  type: string;
  status: 'running' | 'stopped' | 'provisioning' | 'error';
  cpu: number;
  ram: number;
  uptime: string;
  ip: string;
  created: string;
}

interface CreateForm {
  name: string;
  region: string;
  type: string;
  os: string;
}

/* ── Mock Data ── */
const REGIONS = [
  { id: 'us-east', label: 'US East (N. Virginia)', flag: '🇺🇸' },
  { id: 'us-west', label: 'US West (Oregon)', flag: '🇺🇸' },
  { id: 'eu-west', label: 'EU West (Ireland)', flag: '🇪🇺' },
  { id: 'ap-south', label: 'Asia Pacific (Mumbai)', flag: '🇮🇳' },
];

const TYPES = [
  { id: 'standard-1', label: 'Standard-1', cpu: '2 vCPU', ram: '4 GB', price: '$0.024/hr' },
  { id: 'standard-2', label: 'Standard-2', cpu: '4 vCPU', ram: '8 GB', price: '$0.048/hr' },
  { id: 'performance-1', label: 'Performance-1', cpu: '8 vCPU', ram: '16 GB', price: '$0.096/hr' },
  { id: 'performance-2', label: 'Performance-2', cpu: '16 vCPU', ram: '32 GB', price: '$0.192/hr' },
  { id: 'gpu-1', label: 'GPU-1', cpu: '8 vCPU', ram: '32 GB', gpu: '1x A100', price: '$1.200/hr' },
];

const OSS = ['Ubuntu 22.04 LTS', 'Debian 12', 'Fedora 39', 'JamZia OS', 'Windows Server 2022'];

const INITIAL_INSTANCES: Instance[] = [
  { id: 'i-0a1b2c3d', name: 'web-prod-01', region: 'us-east', type: 'standard-2', status: 'running', cpu: 34, ram: 62, uptime: '14d 7h 22m', ip: '203.0.113.45', created: '2026-04-13' },
  { id: 'i-0e5f6g7h', name: 'api-prod-02', region: 'us-west', type: 'performance-1', status: 'running', cpu: 67, ram: 45, uptime: '8d 3h 15m', ip: '198.51.100.22', created: '2026-04-19' },
  { id: 'i-0i8j9k0l', name: 'db-primary', region: 'us-east', type: 'performance-2', status: 'running', cpu: 45, ram: 78, uptime: '21d 12h 5m', ip: '203.0.113.108', created: '2026-04-06' },
  { id: 'i-0m1n2o3p', name: 'worker-batch', region: 'eu-west', type: 'standard-1', status: 'stopped', cpu: 0, ram: 0, uptime: '—', ip: '—', created: '2026-04-20' },
  { id: 'i-0q4r5s6t', name: 'ai-inference', region: 'us-east', type: 'gpu-1', status: 'running', cpu: 89, ram: 72, uptime: '3d 18h 40m', ip: '203.0.113.201', created: '2026-04-23' },
];

/* ── Status Badge ── */
function StatusBadge({ status }: { status: Instance['status'] }) {
  const styles = {
    running: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    stopped: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    provisioning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  const icons = {
    running: CheckCircle,
    stopped: Square,
    provisioning: Loader2,
    error: AlertTriangle,
  };
  const Icon = icons[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <Icon size={12} className={status === 'provisioning' ? 'animate-spin' : ''} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/* ── Main Component ── */
export default function JamCloud() {
  const [instances, setInstances] = useState<Instance[]>(INITIAL_INSTANCES);
  const [showCreate, setShowCreate] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'running' | 'stopped'>('all');

  /* Create form state */
  const [form, setForm] = useState<CreateForm>({
    name: '',
    region: 'us-east',
    type: 'standard-1',
    os: 'Ubuntu 22.04 LTS',
  });

  /* Stats */
  const runningCount = instances.filter(i => i.status === 'running').length;
  const totalCpu = Math.round(
    instances.filter(i => i.status === 'running').reduce((s, i) => s + i.cpu, 0) /
    Math.max(runningCount, 1)
  );
  const totalRam = Math.round(
    instances.filter(i => i.status === 'running').reduce((s, i) => s + i.ram, 0) /
    Math.max(runningCount, 1)
  );

  /* Actions */
  const createInstance = () => {
    if (!form.name.trim()) return;
    const newInstance: Instance = {
      id: `i-${Math.random().toString(36).slice(2, 10)}`,
      name: form.name,
      region: form.region,
      type: form.type,
      status: 'provisioning',
      cpu: 0,
      ram: 0,
      uptime: '—',
      ip: 'Assigning...',
      created: new Date().toISOString().slice(0, 10),
    };
    setInstances(prev => [newInstance, ...prev]);
    setShowCreate(false);
    setForm({ name: '', region: 'us-east', type: 'standard-1', os: 'Ubuntu 22.04 LTS' });

    /* Simulate provisioning */
    setTimeout(() => {
      setInstances(prev => prev.map(i =>
        i.id === newInstance.id
          ? { ...i, status: 'running', cpu: 12, ram: 28, uptime: '0d 0h 1m', ip: `203.0.113.${Math.floor(Math.random() * 254 + 1)}` }
          : i
      ));
    }, 3000);
  };

  const toggleStatus = (id: string) => {
    setInstances(prev => prev.map(i => {
      if (i.id !== id) return i;
      if (i.status === 'running') return { ...i, status: 'stopped', cpu: 0, ram: 0, uptime: '—', ip: '—' };
      if (i.status === 'stopped') return { ...i, status: 'running', cpu: 15, ram: 32, uptime: '0d 0h 1m', ip: `203.0.113.${Math.floor(Math.random() * 254 + 1)}` };
      return i;
    }));
  };

  const deleteInstance = (id: string) => {
    setInstances(prev => prev.filter(i => i.id !== id));
  };

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setInstances(prev => prev.map(i =>
        i.status === 'running'
          ? { ...i, cpu: Math.floor(Math.random() * 80 + 10), ram: Math.floor(Math.random() * 70 + 20) }
          : i
      ));
      setRefreshing(false);
    }, 1000);
  };

  const filtered = filter === 'all' ? instances : instances.filter(i => i.status === filter);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
                <Cloud size={20} className="text-[#7096D1]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">JamCloud</h1>
                <p className="text-xs text-[#6B7280]">Cloud Hosting by Collective General Technologies, LLC</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#7096D1] hover:bg-[#5a7fc0] text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              New Instance
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Running', value: runningCount.toString(), total: `/${instances.length}`, icon: Server, color: '#22c55e' },
            { label: 'Avg CPU', value: `${totalCpu}%`, icon: Cpu, color: '#7096D1' },
            { label: 'Avg RAM', value: `${totalRam}%`, icon: HardDrive, color: '#f59e0b' },
            { label: 'Regions', value: '4', icon: Globe, color: '#ec4899' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">{stat.label}</span>
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{stat.value}</span>
                {stat.total && <span className="text-sm text-[#6B7280]">{stat.total}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(['all', 'running', 'stopped'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === f ? 'bg-[#7096D1] text-white' : 'bg-[#0A0A0A] text-[#6B7280] hover:text-white border border-[#1F1F1F]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={refresh}
            className={`p-2 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] text-[#6B7280] hover:text-white transition-all ${refreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Instances Table */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1F1F1F] text-[#6B7280] text-xs">
                  <th className="text-left p-4 font-medium">Instance</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Region</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">CPU / RAM</th>
                  <th className="text-left p-4 font-medium">IP Address</th>
                  <th className="text-left p-4 font-medium">Uptime</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inst) => (
                  <tr key={inst.id} className="border-b border-[#1F1F1F]/50 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
                          <Server size={14} className="text-[#7096D1]" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{inst.name}</p>
                          <p className="text-xs text-[#6B7280]">{inst.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><StatusBadge status={inst.status} /></td>
                    <td className="p-4 text-[#6B7280]">{REGIONS.find(r => r.id === inst.region)?.label ?? inst.region}</td>
                    <td className="p-4 text-[#6B7280]">{TYPES.find(t => t.id === inst.type)?.label ?? inst.type}</td>
                    <td className="p-4">
                      {inst.status === 'running' ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Cpu size={12} className="text-[#7096D1]" />
                            <div className="w-20 h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                              <div className="h-full bg-[#7096D1] rounded-full transition-all" style={{ width: `${inst.cpu}%` }} />
                            </div>
                            <span className="text-xs text-[#6B7280]">{inst.cpu}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HardDrive size={12} className="text-[#f59e0b]" />
                            <div className="w-20 h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                              <div className="h-full bg-[#f59e0b] rounded-full transition-all" style={{ width: `${inst.ram}%` }} />
                            </div>
                            <span className="text-xs text-[#6B7280]">{inst.ram}%</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-[#6B7280]">—</span>
                      )}
                    </td>
                    <td className="p-4 text-[#6B7280] font-mono text-xs">{inst.ip}</td>
                    <td className="p-4 text-[#6B7280] text-xs">{inst.uptime}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleStatus(inst.id)}
                          disabled={inst.status === 'provisioning'}
                          className="p-2 rounded-lg hover:bg-white/5 text-[#6B7280] hover:text-white disabled:opacity-30 transition-colors"
                          title={inst.status === 'running' ? 'Stop' : 'Start'}
                        >
                          {inst.status === 'running' ? <Square size={14} /> : <Play size={14} />}
                        </button>
                        <button
                          onClick={() => deleteInstance(inst.id)}
                          disabled={inst.status === 'provisioning'}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-[#6B7280] hover:text-red-400 disabled:opacity-30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-[#6B7280]">
                      No instances match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-emerald-400" />
              <span className="text-sm font-medium">Security</span>
            </div>
            <div className="space-y-2 text-xs text-[#6B7280]">
              <div className="flex justify-between"><span>Firewall</span><span className="text-emerald-400">Active</span></div>
              <div className="flex justify-between"><span>DDoS Protection</span><span className="text-emerald-400">Enabled</span></div>
              <div className="flex justify-between"><span>Encryption</span><span className="text-emerald-400">AES-256</span></div>
            </div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Network size={16} className="text-[#7096D1]" />
              <span className="text-sm font-medium">Network</span>
            </div>
            <div className="space-y-2 text-xs text-[#6B7280]">
              <div className="flex justify-between"><span>Bandwidth</span><span className="text-[#7096D1]">10 Gbps</span></div>
              <div className="flex justify-between"><span>Latency</span><span className="text-[#7096D1]">3.2ms avg</span></div>
              <div className="flex justify-between"><span>CDN</span><span className="text-[#7096D1]">Global</span></div>
            </div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database size={16} className="text-[#f59e0b]" />
              <span className="text-sm font-medium">Storage</span>
            </div>
            <div className="space-y-2 text-xs text-[#6B7280]">
              <div className="flex justify-between"><span>SSD Allocated</span><span className="text-[#f59e0b]">2.4 TB</span></div>
              <div className="flex justify-between"><span>Backups</span><span className="text-[#f59e0b]">Daily</span></div>
              <div className="flex justify-between"><span>Snapshot</span><span className="text-[#f59e0b]">12 saved</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Instance Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#1F1F1F]">
              <h2 className="text-lg font-bold">Create Instance</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-white/5 rounded-lg text-[#6B7280] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-2">Instance Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g., web-prod-03"
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-[#7096D1]"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-2">Region</label>
                <div className="grid grid-cols-2 gap-2">
                  {REGIONS.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setForm(f => ({ ...f, region: r.id }))}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        form.region === r.id ? 'border-[#7096D1] bg-[#7096D1]/10' : 'border-[#1F1F1F] hover:border-[#2A2A2A]'
                      }`}
                    >
                      <p className="text-sm font-medium">{r.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instance Type */}
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-2">Instance Type</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {TYPES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setForm(f => ({ ...f, type: t.id }))}
                      className={`w-full p-3 rounded-lg border flex items-center justify-between transition-colors ${
                        form.type === t.id ? 'border-[#7096D1] bg-[#7096D1]/10' : 'border-[#1F1F1F] hover:border-[#2A2A2A]'
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium">{t.label}</p>
                        <p className="text-xs text-[#6B7280]">{t.cpu} · {t.ram}</p>
                      </div>
                      <span className="text-xs text-[#7096D1] font-medium">{t.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* OS */}
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-2">Operating System</label>
                <select
                  value={form.os}
                  onChange={e => setForm(f => ({ ...f, os: e.target.value }))}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7096D1]"
                >
                  {OSS.map(os => <option key={os} value={os}>{os}</option>)}
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-[#1F1F1F] flex justify-end gap-3">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg text-sm text-[#6B7280] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createInstance}
                disabled={!form.name.trim()}
                className="px-4 py-2 bg-[#7096D1] hover:bg-[#5a7fc0] disabled:opacity-40 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Create Instance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
