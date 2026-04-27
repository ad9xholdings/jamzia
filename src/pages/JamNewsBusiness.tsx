import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Radio, Clock, Eye, Layers,
  CheckCircle, Scale, Anchor, ChevronRight, Building2,
  BarChart3, Landmark,
  Shield, Factory, Zap,
} from 'lucide-react';

// ── 11 Layers of Truth ──
const TRUTH_LAYERS = [
  'Source Verification', 'Cross-Reference Check', 'Expert Review',
  'Document Analysis', 'Timeline Validation', 'Context Preservation',
  'Bias Detection Passed', 'Primary Source Priority', 'Transparency Mark',
  'Correction Log Clear', 'Public Accountability',
];

interface BizStory {
  id: string;
  headline: string;
  summary: string;
  category: string;
  timestamp: string;
  sources: string[];
  truthLayers: number;
  marketImpact: 'positive' | 'negative' | 'neutral';
  leftAngle: string;
  rightAngle: string;
  middleGround: string;
  isBreaking?: boolean;
  views: number;
  readTime: string;
}

const BIZ_CATEGORIES = ['All', 'Breaking', 'Markets', 'Economy', 'Crypto', 'Real Estate', 'Labor', 'Energy', 'Tech', 'Trade'];

const BIZ_STORIES: BizStory[] = [
  {
    id: 'b1', headline: 'S&P 500 Reaches Record High as Tech Earnings Beat Expectations',
    summary: 'Major indices surged Wednesday after quarterly earnings from technology giants exceeded analyst forecasts. The S&P 500 closed at 5,487, up 1.2%, while the Nasdaq gained 1.8%. Semiconductor stocks led gains.',
    category: 'Markets', timestamp: '12 min ago', sources: ['SEC Filings', 'Bloomberg Terminal Data', 'Earnings Call Transcripts'],
    truthLayers: 11, marketImpact: 'positive', leftAngle: 'Progressives warn the rally benefits wealthy investors disproportionately.',
    rightAngle: 'Conservatives credit deregulation and business-friendly policies for market confidence.',
    middleGround: 'Strong earnings reflect genuine productivity gains, but benefits remain concentrated among asset holders.', isBreaking: true,
    views: 67200, readTime: '3 min',
  },
  {
    id: 'b2', headline: 'Federal Minimum Wage Debate Heats Up in Congress',
    summary: 'Legislation proposing a phased increase to $17 per hour by 2028 is advancing through committee, with hearings scheduled next month. CBO estimates project both job gains and losses.',
    category: 'Labor', timestamp: '28 min ago', sources: ['CBO Report', 'Committee Hearing Schedule', 'BLS Wage Data'],
    truthLayers: 10, marketImpact: 'neutral', leftAngle: 'Labor advocates say current wages are below living wage in most metro areas.',
    rightAngle: 'Business groups warn small employers may cut jobs or hours to offset costs.',
    middleGround: 'Indexed, phased implementation with regional adjustments could balance worker needs with business viability.',
    views: 45100, readTime: '5 min',
  },
  {
    id: 'b3', headline: 'Cryptocurrency Regulation Framework Released by Treasury',
    summary: 'New guidance clarifies tax reporting for digital assets, stablecoin reserve requirements, and licensing for exchanges. Industry has 90 days to comment.',
    category: 'Crypto', timestamp: '45 min ago', sources: ['Treasury Department Release', 'IRS Guidance', 'Industry Comments'],
    truthLayers: 10, marketImpact: 'positive', leftAngle: 'Consumer advocates want stronger investor protections and fraud prevention.',
    rightAngle: 'Crypto proponents argue excessive regulation could drive innovation overseas.',
    middleGround: 'Clear rules provide legitimacy while targeted oversight protects consumers without stifling innovation.',
    views: 82300, readTime: '6 min',
  },
  {
    id: 'b4', headline: 'Housing Starts Fall 8% as Mortgage Rates Remain Elevated',
    summary: 'New residential construction declined for the third consecutive month. Single-family starts dropped 12% while multi-family units saw a smaller 3% decline. Median home prices held steady.',
    category: 'Real Estate', timestamp: '1 hr ago', sources: ['Census Bureau', 'HUD Data', 'Mortgage Bankers Association'],
    truthLayers: 11, marketImpact: 'negative', leftAngle: 'Affordable housing advocates demand emergency construction subsidies.',
    rightAngle: 'Market analysts say the correction is healthy after pandemic-era overheating.',
    middleGround: 'Supply constraints persist but the market is normalizing. Policy should focus on zoning reform and construction workforce expansion.',
    views: 38400, readTime: '4 min',
  },
  {
    id: 'b5', headline: 'Renewable Energy Investment Surpasses Fossil Fuel for Third Year',
    summary: 'Global clean energy investment reached $1.8 trillion in 2024, exceeding fossil fuel investment for the third consecutive year. Solar and battery storage led growth.',
    category: 'Energy', timestamp: '2 hr ago', sources: ['IEA World Energy Outlook', 'IRENA Data', 'Private Investment Reports'],
    truthLayers: 11, marketImpact: 'positive', leftAngle: 'Environmental groups say the pace is still insufficient for climate targets.',
    rightAngle: 'Traditional energy advocates caution against premature fossil fuel phase-out.',
    middleGround: 'Market forces increasingly favor renewables on cost alone, reducing the need for ideological energy battles.',
    views: 29500, readTime: '5 min',
  },
  {
    id: 'b6', headline: 'Trade Deficit Narrows as Domestic Manufacturing Expands',
    summary: 'The monthly trade gap shrank 6% as reshoring initiatives and automation investments boosted domestic production. Semiconductor and pharmaceutical sectors led growth.',
    category: 'Trade', timestamp: '3 hr ago', sources: ['Commerce Department', 'Census FTD', 'Industry Association Reports'],
    truthLayers: 9, marketImpact: 'positive', leftAngle: 'Labor advocates want stronger domestic content requirements.',
    rightAngle: 'Free trade proponents warn protectionism raises consumer prices.',
    middleGround: 'Strategic reshoring of critical supply chains balances economic security with trade efficiency.',
    views: 21800, readTime: '4 min',
  },
  {
    id: 'b7', headline: 'Small Business Loan Approvals Hit Five-Year High',
    summary: 'Lending to small businesses increased 14% year-over-year, driven by improved approval rates at regional banks and expansion of government-guaranteed programs.',
    category: 'Economy', timestamp: '4 hr ago', sources: ['Federal Reserve Data', 'SBA Quarterly Report', 'Banking Association Survey'],
    truthLayers: 9, marketImpact: 'positive', leftAngle: 'Advocates say access remains unequal across demographic groups.',
    rightAngle: 'Fiscal conservatives question the long-term sustainability of government loan guarantees.',
    middleGround: 'Increased capital flow supports entrepreneurship but oversight is needed to ensure equitable access.',
    views: 31600, readTime: '3 min',
  },
  {
    id: 'b8', headline: 'Big Tech Antitrust Trial Begins in Federal Court',
    summary: 'The landmark case against a major technology company over search monopoly practices began opening arguments. The trial is expected to last 8-10 weeks.',
    category: 'Tech', timestamp: '5 hr ago', sources: ['Court Filings', 'DOJ Press Release', 'Legal Analysis'],
    truthLayers: 10, marketImpact: 'neutral', leftAngle: 'Anti-monopoly advocates say breakup is necessary to restore competition.',
    rightAngle: 'Business groups argue market definition is too narrow and consumers benefit from integrated services.',
    middleGround: 'The case will clarify competition law in digital markets, regardless of outcome.',
    views: 54200, readTime: '7 min',
  },
];

