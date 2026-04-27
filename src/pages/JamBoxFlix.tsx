/* ═══════════════════════════════════════════════════════════
   JamMovies — Complete Video Streaming Platform
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize, Plus,
  Star, Clock, Calendar, ThumbsUp, Share2, Bookmark, Search,
  ChevronLeft, X, TrendingUp, Flame,
  Film, Tv, Clapperboard, Info
} from 'lucide-react';
import { Link } from 'react-router';

/* ── Types ──────────────────────────────────────── */
interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  year: string;
  duration: string;
  rating: string;
  genre: string[];
  description: string;
  cast: string[];
  director: string;
  likes: string;
  trending?: boolean;
  new?: boolean;
  progress?: number;
  seasons?: Season[];
  type: 'movie' | 'series';
}

interface Season {
  number: number;
  episodes: Episode[];
}

interface Episode {
  number: number;
  title: string;
  duration: string;
  description: string;
  watched?: boolean;
}

interface Category {
  name: string;
  color: string;
  image: string;
}

/* ── Mock Data ──────────────────────────────────── */
const FEATURED: Movie = {
  id: 'f1',
  title: 'The Cotton Legacy',
  poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop',
  backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop',
  year: '2026',
  duration: '2h 14m',
  rating: '9.2',
  genre: ['Drama', 'Biography', 'Inspirational'],
  description: 'The true story of Cuz Cotton and the rise of JamZia Networks. From humble beginnings to building the everything app that changed the world. A testament to vision, resilience, and the power of community.',
  cast: ['Cuz Cotton', 'Ad9x Ensemble', 'Mrs. Cotton', 'SkyIvy Voice'],
  director: 'BlackDiamond Studios',
  likes: '12.4M',
  type: 'movie',
};

const MOVIES: Movie[] = [
  { id: 'm1', title: 'The Cotton Legacy', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop', backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop', year: '2026', duration: '2h 14m', rating: '9.2', genre: ['Drama', 'Biography'], description: 'The true story of Cuz Cotton and the rise of JamZia Networks.', cast: ['Cuz Cotton', 'Ad9x Ensemble'], director: 'BlackDiamond Studios', likes: '12.4M', trending: true, type: 'movie' },
  { id: 'm2', title: 'XRPL Revolution', poster: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=450&fit=crop', backdrop: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=600&fit=crop', year: '2025', duration: '1h 58m', rating: '8.7', genre: ['Documentary', 'Technology'], description: 'How the XRP Ledger is transforming global finance.', cast: ['RippleX Team', 'WisdomPay'], director: 'Conduit Capital', likes: '8.9M', new: true, type: 'movie' },
  { id: 'm3', title: 'NoFear Rising', poster: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=450&fit=crop', backdrop: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1200&h=600&fit=crop', year: '2026', duration: '1h 45m', rating: '9.0', genre: ['Documentary', 'Mental Health'], description: 'Stories of courage, resilience, and breaking through fear.', cast: ['NoFear Foundation', 'Community Voices'], director: 'Mrs. Cotton', likes: '15.2M', trending: true, type: 'movie' },
  { id: 'm4', title: 'JamZia: The Everything App', poster: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=450&fit=crop', backdrop: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop', year: '2026', duration: '2h 05m', rating: '8.5', genre: ['Technology', 'Drama'], description: 'Behind the scenes of building 50+ platforms in one ecosystem.', cast: ['DevTeam', 'Collective General'], director: 'Ad9x Holdings', likes: '6.7M', type: 'movie' },
  { id: 'm5', title: 'SkyIvy Nights', poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=450&fit=crop', backdrop: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=600&fit=crop', year: '2025', duration: '1h 52m', rating: '7.9', genre: ['Music', 'Drama'], description: 'A musical journey through the night with SkyIvy.', cast: ['SkyIvy', 'RiverShyre'], director: 'BlackDiamond Records', likes: '5.1M', new: true, type: 'movie' },
  { id: 'm6', title: 'Brick Road Adventures', poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=450&fit=crop', backdrop: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop', year: '2026', duration: '1h 38m', rating: '8.3', genre: ['Gaming', 'Animation'], description: 'The animated adventure from Cotton Brick Road game universe.', cast: ['CBR Sound', 'RiverShyre'], director: 'RiverShyre Animation', likes: '9.8M', trending: true, type: 'movie' },
];

