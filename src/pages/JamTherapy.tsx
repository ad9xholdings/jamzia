/* ═══════════════════════════════════════════════════════════
   JamTherapy™ — Platform 48
   Licensed Mental Health Therapy & Wellness Services
   "Healing through Connection — Powered by Ad9x Holdings, LLC"
   ═══════════════════════════════════════════════════════════
   HIPAA-Compliant Architecture • AI Therapist Matching
   24/7 Crisis Support • Cross-Linked to JamPsych™ P47
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Heart, Shield, Phone, Users, Brain,
  Music, Sparkles, Swords, Castle,
  ArrowRight, Send, Star, AlertTriangle,
  CheckCircle2, Lock, GraduationCap, Radio,
  MessageCircle, Activity, Target, Sun,
  Pill,
} from 'lucide-react';

/* ── 4 Core Therapy Services ── */
const CORE_SERVICES = [
  {
    id: 'individual',
    title: 'Individual Therapy',
    subtitle: 'One-on-one licensed counseling',
    icon: Heart,
    color: '#ec4899',
    desc: 'Private, confidential sessions with licensed therapists matched to your needs via AI. Video, audio, or text — your choice.',
    features: ['AI Therapist Matching', 'Video/Audio/Text Sessions', 'Secure HIPAA-Compliant Rooms', 'Progress Tracking', 'Session Recording (opt-in)'],
    price: 'From $75/session',
    availability: 'Same-day booking',
    cbrCreature: 'Buddy',
  },
  {
    id: 'group',
    title: 'Group Therapy',
    subtitle: 'Healing together in community',
    icon: Users,
    color: '#7096D1',
    desc: 'Facilitated group sessions for shared experiences. Grief support, addiction recovery, trauma survivors, and more.',
    features: ['Facilitated by Licensed Therapists', 'Anonymous Participation Option', 'Themed Support Circles', 'CBR-Integrated Challenges', 'Community Accountability'],
    price: 'From $35/session',
    availability: 'Daily sessions available',
    cbrCreature: 'Sage',
  },
  {
    id: 'crisis',
    title: 'Crisis Support',
    subtitle: '24/7 immediate assistance',
    icon: AlertTriangle,
    color: '#ef4444',
    desc: 'Round-the-clock crisis intervention. Trained crisis counselors, emergency response coordination, and safety planning.',
    features: ['24/7 Hotline & Chat', 'Crisis Counselors On-Call', 'Emergency Coordination', 'Safety Planning Tools', 'Post-Crisis Follow-up'],
    price: 'Free — always',
    availability: '24/7/365',
    cbrCreature: 'Aurelius',
  },
  {
    id: 'wellness',
    title: 'Wellness Programs',
    subtitle: 'Preventative mental health care',
    icon: Sun,
    color: '#22c55e',
    desc: 'Proactive wellness coaching, stress management, mindfulness training, and lifestyle optimization.',
    features: ['Wellness Coaching', 'Stress Assessments', 'Mindfulness Training', 'Sleep Optimization', 'Lifestyle Integration'],
    price: 'From $49/month',
    availability: 'On-demand + scheduled',
    cbrCreature: 'Viridia',
  },
];

