import { create } from 'zustand';

export interface Course {
  id: string;
  name: string;
  subject: string;
  emoji: string;
  level: 'starter' | 'challenger' | 'master' | 'legend';
  hp: number;
  maxHp: number;
  questions: Question[];
  reward: number;
  completed: boolean;
  frozen: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface KnowledgeNode {
  id: string;
  name: string;
  emoji: string;
  x: number;
  y: number;
  subject: string;
  discovered: boolean;
}

export interface PlayerState {
  heat: number;
  maxHeat: number;
  energy: number;
  maxEnergy: number;
  tokens: number;
  level: number;
  xp: number;
  streak: number;
  frozenCount: number;
  unfrozenCount: number;
  coursesCompleted: number;
}

export type MasteryPhase = 'map' | 'subjects' | 'encounter' | 'quiz' | 'frozen' | 'result' | 'profile';

interface MasteryState {
  phase: MasteryPhase;
  player: PlayerState;
  currentCourse: Course | null;
  currentQuestion: number;
  quizLog: string[];
  discoveredNodes: string[];
  completedCourses: string[];
  showPanel: boolean;

  setPhase: (p: MasteryPhase) => void;
  openPanel: () => void;
  closePanel: () => void;
  discoverNode: (id: string) => void;
  startEncounter: (course: Course) => void;
  answerQuestion: (optionIndex: number) => void;
  heatUp: () => void;
  collectReward: () => void;
  resetProgress: () => void;
}

const MATH_QUESTIONS: Question[] = [
  { id: 'm1', question: 'What is 7 × 8?', options: ['54', '56', '58', '62'], correct: 1, explanation: '7 × 8 = 56. Memorize this — it appears everywhere!' },
  { id: 'm2', question: 'What is the square root of 144?', options: ['10', '11', '12', '14'], correct: 2, explanation: '12 × 12 = 144' },
  { id: 'm3', question: 'Solve: 2x + 5 = 15', options: ['x = 4', 'x = 5', 'x = 6', 'x = 10'], correct: 1, explanation: '2x = 10, so x = 5' },
  { id: 'm4', question: 'What is 25% of 80?', options: ['15', '20', '25', '30'], correct: 1, explanation: '25% = 1/4. 80 ÷ 4 = 20' },
  { id: 'm5', question: 'What is the area of a circle with radius 3? (π ≈ 3.14)', options: ['18.84', '28.26', '9.42', '36'], correct: 1, explanation: 'Area = πr² = 3.14 × 9 = 28.26' },
];

const ENGLISH_QUESTIONS: Question[] = [
  { id: 'e1', question: 'Which is a synonym for "happy"?', options: ['sad', 'joyful', 'angry', 'tired'], correct: 1, explanation: 'Joyful means full of joy — same as happy!' },
  { id: 'e2', question: 'What is the past tense of "go"?', options: ['goed', 'gone', 'went', 'going'], correct: 2, explanation: 'I go → I went → I have gone' },
  { id: 'e3', question: 'Which sentence uses correct grammar?', options: ['They dont like apples.', 'They doesn\'t like apples.', 'They don\'t like apples.', 'They not like apples.'], correct: 2, explanation: '"Don\'t" is the correct contraction for "do not" with plural subjects' },
  { id: 'e4', question: 'What part of speech is the word "quickly"?', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], correct: 3, explanation: 'Adverbs describe HOW something is done. Quickly describes speed' },
];

const PHONICS_QUESTIONS: Question[] = [
  { id: 'p1', question: 'What sound does "ph" make in "phone"?', options: ['/p/', '/f/', '/h/', '/ph/'], correct: 1, explanation: '"ph" makes the /f/ sound — like in phone, photo, alphabet' },
  { id: 'p2', question: 'Which word has a long "a" sound?', options: ['cat', 'hat', 'cake', 'mat'], correct: 2, explanation: 'The silent "e" at the end makes the "a" say its name: c-a-k-e' },
  { id: 'p3', question: 'How many syllables in "butterfly"?', options: ['2', '3', '4', '1'], correct: 1, explanation: 'But-ter-fly = 3 syllables' },
  { id: 'p4', question: 'What sound does "sh" make?', options: ['/s/', '/h/', '/sh/', '/ch/'], correct: 2, explanation: '"sh" makes the /sh/ sound like in ship, shop, fish' },
];

