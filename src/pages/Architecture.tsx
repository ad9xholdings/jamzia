import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Database, Cpu, HardDrive, Search,
  Users, Hash, MessageSquare, Shield, VolumeX, Clock,
  ChevronDown, ChevronRight, Play, Pause, RotateCcw,
  Layers, Code, GitBranch, Terminal, Bug, FileCode, Server,
  Globe, Zap, BarChart3,
} from 'lucide-react';

// ─── Pipeline Step Component ─────────────────────────────

interface PipelineStepProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

function PipelineStep({ icon, label, color, active, onClick }: PipelineStepProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all cursor-pointer min-w-[100px] ${
        active ? 'bg-white/10 scale-105' : 'hover:bg-white/5'
      }`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <span className={`text-sm font-semibold ${active ? 'text-white' : 'text-[#A0AEC0]'}`}>{label}</span>
    </button>
  );
}

// ─── Status Fanout Visualizer ────────────────────────────

function StatusFanoutFlow({ step }: { step: number }) {
  const steps = [
    { id: 0, label: 'Status Depot', desc: 'New post arrives' },
    { id: 1, label: 'Read batch', desc: 'Read batch of statuses' },
    { id: 2, label: 'Visibility check', desc: 'If visibility is not direct' },
    { id: 3, label: 'Author timeline', desc: 'Add to author timeline' },
    { id: 4, label: 'Fetch followers', desc: 'Fetch up to 32k followers from Followee→Followers PState' },
    { id: 5, label: 'Per follower', desc: 'For each follower: apply filters' },
    { id: 6, label: 'Add to timeline', desc: 'Add to follower\'s timeline' },
    { id: 7, label: 'Write to buffer', desc: 'Write to Home Timeline in-memory buffer' },
    { id: 8, label: 'Queue remaining', desc: 'If more followers: queue for next iteration' },
  ];

  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div
          key={s.id}
          className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
            i <= step ? 'bg-[#081F5C]/30 border border-[#7096D1]/30' : 'bg-white/[0.02] border border-transparent'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            i <= step ? 'bg-[#7096D1] text-white' : 'bg-white/10 text-[#6B7280]'
          }`}>
            {i + 1}
          </div>
          <div>
            <p className={`text-sm font-semibold ${i <= step ? 'text-white' : 'text-[#6B7280]'}`}>{s.label}</p>
            <p className="text-xs text-[#6B7280]">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Follows Depot Visualizer ────────────────────────────

