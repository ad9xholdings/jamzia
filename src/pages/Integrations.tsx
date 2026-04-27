import { useState } from 'react';
import {
  Link2, Unlink, RefreshCw, Settings, ChevronRight, Activity,
  HardDrive, Radio, Users, Megaphone, BarChart3, Wallet, ArrowLeft,
  CheckCircle, XCircle, Clock, AlertTriangle
} from 'lucide-react';
import { useIntegrationsStore, type IntegrationService } from '../store/useIntegrationsStore';

const categoryIcons: Record<string, React.ElementType> = {
  storage: HardDrive,
  streaming: Radio,
  crm: Users,
  advertising: Megaphone,
  monetization: Wallet,
  analytics: BarChart3,
};

const categoryColors: Record<string, string> = {
  storage: '#7096D1',
  streaming: '#ec4899',
  crm: '#22c55e',
  advertising: '#f59e0b',
  monetization: '#a855f7',
  analytics: '#06b6d4',
};

const statusIcons = {
  connected: <CheckCircle size={14} className="text-green-400" />,
  disconnected: <XCircle size={14} className="text-red-400" />,
  pending: <Clock size={14} className="text-yellow-400" />,
  error: <AlertTriangle size={14} className="text-orange-400" />,
};

const statusBg = {
  connected: 'bg-green-500/10 text-green-400',
  disconnected: 'bg-red-500/10 text-red-400',
  pending: 'bg-yellow-500/10 text-yellow-400',
  error: 'bg-orange-500/10 text-orange-400',
};

function ServiceCard({ service, onClick }: { service: IntegrationService; onClick: () => void }) {
  const CatIcon = categoryIcons[service.category] || Activity;
  const color = categoryColors[service.category] || '#7096D1';

  return (
    <div className="rounded-[14px] p-[1px] jamzia-gradient-border jamzia-card-hover cursor-pointer" onClick={onClick}>
      <div className="bg-[#0A0F1E] rounded-[14px] p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
              <CatIcon size={20} style={{ color }} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">{service.name}</h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">{service.category}</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full ${statusBg[service.status]}`}>
            {statusIcons[service.status]}
            {service.status}
          </div>
        </div>

        <p className="text-sm text-[#A0AEC0] mb-4 line-clamp-2">{service.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {service.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="bg-white/[0.02] rounded-lg p-2">
              <p className="text-xs text-[#6B7280]">{m.label}</p>
              <p className="text-sm font-bold text-white">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {service.features.slice(0, 3).map((f) => (
              <span key={f} className="text-[10px] text-[#A0AEC0] bg-white/5 px-2 py-0.5 rounded-full">{f}</span>
            ))}
            {service.features.length > 3 && (
              <span className="text-[10px] text-[#6B7280]">+{service.features.length - 3}</span>
            )}
          </div>
          <ChevronRight size={16} className="text-[#6B7280]" />
        </div>
      </div>
    </div>
  );
}

function ServiceDetail({ service, onBack }: { service: IntegrationService; onBack: () => void }) {
  const { toggleService, updateConfig } = useIntegrationsStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'config'>('overview');
  const CatIcon = categoryIcons[service.category] || Activity;
  const color = categoryColors[service.category] || '#7096D1';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <CatIcon size={24} style={{ color }} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-white">{service.name}</h2>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBg[service.status]}`}>
                {service.status}
              </span>
              <span className="text-xs text-[#6B7280]">Powered by Ad9x™</span>
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={`#${service.platformHref}`}
            className="px-3 py-1.5 text-xs font-semibold text-[#7096D1] border border-[#7096D1]/30 rounded-lg hover:bg-[#7096D1]/10 transition-colors no-underline"
          >
            View Platform →
          </a>
          <button
            onClick={() => toggleService(service.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              service.status === 'connected'
                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
            }`}
          >
            {service.status === 'connected' ? <Unlink size={14} /> : <Link2 size={14} />}
            {service.status === 'connected' ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-1">
        {(['overview', 'config'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === tab ? 'text-[#7096D1] border-[#7096D1]' : 'text-[#6B7280] border-transparent hover:text-white'
            }`}
          >
            {tab === 'overview' ? 'Overview' : 'Configuration'}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {service.metrics.map((m) => (
              <div key={m.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-white">{m.value}</p>
                <p className="text-xs text-green-400">{m.change}</p>
                <p className="text-[10px] text-[#6B7280] mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="rounded-[14px] p-[1px] jamzia-gradient-border">
            <div className="bg-[#0A0F1E] rounded-[14px] p-5">
              <h3 className="font-display text-sm font-bold text-white mb-3">Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 p-3 bg-white/[0.02] rounded-lg">
                    <CheckCircle size={14} className="text-green-400 shrink-0" />
                    <span className="text-sm text-white">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-[14px] p-[1px] jamzia-gradient-border">
            <div className="bg-[#0A0F1E] rounded-[14px] p-5">
              <h3 className="font-display text-sm font-bold text-white mb-2">About</h3>
              <p className="text-sm text-[#A0AEC0] leading-relaxed">{service.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-[#6B7280]">
                <RefreshCw size={12} />
                <span>Last synced: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="rounded-[14px] p-[1px] jamzia-gradient-border">
          <div className="bg-[#0A0F1E] rounded-[14px] p-5">
            <h3 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Settings size={16} /> Configuration
            </h3>
            <div className="space-y-4">
              {Object.entries(service.config).map(([key, value]) => (
                <div key={key}>
                  <label className="text-xs text-[#A0AEC0] uppercase tracking-wider font-semibold block mb-1.5">{key}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateConfig(service.id, key, e.target.value)}
                    className="w-full bg-[#1A1F2E] text-white text-sm rounded-lg px-4 py-2.5 outline-none border border-white/[0.08] focus:border-[#7096D1]/50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Integrations() {
  const { services, activeServiceId, setActiveService } = useIntegrationsStore();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const activeService = services.find((s) => s.id === activeServiceId);

  const filtered = categoryFilter === 'all'
    ? services
    : services.filter((s) => s.category === categoryFilter);

  const categories = ['all', ...Array.from(new Set(services.map((s) => s.category)))];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] sticky top-0 bg-black/90 backdrop-blur-md z-30">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-white">JamZia Integrations</h1>
            <p className="text-[#6B7280] text-xs sm:text-sm">Powered by Ad9x™</p>
          </div>
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6">
        {activeService ? (
          <ServiceDetail service={activeService} onBack={() => setActiveService(null)} />
        ) : (
          <div className="space-y-6">
            {/* Stats summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Connected', value: services.filter((s) => s.status === 'connected').length, color: 'text-green-400' },
                { label: 'Pending', value: services.filter((s) => s.status === 'pending').length, color: 'text-yellow-400' },
                { label: 'Disconnected', value: services.filter((s) => s.status === 'disconnected').length, color: 'text-red-400' },
                { label: 'Total Services', value: services.length, color: 'text-white' },
              ].map((s) => (
                <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer capitalize ${
                    categoryFilter === cat ? 'bg-[#F7F2EB] text-black' : 'bg-white/5 text-[#A0AEC0] hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} onClick={() => setActiveService(service.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
