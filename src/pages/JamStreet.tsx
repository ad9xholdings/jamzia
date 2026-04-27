import { useState } from 'react';
import {
  Users, MapPin, Calendar, Heart, MessageCircle, Share2, Megaphone
} from 'lucide-react';
import { brand } from '../config/brand';

const events = [
  { id: 1, title: 'Community Garden Build', location: 'Brooklyn, NY', date: 'Apr 26, 10:00 AM', attendees: 24, category: 'Volunteer', image: '🌱', organizer: 'Green Blocks NYC' },
  { id: 2, title: 'Open Mic Night', location: 'Atlanta, GA', date: 'Apr 27, 7:00 PM', attendees: 156, category: 'Arts', image: '🎤', organizer: 'ATL Creators' },
  { id: 3, title: 'Food Drive Collection', location: 'Chicago, IL', date: 'Apr 28, 9:00 AM', attendees: 48, category: 'Charity', image: '🥫', organizer: 'ChiCare' },
  { id: 4, title: 'Skate Park Cleanup', location: 'Los Angeles, CA', date: 'Apr 29, 11:00 AM', attendees: 35, category: 'Volunteer', image: '🛹', organizer: 'LA Skate Coalition' },
  { id: 5, title: 'Street Art Festival', location: 'Miami, FL', date: 'May 1, 12:00 PM', attendees: 890, category: 'Festival', image: '🎨', organizer: 'Wynwood Arts' },
  { id: 6, title: 'Neighborhood Watch Meeting', location: 'Houston, TX', date: 'May 2, 6:00 PM', attendees: 18, category: 'Community', image: '🏘️', organizer: 'Safe Streets HTX' },
];

const movements = [
  { name: 'Clean Water for All', raised: '$48,200', goal: '$50,000', backers: 1240, days: 5, icon: '💧' },
  { name: 'Youth Coding Camps', raised: '$32,800', goal: '$40,000', backers: 890, days: 12, icon: '💻' },
  { name: 'Free Community Fridges', raised: '$18,400', goal: '$25,000', backers: 567, days: 18, icon: '🍎' },
];

const posts = [
  { author: 'Marcus J.', handle: '@marcus_street', content: 'Just secured funding for 3 new community gardens in Westside. Thanks to everyone who backed the proposal! 🌱 #Conduit', likes: 234, comments: 45, time: '2h ago', avatar: '👤' },
  { author: 'Lisa Chen', handle: '@lisa_creates', content: 'The mural on 5th & Main is finally done. 200 hours of work with 12 local artists. Come see it this weekend! 🎨', likes: 567, comments: 89, time: '4h ago', avatar: '👩‍🎨' },
  { author: 'DeShawn', handle: '@deshawn_unity', content: 'Food drive this Saturday. We need volunteers and donations. Every can counts. 🥫 #JamStreet', likes: 189, comments: 34, time: '6h ago', avatar: '🙋‍♂️' },
];

const categoryColors: Record<string, string> = {
  Volunteer: 'bg-green-500/10 text-green-400',
  Arts: 'bg-purple-500/10 text-purple-400',
  Charity: 'bg-amber-500/10 text-amber-400',
  Festival: 'bg-pink-500/10 text-pink-400',
  Community: 'bg-blue-500/10 text-blue-400'};

export default function JamStreet() {
  const [tab, setTab] = useState<'events' | 'movements' | 'feed'>('events');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2"><Users size={20} className="text-orange-400" /><span className="font-display text-lg font-bold">{brand.prefix}Street</span></div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-semibold text-orange-400 mb-3">
            <Megaphone size={12} />Conduit Community
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Street Level</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">Local events, grassroots movements, and community action. Organize, participate, connect.</p>
        </div>

        <div className="flex justify-center gap-1 mb-6">
          {(['events', 'movements', 'feed'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${tab === t ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-[#6B7280] hover:text-white border border-transparent'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'events' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {events.map(e => (
              <div key={e.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 hover:border-orange-500/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{e.image}</span>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${categoryColors[e.category] || 'bg-white/5 text-[#6B7280]'}`}>{e.category}</span>
                </div>
                <p className="text-sm font-semibold text-white">{e.title}</p>
                <p className="text-[10px] text-[#6B7280] mt-1 flex items-center gap-1"><MapPin size={8} />{e.location}</p>
                <p className="text-[10px] text-[#6B7280] flex items-center gap-1"><Calendar size={8} />{e.date}</p>
                <p className="text-[10px] text-[#6B7280] mt-1">by {e.organizer}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-[#6B7280]">{e.attendees} attending</span>
                  <button className="px-3 py-1.5 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-lg cursor-pointer hover:bg-orange-500/30 transition-colors">Join</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'movements' && (
          <div className="space-y-4">
            {movements.map(m => {
              const pct = Math.round((parseInt(m.raised.replace(/[$,]/g, '')) / parseInt(m.goal.replace(/[$,]/g, ''))) * 100);
              return (
                <div key={m.name} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{m.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{m.backers.toLocaleString()} backers • {m.days} days left</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-white">{m.raised}</span>
                    <span className="text-xs text-[#6B7280]">of {m.goal}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-orange-400">{pct}% funded</span>
                    <button className="px-4 py-1.5 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-lg cursor-pointer hover:bg-orange-500/30 transition-colors">Back This</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'feed' && (
          <div className="space-y-3">
            {posts.map((p, i) => (
              <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{p.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{p.author}</p>
                    <p className="text-[10px] text-[#6B7280]">{p.handle} • {p.time}</p>
                  </div>
                </div>
                <p className="text-sm text-[#A0AEC0] mb-3">{p.content}</p>
                <div className="flex items-center gap-4 text-[10px] text-[#6B7280]">
                  <button className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer"><Heart size={12} />{p.likes}</button>
                  <button className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer"><MessageCircle size={12} />{p.comments}</button>
                  <button className="flex items-center gap-1 hover:text-green-400 transition-colors cursor-pointer"><Share2 size={12} />Share</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
