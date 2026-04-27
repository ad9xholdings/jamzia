import { Search, Database, Shield, Activity, Network, MessageSquare, BarChart3, Globe, Lock, Cpu, Zap, Server } from 'lucide-react';

const layers = [
  { n: 1, name: 'Identity', icon: Shield, color: '#ef4444', desc: 'User authentication, role-based access control, KYC verification, and federated identity across all JamZia platforms.' },
  { n: 2, name: 'Interface', icon: Search, color: '#f97316', desc: 'Responsive UI/UX components, adaptive layouts, accessibility compliance, and cross-device rendering engine.' },
  { n: 3, name: 'Integration', icon: Network, color: '#f59e0b', desc: 'RESTful API gateways, webhook management, third-party connectors, and event-driven architecture.' },
  { n: 4, name: 'Intelligence', icon: Cpu, color: '#22c55e', desc: 'Machine learning pipelines, natural language processing, recommendation engines, and predictive analytics.' },
  { n: 5, name: 'Inventory', icon: Database, color: '#14b8a6', desc: 'Distributed data storage, schema management, replication strategies, and backup/recovery protocols.' },
  { n: 6, name: 'Interaction', icon: MessageSquare, color: '#06b6d4', desc: 'Real-time messaging, notification routing, collaboration tools, and social graph operations.' },
  { n: 7, name: 'Indexing', icon: Globe, color: '#7096D1', desc: 'Search engine optimization, content discovery algorithms, ranking systems, and query optimization.' },
  { n: 8, name: 'Incentive', icon: Zap, color: '#a855f7', desc: 'Reward distribution, token economics, gamification systems, and loyalty program management.' },
  { n: 9, name: 'Integrity', icon: Lock, color: '#ec4899', desc: 'Data encryption, audit logging, compliance monitoring, fraud detection, and vulnerability scanning.' },
  { n: 10, name: 'Insight', icon: BarChart3, color: '#f43f5e', desc: 'Business intelligence dashboards, custom reporting, anomaly detection, and performance metrics.' },
  { n: 11, name: 'Infrastructure', icon: Server, color: '#6b7280', desc: 'Cloud orchestration, load balancing, auto-scaling, CDN distribution, and disaster recovery.' },
];

export default function ElevenLayers({ title, subtitle, icon: HeaderIcon, color }: { title: string; subtitle: string; icon: React.ElementType; color: string }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-3">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors shrink-0">back</a>
          <HeaderIcon size={24} style={{ color }} className="shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-bold text-white">{title}</h1>
            <p className="text-[10px] text-[#6B7280]">{subtitle}</p>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-white mb-2">11-Layer Architecture</h2>
          <p className="text-sm text-[#6B7280]">Core deliverable stack for {title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div key={layer.n} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${layer.color}15` }}>
                    <Icon size={20} style={{ color: layer.color }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: layer.color }}>Layer {layer.n}</span>
                    <p className="text-sm font-bold text-white">{layer.name}</p>
                  </div>
                </div>
                <p className="text-xs text-[#A0AEC0] leading-relaxed">{layer.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-gradient-to-r from-[#081F5C]/30 to-[#7096D1]/10 border border-[#7096D1]/20 rounded-2xl p-6 text-center">
          <Activity size={24} className="mx-auto text-[#7096D1] mb-2" />
          <p className="text-sm text-[#A0AEC0]">All 11 layers are integrated with the Ad9x Intelligence Engine and synchronized across the full JamZia ecosystem.</p>
        </div>
      </main>
    </div>
  );
}
