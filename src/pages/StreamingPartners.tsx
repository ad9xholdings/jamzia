import { useState } from 'react';
import { Play, Star, Search, Check, Tv, Film, Music, Radio, DollarSign, TrendingUp, Lock, Heart, Users, Monitor, Smartphone, Headphones } from 'lucide-react';
import { Link } from 'react-router';

/* ── Types ──────────────────────────────────────── */
interface StreamingCapability {
  id: string;
  name: string;
  logo: string;
  category: 'vod' | 'live' | 'music' | 'ppv' | 'sports';
  description: string;
  price: string;
  priceNote: string;
  rating: number;
  contentCount: string;
  features: string[];
  popularContent: string[];
  color: string;
  includedInBundle: boolean;
}

/* ── Capabilities Data — JamZia's Streaming Stack ─ */
const CAPABILITIES: StreamingCapability[] = [
  {
    id: 'movies',
    name: 'Premium Movie Streaming',
    logo: 'PM',
    category: 'vod',
    description: 'A vast library of blockbuster films, indie gems, and exclusive premieres. From action to romance, documentaries to animated features — all in stunning 4K.',
    price: '$6.99',
    priceNote: '/mo starting',
    rating: 4.8,
    contentCount: '15,000+ titles',
    features: ['4K Ultra HD', 'Ad-supported tier available', 'Download for offline', 'Multiple viewer profiles'],
    popularContent: ['The Cotton Legacy', 'Blockchain Wars', 'Code & Conscience', 'The Fearless Generation'],
    color: '#E50914',
    includedInBundle: true,
  },
  {
    id: 'tv',
    name: 'Next-Day TV & Originals',
    logo: 'TV',
    category: 'vod',
    description: 'Current television episodes available next-day, plus a growing catalog of exclusive original series produced by Ad9x Studios.',
    price: '$7.99',
    priceNote: '/mo starting',
    rating: 4.5,
    contentCount: '70,000+ episodes',
    features: ['Live TV channels', 'Next-day episodes', 'Original productions', 'Family profiles'],
    popularContent: ['Mrs. Cotton\'s Classroom', 'Digital Gold Rush', 'The Wealth Blueprint', 'Ad9x After Hours'],
    color: '#1CE783',
    includedInBundle: true,
  },
  {
    id: 'family',
    name: 'Family Entertainment Hub',
    logo: 'FE',
    category: 'vod',
    description: 'Safe, curated entertainment for all ages. Animated features, educational content, family series, and interactive viewing experiences.',
    price: '$7.99',
    priceNote: '/mo starting',
    rating: 4.7,
    contentCount: '12,000+ titles',
    features: ['IMAX Enhanced', '4K HDR streaming', 'GroupWatch parties', 'Kids-safe profiles'],
    popularContent: ['Cotton\'s Wisdom', 'Phonics Adventures', 'Space Explorers', 'History Heroes'],
    color: '#113CCF',
    includedInBundle: true,
  },
  {
    id: 'premium',
    name: 'Premium Drama & Awards',
    logo: 'PD',
    category: 'vod',
    description: 'Critically acclaimed dramas, award-winning series, and prestige films. The best storytelling in the industry, produced exclusively for JamZia.',
    price: '$9.99',
    priceNote: '/mo starting',
    rating: 4.6,
    contentCount: '13,000+ titles',
    features: ['Same-day premieres', 'Exclusive originals', 'Award-winners', '4K streaming'],
    popularContent: ['Succession of Power', 'The Last Pioneer', 'House of Cotton', 'Barry\'s Legacy'],
    color: '#9900FF',
    includedInBundle: true,
  },
  {
    id: 'rentals',
    name: 'New Release Rentals & Store',
    logo: 'NR',
    category: 'vod',
    description: 'Rent or purchase the latest theatrical releases. Own your favorites forever or rent for 48 hours. Includes exclusive Thursday night previews.',
    price: '$8.99',
    priceNote: '/mo or per title',
    rating: 4.4,
    contentCount: '20,000+ titles',
    features: ['Rent or buy', 'Thursday premieres', 'Own forever', 'X-Ray bonus content'],
    popularContent: ['The Boys of Summer', 'Rings of Destiny', 'Reacher\'s Path', 'Air: The Story'],
    color: '#00A8E1',
    includedInBundle: true,
  },
  {
    id: 'sports-network',
    name: 'Live Sports Network',
    logo: 'SN',
    category: 'sports',
    description: 'Live sports coverage including football, basketball, soccer, golf, and more. Real-time scores, multi-camera angles, and instant replays.',
    price: '$10.99',
    priceNote: '/mo',
    rating: 4.2,
    contentCount: '10,000+ events/yr',
    features: ['Live games', 'Exclusive fights', 'Original sports shows', 'Multi-view streaming'],
    popularContent: ['Championship Finals', 'College Showdown', 'Premier Matches', 'Pro Tour Live'],
    color: '#E13A3E',
    includedInBundle: false,
  },
  {
    id: 'music',
    name: 'Hi-Fi Music Streaming',
    logo: 'HF',
    category: 'music',
    description: '100 million+ tracks in lossless quality. Personalized playlists, podcasts, and exclusive artist content. Dolby Atmos and 360 Audio support.',
    price: '$10.99',
    priceNote: '/mo',
    rating: 4.7,
    contentCount: '100M+ tracks',
    features: ['Hi-Res FLAC', 'Dolby Atmos', '360 Audio', 'Music videos'],
    popularContent: ['Top 50 Global', 'Discover Weekly', 'JamZia Originals', 'Cotton\'s Playlist'],
    color: '#1DB954',
    includedInBundle: true,
  },
  {
    id: 'ppv-events',
    name: 'Live Event Access',
    logo: 'LE',
    category: 'ppv',
    description: 'Exclusive pay-per-view events: championship fights, concerts, comedy specials, esports tournaments, and live experiences powered by WisdomPay.',
    price: 'VARIES',
    priceNote: 'per event',
    rating: 4.6,
    contentCount: '50+ events/yr',
    features: ['Live events', '72hr replay included', 'WisdomPay billing', '4K streaming'],
    popularContent: ['Fight Night Live', 'Summer Jam Concert', 'Comedy Specials', 'Global Finals'],
    color: '#C9A03F',
    includedInBundle: false,
  },
  {
    id: 'live-streaming',
    name: 'Creator Live Streaming',
    logo: 'CL',
    category: 'live',
    description: 'Live streaming platform for creators, gamers, and communities. Watch, chat, and connect in real-time with your favorite personalities.',
    price: 'FREE',
    priceNote: 'ad-supported',
    rating: 4.3,
    contentCount: 'Millions live',
    features: ['Live chat', 'Creator subscriptions', 'Esports coverage', 'Music streams'],
    popularContent: ['Gaming Central', 'Just Chatting', 'Creator Corner', 'Music Live'],
    color: '#9146FF',
    includedInBundle: false,
  },
  {
    id: 'classics',
    name: 'Classic TV & Archives',
    logo: 'CA',
    category: 'vod',
    description: 'Timeless television, classic films, and exclusive archival content. Revisit the shows that shaped entertainment history.',
    price: 'FREE',
    priceNote: 'ad-supported tier',
    rating: 4.2,
    contentCount: '80,000+ hours',
    features: ['Classic hits', 'Archive exclusives', 'Free tier', 'Premium catalog'],
    popularContent: ['The Office Chronicles', 'Classic Comedy', 'Retro Rewind', 'Vintage Docs'],
    color: '#FFCC00',
    includedInBundle: true,
  },
  {
    id: 'horror',
    name: 'Thrillers & Horror Collection',
    logo: 'TH',
    category: 'vod',
    description: 'The best in drama, horror, thriller, and independent film. Curated collections for every mood, from psychological suspense to supernatural terror.',
    price: '$8.99',
    priceNote: '/mo',
    rating: 4.3,
    contentCount: '2,500+ titles',
    features: ['Ad-free experience', 'Curated collections', 'Early releases', 'Exclusive series'],
    popularContent: ['Dark Winds Rising', 'Witching Hour', 'Vampire Chronicles', 'London Shadows'],
    color: '#E32017',
    includedInBundle: true,
  },
  {
    id: 'network-tv',
    name: 'Broadcast Network Plus',
    logo: 'BN',
    category: 'vod',
    description: 'Major network programming, live local channels, sports coverage, and family-friendly content. Your cable replacement, fully streaming.',
    price: '$5.99',
    priceNote: '/mo starting',
    rating: 4.1,
    contentCount: '40,000+ episodes',
    features: ['Live local channels', 'Sports coverage', 'Network originals', 'Kids zone'],
    popularContent: ['Network News Live', 'Star Quest', 'Tulsa Chronicles', '1923: A New Era'],
    color: '#0064FF',
    includedInBundle: true,
  },
  {
    id: 'indie',
    name: 'Indie & Original Films',
    logo: 'IO',
    category: 'vod',
    description: 'Independent films, original productions, and exclusive content featuring the biggest creative talents in the industry.',
    price: '$9.99',
    priceNote: '/mo',
    rating: 4.5,
    contentCount: '200+ originals',
    features: ['Ad-free', '4K HDR', 'Family sharing', 'Cross-device sync'],
    popularContent: ['Ted\'s Journey', 'Severance Plan', 'Foundation X', 'Heart of Gold'],
    color: '#1D1D1F',
    includedInBundle: false,
  },
  {
    id: 'creator',
    name: 'Creator Content Platform',
    logo: 'CC',
    category: 'vod',
    description: 'Ad-free viewing, original creator content, background playback, and premium music integration. Support your favorite creators directly.',
    price: '$13.99',
    priceNote: '/mo',
    rating: 4.3,
    contentCount: 'Unlimited',
    features: ['Ad-free viewing', 'Background play', 'Premium music', 'Offline downloads'],
    popularContent: ['Creator Originals', 'Music Videos', 'Behind the Scenes', 'Viral Moments'],
    color: '#FF0000',
    includedInBundle: false,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Capabilities', icon: Tv },
  { id: 'vod', label: 'Movies & TV', icon: Film },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'live', label: 'Live Streaming', icon: Radio },
  { id: 'sports', label: 'Sports', icon: TrendingUp },
  { id: 'ppv', label: 'Pay Per View', icon: DollarSign },
];

