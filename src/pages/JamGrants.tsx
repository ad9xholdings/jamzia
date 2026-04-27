/* ═══════════════════════════════════════════════════════════
   JamGrants — Grant Discovery & Application Platform
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  FileText, Search, Bookmark, Clock, DollarSign,
  CheckCircle, ChevronDown, ChevronRight,
  Target, Share2
} from 'lucide-react';

/* ── Types ── */
interface Grant {
  id: string;
  title: string;
  org: string;
  amount: string;
  deadline: string;
  category: string;
  tags: string[];
  description: string;
  eligibility: string[];
  bookmarked: boolean;
  applied: boolean;
  match: number;
}

/* ── Mock Data ── */
const GRANTS: Grant[] = [
  { id: 'g1', title: 'Ad9x Innovation Fund — AI Startups', org: 'Ad9x Holdings', amount: '$250,000', deadline: 'May 30, 2026', category: 'Technology', tags: ['AI', 'startup', 'XRPL'], description: 'Funding for AI-powered startups building on the JamZia ecosystem. Priority given to projects integrating with WisdomPay and the 11-Layer Architecture.', eligibility: ['US-based LLC', 'Seed to Series A', 'XRPL integration'], bookmarked: false, applied: true, match: 98 },
  { id: 'g2', title: 'BlackDiamond Creator Grant', org: 'BlackDiamond Media', amount: '$50,000', deadline: 'Jun 15, 2026', category: 'Media', tags: ['content', 'film', 'music'], description: 'Support for independent creators producing original content for JamBoxFlix+ and BlackDiamond Studios distribution channels.', eligibility: ['Original IP', 'Production-ready', 'JamZia member'], bookmarked: true, applied: false, match: 92 },
  { id: 'g3', title: 'NoFear Mental Health Innovation', org: 'NoFear Foundation', amount: '$100,000', deadline: 'Jul 1, 2026', category: 'Healthcare', tags: ['mental-health', 'app', 'community'], description: 'Grants for digital mental health solutions that can be integrated into the JamZia wellness ecosystem.', eligibility: ['Nonprofit or B-Corp', 'HIPAA-ready', 'Community focus'], bookmarked: false, applied: false, match: 85 },
  { id: 'g4', title: 'XRPL Developer Grant — Wave 6', org: 'RippleX', amount: '$150,000', deadline: 'May 10, 2026', category: 'Blockchain', tags: ['XRPL', 'developer', 'DeFi'], description: 'Funding for developers building decentralized applications on the XRP Ledger with a focus on financial inclusion.', eligibility: ['Open source', 'XRPL Mainnet', 'Financial inclusion'], bookmarked: true, applied: true, match: 88 },
  { id: 'g5', title: "Mrs. Cotton's Education Technology Grant", org: "Mrs. Cotton's Academy", amount: '$75,000', deadline: 'Aug 1, 2026', category: 'Education', tags: ['edtech', 'phonics', 'K-12'], description: 'Funding for educational technology projects that align with the Phonics Mastery curriculum and K-Doctoral pathway.', eligibility: ['EdTech focus', 'Curriculum aligned', 'Pilot ready'], bookmarked: false, applied: false, match: 90 },
  { id: 'g6', title: 'Conduit Capital DeFi Research', org: 'Conduit Capital AI', amount: '$200,000', deadline: 'Jun 30, 2026', category: 'Finance', tags: ['DeFi', 'research', 'institutional'], description: 'Research grants for quantitative DeFi analysis, AMM optimization, and institutional-grade trading infrastructure.', eligibility: ['Quant background', 'Published research', 'Institutional focus'], bookmarked: false, applied: false, match: 72 },
  { id: 'g7', title: 'Green Earth Sustainability Grant', org: 'JamEarth Foundation', amount: '$125,000', deadline: 'Sep 15, 2026', category: 'Environment', tags: ['climate', 'sustainability', 'IoT'], description: 'Funding for environmental monitoring and sustainability projects leveraging JamZia IoT and data infrastructure.', eligibility: ['Environmental focus', 'IoT component', 'Measurable impact'], bookmarked: false, applied: false, match: 65 },
  { id: 'g8', title: 'RiverShyre AR Gaming Grant', org: 'RiverShyre', amount: '$80,000', deadline: 'Jul 20, 2026', category: 'Gaming', tags: ['AR', 'gaming', 'multiplayer'], description: 'Grants for AR game developers building on the RiverShyre engine with multiplayer and location-based features.', eligibility: ['AR experience', 'Multiplayer design', 'Location-based'], bookmarked: true, applied: false, match: 78 },
];

const CATEGORIES = ['All', 'Technology', 'Media', 'Healthcare', 'Blockchain', 'Education', 'Finance', 'Environment', 'Gaming'];

