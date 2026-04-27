import { useState, useRef, useEffect } from 'react';
import { Send, X, Scale, User, AlertTriangle, Gavel } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: number;
}

const LEGAL_KNOWLEDGE: Record<string, string> = {
  contract: 'Contracts generally require offer, acceptance, consideration, and mutual intent. However, contract law varies significantly by jurisdiction. This is general educational information only — always have a licensed attorney review any contract before signing.',
  tenant: 'Tenant rights typically include habitable premises, privacy, and proper notice for entry. Landlord-tenant law is highly state-specific. This overview is for educational purposes — consult a local housing attorney for your situation.',
  llc: 'An LLC (Limited Liability Company) provides personal liability protection and pass-through taxation. Formation requirements vary by state. This is conceptual information only — consult a business attorney and CPA before forming any entity.',
  copyright: 'Copyright generally protects original creative works automatically upon creation. Registration with the U.S. Copyright Office provides additional benefits. This is basic educational information — consult an intellectual property attorney for specific matters.',
  privacy: 'Privacy law concepts include notice, choice, access, and security. Regulations like GDPR (EU) and CCPA (California) create specific obligations. This is a general overview — consult a privacy attorney for compliance guidance.',
  default: 'I am JamLawyer™, an educational legal concepts assistant. I can discuss general legal topics, terminology, and point you to public resources. I am NOT a licensed attorney and cannot provide legal advice. Always consult a qualified lawyer for any legal matter.',
};

function generateResponse(input: string): string {
  const q = input.toLowerCase();
  for (const [key, response] of Object.entries(LEGAL_KNOWLEDGE)) {
    if (q.includes(key)) return response;
  }
  if (q.includes('hello') || q.includes('hi ') || q.includes('hey')) {
    return 'Welcome to JamLawyer™ — an educational legal concepts assistant. I can discuss general legal topics, terminology, and public resources. Remember: I am NOT a licensed attorney. Nothing I say constitutes legal advice. How can I help you explore legal concepts today?';
  }
  if (q.includes('help') || q.includes('what can you do')) {
    return 'I can discuss general legal concepts like contracts, tenant rights, business formation, copyright, and privacy law basics. I can also point you to public legal resources. I cannot give legal advice, draft legal documents, or represent you. For any real legal matter, consult a licensed attorney in your jurisdiction.';
  }
  if (q.includes('disclaimer') || q.includes('are you a lawyer') || q.includes('license')) {
    return 'I am NOT a licensed attorney. JamLawyer™ is for ENTERTAINMENT AND EDUCATIONAL PURPOSES ONLY. I cannot provide legal advice, create attorney-client relationships, or represent you in any legal matter. Always consult a qualified, licensed attorney for legal guidance.';
  }
  return LEGAL_KNOWLEDGE.default;
}

export default function JamLawyer() {
      const [isOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'agent',
      text: 'Welcome to JamLawyer™ — Educational Legal Concepts Assistant.\n\n⚠️ I am NOT a licensed attorney. This is for entertainment and educational purposes ONLY. Always consult a qualified lawyer for any legal matter.\n\nHow can I help you explore legal concepts today?',
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
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

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

  const quickReplies = ['Contract basics', 'Tenant rights', 'Form an LLC', 'Copyright info', 'Privacy law'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Disclaimer */}
      <div className="bg-red-950 border-b border-red-800 px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-300">ENTERTAINMENT PURPOSES ONLY — NOT LEGAL ADVICE</p>
            <p className="text-xs text-red-400 mt-1">
              JamLawyer™ is not a law firm. We are not licensed attorneys. Nothing constitutes legal advice, attorney-client privilege, 
              or a substitute for professional legal counsel. Always consult a qualified, licensed attorney.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#/law" className="flex items-center gap-2 text-[#A0AEC0] hover:text-white no-underline text-sm">
            <X size={18} /> Close Chat
          </a>
          <div className="flex items-center gap-2">
            <Scale size={20} className="text-blue-400" />
            <span className="font-display font-bold">JamLawyer™</span>
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
                msg.role === 'agent' ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/10 border border-white/20'
              }`}>
                {msg.role === 'agent' ? <Scale size={14} className="text-blue-400" /> : <User size={14} className="text-[#A0AEC0]" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'agent'
                  ? 'bg-blue-500/10 border border-blue-500/20 text-[#A0AEC0] rounded-tl-sm'
                  : 'bg-white/5 border border-white/10 text-white rounded-tr-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Scale size={14} className="text-blue-400" />
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Quick Replies */}
          {messages.length <= 2 && !isTyping && (
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((reply) => (
                <button key={reply} onClick={() => { setInput(reply); setTimeout(handleSend, 50); }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all flex items-center gap-1 cursor-pointer">
                  <Gavel size={12} />{reply}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="mt-4 bg-[#0A0F1E] border border-white/[0.06] rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3 py-2 focus-within:border-blue-500/30 transition-colors">
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask about legal concepts..."
              className="flex-1 bg-transparent text-white text-sm placeholder-[#6B7280] outline-none min-w-0" />
            <button onClick={handleSend} disabled={!input.trim() || isTyping}
              className={`p-1.5 rounded-lg transition-all ${input.trim() && !isTyping ? 'bg-blue-500 text-black hover:bg-blue-400' : 'bg-white/5 text-[#6B7280] cursor-not-allowed'}`}>
              <Send size={14} />
            </button>
          </div>
          <p className="text-center text-[10px] text-[#6B7280] mt-2">
            ⚠️ This is NOT legal advice. Consult a licensed attorney for any legal matter.
          </p>
        </div>
      </div>
    </div>
  );
}
