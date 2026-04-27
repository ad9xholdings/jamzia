/* ═══════════════════════════════════════════════════════════
   AUDIT LOGS VIEWER — audit.jamzia.tv
   Immutable Audit Trail per Charging Document §10
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import {
  Shield, Download, FileText, ChevronRight, Clock,
  AlertTriangle, CheckCircle, XCircle, RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  auditLogger,
  runAutomatedAudit,
  type AuditReport,
  type AuditViolation,
} from '../services/auditEngine';

function StatusBadge({ status }: { status: 'PASS' | 'WARNING' | 'FAIL' }) {
  const config = {
    PASS: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    WARNING: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    FAIL: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${c.bg} ${c.color}`}>
      <c.icon size={10} /> {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    CRITICAL: 'bg-red-500/10 text-red-400',
    HIGH: 'bg-orange-500/10 text-orange-400',
    MEDIUM: 'bg-[#7096D1]/10 text-[#7096D1]',
    LOW: 'bg-white/5 text-[#6B7280]',
    INFO: 'bg-white/5 text-[#6B7280]',
  };
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${colors[severity] || colors.INFO}`}>
      {severity}
    </span>
  );
}

export default function AuditLogs() {
  const [history, setHistory] = useState<AuditReport[]>([]);
  const [selected, setSelected] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  useEffect(() => {
    setHistory(auditLogger.getHistory(20));
  }, []);

  const runAudit = async () => {
    setLoading(true);
    const report = await runAutomatedAudit();
    setHistory((p) => [report, ...p].slice(0, 20));
    setSelected(report);
    setLoading(false);
  };

  const exportJSON = () => {
    const data = JSON.stringify(selected ?? history[0] ?? {}, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportMarkdown = () => {
    if (!selected) return;
    const lines = [
      `# Audit Report — ${selected.timestamp}`,
      `**Version:** ${selected.version}  `,
      `**Score:** ${selected.complianceScore}%  `,
      `**Status:** ${selected.status}  `,
      ``,
      `## Violations (${selected.violations.length})`,
      ...selected.violations.map((v) =>
        `- **[${v.severity}]** \`${v.dimension}\`: ${v.message}`
      ),
      ``,
      `## Recommendations`,
      ...selected.recommendations.map((r) => `- ${r}`),
      ``,
      `## Domain Checks`,
      ...(selected.domainChecks?.map((d) =>
        `- ${d.domain}: HTTP ${d.status} in ${d.responseTime}ms`
      ) ?? []),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredViolations = selected?.violations.filter((v) =>
    filterSeverity === 'ALL' || v.severity === filterSeverity
  ) ?? [];

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#7096D1]" />
              <div>
                <h1 className="text-xl font-bold">Audit Logs</h1>
                <p className="text-xs text-[#6B7280]">Immutable compliance audit trail — Charging Document v2.1</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={exportJSON} className="px-3 py-1.5 bg-[#0A0F1E] border border-white/[0.06] text-[#6B7280] text-[10px] rounded-lg hover:text-white transition-colors cursor-pointer">
                <Download size={10} className="inline mr-1" /> JSON
              </button>
              <button onClick={exportMarkdown} className="px-3 py-1.5 bg-[#0A0F1E] border border-white/[0.06] text-[#6B7280] text-[10px] rounded-lg hover:text-white transition-colors cursor-pointer">
                <FileText size={10} className="inline mr-1" /> MD
              </button>
              <button onClick={runAudit} disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 text-[#7096D1] text-[10px] rounded-lg transition-colors cursor-pointer disabled:opacity-50">
                <RefreshCw size={10} className={loading ? 'animate-spin' : ''} /> Run Audit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* History Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Audit History ({history.length})</p>
            {history.length === 0 ? (
              <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-6 text-center">
                <Clock size={20} className="text-[#6B7280] mx-auto mb-2" />
                <p className="text-xs text-[#6B7280]">No audits yet</p>
              </div>
            ) : (
              history.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(r)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selected?.timestamp === r.timestamp
                      ? 'bg-[#7096D1]/10 border-[#7096D1]/30'
                      : 'bg-[#0A0F1E] border-white/[0.06] hover:border-white/[0.1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <StatusBadge status={r.status} />
                    <span className="text-[9px] text-[#6B7280]">
                      {new Date(r.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-white">Score: {r.complianceScore}%</p>
                  <p className="text-[9px] text-[#6B7280]">{r.violations.length} violations</p>
                </button>
              ))
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2 space-y-4">
            {selected ? (
              <>
                {/* Score Header */}
                <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Compliance</p>
                      <p className={`text-3xl font-bold ${
                        selected.status === 'PASS' ? 'text-emerald-400'
                        : selected.status === 'WARNING' ? 'text-amber-400'
                        : 'text-red-400'
                      }`}>{selected.complianceScore}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Violations</p>
                      <p className="text-3xl font-bold text-white">{selected.violations.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Domain Checks</p>
                      <p className="text-3xl font-bold text-white">{selected.domainChecks?.length ?? 0}</p>
                    </div>
                  </div>
                </div>

                {/* Violations */}
                {selected.violations.length > 0 && (
                  <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-[#7096D1]" />
                        <span className="text-sm font-bold">Violations</span>
                      </div>
                      <select
                        value={filterSeverity}
                        onChange={(e) => setFilterSeverity(e.target.value)}
                        className="bg-[#050810] border border-white/[0.06] text-[#6B7280] text-[10px] rounded-lg px-2 py-1"
                      >
                        <option value="ALL">All Severities</option>
                        <option value="CRITICAL">Critical</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      {filteredViolations.map((v: AuditViolation) => (
                        <div key={v.id} className="bg-[#050810] border border-white/[0.04] rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <SeverityBadge severity={v.severity} />
                            <span className="text-[10px] text-[#6B7280]">{v.type}</span>
                            <span className="text-[10px] text-[#6B7280] font-mono">{v.dimension}</span>
                          </div>
                          <p className="text-xs text-white">{v.message}</p>
                          <p className="text-[10px] text-[#7096D1] mt-1">{v.remediation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Domain Checks */}
                {selected.domainChecks && selected.domainChecks.length > 0 && (
                  <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <ExternalLink size={16} className="text-[#7096D1]" />
                      <span className="text-sm font-bold">Domain Endpoint Checks</span>
                    </div>
                    <div className="space-y-2">
                      {selected.domainChecks.map((d) => (
                        <div key={d.domain} className="flex items-center gap-3 bg-[#050810] border border-white/[0.04] rounded-lg p-3">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${d.status === 200 ? 'bg-emerald-400' : 'bg-red-400'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white font-mono truncate">{d.domain}</p>
                          </div>
                          <span className="text-[10px] text-[#6B7280] font-mono">HTTP {d.status}</span>
                          <span className={`text-[10px] font-mono ${d.responseTime > 3000 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {d.responseTime}ms
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {selected.recommendations.length > 0 && (
                  <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <ChevronRight size={16} className="text-[#7096D1]" />
                      <span className="text-sm font-bold">Recommendations</span>
                    </div>
                    <div className="space-y-2">
                      {selected.recommendations.map((r, i) => (
                        <p key={i} className="text-xs text-[#A0AEC0] pl-3 border-l-2 border-[#7096D1]/30">{r}</p>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-12 text-center">
                <Shield size={32} className="text-[#6B7280] mx-auto mb-3" />
                <p className="text-sm text-[#6B7280]">Select an audit report to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
