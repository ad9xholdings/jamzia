/* ═══════════════════════════════════════════════════════════
   JamU™ — Free Learning. Premium Earning.
   "You get what you pay for. After the free."
   Built by Collective General Technologies, LLC
   Powered by Saylor Academy (Free Tier) + Ad9x Premium
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  GraduationCap, BookOpen, Award, TrendingUp, Users, Clock,
  Star, Unlock, CheckCircle, ChevronRight,
  Bookmark, Share2, Crown, Globe, Shield
} from 'lucide-react';

/* ── Types ── */
interface Course {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  hours: number;
  students: string;
  rating: number;
  level: string;
  tier: 'free' | 'premium';
  price?: string;
  certificate: boolean;
  enrolled: boolean;
  progress: number;
  instructor: string;
  description: string;
}

interface LearningPath {
  name: string;
  steps: string[];
  color: string;
}

/* ── Mock Data ── */
const SAYLOR_STATS = {
  students: '2,902,778',
  courses: '159+',
  specializations: '9',
  categories: '7',
};

const CATEGORIES = [
  { name: 'Arts & Humanities', count: 12, color: '#ec4899' },
  { name: 'Business Administration', count: 51, color: '#f59e0b' },
  { name: 'Computer Science', count: 17, color: '#7096D1' },
  { name: 'English as a Second Language', count: 5, color: '#22c55e' },
  { name: 'Professional Development', count: 45, color: '#06b6d4' },
  { name: 'Science & Math', count: 10, color: '#a855f7' },
  { name: 'Social Science', count: 19, color: '#ef4444' },
];

