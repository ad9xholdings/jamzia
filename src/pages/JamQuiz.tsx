/* ═══════════════════════════════════════════════════════════
   JamQuiz — Knowledge Testing & Assessment
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { HelpCircle, Clock, Trophy, Star, Users } from 'lucide-react';;

/* ── Types ── */
interface Quiz {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  questions: number;
  time: string;
  difficulty: string;
  attempts: string;
  avgScore: string;
  enrolled: boolean;
  completed: boolean;
  score?: number;
}

/* ── Mock Data ── */
const QUIZZES: Quiz[] = [
  { id: 'q1', title: 'XRPL Fundamentals', category: 'Blockchain', categoryColor: '#7096D1', questions: 20, time: '15 min', difficulty: 'Beginner', attempts: '12.5K', avgScore: '78%', enrolled: true, completed: true, score: 85 },
  { id: 'q2', title: 'Phonics Mastery Check', category: 'Education', categoryColor: '#22c55e', questions: 50, time: '30 min', difficulty: 'Intermediate', attempts: '45K', avgScore: '82%', enrolled: true, completed: false },
  { id: 'q3', title: 'WisdomPay DeFi Protocols', category: 'Finance', categoryColor: '#f59e0b', questions: 25, time: '20 min', difficulty: 'Advanced', attempts: '8.2K', avgScore: '64%', enrolled: false, completed: false },
  { id: 'q4', title: 'JamZia Platform Knowledge', category: 'Technology', categoryColor: '#a855f7', questions: 30, time: '25 min', difficulty: 'Intermediate', attempts: '23K', avgScore: '71%', enrolled: true, completed: false },
  { id: 'q5', title: 'NoFear Mental Health First Aid', category: 'Healthcare', categoryColor: '#06b6d4', questions: 40, time: '35 min', difficulty: 'Intermediate', attempts: '67K', avgScore: '89%', enrolled: false, completed: false },
  { id: 'q6', title: 'BlackDiamond Media Production', category: 'Media', categoryColor: '#ec4899', questions: 15, time: '10 min', difficulty: 'Beginner', attempts: '5.1K', avgScore: '75%', enrolled: false, completed: false },
  { id: 'q7', title: 'Cotton Brick Road Strategy', category: 'Gaming', categoryColor: '#f59e0b', questions: 35, time: '28 min', difficulty: 'Advanced', attempts: '34K', avgScore: '58%', enrolled: true, completed: true, score: 92 },
  { id: 'q8', title: 'Ad9x Leadership Principles', category: 'Business', categoryColor: '#22c55e', questions: 20, time: '15 min', difficulty: 'Beginner', attempts: '9.8K', avgScore: '84%', enrolled: false, completed: false },
];

/* ── Main Component ── */
export default function JamQuiz() {
  const [activeTab, setActiveTab] = useState<'all' | 'enrolled' | 'completed'>('all');
  

  const filtered = QUIZZES.filter(q => {
    if (activeTab === 'enrolled') return q.enrolled && !q.completed;
    if (activeTab === 'completed') return q.completed;
    return true;
  });

  const totalCompleted = QUIZZES.filter(q => q.completed).length;
  const avgScore = QUIZZES.filter(q => q.completed && q.score).reduce((s, q) => s + (q.score || 0), 0) / Math.max(totalCompleted, 1);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#a855f7]/10 flex items-center justify-center">
                <HelpCircle size={20} className="text-[#a855f7]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamQuiz</h1>
                <p className="text-[10px] text-[#6B7280]">Knowledge Testing & Assessment · Collective General Technologies, LLC</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#a855f7]"><Trophy size={12} /> {totalCompleted} completed</span>
              <span className="flex items-center gap-1 text-[#f59e0b]"><Star size={12} /> {avgScore.toFixed(0)}% avg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Quizzes', value: QUIZZES.length.toString(), color: '#a855f7' },
            { label: 'Completed', value: totalCompleted.toString(), color: '#22c55e' },
            { label: 'In Progress', value: QUIZZES.filter(q => q.enrolled && !q.completed).length.toString(), color: '#f59e0b' },
            { label: 'Available', value: QUIZZES.filter(q => !q.enrolled).length.toString(), color: '#6B7280' },
          ].map(s => (
            <div key={s.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <span className="text-xs text-[#6B7280]">{s.label}</span>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-1 w-fit">
          {(['all', 'enrolled', 'completed'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === t ? 'bg-[#a855f7] text-white' : 'text-[#6B7280] hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(quiz => (
            <div key={quiz.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 hover:border-[#2A2A2A] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ backgroundColor: quiz.categoryColor + '20', color: quiz.categoryColor }}>
                  {quiz.category}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  quiz.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                  quiz.difficulty === 'Intermediate' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
                  'bg-red-500/10 text-red-400'
                }`}>{quiz.difficulty}</span>
              </div>

              <h3 className="font-bold text-sm mb-2">{quiz.title}</h3>

              <div className="flex items-center gap-3 text-[10px] text-[#6B7280] mb-3">
                <span className="flex items-center gap-1"><HelpCircle size={10} />{quiz.questions} Qs</span>
                <span className="flex items-center gap-1"><Clock size={10} />{quiz.time}</span>
                <span className="flex items-center gap-1"><Users size={10} />{quiz.attempts}</span>
              </div>

              {quiz.completed && quiz.score !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Your Score</span>
                    <span className="font-bold" style={{ color: quiz.score >= 80 ? '#22c55e' : quiz.score >= 60 ? '#f59e0b' : '#ef4444' }}>{quiz.score}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${quiz.score}%`, backgroundColor: quiz.score >= 80 ? '#22c55e' : quiz.score >= 60 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                </div>
              )}

              <button className={`w-full py-2 rounded-lg text-xs font-bold transition-colors ${
                quiz.completed ? 'bg-[#1F1F1F] text-[#6B7280]' :
                quiz.enrolled ? 'bg-[#a855f7] hover:bg-[#9333ea] text-white' :
                'bg-[#1F1F1F] text-white hover:bg-[#2A2A2A]'
              }`}>
                {quiz.completed ? 'Review' : quiz.enrolled ? 'Continue' : 'Start Quiz'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
