/* ═══════════════════════════════════════════════════════════
   JamPsych™ — Psychology Mastery & Mental Wellness
   Miss Cotton's Academy — Mastery of Mental Health
   "Awareness → Interest → Action → A Message of Hope for the World"
   Granddaughter of Mrs. Cotton (Margee) — The Winston School Legacy
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Heart, Brain, Music, Mic2, Crown, Flame,
  Shield, Users, BookOpen, Zap,
  ArrowRight, Send, Swords, Castle, Target, Wind,
  Sun, Flower2, Eye, Lightbulb,
  Radio, Volume2, Crosshair, GraduationCap,
  MessageCircle,
} from 'lucide-react';

/* ── 9 Psychology Courses ── */
const COURSES = [
  {
    id: 'music-therapy',
    title: 'Music Therapy & Sound Healing',
    subtitle: 'Frequency-based emotional restoration',
    icon: Music,
    color: '#ec4899',
    lessons: 24,
    students: 4521,
    desc: 'Use rhythm, melody, and frequency to heal emotional wounds. From binaural beats for anxiety to group drum circles for PTSD — sound is medicine.',
    topics: ['Binaural Beats', 'Group Sound Baths', 'Personal Playlists for Mood', 'Karaoke Therapy Sessions'],
    cbrCreature: 'Echo',
    cbrReward: 15,
  },
  {
    id: 'trauma-recovery',
    title: 'Trauma Recovery & Resilience',
    subtitle: 'Rebuilding after childhood and adult trauma',
    icon: Shield,
    color: '#3b82f6',
    lessons: 32,
    students: 8934,
    desc: 'Evidence-based trauma processing for survivors of any age. Learn to identify triggers, build resilience, and reclaim your narrative.',
    topics: ['PTSD Recognition', 'Trigger Management', 'Narrative Therapy', 'Resilience Building'],
    cbrCreature: 'Buddy',
    cbrReward: 20,
  },
  {
    id: 'addiction-rehab',
    title: 'Addiction, Rehabilitation & Recovery',
    subtitle: 'Understanding the brain, rewiring behavior',
    icon: Flame,
    color: '#f59e0b',
    lessons: 28,
    students: 6745,
    desc: 'From substance abuse to behavioral addiction — understand the neuroscience, navigate recovery pathways, and support loved ones.',
    topics: ['Neuroscience of Addiction', '12-Step & Alternatives', 'Relapse Prevention', 'Supporting Family Members'],
    cbrCreature: 'Drakon',
    cbrReward: 25,
  },
  {
    id: 'cbt-mastery',
    title: 'Cognitive Behavioral Therapy Mastery',
    subtitle: 'Restructure thoughts, transform life',
    icon: Brain,
    color: '#a855f7',
    lessons: 30,
    students: 11234,
    desc: 'Master the gold-standard therapy technique. Learn to identify cognitive distortions, challenge negative thoughts, and build healthier patterns.',
    topics: ['Cognitive Distortions', 'Thought Records', 'Behavioral Activation', 'Exposure Therapy'],
    cbrCreature: 'Athena',
    cbrReward: 20,
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness, Meditation & Stress Reduction',
    subtitle: 'Present-moment awareness for daily peace',
    icon: Wind,
    color: '#06b6d4',
    lessons: 20,
    students: 15678,
    desc: 'Guided meditation, breathwork, and mindfulness practices accessible to everyone — from 2-minute office breaks to deep retreat experiences.',
    topics: ['Breathwork Techniques', 'Body Scan Meditation', 'Mindful Walking', 'Stress Response Management'],
    cbrCreature: 'Viridia',
    cbrReward: 15,
  },
  {
    id: 'workplace-psych',
    title: 'Workplace Psychology & Productivity',
    subtitle: 'Return to work, return to life',
    icon: Target,
    color: '#22c55e',
    lessons: 22,
    students: 3890,
    desc: 'Navigate returning to the workplace after mental health challenges. Build confidence, manage workplace triggers, and thrive professionally.',
    topics: ['Returning After Leave', 'Workplace Accommodations', 'Communication with Employers', 'Building Professional Confidence'],
    cbrCreature: 'Leo',
    cbrReward: 20,
  },
  {
    id: 'art-therapy',
    title: 'Art Therapy, Karaoke & Creative Expression',
    subtitle: 'Heal through creation and play',
    icon: Flower2,
    color: '#f43f5e',
    lessons: 18,
    students: 5432,
    desc: 'Express what words cannot. Painting, drawing, karaoke, movement — creative outlets that unlock emotional processing and joy.',
    topics: ['Expressive Arts', 'Karaoke for Confidence', 'Movement Therapy', 'Digital Art for Emotion'],
    cbrCreature: 'Ink',
    cbrReward: 15,
  },
  {
    id: 'community-healing',
    title: 'Social Connection & Community Healing',
    subtitle: 'We heal together',
    icon: Users,
    color: '#7096D1',
    lessons: 16,
    students: 7891,
    desc: 'Human connection is biological medicine. Build healthy relationships, join support circles, and learn the psychology of belonging.',
    topics: ['Support Group Dynamics', 'Healthy Boundaries', 'Empathy Training', 'Community Building'],
    cbrCreature: 'Sage',
    cbrReward: 15,
  },
  {
    id: 'hope-circle',
    title: "Miss Cotton's Hope Circle",
    subtitle: 'The Capstone — A Message of Hope for the World',
    icon: Sun,
    color: '#f59e0b',
    lessons: 12,
    students: 9876,
    desc: 'The culmination of your journey. Learn to carry hope forward — for yourself, your family, your community, and the world. Pay it forward.',
    topics: ['Awareness → Interest → Action', 'Becoming a Peer Mentor', 'Advocacy & Stigma Breaking', 'Your Personal Mission'],
    cbrCreature: 'Aurelius',
    cbrReward: 30,
  },
];

