/* ═══════════════════════════════════════════════════════════
   JamZia™ Progress & Profile Engine v2
   Report Cards • Credit Hours • GPA • Tuition • Scholarships
   Gas • Freeze Recovery • Phonics Mastery Gate
   "Study hard. Play harder. Earn everything."
   ═══════════════════════════════════════════════════════════ */

import { GRADE_LEVELS, type GradeLevel } from './gradeProgression';

/* ── Types ── */
export interface QuizRecord {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  wasCorrect: boolean;
  gradeId: string;
  testId: string;
  timestamp: number;
  topic: string;
}

export interface GradeCompletion {
  gradeId: string;
  passed: boolean;
  testsPassed: number;
  testsTotal: number;
  bestScore: number;
  completedAt: number | null;
  castleDefeated: boolean;
  attempts: number;
  battlesWon: number; // Battles won during this grade
  battlesRequired: number; // Battles needed to advance
}

export interface Certification {
  id: string;
  name: string;
  gradeId: string;
  earnedAt: number;
  honorLevel: 'standard' | 'honors' | 'high-honors';
}

export interface ReportCard {
  id: string;
  period: number; // 1-6 for the 6 grading periods
  periodLabel: string;
  year: number;
  grades: {
    gradeId: string;
    gradeName: string;
    letterGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    score: number;
    creditHours: number;
    comments: string;
  }[];
  gpa: number;
  creditHoursAttempted: number;
  creditHoursEarned: number;
  issuedAt: number;
  deanComment: string;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  reason: string;
  earnedAt: number;
}

export interface UserProfile {
  currentGradeId: string;
  highestGradeReached: string;
  totalBricks: number;
  quizHistory: QuizRecord[];
  gradeCompletions: GradeCompletion[];
  certifications: Certification[];
  skillsMastered: string[];
  streakDays: number;
  lastStudyDate: string;
  totalStudyMinutes: number;
  battlesWon: number;
  battlesLost: number;
  castleConquests: number;
  /* ── NEW v2 ── */
  reportCards: ReportCard[];
  creditHoursEarned: number;
  creditHoursAttempted: number;
  lifetimeGpa: number;
  scholarships: Scholarship[];
  totalScholarshipAmount: number;
  tuitionPaid: number;
  gasBalance: number;
  phonicsMasteryCompleted: boolean;
  freezeRecoveryCount: number;
  semesterEnrolled: string; // e.g. "Fall 2026"
}

const STORAGE_KEY = 'jamzia_profile_v2';

export const SEMESTER_NAMES = ['Fall', 'Spring', 'Summer'] as const;
export const MIN_CREDIT_HOURS = 3;
export const MAX_CREDIT_HOURS = 21;
export const REPORT_CARD_WEEKS = 6; // Real-world weeks
export const GAS_COST_PER_BATTLE = 5;
export const FREEZE_RECOVERY_COST = 50; // bricks
export const F_GRADE_RECOVERY_COST = 100; // bricks

/* ── Default Profile ── */
export function getDefaultProfile(): UserProfile {
  return {
    currentGradeId: 'nursery',
    highestGradeReached: 'nursery',
    totalBricks: 50, // Starter bricks
    quizHistory: [],
    gradeCompletions: GRADE_LEVELS.map((g) => ({
      gradeId: g.id,
      passed: false,
      testsPassed: 0,
      testsTotal: g.testsRequired,
      bestScore: 0,
      completedAt: null,
      castleDefeated: false,
      attempts: 0,
      battlesWon: 0,
      battlesRequired: Math.max(1, Math.floor(g.testsRequired / 2)),
    })),
    certifications: [],
    skillsMastered: [],
    streakDays: 0,
    lastStudyDate: '',
    totalStudyMinutes: 0,
    battlesWon: 0,
    battlesLost: 0,
    castleConquests: 0,
    /* ── NEW v2 ── */
    reportCards: [],
    creditHoursEarned: 0,
    creditHoursAttempted: 0,
    lifetimeGpa: 0,
    scholarships: [],
    totalScholarshipAmount: 0,
    tuitionPaid: 0,
    gasBalance: 20, // Starter gas
    phonicsMasteryCompleted: false,
    freezeRecoveryCount: 0,
    semesterEnrolled: getCurrentSemester(),
  };
}

