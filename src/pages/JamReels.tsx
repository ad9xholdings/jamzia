import { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Music, Volume2, VolumeX, Play } from 'lucide-react';
import { Link } from 'react-router';

/* ── Types ──────────────────────────────────────── */
interface Reel {
  id: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  creator: { name: string; handle: string; avatar: string; verified: boolean };
  song: string;
  likes: string;
  comments: string;
  shares: string;
  liked: boolean;
  bookmarked: boolean;
}

/* ── Mock Data ──────────────────────────────────── */
const REELS: Reel[] = [
  {
    id: 'r1', videoUrl: '', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=540&h=960&fit=crop',
    caption: 'The making of JamZia — behind the scenes at Ad9x Studios. Building the everything app one line of code at a time.',
    creator: { name: 'Ad9x Studios', handle: '@ad9x', avatar: 'A', verified: true },
    song: 'Original Sound - Ad9x Studios', likes: '2.4M', comments: '18.2K', shares: '45K', liked: false, bookmarked: false,
  },
  {
    id: 'r2', videoUrl: '', thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=540&h=960&fit=crop',
    caption: 'Mrs. Cotton teaches Phonics in 30 seconds! Watch the magic happen. Education should be fun for everyone.',
    creator: { name: 'Mrs. Cotton', handle: '@mrscotton', avatar: 'MC', verified: true },
    song: 'Learn with Cotton - Mrs. Cotton', likes: '5.1M', comments: '32K', shares: '89K', liked: false, bookmarked: false,
  },
  {
    id: 'r3', videoUrl: '', thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=540&h=960&fit=crop',
    caption: 'XRPL explained in 60 seconds. Why we chose the XRP Ledger for WisdomPay. Gas fees? What gas fees?',
    creator: { name: 'WisdomPay', handle: '@wisdompay', avatar: 'W', verified: true },
    song: 'Crypto Beats - WisdomPay', likes: '890K', comments: '12K', shares: '28K', liked: false, bookmarked: false,
  },
  {
    id: 'r4', videoUrl: '', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=540&h=960&fit=crop',
    caption: 'The Fearless Revolution is here. NoFear community taking over the world one city at a time.',
    creator: { name: 'NoFear Movement', handle: '@nofear', avatar: 'NF', verified: true },
    song: 'Fearless - NoFear Anthem', likes: '3.2M', comments: '24K', shares: '67K', liked: false, bookmarked: false,
  },
  {
    id: 'r5', videoUrl: '', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=540&h=960&fit=crop',
    caption: 'Day 284 of building JamZia. 50 platforms and counting. The everything app is almost here.',
    creator: { name: 'JamZia Build', handle: '@jamzia', avatar: 'JZ', verified: true },
    song: 'Build Mode - JamZia Original', likes: '1.8M', comments: '15K', shares: '34K', liked: false, bookmarked: false,
  },
  {
    id: 'r6', videoUrl: '', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=540&h=960&fit=crop',
    caption: 'How to earn your first 1000 Bricks on Cotton Brick Road. Game tutorial for beginners!',
    creator: { name: 'JamMastery', handle: '@jammastery', avatar: 'JM', verified: true },
    song: 'Gaming Vibes - JamMastery', likes: '720K', comments: '8K', shares: '19K', liked: false, bookmarked: false,
  },
  {
    id: 'r7', videoUrl: '', thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=540&h=960&fit=crop',
    caption: 'The Wealth Blueprint episode teaser. Building generational wealth through education and technology.',
    creator: { name: 'Ad9x Wealth', handle: '@ad9xwealth', avatar: 'AW', verified: true },
    song: 'Wealth Mode - Ad9x Wealth', likes: '1.1M', comments: '9K', shares: '22K', liked: false, bookmarked: false,
  },
  {
    id: 'r8', videoUrl: '', thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=540&h=960&fit=crop',
    caption: 'Podcast setup tour! The JamZia podcast studio is finally complete. Episode 1 drops Monday.',
    creator: { name: 'JamZia Podcast', handle: '@jamziapod', avatar: 'JP', verified: true },
    song: 'Studio Tour - JamZia Media', likes: '450K', comments: '5K', shares: '12K', liked: false, bookmarked: false,
  },
];

/* ── Single Reel Component ──────────────────────── */
function ReelCard({ reel }: { reel: Reel }) {
  const [liked, setLiked] = useState(reel.liked);
  const [bookmarked, setBookmarked] = useState(reel.bookmarked);
  const [muted, setMuted] = useState(true);
  const [likeCount, setLikeCount] = useState(reel.likes);
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => {
        const num = parseFloat(prev.replace(/[MK]/, ''));
        const suffix = prev.includes('M') ? 'M' : prev.includes('K') ? 'K' : '';
        return (num + 0.1).toFixed(1) + suffix;
      });
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  return (
    <div className="relative h-screen w-full snap-start snap-always flex-shrink-0 overflow-hidden bg-black">
      {/* Video/Image Background */}
      <div className="absolute inset-0" onDoubleClick={handleDoubleTap}>
        <img
          src={reel.thumbnail}
          alt={reel.caption}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>

      {/* Heart animation */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <Heart className="w-24 h-24 text-red-500 fill-red-500 animate-ping" />
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
        <Link to="/" className="text-white/80 text-sm font-medium">← Back</Link>
        <h1 className="text-white font-bold">JamReels</h1>
        <button onClick={() => setMuted(!muted)} className="text-white/80">
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Right side actions */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
        <button
          onClick={() => {
            setLiked(!liked);
            setLikeCount((prev) => {
              const num = parseFloat(prev.replace(/[MK]/, ''));
              const suffix = prev.includes('M') ? 'M' : prev.includes('K') ? 'K' : '';
              return liked ? (num - 0.1).toFixed(1) + suffix : (num + 0.1).toFixed(1) + suffix;
            });
          }}
          className="flex flex-col items-center gap-0.5"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${liked ? 'bg-red-500/20' : 'bg-white/10'}`}>
            <Heart className={`w-6 h-6 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs font-medium">{likeCount}</span>
        </button>

        <Link to="/groupchat" className="flex flex-col items-center gap-0.5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{reel.comments}</span>
        </Link>

        <button className="flex flex-col items-center gap-0.5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{reel.shares}</span>
        </button>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className="flex flex-col items-center gap-0.5"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bookmarked ? 'bg-[#C9A03F]/20' : 'bg-white/10'}`}>
            <Bookmark className={`w-6 h-6 ${bookmarked ? 'text-[#C9A03F] fill-[#C9A03F]' : 'text-white'}`} />
          </div>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-4 right-16 z-20">
        {/* Creator */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A03F] to-[#7096D1] flex items-center justify-center text-xs font-bold">
            {reel.creator.avatar}
          </div>
          <span className="text-white font-semibold text-sm">{reel.creator.name}</span>
          {reel.creator.verified && (
            <div className="w-4 h-4 rounded-full bg-[#C9A03F] flex items-center justify-center">
              <span className="text-black text-[8px] font-bold">✓</span>
            </div>
          )}
          <button className="ml-2 border border-white/30 text-white text-xs px-3 py-0.5 rounded-full hover:bg-white/10 transition-colors">
            Follow
          </button>
        </div>

        {/* Caption */}
        <p className="text-white text-sm mb-2 line-clamp-2">{reel.caption}</p>

        {/* Song */}
        <div className="flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5 text-[#C9A03F]" />
          <span className="text-white/70 text-xs">{reel.song}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────── */
export default function JamReels() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen w-full bg-black overflow-hidden" ref={containerRef}>
      <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide" style={{ scrollSnapType: 'y mandatory' }}>
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
}
