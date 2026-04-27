/* ═══════════════════════════════════════════════════════════
   JamLearn™ — The JamZia Academy Engine v2
   Nursery School → Doctoral Programs
   Phonics Mastery Gate • Battle Progress • Credit Hours
   "Everyone starts at Nursery. No one skips the Castle."
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import {
  GraduationCap, Lock, Unlock, Star, Trophy, Map,
  BookOpen, ChevronRight, Crown,
  Shield, Flame, Target, Baby,
  Brain, TrendingUp, AlertTriangle,
} from 'lucide-react';
import {
  GRADE_LEVELS, getPhaseColor, type GradeLevel,
} from '../config/gradeProgression';
import {
  loadProfile, saveProfile, type UserProfile,
  getGradeProgress, isGradeUnlocked, isCastleUnlocked,
  recordQuizAnswer, markGradeComplete, incrementTestProgress,
  recordBattle, updateStreak, getCurrentGrade,
  completePhonicsMastery, getGradeBattleProgress,
  MIN_CREDIT_HOURS, MAX_CREDIT_HOURS,
} from '../config/progressEngine';

/* ── Phase Header ── */
const PHASE_META: Record<string, { icon: typeof Baby; color: string; label: string }> = {
  early: { icon: Baby, color: '#ec4899', label: 'Early Childhood' },
  elementary: { icon: BookOpen, color: '#22c55e', label: 'Elementary School' },
  middle: { icon: Brain, color: '#3b82f6', label: 'Middle School' },
  high: { icon: Star, color: '#f59e0b', label: 'High School' },
  college: { icon: GraduationCap, color: '#a855f7', label: 'College' },
  postgrad: { icon: Crown, color: '#ef4444', label: 'Graduate & Doctoral' },
};

/* ── Question Bank Generator ── */
function generateQuestionsForGrade(grade: GradeLevel, testIndex: number): {
  question: string;
  options: string[];
  correct: number;
  topic: string;
}[] {
  const bases = [
    { q: `In ${grade.name}, what is the foundation of all learning?`,
      opts: ['Reading & Phonics', 'Memorization', 'Copying others', 'Skipping ahead'], correct: 0, topic: 'Foundations' },
    { q: `Which skill is earned at ${grade.name}?`,
      opts: [...grade.skillsEarned.slice(0, 3), 'Advanced Rocket Science'].slice(0, 4), correct: 0, topic: 'Skills' },
    { q: `The Castle Gate for ${grade.name} is called?`,
      opts: [grade.castleGate, 'The Iron Gate', 'The Secret Door', 'The Back Entrance'], correct: 0, topic: 'Castle Knowledge' },
    { q: `What percentage is needed to pass ${grade.name}?`,
      opts: [`${grade.passRate}%`, '50%', '100%', '25%'], correct: 0, topic: 'Requirements' },
    { q: `How many tests are required in ${grade.name}?`,
      opts: [String(grade.testsRequired), '1', '100', '0'], correct: 0, topic: 'Requirements' },
  ];
  const rotated = [...bases.slice(testIndex % bases.length), ...bases.slice(0, testIndex % bases.length)];
  return rotated.slice(0, 4).map(b => ({
    question: b.q,
    options: b.opts,
    correct: b.correct,
    topic: b.topic,
  }));
}