function FollowsDepotFlow({ step }: { step: number }) {
  const steps = [
    { id: 0, label: 'Follows & Blocks Depot', desc: 'Action arrives (Follow, Unfollow, Block, etc.)' },
    { id: 1, label: 'Type Detection', desc: 'Block type? AcceptFollowRequest? FollowLockedAccount?' },
    { id: 2, label: 'Emit Implicit Actions', desc: 'Block → implicit Unfollows, Accept → implicit Follow' },
    { id: 3, label: 'Dispatch on Type', desc: 'Route to specific handler' },
    { id: 4, label: 'Update Linked/Nested Sets', desc: 'Follow → Add to linked set, Block → Add to nested set' },
    { id: 5, label: 'Write to PStates', desc: 'Update Follower→Followees, Followee→Followers, Suppressions' },
    { id: 6, label: 'Mutes Depot (parallel)', desc: 'Mute → Add to nested map, RemoveMute → Remove from map' },
  ];

  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div
          key={s.id}
          className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
            i <= step ? 'bg-[#081F5C]/30 border border-[#7096D1]/30' : 'bg-white/[0.02] border border-transparent'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            i <= step ? 'bg-[#7096D1] text-white' : 'bg-white/10 text-[#6B7280]'
          }`}>
            {i + 1}
          </div>
          <div>
            <p className={`text-sm font-semibold ${i <= step ? 'text-white' : 'text-[#6B7280]'}`}>{s.label}</p>
            <p className="text-xs text-[#6B7280]">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PState Explorer ─────────────────────────────────────

function PStateExplorer() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const pstates = [
    { name: '$$homeTimeline', type: 'Map[List]', desc: 'Account ID → ordered list of status IDs', icon: <MessageSquare size={14} /> },
    { name: '$$accountTimeline', type: 'Map[List]', desc: 'Account ID → their own posts', icon: <Users size={14} /> },
    { name: '$$followerToFollowees', type: 'Map[Set]', desc: 'Follower ID → set of accounts they follow', icon: <Users size={14} /> },
    { name: '$$followeeToFollowers', type: 'Map[Set]', desc: 'Followee ID → set of their followers', icon: <Users size={14} /> },
    { name: '$$accountIdToFollowRequests', type: 'Map[Set]', desc: 'Account ID → pending follow requests', icon: <Clock size={14} /> },
    { name: '$$accountIdToSuppressions', type: 'Map[Set]', desc: 'Account ID → blocked accounts (nested set)', icon: <Shield size={14} /> },
    { name: '$$mutedAccounts', type: 'Map[Set]', desc: 'Account ID → muted accounts (nested map)', icon: <VolumeX size={14} /> },
    { name: '$$hashtagToFollowers', type: 'Map[Set]', desc: 'Hashtag → accounts following it', icon: <Hash size={14} /> },
    { name: '$$whoToFollow', type: 'Map[List]', desc: 'Account ID → ranked follow suggestions', icon: <Search size={14} /> },
  ];

  return (
    <div className="space-y-2">
      {pstates.map((ps) => (
        <div key={ps.name} className="bg-[#0A0F1E] rounded-lg overflow-hidden border border-white/[0.06]">
          <button
            onClick={() => setExpanded((p) => ({ ...p, [ps.name]: !p[ps.name] }))}
            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            {expanded[ps.name] ? <ChevronDown size={14} className="text-[#6B7280]" /> : <ChevronRight size={14} className="text-[#6B7280]" />}
            <span className="text-green-400">{ps.icon}</span>
            <span className="text-green-300 text-sm font-mono">{ps.name}</span>
            <span className="text-[#6B7280] text-xs ml-auto">{ps.type}</span>
          </button>
          {expanded[ps.name] && (
            <div className="px-4 pb-3 pl-12">
              <p className="text-[#A0AEC0] text-xs">{ps.desc}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Who to Follow Algorithm ─────────────────────────────

function WhoToFollowFlow({ step }: { step: number }) {
  const steps = [
    { id: 0, label: 'Tick Depot (30s)', desc: 'Timer fires every 30 seconds' },
    { id: 1, label: 'Fetch Accounts', desc: 'Read from Follower→Followees PState' },
    { id: 2, label: 'Fetch follows', desc: 'Get followees of followees' },
    { id: 3, label: 'Aggregate', desc: 'Count follow occurrences per candidate' },
    { id: 4, label: 'Order & Filter', desc: 'Sort by count, filter already-followed' },
    { id: 5, label: 'Top 80', desc: 'Take up to 80 candidates per account' },
    { id: 6, label: 'Write PState', desc: 'Overwrite Who to Follow PState' },
  ];

  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div
          key={s.id}
          className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
            i <= step ? 'bg-[#081F5C]/30 border border-[#7096D1]/30' : 'bg-white/[0.02] border border-transparent'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            i <= step ? 'bg-[#7096D1] text-white' : 'bg-white/10 text-[#6B7280]'
          }`}>
            {i + 1}
          </div>
          <div>
            <p className={`text-sm font-semibold ${i <= step ? 'text-white' : 'text-[#6B7280]'}`}>{s.label}</p>
            <p className="text-xs text-[#6B7280]">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Architecture Page ──────────────────────────────

