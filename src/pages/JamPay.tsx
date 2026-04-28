import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft, Wallet, Send, ArrowDownRight, ArrowUpRight,
  RefreshCw, Lock, Copy, Radio, Bot, Shield, Database,
  CheckCircle, History, FileText, Menu, X, ChevronRight,
  AlertTriangle, Terminal, Sparkles, Zap, Landmark,
  KeyRound, Globe, ShieldCheck, TrendingUp,
  ChevronDown, Activity, Fingerprint, Layers
} from 'lucide-react';
import { transactionFeed, type Transaction } from '../services/feedService';
import { parseCommand, formatCommandOutput, type ParsedCommand } from '../services/aiCommandParser';
import { auditLedger, type AuditEvent } from '../services/auditLedger';

type Tab = 'wallet' | 'send' | 'swap' | 'history' | 'audit' | 'ai';
type MobileView = 'main' | 'feed';
type EntryStep = 'landing' | 'wallet';

interface WalletState {
  connected: boolean;
  address: string;
  balance: { xrp: string; skyIvy: string; skyLockr: string };
  network: string;
}

interface Signer {
  id: string;
  name: string;
  weight: number;
  status: 'ACTIVE' | 'PENDING' | 'OFFLINE';
  lastAction: string;
}

const SIGNERS: Signer[] = [
  { id: 's1', name: 'AI Risk Engine', weight: 1, status: 'ACTIVE', lastAction: '2 min ago' },
  { id: 's2', name: 'Human Admin', weight: 2, status: 'ACTIVE', lastAction: '5 min ago' },
  { id: 's3', name: 'Hardware Key', weight: 1, status: 'ACTIVE', lastAction: '1 hr ago' },
  { id: 's4', name: 'Cold Storage', weight: 1, status: 'PENDING', lastAction: 'Awaiting' },
];

const INITIAL_WALLET: WalletState = {
  connected: false, address: '',
  balance: { xrp: '0.00', skyIvy: '0.000000000000000', skyLockr: '0.000000000000000' },
  network: 'XRPL Mainnet',
};

const TABS = [
  { id: 'wallet' as Tab, icon: Wallet, label: 'Wallet' },
  { id: 'send' as Tab, icon: Send, label: 'Send' },
  { id: 'swap' as Tab, icon: RefreshCw, label: 'Swap' },
  { id: 'history' as Tab, icon: History, label: 'History' },
  { id: 'audit' as Tab, icon: FileText, label: 'Audit' },
  { id: 'ai' as Tab, icon: Bot, label: 'AI' },
];

const OWN_YOUR_BANK_STEPS = [
  { num: '01', title: 'Create Wallet', desc: 'Instant multi-sig setup', icon: Wallet },
  { num: '02', title: 'Verify Identity', desc: 'Biometric + key attestation', icon: Fingerprint },
  { num: '03', title: 'Receive Funds', desc: 'XRP, SkyIvy, SkyLockr', icon: ArrowDownRight },
  { num: '04', title: 'Route Funds', desc: 'Send, swap, settle', icon: Send },
  { num: '05', title: 'Scale', desc: 'Treasury + enterprise routing', icon: TrendingUp },
];

const TRUST_PILLARS = [
  { icon: ShieldCheck, title: 'Self-Custody', desc: 'You hold the keys. We never store private key material.' },
  { icon: KeyRound, title: 'Multi-Sig Required', desc: '3 of 5 signers must approve every transaction.' },
  { icon: Database, title: 'Immutable Audit', desc: 'Every action logged on an append-only SHA-256 chain.' },
];

const SYSTEM_STATUS = [
  { label: 'XRPL Mainnet', status: 'Operational', color: 'text-emerald-400' },
  { label: 'Settlement Layer', status: 'Active', color: 'text-emerald-400' },
  { label: 'Network TPS', status: '1,502', color: 'text-[#7096D1]' },
  { label: 'Avg Latency', status: '3.2s', color: 'text-[#7096D1]' },
];

