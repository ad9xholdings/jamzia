/* ═══════════════════════════════════════════════════════════
   JamPros™ — Professional Services Network
   JamDoctor™ • JamLawyer™ • JamCPA™ • JamBankers™ • JamBrokers™
   "Expertise at Your Fingertips — Powered by Ad9x Holdings, LLC"
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Stethoscope, Scale, Calculator, Landmark, TrendingUp,
  Shield, Star, Swords, Calendar, Video,
  HeartPulse, FileText, Receipt, Percent, Globe,
  MessageCircle, Zap,
} from 'lucide-react';

/* ── 5 Professional Categories ── */
const PROS = [
  {
    id: 'doctor',
    name: 'JamDoctor™',
    title: 'Medical & Healthcare',
    icon: Stethoscope,
    color: '#ef4444',
    desc: 'Connect with licensed physicians, specialists, and healthcare providers. Virtual consultations, second opinions, and wellness coaching.',
    stats: { pros: 124, consultations: '8,932', rating: '4.9' },
    services: [
      { name: 'Primary Care Consultation', price: '$85', mode: 'Video', icon: Video },
      { name: 'Specialist Second Opinion', price: '$150', mode: 'Video + Records', icon: FileText },
      { name: 'Mental Health Therapy', price: '$95', mode: 'Video', icon: HeartPulse },
      { name: 'Nutrition & Wellness', price: '$65', mode: 'Chat', icon: MessageCircle },
    ],
    professionals: [
      { name: 'Dr. Sarah Chen, MD', specialty: 'Internal Medicine', rating: 4.9, reviews: 234, available: 'Today', image: '👩‍⚕️' },
      { name: 'Dr. Marcus Webb, MD', specialty: 'Cardiology', rating: 4.8, reviews: 189, available: 'Tomorrow', image: '👨‍⚕️' },
      { name: 'Dr. Aria Kim, PsyD', specialty: 'Clinical Psychology', rating: 5.0, reviews: 312, available: 'Today', image: '👩‍⚕️' },
    ],
    cbrCreature: 'Drakon',
    cbrReward: 25,
    topics: ['Cardiovascular', 'Nervous System', 'Nutrition', 'Immunology', 'Genetics', 'Sleep Science'],
  },
  {
    id: 'lawyer',
    name: 'JamLawyer™',
    title: 'Legal Services',
    icon: Scale,
    color: '#3b82f6',
    desc: 'Licensed attorneys for contracts, disputes, business formation, IP, and compliance. Secure client-attorney privileged consultations.',
    stats: { pros: 87, consultations: '5,421', rating: '4.8' },
    services: [
      { name: 'Contract Review', price: '$200', mode: 'Document + Video', icon: FileText },
      { name: 'Business Formation', price: '$350', mode: 'Full Service', icon: Shield },
      { name: 'IP & Trademark', price: '$275', mode: 'Research + Filing', icon: Zap },
      { name: 'Legal Consultation', price: '$150/hr', mode: 'Video', icon: Video },
    ],
    professionals: [
      { name: 'Elena Rodriguez, Esq.', specialty: 'Corporate Law', rating: 4.9, reviews: 156, available: 'Today', image: '👩‍💼' },
      { name: 'James Okonkwo, Esq.', specialty: 'Intellectual Property', rating: 4.8, reviews: 198, available: 'Tomorrow', image: '👨‍💼' },
      { name: 'Priya Sharma, Esq.', specialty: 'Employment Law', rating: 4.9, reviews: 267, available: 'Today', image: '👩‍💼' },
    ],
    cbrCreature: 'Athena',
    cbrReward: 20,
    topics: ['Contracts', 'Business Formation', 'IP/Trademark', 'Employment Law', 'Privacy/GDPR', 'Real Estate'],
  },
  {
    id: 'cpa',
    name: 'JamCPA™',
    title: 'Accounting & Tax',
    icon: Calculator,
    color: '#22c55e',
    desc: 'Certified Public Accountants for tax preparation, bookkeeping, financial planning, and business advisory. IRS-compliant e-filing.',
    stats: { pros: 63, consultations: '4,187', rating: '4.9' },
    services: [
      { name: 'Personal Tax Prep', price: '$175', mode: 'Document Upload', icon: Receipt },
      { name: 'Business Tax Filing', price: '$450', mode: 'Full Service', icon: FileText },
      { name: 'Bookkeeping Setup', price: '$120/mo', mode: 'Monthly', icon: Calculator },
      { name: 'Financial Planning', price: '$200', mode: 'Video Consult', icon: TrendingUp },
    ],
    professionals: [
      { name: 'Robert Chen, CPA', specialty: 'Small Business Tax', rating: 4.9, reviews: 312, available: 'Today', image: '👨‍💼' },
      { name: 'Lisa Park, CPA, CFP', specialty: 'Personal Finance', rating: 5.0, reviews: 278, available: 'Tomorrow', image: '👩‍💼' },
      { name: 'David Brown, CPA', specialty: 'Audit & Compliance', rating: 4.8, reviews: 145, available: 'Today', image: '👨‍💼' },
    ],
    cbrCreature: 'Aurelius',
    cbrReward: 30,
    topics: ['Tax Preparation', 'Bookkeeping', 'Financial Statements', 'Audit', 'Budget Planning', 'Depreciation'],
  },
  {
    id: 'bankers',
    name: 'JamBankers™',
    title: 'Banking & Finance',
    icon: Landmark,
    color: '#f59e0b',
    desc: 'Financial advisors, loan officers, and wealth managers. Business lending, personal loans, investment guidance, and retirement planning.',
    stats: { pros: 45, consultations: '3,654', rating: '4.7' },
    services: [
      { name: 'Business Loan Advisory', price: '$125', mode: 'Video', icon: Video },
      { name: 'Wealth Management', price: '$250', mode: 'Portfolio Review', icon: TrendingUp },
      { name: 'Retirement Planning', price: '$175', mode: 'Video', icon: Calendar },
      { name: 'Credit Optimization', price: '$95', mode: 'Analysis + Plan', icon: Percent },
    ],
    professionals: [
      { name: 'Michael Torres, CFP', specialty: 'Wealth Management', rating: 4.8, reviews: 198, available: 'Tomorrow', image: '👨‍💼' },
      { name: 'Angela Foster, MBA', specialty: 'Business Lending', rating: 4.7, reviews: 156, available: 'Today', image: '👩‍💼' },
      { name: 'Raj Patel, ChFC', specialty: 'Retirement Planning', rating: 4.9, reviews: 234, available: 'Today', image: '👨‍💼' },
    ],
    cbrCreature: 'Buzz',
    cbrReward: 20,
    topics: ['Business Loans', 'Personal Finance', 'Investment Basics', 'Retirement 401k', 'Credit Scores', 'Mortgage'],
  },
  {
    id: 'brokers',
    name: 'JamBrokers™',
    title: 'Real Estate & Insurance',
    icon: Globe,
    color: '#a855f7',
    desc: 'Licensed real estate agents, insurance brokers, and commercial leasing specialists. Buy, sell, insure, and invest with confidence.',
    stats: { pros: 72, consultations: '6,123', rating: '4.8' },
    services: [
      { name: 'Property Search', price: 'Free', mode: 'Full Service', icon: Globe },
      { name: 'Insurance Quote', price: 'Free', mode: 'Comparison', icon: Shield },
      { name: 'Commercial Leasing', price: '$500', mode: 'Negotiation', icon: FileText },
      { name: 'Investment Property', price: '$350', mode: 'Analysis', icon: TrendingUp },
    ],
    professionals: [
      { name: 'Sofia Martinez, Realtor', specialty: 'Residential Sales', rating: 4.9, reviews: 287, available: 'Today', image: '👩‍💼' },
      { name: 'Kevin Liu, Insurance Broker', specialty: 'Life & Health', rating: 4.8, reviews: 198, available: 'Tomorrow', image: '👨‍💼' },
      { name: 'Nia Johnson, Commercial Agent', specialty: 'Commercial Real Estate', rating: 4.9, reviews: 156, available: 'Today', image: '👩‍💼' },
    ],
    cbrCreature: 'Leo',
    cbrReward: 20,
    topics: ['Home Buying', 'Renting', 'Insurance Types', 'Commercial Leasing', 'Investment REITs', 'Property Law'],
  },
];

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function JamPros() {
  const [activePro, setActivePro] = useState(0);
  const pro = PROS[activePro];

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* ═══ HEADER ═══ */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6] via-[#22c55e] to-[#f59e0b] flex items-center justify-center shrink-0">
              <Shield size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white">JamPros™</h1>
              <p className="text-[11px] text-[#A0AEC0]">Professional Services Network — Doctor • Lawyer • CPA • Bankers • Brokers</p>
              <p className="text-[10px] text-[#f59e0b]">Powered by Ad9x Holdings, LLC • Licensed Professionals • HIPAA & Attorney-Client Privilege</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center">
                <p className="text-sm font-bold text-white">391</p>
                <p className="text-[9px] text-[#6B7280]">Professionals</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#f59e0b]">28K+</p>
                <p className="text-[9px] text-[#6B7280]">Consultations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* ═══ PRO SELECTOR TABS ═══ */}
        <div className="flex items-center gap-1 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-1 overflow-x-auto">
          {PROS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActivePro(i)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                i === activePro
                  ? 'border text-white'
                  : 'text-[#6B7280] hover:text-white border border-transparent'
              }`}
              style={i === activePro ? { backgroundColor: `${p.color}15`, borderColor: `${p.color}30`, color: p.color } : {}}
            >
              <p.icon size={14} style={{ color: i === activePro ? p.color : undefined }} />
              {p.name.replace('Jam', '').replace('™', '')}
            </button>
          ))}
        </div>

        {/* ═══ ACTIVE PRO HERO ═══ */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#1a1040] to-[#0A0F1E] border rounded-2xl" style={{ borderColor: `${pro.color}20` }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${pro.color}08` }} />
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${pro.color}20` }}>
                <pro.icon size={28} style={{ color: pro.color }} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white">{pro.name}</h2>
                <p className="text-xs" style={{ color: pro.color }}>{pro.title}</p>
                <p className="text-[11px] text-[#A0AEC0] leading-relaxed mt-1">{pro.desc}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <div className="text-center px-3 py-2 bg-black/30 rounded-xl">
                  <p className="text-sm font-bold text-white">{pro.stats.pros}</p>
                  <p className="text-[9px] text-[#6B7280]">Pros</p>
                </div>
                <div className="text-center px-3 py-2 bg-black/30 rounded-xl">
                  <p className="text-sm font-bold text-white">{pro.stats.consultations}</p>
                  <p className="text-[9px] text-[#6B7280]">Sessions</p>
                </div>
                <div className="text-center px-3 py-2 bg-black/30 rounded-xl">
                  <p className="text-sm font-bold" style={{ color: pro.color }}>{pro.stats.rating}</p>
                  <p className="text-[9px] text-[#6B7280]">Rating</p>
                </div>
              </div>
            </div>

            {/* CBR Challenge */}
            <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl">
              <Swords size={14} className="text-[#f59e0b]" />
              <div className="flex-1">
                <p className="text-[10px] text-white">CBR Challenge: Defeat <span className="text-[#f59e0b] font-semibold">{pro.cbrCreature}</span> to earn professional certification bricks</p>
              </div>
              <span className="text-[10px] font-bold text-[#f59e0b]">+{pro.cbrReward}</span>
              <a
                href="#/cottonbrickroad"
                className="px-3 py-1.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 text-[#f59e0b] text-[10px] font-bold rounded-lg transition-colors no-underline"
              >
                Battle
              </a>
            </div>
          </div>
        </div>

        {/* ═══ SERVICES ═══ */}
        <div>
          <p className="text-xs font-bold text-white mb-3">Services & Pricing</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pro.services.map((svc) => (
              <div key={svc.name} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <svc.icon size={14} style={{ color: pro.color }} />
                  <span className="text-[10px] text-[#6B7280]">{svc.mode}</span>
                </div>
                <p className="text-sm font-semibold text-white">{svc.name}</p>
                <p className="text-lg font-bold mt-1" style={{ color: pro.color }}>{svc.price}</p>
                <button className="w-full mt-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer" style={{ backgroundColor: `${pro.color}15`, color: pro.color, border: `1px solid ${pro.color}30` }}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ PROFESSIONALS ═══ */}
        <div>
          <p className="text-xs font-bold text-white mb-3">Top {pro.name.replace('Jam', '').replace('™', '')}s</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pro.professionals.map((prof) => (
              <div key={prof.name} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{prof.image}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{prof.name}</p>
                    <p className="text-[10px] text-[#6B7280]">{prof.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Star size={10} style={{ color: pro.color }} />
                    <span className="text-[10px] font-bold text-white">{prof.rating}</span>
                  </div>
                  <span className="text-[10px] text-[#6B7280]">{prof.reviews} reviews</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 ml-auto">{prof.available}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-xs font-bold rounded-lg text-black transition-colors cursor-pointer" style={{ backgroundColor: pro.color }}>
                    Book
                  </button>
                  <button className="flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer" style={{ backgroundColor: `${pro.color}10`, color: pro.color, border: `1px solid ${pro.color}20` }}>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ KNOWLEDGE TOPICS ═══ */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <p className="text-xs font-bold text-white mb-3">Knowledge Topics</p>
          <div className="flex flex-wrap gap-2">
            {pro.topics.map((topic) => (
              <span key={topic} className="text-[10px] bg-white/[0.04] text-[#A0AEC0] px-3 py-1.5 rounded-full border border-white/[0.06]">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ OTHER PROS QUICK LINKS ═══ */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PROS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActivePro(i)}
              className={`p-3 rounded-xl text-center transition-all cursor-pointer border ${
                i === activePro
                  ? 'bg-white/[0.04] border-white/[0.1]'
                  : 'bg-[#0A0F1E] border-white/[0.04] hover:border-white/[0.08]'
              }`}
            >
              <p.icon size={16} style={{ color: p.color }} className="mx-auto mb-1" />
              <p className="text-[10px] font-medium text-white">{p.name.replace('Jam', '').replace('™', '')}</p>
              <p className="text-[9px] text-[#6B7280]">{p.stats.pros} pros</p>
            </button>
          ))}
        </div>

        {/* ═══ FOOTER CTA ═══ */}
        <div className="text-center py-6 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#/cottonbrickroad" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-xl transition-colors no-underline">
              <Swords size={14} /> Cotton Brick Road
            </a>
            <a href="#/academy" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 border border-[#7096D1]/20 text-[#7096D1] text-xs font-bold rounded-xl transition-colors no-underline">
              <Landmark size={14} /> Mrs. Cotton's Academy
            </a>
            <a href="#/therapy" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ec4899]/10 hover:bg-[#ec4899]/20 border border-[#ec4899]/20 text-[#ec4899] text-xs font-bold rounded-xl transition-colors no-underline">
              <HeartPulse size={14} /> JamTherapy
            </a>
          </div>
          <p className="text-[10px] text-[#6B7280]">
            JamPros™ Professional Services Network • Licensed & Verified • HIPAA • Attorney-Client Privilege
          </p>
          <p className="text-[9px] text-[#6B7280]">
            Powered by Ad9x Holdings, LLC • © 2026 JamZia Networks™ — The Everything App • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
