import { useState, useRef } from 'react';
import { Play, Heart, MessageCircle, Share2, Bookmark, MoreVertical, ChevronUp, ChevronDown, Music } from 'lucide-react';
import { Link } from 'react-router';

/* ── Types ──────────────────────────────────────── */
interface Short {
  id: string;
  thumbnail: string;
  title: string;
  creator: { name: string; avatar: string; handle: string; verified: boolean };
  views: string;
  duration: string;
  likes: string;
  comments: string;
  song: string;
  aspectRatio: '9:16' | '1:1' | '4:5';
}

/* ── Mock Data ──────────────────────────────────── */
const SHORTS: Short[] = [
  {
    id: 's1', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=540&h=960&fit=crop',
    title: 'Behind the scenes: Ad9x Studios tour', creator: { name: 'Ad9x Studios', avatar: 'A', handle: '@ad9x', verified: true },
    views: '1.2M', duration: '0:45', likes: '89K', comments: '2.1K', song: 'Original Sound - Ad9x', aspectRatio: '9:16',
  },
  {
    id: 's2', thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=540&h=960&fit=crop',
    title: 'Phonics in 15 seconds with Mrs. Cotton', creator: { name: 'Mrs. Cotton', avatar: 'MC', handle: '@mrscotton', verified: true },
    views: '3.4M', duration: '0:15', likes: '245K', comments: '8.9K', song: 'Learn with Cotton', aspectRatio: '9:16',
  },
  {
    id: 's3', thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=540&h=960&fit=crop',
    title: 'WisdomPay on XRP Ledger - how it works', creator: { name: 'WisdomPay', avatar: 'W', handle: '@wisdompay', verified: true },
    views: '890K', duration: '0:30', likes: '67K', comments: '1.8K', song: 'Crypto Flow', aspectRatio: '9:16',
  },
  {
    id: 's4', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=540&h=960&fit=crop',
    title: 'NoFear community gathering highlights', creator: { name: 'NoFear', avatar: 'NF', handle: '@nofear', verified: true },
    views: '2.1M', duration: '0:58', likes: '156K', comments: '5.4K', song: 'Fearless Anthem', aspectRatio: '9:16',
  },
  {
    id: 's5', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=540&h=960&fit=crop',
    title: 'JamZia app walkthrough - 50 platforms!', creator: { name: 'JamZia', avatar: 'JZ', handle: '@jamzia', verified: true },
    views: '780K', duration: '1:00', likes: '45K', comments: '1.2K', song: 'Tech Vibes', aspectRatio: '9:16',
  },
  {
    id: 's6', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=540&h=960&fit=crop',
    title: 'How to collect JamCoins - AR tutorial', creator: { name: 'JamCoins', avatar: 'JC', handle: '@jamcoins', verified: true },
    views: '1.5M', duration: '0:35', likes: '112K', comments: '3.6K', song: 'Game On', aspectRatio: '9:16',
  },
  {
    id: 's7', thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=540&h=960&fit=crop',
    title: 'Wealth Academy: Compound interest explained', creator: { name: 'Ad9x Wealth', avatar: 'AW', handle: '@ad9xwealth', verified: true },
    views: '640K', duration: '0:42', likes: '38K', comments: '980', song: 'Wealth Mode', aspectRatio: '9:16',
  },
  {
    id: 's8', thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=540&h=960&fit=crop',
    title: 'Podcast studio tour - JamZia Media', creator: { name: 'JamZia Media', avatar: 'JM', handle: '@jamzmedia', verified: true },
    views: '430K', duration: '0:28', likes: '28K', comments: '650', song: 'Studio Beats', aspectRatio: '9:16',
  },
];

/* ── Short Card ─────────────────────────────────── */
function ShortCard({ short, index, onPrev, onNext }: { short: Short; index: number; onPrev: () => void; onNext: () => void }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleTap = () => {
    if (!liked) setLiked(true);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  return (
    <div className="relative h-screen w-full flex-shrink-0 snap-start snap-always overflow-hidden bg-black">
      {/* Navigation arrows */}
      <button
        onClick={onPrev}
        className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center ${index === 0 ? 'opacity-30 pointer-events-none' : 'opacity-70 hover:opacity-100'} transition-opacity`}
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={onNext}
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center ${index === SHORTS.length - 1 ? 'opacity-30 pointer-events-none' : 'opacity-70 hover:opacity-100'} transition-opacity`}
      >
        <ChevronDown className="w-5 h-5 text-white" />
      </button>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center" onDoubleClick={handleDoubleTap}>
        <img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Heart animation */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <Heart className="w-24 h-24 text-red-500 fill-red-500 animate-ping" />
        </div>
      )}

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>

      {/* Top right */}
      <div className="absolute top-4 right-4 z-20">
        <Link to="/" className="text-white/80 text-sm font-medium bg-black/30 backdrop-blur px-3 py-1 rounded-full">✕ Close</Link>
      </div>

      {/* Right actions */}
      <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4">
        <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-0.5">
          <Heart className={`w-7 h-7 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          <span className="text-white text-[10px]">{liked ? `${(parseFloat(short.likes.replace('K', '')) + 1).toFixed(0)}K` : short.likes}</span>
        </button>
        <Link to="/groupchat" className="flex flex-col items-center gap-0.5">
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="text-white text-[10px]">{short.comments}</span>
        </Link>
        <button className="flex flex-col items-center gap-0.5">
          <Share2 className="w-7 h-7 text-white" />
          <span className="text-white text-[10px]">Share</span>
        </button>
        <button onClick={() => setBookmarked(!bookmarked)}>
          <Bookmark className={`w-7 h-7 ${bookmarked ? 'text-[#C9A03F] fill-[#C9A03F]' : 'text-white'}`} />
        </button>
        <button>
          <MoreVertical className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-12 left-4 right-16 z-20">
        <p className="text-white font-semibold text-sm mb-1">{short.title}</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A03F] to-[#7096D1] flex items-center justify-center text-[8px] font-bold">
            {short.creator.avatar}
          </div>
          <span className="text-white/80 text-xs">{short.creator.name}</span>
          {short.creator.verified && <span className="text-[#C9A03F] text-xs">✓</span>}
          <button className="border border-white/30 text-white text-[10px] px-2 py-0.5 rounded-full ml-1">Follow</button>
        </div>
        <div className="flex items-center gap-1.5 text-white/50 text-xs">
          <Music className="w-3 h-3" />
          <span>{short.song}</span>
        </div>
      </div>

      {/* Views badge */}
      <div className="absolute top-4 left-4 z-20 bg-black/30 backdrop-blur px-2 py-1 rounded-full">
        <span className="text-white text-xs font-medium">{short.views} views</span>
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-4 right-16 z-20 bg-black/50 backdrop-blur px-2 py-1 rounded-full">
        <span className="text-white text-xs">{short.duration}</span>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────── */
export default function JamShorts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setCurrentIndex] = useState(0);

  const scrollToIndex = (idx: number) => {
    if (containerRef.current && idx >= 0 && idx < SHORTS.length) {
      const children = containerRef.current.children;
      if (children[idx]) {
        children[idx].scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(idx);
      }
    }
  };

  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SHORTS.map((short, idx) => (
          <ShortCard
            key={short.id}
            short={short}
            index={idx}
            onPrev={() => scrollToIndex(idx - 1)}
            onNext={() => scrollToIndex(idx + 1)}
          />
        ))}
      </div>
    </div>
  );
}