const SERIES: Movie[] = [
  {
    id: 's1', title: 'The Builders', poster: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=450&fit=crop', backdrop: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=600&fit=crop', year: '2026', duration: '8 episodes', rating: '9.4', genre: ['Reality', 'Tech'], description: 'Follow the JamZia engineering team as they build the impossible.', cast: ['Collective General', 'Ad9x Engineers'], director: 'JamZia Studios', likes: '7.2M', trending: true, type: 'series',
    seasons: [
      { number: 1, episodes: [
        { number: 1, title: 'Day One', duration: '45m', description: 'The vision is born.', watched: true },
        { number: 2, title: 'The Architecture', duration: '42m', description: 'Designing 50+ platforms.', watched: true },
        { number: 3, title: 'XRPL Integration', duration: '48m', description: 'Connecting to the ledger.', watched: false },
        { number: 4, title: 'First Deploy', duration: '50m', description: 'Going live on jamzia.tv.', watched: false },
        { number: 5, title: 'White Label Day', duration: '44m', description: '14 brands, one platform.', watched: false },
        { number: 6, title: 'The Quorum', duration: '46m', description: 'Collective General steps in.', watched: false },
        { number: 7, title: 'Launch Party', duration: '52m', description: 'July 4, 2026.', watched: false },
        { number: 8, title: 'What Comes Next', duration: '55m', description: 'The future of everything.', watched: false },
      ]}
    ]
  },
  {
    id: 's2', title: 'Phonics Mastery', poster: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=450&fit=crop', backdrop: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop', year: '2026', duration: '12 episodes', rating: '9.6', genre: ['Education', 'Kids'], description: 'Mrs. Cotton teaches reading from K to Doctoral level.', cast: ['Mrs. Cotton', 'Student Ensemble'], director: "Mrs. Cotton's Academy", likes: '11.5M', type: 'series',
    seasons: [
      { number: 1, episodes: [
        { number: 1, title: 'The Alphabet', duration: '15m', description: 'A is for Apple.', watched: true },
        { number: 2, title: 'Short Vowels', duration: '18m', description: 'a, e, i, o, u.', watched: true },
        { number: 3, title: 'Long Vowels', duration: '20m', description: 'The silent e rule.', watched: true },
        { number: 4, title: 'Blends & Digraphs', duration: '22m', description: 'th, sh, ch, wh.', watched: false },
      ]}
    ]
  },
];

