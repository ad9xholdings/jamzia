import { create } from 'zustand';

export interface ArcCreature {
  id: string;
  name: string;
  type: 'bug' | 'insect' | 'animal';
  image: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  tier: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  habitat: string;
  drops: { type: string; amount: number }[];
  dateAdded: string;
  frozen?: boolean;
  frozenUntil?: number;
  inStorage?: boolean;
}

export interface BattleRule {
  id: string;
  text: string;
  effect: 'double_damage' | 'heal_both' | 'speed_swap' | 'no_items' | 'treasury_bonus' | 'freeze_chance' | 'token_drain' | 'elemental_surge';
}

export interface PlayerTokens {
  gas: number;
  energy: number;
  battleGear: number;
  aircraft: number;
  landCraft: number;
  weapons: number;
  skyIvy: number;
}

export interface DoGoodDeed {
  id: string;
  deed: string;
  reward: number;
  completed: boolean;
}

export type GamePhase = 'road' | 'encounter' | 'battle' | 'rules' | 'result' | 'castle' | 'listening' | 'dojo' | 'jamarc';

// ─── INITIAL CREATURE SEED (from uploaded AR images) ───
export const ARC_CREATURES: ArcCreature[] = [
  // ── ANIMALS ──
  { id: 'a1', name: 'Sapphire Dart Frog', type: 'animal', image: '/ar-creatures/frog-sapphire.jpg', hp: 45, maxHp: 45, attack: 8, defense: 4, speed: 14, tier: 'rare', description: 'A brilliant blue-and-yellow amphibian that secretes wisdom toxins. Its leap can clear the entire Cotton Brick Road in a single bound.', habitat: 'Castle wetlands', drops: [{ type: 'skyIvy', amount: 5 }, { type: 'gas', amount: 2 }], dateAdded: '2026-04-23' },
  { id: 'a2', name: 'Leo the Lion', type: 'animal', image: '/ar-creatures/lion-leo.jpg', hp: 100, maxHp: 100, attack: 22, defense: 14, speed: 11, tier: 'legendary', description: 'The Cotton King himself. Roams the golden road at sunset. His mane glows with the wisdom of a thousand victories.', habitat: 'Cotton Brick Road', drops: [{ type: 'skyIvy', amount: 20 }, { type: 'energy', amount: 5 }], dateAdded: '2026-04-23' },
  { id: 'a3', name: 'Road Wanderer Lion', type: 'animal', image: '/ar-creatures/lion-road.jpg', hp: 75, maxHp: 75, attack: 16, defense: 10, speed: 13, tier: 'epic', description: 'A younger lion that walks the road during daylight, searching for challengers. Its eyes hold the patience of ages.', habitat: 'Cotton Brick Road (Day)', drops: [{ type: 'skyIvy', amount: 12 }, { type: 'weapons', amount: 1 }], dateAdded: '2026-04-23' },
  // ── INSECTS ──
  { id: 'i1', name: 'Monarch Guardian', type: 'insect', image: '/ar-creatures/monarch-butterfly.jpg', hp: 35, maxHp: 35, attack: 6, defense: 3, speed: 16, tier: 'epic', description: 'A massive monarch butterfly that guards the Cotton King. Its wings shimmer with AR energy and create illusions on the wind.', habitat: 'Castle approach', drops: [{ type: 'skyIvy', amount: 10 }, { type: 'battleGear', amount: 2 }], dateAdded: '2026-04-23' },
  { id: 'i2', name: 'Cotton Moth', type: 'insect', image: '/ar-creatures/monarch-butterfly.jpg', hp: 25, maxHp: 25, attack: 4, defense: 2, speed: 12, tier: 'common', description: 'Flutters around the cotton fields near the road. Harmless alone, but they swarm in the dozens at dusk.', habitat: 'Cotton fields', drops: [{ type: 'skyIvy', amount: 2 }, { type: 'gas', amount: 1 }], dateAdded: '2026-04-23' },
  { id: 'i3', name: 'River Dragonfly', type: 'insect', image: '/ar-creatures/monarch-butterfly.jpg', hp: 40, maxHp: 40, attack: 9, defense: 5, speed: 18, tier: 'rare', description: 'Darts above the Castle surface. So fast it leaves afterimages that confuse attackers.', habitat: 'Castle surface', drops: [{ type: 'skyIvy', amount: 6 }, { type: 'energy', amount: 2 }], dateAdded: '2026-04-23' },
  // ── BUGS ──
  { id: 'b1', name: 'Spark Beetle', type: 'bug', image: '/ar-creatures/new-creature-poster.jpg', hp: 20, maxHp: 20, attack: 5, defense: 2, speed: 8, tier: 'common', description: 'Emits bioluminescent sparks when threatened. The first creature most travelers encounter on the road.', habitat: 'Road edges', drops: [{ type: 'skyIvy', amount: 1 }, { type: 'gas', amount: 1 }], dateAdded: '2026-04-23' },
  { id: 'b2', name: 'Dart Frog', type: 'animal', image: '/ar-creatures/new-creature-poster.jpg', hp: 28, maxHp: 28, attack: 8, defense: 4, speed: 14, tier: 'common', description: 'Real Poison Dart Frogs live in Central and South American rainforests. Their bright colors — blue, yellow, red, green — are a warning: "I am toxic!" The Golden Poison Dart Frog has enough toxin to make 20,000 mice sick. Indigenous people used the poison on blowgun darts for hunting. In nature, they eat ants and mites that help make their skin poison. They are small enough to fit on a fingernail but are one of the most toxic animals on Earth.', habitat: 'Rainforest puddles', drops: [{ type: 'skyIvy', amount: 3 }, { type: 'energy', amount: 2 }], dateAdded: '2026-04-23' },
  { id: 'b3', name: 'Crystal Scarab', type: 'bug', image: '/ar-creatures/new-creature-poster.jpg', hp: 60, maxHp: 60, attack: 14, defense: 8, speed: 10, tier: 'epic', description: 'An ancient beetle encased in living crystal. Said to have walked the Cotton Brick Road since before Mrs. Cotton built her castle.', habitat: 'Castle foundations', drops: [{ type: 'skyIvy', amount: 15 }, { type: 'weapons', amount: 2 }], dateAdded: '2026-04-23' },
];

