/* ═══════════════════════════════════════════════════════════
   JamDeploy — CI/CD Deployment Pipeline
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Play, CheckCircle, XCircle, Clock,
  ChevronDown, ChevronRight, Terminal, Rocket,
  GitCommit, Loader, ArrowRight,
  Plus, Pause
} from 'lucide-react';

/* ── Types ── */
interface Pipeline {
  id: string;
  name: string;
  repo: string;
  branch: string;
  status: 'running' | 'success' | 'failed' | 'pending' | 'paused';
  lastRun: string;
  duration: string;
  commit: string;
  author: string;
  stages: Stage[];
}

interface Stage {
  name: string;
  status: 'success' | 'failed' | 'running' | 'pending' | 'skipped';
  duration: string;
  logs?: string[];
}

interface Deployment {
  id: string;
  env: 'production' | 'staging' | 'development';
  version: string;
  status: 'deployed' | 'deploying' | 'rolled_back' | 'failed';
  time: string;
  health: 'healthy' | 'degraded' | 'unhealthy';
}

/* ── Mock Data ── */
const INITIAL_PIPELINES: Pipeline[] = [
  {
    id: 'p1', name: 'JamZia Main', repo: 'ad9x/jamzia', branch: 'main',
    status: 'success', lastRun: '2 min ago', duration: '4m 32s',
    commit: 'a3f7d2e', author: 'Cuz Cotton',
    stages: [
      { name: 'Lint & Test', status: 'success', duration: '1m 12s', logs: ['Running eslint...', 'Tests: 482 passed, 0 failed', 'Coverage: 87.3%'] },
      { name: 'Build', status: 'success', duration: '1m 45s', logs: ['Vite build starting...', 'Chunks: 178 generated', 'Bundle size: 12.4 MB'] },
      { name: 'Security Scan', status: 'success', duration: '45s', logs: ['Snyk scan complete', '0 vulnerabilities found', 'License check passed'] },
      { name: 'Deploy Staging', status: 'success', duration: '50s', logs: ['Uploading to staging...', 'Invalidating CDN cache', 'Health check passed'] },
    ],
  },
  {
    id: 'p2', name: 'JamPay API', repo: 'ad9x/jampay', branch: 'main',
    status: 'running', lastRun: 'Running now', duration: '2m 15s',
    commit: 'b8e4c1a', author: 'DevTeam',
    stages: [
      { name: 'Unit Tests', status: 'success', duration: '58s', logs: ['Running 234 tests...', 'All passed'] },
      { name: 'Integration', status: 'running', duration: '1m 17s', logs: ['XRPL sandbox connected', 'Running payment flows...', 'Webhook tests in progress'] },
      { name: 'Contract Test', status: 'pending', duration: '—' },
      { name: 'Deploy', status: 'pending', duration: '—' },
    ],
  },
  {
    id: 'p3', name: 'JamDEX Engine', repo: 'ad9x/jamdex', branch: 'feature/limit-orders',
    status: 'failed', lastRun: '1 hr ago', duration: '3m 10s',
    commit: 'c9d2e4f', author: 'QuantTeam',
    stages: [
      { name: 'Build', status: 'success', duration: '1m 20s' },
      { name: 'AMM Tests', status: 'failed', duration: '1m 45s', logs: ['Testing liquidity pool math...', 'FAIL: edge case at line 892', 'Precision loss detected'] },
      { name: 'Security Audit', status: 'skipped', duration: '—' },
      { name: 'Deploy', status: 'skipped', duration: '—' },
    ],
  },
  {
    id: 'p4', name: 'NoFear White Label', repo: 'ad9x/wl-nofear', branch: 'release/v2.1',
    status: 'pending', lastRun: '3 hr ago', duration: '—',
    commit: 'd1e3f5a', author: 'WL-Team',
    stages: [
      { name: 'Build', status: 'pending', duration: '—' },
      { name: 'Brand Check', status: 'pending', duration: '—' },
      { name: 'Deploy', status: 'pending', duration: '—' },
    ],
  },
  {
    id: 'p5', name: 'BlackDiamond Media', repo: 'ad9x/wl-bdd', branch: 'main',
    status: 'success', lastRun: '5 hr ago', duration: '6m 18s',
    commit: 'e2f4g6h', author: 'MediaTeam',
    stages: [
      { name: 'Transcode', status: 'success', duration: '3m 20s', logs: ['1080p transcoded', '4K HDR transcoded', 'Audio: AAC 320kbps'] },
      { name: 'CDN Upload', status: 'success', duration: '2m 30s' },
      { name: 'Smoke Test', status: 'success', duration: '28s' },
    ],
  },
];

