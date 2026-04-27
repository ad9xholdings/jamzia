import { useState, useEffect, useRef } from 'react';
import {
  Radio, Play, Pause, Eye, Clock, Shield, CheckCircle,
  TrendingUp, Zap, Video, Archive,
  ChevronRight, Share2, Bookmark, ExternalLink, AlertCircle,
  Layers, Scale, Anchor, Mic, Tv, Newspaper,
} from 'lucide-react';

// ── 11 Layers of Truth ──
const TRUTH_LAYERS = [
  'Source Verification',
  'Cross-Reference Check',
  'Expert Review',
  'Document Analysis',
  'Timeline Validation',
  'Context Preservation',
  'Bias Detection Passed',
  'Primary Source Priority',
  'Transparency Mark',
  'Correction Log Clear',
  'Public Accountability',
];

interface Story {
  id: string;
  headline: string;
  summary: string;
  category: string;
  timestamp: string;
  sources: string[];
  truthLayers: number;
  leftAngle: string;
  rightAngle: string;
  middleGround: string;
  isBreaking?: boolean;
  isLive?: boolean;
  image?: string;
  views: number;
  readTime: string;
}

const CATEGORIES = ['All', 'Breaking', 'Politics', 'World', 'US', 'Technology', 'Health', 'Climate', 'Justice', 'Culture'];