// ─── DAILY DROP QUEUE (3 bugs + 3 insects + 3 animals) ───
export const DAILY_DROP_QUEUE: { type: 'bug' | 'insect' | 'animal'; name: string; image: string }[] = [
  // Day 2 drops
  { type: 'bug', name: 'Volt Ant', image: '/ar-creatures/new-creature-poster.jpg' },
  { type: 'bug', name: 'Shadow Roach', image: '/ar-creatures/new-creature-poster.jpg' },
  { type: 'bug', name: 'Moss Mite', image: '/ar-creatures/new-creature-poster.jpg' },
  { type: 'insect', name: 'Phantom Wasp', image: '/ar-creatures/monarch-butterfly.jpg' },
  { type: 'insect', name: 'Silk Weaver', image: '/ar-creatures/monarch-butterfly.jpg' },
  { type: 'insect', name: 'Ember Moth', image: '/ar-creatures/monarch-butterfly.jpg' },
  { type: 'animal', name: 'Fox Spirit', image: '/ar-creatures/frog-sapphire.jpg' },
  { type: 'animal', name: 'River Otter', image: '/ar-creatures/lion-leo.jpg' },
  { type: 'animal', name: 'Night Owl', image: '/ar-creatures/lion-road.jpg' },
  // Day 3 drops
  { type: 'bug', name: 'Toxic Grub', image: '/ar-creatures/new-creature-poster.jpg' },
  { type: 'bug', name: 'Dune Beetle', image: '/ar-creatures/new-creature-poster.jpg' },
  { type: 'bug', name: 'Cave Cricket', image: '/ar-creatures/new-creature-poster.jpg' },
  { type: 'insect', name: 'Luna Beetle', image: '/ar-creatures/monarch-butterfly.jpg' },
  { type: 'insect', name: 'Frost Fly', image: '/ar-creatures/monarch-butterfly.jpg' },
  { type: 'insect', name: 'Storm Locust', image: '/ar-creatures/monarch-butterfly.jpg' },
  { type: 'animal', name: 'Storm Hawk', image: '/ar-creatures/frog-sapphire.jpg' },
  { type: 'animal', name: 'Mud Tortoise', image: '/ar-creatures/lion-leo.jpg' },
  { type: 'animal', name: 'Ghost Deer', image: '/ar-creatures/lion-road.jpg' },
];

