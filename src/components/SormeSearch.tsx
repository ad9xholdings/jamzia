/* ═══════════════════════════════════════════════════════════
   SORME™ Search v3 — Multi-Tier AI Search Engine
   Connected to 10 AI Engines + Backend Operations
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, X, TrendingUp, Clock, Sparkles, ChevronRight,
  Database, Zap, Globe, Cpu,
  Server, Code2, ChevronDown, ChevronUp,
} from 'lucide-react';
import { useSormeStore, type TierKey, TIER_LABELS, TIER_COLORS } from '../store/useSormeStore';

const TIER_META: Record<TierKey, { label: string; color: string; desc: string }> = {
  light: { label: 'JamLight', color: '#22c55e', desc: 'Quick scan' },
  heavy: { label: 'JamHeavy', color: '#7096D1', desc: 'Key details' },
  deep: { label: 'JamDeep', color: '#ef4444', desc: 'Deep analysis' },
  max: { label: 'JamMAX', color: '#f59e0b', desc: 'Maximum depth' },
};

export default function SormeSearch() {
  const {
    query, setQuery, tier, setTier, results, aiResponse,
    isSearching, history, search, clear, trendingQueries, knowledgeBaseSize, lastSearchTime,
  } = useSormeStore();

  const [showHistory, setShowHistory] = useState(false);
  const [showOps, setShowOps] = useState(false);
  const [showChain, setShowChain] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(async () => {
    await search();
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); handleSearch(); }
    if (e.key === 'Escape') { setShowHistory(false); }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto relative">
      {/* ── Search Input ── */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search SORME™ — 10 AI Engines, 392+ topics, 50+ platforms..."
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-12 pr-20 py-4 text-sm text-white placeholder-[#6B7280] focus:border-[#7096D1]/30 focus:outline-none transition-all"
        />
        {query && (
          <button onClick={() => { clear(); setShowHistory(true); inputRef.current?.focus(); }}
            className="absolute right-14 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-[#6B7280] hover:text-white transition-colors cursor-pointer">
            <X size={14} />
          </button>
        )}
        <button onClick={handleSearch} disabled={!query.trim() || isSearching}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
          style={{ background: query.trim() && !isSearching ? '#7096D1' : '#1e293b' }}>
          {isSearching ? <Zap size={12} className="animate-pulse" /> : <Search size={12} />}
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* ── Tier Selector ── */}
      <div className="flex items-center gap-1.5 mt-2 px-1 flex-wrap">
        {(Object.keys(TIER_META) as TierKey[]).map((t) => (
          <button key={t} onClick={() => setTier(t)}
            className={`px-2 sm:px-3 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              tier === t ? 'text-black' : 'text-[#6B7280] hover:text-white bg-white/[0.03]'
            }`}
            style={tier === t ? { backgroundColor: TIER_META[t].color } : {}}>
            {TIER_META[t].label}
          </button>
        ))}
        <span className="ml-auto text-[8px] sm:text-[9px] text-[#6B7280] flex items-center gap-1 shrink-0">
          <Database size={8} /> {knowledgeBaseSize} sources
        </span>
      </div>

      {/* ── History Dropdown ── */}
      {showHistory && !aiResponse && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0F172A] border border-white/[0.06] rounded-2xl shadow-2xl z-50 overflow-hidden">
          {history.length > 0 && (
            <div className="p-3 border-b border-white/[0.04]">
              <p className="text-[9px] text-[#6B7280] font-semibold mb-2 flex items-center gap-1">
                <Clock size={8} /> Recent
              </p>
              <div className="space-y-1">
                {history.slice(0, 5).map((h, i) => (
                  <button key={i} onClick={() => { setQuery(h); handleSearch(); setShowHistory(false); }}
                    className="w-full text-left px-2 py-1.5 text-xs text-[#A0AEC0] hover:bg-white/[0.03] rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
                    <Search size={10} className="text-[#6B7280]" /> {h}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="p-3">
            <p className="text-[9px] text-[#6B7280] font-semibold mb-2 flex items-center gap-1">
              <TrendingUp size={8} /> Trending
            </p>
            <div className="flex flex-wrap gap-1.5">
              {trendingQueries.map((q) => (
                <button key={q} onClick={() => { setQuery(q); handleSearch(); setShowHistory(false); }}
                  className="px-2 py-1 text-[10px] bg-white/[0.03] hover:bg-white/[0.06] text-[#7096D1] rounded-lg transition-colors cursor-pointer flex items-center gap-1">
                  <Sparkles size={8} /> {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Searching State ── */}
      {isSearching && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
              <Zap size={16} className="text-[#7096D1] animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-white font-semibold">SORME™ {TIER_LABELS[tier]} Search</p>
              <p className="text-[10px] text-[#6B7280]">Querying 10 AI Engines across 392+ topics...</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { label: 'JamScience', color: '#3b82f6', delay: '0ms' },
              { label: 'JamHistory', color: '#d97706', delay: '100ms' },
              { label: 'JamHealth', color: '#ef4444', delay: '200ms' },
              { label: 'JamBiz', color: '#22c55e', delay: '300ms' },
              { label: 'JamGov', color: '#6366f1', delay: '400ms' },
              { label: 'JamLaw', color: '#a855f7', delay: '500ms' },
              { label: 'JamArts', color: '#ec4899', delay: '600ms' },
              { label: 'JamSpace', color: '#14b8a6', delay: '700ms' },
              { label: 'JamIntel', color: '#7096D1', delay: '800ms' },
              { label: 'JamOps', color: '#f59e0b', delay: '900ms' },
            ].map((e) => (
              <div key={e.label} className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] rounded-lg"
                style={{ animation: `fadeIn 0.3s ${e.delay} ease-out both` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }} />
                <p className="text-[10px] text-[#A0AEC0]">{e.label}</p>
                <p className="text-[9px] text-[#6B7280] ml-auto">Scanning...</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── AI Response ── */}
      {aiResponse && !isSearching && (
        <div className="mt-4 space-y-3">
          {/* AI Summary Card */}
          <div className="bg-[#0F172A] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${TIER_COLORS[tier]}15` }}>
                <Sparkles size={16} style={{ color: TIER_COLORS[tier] }} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">SORME™ {TIER_LABELS[tier]} Result</p>
                <p className="text-[9px] text-[#6B7280]">
                  {aiResponse.sources.map(s => s.name).join(' + ')} • {(aiResponse.confidence * 100).toFixed(0)}% confidence
                  {lastSearchTime > 0 && ` • ${lastSearchTime}ms`}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#A0AEC0] leading-relaxed whitespace-pre-line">{aiResponse.summary}</p>

            {/* Backend Operations */}
            {aiResponse.backendOps && aiResponse.backendOps.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <button onClick={() => setShowOps(!showOps)}
                  className="flex items-center gap-1.5 text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer mb-2">
                  <Server size={10} /> Ad9x Backend Operations {showOps ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                </button>
                {showOps && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {aiResponse.backendOps.map((op, i) => (
                      <div key={i} className="bg-black/30 rounded-xl p-2.5 flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${op.status === 'active' ? 'bg-emerald-400' : op.status === 'complete' ? 'bg-[#7096D1]' : 'bg-amber-400'}`} />
                        <div className="min-w-0">
                          <p className="text-[9px] text-white font-semibold truncate">{op.op}</p>
                          <p className="text-[8px] text-[#6B7280]">{op.node} • {op.latency}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reasoning Chain */}
            {aiResponse.reasoningChain && aiResponse.reasoningChain.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <button onClick={() => setShowChain(!showChain)}
                  className="flex items-center gap-1.5 text-[10px] text-[#7096D1] hover:text-[#7096D1]/80 transition-colors cursor-pointer mb-2">
                  <Cpu size={10} /> Reasoning Chain {showChain ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                </button>
                {showChain && (
                  <div className="space-y-1 pl-2 border-l border-[#7096D1]/20">
                    {aiResponse.reasoningChain.map((step, i) => (
                      <p key={i} className="text-[9px] text-[#6B7280]">• {step}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Code Block */}
            {aiResponse.codeBlock && (
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <button onClick={() => setShowCode(!showCode)}
                  className="flex items-center gap-1.5 text-[10px] text-[#f59e0b] hover:text-[#f59e0b]/80 transition-colors cursor-pointer mb-2">
                  <Code2 size={10} /> Implementation {showCode ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                </button>
                {showCode && (
                  <pre className="p-3 bg-black/40 rounded-xl text-[10px] text-[#A0AEC0] overflow-x-auto font-mono leading-relaxed border border-white/[0.04]">
                    {aiResponse.codeBlock}
                  </pre>
                )}
              </div>
            )}

            {/* Actions */}
            {aiResponse.actions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {aiResponse.actions.map((a, i) => (
                  <a key={i} href={`#${a.url}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-lg text-[10px] text-[#A0AEC0] hover:text-white transition-colors no-underline">
                    <span>{a.icon}</span> {a.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Related Results */}
          {results.length > 0 && (
            <div className="grid grid-cols-1 gap-2">
              {results.map((r) => (
                <a key={r.id} href={`#${r.url}`}
                  className="group flex items-center gap-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/[0.08] rounded-xl p-3 transition-all no-underline">
                  <span className="text-lg">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-white group-hover:text-[#7096D1] transition-colors">{r.title}</p>
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.05] text-[#6B7280]">{r.type}</span>
                    </div>
                    <p className="text-[10px] text-[#6B7280] truncate">{r.description}</p>
                  </div>
                  <ChevronRight size={14} className="text-[#6B7280] group-hover:text-[#7096D1] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          )}

          {/* Related Topics */}
          {aiResponse.related.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <p className="text-[10px] text-[#6B7280] mr-1">Related:</p>
              {aiResponse.related.map((topic, i) => (
                <button key={i} onClick={() => { setQuery(topic); handleSearch(); }}
                  className="px-2 py-1 text-[9px] bg-white/[0.03] hover:bg-white/[0.06] text-[#7096D1] rounded-lg transition-colors cursor-pointer">
                  {topic}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Empty State ── */}
      {!aiResponse && !isSearching && query.trim() === '' && (
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-3 flex-wrap">
            {[
              { icon: Database, label: '392+ Topics', color: '#7096D1' },
              { icon: Cpu, label: '10 AI Engines', color: '#f59e0b' },
              { icon: Server, label: 'Backend Ops', color: '#22c55e' },
              { icon: Globe, label: '50+ Platforms', color: '#a855f7' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[10px] text-[#6B7280]">
                <item.icon size={12} style={{ color: item.color }} />
                {item.label}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#6B7280]">
            SORME™ searches across JamZia's 10 AI engines, public knowledge bases, and live backend operations.
          </p>
        </div>
      )}
    </div>
  );
}