const STORIES: Story[] = [
  {
    id: '1', headline: 'Federal Reserve Holds Interest Rates Steady Amid Inflation Concerns',
    summary: 'The central bank maintained the federal funds rate at 5.25%-5.50% in its latest meeting, citing the need for more data before making adjustments. Consumer prices rose 3.2% year-over-year in the latest report.',
    category: 'Politics', timestamp: '2 min ago', sources: ['Federal Reserve Statement', 'BLS Consumer Price Index', 'Reuters'],
    truthLayers: 11, leftAngle: 'Progressives argue rates hurt working families and housing affordability.',
    rightAngle: 'Conservatives warn cutting too soon risks reigniting inflation.',
    middleGround: 'Both sides agree the data-dependent approach is prudent, but differ on timeline for future cuts.',
    isBreaking: true, isLive: true, views: 45200, readTime: '4 min',
  },
  {
    id: '2', headline: 'Major Climate Legislation Advances in Senate Committee',
    summary: 'Bipartisan support emerged for a new bill targeting carbon emissions from power plants, with provisions for clean energy tax credits and grid modernization funding.',
    category: 'Climate', timestamp: '15 min ago', sources: ['Senate Committee Records', 'CBO Score', 'Energy Department Analysis'],
    truthLayers: 10, leftAngle: 'Environmental groups say the bill does not go far enough on emission targets.',
    rightAngle: 'Industry leaders express concern about compliance costs and energy reliability.',
    middleGround: 'The compromise includes protections for rural communities and phased implementation to balance economic and environmental goals.',
    views: 28400, readTime: '5 min',
  },
  {
    id: '3', headline: 'Supreme Court to Hear Landmark Digital Privacy Case',
    summary: 'The court agreed to hear arguments on whether law enforcement needs a warrant to access cell phone location data stored by third-party carriers.',
    category: 'Justice', timestamp: '32 min ago', sources: ['Supreme Court Docket', 'Legal Briefs', ' ACLU Analysis'],
    truthLayers: 11, leftAngle: 'Privacy advocates argue the Fourth Amendment must evolve with technology.',
    rightAngle: 'Law enforcement groups say warrant requirements hinder time-sensitive investigations.',
    middleGround: 'The case will clarify boundaries between public safety and constitutional privacy protections in the digital age.',
    views: 31900, readTime: '6 min',
  },
  {
    id: '4', headline: 'International Trade Talks Resume with New Framework Proposal',
    summary: 'Negotiators from 14 nations reconvened with a revised trade framework emphasizing labor standards, environmental protections, and digital trade rules.',
    category: 'World', timestamp: '1 hr ago', sources: ['Trade Representative Office', 'WTO Communications', 'Bloomberg'],
    truthLayers: 9, leftAngle: 'Labor unions want stronger enforcement mechanisms for worker protections.',
    rightAngle: 'Business groups seek reduced tariffs and streamlined customs procedures.',
    middleGround: 'The new framework includes dispute resolution panels and compliance timelines addressing concerns from both camps.',
    views: 18700, readTime: '7 min',
  },
  {
    id: '5', headline: 'Vaccine Study Shows Long-Term Efficacy Data',
    summary: 'A five-year follow-up study published in a peer-reviewed journal found sustained protection against severe illness, with booster recommendations updated based on age and risk factors.',
    category: 'Health', timestamp: '2 hr ago', sources: ['Peer-Reviewed Journal', 'CDC Advisory', 'NIH Press Release'],
    truthLayers: 11, leftAngle: 'Public health advocates call for expanded access in underserved communities.',
    rightAngle: 'Medical freedom groups raise questions about individual choice and mandate policies.',
    middleGround: 'The data supports informed decision-making while acknowledging personal medical autonomy and public health considerations.',
    views: 56300, readTime: '5 min',
  },
  {
    id: '6', headline: 'AI Regulation Framework Proposed by Bipartisan Lawmakers',
    summary: 'A new bill establishes oversight for large AI systems, requiring transparency reports, safety testing, and labeling of AI-generated content in political advertising.',
    category: 'Technology', timestamp: '3 hr ago', sources: ['Congressional Record', 'FTC Statement', 'Industry Comments'],
    truthLayers: 10, leftAngle: 'Tech critics say the bill lacks teeth on enforcement and does not address algorithmic bias.',
    rightAngle: 'Industry leaders warn overregulation could stifle innovation and hand advantage to foreign competitors.',
    middleGround: 'The framework focuses on high-risk applications while exempting smaller models, seeking balance between safety and innovation.',
    views: 42100, readTime: '6 min',
  },
  {
    id: '7', headline: 'Infrastructure Bill Projects Reach 5,000 Milestone',
    summary: 'The administration announced 5,000 funded projects nationwide including bridge repairs, broadband expansion, and public transit upgrades, with 60% in rural or disadvantaged communities.',
    category: 'US', timestamp: '4 hr ago', sources: ['DOT Press Release', 'GAO Report', 'Local News Outlets'],
    truthLayers: 9, leftAngle: 'Advocates say funding remains insufficient for the full scope of needed repairs.',
    rightAngle: 'Fiscal hawks question long-term cost overruns and project selection criteria.',
    middleGround: 'Independent audits show projects are on budget in 78% of cases, with community input driving priority rankings.',
    views: 22300, readTime: '4 min',
  },
  {
    id: '8', headline: 'Education Reform Bill Sparks National Debate',
    summary: 'The proposed legislation would standardize curriculum benchmarks, increase teacher pay, and expand vocational training programs, facing opposition from various stakeholder groups.',
    category: 'Culture', timestamp: '5 hr ago', sources: ['Department of Education', 'NEA Statement', 'State Governors Association'],
    truthLayers: 8, leftAngle: 'Teachers unions support pay increases but oppose standardized testing expansion.',
    rightAngle: 'School choice advocates argue local control should supersede federal standards.',
    middleGround: 'The bill includes opt-out provisions for states and prioritizes teacher input in curriculum design.',
    views: 38900, readTime: '8 min',
  },
];

const LIVE_STREAMS = [
  { id: 'l1', title: 'JamNews Live™ — Prime Time Coverage', viewers: '142K', status: 'LIVE' as const },
  { id: 'l2', title: 'The Middle Ground™ — Daily Briefing', viewers: '89K', status: 'LIVE' as const },
  { id: 'l3', title: 'Source Check™ — Fact Verification Hour', viewers: '56K', status: 'UPCOMING' as const },
];

const TICKER_ITEMS = [
  'BREAKING: Federal Reserve holds rates steady — both sides react',
  'Climate bill advances with bipartisan support',
  'Supreme Court takes landmark privacy case',
  'Trade talks resume with 14-nation framework',
  'AI regulation bill introduced by bipartisan group',
  'Infrastructure projects hit 5,000 milestone',
];

function TruthBadge({ layers }: { layers: number }) {
  return (
    <div className="flex items-center gap-1" title={`${layers}/11 truth layers verified`}>
      <Layers size={10} className={layers >= 10 ? 'text-emerald-400' : layers >= 7 ? 'text-amber-400' : 'text-red-400'} />
      <span className={`text-[9px] font-medium ${layers >= 10 ? 'text-emerald-400' : layers >= 7 ? 'text-amber-400' : 'text-red-400'}`}>
        {layers}/11 Truth
      </span>
    </div>
  );
}