const COURSES: Course[] = [
  /* ── FREE (Saylor-powered) ── */
  { id: 'f1', title: 'Introduction to Computer Science', category: 'Computer Science', categoryColor: '#7096D1', hours: 40, students: '89K', rating: 4.8, level: 'Beginner', tier: 'free', certificate: true, enrolled: true, progress: 65, instructor: 'Saylor Academy', description: 'Fundamental concepts of computing including algorithms, data structures, and programming basics.' },
  { id: 'f2', title: 'Principles of Management', category: 'Business Administration', categoryColor: '#f59e0b', hours: 35, students: '124K', rating: 4.6, level: 'Beginner', tier: 'free', certificate: true, enrolled: false, progress: 0, instructor: 'Saylor Academy', description: 'Core management principles including planning, organizing, leading, and controlling.' },
  { id: 'f3', title: 'English Composition', category: 'Arts & Humanities', categoryColor: '#ec4899', hours: 45, students: '67K', rating: 4.7, level: 'Beginner', tier: 'free', certificate: true, enrolled: false, progress: 0, instructor: 'Saylor Academy', description: 'Develop writing skills for academic and professional success.' },
  { id: 'f4', title: 'Introduction to Statistics', category: 'Science & Math', categoryColor: '#a855f7', hours: 38, students: '93K', rating: 4.5, level: 'Intermediate', tier: 'free', certificate: true, enrolled: true, progress: 30, instructor: 'Saylor Academy', description: 'Statistical methods for data analysis and decision-making.' },
  { id: 'f5', title: 'Project Management', category: 'Professional Development', categoryColor: '#06b6d4', hours: 30, students: '156K', rating: 4.9, level: 'Intermediate', tier: 'free', certificate: true, enrolled: false, progress: 0, instructor: 'Saylor Academy', description: 'PMP-aligned project management fundamentals and best practices.' },
  { id: 'f6', title: 'Introduction to Psychology', category: 'Social Science', categoryColor: '#ef4444', hours: 42, students: '201K', rating: 4.8, level: 'Beginner', tier: 'free', certificate: true, enrolled: false, progress: 0, instructor: 'Saylor Academy', description: 'Foundations of human behavior, cognition, and mental processes.' },
  { id: 'f7', title: 'College Algebra', category: 'Science & Math', categoryColor: '#a855f7', hours: 50, students: '78K', rating: 4.4, level: 'Beginner', tier: 'free', certificate: true, enrolled: false, progress: 0, instructor: 'Saylor Academy', description: 'Algebraic concepts essential for higher education and STEM careers.' },
  { id: 'f8', title: 'Business Law & Ethics', category: 'Business Administration', categoryColor: '#f59e0b', hours: 32, students: '45K', rating: 4.6, level: 'Beginner', tier: 'free', certificate: true, enrolled: false, progress: 0, instructor: 'Saylor Academy', description: 'Legal framework for business operations and ethical decision-making.' },

  /* ── PREMIUM (After the Free) ── */
  { id: 'p1', title: 'Phonics Mastery Pro — K-Doctoral Pathway', category: 'Education', categoryColor: '#22c55e', hours: 120, students: '12K', rating: 5.0, level: 'Advanced', tier: 'premium', price: '500 JAM', certificate: true, enrolled: false, progress: 0, instructor: "Mrs. Cotton's Academy", description: 'Complete phonics mastery from kindergarten through doctoral level reading. Includes assessment tools and certification.' },
  { id: 'p2', title: 'XRPL Smart Contract Development', category: 'Computer Science', categoryColor: '#7096D1', hours: 80, students: '8K', rating: 4.9, level: 'Advanced', tier: 'premium', price: '1,000 JAM', certificate: true, enrolled: false, progress: 0, instructor: 'Collective General', description: 'Build decentralized applications on the XRP Ledger. Hooks, AMM integration, and tokenization.' },
  { id: 'p3', title: 'Financial Engineering with WisdomPay', category: 'Business Administration', categoryColor: '#f59e0b', hours: 60, students: '5K', rating: 4.8, level: 'Advanced', tier: 'premium', price: '750 JAM', certificate: true, enrolled: false, progress: 0, instructor: 'Conduit Capital AI', description: 'Institutional-grade DeFi strategies, AMM optimization, and quantitative trading on XRPL.' },
  { id: 'p4', title: 'Content Creation for BlackDiamond', category: 'Media', categoryColor: '#ec4899', hours: 55, students: '9K', rating: 4.7, level: 'Intermediate', tier: 'premium', price: '600 JAM', certificate: true, enrolled: false, progress: 0, instructor: 'BlackDiamond Studios', description: 'Film, music, and digital content production for JamBoxFlix+ distribution.' },
  { id: 'p5', title: 'Leadership & Entrepreneurship', category: 'Business Administration', categoryColor: '#f59e0b', hours: 70, students: '15K', rating: 4.9, level: 'Advanced', tier: 'premium', price: '800 JAM', certificate: true, enrolled: false, progress: 0, instructor: 'Ad9x Holdings', description: 'Build and scale ventures in the JamZia ecosystem. Mentorship from Cuz Cotton and the Ad9x leadership team.' },
  { id: 'p6', title: 'Mental Health First Aid Certification', category: 'Healthcare', categoryColor: '#06b6d4', hours: 40, students: '22K', rating: 4.9, level: 'Intermediate', tier: 'premium', price: 'Free (NoFear Grant)', certificate: true, enrolled: false, progress: 0, instructor: 'NoFear Foundation', description: 'Certified mental health first aid training. Recognize, respond, and refer with confidence.' },
];

const LEARNING_PATHS: LearningPath[] = [
  { name: 'Learn to Earn — Tech Path', steps: ['Free CS Fundamentals', 'XRPL Dev Premium', 'Portfolio Build', 'Job Placement'], color: '#7096D1' },
  { name: 'Learn to Earn — Business Path', steps: ['Free Business Basics', 'WisdomPay Finance', 'Leadership Pro', 'Launch Venture'], color: '#f59e0b' },
  { name: 'Learn to Earn — Creative Path', steps: ['Free Writing/Media', 'BlackDiamond Content', 'Studio Training', 'Distribution Deal'], color: '#ec4899' },
];

/* ── Tier Badge ── */
function TierBadge({ tier, price }: { tier: 'free' | 'premium'; price?: string }) {
  if (tier === 'free') {
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><Unlock size={10} />FREE</span>;
  }
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20"><Crown size={10} />{price}</span>;
}

