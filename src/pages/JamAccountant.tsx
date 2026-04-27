import { useState, useRef, useEffect } from 'react';
import { Send, X, Calculator, User, AlertTriangle, Receipt } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: number;
}

const ACCOUNTING_KNOWLEDGE: Record<string, string> = {
  tax: 'Tax concepts include gross income, deductions, credits, and filing status. The U.S. has progressive tax brackets. However, tax law changes frequently and varies by location. This is general educational information only — always consult a licensed CPA or tax professional for filing.',
  deduction: 'Common deduction concepts include standard vs itemized deductions, business expenses, and charitable contributions. Eligibility rules are complex and change with tax legislation. This is educational overview only — a licensed CPA can determine what applies to your situation.',
  bookkeeping: 'Bookkeeping involves recording transactions, reconciling accounts, and producing financial statements. The double-entry system means every debit has a corresponding credit. This is conceptual learning material — consult a professional bookkeeper for actual business records.',
  llc: 'An LLC can choose how it is taxed — as a disregarded entity, partnership, S-Corp, or C-Corp. Each has different implications for self-employment tax and distributions. This is educational information only — consult a CPA and attorney before making any tax classification election.',
  depreciation: 'Depreciation spreads the cost of an asset over its useful life. Common methods include straight-line and declining balance. Section 179 and bonus depreciation allow accelerated first-year deductions. This is conceptual material — consult a CPA for actual asset treatment.',
  default: 'I am JamAccountant™, an educational accounting concepts assistant. I can discuss general bookkeeping, tax concepts, and financial reporting topics. I am NOT a licensed CPA and cannot provide tax, accounting, or financial advice. Always consult a qualified CPA or tax professional for any financial matter.',
};

function generateResponse(input: string): string {
  const q = input.toLowerCase();
  for (const [key, response] of Object.entries(ACCOUNTING_KNOWLEDGE)) {
    if (q.includes(key)) return response;
  }
  if (q.includes('hello') || q.includes('hi ') || q.includes('hey')) {
    return 'Welcome to JamAccountant™ — Educational Accounting Concepts Assistant.\n\n⚠️ I am NOT a licensed CPA. This is for entertainment and educational purposes ONLY. Always consult a qualified CPA or tax professional for any accounting or tax matter.\n\nHow can I help you explore accounting concepts today?';
  }
  if (q.includes('help') || q.includes('what can you do')) {
    return 'I can discuss general accounting concepts like bookkeeping basics, tax deductions, depreciation, business entity taxation, and financial statement components. I cannot prepare tax returns, provide tax planning, or give financial advice. For any real accounting matter, consult a licensed CPA in your jurisdiction.';
  }
  if (q.includes('disclaimer') || q.includes('are you a cpa') || q.includes('license')) {
    return 'I am NOT a licensed CPA. JamAccountant™ is for ENTERTAINMENT AND EDUCATIONAL PURPOSES ONLY. I cannot provide tax advice, accounting services, or financial planning. Always consult a qualified, licensed CPA or tax professional for any financial matter.';
  }
  return ACCOUNTING_KNOWLEDGE.default;
}

export default function JamAccountant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'agent',
      text: 'Welcome to JamAccountant™ — Educational Accounting Concepts Assistant.\n\n⚠️ I am NOT a licensed CPA. This is for entertainment and educational purposes ONLY. Always consult a qualified CPA or tax professional for any accounting or tax matter.\n\nHow can I help you explore accounting concepts today?',
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text: input.trim(), timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(userMsg.text);
      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'agent', text: response, timestamp: Date.now() }]);
      setIsTyping(false);
    }, 700 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const quickReplies = ['Tax basics', 'Deductions', 'Bookkeeping', 'LLC taxes', 'Depreciation'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Disclaimer */}
      <div className="bg-red-950 border-b border-red-800 px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-300">ENTERTAINMENT PURPOSES ONLY — NOT FINANCIAL OR TAX ADVICE</p>
            <p className="text-xs text-red-400 mt-1">
              JamAccountant™ is not a licensed CPA firm. Nothing constitutes accounting, tax, or financial advice. 
              Always consult a licensed CPA or qualified tax professional.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#/cpa" className="flex items-center gap-2 text-[#A0AEC0] hover:text-white no-underline text-sm">
            <X size={18} /> Close Chat
          </a>
          <div className="flex items-center gap-2">
            <Calculator size={20} className="text-emerald-400" />
            <span className="font-display font-bold">JamAccountant™</span>
          </div>
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="max-w-[800px] mx-auto px-4 py-6 h-[calc(100vh-180px)] flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'agent' ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-white/10 border border-white/20'
              }`}>
                {msg.role === 'agent' ? <Calculator size={14} className="text-emerald-400" /> : <User size={14} className="text-[#A0AEC0]" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'agent'
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-[#A0AEC0] rounded-tl-sm'
                  : 'bg-white/5 border border-white/10 text-white rounded-tr-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Calculator size={14} className="text-emerald-400" />
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {messages.length <= 2 && !isTyping && (
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((reply) => (
                <button key={reply} onClick={() => { setInput(reply); setTimeout(handleSend, 50); }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1 cursor-pointer">
                  <Receipt size={12} />{reply}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 bg-[#0A0F1E] border border-white/[0.06] rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3 py-2 focus-within:border-emerald-500/30 transition-colors">
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask about accounting concepts..."
              className="flex-1 bg-transparent text-white text-sm placeholder-[#6B7280] outline-none min-w-0" />
            <button onClick={handleSend} disabled={!input.trim() || isTyping}
              className={`p-1.5 rounded-lg transition-all ${input.trim() && !isTyping ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-white/5 text-[#6B7280] cursor-not-allowed'}`}>
              <Send size={14} />
            </button>
          </div>
          <p className="text-center text-[10px] text-[#6B7280] mt-2">
            ⚠️ This is NOT tax or accounting advice. Consult a licensed CPA for any financial matter.
          </p>
        </div>
      </div>
    </div>
  );
}
