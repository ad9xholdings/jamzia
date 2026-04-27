/* ═══════════════════════════════════════════════════════════
   JamMusic — Complete Music Streaming Platform
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Heart, Shuffle, Repeat, Volume2, VolumeX,
  ListMusic, Disc, Mic2, Radio, TrendingUp, Clock, Search, Home,
  Library, Grid3X3, ChevronLeft, ChevronDown, MoreHorizontal, Share2,
  X, BarChart2, Calendar, Flame, Maximize2
} from 'lucide-react';
import { Link } from 'react-router';

/* ── Types ──────────────────────────────────────── */
interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  cover: string;
  duration: string;
  durationSec: number;
  plays: string;
  liked: boolean;
  explicit?: boolean;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  cover: string;
  year: string;
  trackCount: number;
  tracks?: Track[];
}

interface Artist {
  id: string;
  name: string;
  image: string;
  followers: string;
  genre: string;
  monthlyListeners: string;
}

interface Playlist {
  id: string;
  name: string;
  cover: string;
  trackCount: number;
  description: string;
  creator: string;
  likes: string;
  isOfficial?: boolean;
}

interface RadioStation {
  id: string;
  name: string;
  genre: string;
  listeners: string;
  nowPlaying: string;
  cover: string;
  color: string;
}

