/* ═══════════════════════════════════════════════════════════
   The Castle — Creative Submission & Distribution Portal
   Songs · Music Videos · Episodes · Documentaries · Feature Films
   Submit Once · Distribute Everywhere · Earn Worldwide
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Castle, Crown, Upload, Music, Film, Tv, Video, FileText, Globe,
  CheckCircle, AlertTriangle, ChevronRight, Lock, Zap, Star, TrendingUp,
  Wallet, Radio, HardDrive, Share2, DollarSign, Users, Award, ArrowRight
} from 'lucide-react';

/* ── Submission Types ── */
const SUBMISSION_TYPES = [
  { id: 'song', label: 'Song / Single', icon: Music, color: '#C9A03F', maxLength: '10 min', formats: 'WAV, MP3, FLAC, AIFF' },
  { id: 'music-video', label: 'Music Video', icon: Video, color: '#ef4444', maxLength: '15 min', formats: 'MP4, MOV, ProRes' },
  { id: 'episode', label: 'TV Episode', icon: Tv, color: '#a855f7', maxLength: '60 min', formats: 'MP4, MOV, MKV' },
  { id: 'documentary', label: 'Documentary', icon: FileText, color: '#22c55e', maxLength: '120 min', formats: 'MP4, MOV, MKV' },
  { id: 'feature-film', label: 'Feature Film', icon: Film, color: '#7096D1', maxLength: '180 min', formats: 'MP4, MOV, ProRes, DCP' },
  { id: 'podcast', label: 'Podcast Episode', icon: Radio, color: '#f59e0b', maxLength: '120 min', formats: 'MP3, WAV, M4A' },
];

/* ── Distribution Channels ── */
const CHANNELS = [
  { name: 'JamMusic', type: 'Audio', reach: 'Global', payout: '85%' },
  { name: 'JamBoxFlix+', type: 'Video', reach: 'Global', payout: '80%' },
  { name: 'JamReels', type: 'Short', reach: 'Global', payout: '75%' },
  { name: 'JamPPV', type: 'Event', reach: 'Live', payout: '90%' },
  { name: 'JamShorts', type: 'Short', reach: 'Global', payout: '75%' },
  { name: 'JamRadio', type: 'Audio', reach: 'Global', payout: '80%' },
  { name: 'JamLive', type: 'Live', reach: 'Global', payout: '85%' },
  { name: 'JamPod', type: 'Audio', reach: 'Global', payout: '80%' },
];

/* ── Submission Form State ── */
interface SubmissionForm {
  type: string;
  title: string;
  description: string;
  genre: string;
  duration: string;
  explicit: boolean;
  coverArt: File | null;
  mediaFile: File | null;
  distribution: string[];
  monetization: string;
  price: string;
}

