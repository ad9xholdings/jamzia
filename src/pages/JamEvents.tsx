/* ═══════════════════════════════════════════════════════════
   JamEvents — Event Planner & Ticketing
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Calendar, MapPin, Users, Clock,
  Heart, Plus, Search, Filter,
  Music, Gamepad2, GraduationCap, MonitorPlay
} from 'lucide-react';

/* ── Types ── */
interface Event {
  id: string;
  title: string;
  type: 'concert' | 'gaming' | 'edu' | 'community' | 'stream';
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  price: string;
  image?: string;
  host: string;
  featured?: boolean;
}

/* ── Mock Data ── */
const EVENTS: Event[] = [
  { id: 'e1', title: 'JamZia Launch Party 2026', type: 'community', date: 'Jul 4, 2026', time: '8:00 PM EST', location: 'Virtual + Atlanta, GA', attendees: 2400, maxAttendees: 5000, price: 'Free', host: 'Ad9x Holdings', featured: true },
  { id: 'e2', title: 'SkyIvy Live Concert Series', type: 'concert', date: 'May 15, 2026', time: '9:00 PM EST', location: 'JamMusic Live', attendees: 8900, maxAttendees: 50000, price: '500 JAM', host: 'BlackDiamond Records', featured: true },
  { id: 'e3', title: 'Cotton Cup Grand Finals', type: 'gaming', date: 'Jun 20, 2026', time: '3:00 PM EST', location: 'JamArena', attendees: 12800, maxAttendees: 50000, price: 'Free', host: 'Ad9x Esports' },
  { id: 'e4', title: 'Phonics Mastery Workshop', type: 'edu', date: 'May 8, 2026', time: '11:00 AM EST', location: "Mrs. Cotton's Academy", attendees: 450, maxAttendees: 1000, price: 'Free', host: "Mrs. Cotton's Academy" },
  { id: 'e5', title: 'NoFear Mental Health Summit', type: 'community', date: 'May 22, 2026', time: '10:00 AM EST', location: 'Virtual', attendees: 3200, maxAttendees: 10000, price: 'Free', host: 'NoFear Foundation' },
  { id: 'e6', title: 'XRPL Developer Workshop', type: 'edu', date: 'May 10, 2026', time: '2:00 PM EST', location: 'JamCode Virtual', attendees: 680, maxAttendees: 2000, price: 'Free', host: 'Collective General' },
  { id: 'e7', title: 'BlackDiamond Film Premiere', type: 'stream', date: 'Jun 1, 2026', time: '7:00 PM EST', location: 'JamBoxFlix+', attendees: 5600, maxAttendees: 100000, price: '250 JAM', host: 'BlackDiamond Studios' },
  { id: 'e8', title: 'JamDEX Trading Competition', type: 'gaming', date: 'May 5, 2026', time: '12:00 AM EST', location: 'JamDEX', attendees: 3400, maxAttendees: 10000, price: '1,000 JAM', host: 'Conduit Capital' },
];

const TYPE_ICONS = {
  concert: Music,
  gaming: Gamepad2,
  edu: GraduationCap,
  community: Users,
  stream: MonitorPlay,
};

const TYPE_COLORS = {
  concert: '#ec4899',
  gaming: '#f59e0b',
  edu: '#22c55e',
  community: '#7096D1',
  stream: '#a855f7',
};

/* ── Main Component ── */
export default function JamEvents() {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rsvped, setRsvped] = useState<Set<string>>(new Set());

  const filtered = EVENTS.filter(e => {
    if (filterType !== 'all' && e.type !== filterType) return false;
    if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleRsvp = (id: string) => {
    setRsvped(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const featured = filtered.filter(e => e.featured);
  const regular = filtered.filter(e => !e.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#a855f7]/10 flex items-center justify-center">
                <Calendar size={20} className="text-[#a855f7]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamEvents</h1>
                <p className="text-[10px] text-[#6B7280]">Discover & Create Events · Ticketing Powered by WisdomPay™</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg text-xs font-medium transition-colors">
              <Plus size={14} />
              Create Event
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-[#a855f7]"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {(['all', 'concert', 'gaming', 'edu', 'community', 'stream'] as const).map(t => {
              const Icon = t === 'all' ? Filter : TYPE_ICONS[t];
              return (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                    filterType === t ? 'bg-[#a855f7] text-white' : 'bg-[#0A0A0A] text-[#6B7280] border border-[#1F1F1F] hover:text-white'
                  }`}
                >
                  <Icon size={12} />
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Events */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map(event => {
              const TypeIcon = TYPE_ICONS[event.type];
              return (
                <div key={event.id} className="relative bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden hover:border-[#2A2A2A] transition-colors group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#a855f715_0%,_transparent_60%)]" />
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: TYPE_COLORS[event.type] + '20', color: TYPE_COLORS[event.type] }}>
                        <TypeIcon size={10} />
                        {event.type}
                      </span>
                      <button className="p-1.5 text-[#6B7280] hover:text-red-400 transition-colors"><Heart size={14} /></button>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-[#a855f7] transition-colors">{event.title}</h2>
                    <p className="text-xs text-[#6B7280] mb-4">Hosted by {event.host}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <Calendar size={12} className="text-[#a855f7]" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <Clock size={12} className="text-[#a855f7]" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <MapPin size={12} className="text-[#a855f7]" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <Users size={12} className="text-[#a855f7]" />
                        {event.attendees.toLocaleString()} attending
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{event.price === 'Free' ? 'Free' : `${event.price}`}</span>
                      <button
                        onClick={() => toggleRsvp(event.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                          rsvped.has(event.id) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#a855f7] hover:bg-[#9333ea] text-white'
                        }`}
                      >
                        {rsvped.has(event.id) ? 'Going ✓' : 'RSVP'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Event List */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#1F1F1F]">
            <h2 className="text-sm font-medium">Upcoming Events</h2>
          </div>
          <div className="divide-y divide-[#1F1F1F]/50">
            {regular.map(event => {
              const TypeIcon = TYPE_ICONS[event.type];
              return (
                <div key={event.id} className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: TYPE_COLORS[event.type] + '15' }}>
                    <TypeIcon size={20} style={{ color: TYPE_COLORS[event.type] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-medium text-sm truncate">{event.title}</h3>
                      <span className="text-[9px] px-1.5 py-0.5 rounded text-[#6B7280] bg-[#1F1F1F] shrink-0">{event.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#6B7280] flex-wrap">
                      <span className="flex items-center gap-1"><Calendar size={10} />{event.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{event.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={10} />{event.location}</span>
                      <span className="flex items-center gap-1"><Users size={10} />{event.attendees.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold mb-1">{event.price}</p>
                    <button
                      onClick={() => toggleRsvp(event.id)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        rsvped.has(event.id) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#1F1F1F] text-[#6B7280] hover:text-white'
                      }`}
                    >
                      {rsvped.has(event.id) ? 'Going' : 'RSVP'}
                    </button>
                  </div>
                </div>
              );
            })}
            {regular.length === 0 && (
              <div className="p-8 text-center text-[#6B7280]">No events match your filters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