const DEPLOYMENTS: Deployment[] = [
  { id: 'd1', env: 'production', version: 'v3.2.1', status: 'deployed', time: '2 min ago', health: 'healthy' },
  { id: 'd2', env: 'staging', version: 'v3.3.0-rc', status: 'deployed', time: '15 min ago', health: 'healthy' },
  { id: 'd3', env: 'development', version: 'v3.3.0-dev', status: 'deploying', time: 'Running', health: 'healthy' },
  { id: 'd4', env: 'production', version: 'v3.2.0', status: 'rolled_back', time: '1 day ago', health: 'healthy' },
];

/* ── Status helpers ── */
const statusColors = {
  success: { bg: '#22c55e15', text: '#22c55e', icon: CheckCircle },
  failed: { bg: '#ef444415', text: '#ef4444', icon: XCircle },
  running: { bg: '#7096D115', text: '#7096D1', icon: Loader },
  pending: { bg: '#1F1F1F', text: '#6B7280', icon: Clock },
  paused: { bg: '#f59e0b15', text: '#f59e0b', icon: Pause },
  skipped: { bg: '#1F1F1F', text: '#6B7280', icon: ChevronRight },
};

const envColors = {
  production: '#ef4444',
  staging: '#f59e0b',
  development: '#22c55e',
};

