import { useState } from 'react';
import { Play, Calendar, Clock, DollarSign, Ticket, Star, Users, Tv, Music, Trophy, Film, Lock, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router';

/* ── Types ──────────────────────────────────────── */
interface PPVEvent {
  id: string;
  title: string;
  type: 'sports' | 'concert' | 'comedy' | 'film' | 'esports' | 'special';
  description: string;
  thumbnail: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  currency: string;
  viewers: string;
  status: 'upcoming' | 'live' | 'replay';
  featured?: boolean;
  talent: string[];
}

/* ── Mock Data ──────────────────────────────────── */
const EVENTS: PPVEvent[] = [
  {
    id: 'ppv-1', title: 'JamZia Championship Fight Night', type: 'sports',
    description: 'The biggest MMA event of the year. Main event features two undefeated champions battling for the belt.',
    thumbnail: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=800&h=450&fit=crop',
    date: 'May 15, 2026', time: '8:00 PM EST', duration: '4 hours',
    price: 59.99, currency: 'USD', viewers: '2.5M expected', status: 'upcoming', featured: true,
    talent: ['Champion A', 'Champion B', 'Commentary Team'],
  },
  {
    id: 'ppv-2', title: 'Ad9x Live Concert Series: Summer Jam', type: 'concert',
    description: 'An all-star lineup performing live from the Ad9x Amphitheater. Exclusive performances you won\'t see anywhere else.',
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=450&fit=crop',
    date: 'June 1, 2026', time: '7:00 PM EST', duration: '3.5 hours',
    price: 29.99, currency: 'USD', viewers: '1.8M expected', status: 'upcoming',
    talent: ['Headliner TBA', 'Opening Act', 'DJ Set'],
  },
  {
    id: 'ppv-3', title: 'Comedy Special: Cotton & Friends', type: 'comedy',
    description: 'A night of laughter featuring the funniest voices in comedy, hosted by Mrs. Cotton herself.',
    thumbnail: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=450&fit=crop',
    date: 'May 22, 2026', time: '9:00 PM EST', duration: '2 hours',
    price: 19.99, currency: 'USD', viewers: '800K expected', status: 'upcoming',
    talent: ['Mrs. Cotton', 'Special Guest', 'Opening Comedian'],
  },
  {
    id: 'ppv-4', title: '"The Legacy" World Premiere', type: 'film',
    description: 'The exclusive world premiere of "The Legacy" — an Ad9x Studios original film. Watch it first, only on JamZia.',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
    date: 'May 30, 2026', time: '7:00 PM EST', duration: '2h 18m',
    price: 24.99, currency: 'USD', viewers: '5M expected', status: 'upcoming', featured: true,
    talent: ['Director', 'Lead Cast', 'Composer'],
  },
  {
    id: 'ppv-5', title: 'Global Esports Championship Finals', type: 'esports',
    description: 'The final showdown of the Global Esports Championship. Watch the best teams compete for the $10M prize pool.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
    date: 'June 10, 2026', time: '3:00 PM EST', duration: '6 hours',
    price: 14.99, currency: 'USD', viewers: '4.2M expected', status: 'upcoming',
    talent: ['Top 4 Teams', 'Caster Team', 'Analyst Desk'],
  },
  {
    id: 'ppv-6', title: 'Fearless Revolution Summit 2026', type: 'special',
    description: 'The annual gathering of the Fearless Revolution community. Keynotes, workshops, and live performances.',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
    date: 'July 4, 2026', time: '10:00 AM EST', duration: '8 hours',
    price: 39.99, currency: 'USD', viewers: '3M expected', status: 'upcoming',
    talent: ['Keynote Speakers', 'Workshop Leaders', 'Live Performers'],
  },
  {
    id: 'ppv-7', title: 'JamZia Boxing: Heavyweight Clash', type: 'sports',
    description: 'Heavyweight championship boxing at its finest. 12 rounds for the undisputed title.',
    thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&h=450&fit=crop',
    date: 'August 12, 2026', time: '9:00 PM EST', duration: '4 hours',
    price: 69.99, currency: 'USD', viewers: '3.5M expected', status: 'upcoming',
    talent: ['Boxer A', 'Boxer B', 'Ring Announcer'],
  },
  {
    id: 'ppv-8', title: 'WisdomPay Blockchain Summit Live', type: 'special',
    description: 'Live coverage of the biggest blockchain summit of the year. Keynotes from industry leaders and XRP Ledger updates.',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=450&fit=crop',
    date: 'September 20, 2026', time: '11:00 AM EST', duration: '6 hours',
    price: 9.99, currency: 'USD', viewers: '1.2M expected', status: 'upcoming',
    talent: ['Industry Leaders', 'XRP Developers', 'Panel Experts'],
  },
];

const TYPE_CONFIG = {
  sports: { icon: Trophy, color: '#E50914', label: 'Sports' },
  concert: { icon: Music, color: '#1DB954', label: 'Concert' },
  comedy: { icon: Star, color: '#FF6B00', label: 'Comedy' },
  film: { icon: Film, color: '#C9A03F', label: 'Film Premiere' },
  esports: { icon: Zap, color: '#9146FF', label: 'Esports' },
  special: { icon: Globe, color: '#7096D1', label: 'Special Event' },
};

/* ── Event Card ─────────────────────────────────── */
function EventCard({ event }: { event: PPVEvent }) {
  const typeConfig = TYPE_CONFIG[event.type];
  const TypeIcon = typeConfig.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C9A03F]/30 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Status badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="bg-black/60 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <TypeIcon className="w-3 h-3" style={{ color: typeConfig.color }} />
            {typeConfig.label}
          </div>
          {event.status === 'live' && (
            <div className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full" /> LIVE
            </div>
          )}
          {event.status === 'replay' && (
            <div className="bg-[#7096D1] text-white text-xs font-bold px-2.5 py-1 rounded-full">REPLAY</div>
          )}
        </div>

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-[#C9A03F] text-black text-sm font-bold px-3 py-1 rounded-full">
          ${event.price.toFixed(2)}
        </div>

        {/* Play overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-16 h-16 rounded-full bg-[#C9A03F] flex items-center justify-center">
            <Play className="w-8 h-8 text-black fill-black ml-1" />
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg mb-1">{event.title}</h3>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.viewers}</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-white/50 text-sm mb-3 line-clamp-2">{event.description}</p>
        
        {/* Talent */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] text-white/30 uppercase tracking-wider">Featuring:</span>
          {event.talent.map((t, i) => (
            <span key={i} className="text-xs text-[#7096D1] bg-[#7096D1]/10 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Link
            to="/pay"
            className="flex-1 flex items-center justify-center gap-2 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black py-2.5 rounded-xl font-bold text-sm transition-all"
          >
            <Ticket className="w-4 h-4" /> Get Access
          </Link>
          <Link
            to="/groupchat"
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2.5 px-4 rounded-xl text-sm transition-all"
          >
            <Users className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Featured Hero ──────────────────────────────── */
function FeaturedHero({ event }: { event: PPVEvent }) {
  const typeConfig = TYPE_CONFIG[event.type];
  const TypeIcon = typeConfig.icon;

  return (
    <div className="relative rounded-2xl overflow-hidden mb-10">
      <img src={event.thumbnail} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[#C9A03F] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3" /> Featured Event
            </div>
            <div className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <TypeIcon className="w-3 h-3" style={{ color: typeConfig.color }} /> {typeConfig.label}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{event.title}</h1>
          <p className="text-white/60 mb-4">{event.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mb-6">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.duration}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {event.viewers}</span>
          </div>
          <div className="flex gap-3">
            <Link to="/pay" className="flex items-center gap-2 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black px-6 py-3 rounded-xl font-bold transition-all">
              <Ticket className="w-5 h-5" /> Get Tickets — ${event.price.toFixed(2)}
            </Link>
            <Link to="/groupchat" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all">
              <Users className="w-5 h-5" /> Watch Party
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────── */
export default function JamPPV() {
  const [activeFilter, setActiveFilter] = useState('all');

  const featured = EVENTS.find((e) => e.featured);
  const others = EVENTS.filter((e) => !e.featured);

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'sports', label: 'Sports' },
    { id: 'concert', label: 'Concerts' },
    { id: 'comedy', label: 'Comedy' },
    { id: 'film', label: 'Films' },
    { id: 'esports', label: 'Esports' },
    { id: 'special', label: 'Special' },
  ];

  const filtered = activeFilter === 'all' ? others : others.filter((e) => e.type === activeFilter);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black">
            <span className="text-[#C9A03F]">Jam</span><span className="text-white">PPV</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/boxflix" className="text-white/60 hover:text-[#C9A03F] text-sm transition-colors hidden md:block">JamBoxFlix+</Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A03F] to-[#7096D1] flex items-center justify-center text-xs font-bold">JZ</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Featured */}
        {featured && <FeaturedHero event={featured} />}

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Tv, label: 'Events This Year', value: '50+' },
            { icon: Users, label: 'Total Viewers', value: '25M+' },
            { icon: DollarSign, label: 'Avg. Ticket Price', value: '$29.99' },
            { icon: Lock, label: 'Exclusive Content', value: '100%' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center">
              <stat.icon className="w-6 h-6 text-[#C9A03F] mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === f.id ? 'bg-[#C9A03F] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* How it works */}
        <section className="bg-gradient-to-r from-[#111] to-[#0a0a0a] border border-white/5 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">How JamPPV Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, step: '1', title: 'Browse Events', desc: 'Discover live events across sports, concerts, comedy, and more' },
              { icon: Ticket, step: '2', title: 'Purchase Access', desc: 'Buy tickets with WisdomPay on XRP Ledger — fast and secure' },
              { icon: Tv, step: '3', title: 'Watch Live', desc: 'Stream in 4K on any device with real-time group chat' },
              { icon: Play, step: '4', title: 'Replay Included', desc: 'Access replay for 72 hours after the event ends' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#C9A03F]/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-[#C9A03F]" />
                </div>
                <p className="text-[#C9A03F] text-xs font-bold mb-1">Step {item.step}</p>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
