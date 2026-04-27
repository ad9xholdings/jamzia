/* ═══════════════════════════════════════════════════════════
   JamDAVE™ — Digital Audio/Video Engine
   Create · Edit · Mix · Master · Playlist · Store · Monetize · Distribute
   Anyone can upload direct from their DAW into JamDAVE™
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  Music, Scissors, Sliders, Volume2, ListMusic, ShoppingBag, DollarSign, Share2,
  Wallet, Zap, Bitcoin, Radio, HardDrive, Image, Play, Pause, SkipForward, SkipBack,
  Mic, Headphones, Disc, Gem, Globe, Crown, TrendingUp, Users, Star, ChevronRight,
  Layers, Cpu, ArrowRight, Check, Lock, ExternalLink, RefreshCw
} from 'lucide-react';

/* ── 8 Creator Engine Capabilities ── */
const ENGINE_CAPS = [
  {
    id: 'create',
    label: 'Create',
    icon: Music,
    color: '#C9A03F',
    desc: 'Record, compose, and produce. Multi-track recording with real-time effects.',
    daw: 'Anyone can upload direct from their DAW into JamDAVE™. Full session import and timeline sync.',
    features: ['Multi-track recording', 'MIDI sequencing', 'Loop library', 'Virtual instruments', 'DAW project import'],
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: Scissors,
    color: '#ef4444',
    desc: 'Precision timeline editing for audio and video. Cuts, transitions, effects.',
    daw: 'Session files from your DAW open directly in JamDAVE™. Non-destructive workflow.',
    features: ['Non-destructive editing', 'Video sync timeline', 'Transition library', 'Color grading', 'Keyframe animation'],
  },
  {
    id: 'mix',
    label: 'Mix',
    icon: Sliders,
    color: '#22c55e',
    desc: 'Professional multi-track mixing. EQ, compression, reverb, spatial audio.',
    daw: 'Full plugin chain support. Your DAW plugins carry over into the JamDAVE™ mixer.',
    features: ['32-track mixer', 'EQ per channel', 'Compression & limiting', 'Spatial audio', 'Automation lanes'],
  },
  {
    id: 'master',
    label: 'Master',
    icon: Volume2,
    color: '#a855f7',
    desc: 'Final mastering suite. Loudness normalization, limiting, dithering.',
    daw: 'Mastering chain exports back to your DAW for final delivery.',
    features: ['LUFS metering', 'Multi-band compression', 'Stereo widening', 'Dithering', 'Format export'],
  },
  {
    id: 'playlist',
    label: 'Playlist',
    icon: ListMusic,
    color: '#7096D1',
    desc: 'Curate, organize, and sequence your content into playlists and albums.',
    daw: 'Build playlists from any DAW project. Crossfade and sequence across sessions.',
    features: ['Smart playlists', 'Crossfading', 'Album sequencing', 'Collaborative lists', 'Embed anywhere'],
  },
  {
    id: 'store',
    label: 'Store',
    icon: ShoppingBag,
    color: '#ec4899',
    desc: 'Sell beats, stems, presets, session files, and finished productions.',
    daw: 'Sell DAW sessions, project templates, and production assets directly.',
    features: ['Beat marketplace', 'Stem packs', 'Preset shop', 'Session templates', 'Instant delivery'],
  },
  {
    id: 'monetize',
    label: 'Monetize',
    icon: DollarSign,
    color: '#f59e0b',
    desc: 'Native payments, digital asset support, and subscription tiers.',
    daw: 'Monetize every DAW project. Subscription tiers for exclusive stems and sessions.',
    features: ['Native checkout', 'Micropayments', 'Instant tips', 'Subscriptions', 'Revenue splits'],
  },
  {
    id: 'distribute',
    label: 'Distribute',
    icon: Share2,
    color: '#06b6d4',
    desc: 'Release everywhere. White-label ready. Full ecosystem distribution.',
    daw: 'Distribute DAW masters to all platforms from one hub.',
    features: ['One-click release', 'White-label ready', 'Schedule drops', 'Analytics dashboard', 'Global edge network'],
  },
];

