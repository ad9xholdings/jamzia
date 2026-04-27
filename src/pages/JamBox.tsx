import { useState } from 'react';
import {
  Box, Upload, Users, DollarSign, Eye, Heart, MessageCircle, Zap, Award
} from 'lucide-react';
import { brand } from '../config/brand';

const analytics = [
  { label: 'Total Views', value: '2.4M', change: '+12.5%', icon: Eye, color: 'blue' },
  { label: 'Subscribers', value: '48.2K', change: '+8.3%', icon: Users, color: 'green' },
  { label: 'Revenue', value: '$12,840', change: '+23.1%', icon: DollarSign, color: 'amber' },
  { label: 'Engagement', value: '7.2%', change: '+1.4%', icon: Heart, color: 'red' },
];

const contentCalendar = [
  { day: 'Mon', status: 'published', title: 'Market Analysis Q2', type: 'Video', views: '124K' },
  { day: 'Tue', status: 'published', title: 'Creator Tips #42', type: 'Short', views: '89K' },
  { day: 'Wed', status: 'scheduled', title: 'Behind the Scenes', type: 'Live', time: '3:00 PM' },
  { day: 'Thu', status: 'draft', title: 'Interview Series', type: 'Video', views: '-' },
  { day: 'Fri', status: 'scheduled', title: 'Weekly Recap', type: 'Short', time: '10:00 AM' },
  { day: 'Sat', status: 'idea', title: 'Community Q&A', type: 'Live', views: '-' },
  { day: 'Sun', status: 'idea', title: 'Tutorial Series', type: 'Video', views: '-' },
];

const recentContent = [
  { title: 'How I Built 10 Income Streams', views: '234K', likes: '18.2K', comments: '1.2K', date: '2 days ago', icon: '🎬' },
  { title: '$0 to $10K/month in 90 Days', views: '189K', likes: '14.1K', comments: '892', date: '5 days ago', icon: '💰' },
  { title: 'Creator Economy 2026', views: '156K', likes: '11.8K', comments: '743', date: '1 week ago', icon: '📊' },
  { title: 'My Morning Routine', views: '98K', likes: '8.4K', comments: '521', date: '1 week ago', icon: '🌅' },
];

const milestones = [
  { label: '1K Subs', reached: true },
  { label: '10K Subs', reached: true },
  { label: '50K Subs', reached: false, current: true },
  { label: '100K Subs', reached: false },
  { label: '1M Views', reached: true },
  { label: '10M Views', reached: false, current: true },
];

export default function JamBox() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'calendar'>('dashboard');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2"><Box size={20} className="text-purple-400" /><span className="font-display text-lg font-bold">{brand.prefix}Box™</span></div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-400 mb-3">
            <Zap size={12} />{brand.prefix}Lockr Creator Engine
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">Your command center for content, analytics, and monetization across the </p>
        </div>

        <div className="flex justify-center gap-1 mb-6">
          {(['dashboard', 'content', 'calendar'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${activeTab === tab ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {analytics.map(a => (
                <div key={a.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
                  <a.icon size={20} className="mx-auto mb-2" style={{ color: a.color === 'blue' ? '#60a5fa' : a.color === 'green' ? '#22c55e' : a.color === 'amber' ? '#f59e0b' : '#ef4444' }} />
                  <p className="text-lg font-bold text-white">{a.value}</p>
                  <p className="text-[10px] text-[#6B7280]">{a.label}</p>
                  <p className="text-[10px] text-green-400 mt-1">{a.change}</p>
                </div>
              ))}
            </div>

            {/* Milestones */}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 mb-6">
              <h3 className="text-sm font-semibold text-[#A0AEC0] mb-3 flex items-center gap-2"><Award size={14} />Milestones</h3>
              <div className="flex items-center gap-1">
                {milestones.map((m, i) => (
                  <div key={i} className="flex-1 flex items-center gap-1">
                    <div className={`flex-1 h-2 rounded-full ${m.reached ? 'bg-purple-400' : m.current ? 'bg-purple-400/50' : 'bg-white/10'}`} />
                    {i < milestones.length - 1 && <div className="w-2" />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {milestones.map((m, i) => (
                  <span key={i} className={`text-[9px] ${m.reached ? 'text-purple-400' : m.current ? 'text-purple-300' : 'text-[#6B7280]'}`}>{m.label}</span>
                ))}
              </div>
            </div>

            {/* Quick Upload */}
            <div className="bg-purple-500/5 border border-purple-500/20 border-dashed rounded-2xl p-8 text-center">
              <Upload size={32} className="mx-auto text-purple-400 mb-3" />
              <p className="text-sm font-semibold text-white">Upload New Content</p>
              <p className="text-[10px] text-[#6B7280] mt-1">Drag & drop or click to browse. Supports video, audio, and images.</p>
              <button className="mt-3 px-5 py-2 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-xl cursor-pointer hover:bg-purple-500/30 transition-colors">Select Files</button>
            </div>
          </>
        )}

        {activeTab === 'content' && (
          <div className="space-y-3">
            {recentContent.map((c, i) => (
              <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4">
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{c.title}</p>
                  <p className="text-[10px] text-[#6B7280]">{c.date}</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
                  <span className="flex items-center gap-1"><Eye size={10} />{c.views}</span>
                  <span className="flex items-center gap-1"><Heart size={10} />{c.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={10} />{c.comments}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {contentCalendar.map((c, i) => (
              <div key={i} className={`bg-[#0A0F1E] border rounded-2xl p-4 ${c.status === 'published' ? 'border-green-500/20' : c.status === 'scheduled' ? 'border-blue-500/20' : c.status === 'draft' ? 'border-amber-500/20' : 'border-white/[0.06]'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">{c.day}</span>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${c.status === 'published' ? 'bg-green-500/10 text-green-400' : c.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400' : c.status === 'draft' ? 'bg-amber-500/10 text-amber-400' : 'bg-white/5 text-[#6B7280]'}`}>{c.status}</span>
                </div>
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-[#6B7280]">{c.type}</span>
                  <span className="text-[10px] text-[#6B7280]">{c.views || c.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
