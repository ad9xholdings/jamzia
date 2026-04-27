import { useState, useRef, useEffect } from 'react';
import {
  Home, Search, PlusSquare, Heart, User, Users, ArrowLeft, Send,
  Bookmark, MessageCircle, Share2, Play, Volume2, VolumeX, Hash,
  Music, ChevronRight, Clapperboard, Image, Bell, Sparkles,
  Camera, Film, BookmarkIcon, Repeat2, Eye, Layers,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   JAMSOCIAL — Multi-Mode Social Platform
   JamTok (short-form video) + JamInsta (photo sharing) + JamSocial Feed
   ═══════════════════════════════════════════ */

type SocialMode = 'landing' | 'jamsocial' | 'jamtok' | 'jaminsta';
type TokTab = 'foryou' | 'following' | 'live';
type InstaTab = 'feed' | 'reels' | 'tags';

/* ── Mock Data ── */
const STORIES = [
  { id: 's1', user: 'sarah_chen', avatar: 'SC', seen: false, live: true },
  { id: 's2', user: 'marcus_d', avatar: 'MD', seen: false, live: false },
  { id: 's3', user: 'elena_r', avatar: 'ER', seen: true, live: false },
  { id: 's4', user: 'jamzia_official', avatar: 'JZ', seen: false, live: true },
  { id: 's5', user: 'dj_marcus', avatar: 'DJ', seen: true, live: false },
  { id: 's6', user: 'wellness_guru', avatar: 'WG', seen: false, live: false },
  { id: 's7', user: 'tech_review', avatar: 'TR', seen: true, live: false },
  { id: 's8', user: 'fitness_james', avatar: 'FJ', seen: false, live: false },
];

const SOCIAL_POSTS = [
  {
    id: 'p1', user: 'sarah_chen', avatar: 'SC', time: '2 min ago',
    content: 'Just launched my new course on JamMastery! 11 layers of learning, zero fluff. Who\'s ready to level up? 🚀',
    image: true, likes: 234, comments: 45, shares: 12, liked: false, saved: false,
    tags: ['JamMastery', 'EduTech', 'Learn'],
  },
  {
    id: 'p2', user: 'marcus_d', avatar: 'MD', time: '15 min ago',
    content: 'The XRPL settlement speed is unreal. 3.2 seconds from send to confirm. This is the future of payments.',
    image: false, likes: 567, comments: 89, shares: 34, liked: true, saved: false,
    tags: ['WisdomPay', 'XRPL', 'Crypto'],
  },
  {
    id: 'p3', user: 'jamzia_official', avatar: 'JZ', time: '1 hr ago',
    content: '🎉 JamZia now has 46+ integrated platforms! From JamNews to JamMastery, Castle to WisdomPay — the everything app is growing. Thank you to our community!',
    image: true, likes: 1205, comments: 234, shares: 567, liked: false, saved: true,
    tags: ['JamZia', 'Community', 'Growth'],
  },
  {
    id: 'p4', user: 'elena_r', avatar: 'ER', time: '2 hr ago',
    content: 'Live streaming on JamLive right now! Come hang out, ask questions about the new SORME search engine. 9x is answering everything.',
    image: true, likes: 89, comments: 23, shares: 5, liked: false, saved: false,
    tags: ['JamLive', 'SORME', 'Live'],
  },
  {
    id: 'p5', user: 'dj_marcus', avatar: 'DJ', time: '3 hr ago',
    content: 'New beat dropping on JamAudio. Spatial audio mix — put on headphones and feel the difference. 🎧',
    image: true, likes: 445, comments: 67, shares: 23, liked: false, saved: false,
    tags: ['JamAudio', 'Music', 'Spatial'],
  },
];

const TOK_VIDEOS = [
  {
    id: 'v1', user: 'sarah_chen', avatar: 'SC', caption: 'How I built a 6-figure course in 30 days #JamMastery #Creator #EduTech',
    music: 'Original Sound - sarah_chen', likes: '12.4K', comments: '892', shares: '2.3K',
    following: false,
  },
  {
    id: 'v2', user: 'marcus_d', avatar: 'MD', caption: 'Sending 10,000 XRP in under 4 seconds. No bank. No waiting. Just magic. #WisdomPay #XRPL',
    music: 'Upbeat Fintech - marcus_d', likes: '45.2K', comments: '3.4K', shares: '8.9K',
    following: true,
  },
  {
    id: 'v3', user: 'jamzia_official', avatar: 'JZ', caption: '46 platforms. One ecosystem. Zero fragmentation. Welcome to JamZia. #JamZia #EverythingApp',
    music: 'Epic Buildup - JamZia', likes: '128K', comments: '12.1K', shares: '45.6K',
    following: true,
  },
  {
    id: 'v4', user: 'dj_marcus', avatar: 'DJ', caption: 'This spatial audio mix hits different. Close your eyes and listen. 🎧 #JamAudio #Spatial #Music',
    music: 'Deep Space Mix - dj_marcus', likes: '8.7K', comments: '567', shares: '1.2K',
    following: false,
  },
  {
    id: 'v5', user: 'elena_r', avatar: 'ER', caption: '9x just explained quantum computing in 30 seconds. My mind = blown 🤯 #9x #AI #Science',
    music: 'Mind Blown Sound - elena_r', likes: '23.1K', comments: '1.8K', shares: '4.5K',
    following: false,
  },
];

const INSTA_POSTS = [
  {
    id: 'i1', user: 'sarah_chen', avatar: 'SC', likes: 2347, comments: 89, saved: false,
    location: 'JamZia HQ', type: 'image',
  },
  {
    id: 'i2', user: 'marcus_d', avatar: 'MD', likes: 4567, comments: 234, saved: true,
    location: 'XRPL Mainnet', type: 'carousel',
  },
  {
    id: 'i3', user: 'jamzia_official', avatar: 'JZ', likes: 12890, comments: 567, saved: false,
    location: 'The Everything App', type: 'video',
  },
  {
    id: 'i4', user: 'dj_marcus', avatar: 'DJ', likes: 3421, comments: 123, saved: false,
    location: 'Studio A', type: 'image',
  },
  {
    id: 'i5', user: 'elena_r', avatar: 'ER', likes: 890, comments: 45, saved: true,
    location: 'Live Stream', type: 'reel',
  },
  {
    id: 'i6', user: 'tech_review', avatar: 'TR', likes: 5678, comments: 345, saved: false,
    location: 'Lab', type: 'image',
  },
];

/* ── Mode Selector Card ── */
function ModeCard({ icon: Icon, label, sub, color, onClick }: {
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  label: string; sub: string; color: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group relative overflow-hidden rounded-2xl bg-[#0A0F1E] border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at 50% 0%, ${color}20, transparent 70%)` }} />
      <div className="relative p-5 sm:p-6 text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${color}15` }}>
          <Icon size={28} style={{ color }} />
        </div>
        <p className="text-base font-bold text-white mb-1">{label}</p>
        <p className="text-[11px] text-[#6B7280]">{sub}</p>
        <div className="mt-3 flex items-center justify-center gap-1 text-[10px]" style={{ color }}>
          <span>Enter</span>
          <ChevronRight size={12} />
        </div>
      </div>
    </button>
  );
}

/* ── JamTok Video Card ── */
function TokVideoCard({ video, isActive }: { video: typeof TOK_VIDEOS[0]; isActive: boolean }) {
  const [playing, setPlaying] = useState(isActive);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(video.following);

  useEffect(() => { setPlaying(isActive); }, [isActive]);

  return (
    <div className="relative h-[calc(100dvh-80px)] sm:h-[calc(100dvh-100px)] bg-[#0A0F1E] overflow-hidden snap-start snap-always">
      {/* Video Placeholder with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-[#081F5C]/40 via-[#0A0F1E] to-[#050810] flex items-center justify-center">
          <div className="text-center">
            <Film size={48} className="text-[#7096D1]/30 mx-auto mb-3" />
            <p className="text-xs text-[#6B7280]">@{video.user}</p>
          </div>
        </div>
      </div>

      {/* Play/Pause Overlay */}
      <button onClick={() => setPlaying(!playing)} className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer">
        {!playing && (
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Play size={32} className="text-white ml-1" />
          </div>
        )}
      </button>

      {/* Mute Toggle */}
      <button onClick={() => setMuted(!muted)} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm cursor-pointer">
        {muted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
      </button>

      {/* Right Action Bar */}
      <div className="absolute right-2 bottom-24 z-20 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center border border-white/20">
            <span className="text-[10px] font-bold text-white">{video.avatar}</span>
          </div>
          <button onClick={() => setFollowed(!followed)} className={`mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold transition-colors cursor-pointer ${followed ? 'bg-white text-black' : 'bg-[#7096D1] text-white'}`}>
            {followed ? '✓' : '+'}
          </button>
        </div>

        <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-0.5 cursor-pointer">
          <Heart size={28} className={liked ? 'text-red-500 fill-red-500' : 'text-white'} />
          <span className="text-[10px] text-white font-medium">{video.likes}</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 cursor-pointer">
          <MessageCircle size={28} className="text-white" />
          <span className="text-[10px] text-white font-medium">{video.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 cursor-pointer">
          <Share2 size={28} className="text-white" />
          <span className="text-[10px] text-white font-medium">{video.shares}</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 cursor-pointer">
          <BookmarkIcon size={28} className="text-white" />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute left-4 right-20 bottom-6 z-20">
        <p className="text-sm font-bold text-white mb-1">@{video.user}</p>
        <p className="text-xs text-white/80 mb-2 line-clamp-2">{video.caption}</p>
        <div className="flex items-center gap-2">
          <Music size={12} className="text-white/60" />
          <div className="overflow-hidden w-40">
            <p className="text-[11px] text-white/60 whitespace-nowrap animate-[marquee_8s_linear_infinite]">{video.music}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function JamSocial() {
  const [mode, setMode] = useState<SocialMode>('landing');

  /* Landing */
  if (mode === 'landing') {
    return (
      <div className="min-h-[100dvh] bg-[#050810] text-white">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-[#0A0F1E]/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
              <h1 className="text-lg font-bold text-white">JamSocial™</h1>
            </div>
            <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-6 max-w-lg mx-auto">
          {/* Tagline */}
          <div className="text-center mb-8">
            <p className="text-xl sm:text-2xl font-bold text-white mb-2">Your Social Universe</p>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Familiar interfaces. Familiar flows. One unified social layer across all 46+ JamZia platforms.
            </p>
          </div>

          {/* Mode Cards */}
          <div className="space-y-3 mb-8">
            <ModeCard
              icon={Clapperboard}
              label="JamTok"
              sub="Short-form vertical video. Scroll, like, share. The JamTok experience inside JamZia."
              color="#ec4899"
              onClick={() => setMode('jamtok')}
            />
            <ModeCard
              icon={Camera}
              label="JamInsta"
              sub="Photo grid, stories, reels. Share moments. The JamInsta experience inside JamZia."
              color="#f59e0b"
              onClick={() => setMode('jaminsta')}
            />
            <ModeCard
              icon={MessageCircle}
              label="JamSocial Feed"
              sub="Text, media, threads. Follow, comment, discuss. The JamSocial experience inside JamZia."
              color="#7096D1"
              onClick={() => setMode('jamsocial')}
            />
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-[#6B7280] pb-6">
            All modes share the same identity, same followers, same wallet. Switch anytime.
          </p>
        </div>
      </div>
    );
  }

  /* ─── JAMTOK ─── */
  if (mode === 'jamtok') return <JamTokView onBack={() => setMode('landing')} />;

  /* ─── JAMINSTA ─── */
  if (mode === 'jaminsta') return <JamInstaView onBack={() => setMode('landing')} />;

  /* ─── JAMSOCIAL FEED ─── */
  return <JamSocialFeed onBack={() => setMode('landing')} />;
}

/* ═══════════════════════════════════════════
   JAMTOK VIEW
   ═══════════════════════════════════════════ */

function JamTokView({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<TokTab>('foryou');
  const [currentVideo, setCurrentVideo] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(scrollRef.current!.children).indexOf(entry.target);
            if (index !== -1) setCurrentVideo(index);
          }
        });
      },
      { threshold: 0.6 }
    );
    const children = scrollRef.current.children;
    Array.from(children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const tabs: { id: TokTab; label: string }[] = [
    { id: 'foryou', label: 'For You' },
    { id: 'following', label: 'Following' },
    { id: 'live', label: 'Live' },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3">
        <button onClick={onBack} className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`text-sm font-bold transition-colors cursor-pointer ${activeTab === t.id ? 'text-white' : 'text-white/50'}`}>
              {t.label}
            </button>
          ))}
        </div>
        <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white cursor-pointer">
          <Search size={20} />
        </button>
      </div>

      {/* Video Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-none">
        {TOK_VIDEOS.map((video, i) => (
          <TokVideoCard key={video.id} video={video} isActive={i === currentVideo} />
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="h-14 bg-black/90 backdrop-blur-md border-t border-white/[0.06] flex items-center justify-around px-2 shrink-0">
        <button className="flex flex-col items-center gap-0.5 text-white"><Home size={22} /><span className="text-[9px]">Home</span></button>
        <button className="flex flex-col items-center gap-0.5 text-white/50"><Search size={22} /><span className="text-[9px]">Discover</span></button>
        <button className="flex flex-col items-center gap-0.5"><div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ec4899] to-[#f59e0b] flex items-center justify-center"><PlusSquare size={20} className="text-white" /></div></button>
        <button className="flex flex-col items-center gap-0.5 text-white/50"><MessageCircle size={22} /><span className="text-[9px]">Inbox</span></button>
        <button className="flex flex-col items-center gap-0.5 text-white/50"><User size={22} /><span className="text-[9px]">Profile</span></button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   JAMINSTA VIEW
   ═══════════════════════════════════════════ */

function JamInstaView({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<InstaTab>('feed');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set(['i2', 'i5']));

  const toggleLike = (id: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0A0F1E]/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={onBack} className="p-1.5 text-white cursor-pointer"><ArrowLeft size={18} /></button>
          <h1 className="text-base font-bold">JamInsta™</h1>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-white cursor-pointer"><Heart size={18} /></button>
            <button className="p-1.5 text-white cursor-pointer"><Send size={18} /></button>
          </div>
        </div>
      </div>

      {/* Stories Row */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-none">
          {/* My Story */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#081F5C] to-[#7096D1] p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0A0F1E] flex items-center justify-center">
                <PlusSquare size={20} className="text-[#7096D1]" />
              </div>
            </div>
            <span className="text-[9px] text-white">Your Story</span>
          </div>
          {STORIES.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1 shrink-0">
              <div className={`w-16 h-16 rounded-full p-[2px] ${s.live ? 'bg-gradient-to-br from-red-500 to-orange-500' : s.seen ? 'bg-white/20' : 'bg-gradient-to-br from-[#f59e0b] via-[#ec4899] to-[#8b5cf6]'}`}>
                <div className="w-full h-full rounded-full bg-[#0A0F1E] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{s.avatar}</span>
                </div>
              </div>
              <span className="text-[9px] text-white truncate w-16 text-center">{s.user}</span>
              {s.live && <span className="text-[8px] text-red-400 font-bold -mt-1">LIVE</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] bg-[#0A0F1E]">
        {[{ id: 'feed' as InstaTab, icon: GridIcon }, { id: 'reels' as InstaTab, icon: Film }, { id: 'tags' as InstaTab, icon: Hash }].map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex-1 flex items-center justify-center py-2.5 gap-1.5 text-xs font-medium transition-colors cursor-pointer border-b-2 ${activeTab === t.id ? 'text-white border-[#f59e0b]' : 'text-[#6B7280] border-transparent'}`}>
            <t.icon size={14} /> {t.id === 'feed' ? 'Feed' : t.id === 'reels' ? 'Reels' : 'Tags'}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="p-1">
        <div className="grid grid-cols-3 gap-1">
          {INSTA_POSTS.map((post) => (
            <div key={post.id} className="relative aspect-square bg-[#0A0F1E] overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-[#081F5C]/30 to-[#0A0F1E] flex items-center justify-center">
                {post.type === 'video' || post.type === 'reel' ? (
                  <Film size={24} className="text-[#7096D1]/50" />
                ) : post.type === 'carousel' ? (
                  <Layers size={24} className="text-[#7096D1]/50" />
                ) : (
                  <Image size={24} className="text-[#7096D1]/50" />
                )}
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }} className="flex items-center gap-1 text-xs text-white font-bold cursor-pointer">
                  <Heart size={14} className={likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : ''} /> {post.likes.toLocaleString()}
                </button>
                <span className="flex items-center gap-1 text-xs text-white font-bold">
                  <MessageCircle size={14} /> {post.comments}
                </span>
                <button onClick={(e) => { e.stopPropagation(); toggleSave(post.id); }} className="flex items-center gap-1 text-xs text-white font-bold cursor-pointer">
                  <BookmarkIcon size={14} className={savedPosts.has(post.id) ? 'fill-[#7096D1] text-[#7096D1]' : ''} />
                </button>
              </div>
              {post.type === 'video' && (
                <div className="absolute top-1 right-1 p-1 bg-black/50 rounded"><Film size={10} className="text-white" /></div>
              )}
              {post.type === 'carousel' && (
                <div className="absolute top-1 right-1 p-1 bg-black/50 rounded"><Layers size={10} className="text-white" /></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="h-14 bg-[#0A0F1E] border-t border-white/[0.06] flex items-center justify-around px-2 sticky bottom-0">
        <button className="text-white"><Home size={24} /></button>
        <button className="text-white/50"><Search size={24} /></button>
        <button className="text-white/50"><PlusSquare size={24} /></button>
        <button className="text-white/50"><Heart size={24} /></button>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">ME</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   JAMSOCIAL FEED VIEW
   ═══════════════════════════════════════════ */

function JamSocialFeed({ onBack }: { onBack: () => void }) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['p2']));
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set(['p3']));
  const [activeFeedTab, setActiveFeedTab] = useState('for-you');

  const toggleLike = (id: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0A0F1E]/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={onBack} className="p-1.5 text-white cursor-pointer"><ArrowLeft size={18} /></button>
          <h1 className="text-base font-bold">JamSocial™ Feed</h1>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-white cursor-pointer"><Sparkles size={18} /></button>
            <button className="p-1.5 text-white cursor-pointer"><Bell size={18} /></button>
          </div>
        </div>
        <div className="flex border-b border-white/[0.06]">
          {['for-you', 'following', 'trending'].map((t) => (
            <button key={t} onClick={() => setActiveFeedTab(t)} className={`flex-1 py-2.5 text-xs font-medium transition-colors cursor-pointer border-b-2 ${activeFeedTab === t ? 'text-white border-[#7096D1]' : 'text-[#6B7280] border-transparent'}`}>
              {t === 'for-you' ? 'For You' : t === 'following' ? 'Following' : 'Trending'}
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="bg-[#0A0F1E] border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">ME</span>
          </div>
          <div className="flex-1 bg-[#050810] border border-white/[0.06] rounded-xl px-3 py-2 text-xs text-[#6B7280]">
            What's happening?
          </div>
          <button className="p-2 text-[#7096D1] cursor-pointer"><Image size={18} /></button>
          <button className="p-2 text-[#7096D1] cursor-pointer"><Film size={18} /></button>
        </div>
      </div>

      {/* Feed */}
      <div className="divide-y divide-white/[0.04]">
        {SOCIAL_POSTS.map((post) => (
          <div key={post.id} className="px-4 py-4 hover:bg-white/[0.01] transition-colors">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">{post.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-bold text-white">{post.user}</span>
                  <span className="text-[10px] text-[#6B7280]">@{post.user.toLowerCase().replace(' ', '')}</span>
                  <span className="text-[10px] text-[#6B7280]">• {post.time}</span>
                </div>
                <p className="text-sm text-[#F7F2EB] leading-relaxed mb-2">{post.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-[#7096D1] hover:text-[#F7F2EB] cursor-pointer">#{tag}</span>
                  ))}
                </div>

                {/* Image Placeholder */}
                {post.image && (
                  <div className="rounded-xl bg-[#0A0F1E] border border-white/[0.06] aspect-video mb-3 flex items-center justify-center">
                    <Image size={32} className="text-[#7096D1]/30" />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 text-[#6B7280] hover:text-red-400 transition-colors cursor-pointer">
                      <Heart size={16} className={likedPosts.has(post.id) ? 'text-red-500 fill-red-500' : ''} />
                      <span className="text-[11px]">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#6B7280] hover:text-[#7096D1] transition-colors cursor-pointer">
                      <MessageCircle size={16} />
                      <span className="text-[11px]">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#6B7280] hover:text-emerald-400 transition-colors cursor-pointer">
                      <Repeat2 size={16} />
                      <span className="text-[11px]">{post.shares}</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#6B7280] hover:text-[#7096D1] transition-colors cursor-pointer">
                      <Eye size={16} />
                    </button>
                  </div>
                  <button onClick={() => toggleSave(post.id)} className="text-[#6B7280] hover:text-[#7096D1] transition-colors cursor-pointer">
                    <Bookmark size={16} className={savedPosts.has(post.id) ? 'text-[#7096D1] fill-[#7096D1]' : ''} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="h-14 bg-[#0A0F1E] border-t border-white/[0.06] flex items-center justify-around px-2 sticky bottom-0">
        <button className="text-white"><Home size={22} /></button>
        <button className="text-white/50"><Search size={22} /></button>
        <button className="text-white/50"><Bell size={22} /></button>
        <button className="text-white/50"><MessageCircle size={22} /></button>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">ME</span>
        </div>
      </div>
    </div>
  );
}

/* ── Helper Icons ── */
function GridIcon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