/* ── Infrastructure Stack ── */
const STACK = [
  { name: 'Payments', icon: Wallet, color: '#C9A03F', desc: 'Native payment rail for the ecosystem' },
  { name: 'Ledger', icon: Zap, color: '#22c55e', desc: 'Micropayments and tokenization' },
  { name: 'Instant Pay', icon: Bitcoin, color: '#f59e0b', desc: 'Instant digital payments for tips and purchases' },
  { name: 'Storage', icon: HardDrive, color: '#a855f7', desc: 'Decentralized storage for all media assets' },
  { name: 'Streaming', icon: Radio, color: '#ef4444', desc: 'Decentralized live streaming infrastructure' },
  { name: 'Digital Collectibles', icon: Gem, color: '#ec4899', desc: 'Mint collectibles directly from production' },
];

/* ── Collectible Templates ── */
const COLLECTIBLE_TEMPLATES = [
  { name: 'Beat Pack', type: 'Audio', supply: '100 editions', price: '50 tokens' },
  { name: 'Session Stems', type: 'Project', supply: '25 editions', price: '200 tokens' },
  { name: 'Master Recording', type: 'Video', supply: '1 of 1', price: '1000 tokens' },
  { name: 'Production Credit', type: 'Rights', supply: 'Unlimited', price: '10 tokens' },
];