const RULE_POOL: BattleRule[] = [
  { id: 'r1', text: 'TEMPEST: Wind doubles all damage this round', effect: 'double_damage' },
  { id: 'r2', text: 'RIVER BLESSING: Both fighters recover 10 HP', effect: 'heal_both' },
  { id: 'r3', text: 'MIRROR MIST: Attack and Defense stats are swapped', effect: 'speed_swap' },
  { id: 'r4', text: 'IRON GROUND: No items or craft may be used', effect: 'no_items' },
  { id: 'r5', text: 'TREASURY BOUNTY: Winner earns 2x SkyIvy from the Treasury', effect: 'treasury_bonus' },
  { id: 'r6', text: 'FROST DAWN: 30% chance to TIME FREEZE opponent', effect: 'freeze_chance' },
  { id: 'r7', text: 'TOKEN DRAIN: Loser sacrifices 1 Gas + 1 Energy to the Road', effect: 'token_drain' },
  { id: 'r8', text: 'ELEMENTAL SURGE: Random element boosts your highest stat by 50%', effect: 'elemental_surge' },
];

const DEEDS: DoGoodDeed[] = [
  { id: 'd1', deed: 'Compliment a stranger today', reward: 5, completed: false },
  { id: 'd2', deed: 'Plant a seed or water a plant', reward: 5, completed: false },
  { id: 'd3', deed: 'Pick up litter in your neighborhood', reward: 10, completed: false },
  { id: 'd4', deed: 'Call someone you have not spoken to in a while', reward: 5, completed: false },
  { id: 'd5', deed: 'Leave a positive review for a local business', reward: 5, completed: false },
  { id: 'd6', deed: 'Donate any amount to a cause you care about', reward: 10, completed: false },
  { id: 'd7', deed: 'Help someone cross the street or carry something', reward: 5, completed: false },
  { id: 'd8', deed: 'Write a thank-you note to someone who helped you', reward: 5, completed: false },
];

function randomCreature(pool: ArcCreature[], position: number): ArcCreature {
  const tierRoll = Math.random();
  let filtered = pool.filter(c => c.tier === 'common');
  if (position > 3 && tierRoll > 0.6) filtered = pool.filter(c => c.tier === 'rare');
  if (position > 6 && tierRoll > 0.75) filtered = pool.filter(c => c.tier === 'epic');
  if (position > 9 && tierRoll > 0.9) filtered = pool.filter(c => c.tier === 'legendary');
  if (filtered.length === 0) filtered = pool;
  const base = filtered[Math.floor(Math.random() * filtered.length)];
  const scale = 1 + (position * 0.08);
  return {
    ...base,
    id: `${base.id}-${Date.now()}`,
    hp: Math.round(base.hp * scale),
    maxHp: Math.round(base.maxHp * scale),
    attack: Math.round(base.attack * scale),
    defense: Math.round(base.defense * scale),
    speed: Math.round(base.speed * scale),
  };
}

