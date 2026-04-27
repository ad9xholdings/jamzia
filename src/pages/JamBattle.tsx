import { useState, useEffect } from 'react';
import {
  Swords, X, Zap, Shield, Plane, Car, Wrench, Flame, Snowflake,
  Coins, ChevronRight, Trophy, Volume2, Sparkles,
  Scroll, Star, Crown, Castle, Gem, Footprints, RotateCcw,
  Gift, XCircle, Bug, Dog, Hexagon
} from 'lucide-react';
import { useBattleStore } from '../store/useBattleStore';

function TokenBadge({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg px-2 py-1">
      <Icon size={12} style={{ color }} />
      <span className="text-[10px] font-bold" style={{ color }}>{value}</span>
      <span className="text-[9px] text-[#6B7280]">{label}</span>
    </div>
  );
}

function CreatureCard({ creature }: { creature: { hp: number; maxHp: number; name: string; image: string; tier: string; type: string; attack: number; defense: number; speed: number } }) {
  const hpPct = Math.round((creature.hp / creature.maxHp) * 100);
  return (
    <div className="bg-[#0A0F1E] border border-amber-500/30 rounded-2xl p-4 text-center">
      <img src={creature.image} alt={creature.name} className="w-24 h-24 mx-auto rounded-xl object-cover mb-2 border border-amber-500/20" />
      <p className="text-sm font-bold text-white">{creature.name}</p>
      <div className="flex justify-center gap-2 mt-1">
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 uppercase">{creature.tier}</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 uppercase">{creature.type}</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${hpPct}%` }} />
        </div>
        <span className="text-[9px] text-white">{creature.hp}/{creature.maxHp}</span>
      </div>
      <div className="flex justify-center gap-3 text-[10px] text-[#A0AEC0] mt-1">
        <span>ATK {creature.attack}</span>
        <span>DEF {creature.defense}</span>
        <span>SPD {creature.speed}</span>
      </div>
    </div>
  );
}

function RoadStage({ position, maxPosition }: { position: number; maxPosition: number }) {
  return (
    <div className="relative">
      <img src="/ar-scenes/cotton-road-path.jpg" alt="Cotton Brick Road" className="w-full h-32 object-cover rounded-2xl border border-amber-500/20 mb-3" />
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <div className="text-center">
          <Footprints size={16} className="text-emerald-400 mx-auto" />
          <p className="text-[8px] text-[#6B7280]">Start</p>
        </div>
        <div className="flex-1 mx-2 h-1 bg-gradient-to-r from-emerald-500/50 via-amber-500/50 to-purple-500/50 rounded-full relative">
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full shadow-lg border-2 border-white transition-all duration-700" style={{ left: `${(position / maxPosition) * 100}%` }} />
        </div>
        <div className="text-center">
          <Castle size={16} className="text-purple-400 mx-auto" />
          <p className="text-[8px] text-[#6B7280]">Castle</p>
        </div>
      </div>
      <p className="text-center text-[10px] text-[#6B7280]">Stage {position} of {maxPosition} — Mrs. Cotton's Academy, The Winston School, NJ</p>
    </div>
  );
}

export default function JamBattle() {
  const s = useBattleStore();
  const [showIntro, setShowIntro] = useState(true);
  const [treasuryAmount, setTreasuryAmount] = useState(5);
  const [deedAnim, setDeedAnim] = useState(false);

  useEffect(() => { const t = setTimeout(() => setShowIntro(false), 2500); return () => clearTimeout(t); }, []);

  if (showIntro) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <img src="/ar-scenes/cotton-road-banner.jpg" alt="Cotton Brick Road" className="w-64 rounded-2xl mb-4 border border-amber-500/30" />
        <h1 className="font-display text-3xl font-bold text-amber-400">Castle</h1>
        <p className="text-[#6B7280] text-sm mt-2">The Battle for Cotton Brick Road begins...</p>
        <div className="flex gap-1 mt-4">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-[#0A0F1E]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[900px] mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-2 text-[#A0AEC0] hover:text-white no-underline text-sm">
            <X size={18} /> Exit
          </a>
          <div className="flex items-center gap-2">
            <Swords size={20} className="text-amber-400" />
            <span className="font-display font-bold">Castle</span><span className="text-[10px] text-amber-400 ml-1">by RiverShyre</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins size={14} className="text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">{s.tokens.skyIvy}</span>
          </div>
        </div>
      </div>

      {/* Token Bar */}
      <div className="bg-[#0A0F1E] border-b border-white/5 px-4 py-2">
        <div className="max-w-[900px] mx-auto flex flex-wrap gap-2 justify-center">
          <TokenBadge icon={Flame} label="Gas" value={s.tokens.gas} color="#f97316" />
          <TokenBadge icon={Zap} label="NRG" value={s.tokens.energy} color="#22c55e" />
          <TokenBadge icon={Shield} label="Gear" value={s.tokens.battleGear} color="#7096D1" />
          <TokenBadge icon={Plane} label="Air" value={s.tokens.aircraft} color="#06b6d4" />
          <TokenBadge icon={Car} label="Land" value={s.tokens.landCraft} color="#a855f7" />
          <TokenBadge icon={Wrench} label="Wep" value={s.tokens.weapons} color="#ef4444" />
        </div>
      </div>

      <main className="max-w-[900px] mx-auto px-4 py-6 space-y-4">
        {/* ROAD */}
        {s.phase === 'road' && (
          <>
            <RoadStage position={s.position} maxPosition={s.maxPosition} />
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white flex items-center gap-2"><HeartIcon /> Your HP</span>
                <span className="text-xs text-[#6B7280]">{s.playerHp}/{s.playerMaxHp}</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(s.playerHp / s.playerMaxHp) * 100}%` }} />
              </div>
            </div>

            {/* Treasury */}
            <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-2xl p-4">
              <p className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2"><Gem size={16} /> Pay the Treasury for Power</p>
              <p className="text-xs text-[#A0AEC0] mb-3">Pay SkyIvy to boost stats. Funds the reward pool.</p>
              <div className="flex items-center gap-2">
                <input type="range" min={0} max={50} value={treasuryAmount} onChange={(e) => setTreasuryAmount(Number(e.target.value))} className="flex-1 accent-amber-400" />
                <button onClick={() => { if (s.payTreasury(treasuryAmount)) { s.advancePosition(); setTimeout(() => s.startEncounter(), 500); } }} className="px-4 py-2 bg-amber-500 text-black text-xs font-bold rounded-xl hover:bg-amber-400 transition-all flex items-center gap-1">
                  <Coins size={12} /> Pay {treasuryAmount} & Advance
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={() => { s.advancePosition(); setTimeout(() => s.startEncounter(), 500); }} className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-2">
                <Footprints size={16} /> Walk the Road (Free)
              </button>
            </div>

            <div className="flex justify-center gap-4 text-center">
              <div><Trophy size={16} className="text-amber-400 mx-auto" /><p className="text-xs text-[#6B7280]">{s.wins} Wins</p></div>
              <div><XCircle size={16} className="text-red-400 mx-auto" /><p className="text-xs text-[#6B7280]">{s.losses} Losses</p></div>
              <div><Coins size={16} className="text-emerald-400 mx-auto" /><p className="text-xs text-[#6B7280]">{s.totalEarned} Earned</p></div>
              <div><Snowflake size={16} className="text-blue-400 mx-auto" /><p className="text-xs text-[#6B7280]">{s.frozenCreatures.length} Frozen</p></div>
            </div>
          </>
        )}

        {/* ENCOUNTER */}
        {s.phase === 'encounter' && s.currentCreature && (
          <div className="text-center space-y-6 py-4">
            <img src="/ar-scenes/new-creature-poster.jpg" alt="New Creature" className="w-full max-w-sm mx-auto rounded-2xl border border-amber-500/20" />
            <p className="text-sm text-amber-400 animate-pulse">A creature emerges from the AR ecosystem...</p>
            <CreatureCard creature={s.currentCreature} />
            <button onClick={() => s.startBattle()} className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-400 transition-all flex items-center gap-2 mx-auto">
              <Swords size={16} /> Enter the Castle!
            </button>
          </div>
        )}

        {/* RULES */}
        {s.phase === 'rules' && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <Sparkles size={24} className="text-purple-400 mx-auto mb-2" />
              <h2 className="text-xl font-bold text-white">Battle Rules</h2>
              <p className="text-xs text-red-400 font-bold">⚠️ These rules change EVERY battle. Pay attention!</p>
            </div>
            {s.currentRules.map((rule, i) => (
              <div key={rule.id} className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4">
                <span className="text-xs font-bold text-purple-400">Rule {i + 1}</span>
                <p className="text-sm text-white font-semibold mt-1">{rule.text}</p>
              </div>
            ))}
            {s.currentCreature && <CreatureCard creature={s.currentCreature} />}
            <button onClick={() => s.startBattle()} className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all">
              Accept Rules & Enter Castle!
            </button>
          </div>
        )}

        {/* BATTLE */}
        {s.phase === 'battle' && s.currentCreature && (
          <div className="space-y-4 py-2">
            {s.currentCreature && <CreatureCard creature={s.currentCreature} />}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
              <div className="flex justify-between mb-2 text-sm"><span className="font-bold text-white">You</span><span className="text-[#6B7280]">{s.playerHp}/{s.playerMaxHp}</span></div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(s.playerHp / s.playerMaxHp) * 100}%` }} />
              </div>
            </div>
            <div className="bg-black/40 border border-white/[0.06] rounded-2xl p-3 max-h-32 overflow-y-auto space-y-1">
              {s.battleLog.map((log, i) => <p key={i} className={`text-xs ${log.startsWith('AI:') ? 'text-amber-400 italic' : log.startsWith('Victory') ? 'text-emerald-400 font-bold' : log.startsWith('Defeated') ? 'text-red-400 font-bold' : 'text-[#A0AEC0]'}`}>{log}</p>)}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => s.executeBattle('attack')} className="py-3 bg-red-500/20 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all text-center">
                <Swords size={20} className="text-red-400 mx-auto mb-1" /><p className="text-xs font-bold text-white">Attack</p>
              </button>
              <button onClick={() => s.executeBattle('freeze')} disabled={s.tokens.energy < 3} className={`py-3 rounded-xl border transition-all text-center ${s.tokens.energy >= 3 ? 'bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30' : 'opacity-50 cursor-not-allowed'}`}>
                <Snowflake size={20} className="text-blue-400 mx-auto mb-1" /><p className="text-xs font-bold text-white">Time Freeze</p><p className="text-[9px] text-blue-400">3 NRG</p>
              </button>
              <button onClick={() => s.executeBattle('item')} disabled={s.tokens.battleGear <= 0} className={`py-3 rounded-xl border transition-all text-center ${s.tokens.battleGear > 0 ? 'bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/30' : 'opacity-50 cursor-not-allowed'}`}>
                <Shield size={20} className="text-emerald-400 mx-auto mb-1" /><p className="text-xs font-bold text-white">Battle Gear</p><p className="text-[9px] text-emerald-400">+15 HP</p>
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {s.phase === 'result' && (
          <div className="text-center space-y-6 py-8">
            {s.currentCreature && s.currentCreature.hp <= 0 ? (
              <>
                <img src="/ar-scenes/certification-castle.jpg" alt="Victory" className="w-48 mx-auto rounded-2xl border border-amber-400/30" />
                <Trophy size={48} className="text-amber-400 mx-auto" />
                <h2 className="text-2xl font-bold text-amber-400">Victory!</h2>
                <p className="text-sm text-[#A0AEC0]">{s.currentCreature.frozen ? `${s.currentCreature.name} frozen in time!` : `You defeated ${s.currentCreature.name}!`}</p>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 inline-block">
                  <p className="text-lg font-bold text-emerald-400">+{Math.max(1, Math.round(s.tokens.skyIvy * 0.01))} SkyIvy</p>
                </div>
              </>
            ) : (
              <>
                <RotateCcw size={48} className="text-red-400 mx-auto" />
                <h2 className="text-2xl font-bold text-red-400">Defeated</h2>
                <p className="text-sm text-[#A0AEC0]">You retreated. HP restored.</p>
              </>
            )}
            <div className="bg-black/40 rounded-xl p-3 max-h-32 overflow-y-auto">
              {s.battleLog.map((log, i) => <p key={i} className="text-xs text-[#6B7280]">{log}</p>)}
            </div>
            <button onClick={() => s.collectReward()} className="px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all flex items-center gap-2 mx-auto">
              <ChevronRight size={16} /> Continue on the Cotton Brick Road
            </button>
          </div>
        )}

        {/* CASTLE */}
        {s.phase === 'castle' && (
          <div className="text-center space-y-6 py-4">
            <img src="/ar-scenes/mrs-cotton-academy.jpg" alt="JamZia Castle — Mrs. Cotton's Academy" className="w-full max-w-md mx-auto rounded-2xl border border-purple-500/30" />
            {!s.mrsCottonMet ? (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
                <Crown size={32} className="text-amber-400 mx-auto mb-3" />
                <p className="text-lg font-bold text-white mb-2">A Voice From Behind the Wall...</p>
                <p className="text-sm text-[#A0AEC0] italic mb-4">
                  "Welcome, brave traveler. You have survived the battles of the Castle and walked the Cotton Brick Road. I am Mrs. Cotton — the Wizard behind the wall. Your courage has brought you to my Academy."
                </p>
                <button onClick={() => s.meetMrsCotton()} className="px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-all">
                  <Sparkles size={16} className="inline mr-2" /> Meet Mrs. Cotton
                </button>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-amber-500/20 to-purple-500/20 border-2 border-amber-400 rounded-2xl p-6">
                  <img src="/ar-scenes/certification-castle.jpg" alt="Certificate" className="w-32 mx-auto rounded-xl mb-3 border border-amber-400/30" />
                  <Scroll size={24} className="text-amber-400 mx-auto mb-2" />
                  <h2 className="text-xl font-bold text-amber-400">Certificate of the War</h2>
                  <p className="text-xs text-[#A0AEC0] mt-2">Bearer completed the Castle Campaign: {s.wins} battles, {s.totalEarned} SkyIvy earned, {s.frozenCreatures.length} frozen.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => s.setPhase('listening')} className="py-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold rounded-xl hover:bg-purple-500/30 transition-all flex items-center gap-2 justify-center">
                    <Volume2 size={16} /> Enter the Listening Room
                  </button>
                  <button onClick={() => s.setPhase('dojo')} className="py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold rounded-xl hover:bg-emerald-500/30 transition-all flex items-center gap-2 justify-center">
                    <Star size={16} /> Enter the Dojo
                  </button>
                  <button onClick={() => s.setPhase('jamarc')} className="py-3 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold rounded-xl hover:bg-cyan-500/30 transition-all flex items-center gap-2 justify-center">
                    <Hexagon size={16} /> JamArc Ecosystem
                  </button>
                  <button onClick={() => s.resetGame()} className="text-xs text-[#6B7280] hover:text-white transition-all py-2">
                    <RotateCcw size={12} className="inline mr-1" /> New Campaign
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* LISTENING ROOM */}
        {s.phase === 'listening' && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <img src="/ar-scenes/ar-abc-child.jpg" alt="Listening Room" className="w-full max-w-xs mx-auto rounded-2xl border border-purple-500/20 mb-3" />
              <Volume2 size={28} className="text-purple-400 mx-auto mb-1" />
              <h2 className="text-xl font-bold text-purple-400">The Listening Room</h2>
              <p className="text-xs text-[#6B7280]">Speak freely. The walls listen. AR paintings may challenge you to DO GOOD.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'The Helper', img: '/ar-scenes/mrs-cotton-poster.jpg', desc: 'A kind soul extending their hand' },
                { name: 'The Gardener', img: '/ar-creatures/frog-sapphire.jpg', desc: 'Tending to glowing flowers' },
                { name: 'The Listener', img: '/ar-scenes/mrs-cotton-movie.jpg', desc: 'Heart open, receiving all words' },
                { name: 'The Bridge', img: '/ar-crystals/wisdom-crystal.jpg', desc: 'Connecting shores with golden light' },
              ].map((p, i) => (
                <div key={i} onClick={() => { const d = s.doGoodDeeds.find(x => !x.completed); if (d) { useBattleStore.setState({ currentDeed: d }); setDeedAnim(true); setTimeout(() => setDeedAnim(false), 3000); } }}
                  className="bg-[#0A0F1E] border border-purple-500/20 rounded-2xl p-3 text-center hover:border-purple-500/50 transition-all cursor-pointer group">
                  <img src={p.img} alt={p.name} className="w-16 h-16 mx-auto rounded-xl object-cover mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-white">{p.name}</p>
                  <p className="text-[8px] text-[#6B7280]">{p.desc}</p>
                </div>
              ))}
            </div>
            {s.currentDeed && !s.currentDeed.completed && (
              <div className={`bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/30 rounded-2xl p-5 ${deedAnim ? 'animate-pulse' : ''}`}>
                <p className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1"><Gift size={12} /> DO GOOD CHALLENGE</p>
                <p className="text-sm text-white font-semibold mb-2">{s.currentDeed.deed}</p>
                <button onClick={() => { s.completeDeed(s.currentDeed!.id); useBattleStore.setState({ currentDeed: null }); }} className="px-4 py-2 bg-emerald-500 text-black text-xs font-bold rounded-xl hover:bg-emerald-400 transition-all">
                  I Did Good! Claim {s.currentDeed.reward} SkyIvy
                </button>
              </div>
            )}
            <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
              <p className="text-xs font-bold text-[#A0AEC0] mb-2">Do Good Progress</p>
              {s.doGoodDeeds.map(d => (
                <div key={d.id} className="flex justify-between text-xs py-0.5">
                  <span className={d.completed ? 'text-emerald-400 line-through' : 'text-[#A0AEC0]'}>{d.deed}</span>
                  <span className={d.completed ? 'text-emerald-400' : 'text-[#6B7280]'}>{d.completed ? 'Done' : `+${d.reward}`}</span>
                </div>
              ))}
            </div>
            <button onClick={() => s.setPhase('castle')} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs text-[#6B7280]">Return to Castle</button>
          </div>
        )}

        {/* DOJO */}
        {s.phase === 'dojo' && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <img src="/ar-scenes/mrs-cotton-movie.jpg" alt="Dojo" className="w-32 mx-auto rounded-2xl border border-amber-500/20 mb-3" />
              <Star size={28} className="text-amber-400 mx-auto mb-1" />
              <h2 className="text-xl font-bold text-amber-400">Mrs. Cotton's Dojo</h2>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-sm font-bold text-white mb-2">🧙‍♀️ Mrs. Cotton's Wisdom</p>
              <p className="text-xs text-[#A0AEC0] italic">"True power comes from understanding — knowing when to strike, when to freeze, when to walk away. Battle with honor, and the road rises to meet you."</p>
            </div>
            {[
              { title: 'Gas Management', desc: 'When to spend, when to save', icon: Flame },
              { title: 'Energy Conservation', desc: 'Master TIME FREEZE timing', icon: Zap },
              { title: 'Battle Strategy', desc: 'Opponent patterns & rule combos', icon: Swords },
              { title: 'Token Economics', desc: 'SkyIvy flows through Castle', icon: Coins },
            ].map((l, i) => (
              <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-3 hover:border-amber-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><l.icon size={18} className="text-amber-400" /></div>
                <div><p className="text-sm font-bold text-white">{l.title}</p><p className="text-xs text-[#A0AEC0]">{l.desc}</p></div>
              </div>
            ))}
            <button onClick={() => s.setPhase('castle')} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs text-[#6B7280]">Return to Castle</button>
          </div>
        )}

        {/* JAMARC */}
        {s.phase === 'jamarc' && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <img src="/ar-crystals/jamarc-crystal.jpg" alt="JamArc" className="w-32 mx-auto rounded-2xl border border-cyan-500/30 mb-3 animate-pulse" />
              <Hexagon size={28} className="text-cyan-400 mx-auto mb-1" />
              <h2 className="text-xl font-bold text-cyan-400">JamArc Ecosystem</h2>
              <p className="text-xs text-[#6B7280]">Creature Archive & Repopulation Network</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#0A0F1E] border border-green-500/20 rounded-xl p-3 text-center">
                <Bug size={16} className="text-green-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{s.creatures.filter(c => c.type === 'bug' && !c.inStorage).length}</p>
                <p className="text-[9px] text-[#6B7280]">Bugs Active</p>
              </div>
              <div className="bg-[#0A0F1E] border border-purple-500/20 rounded-xl p-3 text-center">
                <Bug size={16} className="text-purple-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{s.creatures.filter(c => c.type === 'insect' && !c.inStorage).length}</p>
                <p className="text-[9px] text-[#6B7280]">Insects Active</p>
              </div>
              <div className="bg-[#0A0F1E] border border-amber-500/20 rounded-xl p-3 text-center">
                <Dog size={16} className="text-amber-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{s.creatures.filter(c => c.type === 'animal' && !c.inStorage).length}</p>
                <p className="text-[9px] text-[#6B7280]">Animals Active</p>
              </div>
            </div>

            {/* Daily Drop */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-4">
              <p className="text-sm font-bold text-cyan-400 mb-2">📦 Daily Drop System</p>
              <p className="text-xs text-[#A0AEC0] mb-3">3 Bugs + 3 Insects + 3 Animals arrive daily until JamArc is at capacity.</p>
              <button onClick={() => s.addDailyDrops()} className="w-full py-2 bg-cyan-500 text-black text-xs font-bold rounded-xl hover:bg-cyan-400 transition-all">
                🌅 Simulate Next Day's Drop (+9 Creatures)
              </button>
              {s.repopulationReady && (
                <button onClick={() => s.activateRepopulation()} className="w-full py-2 mt-2 bg-emerald-500 text-black text-xs font-bold rounded-xl hover:bg-emerald-400 transition-all animate-pulse">
                  🌍 ACTIVATE FULL REPOPULATION — Release All to Network
                </button>
              )}
            </div>

            {/* Creature Grid */}
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Active Ecosystem ({s.creatures.filter(c => !c.inStorage).length} creatures)</p>
            <div className="grid grid-cols-2 gap-2">
              {s.creatures.filter(c => !c.inStorage).map(c => (
                <div key={c.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3">
                  <img src={c.image} alt={c.name} className="w-full h-16 object-cover rounded-lg mb-1" />
                  <p className="text-xs font-bold text-white">{c.name}</p>
                  <div className="flex gap-1 mt-0.5">
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">{c.tier}</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">{c.type}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cold Storage */}
            {s.frozenCreatures.length > 0 && (
              <>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mt-4">❄️ Cold Storage ({s.frozenCreatures.length} frozen)</p>
                <div className="grid grid-cols-2 gap-2">
                  {s.frozenCreatures.map((c, i) => (
                    <div key={i} className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3 opacity-60">
                      <img src={c.image} alt={c.name} className="w-full h-16 object-cover rounded-lg mb-1 grayscale" />
                      <p className="text-xs font-bold text-blue-300">{c.name} (FROZEN)</p>
                      <button onClick={() => s.releaseFromStorage(c.id)} className="mt-1 text-[9px] px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all">
                        Release
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button onClick={() => s.setPhase('castle')} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs text-[#6B7280]">Return to Castle</button>
          </div>
        )}
      </main>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