/* ── Semester Utils ── */
export function getCurrentSemester(): string {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let sem = 'Fall';
  if (month >= 0 && month <= 4) sem = 'Spring';
  else if (month >= 5 && month <= 7) sem = 'Summer';
  return `${sem} ${year}`;
}

export function getCurrentReportPeriod(): { period: number; label: string } {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const week = Math.floor(dayOfYear / 7);
  const period = Math.min(Math.max(1, Math.floor((week % 36) / 6) + 1), 6);
  return { period, label: `Period ${period} (Weeks ${(period - 1) * 6 + 1}-${period * 6})` };
}

/* ── Persistence ── */
export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProfile();
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    // Merge defaults for new v2 fields
    const defaults = getDefaultProfile();
    return {
      ...defaults,
      ...parsed,
      reportCards: parsed.reportCards || defaults.reportCards,
      creditHoursEarned: parsed.creditHoursEarned ?? defaults.creditHoursEarned,
      creditHoursAttempted: parsed.creditHoursAttempted ?? defaults.creditHoursAttempted,
      lifetimeGpa: parsed.lifetimeGpa ?? defaults.lifetimeGpa,
      scholarships: parsed.scholarships || defaults.scholarships,
      totalScholarshipAmount: parsed.totalScholarshipAmount ?? defaults.totalScholarshipAmount,
      tuitionPaid: parsed.tuitionPaid ?? defaults.tuitionPaid,
      gasBalance: parsed.gasBalance ?? defaults.gasBalance,
      phonicsMasteryCompleted: parsed.phonicsMasteryCompleted ?? defaults.phonicsMasteryCompleted,
      freezeRecoveryCount: parsed.freezeRecoveryCount ?? defaults.freezeRecoveryCount,
      semesterEnrolled: parsed.semesterEnrolled || defaults.semesterEnrolled,
    };
  } catch {
    return getDefaultProfile();
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/* ── Letter Grade Converter ── */
export function scoreToLetterGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

export function letterGradeToPoints(grade: 'A' | 'B' | 'C' | 'D' | 'F'): number {
  const map = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };
  return map[grade];
}

export function calculateGPA(
  records: { letterGrade: 'A' | 'B' | 'C' | 'D' | 'F'; creditHours: number }[]
): number {
  if (records.length === 0) return 0;
  let totalPoints = 0;
  let totalHours = 0;
  records.forEach((r) => {
    totalPoints += letterGradeToPoints(r.letterGrade) * r.creditHours;
    totalHours += r.creditHours;
  });
  return totalHours > 0 ? Math.round((totalPoints / totalHours) * 100) / 100 : 0;
}

