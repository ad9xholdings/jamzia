/* ═══════════════════════════════════════════════════════════
   OperationsLedger — 6 Artifact Families Dashboard
   Immutable, cross-referenced, verifiable
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Shield, FileText,
  ChevronRight, ExternalLink, Hash, CheckCircle,
  XCircle, AlertTriangle, Lock,
} from 'lucide-react';
import { generateMockLedger, ARTIFACT_FAMILIES, getLedgerStats, type Artifact, type ArtifactFamily } from '../core/operations';

const STATUS_META = {
  active: { icon: CheckCircle, color: '#10B981', label: 'Active' },
  pending: { icon: AlertTriangle, color: '#F59E0B', label: 'Pending' },
  sealed: { icon: Lock, color: '#7096D1', label: 'Sealed' },
  revoked: { icon: XCircle, color: '#EF4444', label: 'Revoked' },
};

export default function OperationsLedger() {
  const [artifacts] = useState(() => generateMockLedger());
  const [activeFamily, setActiveFamily] = useState<ArtifactFamily | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const stats = getLedgerStats(artifacts);
  const filtered = activeFamily ? artifacts.filter(a => a.family === activeFamily) : artifacts;

  return (
    <div className="min-h-[100dvh] bg-[#0A0F1E] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0A0F1E]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-3">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline shrink-0">back</a>
          <Shield size={20} className="text-[#C9A03F] shrink-0" />
          <div>
            <h1 className="text-sm font-bold text-white">Operations Ledger</h1>
            <p className="text-[9px] text-[#6B7280]">Immutable Artifact Registry — 6 Families</p>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ARTIFACT_FAMILIES.map(f => {
            const s = stats[f.id];
            return (
              <button
                key={f.id}
                onClick={() => setActiveFamily(activeFamily === f.id ? null : f.id)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  activeFamily === f.id ? 'border-opacity-40' : 'border-white/[0.04] hover:border-white/[0.08]'
                }`}
                style={{
                  borderColor: activeFamily === f.id ? f.color + '60' : undefined,
                  backgroundColor: activeFamily === f.id ? `${f.color}10` : 'rgba(255,255,255,0.02)',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm" style={{ color: f.color }}>{f.icon}</span>
                  <span className="text-[10px] font-bold text-white">{f.label}</span>
                </div>
                <p className="text-lg font-bold" style={{ color: f.color }}>{s.count}</p>
                <p className="text-[8px] text-[#6B7280]">{s.active} active • {(s.size / 1024).toFixed(1)} MB total</p>
              </button>
            );
          })}
        </div>

        {/* Artifact List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-white">
              {activeFamily
                ? ARTIFACT_FAMILIES.find(f => f.id === activeFamily)?.label
                : 'All Artifacts'}
            </h3>
            <span className="text-[9px] text-[#6B7280]">{filtered.length} entries</span>
          </div>

          <div className="space-y-2">
            {filtered.map(a => {
              const family = ARTIFACT_FAMILIES.find(f => f.id === a.family)!;
              const status = STATUS_META[a.status];

              return (
                <button
                  key={a.id}
                  onClick={() => setSelectedArtifact(a)}
                  className="w-full text-left flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/[0.08] rounded-xl transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${family.color}15` }}>
                    <span className="text-sm">{family.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-white truncate">{a.title}</p>
                      <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${status.color}15`, color: status.color }}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-[#6B7280] mt-0.5">
                      <span>{a.id}</span>
                      <span>•</span>
                      <span>{a.origin}</span>
                      <span>•</span>
                      <span>{a.ledgerIndex}</span>
                      <span>•</span>
                      <span>{a.size}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-[#6B7280] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Artifact Detail Modal */}
        {selectedArtifact && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedArtifact(null)}>
            <div className="w-full max-w-lg bg-[#0F172A] border border-white/[0.08] rounded-2xl p-5 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ARTIFACT_FAMILIES.find(f => f.id === selectedArtifact.family)?.color}15` }}>
                  <span className="text-lg">{ARTIFACT_FAMILIES.find(f => f.id === selectedArtifact.family)?.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedArtifact.title}</h3>
                  <p className="text-[9px] text-[#6B7280]">{selectedArtifact.id} • {selectedArtifact.ledgerIndex}</p>
                </div>
                <button onClick={() => setSelectedArtifact(null)} className="ml-auto w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-[#6B7280] cursor-pointer">
                  <span className="text-sm">×</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-white/[0.02] rounded-lg p-2.5">
                    <p className="text-[#6B7280] mb-0.5">Status</p>
                    <p className="text-white font-semibold flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_META[selectedArtifact.status].color }} />
                      {STATUS_META[selectedArtifact.status].label}
                    </p>
                  </div>
                  <div className="bg-white/[0.02] rounded-lg p-2.5">
                    <p className="text-[#6B7280] mb-0.5">Origin Node</p>
                    <p className="text-white font-semibold">{selectedArtifact.origin}</p>
                  </div>
                  <div className="bg-white/[0.02] rounded-lg p-2.5">
                    <p className="text-[#6B7280] mb-0.5">Timestamp</p>
                    <p className="text-white font-semibold">{new Date(selectedArtifact.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="bg-white/[0.02] rounded-lg p-2.5">
                    <p className="text-[#6B7280] mb-0.5">Size</p>
                    <p className="text-white font-semibold">{selectedArtifact.size}</p>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-3">
                  <p className="text-[9px] text-[#6B7280] mb-1 flex items-center gap-1">
                    <Hash size={9} /> SHA-256 Hash
                  </p>
                  <p className="text-[10px] text-[#7096D1] font-mono break-all">{selectedArtifact.hash}</p>
                </div>

                <div>
                  <p className="text-[9px] text-[#6B7280] font-semibold mb-2">Details</p>
                  <div className="space-y-1.5">
                    {Object.entries(selectedArtifact.details).map(([key, val]) => (
                      <div key={key} className="flex items-start gap-2 text-[10px]">
                        <span className="text-[#6B7280] w-24 shrink-0">{key}</span>
                        <span className="text-white">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.06] rounded-lg text-[10px] text-white transition-colors cursor-pointer">
                    <ExternalLink size={10} /> View on Ledger
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.06] rounded-lg text-[10px] text-white transition-colors cursor-pointer">
                    <FileText size={10} /> Download Proof
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