const SCIENCE_QUESTIONS: Question[] = [
  { id: 's1', question: 'What is the chemical symbol for water?', options: ['O2', 'CO2', 'H2O', 'NaCl'], correct: 2, explanation: 'H2O = 2 hydrogen atoms + 1 oxygen atom' },
  { id: 's2', question: 'What planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correct: 2, explanation: 'Mercury is the closest planet to the Sun' },
  { id: 's3', question: 'What gas do plants absorb from the air?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correct: 1, explanation: 'Plants take in CO2 and release oxygen through photosynthesis' },
];

const HISTORY_QUESTIONS: Question[] = [
  { id: 'h1', question: 'In which year did the Titanic sink?', options: ['1910', '1912', '1914', '1916'], correct: 1, explanation: 'The RMS Titanic sank on April 15, 1912' },
  { id: 'h2', question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'], correct: 2, explanation: 'George Washington served from 1789 to 1797' },
];

const LANGUAGE_QUESTIONS: Question[] = [
  { id: 'l1', question: 'What does "Hola" mean in English?', options: ['Goodbye', 'Hello', 'Thank you', 'Please'], correct: 1, explanation: 'Hola = Hello in Spanish!' },
  { id: 'l2', question: 'What does "Merci" mean?', options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'], correct: 2, explanation: 'Merci = Thank you in French!' },
];

const CODING_QUESTIONS: Question[] = [
  { id: 'c1', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Mode Link'], correct: 0, explanation: 'HTML = HyperText Markup Language — the skeleton of web pages' },
  { id: 'c2', question: 'What does the "print()" function do in Python?', options: ['Saves a file', 'Displays output', 'Deletes data', 'Creates a variable'], correct: 1, explanation: 'print() displays text/output to the console' },
];

const ALL_COURSES: Course[] = [
  { id: 'math-basics', name: 'Math Fundamentals', subject: 'Math', emoji: '🔢', level: 'starter', hp: 30, maxHp: 30, questions: MATH_QUESTIONS.slice(0, 3), reward: 10, completed: false, frozen: false },
  { id: 'math-advanced', name: 'Advanced Math', subject: 'Math', emoji: '📐', level: 'challenger', hp: 50, maxHp: 50, questions: MATH_QUESTIONS.slice(2), reward: 20, completed: false, frozen: false },
  { id: 'english-basics', name: 'English Essentials', subject: 'English', emoji: '📚', level: 'starter', hp: 25, maxHp: 25, questions: ENGLISH_QUESTIONS.slice(0, 2), reward: 10, completed: false, frozen: false },
  { id: 'english-grammar', name: 'Grammar Master', subject: 'English', emoji: '✍️', level: 'challenger', hp: 45, maxHp: 45, questions: ENGLISH_QUESTIONS.slice(2), reward: 15, completed: false, frozen: false },
  { id: 'phonics-mastery', name: 'Phonics Mastery', subject: 'Phonics', emoji: '🔤', level: 'starter', hp: 20, maxHp: 20, questions: PHONICS_QUESTIONS, reward: 15, completed: false, frozen: false },
  { id: 'science-explorer', name: 'Science Explorer', subject: 'Science', emoji: '🔬', level: 'starter', hp: 35, maxHp: 35, questions: SCIENCE_QUESTIONS, reward: 15, completed: false, frozen: false },
  { id: 'history-time', name: 'Time Traveler', subject: 'History', emoji: '🏛️', level: 'challenger', hp: 40, maxHp: 40, questions: HISTORY_QUESTIONS, reward: 15, completed: false, frozen: false },
  { id: 'languages-101', name: 'World Languages', subject: 'Languages', emoji: '🌍', level: 'starter', hp: 25, maxHp: 25, questions: LANGUAGE_QUESTIONS, reward: 10, completed: false, frozen: false },
  { id: 'coding-start', name: 'Code Starter', subject: 'Coding', emoji: '💻', level: 'starter', hp: 30, maxHp: 30, questions: CODING_QUESTIONS, reward: 15, completed: false, frozen: false },
];

const NODES: KnowledgeNode[] = [
  { id: 'n1', name: 'Math Node', emoji: '🔢', x: 20, y: 30, subject: 'Math', discovered: false },
  { id: 'n2', name: 'English Node', emoji: '📚', x: 50, y: 20, subject: 'English', discovered: false },
  { id: 'n3', name: 'Phonics Node', emoji: '🔤', x: 80, y: 40, subject: 'Phonics', discovered: false },
  { id: 'n4', name: 'Science Node', emoji: '🔬', x: 30, y: 60, subject: 'Science', discovered: false },
  { id: 'n5', name: 'History Node', emoji: '🏛️', x: 70, y: 70, subject: 'History', discovered: false },
  { id: 'n6', name: 'Languages Node', emoji: '🌍', x: 15, y: 80, subject: 'Languages', discovered: false },
  { id: 'n7', name: 'Coding Node', emoji: '💻', x: 85, y: 15, subject: 'Coding', discovered: false },
  { id: 'n8', name: 'Art Node', emoji: '🎨', x: 45, y: 85, subject: 'Art', discovered: false },
  { id: 'n9', name: 'Music Node', emoji: '🎵', x: 60, y: 45, subject: 'Music', discovered: false },
];

const INITIAL_PLAYER: PlayerState = {
  heat: 100, maxHeat: 100, energy: 50, maxEnergy: 50, tokens: 50,
  level: 1, xp: 0, streak: 0, frozenCount: 0, unfrozenCount: 0, coursesCompleted: 0,
};

export const useMasteryStore = create<MasteryState>()((set, get) => ({
  phase: 'map',
  player: { ...INITIAL_PLAYER },
  currentCourse: null,
  currentQuestion: 0,
  quizLog: [],
  discoveredNodes: [],
  completedCourses: [],
  showPanel: false,

  setPhase: (p) => set({ phase: p }),
  openPanel: () => set({ showPanel: true, phase: 'map' }),
  closePanel: () => set({ showPanel: false }),

  discoverNode: (id) => {
    const s = get();
    if (!s.discoveredNodes.includes(id)) {
      set({ discoveredNodes: [...s.discoveredNodes, id] });
    }
  },

  startEncounter: (course) => {
    set({ currentCourse: { ...course, hp: course.maxHp }, currentQuestion: 0, quizLog: [`A wild ${course.name} appeared! Answer questions to master it!`], phase: 'quiz' });
  },

  answerQuestion: (optionIndex) => {
    const s = get();
    if (!s.currentCourse) return;
    const q = s.currentCourse.questions[s.currentQuestion];
    if (!q) return;

    const log: string[] = [];
    let courseHp = s.currentCourse.hp;
    let player = { ...s.player };

    if (optionIndex === q.correct) {
      const dmg = 10 + (player.level * 2);
      courseHp = Math.max(0, courseHp - dmg);
      log.push(`✅ Correct! ${q.explanation}`);
      player.streak += 1;
      player.xp += 10;

      // Level up check
      if (player.xp >= player.level * 50) {
        player.level += 1;
        player.xp = 0;
        player.maxHeat += 10;
        player.heat = player.maxHeat;
        log.push(`🎉 LEVEL UP! You are now Level ${player.level}!`);
      }

      // Streak bonus
      if (player.streak >= 3) {
        log.push(`🔥 ${player.streak}-answer streak! Bonus XP!`);
        player.tokens += 5;
      }
    } else {
      log.push(`❌ Incorrect. ${q.explanation}`);
      player.heat -= 20;
      player.streak = 0;

      if (player.heat <= 0) {
        player.heat = 0;
        player.frozenCount += 1;
        log.push(`🧊 YOU ARE FROZEN! Your knowledge needs warming up!`);
        set({
          currentCourse: { ...s.currentCourse, hp: courseHp },
          player,
          quizLog: [...s.quizLog, ...log],
          phase: 'frozen',
        });
        return;
      }
    }

    // Check if course mastered
    if (courseHp <= 0) {
      player.coursesCompleted += 1;
      player.tokens += s.currentCourse.reward;
      log.push(`🎓 COURSE MASTERED! You earned ${s.currentCourse.reward} tokens!`);
      set({
        currentCourse: { ...s.currentCourse, hp: 0, completed: true },
        player,
        completedCourses: [...s.completedCourses, s.currentCourse.id],
        quizLog: [...s.quizLog, ...log],
        phase: 'result',
      });
      return;
    }

    // Next question
    const nextQ = s.currentQuestion + 1;
    if (nextQ >= s.currentCourse.questions.length) {
      // Ran out of questions but course still has HP — regenerate or move on
      log.push(`📖 Moving to next lesson...`);
      set({
        currentCourse: { ...s.currentCourse, hp: courseHp },
        currentQuestion: 0,
        player,
        quizLog: [...s.quizLog, ...log],
      });
      return;
    }

    set({
      currentCourse: { ...s.currentCourse, hp: courseHp },
      currentQuestion: nextQ,
      player,
      quizLog: [...s.quizLog, ...log],
    });
  },

  heatUp: () => {
    const s = get();
    const cost = 5;
    if (s.player.tokens >= cost) {
      set({
        player: {
          ...s.player,
          tokens: s.player.tokens - cost,
          heat: Math.min(s.player.maxHeat, s.player.heat + 30),
          energy: Math.min(s.player.maxEnergy, s.player.energy + 10),
          unfrozenCount: s.player.unfrozenCount + (s.player.heat <= 0 ? 1 : 0),
        },
        phase: 'quiz',
        quizLog: [...s.quizLog, '🔥 You heated up! Back to learning!'],
      });
    }
  },

  collectReward: () => {
    set({ phase: 'map', currentCourse: null, currentQuestion: 0 });
  },

  resetProgress: () => set({
    phase: 'map',
    player: { ...INITIAL_PLAYER },
    currentCourse: null,
    currentQuestion: 0,
    quizLog: [],
    discoveredNodes: [],
    completedCourses: [],
  }),
}));

export { ALL_COURSES, NODES };
