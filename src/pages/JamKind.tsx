import { useState } from 'react';
import {
  Heart, Users, Target, Zap, ArrowRight,
  CheckCircle, TrendingUp, Sparkles
} from 'lucide-react';
import { brand } from '../config/brand';

const niches = [
  { id: 'camping', name: 'Outdoor & Camping', size: '2.4M', icon: '⛺', similars: ['REI', 'Patagonia', 'The North Face', 'Coleman', 'Yeti'] },
  { id: 'fitness', name: 'Fitness & Wellness', size: '8.7M', icon: '💪', similars: ['Peloton', 'Nike Training', 'MyFitnessPal', 'Rogue Fitness', 'Lululemon'] },
  { id: 'tech', name: 'Tech & Gadgets', size: '12.1M', icon: '💻', similars: ['Apple', 'Samsung', 'Anker', 'Logitech', 'Dell'] },
  { id: 'beauty', name: 'Beauty & Skincare', size: '6.3M', icon: '💄', similars: ['Sephora', 'Ulta', 'The Ordinary', 'Glossier', 'Fenty'] },
  { id: 'finance', name: 'Personal Finance', size: '4.8M', icon: '💰', similars: ['Robinhood', 'NerdWallet', 'Mint', 'Credit Karma', 'YNAB'] },
  { id: 'gaming', name: 'Gaming & Esports', size: '9.2M', icon: '🎮', similars: ['Peripherals', 'Game Stores', 'Streaming', 'Audio Gear', 'Accessories'] },
  { id: 'parenting', name: 'Parenting & Family', size: '5.6M', icon: '👶', similars: ['Buy Buy Baby', 'Target Baby', 'Huggies', 'Pampers', 'What to Expect'] },
  { id: 'foodie', name: 'Food & Cooking', size: '7.1M', icon: '🍳', similars: ['HelloFresh', 'Blue Apron', 'Sur La Table', 'Vitamix', 'Le Creuset'] },
];

const campaigns = [
  { id: 1, name: 'Camping Gear Spring', audience: 'Outdoor & Camping', reach: '24K', clicks: '1.2K', ctr: '4.8%', status: 'active' },
  { id: 2, name: 'Fitness Equipment Q2', audience: 'Fitness & Wellness', reach: '56K', clicks: '3.1K', ctr: '5.4%', status: 'active' },
  { id: 3, name: 'Tech Accessories Promo', audience: 'Tech & Gadgets', reach: '89K', clicks: '4.5K', ctr: '5.1%', status: 'paused' },
];