export default function TheCastle() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<SubmissionForm>({
    type: '', title: '', description: '', genre: '', duration: '',
    explicit: false, coverArt: null, mediaFile: null,
    distribution: [], monetization: 'free', price: '0',
  });

  const type = SUBMISSION_TYPES.find(t => t.id === selectedType);

  const handleSubmit = () => {
    setSubmitted(true);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-[#1F1F1F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#C9A03F15_0%,_transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 py-8 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl bg-[#C9A03F]/10 border border-[#C9A03F]/20 flex items-center justify-center">
              <Castle size={28} className="text-[#C9A03F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">The Castle™</h1>
              <p className="text-sm text-[#6B7280]">Creative Submission & Worldwide Distribution</p>
            </div>
          </div>
          <p className="text-sm text-[#6B7280] max-w-lg">
            Submit your songs, music videos, episodes, documentaries, and feature films.
            One upload. Every platform. Worldwide reach. You keep the revenue.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className="px-2 py-1 bg-[#C9A03F]/10 text-[#C9A03F] text-[10px] rounded-lg">We Teach Success</span>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded-lg">We Make Courses That Earn</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {[
            { n: 1, label: 'Choose Type' },
            { n: 2, label: 'Fill Details' },
            { n: 3, label: 'Distribute' },
            { n: 4, label: 'Submit' },
          ].map(s => (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= s.n ? 'bg-[#C9A03F] text-black' : 'bg-[#1F1F1F] text-[#6B7280]'
              }`}>
                {step > s.n ? <CheckCircle size={14} /> : s.n}
              </div>
              <span className={`text-xs ${step >= s.n ? 'text-white' : 'text-[#6B7280]'}`}>{s.label}</span>
              {s.n < 4 && <ArrowRight size={12} className="text-[#6B7280]" />}
            </div>
          ))}
        </div>

        {/* STEP 1: Choose Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">What are you submitting?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SUBMISSION_TYPES.map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedType(t.id); setForm(prev => ({ ...prev, type: t.id })); }}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      selectedType === t.id
                        ? 'bg-[#C9A03F]/10 border-[#C9A03F]/40'
                        : 'bg-[#0A0A0A] border-[#1F1F1F] hover:border-[#2A2A2A]'
                    }`}
                  >
                    <Icon size={24} style={{ color: t.color }} className="mb-2" />
                    <p className="text-sm font-bold mb-1">{t.label}</p>
                    <p className="text-[10px] text-[#6B7280]">Max: {t.maxLength}</p>
                    <p className="text-[10px] text-[#6B7280]">{t.formats}</p>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => selectedType && setStep(2)}
              disabled={!selectedType}
              className="w-full py-3 bg-[#C9A03F] hover:bg-[#d4aa4a] disabled:opacity-50 text-black rounded-xl text-sm font-bold transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 2 && type && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Tell us about your {type.label}</h2>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 space-y-4">
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="My Amazing Song"
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C9A03F] placeholder-[#6B7280]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell the world what this is about..."
                  rows={3}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C9A03F] placeholder-[#6B7280] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Genre</label>
                  <select
                    value={form.genre}
                    onChange={e => setForm(prev => ({ ...prev, genre: e.target.value }))}
                    className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#C9A03F]"
                  >
                    <option value="">Select genre...</option>
                    <option>Hip Hop</option><option>R&B</option><option>Pop</option><option>Rock</option>
                    <option>Electronic</option><option>Jazz</option><option>Classical</option><option>Country</option>
                    <option>Latin</option><option>Afrobeat</option><option>Reggae</option><option>Blues</option>
                    <option>Folk</option><option>Metal</option><option>Punk</option><option>Soul</option>
                    <option>Funk</option><option>Disco</option><option>House</option><option>Techno</option>
                    <option>Trap</option><option>Drill</option><option>Grime</option><option>Lo-Fi</option>
                    <option>Ambient</option><option>Soundtrack</option><option>Podcast</option><option>Documentary</option>
                    <option>Film</option><option>Series</option><option>Short Film</option><option>Animation</option>
                    <option>Comedy</option><option>Drama</option><option>Horror</option><option>Sci-Fi</option>
                    <option>Action</option><option>Thriller</option><option>Romance</option><option>Mystery</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="3:45"
                    className="w-full bg-black border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C9A03F] placeholder-[#6B7280]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.explicit}
                  onChange={e => setForm(prev => ({ ...prev, explicit: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#1F1F1F] accent-[#C9A03F]"
                />
                <span className="text-xs text-[#6B7280]">Explicit content (parental advisory)</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Cover Art</label>
                  <div className="border-2 border-dashed border-[#1F1F1F] rounded-xl p-6 text-center hover:border-[#C9A03F]/40 transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto text-[#6B7280] mb-2" />
                    <p className="text-xs text-[#6B7280]">Drop cover art or click</p>
                    <p className="text-[10px] text-[#6B7280]">JPG, PNG, 3000x3000</p>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Media File</label>
                  <div className="border-2 border-dashed border-[#1F1F1F] rounded-xl p-6 text-center hover:border-[#C9A03F]/40 transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto text-[#6B7280] mb-2" />
                    <p className="text-xs text-[#6B7280]">Drop {type.label.toLowerCase()} or click</p>
                    <p className="text-[10px] text-[#6B7280]">{type.formats} · Max {type.maxLength}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-xl text-sm font-bold transition-colors">Back</button>
              <button
                onClick={() => form.title && setStep(3)}
                disabled={!form.title}
                className="flex-1 py-3 bg-[#C9A03F] hover:bg-[#d4aa4a] disabled:opacity-50 text-black rounded-xl text-sm font-bold transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Distribution */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Where do you want to distribute?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CHANNELS.map(ch => (
                <button
                  key={ch.name}
                  onClick={() => setForm(prev => ({
                    ...prev,
                    distribution: prev.distribution.includes(ch.name)
                      ? prev.distribution.filter(x => x !== ch.name)
                      : [...prev.distribution, ch.name]
                  }))}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    form.distribution.includes(ch.name)
                      ? 'bg-[#C9A03F]/10 border-[#C9A03F]/40'
                      : 'bg-[#0A0A0A] border-[#1F1F1F] hover:border-[#2A2A2A]'
                  }`}
                >
                  <p className="text-xs font-bold">{ch.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{ch.type} · {ch.reach}</p>
                  <p className="text-[10px] text-emerald-400">{ch.payout} payout</p>
                </button>
              ))}
            </div>

            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-3">Monetization</h3>
              <div className="flex items-center gap-3 mb-4">
                {['free', 'subscription', 'pay-per-view', 'donation'].map(m => (
                  <button
                    key={m}
                    onClick={() => setForm(prev => ({ ...prev, monetization: m }))}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                      form.monetization === m
                        ? 'bg-[#C9A03F] text-black'
                        : 'bg-[#1F1F1F] text-[#6B7280] hover:text-white'
                    }`}
                  >
                    {m === 'free' ? 'Free' : m === 'subscription' ? 'Subscription' : m === 'pay-per-view' ? 'Pay Per View' : 'Tips Enabled'}
                  </button>
                ))}
              </div>
              {form.monetization !== 'free' && (
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Price</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={form.price}
                      onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
                      className="flex-1 bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F]"
                    />
                    <select className="bg-black border border-[#1F1F1F] rounded-lg px-2 py-2 text-sm outline-none">
                      <option>XRP</option><option>USD</option><option>JamCoin</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 py-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-xl text-sm font-bold transition-colors">Back</button>
              <button
                onClick={handleSubmit}
                disabled={form.distribution.length === 0}
                className="flex-1 py-3 bg-[#C9A03F] hover:bg-[#d4aa4a] disabled:opacity-50 text-black rounded-xl text-sm font-bold transition-colors"
              >
                Submit to The Castle
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirmation */}
        {step === 4 && submitted && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Submitted to The Castle!</h2>
            <p className="text-sm text-[#6B7280] max-w-md mx-auto mb-6">
              Your <strong>{type?.label}</strong> "{form.title}" has been received.
              It will be reviewed and distributed to {form.distribution.length} platforms worldwide.
            </p>

            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 max-w-md mx-auto mb-6 text-left">
              <h3 className="text-sm font-bold mb-3">Distribution Plan</h3>
              {form.distribution.map(d => {
                const ch = CHANNELS.find(c => c.name === d);
                return (
                  <div key={d} className="flex items-center justify-between py-2 border-b border-[#1F1F1F]/50 last:border-0">
                    <span className="text-xs">{d}</span>
                    <span className="text-xs text-emerald-400">{ch?.payout} payout</span>
                  </div>
                );
              })}
              <div className="mt-3 pt-3 border-t border-[#1F1F1F]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Your estimated share</span>
                  <span className="font-bold text-[#C9A03F]">~80%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => { setStep(1); setSubmitted(false); setSelectedType(''); setForm({
                  type: '', title: '', description: '', genre: '', duration: '',
                  explicit: false, coverArt: null, mediaFile: null,
                  distribution: [], monetization: 'free', price: '0',
                }); }}
                className="px-6 py-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-xl text-sm font-bold transition-colors"
              >
                Submit Another Work
              </button>
              <button className="px-6 py-3 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black rounded-xl text-sm font-bold transition-colors">
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
