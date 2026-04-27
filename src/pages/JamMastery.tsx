import { useState, useEffect } from 'react';
import {
  Map, BookOpen, Zap, Flame, Trophy, Snowflake, Star,
  ChevronRight, RotateCcw, Target, TrendingUp,
  GraduationCap, Heart, Thermometer,
  Swords, Castle, Crown, Bug, Shield
} from 'lucide-react';
import { useMasteryStore, ALL_COURSES, NODES } from '../store/useMasteryStore';

const LEVEL_BADGES: Record<string, { label: string; color: string }> = {
  starter: { label: 'STARTER', color: '#22c55e' },
  challenger: { label: 'CHALLENGER', color: '#7096D1' },
  master: { label: 'MASTER', color: '#f59e0b' },
  legend: { label: 'LEGEND', color: '#ef4444' }};

export default function JamMastery() {
  const s = useMasteryStore();
  const [showIntro, setShowIntro] = useState(true);
  const [mapTab, setMapTab] = useState<'map' | 'subjects' | 'profile'>('map');

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A1628] to-[#1a1040] flex flex-col items-center justify-center text-white">
        <GraduationCap size={56} className="text-emerald-400 mb-4 animate-bounce" />
        <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">JamMastery™</h1>
        <p className="text-[#A0AEC0] text-sm mt-3">EduTech Mastery — Every Course in the World</p>
        <p className="text-[#6B7280] text-xs mt-1">AR Creature Collection Learning • Never Die, Just Freeze</p>
        <div className="flex gap-1 mt-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <GraduationCap size={20} className="text-emerald-400" />
            <span className="font-display font-bold">JamMastery™</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1"><Flame size={12} className="text-orange-400" /><span className="text-xs font-bold text-orange-400">{s.player.heat}°</span></div>
            <div className="flex items-center gap-1"><Zap size={12} className="text-yellow-400" /><span className="text-xs font-bold text-yellow-400">{s.player.energy}</span></div>
            <div className="flex items-center gap-1"><Star size={12} className="text-amber-400" /><span className="text-xs font-bold text-amber-400">{s.player.tokens}</span></div>
          </div>
        </div>
      </div>

      {/* Player Bar */}
      <div className="bg-[#0A0F1E] border-b border-white/5 px-4 py-2">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-400">Lv{s.player.level}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#6B7280]">Heat</span>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(s.player.heat / s.player.maxHeat) * 100}%`, backgroundColor: s.player.heat > 30 ? '#f97316' : '#ef4444' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
            <span>🔥 {s.player.streak} streak</span>
            <span>🎓 {s.completedCourses.length}/{ALL_COURSES.length}</span>
            <span>🧊 {s.player.frozenCount}x frozen</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-1 py-3 border-b border-white/5">
        {(['map', 'subjects', 'profile'] as const).map(tab => (
          <button key={tab} onClick={() => setMapTab(tab)}
            className={`px-5 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${mapTab === tab ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'}`}>
            {tab === 'map' && <Map size={14} className="inline mr-1" />}
            {tab === 'subjects' && <BookOpen size={14} className="inline mr-1" />}
            {tab === 'profile' && <Trophy size={14} className="inline mr-1" />}
            {tab}
          </button>
        ))}
      </div>

      <main className="max-w-[1100px] mx-auto px-4 py-6">
        {/* ═══ MAP VIEW ═══ */}
        {mapTab === 'map' && s.phase !== 'quiz' && s.phase !== 'frozen' && s.phase !== 'result' && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <p className="text-lg font-bold text-white">AR Knowledge Map</p>
              <p className="text-xs text-[#6B7280]">Walk around to discover Knowledge Nodes. Tap a node to begin your lesson!</p>
            </div>

            {/* AR Map */}
            <div className="relative bg-gradient-to-br from-[#0A1F15] via-[#0A1628] to-[#1a1040] border border-emerald-500/20 rounded-3xl p-4 aspect-[4/3] overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`h${i}`} className="absolute w-full h-px bg-emerald-400" style={{ top: `${i * 10}%` }} />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`v${i}`} className="absolute h-full w-px bg-emerald-400" style={{ left: `${i * 10}%` }} />
                ))}
              </div>

              {/* Player */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center animate-pulse shadow-lg shadow-emerald-500/30">
                  <GraduationCap size={18} className="text-emerald-400" />
                </div>
                <p className="text-[8px] text-emerald-400 text-center mt-0.5">YOU</p>
              </div>

              {/* Knowledge Nodes */}
              {NODES.map((node) => {
                const discovered = s.discoveredNodes.includes(node.id);
                const courses = ALL_COURSES.filter(c => c.subject === node.subject);
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      s.discoverNode(node.id);
                      if (courses.length > 0) {
                        s.startEncounter(courses[0]);
                      }
                    }}
                    className="absolute z-10 group transition-all"
                    style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                      discovered
                        ? 'bg-emerald-500/30 border-emerald-400 scale-110'
                        : 'bg-white/10 border-white/20 hover:border-emerald-400/50'
                    }`}>
                      {discovered ? node.emoji : '?'}
                    </div>
                    <p className={`text-[8px] mt-0.5 text-center whitespace-nowrap ${discovered ? 'text-emerald-400' : 'text-[#6B7280]'}`}>
                      {discovered ? node.name : 'Unknown'}
                    </p>
                    {discovered && courses.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[8px] text-black font-bold flex items-center justify-center">
                        {courses.length}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Map label */}
              <div className="absolute bottom-2 left-2 text-[10px] text-[#6B7280]">
                Cotton Brick Road — Knowledge Realm
              </div>
            </div>

            {/* Discovery Progress */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
              <p className="text-xs font-bold text-[#A0AEC0] mb-2">Discovery Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(s.discoveredNodes.length / NODES.length) * 100}%` }} />
                </div>
                <span className="text-xs text-emerald-400">{s.discoveredNodes.length}/{NODES.length}</span>
              </div>
            </div>

            {/* ═══ COTTON BRICK ROAD GAME STAGE ═══ */}
            {/* Behind the user on the map — the real battle arena */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#081F5C]/20 to-[#1a1040] border border-[#f59e0b]/20 rounded-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 pb-0">
                <div className="flex items-center gap-2">
                  <Castle size={16} className="text-[#f59e0b]" />
                  <span className="text-xs font-bold text-[#f59e0b]">Cotton Brick Road</span>
                </div>
                <span className="text-[10px] text-[#6B7280]">Behind you on the Map</span>
              </div>

              {/* Visual Road */}
              <div className="relative p-4">
                <div className="relative h-24 rounded-xl overflow-hidden border border-white/[0.06]">
                  {/* Cotton brick road texture */}
                  <img src="/cotton-bricks-texture.jpg" alt="Cotton Brick Road" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  {/* Road path overlay */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="flex-1 h-6 mx-4 bg-gradient-to-r from-white/30 via-[#f59e0b]/20 to-[#f59e0b]/40 rounded-full" />
                  </div>
                  {/* Castle at end */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <Crown size={20} className="text-[#f59e0b]" />
                    <span className="text-[7px] text-[#f59e0b] mt-0.5">Castle</span>
                  </div>
                  {/* Player position */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center">
                      <GraduationCap size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-[7px] text-emerald-400 mt-0.5">YOU</span>
                  </div>
                  {/* Creatures hiding in cotton */}
                  <div className="absolute left-1/3 top-2 flex flex-col items-center opacity-70">
                    <Bug size={14} className="text-[#22c55e]" />
                    <span className="text-[7px] text-[#6B7280]">Buddy</span>
                  </div>
                  <div className="absolute left-1/2 top-8 flex flex-col items-center opacity-60">
                    <Shield size={14} className="text-[#a855f7]" />
                    <span className="text-[7px] text-[#6B7280]">Athena</span>
                  </div>
                  <div className="absolute left-2/3 top-2 flex flex-col items-center opacity-50">
                    <Bug size={14} className="text-[#f59e0b]" />
                    <span className="text-[7px] text-[#6B7280]">Buzz</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[10px] text-[#A0AEC0] mt-3 leading-relaxed">
                  Battle bugs, insects, and animals on the Cotton Brick Road to earn bricks and gas.
                  Defeat the Castle Guardian at each grade gate to earn your certificate from Mrs. Cotton.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-3">
                  <a
                    href="#/cottonbrickroad"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-bold rounded-xl transition-colors no-underline"
                  >
                    <Swords size={14} /> Enter Cotton Brick Road
                  </a>
                  <a
                    href="#/academy"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 border border-[#7096D1]/30 text-[#7096D1] text-xs font-bold rounded-xl transition-colors no-underline"
                  >
                    <Crown size={14} /> Castle Certifications
                  </a>
                </div>
              </div>

              {/* Mrs. Cotton footer */}
              <div className="px-4 pb-3 flex items-center gap-2">
                <img src="/ar/mrs-cotton.png" alt="Mrs. Cotton" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-[9px] text-[#6B7280]">Certificates awarded by Mrs. Cotton (The Wizard) — The Winston School, NJ</span>
              </div>
            </div>
          </div>
        )}

        {/* ═══ SUBJECTS VIEW ═══ */}
        {mapTab === 'subjects' && s.phase !== 'quiz' && s.phase !== 'frozen' && s.phase !== 'result' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-lg font-bold text-white">Course Catalog</p>
              <p className="text-xs text-[#6B7280]">Every course in the world — master them all!</p>
            </div>

            {/* Featured: Phonics Mastery */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🔤</span>
                <div>
                  <p className="text-sm font-bold text-emerald-400">Featured: Phonics Mastery</p>
                  <p className="text-xs text-[#A0AEC0]">Learn every sound, blend, and pattern</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const course = ALL_COURSES.find(c => c.id === 'phonics-mastery');
                  if (course) s.startEncounter(course);
                }}
                className="px-4 py-2 bg-emerald-500 text-black text-xs font-bold rounded-xl hover:bg-emerald-400 transition-all"
              >
                Start Phonics Mastery →
              </button>
            </div>

            {/* All Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_COURSES.map((course) => {
                const completed = s.completedCourses.includes(course.id);
                const badge = LEVEL_BADGES[course.level];
                return (
                  <button
                    key={course.id}
                    onClick={() => s.startEncounter(course)}
                    className={`bg-[#0A0F1E] border rounded-2xl p-4 text-left hover:border-emerald-500/30 transition-all group ${
                      completed ? 'border-emerald-500/30' : 'border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{course.emoji}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${badge.color}20`, color: badge.color }}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{course.name}</p>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">{course.subject} • {course.questions.length} lessons</p>
                    {completed && <p className="text-[10px] text-emerald-400 mt-1">✅ Mastered (+{course.reward} tokens)</p>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ PROFILE VIEW ═══ */}
        {mapTab === 'profile' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-2">
                <GraduationCap size={28} className="text-emerald-400" />
              </div>
              <p className="text-lg font-bold text-white">Mastery Profile</p>
              <p className="text-xs text-[#6B7280]">Level {s.player.level} • {s.player.coursesCompleted} courses mastered</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Heat', value: `${s.player.heat}°`, icon: Flame, color: '#f97316' },
                { label: 'Energy', value: s.player.energy, icon: Zap, color: '#facc15' },
                { label: 'Tokens', value: s.player.tokens, icon: Star, color: '#f59e0b' },
                { label: 'Level', value: s.player.level, icon: TrendingUp, color: '#22c55e' },
                { label: 'Streak', value: s.player.streak, icon: Target, color: '#ef4444' },
                { label: 'Mastered', value: s.player.coursesCompleted, icon: BookOpen, color: '#7096D1' },
                { label: 'Frozen', value: s.player.frozenCount, icon: Snowflake, color: '#06b6d4' },
                { label: 'Unfrozen', value: s.player.unfrozenCount, icon: Thermometer, color: '#a855f7' },
              ].map(stat => (
                <div key={stat.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-3 text-center">
                  <stat.icon size={16} style={{ color: stat.color }} className="mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-[#6B7280]">{stat.label}</p>
                </div>
              ))}
            </div>

            <button onClick={() => s.resetProgress()} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs text-[#6B7280] mt-4">
              <RotateCcw size={12} className="inline mr-1" /> Reset Progress
            </button>
          </div>
        )}

        {/* ═══ QUIZ BATTLE ═══ */}
        {(s.phase === 'quiz' || s.phase === 'frozen' || s.phase === 'result') && s.currentCourse && (
          <div className="max-w-[600px] mx-auto space-y-4">
            {/* Course Header */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
              <span className="text-4xl mb-2 block">{s.currentCourse.emoji}</span>
              <p className="text-lg font-bold text-white">{s.currentCourse.name}</p>
              <p className="text-xs text-[#6B7280]">{s.currentCourse.subject} • {LEVEL_BADGES[s.currentCourse.level].label}</p>

              {/* Course HP */}
              <div className="flex items-center gap-2 mt-3 max-w-xs mx-auto">
                <Heart size={12} className="text-red-400" />
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${(s.currentCourse.hp / s.currentCourse.maxHp) * 100}%` }} />
                </div>
                <span className="text-[10px] text-white">{s.currentCourse.hp}/{s.currentCourse.maxHp}</span>
              </div>
            </div>

            {/* FROZEN STATE */}
            {s.phase === 'frozen' && (
              <div className="bg-gradient-to-b from-cyan-500/10 to-blue-500/10 border-2 border-cyan-400/40 rounded-2xl p-6 text-center">
                <Snowflake size={48} className="text-cyan-400 mx-auto mb-3 animate-pulse" />
                <h2 className="text-2xl font-bold text-cyan-300 mb-2">FROZEN!</h2>
                <p className="text-sm text-[#A0AEC0] mb-4">
                  Do not worry — you never die in JamMastery! You are just frozen.
                  Use your tokens and energy to heat up and continue learning!
                </p>
                <div className="flex justify-center gap-3 mb-4">
                  <div className="bg-black/30 rounded-xl px-4 py-2">
                    <p className="text-[10px] text-[#6B7280]">Heat</p>
                    <p className="text-lg font-bold text-cyan-400">{s.player.heat}°</p>
                  </div>
                  <div className="bg-black/30 rounded-xl px-4 py-2">
                    <p className="text-[10px] text-[#6B7280]">Tokens</p>
                    <p className="text-lg font-bold text-amber-400">{s.player.tokens}</p>
                  </div>
                </div>
                <button
                  onClick={() => s.heatUp()}
                  disabled={s.player.tokens < 5}
                  className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 mx-auto ${
                    s.player.tokens >= 5
                      ? 'bg-orange-500 text-black hover:bg-orange-400'
                      : 'bg-white/10 text-[#6B7280] cursor-not-allowed'
                  }`}
                >
                  <Flame size={18} /> Heat Up! (5 tokens)
                </button>
                {s.player.tokens < 5 && (
                  <p className="text-xs text-red-400 mt-2">Not enough tokens! Complete easier courses first.</p>
                )}

                {/* CBR Alternative: Battle your way out */}
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <p className="text-[10px] text-[#A0AEC0] mb-3">
                    Or battle your way out on Cotton Brick Road. Defeat creatures to earn tokens and heat!
                  </p>
                  <a
                    href="#/cottonbrickroad"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-bold rounded-xl transition-colors no-underline"
                  >
                    <Swords size={14} /> Battle on Cotton Brick Road
                  </a>
                </div>
              </div>
            )}

            {/* QUIZ QUESTION */}
            {s.phase === 'quiz' && s.currentCourse.questions[s.currentQuestion] && (
              <>
                <div className="bg-[#0A0F1E] border border-emerald-500/20 rounded-2xl p-5">
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">
                    Question {s.currentQuestion + 1} of {s.currentCourse.questions.length}
                  </p>
                  <p className="text-base font-semibold text-white mb-4">
                    {s.currentCourse.questions[s.currentQuestion].question}
                  </p>
                  <div className="space-y-2">
                    {s.currentCourse.questions[s.currentQuestion].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => s.answerQuestion(i)}
                        className="w-full text-left px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-sm text-[#A0AEC0] hover:text-white"
                      >
                        <span className="text-emerald-400 font-bold mr-2">{['A', 'B', 'C', 'D'][i]}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quiz Log */}
                <div className="bg-black/40 rounded-xl p-3 max-h-24 overflow-y-auto space-y-1">
                  {s.quizLog.slice(-4).map((log, i) => (
                    <p key={i} className="text-xs text-[#6B7280]">{log}</p>
                  ))}
                </div>
              </>
            )}

            {/* RESULT */}
            {s.phase === 'result' && (
              <div className="text-center space-y-4 py-6">
                {s.currentCourse.completed ? (
                  <>
                    <Trophy size={48} className="text-amber-400 mx-auto" />
                    <h2 className="text-2xl font-bold text-amber-400">Course Mastered!</h2>
                    <p className="text-sm text-[#A0AEC0]">You conquered {s.currentCourse.name}!</p>
                    <div className="flex justify-center gap-4">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
                        <p className="text-xs text-[#6B7280]">Reward</p>
                        <p className="text-lg font-bold text-emerald-400">+{s.currentCourse.reward} tokens</p>
                      </div>
                      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-xl px-4 py-2">
                        <p className="text-xs text-[#6B7280]">Certificate</p>
                        <p className="text-lg font-bold text-[#f59e0b]">Mrs. Cotton ✓</p>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-2">
                        <p className="text-xs text-[#6B7280]">Level</p>
                        <p className="text-lg font-bold text-cyan-400">{s.player.level}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Snowflake size={48} className="text-cyan-400 mx-auto" />
                    <h2 className="text-2xl font-bold text-cyan-400">Frozen... But Not Defeated!</h2>
                    <p className="text-sm text-[#A0AEC0]">In JamMastery, you never die. Heat up and try again!</p>
                  </>
                )}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                  <button
                    onClick={() => { s.collectReward(); setMapTab('map'); }}
                    className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-2"
                  >
                    <ChevronRight size={16} /> Continue Exploring
                  </button>
                  <a
                    href="#/cottonbrickroad"
                    className="px-6 py-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] font-bold rounded-xl hover:bg-[#f59e0b]/20 transition-all flex items-center gap-2 no-underline"
                  >
                    <Swords size={16} /> Go to Cotton Brick Road
                  </a>
                </div>
              </div>
            )}

            {/* Heat warning */}
            {s.player.heat <= 30 && s.phase === 'quiz' && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                <p className="text-xs text-red-400">⚠️ Heat critical! One more wrong answer and you will FREEZE!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
