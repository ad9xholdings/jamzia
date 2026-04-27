import { useState } from 'react';
import {
  Scale, Gavel, Shield, AlertTriangle,
  Landmark, ScrollText
} from 'lucide-react';
import { brand } from '../config/brand';

const legalAreas = [
  { icon: '📋', title: 'Contract Templates', desc: 'Rental, employment, freelance, NDA templates for personal review' },
  { icon: '🏠', title: 'Property Law', desc: 'Lease agreements, tenant rights basics, HOA guidelines overview' },
  { icon: '💼', title: 'Business Formation', desc: 'LLC vs Corp vs Sole Proprietorship comparison guides' },
  { icon: '⚖️', title: 'Civil Procedures', desc: 'Court structure, filing basics, timeline expectations' },
  { icon: '🔒', title: 'Privacy & Data', desc: 'GDPR, CCPA, and data protection concept overviews' },
  { icon: '📱', title: 'Digital Rights', desc: 'Copyright basics, DMCA, fair use concepts for creators' },
];

const resources = [
  { name: 'US Courts Glossary', url: 'https://www.uscourts.gov/glossary', desc: 'Federal court terminology and procedures' },
  { name: 'Legal Information Institute', url: 'https://www.law.cornell.edu', desc: 'Cornell Wex legal encyclopedia (public resource)' },
  { name: 'Legal Resource Directory', url: '#', desc: 'General legal information and state laws directory' },
  { name: 'USA.gov Legal', url: 'https://www.usa.gov/legal-issues', desc: 'Federal legal resources and self-help portals' },
];

export default function JamLaw() {
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'glossary'>('overview');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Disclaimer Banner */}
      <div className="bg-red-950 border-b border-red-800 px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-300">ENTERTAINMENT PURPOSES ONLY — NOT LEGAL ADVICE</p>
            <p className="text-xs text-red-400 mt-1">
              JamLaw™ is not a law firm. We are not licensed attorneys. Nothing on this platform constitutes legal advice, attorney-client privilege, or a substitute for professional legal counsel. 
              Always consult a qualified, licensed attorney in your jurisdiction for any legal matter. Using this platform does not create an attorney-client relationship. 
              Information provided is for educational and entertainment purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="fixed top-[88px] left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Scale size={20} className="text-blue-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Law™</span>
          </div>
          <a href="#/lawyer" className="text-xs text-blue-400 hover:text-blue-300 no-underline">JamLawyer →</a>
        </div>
      </div>

      <main className="pt-[152px] pb-12 px-4 max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-400 mb-3">
            <Gavel size={12} />Legal Education Platform
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Legal Concepts & Resources</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            Explore legal topics, terminology, and public resources. For entertainment and educational purposes only.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-6">
          {(['overview', 'resources', 'glossary'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${activeTab === tab ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {legalAreas.map((area) => (
                <div key={area.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-blue-500/20 transition-all">
                  <span className="text-2xl mb-2 block">{area.icon}</span>
                  <h3 className="text-sm font-bold text-white mb-1">{area.title}</h3>
                  <p className="text-xs text-[#A0AEC0]">{area.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 text-center">
              <Shield size={24} className="mx-auto text-blue-400 mb-2" />
              <p className="text-sm text-[#A0AEC0]">
                Need personalized guidance? Visit <a href="#/lawyer" className="text-blue-400 hover:underline no-underline">JamLawyer Chat</a> for an interactive discussion. 
                Remember — this is for educational exploration only and does not replace a licensed attorney.
              </p>
            </div>
          </>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resources.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-blue-500/30 transition-all no-underline group">
                <div className="flex items-center gap-2 mb-2">
                  <Landmark size={16} className="text-blue-400" />
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{r.name}</p>
                </div>
                <p className="text-xs text-[#A0AEC0]">{r.desc}</p>
                <p className="text-[10px] text-[#6B7280] mt-2">External public resource ↗</p>
              </a>
            ))}
          </div>
        )}

        {activeTab === 'glossary' && (
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><ScrollText size={18} className="text-blue-400" />Common Legal Terms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { term: 'Plaintiff', def: 'The party who initiates a lawsuit.' },
                { term: 'Defendant', def: 'The party being sued or accused.' },
                { term: 'Deposition', def: 'Sworn out-of-court testimony for discovery.' },
                { term: 'Discovery', def: 'Pre-trial process where parties exchange evidence.' },
                { term: 'Tort', def: 'A civil wrong causing harm or loss (not criminal).' },
                { term: 'Lien', def: 'A legal claim on property as security for debt.' },
                { term: 'Subpoena', def: 'A court order requiring testimony or documents.' },
                { term: 'Statute of Limitations', def: 'Time limit for filing a legal action.' },
                { term: 'Due Process', def: 'Fair treatment through the normal judicial system.' },
                { term: 'Jurisdiction', def: 'The authority of a court to hear a case.' },
                { term: 'Precedent', def: 'A prior legal case used as a guiding standard.' },
                { term: 'Affidavit', def: 'A written statement confirmed by oath or affirmation.' },
              ].map((g) => (
                <div key={g.term} className="p-3 bg-white/[0.02] rounded-xl">
                  <p className="text-sm font-semibold text-white">{g.term}</p>
                  <p className="text-xs text-[#A0AEC0] mt-0.5">{g.def}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#6B7280] mt-4 text-center">Definitions are simplified for educational purposes. Consult legal texts for authoritative interpretations.</p>
          </div>
        )}
      </main>
    </div>
  );
}