export default function JamDAVE() {
  const [activeCap, setActiveCap] = useState('create');
  const [isPlaying, setIsPlaying] = useState(false);
  const [mintingOpen, setMintingOpen] = useState(false);
  const cap = ENGINE_CAPS.find(c => c.id === activeCap) || ENGINE_CAPS[0];
  const CapIcon = cap.icon;

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* ═══════ HERO ═══════ */}
      <div className="relative overflow-hidden border-b border-[#1F1F1F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#C9A03F15_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 py-10 relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#C9A03F]/10 border border-[#C9A03F]/20 rounded-full text-[10px] font-bold text-[#C9A03F] tracking-wider">JAMZIA NETWORKS™</span>
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400 tracking-wider">WHITE LABEL READY</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight">
            JamDAVE™ <span className="text-[#C9A03F]">Engine</span>
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mb-4">
            Digital Audio/Video Engine — Create, Edit, Mix, Master, Playlist, Store, Monetize, Distribute.
            Anyone can upload direct from their DAW into JamDAVE™.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Cpu size={16} className="text-[#C9A03F]" /><span>8 Engine Capabilities</span></div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><HardDrive size={16} className="text-[#a855f7]" /><span>Decentralized Storage</span></div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Wallet size={16} className="text-[#22c55e]" /><span>Native Payments</span></div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Gem size={16} className="text-[#ec4899]" /><span>Collectible Minting</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* ═══════ 8 CAPABILITY TABS ═══════ */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {ENGINE_CAPS.map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCap(c.id)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all ${
                  activeCap === c.id ? 'bg-[#C9A03F]/10 border-2 border-[#C9A03F]/40' : 'bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#2A2A2A]'
                }`}
              >
                <Icon size={20} style={{ color: activeCap === c.id ? c.color : '#6B7280' }} />
                <span className="text-[10px] font-medium" style={{ color: activeCap === c.id ? c.color : '#6B7280' }}>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* ═══════ ACTIVE CAPABILITY ═══════ */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${cap.color}15` }}>
              <CapIcon size={24} style={{ color: cap.color }} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">{cap.label}</h2>
              <p className="text-sm text-[#6B7280]">{cap.desc}</p>
            </div>
          </div>

          {/* DAW Banner */}
          <div className="bg-black border border-[#1F1F1F] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers size={14} className="text-[#C9A03F]" />
              <span className="text-xs font-bold text-[#C9A03F]">DAW INTEGRATION</span>
            </div>
            <p className="text-xs text-[#6B7280]">{cap.daw}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="px-2.5 py-1 bg-[#1F1F1F] rounded-lg text-[10px] font-medium text-[#6B7280]">Your DAW</span>
              <ArrowRight size={12} className="text-[#C9A03F]" />
              <span className="px-2.5 py-1 bg-[#C9A03F]/10 border border-[#C9A03F]/20 rounded-lg text-[10px] font-medium text-[#C9A03F]">JamDAVE™</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {cap.features.map(f => (
              <div key={f} className="flex items-center gap-2 text-xs">
                <Check size={12} style={{ color: cap.color }} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ SIMULATED WORKSPACE ═══════ */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold flex items-center gap-2"><Mic size={16} /> JamDAVE™ Studio Workspace</h2>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded-lg flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> DAW Connected
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-black border border-[#1F1F1F] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-lg bg-[#C9A03F] flex items-center justify-center">
                {isPlaying ? <Pause size={14} className="text-black" /> : <Play size={14} className="text-black ml-0.5" />}
              </button>
              <SkipBack size={14} className="text-[#6B7280]" />
              <SkipForward size={14} className="text-[#6B7280]" />
              <div className="flex-1 h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                <div className="h-full bg-[#C9A03F] rounded-full" style={{ width: '35%' }} />
              </div>
              <span className="text-[10px] text-[#6B7280] font-mono">01:24 / 03:56</span>
            </div>

            {[
              { name: 'Vocals Main', color: '#C9A03F', level: 75 },
              { name: 'Beat Drums', color: '#ef4444', level: 60 },
              { name: 'Bass Line', color: '#22c55e', level: 45 },
              { name: 'Synth Pad', color: '#a855f7', level: 30 },
              { name: 'FX Send', color: '#7096D1', level: 20 },
            ].map((track, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 border-b border-[#1F1F1F]/50 last:border-0">
                <span className="w-24 text-[10px] text-[#6B7280] truncate">{track.name}</span>
                <div className="w-16 h-4 bg-[#1F1F1F] rounded overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${track.level}%`, backgroundColor: track.color, opacity: 0.6 }} />
                </div>
                <div className="flex-1 h-6 bg-[#111] rounded flex items-end gap-px px-1 pb-1">
                  {Array.from({ length: 40 }, (_, j) => (
                    <div key={j} className="flex-1 rounded-sm" style={{ height: `${Math.random() * 100}%`, backgroundColor: track.color, opacity: 0.3 + Math.random() * 0.5 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-[#6B7280]">Project: <span className="text-white">Summer_Hit_2026.daw</span></span>
            <span className="text-[#1F1F1F]">|</span>
            <span className="text-[10px] text-[#6B7280]">Sample Rate: <span className="text-white">96kHz/24bit</span></span>
            <span className="text-[#1F1F1F]">|</span>
            <span className="text-[10px] text-[#6B7280]">Tracks: <span className="text-white">32/128</span></span>
            <span className="text-[#1F1F1F]">|</span>
            <span className="text-[10px] text-[#6B7280]">Plugins: <span className="text-white">Native + VST + AU + AAX</span></span>
          </div>
        </div>

        {/* ═══════ INTEGRATED INFRASTRUCTURE ═══════ */}
        <div>
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2"><Layers size={16} /> Integrated Infrastructure</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {STACK.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.name} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 text-center hover:border-[#C9A03F]/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${s.color}15` }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <p className="text-xs font-bold mb-1">{s.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════ COLLECTIBLE MINTING ═══════ */}
        <div className="bg-[#0A0A0A] border border-[#ec4899]/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold flex items-center gap-2"><Gem size={16} className="text-[#ec4899]" /> Collectible Minting — Straight From Production</h2>
            <button
              onClick={() => setMintingOpen(!mintingOpen)}
              className="px-4 py-2 bg-[#ec4899] hover:bg-[#f062b7] text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Image size={14} /> {mintingOpen ? 'Close Minter' : 'Mint from Project'}
            </button>
          </div>

          <p className="text-xs text-[#6B7280] mb-4">
            Mint collectibles directly from your DAW sessions. Beat packs, stem collections, master recordings, and production credits — all tokenized with native payment support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {COLLECTIBLE_TEMPLATES.map(nft => (
              <div key={nft.name} className="bg-black border border-[#1F1F1F] rounded-xl p-4">
                <div className="aspect-square bg-[#111] rounded-lg flex items-center justify-center mb-3">
                  <Disc size={32} className="text-[#ec4899]/30" />
                </div>
                <p className="text-xs font-bold mb-1">{nft.name}</p>
                <div className="flex items-center justify-between text-[10px] text-[#6B7280]">
                  <span>{nft.type}</span>
                  <span>{nft.supply}</span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1F1F1F]">
                  <span className="text-xs font-bold text-[#C9A03F]">{nft.price}</span>
                  <span className="text-[10px] text-emerald-400">Mint Ready</span>
                </div>
              </div>
            ))}
          </div>

          {mintingOpen && (
            <div className="mt-4 bg-black border border-[#1F1F1F] rounded-xl p-4">
              <h3 className="text-xs font-bold mb-3">Mint Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Asset Source</label>
                  <select className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ec4899]">
                    <option>Current DAW Session — Master</option>
                    <option>Current Session — Stems Pack</option>
                    <option>Current Session — Beat Pack</option>
                    <option>DAW Session — Full Project</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Network</label>
                  <select className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#22c55e]">
                    <option>Native Ledger — Digital Collectible</option>
                    <option>Instant Pay — Lightning Collectible</option>
                    <option>Native Wrap — Tokenized Asset</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Price</label>
                  <div className="flex gap-2">
                    <input type="text" defaultValue="1000" className="flex-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F]" />
                    <select className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-2 py-2 text-sm outline-none">
                      <option>Native</option><option>Instant</option><option>Wrapped</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full py-3 bg-[#ec4899] hover:bg-[#f062b7] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <Gem size={16} /> Confirm Mint from Active Project
              </button>
            </div>
          )}
        </div>

        {/* ═══════ MONETIZATION FLOW ═══════ */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-[#22c55e]" /> Monetization Flow</h2>
          <div className="flex items-center gap-2 text-xs overflow-x-auto pb-2">
            {[
              { label: 'Create in DAW', icon: Music, color: '#C9A03F' },
              { label: 'Import to JamDAVE', icon: ArrowRight, color: '#6B7280' },
              { label: 'Mix & Master', icon: Sliders, color: '#22c55e' },
              { label: 'Mint Collectible', icon: Gem, color: '#ec4899' },
              { label: 'List on Store', icon: ShoppingBag, color: '#a855f7' },
              { label: 'Get Paid', icon: Wallet, color: '#22c55e' },
              { label: 'Distribute', icon: Globe, color: '#06b6d4' },
              { label: 'Earn', icon: DollarSign, color: '#C9A03F' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <div className="flex flex-col items-center gap-1 px-3 py-2 bg-black border border-[#1F1F1F] rounded-lg min-w-[80px]">
                    <Icon size={14} style={{ color: step.color }} />
                    <span className="text-[10px] font-medium text-center">{step.label}</span>
                  </div>
                  {i < 7 && <ChevronRight size={12} className="text-[#6B7280] shrink-0" />}
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-3">
            Create in your DAW → Import to JamDAVE™ → Mix & Master → Mint as Collectible → List in Store → Collect via native payments → Distribute everywhere → Earn. Ad9x takes 20% of gross. JamZia keeps the margin spread. Let this big dog eat too.
          </p>
        </div>

        {/* ═══════ WHITE LABEL ═══════ */}
        <div className="bg-[#0A0A0A] border border-[#C9A03F]/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#C9A03F]/10 flex items-center justify-center shrink-0">
              <Crown size={20} className="text-[#C9A03F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold mb-1">White Label Replication</h2>
              <p className="text-xs text-[#6B7280] mb-3">
                JamDAVE™ Engine is fully white-label ready. Every brand in the JamZia ecosystem gets their own branded audio/video production suite. Your brand, your audience, your revenue.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {['NoFear', 'BlackDiamond', 'MrsCotton', 'RockNext', 'Ad9xPharma', 'RiverShyre'].map(brand => (
                  <span key={brand} className="px-2.5 py-1 bg-[#1F1F1F] rounded-lg text-[10px] font-medium text-[#6B7280]">{brand}</span>
                ))}
                <span className="px-2.5 py-1 bg-[#C9A03F]/10 border border-[#C9A03F]/20 rounded-lg text-[10px] font-medium text-[#C9A03F]">+ Your Brand</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ FOOTER CTA ═══════ */}
        <div className="text-center py-8">
          <p className="text-lg font-bold mb-2">JamZia Networks™ and <span className="text-[#C9A03F]">YOU</span></p>
          <p className="text-sm text-[#6B7280] max-w-lg mx-auto mb-4">
            Do not be the best marketer of the worst products. Make good audio, video, music, and film — and watch your life change forever. If you are doing something you love, you will never work another day in your life.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1"><Lock size={10} /> Decentralized</span>
            <span className="flex items-center gap-1"><Star size={10} /> White Label Ready</span>
            <span className="flex items-center gap-1"><Globe size={10} /> Global Edge Network</span>
            <span className="flex items-center gap-1"><Zap size={10} /> Instant Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
