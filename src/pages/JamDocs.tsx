/* ═══════════════════════════════════════════════════════════
   JamDocs™ — Complete API & Developer Documentation
   For DIY White-Label Replication of JamZia Networks™
   "The Everything App — Build Your Own Everything"
   Powered by Ad9x Holdings, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { BookOpen, Code, Terminal, Globe, Copy, CheckCircle, ChevronRight, ChevronDown, Search, Zap, Shield, Webhook, Layers, Database, Cloud, Lock, FileText, GitBranch, Rocket, Cpu, Flame, MessageCircle, BarChart3,  } from 'lucide-react';;

/* ── Documentation Navigation Structure ── */
const DOC_SECTIONS = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: Rocket,
    color: '#f59e0b',
    pages: [
      { id: 'overview', label: 'Overview', level: 1 },
      { id: 'quickstart', label: 'Quick Start Guide', level: 1 },
      { id: 'authentication', label: 'Authentication', level: 1 },
      { id: 'white-label-setup', label: 'White-Label Setup', level: 1 },
    ],
  },
  {
    id: 'api-reference',
    label: 'API Reference',
    icon: Code,
    color: '#7096D1',
    pages: [
      { id: 'api-overview', label: 'API Overview', level: 1 },
      { id: 'users-api', label: 'Users', level: 1, children: [
        { id: 'list-users', label: 'List Users', level: 2 },
        { id: 'get-user', label: 'Get User', level: 2 },
        { id: 'create-user', label: 'Create User', level: 2 },
        { id: 'update-user', label: 'Update User', level: 2 },
        { id: 'delete-user', label: 'Delete User', level: 2 },
      ]},
      { id: 'platforms-api', label: 'Platforms', level: 1, children: [
        { id: 'list-platforms', label: 'List Platforms', level: 2 },
        { id: 'get-platform', label: 'Get Platform', level: 2 },
        { id: 'deploy-platform', label: 'Deploy Platform', level: 2 },
      ]},
      { id: 'payments-api', label: 'Payments (WisdomPay)', level: 1, children: [
        { id: 'create-wallet', label: 'Create Wallet', level: 2 },
        { id: 'get-balance', label: 'Get Balance', level: 2 },
        { id: 'send-payment', label: 'Send Payment', level: 2 },
        { id: 'webhook-events', label: 'Webhook Events', level: 2 },
      ]},
      { id: 'cbr-api', label: 'Cotton Brick Road', level: 1, children: [
        { id: 'get-creatures', label: 'Get Creatures', level: 2 },
        { id: 'battle', label: 'Battle', level: 2 },
        { id: 'grade-progress', label: 'Grade Progress', level: 2 },
      ]},
      { id: 'academy-api', label: 'Mrs. Cotton Academy', level: 1, children: [
        { id: 'list-courses', label: 'List Courses', level: 2 },
        { id: 'enroll', label: 'Enroll', level: 2 },
        { id: 'get-report-card', label: 'Get Report Card', level: 2 },
      ]},
    ],
  },
  {
    id: 'white-label',
    label: 'White-Label Guide',
    icon: Layers,
    color: '#ec4899',
    pages: [
      { id: 'wl-overview', label: 'White-Label Overview', level: 1 },
      { id: 'brand-configuration', label: 'Brand Configuration', level: 1 },
      { id: 'jamrep-engine', label: 'JamRep™ Engine', level: 1 },
      { id: '11-layer-architecture', label: '11-Layer Architecture', level: 1 },
      { id: 'customization', label: 'Customization Guide', level: 1 },
      { id: 'deployment', label: 'Deployment', level: 1 },
    ],
  },
  {
    id: 'sdks',
    label: 'SDKs & Tools',
    icon: Terminal,
    color: '#22c55e',
    pages: [
      { id: 'javascript-sdk', label: 'JavaScript SDK', level: 1 },
      { id: 'react-sdk', label: 'React SDK', level: 1 },
      { id: 'python-sdk', label: 'Python SDK', level: 1 },
      { id: 'cli-tool', label: 'CLI Tool', level: 1 },
      { id: 'webhooks', label: 'Webhooks', level: 1 },
    ],
  },
  {
    id: 'references',
    label: 'Reference',
    icon: FileText,
    color: '#a855f7',
    pages: [
      { id: 'status-codes', label: 'HTTP Status Codes', level: 1 },
      { id: 'error-handling', label: 'Error Handling', level: 1 },
      { id: 'rate-limits', label: 'Rate Limits', level: 1 },
      { id: 'pagination', label: 'Pagination', level: 1 },
      { id: 'changelog', label: 'Changelog', level: 1 },
    ],
  },
];

