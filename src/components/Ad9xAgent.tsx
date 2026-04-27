/* ═══════════════════════════════════════════════════════════
   9x Concierge — Ask 9x AI Chat Agent v3
   LLM/ML/AI Core Deliverables at Scale
   Backend Operations: XRPL, Ad9x Mesh Storage, JamStream Engine, Smart Contracts
   ═══════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Zap, Brain, Send, Star, Loader2,
  Clock, Database, Wifi, Activity,
  Code2, Server, Cpu,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import { queryKnowledge, getEngineStats, type DepthTier } from '../services/knowledgeEngine';

/* ── Message types ── */
interface Message {
  role: 'user' | '9x';
  text: string;
  timestamp: Date;
  tier?: string;
  engines?: string[];
  score?: number;
  timeComplexity?: string;
  webFallback?: boolean;
  backendOps?: { op: string; status: string; node: string; latency: string }[];
  reasoningChain?: string[];
  codeBlock?: string;
}

const TIERS: { key: DepthTier; label: string; color: string; desc: string }[] = [
  { key: 'JamLight', label: 'JamLight', color: '#22c55e', desc: 'Quick scan' },
  { key: 'JamHeavy', label: 'JamHeavy', color: '#f59e0b', desc: 'Key details' },
  { key: 'JamDeep', label: 'JamDeep', color: '#ef4444', desc: 'Deep analysis' },
  { key: 'JamMAX', label: 'JamMAX', color: '#a855f7', desc: 'Maximum depth' },
];

const SUGGESTIONS = [
  'How can I help you now?',
];

const engineStats = getEngineStats();

