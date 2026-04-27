import { useState } from 'react';
import {
  Leaf, ShoppingBag, Recycle, Zap, TreePine, Heart, Star, Filter, Search
} from 'lucide-react';
import { brand } from '../config/brand';

const categories = ['All', 'Home', 'Fashion', 'Energy', 'Food', 'Beauty', 'Transport'];

const products = [
  { id: 1, name: 'Bamboo Cutlery Set', category: 'Home', price: 12.99, rating: 4.8, reviews: 234, carbon: '-0.8kg CO₂', icon: '🥢', badge: 'Zero Waste' },
  { id: 2, name: 'Organic Cotton Tee', category: 'Fashion', price: 28.00, rating: 4.6, reviews: 189, carbon: '-2.1kg CO₂', icon: '👕', badge: 'Organic' },
  { id: 3, name: 'Solar Power Bank', category: 'Energy', price: 45.99, rating: 4.9, reviews: 567, carbon: '-5.3kg CO₂/yr', icon: '☀️', badge: 'Solar' },
  { id: 4, name: 'Beeswax Food Wraps', category: 'Home', price: 18.50, rating: 4.7, reviews: 412, carbon: '-1.2kg CO₂', icon: '🐝', badge: 'Plastic-Free' },
  { id: 5, name: 'Plant-Based Protein', category: 'Food', price: 24.99, rating: 4.5, reviews: 892, carbon: '-8.4kg CO₂', icon: '🌱', badge: 'Vegan' },
  { id: 6, name: 'Hemp Face Serum', category: 'Beauty', price: 34.00, rating: 4.8, reviews: 156, carbon: '-0.5kg CO₂', icon: '🧴', badge: 'Cruelty-Free' },
  { id: 7, name: 'Electric Bike Kit', category: 'Transport', price: 299.00, rating: 4.7, reviews: 78, carbon: '-120kg CO₂/yr', icon: '🚲', badge: 'E-Mobility' },
  { id: 8, name: 'Compost Starter Kit', category: 'Home', price: 22.00, rating: 4.6, reviews: 345, carbon: '-3.2kg CO₂', icon: '🍂', badge: 'Compostable' },
];

const impactStats = [
  { label: 'CO₂ Offset', value: '14.2K', unit: 'tons', icon: Leaf, color: 'emerald' },
  { label: 'Plastic Avoided', value: '8.9K', unit: 'kg', icon: Recycle, color: 'blue' },
  { label: 'Trees Planted', value: '12.5K', unit: 'trees', icon: TreePine, color: 'green' },
  { label: 'Green Products', value: '2,400+', unit: 'items', icon: ShoppingBag, color: 'amber' },
];

export default function JamGreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFav = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Leaf size={20} className="text-emerald-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Green</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-3">
            <Zap size={12} />
            Sustainable Marketplace
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Eco Marketplace</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            Every purchase offsets carbon. Shop 2,400+ verified green products.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {impactStats.map((s) => (
            <div key={s.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
              <s.icon size={20} className={`mx-auto mb-2 text-${s.color}-400`} style={{ color: s.color === 'emerald' ? '#34d399' : s.color === 'blue' ? '#60a5fa' : s.color === 'green' ? '#22c55e' : '#f59e0b' }} />
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-[#6B7280]">{s.unit}</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search green products..."
              className="w-full bg-[#0A0F1E] text-white text-sm placeholder-[#6B7280] rounded-xl pl-10 pr-4 py-3 outline-none border border-white/[0.08] focus:border-emerald-500/30"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#0A0F1E] text-[#6B7280] border border-white/[0.06] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 hover:border-emerald-500/20 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{p.icon}</span>
                <button
                  onClick={() => toggleFav(p.id)}
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Heart size={14} className={favorites.includes(p.id) ? 'text-red-400 fill-red-400' : 'text-[#6B7280]'} />
                </button>
              </div>
              <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{p.badge}</span>
              <p className="text-sm font-semibold text-white mt-2">{p.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={10} className="text-amber-400 fill-amber-400" />
                <span className="text-[10px] text-[#A0AEC0]">{p.rating} ({p.reviews})</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-white">${p.price}</span>
                <span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{p.carbon}</span>
              </div>
              <button className="w-full mt-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-emerald-500/20">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Filter size={32} className="mx-auto text-[#6B7280] mb-3" />
            <p className="text-[#A0AEC0]">No products found</p>
          </div>
        )}
      </main>
    </div>
  );
}