const MARKET_TICKER = [
  { symbol: 'S&P 500', value: '5,487.23', change: '+1.2%', up: true },
  { symbol: 'Nasdaq', value: '17,892.45', change: '+1.8%', up: true },
  { symbol: 'Dow', value: '38,765.12', change: '+0.4%', up: true },
  { symbol: 'XRP', value: '$0.62', change: '+3.4%', up: true },
  { symbol: '10Y Yield', value: '4.28%', change: '-0.02', up: false },
  { symbol: 'Crude Oil', value: '$78.45', change: '-1.2%', up: false },
  { symbol: 'Gold', value: '$2,345', change: '+0.6%', up: true },
  { symbol: 'Bitcoin', value: '$67,890', change: '+2.1%', up: true },
];

function SpinBadge({ type }: { type: 'nospin' | 'middle' | 'sourced' }) {
  const config = {
    nospin: { icon: Shield, text: 'No Spin', color: 'text-emerald-400 bg-emerald-500/10' },
    middle: { icon: Scale, text: 'Middle Ground', color: 'text-[#7096D1] bg-[#7096D1]/10' },
    sourced: { icon: Anchor, text: 'Sourced', color: 'text-amber-400 bg-amber-500/10' },
  };
  const C = config[type];
  return <span className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-medium ${C.color}`}><C.icon size={8} />{C.text}</span>;
}

function TruthBadge({ layers }: { layers: number }) {
  return (
    <div className="flex items-center gap-1" title={`${layers}/11 truth layers verified`}>
      <Layers size={10} className={layers >= 10 ? 'text-emerald-400' : 'text-amber-400'} />
      <span className={`text-[9px] font-medium ${layers >= 10 ? 'text-emerald-400' : 'text-amber-400'}`}>{layers}/11 Truth</span>
    </div>
  );
}

export default function JamNewsBusiness() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState<BizStory | null>(null);

  const filtered = activeCategory === 'All' ? BIZ_STORIES
    : activeCategory === 'Breaking' ? BIZ_STORIES.filter(s => s.isBreaking)
    : BIZ_STORIES.filter(s => s.category === activeCategory);

  const featured = BIZ_STORIES.find(s => s.isBreaking) || BIZ_STORIES[0];

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* ── Market Ticker ── */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06] overflow-hidden">
        <div className="flex items-center gap-6 py-2 px-3 sm:px-6 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
          {[...MARKET_TICKER, ...MARKET_TICKER].map((m, i) => (
            <span key={i} className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-medium text-[#A0AEC0]">{m.symbol}</span>
              <span className="text-[10px] font-bold text-white">{m.value}</span>
              <span className={`text-[10px] font-medium ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {m.up ? <TrendingUp size={10} className="inline mr-0.5" /> : <TrendingDown size={10} className="inline mr-0.5" />}
                {m.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Header ── */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center">
              <Building2 size={20} className="text-[#F7F2EB]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                JamNews Business™ <span className="text-[10px] font-normal text-[#7096D1] border border-[#7096D1]/30 px-1.5 py-0.5 rounded">Markets</span>
              </h1>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">No-Spin Business Intelligence — 24/7</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <CheckCircle size={12} className="text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-medium">11 Layers of Truth™</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7096D1]/10 border border-[#7096D1]/20 rounded-lg">
                <Scale size={12} className="text-[#7096D1]" />
                <span className="text-[10px] text-[#7096D1] font-medium">Middle Ground</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#6B7280] max-w-2xl">
            Business news that meets in the middle — markets, economy, crypto, real estate, labor, energy, and trade. 
            Every number verified. Every angle presented. No agenda. Just the truth.
          </p>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
            {BIZ_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat ? 'bg-[#7096D1]/15 text-[#7096D1] border border-[#7096D1]/20' : 'text-[#6B7280] hover:text-white hover:bg-white/[0.03]'
                }`}>
                {cat === 'Breaking' && <Zap size={10} className="inline mr-1 text-red-400" />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">

        {/* ── Featured + Market Overview ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Featured Story */}
          <div className="lg:col-span-2 bg-[#0A0F1E] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-[#081F5C]/80 to-[#0A0F1E] flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{background: 'radial-gradient(circle at 30% 50%, #7096D1 0%, transparent 50%)'}} />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#7096D1]/20 border-2 border-[#7096D1]/40 flex items-center justify-center mx-auto mb-3">
                  <BarChart3 size={32} className="text-[#7096D1]" />
                </div>
                <p className="text-xs text-white/70 font-medium">JamNews Business™ Live Stream</p>
                <p className="text-[10px] text-[#7096D1] mt-1">Streaming Daily Market Briefing</p>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500/90 px-2.5 py-1 rounded-full">
                <Radio size={10} className="text-white animate-pulse" />
                <span className="text-[10px] font-bold text-white">LIVE</span>
              </div>
              {featured.marketImpact === 'positive' && (
                <div className="absolute top-3 right-3 bg-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-400 font-medium">Market Positive</div>
              )}
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold">{featured.category}</span>
                <span className="text-[#6B7280]">•</span>
                <span className="text-[10px] text-[#6B7280]">{featured.timestamp}</span>
                <TruthBadge layers={featured.truthLayers} />
                <SpinBadge type="nospin" />
                <SpinBadge type="middle" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">{featured.headline}</h2>
              <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed mb-3">{featured.summary}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <button onClick={() => setSelectedStory(featured)} className="text-xs text-[#7096D1] hover:text-[#F7F2EB] font-medium flex items-center gap-1 cursor-pointer">
                  Full Analysis <ChevronRight size={14} />
                </button>
                <span className="text-[10px] text-[#6B7280] flex items-center gap-1"><Eye size={10} /> {featured.views.toLocaleString()}</span>
                <span className="text-[10px] text-[#6B7280] flex items-center gap-1"><Clock size={10} /> {featured.readTime}</span>
              </div>
            </div>
          </div>

          {/* Market Overview Sidebar */}
          <div className="space-y-3">
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Landmark size={14} className="text-[#7096D1]" />
                <span className="text-xs font-semibold text-white">Market Overview</span>
              </div>
              <div className="space-y-2">
                {MARKET_TICKER.slice(0, 5).map(m => (
                  <div key={m.symbol} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-xs text-[#A0AEC0]">{m.symbol}</span>
                    <div className="text-right">
                      <span className="text-xs font-medium text-white block">{m.value}</span>
                      <span className={`text-[9px] ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>{m.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector Performance */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Factory size={14} className="text-[#7096D1]" />
                <span className="text-xs font-semibold text-white">Sector Movers</span>
              </div>
              <div className="space-y-2">
                {[
                  { sector: 'Technology', change: '+2.4%', up: true },
                  { sector: 'Healthcare', change: '+0.8%', up: true },
                  { sector: 'Energy', change: '-1.2%', up: false },
                  { sector: 'Financials', change: '+0.3%', up: true },
                  { sector: 'Real Estate', change: '-0.7%', up: false },
                ].map(s => (
                  <div key={s.sector} className="flex items-center justify-between">
                    <span className="text-[10px] text-[#A0AEC0]">{s.sector}</span>
                    <span className={`text-[10px] font-medium ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 11 Layers Badge */}
            <div className="bg-gradient-to-br from-[#081F5C]/40 to-[#0A0F1E] border border-[#7096D1]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers size={14} className="text-[#7096D1]" />
                <span className="text-xs font-semibold text-[#F7F2EB]">11 Layers of Truth™</span>
              </div>
              <p className="text-[10px] text-[#6B7280] leading-relaxed">
                Every business story is verified through 11 independent fact-checking layers before publication. 
                No spin. No agenda. Just verified data and balanced perspectives.
              </p>
            </div>
          </div>
        </div>

        {/* ── Story Feed ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filtered.map(story => (
            <div key={story.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold">{story.category}</span>
                  <TruthBadge layers={story.truthLayers} />
                </div>
                {story.marketImpact !== 'neutral' && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${story.marketImpact === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {story.marketImpact === 'positive' ? <TrendingUp size={8} className="inline mr-0.5" /> : <TrendingDown size={8} className="inline mr-0.5" />}
                    {story.marketImpact}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5 leading-snug cursor-pointer hover:text-[#F7F2EB] transition-colors" onClick={() => setSelectedStory(story)}>
                {story.headline}
              </h3>
              <p className="text-[11px] text-[#A0AEC0] leading-relaxed mb-3 line-clamp-2">{story.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><SpinBadge type="middle" /><SpinBadge type="sourced" /></div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-[#6B7280] flex items-center gap-1"><Eye size={9} /> {story.views.toLocaleString()}</span>
                  <span className="text-[9px] text-[#6B7280] flex items-center gap-1"><Clock size={9} /> {story.readTime}</span>
                </div>
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-white/[0.04] flex items-center gap-1 flex-wrap">
                <Anchor size={8} className="text-[#6B7280]" />
                {story.sources.map((src, i) => <span key={i} className="text-[9px] text-[#6B7280]">{src}{i < story.sources.length - 1 ? ',' : ''}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="text-center py-6 border-t border-white/[0.06]">
          <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
            <Building2 size={14} className="text-[#7096D1]" />
            <span className="text-xs text-[#A0AEC0] font-medium">JamNews Business™ — Markets Without the Spin</span>
            <Layers size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">11 Layers of Truth™</span>
          </div>
          <p className="text-[10px] text-[#6B7280] max-w-lg mx-auto">
            Financial news verified through 11 layers. We show how markets affect everyone — 
            the investor, the worker, the homeowner, the entrepreneur. No agenda. Just the numbers and the truth.
          </p>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selectedStory && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-3 sm:p-4" onClick={() => setSelectedStory(null)}>
          <div className="bg-[#0A0F1E] border border-white/[0.08] rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto mobile-scroll" onClick={e => e.stopPropagation()}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold">{selectedStory.category}</span>
                  <TruthBadge layers={selectedStory.truthLayers} />
                  {selectedStory.marketImpact !== 'neutral' && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${selectedStory.marketImpact === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {selectedStory.marketImpact}
                    </span>
                  )}
                </div>
                <button onClick={() => setSelectedStory(null)} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-[#6B7280] cursor-pointer"><span className="text-lg">✕</span></button>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mb-3">{selectedStory.headline}</h2>
              <p className="text-xs text-[#A0AEC0] leading-relaxed mb-4">{selectedStory.summary}</p>

              {/* 11 Layers */}
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layers size={12} className="text-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-400">11 Layers Verification: {selectedStory.truthLayers}/11</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {TRUTH_LAYERS.map((layer, i) => (
                    <div key={layer} className="flex items-center gap-1.5">
                      <CheckCircle size={8} className={i < selectedStory.truthLayers ? 'text-emerald-400' : 'text-[#6B7280]/30'} />
                      <span className={`text-[9px] ${i < selectedStory.truthLayers ? 'text-[#A0AEC0]' : 'text-[#6B7280]/30'}`}>{layer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Three Perspectives */}
              <div className="space-y-3 mb-4">
                <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <TrendingUp size={12} className="text-red-400 rotate-180" />
                    <span className="text-[10px] font-semibold text-red-400">Progressive View</span>
                  </div>
                  <p className="text-xs text-[#A0AEC0]">{selectedStory.leftAngle}</p>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <TrendingUp size={12} className="text-blue-400" />
                    <span className="text-[10px] font-semibold text-blue-400">Conservative View</span>
                  </div>
                  <p className="text-xs text-[#A0AEC0]">{selectedStory.rightAngle}</p>
                </div>
                <div className="bg-[#7096D1]/5 border border-[#7096D1]/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Scale size={12} className="text-[#7096D1]" />
                    <span className="text-[10px] font-semibold text-[#7096D1]">The Middle Ground™</span>
                  </div>
                  <p className="text-xs text-[#F7F2EB]">{selectedStory.middleGround}</p>
                </div>
              </div>

              {/* Sources */}
              <div className="border-t border-white/[0.06] pt-3">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Verified Sources</p>
                <div className="space-y-1.5">
                  {selectedStory.sources.map((src, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Anchor size={10} className="text-[#7096D1]" />
                      <span className="text-xs text-[#A0AEC0]">{src}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
