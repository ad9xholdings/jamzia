import { brand } from '../config/brand';
import { Zap, Globe, Shield, TrendingUp } from 'lucide-react';

export default function TeamSection() {
  return (
    <section id="about" className="relative bg-black pt-16 pb-24 px-6 z-10">
      {/* Team Image */}
      <div className="max-w-[900px] mx-auto mb-12">
        <div className="rounded-[14px] p-[1px] jamzia-gradient-border overflow-hidden">
          <div className="relative">
            <img
              src="/team-jamzia-new.jpg"
              alt="JamZia Networks Team"
              className="w-full h-auto object-cover rounded-[14px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-[14px]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-[#7096D1] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2">
                {brand.poweredBy}
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-2">
                Building the Future of Digital Infrastructure
              </h2>
              <p className="text-[#A0AEC0] text-sm sm:text-base max-w-xl">
                The team behind JamZia is reimagining how creators, businesses, and communities connect, create, and monetize on a unified platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1100px] mx-auto mb-16">
        {[
          { icon: Zap, label: 'Lightning Fast', desc: 'Edge-cached content delivery worldwide', color: '#f59e0b' },
          { icon: Shield, label: 'Enterprise Security', desc: 'AES-256 encryption, decentralized storage', color: '#22c55e' },
          { icon: Globe, label: 'Global Reach', desc: '24+ platforms, 100M+ songs, 10K+ movies', color: '#7096D1' },
          { icon: TrendingUp, label: 'Built to Scale', desc: 'From solo creators to enterprise networks', color: '#ec4899' },
        ].map((vp) => (
          <div key={vp.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-5 text-center">
            <vp.icon size={24} style={{ color: vp.color }} className="mx-auto mb-3" />
            <h3 className="font-display text-sm font-bold text-white mb-1">{vp.label}</h3>
            <p className="text-xs text-[#6B7280]">{vp.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to launch your platform?
        </h3>
        <p className="text-[#A0AEC0] text-sm sm:text-base mb-6">
          Join the JamZia ecosystem and get access to 24+ integrated platforms, decentralized storage, live streaming, CRM, advertising, and monetization tools — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={brand.nav.links.find((l) => l.href === '#pricing')?.href || '#pricing'}
            className="inline-flex items-center justify-center px-8 py-3 bg-[#F7F2EB] text-black font-bold rounded-full hover:scale-[1.02] transition-transform no-underline"
          >
            {brand.nav.ctaLabel}
          </a>
          <a
            href="/integrations"
            className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors no-underline"
          >
            Explore Integrations
          </a>
        </div>
      </div>
    </section>
  );
}
