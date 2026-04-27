import { useState } from 'react';
import {
  Calculator, Receipt, TrendingUp, AlertTriangle,
  FileSpreadsheet, Landmark, BookOpen, Percent, Wallet
} from 'lucide-react';
import { brand } from '../config/brand';

const accountingTopics = [
  { icon: '📊', title: 'Bookkeeping Basics', desc: 'Debits, credits, ledgers, and chart of accounts overview for personal understanding' },
  { icon: '🧾', title: 'Tax Concepts', desc: 'Filing status, deductions, credits, and estimated payment basics (general info only)' },
  { icon: '📈', title: 'Financial Statements', desc: 'Balance sheet, income statement, cash flow — what they show and how they connect' },
  { icon: '💼', title: 'Business Accounting', desc: 'Sole prop vs partnership vs S-Corp accounting differences at a glance' },
  { icon: '📉', title: 'Cost Accounting', desc: 'Fixed vs variable costs, break-even analysis, and margin concepts' },
  { icon: '🏦', title: 'Audit Basics', desc: 'Internal vs external audit purposes, common procedures, and documentation expectations' },
];

const tools = [
  { name: 'Basic Ledger', desc: 'Simple journal entry practice', icon: FileSpreadsheet },
  { name: 'Ratio Calculator', desc: 'Liquidity, profitability, leverage', icon: Percent },
  { name: 'Depreciation Demo', desc: 'Straight-line vs declining balance', icon: TrendingUp },
  { name: 'Budget Planner', desc: 'Personal and small business', icon: Wallet },
];

const resources = [
  { name: 'IRS.gov', url: 'https://www.irs.gov', desc: 'Official tax forms, publications, and filing guidance' },
  { name: 'AccountingCoach', url: 'https://www.accountingcoach.com', desc: 'Free accounting explanations and quizzes' },
  { name: 'SEC Financial Reporting', url: 'https://www.sec.gov/divisions/corpfin.shtml', desc: 'Public company reporting requirements and guides' },
  { name: 'GAAP Standards', url: 'https://www.fasb.org', desc: 'Financial Accounting Standards Board (public reference)' },
];

export default function JamCPA() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'resources'>('overview');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Disclaimer Banner */}
      <div className="bg-red-950 border-b border-red-800 px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-300">ENTERTAINMENT PURPOSES ONLY — NOT FINANCIAL OR TAX ADVICE</p>
            <p className="text-xs text-red-400 mt-1">
              JamCPA™ is not a licensed CPA firm. We are not certified public accountants. Nothing on this platform constitutes accounting, tax, or financial advice. 
              Do not rely on this information for tax filing, financial reporting, or business decisions. Always consult a licensed CPA or qualified tax professional 
              in your jurisdiction. This platform is for educational and entertainment purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="fixed top-[88px] left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Calculator size={20} className="text-emerald-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}CPA™</span>
          </div>
          <a href="#/accountant" className="text-xs text-emerald-400 hover:text-emerald-300 no-underline">JamAccountant →</a>
        </div>
      </div>

      <main className="pt-[152px] pb-12 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-3">
            <Receipt size={12} />Accounting Education
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Accounting Concepts & Tools</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            Explore bookkeeping, tax concepts, and financial reporting basics. For entertainment and educational purposes only.
          </p>
        </div>

        <div className="flex justify-center gap-1 mb-6">
          {(['overview', 'tools', 'resources'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${activeTab === tab ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {accountingTopics.map((area) => (
              <div key={area.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-emerald-500/20 transition-all">
                <span className="text-2xl mb-2 block">{area.icon}</span>
                <h3 className="text-sm font-bold text-white mb-1">{area.title}</h3>
                <p className="text-xs text-[#A0AEC0]">{area.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map((t) => (
              <div key={t.name} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-emerald-500/20 transition-all cursor-pointer group">
                <t.icon size={28} className="mx-auto mb-3 text-emerald-400 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-[#A0AEC0] mt-1">{t.desc}</p>
                <p className="text-[10px] text-[#6B7280] mt-2">Demo only — not for actual filing</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resources.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-emerald-500/30 transition-all no-underline group">
                <div className="flex items-center gap-2 mb-2">
                  <Landmark size={16} className="text-emerald-400" />
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{r.name}</p>
                </div>
                <p className="text-xs text-[#A0AEC0]">{r.desc}</p>
                <p className="text-[10px] text-[#6B7280] mt-2">External public resource ↗</p>
              </a>
            ))}
          </div>
        )}

        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 text-center mt-8">
          <BookOpen size={24} className="mx-auto text-emerald-400 mb-2" />
          <p className="text-sm text-[#A0AEC0]">
            Want an interactive walkthrough? Visit <a href="#/accountant" className="text-emerald-400 hover:underline no-underline">JamAccountant Chat</a> to explore concepts conversationally. 
            Remember — this is educational exploration only and does not replace a licensed CPA.
          </p>
        </div>
      </main>
    </div>
  );
}
