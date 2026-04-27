/* ═══════════════════════════════════════════════════════════
   DEVELOPER DOCS — docs.jamzia.tv
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  BookOpen, Code, Zap, Shield, Globe, ChevronRight,
  ExternalLink, Copy, CheckCircle,
} from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  content: string;
}

const SECTIONS: DocSection[] = [
  {
    id: 'quickstart',
    title: 'Quick Start',
    icon: Zap,
    content: `## Getting Started

Welcome to the JamZia developer platform. This guide will get you up and running in under 5 minutes.

### Prerequisites
- Node.js 20+
- A WisdomPay-compatible wallet
- API key (generated from your wallet signature)

### Installation
\`\`\`bash
npm install @jamzia/sdk
\`\`\`

### Initialize SDK
\`\`\`typescript
import { JamZia } from '@jamzia/sdk';

const client = new JamZia({
  network: 'mainnet',  // or 'testnet'
  wallet: 'rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj',
});
\`\`\``,
  },
  {
    id: 'authentication',
    title: 'Authentication',
    icon: Shield,
    content: `## WisdomPay™ Authentication

WisdomPay™ is the only wallet permitted on JamZia. All authentication is wallet-based via XRPL — powered by Ad9x™.

### Sign-In Flow
1. Connect your WisdomPay wallet (the only authorized wallet on JamZia)
2. Sign a challenge message with your XRPL keypair
3. Receive a Bearer token (valid for 24 hours)

### Example
\`\`\`typescript
const auth = await client.authenticate({
  wallet: 'rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj',
  message: 'Login to JamZia at ' + Date.now(),
});

// auth.token is your Bearer token
// Use in all subsequent requests
\`\`\`

### Important
- No third-party wallets are permitted on JamZia
- All financial flows go through WisdomPay exclusively
- Self-custody: your keys, your assets`,
  },
  {
    id: 'payments',
    title: 'WisdomPay™ Payments',
    icon: Zap,
    content: `## WisdomPay™ — The Only Wallet on JamZia

All financial transactions on JamZia flow exclusively through WisdomPay™ — powered by Ad9x™.
XRPL-native, self-custody, sub-second settlement.

### Send Payment
\`\`\`typescript
const tx = await client.wisdompay.send({
  to: 'rDestination...',
  amount: '100',
  currency: 'XRP',
});

console.log(tx.hash);  // Transaction hash
console.log(tx.status);  // "tesSUCCESS"
\`\`\`

### Check Balance
\`\`\`typescript
const balance = await client.wisdompay.getBalance();
console.log(balance.xrp);      // 12450.00
console.log(balance.skyIvy);   // 500000000
\`\`\`

### Important
- WisdomPay is the only wallet permitted on JamZia
- No third-party wallet integrations
- All transactions are XRPL-native`,
  },
  {
    id: 'knowledge',
    title: 'Knowledge Engine (9x)',
    icon: BookOpen,
    content: `## 9x Concierge AI

Query the 9-engine knowledge base with confidence scoring and source attribution.

### Ask a Question
\`\`\`typescript
const response = await client.ai.ask({
  query: 'What is the SkyIvy tokenomics model?',
  depth: 'deep',  // light | heavy | deep | max
});

console.log(response.text);
console.log(response.confidenceScore);  // 0-100
console.log(response.sources);          // Source references
\`\`\`

### Anti-Hallucination
All responses include:
- Confidence score (rejected if &lt; 60%)
- Source references with verification status
- Uncertainty flags for low-confidence claims`,
  },
  {
    id: 'audit',
    title: 'Audit & Compliance',
    icon: Shield,
    content: `## Audit Engine Integration

Programmatic access to the Charging Document v2.1 compliance engine.

### Run Audit
\`\`\`typescript
const report = await client.audit.run();

console.log(report.complianceScore);  // 94
console.log(report.status);           // "PASS"
console.log(report.violations);       // Array of violations
\`\`\`

### Domain Checks
\`\`\`typescript
const checks = await client.audit.checkDomains();

checks.forEach(check => {
  console.log(check.domain, check.status, check.responseTime + 'ms');
});
\`\`\``,
  },
  {
    id: 'ar',
    title: 'AR Engine (Phase 2)',
    icon: Globe,
    content: `## Augmented Reality SDK

⚠️ Phase 2 feature — Coming Q3 2026

### Planned Capabilities
- Depth estimation (LiDAR / stereo)
- Occlusion handling
- Real-time lighting estimation
- Spatial anchoring
- Physics simulation
- Multi-user shared AR spaces

### AR Realism Scoring
The Charging Document defines 10 dimensions scored 0-10:
1. Depth Estimation (min: 5)
2. Occlusion (min: 5)
3. Lighting (min: 5)
4. Spatial Anchoring (min: 5)
5. Physics (min: 5)
6. Texture Quality (min: 5)
7. Tracking Stability (min: 7)
8. Performance/FPS (min: 7)
9. Multi-User (min: 5)
10. Environmental Understanding (min: 5)

Passing requires average ≥ 7.0.`,
  },
  {
    id: 'sdk',
    title: 'SDK Reference',
    icon: Code,
    content: `## SDK Method Reference

### Core Client
\`\`\`typescript
class JamZia {
  constructor(config: JamZiaConfig);
  
  readonly payments: PaymentService;
  readonly wallet: WalletService;
  readonly ai: AIService;
  readonly audit: AuditService;
  readonly news: NewsService;
  
  authenticate(opts: AuthOptions): Promise<AuthResult>;
  disconnect(): void;
}
\`\`\`

### Configuration
\`\`\`typescript
interface JamZiaConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  wallet?: string;           // XRPL address
  apiUrl?: string;           // Default: https://api.jamzia.tv
  timeout?: number;          // Default: 30000ms
}
\`\`\``,
  },
];

export default function DocsPage() {
  const [active, setActive] = useState('quickstart');
  const [copied, setCopied] = useState(false);

  const section = SECTIONS.find((s) => s.id === active)!;

  const copyCode = () => {
    const code = section.content;
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Simple markdown renderer
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCode = false;
    let codeContent = '';
    let codeLang = '';

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (inCode) {
          elements.push(
            <div key={i} className="relative my-3">
              <div className="flex items-center justify-between bg-[#050810] border border-white/[0.06] rounded-t-lg px-3 py-1.5">
                <span className="text-[10px] text-[#6B7280] font-mono">{codeLang || 'code'}</span>
                <button onClick={copyCode} className="p-1 hover:bg-white/[0.04] rounded cursor-pointer">
                  {copied ? <CheckCircle size={10} className="text-emerald-400" /> : <Copy size={10} className="text-[#6B7280]" />}
                </button>
              </div>
              <pre className="bg-[#050810] border-x border-b border-white/[0.06] rounded-b-lg p-3 text-[11px] text-emerald-400 font-mono overflow-x-auto">
                {codeContent.trim()}
              </pre>
            </div>
          );
          codeContent = '';
          codeLang = '';
          inCode = false;
        } else {
          inCode = true;
          codeLang = line.replace('```', '').trim();
        }
        return;
      }

      if (inCode) {
        codeContent += line + '\n';
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-sm font-bold text-white mt-6 mb-3">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-xs font-bold text-[#A0AEC0] mt-4 mb-2">{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('- ')) {
        elements.push(<li key={i} className="text-xs text-[#A0AEC0] ml-4 list-disc">{renderInline(line.replace('- ', ''))}</li>);
      } else if (line.match(/^\d+\./)) {
        elements.push(<li key={i} className="text-xs text-[#A0AEC0] ml-4 list-decimal">{renderInline(line.replace(/^\d+\.\s*/, ''))}</li>);
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-2" />);
      } else {
        elements.push(<p key={i} className="text-xs text-[#A0AEC0] leading-relaxed">{renderInline(line)}</p>);
      }
    });

    return elements;
  };

  const renderInline = (text: string) => {
    // Handle `code` inline
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="text-emerald-400 font-mono text-[11px] bg-white/[0.04] px-1 rounded">{part.slice(1, -1)}</code>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={20} className="text-[#7096D1]" />
            <h1 className="text-xl font-bold">Developer Docs</h1>
            <span className="text-[10px] bg-[#7096D1]/10 text-[#7096D1] px-2 py-0.5 rounded-full">v1.0</span>
          </div>
          <p className="text-xs text-[#6B7280]">Build on JamZia — SDK, API reference, and integration guides</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-1">
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-3 px-2">Documentation</p>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  active === s.id
                    ? 'bg-[#7096D1]/10 text-white'
                    : 'text-[#6B7280] hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <s.icon size={14} className={active === s.id ? 'text-[#7096D1]' : 'text-[#6B7280]'} />
                <span className="text-xs">{s.title}</span>
                <ChevronRight size={12} className={`ml-auto transition-transform ${active === s.id ? 'rotate-90 text-[#7096D1]' : 'text-[#6B7280]'}`} />
              </button>
            ))}

            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <a href="#/api" className="flex items-center gap-2 px-3 py-2 text-[#6B7280] hover:text-white transition-colors no-underline text-xs">
                <ExternalLink size={12} /> API Reference
              </a>
              <a href="#/status" className="flex items-center gap-2 px-3 py-2 text-[#6B7280] hover:text-white transition-colors no-underline text-xs">
                <ExternalLink size={12} /> System Status
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
                <section.icon size={18} className="text-[#7096D1]" />
                <h2 className="text-base font-bold text-white">{section.title}</h2>
              </div>
              <div>{renderContent(section.content)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