/* ── Report Card ── */
export function generateReportCard(profile: UserProfile): UserProfile {
  const { period, label } = getCurrentReportPeriod();
  const year = new Date().getFullYear();
  const rcId = `rc-${year}-${period}-${Date.now()}`;

  // Build grades for all completed grades this period
  const grades = profile.gradeCompletions
    .filter((c) => c.testsPassed > 0)
    .map((c) => {
      const g = getGradeById(c.gradeId);
      const score = c.bestScore;
      const letter = scoreToLetterGrade(score);
      const ch = g?.creditHours || 3;
      return {
        gradeId: c.gradeId,
        gradeName: g?.name || c.gradeId,
        letterGrade: letter,
        score,
        creditHours: ch,
        comments:
          letter === 'A'
            ? 'Outstanding mastery demonstrated'
            : letter === 'B'
              ? 'Strong performance, keep climbing'
              : letter === 'C'
                ? 'Satisfactory — review weak areas'
                : letter === 'D'
                  ? 'Below expectations — seek a Guardian Mentor'
                  : 'FAIL — You are FROZEN. Buy back or battle to recover.',
      };
    });

  const chAttempted = grades.reduce((s, g) => s + g.creditHours, 0);
  const chEarned = grades
    .filter((g) => g.letterGrade !== 'F')
    .reduce((s, g) => s + g.creditHours, 0);
  const gpa = calculateGPA(grades.map((g) => ({ letterGrade: g.letterGrade, creditHours: g.creditHours })));

  // Dean comment
  let deanComment = 'Keep studying and battling on Cotton Brick Road.';
  if (gpa >= 3.5) deanComment = 'Exceptional work! You are eligible for the Honors Scholarship.';
  else if (gpa >= 3.0) deanComment = 'Strong performance. You qualify for the Merit Scholarship.';
  else if (gpa >= 2.0) deanComment = 'Satisfactory progress. Consider tutoring with a Guardian Mentor.';
  else deanComment = 'ACADEMIC WARNING — You must battle more, study harder, or buy back your standing.';

  const reportCard: ReportCard = {
    id: rcId,
    period,
    periodLabel: label,
    year,
    grades,
    gpa,
    creditHoursAttempted: chAttempted,
    creditHoursEarned: chEarned,
    issuedAt: Date.now(),
    deanComment,
  };

  // Auto-award scholarships based on GPA
  let scholarships = [...profile.scholarships];
  let totalScholarship = profile.totalScholarshipAmount;
  if (gpa >= 3.5) {
    const honorScholarship: Scholarship = {
      id: `sch-honor-${Date.now()}`,
      name: 'JamZia Honors Scholarship',
      amount: 500,
      reason: `GPA ${gpa} in ${label}`,
      earnedAt: Date.now(),
    };
    scholarships.push(honorScholarship);
    totalScholarship += 500;
  } else if (gpa >= 3.0) {
    const meritScholarship: Scholarship = {
      id: `sch-merit-${Date.now()}`,
      name: 'JamZia Merit Scholarship',
      amount: 250,
      reason: `GPA ${gpa} in ${label}`,
      earnedAt: Date.now(),
    };
    scholarships.push(meritScholarship);
    totalScholarship += 250;
  }

  const updated: UserProfile = {
    ...profile,
    reportCards: [...profile.reportCards, reportCard],
    creditHoursEarned: profile.creditHoursEarned + chEarned,
    creditHoursAttempted: profile.creditHoursAttempted + chAttempted,
    lifetimeGpa:
      profile.reportCards.length > 0
        ? Math.round(
            ((profile.lifetimeGpa * profile.reportCards.length + gpa) /
              (profile.reportCards.length + 1)) *
              100
          ) / 100
        : gpa,
    scholarships,
    totalScholarshipAmount: totalScholarship,
    totalBricks: profile.totalBricks + (gpa >= 3.0 ? 25 : 10),
  };
  saveProfile(updated);
  return updated;
}

/* ── Progress Operations ── */
export function recordQuizAnswer(
  profile: UserProfile,
  record: Omit<QuizRecord, 'timestamp'>
): UserProfile {
  const updated: UserProfile = {
    ...profile,
    quizHistory: [...profile.quizHistory, { ...record, timestamp: Date.now() }],
    totalStudyMinutes: profile.totalStudyMinutes + 2,
  };
  saveProfile(updated);
  return updated;
}

export function advanceGrade(profile: UserProfile): UserProfile {
  const currentGrade = getGradeById(profile.currentGradeId);
  if (!currentGrade?.nextGradeId) return profile;

  const nextGrade = getGradeById(currentGrade.nextGradeId);
  if (!nextGrade) return profile;

  const updated: UserProfile = {
    ...profile,
    currentGradeId: nextGrade.id,
    highestGradeReached:
      nextGrade.sequence > (getGradeById(profile.highestGradeReached)?.sequence ?? -1)
        ? nextGrade.id
        : profile.highestGradeReached,
    castleConquests: profile.castleConquests + 1,
  };
  saveProfile(updated);
  return updated;
}

export function markGradeComplete(
  profile: UserProfile,
  gradeId: string,
  score: number
): UserProfile {
  const grade = getGradeById(gradeId);
  if (!grade) return profile;

  const completions = profile.gradeCompletions.map((c) =>
    c.gradeId === gradeId
      ? {
          ...c,
          passed: true,
          bestScore: Math.max(c.bestScore, score),
          completedAt: Date.now(),
          castleDefeated: true,
        }
      : c
  );

  // Add certification if grade awards one
  const certs = [...profile.certifications];
  if (grade.jamziaCertification) {
    const honorLevel =
      score >= 95 ? 'high-honors' : score >= 85 ? 'honors' : 'standard';
    certs.push({
      id: `cert-${gradeId}-${Date.now()}`,
      name: grade.jamziaCertification,
      gradeId,
      earnedAt: Date.now(),
      honorLevel,
    });
  }

  // Merge skills
  const newSkills = grade.skillsEarned.filter(
    (s) => !profile.skillsMastered.includes(s)
  );

  const updated: UserProfile = {
    ...profile,
    gradeCompletions: completions,
    certifications: certs,
    skillsMastered: [...profile.skillsMastered, ...newSkills],
    totalBricks: profile.totalBricks + 50, // Castle conquest bonus
  };
  saveProfile(updated);
  return updated;
}