export default function Ad9xAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [tier, setTier] = useState<DepthTier>('JamHeavy');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showEngine, setShowEngine] = useState(false);
  const [showOps, setShowOps] = useState(false);
  const [showChain, setShowChain] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const handleSend = useCallback(async () => {
    const q = input.trim();
    if (!q || isTyping) return;

    const userMsg: Message = { role: 'user', text: q, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowOps(false);
    setShowChain(false);
    setShowCode(false);

    try {
      const result = await queryKnowledge(q, tier);

      const aiMsg: Message = {
        role: '9x',
        text: result.answer,
        timestamp: new Date(),
        tier,
        engines: [result.engine],
        score: result.score,
        timeComplexity: result.timeComplexity,
        webFallback: result.webFallback,
        backendOps: result.backendOps,
        reasoningChain: result.reasoningChain,
        codeBlock: result.codeBlock,
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const fallback: Message = {
        role: '9x',
        text: '9x encountered an issue processing your request. All 10 engines are standing by. Please try again.',
        timestamp: new Date(),
        tier,
      };
      setMessages(prev => [...prev, fallback]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, tier]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  /* ── Welcome text ── */
  const welcomeText = 'Welcome to JamZia™. I am 9x — your universal knowledge concierge powered by SORME™.\n\nI route your questions across structured data, live information, and specialized domain agents spanning all 50+ JamZia platforms and smart contracts, after spinning up a genesis blockchain and connecting to 9 powerful AI nodes in our engine of truth.\n\nChoose your depth tier to control speed, detail, and intelligence level.\n\nIf I don\'t know something yet, I capture, validate, and learn it to serve you better over time.';

  /* ── Typewriter effect for welcome ── */
  const [typedWelcome, setTypedWelcome] = useState('');
  useEffect(() => {
    if (!isOpen) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedWelcome(welcomeText.slice(0, i));
      if (i >= welcomeText.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [isOpen]);

  /* ── UI ── */
  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 300); }}
        className="fixed bottom-16 sm:bottom-20 right-3 sm:right-5 z-[80] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer"
        style={{ background: '#0A0F1E', border: '2px solid #7096D1' }}
        title="Ask 9x"
      >
        <Zap size={20} className="text-[#7096D1] sm:w-[22px] sm:h-[22px]" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4">
      <div className="w-full max-w-[540px] h-[85vh] sm:h-[80vh] bg-[#0A0F1E] rounded-t-2xl sm:rounded-2xl border border-white/[0.08] flex flex-col overflow-hidden shadow-2xl">
        {/* ── Header ── */}
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
            <Brain size={18} className="text-[#7096D1]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-bold text-white">Ask 9x — AI Concierge</h3>
            <p className="text-[9px] text-[#6B7280] flex items-center gap-1">
              <Wifi size={8} className="text-emerald-400" /> 10 AI Engines Active
            </p>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-[#6B7280] hover:text-white transition-colors cursor-pointer">
            <span className="text-sm">×</span>
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Welcome */}
          {messages.length === 0 && (
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#7096D1]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Brain size={14} className="text-[#7096D1]" />
                </div>
                <div className="bg-[#162035] rounded-xl p-3 text-xs text-[#A0AEC0] leading-relaxed border border-white/[0.04]">
                  <p className="whitespace-pre-line">{typedWelcome}</p>
                  {typedWelcome.length >= welcomeText.length && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {SUGGESTIONS.slice(0, 5).map(s => (
                        <button key={s} onClick={() => { setInput(s); setTimeout(() => handleSend(), 50); }}
                          className="px-2 py-1 text-[10px] bg-white/[0.05] hover:bg-[#7096D1]/10 text-[#7096D1] rounded-lg transition-colors cursor-pointer">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Engine stats */}
              <div className="bg-[#0F172A] rounded-xl p-3 border border-white/[0.04]">
                <p className="text-[10px] text-[#6B7280] mb-2 font-semibold">10 AI Engines — 392+ Topics</p>
                <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
                  {engineStats.map(e => (
                    <div key={e.engine} className="text-center">
                      <p className="text-[9px] sm:text-[10px] font-bold" style={{ color: e.color }}>{e.topics}</p>
                      <p className="text-[7px] sm:text-[8px] text-[#6B7280]">{e.engine.replace('Jam', '')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === '9x' && (
                <div className="w-7 h-7 rounded-lg bg-[#7096D1]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Brain size={14} className="text-[#7096D1]" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#7096D1]/20 text-white ml-auto border border-[#7096D1]/10'
                  : 'bg-[#162035] text-[#A0AEC0] border border-white/[0.04]'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Backend Operations */}
                {msg.role === '9x' && msg.backendOps && msg.backendOps.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-white/[0.06]">
                    <button onClick={() => setShowOps(!showOps)}
                      className="flex items-center gap-1.5 text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer mb-1">
                      <Server size={10} /> Backend Ops {showOps ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                    </button>
                    {showOps && (
                      <div className="space-y-1 mt-1">
                        {msg.backendOps.map((op, j) => (
                          <div key={j} className="flex items-center gap-2 text-[9px]">
                            <div className={`w-1.5 h-1.5 rounded-full ${op.status === 'active' ? 'bg-emerald-400' : op.status === 'complete' ? 'bg-[#7096D1]' : 'bg-amber-400'}`} />
                            <span className="text-[#A0AEC0]">{op.op}</span>
                            <span className="text-[#6B7280] ml-auto">{op.latency}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Reasoning Chain */}
                {msg.role === '9x' && msg.reasoningChain && msg.reasoningChain.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-white/[0.06]">
                    <button onClick={() => setShowChain(!showChain)}
                      className="flex items-center gap-1.5 text-[10px] text-[#7096D1] hover:text-[#7096D1]/80 transition-colors cursor-pointer mb-1">
                      <Cpu size={10} /> Reasoning Chain {showChain ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                    </button>
                    {showChain && (
                      <div className="space-y-1 mt-1 pl-2 border-l border-[#7096D1]/20">
                        {msg.reasoningChain.map((step, j) => (
                          <p key={j} className="text-[9px] text-[#6B7280]">• {step}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Code Block */}
                {msg.role === '9x' && msg.codeBlock && (
                  <div className="mt-2 pt-2 border-t border-white/[0.06]">
                    <button onClick={() => setShowCode(!showCode)}
                      className="flex items-center gap-1.5 text-[10px] text-[#f59e0b] hover:text-[#f59e0b]/80 transition-colors cursor-pointer mb-1">
                      <Code2 size={10} /> Code Block {showCode ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                    </button>
                    {showCode && (
                      <pre className="mt-1 p-2 bg-black/40 rounded-lg text-[9px] text-[#A0AEC0] overflow-x-auto font-mono leading-relaxed border border-white/[0.04]">
                        {msg.codeBlock}
                      </pre>
                    )}
                  </div>
                )}

                {/* Metadata */}
                {msg.role === '9x' && (
                  <div className="mt-2 flex items-center gap-2 text-[9px] text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <Clock size={8} /> {msg.timeComplexity || '< 1 sec'}
                    </span>
                    {msg.score !== undefined && (
                      <span className="flex items-center gap-1">
                        <Star size={8} className={msg.score > 70 ? 'text-emerald-400' : msg.score > 40 ? 'text-[#f59e0b]' : 'text-[#6B7280]'} />
                        {msg.score}/98
                      </span>
                    )}
                    {msg.engines && (
                      <span className="flex items-center gap-1">
                        <Database size={8} /> {msg.engines.join(', ')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#7096D1]/10 flex items-center justify-center shrink-0">
                <Brain size={14} className="text-[#7096D1]" />
              </div>
              <div className="bg-[#162035] rounded-xl px-3 py-2 border border-white/[0.04]">
                <div className="flex items-center gap-1">
                  <Loader2 size={12} className="text-[#7096D1] animate-spin" />
                  <span className="text-[10px] text-[#6B7280]">9x querying 10 engines...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <div className="px-4 py-3 border-t border-white/[0.06] shrink-0 space-y-2">
          {/* Tier selector */}
          <div className="flex items-center gap-1.5">
            {TIERS.map(t => (
              <button key={t.key} onClick={() => setTier(t.key)}
                className={`px-2 py-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                  tier === t.key ? 'text-black' : 'text-[#6B7280] hover:text-white bg-white/[0.03]'
                }`}
                style={tier === t.key ? { backgroundColor: t.color } : {}}>
                {t.label}
              </button>
            ))}
            <button onClick={() => setShowEngine(!showEngine)} className="ml-auto text-[9px] text-[#6B7280] hover:text-white flex items-center gap-1 cursor-pointer">
              <Activity size={10} /> {showEngine ? 'Hide' : 'Engines'}
            </button>
          </div>

          {/* Engine activity */}
          {showEngine && (
            <div className="bg-[#0F172A] rounded-lg p-2 border border-white/[0.04]">
              <div className="grid grid-cols-5 gap-1">
                {engineStats.map(e => (
                  <div key={e.engine} className="text-center">
                    <div className="w-5 h-5 rounded-md mx-auto flex items-center justify-center mb-0.5" style={{ backgroundColor: `${e.color}15` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }} />
                    </div>
                    <p className="text-[6px] sm:text-[7px] text-[#6B7280]">{e.engine.replace('Jam', '')}</p>
                    <p className="text-[7px] sm:text-[8px] font-bold" style={{ color: e.color }}>{e.topics}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input field */}
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask 9x anything..."
              className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:border-[#7096D1]/30 focus:outline-none"
            />
            <button onClick={handleSend} disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              style={{ background: input.trim() && !isTyping ? '#7096D1' : '#1e293b' }}>
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
