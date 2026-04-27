import { Link } from 'react-router';
import { ArrowRight, HardDrive, Radio, Users, Megaphone, Wallet, BarChart3 } from 'lucide-react';
import { brand } from '../config/brand';

const iconMap: Record<string, React.ElementType> = {
  '☁️': HardDrive,
  '🎬': Radio,
  '📊': Users,
  '📢': Megaphone,
  '🎯': BarChart3,
  '💰': Wallet,
};

const colorMap: Record<number, string> = {
  0: '#7096D1',
  1: '#ec4899',
  2: '#22c55e',
  3: '#f59e0b',
  4: '#a855f7',
  5: '#06b6d4',
};

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="relative bg-black pt-24 pb-16 px-6 z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#081F5C]/30 border border-[#7096D1]/30 rounded-full text-xs font-semibold text-[#7096D1] mb-4">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Backend Integrations
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
          JamZia Platform Integrations
        </h2>
        <p className="text-[#A0AEC0] text-base sm:text-lg max-w-2xl mx-auto">
          Storage, streaming, CRM, advertising, and monetization — all built into the JamZia ecosystem.
        </p>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
        {brand.integrations.map((integration, index) => {
          const Icon = iconMap[integration.icon] || BarChart3;
          const color = colorMap[index] || '#7096D1';

          return (
            <Link
              key={integration.name}
              to="/integrations"
              className="block no-underline rounded-[14px] p-[1px] jamzia-gradient-border jamzia-card-hover"
            >
              <div className="bg-[#0A0F1E] rounded-[14px] p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{integration.name}</h3>
                </div>
                <p className="text-sm text-[#A0AEC0] leading-relaxed flex-1">
                  {integration.description}
                </p>
                <div className="flex items-center gap-1 mt-4 text-[#7096D1] text-sm font-semibold">
                  <span>Configure</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Powered by banner */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 bg-[#0A0F1E] border border-white/[0.08] rounded-full px-6 py-3">
          <span className="text-xl">🔗</span>
          <span className="text-sm text-[#A0AEC0]">
            <strong className="text-white">6 backend services</strong> connected and running
          </span>
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
