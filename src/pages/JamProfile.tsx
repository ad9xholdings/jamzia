/* ═══════════════════════════════════════════════════════════
   JamProfile™ v2 — Academic Transcript & Economy
   Report Cards • GPA • Credit Hours • Scholarships • Gas
   "Play to stay. Play to grow. Play to earn."
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import {
  User, Trophy, BookOpen, Star, Zap, Shield,
  TrendingUp, Clock, Calendar, Target, Award,
  Crown, Flame, Snowflake, Map, Lock, Unlock,
  ChevronRight, GraduationCap, Brain, Volume2,
  Fuel, DollarSign, RotateCcw,
  FileText, BarChart3,
} from 'lucide-react';
import {
  GRADE_LEVELS, getPhaseColor,
} from '../config/gradeProgression';
import {
  loadProfile, type UserProfile,
  getGradeProgress, isGradeUnlocked, isCastleUnlocked,
  getPhaseProgress, getCurrentGrade, getHonorEmoji, formatDate,
  generateReportCard, recoverFromFreeze,
  purchaseGas, FREEZE_RECOVERY_COST,
} from '../config/progressEngine';

/* ── Profile Header ── */
function ProfileHeader({ profile }: { profile: UserProfile }) {
  const current = getCurrentGrade(profile);
  const phaseProg = getPhaseProgress(profile);
  const overall = Math.round(
    Object.values(phaseProg).reduce((a, b) => a + b, 0) / 6
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0A0F1E] via-[#081F5C]/20 to-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#7096D1]/5 rounded-full blur-3xl" />

      <div className="relative flex flex-col sm:flex-row items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7096D1] to-[#f59e0b] flex items-center justify-center shrink-0">
          <User size={32} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-white">JamZia Learner</h2>
            <span className="text-[10px] bg-[#7096D1]/10 text-[#7096D1] px-2 py-0.5 rounded-full">{current.shortName}</span>
            {profile.phonicsMasteryCompleted && (
              <span className="text-[10px] bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-0.5 rounded-full">Phonics Master</span>
            )}
          </div>
          <p className="text-xs text-[#A0AEC0] mb-2">
            Currently enrolled in <span className="text-white font-semibold">{current.name}</span>
            <span className="text-[#6B7280]"> — {current.phaseLabel} • {profile.semesterEnrolled}</span>
          </p>

          {/* GPA Banner */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/15 px-2.5 py-1 rounded-full">
              <Star size={10} className="text-[#f59e0b]" />
              <span className="text-[10px] font-bold text-[#f59e0b]">GPA {profile.lifetimeGpa.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/15 px-2.5 py-1 rounded-full">
              <BookOpen size={10} className="text-[#22c55e]" />
              <span className="text-[10px] font-bold text-[#22c55e]">{profile.creditHoursEarned} / {profile.creditHoursAttempted} Credits</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#06b6d4]/10 border border-[#06b6d4]/15 px-2.5 py-1 rounded-full">
              <Fuel size={10} className="text-[#06b6d4]" />
              <span className="text-[10px] font-bold text-[#06b6d4]">{profile.gasBalance} Gas</span>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-2 bg-[#050810] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7096D1] to-[#f59e0b] rounded-full transition-all" style={{ width: `${overall}%` }} />
            </div>
            <span className="text-[10px] text-[#f59e0b] font-bold">{overall}% Complete</span>
          </div>

          <div className="flex flex-wrap gap-3 text-[10px] text-[#6B7280]">
            <span className="flex items-center gap-1"><Trophy size={10} className="text-[#f59e0b]" /> {profile.certifications.length} certs</span>
            <span className="flex items-center gap-1"><Zap size={10} className="text-[#7096D1]" /> {profile.skillsMastered.length} skills</span>
            <span className="flex items-center gap-1"><Flame size={10} className="text-orange-400" /> {profile.streakDays} day streak</span>
            <span className="flex items-center gap-1"><Snowflake size={10} className="text-cyan-400" /> {profile.totalBricks} bricks</span>
            <span className="flex items-center gap-1"><Target size={10} className="text-emerald-400" /> {profile.battlesWon} battles won</span>
            <span className="flex items-center gap-1"><DollarSign size={10} className="text-[#f59e0b]" /> {profile.totalScholarshipAmount} scholarships</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Economy & Recovery Panel ── */
function EconomyPanel({ profile, onUpdate }: { profile: UserProfile; onUpdate: (p: UserProfile) => void }) {
  const [msg, setMsg] = useState('');

  const doRecoverFreeze = () => {
    const updated = recoverFromFreeze(profile);
    if (!updated) {
      setMsg(`Need ${FREEZE_RECOVERY_COST} bricks to recover. Battle more!`);
      return;
    }
    onUpdate(updated);
    setMsg('Freeze recovered! +5 bonus gas. Keep battling!');
    setTimeout(() => setMsg(''), 3000);
  };

  const doBuyGas = () => {
    const updated = purchaseGas(profile, 10, 20);
    if (!updated) {
      setMsg('Need 20 bricks to buy 10 gas.');
      return;
    }
    onUpdate(updated);
    setMsg('Gas purchased! +10 gas.');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Fuel size={16} className="text-[#06b6d4]" />
        <h3 className="text-sm font-bold text-white">Economy & Recovery</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
          <p className="text-sm font-bold text-cyan-400">{profile.gasBalance}</p>
          <p className="text-[9px] text-[#6B7280]">Gas Balance</p>
        </div>
        <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
          <p className="text-sm font-bold text-[#f59e0b]">{profile.totalBricks}</p>
          <p className="text-[9px] text-[#6B7280]">Bricks</p>
        </div>
        <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
          <p className="text-sm font-bold text-emerald-400">${profile.totalScholarshipAmount}</p>
          <p className="text-[9px] text-[#6B7280]">Scholarships</p>
        </div>
        <div className="bg-[#050810] border border-white/[0.04] rounded-lg p-2.5 text-center">
          <p className="text-sm font-bold text-white">${profile.tuitionPaid}</p>
          <p className="text-[9px] text-[#6B7280]">Tuition Paid</p>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={doBuyGas}
          className="w-full flex items-center justify-center gap-2 py-2 bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 border border-[#06b6d4]/15 text-[#06b6d4] text-xs rounded-lg transition-colors cursor-pointer"
        >
          <Fuel size={14} /> Buy 10 Gas (20 Bricks)
        </button>
        <button
          onClick={doRecoverFreeze}
          className="w-full flex items-center justify-center gap-2 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/15 text-amber-400 text-xs rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw size={14} /> Buy Back from Freeze ({FREEZE_RECOVERY_COST} Bricks)
        </button>
      </div>

      {msg && (
        <p className="mt-2 text-[10px] text-center text-[#f59e0b]">{msg}</p>
      )}

      <div className="mt-3 p-2.5 bg-[#050810] border border-white/[0.04] rounded-lg">
        <p className="text-[10px] text-[#6B7280]">
          <strong className="text-white">Play to Stay:</strong> Win battles for gas. Buy gas with bricks. 
          Pay tuition to unlock higher grades. Earn scholarships for high GPA.
        </p>
      </div>
    </div>
  );
}

/* ── Report Cards ── */
function ReportCardsPanel({ profile, onUpdate }: { profile: UserProfile; onUpdate: (p: UserProfile) => void }) {
  const [msg, setMsg] = useState('');

  const generate = () => {
    const updated = generateReportCard(profile);
    onUpdate(updated);
    const latest = updated.reportCards[updated.reportCards.length - 1];
    setMsg(`Report Card generated! GPA: ${latest.gpa} • ${latest.creditHoursEarned} credits earned`);
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[#ec4899]" />
          <h3 className="text-sm font-bold text-white">Report Cards</h3>
        </div>
        <button
          onClick={generate}
          className="px-3 py-1.5 bg-[#ec4899]/10 hover:bg-[#ec4899]/20 text-[#ec4899] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
        >
          Generate New
        </button>
      </div>

      {msg && <p className="text-[10px] text-[#f59e0b] mb-2">{msg}</p>}

      {profile.reportCards.length === 0 ? (
        <p className="text-xs text-[#6B7280] text-center py-4">
          No report cards yet. Take tests and battle on Cotton Brick Road, then generate your first report card!
        </p>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {profile.reportCards.slice().reverse().map((rc) => (
            <div key={rc.id} className="p-3 bg-[#050810] border border-white/[0.04] rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-bold text-white">Period {rc.period} — {rc.year}</p>
                  <p className="text-[9px] text-[#6B7280]">{rc.periodLabel}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#f59e0b]">GPA {rc.gpa.toFixed(2)}</p>
                  <p className="text-[9px] text-[#6B7280]">{rc.creditHoursEarned} / {rc.creditHoursAttempted} cr</p>
                </div>
              </div>

              <div className="space-y-1 mb-2">
                {rc.grades.map((g) => (
                  <div key={g.gradeId} className="flex items-center justify-between text-[10px]">
                    <span className="text-[#A0AEC0]">{g.gradeName}</span>
                    <span className={`font-bold ${
                      g.letterGrade === 'A' ? 'text-emerald-400' :
                      g.letterGrade === 'B' ? 'text-[#7096D1]' :
                      g.letterGrade === 'C' ? 'text-[#f59e0b]' :
                      g.letterGrade === 'D' ? 'text-orange-400' :
                      'text-rose-400'
                    }`}>{g.letterGrade} ({g.score}%)</span>
                  </div>
                ))}
              </div>

              <p className="text-[9px] text-[#6B7280] italic">"{rc.deanComment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Scholarships ── */
function ScholarshipsPanel({ profile }: { profile: UserProfile }) {
  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign size={16} className="text-[#f59e0b]" />
        <h3 className="text-sm font-bold text-white">Scholarships — ${profile.totalScholarshipAmount}</h3>
      </div>
      {profile.scholarships.length === 0 ? (
        <p className="text-xs text-[#6B7280] text-center py-4">
          No scholarships yet. Earn a GPA of 3.0+ on your report card to qualify!
        </p>
      ) : (
        <div className="space-y-2">
          {profile.scholarships.slice().reverse().map((sch) => (
            <div key={sch.id} className="flex items-center gap-3 p-3 bg-[#050810] border border-white/[0.04] rounded-xl">
              <span className="text-lg">🏆</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">{sch.name}</p>
                <p className="text-[10px] text-[#6B7280]">{sch.reason}</p>
              </div>
              <span className="text-[10px] font-bold text-[#f59e0b]">${sch.amount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Phase Progress ── */
function PhaseOverview({ profile }: { profile: UserProfile }) {
  const phases = [
    { key: 'early', label: 'Early Childhood', icon: Volume2, grades: GRADE_LEVELS.filter(g => g.phase === 'early') },
    { key: 'elementary', label: 'Elementary', icon: BookOpen, grades: GRADE_LEVELS.filter(g => g.phase === 'elementary') },
    { key: 'middle', label: 'Middle School', icon: Brain, grades: GRADE_LEVELS.filter(g => g.phase === 'middle') },
    { key: 'high', label: 'High School', icon: Star, grades: GRADE_LEVELS.filter(g => g.phase === 'high') },
    { key: 'college', label: 'College', icon: GraduationCap, grades: GRADE_LEVELS.filter(g => g.phase === 'college') },
    { key: 'postgrad', label: 'Graduate/Doctoral', icon: Crown, grades: GRADE_LEVELS.filter(g => g.phase === 'postgrad') },
  ];

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Map size={16} className="text-[#7096D1]" />
        <h3 className="text-sm font-bold text-white">Academic Journey Map</h3>
      </div>
      <div className="space-y-3">
        {phases.map((phase) => {
          const passed = phase.grades.filter(g => profile.gradeCompletions.find(c => c.gradeId === g.id)?.passed).length;
          const total = phase.grades.length;
          const pct = Math.round((passed / total) * 100);
          const color = getPhaseColor(phase.key);
          const isActive = phase.grades.some(g => g.id === profile.currentGradeId);

          return (
            <div key={phase.key} className={`p-3 rounded-xl border transition-all ${isActive ? 'border-white/[0.1] bg-white/[0.02]' : 'border-white/[0.03]'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                  <phase.icon size={16} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-white">{phase.label}</p>
                    <span className="text-[10px] text-[#6B7280]">{passed}/{total} completed</span>
                  </div>
                  <div className="h-1.5 bg-[#050810] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                </div>
                <span className="text-[10px] font-bold shrink-0" style={{ color }}>{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Grade Detail Cards ── */
function GradeLadder({ profile }: { profile: UserProfile }) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('early');

  const phases = ['early', 'elementary', 'middle', 'high', 'college', 'postgrad'];
  const phaseNames: Record<string, string> = {
    early: 'Early Childhood', elementary: 'Elementary School', middle: 'Middle School',
    high: 'High School', college: 'College', postgrad: 'Graduate & Doctoral',
  };

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-[#f59e0b]" />
        <h3 className="text-sm font-bold text-white">Grade Ladder — {GRADE_LEVELS.length} Levels</h3>
      </div>

      <div className="space-y-2">
        {phases.map((phase) => {
          const grades = GRADE_LEVELS.filter(g => g.phase === phase);
          const isOpen = expandedPhase === phase;
          const color = getPhaseColor(phase);

          return (
            <div key={phase}>
              <button
                onClick={() => setExpandedPhase(isOpen ? null : phase)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#050810] border border-white/[0.04] hover:border-white/[0.08] transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs font-semibold text-white">{phaseNames[phase]}</span>
                  <span className="text-[10px] text-[#6B7280]">({grades.length} levels)</span>
                </div>
                <ChevronRight size={14} className={`text-[#6B7280] transition-transform ${isOpen ? 'rotate-90' : ''}`} />
              </button>

              {isOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-white/[0.04] space-y-1">
                  {grades.map((grade) => {
                    const unlocked = isGradeUnlocked(profile, grade.id);
                    const progress = getGradeProgress(profile, grade.id);
                    const battleProgress = (() => {
                      const c = profile.gradeCompletions.find(c => c.gradeId === grade.id);
                      if (!c || c.battlesRequired === 0) return 100;
                      return Math.round((c.battlesWon / c.battlesRequired) * 100);
                    })();
                    const completion = profile.gradeCompletions.find(c => c.gradeId === grade.id);
                    const passed = completion?.passed;
                    const castleReady = isCastleUnlocked(profile, grade.id);
                    const isCurrent = profile.currentGradeId === grade.id;

                    return (
                      <div
                        key={grade.id}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                          passed ? 'bg-emerald-500/5 border border-emerald-500/10' :
                          isCurrent ? 'bg-[#7096D1]/5 border border-[#7096D1]/15' :
                          unlocked ? 'bg-[#050810] border border-white/[0.03]' :
                          'bg-[#050810]/50 border border-white/[0.02] opacity-50'
                        }`}
                      >
                        <div className="shrink-0">
                          {passed ? <Unlock size={12} className="text-emerald-400" /> :
                           castleReady ? <Shield size={12} className="text-[#f59e0b]" /> :
                           unlocked ? <Lock size={12} className="text-[#6B7280]" /> :
                           <Lock size={12} className="text-[#6B7280]/50" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-[11px] font-semibold truncate ${passed ? 'text-emerald-400' : isCurrent ? 'text-[#7096D1]' : 'text-white'}`}>
                              {grade.name}
                            </p>
                            {passed && <Star size={10} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />}
                            {isCurrent && <span className="text-[8px] bg-[#7096D1]/10 text-[#7096D1] px-1 rounded-full shrink-0">ACTIVE</span>}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex-1 h-1 bg-[#0A0F1E] rounded-full overflow-hidden max-w-[60px]">
                              <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: passed ? '#22c55e' : isCurrent ? '#7096D1' : '#6B7280' }} />
                            </div>
                            <span className="text-[9px] text-[#6B7280]">T:{progress}%</span>
                            <div className="flex-1 h-1 bg-[#0A0F1E] rounded-full overflow-hidden max-w-[60px]">
                              <div className="h-full rounded-full" style={{ width: `${battleProgress}%`, backgroundColor: passed ? '#22c55e' : '#f97316' }} />
                            </div>
                            <span className="text-[9px] text-[#6B7280]">B:{battleProgress}%</span>
                            {castleReady && !passed && (
                              <span className="text-[8px] text-[#f59e0b]">🏰 Castle</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Certifications ── */
function CertificationsPanel({ profile }: { profile: UserProfile }) {
  if (profile.certifications.length === 0) {
    return (
      <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Award size={16} className="text-[#f59e0b]" />
          <h3 className="text-sm font-bold text-white">Certifications</h3>
        </div>
        <p className="text-xs text-[#6B7280] text-center py-4">
          No certifications yet. Complete grades to earn your first JamZia certificate!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Award size={16} className="text-[#f59e0b]" />
        <h3 className="text-sm font-bold text-white">Certifications — {profile.certifications.length}</h3>
      </div>
      <div className="space-y-2">
        {profile.certifications.map((cert) => (
          <div key={cert.id} className="flex items-center gap-3 p-3 bg-[#050810] border border-white/[0.04] rounded-xl">
            <span className="text-lg">{getHonorEmoji(cert.honorLevel)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{cert.name}</p>
              <p className="text-[10px] text-[#6B7280]">Earned {formatDate(cert.earnedAt)}</p>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full capitalize ${
              cert.honorLevel === 'high-honors' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
              cert.honorLevel === 'honors' ? 'bg-emerald-500/10 text-emerald-400' :
              'bg-[#6B7280]/10 text-[#6B7280]'
            }`}>{cert.honorLevel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Skills Mastered ── */
function SkillsPanel({ profile }: { profile: UserProfile }) {
  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={16} className="text-[#7096D1]" />
        <h3 className="text-sm font-bold text-white">Skills Mastered — {profile.skillsMastered.length}</h3>
      </div>
      {profile.skillsMastered.length === 0 ? (
        <p className="text-xs text-[#6B7280] text-center py-4">Complete grades to unlock skills on your profile.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile.skillsMastered.map((skill, i) => (
            <span key={i} className="text-[10px] bg-[#7096D1]/10 text-[#7096D1] px-2.5 py-1 rounded-full border border-[#7096D1]/15">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Quiz History ── */
function QuizHistory({ profile }: { profile: UserProfile }) {
  const [showAll, setShowAll] = useState(false);
  const recent = showAll ? profile.quizHistory : profile.quizHistory.slice(-10);

  return (
    <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#ec4899]" />
          <h3 className="text-sm font-bold text-white">Quiz History</h3>
        </div>
        <span className="text-[10px] text-[#6B7280]">{profile.quizHistory.length} answers recorded</span>
      </div>

      {profile.quizHistory.length === 0 ? (
        <p className="text-xs text-[#6B7280] text-center py-4">No quiz history yet. Take your first test on Cotton Brick Road!</p>
      ) : (
        <>
          <div className="space-y-1.5 max-h-64 overflow-y-auto">
            {recent.map((record, i) => (
              <div key={i} className={`flex items-start gap-2 p-2 rounded-lg text-[10px] ${record.wasCorrect ? 'bg-emerald-500/5' : 'bg-rose-500/5'}`}>
                <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${record.wasCorrect ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>{record.wasCorrect ? '✓' : '✗'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#A0AEC0] truncate">{record.question}</p>
                  <p className="text-[#6B7280]">Your answer: <span className={record.wasCorrect ? 'text-emerald-400' : 'text-rose-400'}>{record.userAnswer}</span></p>
                </div>
                <span className="text-[9px] text-[#6B7280] shrink-0">{formatDate(record.timestamp)}</span>
              </div>
            ))}
          </div>
          {profile.quizHistory.length > 10 && (
            <button onClick={() => setShowAll(!showAll)} className="w-full mt-2 py-1.5 text-[10px] text-[#7096D1] hover:text-white transition-colors cursor-pointer">
              {showAll ? 'Show recent' : `Show all ${profile.quizHistory.length} records`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

/* ── Stats ── */
function StatsGrid({ profile }: { profile: UserProfile }) {
  const stats = [
    { label: 'Study Time', value: `${Math.floor(profile.totalStudyMinutes / 60)}h ${profile.totalStudyMinutes % 60}m`, icon: Clock, color: '#7096D1' },
    { label: 'Streak', value: `${profile.streakDays} days`, icon: Flame, color: '#f97316' },
    { label: 'Battles Won', value: String(profile.battlesWon), icon: Shield, color: '#22c55e' },
    { label: 'Castles', value: String(profile.castleConquests), icon: Crown, color: '#f59e0b' },
    { label: 'Quiz Accuracy', value: profile.quizHistory.length > 0 ? `${Math.round((profile.quizHistory.filter(q => q.wasCorrect).length / profile.quizHistory.length) * 100)}%` : 'N/A', icon: Target, color: '#ec4899' },
    { label: 'Bricks', value: String(profile.totalBricks), icon: Snowflake, color: '#06b6d4' },
    { label: 'GPA', value: profile.lifetimeGpa.toFixed(2), icon: BarChart3, color: '#f59e0b' },
    { label: 'Credits', value: `${profile.creditHoursEarned}`, icon: BookOpen, color: '#22c55e' },
    { label: 'Scholarships', value: `$${profile.totalScholarshipAmount}`, icon: DollarSign, color: '#a855f7' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#050810] border border-white/[0.04] rounded-xl p-3 text-center">
          <s.icon size={16} style={{ color: s.color }} className="mx-auto mb-1" />
          <p className="text-sm font-bold text-white">{s.value}</p>
          <p className="text-[9px] text-[#6B7280]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ═══════ MAIN PAGE ═══════ */
export default function JamProfile() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile());
  const [tab, setTab] = useState<'overview' | 'ladder' | 'history' | 'reports'>('overview');

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7096D1] to-[#f59e0b] flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">JamProfile™</h1>
              <p className="text-[10px] text-[#6B7280]">Transcript, certifications, economy & report cards</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <ProfileHeader profile={profile} />
        <StatsGrid profile={profile} />

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-1">
          {([
            { key: 'overview', label: 'Overview' },
            { key: 'reports', label: 'Report Cards' },
            { key: 'ladder', label: 'Grade Ladder' },
            { key: 'history', label: 'Quiz History' },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                tab === t.key ? 'bg-[#7096D1]/15 text-[#7096D1]' : 'text-[#6B7280] hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <PhaseOverview profile={profile} />
              <EconomyPanel profile={profile} onUpdate={(p) => setProfile(p)} />
              <CertificationsPanel profile={profile} />
            </div>
            <div className="space-y-4">
              <SkillsPanel profile={profile} />
              <ScholarshipsPanel profile={profile} />
              <div className="bg-gradient-to-br from-[#0A0F1E] to-[#081F5C]/10 border border-[#f59e0b]/20 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-[#f59e0b]" />
                  <h3 className="text-sm font-bold text-white">Real-World Value</h3>
                </div>
                <p className="text-xs text-[#A0AEC0] leading-relaxed mb-3">
                  Your JamZia profile tracks every skill, test, and certification. Report cards every 6 weeks 
                  show your GPA and credit hours. While non-accredited within JamZia only, your demonstrated 
                  competencies — backed by your transcript — can be presented for real-world grants, job 
                  applications, and scholarship opportunities.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Grants', 'Jobs', 'Scholarships', 'Entrance Exams', 'Portfolio'].map(tag => (
                    <span key={tag} className="text-[10px] bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'reports' && (
          <ReportCardsPanel profile={profile} onUpdate={(p) => setProfile(p)} />
        )}

        {tab === 'ladder' && (
          <GradeLadder profile={profile} />
        )}

        {tab === 'history' && (
          <QuizHistory profile={profile} />
        )}
      </div>
    </div>
  );
}