/* ── Main Component ── */
export default function JamDeploy() {
  const [pipelines, setPipelines] = useState<Pipeline[]>(INITIAL_PIPELINES);
  const [expandedPipeline, setExpandedPipeline] = useState<string | null>('p1');
  const [selectedStage, setSelectedStage] = useState<{ pipelineId: string; stageIdx: number } | null>(null);

  const triggerPipeline = (id: string) => {
    setPipelines(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, status: 'running' as const, lastRun: 'Running now', duration: '0s' };
    }));
  };

  const selectedPipeline = pipelines.find(p => p.id === expandedPipeline);
  const selectedStageData = selectedPipeline && selectedStage?.pipelineId === selectedPipeline.id
    ? selectedPipeline.stages[selectedStage.stageIdx]
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                <Rocket size={20} className="text-[#22c55e]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamDeploy</h1>
                <p className="text-[10px] text-[#6B7280]">CI/CD Pipeline · Collective General Technologies, LLC</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={12} className="text-emerald-400" />
                <span className="text-emerald-400">{pipelines.filter(p => p.status === 'success').length} Passed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Loader size={12} className="text-[#7096D1] animate-spin" />
                <span className="text-[#7096D1]">{pipelines.filter(p => p.status === 'running').length} Running</span>
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle size={12} className="text-red-400" />
                <span className="text-red-400">{pipelines.filter(p => p.status === 'failed').length} Failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Environment Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEPLOYMENTS.slice(0, 3).map(d => (
            <div key={d.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: envColors[d.env] }} />
                  <span className="text-sm font-medium capitalize">{d.env}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.health === 'healthy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {d.health}
                </span>
              </div>
              <p className="text-2xl font-bold">{d.version}</p>
              <p className="text-xs text-[#6B7280] mt-1">{d.status === 'deploying' ? 'Deploying now...' : `Deployed ${d.time}`}</p>
              {d.status === 'deploying' && (
                <div className="mt-2 h-1 bg-[#1F1F1F] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7096D1] rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pipelines */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between">
            <h2 className="text-sm font-medium">Pipelines</h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7096D1] hover:bg-[#5a7fc0] rounded-lg text-xs font-medium transition-colors">
              <Plus size={12} />
              New Pipeline
            </button>
          </div>
          <div className="divide-y divide-[#1F1F1F]/50">
            {pipelines.map(pipeline => {
              const cfg = statusColors[pipeline.status];
              const StatusIcon = cfg.icon;
              const isExpanded = expandedPipeline === pipeline.id;
              return (
                <div key={pipeline.id}>
                  <div
                    className="p-4 flex items-center gap-4 hover:bg-white/[0.02] cursor-pointer transition-colors"
                    onClick={() => setExpandedPipeline(isExpanded ? null : pipeline.id)}
                  >
                    <button className="text-[#6B7280]">
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>

                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium`} style={{ backgroundColor: cfg.bg, color: cfg.text }}>
                      <StatusIcon size={10} className={pipeline.status === 'running' ? 'animate-spin' : ''} />
                      {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{pipeline.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{pipeline.repo} · {pipeline.branch}</p>
                    </div>

                    <div className="hidden md:flex items-center gap-1 text-[10px] text-[#6B7280]">
                      <GitCommit size={10} />
                      {pipeline.commit} by {pipeline.author}
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs text-[#6B7280]">{pipeline.lastRun}</p>
                      <p className="text-[10px] text-[#6B7280]">{pipeline.duration}</p>
                    </div>

                    <button
                      onClick={e => { e.stopPropagation(); triggerPipeline(pipeline.id); }}
                      disabled={pipeline.status === 'running'}
                      className="p-2 rounded-lg bg-[#1F1F1F] text-[#6B7280] hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <Play size={12} />
                    </button>
                  </div>

                  {/* Expanded stages */}
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <div className="ml-6 bg-black border border-[#1F1F1F] rounded-xl overflow-hidden">
                        {/* Stage flow */}
                        <div className="flex items-center p-4 gap-2 overflow-x-auto">
                          {pipeline.stages.map((stage, idx) => {
                            const sc = statusColors[stage.status];
                            const StageIcon = sc.icon;
                            const isSelected = selectedStage?.pipelineId === pipeline.id && selectedStage?.stageIdx === idx;
                            return (
                              <div key={idx} className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => setSelectedStage({ pipelineId: pipeline.id, stageIdx: idx })}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-colors ${
                                    isSelected ? 'border-[#7096D1] bg-[#7096D1]/10' : 'border-[#1F1F1F] hover:border-[#2A2A2A]'
                                  }`}
                                >
                                  <StageIcon size={12} className={stage.status === 'running' ? 'animate-spin' : ''} style={{ color: sc.text }} />
                                  <span className="font-medium">{stage.name}</span>
                                  <span className="text-[10px] text-[#6B7280]">{stage.duration}</span>
                                </button>
                                {idx < pipeline.stages.length - 1 && (
                                  <ArrowRight size={12} className="text-[#1F1F1F] shrink-0" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Stage logs */}
                        {selectedStageData && (
                          <div className="border-t border-[#1F1F1F] p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Terminal size={12} className="text-[#6B7280]" />
                              <span className="text-xs font-medium">{selectedStageData.name} Logs</span>
                            </div>
                            {selectedStageData.logs ? (
                              <div className="bg-black rounded-lg p-3 font-mono text-[10px] text-[#6B7280] space-y-1">
                                {selectedStageData.logs.map((log, i) => (
                                  <div key={i} className="flex gap-2">
                                    <span className="text-[#7096D1]">[{i + 1}]</span>
                                    <span>{log}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-[#6B7280]">No logs available for this stage.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
