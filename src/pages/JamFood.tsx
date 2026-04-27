import { useState } from 'react';
import {
  ShoppingCart, Plus, Minus, X, Search, ChefHat, Flame, Clock, Trash2, Check
} from 'lucide-react';
import { useFoodStore } from '../store/useFoodStore';

const categories = [
  { id: 'all', label: 'All', icon: '🍽️' },
  { id: 'appetizer', label: 'Starters', icon: '🥨' },
  { id: 'entree', label: 'Entrees', icon: '🍽️' },
  { id: 'dessert', label: 'Desserts', icon: '🍰' },
  { id: 'drink', label: 'Drinks', icon: '🥤' },
];

export default function JamFood() {
  const {
    items, cart, category, searchQuery, setCategory, setSearchQuery,
    addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount
  } = useFoodStore();
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const filtered = items.filter((item) => {
    const catMatch = category === 'all' || item.category === category;
    const searchMatch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center gap-3">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <ChefHat size={24} className="text-[#7096D1] shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-bold text-white truncate">JamFood™</h1>
            <p className="text-[10px] text-[#6B7280]">Powered by Ad9x™</p>
          </div>

          {/* Search */}
          <div className="relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu..."
              className="w-40 bg-[#1A1F2E] text-white text-xs placeholder-[#6B7280] rounded-full pl-8 pr-3 py-2 outline-none border border-transparent focus:border-[#7096D1]/50"
            />
          </div>

          {/* Cart button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-2.5 bg-[#1A1F2E] rounded-full hover:bg-[#7096D1]/20 transition-colors cursor-pointer shrink-0"
          >
            <ShoppingCart size={18} className="text-[#7096D1]" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7096D1] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-4 py-4">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                category === cat.id ? 'bg-[#F7F2EB] text-black' : 'bg-white/5 text-[#A0AEC0] hover:bg-white/10'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>{cat.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-[14px] p-[1px] bg-white/[0.06] hover:bg-gradient-to-br hover:from-[#081F5C] hover:to-[#7096D1] transition-all group"
            >
              <div className="bg-[#0A0F1E] rounded-[14px] p-4 flex gap-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#1A1F2E] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white">{item.name}</h3>
                        {item.popular && <Flame size={12} className="text-orange-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">{item.description}</p>
                    </div>
                    <span className="text-sm font-bold text-[#7096D1] shrink-0">${item.price.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1">
                      {item.dietary?.map((d) => (
                        <span key={d} className="text-[9px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full capitalize">{d}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-2 bg-[#7096D1] rounded-full hover:bg-[#7096D1]/80 transition-colors cursor-pointer"
                    >
                      <Plus size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={32} className="text-[#6B7280] mx-auto mb-3" />
            <p className="text-[#A0AEC0]">No items found</p>
          </div>
        )}
      </div>

      {/* Cart Slide-out */}
      {showCart && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[380px] bg-[#0A0F1E] border-l border-white/[0.06] overflow-y-auto">
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <ShoppingCart size={18} className="text-[#7096D1]" />
                Your Order ({getCartCount()})
              </h2>
              <button onClick={() => setShowCart(false)} className="p-1.5 rounded-full hover:bg-white/10 cursor-pointer text-[#6B7280]">
                <X size={18} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart size={40} className="text-[#6B7280] mx-auto mb-3" />
                <p className="text-[#A0AEC0]">Your cart is empty</p>
                <button onClick={() => setShowCart(false)} className="mt-3 text-sm text-[#7096D1] hover:underline cursor-pointer">
                  Browse menu
                </button>
              </div>
            ) : (
              <>
                <div className="p-4 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl">
                      <span className="text-2xl shrink-0">{item.image}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                        <p className="text-xs text-[#7096D1]">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer">
                          <Minus size={12} className="text-white" />
                        </button>
                        <span className="text-sm font-semibold text-white w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer">
                          <Plus size={12} className="text-white" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-1 cursor-pointer text-[#6B7280] hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#A0AEC0]">Subtotal</span>
                    <span className="text-white font-semibold">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#A0AEC0]">Tax</span>
                    <span className="text-white font-semibold">${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-base border-t border-white/[0.06] pt-3">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-[#7096D1]">${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => { setShowCart(false); setShowCheckout(true); }}
                    className="w-full py-3 bg-[#F7F2EB] text-black font-bold rounded-full hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    Checkout
                  </button>
                  <button onClick={clearCart} className="w-full py-2 text-xs text-[#6B7280] hover:text-red-400 cursor-pointer">
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowCheckout(false)} />
          <div className="relative w-full max-w-[400px] rounded-[14px] p-[1px] jamzia-gradient-border">
            <div className="bg-[#0A0F1E] rounded-[14px] p-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-[#7096D1]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check size={28} className="text-[#7096D1]" />
                </div>
                <h2 className="font-display text-xl font-bold text-white">Order Confirmed!</h2>
                <p className="text-sm text-[#6B7280] mt-1">Your JamFood order is being prepared</p>
              </div>

              <div className="space-y-2 mb-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-[#A0AEC0]">{item.name} x{item.quantity}</span>
                    <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-[#7096D1]">${(getCartTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-5">
                <Clock size={12} />
                <span>Estimated delivery: 25-35 min</span>
              </div>

              <button
                onClick={() => { setShowCheckout(false); clearCart(); }}
                className="w-full py-3 bg-[#F7F2EB] text-black font-bold rounded-full hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