/* ── Mock Data ──────────────────────────────────── */
const TRENDING_TRACKS: Track[] = [
  { id: 't1', title: 'Fearless (NoFear Anthem)', artist: 'Ad9x Music', artistId: 'a1', album: 'Revolution', albumId: 'al1', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', duration: '3:42', durationSec: 222, plays: '12M', liked: false },
  { id: 't2', title: 'Cotton Dreams', artist: 'Mrs. Cotton', artistId: 'a2', album: 'Education Beats', albumId: 'al2', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', duration: '2:58', durationSec: 178, plays: '8.4M', liked: false },
  { id: 't3', title: 'XRPL Flow', artist: 'WisdomPay', artistId: 'a3', album: 'Blockchain Beats', albumId: 'al3', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop', duration: '4:15', durationSec: 255, plays: '6.2M', liked: true },
  { id: 't4', title: 'Build Mode', artist: 'JamZia', artistId: 'a4', album: 'Startup Sounds', albumId: 'al4', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', duration: '3:20', durationSec: 200, plays: '5.1M', liked: false },
  { id: 't5', title: 'Wealth Mode', artist: 'Ad9x Wealth', artistId: 'a5', album: 'Financial Freedom', albumId: 'al5', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', duration: '3:55', durationSec: 235, plays: '4.8M', liked: false },
  { id: 't6', title: 'NoFear Rising', artist: 'NoFear Foundation', artistId: 'a6', album: 'Strength', albumId: 'al6', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', duration: '4:02', durationSec: 242, plays: '4.1M', liked: true, explicit: true },
  { id: 't7', title: 'SkyIvy Night Lights', artist: 'SkyIvy', artistId: 'a7', album: 'Midnight', albumId: 'al7', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', duration: '3:30', durationSec: 210, plays: '3.9M', liked: false },
  { id: 't8', title: 'Brick Road Journey', artist: 'CBR Sound', artistId: 'a8', album: 'Game On', albumId: 'al8', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', duration: '3:12', durationSec: 192, plays: '3.5M', liked: false },
];

const PLAYLISTS: Playlist[] = [
  { id: 'p1', name: 'JamZia Top 50', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', trackCount: 50, description: 'The hottest tracks on JamZia right now', creator: 'JamMusic', likes: '2.4M', isOfficial: true },
  { id: 'p2', name: 'Focus & Build', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop', trackCount: 32, description: 'Deep work music for builders and creators', creator: 'Ad9x Studios', likes: '890K', isOfficial: true },
  { id: 'p3', name: 'Crypto Vibes', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', trackCount: 28, description: 'Blockchain beats for the Web3 generation', creator: 'JamZia', likes: '456K' },
  { id: 'p4', name: 'Education Station', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', trackCount: 45, description: 'Learning music from Mrs. Cotton\'s collection', creator: 'Mrs. Cotton', likes: '1.1M' },
  { id: 'p5', name: 'Community Anthems', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', trackCount: 24, description: 'Songs that bring us together', creator: 'JamZia', likes: '340K' },
  { id: 'p6', name: 'Late Night Code', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', trackCount: 38, description: 'Ambient beats for coding sessions', creator: 'DevTeam', likes: '567K' },
];

const ALBUMS: Album[] = [
  { id: 'al1', title: 'Revolution', artist: 'Ad9x Music', artistId: 'a1', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', year: '2026', trackCount: 12 },
  { id: 'al2', title: 'Education Beats', artist: 'Mrs. Cotton', artistId: 'a2', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', year: '2026', trackCount: 15 },
  { id: 'al3', title: 'Blockchain Beats', artist: 'WisdomPay', artistId: 'a3', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop', year: '2025', trackCount: 10 },
  { id: 'al4', title: 'Startup Sounds', artist: 'JamZia', artistId: 'a4', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', year: '2026', trackCount: 14 },
  { id: 'al5', title: 'Financial Freedom', artist: 'Ad9x Wealth', artistId: 'a5', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', year: '2026', trackCount: 11 },
  { id: 'al6', title: 'Strength', artist: 'NoFear Foundation', artistId: 'a6', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', year: '2026', trackCount: 9 },
  { id: 'al7', title: 'Midnight', artist: 'SkyIvy', artistId: 'a7', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', year: '2025', trackCount: 13 },
  { id: 'al8', title: 'Game On', artist: 'CBR Sound', artistId: 'a8', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', year: '2026', trackCount: 16 },
];

const ARTISTS: Artist[] = [
  { id: 'a1', name: 'Ad9x Music', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', followers: '2.4M', genre: 'Hip Hop / R&B', monthlyListeners: '4.8M' },
  { id: 'a2', name: 'Mrs. Cotton', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', followers: '1.8M', genre: 'Educational / Kids', monthlyListeners: '3.2M' },
  { id: 'a3', name: 'WisdomPay', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop', followers: '1.1M', genre: 'Electronic / Finance', monthlyListeners: '2.5M' },
  { id: 'a4', name: 'JamZia', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', followers: '3.6M', genre: 'Pop / Alternative', monthlyListeners: '6.1M' },
  { id: 'a5', name: 'Ad9x Wealth', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', followers: '890K', genre: 'Motivational / Hip Hop', monthlyListeners: '1.9M' },
  { id: 'a6', name: 'NoFear Foundation', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', followers: '2.2M', genre: 'Inspirational / Rock', monthlyListeners: '4.5M' },
];

const RADIO_STATIONS: RadioStation[] = [
  { id: 'r1', name: 'JamZia FM', genre: 'Hip Hop / R&B', listeners: '45.2K', nowPlaying: 'SkyIvy — Night Lights', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', color: '#ec4899' },
  { id: 'r2', name: 'BlackDiamond Radio', genre: 'Classical / Jazz', listeners: '12.8K', nowPlaying: 'Symphony No. 9 — Beethoven', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop', color: '#f59e0b' },
  { id: 'r3', name: 'Wisdom Talk', genre: 'Business / Finance', listeners: '89K', nowPlaying: 'DeFi Daily — XRPL Updates', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', color: '#22c55e' },
  { id: 'r4', name: 'NoFear Waves', genre: 'Wellness / Meditation', listeners: '34.5K', nowPlaying: 'Healing Frequencies — 432Hz', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', color: '#7096D1' },
  { id: 'r5', name: 'Cotton Brick Road', genre: 'Gaming / Esports', listeners: '67K', nowPlaying: 'Tournament Live — Cotton Cup', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', color: '#a855f7' },
  { id: 'r6', name: 'Mrs. Cotton Academy', genre: 'Education / Phonics', listeners: '23K', nowPlaying: 'Phonics Mastery — Lesson 7', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', color: '#06b6d4' },
];

const GENRES = [
  { name: 'Hip Hop', color: '#C9A03F', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { name: 'R&B', color: '#ec4899', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop' },
  { name: 'Electronic', color: '#22c55e', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
  { name: 'Jazz', color: '#f59e0b', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop' },
  { name: 'Classical', color: '#7096D1', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
  { name: 'Rock', color: '#ef4444', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
  { name: 'Pop', color: '#a855f7', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop' },
  { name: 'Ambient', color: '#06b6d4', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop' },
];

const MOODS = [
  { name: 'Focus', icon: '🎯', color: '#22c55e' },
  { name: 'Workout', icon: '💪', color: '#ef4444' },
  { name: 'Chill', icon: '😌', color: '#7096D1' },
  { name: 'Party', icon: '🎉', color: '#ec4899' },
  { name: 'Sleep', icon: '🌙', color: '#a855f7' },
  { name: 'Study', icon: '📚', color: '#f59e0b' },
  { name: 'Drive', icon: '🚗', color: '#C9A03F' },
  { name: 'Rainy Day', icon: '🌧️', color: '#06b6d4' },
];

const CHARTS = [
  { name: 'JamZia Top 50', subtitle: 'Global', plays: '12.4M daily' },
  { name: 'Viral 30', subtitle: 'Fastest Rising', plays: '8.9M daily' },
  { name: 'New Release Chart', subtitle: 'This Week', plays: '5.2M daily' },
  { name: 'BlackDiamond Top 20', subtitle: 'Originals', plays: '3.8M daily' },
];

/* ── Helpers ────────────────────────────────────── */
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ── Track Row ──────────────────────────────────── */
function TrackRow({ track, index, isPlaying, onPlay, showAlbum = true, showPlays = true }: {
  track: Track; index: number; isPlaying: boolean; onPlay: () => void; showAlbum?: boolean; showPlays?: boolean;
}) {
  const [liked, setLiked] = useState(track.liked);
  return (
    <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group ${isPlaying ? 'bg-white/5' : ''}`}>
      <span className="text-white/30 text-sm w-5 text-center group-hover:hidden">{isPlaying ? <div className="w-4 h-4 flex items-end gap-0.5"><div className="w-0.5 bg-[#C9A03F] animate-pulse h-3" /><div className="w-0.5 bg-[#C9A03F] animate-pulse h-2" /><div className="w-0.5 bg-[#C9A03F] animate-pulse h-4" /></div> : index + 1}</span>
      <button onClick={onPlay} className="hidden group-hover:block w-5"><Play className="w-4 h-4 text-white" /></button>
      <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isPlaying ? 'text-[#C9A03F]' : 'text-white'}`}>{track.title}</p>
        <p className="text-xs text-white/40 truncate">{track.artist}</p>
      </div>
      {showAlbum && <span className="text-white/30 text-xs hidden md:block w-32 truncate">{track.album}</span>}
      {showPlays && <span className="text-white/30 text-xs hidden sm:block w-16 text-right">{track.plays}</span>}
      <span className="text-white/30 text-xs w-10 text-right">{track.duration}</span>
      <button onClick={() => setLiked(!liked)}><Heart className={`w-4 h-4 ${liked ? 'text-[#C9A03F] fill-[#C9A03F]' : 'text-white/30 hover:text-white'}`} /></button>
      <button className="text-white/30 hover:text-white hidden group-hover:block"><MoreHorizontal className="w-4 h-4" /></button>
    </div>
  );
}

/* ── Main Component ─────────────────────────────── */
export default function JamMusic() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [nowPlayingView, setNowPlayingView] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [libraryTab, setLibraryTab] = useState('liked');
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set(TRENDING_TRACKS.filter(t => t.liked).map(t => t.id)));
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Playback simulation */
  useEffect(() => {
    if (isPlaying && currentTrack) {
      progressInterval.current = setInterval(() => {
        setProgress(p => {
          if (p >= (currentTrack.durationSec || 200)) {
            if (repeat) return 0;
            setIsPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => { if (progressInterval.current) clearInterval(progressInterval.current); };
  }, [isPlaying, currentTrack, repeat]);

  const toggleLike = (id: string) => {
    setLikedSongs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Browse', icon: Grid3X3 },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'radio', label: 'Radio', icon: Radio },
  ];

  /* ── Now Playing Full View ── */
  if (nowPlayingView && currentTrack) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setNowPlayingView(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronDown className="w-6 h-6" /></button>
          <span className="text-xs text-white/50 uppercase tracking-wider">Now Playing</span>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><MoreHorizontal className="w-6 h-6" /></button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <img src={currentTrack.cover} alt="" className="w-72 h-72 md:w-96 md:h-96 rounded-2xl shadow-2xl object-cover mb-8" />
          <div className="w-full max-w-md">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
                <p className="text-white/60">{currentTrack.artist}</p>
              </div>
              <button onClick={() => toggleLike(currentTrack.id)}><Heart className={`w-6 h-6 ${likedSongs.has(currentTrack.id) ? 'text-[#C9A03F] fill-[#C9A03F]' : 'text-white/40'}`} /></button>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                setProgress(Math.floor(pct * (currentTrack.durationSec || 200)));
              }}>
                <div className="h-full bg-[#C9A03F] rounded-full" style={{ width: `${((progress / (currentTrack.durationSec || 200)) * 100)}%` }} />
              </div>
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>{formatTime(progress)}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button onClick={() => setShuffle(!shuffle)} className={shuffle ? 'text-[#C9A03F]' : 'text-white/40'}><Shuffle className="w-5 h-5" /></button>
              <button className="text-white hover:text-[#C9A03F]"><SkipBack className="w-7 h-7" /></button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                {isPlaying ? <Pause className="w-8 h-8 text-black" /> : <Play className="w-8 h-8 text-black fill-black ml-1" />}
              </button>
              <button className="text-white hover:text-[#C9A03F]"><SkipForward className="w-7 h-7" /></button>
              <button onClick={() => setRepeat(!repeat)} className={repeat ? 'text-[#C9A03F]' : 'text-white/40'}><Repeat className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Album Detail View ── */
  if (selectedAlbum) {
    const albumTracks = TRENDING_TRACKS.filter(t => t.albumId === selectedAlbum.id);
    return (
      <div className="min-h-screen bg-black text-white pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => setSelectedAlbum(null)} className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-4 mt-4"><ChevronLeft className="w-4 h-4" /> Back</button>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img src={selectedAlbum.cover} alt={selectedAlbum.title} className="w-48 h-48 rounded-xl shadow-2xl object-cover" />
            <div className="flex flex-col justify-end">
              <span className="text-xs text-white/50 uppercase">Album</span>
              <h1 className="text-4xl font-black mb-2">{selectedAlbum.title}</h1>
              <p className="text-white/60 mb-1"><span className="text-[#C9A03F] hover:underline cursor-pointer">{selectedAlbum.artist}</span> · {selectedAlbum.year} · {selectedAlbum.trackCount} songs</p>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { if (albumTracks[0]) playTrack(albumTracks[0]); }} className="flex items-center gap-2 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black px-6 py-3 rounded-xl font-bold"><Play className="w-5 h-5 fill-black" /> Play</button>
                <button className="p-3 border border-white/20 rounded-full hover:border-white/40"><Heart className="w-5 h-5" /></button>
                <button className="p-3 border border-white/20 rounded-full hover:border-white/40"><Share2 className="w-5 h-5" /></button>
                <button className="p-3 border border-white/20 rounded-full hover:border-white/40"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {albumTracks.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} isPlaying={currentTrack?.id === track.id && isPlaying} onPlay={() => playTrack(track)} showAlbum={false} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Artist Detail View ── */
  if (selectedArtist) {
    const artistAlbums = ALBUMS.filter(a => a.artistId === selectedArtist.id);
    const topTracks = TRENDING_TRACKS.filter(t => t.artistId === selectedArtist.id);
    return (
      <div className="min-h-screen bg-black text-white pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => setSelectedArtist(null)} className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-4 mt-4"><ChevronLeft className="w-4 h-4" /> Back</button>
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <img src={selectedArtist.image} alt={selectedArtist.name} className="w-40 h-40 rounded-full shadow-2xl object-cover" />
            <div>
              <span className="text-xs text-white/50 uppercase">Artist</span>
              <h1 className="text-4xl font-black mb-2">{selectedArtist.name}</h1>
              <p className="text-white/60">{selectedArtist.monthlyListeners} monthly listeners · {selectedArtist.followers} followers</p>
              <div className="flex items-center gap-3 mt-4">
                <button className="flex items-center gap-2 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black px-6 py-3 rounded-xl font-bold"><Play className="w-5 h-5 fill-black" /> Play</button>
                <button className="px-6 py-3 border border-white/20 rounded-xl font-medium hover:border-white/40">Follow</button>
                <button className="p-3 border border-white/20 rounded-full hover:border-white/40"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">Popular</h2>
          <div className="space-y-1 mb-8">
            {topTracks.slice(0, 5).map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} isPlaying={currentTrack?.id === track.id && isPlaying} onPlay={() => playTrack(track)} />
            ))}
          </div>
          <h2 className="text-xl font-bold mb-4">Discography</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artistAlbums.map(album => (
              <div key={album.id} onClick={() => setSelectedAlbum(album)} className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                  <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-sm font-medium truncate">{album.title}</h3>
                <p className="text-xs text-white/40">{album.year} · {album.trackCount} tracks</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Playlist Detail View ── */
  if (selectedPlaylist) {
    return (
      <div className="min-h-screen bg-black text-white pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => setSelectedPlaylist(null)} className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-4 mt-4"><ChevronLeft className="w-4 h-4" /> Back</button>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img src={selectedPlaylist.cover} alt={selectedPlaylist.name} className="w-48 h-48 rounded-xl shadow-2xl object-cover" />
            <div className="flex flex-col justify-end">
              <span className="text-xs text-white/50 uppercase">Playlist</span>
              <h1 className="text-4xl font-black mb-2">{selectedPlaylist.name}</h1>
              <p className="text-white/60 mb-1">{selectedPlaylist.description}</p>
              <p className="text-white/40 text-sm">Created by <span className="text-[#C9A03F]">{selectedPlaylist.creator}</span> · {selectedPlaylist.trackCount} songs · {selectedPlaylist.likes} likes</p>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => { if (TRENDING_TRACKS[0]) playTrack(TRENDING_TRACKS[0]); }} className="flex items-center gap-2 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black px-6 py-3 rounded-xl font-bold"><Play className="w-5 h-5 fill-black" /> Play</button>
                <button className="p-3 border border-white/20 rounded-full hover:border-white/40"><Heart className="w-5 h-5" /></button>
                <button className="p-3 border border-white/20 rounded-full hover:border-white/40"><Share2 className="w-5 h-5" /></button>
                <button className="p-3 border border-white/20 rounded-full hover:border-white/40"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {TRENDING_TRACKS.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} isPlaying={currentTrack?.id === track.id && isPlaying} onPlay={() => playTrack(track)} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── MAIN VIEW ── */
  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black">
            <span className="text-[#C9A03F]">Jam</span><span className="text-white">Music</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/groupchat" className="text-white/60 hover:text-white text-sm transition-colors hidden md:block">Group Chat</Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A03F] to-[#7096D1] flex items-center justify-center text-xs font-bold">JZ</div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-[#C9A03F] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* ====== HOME TAB ====== */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* Hero Now Playing */}
            {currentTrack && (
              <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 cursor-pointer" onClick={() => setNowPlayingView(true)}>
                <img src={currentTrack.cover} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="relative z-10 h-full flex items-center p-6 md:p-10 gap-6">
                  <img src={currentTrack.cover} alt={currentTrack.title} className="w-32 h-32 md:w-48 md:h-48 rounded-xl shadow-2xl object-cover" />
                  <div>
                    <p className="text-[#C9A03F] text-sm font-bold uppercase tracking-wider mb-1">Now Playing</p>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{currentTrack.title}</h1>
                    <p className="text-white/60 text-lg mb-4">{currentTrack.artist} · {currentTrack.album}</p>
                    <div className="flex gap-3">
                      <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }} className="flex items-center gap-2 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black px-6 py-2.5 rounded-xl font-bold transition-all">
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-black" />} {isPlaying ? 'Pause' : 'Play'}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); toggleLike(currentTrack.id); }} className={`px-4 py-2.5 rounded-xl transition-all ${likedSongs.has(currentTrack.id) ? 'bg-[#C9A03F]/20 text-[#C9A03F]' : 'bg-white/10 hover:bg-white/20 text-white'}`}><Heart className={`w-5 h-5 ${likedSongs.has(currentTrack.id) ? 'fill-current' : ''}`} /></button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Featured Playlists */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><Disc className="w-5 h-5 text-[#C9A03F]" /><h2 className="text-xl font-bold">Featured Playlists</h2></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {PLAYLISTS.map((pl) => (
                  <div key={pl.id} onClick={() => setSelectedPlaylist(pl)} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#C9A03F] flex items-center justify-center"><Play className="w-6 h-6 text-black fill-black ml-1" /></div>
                      </div>
                    </div>
                    <h3 className="text-white text-sm font-medium truncate">{pl.name}</h3>
                    <p className="text-white/40 text-xs">{pl.trackCount} tracks</p>
                  </div>
                ))}
              </div>
            </section>

            {/* New Releases */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-[#C9A03F]" /><h2 className="text-xl font-bold">New Releases</h2></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {ALBUMS.slice(0, 6).map(album => (
                  <div key={album.id} onClick={() => setSelectedAlbum(album)} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-sm font-medium truncate">{album.title}</h3>
                    <p className="text-xs text-white/40">{album.artist}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Trending Tracks */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#C9A03F]" /><h2 className="text-xl font-bold">Trending Now</h2></div>
              </div>
              <div className="bg-white/[0.02] rounded-2xl p-4 space-y-1">
                {TRENDING_TRACKS.map((track, i) => (
                  <TrackRow key={track.id} track={track} index={i} isPlaying={currentTrack?.id === track.id && isPlaying} onPlay={() => playTrack(track)} />
                ))}
              </div>
            </section>

            {/* Recently Played */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-[#C9A03F]" /><h2 className="text-xl font-bold">Recently Played</h2></div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {TRENDING_TRACKS.slice(0, 6).map((track) => (
                  <div key={track.id} onClick={() => playTrack(track)} className="flex-shrink-0 w-40 cursor-pointer group">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-10 h-10 text-white fill-white" /></div>
                    </div>
                    <h3 className="text-white text-sm font-medium truncate">{track.title}</h3>
                    <p className="text-white/40 text-xs">{track.artist}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Charts */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><BarChart2 className="w-5 h-5 text-[#C9A03F]" /><h2 className="text-xl font-bold">Charts</h2></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CHARTS.map((chart, i) => (
                  <div key={i} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 hover:border-[#2A2A2A] transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">{chart.name}</h3>
                      <Flame className="w-4 h-4 text-[#f59e0b]" />
                    </div>
                    <p className="text-xs text-white/50">{chart.subtitle}</p>
                    <p className="text-xs text-[#C9A03F] mt-1">{chart.plays}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ====== BROWSE TAB ====== */}
        {activeTab === 'browse' && (
          <div className="space-y-10">
            {/* Genres */}
            <section>
              <h2 className="text-xl font-bold mb-4">Genres</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GENRES.map((genre, i) => (
                  <div key={i} className="relative h-32 rounded-xl overflow-hidden cursor-pointer group">
                    <img src={genre.image} alt={genre.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute inset-0" style={{ backgroundColor: genre.color + '30' }} />
                    <div className="relative h-full flex items-center p-4">
                      <h3 className="text-xl font-black" style={{ color: genre.color }}>{genre.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Moods */}
            <section>
              <h2 className="text-xl font-bold mb-4">Moods</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MOODS.map((mood, i) => (
                  <div key={i} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 hover:border-[#2A2A2A] transition-colors cursor-pointer text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl" style={{ backgroundColor: mood.color + '20' }}>{mood.icon}</div>
                    <h3 className="font-medium text-sm" style={{ color: mood.color }}>{mood.name}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Artists */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><Mic2 className="w-5 h-5 text-[#C9A03F]" /><h2 className="text-xl font-bold">Featured Artists</h2></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {ARTISTS.map(artist => (
                  <div key={artist.id} onClick={() => setSelectedArtist(artist)} className="group cursor-pointer text-center">
                    <img src={artist.image} alt={artist.name} className="w-full aspect-square rounded-full object-cover mb-2 group-hover:scale-105 transition-transform" />
                    <h3 className="text-sm font-medium truncate">{artist.name}</h3>
                    <p className="text-xs text-white/40">{artist.followers} followers</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Albums */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><Disc className="w-5 h-5 text-[#C9A03F]" /><h2 className="text-xl font-bold">Albums</h2></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {ALBUMS.map(album => (
                  <div key={album.id} onClick={() => setSelectedAlbum(album)} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-sm font-medium truncate">{album.title}</h3>
                    <p className="text-xs text-white/40">{album.artist}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ====== SEARCH TAB ====== */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search songs, artists, albums, playlists..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A03F] transition-colors"
              />
            </div>
            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-bold text-white/60 uppercase mb-3">Songs</h3>
                <div className="space-y-1">
                  {TRENDING_TRACKS.filter(t => !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.artist.toLowerCase().includes(searchQuery.toLowerCase())).map((track, i) => (
                    <TrackRow key={track.id} track={track} index={i} isPlaying={currentTrack?.id === track.id && isPlaying} onPlay={() => playTrack(track)} />
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-sm font-bold text-white/60 uppercase mb-3">Artists</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {ARTISTS.filter(a => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(artist => (
                    <div key={artist.id} onClick={() => setSelectedArtist(artist)} className="group cursor-pointer text-center">
                      <img src={artist.image} alt={artist.name} className="w-full aspect-square rounded-full object-cover mb-2 group-hover:scale-105 transition-transform" />
                      <h3 className="text-sm font-medium">{artist.name}</h3>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ====== LIBRARY TAB ====== */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-1 w-fit">
              {['liked', 'playlists', 'albums', 'artists'].map(t => (
                <button key={t} onClick={() => setLibraryTab(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${libraryTab === t ? 'bg-[#C9A03F] text-black' : 'text-white/60 hover:text-white'}`}>
                  {t}
                </button>
              ))}
            </div>

            {libraryTab === 'liked' && (
              <div className="bg-white/[0.02] rounded-2xl p-4 space-y-1">
                <div className="flex items-center gap-4 mb-4 p-2">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A03F] flex items-center justify-center"><Heart className="w-6 h-6 text-black" /></div>
                  <div>
                    <h3 className="font-bold">Liked Songs</h3>
                    <p className="text-xs text-white/40">{likedSongs.size} songs</p>
                  </div>
                  <button onClick={() => { const first = TRENDING_TRACKS.find(t => likedSongs.has(t.id)); if (first) playTrack(first); }} className="ml-auto w-10 h-10 rounded-full bg-[#C9A03F] flex items-center justify-center"><Play className="w-5 h-5 text-black fill-black ml-0.5" /></button>
                </div>
                {TRENDING_TRACKS.filter(t => likedSongs.has(t.id)).map((track, i) => (
                  <TrackRow key={track.id} track={track} index={i} isPlaying={currentTrack?.id === track.id && isPlaying} onPlay={() => playTrack(track)} showAlbum={true} showPlays={false} />
                ))}
                {likedSongs.size === 0 && <p className="text-center text-white/40 py-8">No liked songs yet. Start exploring!</p>}
              </div>
            )}

            {libraryTab === 'playlists' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {PLAYLISTS.map(pl => (
                  <div key={pl.id} onClick={() => setSelectedPlaylist(pl)} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-sm font-medium truncate">{pl.name}</h3>
                    <p className="text-xs text-white/40">By {pl.creator}</p>
                  </div>
                ))}
              </div>
            )}

            {libraryTab === 'albums' && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {ALBUMS.map(album => (
                  <div key={album.id} onClick={() => setSelectedAlbum(album)} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-sm font-medium truncate">{album.title}</h3>
                    <p className="text-xs text-white/40">{album.artist}</p>
                  </div>
                ))}
              </div>
            )}

            {libraryTab === 'artists' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {ARTISTS.map(artist => (
                  <div key={artist.id} onClick={() => setSelectedArtist(artist)} className="group cursor-pointer text-center">
                    <img src={artist.image} alt={artist.name} className="w-full aspect-square rounded-full object-cover mb-2 group-hover:scale-105 transition-transform" />
                    <h3 className="text-sm font-medium">{artist.name}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ====== RADIO TAB ====== */}
        {activeTab === 'radio' && (
          <div className="space-y-10">
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><Radio className="w-5 h-5 text-[#C9A03F]" /><h2 className="text-xl font-bold">Live Stations</h2></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {RADIO_STATIONS.map(station => (
                  <div key={station.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 hover:border-[#2A2A2A] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={station.cover} alt={station.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h3 className="font-bold text-sm">{station.name}</h3>
                        <p className="text-xs text-white/40">{station.genre}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      <span>{station.listeners} listening</span>
                    </div>
                    <p className="text-xs text-[#C9A03F] truncate">Now: {station.nowPlaying}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* ====== PLAYER BAR ====== */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-white/5 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <img src={currentTrack.cover} alt="" className="w-12 h-12 rounded-lg object-cover cursor-pointer" onClick={() => setNowPlayingView(true)} />
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setNowPlayingView(true)}>
              <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
              <p className="text-white/40 text-xs truncate">{currentTrack.artist}</p>
            </div>

            {/* Progress - mobile hidden */}
            <div className="hidden md:flex flex-col items-center flex-1 max-w-md">
              <div className="flex items-center gap-3 w-full">
                <button onClick={() => setShuffle(!shuffle)} className={shuffle ? 'text-[#C9A03F]' : 'text-white/40 hover:text-white'}><Shuffle className="w-4 h-4" /></button>
                <button className="text-white hover:text-[#C9A03F]"><SkipBack className="w-5 h-5" /></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                  {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black fill-black ml-0.5" />}
                </button>
                <button className="text-white hover:text-[#C9A03F]"><SkipForward className="w-5 h-5" /></button>
                <button onClick={() => setRepeat(!repeat)} className={repeat ? 'text-[#C9A03F]' : 'text-white/40 hover:text-white'}><Repeat className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-2 w-full mt-1">
                <span className="text-[10px] text-white/40 w-8 text-right">{formatTime(progress)}</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  setProgress(Math.floor(pct * (currentTrack.durationSec || 200)));
                }}>
                  <div className="h-full bg-[#C9A03F] rounded-full" style={{ width: `${((progress / (currentTrack.durationSec || 200)) * 100)}%` }} />
                </div>
                <span className="text-[10px] text-white/40 w-8">{currentTrack.duration}</span>
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black fill-black ml-0.5" />}
              </button>
            </div>

            {/* Right controls */}
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => setQueueOpen(!queueOpen)} className={`text-white/40 hover:text-white ${queueOpen ? 'text-[#C9A03F]' : ''}`}><ListMusic className="w-5 h-5" /></button>
              <button onClick={() => setIsMuted(!isMuted)} className="text-white/40 hover:text-white">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                setVolume(Math.floor(pct * 100));
                setIsMuted(false);
              }}>
                <div className="h-full bg-white rounded-full" style={{ width: `${isMuted ? 0 : volume}%` }} />
              </div>
              <button onClick={() => setNowPlayingView(true)} className="text-white/40 hover:text-white"><Maximize2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}

      {/* ====== QUEUE SIDEBAR ====== */}
      {queueOpen && currentTrack && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#111] border-l border-white/5 z-50 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Play Queue</h3>
            <button onClick={() => setQueueOpen(false)}><X className="w-5 h-5 text-white/40 hover:text-white" /></button>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-white/40 uppercase mb-2">Now Playing</p>
            <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
              <img src={currentTrack.cover} alt="" className="w-10 h-10 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-[#C9A03F]">{currentTrack.title}</p>
                <p className="text-xs text-white/40 truncate">{currentTrack.artist}</p>
              </div>
              <div className="w-4 h-4 flex items-end gap-0.5"><div className="w-0.5 bg-[#C9A03F] animate-pulse h-3" /><div className="w-0.5 bg-[#C9A03F] animate-pulse h-2" /><div className="w-0.5 bg-[#C9A03F] animate-pulse h-4" /></div>
            </div>
            <p className="text-xs text-white/40 uppercase mt-4 mb-2">Next Up</p>
            {TRENDING_TRACKS.filter(t => t.id !== currentTrack.id).slice(0, 8).map((track, i) => (
              <div key={track.id} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer group" onClick={() => playTrack(track)}>
                <span className="text-white/20 text-xs w-4">{i + 1}</span>
                <img src={track.cover} alt="" className="w-8 h-8 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{track.title}</p>
                  <p className="text-xs text-white/40 truncate">{track.artist}</p>
                </div>
                <button className="hidden group-hover:block text-white/40 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
