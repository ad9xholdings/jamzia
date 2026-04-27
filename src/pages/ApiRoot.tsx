/* ═══════════════════════════════════════════════════════════
   API ROOT — api.jamzia.tv
   API Endpoint Documentation
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Globe, Lock, Key, ChevronRight, Copy, CheckCircle,
  Terminal,
} from 'lucide-react';

interface EndpointDoc {
  method: string;
  path: string;
  description: string;
  auth: boolean;
  params?: string[];
  example?: string;
}

const ENDPOINTS: EndpointDoc[] = [
  { method: 'GET', path: '/api/v1/status', description: 'System health status', auth: false, example: '{ "status": "healthy", "uptime": 86400 }' },
  { method: 'GET', path: '/api/v1/audit', description: 'Latest audit report', auth: true, params: ['format: json|md'], example: '{ "score": 94, "status": "PASS" }' },
  { method: 'POST', path: '/api/v1/audit/run', description: 'Trigger manual audit', auth: true, example: '{ "id": "audit-001", "status": "running" }' },
  { method: 'GET', path: '/api/v1/knowledge/search', description: 'Search knowledge base', auth: false, params: ['q: search query', 'depth: light|heavy|deep|max'], example: '{ "results": [...], "score": 98 }' },
  { method: 'POST', path: '/api/v1/ai/ask', description: 'Query 9x Concierge AI', auth: true, params: ['q: natural language query', 'context: optional context'], example: '{ "response": "...", "confidence": 94 }' },
  { method: 'GET', path: '/api/v1/wallet/balance', description: 'Get wallet balance', auth: true, params: ['address: XRPL address'], example: '{ "xrp": 12450, "skyIvy": 500000000 }' },
  { method: 'POST', path: '/api/v1/tx/send', description: 'Send transaction', auth: true, params: ['to: recipient', 'amount: number', 'asset: XRP|SKYIVY'], example: '{ "hash": "abc...", "status": "submitted" }' },
  { method: 'GET', path: '/api/v1/tx/history', description: 'Transaction history', auth: true, params: ['limit: 1-100', 'offset: number'], example: '{ "transactions": [...] }' },
  { method: 'GET', path: '/api/v1/news/headlines', description: 'JamNews headlines', auth: false, params: ['category: all|business|tech|world'], example: '{ "headlines": [...] }' },
  { method: 'GET', path: '/api/v1/domain/checks', description: 'Domain endpoint checks', auth: false, example: '{ "checks": [{ "domain": "...", "status": 200 }] }' },
];

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-500/10 text-emerald-400',
  POST: 'bg-[#7096D1]/10 text-[#7096D1]',
  PUT: 'bg-amber-500/10 text-amber-400',
  DELETE: 'bg-red-500/10 text-red-400',
  PATCH: 'bg-purple-500/10 text-purple-400',
};

export default function ApiRoot() {
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const filtered = ENDPOINTS.filter(
    (e) =>
      e.path.includes(filter) ||
      e.description.toLowerCase().includes(filter.toLowerCase()) ||
      e.method.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 mb-2">
            <Terminal size={20} className="text-[#7096D1]" />
            <h1 className="text-xl font-bold">JamZia API</h1>
            <span className="text-[10px] bg-[#7096D1]/10 text-[#7096D1] px-2 py-0.5 rounded-full">v1.0</span>
          </div>
          <p className="text-xs text-[#6B7280]">RESTful API for JamZia platform integration — XRP Ledger native</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Base URL */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={14} className="text-[#7096D1]" />
            <span className="text-xs font-bold">Base URL</span>
          </div>
          <div className="flex items-center gap-2 bg-[#050810] border border-white/[0.06] rounded-lg p-3">
            <code className="text-sm text-emerald-400 font-mono flex-1">https://api.jamzia.tv</code>
            <button onClick={() => copy('https://api.jamzia.tv')} className="p-1.5 hover:bg-white/[0.04] rounded cursor-pointer shrink-0">
              {copied === 'https://api.jamzia.tv' ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} className="text-[#6B7280]" />}
            </button>
          </div>
        </div>

        {/* Auth */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={14} className="text-[#7096D1]" />
            <span className="text-xs font-bold">Authentication</span>
          </div>
          <p className="text-xs text-[#A0AEC0] mb-3">
            WisdomPay™ is the only wallet permitted on JamZia. All authentication is wallet-based via XRPL.
            Obtain your Bearer token through WisdomPay connection — no passwords, no third-party wallets.
          </p>
          <div className="bg-[#050810] border border-white/[0.06] rounded-lg p-3">
            <code className="text-xs text-[#A0AEC0] font-mono">
              Authorization: Bearer &lt;your_wisdompay_signature&gt;
            </code>
          </div>
          <p className="text-[10px] text-[#7096D1] mt-2">Powered by Ad9x™ — exclusive to JamZia</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Filter endpoints..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 bg-[#0A0F1E] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white placeholder:text-[#6B7280] focus:border-[#7096D1]/30 focus:outline-none"
          />
        </div>

        {/* Endpoints */}
        <div className="space-y-2">
          {filtered.map((ep) => (
            <div
              key={ep.path}
              className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === ep.path ? null : ep.path)}
                className="w-full flex items-center gap-3 p-3 text-left cursor-pointer hover:bg-white/[0.01] transition-colors"
              >
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${methodColors[ep.method]}`}>
                  {ep.method}
                </span>
                <code className="text-xs text-white font-mono truncate flex-1">{ep.path}</code>
                {ep.auth && <Key size={12} className="text-amber-400 shrink-0" />}
                <ChevronRight size={14} className={`text-[#6B7280] shrink-0 transition-transform ${expanded === ep.path ? 'rotate-90' : ''}`} />
              </button>

              {expanded === ep.path && (
                <div className="border-t border-white/[0.06] p-3 space-y-3">
                  <p className="text-xs text-[#A0AEC0]">{ep.description}</p>
                  {ep.params && (
                    <div>
                      <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">Parameters</p>
                      <ul className="space-y-1">
                        {ep.params.map((p) => (
                          <li key={p} className="text-xs text-[#A0AEC0] font-mono pl-2 border-l border-white/[0.06]">{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {ep.example && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Example Response</p>
                        <button onClick={() => copy(ep.example!)} className="p-1 hover:bg-white/[0.04] rounded cursor-pointer">
                          {copied === ep.example ? <CheckCircle size={10} className="text-emerald-400" /> : <Copy size={10} className="text-[#6B7280]" />}
                        </button>
                      </div>
                      <pre className="bg-[#050810] border border-white/[0.06] rounded-lg p-3 text-[11px] text-emerald-400 font-mono overflow-x-auto">
                        {ep.example}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <p className="text-[10px] text-[#6B7280]">
            JamZia API v1.0 — TLS 1.3 required — Rate limit: 100 req/min per IP
          </p>
        </div>
      </div>
    </div>
  );
}
