import { useState } from 'react';
import { Check, LogIn, UserPlus } from 'lucide-react';

const plans = [
  {
    name: 'Entry',
    price: 'Free',
    period: '',
    description: 'Get started with the basics',
    features: ['1 Platform', '5GB Storage', 'Basic Streaming', 'Community Support', 'Standard Analytics']},
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing creators',
    features: ['20 Platforms', '50GB Storage', 'HD Streaming', 'Email Support', 'Advanced Analytics', 'Basic Monetization']},
  {
    name: 'Master',
    price: '$99',
    period: '/mo',
    description: 'For serious creators',
    features: ['35 Platforms', '250GB Storage', '4K Streaming', 'Priority Support', 'Full Monetization', 'Custom Branding', 'API Access'],
    highlighted: true},
  {
    name: 'Prime',
    price: '$299',
    period: '/mo',
    description: 'For studios and teams',
    features: ['50 Platforms', '1TB Storage', '4K+ Streaming', 'Dedicated Support', 'White-label', 'Team Management', 'Advanced API']},
  {
    name: 'Custom',
    price: 'Custom',
    period: '',
    description: 'Code development to your brand',
    features: ['100+ Platforms', 'Unlimited Storage', 'Unlimited Streaming', 'Dedicated Manager', 'Full White-label', 'Code Development', 'SLA Guarantee', 'Custom Brand Build']},
];

type LandingView = 'register' | 'login';