export function incrementTestProgress(
  profile: UserProfile,
  gradeId: string,
  passed: boolean
): UserProfile {
  const completions = profile.gradeCompletions.map((c) =>
    c.gradeId === gradeId
      ? {
          ...c,
          testsPassed: passed
            ? Math.min(c.testsPassed + 1, c.testsTotal)
            : c.testsPassed,
          attempts: c.attempts + 1,
        }
      : c
  );
  const updated = { ...profile, gradeCompletions: completions };
  saveProfile(updated);
  return updated;
}

export function recordBattle(profile: UserProfile, won: boolean): UserProfile {
  const updated: UserProfile = {
    ...profile,
    battlesWon: profile.battlesWon + (won ? 1 : 0),
    battlesLost: profile.battlesLost + (won ? 0 : 1),
    totalBricks: profile.totalBricks + (won ? 10 : 2),
    gasBalance: profile.gasBalance + (won ? 2 : 0), // Gas reward for winning
  };
  saveProfile(updated);
  return updated;
}

export function recordGradeBattle(
  profile: UserProfile,
  gradeId: string,
  won: boolean
): UserProfile {
  const completions = profile.gradeCompletions.map((c) =>
    c.gradeId === gradeId ? { ...c, battlesWon: c.battlesWon + (won ? 1 : 0) } : c
  );
  const updated: UserProfile = {
    ...profile,
    gradeCompletions: completions,
    battlesWon: profile.battlesWon + (won ? 1 : 0),
    battlesLost: profile.battlesLost + (won ? 0 : 1),
    totalBricks: profile.totalBricks + (won ? 10 : 2),
    gasBalance: profile.gasBalance + (won ? 2 : 0),
  };
  saveProfile(updated);
  return updated;
}

export function updateStreak(profile: UserProfile): UserProfile {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let streak = profile.streakDays;
  if (profile.lastStudyDate === today) {
    // Already studied today
  } else if (profile.lastStudyDate === yesterday) {
    streak += 1;
  } else {
    streak = 1;
  }

  const updated: UserProfile = {
    ...profile,
    streakDays: streak,
    lastStudyDate: today,
  };
  saveProfile(updated);
  return updated;
}

/* ── Economy: Gas, Tuition, Recovery ── */
export function purchaseGas(profile: UserProfile, amount: number, costInBricks: number): UserProfile | null {
  if (profile.totalBricks < costInBricks) return null;
  const updated: UserProfile = {
    ...profile,
    gasBalance: profile.gasBalance + amount,
    totalBricks: profile.totalBricks - costInBricks,
  };
  saveProfile(updated);
  return updated;
}

export function payTuition(profile: UserProfile, amount: number): UserProfile | null {
  if (profile.totalBricks < amount) return null;
  const updated: UserProfile = {
    ...profile,
    tuitionPaid: profile.tuitionPaid + amount,
    totalBricks: profile.totalBricks - amount,
  };
  saveProfile(updated);
  return updated;
}

export function recoverFromFreeze(profile: UserProfile): UserProfile | null {
  if (profile.totalBricks < FREEZE_RECOVERY_COST) return null;
  const updated: UserProfile = {
    ...profile,
    totalBricks: profile.totalBricks - FREEZE_RECOVERY_COST,
    freezeRecoveryCount: profile.freezeRecoveryCount + 1,
    gasBalance: profile.gasBalance + 5, // Bonus gas for recovering
  };
  saveProfile(updated);
  return updated;
}

