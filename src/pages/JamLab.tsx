import { useState } from 'react';
import {
  FlaskConical, Crosshair, Fingerprint, Database,
  Zap, CheckCircle, ChevronRight, ArrowRight
} from 'lucide-react';
import { brand } from '../config/brand';

const features = [
  {
    id: 'target',
    icon: Crosshair,
    title: 'Target',
    headline: '60+ Billion Behaviours',
    description: 'Use our partner audience builder to target across over 60 billion behaviours and create any audience imaginable in both B2B and B2C.',
    stats: [
      { value: '60B+', label: 'Behaviours' },
      { value: '2.4M', label: 'B2B Segments' },
      { value: '890M', label: 'B2C Profiles' },
    ],
    color: 'blue',
    highlights: ['Demographic targeting', 'Interest-based audiences', 'Intent signals', 'Lookalike modeling', 'Geofencing', 'Device graphs']},
  {
    id: 'identify',
    icon: Fingerprint,
    title: 'Identify',
    headline: 'SuperPixel™ Technology',
    description: 'Use our partner SuperPixel to match any traffic sent to your website to user profiles for any form of reactivation.',
    stats: [
      { value: '95%', label: 'Match Rate' },
      { value: '<50ms', label: 'Resolution' },
      { value: 'Real-time', label: 'Processing' },
    ],
    color: 'purple',
    highlights: ['Site visitor identification', 'Anonymous visitor tracking', 'Cross-device matching', 'Cookieless targeting', 'Probabilistic matching', 'Deterministic resolution']},
  {
    id: 'match',
    icon: Database,
    title: 'Match',
    headline: '280M+ Consumer Profiles',
    description: 'Use our robust database of over 280 million consumer profiles to enrich and match any data point possible.',
    stats: [
      { value: '280M+', label: 'Profiles' },
      { value: '14K+', label: 'Data Attributes' },
      { value: '99.2%', label: 'Accuracy' },
    ],
    color: 'amber',
    highlights: ['Identity resolution', 'Data enrichment', 'Email matching', 'Phone matching', 'Postal matching', 'Custom segments']},
  {
    id: 'activate',
    icon: Zap,
    title: 'Activate',
    headline: 'Direct Sync Integrations',
    description: 'Use our direct syncing integrations to send the data anywhere to any target — JamLab™, JamBuildr™, JamSolo™ — to activate your audience today.',
    stats: [
      { value: '200+', label: 'Integrations' },
      { value: 'Instant', label: 'Sync' },
      { value: 'API', label: 'Access' },
    ],
    color: 'green',
    highlights: ['JamLab™ campaigns', 'JamBuildr™ CRM sync', 'JamSolo™ email sends', 'Social platform upload', 'DSP integration', 'Custom webhook endpoints']},
];

const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: 'text-blue-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', icon: 'text-purple-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: 'text-amber-400' },
  green: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: 'text-emerald-400' }};

const howItWorks = [
  { step: '01', title: 'Upload Your Data', desc: 'Import first-party data or start fresh with our audience builder' },
  { step: '02', title: 'Build & Enrich', desc: 'Target, identify, and match against our 280M+ profile database' },
  { step: '03', title: 'Activate Everywhere', desc: 'Sync to JamLab™, JamBuildr™, JamSolo™, or 200+ integrations' },
];

const testimonials = [
  { quote: 'JamLab gave us 3x ROAS within the first month. The data control is unmatched.', author: 'Sarah K.', role: 'CMO, RetailCo' },
  { quote: 'We identified 40% more site visitors than our previous solution. Game changer.', author: 'David M.', role: 'Head of Growth, SaaSFirm' },
  { quote: 'The audience matching accuracy is incredible. 99.2% means zero wasted spend.', author: 'Lisa T.', role: 'Media Director, AgencyX' },
];