/* ── 6 Specialized Tracks ── */
const SPECIALIZED_TRACKS = [
  {
    id: 'trauma-informed',
    title: 'Trauma-Informed Care',
    desc: 'Specialized treatment for PTSD, complex trauma, childhood abuse, and dissociative disorders. EMDR and somatic experiencing available.',
    icon: Shield,
    color: '#3b82f6',
    therapists: 24,
    sessions: 1847,
    price: '$95/session',
    cbrCreature: 'Athena',
  },
  {
    id: 'addiction-recovery',
    title: 'Addiction & Recovery Therapy',
    desc: 'Evidence-based treatment for substance use and behavioral addictions. MAT coordination, relapse prevention, and family therapy.',
    icon: Pill,
    color: '#f59e0b',
    therapists: 18,
    sessions: 2134,
    price: '$85/session',
    cbrCreature: 'Drakon',
  },
  {
    id: 'family-couples',
    title: 'Family & Couples Therapy',
    desc: 'Relationship repair, communication skills, co-parenting support, and family systems therapy. Licensed marriage and family therapists.',
    icon: Users,
    color: '#a855f7',
    therapists: 15,
    sessions: 1567,
    price: '$120/session',
    cbrCreature: 'Leo',
  },
  {
    id: 'adolescent',
    title: 'Adolescent & Young Adult',
    desc: 'Age-appropriate therapy for teens and young adults. School stress, identity, social anxiety, depression, and transition support.',
    icon: Sparkles,
    color: '#06b6d4',
    therapists: 12,
    sessions: 987,
    price: '$80/session',
    cbrCreature: 'Echo',
  },
  {
    id: 'music-art',
    title: 'Music & Expressive Arts Therapy',
    desc: 'Karaoke therapy sessions, art-based expression, movement therapy, and creative processing. Licensed creative arts therapists.',
    icon: Music,
    color: '#f43f5e',
    therapists: 8,
    sessions: 654,
    price: '$70/session',
    cbrCreature: 'Ink',
  },
  {
    id: 'workplace',
    title: 'Workplace Mental Health',
    desc: 'EAP services, burnout prevention, return-to-work planning, executive coaching, and organizational wellness consulting.',
    icon: Target,
    color: '#22c55e',
    therapists: 10,
    sessions: 1123,
    price: 'Corporate pricing',
    cbrCreature: 'Buzz',
  },
];

/* ── Crisis Resources ── */
const CRISIS_RESOURCES = [
  { label: 'Crisis Text Line', value: 'Text HOME to 741741', available: '24/7', icon: MessageCircle },
  { label: '988 Suicide & Crisis Lifeline', value: 'Call or text 988', available: '24/7', icon: Phone },
  { label: 'JamTherapy Crisis Chat', value: 'In-app crisis chat', available: '24/7', icon: Radio },
  { label: 'Emergency Services', value: 'Call 911', available: 'Immediate', icon: AlertTriangle },
];

