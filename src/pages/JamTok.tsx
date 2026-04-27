/* ═══════════════════════════════════════════════════════════
   JamTok — Short-Form Video Platform
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect } from 'react';
import {
  Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX,
  Music, Send, Play
} from 'lucide-react';

/* ── Types ── */
interface Video {
  id: string;
  username: string;
  avatar: string;
  caption: string;
  song: string;
  likes: string;
  comments: string;
  shares: string;
  liked: boolean;
  bookmarked: boolean;
  muted: boolean;
  color: string;
}

/* ── Mock Data ── */
const VIDEOS: Video[] = [
  { id: '1', username: 'CuzCotton', avatar: 'CC', caption: 'Building JamZia — Day 1 of the everything app. 50+ platforms, one vision.', song: 'Original Sound - CuzCotton', likes: '124.5K', comments: '3.2K', shares: '8.9K', liked: true, bookmarked: false, muted: false, color: '#7096D1' },
  { id: '2', username: 'BlackDiamond', avatar: 'BD', caption: 'Behind the scenes at BlackDiamond Studios. New original dropping next week.', song: 'SkyIvy - Night Lights', likes: '89.2K', comments: '1.8K', shares: '4.5K', liked: false, bookmarked: true, muted: true, color: '#1F1F1F' },
  { id: '3', username: 'MrsCottonEdu', avatar: 'MC', caption: 'Phonics Mastery in 30 seconds. Watch your child read their first word today.', song: 'Original Sound - MrsCotton', likes: '256K', comments: '12.1K', shares: '45.3K', liked: true, bookmarked: false, muted: false, color: '#f59e0b' },
  { id: '4', username: 'NoFearOfficial', avatar: 'NF', caption: 'You are not alone. Reach out. Talk to someone. Your story matters.', song: 'Heal - Ambient Sounds', likes: '1.2M', comments: '89K', shares: '234K', liked: true, bookmarked: true, muted: false, color: '#ef4444' },
  { id: '5', username: 'RiverShyreGaming', avatar: 'RS', caption: 'New AR creature spotted in downtown Atlanta! Who else caught one?', song: 'Battle Theme - RiverShyre', likes: '45.6K', comments: '2.1K', shares: '5.6K', liked: false, bookmarked: false, muted: true, color: '#22c55e' },
];

export default function JamTok() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [videos, setVideos] = useState<Video[]>(VIDEOS);
  const [showComments, setShowComments] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const video = videos[currentIdx];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentIdx < videos.length - 1) setCurrentIdx(i => i + 1);
      if (e.deltaY < 0 && currentIdx > 0) setCurrentIdx(i => i - 1);
    };
    const el = containerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, [currentIdx, videos.length]);

  const toggleLike = () => {
    setVideos(prev => prev.map((v, i) => i === currentIdx ? { ...v, liked: !v.liked } : v));
  };

  const toggleMute = () => {
    setVideos(prev => prev.map((v, i) => i === currentIdx ? { ...v, muted: !v.muted } : v));
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden" ref={containerRef}>
      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${video.color}20 0%, #000 50%, ${video.color}10 100%)` }}>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Play size={40} className="text-white/30 ml-2" />
            </div>
            <p className="text-sm text-[#6B7280]">Video content area</p>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-1 text-xs">
              <button className="px-3 py-1 text-[#6B7280]">Following</button>
              <button className="px-3 py-1 font-bold text-white border-b-2 border-white">For You</button>
            </div>
            <button onClick={toggleMute} className="p-2 rounded-full bg-black/50 text-white">
              {video.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
          <div className="absolute bottom-20 left-0 right-0 p-4 pointer-events-auto">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: video.color + '40', color: video.color }}>
                {video.avatar}
              </div>
              <span className="text-sm font-bold">@{video.username}</span>
              <button className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-black">Follow</button>
            </div>
            <p className="text-sm text-white/90 mb-2 max-w-[80%]">{video.caption}</p>
            <div className="flex items-center gap-1 text-xs text-white/60">
              <Music size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
              {video.song}
            </div>
          </div>
          <div className="absolute right-2 bottom-24 flex flex-col items-center gap-4 pointer-events-auto">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: video.color + '40', color: video.color }}>
              {video.avatar}
            </div>
            <button onClick={toggleLike} className="flex flex-col items-center gap-0.5">
              <Heart size={28} className={video.liked ? 'text-red-500' : 'text-white'} fill={video.liked ? 'currentColor' : 'none'} />
              <span className="text-[10px]">{video.likes}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex flex-col items-center gap-0.5">
              <MessageCircle size={28} className="text-white" />
              <span className="text-[10px]">{video.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <Bookmark size={28} className={video.bookmarked ? 'text-[#f59e0b]' : 'text-white'} fill={video.bookmarked ? 'currentColor' : 'none'} />
              <span className="text-[10px]">Save</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <Share2 size={28} className="text-white" />
              <span className="text-[10px]">{video.shares}</span>
            </button>
          </div>
        </div>
      </div>
      {showComments && (
        <div className="w-80 border-l border-[#1F1F1F] bg-black flex flex-col">
          <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between">
            <h3 className="text-sm font-bold">{video.comments} comments</h3>
            <button onClick={() => setShowComments(false)} className="text-[#6B7280]">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {[
              { user: 'FanOne', text: 'This is incredible!', likes: '234', time: '2h' },
              { user: 'JamZiaLover', text: 'The vision is unreal. 50+ platforms!!', likes: '89', time: '1h' },
              { user: 'CryptoKing', text: 'WisdomPay integration is genius', likes: '156', time: '45m' },
              { user: 'BuildInPublic', text: 'Day 1 and already this polished? Respect.', likes: '67', time: '30m' },
              { user: 'XRPArmy', text: 'XRPL powered everything app. Lets go!', likes: '312', time: '15m' },
            ].map((c, i) => (
              <div key={i} className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[8px] font-bold shrink-0">{c.user[0]}</div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280]">{c.user} &middot; {c.time}</p>
                  <p className="text-xs">{c.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Heart size={10} className="text-[#6B7280]" />
                    <span className="text-[9px] text-[#6B7280]">{c.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-[#1F1F1F] flex gap-2">
            <input type="text" placeholder="Add comment..." className="flex-1 bg-[#1F1F1F] rounded-full px-3 py-1.5 text-xs outline-none" />
            <button className="p-1.5 text-[#7096D1]"><Send size={14} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