export default function JamLab() {
  const [activeFeature, setActiveFeature] = useState('target');
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const active = features.find(f => f.id === activeFeature) || features[0];
  const c = colorMap[active.color];

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSignedUp(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <FlaskConical size={20} className="text-teal-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Lab™</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-16">
        {/* ─── HERO ─── */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-[800px] mx-auto text-center relative">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400 mb-4">
              <FlaskConical size={12} />
              Advertiser Intelligence Platform
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {brand.prefix}Lab™ Gives Back<br />
              <span className="text-teal-400">Control</span> to the Advertisers
            </h1>
            <p className="text-[#A0AEC0] text-base sm:text-lg max-w-xl mx-auto mb-8">
              Complete control over your data. Target any audience, identify any traffic, match any data — on any platform.
            </p>

            {/* Sign Up Form */}
            <div className="max-w-[420px] mx-auto">
              {signedUp ? (
                <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 text-center">
                  <CheckCircle size={32} className="mx-auto text-teal-400 mb-3" />
                  <p className="text-lg font-semibold text-white">Welcome to {brand.prefix}Lab™</p>
                  <p className="text-sm text-[#A0AEC0] mt-1">Check your email to activate your account.</p>
                </div>
              ) : (
                <form onSubmit={handleSignUp} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email"
                    required
                    className="flex-1 bg-[#1A1F2E] text-white text-sm placeholder-[#6B7280] rounded-xl px-4 py-3 outline-none border border-white/[0.08] focus:border-teal-500/30"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-teal-500 text-black font-bold text-sm rounded-xl hover:bg-teal-400 transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
                  >
                    Sign Up Now
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-[#6B7280] mt-3">No credit card required • Free tier available • Powered by Ad9x™</p>
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section className="py-12 px-4 max-w-[1200px] mx-auto">
          {/* Feature Tabs */}
          <div className="flex justify-center gap-1 mb-8">
            {features.map(f => {
              const fc = colorMap[f.color];
              const isActive = activeFeature === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFeature(f.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? `${fc.bg} ${fc.text} ${fc.border}`
                      : 'text-[#6B7280] hover:text-white border border-transparent'
                  }`}
                >
                  <f.icon size={16} />
                  {f.title}
                </button>
              );
            })}
          </div>

          {/* Active Feature Detail */}
          <div className={`bg-[#0A0F1E] border ${c.border} rounded-2xl p-6 sm:p-8`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Description */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${c.bg} ${c.border} rounded-xl flex items-center justify-center`}>
                    <active.icon size={24} className={c.icon} />
                  </div>
                  <div>
                    <h2 className={`font-display text-2xl font-bold ${c.text}`}>{active.title}</h2>
                    <p className="text-sm text-white font-semibold">{active.headline}</p>
                  </div>
                </div>
                <p className="text-sm text-[#A0AEC0] leading-relaxed mb-6">{active.description}</p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2">
                  {active.highlights.map(h => (
                    <div key={h} className="flex items-center gap-2 text-xs text-[#A0AEC0]">
                      <CheckCircle size={12} className={c.icon} />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Stats */}
              <div className="grid grid-cols-3 gap-3">
                {active.stats.map(s => (
                  <div key={s.label} className={`${c.bg} ${c.border} rounded-2xl p-4 text-center`}>
                    <p className={`text-2xl sm:text-3xl font-bold ${c.text}`}>{s.value}</p>
                    <p className="text-[10px] text-[#6B7280] mt-1">{s.label}</p>
                  </div>
                ))}
                <div className={`col-span-3 ${c.bg} ${c.border} rounded-2xl p-4`}>
                  <div className="h-24 flex items-end gap-1">
                    {[35, 55, 42, 68, 78, 85, 72, 90, 95, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          backgroundColor: active.color === 'blue' ? 'rgba(96,165,250,0.4)' : active.color === 'purple' ? 'rgba(168,85,247,0.4)' : active.color === 'amber' ? 'rgba(245,158,11,0.4)' : 'rgba(34,197,94,0.4)'}}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] text-[#6B7280] text-center mt-2">Performance trend — last 10 campaigns</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-12 px-4 max-w-[1000px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-white mb-2">How It Works</h2>
            <p className="text-sm text-[#A0AEC0]">From data to activation in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {howItWorks.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-teal-500/20 transition-all">
                  <span className="text-3xl font-bold text-teal-400/30">{s.step}</span>
                  <h3 className="text-lg font-semibold text-white mt-2">{s.title}</h3>
                  <p className="text-xs text-[#A0AEC0] mt-2">{s.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-2 z-10">
                    <ChevronRight size={16} className="text-[#6B7280]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-12 px-4 max-w-[1000px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-white mb-2">Trusted by Advertisers</h2>
            <p className="text-sm text-[#A0AEC0]">Results that speak for themselves</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
                <p className="text-sm text-[#A0AEC0] italic mb-4">"{t.quote}"</p>
                <div>
                  <p className="text-xs font-semibold text-white">{t.author}</p>
                  <p className="text-[10px] text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BOTTOM CTA ─── */}
        <section className="py-16 px-4">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-3">Ready to Take Control?</h2>
            <p className="text-sm text-[#A0AEC0] mb-6">
              Join 12,000+ advertisers using {brand.prefix}Lab™ to own their data, reach their audience, and maximize every dollar.
            </p>
            <a
              href="#/landing"
              className="inline-flex items-center gap-2 px-8 py-3 bg-teal-500 text-black font-bold text-sm rounded-full hover:bg-teal-400 transition-colors no-underline"
            >
              Sign Up Now
              <ArrowRight size={16} />
            </a>
            <p className="text-[10px] text-[#6B7280] mt-4">Powered by Ad9x™</p>
          </div>
        </section>
      </main>
    </div>
  );
}