export default function Landing() {
  const [view, setView] = useState<LandingView>('register');
  const [email, setEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Master');
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please fill in all fields');
      return;
    }
    // Frontend-only validation for demo
    const stored = localStorage.getItem(`jamzia_user_${loginEmail}`);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.password === loginPassword) {
        localStorage.setItem('jamzia_session', JSON.stringify({ email: loginEmail, loggedIn: true, time: Date.now() }));
        window.location.href = '/#/social';
        return;
      }
    }
    setLoginError('Invalid email or password');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <a
            href="#/"
            className="text-[10px] text-[#6B7280] hover:text-white transition-colors no-underline"
          >
            back
          </a>
          <span className="font-display text-xl font-bold text-white tracking-tight">
            JamZia<sup className="text-[10px] font-medium ml-0.5">™</sup>
          </span>
          <div className="w-16" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12">
        {/* Toggle Buttons */}
        <div className="flex gap-0 mb-10">
          <button
            onClick={() => { setView('register'); setLoginError(''); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-l-xl border border-r-0 transition-all cursor-pointer ${
              view === 'register'
                ? 'bg-[#7096D1] text-white border-[#7096D1]'
                : 'bg-[#1A1F2E] text-[#A0AEC0] border-white/10 hover:bg-[#1A1F2E]/80'
            }`}
          >
            <UserPlus size={16} />
            Get Access Now
          </button>
          <button
            onClick={() => { setView('login'); setSubmitted(false); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-r-xl border transition-all cursor-pointer ${
              view === 'login'
                ? 'bg-[#7096D1] text-white border-[#7096D1]'
                : 'bg-[#1A1F2E] text-[#A0AEC0] border-white/10 hover:bg-[#1A1F2E]/80'
            }`}
          >
            <LogIn size={16} />
            Login
          </button>
        </div>

        {/* ─── REGISTER VIEW ─── */}
        {view === 'register' && (
          <div className="w-full max-w-[1200px]">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#081F5C]/30 border border-[#7096D1]/30 rounded-full text-xs font-semibold text-[#7096D1] mb-4">
                Registration
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                From Free to Network
              </h1>
              <p className="text-[#A0AEC0] text-base max-w-lg mx-auto">
                Start free and scale as you grow. Every tier unlocks more of the JamZia ecosystem.
              </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
              {plans.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`text-left rounded-[14px] p-[1px] transition-all cursor-pointer ${
                    selectedPlan === plan.name ? 'jamzia-gradient-border' : 'bg-white/[0.06]'
                  }`}
                >
                  <div className="bg-[#0A0F1E] rounded-[14px] p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-sm font-bold text-white">{plan.name}</h3>
                      {plan.highlighted && (
                        <span className="text-[9px] font-bold text-black bg-[#F7F2EB] px-1.5 py-0.5 rounded-full uppercase">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="mb-2">
                      <span className="font-display text-2xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-[#6B7280] text-xs">{plan.period}</span>}
                    </div>
                    <p className="text-xs text-[#6B7280] mb-3">{plan.description}</p>
                    <ul className="space-y-1.5 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-xs text-[#A0AEC0]">
                          <Check size={10} className="text-green-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              ))}
            </div>

            {/* Email capture */}
            <div className="max-w-[480px] mx-auto">
              <div className="rounded-[14px] p-[1px] jamzia-gradient-border">
                <div className="bg-[#0A0F1E] rounded-[14px] p-6 text-center">
                  {submitted ? (
                    <div className="py-2">
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Check size={20} className="text-green-400" />
                      </div>
                      <p className="text-white font-semibold text-sm">You are on the list!</p>
                      <p className="text-xs text-[#6B7280] mt-1">
                        Selected plan: <strong className="text-white">{selectedPlan}</strong>
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-[#6B7280] mb-3">
                        Selected: <strong className="text-white">{selectedPlan}</strong>
                      </p>
                      <form onSubmit={handleRegister} className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="flex-1 bg-[#1A1F2E] text-white text-sm placeholder-[#6B7280] rounded-full px-4 py-2.5 outline-none border border-white/[0.08] focus:border-[#7096D1]/50"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-[#F7F2EB] text-black font-bold text-sm rounded-full hover:scale-[1.02] transition-transform cursor-pointer shrink-0"
                        >
                          Get Access Now
                        </button>
                      </form>
                    </>
                  )}
                  <p className="text-[10px] text-[#6B7280] mt-3">
                    Yearly billing available • Cancel anytime • Powered by Ad9x™
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── 35+ PLATFORM GRID ─── */}
        {view === 'register' && (
          <div className="w-full max-w-[1200px] mx-auto mt-16 pt-10 border-t border-white/[0.06]">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#081F5C]/30 border border-[#7096D1]/30 rounded-full text-xs font-semibold text-[#7096D1] mb-3">
                50+ Platforms Included
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Every Layer. One Login.
              </h2>
              <p className="text-sm text-[#A0AEC0]">
                Your membership unlocks the full JamZia ecosystem. Browse all 35+ platforms:
              </p>
            </div>

            {/* Core 11 */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold text-[#7096D1] uppercase tracking-wider mb-3 text-center">Core Platform Layers</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  { name: 'JamVideo', icon: '🎬', desc: '10K+ movies, series, live events', href: '/video', color: '#7096D1' },
                  { name: 'JamAudio', icon: '🎵', desc: '100M+ songs, podcasts, radio', href: '/audio', color: '#7096D1' },
                  { name: 'JamLive', icon: '📺', desc: 'Live streaming with real-time chat', href: '/live', color: '#ec4899' },
                  { name: 'JamSocial', icon: '💬', desc: 'Community, timeline, messaging', href: '/social', color: '#22c55e' },
                  { name: 'JamFood', icon: '🍔', desc: 'Order, cart, checkout, delivery', href: '/food', color: '#f59e0b' },
                  { name: 'JamPay', icon: '💎', desc: 'Wallet, treasury, transactions', href: '/pay', color: '#06b6d4' },
                  { name: 'JamShop', icon: '🛒', desc: 'Marketplace for digital & physical', href: '/shop', color: '#a855f7' },
                  { name: 'JamPlay', icon: '🎮', desc: 'AR gaming & tournaments', href: '/architecture', color: '#f97316' },
                  { name: 'JamLearn', icon: '🎓', desc: 'Academy & courses', href: '/architecture', color: '#14b8a6' },
                  { name: 'JamAds', icon: '📢', desc: 'AI targeting & real-time bidding', href: '/architecture', color: '#ef4444' },
                  { name: 'JamCRM', icon: '📊', desc: 'Lead capture & pipeline mgmt', href: '/integrations', color: '#8b5cf6' },
                  { name: 'JamCloud', icon: '☁️', desc: 'Distributed storage & CDN', href: '/architecture', color: '#06b6d4' },
                ].map(p => (
                  <a key={p.name} href={`#${p.href}`} className="no-underline group">
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 hover:border-[#7096D1]/30 transition-all h-full">
                      <span className="text-xl mb-1 block">{p.icon}</span>
                      <p className="text-xs font-semibold text-white group-hover:text-[#7096D1] transition-colors">{p.name}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Natural Elements */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-3 text-center">Natural Intelligence</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'JamEarth', icon: '🌍', desc: 'Climate intelligence — NASA/NOAA/EPA', href: '/earth' },
                  { name: 'JamGreen', icon: '🌿', desc: 'Sustainable eco-marketplace', href: '/green' },
                  { name: 'JamGrow', icon: '🌱', desc: 'Smart agriculture & USDA data', href: '/grow' },
                  { name: 'JamWeather', icon: '🌤️', desc: 'Forecasts & air quality', href: '/weather' },
                ].map(p => (
                  <a key={p.name} href={`#${p.href}`} className="no-underline group">
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 hover:border-emerald-500/30 transition-all h-full">
                      <span className="text-xl mb-1 block">{p.icon}</span>
                      <p className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">{p.name}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Creator & Commerce */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider mb-3 text-center">Creator & Commerce Engine</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'JamBox', icon: '📦', desc: 'Creator analytics & monetization', href: '/box' },
                  { name: 'JamCat', icon: '🐈‍⬛', desc: 'Premium luxury auctions', href: '/cat' },
                  { name: 'JamWise', icon: '🏛️', desc: 'Financial intelligence', href: '/wise' },
                  { name: 'JamTech', icon: '💾', desc: 'Tech news & startup tracker', href: '/tech' },
                  { name: 'JamStreet', icon: '🏘️', desc: 'Community events & culture', href: '/street' },
                  { name: 'JamAR', icon: '🥽', desc: 'Augmented reality worlds', href: '/ar' },
                  { name: 'JamTok', icon: '📱', desc: 'Short-form video', href: '/tok' },
                  { name: 'JamWords', icon: '📖', desc: "Mrs. Cotton's Academy", href: '/words' },
                ].map(p => (
                  <a key={p.name} href={`#${p.href}`} className="no-underline group">
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 hover:border-rose-400/30 transition-all h-full">
                      <span className="text-xl mb-1 block">{p.icon}</span>
                      <p className="text-xs font-semibold text-white group-hover:text-rose-400 transition-colors">{p.name}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Professional (Education) */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-3 text-center">Professional — Entertainment & Education Only</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: 'JamLaw', icon: '⚖️', desc: 'Legal concepts & resources', href: '/law' },
                  { name: 'JamLawyer', icon: '🗣️', desc: 'Legal chat bot assistant', href: '/lawyer' },
                  { name: 'JamCPA', icon: '📊', desc: 'Accounting education', href: '/cpa' },
                  { name: 'JamAccountant', icon: '🧮', desc: 'Accounting chat bot', href: '/accountant' },
                  { name: 'JamDoctor', icon: '🩺', desc: 'Health education', href: '/doctor' },
                  { name: 'JamCode', icon: '💻', desc: 'Tech education', href: '/code' },
                ].map(p => (
                  <a key={p.name} href={`#${p.href}`} className="no-underline group">
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 hover:border-purple-400/30 transition-all h-full">
                      <span className="text-xl mb-1 block">{p.icon}</span>
                      <p className="text-xs font-semibold text-white group-hover:text-purple-400 transition-colors">{p.name}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Ad9x Intelligence (Prime/Network) */}
            <div>
              <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-3 text-center">Ad9x Intelligence (Prime & Network)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'JamLab', icon: '🧪', desc: 'Advertiser intelligence — 280M profiles', href: '/lab', tier: 'Prime+' },
                  { name: 'JamKind', icon: '❤️', desc: 'Custom audiences & solo ads', href: '/kind', tier: 'Prime+' },
                  { name: 'JamTribute', icon: '📊', desc: 'A/B testing & attribution', href: '/tribute', tier: 'Prime+' },
                  { name: 'JamScale', icon: '🚀', desc: '100M user growth engine', href: '/scale', tier: 'Network' },
                ].map(p => (
                  <a key={p.name} href={`#${p.href}`} className="no-underline group relative">
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 hover:border-amber-400/30 transition-all h-full">
                      <span className="absolute top-2 right-2 text-[8px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-full">{p.tier}</span>
                      <span className="text-xl mb-1 block">{p.icon}</span>
                      <p className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">{p.name}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Search Core (8 new) */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-3 text-center">Search Core</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'JamMed', icon: '🏥', desc: 'Medical intelligence', href: '/med' },
                  { name: 'JamDEX', icon: '📇', desc: 'Universal index', href: '/dex' },
                  { name: 'JamGrants', icon: '📝', desc: 'Grant intelligence', href: '/grants' },
                  { name: 'JamCredits', icon: '💳', desc: 'Credit layer', href: '/credits' },
                  { name: 'JamCom', icon: '📡', desc: 'Communications', href: '/com' },
                  { name: 'JamFed', icon: '🏛️', desc: 'Federal data', href: '/fed' },
                  { name: 'JamState', icon: '🏢', desc: 'State data hub', href: '/state' },
                  { name: 'JamLocal', icon: '🏘️', desc: 'Local layer', href: '/local' },
                ].map(p => (
                  <a key={p.name} href={`#${p.href}`} className="no-underline group">
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 hover:border-red-400/30 transition-all h-full">
                      <span className="text-xl mb-1 block">{p.icon}</span>
                      <p className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors">{p.name}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Gaming */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-3 text-center">Gaming</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: '🏰 Castle', icon: '⚔️', desc: 'AR Battle — Cotton Brick Road', href: '/battle' },
                  { name: '🎓 JamMastery', icon: '📚', desc: 'EduTech — Every Course', href: '/mastery' },
                  { name: '⚡ JamAuto', icon: '🤖', desc: 'Content Automation', href: '/auto' },
                ].map(p => (
                  <a key={p.name} href={`#${p.href}`} className="no-underline group">
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 hover:border-amber-400/30 transition-all h-full">
                      <span className="text-xl mb-1 block">{p.icon}</span>
                      <p className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">{p.name}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* XRPL Tokens */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold text-[#7096D1] uppercase tracking-wider mb-3 text-center">XRP Ledger Powered</p>
              <div className="bg-gradient-to-r from-[#081F5C]/30 to-[#7096D1]/10 border border-[#7096D1]/20 rounded-2xl p-5 text-center">
                <p className="text-sm font-bold text-white mb-2">WisdomPay™ — Cross-Border Micropayments</p>
                <p className="text-xs text-[#A0AEC0] mb-4">
                  JamZia Networks tokens are minted on the XRP Ledger for instant, low-cost global payments.
                  <a href="https://xrpl.org/about/history" target="_blank" rel="noopener noreferrer" className="text-[#7096D1] hover:underline ml-1">Learn about XRPL history →</a>
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-black/30 rounded-xl p-3">
                    <p className="text-lg font-bold text-emerald-400">SkyIvy Coin</p>
                    <p className="text-[10px] text-[#6B7280]">21 Trillion Supply</p>
                    <p className="text-[10px] text-[#6B7280]">15 Decimal Places</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-3">
                    <p className="text-lg font-bold text-amber-400">SkyLockr Coin</p>
                    <p className="text-[10px] text-[#6B7280]">21 Trillion Supply</p>
                    <p className="text-[10px] text-[#6B7280]">15 Decimal Places</p>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  15 decimal places enable incredible micropayments — send fractions of a penny across borders instantly
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <p className="text-sm text-[#A0AEC0] mb-3">
                All 50+ platforms. One membership. Start free.
              </p>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F7F2EB] text-black font-bold text-sm rounded-full hover:scale-[1.02] transition-transform no-underline"
              >
                Get Access Now
              </a>
            </div>
          </div>
        )}

        {/* ─── LOGIN VIEW ─── */}
        {view === 'login' && (
          <div className="w-full max-w-[400px]">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#081F5C]/30 border border-[#7096D1]/30 rounded-full text-xs font-semibold text-[#7096D1] mb-4">
                Member Access
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
                Welcome Back
              </h1>
              <p className="text-[#A0AEC0] text-base">
                Sign in to your JamZia account
              </p>
            </div>

            <div className="rounded-[14px] p-[1px] jamzia-gradient-border">
              <div className="bg-[#0A0F1E] rounded-[14px] p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-xs text-[#A0AEC0] font-semibold uppercase tracking-wider block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-[#1A1F2E] text-white text-sm placeholder-[#6B7280] rounded-xl px-4 py-3 outline-none border border-white/[0.08] focus:border-[#7096D1]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#A0AEC0] font-semibold uppercase tracking-wider block mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full bg-[#1A1F2E] text-white text-sm placeholder-[#6B7280] rounded-xl px-4 py-3 outline-none border border-white/[0.08] focus:border-[#7096D1]/50"
                    />
                  </div>

                  {loginError && (
                    <p className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                      {loginError}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-white/20 bg-[#1A1F2E] text-[#7096D1]" />
                      <span className="text-xs text-[#6B7280]">Remember me</span>
                    </label>
                    <button type="button" className="text-xs text-[#7096D1] hover:underline cursor-pointer">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#7096D1] text-white font-bold text-sm rounded-xl hover:bg-[#7096D1]/80 transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-[#6B7280]">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Social login */}
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" className="py-2.5 bg-[#1A1F2E] text-white text-xs font-medium rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-white/[0.08]">
                      Google
                    </button>
                    <button type="button" className="py-2.5 bg-[#1A1F2E] text-white text-xs font-medium rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-white/[0.08]">
                      Apple
                    </button>
                  </div>

                  <p className="text-center text-xs text-[#6B7280] pt-2">
                    New to JamZia?{' '}
                    <button
                      type="button"
                      onClick={() => setView('register')}
                      className="text-[#7096D1] font-semibold hover:underline cursor-pointer"
                    >
                      Get Access Now
                    </button>
                  </p>
                </form>
              </div>
            </div>

            <p className="text-[10px] text-[#6B7280] text-center mt-4">
              Powered by Ad9x™
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
