/* ═══════════════════════════════════════════════════════════
   JamZia iOS — Download & Info Page
   iPhone & iPad App Distribution
   ═══════════════════════════════════════════════════════════ */

import { Apple, Download, Smartphone, CheckCircle, Star, Zap, Shield, Globe } from 'lucide-react';

const FEATURES = [
  { icon: Zap, label: 'Native Performance', desc: 'Swift-optimized for 120Hz ProMotion displays' },
  { icon: Shield, label: 'Face ID & Touch ID', desc: 'Biometric authentication for secure access' },
  { icon: Globe, label: 'Universal Binary', desc: 'iPhone, iPad, and Mac Catalyst support' },
  { icon: Star, label: 'Widget Support', desc: 'Home screen widgets for quick platform access' },
];

const REQUIREMENTS = [
  'iOS 16.0 or later',
  'iPadOS 16.0 or later',
  'macOS 13.0 or later (Mac Catalyst)',
  'visionOS 1.0 or later',
  'Compatible with iPhone, iPad, iPod touch, Apple Silicon Macs, and Apple Vision Pro',
];

export default function JamIOS() {
  return (
    <div className="min-h-[100dvh] bg-black text-white">
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-3">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors shrink-0">back</a>
          <Apple size={24} className="text-white shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-bold text-white">JamZia for iOS</h1>
            <p className="text-[10px] text-[#6B7280]">The Everything App — iPhone, iPad, Mac</p>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center mx-auto mb-6">
            <Smartphone size={48} className="text-white" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-2">JamZia™ for iOS</h2>
          <p className="text-sm text-[#6B7280] max-w-md mx-auto mb-6">
            All 50+ JamZia platforms in your pocket. Native iOS experience with Face ID, widgets, and seamless XRPL wallet integration.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-white/90 transition-colors cursor-pointer">
              <Download size={16} /> Download on App Store
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-white rounded-xl text-sm font-bold hover:bg-white/[0.08] transition-colors cursor-pointer">
              <Smartphone size={16} /> TestFlight Beta
            </button>
          </div>
          <p className="text-[10px] text-[#6B7280] mt-3">Coming Soon — Join the waitlist</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {FEATURES.map((f) => (
            <div key={f.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#7096D1]/10 flex items-center justify-center mb-3">
                <f.icon size={20} className="text-[#7096D1]" />
              </div>
              <p className="text-sm font-bold text-white mb-1">{f.label}</p>
              <p className="text-xs text-[#6B7280]">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Screenshots Placeholder */}
        <div className="mb-12">
          <h3 className="text-sm font-bold text-white mb-4">App Previews</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Home Feed', 'JamPay Wallet', 'JamLive Stream', 'JamBattle Game'].map((label) => (
              <div key={label} className="aspect-[9/19] bg-[#0A0F1E] border border-white/[0.06] rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Smartphone size={24} className="text-[#6B7280] mx-auto mb-2" />
                  <p className="text-[10px] text-[#6B7280]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6 mb-8">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" /> System Requirements
          </h3>
          <div className="space-y-2">
            {REQUIREMENTS.map((req) => (
              <div key={req} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7096D1]" />
                <p className="text-xs text-[#A0AEC0]">{req}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 11-Layer Badge */}
        <div className="bg-gradient-to-r from-[#081F5C]/30 to-[#7096D1]/10 border border-[#7096D1]/20 rounded-2xl p-6 text-center">
          <p className="text-xs text-[#A0AEC0]">
            Built on the JamZia 11-Layer Architecture — Identity, Interface, Integration, Intelligence, Inventory, Interaction, Indexing, Incentive, Integrity, Insight, Infrastructure
          </p>
          <a href="#/architecture" className="inline-block mt-3 text-[10px] text-[#7096D1] hover:text-white no-underline transition-colors">
            View Architecture →
          </a>
        </div>
      </main>
    </div>
  );
}
