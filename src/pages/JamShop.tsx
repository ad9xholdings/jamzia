import { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Star, Store } from 'lucide-react';


const products = [
  { id: 'sp1', name: 'JamZia Hoodie', price: 59.99, category: 'apparel', rating: 4.8, emoji: '🧥', sales: '1.2K' },
  { id: 'sp2', name: 'Creator Mic Pro', price: 129.99, category: 'electronics', rating: 4.9, emoji: '🎤', sales: '890' },
  { id: 'sp3', name: 'JamZia Sticker Pack', price: 9.99, category: 'accessories', rating: 4.6, emoji: '🏷️', sales: '3.4K' },
  { id: 'sp4', name: 'Ring Light Kit', price: 49.99, category: 'electronics', rating: 4.7, emoji: '💡', sales: '2.1K' },
  { id: 'sp5', name: 'Premium Course Bundle', price: 199.99, category: 'digital', rating: 4.9, emoji: '📚', sales: '567' },
  { id: 'sp6', name: 'JamZia Cap', price: 24.99, category: 'apparel', rating: 4.5, emoji: '🧢', sales: '1.8K' },
];

const cats = ['all', 'apparel', 'electronics', 'accessories', 'digital'];

export default function JamShop() {
  const [cat, setCat] = useState('all');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);

  const filtered = cat === 'all' ? products : products.filter((p) => p.category === cat);

  const addToCart = (id: string) => setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  const updateQty = (id: string, delta: number) => {
    const next = { ...cart, [id]: (cart[id] || 0) + delta };
    if (next[id] <= 0) delete next[id];
    setCart(next);
  };
  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);
  const cartTotal = Object.entries(cart).reduce((s, [id, qty]) => {
    const p = products.find((pr) => pr.id === id);
    return s + (p ? p.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-3">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <Store size={24} className="text-[#f59e0b] shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-bold text-white">JamShop™</h1>
            <p className="text-[10px] text-[#6B7280]">Marketplace</p>
          </div>
          <button onClick={() => setShowCart(!showCart)} className="relative p-2.5 bg-[#1A1F2E] rounded-full cursor-pointer shrink-0">
            <ShoppingCart size={18} className="text-[#f59e0b]" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f59e0b] text-black text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-4 py-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer capitalize ${cat === c ? 'bg-[#F7F2EB] text-black' : 'bg-white/5 text-[#A0AEC0] hover:bg-white/10'}`}>{c === 'all' ? '🛍️ All' : c}</button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-[14px] p-[1px] bg-white/[0.06] hover:bg-gradient-to-br hover:from-[#081F5C] hover:to-[#f59e0b] transition-all group">
              <div className="bg-[#0A0F1E] rounded-[14px] p-4">
                <div className="w-full h-36 rounded-xl bg-[#1A1F2E] flex items-center justify-center text-6xl mb-3">
                  {p.emoji}
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-[#A0AEC0]">{p.rating}</span>
                  <span className="text-xs text-[#6B7280]">({p.sales} sold)</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#f59e0b] transition-colors">{p.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-white">${p.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(p.id)} className="p-2 bg-[#f59e0b] rounded-full hover:bg-[#f59e0b]/80 cursor-pointer">
                    <Plus size={14} className="text-black" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      {showCart && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[380px] bg-[#0A0F1E] border-l border-white/[0.06] overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white">Cart ({cartCount})</h2>
              <button onClick={() => setShowCart(false)} className="p-1.5 cursor-pointer text-[#6B7280]"><X size={18} /></button>
            </div>
            {Object.keys(cart).length === 0 ? (
              <p className="text-center text-[#A0AEC0] py-10">Your cart is empty</p>
            ) : (
              <>
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find((pr) => pr.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl mb-2">
                      <span className="text-2xl">{p.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                        <p className="text-xs text-[#7096D1]">${p.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => updateQty(id, -1)} className="p-1 rounded-full bg-white/5 cursor-pointer"><Minus size={10} className="text-white" /></button>
                        <span className="text-sm font-bold text-white w-5 text-center">{qty}</span>
                        <button onClick={() => updateQty(id, 1)} className="p-1 rounded-full bg-white/5 cursor-pointer"><Plus size={10} className="text-white" /></button>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t border-white/[0.06] pt-3 mt-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white">Total</span>
                    <span className="text-lg font-bold text-[#f59e0b]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3 bg-[#F7F2EB] text-black font-bold rounded-full hover:scale-[1.02] transition-transform cursor-pointer">Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