/* ── Code Examples ── */
const CODE_EXAMPLES = {
  'authentication': {
    title: 'Authentication',
    description: 'All API requests require a Bearer token in the Authorization header.',
    examples: {
      curl: `curl -X GET "https://api.jamzia.tv/v1/users" \\\
  -H "Authorization: Bearer YOUR_API_KEY" \\\
  -H "Content-Type: application/json"`,
      javascript: `const response = await fetch('https://api.jamzia.tv/v1/users', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();`,
      python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.jamzia.tv/v1/users', headers=headers)
data = response.json()`,
    },
  },
  'list-users': {
    title: 'GET /v1/users',
    description: 'Retrieve a paginated list of all users in your JamZia instance.',
    examples: {
      curl: `curl -X GET "https://api.jamzia.tv/v1/users?page=1&limit=50" \\\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      javascript: `const response = await fetch('https://api.jamzia.tv/v1/users?page=1&limit=50', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});
const { users, pagination } = await response.json();`,
      python: `response = requests.get(
    'https://api.jamzia.tv/v1/users',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    params={'page': 1, 'limit': 50}
)
data = response.json()`,
    },
    response: `{
  "users": [
    {
      "id": "usr_123456",
      "username": "sarah_chen",
      "email": "sarah@example.com",
      "tier": "Prime",
      "status": "active",
      "platforms": ["JamVideo", "JamAudio", "JamShop"],
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 128473,
    "page": 1,
    "limit": 50,
    "has_more": true
  }
}`,
  },
  'create-wallet': {
    title: 'POST /v1/wallets',
    description: 'Create a new WisdomPay wallet on the XRP Ledger for a user.',
    examples: {
      curl: `curl -X POST "https://api.jamzia.tv/v1/wallets" \\\
  -H "Authorization: Bearer YOUR_API_KEY" \\\
  -H "Content-Type: application/json" \\\
  -d '{"user_id": "usr_123456", "label": "Primary Wallet"}'`,
      javascript: `const response = await fetch('https://api.jamzia.tv/v1/wallets', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_id: 'usr_123456',
    label: 'Primary Wallet'
  })
});`,
      python: `response = requests.post(
    'https://api.jamzia.tv/v1/wallets',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'user_id': 'usr_123456',
        'label': 'Primary Wallet'
    }
)`,
    },
    response: `{
  "wallet": {
    "id": "wal_789abc",
    "address": "rN7n7otQDd6FczFNTKdJNqD8NCFm5...",
    "balance": "0.000000",
    "currency": "XRP",
    "label": "Primary Wallet",
    "created_at": "2026-04-26T14:22:00Z"
  }
}`,
  },
  'get-creatures': {
    title: 'GET /v1/cbr/creatures',
    description: 'Retrieve all creatures available on the Cotton Brick Road.',
    examples: {
      curl: `curl -X GET "https://api.jamzia.tv/v1/cbr/creatures" \\\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      javascript: `const response = await fetch('https://api.jamzia.tv/v1/cbr/creatures', {
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});
const { creatures } = await response.json();`,
      python: `response = requests.get(
    'https://api.jamzia.tv/v1/cbr/creatures',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
creatures = response.json()['creatures']`,
    },
    response: `{
  "creatures": [
    {
      "id": "buddy",
      "name": "Buddy",
      "type": "bug",
      "topic": "General Knowledge",
      "difficulty": 1,
      "reward": 15,
      "image_url": "/ar/buddy.png",
      "position": { "x": 33, "depth": -800 }
    },
    {
      "id": "athena",
      "name": "Athena",
      "type": "shield",
      "topic": "Math & Logic",
      "difficulty": 3,
      "reward": 20,
      "image_url": "/ar/athena.png",
      "position": { "x": 50, "depth": -1000 }
    }
  ]
}`,
  },
};

/* ── Language Tabs ── */
const LANGUAGES = ['curl', 'javascript', 'python'] as const;

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function JamDocs() {
  const [activePage, setActivePage] = useState('api-overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['api-reference', 'white-label']));
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<typeof LANGUAGES[number]>('curl');

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Filter pages by search
  const allPages = DOC_SECTIONS.flatMap((s) => s.pages);
  const filtered = searchQuery
    ? allPages.filter((p) => p.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Render content based on active page
  const renderContent = () => {
    const codeExample = CODE_EXAMPLES[activePage as keyof typeof CODE_EXAMPLES];

    // API OVERVIEW
    if (activePage === 'api-overview') {
      return (
        <div className="space-y-6">
          <div className="border-b border-white/[0.06] pb-4">
            <h1 className="text-2xl font-bold text-white mb-2">API Overview</h1>
            <p className="text-sm text-[#A0AEC0]">Build with JamZia™ — RESTful API for the 48+ platform ecosystem</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Base URL', value: 'api.jamzia.tv/v1', icon: Globe, color: '#7096D1' },
              { label: 'Protocol', value: 'HTTPS / TLS 1.3', icon: Lock, color: '#22c55e' },
              { label: 'Format', value: 'JSON / UTF-8', icon: FileText, color: '#f59e0b' },
            ].map((s) => (
              <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
                <s.icon size={16} style={{ color: s.color }} className="mb-2" />
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">{s.label}</p>
                <p className="text-sm font-bold text-white mt-1">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Zap size={14} className="text-[#f59e0b]" /> API Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'User management (CRUD + tier assignments)',
                'Platform deployment (48+ platforms)',
                'WisdomPay™ wallet operations (XRPL)',
                'Cotton Brick Road battles & progress',
                'Mrs. Cotton Academy (courses, grades, report cards)',
                'Miss Cotton Academy (therapy, wellness)',
                'Real-time analytics & metrics',
                'White-label instance management',
                'JamRep™ replication engine',
                'Webhook event streaming',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-[#A0AEC0]">
                  <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // QUICKSTART
    if (activePage === 'quickstart') {
      return (
        <div className="space-y-6">
          <div className="border-b border-white/[0.06] pb-4">
            <h1 className="text-2xl font-bold text-white mb-2">Quick Start Guide</h1>
            <p className="text-sm text-[#A0AEC0]">Get your first API call running in under 5 minutes</p>
          </div>
          {[
            { step: 1, title: 'Get Your API Key', desc: 'Log in to your JamZia account and navigate to Profile → API Keys. Generate a new key with the scopes you need.', action: 'Go to Profile → API Keys' },
            { step: 2, title: 'Make Your First Request', desc: 'Use the base URL https://api.jamzia.tv/v1 with your API key in the Authorization header.', action: 'Copy the cURL example below' },
            { step: 3, title: 'Handle the Response', desc: 'All responses are JSON. Check the status code and parse the response body.', action: 'Read Error Handling docs' },
            { step: 4, title: 'Set Up Webhooks', desc: 'Configure webhooks to receive real-time events for your platform.', action: 'Go to Webhooks guide' },
          ].map((s) => (
            <div key={s.step} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#7096D1]/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#7096D1]">{s.step}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
              </div>
              <p className="text-xs text-[#A0AEC0] mb-3">{s.desc}</p>
              <span className="text-[10px] text-[#7096D1] font-medium">{s.action}</span>
            </div>
          ))}
        </div>
      );
    }

    // WHITE-LABEL OVERVIEW
    if (activePage === 'wl-overview') {
      return (
        <div className="space-y-6">
          <div className="border-b border-white/[0.06] pb-4">
            <h1 className="text-2xl font-bold text-white mb-2">White-Label Overview</h1>
            <p className="text-sm text-[#A0AEC0]">Build your own branded instance of JamZia™</p>
          </div>
          <div className="bg-gradient-to-br from-[#0A0F1E] via-[#1a1040] to-[#0A0F1E] border border-[#ec4899]/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={20} className="text-[#ec4899]" />
              <h2 className="text-lg font-bold text-white">JamRep™ Engine</h2>
            </div>
            <p className="text-xs text-[#A0AEC0] leading-relaxed">
              The JamRep™ (Jam Replication) Engine is the core system that generates a complete white-label instance of JamZia™
              with your branding. It replicates all 48+ platforms, the 11-layer architecture, and the full economy system.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Fearless Revolution Foundation', id: 'WL-001', status: 'DEPLOYING', color: '#ec4899', desc: 'Trauma support non-profit — first public white label' },
              { title: 'Your Organization', id: 'WL-???', status: 'APPLY NOW', color: '#7096D1', desc: 'Apply for a white-label license at legal@ad9x.io' },
            ].map((wl) => (
              <div key={wl.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-white">{wl.title}</p>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${wl.color}15`, color: wl.color }}>{wl.status}</span>
                </div>
                <p className="text-[10px] text-[#6B7280]">{wl.id}</p>
                <p className="text-xs text-[#A0AEC0] mt-2">{wl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 11-LAYER ARCHITECTURE
    if (activePage === '11-layer-architecture') {
      return (
        <div className="space-y-6">
          <div className="border-b border-white/[0.06] pb-4">
            <h1 className="text-2xl font-bold text-white mb-2">11-Layer Architecture</h1>
            <p className="text-sm text-[#A0AEC0]">Every white-label instance inherits the full 11-layer stack</p>
          </div>
          {[
            { layer: 1, name: 'Identity', desc: 'Auth, RBAC, KYC, wallet-based login, session management', icon: Shield, color: '#ec4899' },
            { layer: 2, name: 'Interface', desc: 'Responsive UI/UX, Tailwind CSS, animations, accessibility', icon: Globe, color: '#7096D1' },
            { layer: 3, name: 'Integration', desc: 'APIs, webhooks, third-party connectors, SDKs', icon: Webhook, color: '#22c55e' },
            { layer: 4, name: 'Intelligence', desc: 'ML, NLP, recommendations, Ask 9x AI concierge', icon: Cpu, color: '#f59e0b' },
            { layer: 5, name: 'Inventory', desc: 'Data storage, schema, replication, backup/recovery', icon: Database, color: '#a855f7' },
            { layer: 6, name: 'Interaction', desc: 'Messaging, notifications, social, group chat', icon: MessageCircle, color: '#06b6d4' },
            { layer: 7, name: 'Indexing', desc: 'Search, discovery, ranking, SormeSearch', icon: Search, color: '#3b82f6' },
            { layer: 8, name: 'Incentive', desc: 'Rewards, tokens, bricks, gas, scholarships, GPA', icon: Flame, color: '#f43f5e' },
            { layer: 9, name: 'Integrity', desc: 'Encryption, audit, compliance, Charging Document v2.1', icon: Lock, color: '#22c55e' },
            { layer: 10, name: 'Insight', desc: 'BI dashboards, reporting, Command Center, analytics', icon: BarChart3, color: '#f59e0b' },
            { layer: 11, name: 'Infrastructure', desc: 'Cloud, CDN, scaling, code splitting, 140 chunks', icon: Cloud, color: '#7096D1' },
          ].map((l) => (
            <div key={l.layer} className="flex items-start gap-3 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${l.color}15` }}>
                <l.icon size={16} style={{ color: l.color }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold" style={{ color: l.color }}>L{l.layer}</span>
                  <p className="text-sm font-bold text-white">{l.name}</p>
                </div>
                <p className="text-xs text-[#A0AEC0] mt-1">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Default: Code Example Page
    if (codeExample) {
      return (
        <div className="space-y-6">
          <div className="border-b border-white/[0.06] pb-4">
            <h1 className="text-2xl font-bold text-white mb-2">{codeExample.title}</h1>
            <p className="text-sm text-[#A0AEC0]">{codeExample.description}</p>
          </div>

          {/* Language Tabs */}
          <div className="flex gap-1 bg-[#0A0F1E] border border-white/[0.06] rounded-lg p-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  activeLang === lang
                    ? 'bg-[#7096D1]/10 text-[#7096D1] border border-[#7096D1]/20'
                    : 'text-[#6B7280] border border-transparent'
                }`}
              >
                {lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative bg-[#050810] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
              <span className="text-[10px] text-[#6B7280] font-mono">{activeLang === 'curl' ? 'bash' : activeLang}</span>
              <button
                onClick={() => copyCode(codeExample.examples[activeLang])}
                className="p-1.5 hover:bg-white/[0.04] rounded cursor-pointer"
              >
                {copied ? <CheckCircle size={12} className="text-emerald-400" /> : <Copy size={12} className="text-[#6B7280]" />}
              </button>
            </div>
            <pre className="p-4 text-[11px] text-emerald-400 font-mono overflow-x-auto leading-relaxed">
              {codeExample.examples[activeLang]}
            </pre>
          </div>

          {/* Response */}
          {'response' in codeExample && codeExample.response && (
            <div>
              <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                <FileText size={12} className="text-[#7096D1]" /> Example Response (200 OK)
              </h3>
              <div className="bg-[#050810] border border-white/[0.06] rounded-xl p-4">
                <pre className="text-[11px] text-[#A0AEC0] font-mono overflow-x-auto leading-relaxed">
                  {codeExample.response}
                </pre>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Generic page placeholder
    return (
      <div className="space-y-6">
        <div className="border-b border-white/[0.06] pb-4">
          <h1 className="text-2xl font-bold text-white mb-2">{allPages.find((p) => p.id === activePage)?.label || activePage}</h1>
          <p className="text-sm text-[#A0AEC0]">This documentation page is being prepared. Check back soon.</p>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-8 text-center">
          <BookOpen size={32} className="text-[#7096D1] mx-auto mb-3" />
          <p className="text-sm text-[#A0AEC0]">This section is being documented by the JamZia engineering team.</p>
          <p className="text-xs text-[#6B7280] mt-2">Contact docs@ad9x.io for priority documentation requests.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white flex">
      {/* ═══ SIDEBAR ═══ */}
      <div className="hidden lg:flex w-72 bg-[#0A0F1E] border-r border-white/[0.06] flex-col shrink-0">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.06]">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center">
              <BookOpen size={18} className="text-[#F7F2EB]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">JamDocs™</p>
              <p className="text-[9px] text-[#6B7280] uppercase tracking-wider">Developer Docs</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full bg-[#050810] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#6B7280] focus:border-[#7096D1]/50 focus:outline-none"
            />
          </div>
          {searchQuery && filtered.length > 0 && (
            <div className="mt-2 bg-[#050810] border border-white/[0.06] rounded-lg overflow-hidden">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setActivePage(p.id); setSearchQuery(''); }}
                  className="w-full text-left px-3 py-2 text-xs text-[#A0AEC0] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {DOC_SECTIONS.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-[#A0AEC0] hover:text-white hover:bg-white/[0.03]"
              >
                <section.icon size={14} style={{ color: section.color }} />
                <span className="flex-1 text-left">{section.label}</span>
                {expandedSections.has(section.id) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {expandedSections.has(section.id) && (
                <div className="ml-6 space-y-0.5">
                  {section.pages.map((page) => (
                    <div key={page.id}>
                      <button
                        onClick={() => setActivePage(page.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer ${
                          activePage === page.id
                            ? 'bg-[#7096D1]/10 text-[#7096D1]'
                            : 'text-[#6B7280] hover:text-white hover:bg-white/[0.03]'
                        }`}
                      >
                        {page.label}
                      </button>
                      {page.children && activePage === page.id && (
                        <div className="ml-3 space-y-0.5">
                          {page.children.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => setActivePage(child.id)}
                              className={`w-full text-left px-3 py-1 rounded-lg text-[10px] transition-colors cursor-pointer ${
                                activePage === child.id
                                  ? 'text-[#7096D1]'
                                  : 'text-[#6B7280] hover:text-white'
                              }`}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] space-y-2">
          <a href="#/api" className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-white transition-colors no-underline">
            <Terminal size={14} /> API Explorer
          </a>
          <a href="#/rep" className="flex items-center gap-2 text-xs text-[#f59e0b] hover:text-[#f59e0b] transition-colors no-underline">
            <GitBranch size={14} /> JamRep™ Engine
          </a>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0A0F1E] border-b border-white/[0.06] flex items-center px-4 z-50">
        <a href="#/" className="text-xs text-[#6B7280] mr-3">←</a>
        <BookOpen size={18} className="text-[#7096D1] mr-2" />
        <span className="text-sm font-bold text-white">JamDocs™</span>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex-1 overflow-y-auto lg:pt-0 pt-14">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {renderContent()}

          {/* Content Footer */}
          <div className="mt-12 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-[10px] text-[#6B7280]">
              JamDocs™ v48.0 • JamZia Networks™ Developer Documentation
            </p>
            <p className="text-[9px] text-[#6B7280] mt-1">
              Powered by Ad9x Holdings, LLC • © 2026 • All Rights Reserved
            </p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <a href="#/terms" className="text-[9px] text-[#6B7280] hover:text-[#7096D1] no-underline">Terms</a>
              <a href="#/privacy" className="text-[9px] text-[#6B7280] hover:text-[#7096D1] no-underline">Privacy</a>
              <a href="#/rep" className="text-[9px] text-[#f59e0b] hover:text-[#f59e0b] no-underline">JamRep™</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
