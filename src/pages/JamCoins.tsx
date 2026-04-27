/* ═══════════════════════════════════════════════════════════
   JamCoins™ — AR Crypto Coin Collection
   Like Pokemon Go but with Crypto Coins
   Find & Collect Coins in Augmented Reality
   Powered by JamZia Networks™ — WisdomPay XRPL
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Crosshair, Trophy, Wallet, Star, ChevronLeft,
  Radar, Coins, Diamond, CircleDollarSign, Shield, Gem,
  ArrowUp, Scan, X, Sparkles, Hexagon,
} from 'lucide-react';

/* ── Coin Types ── */
interface CoinType {
  id: string;
  name: string;
  symbol: string;
  color: string;
  bgColor: string;
  value: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  icon: typeof Coins;
  desc: string;
  xpReward: number;
}

const COIN_TYPES: CoinType[] = [
  { id: 'bronze', name: 'Bronze Coin', symbol: 'BRC', color: '#CD7F32', bgColor: '#CD7F3220', value: 1, rarity: 'common', icon: Coins, desc: 'Found everywhere. Worth 1 SkyIvy.', xpReward: 5 },
  { id: 'silver', name: 'Silver Coin', symbol: 'SVC', color: '#C0C0C0', bgColor: '#C0C0C020', value: 5, rarity: 'uncommon', icon: Coins, desc: 'Scattered near shops. Worth 5 SkyIvy.', xpReward: 15 },
  { id: 'gold', name: 'Gold Coin', symbol: 'GDC', color: '#FFD700', bgColor: '#FFD70020', value: 25, rarity: 'rare', icon: CircleDollarSign, desc: 'Rare find near landmarks. Worth 25 SkyIvy.', xpReward: 50 },
  { id: 'platinum', name: 'Platinum Coin', symbol: 'PTC', color: '#E5E4E2', bgColor: '#E5E4E220', value: 100, rarity: 'epic', icon: Diamond, desc: 'Epic discovery at special locations. Worth 100 SkyIvy.', xpReward: 150 },
  { id: 'diamond', name: 'Diamond Coin', symbol: 'DMC', color: '#B9F2FF', bgColor: '#B9F2FF20', value: 500, rarity: 'legendary', icon: Gem, desc: 'Legendary find. Only at the Castle. Worth 500 SkyIvy.', xpReward: 500 },
  { id: 'skyivy', name: 'SkyIvy Coin', symbol: 'SKI', color: '#22c55e', bgColor: '#22c55e20', value: 1000, rarity: 'mythic', icon: Star, desc: 'The native token of JamZia. Worth 1000 SkyIvy.', xpReward: 1000 },
  { id: 'skylockr', name: 'SkyLockr Coin', symbol: 'SKL', color: '#3b82f6', bgColor: '#3b82f620', value: 2000, rarity: 'mythic', icon: Shield, desc: 'The security token. Worth 2000 SkyLockr.', xpReward: 2000 },
  { id: 'airx', name: 'AirCoin (AIRX)', symbol: 'AIRX', color: '#f59e0b', bgColor: '#f59e0b20', value: 5000, rarity: 'mythic', icon: Hexagon, desc: 'JamZia Networks AirCoin. The ultimate AR crypto collectible.', xpReward: 2500 },
];

/* ── Spawned Coin ── */
interface SpawnedCoin {
  id: string;
  typeId: string;
  x: number;
  y: number;
  distance: string;
  direction: string;
  expiresAt: number;
  collected: boolean;
}

/* ── Inventory ── */
interface Inventory {
  [coinId: string]: number;
}

/* ── Rarity Config ── */
const RARITY_META: Record<string, { label: string; color: string; spawnChance: number }> = {
  common: { label: 'Common', color: '#6B7280', spawnChance: 0.45 },
  uncommon: { label: 'Uncommon', color: '#22c55e', spawnChance: 0.25 },
  rare: { label: 'Rare', color: '#3b82f6', spawnChance: 0.15 },
  epic: { label: 'Epic', color: '#a855f7', spawnChance: 0.08 },
  legendary: { label: 'Legendary', color: '#f59e0b', spawnChance: 0.04 },
  mythic: { label: 'Mythic', color: '#ef4444', spawnChance: 0.03 },
};