/* ── Chat Messages ── */
const THERAPY_CHAT = [
  { user: 'healing_heart', msg: 'First session with my matched therapist tomorrow — nervous but hopeful', time: '5m', tag: 'Individual' },
  { user: 'group_strong', msg: 'Grief support group tonight helped me process losing my mom. Thank you JamTherapy', time: '3m', tag: 'Group' },
  { user: 'crisis_survivor', msg: 'Used the crisis chat at 3am last week. They stayed with me until I was safe. Forever grateful', time: '2m', tag: 'Crisis' },
  { user: 'music_heals', msg: 'Karaoke therapy session was transformative. Singing my feelings out loud...', time: '1m', tag: 'Music Therapy' },
  { user: 'parent_warrior', msg: 'My teen is opening up in adolescent therapy for the first time in months', time: '45s', tag: 'Adolescent' },
  { user: 'recovery_road', msg: '90 days clean and the addiction track saved my life', time: '20s', tag: 'Recovery' },
];

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function JamTherapy() {
  const [activeTab, setActiveTab] = useState<'services' | 'tracks' | 'crisis' | 'community'>('services');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [chatMsg, setChatMsg] = useState('');
  const [chat, setChat] = useState(THERAPY_CHAT);

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChat([...chat, { user: 'you', msg: chatMsg.trim(), time: 'now', tag: 'Wellness' }]);
    setChatMsg('');
  };

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* ═══ HEADER ═══ */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec4899] via-[#f59e0b] to-[#22c55e] flex items-center justify-center shrink-0">
              <Heart size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white">JamTherapy™</h1>
              <p className="text-[11px] text-[#A0AEC0]">Licensed Mental Health Therapy & Wellness — Platform 48</p>
              <p className="text-[10px] text-[#f59e0b]">Powered by Ad9x Holdings, LLC • HIPAA-Compliant Architecture</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400">ONLINE</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">87</p>
                <p className="text-[9px] text-[#6B7280]">Therapists</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">

        {/* ═══ HERO BANNER ═══ */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#081F5C]/20 to-[#0A0F1E] border border-[#7096D1]/20 rounded-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ec4899]/5 rounded-full blur-3xl" />
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#081F5C] to-[#f59e0b] flex items-center justify-center shrink-0">
                <Shield size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Professional Therapy Within Reach</h2>
                <p className="text-xs text-[#A0AEC0] leading-relaxed mt-1">
                  Licensed therapists, crisis support, and wellness programs — all integrated with the
                  JamZia ecosystem. From Mrs. Cotton's Academy for learning to Miss Cotton's Academy for
                  healing, your journey is supported at every step. Battle on the Cotton Brick Road,
                  earn certifications, and grow stronger.
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { label: 'Licensed Therapists', value: '87', icon: Heart, color: '#ec4899' },
                { label: 'Sessions This Month', value: '8,312', icon: Activity, color: '#22c55e' },
                { label: 'Crisis Interventions', value: '1,247', icon: AlertTriangle, color: '#f59e0b' },
                { label: 'Recovery Rate', value: '94%', icon: CheckCircle2, color: '#7096D1' },
              ].map((s) => (
                <div key={s.label} className="bg-black/30 border border-white/[0.06] rounded-xl p-3 text-center">
                  <s.icon size={16} style={{ color: s.color }} className="mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[9px] text-[#6B7280]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* HIPAA Badge + CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <Lock size={12} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400">HIPAA Compliant</span>
              </div>
              <a
                href="#/psych"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#ec4899]/10 hover:bg-[#ec4899]/20 border border-[#ec4899]/20 text-[#ec4899] text-xs font-bold rounded-xl transition-colors no-underline"
              >
                <Brain size={14} /> JamPsych™ (P47)
              </a>
              <a
                href="#/cottonbrickroad"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-xl transition-colors no-underline"
              >
                <Swords size={14} /> Cotton Brick Road
              </a>
              <a
                href="#/academy"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 border border-[#7096D1]/20 text-[#7096D1] text-xs font-bold rounded-xl transition-colors no-underline"
              >
                <GraduationCap size={14} /> Mrs. Cotton's Academy
              </a>
            </div>
          </div>
        </div>

        {/* ═══ TAB NAVIGATION ═══ */}
        <div className="flex items-center gap-1 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-1">
          {[
            { id: 'services' as const, label: '4 Core Services', icon: Heart },
            { id: 'tracks' as const, label: '6 Specialties', icon: Star },
            { id: 'crisis' as const, label: 'Crisis Support', icon: AlertTriangle },
            { id: 'community' as const, label: 'Community', icon: Users },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20'
                  : 'text-[#6B7280] hover:text-white border border-transparent'
              }`}
            >
              <t.icon size={13} /> {t.label}
            </button>
          ))}
        </div>

        {/* ═══ SERVICES TAB ═══ */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-white">Core Therapy Services</p>
              <p className="text-[10px] text-[#6B7280]">AI-powered therapist matching</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CORE_SERVICES.map((svc) => {
                const expanded = expandedService === svc.id;
                return (
                  <div
                    key={svc.id}
                    className={`bg-[#0A0F1E] border rounded-xl transition-all ${
                      svc.id === 'crisis' ? 'border-red-500/20 ring-1 ring-red-500/10' : 'border-white/[0.06]'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedService(expanded ? null : svc.id)}
                      className="w-full text-left p-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${svc.color}15` }}>
                          <svc.icon size={20} style={{ color: svc.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-white">{svc.title}</p>
                            {svc.id === 'crisis' && (
                              <span className="text-[8px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded-full font-bold">URGENT</span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#6B7280]">{svc.subtitle}</p>
                        </div>
                        <ArrowRight size={14} className={`text-[#6B7280] shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                      </div>
                      <p className="text-[11px] text-[#A0AEC0] leading-relaxed">{svc.desc}</p>
                      <div className="flex items-center gap-3 mt-2 text-[9px] text-[#6B7280]">
                        <span style={{ color: svc.color }} className="font-semibold">{svc.price}</span>
                        <span>{svc.availability}</span>
                        <span>vs. {svc.cbrCreature}</span>
                      </div>
                    </button>

                    {expanded && (
                      <div className="px-4 pb-4 border-t border-white/[0.04] pt-3 space-y-3">
                        <div>
                          <p className="text-[10px] text-[#6B7280] mb-1.5 uppercase tracking-wider">Features</p>
                          <div className="space-y-1.5">
                            {svc.features.map((f) => (
                              <div key={f} className="flex items-center gap-2 text-[11px] text-[#A0AEC0]">
                                <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-2.5 bg-black/30 rounded-lg">
                          <Swords size={14} className="text-[#f59e0b]" />
                          <div className="flex-1">
                            <p className="text-[10px] text-white font-semibold">CBR Challenge: Defeat {svc.cbrCreature}</p>
                            <p className="text-[9px] text-[#6B7280]">Earn bricks through therapeutic milestones</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <a
                            href="#/cottonbrickroad"
                            className="flex-1 text-center py-2 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-lg transition-colors no-underline"
                          >
                            Battle on CBR
                          </a>
                          <a
                            href="#/psych"
                            className="flex-1 text-center py-2 bg-[#ec4899]/10 hover:bg-[#ec4899]/20 text-[#ec4899] text-xs font-bold rounded-lg transition-colors no-underline"
                          >
                            JamPsych Courses
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ SPECIALIZED TRACKS TAB ═══ */}
        {activeTab === 'tracks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-white">6 Specialized Therapy Tracks</p>
              <p className="text-[10px] text-[#6B7280]">{SPECIALIZED_TRACKS.reduce((a, t) => a + t.therapists, 0)} specialized therapists</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SPECIALIZED_TRACKS.map((track) => (
                <div key={track.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${track.color}15` }}>
                      <track.icon size={20} style={{ color: track.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{track.title}</p>
                      <p className="text-[10px] text-[#6B7280]">{track.therapists} therapists • {track.sessions} sessions</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#A0AEC0] leading-relaxed mb-3">{track.desc}</p>
                  <div className="flex items-center gap-2 p-2 bg-black/30 rounded-lg mb-3">
                    <Swords size={12} className="text-[#f59e0b]" />
                    <span className="text-[10px] text-white">CBR: <span className="text-[#f59e0b]">{track.cbrCreature}</span></span>
                    <span className="text-[10px] text-[#f59e0b] ml-auto">{track.price}</span>
                  </div>
                  <a
                    href="#/cottonbrickroad"
                    className="block text-center py-2 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-lg transition-colors no-underline"
                  >
                    Enter Cotton Brick Road
                  </a>
                </div>
              ))}
            </div>

            {/* AI Matching Banner */}
            <div className="bg-gradient-to-r from-[#081F5C]/30 to-[#ec4899]/10 border border-[#7096D1]/20 rounded-xl p-4 flex items-start gap-3">
              <Brain size={20} className="text-[#7096D1] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">AI Therapist Matching</p>
                <p className="text-[10px] text-[#A0AEC0] leading-relaxed mt-1">
                  Our AI analyzes your needs, preferences, and JamPsych™ course history to match you
                  with the ideal licensed therapist. Integration with the Cotton Brick Road means your
                  therapeutic progress earns you bricks, levels, and certifications from Mrs. Cotton.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ CRISIS SUPPORT TAB ═══ */}
        {activeTab === 'crisis' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <AlertTriangle size={36} className="text-red-400 mx-auto mb-2" />
              <h2 className="text-lg font-bold text-white">24/7 Crisis Support</h2>
              <p className="text-sm text-[#A0AEC0]">You are not alone. Help is always available.</p>
            </div>

            {/* Crisis Resources */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CRISIS_RESOURCES.map((res) => (
                <div key={res.label} className="bg-[#0A0F1E] border border-red-500/10 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <res.icon size={18} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">{res.label}</p>
                    <p className="text-sm font-bold text-red-400">{res.value}</p>
                    <p className="text-[9px] text-[#6B7280]">{res.available}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety Plan */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={16} className="text-[#7096D1]" />
                <h3 className="text-sm font-bold text-white">Personal Safety Plan</h3>
              </div>
              <div className="space-y-2">
                {[
                  'Warning signs that a crisis may be developing',
                  'Internal coping strategies — things I can do alone',
                  'People and social settings that provide distraction',
                  'People I can ask for help',
                  'Professionals and agencies I can contact',
                  'Making the environment safe',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 bg-black/30 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-[#7096D1]/10 text-[#7096D1] text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-[11px] text-[#A0AEC0]">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CBR Connection */}
            <div className="bg-gradient-to-br from-[#f59e0b]/5 to-[#081F5C]/10 border border-[#f59e0b]/20 rounded-xl p-4 flex items-start gap-3">
              <Castle size={18} className="text-[#f59e0b] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">Crisis → Growth → Castle</p>
                <p className="text-[10px] text-[#A0AEC0] leading-relaxed mt-1">
                  Every crisis survived is a battle won on the Cotton Brick Road.
                  Post-crisis follow-up sessions earn bonus bricks and advance you toward
                  the Castle Guardian certification. Your strength is tracked in your
                  <a href="#/profile" className="text-[#7096D1] no-underline"> JamProfile</a>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ COMMUNITY TAB ═══ */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <Users size={36} className="text-[#7096D1] mx-auto mb-2" />
              <h2 className="text-lg font-bold text-white">Therapy Community</h2>
              <p className="text-sm text-[#A0AEC0]">Healing happens in community. Share. Support. Grow.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Community Members', value: '24,891', icon: Users, color: '#7096D1' },
                { label: 'Support Groups', value: '142', icon: Radio, color: '#22c55e' },
                { label: 'Success Stories', value: '5,678', icon: Heart, color: '#ec4899' },
                { label: 'Group Sessions', value: '2,341', icon: Activity, color: '#f59e0b' },
              ].map((s) => (
                <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 text-center">
                  <s.icon size={16} style={{ color: s.color }} className="mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[9px] text-[#6B7280]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Chat */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl">
              <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio size={14} className="text-[#22c55e]" />
                  <span className="text-xs font-bold text-white">Live Community Feed</span>
                </div>
                <span className="text-[9px] text-[#6B7280]">{chat.length} messages</span>
              </div>
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {chat.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ec4899] flex items-center justify-center shrink-0">
                      <span className="text-[8px] text-white font-bold">{c.user[0].toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-[#f59e0b]">{c.user}</span>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/[0.04] text-[#6B7280]">{c.tag}</span>
                        <span className="text-[8px] text-[#6B7280] ml-auto">{c.time}</span>
                      </div>
                      <p className="text-xs text-[#A0AEC0] mt-0.5">{c.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/[0.06] flex gap-2">
                <input
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                  placeholder="Share your journey..."
                  className="flex-1 bg-[#050810] text-white text-xs placeholder-[#6B7280] rounded-lg px-3 py-2 outline-none border border-transparent focus:border-[#f59e0b]/30"
                />
                <button
                  onClick={sendChat}
                  className="p-2 bg-[#f59e0b] rounded-lg cursor-pointer hover:bg-[#f59e0b]/80 transition-colors"
                >
                  <Send size={12} className="text-black" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ FOOTER CTA ═══ */}
        <div className="text-center py-6 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#/psych"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ec4899]/10 hover:bg-[#ec4899]/20 border border-[#ec4899]/20 text-[#ec4899] text-xs font-bold rounded-xl transition-colors no-underline"
            >
              <Brain size={14} /> JamPsych™ (P47)
            </a>
            <a
              href="#/cottonbrickroad"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-xl transition-colors no-underline"
            >
              <Castle size={14} /> Cotton Brick Road
            </a>
            <a
              href="#/academy"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 border border-[#7096D1]/20 text-[#7096D1] text-xs font-bold rounded-xl transition-colors no-underline"
            >
              <GraduationCap size={14} /> Mrs. Cotton's Academy
            </a>
          </div>
          <p className="text-[10px] text-[#6B7280]">
            JamTherapy™ Platform 48 • HIPAA-Compliant • Licensed Therapists • 24/7 Crisis Support
          </p>
          <p className="text-[9px] text-[#6B7280]">
            Powered by Ad9x Holdings, LLC • © 2026 JamZia™ — The Everything App • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