/* ── Karaoke Therapy Playlist ── */
const KARAOKE_TRACKS = [
  { title: 'Rise Up', artist: 'Andra Day', therapy: 'Empowerment after trauma', emoji: '💪' },
  { title: 'Fight Song', artist: 'Rachel Platten', therapy: 'Reclaiming your voice', emoji: '🎤' },
  { title: 'Brave', artist: 'Sara Bareilles', therapy: 'Speaking your truth', emoji: '🦁' },
  { title: 'Here Comes the Sun', artist: 'The Beatles', therapy: 'Hope in darkness', emoji: '☀️' },
  { title: 'Survivor', artist: 'Destiny\'s Child', therapy: 'Resilience anthem', emoji: '🔥' },
  { title: 'Three Little Birds', artist: 'Bob Marley', therapy: 'Anxiety relief', emoji: '🐦' },
];

/* ── Chat Messages (simulated group therapy) ── */
const HOPE_MESSAGES = [
  { user: 'survivor2024', msg: 'Just finished Trauma Recovery module 3 — finally understand my triggers', time: '3m', tag: 'Awareness' },
  { user: 'musicheals', msg: 'Music Therapy changed my mornings. Binaural beats are magic', time: '2m', tag: 'Action' },
  { user: 'hopeful_parent', msg: "My daughter is doing the Hope Circle with me. We're healing together", time: '1m', tag: 'Interest' },
  { user: 'recovery_road', msg: '90 days clean and the Addiction course helped me understand why', time: '45s', tag: 'Action' },
  { user: 'miss_cotton_fan', msg: 'A Message of Hope for the World — this is what we need', time: '20s', tag: 'Awareness' },
  { user: 'back_to_work', msg: 'Workplace Psych module gave me the courage to return after 6 months', time: '5s', tag: 'Action' },
];

