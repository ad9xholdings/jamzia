/* ═══════════════════════════════════════════════════════════
   MeshViz — 9-Node AI Mesh Visualization
   Active node paths, signal strength, routing visualization
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import { Activity, Cpu, Zap } from 'lucide-react';
import { AI_NODES, classifyIntent, buildRoutingPath, buildNodeVotes, type IntentResult } from '../core/ai-nodes';

interface MeshVizProps {
  query?: string;
  compact?: boolean;
}

export default function MeshViz({ query, compact = false }: MeshVizProps) {
  const [intent, setIntent] = useState<IntentResult | null>(null);

  useEffect(() => {
    if (query) {
      setIntent(classifyIntent(query));
    } else {
      // Default: show all nodes idle
      setIntent({ primary: 'prime', secondary: [], confidence: 0.45, domains: [] });
    }
  }, [query]);

  const votes = intent ? buildNodeVotes(intent, query || '') : [];
  const path = intent ? buildRoutingPath(intent, 'JamHeavy') : null;

  if (compact) {
    return (
      <div className="bg-black/40 rounded-xl p-3 border border-white/[0.04]">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={12} className="text-[#7096D1]" />
          <p className="text-[9px] font-bold text-white">9-Node Mesh</p>
          <span className="text-[8px] text-[#6B7280] ml-auto">{intent ? `${(intent.confidence * 100).toFixed(0)}% confidence` : 'Idle'}</span>
        </div>
        <div className="grid grid-cols-9 gap-1">
          {AI_NODES.map(node => {
            const vote = votes.find(v => v.codename === node.codename);
            const isActive = vote && vote.signal !== 'none';
            return (
              <div key={node.id} className="text-center">
                <div
                  className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[8px] font-bold transition-all ${
                    isActive ? 'animate-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? `${node.color}30` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isActive ? node.color + '60' : 'rgba(255,255,255,0.06)'}`,
                    color: isActive ? node.color : '#6B7280',
                  }}
                >
                  {node.icon}
                </div>
                <p className="text-[6px] text-[#6B7280] mt-0.5 truncate">{node.codename}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0F1E] rounded-2xl border border-white/[0.06] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Cpu size={16} className="text-[#7096D1]" />
        <h3 className="text-sm font-bold text-white">9-Node AI Mesh</h3>
        {intent && (
          <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${AI_NODES.find(n => n.id === intent.primary)?.color}20`, color: AI_NODES.find(n => n.id === intent.primary)?.color }}>
            {(intent.confidence * 100).toFixed(0)}% confidence
          </span>
        )}
      </div>

      {/* Node Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {AI_NODES.map(node => {
          const vote = votes.find(v => v.codename === node.codename);
          const isPrimary = intent?.primary === node.id;
          const isSecondary = intent?.secondary.includes(node.id);
          const isActive = isPrimary || isSecondary;

          return (
            <div
              key={node.id}
              className={`relative rounded-xl p-3 border transition-all ${
                isActive ? 'border-opacity-40' : 'border-white/[0.04]'
              }`}
              style={{
                borderColor: isActive ? node.color + '60' : 'rgba(255,255,255,0.04)',
                backgroundColor: isActive ? `${node.color}10` : 'rgba(255,255,255,0.02)',
              }}
            >
              {isPrimary && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-black" style={{ backgroundColor: node.color }}>
                  ★
                </div>
              )}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm" style={{ color: node.color }}>{node.icon}</span>
                <span className="text-[10px] font-bold text-white">{node.codename}</span>
              </div>
              <p className="text-[8px] text-[#6B7280] leading-tight">{node.role}</p>
              {vote && vote.signal !== 'none' && (
                <div className="mt-1.5 flex items-center gap-1">
                  <div className="flex-1 h-1 rounded-full bg-white/[0.05]">
                    <div className="h-1 rounded-full transition-all" style={{ width: `${vote.confidence * 100}%`, backgroundColor: node.color }} />
                  </div>
                  <span className="text-[7px]" style={{ color: node.color }}>{(vote.confidence * 100).toFixed(0)}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Routing Path */}
      {path && (
        <div className="mb-4">
          <p className="text-[9px] text-[#6B7280] font-semibold mb-2 flex items-center gap-1">
            <Zap size={10} /> Routing Path — {path.totalLatency}
          </p>
          <div className="flex items-center gap-1 overflow-x-auto">
            {path.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div className="px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-[8px] text-white font-semibold">{step.node}</p>
                  <p className="text-[7px] text-[#6B7280]">{step.action}</p>
                </div>
                {i < path.steps.length - 1 && (
                  <span className="text-[8px] text-[#6B7280]">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Signal Table */}
      <div className="space-y-1">
        <p className="text-[9px] text-[#6B7280] font-semibold mb-1">Node Signal Matrix</p>
        {votes.slice(0, 5).map(vote => (
          <div key={vote.codename} className="flex items-center gap-2 text-[9px]">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: vote.signal === 'strong' ? '#10B981' : vote.signal === 'moderate' ? '#F59E0B' : vote.signal === 'weak' ? '#6B7280' : 'transparent',
                border: vote.signal === 'none' ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            />
            <span className="text-white w-20">{vote.codename}</span>
            <span className="text-[#6B7280] flex-1 truncate">{vote.recommendation}</span>
            <span className="text-[#6B7280] w-12 text-right">{vote.latency}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
