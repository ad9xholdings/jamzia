/* ═══════════════════════════════════════════════════════════
   JamCourses™ — The Learning Ground
   Mrs. Cotton's Academy — Live at the Top
   "Ground Zero for Phonics Mastery"
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import {
  GraduationCap, Play, Volume2,
  Star, Clock, Users, BookOpen, Sparkles,
  Map, Trophy, Brain, Globe, Zap, Target,
  ArrowRight, Flame, Baby, Lock, TrendingUp,
} from 'lucide-react';
import { GRADE_LEVELS, getPhaseColor } from '../config/gradeProgression';
import { loadProfile, type UserProfile } from '../config/progressEngine';

/* ── Mrs. Cotton's Academy LIVE Window ── */
function MrsCottonLiveWindow({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#081F5C]/30 to-[#0A0F1E] border border-[#f59e0b]/20 rounded-2xl">
      {/* Live Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Live</span>
        </div>
        <span className="text-[10px] text-[#6B7280]">12,847 students tuned in</span>
      </div>

      {/* Video Player Window */}
      <div className="aspect-video bg-black relative">
        {/* Simulated live feed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7096D1] to-[#f59e0b] flex items-center justify-center mx-auto mb-4 ring-4 ring-[#f59e0b]/20">
              <GraduationCap size={36} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Mrs. Cotton's Academy</h2>
            <p className="text-sm text-[#f59e0b] font-semibold mb-2">Mastery of Phonics — Session #2,847</p>
            <p className="text-xs text-[#6B7280]">Teaching Confidence through Word-Picture Association</p>
          </div>
        </div>

        {/* Live overlay elements */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Play size={18} className="text-white ml-0.5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Volume2 size={18} className="text-white" />
              </button>
              <span className="text-xs text-white font-mono">00:00 / 45:30</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-1 rounded-full">Ages 2–22+</span>
              <span className="text-[10px] bg-[#7096D1]/10 text-[#7096D1] px-2 py-1 rounded-full">245 Lessons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7096D1] to-[#f59e0b] flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Margee Cotton</p>
              <p className="text-[10px] text-[#f59e0b]">Lead Educator & Founder — The Winston School, NJ</p>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-3 text-[10px] text-[#6B7280]">
            <span className="flex items-center gap-1"><Users size={10} /> 12,847 students</span>
            <span className="flex items-center gap-1"><Star size={10} className="text-[#f59e0b]" /> 4.9 rating</span>
            <span className="flex items-center gap-1"><Clock size={10} /> 43 years</span>
          </div>
        </div>

        <p className="text-xs text-[#A0AEC0] leading-relaxed mb-4">
          For 43 years, Margee Cotton transformed reluctant readers into confident learners at The Winston School
          in Short Hills, NJ. Her word-picture association methodology turned phonics from rote memorization into
          adventure-based discovery. Now streaming live to every learner in the world.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] hover:bg-[#f59e0b]/80 text-black text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <GraduationCap size={16} /> Enter the Academy
          </button>
          <a
            href="#/cottonbrickroad"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0F1E] border border-white/[0.06] hover:border-white/[0.12] text-white text-sm font-semibold rounded-xl transition-colors no-underline"
          >
            <Map size={16} className="text-[#f59e0b]" /> Cotton Brick Road
          </a>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-4 text-[10px] text-[#6B7280]">
          <span>Point of Contact: Clark Cotton (Son & Partner)</span>
          <span>•</span>
          <span className="text-rose-400">On medical leave — CRPS treatment, September 2024</span>
        </div>
      </div>
    </div>
  );
}

/* ── Grade Path Overview ── */
function GradePathOverview({ profile }: { profile: UserProfile }) {
  const phases = [
    { key: 'early', label: 'Early Childhood', grades: GRADE_LEVELS.filter(g => g.phase === 'early') },
    { key: 'elementary', label: 'Elementary', grades: GRADE_LEVELS.filter(g => g.phase === 'elementary') },
    { key: 'middle', label: 'Middle School', grades: GRADE_LEVELS.filter(g => g.phase === 'middle') },
    { key: 'high', label: 'High School', grades: GRADE_LEVELS.filter(g => g.phase === 'high') },
    { key: 'college', label: 'College', grades: GRADE_LEVELS.filter(g => g.phase === 'college') },
    { key: 'postgrad', label: 'Graduate & Doctoral', grades: GRADE_LEVELS.filter(g => g.phase === 'postgrad') },
  ];

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-[#f59e0b]" />
          <h3 className="text-sm font-bold text-white">Academic Grade Path — {GRADE_LEVELS.length} Levels</h3>
        </div>
        <a href="#/academy" className="text-[10px] text-[#7096D1] hover:text-white no-underline">Enter Academy →</a>
      </div>

      <div className="space-y-2">
        {phases.map(phase => {
          const completed = phase.grades.filter(g => profile.gradeCompletions.find(c => c.gradeId === g.id)?.passed).length;
          const total = phase.grades.length;
          const pct = Math.round((completed / total) * 100);
          const color = getPhaseColor(phase.key);

          return (
            <div key={phase.key} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#050810] border border-white/[0.04]">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-white">{phase.label}</p>
                  <span className="text-[10px] text-[#6B7280]">{completed}/{total}</span>
                </div>
                <div className="h-1 bg-[#0A0F1E] rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
              <span className="text-[10px] font-bold shrink-0" style={{ color }}>{pct}%</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
        <p className="text-[10px] text-amber-400">
          <Lock size={10} className="inline mr-1" />
          <strong>Locked Progression:</strong> Everyone starts at Nursery School. You must pass every test 
          and defeat the Castle Guardian to advance. All answers are tracked in your <a href="#/profile" className="text-[#7096D1] no-underline">JamProfile</a>.
        </p>
      </div>
    </div>
  );
}

/* ── Course Catalog ── */
const COURSES = [
  {
    id: 'cotton',
    title: "Mrs. Cotton's Academy",
    subtitle: 'Mastery of Phonics — Entry Point',
    icon: GraduationCap,
    color: '#f59e0b',
    instructor: 'Margee Cotton (Legacy) / Clark Cotton',
    age: 'Ages 2–22+',
    lessons: 245,
    students: 12847,
    live: true,
    desc: 'Ground Zero for all learning. 43 years of word-picture association. The first step on Cotton Brick Road.',
    route: '/academy',
  },
  {
    id: 'mastery',
    title: 'JamMastery™',
    subtitle: 'Gamified Education Platform',
    icon: Trophy,
    color: '#a855f7',
    instructor: 'JamZia EduTech Team',
    age: 'Ages 6+',
    lessons: 300,
    students: 15678,
    live: false,
    desc: 'The original EduTech platform. Gamified learning across all subjects with AR integration.',
    route: '/mastery',
  },
  {
    id: 'coding',
    title: 'JamCode Academy',
    subtitle: 'Full-Stack Development',
    icon: Zap,
    color: '#3b82f6',
    instructor: '9x Concierge + Community',
    age: 'Ages 12+',
    lessons: 120,
    students: 8432,
    live: false,
    desc: 'JavaScript, TypeScript, React, Node.js, blockchain. Build real JamZia features.',
    route: '/code',
  },
  {
    id: 'math',
    title: 'Athena Math Mastery',
    subtitle: 'Mathematics & Logic',
    icon: Brain,
    color: '#a855f7',
    instructor: 'Agent Athena (AI Mentor)',
    age: 'Ages 6+',
    lessons: 150,
    students: 9876,
    live: false,
    desc: 'Arithmetic through calculus, logic puzzles, game theory, competitive math.',
    route: '/academy',
  },
  {
    id: 'science',
    title: 'Viridia Science Lab',
    subtitle: 'Chemistry & Biology',
    icon: Flame,
    color: '#22c55e',
    instructor: 'Agent Viridia (AI Challenger)',
    age: 'Ages 10+',
    lessons: 110,
    students: 4523,
    live: false,
    desc: 'Hands-on experiments, molecular visualization, biology AR exploration.',
    route: '/academy',
  },
  {
    id: 'data',
    title: 'Buzz Data Academy',
    subtitle: 'Data Science & Analytics',
    icon: Target,
    color: '#f59e0b',
    instructor: 'Agent Buzz (AI Companion)',
    age: 'Ages 12+',
    lessons: 100,
    students: 5432,
    live: false,
    desc: 'Statistics, visualization, Python, SQL, machine learning fundamentals.',
    route: '/academy',
  },
  {
    id: 'languages',
    title: 'Echo Wellness Institute',
    subtitle: 'Health & Languages',
    icon: Globe,
    color: '#3b82f6',
    instructor: 'Agent Echo (AI Mentor)',
    age: 'Ages 4+',
    lessons: 200,
    students: 11205,
    live: false,
    desc: 'Language learning through immersive phonics. Multilingual mastery.',
    route: '/academy',
  },
  {
    id: 'early',
    title: 'First Steps',
    subtitle: 'Early Literacy (Ages 2–6)',
    icon: Baby,
    color: '#ec4899',
    instructor: 'Mrs. Cotton Method',
    age: 'Ages 2–6',
    lessons: 60,
    students: 8941,
    live: false,
    desc: 'Gentle alphabet adventures. Letters come alive through AR and song.',
    route: '/academy',
  },
];

/* ═══════ MAIN PAGE ═══════ */
export default function JamCourses() {
  const [filter, setFilter] = useState('');
  const [profile, setProfile] = useState<UserProfile>(loadProfile());

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const filtered = COURSES.filter(
    (c) =>
      c.title.toLowerCase().includes(filter.toLowerCase()) ||
      c.desc.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#a855f7] flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">JamCourses™</h1>
              <p className="text-[10px] text-[#6B7280]">All masterclasses — Ground Zero starts with Mrs. Cotton</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="#/profile" className="px-3 py-1.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 text-[#7096D1] text-[10px] rounded-lg transition-colors no-underline">
                <Star size={10} className="inline mr-1" /> Profile
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Mrs. Cotton LIVE Window — Ground Zero */}
        <MrsCottonLiveWindow onEnter={() => window.location.hash = '/academy'} />

        {/* Grade Path */}
        <GradePathOverview profile={profile} />

        {/* Search */}
        <div className="relative">
          <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search courses..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-[#0A0F1E] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-[#6B7280] focus:border-[#7096D1]/30 focus:outline-none"
          />
        </div>

        {/* Course Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">All Courses</p>
            <span className="text-[10px] text-[#6B7280]">{filtered.length} programs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((course) => (
              <a
                key={course.id}
                href={`#${course.route}`}
                className={`group relative bg-[#0A0F1E] border rounded-xl p-4 transition-all no-underline ${
                  course.id === 'cotton'
                    ? 'border-[#f59e0b]/20 hover:border-[#f59e0b]/40'
                    : 'border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01]'
                }`}
              >
                {course.live && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[8px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded-full font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                  </span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${course.color}15` }}>
                    <course.icon size={20} style={{ color: course.color }} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${course.id === 'cotton' ? 'text-[#f59e0b]' : 'text-white'}`}>{course.title}</p>
                    <p className="text-[10px] text-[#6B7280]">{course.subtitle}</p>
                  </div>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-relaxed mb-3">{course.desc}</p>
                <div className="flex items-center gap-3 text-[9px] text-[#6B7280]">
                  <span>{course.age}</span>
                  <span>•</span>
                  <span>{course.lessons} lessons</span>
                  <span>•</span>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[10px]" style={{ color: course.color }}>
                  <span>Enter Course</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center py-6">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-9x-concierge'))}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 text-[#7096D1] text-xs rounded-xl transition-colors cursor-pointer"
          >
            <Sparkles size={14} /> Ask 9x to recommend a course
          </button>
        </div>
      </div>
    </div>
  );
}

/* Search icon stub since we imported it differently */
function SearchIcon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}