/* ── Framework Steps ── */
const FRAMEWORK = [
  { step: 'Awareness', desc: 'Recognize what you are experiencing. Name it. See it. That is the first act of courage.', icon: Eye, color: '#3b82f6' },
  { step: 'Interest', desc: 'Explore the possibilities. Learn about your mind, your patterns, your potential for change.', icon: Lightbulb, color: '#a855f7' },
  { step: 'Action', desc: 'Take the first small step. Every course completed, every battle won, every song sung — that is action.', icon: Zap, color: '#22c55e' },
  { step: 'Hope', desc: 'A Message of Hope for the World. Share your light. Help someone else begin their journey.', icon: Sun, color: '#f59e0b' },
];

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function JamPsych() {
  const [activeTab, setActiveTab] = useState<'courses' | 'karaoke' | 'cbr' | 'community'>('courses');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [chatMsg, setChatMsg] = useState('');
  const [chat, setChat] = useState(HOPE_MESSAGES);
  const [karaokeActive, setKaraokeActive] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChat([...chat, { user: 'you', msg: chatMsg.trim(), time: 'now', tag: 'Action' }]);
    setChatMsg('');
  };

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* ═══ HEADER ═══ */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec4899] via-[#a855f7] to-[#f59e0b] flex items-center justify-center shrink-0">
              <Heart size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white">JamPsych™</h1>
              <p className="text-[11px] text-[#A0AEC0]">
                Miss Cotton's Academy — Mastery of Mental Health
              </p>
              <p className="text-[10px] text-[#f59e0b] italic">
                "A Message of Hope for the World"
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center">
                <p className="text-sm font-bold text-[#ec4899]">{COURSES.length}</p>
                <p className="text-[9px] text-[#6B7280]">Courses</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#f59e0b]">72K+</p>
                <p className="text-[9px] text-[#6B7280]">Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">

        {/* ═══ MISS COTTON ACADEMY HERO ═══ */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#1a1040] to-[#0A0F1E] border border-[#ec4899]/20 rounded-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ec4899]/5 rounded-full blur-3xl" />

          <div className="p-5 sm:p-6">
            {/* Live Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-[#ec4899]/10 border border-[#ec4899]/20 px-2.5 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse" />
                <span className="text-[10px] font-bold text-[#ec4899] uppercase tracking-wider">Live</span>
              </div>
              <span className="text-[10px] text-[#6B7280]">8,342 students in session now</span>
            </div>

            {/* Miss Cotton Identity */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#f59e0b] flex items-center justify-center shrink-0">
                <GraduationCap size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Miss Cotton's Academy</h2>
                <p className="text-xs text-[#ec4899]">Mastery of Mental Health — Psychology & Wellness</p>
                <p className="text-[10px] text-[#6B7280] mt-1">
                  Granddaughter of Mrs. Margee Cotton (The Winston School, NJ) —
                  carrying forward the legacy of transformative education into mental wellness.
                </p>
              </div>
            </div>

            {/* Framework: Awareness → Interest → Action → Hope */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {FRAMEWORK.map((f) => (
                <div key={f.step} className="bg-black/30 border border-white/[0.06] rounded-xl p-3 text-center">
                  <f.icon size={18} style={{ color: f.color }} className="mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-white">{f.step}</p>
                  <p className="text-[9px] text-[#A0AEC0] mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('courses')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#ec4899] hover:bg-[#ec4899]/80 text-black text-sm font-bold rounded-xl transition-colors cursor-pointer"
              >
                <BookOpen size={16} /> Start Learning
              </button>
              <a
                href="#/cottonbrickroad"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0F1E] border border-white/[0.06] hover:border-[#f59e0b]/30 text-white text-sm font-semibold rounded-xl transition-colors no-underline"
              >
                <Swords size={16} className="text-[#f59e0b]" /> Battle on Cotton Brick Road
              </a>
              <button
                onClick={() => setActiveTab('karaoke')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0F1E] border border-white/[0.06] hover:border-[#ec4899]/30 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <Mic2 size={16} className="text-[#ec4899]" /> Karaoke Therapy
              </button>
            </div>
          </div>
        </div>

        {/* ═══ TAB NAVIGATION ═══ */}
        <div className="flex items-center gap-1 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-1">
          {[
            { id: 'courses' as const, label: '9 Courses', icon: BookOpen },
            { id: 'karaoke' as const, label: 'Karaoke Therapy', icon: Mic2 },
            { id: 'cbr' as const, label: 'Cotton Brick Road', icon: Castle },
            { id: 'community' as const, label: 'Hope Community', icon: Users },
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

        {/* ═══ COURSES TAB ═══ */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-white">All 9 Psychology Courses</p>
              <p className="text-[10px] text-[#6B7280]">{COURSES.reduce((a, c) => a + c.lessons, 0)} total lessons</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COURSES.map((course) => {
                const expanded = expandedCourse === course.id;
                return (
                  <div
                    key={course.id}
                    className={`bg-[#0A0F1E] border rounded-xl transition-all ${
                      course.id === 'hope-circle'
                        ? 'border-[#f59e0b]/20 ring-1 ring-[#f59e0b]/10'
                        : 'border-white/[0.06]'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedCourse(expanded ? null : course.id)}
                      className="w-full text-left p-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${course.color}15` }}>
                          <course.icon size={20} style={{ color: course.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold ${course.id === 'hope-circle' ? 'text-[#f59e0b]' : 'text-white'}`}>
                            {course.title}
                          </p>
                          <p className="text-[10px] text-[#6B7280]">{course.subtitle}</p>
                        </div>
                        <ArrowRight size={14} className={`text-[#6B7280] shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                      </div>
                      <p className="text-[11px] text-[#A0AEC0] leading-relaxed">{course.desc}</p>

                      {/* Quick stats */}
                      <div className="flex items-center gap-3 mt-2 text-[9px] text-[#6B7280]">
                        <span>{course.lessons} lessons</span>
                        <span>{course.students.toLocaleString()} students</span>
                        <span style={{ color: course.color }}>vs. {course.cbrCreature}</span>
                      </div>
                    </button>

                    {/* Expanded Detail */}
                    {expanded && (
                      <div className="px-4 pb-4 border-t border-white/[0.04] pt-3 space-y-3">
                        {/* Topics */}
                        <div>
                          <p className="text-[10px] text-[#6B7280] mb-1.5 uppercase tracking-wider">What You Will Learn</p>
                          <div className="flex flex-wrap gap-1.5">
                            {course.topics.map((topic) => (
                              <span key={topic} className="text-[9px] bg-white/[0.04] text-[#A0AEC0] px-2 py-1 rounded-full">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CBR Challenge */}
                        <div className="flex items-center gap-2 p-2.5 bg-black/30 rounded-lg">
                          <Crosshair size={14} style={{ color: course.color }} />
                          <div className="flex-1">
                            <p className="text-[10px] text-white font-semibold">CBR Challenge: Defeat {course.cbrCreature}</p>
                            <p className="text-[9px] text-[#6B7280]">Complete this course on the Cotton Brick Road</p>
                          </div>
                          <span className="text-[10px] font-bold text-[#f59e0b]">+{course.cbrReward}</span>
                        </div>

                        {/* Action */}
                        <div className="flex gap-2">
                          <a
                            href="#/cottonbrickroad"
                            className="flex-1 text-center py-2 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-lg transition-colors no-underline"
                          >
                            Battle on CBR
                          </a>
                          <button
                            onClick={() => setActiveTab('karaoke')}
                            className="flex-1 text-center py-2 bg-[#ec4899]/10 hover:bg-[#ec4899]/20 text-[#ec4899] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Karaoke Session
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ KARAOKE THERAPY TAB ═══ */}
        {activeTab === 'karaoke' && (
          <div className="space-y-6">
            {/* Hero */}
            <div className="text-center py-6">
              <Mic2 size={40} className="text-[#ec4899] mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white">Karaoke Therapy</h2>
              <p className="text-sm text-[#A0AEC0] mt-1 max-w-md mx-auto">
                Sing your feelings. Science shows that singing releases endorphins, oxytocin, and reduces cortisol.
                Every voice matters — especially yours.
              </p>
            </div>

            {/* Now Playing */}
            {karaokeActive && (
              <div className="bg-gradient-to-br from-[#ec4899]/10 to-[#a855f7]/10 border border-[#ec4899]/20 rounded-2xl p-5 text-center">
                <div className="w-16 h-16 rounded-full bg-[#ec4899]/20 flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <Music size={28} className="text-[#ec4899]" />
                </div>
                <p className="text-lg font-bold text-white">{KARAOKE_TRACKS[activeTrack].title}</p>
                <p className="text-sm text-[#A0AEC0]">{KARAOKE_TRACKS[activeTrack].artist}</p>
                <p className="text-[10px] text-[#ec4899] mt-1">{KARAOKE_TRACKS[activeTrack].therapy}</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={() => setActiveTrack((t) => (t - 1 + KARAOKE_TRACKS.length) % KARAOKE_TRACKS.length)}
                    className="p-2 text-[#6B7280] hover:text-white cursor-pointer"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => setKaraokeActive(false)}
                    className="px-5 py-2 bg-[#ec4899] text-black text-xs font-bold rounded-full cursor-pointer"
                  >
                    Stop
                  </button>
                  <button
                    onClick={() => setActiveTrack((t) => (t + 1) % KARAOKE_TRACKS.length)}
                    className="p-2 text-[#6B7280] hover:text-white cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Track List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KARAOKE_TRACKS.map((track, i) => (
                <button
                  key={track.title}
                  onClick={() => { setActiveTrack(i); setKaraokeActive(true); }}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    karaokeActive && activeTrack === i
                      ? 'bg-[#ec4899]/10 border border-[#ec4899]/20'
                      : 'bg-[#0A0F1E] border border-white/[0.06] hover:border-white/[0.1]'
                  }`}
                >
                  <span className="text-2xl">{track.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{track.title}</p>
                    <p className="text-[10px] text-[#6B7280]">{track.artist}</p>
                    <p className="text-[9px] text-[#ec4899]">{track.therapy}</p>
                  </div>
                  <Volume2 size={16} className="text-[#6B7280] shrink-0" />
                </button>
              ))}
            </div>

            {/* Science Note */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
              <Brain size={16} className="text-[#a855f7] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">The Science Behind Karaoke Therapy</p>
                <p className="text-[10px] text-[#A0AEC0] leading-relaxed mt-1">
                  Singing activates the vagus nerve, reduces cortisol by up to 30%, and releases oxytocin —
                  the "bonding hormone." Group singing synchronizes heart rates. At Miss Cotton's Academy,
                  we combine karaoke with CBT techniques for a uniquely powerful therapeutic experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ COTTON BRICK ROAD TAB ═══ */}
        {activeTab === 'cbr' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <Castle size={36} className="text-[#f59e0b] mx-auto mb-2" />
              <h2 className="text-lg font-bold text-white">Psychology on the Cotton Brick Road</h2>
              <p className="text-sm text-[#A0AEC0] max-w-lg mx-auto">
                Every course in Miss Cotton's Academy connects to the Cotton Brick Road.
                Battle creatures, earn certificates, and level up your mental wellness.
              </p>
            </div>

            {/* Course-Creature Map */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COURSES.map((course) => (
                <div key={course.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${course.color}15` }}>
                      <course.icon size={16} style={{ color: course.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{course.title}</p>
                      <p className="text-[9px] text-[#6B7280]">{course.lessons} lessons</p>
                    </div>
                  </div>
                  {/* CBR Challenge Card */}
                  <div className="flex items-center gap-2 p-2 bg-black/30 rounded-lg mb-3">
                    <Swords size={12} className="text-[#f59e0b]" />
                    <span className="text-[10px] text-white">Challenge: <span className="text-[#f59e0b]">{course.cbrCreature}</span></span>
                    <span className="text-[10px] text-[#f59e0b] ml-auto">+{course.cbrReward} bricks</span>
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

            {/* Visual Road Preview */}
            <div className="relative h-32 rounded-xl overflow-hidden border border-white/[0.06]">
              <img src="/cotton-bricks-texture.jpg" alt="Cotton Brick Road" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Crown size={24} className="text-[#f59e0b] mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">The Castle Awaits</p>
                  <p className="text-[10px] text-[#A0AEC0]">Complete all 9 courses to face the final guardian</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ COMMUNITY TAB ═══ */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center py-4">
              <Sun size={36} className="text-[#f59e0b] mx-auto mb-2" />
              <h2 className="text-lg font-bold text-white">Hope Community</h2>
              <p className="text-sm text-[#A0AEC0] italic">"A Message of Hope for the World"</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Members', value: '72,341', icon: Users, color: '#7096D1' },
                { label: 'Stories Shared', value: '12,847', icon: MessageCircle, color: '#ec4899' },
                { label: 'Group Sessions', value: '3,456', icon: Radio, color: '#22c55e' },
                { label: 'Lives Changed', value: '∞', icon: Heart, color: '#f59e0b' },
              ].map((s) => (
                <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3 text-center">
                  <s.icon size={16} style={{ color: s.color }} className="mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[9px] text-[#6B7280]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Chat Feed */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl">
              <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio size={14} className="text-[#22c55e]" />
                  <span className="text-xs font-bold text-white">Live Hope Feed</span>
                </div>
                <span className="text-[9px] text-[#6B7280]">{chat.length} messages</span>
              </div>
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {chat.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ec4899] to-[#a855f7] flex items-center justify-center shrink-0">
                      <span className="text-[8px] text-white font-bold">{c.user[0].toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-[#ec4899]">{c.user}</span>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/[0.04] text-[#6B7280]">{c.tag}</span>
                        <span className="text-[8px] text-[#6B7280] ml-auto">{c.time}</span>
                      </div>
                      <p className="text-xs text-[#A0AEC0] mt-0.5">{c.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Input */}
              <div className="p-4 border-t border-white/[0.06] flex gap-2">
                <input
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                  placeholder="Share your message of hope..."
                  className="flex-1 bg-[#050810] text-white text-xs placeholder-[#6B7280] rounded-lg px-3 py-2 outline-none border border-transparent focus:border-[#ec4899]/30"
                />
                <button
                  onClick={sendChat}
                  className="p-2 bg-[#ec4899] rounded-lg cursor-pointer hover:bg-[#ec4899]/80 transition-colors"
                >
                  <Send size={12} className="text-white" />
                </button>
              </div>
            </div>

            {/* Miss Cotton Quote */}
            <div className="bg-gradient-to-br from-[#f59e0b]/5 to-[#ec4899]/5 border border-[#f59e0b]/20 rounded-2xl p-5 text-center">
              <Sun size={24} className="text-[#f59e0b] mx-auto mb-2" />
              <p className="text-sm text-white italic leading-relaxed">
                "Just as my grandmother taught the world to read with courage,
                I teach the world to feel with courage. Every step on the Cotton Brick Road
                is a step toward healing. You are not broken — you are becoming."
              </p>
              <p className="text-xs text-[#f59e0b] mt-3 font-semibold">— Miss Cotton</p>
              <p className="text-[9px] text-[#6B7280]">The Winston School Legacy • Miss Cotton's Academy</p>
            </div>
          </div>
        )}

        {/* ═══ FOOTER CTA ═══ */}
        <div className="text-center py-6 space-y-3">
          <p className="text-xs text-[#6B7280]">
            All courses connect to the Cotton Brick Road. Battle, learn, heal, and earn your certificate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#/cottonbrickroad"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-xl transition-colors no-underline"
            >
              <Castle size={14} /> Enter Cotton Brick Road
            </a>
            <a
              href="#/academy"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 border border-[#7096D1]/20 text-[#7096D1] text-xs font-bold rounded-xl transition-colors no-underline"
            >
              <GraduationCap size={14} /> Mrs. Cotton's Academy
            </a>
          </div>
          <p className="text-[10px] text-[#6B7280] italic">
            "A Message of Hope for the World" — Miss Cotton's Academy, Powered by Ad9x™
          </p>
        </div>
      </div>
    </div>
  );
}