/* ── Stars ──────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-[#C9A03F] fill-[#C9A03F]' : 'text-[#333]'}`}
        />
      ))}
      <span className="text-white/60 text-xs ml-1">{rating}</span>
    </div>
  );
}

/* ── Capability Card ────────────────────────────── */
function CapabilityCard({ capability }: { capability: StreamingCapability }) {
  return (
    <div className="group bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C9A03F]/30 transition-all duration-300">
      <div className="relative h-2" style={{ backgroundColor: capability.color }} />
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
              style={{ backgroundColor: capability.color }}
            >
              {capability.logo}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{capability.name}</h3>
              <StarRating rating={capability.rating} />
            </div>
          </div>
          {capability.includedInBundle && (
            <div className="bg-[#C9A03F]/10 text-[#C9A03F] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Check className="w-3 h-3" /> Bundle
            </div>
          )}
        </div>

        <p className="text-white/50 text-sm mb-4 line-clamp-2">{capability.description}</p>
        
        <div className="flex items-center gap-1.5 text-white/40 text-xs mb-3">
          <Play className="w-3.5 h-3.5" />
          <span>{capability.contentCount}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {capability.features.map((f) => (
            <span key={f} className="text-[10px] text-white/50 bg-white/5 px-2 py-1 rounded-md">{f}</span>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1.5">Popular on JamZia</p>
          <div className="flex flex-wrap gap-1.5">
            {capability.popularContent.map((c) => (
              <span key={c} className="text-xs text-[#7096D1] bg-[#7096D1]/10 px-2 py-0.5 rounded-full">{c}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <span className="text-xl font-bold text-white">{capability.price}</span>
            <span className="text-white/40 text-xs ml-1">{capability.priceNote}</span>
          </div>
          <div className="flex gap-2">
            <Link
              to="/pay"
              className="flex items-center gap-1.5 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────── */
export default function StreamingPartners() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = CAPABILITIES.filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch = !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bundleItems = CAPABILITIES.filter((c) => c.includedInBundle);
  const bundleValue = bundleItems.reduce((sum, c) => {
    const num = parseFloat(c.price.replace('$', ''));
    return isNaN(num) ? sum : sum + num;
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-black tracking-tight">
              <span className="text-[#C9A03F]">Jam</span><span className="text-white">Zia</span>
              <span className="text-[#7096D1] ml-2 text-lg">Streaming</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/boxflix" className="text-white/60 hover:text-[#C9A03F] text-sm transition-colors hidden md:block">
              JamBoxFlix+
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A03F] to-[#7096D1] flex items-center justify-center text-xs font-bold">
              JZ
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f3c] via-[#0a0a0a] to-[#0f1f3c]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#C9A03F]/10 text-[#C9A03F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              <Lock className="w-3.5 h-3.5" /> JamZia Streaming Stack
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              Everything You Can <span className="text-[#C9A03F]">Stream</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Movies, TV, music, live sports, PPV events, and creator content — 
              all unified under your JamZia dashboard with one bill via WisdomPay on XRP Ledger.
            </p>
          </div>

          {/* JamZia Streaming Bundle */}
          <div className="bg-gradient-to-r from-[#C9A03F]/20 to-[#7096D1]/20 border border-[#C9A03F]/30 rounded-2xl p-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">JamZia Streaming Bundle</h3>
                <p className="text-white/50 text-sm">
                  Get {bundleItems.length} streaming services for one price. Save ${(bundleValue - 29.99).toFixed(2)}/month.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-black text-[#C9A03F]">$29.99</span>
                  <span className="text-white/40 text-sm">/mo</span>
                  <span className="text-white/30 text-sm line-through">${bundleValue.toFixed(2)}/mo separately</span>
                </div>
              </div>
              <Link
                to="/pay"
                className="bg-[#C9A03F] hover:bg-[#d4aa4a] text-black px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap"
              >
                Get Bundle
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Search streaming capabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C9A03F] transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#C9A03F] text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <cat.icon className="w-4 h-4" /> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((capability) => (
            <CapabilityCard key={capability.id} capability={capability} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-lg">No streaming capabilities found matching your search.</p>
          </div>
        )}
      </div>

      {/* Feature Comparison */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-[#111] to-[#0a0a0a] border border-white/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Why JamZia Streaming?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Monitor, title: 'One Dashboard', desc: 'Manage all your streaming subscriptions from a single interface. No more switching between apps.' },
              { icon: DollarSign, title: 'One Bill', desc: 'Unified billing via WisdomPay on XRP Ledger. Pay once, stream everything. Lower fees, faster transactions.' },
              { icon: Smartphone, title: 'Every Device', desc: 'Stream on desktop, mobile, tablet, TV, and console. Your content follows you everywhere.' },
              { icon: Heart, title: 'One Watchlist', desc: 'Add any title from any service to your unified watchlist. Get recommendations across all content.' },
              { icon: Users, title: 'Watch Parties', desc: 'Host synchronized watch parties with group chat. Invite friends to any stream, anywhere.' },
              { icon: Headphones, title: 'JamRadio Included', desc: '100+ streaming radio stations included with every bundle. Music for every mood, 24/7.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A03F]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#C9A03F]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