const CATEGORIES: Category[] = [
  { name: 'Action', color: '#ef4444', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=200&fit=crop' },
  { name: 'Drama', color: '#7096D1', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=200&fit=crop' },
  { name: 'Documentary', color: '#22c55e', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop' },
  { name: 'Comedy', color: '#f59e0b', image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=300&h=200&fit=crop' },
  { name: 'Technology', color: '#06b6d4', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop' },
  { name: 'Music', color: '#ec4899', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=200&fit=crop' },
  { name: 'Kids', color: '#a855f7', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop' },
  { name: 'Gaming', color: '#22c55e', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop' },
];

const CONTINUE_WATCHING = [
  { id: 'm1', title: 'The Cotton Legacy', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop', progress: 65, duration: '2h 14m', remaining: '47m left' },
  { id: 's1', title: 'The Builders — S1E2', poster: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=450&fit=crop', progress: 42, duration: '42m', remaining: '24m left' },
  { id: 's2', title: 'Phonics Mastery — S1E3', poster: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=450&fit=crop', progress: 78, duration: '20m', remaining: '4m left' },
];

const MY_LIST: Movie[] = [MOVIES[0], MOVIES[2], SERIES[0], MOVIES[5]];

/* ── Helpers ────────────────────────────────────── */
function StarRating({ rating }: { rating: string }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
      <span className="text-sm font-bold">{rating}</span>
    </div>
  );
}

/* ── Main Component ─────────────────────────────── */
export default function JamMovies() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(MY_LIST.map(m => m.id)));
  const [showInfo, setShowInfo] = useState(false);

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const allContent = [...MOVIES, ...SERIES];

  const tabs = [
    { id: 'home', label: 'Home', icon: Film },
    { id: 'series', label: 'Series', icon: Tv },
    { id: 'movies', label: 'Movies', icon: Clapperboard },
    { id: 'mylist', label: 'My List', icon: Bookmark },
    { id: 'search', label: 'Search', icon: Search },
  ];

  /* ── Player View ── */
  if (isPlaying && selectedMovie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-1 flex items-center justify-center relative">
          <img src={selectedMovie.backdrop} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-3xl font-black mb-2">{selectedMovie.title}</h1>
            <p className="text-white/60 mb-8">{selectedMovie.type === 'series' ? 'Episode 1' : 'Now Playing'}</p>
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mx-auto animate-pulse">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="bg-[#111] border-t border-white/5 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button onClick={() => setIsPlaying(false)} className="text-white hover:text-[#ef4444]"><ChevronLeft className="w-5 h-5" /></button>
            <div className="flex-1">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}>
                <div className="h-full bg-[#ef4444] rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>{Math.floor((progress / 100) * 120)}:00</span>
                <span>{selectedMovie.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-white hover:text-white/80"><SkipBack className="w-4 h-4" /></button>
              <button onClick={() => setProgress(p => Math.min(p + 5, 100))} className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                {progress > 0 ? <Pause className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 text-black fill-black ml-0.5" />}
              </button>
              <button className="text-white hover:text-white/80"><SkipForward className="w-4 h-4" /></button>
              <button onClick={() => setIsMuted(!isMuted)} className="text-white/40 hover:text-white">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button className="text-white/40 hover:text-white"><Maximize className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Movie Detail View ── */
  if (selectedMovie) {
    const hasSeasons = selectedMovie.seasons && selectedMovie.seasons.length > 0;
    return (
      <div className="min-h-screen bg-black text-white pb-8">
        {/* Hero */}
        <div className="relative h-[60vh] overflow-hidden">
          <img src={selectedMovie.backdrop} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <button onClick={() => setSelectedMovie(null)} className="absolute top-4 left-4 z-20 flex items-center gap-1 text-white/70 hover:text-white bg-black/30 backdrop-blur px-3 py-1.5 rounded-full text-sm"><ChevronLeft className="w-4 h-4" /> Back</button>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-end gap-4">
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-32 h-48 md:w-40 md:h-60 rounded-xl shadow-2xl object-cover hidden md:block" />
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {selectedMovie.genre.map((g, i) => <span key={i} className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-white/70">{g}</span>)}
                  {selectedMovie.trending && <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full flex items-center gap-1"><Flame className="w-3 h-3" /> Trending</span>}
                  {selectedMovie.new && <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">New</span>}
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-2">{selectedMovie.title}</h1>
                <div className="flex items-center gap-3 text-sm text-white/60 mb-4">
                  <StarRating rating={selectedMovie.rating} />
                  <span>{selectedMovie.year}</span>
                  <span>{selectedMovie.duration}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{selectedMovie.likes}</span>
                </div>
                <p className="text-white/70 max-w-2xl mb-4 line-clamp-3">{selectedMovie.description}</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(true)} className="flex items-center gap-2 bg-white hover:bg-white/90 text-black px-6 py-3 rounded-xl font-bold"><Play className="w-5 h-5 fill-black" /> {selectedMovie.type === 'series' ? 'Play S1E1' : 'Play Now'}</button>
                  <button onClick={() => toggleWatchlist(selectedMovie.id)} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${watchlist.has(selectedMovie.id) ? 'bg-white/20 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    <Plus className="w-5 h-5" /> {watchlist.has(selectedMovie.id) ? 'In My List' : 'My List'}
                  </button>
                  <button onClick={() => setShowInfo(!showInfo)} className="p-3 bg-white/10 rounded-xl hover:bg-white/20"><Info className="w-5 h-5" /></button>
                  <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20"><Share2 className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Episodes */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {showInfo && (
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 mb-6">
              <h3 className="font-bold mb-2">About</h3>
              <p className="text-sm text-white/60 mb-3">{selectedMovie.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-white/40">Director:</span> <span className="text-white">{selectedMovie.director}</span></div>
                <div><span className="text-white/40">Cast:</span> <span className="text-white">{selectedMovie.cast.join(', ')}</span></div>
                <div><span className="text-white/40">Year:</span> <span className="text-white">{selectedMovie.year}</span></div>
                <div><span className="text-white/40">Genre:</span> <span className="text-white">{selectedMovie.genre.join(', ')}</span></div>
              </div>
            </div>
          )}

          {hasSeasons && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Episodes</h3>
                <select className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-1.5 text-sm text-white">
                  {selectedMovie.seasons?.map((s, i) => <option key={i}>Season {s.number}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                {selectedMovie.seasons?.[0]?.episodes.map((ep, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl hover:border-[#2A2A2A] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-sm font-bold text-white/40">{ep.number}</div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{ep.title}</h4>
                      <p className="text-xs text-white/40">{ep.duration} · {ep.description}</p>
                    </div>
                    {ep.watched ? (
                      <span className="text-xs text-emerald-400 flex items-center gap-1"><Star className="w-3 h-3" /> Watched</span>
                    ) : (
                      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Play className="w-4 h-4 text-white fill-white" /></button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar */}
          <h3 className="text-xl font-bold mb-3">More Like This</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allContent.filter(m => m.id !== selectedMovie.id).slice(0, 6).map(movie => (
              <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="group cursor-pointer">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-10 h-10 text-white fill-white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium truncate">{movie.title}</h3>
                <div className="flex items-center gap-1 text-xs text-white/40">
                  <Star className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" />{movie.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── MAIN VIEW ── */
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black"><span className="text-[#ef4444]">Jam</span><span className="text-white">Movies</span></Link>
          <div className="flex items-center gap-4">
            <Link to="/groupchat" className="text-white/60 hover:text-white text-sm hidden md:block">Group Chat</Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ef4444] to-[#C9A03F] flex items-center justify-center text-xs font-bold">JZ</div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-[#ef4444] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* ====== HOME TAB ====== */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* Hero */}
            <div className="relative rounded-2xl overflow-hidden h-[60vh] cursor-pointer" onClick={() => setSelectedMovie(FEATURED)}>
              <img src={FEATURED.backdrop} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full uppercase font-bold mb-2 inline-block">Featured</span>
                <h1 className="text-3xl md:text-5xl font-black mb-2">{FEATURED.title}</h1>
                <p className="text-white/60 max-w-xl mb-1">{FEATURED.description}</p>
                <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                  <StarRating rating={FEATURED.rating} />
                  <span>{FEATURED.year}</span>
                  <span>{FEATURED.duration}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{FEATURED.likes}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={(e) => { e.stopPropagation(); setSelectedMovie(FEATURED); setIsPlaying(true); }} className="flex items-center gap-2 bg-white hover:bg-white/90 text-black px-6 py-3 rounded-xl font-bold"><Play className="w-5 h-5 fill-black" /> Play Now</button>
                  <button onClick={(e) => { e.stopPropagation(); toggleWatchlist(FEATURED.id); }} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium ${watchlist.has(FEATURED.id) ? 'bg-white/20 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}><Plus className="w-5 h-5" /> {watchlist.has(FEATURED.id) ? 'In My List' : 'My List'}</button>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedMovie(FEATURED); }} className="p-3 bg-white/10 rounded-xl hover:bg-white/20"><Info className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            {/* Continue Watching */}
            <section>
              <div className="flex items-center gap-2 mb-4"><Clock className="w-5 h-5 text-[#ef4444]" /><h2 className="text-xl font-bold">Continue Watching</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {CONTINUE_WATCHING.map(item => (
                  <div key={item.id} className="cursor-pointer group" onClick={() => { const m = allContent.find(c => c.id === item.id); if (m) { setSelectedMovie(m); setIsPlaying(true); } }}>
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-2">
                      <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div className="h-full bg-[#ef4444]" style={{ width: `${item.progress}%` }} />
                      </div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-10 h-10 text-white fill-white" /></div>
                    </div>
                    <h3 className="text-sm font-medium truncate">{item.title}</h3>
                    <p className="text-xs text-white/40">{item.remaining}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Trending */}
            <section>
              <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-[#ef4444]" /><h2 className="text-xl font-bold">Trending Now</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allContent.filter(m => m.trending).map(movie => (
                  <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded flex items-center gap-1"><Flame className="w-3 h-3" /></div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-10 h-10 text-white fill-white" /></div>
                    </div>
                    <h3 className="text-sm font-medium truncate">{movie.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-white/40"><Star className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" />{movie.rating}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* New Releases */}
            <section>
              <div className="flex items-center gap-2 mb-4"><Calendar className="w-5 h-5 text-[#ef4444]" /><h2 className="text-xl font-bold">New Releases</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allContent.filter(m => m.new).map(movie => (
                  <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">New</div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-10 h-10 text-white fill-white" /></div>
                    </div>
                    <h3 className="text-sm font-medium truncate">{movie.title}</h3>
                    <p className="text-xs text-white/40">{movie.year}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section>
              <div className="flex items-center gap-2 mb-4"><Film className="w-5 h-5 text-[#ef4444]" /><h2 className="text-xl font-bold">Browse by Category</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map((cat, i) => (
                  <div key={i} className="relative h-24 rounded-xl overflow-hidden cursor-pointer group">
                    <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60" />
                    <div className="absolute inset-0" style={{ backgroundColor: cat.color + '30' }} />
                    <div className="relative h-full flex items-center p-4">
                      <h3 className="font-bold" style={{ color: cat.color }}>{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ====== SERIES TAB ====== */}
        {activeTab === 'series' && (
          <div className="space-y-10">
            <section>
              <div className="flex items-center gap-2 mb-4"><Tv className="w-5 h-5 text-[#ef4444]" /><h2 className="text-xl font-bold">All Series</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {SERIES.map(series => (
                  <div key={series.id} onClick={() => setSelectedMovie(series)} className="group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                      <img src={series.poster} alt={series.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 bg-black/60 text-white rounded">{series.duration}</div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-10 h-10 text-white fill-white" /></div>
                    </div>
                    <h3 className="text-sm font-medium truncate">{series.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-white/40"><Star className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" />{series.rating}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ====== MOVIES TAB ====== */}
        {activeTab === 'movies' && (
          <div className="space-y-10">
            <section>
              <div className="flex items-center gap-2 mb-4"><Clapperboard className="w-5 h-5 text-[#ef4444]" /><h2 className="text-xl font-bold">All Movies</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {MOVIES.map(movie => (
                  <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-10 h-10 text-white fill-white" /></div>
                    </div>
                    <h3 className="text-sm font-medium truncate">{movie.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-white/40"><Star className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" />{movie.rating}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ====== MY LIST TAB ====== */}
        {activeTab === 'mylist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">My List</h2>
              <span className="text-sm text-white/40">{watchlist.size} titles</span>
            </div>
            {watchlist.size === 0 ? (
              <div className="text-center py-16">
                <Bookmark className="w-12 h-12 text-[#1F1F1F] mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Your list is empty</p>
                <p className="text-sm text-white/40">Add movies and shows to watch later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allContent.filter(m => watchlist.has(m.id)).map(movie => (
                  <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <button onClick={(e) => { e.stopPropagation(); toggleWatchlist(movie.id); }} className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3 text-white" /></button>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-10 h-10 text-white fill-white" /></div>
                    </div>
                    <h3 className="text-sm font-medium truncate">{movie.title}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ====== SEARCH TAB ====== */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search movies, series, actors..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ef4444] transition-colors" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allContent.filter(m => !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))).map(movie => (
                <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="group cursor-pointer">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-10 h-10 text-white fill-white" /></div>
                  </div>
                  <h3 className="text-sm font-medium truncate">{movie.title}</h3>
                  <p className="text-xs text-white/40">{movie.type === 'series' ? 'Series' : 'Movie'} · {movie.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