/* ── Castle Boss Questions (harder) ── */
function generateCastleQuestions(grade: GradeLevel): {
  question: string;
  options: string[];
  correct: number;
  topic: string;
}[] {
  return [
    { question: `To pass ${grade.name}, you must demonstrate mastery of:`,
      options: [grade.skillsEarned[0] || 'Core Concepts', 'Nothing', 'Luck', 'Guessing'], correct: 0, topic: 'Mastery' },
    { question: `${grade.castleCreature} guards the ${grade.castleGate}. What is your strategy?`,
      options: ['Prove your knowledge', 'Run away', 'Ask a friend', 'Skip the gate'], correct: 0, topic: 'Battle Strategy' },
    { question: `Mrs. Cotton's method emphasizes:`,
      options: ['Word-Picture Association', 'Rote Memorization', 'Skipping Phonics', 'Guessing'], correct: 0, topic: 'Methodology' },
    { question: `The real-world value of ${grade.name} is:`,
      options: [grade.realWorldValue.substring(0, 40) + '...', 'Nothing', 'Entertainment', 'Sleeping'], correct: 0, topic: 'Real World' },
    { question: `You cannot advance to the next grade until you:`,
      options: ['Pass all tests AND defeat the Castle', 'Just show up', 'Pay money', 'Ask nicely'], correct: 0, topic: 'Progression Rules' },
  ];
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function GradeCard({ grade, profile, onSelect }: {
  grade: GradeLevel; profile: UserProfile; onSelect: (g: GradeLevel) => void;
}) {
  const unlocked = isGradeUnlocked(profile, grade.id);
  const progress = getGradeProgress(profile, grade.id);
  const battleProgress = getGradeBattleProgress(profile, grade.id);
  const completion = profile.gradeCompletions.find(c => c.gradeId === grade.id);
  const passed = completion?.passed;
  const castleReady = isCastleUnlocked(profile, grade.id);
  const isCurrent = profile.currentGradeId === grade.id;
  const meta = PHASE_META[grade.phase];

  return (
    <button
      onClick={() => unlocked && onSelect(grade)}
      disabled={!unlocked}
      className={`w-full text-left rounded-xl p-3 border transition-all cursor-pointer ${
        passed
          ? 'bg-emerald-500/5 border-emerald-500/15 hover:border-emerald-500/30'
          : isCurrent
            ? 'bg-[#7096D1]/5 border-[#7096D1]/25 hover:border-[#7096D1]/40'
            : unlocked
              ? 'bg-[#050810] border-white/[0.04] hover:border-white/[0.1]'
              : 'bg-[#050810]/40 border-white/[0.02] opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: passed ? '#22c55e15' : `${meta.color}15` }}>
          {passed ? <Unlock size={18} className="text-emerald-400" /> :
           unlocked ? <meta.icon size={18} style={{ color: meta.color }} /> :
           <Lock size={18} className="text-[#6B7280]" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`text-xs font-bold truncate ${passed ? 'text-emerald-400' : isCurrent ? 'text-[#7096D1]' : 'text-white'}`}>
              {grade.name}
            </p>
            {passed && <Star size={10} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />}
            {isCurrent && <span className="text-[8px] bg-[#7096D1]/15 text-[#7096D1] px-1.5 py-0.5 rounded-full font-bold shrink-0">YOU ARE HERE</span>}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 bg-[#0A0F1E] rounded-full overflow-hidden max-w-[70px]">
              <div className="h-full rounded-full transition-all" style={{
                width: `${progress}%`,
                backgroundColor: passed ? '#22c55e' : isCurrent ? '#7096D1' : '#6B7280',
              }} />
            </div>
            <span className="text-[9px] text-[#6B7280]">T:{progress}%</span>
            <div className="flex-1 h-1 bg-[#0A0F1E] rounded-full overflow-hidden max-w-[70px]">
              <div className="h-full rounded-full transition-all" style={{
                width: `${battleProgress}%`,
                backgroundColor: passed ? '#22c55e' : '#f97316',
              }} />
            </div>
            <span className="text-[9px] text-[#6B7280]">B:{battleProgress}%</span>
            {castleReady && !passed && <span className="text-[8px] text-[#f59e0b]">🏰 Castle</span>}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] text-[#6B7280]">{grade.creditHours} cr</span>
            {grade.tuition > 0 && <span className="text-[9px] text-[#f59e0b]">{grade.tuition} bricks tuition</span>}
            {grade.phonicsMasteryRequired && !profile.phonicsMasteryCompleted && !passed && (
              <span className="text-[8px] text-[#ec4899]">🔒 Phonics</span>
            )}
          </div>
        </div>
        <ChevronRight size={14} className={`shrink-0 ${unlocked ? 'text-[#6B7280]' : 'text-[#6B7280]/30'}`} />
      </div>
    </button>
  );
}

function TestView({ grade, testIndex, profile, onComplete, onExit }: {
  grade: GradeLevel; testIndex: number; profile: UserProfile;
  onComplete: (score: number) => void; onExit: () => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const questions = generateQuestionsForGrade(grade, testIndex);
  const q = questions[qIndex];

  const answer = (idx: number) => {
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) setScore(s => s + 1);

    recordQuizAnswer(profile, {
      question: q.question,
      userAnswer: q.options[idx],
      correctAnswer: q.options[q.correct],
      wasCorrect: correct,
      gradeId: grade.id,
      testId: `${grade.id}-test-${testIndex}`,
      topic: q.topic,
    });

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex(i => i + 1);
        setSelected(null);
      } else {
        setDone(true);
        const finalScore = Math.round(((correct ? score + 1 : score) / questions.length) * 100);
        onComplete(finalScore);
      }
    }, 800);
  };

  if (done) {
    const finalScore = Math.round((score / questions.length) * 100);
    const passed = finalScore >= grade.passRate;
    return (
      <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${passed ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
          {passed ? <Trophy size={28} className="text-emerald-400" /> : <AlertTriangle size={28} className="text-amber-400" />}
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{passed ? 'Test Passed!' : 'Keep Studying!'}</h3>
        <p className="text-sm text-[#A0AEC0] mb-1">Score: {finalScore}% (needed {grade.passRate}%)</p>
        <p className="text-xs text-[#6B7280] mb-4">
          {passed
            ? `One step closer to the ${grade.castleGate}!`
            : `Review the material and try again. All answers are tracked in your profile.`}
        </p>
        <button onClick={onExit} className="px-5 py-2 bg-[#7096D1] hover:bg-[#7096D1]/80 text-white text-sm rounded-xl transition-colors cursor-pointer">
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-[#6B7280]">{grade.shortName} — Test {testIndex + 1} of {grade.testsRequired}</span>
        <span className="text-[10px] text-[#6B7280]">Question {qIndex + 1} of {questions.length}</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-2 bg-[#050810] rounded-full overflow-hidden">
          <div className="h-full bg-[#7096D1] rounded-full transition-all" style={{ width: `${((qIndex) / questions.length) * 100}%` }} />
        </div>
      </div>

      <h4 className="text-sm font-bold text-white mb-4">{q.question}</h4>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selected === null && answer(i)}
            disabled={selected !== null}
            className={`w-full p-3 rounded-xl text-left text-xs transition-all cursor-pointer border ${
              selected === null
                ? 'bg-[#050810] border-white/[0.06] hover:border-[#7096D1]/30 text-[#A0AEC0]'
                : selected === i
                  ? i === q.correct
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : i === q.correct && selected !== null
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-[#050810] border-white/[0.04] text-[#6B7280]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function CastleGate({ grade, profile, onDefeat, onExit }: {
  grade: GradeLevel; profile: UserProfile;
  onDefeat: (score: number) => void; onExit: () => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const questions = generateCastleQuestions(grade);
  const q = questions[qIndex];

  const answer = (idx: number) => {
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) setScore(s => s + 1);

    recordQuizAnswer(profile, {
      question: q.question,
      userAnswer: q.options[idx],
      correctAnswer: q.options[q.correct],
      wasCorrect: correct,
      gradeId: grade.id,
      testId: `${grade.id}-castle`,
      topic: `Castle: ${q.topic}`,
    });

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex(i => i + 1);
        setSelected(null);
      } else {
        setDone(true);
        const finalScore = Math.round(((correct ? score + 1 : score) / questions.length) * 100);
        recordBattle(profile, correct ? score + 1 >= 3 : false);
        onDefeat(finalScore);
      }
    }, 1000);
  };

  if (done) {
    const finalScore = Math.round((score / questions.length) * 100);
    const passed = finalScore >= grade.passRate;
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#081F5C]/20 to-[#0A0F1E] border border-[#f59e0b]/30 rounded-2xl p-6 text-center">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#f59e0b]/5 rounded-full blur-3xl" />
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-[#f59e0b]/15' : 'bg-rose-500/10'}`}>
          {passed ? <Crown size={36} className="text-[#f59e0b]" /> : <Shield size={36} className="text-rose-400" />}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {passed ? `${grade.castleGate} Conquered!` : 'Defeated by the Guardian...'}
        </h3>
        <p className="text-sm text-[#A0AEC0] mb-1">
          {passed
            ? `You defeated ${grade.castleCreature} and unlocked ${grade.nextGradeId ? 'the next grade' : 'the highest honor'}!`
            : `${grade.castleCreature} stands firm. Study harder and return. All attempts are tracked.`}
        </p>
        <p className="text-lg font-bold text-[#f59e0b] mb-4">{finalScore}%</p>
        <button onClick={onExit} className="px-6 py-2.5 bg-[#f59e0b] hover:bg-[#f59e0b]/80 text-black text-sm font-bold rounded-xl transition-colors cursor-pointer">
          {passed ? 'Claim Victory' : 'Return to Study'}
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#081F5C]/30 to-[#0A0F1E] border border-[#f59e0b]/20 rounded-2xl p-5 sm:p-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/5 rounded-full blur-3xl" />

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-3 py-1 rounded-full mb-3">
          <Crown size={12} className="text-[#f59e0b]" />
          <span className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-wider">Castle Gate</span>
        </div>
        <h3 className="text-lg font-bold text-white">{grade.castleGate}</h3>
        <p className="text-xs text-[#A0AEC0]">Guardian: <span className="text-[#f59e0b] font-semibold">{grade.castleCreature}</span></p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-2 bg-[#050810] rounded-full overflow-hidden">
          <div className="h-full bg-[#f59e0b] rounded-full transition-all" style={{ width: `${((qIndex) / questions.length) * 100}%` }} />
        </div>
      </div>

      <h4 className="text-sm font-bold text-white mb-4">{q.question}</h4>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selected === null && answer(i)}
            disabled={selected !== null}
            className={`w-full p-3 rounded-xl text-left text-xs transition-all cursor-pointer border ${
              selected === null
                ? 'bg-[#050810] border-white/[0.06] hover:border-[#f59e0b]/30 text-[#A0AEC0]'
                : selected === i
                  ? i === q.correct
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : i === q.correct && selected !== null
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-[#050810] border-white/[0.04] text-[#6B7280]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function getGradeById(id: string) {
  return GRADE_LEVELS.find(g => g.id === id);
}

function GradeDetail({ grade, profile, onBack, onProfileUpdate }: {
  grade: GradeLevel; profile: UserProfile; onBack: () => void;
  onProfileUpdate: (p: UserProfile) => void;
}) {
  const completion = profile.gradeCompletions.find(c => c.gradeId === grade.id);
  const [view, setView] = useState<'info' | 'test' | 'castle'>('info');
  const [activeTest, setActiveTest] = useState(0);

  const startTest = (idx: number) => {
    updateStreak(profile);
    setActiveTest(idx);
    setView('test');
  };

  const handleTestComplete = (score: number) => {
    const passed = score >= grade.passRate;
    const updated = incrementTestProgress(profile, grade.id, passed);
    onProfileUpdate(updated);
  };

  const handleCastleDefeat = (score: number) => {
    const passed = score >= grade.passRate;
    if (passed) {
      const updated = markGradeComplete(profile, grade.id, score);
      const next = getCurrentGrade(updated);
      if (next.id !== updated.currentGradeId && grade.nextGradeId) {
        updated.currentGradeId = grade.nextGradeId;
        updated.highestGradeReached =
          grade.nextGradeId && (getGradeById(grade.nextGradeId)?.sequence || 0) > (getGradeById(updated.highestGradeReached)?.sequence || 0)
            ? grade.nextGradeId
            : updated.highestGradeReached;
      }
      saveProfile(updated);
      onProfileUpdate({ ...updated });
    } else {
      onProfileUpdate({ ...profile });
    }
    setView('info');
  };

  const progress = getGradeProgress(profile, grade.id);
  const castleReady = isCastleUnlocked(profile, grade.id);
  const passed = completion?.passed;

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-[10px] text-[#6B7280] hover:text-white transition-colors cursor-pointer">← back to academy</button>

      {view === 'info' && (
        <>
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getPhaseColor(grade.phase)}15` }}>
                {passed ? <Unlock size={24} className="text-emerald-400" /> :
                 <Lock size={24} style={{ color: getPhaseColor(grade.phase) }} />}
              </div>
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">{grade.phaseLabel}</p>
                <h2 className="text-xl font-bold text-white">{grade.name}</h2>
              </div>
              {passed && <Star size={20} className="text-[#f59e0b] fill-[#f59e0b] ml-auto" />}
            </div>

            <p className="text-xs text-[#A0AEC0] leading-relaxed mb-4">{grade.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-white">{grade.testsRequired}</p>
                <p className="text-[9px] text-[#6B7280]">Tests Required</p>
              </div>
              <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-white">{grade.passRate}%</p>
                <p className="text-[9px] text-[#6B7280]">Pass Rate</p>
              </div>
              <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-[#f59e0b]">{grade.creditHours}</p>
                <p className="text-[9px] text-[#6B7280]">Credit Hours</p>
              </div>
              <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-white">{grade.tuition > 0 ? `${grade.tuition} bricks` : 'Free'}</p>
                <p className="text-[9px] text-[#6B7280]">Tuition</p>
              </div>
              <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-[#f59e0b]">{grade.castleGate}</p>
                <p className="text-[9px] text-[#6B7280]">Castle Gate</p>
              </div>
              <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
                <p className="text-sm font-bold text-white">{grade.castleCreature}</p>
                <p className="text-[9px] text-[#6B7280]">Guardian</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#6B7280]">Grade Progress</span>
                <span className="text-[10px] text-[#f59e0b] font-bold">{progress}%</span>
              </div>
              <div className="h-2 bg-[#050810] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#7096D1] to-[#f59e0b] rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] text-[#6B7280] mb-2">Skills Earned:</p>
              <div className="flex flex-wrap gap-2">
                {grade.skillsEarned.map((skill, i) => (
                  <span key={i} className="text-[10px] bg-[#7096D1]/10 text-[#7096D1] px-2 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-3">
              <p className="text-[10px] text-[#f59e0b] font-semibold mb-1">Real-World Value</p>
              <p className="text-[11px] text-[#A0AEC0]">{grade.realWorldValue}</p>
            </div>
          </div>

          {/* Tests */}
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-[#ec4899]" />
              <h3 className="text-sm font-bold text-white">Tests — Pass {grade.passRate}% each</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Array.from({ length: grade.testsRequired }, (_, i) => {
                const testPassed = (completion?.testsPassed || 0) > i;
                return (
                  <button
                    key={i}
                    onClick={() => !testPassed && !passed && startTest(i)}
                    disabled={testPassed || passed}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      testPassed || passed
                        ? 'bg-emerald-500/5 border-emerald-500/15'
                        : 'bg-[#050810] border-white/[0.04] hover:border-[#7096D1]/30'
                    }`}
                  >
                    <p className={`text-sm font-bold ${testPassed || passed ? 'text-emerald-400' : 'text-white'}`}>Test {i + 1}</p>
                    <p className="text-[9px] text-[#6B7280]">{testPassed || passed ? 'Passed ✓' : 'Take Test'}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Battles Required */}
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-[#f97316]" />
              <h3 className="text-sm font-bold text-white">Cotton Brick Road Battles</h3>
            </div>
            <p className="text-xs text-[#A0AEC0] mb-3">
              You must win battles on Cotton Brick Road to prove your readiness for the Castle.
              Each win earns gas and bricks. Each loss risks freezing.
            </p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-2 bg-[#050810] rounded-full overflow-hidden">
                <div className="h-full bg-[#f97316] rounded-full transition-all" style={{ width: `${getGradeBattleProgress(profile, grade.id)}%` }} />
              </div>
              <span className="text-[10px] text-[#f97316] font-bold">{completion?.battlesWon || 0} / {completion?.battlesRequired || 1} won</span>
            </div>
            <a
              href="#/cottonbrickroad"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f97316]/10 hover:bg-[#f97316]/20 text-[#f97316] text-xs font-semibold rounded-xl transition-colors no-underline"
            >
              <Flame size={14} /> Go Battle on Cotton Brick Road
            </a>
          </div>

          {/* Castle Gate */}
          {castleReady && !passed && (
            <div className="bg-gradient-to-br from-[#0A0F1E] to-[#081F5C]/20 border border-[#f59e0b]/20 rounded-2xl p-5 text-center">
              <Crown size={24} className="text-[#f59e0b] mx-auto mb-2" />
              <h3 className="text-sm font-bold text-white mb-1">{grade.castleGate} is Open!</h3>
              <p className="text-xs text-[#A0AEC0] mb-3">Defeat {grade.castleCreature} to earn your certification and unlock the next grade.</p>
              <button
                onClick={() => setView('castle')}
                className="px-5 py-2.5 bg-[#f59e0b] hover:bg-[#f59e0b]/80 text-black text-sm font-bold rounded-xl transition-colors cursor-pointer"
              >
                Enter the Castle
              </button>
            </div>
          )}

          {passed && (
            <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 text-center">
              <Trophy size={24} className="text-emerald-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-emerald-400">Grade Complete!</h3>
              <p className="text-xs text-[#A0AEC0] mt-1">
                {grade.jamziaCertification
                  ? `Earned: ${grade.jamziaCertification}`
                  : 'On to the next challenge!'}
              </p>
              {grade.nextGradeId && (
                <p className="text-[10px] text-[#f59e0b] mt-2">Next: {getGradeById(grade.nextGradeId)?.name}</p>
              )}
            </div>
          )}
        </>
      )}

      {view === 'test' && (
        <TestView
          grade={grade}
          testIndex={activeTest}
          profile={profile}
          onComplete={(score) => { handleTestComplete(score); setView('info'); }}
          onExit={() => setView('info')}
        />
      )}

      {view === 'castle' && (
        <CastleGate
          grade={grade}
          profile={profile}
          onDefeat={(score) => handleCastleDefeat(score)}
          onExit={() => setView('info')}
        />
      )}
    </div>
  );
}

/* ═══════ MAIN PAGE ═══════ */
export default function JamLearn() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile());
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [phaseFilter, setPhaseFilter] = useState<string>('all');

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const currentGrade = getCurrentGrade(profile);
  const phases = ['early', 'elementary', 'middle', 'high', 'college', 'postgrad'];

  const filteredGrades = phaseFilter === 'all'
    ? GRADE_LEVELS
    : GRADE_LEVELS.filter(g => g.phase === phaseFilter);

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3">
            <img src="/ar/mrs-cotton-crest.jpg" alt="Mrs. Cotton's Academy Crest" className="w-10 h-10 rounded-xl object-cover shrink-0" />
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">Mrs. Cotton's Academy</h1>
              <p className="text-[10px] text-[#6B7280]">Faith • Knowledge • Character — The Winston School, NJ</p>
            </div>
            <a
              href="#/profile"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7096D1]/10 hover:bg-[#7096D1]/20 text-[#7096D1] text-[10px] rounded-lg transition-colors no-underline"
            >
              <Star size={10} /> View Profile
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Current Status Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#081F5C]/20 to-[#0A0F1E] border border-[#7096D1]/20 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7096D1] to-[#f59e0b] flex items-center justify-center shrink-0">
              <Map size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] bg-[#7096D1]/15 text-[#7096D1] px-2 py-0.5 rounded-full font-bold">Current Position</span>
                {profile.phonicsMasteryCompleted && (
                  <span className="text-[10px] bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-0.5 rounded-full">Phonics Master</span>
                )}
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{currentGrade.name}</h2>
              <p className="text-xs text-[#A0AEC0] mb-3">
                You are on Cotton Brick Road at the <span className="text-[#f59e0b]">{currentGrade.phaseLabel}</span> stage.
                {currentGrade.phonicsMasteryRequired && (
                  <span className="text-[#ec4899]"> Phonics Mastery required to advance.</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] bg-[#050810] border border-white/[0.06] text-white px-2 py-1 rounded-full">{profile.totalBricks} bricks</span>
                <span className="text-[10px] bg-[#050810] border border-white/[0.06] text-white px-2 py-1 rounded-full">{profile.battlesWon} battles</span>
                <span className="text-[10px] bg-[#050810] border border-white/[0.06] text-white px-2 py-1 rounded-full">{profile.streakDays} day streak</span>
                <span className="text-[10px] bg-[#050810] border border-white/[0.06] text-white px-2 py-1 rounded-full">{profile.certifications.length} certs</span>
                <span className="text-[10px] bg-[#050810] border border-white/[0.06] text-white px-2 py-1 rounded-full">{profile.creditHoursEarned} credits</span>
                <span className="text-[10px] bg-[#050810] border border-white/[0.06] text-white px-2 py-1 rounded-full">GPA {profile.lifetimeGpa.toFixed(2)}</span>
              </div>
            </div>
            <a
              href="#/cottonbrickroad"
              className="shrink-0 flex items-center gap-2 px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-xl hover:bg-[#f59e0b]/20 transition-colors no-underline"
            >
              <Flame size={14} /> Enter Cotton Brick Road
            </a>
          </div>
        </div>

        {/* Phonics Mastery Banner for early grades */}
        {!profile.phonicsMasteryCompleted && currentGrade.phase === 'early' && (
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#ec4899]/10 to-[#0A0F1E] border border-[#ec4899]/20 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <img src="/ar/mrs-cotton-crest.jpg" alt="Mrs. Cotton's Academy Crest" className="w-14 h-14 rounded-xl object-cover shrink-0" />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-1">Mrs. Cotton's Phonics Mastery</h2>
                <p className="text-xs text-[#A0AEC0] mb-3">
                  Before you can enter <span className="text-white font-semibold">1st Grade</span>, you must complete 
                  the Phonics Masterclass at <span className="text-[#f59e0b] font-semibold">Mrs. Cotton's Academy — The Winston School, NJ</span>. 
                  Faith • Knowledge • Character. This is your foundation for all future learning.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-[#ec4899]/10 text-[#ec4899] px-2 py-1 rounded-full">Word-Picture Association</span>
                  <span className="text-[10px] bg-[#ec4899]/10 text-[#ec4899] px-2 py-1 rounded-full">43 Years of Excellence</span>
                  <span className="text-[10px] bg-[#ec4899]/10 text-[#ec4899] px-2 py-1 rounded-full">Required for Grade 1+</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const updated = completePhonicsMastery(profile);
                  setProfile(updated);
                }}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#ec4899] hover:bg-[#ec4899]/80 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <GraduationCap size={14} /> Complete Phonics Mastery
              </button>
            </div>
          </div>
        )}

        {selectedGrade ? (
          <GradeDetail
            grade={selectedGrade}
            profile={profile}
            onBack={() => setSelectedGrade(null)}
            onProfileUpdate={(p) => setProfile(p)}
          />
        ) : (
          <>
            {/* Phase Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setPhaseFilter('all')}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  phaseFilter === 'all' ? 'bg-white/[0.08] text-white' : 'text-[#6B7280] hover:text-white'
                }`}
              >
                All Phases
              </button>
              {phases.map(phase => {
                const meta = PHASE_META[phase];
                return (
                  <button
                    key={phase}
                    onClick={() => setPhaseFilter(phase)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      phaseFilter === phase ? 'bg-white/[0.08] text-white' : 'text-[#6B7280] hover:text-white'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
                    {meta.label}
                  </button>
                );
              })}
            </div>

            {/* Grade Cards */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#f59e0b]" />
                  <h3 className="text-sm font-bold text-white">
                    {phaseFilter === 'all' ? 'Full Grade Ladder' : PHASE_META[phaseFilter].label}
                  </h3>
                </div>
                <span className="text-[10px] text-[#6B7280]">
                  {filteredGrades.filter(g => profile.gradeCompletions.find(c => c.gradeId === g.id)?.passed).length}/{filteredGrades.length} completed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredGrades.map(grade => (
                  <GradeCard
                    key={grade.id}
                    grade={grade}
                    profile={profile}
                    onSelect={setSelectedGrade}
                  />
                ))}
              </div>
            </div>

            {/* Rules Reminder */}
            <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-400 mb-1">Academy Rules — All Answers Tracked</p>
                  <ul className="text-[11px] text-[#A0AEC0] space-y-1">
                    <li>• Everyone starts at <span className="text-white font-semibold">Nursery School</span></li>
                    <li>• <span className="text-[#ec4899] font-semibold">Complete Phonics Mastery</span> before Grade 1 — no exceptions</li>
                    <li>• Pass every test (≥ pass rate%) AND win required battles on Cotton Brick Road to unlock the Castle</li>
                    <li>• Defeat the Castle Guardian to earn certification and advance to the next grade</li>
                    <li>• <span className="text-[#f59e0b] font-semibold">Credit Hours:</span> Min {MIN_CREDIT_HOURS}, Max {MAX_CREDIT_HOURS} per semester</li>
                    <li>• <span className="text-[#f59e0b] font-semibold">Report Cards</span> every 6 weeks — GPA matters for scholarships</li>
                    <li>• <span className="text-[#f59e0b] font-semibold">Freeze?</span> Buy your spot back with bricks or battle harder</li>
                    <li>• <span className="text-[#f59e0b] font-semibold">Play to Stay, Play to Grow, Play to Earn</span></li>
                    <li>• All quiz answers are recorded in your permanent <a href="#/profile" className="text-[#7096D1] no-underline">JamProfile</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