export default function Architecture() {
  const [activeSection, setActiveSection] = useState<'overview' | 'status' | 'follows' | 'recommend' | 'pstates' | 'eleven'>('overview');
  const [animStep, setAnimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxSteps = {
    overview: 0,
    status: 8,
    follows: 6,
    recommend: 6,
    pstates: 0,
    eleven: 0,
  };

  useEffect(() => {
    document.title = 'Architecture — JamZia';
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setAnimStep((prev) => {
          if (prev >= maxSteps[activeSection]) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, activeSection]);

  const resetAnimation = () => {
    setIsPlaying(false);
    setAnimStep(0);
  };

  const startAnimation = () => {
    setAnimStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] sticky top-0 bg-black/90 backdrop-blur-md z-30">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">JamZia Architecture</h1>
            <p className="text-[#6B7280] text-sm">Depot → ETL → PState → Query pipeline visualization</p>
          </div>
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-8">
        {/* Pipeline Overview */}
        <div className="rounded-[14px] p-[1px] jamzia-gradient-border mb-8">
          <div className="bg-[#0A0F1E] rounded-[14px] p-6">
            <h2 className="font-display text-lg font-bold text-white mb-4">Data Pipeline</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <PipelineStep
                icon={<Database size={24} className="text-yellow-200" />}
                label="Depots"
                color="bg-yellow-100/10"
                active={activeSection === 'overview'}
                onClick={() => { setActiveSection('overview'); resetAnimation(); }}
              />
              <ArrowRight size={20} className="text-[#6B7280]" />
              <PipelineStep
                icon={<Cpu size={24} className="text-red-300" />}
                label="ETLs"
                color="bg-red-800/30"
                active={['status', 'follows', 'recommend'].includes(activeSection)}
                onClick={() => { setActiveSection('status'); resetAnimation(); }}
              />
              <ArrowRight size={20} className="text-[#6B7280]" />
              <PipelineStep
                icon={<HardDrive size={24} className="text-green-300" />}
                label="PStates"
                color="bg-green-100/10"
                active={activeSection === 'pstates'}
                onClick={() => { setActiveSection('pstates'); resetAnimation(); }}
              />
              <ArrowRight size={20} className="text-[#6B7280]" />
              <PipelineStep
                icon={<Search size={24} className="text-orange-300" />}
                label="Queries"
                color="bg-orange-800/30"
                active={false}
                onClick={() => {}}
              />
            </div>

            {/* Data → Precompute → Index → Query */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="flex items-center gap-3 bg-red-900/20 px-5 py-2.5 rounded-lg">
                <div className="w-3 h-16 bg-red-700 rounded-sm" />
                <span className="text-red-200 text-sm font-semibold">Data</span>
              </div>
              <ArrowRight size={28} className="text-red-400" />
              <div className="bg-red-800/40 px-6 py-3 rounded-lg">
                <span className="text-red-100 text-base font-bold">Precompute</span>
              </div>
              <ArrowRight size={28} className="text-[#6B7280]" />
              <div className="flex flex-col gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-14 h-14 bg-red-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Index</span>
                  </div>
                ))}
              </div>
              <ArrowRight size={28} className="text-[#6B7280]" />
              <div className="bg-red-800/40 px-6 py-3 rounded-lg">
                <span className="text-red-100 text-base font-bold">Query</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: 'overview', label: 'Complete Overview' },
            { id: 'status', label: 'Status Fanout' },
            { id: 'follows', label: 'Follows & Blocks' },
            { id: 'recommend', label: 'Who to Follow' },
            { id: 'pstates', label: 'PState Explorer' },
            { id: 'eleven', label: '11 Layers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveSection(tab.id as typeof activeSection); resetAnimation(); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-[#F7F2EB] text-black'
                  : 'bg-white/5 text-[#A0AEC0] hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animation Controls */}
        {activeSection !== 'overview' && activeSection !== 'pstates' && (
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={isPlaying ? () => setIsPlaying(false) : startAnimation}
              className="flex items-center gap-2 px-4 py-2 bg-[#7096D1] text-white text-sm font-semibold rounded-full hover:bg-[#7096D1]/80 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Play'} Animation
            </button>
            <button
              onClick={resetAnimation}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 text-[#A0AEC0] text-sm font-semibold rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <span className="text-[#6B7280] text-sm">Step {animStep + 1} of {maxSteps[activeSection] + 1}</span>
          </div>
        )}

        {/* Content */}
        <div className="rounded-[14px] p-[1px] jamzia-gradient-border">
          <div className="bg-[#0A0F1E] rounded-[14px] p-6">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Depots */}
                <div>
                  <h3 className="text-yellow-200 font-semibold mb-3 flex items-center gap-2">
                    <Database size={18} /> Depots (Event Sources)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['status', 'scheduledStatus', 'pollVote', 'statusAttachment', 'statusWithId', 'conversation', 'followAndBlock', 'bookmarkStatus', 'muteStatus', 'pinStatus', 'favouriteStatus', 'account', 'accountEdit'].map((d) => (
                      <div key={d} className="bg-yellow-100/5 border border-yellow-200/20 rounded-lg px-3 py-2 text-yellow-100/80 text-xs font-mono">{d}</div>
                    ))}
                  </div>
                </div>

                {/* ETLs */}
                <div>
                  <h3 className="text-red-300 font-semibold mb-3 flex items-center gap-2">
                    <Cpu size={18} /> ETLs (Processors)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['status', 'fanout', 'bloom', 'core', 'accounts'].map((etl) => (
                      <div key={etl} className="bg-red-800/20 border border-red-500/30 rounded-lg px-3 py-2 text-red-200 text-xs font-mono text-center">{etl}</div>
                    ))}
                  </div>
                </div>

                {/* Query Topologies */}
                <div>
                  <h3 className="text-orange-300 font-semibold mb-3 flex items-center gap-2">
                    <Search size={18} /> Query Topologies
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['getHomeTimeline', 'getAccountTimeline', 'getConversationTimeline', 'getListTimeline', 'getDirectTimeline', 'getConversation', 'refreshHomeTimeline', 'getAncestors', 'getDescendants', 'getAccountMetadata', 'getAccountsFromNames', 'getAccountsFromMentions'].map((q) => (
                      <div key={q} className="bg-orange-800/20 border border-orange-500/30 rounded-lg px-3 py-2 text-orange-200 text-xs font-mono text-center">{q}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'status' && <StatusFanoutFlow step={animStep} />}
            {activeSection === 'follows' && <FollowsDepotFlow step={animStep} />}
            {activeSection === 'recommend' && <WhoToFollowFlow step={animStep} />}
            {activeSection === 'pstates' && <PStateExplorer />}
            {activeSection === 'eleven' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2">11-Layer Architecture</h3>
                  <p className="text-xs text-[#6B7280]">Core deliverable stack powering all 50+ JamZia platforms</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { n: 1, name: 'Identity', icon: Shield, color: '#ef4444', desc: 'User authentication, RBAC, KYC verification, federated identity across all platforms.' },
                    { n: 2, name: 'Interface', icon: Search, color: '#f97316', desc: 'Responsive UI/UX, adaptive layouts, accessibility compliance, cross-device rendering.' },
                    { n: 3, name: 'Integration', icon: Layers, color: '#f59e0b', desc: 'RESTful API gateways, webhook management, third-party connectors, event-driven architecture.' },
                    { n: 4, name: 'Intelligence', icon: Cpu, color: '#22c55e', desc: 'ML pipelines, NLP, recommendation engines, predictive analytics, SORME search.' },
                    { n: 5, name: 'Inventory', icon: Database, color: '#14b8a6', desc: 'Distributed data storage, schema management, replication, backup/recovery protocols.' },
                    { n: 6, name: 'Interaction', icon: MessageSquare, color: '#06b6d4', desc: 'Real-time messaging, notification routing, collaboration tools, social graph.' },
                    { n: 7, name: 'Indexing', icon: Globe, color: '#7096D1', desc: 'Search engine optimization, content discovery, ranking systems, query optimization.' },
                    { n: 8, name: 'Incentive', icon: Zap, color: '#a855f7', desc: 'Reward distribution, token economics (SkyIvy/XRPL), gamification, loyalty programs.' },
                    { n: 9, name: 'Integrity', icon: Shield, color: '#ec4899', desc: 'Data encryption, audit logging, compliance monitoring, fraud detection, vulnerability scanning.' },
                    { n: 10, name: 'Insight', icon: BarChart3, color: '#f43f5e', desc: 'Business intelligence dashboards, custom reporting, anomaly detection, performance metrics.' },
                    { n: 11, name: 'Infrastructure', icon: Server, color: '#6b7280', desc: 'Cloud orchestration, load balancing, auto-scaling, CDN distribution, disaster recovery.' },
                  ].map((layer) => {
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
                <div className="mt-6 bg-gradient-to-r from-[#081F5C]/30 to-[#7096D1]/10 border border-[#7096D1]/20 rounded-2xl p-6 text-center">
                  <Layers size={24} className="mx-auto text-[#7096D1] mb-2" />
                  <p className="text-sm text-[#A0AEC0] mb-3">All 11 layers are integrated with the Ad9x Intelligence Engine and synchronized across the full JamZia ecosystem.</p>
                  <a href="#/layers" className="inline-flex items-center gap-2 px-4 py-2 bg-[#7096D1]/15 hover:bg-[#7096D1]/25 border border-[#7096D1]/30 text-[#7096D1] text-xs font-bold rounded-xl transition-colors no-underline">
                    <Layers size={14} /> View Detailed Layer Specs
                  </a>
                </div>
                {/* Technical Lead / Agentic Section */}
                <div className="mt-8 bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Terminal size={16} className="text-[#7096D1]" /> Technical Lead / Agentic Development Guide
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: Code, title: 'Stack', desc: 'React 19 + TypeScript + Vite + Tailwind CSS 3.4', color: '#7096D1' },
                      { icon: GitBranch, title: 'Routing', desc: 'HashRouter + React.lazy() + 140 code-split chunks', color: '#22c55e' },
                      { icon: FileCode, title: 'State', desc: 'Zustand stores — auth, profile, battle, learn, gas/brick economy', color: '#f59e0b' },
                      { icon: Server, title: 'Backend', desc: 'tRPC + Drizzle ORM + Hono + XRP Ledger integration', color: '#ec4899' },
                      { icon: Bug, title: 'Testing', desc: 'npm run verify:layers validates all 11 layers + audit engine', color: '#ef4444' },
                      { icon: Layers, title: 'White Label', desc: 'JamRep™ 3-step clone → brand → deploy. WL-001: NoFearZia', color: '#4A90A4' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3 p-3 bg-black/30 rounded-xl">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                          <item.icon size={16} style={{ color: item.color }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{item.title}</p>
                          <p className="text-[10px] text-[#6B7280]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a href="#/docs" className="inline-flex items-center gap-2 px-4 py-2 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 border border-[#7096D1]/30 text-[#7096D1] text-xs font-bold rounded-xl transition-colors no-underline">
                      <FileCode size={14} /> Developer Docs
                    </a>
                    <a href="#/api" className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white text-xs font-bold rounded-xl transition-colors no-underline">
                      <Terminal size={14} /> API Reference
                    </a>
                    <a href="#/rep" className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white text-xs font-bold rounded-xl transition-colors no-underline">
                      <GitBranch size={14} /> JamRep™
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