/* ── Mock spawn ── */
function spawnCoin(): SpawnedCoin {
  const roll = Math.random();
  let cumulative = 0;
  let selected = COIN_TYPES[0];
  for (const coin of COIN_TYPES) {
    cumulative += RARITY_META[coin.rarity].spawnChance;
    if (roll <= cumulative) { selected = coin; break; }
  }
  const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
  return {
    id: `coin_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    typeId: selected.id,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    distance: `${Math.floor(Math.random() * 500 + 50)}m`,
    direction: directions[Math.floor(Math.random() * directions.length)],
    expiresAt: Date.now() + 300000 + Math.random() * 300000,
    collected: false,
  };
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function JamCoins() {
  const [view, setView] = useState<'map' | 'ar' | 'inventory' | 'leaderboard'>('map');
  const [coins, setCoins] = useState<SpawnedCoin[]>([]);
  const [inventory, setInventory] = useState<Inventory>(() => {
    const saved = localStorage.getItem('jamcoins_inventory');
    return saved ? JSON.parse(saved) : {};
  });
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('jamcoins_stats');
    return saved ? JSON.parse(saved) : { totalCollected: 0, totalValue: 0, xp: 0, level: 1, streak: 0, bestStreak: 0 };
  });
  const [selectedCoin, setSelectedCoin] = useState<SpawnedCoin | null>(null);
  const [arActive, setArActive] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  /* ── Spawn coins on mount ── */
  useEffect(() => {
    const initial: SpawnedCoin[] = [];
    for (let i = 0; i < 12; i++) initial.push(spawnCoin());
    setCoins(initial);
  }, []);

  /* ── Periodic respawn ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev: SpawnedCoin[]) => {
        const now = Date.now();
        const alive = prev.filter(c => !c.collected && c.expiresAt > now);
        if (alive.length < 8) {
          return [...alive, spawnCoin(), spawnCoin()];
        }
        return alive;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  /* ── Save inventory ── */
  useEffect(() => {
    localStorage.setItem('jamcoins_inventory', JSON.stringify(inventory));
    localStorage.setItem('jamcoins_stats', JSON.stringify(stats));
  }, [inventory, stats]);

  /* ── Show toast ── */
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  /* ── Collect coin ── */
  const collectCoin = useCallback((coin: SpawnedCoin) => {
    const coinType = COIN_TYPES.find(c => c.id === coin.typeId);
    if (!coinType) return;

    setCoins((prev: SpawnedCoin[]) => prev.map(c => c.id === coin.id ? { ...c, collected: true } : c));
    setInventory((prev: Inventory) => ({ ...prev, [coin.typeId]: (prev[coin.typeId] || 0) + 1 }));
    setStats((prev: typeof stats) => ({
      ...prev,
      totalCollected: prev.totalCollected + 1,
      totalValue: prev.totalValue + coinType.value,
      xp: prev.xp + coinType.xpReward,
      streak: prev.streak + 1,
      bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
      level: Math.floor((prev.xp + coinType.xpReward) / 500) + 1,
    }));
    showToast(`+${coinType.symbol} Collected! +${coinType.xpReward} XP`);
    setSelectedCoin(null);
    setArActive(false);
  }, [showToast]);

  /* ── AR View ── */
  const ArView = () => (
    <div className="fixed inset-0 bg-black z-40 flex flex-col">
      {/* AR Camera feed simulation */}
      <div className="flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #1a3a5c 40%, #2d5016 100%)' }}>
        {/* Sky */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 20%, #1a4a7a 0%, #0a1628 70%)' }}>
          {/* Stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-white animate-pulse" style={{ top: `${Math.random() * 40}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }} />
          ))}
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Ground plane */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%]" style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0d2818 100%)' }}>
          {/* Perspective grid */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 0%, rgba(34,197,94,0.1) 100%), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100% 100%, 60px 60px, 60px 60px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'bottom' }} />
        </div>

        {/* AR Coin target */}
        {selectedCoin && (() => {
          const ct = COIN_TYPES.find(c => c.id === selectedCoin.typeId);
          if (!ct) return null;
          const Icon = ct.icon;
          return (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce" style={{ animationDuration: '2s' }}>
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-6 rounded-full animate-ping opacity-30" style={{ backgroundColor: ct.color, animationDuration: '2s' }} />
                <div className="absolute -inset-3 rounded-full" style={{ backgroundColor: `${ct.color}20`, border: `2px solid ${ct.color}60`, boxShadow: `0 0 30px ${ct.color}40` }} />
                {/* Coin */}
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `radial-gradient(circle at 35% 35%, ${ct.color}, ${ct.bgColor})`, border: `3px solid ${ct.color}`, boxShadow: `0 0 40px ${ct.color}60, inset 0 0 20px rgba(255,255,255,0.2)` }}>
                  <Icon size={40} style={{ color: '#fff', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                </div>
                {/* Rarity badge */}
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ backgroundColor: RARITY_META[ct.rarity].color, color: '#fff' }}>
                  {RARITY_META[ct.rarity].label}
                </div>
              </div>
              <p className="text-white text-sm font-bold mt-4 drop-shadow-lg">{ct.name}</p>
              <p className="text-white/60 text-xs">{ct.desc}</p>
              <p className="text-xs font-bold mt-1" style={{ color: ct.color }}>{ct.value} {ct.symbol}</p>
            </div>
          );
        })()}

        {/* Scan lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }} />
      </div>

      {/* AR Controls */}
      <div className="bg-[#0A0F1E] border-t border-white/[0.06] px-4 py-4 flex items-center justify-between">
        <button onClick={() => { setArActive(false); setView('map'); }} className="flex items-center gap-1.5 text-[10px] text-[#6B7280] hover:text-white cursor-pointer">
          <X size={14} /> Exit AR
        </button>
        {selectedCoin && (() => {
          const ct = COIN_TYPES.find(c => c.id === selectedCoin.typeId);
          return ct ? (
            <button onClick={() => collectCoin(selectedCoin)} className="px-6 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer flex items-center gap-2" style={{ backgroundColor: ct.color }}>
              <Scan size={14} /> Collect {ct.symbol}
            </button>
          ) : null;
        })()}
        <div className="flex items-center gap-1 text-[10px] text-[#6B7280]">
          <Radar size={12} className="text-emerald-400 animate-pulse" /> AR Active
        </div>
      </div>
    </div>
  );

  /* ═══ MAP VIEW ═══ */
  if (view === 'map' && !arActive) {
    return (
      <div className="min-h-[100dvh] bg-[#0A0F1E] text-white relative">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0A0F1E]/90 backdrop-blur-md border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline shrink-0">back</a>
            <Hexagon size={20} className="text-[#f59e0b] shrink-0" />
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold text-white">JamCoins™</h1>
              <p className="text-[9px] text-[#6B7280]">AR Crypto Collection • Powered by WisdomPay™ XRPL</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[9px] text-[#6B7280]">Level {stats.level}</p>
                <div className="w-16 h-1 bg-white/[0.1] rounded-full">
                  <div className="h-1 rounded-full bg-[#f59e0b]" style={{ width: `${(stats.xp % 500) / 5}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-[#6B7280]">Wallet</p>
                <p className="text-[10px] font-bold text-[#22c55e]">{stats.totalValue.toLocaleString()} SKI</p>
              </div>
            </div>
          </div>
        </header>

        {/* Map Area */}
        <div ref={mapRef} className="relative h-[60vh] overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d1f35 0%, #1a3a2a 60%, #2d5016 100%)' }}>
          {/* Grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          {/* Roads */}
          <div className="absolute top-[30%] left-0 right-0 h-3 bg-[#2a2a2a] opacity-60" />
          <div className="absolute top-[60%] left-0 right-0 h-2 bg-[#2a2a2a] opacity-40" />
          <div className="absolute left-[25%] top-0 bottom-0 w-3 bg-[#2a2a2a] opacity-50" />
          <div className="absolute left-[70%] top-0 bottom-0 w-2 bg-[#2a2a2a] opacity-30" />

          {/* User position (center) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-8 h-8 rounded-full bg-[#3b82f6] border-2 border-white flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Crosshair size={16} className="text-white" />
            </div>
            <div className="absolute -inset-2 rounded-full border-2 border-[#3b82f6]/30 animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          {/* Spawned coins */}
          {coins.filter(c => !c.collected && c.expiresAt > Date.now()).map(coin => {
            const ct = COIN_TYPES.find(t => t.id === coin.typeId);
            if (!ct) return null;
            const Icon = ct.icon;
            return (
              <button
                key={coin.id}
                onClick={() => { setSelectedCoin(coin); setArActive(true); }}
                className="absolute z-10 group cursor-pointer"
                style={{ top: `${coin.y}%`, left: `${coin.x}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative animate-bounce" style={{ animationDuration: `${2 + Math.random() * 2}s` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: ct.bgColor, border: `2px solid ${ct.color}`, boxShadow: `0 0 15px ${ct.color}40` }}>
                    <Icon size={18} style={{ color: ct.color }} />
                  </div>
                  <div className="absolute -inset-1 rounded-full animate-ping opacity-20" style={{ border: `1px solid ${ct.color}`, animationDuration: '3s' }} />
                </div>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold whitespace-nowrap px-1.5 py-0.5 rounded bg-black/60" style={{ color: ct.color }}>
                  {coin.distance}
                </span>
              </button>
            );
          })}

          {/* Compass */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center">
            <ArrowUp size={16} className="text-white" />
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="bg-[#0A0F1E] border-t border-white/[0.06]">
          {/* Stats Row */}
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-[#f59e0b]">{stats.totalCollected}</p>
                <p className="text-[8px] text-[#6B7280]">Collected</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#22c55e]">{stats.totalValue.toLocaleString()}</p>
                <p className="text-[8px] text-[#6B7280]">SkyIvy Value</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#7096D1]">{stats.xp.toLocaleString()}</p>
                <p className="text-[8px] text-[#6B7280]">XP</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#ec4899]">{stats.streak}</p>
                <p className="text-[8px] text-[#6B7280]">Streak</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setView('inventory')} className="px-3 py-2 rounded-xl text-[10px] font-bold cursor-pointer bg-white/[0.03] text-[#6B7280] hover:text-white">
                <Wallet size={12} className="inline mr-1" /> Wallet
              </button>
              <button onClick={() => setView('leaderboard')} className="px-3 py-2 rounded-xl text-[10px] font-bold cursor-pointer bg-white/[0.03] text-[#6B7280] hover:text-white">
                <Trophy size={12} className="inline mr-1" /> Ranks
              </button>
            </div>
          </div>

          {/* Coin Legend */}
          <div className="max-w-6xl mx-auto px-4 pb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {COIN_TYPES.map(ct => (
                <div key={ct.id} className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <ct.icon size={10} style={{ color: ct.color }} />
                  <span className="text-[8px] text-[#A0AEC0]">{ct.symbol}</span>
                  <span className="text-[8px] text-[#6B7280]">{inventory[ct.id] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#0F172A] border border-[#f59e0b]/30 rounded-xl shadow-2xl">
            <p className="text-xs font-bold text-[#f59e0b] flex items-center gap-2">
              <Sparkles size={14} /> {toast}
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ═══ AR VIEW ═══ */
  if (arActive) return <ArView />;

  /* ═══ INVENTORY VIEW ═══ */
  if (view === 'inventory') {
    return (
      <div className="min-h-[100dvh] bg-[#0A0F1E] text-white">
        <header className="sticky top-0 z-30 bg-[#0A0F1E]/90 backdrop-blur-md border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => setView('map')} className="text-[10px] text-[#6B7280] hover:text-white cursor-pointer flex items-center gap-1"><ChevronLeft size={12} /> Map</button>
            <Wallet size={18} className="text-[#f59e0b]" />
            <h1 className="text-sm font-bold">My Wallet</h1>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COIN_TYPES.map(ct => {
              const count = inventory[ct.id] || 0;
              const Icon = ct.icon;
              return (
                <div key={ct.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: ct.bgColor, border: `2px solid ${ct.color}` }}>
                    <Icon size={24} style={{ color: ct.color }} />
                  </div>
                  <p className="text-sm font-bold text-white">{ct.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{ct.symbol}</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: ct.color }}>{count}</p>
                  <p className="text-[9px] text-[#6B7280]">× {ct.value} SkyIvy = {(count * ct.value).toLocaleString()}</p>
                </div>
              );
            })}
          </div>
          <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-2xl p-4 text-center">
            <p className="text-sm text-[#A0AEC0]">Total Portfolio Value</p>
            <p className="text-3xl font-bold text-[#f59e0b]">{stats.totalValue.toLocaleString()} SkyIvy</p>
            <p className="text-[10px] text-[#6B7280]">~${(stats.totalValue * 0.0012).toFixed(2)} USD equivalent</p>
          </div>
        </main>
      </div>
    );
  }

  /* ═══ LEADERBOARD VIEW ═══ */
  if (view === 'leaderboard') {
    const leaders = [
      { rank: 1, name: 'CoinHunter99', collected: 2847, value: 45200, level: 42 },
      { rank: 2, name: 'CryptoKing', collected: 2634, value: 41800, level: 39 },
      { rank: 3, name: 'SkyIvyQueen', collected: 2412, value: 38500, level: 37 },
      { rank: 4, name: 'ARexplorer', collected: 2156, value: 32100, level: 34 },
      { rank: 5, name: 'BlockSeeker', collected: 1987, value: 29400, level: 31 },
      { rank: 99, name: 'You', collected: stats.totalCollected, value: stats.totalValue, level: stats.level, isYou: true },
    ];

    return (
      <div className="min-h-[100dvh] bg-[#0A0F1E] text-white">
        <header className="sticky top-0 z-30 bg-[#0A0F1E]/90 backdrop-blur-md border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => setView('map')} className="text-[10px] text-[#6B7280] hover:text-white cursor-pointer flex items-center gap-1"><ChevronLeft size={12} /> Map</button>
            <Trophy size={18} className="text-[#f59e0b]" />
            <h1 className="text-sm font-bold">Leaderboard</h1>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-2">
          {leaders.map(l => (
            <div key={l.rank} className={`flex items-center gap-3 p-3 rounded-xl ${l.isYou ? 'bg-[#f59e0b]/10 border border-[#f59e0b]/30' : 'bg-white/[0.02] border border-white/[0.04]'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${l.rank === 1 ? 'bg-[#FFD700]/20 text-[#FFD700]' : l.rank === 2 ? 'bg-[#C0C0C0]/20 text-[#C0C0C0]' : l.rank === 3 ? 'bg-[#CD7F32]/20 text-[#CD7F32]' : 'bg-white/[0.05] text-[#6B7280]'}`}>
                #{l.rank}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${l.isYou ? 'text-[#f59e0b]' : 'text-white'}`}>{l.name}</p>
                <p className="text-[9px] text-[#6B7280]">Level {l.level} • {l.collected.toLocaleString()} coins</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[#22c55e]">{l.value.toLocaleString()} SKI</p>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }

  return null;
}