export function recoverFromFGrade(profile: UserProfile, gradeId: string): UserProfile | null {
  if (profile.totalBricks < F_GRADE_RECOVERY_COST) return null;
  const completions = profile.gradeCompletions.map((c) =>
    c.gradeId === gradeId
      ? {
          ...c,
          passed: false,
          testsPassed: 0,
          bestScore: 0,
          castleDefeated: false,
          battlesWon: 0,
        }
      : c
  );
  const updated: UserProfile = {
    ...profile,
    gradeCompletions: completions,
    totalBricks: profile.totalBricks - F_GRADE_RECOVERY_COST,
    freezeRecoveryCount: profile.freezeRecoveryCount + 1,
  };
  saveProfile(updated);
  return updated;
}

export function completePhonicsMastery(profile: UserProfile): UserProfile {
  const updated: UserProfile = {
    ...profile,
    phonicsMasteryCompleted: true,
    skillsMastered: [...new Set([...profile.skillsMastered, 'Phonics Mastery', 'Word-Picture Association'])],
    totalBricks: profile.totalBricks + 100,
    certifications: [
      ...profile.certifications,
      {
        id: `cert-phonics-${Date.now()}`,
        name: 'Mrs. Cotton Phonics Mastery Certificate',
        gradeId: 'nursery',
        earnedAt: Date.now(),
        honorLevel: 'high-honors',
      },
    ],
  };
  saveProfile(updated);
  return updated;
}

/* ── Computed ── */
export function getGradeProgress(profile: UserProfile, gradeId: string): number {
  const completion = profile.gradeCompletions.find((c) => c.gradeId === gradeId);
  if (!completion) return 0;
  return Math.round((completion.testsPassed / completion.testsTotal) * 100);
}

export function getGradeBattleProgress(profile: UserProfile, gradeId: string): number {
  const completion = profile.gradeCompletions.find((c) => c.gradeId === gradeId);
  if (!completion || completion.battlesRequired === 0) return 100;
  return Math.round((completion.battlesWon / completion.battlesRequired) * 100);
}

export function isGradeUnlocked(profile: UserProfile, gradeId: string): boolean {
  const grade = getGradeById(gradeId);
  if (!grade) return false;
  if (grade.sequence === 0) return true; // Nursery always open

  // Must have completed previous grade
  const prev = grade.prevGradeId
    ? profile.gradeCompletions.find((c) => c.gradeId === grade.prevGradeId)
    : null;
  if (prev && !prev.passed) return false;

  // Must have Phonics Mastery if required
  if (grade.phonicsMasteryRequired) {
    const phonicsDone = profile.phonicsMasteryCompleted;
    if (!phonicsDone) return false;
  }

  return true;
}

export function isCastleUnlocked(profile: UserProfile, gradeId: string): boolean {
  const completion = profile.gradeCompletions.find((c) => c.gradeId === gradeId);
  if (!completion) return false;
  // Castle unlocks when all tests are passed AND battles won
  const testsDone = completion.testsPassed >= completion.testsTotal;
  const battlesDone = completion.battlesWon >= completion.battlesRequired;
  return testsDone && battlesDone;
}

export function canAdvanceGrade(profile: UserProfile, gradeId: string): boolean {
  const completion = profile.gradeCompletions.find((c) => c.gradeId === gradeId);
  if (!completion) return false;
  return completion.passed && completion.castleDefeated;
}

export function getPhaseProgress(profile: UserProfile): Record<string, number> {
  const result: Record<string, number> = {};
  const phases = ['early', 'elementary', 'middle', 'high', 'college', 'postgrad'];
  phases.forEach((phase) => {
    const gradesInPhase = GRADE_LEVELS.filter((g) => g.phase === phase);
    const passed = gradesInPhase.filter((g) => {
      const c = profile.gradeCompletions.find((c) => c.gradeId === g.id);
      return c?.passed;
    }).length;
    result[phase] = gradesInPhase.length > 0 ? Math.round((passed / gradesInPhase.length) * 100) : 0;
  });
  return result;
}

export function getGradeById(id: string): GradeLevel | undefined {
  return GRADE_LEVELS.find((g) => g.id === id);
}

export function getCurrentGrade(profile: UserProfile): GradeLevel {
  return getGradeById(profile.currentGradeId) || GRADE_LEVELS[0];
}

export function getHonorEmoji(honor: Certification['honorLevel']): string {
  if (honor === 'high-honors') return '🏆';
  if (honor === 'honors') return '🥇';
  return '📜';
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatCurrency(n: number): string {
  return `$${n.toLocaleString()}`;
}