function AudienceBuilder({ initialQuery }: { initialQuery?: string }) {
  const [step, setStep] = useState(1);
  const [selectedNiche, setSelectedNiche] = useState<string>('');
  const [selectedSimilars, setSelectedSimilars] = useState<string[]>([]);
  const [audienceName, setAudienceName] = useState(initialQuery || '');
  const [audienceSize, setAudienceSize] = useState('');
  const [synced, setSynced] = useState(false);
  const [created, setCreated] = useState(false);

  const niche = niches.find(n => n.id === selectedNiche);

  const toggleSimilar = (name: string) => {
    setSelectedSimilars(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };

  const handleCreate = () => {
    setCreated(true);
    setAudienceSize(niche ? niche.size : '450K');
    setStep(3);
  };

  const handleSync = () => {
    setSynced(true);
  };

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { n: 1, label: 'Niche' },
          { n: 2, label: 'Similar' },
          { n: 3, label: 'Launch' },
        ].map(s => (
          <div key={s.n} className="flex-1 flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= s.n ? 'bg-rose-500 text-white' : 'bg-white/10 text-[#6B7280]'
            }`}>{s.n}</div>
            <span className={`text-[10px] ${step >= s.n ? 'text-white' : 'text-[#6B7280]'}`}>{s.label}</span>
            {s.n < 3 && <div className={`flex-1 h-px ${step > s.n ? 'bg-rose-500' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Niche */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Choose Your Niche</h3>
          <p className="text-xs text-[#6B7280] mb-4">Select the audience type you want to build. Based on: {initialQuery ? `"${initialQuery}"` : 'your search'}.</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {niches.map(n => (
              <button
                key={n.id}
                onClick={() => { setSelectedNiche(n.id); setStep(2); }}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedNiche === n.id ? 'bg-rose-500/10 border-rose-500/30' : 'bg-[#0A0F1E] border-white/[0.06] hover:border-white/10'
                }`}
              >
                <span className="text-xl mb-1 block">{n.icon}</span>
                <p className="text-xs font-semibold text-white">{n.name}</p>
                <p className="text-[10px] text-[#6B7280]">{n.size} fans</p>
              </button>
            ))}
          </div>
          <input
            type="text"
            value={audienceName}
            onChange={e => setAudienceName(e.target.value)}
            placeholder="Name your audience..."
            className="w-full bg-[#1A1F2E] text-white text-sm placeholder-[#6B7280] rounded-xl px-4 py-3 outline-none border border-white/[0.08] focus:border-rose-500/30"
          />
        </div>
      )}

      {/* Step 2: Similar Products */}
      {step === 2 && niche && (
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Similar Products & Brands</h3>
          <p className="text-xs text-[#6B7280] mb-4">
            Select brands/products your ideal customer already loves. {brand.prefix}Kind™ will find their fans.
          </p>
          <div className="space-y-2 mb-4">
            {niche.similars.map(s => (
              <button
                key={s}
                onClick={() => toggleSimilar(s)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                  selectedSimilars.includes(s) ? 'bg-rose-500/10 border-rose-500/30' : 'bg-[#0A0F1E] border-white/[0.06]'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                  selectedSimilars.includes(s) ? 'bg-rose-500 border-rose-500' : 'border-white/20'
                }`}>
                  {selectedSimilars.includes(s) && <CheckCircle size={14} className="text-white" />}
                </div>
                <span className="text-sm text-white">{s}</span>
                <span className="ml-auto text-[10px] text-[#6B7280]">Fans of {s}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="flex-1 py-2.5 bg-white/5 text-white text-sm rounded-xl cursor-pointer hover:bg-white/10 transition-colors border border-white/10">
              Back
            </button>
            <button
              onClick={handleCreate}
              disabled={selectedSimilars.length === 0}
              className="flex-1 py-2.5 bg-rose-500 text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Audience
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Launch */}
      {step === 3 && created && (
        <div className="text-center">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-rose-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Audience Created!</h3>
          <p className="text-sm text-[#A0AEC0] mb-4">
            "{audienceName || 'Custom Audience'}" — <strong className="text-white">{audienceSize}</strong> people
          </p>

          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-left mb-4">
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Audience Details</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-[#6B7280]">Niche:</span> <span className="text-white">{niche?.name}</span></div>
              <div><span className="text-[#6B7280]">Size:</span> <span className="text-white">{audienceSize}</span></div>
              <div><span className="text-[#6B7280]">Similars:</span> <span className="text-white">{selectedSimilars.join(', ')}</span></div>
              <div><span className="text-[#6B7280]">Source:</span> <span className="text-white">SORME™ + JamKind™</span></div>
            </div>
          </div>

          {!synced ? (
            <button
              onClick={handleSync}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm rounded-xl cursor-pointer hover:from-rose-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
            >
              <Zap size={16} />
              Auto-Sync to {brand.prefix}Buildr™ + Launch Solo Ad
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-400 text-sm justify-center">
                <CheckCircle size={16} />
                Synced to {brand.prefix}Buildr™
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm justify-center">
                <CheckCircle size={16} />
                Solo Ad Campaign Ready
              </div>
              <a
                href="#/architecture"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white font-bold text-sm rounded-xl no-underline hover:bg-rose-600 transition-colors mt-2"
              >
                Launch Campaign
                <ArrowRight size={14} />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function JamKind() {
  const [activeTab, setActiveTab] = useState<'build' | 'campaigns'>('build');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-rose-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Kind™</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-xs font-semibold text-rose-400 mb-3">
            <Sparkles size={12} />
            Custom Audience Engine
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Find Fans. Build Audiences.<br />
            <span className="text-rose-400">Launch Ads.</span>
          </h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            {brand.prefix}Kind™ creates custom audiences of fans of similar products and auto-syncs them to {brand.prefix}Buildr™ for solo ad campaigns. Powered by SORME™ intent data.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Audiences Built', value: '48.2K', icon: Users },
            { label: 'Avg. CTR', value: '5.1%', icon: TrendingUp },
            { label: 'Reach', value: '280M', icon: Target },
            { label: 'Auto-Sync', value: 'JamBuildr™', icon: Zap },
          ].map(s => (
            <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
              <s.icon size={20} className="mx-auto mb-2 text-rose-400" />
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-[#6B7280]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-6">
          {(['build', 'campaigns'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${
                activeTab === tab
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'text-[#6B7280] hover:text-white border border-transparent'
              }`}
            >
              {tab === 'build' ? 'Build Audience' : 'Campaigns'}
            </button>
          ))}
        </div>

        {activeTab === 'build' && <AudienceBuilder />}

        {activeTab === 'campaigns' && (
          <div className="space-y-3 max-w-[600px] mx-auto">
            {campaigns.map(c => (
              <div key={c.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                    c.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>{c.status}</span>
                </div>
                <p className="text-[10px] text-[#6B7280] mb-2">{c.audience}</p>
                <div className="flex items-center gap-4 text-[10px] text-[#6B7280]">
                  <span>Reach: <strong className="text-white">{c.reach}</strong></span>
                  <span>Clicks: <strong className="text-white">{c.clicks}</strong></span>
                  <span>CTR: <strong className="text-green-400">{c.ctr}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