export default function JamPay() {
  const [entryStep, setEntryStep] = useState<EntryStep>('landing');
  const [tab, setTab] = useState<Tab>('wallet');
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET);
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [cmdInput, setCmdInput] = useState('');
  const [parsedCmd, setParsedCmd] = useState<ParsedCommand | null>(null);
  const [riskScore, setRiskScore] = useState(0.12);
  const [auditVerified, setAuditVerified] = useState(true);
  const [showConnect, setShowConnect] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [mView, setMView] = useState<MobileView>('main');
  const [mSide, setMSide] = useState(false);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [sendForm, setSendForm] = useState({ to: '', amount: '', currency: 'XRP' as 'XRP' | 'SKYIVY' | 'SKYLOCKR' });
  const [sendStatus, setSendStatus] = useState<'idle' | 'signing' | 'success'>('idle');
  const [copied, setCopied] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transactionFeed.start();
    const unsub = transactionFeed.subscribe((tx) => {
      setTxs((p) => [tx, ...p].slice(0, 50));
      auditLedger.append('TX_CONFIRM', { hash: tx.hash, amount: tx.amount, currency: tx.currency });
      setRiskScore((p) => Math.min(1, Math.max(0, p + (tx.riskScore - 0.5) * 0.05)));
    });
    return () => { unsub(); transactionFeed.stop(); };
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setAuditVerified(auditLedger.verifyChain());
      setAuditEvents(auditLedger.getEvents(20));
    }, 5000);
    setAuditEvents(auditLedger.getEvents(20));
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [txs]);

  const handleConnect = () => {
    setIsSigning(true); setShowConnect(false);
    setTimeout(() => {
      setWallet({ connected: true, address: 'rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj',
        balance: { xrp: '12,450.75', skyIvy: '5000000000.000000000000000', skyLockr: '2500000000.000000000000000' },
        network: 'XRPL Mainnet' });
      setIsSigning(false);
      auditLedger.append('WALLET_CONNECT', { address: 'rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj' });
      setAuditEvents(auditLedger.getEvents(20));
      setEntryStep('wallet');
    }, 2000);
  };

  const handleDisconnect = () => {
    setWallet(INITIAL_WALLET);
    auditLedger.append('WALLET_DISCONNECT', {});
    setAuditEvents(auditLedger.getEvents(20));
  };

  const handleCmd = useCallback(() => {
    if (!cmdInput.trim()) return;
    const p = parseCommand(cmdInput);
    setParsedCmd(p);
    auditLedger.append('AI_APPROVE', { raw: cmdInput, intent: p.intent });
    if (p.confidence > 0.85 && p.intent === 'CONNECT') handleConnect();
    setCmdInput('');
    setAuditEvents(auditLedger.getEvents(20));
  }, [cmdInput]);

  const handleSend = () => {
    if (!sendForm.to || !sendForm.amount) return;
    setSendStatus('signing');
    auditLedger.append('TX_SUBMIT', { to: sendForm.to, amount: sendForm.amount, currency: sendForm.currency });
    setTimeout(() => {
      setSendStatus('success');
      auditLedger.append('TX_CONFIRM', { hash: 'tx_' + Math.random().toString(36).substring(2, 10), amount: sendForm.amount, currency: sendForm.currency });
      setAuditEvents(auditLedger.getEvents(20));
      setTimeout(() => { setSendStatus('idle'); setSendForm({ to: '', amount: '', currency: 'XRP' }); }, 2000);
    }, 2500);
  };

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard?.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const activeTab = TABS.find(t => t.id === tab)!;

  /* ─── ENTRY LANDING ─── */
  if (entryStep === 'landing') {
    return (
      <div className="min-h-[100dvh] bg-[#050810] text-white flex flex-col">
        {/* Status Bar */}
        <div className="h-10 bg-[#0A0F1E] border-b border-white/[0.06] flex items-center px-3 gap-2 text-[10px] shrink-0">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 hidden sm:inline">XRPL</span>
          <span className="ml-auto text-[#7096D1] font-bold">WisdomPay™</span>
        </div>

        <div className="flex-1 overflow-y-auto mobile-scroll">
          {/* ── HERO ── */}
          <div className="bg-gradient-to-b from-[#081F5C]/60 via-[#050810] to-[#050810] px-4 sm:px-6 pt-6 sm:pt-12 pb-6 sm:pb-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg shadow-[#7096D1]/20">
                <Landmark size={28} className="text-[#F7F2EB] sm:w-9 sm:h-9" />
              </div>
              <h1 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                Welcome to WisdomPay™
              </h1>
              <p className="text-sm sm:text-base text-[#7096D1] font-medium mb-2">
                Your Financial Control Layer
              </p>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto mb-6 sm:mb-8">
                Send, store, and settle funds securely within the JamZia ecosystem.
                Multi-sig protected. XRPL-backed. You hold the keys.
              </p>

              {/* CTA Strip */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <button onClick={() => setShowConnect(true)} className="px-6 py-3 bg-gradient-to-r from-[#081F5C] to-[#7096D1] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2">
                  <Wallet size={16} /> Create Wallet
                </button>
                <button onClick={() => { setWallet({ ...INITIAL_WALLET, connected: true, address: 'rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj', balance: { xrp: '12,450.75', skyIvy: '5000000000.000000000000000', skyLockr: '2500000000.000000000000000' } }); setEntryStep('wallet'); setTab('wallet'); }} className="px-6 py-3 bg-white/[0.04] border border-white/[0.08] text-white rounded-xl font-semibold text-sm hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <KeyRound size={16} /> Access Wallet
                </button>
              </div>

              {/* System Status */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-6">
                {SYSTEM_STATUS.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <Activity size={10} className={s.color} />
                    <span className="text-[10px] text-[#6B7280]">{s.label}:</span>
                    <span className={`text-[10px] font-medium ${s.color}`}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 11 LAYERS — Payment Fabric Highlight ── */}
          <div className="px-4 sm:px-6 pb-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <Layers size={14} className="text-[#7096D1]" />
                <span className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold">11-Layer Architecture</span>
                <span className="text-[9px] text-[#6B7280] ml-auto">Layer 6 Active</span>
              </div>
              <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl overflow-hidden">
                {[
                  { n: 11, name: 'AI Orchestration', color: '#C9A03F', active: false },
                  { n: 10, name: 'Platform Shell', color: '#7096D1', active: false },
                  { n: 9, name: 'Smart Contracts', color: '#F59E0B', active: false },
                  { n: 8, name: 'Storage Mesh', color: '#10B981', active: false },
                  { n: 7, name: 'Stream Layer', color: '#A855F7', active: false },
                  { n: 6, name: 'Payment Fabric — WisdomPay™', color: '#06B6D4', active: true },
                  { n: 5, name: 'Moderation Engine', color: '#EF4444', active: false },
                  { n: 4, name: 'Audit Trail', color: '#C9A03F', active: false },
                  { n: 3, name: 'Analytics', color: '#7096D1', active: false },
                  { n: 2, name: 'Infrastructure', color: '#6B7280', active: false },
                  { n: 1, name: 'Identity', color: '#6B7280', active: false },
                ].map((layer) => (
                  <div
                    key={layer.n}
                    className={`flex items-center gap-3 px-3 py-1.5 border-b border-white/[0.03] last:border-0 ${
                      layer.active ? 'bg-[#06B6D4]/10' : ''
                    }`}
                  >
                    <span
                      className="text-[10px] font-bold w-5 text-center"
                      style={{ color: layer.color }}
                    >
                      {layer.n}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span
                      className={`text-[10px] ${
                        layer.active ? 'text-white font-semibold' : 'text-[#6B7280]'
                      }`}
                    >
                      {layer.name}
                    </span>
                    {layer.active && (
                      <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-[#06B6D4]/20 text-[#06B6D4] font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CONTEXT PANEL ── */}
          <div className="px-4 sm:px-6 pb-6">
            <div className="max-w-2xl mx-auto bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-5 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold mb-2">What This Is</p>
                  <ul className="space-y-1.5">
                    {['A payment + wallet + settlement system', 'XRPL-backed for speed & low cost', 'Multi-signature security by default', 'Native token support: XRP, SkyIvy, SkyLockr'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#A0AEC0]">
                        <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold mb-2">What You Can Do</p>
                  <ul className="space-y-1.5">
                    {['Send funds instantly', 'Receive funds via QR or address', 'Swap between currencies', 'Route funds across platforms'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#A0AEC0]">
                        <ChevronRight size={12} className="text-[#7096D1] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── TRUST BLOCK ── */}
            <div className="max-w-2xl mx-auto mb-6">
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold mb-3 text-center">Trust & Compliance</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TRUST_PILLARS.map((pillar) => (
                  <div key={pillar.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 text-center">
                    <div className="w-10 h-10 rounded-lg bg-[#7096D1]/10 flex items-center justify-center mx-auto mb-2">
                      <pillar.icon size={20} className="text-[#7096D1]" />
                    </div>
                    <p className="text-xs font-semibold text-white mb-1">{pillar.title}</p>
                    <p className="text-[10px] text-[#6B7280] leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── WHY THIS EXISTS ── */}
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#081F5C]/30 to-[#0A0F1E] border border-[#7096D1]/15 rounded-xl p-4 sm:p-5 mb-6">
              <p className="text-sm font-semibold text-[#F7F2EB] mb-2">Why WisdomPay Exists</p>
              <p className="text-xs text-[#A0AEC0] leading-relaxed">
                WisdomPay exists to give individuals and organizations direct control over financial movement 
                without fragmentation. No intermediary custody. No hidden fees. No gatekeeping. 
                Just direct, verifiable, immutable value transfer — powered by the XRP Ledger 
                and secured by multi-signature consensus.
              </p>
            </div>

            {/* ── OWN YOUR BANK FLOW ── */}
            <div className="max-w-2xl mx-auto mb-6">
              <p className="text-[10px] text-[#7096D1] uppercase tracking-wider font-semibold mb-3 text-center">Own Your Bank — 5 Steps</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
                {OWN_YOUR_BANK_STEPS.map((step, i) => (
                  <div key={step.num} className="flex items-center gap-3 sm:flex-1 sm:text-center">
                    <div className="flex items-center gap-3 sm:flex-col sm:gap-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center shrink-0 shadow-lg shadow-[#7096D1]/10">
                        <step.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#7096D1] font-bold">{step.num}</p>
                        <p className="text-xs font-semibold text-white">{step.title}</p>
                        <p className="text-[9px] text-[#6B7280] hidden sm:block">{step.desc}</p>
                      </div>
                    </div>
                    {i < OWN_YOUR_BANK_STEPS.length - 1 && (
                      <div className="hidden sm:block w-8 h-px bg-[#7096D1]/30 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── EXPANSION HOOKS ── */}
            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { title: 'Enterprise', desc: 'Treasury management for organizations', icon: Landmark },
                { title: 'Routing', desc: 'Cross-border settlement corridors', icon: Globe },
                { title: 'Compliance', desc: 'KYC/AML integrations available', icon: Shield },
              ].map((hook) => (
                <div key={hook.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                    <hook.icon size={16} className="text-[#7096D1]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{hook.title}</p>
                    <p className="text-[9px] text-[#6B7280]">{hook.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── FOOTER ── */}
            <div className="max-w-2xl mx-auto text-center pb-6">
              <p className="text-[10px] text-[#6B7280]">
                This module powers financial operations across the JamZia ecosystem. 
                Powered by Ad9x. Minted on the XRP Ledger.
              </p>
            </div>
          </div>
        </div>

        {/* Connect Modal */}
        {showConnect && (
          <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" onClick={() => setShowConnect(false)}>
            <div className="bg-[#0A0F1E] border border-white/[0.08] rounded-2xl w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-base font-bold text-white mb-4">Create Wallet</h3>
              <p className="text-xs text-[#6B7280] mb-4">Choose your wallet provider to create a new multi-sig wallet on XRPL Mainnet.</p>
              <div className="space-y-2">
                {[
                  { name: 'Xaman (Toast)', desc: 'Mobile XRPL wallet', icon: '📱' },
                  { name: 'Ledger Nano', desc: 'Hardware wallet', icon: '🔐' },
                  { name: 'Gemini Wallet', desc: 'Browser extension', icon: '💎' },
                ].map((w) => (
                  <button key={w.name} onClick={handleConnect} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-[#7096D1]/30 transition-all cursor-pointer">
                    <span className="text-xl">{w.icon}</span>
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium text-white">{w.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{w.desc}</p>
                    </div>
                    <ChevronRight size={16} className="text-[#6B7280]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Signing Overlay */}
        {isSigning && (
          <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full border-2 border-[#7096D1] border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-sm font-semibold text-white">Creating Wallet...</p>
              <p className="text-[10px] text-[#6B7280] mt-1">Requesting multi-sig approval</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─── WALLET INTERFACE (existing full implementation) ─── */
  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white flex flex-col">
      {/* Status Bar */}
      <div className="h-10 bg-[#0A0F1E] border-b border-white/[0.06] flex items-center px-3 gap-2 text-[10px] shrink-0">
        <button onClick={() => setEntryStep('landing')} className="shrink-0 text-[#6B7280] cursor-pointer"><ArrowLeft size={14} /></button>
        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 hidden sm:inline">XRPL</span>
        <div className="hidden sm:flex items-center gap-1 ml-2">
          <Shield size={10} className={riskScore < 0.3 ? 'text-emerald-400' : 'text-amber-400'} />
          <span className={riskScore < 0.3 ? 'text-emerald-400' : 'text-amber-400'}>{Math.round(riskScore * 100)}%</span>
        </div>
        <button onClick={() => setMView(mView === 'main' ? 'feed' : 'main')} className="sm:hidden ml-auto text-[#6B7280] flex items-center gap-1 cursor-pointer">
          <Radio size={12} className="text-red-400" /> {mView === 'main' ? 'Feed' : 'Back'}
        </button>
        <span className="hidden sm:block ml-auto text-[#7096D1] font-bold">WisdomPay™</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden sm:flex w-52 lg:w-56 bg-[#0A0F1E] border-r border-white/[0.06] flex-col shrink-0">
          <div className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Wallet size={18} className="text-[#F7F2EB]" />
              <span className="font-display font-bold text-sm">WisdomPay™</span>
            </div>
          </div>
          <nav className="flex-1 p-2 space-y-0.5">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${tab === t.id ? 'bg-[#F7F2EB]/10 text-[#F7F2EB]' : 'text-[#6B7280] hover:bg-white/[0.03] hover:text-white'}`}>
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-white/[0.06]">
            <p className="text-[9px] text-[#6B7280] uppercase tracking-wider mb-2">Signers (3/5)</p>
            {SIGNERS.map((s) => (
              <div key={s.id} className="flex items-center gap-2 py-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-[10px] text-[#A0AEC0] flex-1">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile slide-in sidebar */}
        {mSide && (
          <div className="sm:hidden fixed inset-0 z-40 bg-black/80" onClick={() => setMSide(false)}>
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#0A0F1E] p-4" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setMSide(false)} className="mb-4 text-[#6B7280]"><X size={20} /></button>
              {TABS.map((t) => (
                <button key={t.id} onClick={() => { setTab(t.id); setMSide(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium mb-1 cursor-pointer ${tab === t.id ? 'bg-[#F7F2EB]/10 text-[#F7F2EB]' : 'text-[#6B7280]'}`}>
                  <t.icon size={16} /> {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto mobile-scroll ${mView === 'feed' ? 'hidden' : ''} sm:block`}>
          <div className="sm:hidden flex items-center gap-2 p-2 border-b border-white/[0.06]">
            <button onClick={() => setMSide(true)} className="p-1.5 bg-[#0A0F1E] rounded-lg text-[#6B7280] cursor-pointer"><Menu size={16} /></button>
            <span className="text-xs font-bold text-white">{activeTab.label}</span>
            <span className="ml-auto text-[9px] text-[#6B7280]">{wallet.connected ? '● Connected' : '○ Disconnected'}</span>
          </div>

          <div className="p-2 sm:p-4 max-w-lg sm:max-w-none mx-auto">

            {/* ── WALLET TAB ── */}
            {tab === 'wallet' && (
              <div className="space-y-3 sm:space-y-4">
                {!wallet.connected ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center mx-auto mb-4">
                      <Wallet size={32} className="text-[#F7F2EB]" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Connect Your Wallet</h2>
                    <p className="text-xs sm:text-sm text-[#6B7280] max-w-xs mx-auto mb-6">Link your XRPL wallet to access WisdomPay™ multi-sig transactions</p>
                    <button onClick={() => setShowConnect(true)} className="px-6 py-2.5 bg-gradient-to-r from-[#081F5C] to-[#7096D1] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer">
                      Connect Wallet
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="text-[10px] sm:text-xs text-[#A0AEC0] truncate flex-1 font-mono">{wallet.address}</span>
                      <button onClick={copyAddress} className="shrink-0 p-1.5 rounded-lg bg-white/[0.04] text-[#6B7280] hover:text-white cursor-pointer">
                        {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                      <button onClick={handleDisconnect} className="shrink-0 p-1.5 rounded-lg bg-white/[0.04] text-[#6B7280] hover:text-red-400 cursor-pointer">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-gradient-to-br from-[#081F5C]/60 to-[#0A0F1E] border border-[#7096D1]/20 rounded-xl p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap size={14} className="text-[#7096D1]" />
                          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">XRP</span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-white">{wallet.balance.xrp}</p>
                        <p className="text-[10px] text-[#6B7280] mt-1">~$7,470.45 USD</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#081F5C]/40 to-[#0A0F1E] border border-[#7096D1]/15 rounded-xl p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles size={14} className="text-amber-400" />
                          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">SkyIvy</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-white truncate">{wallet.balance.skyIvy}</p>
                        <p className="text-[10px] text-[#6B7280] mt-1">21T Total Supply</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#081F5C]/40 to-[#0A0F1E] border border-[#7096D1]/15 rounded-xl p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={14} className="text-emerald-400" />
                          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">SkyLockr</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-white truncate">{wallet.balance.skyLockr}</p>
                        <p className="text-[10px] text-[#6B7280] mt-1">15 Decimals</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      {[
                        { label: 'Send', icon: Send, action: () => setTab('send') },
                        { label: 'Swap', icon: RefreshCw, action: () => setTab('swap') },
                        { label: 'History', icon: History, action: () => setTab('history') },
                        { label: 'AI', icon: Bot, action: () => setTab('ai') },
                      ].map((a) => (
                        <button key={a.label} onClick={a.action} className="flex flex-col items-center gap-1 py-2 sm:py-3 bg-[#0A0F1E] border border-white/[0.06] rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer">
                          <a.icon size={16} className="text-[#7096D1] sm:w-[18px] sm:h-[18px]" />
                          <span className="text-[9px] sm:text-[10px] text-[#A0AEC0]">{a.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 sm:p-4">
                      <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-3">Multi-Sig Signers (3/5 Required)</p>
                      <div className="space-y-2">
                        {SIGNERS.map((s) => (
                          <div key={s.id} className="flex items-center gap-3 py-1.5">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${s.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            <span className="text-xs text-white flex-1">{s.name}</span>
                            <span className="text-[10px] text-[#6B7280]">{s.lastAction}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#A0AEC0]">w{s.weight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ── SEND TAB ── */}
            {tab === 'send' && (
              <div className="max-w-md mx-auto space-y-3 sm:space-y-4">
                <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-6">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Send size={16} className="text-[#7096D1]" /> Send Payment
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5 block">Recipient Address</label>
                      <input type="text" value={sendForm.to} onChange={(e) => setSendForm(p => ({ ...p, to: e.target.value }))} placeholder="r... (XRPL address)" className="w-full bg-[#050810] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:border-[#7096D1]/50 focus:outline-none" />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5 block">Amount</label>
                        <input type="number" value={sendForm.amount} onChange={(e) => setSendForm(p => ({ ...p, amount: e.target.value }))} placeholder="0.00" className="w-full bg-[#050810] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:border-[#7096D1]/50 focus:outline-none" />
                      </div>
                      <div className="w-28">
                        <label className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5 block">Currency</label>
                        <select value={sendForm.currency} onChange={(e) => setSendForm(p => ({ ...p, currency: e.target.value as 'XRP' | 'SKYIVY' | 'SKYLOCKR' }))} className="w-full bg-[#050810] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs text-white focus:border-[#7096D1]/50 focus:outline-none appearance-none">
                          <option value="XRP">XRP</option>
                          <option value="SKYIVY">SkyIvy</option>
                          <option value="SKYLOCKR">SkyLockr</option>
                        </select>
                      </div>
                    </div>
                    <button onClick={handleSend} disabled={!wallet.connected || !sendForm.to || !sendForm.amount || sendStatus !== 'idle'} className={`w-full py-2.5 rounded-xl font-semibold text-sm cursor-pointer ${wallet.connected && sendForm.to && sendForm.amount && sendStatus === 'idle' ? 'bg-gradient-to-r from-[#081F5C] to-[#7096D1] text-white hover:opacity-90' : 'bg-white/[0.04] text-[#6B7280] cursor-not-allowed'}`}>
                      {!wallet.connected ? 'Connect Wallet to Send' : sendStatus === 'signing' ? 'Signing...' : sendStatus === 'success' ? 'Sent!' : 'Send Payment'}
                    </button>
                  </div>
                </div>
                {sendStatus === 'signing' && (
                  <div className="bg-[#0A0F1E] border border-amber-500/20 rounded-xl p-4">
                    <p className="text-xs text-amber-400 mb-3 flex items-center gap-2"><Lock size={14} /> Multi-Signature Signing in Progress...</p>
                    <div className="space-y-2">
                      {SIGNERS.slice(0, 3).map((s, i) => (
                        <div key={s.id} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle size={10} className="text-emerald-400 animate-pulse" style={{ animationDelay: `${i * 600}ms` }} />
                          </div>
                          <span className="text-xs text-[#A0AEC0]">{s.name}</span>
                          <span className="text-[10px] text-emerald-400 ml-auto">Signed</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {sendStatus === 'success' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle size={20} className="text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">Transaction Submitted</p>
                      <p className="text-[10px] text-[#6B7280]">Confirmed on XRPL Mainnet</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── SWAP TAB ── */}
            {tab === 'swap' && (
              <div className="max-w-md mx-auto space-y-3 sm:space-y-4">
                <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 sm:p-6">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><RefreshCw size={16} className="text-[#7096D1]" /> AMM Swap</h3>
                  <div className="space-y-3">
                    <div className="bg-[#050810] border border-white/[0.08] rounded-xl p-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] text-[#6B7280] uppercase">From</span>
                        <span className="text-[10px] text-[#6B7280]">Balance: {wallet.connected ? wallet.balance.xrp : '0'} XRP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="number" placeholder="0.0" className="flex-1 bg-transparent text-lg font-bold text-white placeholder-[#6B7280] outline-none" />
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] rounded-lg"><Zap size={14} className="text-[#7096D1]" /><span className="text-xs font-medium">XRP</span></button>
                      </div>
                    </div>
                    <div className="flex justify-center"><div className="w-8 h-8 rounded-full bg-[#081F5C]/50 flex items-center justify-center border border-[#7096D1]/20"><ArrowDownRight size={16} className="text-[#7096D1]" /></div></div>
                    <div className="bg-[#050810] border border-white/[0.08] rounded-xl p-3">
                      <div className="flex justify-between mb-2"><span className="text-[10px] text-[#6B7280] uppercase">To</span><span className="text-[10px] text-[#6B7280]">Estimated</span></div>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="0.0" readOnly className="flex-1 bg-transparent text-lg font-bold text-white placeholder-[#6B7280] outline-none" />
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] rounded-lg"><Sparkles size={14} className="text-amber-400" /><span className="text-xs font-medium">SkyIvy</span></button>
                      </div>
                    </div>
                    <button disabled={!wallet.connected} className={`w-full py-2.5 rounded-xl font-semibold text-sm cursor-pointer ${wallet.connected ? 'bg-gradient-to-r from-[#081F5C] to-[#7096D1] text-white hover:opacity-90' : 'bg-white/[0.04] text-[#6B7280] cursor-not-allowed'}`}>{wallet.connected ? 'Swap' : 'Connect Wallet to Swap'}</button>
                  </div>
                </div>
                <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 sm:p-4">
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-2">Pool Info</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs"><span className="text-[#6B7280]">XRP/SkyIvy Rate</span><span className="text-white">1 XRP = 125,000 SKYIVY</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#6B7280]">Liquidity</span><span className="text-white">2.1B XRP</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#6B7280]">Fee</span><span className="text-white">0.15%</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* ── HISTORY TAB ── */}
            {tab === 'history' && (
              <div className="space-y-2">
                {txs.length === 0 ? (
                  <div className="text-center py-12 text-[#6B7280]"><History size={32} className="mx-auto mb-3 opacity-30" /><p className="text-sm">No transactions yet</p><p className="text-[10px] mt-1">Transactions will appear here from the live feed</p></div>
                ) : (
                  txs.map((tx) => (
                    <div key={tx.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${tx.type === 'SEND' ? 'bg-red-500/10' : tx.type === 'RECEIVE' ? 'bg-emerald-500/10' : tx.type === 'SWAP' ? 'bg-[#7096D1]/10' : 'bg-amber-500/10'}`}>
                        {tx.type === 'SEND' ? <ArrowUpRight size={16} className="text-red-400" /> : tx.type === 'RECEIVE' ? <ArrowDownRight size={16} className="text-emerald-400" /> : tx.type === 'SWAP' ? <RefreshCw size={16} className="text-[#7096D1]" /> : <Zap size={16} className="text-amber-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-white">{tx.type}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${tx.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{tx.status}</span>
                        </div>
                        <p className="text-[10px] text-[#6B7280] truncate">{tx.hash.slice(0, 24)}...</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-medium text-white">{tx.amount} {tx.currency}</p>
                        <p className="text-[9px] text-[#6B7280]">{tx.confirmations} confs</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ── AUDIT TAB ── */}
            {tab === 'audit' && (
              <div className="space-y-3 sm:space-y-4">
                <div className={`border rounded-xl p-4 flex items-center gap-3 ${auditVerified ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  {auditVerified ? <CheckCircle size={20} className="text-emerald-400 shrink-0" /> : <AlertTriangle size={20} className="text-red-400 shrink-0" />}
                  <div>
                    <p className={`text-sm font-semibold ${auditVerified ? 'text-emerald-400' : 'text-red-400'}`}>{auditVerified ? 'Chain Verified' : 'Chain Integrity Alert'}</p>
                    <p className="text-[10px] text-[#6B7280]">{auditEvents.length} events logged • SHA-256 hash chain</p>
                  </div>
                </div>
                <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="p-3 border-b border-white/[0.06] flex items-center justify-between">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Audit Log</p>
                    <div className="flex items-center gap-1"><Database size={10} className="text-[#7096D1]" /><span className="text-[10px] text-[#7096D1]">{auditEvents.length}</span></div>
                  </div>
                  <div className="divide-y divide-white/[0.04] max-h-96 overflow-y-auto mobile-scroll">
                    {auditEvents.length === 0 ? <p className="p-4 text-center text-xs text-[#6B7280]">No audit events yet</p> : auditEvents.slice().reverse().map((evt) => (
                      <div key={evt.id} className="p-3 hover:bg-white/[0.02]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded ${evt.type.includes('TX') ? 'bg-[#7096D1]/10 text-[#7096D1]' : evt.type.includes('WALLET') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{evt.type}</span>
                          <span className="text-[9px] text-[#6B7280] ml-auto">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-[10px] text-[#6B7280] truncate font-mono">{evt.hash.slice(0, 32)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── AI TAB ── */}
            {tab === 'ai' && (
              <div className="max-w-md mx-auto space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-br from-[#081F5C]/60 to-[#0A0F1E] border border-[#7096D1]/20 rounded-xl p-4 sm:p-6">
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2"><Bot size={16} className="text-[#7096D1]" /> AI Command Parser</h3>
                  <p className="text-[10px] text-[#6B7280] mb-4">Type natural language commands to execute transactions</p>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input type="text" value={cmdInput} onChange={(e) => setCmdInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCmd()} placeholder="e.g. 'send 100 XRP to rN7...'" className="flex-1 bg-[#050810] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:border-[#7096D1]/50 focus:outline-none" />
                      <button onClick={handleCmd} className="px-4 py-2.5 bg-gradient-to-r from-[#081F5C] to-[#7096D1] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer">Parse</button>
                    </div>
                    {parsedCmd && <div className="bg-[#050810] border border-[#7096D1]/20 rounded-lg p-3"><pre className="text-[10px] text-[#A0AEC0] whitespace-pre-wrap font-mono leading-relaxed">{formatCommandOutput(parsedCmd)}</pre></div>}
                  </div>
                </div>
                <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-3">Example Commands</p>
                  <div className="space-y-1.5">
                    {['send 50 XRP to rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj', 'swap 100 XRP to SkyIvy', 'connect wallet', 'show balance', 'show history'].map((ex) => (
                      <button key={ex} onClick={() => { setCmdInput(ex); }} className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer">
                        <Terminal size={12} className="text-[#7096D1] shrink-0" />
                        <span className="text-xs text-[#A0AEC0] truncate">{ex}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right: Live Transaction Feed */}
        <div className={`w-full sm:w-72 xl:w-80 bg-[#0A0F1E] border-l border-white/[0.06] flex-col shrink-0 sm:flex ${mView === 'feed' ? 'flex' : 'hidden'} ${mView === 'main' ? 'sm:flex hidden' : ''}`}>
          <div className="p-3 border-b border-white/[0.06] flex items-center gap-2">
            <Radio size={14} className="text-red-400 animate-pulse" />
            <span className="text-xs font-semibold text-white">Live Feed</span>
            <span className="text-[9px] text-[#6B7280] ml-auto">{txs.length} txs</span>
          </div>
          <div ref={feedRef} className="flex-1 overflow-y-auto mobile-scroll p-2 space-y-1.5">
            {txs.length === 0 ? <div className="text-center py-8 text-[#6B7280]"><Radio size={24} className="mx-auto mb-2 opacity-30" /><p className="text-xs">Waiting for transactions...</p></div> : txs.map((tx) => (
              <div key={tx.id} className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-[9px] px-1 py-0.5 rounded ${tx.type === 'SEND' ? 'bg-red-500/10 text-red-400' : tx.type === 'RECEIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#7096D1]/10 text-[#7096D1]'}`}>{tx.type}</span>
                  <span className="text-[9px] text-[#6B7280] truncate flex-1">{tx.hash.slice(0, 16)}...</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white font-medium">{tx.amount} {tx.currency}</span>
                  <span className={`text-[9px] ${tx.status === 'CONFIRMED' ? 'text-emerald-400' : 'text-amber-400'}`}>{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/[0.06]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/[0.02] rounded-lg p-2 text-center"><p className="text-[10px] text-[#6B7280]">TPS</p><p className="text-sm font-bold text-white">1,502</p></div>
              <div className="bg-white/[0.02] rounded-lg p-2 text-center"><p className="text-[10px] text-[#6B7280]">Latency</p><p className="text-sm font-bold text-emerald-400">3.2s</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Wallet Modal */}
      {showConnect && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" onClick={() => setShowConnect(false)}>
          <div className="bg-[#0A0F1E] border border-white/[0.08] rounded-2xl w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">Connect Wallet</h3>
              <button onClick={() => setShowConnect(false)} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-[#6B7280] cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-2 mb-5">
              {[
                { name: 'Xaman (Toast)', desc: 'Mobile XRPL wallet', icon: '📱' },
                { name: 'Ledger Nano', desc: 'Hardware wallet', icon: '🔐' },
                { name: 'Gemini Wallet', desc: 'Browser extension', icon: '💎' },
              ].map((w) => (
                <button key={w.name} onClick={handleConnect} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-[#7096D1]/30 transition-all cursor-pointer">
                  <span className="text-xl">{w.icon}</span>
                  <div className="text-left flex-1"><p className="text-sm font-medium text-white">{w.name}</p><p className="text-[10px] text-[#6B7280]">{w.desc}</p></div>
                  <ChevronRight size={16} className="text-[#6B7280]" />
                </button>
              ))}
            </div>
            <p className="text-[10px] text-center text-[#6B7280]">Multi-sig requires 3 of 5 signers for all transactions</p>
          </div>
        </div>
      )}

      {isSigning && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full border-2 border-[#7096D1] border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-white">Authenticating...</p>
            <p className="text-[10px] text-[#6B7280] mt-1">Requesting multi-sig approval</p>
          </div>
        </div>
      )}
    </div>
  );
}