/* ── Main Component ── */
export default function JamU() {
  const [activeTab, setActiveTab] = useState<'browse' | 'mypath' | 'certificates'>('browse');
  const [tierFilter, setTierFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const freeCount = COURSES.filter(c => c.tier === 'free').length;
  const premiumCount = COURSES.filter(c => c.tier === 'premium').length;

  const filtered = COURSES.filter(c => {
    if (tierFilter !== 'all' && c.tier !== tierFilter) return false;
    if (categoryFilter !== 'All' && c.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ═══════ HERO ═══════ */}
      <div className="relative border-b border-[#1F1F1F] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#f59e0b10_0%,_transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
                <GraduationCap size={24} className="text-[#f59e0b]" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">JamU<sup className="text-[10px] font-normal">™</sup></h1>
                <p className="text-[10px] text-[#6B7280]">Free Learning. Premium Earning.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-400"><Users size={12} />{SAYLOR_STATS.students} learners</span>
              <span className="flex items-center gap-1 text-[#f59e0b]"><BookOpen size={12} />{SAYLOR_STATS.courses} courses</span>
            </div>
          </div>

          {/* Tagline Banner */}
          <div className="mt-6 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-[#f59e0b]">"You get what you pay for."</p>
              <p className="text-xs text-[#6B7280]">After the free — unlock premium career pathways with JamCoins.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right mr-3">
                <p className="text-xs text-emerald-400 font-bold">{freeCount} FREE via Saylor Academy</p>
                <p className="text-xs text-[#f59e0b] font-bold">{premiumCount} PREMIUM via Ad9x</p>
              </div>
              <button className="px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-black rounded-lg text-xs font-bold transition-colors">
                Start Free
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* ═══════ TABS ═══════ */}
        <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-1 w-fit">
          {([['browse', 'Browse Courses', BookOpen], ['mypath', 'My Learning Path', TrendingUp], ['certificates', 'Certificates', Award]] as const).map(([tab, label, Icon]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-[#f59e0b] text-black' : 'text-[#6B7280] hover:text-white'}`}>
              <Icon size={14} />{label}
            </button>
          ))}
        </div>

        {activeTab === 'browse' && (
          <>
            {/* ═══════ FILTERS ═══════ */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                {(['all', 'free', 'premium'] as const).map(t => (
                  <button key={t} onClick={() => setTierFilter(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${tierFilter === t ? t === 'free' ? 'bg-emerald-500 text-black' : t === 'premium' ? 'bg-[#f59e0b] text-black' : 'bg-[#1F1F1F] text-white' : 'bg-[#0A0A0A] text-[#6B7280] border border-[#1F1F1F]'}`}>
                    {t === 'all' ? 'All' : t === 'free' ? '✓ Free (Saylor)' : '♛ Premium'}
                  </button>
                ))}
              </div>
              <div className="h-4 w-px bg-[#1F1F1F]" />
              <div className="flex items-center gap-1 overflow-x-auto">
                {['All', ...CATEGORIES.map(c => c.name)].map(cat => (
                  <button key={cat} onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition-colors ${categoryFilter === cat ? 'bg-[#1F1F1F] text-white' : 'text-[#6B7280] hover:text-white'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* ═══════ COURSE CARDS ═══════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(course => {
                const isExpanded = expandedCourse === course.id;
                return (
                  <div key={course.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden hover:border-[#2A2A2A] transition-colors">
                    {/* Course Header */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <TierBadge tier={course.tier} price={course.price} />
                        <span className="text-[10px] text-[#6B7280] bg-[#1F1F1F] px-1.5 py-0.5 rounded">{course.level}</span>
                      </div>
                      <h3 className="font-bold text-sm mb-1 leading-tight">{course.title}</h3>
                      <p className="text-[10px] text-[#6B7280] mb-2">{course.instructor}</p>
                      <p className="text-xs text-[#6B7280] line-clamp-2 mb-3">{course.description}</p>

                      {/* Stats Row */}
                      <div className="flex items-center gap-3 text-[10px] text-[#6B7280] mb-3">
                        <span className="flex items-center gap-1"><Clock size={10} />{course.hours}h</span>
                        <span className="flex items-center gap-1"><Users size={10} />{course.students}</span>
                        <span className="flex items-center gap-1"><Star size={10} className="text-[#f59e0b]" />{course.rating}</span>
                        {course.certificate && <span className="flex items-center gap-1 text-emerald-400"><Award size={10} />Cert</span>}
                      </div>

                      {/* Progress or Enroll */}
                      {course.enrolled && course.progress > 0 ? (
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-[#6B7280]">Progress</span>
                            <span className="text-[#f59e0b] font-bold">{course.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                            <div className="h-full bg-[#f59e0b] rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                          </div>
                          <button className="w-full py-2 bg-[#f59e0b] hover:bg-[#d97706] text-black rounded-lg text-xs font-bold transition-colors">
                            Continue Learning
                          </button>
                        </div>
                      ) : (
                        <button className={`w-full py-2 rounded-lg text-xs font-bold transition-colors ${
                          course.tier === 'free' ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-[#f59e0b] hover:bg-[#d97706] text-black'
                        }`}>
                          {course.tier === 'free' ? 'Enroll Free' : `Unlock — ${course.price}`}
                        </button>
                      )}

                      <button onClick={() => setExpandedCourse(isExpanded ? null : course.id)} className="w-full mt-2 text-[10px] text-[#6B7280] hover:text-white flex items-center justify-center gap-1">
                        {isExpanded ? 'Less' : 'More details'} <ChevronRight size={10} className={isExpanded ? 'rotate-90' : ''} />
                      </button>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-[#1F1F1F] space-y-2 text-xs text-[#6B7280]">
                          <p><strong className="text-white">Category:</strong> {course.category}</p>
                          <p><strong className="text-white">Certificate:</strong> {course.certificate ? 'Verified completion certificate with unique ID' : 'No certificate'}</p>
                          {course.tier === 'premium' && (
                            <p><strong className="text-white">Career Outcome:</strong> Direct pathway to JamZia ecosystem employment</p>
                          )}
                          <div className="flex gap-2 mt-2">
                            <button className="flex-1 py-1.5 bg-[#1F1F1F] rounded text-[10px] text-white flex items-center justify-center gap-1"><Bookmark size={10} /> Save</button>
                            <button className="flex-1 py-1.5 bg-[#1F1F1F] rounded text-[10px] text-white flex items-center justify-center gap-1"><Share2 size={10} /> Share</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ═══════ LEARNING PATHS ═══════ */}
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-1">Learning to Earn™ Pathways</h2>
              <p className="text-xs text-[#6B7280] mb-4">Free fundamentals → Premium mastery → Career placement</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LEARNING_PATHS.map(path => (
                  <div key={path.name} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                    <h3 className="text-sm font-bold mb-3" style={{ color: path.color }}>{path.name}</h3>
                    <div className="space-y-2">
                      {path.steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: `${path.color}20`, color: path.color }}>
                            {i + 1}
                          </div>
                          <span className="text-xs text-[#6B7280]">{step}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-3 py-2 rounded-lg text-xs font-bold transition-colors" style={{ backgroundColor: `${path.color}15`, color: path.color }}>
                      Start Pathway
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'mypath' && (
          <div className="text-center py-16">
            <TrendingUp size={48} className="text-[#1F1F1F] mx-auto mb-4" />
            <h2 className="text-lg font-bold mb-2">Your Learning Journey</h2>
            <p className="text-sm text-[#6B7280] mb-4">Enroll in your first course to start tracking your progress.</p>
            <button onClick={() => setActiveTab('browse')} className="px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-black rounded-lg text-xs font-bold transition-colors">
              Browse Courses
            </button>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="text-center py-16">
            <Award size={48} className="text-[#1F1F1F] mx-auto mb-4" />
            <h2 className="text-lg font-bold mb-2">Your Certificates</h2>
            <p className="text-sm text-[#6B7280] mb-4">Complete courses to earn verified certificates. Free certificates via Saylor Academy. Premium credentials via Ad9x.</p>
            <div className="flex items-center justify-center gap-4 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-400" /> Blockchain-verified</span>
              <span className="flex items-center gap-1"><Globe size={12} className="text-[#7096D1]" /> Social shareable</span>
              <span className="flex items-center gap-1"><Shield size={12} className="text-[#f59e0b]" /> Employer recognized</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
