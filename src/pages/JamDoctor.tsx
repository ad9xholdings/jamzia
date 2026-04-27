import { useState } from 'react';
import {
  Stethoscope, HeartPulse, AlertTriangle,
  Activity, Microscope
} from 'lucide-react';
import { brand } from '../config/brand';

const bodySystems = [
  { icon: '🫀', title: 'Cardiovascular', desc: 'Heart, blood vessels, circulation basics — how the system works' },
  { icon: '🧠', title: 'Nervous System', desc: 'Brain, spinal cord, neurons, and signal transmission overview' },
  { icon: '🫁', title: 'Respiratory', desc: 'Lungs, breathing mechanics, oxygen exchange concepts' },
  { icon: '🦴', title: 'Musculoskeletal', desc: 'Bones, muscles, joints, and movement mechanics' },
  { icon: '🧬', title: 'Genetics', desc: 'DNA, genes, heredity, and genome basics for general knowledge' },
  { icon: '🔬', title: 'Immunology', desc: 'Immune system, antibodies, vaccines, and how defenses work' },
];

const healthTopics = [
  { title: 'Nutrition Basics', desc: 'Macronutrients, micronutrients, hydration, and balanced diet concepts' },
  { title: 'Sleep Science', desc: 'Sleep cycles, circadian rhythm, and rest optimization' },
  { title: 'Stress & Mental Health', desc: 'Cortisol, anxiety basics, mindfulness concepts, and when to seek help' },
  { title: 'First Aid Awareness', desc: 'Common emergency recognition — when to call 911 vs self-care' },
];

const publicResources = [
  { name: 'MedlinePlus', url: 'https://medlineplus.gov', desc: 'NIH consumer health information library' },
  { name: 'CDC Health Topics', url: 'https://www.cdc.gov/health-topics.html', desc: 'Centers for Disease Control public health guides' },
  { name: 'WHO Health Topics', url: 'https://www.who.int/health-topics', desc: 'World Health Organization fact sheets' },
  { name: 'NIH Clinical Trials', url: 'https://clinicaltrials.gov', desc: 'Searchable database of medical research studies' },
];

export default function JamDoctor() {
  const [activeTab, setActiveTab] = useState<'systems' | 'wellness' | 'resources'>('systems');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Disclaimer Banner */}
      <div className="bg-red-950 border-b border-red-800 px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-300">ENTERTAINMENT PURPOSES ONLY — NOT MEDICAL ADVICE</p>
            <p className="text-xs text-red-400 mt-1">
              JamDoctor™ and JamMed™ are not healthcare providers. We are not licensed physicians, nurses, or medical professionals. 
              Nothing on this platform constitutes medical advice, diagnosis, or treatment. Never disregard professional medical advice 
              or delay seeking it because of something you read here. Always consult a qualified, licensed healthcare provider for any 
              health concerns. Call emergency services (911 in the US) for urgent medical situations. This platform is for educational 
              and entertainment purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="fixed top-[88px] left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Stethoscope size={20} className="text-rose-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Doctor™</span>
          </div>
          <a href="#/med" className="text-xs text-rose-400 hover:text-rose-300 no-underline">JamMed →</a>
        </div>
      </div>

      <main className="pt-[152px] pb-12 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-xs font-semibold text-rose-400 mb-3">
            <HeartPulse size={12} />Medical Education
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Health & Anatomy Explorer</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            Learn about body systems, wellness concepts, and public health resources. For entertainment and educational purposes only.
          </p>
        </div>

        <div className="flex justify-center gap-1 mb-6">
          {(['systems', 'wellness', 'resources'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${activeTab === tab ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'systems' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {bodySystems.map((s) => (
              <div key={s.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-rose-500/20 transition-all">
                <span className="text-2xl mb-2 block">{s.icon}</span>
                <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                <p className="text-xs text-[#A0AEC0]">{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wellness' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {healthTopics.map((t) => (
              <div key={t.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-rose-500/20 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={16} className="text-rose-400" />
                  <h3 className="text-sm font-bold text-white">{t.title}</h3>
                </div>
                <p className="text-xs text-[#A0AEC0]">{t.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {publicResources.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 hover:border-rose-500/30 transition-all no-underline group">
                <div className="flex items-center gap-2 mb-2">
                  <Microscope size={16} className="text-rose-400" />
                  <p className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">{r.name}</p>
                </div>
                <p className="text-xs text-[#A0AEC0]">{r.desc}</p>
                <p className="text-[10px] text-[#6B7280] mt-2">External public resource ↗</p>
              </a>
            ))}
          </div>
        )}

        <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5 text-center mt-8">
          <AlertTriangle size={24} className="mx-auto text-rose-400 mb-2" />
          <p className="text-sm text-[#A0AEC0]">
            Experiencing symptoms? <strong className="text-white">Contact a licensed healthcare provider immediately.</strong> 
            This platform cannot diagnose, prescribe, or recommend treatment. For medical data search, visit <a href="#/med" className="text-rose-400 hover:underline no-underline">JamMed</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
