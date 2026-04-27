import { useState } from 'react';
import {
  Cpu, Zap, Globe, Rocket, BookOpen, TrendingUp, ExternalLink
} from 'lucide-react';
import { brand } from '../config/brand';

const newsFeed = [
  { category: 'AI', title: 'OpenAI Announces GPT-5 with Multimodal Reasoning', source: 'TechCrunch', time: '2h ago', trending: true },
  { category: 'Robotics', title: 'Humanoid Robot Deployed in Toyota Factory', source: 'The Verge', time: '4h ago', trending: true },
  { category: 'Quantum', title: 'IBM Breaks 1,000-Qubit Barrier with Condor Chip', source: 'Wired', time: '6h ago', trending: false },
  { category: 'Space', title: 'SpaceX Starship Completes Orbital Refueling Test', source: 'Ars Technica', time: '8h ago', trending: true },
  { category: 'Biotech', title: 'CRISPR 3.0 Enables Full Gene Rewrite', source: 'Nature', time: '12h ago', trending: false },
  { category: 'Energy', title: 'Solid-State Battery Reaches 500Wh/kg Density', source: 'IEEE Spectrum', time: '1d ago', trending: true },
];

const startups = [
  { name: 'NeuraLink X', sector: 'BCI', funding: '$240M', stage: 'Series C', growth: '+340%' },
  { name: 'FusionGrid', sector: 'Clean Energy', funding: '$180M', stage: 'Series B', growth: '+520%' },
  { name: 'AtomWorks', sector: 'Nano Manufacturing', funding: '$95M', stage: 'Series A', growth: '+890%' },
  { name: 'DeepFarm', sector: 'AgTech AI', funding: '$72M', stage: 'Series A', growth: '+410%' },
];

const patents = [
  { id: 'US11,842,xxx', title: 'Neuromorphic Computing Architecture', assignee: 'Intel', date: 'Apr 2026' },
  { id: 'US11,841,xxx', title: 'Self-Healing Polymer Network', assignee: 'MIT', date: 'Apr 2026' },
  { id: 'US11,840,xxx', title: 'Distributed Quantum Key Distribution', assignee: 'IBM', date: 'Apr 2026' },
  { id: 'US11,839,xxx', title: 'Autonomous Swarm Drone Coordination', assignee: 'DJI', date: 'Apr 2026' },
];

const categories = ['All', 'AI', 'Robotics', 'Quantum', 'Space', 'Biotech', 'Energy'];

export default function JamTech() {
  const [activeCat, setActiveCat] = useState('All');
  const [tab, setTab] = useState<'news' | 'startups' | 'patents'>('news');

  const filteredNews = activeCat === 'All' ? newsFeed : newsFeed.filter(n => n.category === activeCat);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2"><Cpu size={20} className="text-cyan-400" /><span className="font-display text-lg font-bold">{brand.prefix}Tech</span></div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-semibold text-cyan-400 mb-3">
            <Zap size={12} />Collective General
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Tech Intelligence</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">Innovation news, startup tracking, and patent intelligence from arXiv, NSF, and NIST.</p>
        </div>

        <div className="flex justify-center gap-1 mb-6">
          {(['news', 'startups', 'patents'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${tab === t ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'news' && (
          <>
            <div className="flex gap-1 overflow-x-auto pb-2 mb-4">
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCat(c)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${activeCat === c ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-[#0A0F1E] text-[#6B7280] border border-white/[0.06]'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filteredNews.map((n, i) => (
                <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4 hover:border-cyan-500/20 transition-all cursor-pointer group">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <Globe size={16} className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded-full">{n.category}</span>
                      {n.trending && <span className="text-[9px] font-semibold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-full flex items-center gap-1"><TrendingUp size={8} />Hot</span>}
                    </div>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">{n.title}</p>
                    <p className="text-[10px] text-[#6B7280]">{n.source} • {n.time}</p>
                  </div>
                  <ExternalLink size={14} className="text-[#6B7280] shrink-0" />
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'startups' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {startups.map(s => (
              <div key={s.name} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket size={18} className="text-cyan-400" />
                  <span className="text-sm font-bold text-white">{s.name}</span>
                </div>
                <p className="text-[10px] text-cyan-400 mb-2">{s.sector} • {s.stage}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{s.funding}</span>
                  <span className="text-xs text-green-400">{s.growth}</span>
                </div>
                <p className="text-[10px] text-[#6B7280] mt-2">Funding via Crunchbase / PitchBook</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'patents' && (
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Recent USPTO Filings</h3>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {patents.map(p => (
                <div key={p.id} className="py-3 flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#6B7280] w-28 shrink-0">{p.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{p.title}</p>
                    <p className="text-[10px] text-[#6B7280]">{p.assignee} • {p.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#6B7280] mt-4">Source: USPTO Patent Public Search • SORME™ Public KB</p>
          </div>
        )}
      </main>
    </div>
  );
}