/* ── Main Component ── */
export default function JamGrants() {
  const [grants, setGrants] = useState<Grant[]>(GRANTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGrant, setExpandedGrant] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'match' | 'deadline' | 'amount'>('match');

  const toggleBookmark = (id: string) => {
    setGrants(prev => prev.map(g => g.id === id ? { ...g, bookmarked: !g.bookmarked } : g));
  };

  const filtered = grants.filter(g => {
    if (selectedCategory !== 'All' && g.category !== selectedCategory) return false;
    if (searchQuery && !g.title.toLowerCase().includes(searchQuery.toLowerCase()) && !g.org.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'match') return b.match - a.match;
    if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    return 0;
  });

  const totalAmount = '$1.03B';
  const activeGrants = grants.length;
  const avgMatch = Math.round(grants.reduce((s, g) => s + g.match, 0) / grants.length);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                <FileText size={20} className="text-[#22c55e]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamGrants</h1>
                <p className="text-[10px] text-[#6B7280]">Grant Discovery & Application · Powered by Ad9x</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#22c55e]"><DollarSign size={12} />{totalAmount} available</span>
              <span className="flex items-center gap-1 text-[#7096D1]"><FileText size={12} />{activeGrants} active grants</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Grants', value: activeGrants.toString(), icon: FileText, color: '#22c55e' },
            { label: 'Total Pool', value: totalAmount, icon: DollarSign, color: '#7096D1' },
            { label: 'Your Match', value: `${avgMatch}%`, icon: Target, color: '#f59e0b' },
            { label: 'Bookmarked', value: grants.filter(g => g.bookmarked).length.toString(), icon: Bookmark, color: '#ec4899' },
          ].map(s => (
            <div key={s.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">{s.label}</span>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search grants by title or organization..."
              className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22c55e]"
            />
          </div>
          <div className="flex items-center gap-1">
            {(['match', 'deadline', 'amount'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  sortBy === s ? 'bg-[#22c55e] text-black' : 'bg-[#0A0A0A] text-[#6B7280] border border-[#1F1F1F]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === cat ? 'bg-[#22c55e] text-black' : 'bg-[#0A0A0A] text-[#6B7280] border border-[#1F1F1F] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grants List */}
        <div className="space-y-3">
          {filtered.map(grant => {
            const isExpanded = expandedGrant === grant.id;
            return (
              <div key={grant.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden hover:border-[#2A2A2A] transition-colors">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Match Score */}
                    <div className="shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: grant.match >= 90 ? '#22c55e15' : grant.match >= 75 ? '#f59e0b15' : '#7096D115' }}>
                      <span className="text-lg font-bold" style={{ color: grant.match >= 90 ? '#22c55e' : grant.match >= 75 ? '#f59e0b' : '#7096D1' }}>{grant.match}%</span>
                      <span className="text-[8px] text-[#6B7280]">MATCH</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-sm">{grant.title}</h3>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1F1F1F] text-[#6B7280]">{grant.category}</span>
                        {grant.applied && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] font-medium">Applied</span>}
                      </div>
                      <p className="text-xs text-[#6B7280] mb-2">{grant.org}</p>
                      <div className="flex items-center gap-3 text-xs text-[#6B7280] flex-wrap">
                        <span className="flex items-center gap-1 font-medium text-white">{grant.amount}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />Due {grant.deadline}</span>
                        <div className="flex gap-1">
                          {grant.tags.map(tag => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-[#1F1F1F] rounded text-[#6B7280]">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => toggleBookmark(grant.id)} className={`p-2 rounded-lg transition-colors ${grant.bookmarked ? 'text-[#f59e0b]' : 'text-[#6B7280] hover:text-white'}`}>
                        <Bookmark size={14} fill={grant.bookmarked ? 'currentColor' : 'none'} />
                      </button>
                      <button onClick={() => setExpandedGrant(isExpanded ? null : grant.id)} className="p-2 rounded-lg text-[#6B7280] hover:text-white">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[#1F1F1F]">
                    <p className="text-xs text-[#6B7280] mt-3 mb-3">{grant.description}</p>
                    <div className="mb-3">
                      <p className="text-[10px] font-medium text-[#6B7280] mb-1">ELIGIBILITY</p>
                      <div className="flex flex-wrap gap-1.5">
                        {grant.eligibility.map(e => (
                          <span key={e} className="flex items-center gap-1 text-[10px] px-2 py-1 bg-[#1F1F1F] rounded-lg text-[#6B7280]">
                            <CheckCircle size={8} className="text-[#22c55e]" />
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-black rounded-lg text-xs font-bold transition-colors">
                        {grant.applied ? 'View Application' : 'Apply Now'}
                      </button>
                      <button className="px-3 py-2 bg-[#1F1F1F] rounded-lg text-xs text-[#6B7280] hover:text-white transition-colors">
                        <Share2 size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#6B7280]">No grants match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