function randomRules(): BattleRule[] {
  const shuffled = [...RULE_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

interface BattleState {
  phase: GamePhase;
  position: number;
  maxPosition: number;
  tokens: PlayerTokens;
  treasuryPaid: number;
  currentCreature: ArcCreature | null;
  currentRules: BattleRule[];
  battleLog: string[];
  isBattling: boolean;
  playerHp: number;
  playerMaxHp: number;
  wins: number;
  losses: number;
  totalEarned: number;
  frozenCreatures: ArcCreature[];
  listeningRoomUnlocked: boolean;
  certificateEarned: boolean;
  doGoodDeeds: DoGoodDeed[];
  currentDeed: DoGoodDeed | null;
  mrsCottonMet: boolean;
  showBattlePanel: boolean;
  // JamArc
  creatures: ArcCreature[];
  dailyDropIndex: number;
  repopulationReady: boolean;

  setPhase: (p: GamePhase) => void;
  advancePosition: () => void;
  payTreasury: (amount: number) => boolean;
  startEncounter: () => void;
  generateRules: () => void;
  startBattle: () => void;
  executeBattle: (action: 'attack' | 'freeze' | 'item') => void;
  collectReward: () => void;
  openBattlePanel: () => void;
  closeBattlePanel: () => void;
  resetGame: () => void;
  completeDeed: (deedId: string) => void;
  meetMrsCotton: () => void;
  // JamArc actions
  addDailyDrops: () => void;
  releaseFromStorage: (creatureId: string) => void;
  activateRepopulation: () => void;
}

export const useBattleStore = create<BattleState>()((set, get) => ({
  phase: 'road',
  position: 0,
  maxPosition: 12,
  tokens: { gas: 20, energy: 20, battleGear: 5, aircraft: 1, landCraft: 2, weapons: 3, skyIvy: 100 },
  treasuryPaid: 0,
  currentCreature: null,
  currentRules: [],
  battleLog: [],
  isBattling: false,
  playerHp: 100,
  playerMaxHp: 100,
  wins: 0,
  losses: 0,
  totalEarned: 0,
  frozenCreatures: [],
  listeningRoomUnlocked: false,
  certificateEarned: false,
  doGoodDeeds: [...DEEDS],
  currentDeed: null,
  mrsCottonMet: false,
  showBattlePanel: false,
  creatures: [...ARC_CREATURES],
  dailyDropIndex: 0,
  repopulationReady: false,

  setPhase: (p) => set({ phase: p }),
  openBattlePanel: () => set({ showBattlePanel: true, phase: 'road' }),
  closeBattlePanel: () => set({ showBattlePanel: false }),

  advancePosition: () => {
    const s = get();
    if (s.position >= s.maxPosition) {
      set({ phase: 'castle', listeningRoomUnlocked: true });
      return;
    }
    const newPos = s.position + 1;
    set({ position: newPos, phase: 'encounter' });
  },

  payTreasury: (amount) => {
    const s = get();
    if (s.tokens.skyIvy < amount) return false;
    set({ tokens: { ...s.tokens, skyIvy: s.tokens.skyIvy - amount }, treasuryPaid: s.treasuryPaid + amount });
    return true;
  },

  startEncounter: () => {
    const s = get();
    const activeCreatures = s.creatures.filter(c => !c.inStorage);
    if (activeCreatures.length === 0) {
      set({ battleLog: ['No creatures remain on the road! Visit JamArc to repopulate.'] });
      return;
    }
    const creature = randomCreature(activeCreatures, s.position);
    set({ currentCreature: creature, phase: 'rules' });
    get().generateRules();
  },

  generateRules: () => set({ currentRules: randomRules(), battleLog: ['Battle rules revealed... Pay attention!'] }),

  startBattle: () => set({ phase: 'battle', isBattling: true, battleLog: ['Battle begins on Cotton Brick Road!'] }),

  executeBattle: (action) => {
    const s = get();
    if (!s.currentCreature || s.currentCreature.hp <= 0) return;
    const log: string[] = [];
    let creatureHp = s.currentCreature.hp;
    let playerHp = s.playerHp;
    let tokens = { ...s.tokens };
    let frozen = [...s.frozenCreatures];

    if (action === 'attack') {
      let dmg = Math.max(1, 10 + (tokens.weapons * 3) - s.currentCreature.defense);
      s.currentRules.forEach(r => { if (r.effect === 'double_damage') dmg *= 2; if (r.effect === 'elemental_surge') dmg = Math.round(dmg * 1.5); });
      creatureHp = Math.max(0, creatureHp - dmg);
      log.push(`You dealt ${dmg} damage to ${s.currentCreature.name}!`);
    } else if (action === 'freeze') {
      if (tokens.energy >= 3) {
        tokens.energy -= 3;
        if (Math.random() > 0.3) {
          frozen.push(s.currentCreature);
          log.push(`TIME FREEZE! ${s.currentCreature.name} is locked in temporal stasis!`);
          const earned = Math.max(1, Math.round(tokens.skyIvy * 0.01));
          s.currentRules.forEach(r => { if (r.effect === 'treasury_bonus') { tokens.skyIvy += earned; log.push('TREASURY BOUNTY!'); } });
          tokens.skyIvy += earned;
          log.push(`Victory! +${earned} SkyIvy tokens`);
          set({
            currentCreature: { ...s.currentCreature, hp: 0, frozen: true },
            battleLog: [...s.battleLog, ...log], frozenCreatures: frozen, tokens,
            totalEarned: s.totalEarned + earned, wins: s.wins + 1,
            isBattling: false, phase: 'result',
          });
          return;
        } else log.push(`TIME FREEZE failed! ${s.currentCreature.name} resisted!`);
      } else log.push('Not enough Energy! (need 3)');
    } else if (action === 'item') {
      if (s.currentRules.some(r => r.effect === 'no_items')) { log.push('IRON GROUND: Items blocked!'); }
      else if (tokens.battleGear > 0) {
        tokens.battleGear -= 1;
        playerHp = Math.min(s.playerMaxHp, playerHp + 15);
        log.push('Used Battle Gear! Recovered 15 HP');
      } else log.push('No Battle Gear remaining!');
    }

    if (creatureHp <= 0) {
      const earned = Math.max(1, Math.round(tokens.skyIvy * 0.01));
      let bonus = 0;
      s.currentRules.forEach(r => { if (r.effect === 'treasury_bonus') bonus = earned; });
      tokens.skyIvy += earned + bonus;
      log.push(`Victory! +${earned + bonus} SkyIvy tokens`);
      set({
        currentCreature: { ...s.currentCreature, hp: 0 }, tokens,
        totalEarned: s.totalEarned + earned + bonus, wins: s.wins + 1,
        playerHp, isBattling: false, phase: 'result', battleLog: [...s.battleLog, ...log],
      });
      return;
    }

    const cDmg = Math.max(1, s.currentCreature.attack - (tokens.landCraft * 2));
    playerHp = Math.max(0, playerHp - cDmg);
    log.push(`${s.currentCreature.name} dealt ${cDmg} damage to you!`);

    s.currentRules.forEach(r => {
      if (r.effect === 'heal_both') { playerHp = Math.min(s.playerMaxHp, playerHp + 10); creatureHp = Math.min(s.currentCreature!.maxHp, creatureHp + 10); log.push('RIVER BLESSING: Both recover 10 HP'); }
      if (r.effect === 'token_drain') { tokens.gas = Math.max(0, tokens.gas - 1); tokens.energy = Math.max(0, tokens.energy - 1); log.push('TOKEN DRAIN: Lost 1 Gas + 1 Energy'); }
    });

    if (playerHp <= 0) {
      log.push('Defeated... You retreat to regroup.');
      const lost = Math.max(1, Math.round(tokens.skyIvy * 0.01));
      tokens.skyIvy = Math.max(0, tokens.skyIvy - lost);
      log.push(`Lost ${lost} SkyIvy tokens`);
      set({ tokens, playerHp: s.playerMaxHp, losses: s.losses + 1, isBattling: false, phase: 'result',
        currentCreature: { ...s.currentCreature, hp: creatureHp }, totalEarned: Math.max(0, s.totalEarned - lost),
        battleLog: [...s.battleLog, ...log],
      });
      return;
    }

    if (tokens.gas < 5) log.push('AI: Gas low. Rest at next shelter.');
    if (tokens.energy < 3) log.push('AI: Energy critical. TIME FREEZE unavailable.');
    if (playerHp < 30) log.push('AI: HP low! Use Battle Gear or retreat!');

    set({ currentCreature: { ...s.currentCreature, hp: creatureHp }, playerHp, tokens, battleLog: [...s.battleLog, ...log] });
  },

  collectReward: () => {
    const s = get();
    set({ phase: s.position >= s.maxPosition ? 'castle' : 'road' });
  },

  completeDeed: (deedId) => {
    const s = get();
    const deed = s.doGoodDeeds.find(d => d.id === deedId);
    if (deed && !deed.completed) {
      set({
        doGoodDeeds: s.doGoodDeeds.map(d => d.id === deedId ? { ...d, completed: true } : d),
        tokens: { ...s.tokens, skyIvy: s.tokens.skyIvy + deed.reward },
        totalEarned: s.totalEarned + deed.reward,
      });
    }
  },

  meetMrsCotton: () => set({ mrsCottonMet: true, certificateEarned: true }),

  // ─── JamArc Actions ───
  addDailyDrops: () => {
    const s = get();
    const idx = s.dailyDropIndex;
    const batch = DAILY_DROP_QUEUE.slice(idx, idx + 9);
    if (batch.length === 0) {
      set({ repopulationReady: true });
      return;
    }
    const newCreatures: ArcCreature[] = batch.map((drop, i) => ({
      id: `${drop.type[0]}${idx + i + 4}-${Date.now()}-${i}`,
      name: drop.name,
      type: drop.type,
      image: drop.image,
      hp: drop.type === 'bug' ? 20 + Math.random() * 30 : drop.type === 'insect' ? 25 + Math.random() * 35 : 40 + Math.random() * 50,
      maxHp: 0, attack: 0, defense: 0, speed: 0, tier: 'common',
      description: `A newly arrived ${drop.type} on Cotton Brick Road.`,
      habitat: 'Castle', drops: [{ type: 'skyIvy', amount: 3 }], dateAdded: new Date().toISOString().slice(0, 10),
    }));
    // Set computed stats
    newCreatures.forEach(c => {
      c.maxHp = Math.round(c.hp);
      c.attack = Math.round(3 + Math.random() * 15);
      c.defense = Math.round(2 + Math.random() * 10);
      c.speed = Math.round(5 + Math.random() * 15);
      c.tier = c.attack > 14 ? 'epic' : c.attack > 9 ? 'rare' : 'common';
    });
    set({ creatures: [...s.creatures, ...newCreatures], dailyDropIndex: idx + 9 });
    if (s.dailyDropIndex + 9 >= DAILY_DROP_QUEUE.length) set({ repopulationReady: true });
  },

  releaseFromStorage: (creatureId) => {
    set({ creatures: get().creatures.map(c => c.id === creatureId ? { ...c, inStorage: false, frozen: false } : c) });
  },

  activateRepopulation: () => set({ creatures: get().creatures.map(c => ({ ...c, inStorage: false })), repopulationReady: true }),

  resetGame: () => set({
    phase: 'road', position: 0,
    tokens: { gas: 20, energy: 20, battleGear: 5, aircraft: 1, landCraft: 2, weapons: 3, skyIvy: 100 },
    treasuryPaid: 0, currentCreature: null, currentRules: [], battleLog: [],
    isBattling: false, playerHp: 100, playerMaxHp: 100, wins: 0, losses: 0,
    totalEarned: 0, frozenCreatures: [], certificateEarned: false,
    doGoodDeeds: [...DEEDS], currentDeed: null, mrsCottonMet: false,
  }),
}));