function SpinBadge({ type }: { type: 'nospin' | 'middle' | 'sourced' }) {
  const config = {
    nospin: { icon: Shield, text: 'No Spin', color: 'text-emerald-400 bg-emerald-500/10' },
    middle: { icon: Scale, text: 'Middle Ground', color: 'text-[#7096D1] bg-[#7096D1]/10' },
    sourced: { icon: Anchor, text: 'Sourced', color: 'text-amber-400 bg-amber-500/10' },
  };
  const C = config[type];
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-medium ${C.color}`}>
      <C.icon size={8} /> {C.text}
    </span>
  );
}

export default function JamNews() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tickerOffset, setTickerOffset] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset(p => p - 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const filtered = activeCategory === 'All'
    ? STORIES
    : activeCategory === 'Breaking'
      ? STORIES.filter(s => s.isBreaking)
      : STORIES.filter(s => s.category === activeCategory);

  const featured = STORIES.find(s => s.isBreaking) || STORIES[0];

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* ── Breaking News Ticker ── */}
      <div className="bg-red-600 overflow-hidden h-8 flex items-center relative z-10">
        <div className="bg-red-700 px-3 h-full flex items-center gap-1.5 shrink-0 z-10">
          <AlertCircle size={12} className="text-white" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Breaking</span>
        </div>
        <div ref={tickerRef} className="flex-1 overflow-hidden relative">
          <div className="flex gap-12 whitespace-nowrap" style={{ transform: `translateX(${tickerOffset}px)` }}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="text-[11px] text-white/90 flex items-center gap-2">
                <Zap size={10} className="text-yellow-300" /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Header ── */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center">
              <Newspaper size={20} className="text-[#F7F2EB]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                JamNews™ <span className="text-[10px] font-normal text-[#7096D1] border border-[#7096D1]/30 px-1.5 py-0.5 rounded">Live</span>
              </h1>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">The News You Can Count On — 24/7</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <CheckCircle size={12} className="text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-medium">11 Layers of Truth™</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7096D1]/10 border border-[#7096D1]/20 rounded-lg">
                <Scale size={12} className="text-[#7096D1]" />
                <span className="text-[10px] text-[#7096D1] font-medium">No Spin</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#6B7280] max-w-2xl">
            Meeting in the middle — covering both sides without the far-left or far-right filter. 
            Every story verified through 11 layers of truth. Nothing fake. No agenda. Just the truth.
          </p>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#7096D1]/15 text-[#7096D1] border border-[#7096D1]/20'
                    : 'text-[#6B7280] hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {cat === 'Breaking' && <Zap size={10} className="inline mr-1 text-red-400" />}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">

        {/* ── Featured Story / Live Player ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Main Player */}
          <div className="lg:col-span-2 bg-[#0A0F1E] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-[#081F5C]/80 to-[#0A0F1E] flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80')] bg-cover bg-center opacity-30" />
              <div className="relative z-10 text-center">
                {isPlaying ? (
                  <button onClick={() => setIsPlaying(false)} className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <Pause size={28} className="text-white" />
                  </button>
                ) : (
                  <button onClick={() => setIsPlaying(true)} className="w-16 h-16 rounded-full bg-[#7096D1]/80 flex items-center justify-center hover:bg-[#7096D1] transition-colors cursor-pointer shadow-lg shadow-[#7096D1]/30">
                    <Play size={28} className="text-white ml-1" />
                  </button>
                )}
                <p className="text-xs text-white/70 mt-3 font-medium">{featured.isLive ? '● LIVE NOW' : 'Watch Now'}</p>
              </div>
              {featured.isLive && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500/90 px-2.5 py-1 rounded-full">
                  <Radio size={10} className="text-white animate-pulse" />
                  <span className="text-[10px] font-bold text-white">LIVE</span>
                </div>
              )}
              <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-[10px] text-white/70">
                {featured.readTime}
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold">{featured.category}</span>
                <span className="text-[#6B7280]">•</span>
                <span className="text-[10px] text-[#6B7280]">{featured.timestamp}</span>
                <TruthBadge layers={featured.truthLayers} />
                <SpinBadge type="nospin" />
                <SpinBadge type="middle" />
                {featured.isLive && <SpinBadge type="sourced" />}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">{featured.headline}</h2>
              <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed mb-3">{featured.summary}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <button onClick={() => setSelectedStory(featured)} className="text-xs text-[#7096D1] hover:text-[#F7F2EB] font-medium flex items-center gap-1 cursor-pointer">
                  See Both Sides <ChevronRight size={14} />
                </button>
                <span className="text-[10px] text-[#6B7280] flex items-center gap-1">
                  <Eye size={10} /> {featured.views.toLocaleString()} views
                </span>
              </div>
            </div>
          </div>

          {/* Live Streams Sidebar */}
          <div className="space-y-3">
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tv size={14} className="text-red-400" />
                <span className="text-xs font-semibold text-white">Live Streams</span>
              </div>
              <div className="space-y-2.5">
                {LIVE_STREAMS.map(stream => (
                  <div key={stream.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center shrink-0">
                      <Mic size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate group-hover:text-[#F7F2EB]">{stream.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {stream.status === 'LIVE' ? (
                          <span className="flex items-center gap-1 text-[9px] text-red-400">
                            <Radio size={8} className="animate-pulse" /> {stream.viewers} watching
                          </span>
                        ) : (
                          <span className="text-[9px] text-amber-400">Upcoming</span>
                        )}
                      </div>
                    </div>
                    {stream.status === 'LIVE' && (
                      <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 11 Layers Explainer */}
            <div className="bg-gradient-to-br from-[#081F5C]/40 to-[#0A0F1E] border border-[#7096D1]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Layers size={14} className="text-[#7096D1]" />
                <span className="text-xs font-semibold text-[#F7F2EB]">11 Layers of Truth™</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {TRUTH_LAYERS.map((layer) => (
                  <div key={layer} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                      <CheckCircle size={8} className="text-emerald-400" />
                    </div>
                    <span className="text-[10px] text-[#A0AEC0]">{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Story Feed ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filtered.map((story) => (
            <div key={story.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold">{story.category}</span>
                <span className="text-[#6B7280]">•</span>
                <span className="text-[10px] text-[#6B7280]">{story.timestamp}</span>
                <TruthBadge layers={story.truthLayers} />
                {story.isBreaking && <SpinBadge type="nospin" />}
              </div>
              <h3
                className="text-sm font-bold text-white mb-1.5 leading-snug cursor-pointer hover:text-[#F7F2EB] transition-colors"
                onClick={() => setSelectedStory(story)}
              >
                {story.headline}
              </h3>
              <p className="text-[11px] text-[#A0AEC0] leading-relaxed mb-3 line-clamp-2">{story.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <SpinBadge type="middle" />
                  <SpinBadge type="sourced" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-[#6B7280] flex items-center gap-1">
                    <Eye size={9} /> {story.views.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-[#6B7280] flex items-center gap-1">
                    <Clock size={9} /> {story.readTime}
                  </span>
                </div>
              </div>
              {/* Sources */}
              <div className="mt-2.5 pt-2.5 border-t border-white/[0.04] flex items-center gap-1 flex-wrap">
                <Anchor size={8} className="text-[#6B7280]" />
                {story.sources.map((src, i) => (
                  <span key={i} className="text-[9px] text-[#6B7280]">{src}{i < story.sources.length - 1 ? ',' : ''}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── VOD / PPV Section ── */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Archive size={16} className="text-[#7096D1]" />
            <h2 className="text-sm font-bold text-white">On Demand — The Truth Catalog™</h2>
            <span className="text-[10px] text-[#6B7280] ml-2">VOD • PPV • Live Archives</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { title: 'The Middle Ground™', subtitle: 'Daily Briefing', type: 'FREE', color: 'from-[#081F5C] to-[#7096D1]' },
              { title: 'Source Check™', subtitle: 'Fact Verification', type: 'FREE', color: 'from-emerald-800 to-emerald-600' },
              { title: 'Capitol Report™', subtitle: 'Congressional Coverage', type: 'PPV', color: 'from-amber-800 to-amber-600' },
              { title: 'World View™', subtitle: 'Global Perspectives', type: 'FREE', color: 'from-purple-800 to-purple-600' },
            ].map((item) => (
              <div key={item.title} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 cursor-pointer hover:opacity-90 transition-opacity group`}>
                <div className="flex items-center justify-between mb-3">
                  <Video size={16} className="text-white/70" />
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${item.type === 'FREE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-xs font-bold text-white group-hover:text-[#F7F2EB]">{item.title}</p>
                <p className="text-[10px] text-white/60 mt-0.5">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="text-center py-6 border-t border-white/[0.06]">
          <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
            <Scale size={14} className="text-[#7096D1]" />
            <span className="text-xs text-[#A0AEC0] font-medium">JamNews™ — Meeting in the Middle</span>
            <Layers size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">11 Layers of Truth™</span>
          </div>
          <p className="text-[10px] text-[#6B7280] max-w-lg mx-auto">
            Every story is verified through 11 independent layers of fact-checking. We present the left perspective, 
            the right perspective, and the middle ground — so you can decide for yourself. No spin. Nothing fake. No agenda.
          </p>
        </div>
      </div>

      {/* ── Story Detail Modal ── */}
      {selectedStory && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-3 sm:p-4" onClick={() => setSelectedStory(null)}>
          <div className="bg-[#0A0F1E] border border-white/[0.08] rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto mobile-scroll" onClick={e => e.stopPropagation()}>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold">{selectedStory.category}</span>
                  <TruthBadge layers={selectedStory.truthLayers} />
                </div>
                <button onClick={() => setSelectedStory(null)} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-[#6B7280] cursor-pointer">
                  <span className="text-lg">✕</span>
                </button>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mb-3 leading-snug">{selectedStory.headline}</h2>
              <p className="text-xs text-[#A0AEC0] leading-relaxed mb-4">{selectedStory.summary}</p>

              {/* 11 Layers Verification */}
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layers size={12} className="text-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-400">11 Layers Verification: {selectedStory.truthLayers}/11 Passed</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {TRUTH_LAYERS.map((layer, idx) => (
                    <div key={layer} className="flex items-center gap-1.5">
                      <CheckCircle size={8} className={idx < selectedStory.truthLayers ? 'text-emerald-400' : 'text-[#6B7280]/30'} />
                      <span className={`text-[9px] ${idx < selectedStory.truthLayers ? 'text-[#A0AEC0]' : 'text-[#6B7280]/30'}`}>{layer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Three Perspectives */}
              <div className="space-y-3 mb-4">
                {selectedStory.leftAngle && (
                  <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <TrendingUp size={12} className="text-red-400 rotate-180" />
                      <span className="text-[10px] font-semibold text-red-400">Progressive Perspective</span>
                    </div>
                    <p className="text-xs text-[#A0AEC0]">{selectedStory.leftAngle}</p>
                  </div>
                )}
                {selectedStory.rightAngle && (
                  <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <TrendingUp size={12} className="text-blue-400" />
                      <span className="text-[10px] font-semibold text-blue-400">Conservative Perspective</span>
                    </div>
                    <p className="text-xs text-[#A0AEC0]">{selectedStory.rightAngle}</p>
                  </div>
                )}
                {selectedStory.middleGround && (
                  <div className="bg-[#7096D1]/5 border border-[#7096D1]/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Scale size={12} className="text-[#7096D1]" />
                      <span className="text-[10px] font-semibold text-[#7096D1]">The Middle Ground™</span>
                    </div>
                    <p className="text-xs text-[#F7F2EB]">{selectedStory.middleGround}</p>
                  </div>
                )}
              </div>

              {/* Sources */}
              <div className="border-t border-white/[0.06] pt-3">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Verified Sources</p>
                <div className="space-y-1.5">
                  {selectedStory.sources.map((src, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Anchor size={10} className="text-[#7096D1]" />
                      <span className="text-xs text-[#A0AEC0]">{src}</span>
                      <ExternalLink size={10} className="text-[#6B7280] ml-auto" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
                <button className="flex-1 py-2 bg-[#7096D1]/10 text-[#7096D1] rounded-lg text-xs font-medium hover:bg-[#7096D1]/20 transition-colors cursor-pointer flex items-center justify-center gap-1">
                  <Share2 size={12} /> Share
                </button>
                <button className="flex-1 py-2 bg-white/[0.04] text-[#A0AEC0] rounded-lg text-xs font-medium hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center justify-center gap-1">
                  <Bookmark size={12} /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
