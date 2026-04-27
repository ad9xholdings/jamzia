import { useState } from 'react';
import {
  Gem, Heart, Clock, Users, Crown, Star, Shield
} from 'lucide-react';
import { brand } from '../config/brand';

const categories = ['All', 'Watches', 'Fashion', 'Art', 'Collectibles', 'Tech', 'Jewelry'];

const items = [
  { id: 1, name: 'Royal Oak Chronograph', category: 'Watches', price: 28500, seller: 'Premier Timepieces', bidders: 12, time: '2h 15m', image: '⌚', rating: 5, verified: true },
  { id: 2, name: 'Bespoke Cashmere Overcoat', category: 'Fashion', price: 4800, seller: 'Atelier Noir', bidders: 4, time: '6h 30m', image: '🧥', rating: 5, verified: true },
  { id: 3, name: 'Abstract Oil on Canvas', category: 'Art', price: 12500, seller: 'Gallery Luxe', bidders: 8, time: '1d 4h', image: '🎨', rating: 4, verified: true },
  { id: 4, name: 'First Edition Comics Set', category: 'Collectibles', price: 3200, seller: 'Vintage Vault', bidders: 18, time: '4h 20m', image: '🦸', rating: 5, verified: false },
  { id: 5, name: 'Diamond Pendant Necklace', category: 'Jewelry', price: 18000, seller: 'House of Gems', bidders: 6, time: '12h 45m', image: '💎', rating: 5, verified: true },
  { id: 6, name: 'Bespoke Mechanical Keyboard', category: 'Tech', price: 1800, seller: 'Artisan Keyworks', bidders: 22, time: '8h 10m', image: '⌨️', rating: 4, verified: false },
  { id: 7, name: 'Vintage Leather Weekender', category: 'Fashion', price: 2900, seller: 'Heritage Goods', bidders: 9, time: '3h 50m', image: '👜', rating: 5, verified: true },
  { id: 8, name: 'Limited Sneaker Collection', category: 'Collectibles', price: 4500, seller: 'Sole Vault', bidders: 34, time: '1h 25m', image: '👟', rating: 5, verified: true },
];

const stats = [
  { label: 'Active Auctions', value: '1,240', icon: Clock },
  { label: 'Verified Sellers', value: '486', icon: Shield },
  { label: 'Total Sales', value: '$48.2M', icon: Gem },
  { label: 'Members', value: '32K', icon: Users },
];

export default function JamCat() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2"><Gem size={20} className="text-pink-400" /><span className="font-display text-lg font-bold">{brand.prefix}Cat</span></div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-xs font-semibold text-pink-400 mb-3">
            <Crown size={12} />BlackDiamond Collection
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Premium Marketplace</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">Curated luxury. Verified sellers. Exclusive auctions for discerning collectors.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
              <s.icon size={20} className="mx-auto mb-2 text-pink-400" />
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-[#6B7280]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-1 overflow-x-auto pb-2 mb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${activeCategory === cat ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-[#0A0F1E] text-[#6B7280] border border-white/[0.06]'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filtered.map(item => (
            <div key={item.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 hover:border-pink-500/20 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{item.image}</span>
                <div className="flex items-center gap-1">
                  {item.verified && <Shield size={12} className="text-blue-400" />}
                  <button onClick={() => setFavorites(prev => prev.includes(item.id) ? prev.filter(f => f !== item.id) : [...prev, item.id])}
                    className="p-1 cursor-pointer">
                    <Heart size={14} className={favorites.includes(item.id) ? 'text-pink-400 fill-pink-400' : 'text-[#6B7280]'} />
                  </button>
                </div>
              </div>
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5 flex items-center gap-1"><Star size={8} className="text-amber-400" />{item.seller}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-white">${item.price.toLocaleString()}</span>
                <span className="text-[9px] text-pink-400 bg-pink-400/10 px-2 py-1 rounded-full">{item.bidders} bids</span>
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px] text-[#6B7280]">
                <span className="flex items-center gap-1"><Clock size={10} />{item.time} left</span>
              </div>
              <button className="w-full mt-3 py-2 bg-pink-500/20 text-pink-400 text-xs font-semibold rounded-xl cursor-pointer hover:bg-pink-500/30 transition-colors border border-pink-500/20">Place Bid</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
