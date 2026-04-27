/* ═══════════════════════════════════════════════════════════
   JamZa Stream™ — Total Decentralized Streaming Solution
   LiveStream · VOD · PPV · Cloud Studio · Asset Management
   Encode & Edit on the Fly · Monetization · Analytics
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect } from 'react';
import {
  Radio, Play, Square, MonitorPlay, Film, Ticket, Cloud, HardDrive,
  Scissors, Layers, BarChart3, Globe, Lock, Zap, TrendingUp, DollarSign,
  Users, Eye, Clock, Wifi, Upload, Download, Settings, CheckCircle,
  ChevronRight, Star, Crown, Sparkles, Video, Music, Mic, Camera,
  Palette, Smartphone, Tv, Laptop, Cast, Database,
  Shield, Key, Coins, ShoppingCart, Repeat, ArrowRight, Plus,
  Minus, Volume2, Maximize2, Grid, List, Search, Filter, Trash2,
  Edit3, Copy, Move, Folder, FileVideo, FileAudio, Image, FileText,
  Activity, MapPin, Tablet, Monitor,
  Headphones, Speaker, Crown as CrownIcon,
  RefreshCw
} from 'lucide-react';

/* ── Core Capability Cards ── */
const CAPABILITIES = [
  {
    id: 'live',
    title: 'Live Stream',
    icon: Radio,
    color: '#ef4444',
    desc: 'Broadcast to the world in real-time. RTMP, WebRTC, and adaptive HLS delivery.',
    features: ['RTMP ingest', 'WebRTC low-latency', 'Multi-resolution encoding', 'HLS/DASH output', 'DVR rewind', 'Chat overlay'],
  },
  {
    id: 'vod',
    title: 'Video on Demand',
    icon: Film,
    color: '#a855f7',
    desc: 'Upload once. Deliver everywhere. Adaptive bitrate with instant playback.',
    features: ['ABR streaming', 'DRM protection', 'Just-in-time transcoding', 'Global edge delivery', 'Thumbnail generation', 'Subtitle support'],
  },
  {
    id: 'ppv',
    title: 'Pay Per View',
    icon: Ticket,
    color: '#f59e0b',
    desc: 'Monetize premium events. Entitlement management with signed access tokens.',
    features: ['Dynamic pricing', 'Entitlement validation', 'Signed URLs', 'Concurrency limits', 'Geo-restrictions', 'Revenue analytics'],
  },
  {
    id: 'studio',
    title: 'Cloud Studio',
    icon: Scissors,
    color: '#22c55e',
    desc: 'Edit and encode on the fly. Scene switching, overlays, and transitions.',
    features: ['Live scene switching', 'Graphic overlays', 'Multi-source mixing', 'Transition library', 'Audio ducking', 'Green screen'],
  },
  {
    id: 'storage',
    title: 'Asset Storage',
    icon: HardDrive,
    color: '#7096D1',
    desc: 'Decentralized storage with global CDN. Your media, your control.',
    features: ['Decentralized nodes', 'Global CDN edges', 'Folder management', 'Batch operations', 'Version control', 'Auto-backup'],
  },
  {
    id: 'monetize',
    title: 'Monetize',
    icon: DollarSign,
    color: '#C9A03F',
    desc: 'SVOD, AVOD, TVOD. Flexible models that maximize your revenue.',
    features: ['Subscriptions', 'Ad-supported', 'Pay-per-view', 'Tips & donations', 'Revenue splits', 'Payout dashboard'],
  },
];

/* ── Stream Quality Presets ── */
const QUALITY_PRESETS = [
  { label: '4K', resolution: '3840×2160', bitrate: '16 Mbps', codec: 'H.265/AV1' },
  { label: '1440p', resolution: '2560×1440', bitrate: '8 Mbps', codec: 'H.265' },
  { label: '1080p', resolution: '1920×1080', bitrate: '5 Mbps', codec: 'H.264' },
  { label: '720p', resolution: '1280×720', bitrate: '2.5 Mbps', codec: 'H.264' },
  { label: '480p', resolution: '854×480', bitrate: '1.2 Mbps', codec: 'H.264' },
  { label: '360p', resolution: '640×360', bitrate: '800 kbps', codec: 'H.264' },
  { label: '240p', resolution: '426×240', bitrate: '400 kbps', codec: 'H.264' },
];

/* ── Analytics Mock Data ── */
const ANALYTICS = {
  viewers: 124783,
  peak: 45210,
  avgDuration: '42m 18s',
  revenue: '$18,492.50',
  countries: 87,
  devices: { mobile: 62, desktop: 28, tv: 8, tablet: 2 },
};

/* ── Cloud Studio Tools ── */
const STUDIO_TOOLS = [
  { name: 'Scene Switcher', icon: Layers, desc: 'Switch between camera, screen, and graphics instantly' },
  { name: 'Overlay Engine', icon: Palette, desc: 'Add logos, tickers, alerts, and lower-thirds' },
  { name: 'Audio Mixer', icon: Volume2, desc: 'Balance mic, desktop, and music levels' },
  { name: 'Transition FX', icon: Sparkles, desc: 'Cut, fade, swipe, and stinger transitions' },
  { name: 'Green Screen', icon: MonitorPlay, desc: 'Chroma key without a physical green screen' },
  { name: 'Multi-Source', icon: Grid, desc: 'Picture-in-picture and split-screen layouts' },
];

export default function JamZaStream() {
  const [activeTab, setActiveTab] = useState('live');
  const [streamStatus, setStreamStatus] = useState<'idle' | 'live' | 'ended'>('idle');
  const [viewerCount, setViewerCount] = useState(0);
  const [studioPreview, setStudioPreview] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState('1080p');
  const [ monetizationModel, setMonetizationModel] = useState('svod');

  /* Simulate viewer growth for demo */
  useEffect(() => {
    if (streamStatus !== 'live') { setViewerCount(0); return; }
    setViewerCount(Math.floor(Math.random() * 500) + 100);
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 20) - 5);
    }, 2000);
    return () => clearInterval(interval);
  }, [streamStatus]);

  const activeCap = CAPABILITIES.find(c => c.id === activeTab) || CAPABILITIES[0];
  const ActiveIcon = activeCap.icon;

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* ═══════ HERO ═══════ */}
      <div className="relative overflow-hidden border-b border-[#1F1F1F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#ef444415_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 py-12 relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-full text-[10px] font-bold text-[#ef4444] tracking-wider">JAMZIA NETWORKS™</span>
            <span className="px-3 py-1 bg-[#C9A03F]/10 border border-[#C9A03F]/20 rounded-full text-[10px] font-bold text-[#C9A03F] tracking-wider">WHITE LABEL READY</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            JamZa Stream™ <span className="text-[#ef4444]">Engine</span>
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mb-6">
            Total decentralized streaming solution. LiveStream, VOD, and PPV — all in one engine.
            Encode and edit on the fly. Store assets securely. Monetize every view.
            No middlemen. No limits. Just stream.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Radio size={16} className="text-[#ef4444]" /><span>Live Streaming</span></div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Film size={16} className="text-[#a855f7]" /><span>Video on Demand</span></div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Ticket size={16} className="text-[#f59e0b]" /><span>Pay Per View</span></div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Scissors size={16} className="text-[#22c55e]" /><span>Cloud Studio</span></div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><HardDrive size={16} className="text-[#7096D1]" /><span>Decentralized Storage</span></div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><DollarSign size={16} className="text-[#C9A03F]" /><span>Monetization</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* ═══════ 6 CAPABILITY TABS ═══════ */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {CAPABILITIES.map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all ${
                  activeTab === c.id ? 'bg-[#ef4444]/10 border-2 border-[#ef4444]/40' : 'bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#2A2A2A]'
                }`}
              >
                <Icon size={20} style={{ color: activeTab === c.id ? c.color : '#6B7280' }} />
                <span className="text-[10px] font-medium" style={{ color: activeTab === c.id ? c.color : '#6B7280' }}>{c.title}</span>
              </button>
            );
          })}
        </div>

        {/* ═══════ ACTIVE CAPABILITY CONTENT ═══════ */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${activeCap.color}15` }}>
              <ActiveIcon size={24} style={{ color: activeCap.color }} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">{activeCap.title}</h2>
              <p className="text-sm text-[#6B7280]">{activeCap.desc}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {activeCap.features.map(f => (
              <div key={f} className="flex items-center gap-2 text-xs">
                <CheckCircle size={12} style={{ color: activeCap.color }} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ LIVE STREAM DASHBOARD ═══════ */}
        {activeTab === 'live' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold flex items-center gap-2"><Radio size={16} className="text-[#ef4444]" /> Broadcast Control</h3>
                {streamStatus === 'live' && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-medium text-red-400">LIVE</span>
                    <span className="text-[10px] text-[#6B7280]">{viewerCount.toLocaleString()} viewers</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Preview */}
                <div className="lg:col-span-2 aspect-video bg-[#111] rounded-xl flex items-center justify-center relative overflow-hidden">
                  {streamStatus === 'live' ? (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ef444405_0%,_transparent_70%)]" />
                  ) : null}
                  <div className="text-center">
                    <Radio size={48} className={`mx-auto mb-3 ${streamStatus === 'live' ? 'text-red-500' : 'text-[#1F1F1F]'}`} />
                    <p className="text-sm font-medium">{streamStatus === 'live' ? 'Broadcasting...' : 'Preview Ready'}</p>
                    <p className="text-xs text-[#6B7280]">{streamStatus === 'live' ? `${viewerCount.toLocaleString()} watching now` : 'Click Go Live to start'}</p>
                  </div>
                  {streamStatus === 'live' && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded">LIVE</div>
                  )}
                </div>

                {/* Controls */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Stream Title</label>
                    <input type="text" defaultValue="My Live Show" className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ef4444]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Quality Preset</label>
                    <select value={selectedPreset} onChange={e => setSelectedPreset(e.target.value)} className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ef4444]">
                      {QUALITY_PRESETS.map(p => <option key={p.label} value={p.label}>{p.label} — {p.bitrate}</option>)}
                    </select>
                  </div>
                  <div className="bg-black border border-[#1F1F1F] rounded-lg p-3">
                    <p className="text-[10px] text-[#6B7280] uppercase mb-1">Selected Profile</p>
                    {QUALITY_PRESETS.filter(p => p.label === selectedPreset).map(p => (
                      <div key={p.label}>
                        <p className="text-xs font-bold">{p.resolution} @ {p.bitrate}</p>
                        <p className="text-[10px] text-[#6B7280]">Codec: {p.codec}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {streamStatus === 'idle' && (
                      <button onClick={() => setStreamStatus('live')} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                        <Radio size={14} /> Go Live
                      </button>
                    )}
                    {streamStatus === 'live' && (
                      <button onClick={() => setStreamStatus('ended')} className="flex-1 py-2.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                        <Square size={14} /> End Stream
                      </button>
                    )}
                    {streamStatus === 'ended' && (
                      <button onClick={() => setStreamStatus('idle')} className="flex-1 py-2.5 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                        <RefreshCw size={14} /> New Stream
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Quality Ladder */}
              <div className="mt-4 pt-4 border-t border-[#1F1F1F]">
                <h4 className="text-xs font-bold mb-2">Multi-Resolution Encoding Ladder</h4>
                <div className="flex items-center gap-2 text-[10px] overflow-x-auto">
                  {QUALITY_PRESETS.map((p, i) => (
                    <div key={p.label} className={`flex items-center gap-1 shrink-0 px-2 py-1 rounded ${selectedPreset === p.label ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-black border border-[#1F1F1F] text-[#6B7280]'}`}>
                      <span className="font-bold">{p.label}</span>
                      <span>{p.bitrate}</span>
                      {i < QUALITY_PRESETS.length - 1 && <ArrowRight size={8} className="text-[#6B7280]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RTMP / WebRTC Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <h4 className="text-xs font-bold mb-2 flex items-center gap-2"><Wifi size={12} /> RTMP Ingest</h4>
                <code className="block bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-[10px] text-[#C9A03F] truncate">rtmp://stream.jamzia.tv/live/{'{streamKey}'}</code>
              </div>
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <h4 className="text-xs font-bold mb-2 flex items-center gap-2"><Zap size={12} /> WebRTC Low-Latency</h4>
                <code className="block bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-[10px] text-[#22c55e] truncate">wss://rtc.jamzia.tv/publish/{'{token}'}</code>
              </div>
            </div>
          </div>
        )}

        {/* ═══════ VOD DASHBOARD ═══════ */}
        {activeTab === 'vod' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Film size={16} className="text-[#a855f7]" /> Video Library</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { title: 'The Cotton Legacy', duration: '2h 14m', views: '12.4M', type: 'Film' },
                  { title: 'Summer Sessions', duration: '45m', views: '2.1M', type: 'Series' },
                  { title: 'Beat Making 101', duration: '1h 30m', views: '890K', type: 'Doc' },
                  { title: 'Live at The Castle', duration: '1h 15m', views: '3.7M', type: 'Concert' },
                ].map(v => (
                  <div key={v.title} className="bg-black border border-[#1F1F1F] rounded-xl overflow-hidden hover:border-[#a855f7]/40 transition-colors">
                    <div className="aspect-video bg-[#111] flex items-center justify-center">
                      <Film size={24} className="text-[#a855f7]/30" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold truncate">{v.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-[#6B7280] mt-1">
                        <span>{v.duration}</span>
                        <span>{v.views}</span>
                      </div>
                      <span className="mt-1 inline-block px-1.5 py-0.5 bg-[#a855f7]/10 text-[#a855f7] text-[9px] rounded">{v.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <p className="text-[10px] text-[#6B7280] uppercase mb-1">ABR Ladder</p>
                <p className="text-sm font-bold">7 Resolutions</p>
                <p className="text-[10px] text-[#6B7280]">240p to 4K auto-switching</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <p className="text-[10px] text-[#6B7280] uppercase mb-1">DRM</p>
                <p className="text-sm font-bold">Protected</p>
                <p className="text-[10px] text-[#6B7280]">Token-based + watermarking</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <p className="text-[10px] text-[#6B7280] uppercase mb-1">Transcoding</p>
                <p className="text-sm font-bold">Just-in-Time</p>
                <p className="text-[10px] text-[#6B7280]">Start playing while encoding</p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════ PPV DASHBOARD ═══════ */}
        {activeTab === 'ppv' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Ticket size={16} className="text-[#f59e0b]" /> Pay-Per-View Events</h3>
              <div className="space-y-3">
                {[
                  { name: 'Summer Championship Finals', price: '$24.99', sales: 18420, revenue: '$460,259', status: 'Live' },
                  { name: 'The Cotton Legacy Premiere', price: '$9.99', sales: 45200, revenue: '$451,548', status: 'On Demand' },
                  { name: 'JamZia Music Awards 2026', price: '$14.99', sales: 32100, revenue: '$481,179', status: 'Upcoming' },
                ].map(e => (
                  <div key={e.name} className="flex items-center justify-between bg-black border border-[#1F1F1F] rounded-xl p-4">
                    <div>
                      <p className="text-sm font-bold">{e.name}</p>
                      <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
                        <span>{e.price}</span>
                        <span>{e.sales.toLocaleString()} sales</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] ${e.status === 'Live' ? 'bg-red-500/10 text-red-400' : e.status === 'Upcoming' ? 'bg-[#C9A03F]/10 text-[#C9A03F]' : 'bg-emerald-500/10 text-emerald-400'}`}>{e.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#C9A03F]">{e.revenue}</p>
                      <p className="text-[10px] text-[#6B7280]">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <p className="text-[10px] text-[#6B7280] uppercase mb-2">Access Control</p>
                <div className="space-y-1 text-xs text-[#6B7280]">
                  <p className="flex items-center gap-2"><CheckCircle size={10} className="text-[#f59e0b]" /> Signed URL validation</p>
                  <p className="flex items-center gap-2"><CheckCircle size={10} className="text-[#f59e0b]" /> 2-device concurrency limit</p>
                  <p className="flex items-center gap-2"><CheckCircle size={10} className="text-[#f59e0b]" /> 48-hour viewing window</p>
                  <p className="flex items-center gap-2"><CheckCircle size={10} className="text-[#f59e0b]" /> Geo-restriction ready</p>
                </div>
              </div>
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <p className="text-[10px] text-[#6B7280] uppercase mb-2">Dynamic Pricing</p>
                <div className="space-y-1 text-xs text-[#6B7280]">
                  <p className="flex items-center gap-2"><DollarSign size={10} className="text-[#C9A03F]" /> Early bird discounts</p>
                  <p className="flex items-center gap-2"><DollarSign size={10} className="text-[#C9A03F]" /> Surge pricing for demand</p>
                  <p className="flex items-center gap-2"><DollarSign size={10} className="text-[#C9A03F]" /> Bundle event packages</p>
                  <p className="flex items-center gap-2"><DollarSign size={10} className="text-[#C9A03F]" /> Group/family rates</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════ CLOUD STUDIO ═══════ */}
        {activeTab === 'studio' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold flex items-center gap-2"><Scissors size={16} className="text-[#22c55e]" /> Cloud Studio — Edit on the Fly</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => setStudioPreview(!studioPreview)} className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors ${studioPreview ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#1F1F1F] text-[#6B7280]'}`}>
                    {studioPreview ? 'Preview On' : 'Preview Off'}
                  </button>
                </div>
              </div>

              {/* Studio Preview Canvas */}
              <div className="aspect-video bg-[#111] rounded-xl mb-4 relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                  <div className="bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                    <Camera size={24} className="text-[#6B7280]" />
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                    <MonitorPlay size={24} className="text-[#6B7280]" />
                  </div>
                </div>
                {/* Overlays */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded">LIVE</span>
                    <span className="text-[10px] text-white">Scene 1 — Camera + Screen</span>
                  </div>
                </div>
                {/* Lower third */}
                <div className="absolute bottom-16 left-4">
                  <div className="bg-[#C9A03F] text-black px-3 py-1 rounded-lg text-xs font-bold">
                    Cuz Cotton — Tech Lead
                  </div>
                </div>
              </div>

              {/* Studio Tools */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {STUDIO_TOOLS.map(t => {
                  const Icon = t.icon;
                  return (
                    <button key={t.name} className="bg-black border border-[#1F1F1F] hover:border-[#22c55e]/40 rounded-xl p-3 text-center transition-colors">
                      <Icon size={18} className="mx-auto mb-1 text-[#22c55e]" />
                      <p className="text-[10px] font-medium">{t.name}</p>
                      <p className="text-[9px] text-[#6B7280]">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══════ STORAGE DASHBOARD ═══════ */}
        {activeTab === 'storage' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><HardDrive size={16} className="text-[#7096D1]" /> Decentralized Asset Storage</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Total Stored', value: '847.3 GB', icon: Database, color: '#7096D1' },
                  { label: 'Video Files', value: '12,420', icon: FileVideo, color: '#ef4444' },
                  { label: 'Audio Files', value: '48,900', icon: FileAudio, color: '#C9A03F' },
                  { label: 'Global Nodes', value: '156', icon: Globe, color: '#22c55e' },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-black border border-[#1F1F1F] rounded-xl p-3">
                      <Icon size={16} style={{ color: s.color }} className="mb-1" />
                      <p className="text-sm font-bold">{s.value}</p>
                      <p className="text-[10px] text-[#6B7280]">{s.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Storage Pipeline */}
              <div className="bg-black border border-[#1F1F1F] rounded-xl p-4">
                <h4 className="text-xs font-bold mb-3">Upload Pipeline</h4>
                <div className="flex items-center gap-2 text-[10px] overflow-x-auto pb-2">
                  <span className="px-2 py-1 bg-[#C9A03F]/10 text-[#C9A03F] rounded">Upload</span>
                  <ChevronRight size={10} className="text-[#6B7280]" />
                  <span className="px-2 py-1 bg-[#a855f7]/10 text-[#a855f7] rounded">Transcode</span>
                  <ChevronRight size={10} className="text-[#6B7280]" />
                  <span className="px-2 py-1 bg-[#22c55e]/10 text-[#22c55e] rounded">Store</span>
                  <ChevronRight size={10} className="text-[#6B7280]" />
                  <span className="px-2 py-1 bg-[#7096D1]/10 text-[#7096D1] rounded">Distribute</span>
                  <ChevronRight size={10} className="text-[#6B7280]" />
                  <span className="px-2 py-1 bg-[#ef4444]/10 text-[#ef4444] rounded">Monetize</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════ MONETIZATION DASHBOARD ═══════ */}
        {activeTab === 'monetize' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><DollarSign size={16} className="text-[#C9A03F]" /> Revenue Models</h3>
              <div className="flex items-center gap-2 mb-4">
                {['svod', 'avod', 'tvod', 'hybrid'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMonetizationModel(m)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                      monetizationModel === m ? 'bg-[#C9A03F] text-black' : 'bg-[#1F1F1F] text-[#6B7280] hover:text-white'
                    }`}
                  >
                    {m === 'svod' ? 'Subscription' : m === 'avod' ? 'Ad-Supported' : m === 'tvod' ? 'Pay-Per-View' : 'Hybrid'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black border border-[#1F1F1F] rounded-xl p-4">
                  <p className="text-[10px] text-[#6B7280] uppercase mb-1">Total Revenue</p>
                  <p className="text-xl font-bold text-[#C9A03F]">{ANALYTICS.revenue}</p>
                  <p className="text-[10px] text-emerald-400">+12.4% this month</p>
                </div>
                <div className="bg-black border border-[#1F1F1F] rounded-xl p-4">
                  <p className="text-[10px] text-[#6B7280] uppercase mb-1">Total Viewers</p>
                  <p className="text-xl font-bold">{ANALYTICS.viewers.toLocaleString()}</p>
                  <p className="text-[10px] text-[#6B7280]">{ANALYTICS.countries} countries</p>
                </div>
                <div className="bg-black border border-[#1F1F1F] rounded-xl p-4">
                  <p className="text-[10px] text-[#6B7280] uppercase mb-1">Avg Watch Time</p>
                  <p className="text-xl font-bold">{ANALYTICS.avgDuration}</p>
                  <p className="text-[10px] text-[#6B7280]">Per session</p>
                </div>
              </div>

              {/* Device Breakdown */}
              <div className="mt-4 bg-black border border-[#1F1F1F] rounded-xl p-4">
                <h4 className="text-xs font-bold mb-2">Device Breakdown</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs"><Smartphone size={12} className="text-[#6B7280]" /><span>Mobile {ANALYTICS.devices.mobile}%</span></div>
                  <div className="flex items-center gap-1 text-xs"><Laptop size={12} className="text-[#6B7280]" /><span>Desktop {ANALYTICS.devices.desktop}%</span></div>
                  <div className="flex items-center gap-1 text-xs"><Tv size={12} className="text-[#6B7280]" /><span>TV {ANALYTICS.devices.tv}%</span></div>
                  <div className="flex items-center gap-1 text-xs"><Tablet size={12} className="text-[#6B7280]" /><span>Tablet {ANALYTICS.devices.tablet}%</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════ ANALYTICS DASHBOARD (always visible) ═══════ */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-[#06b6d4]" /> Real-Time Analytics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Concurrent Viewers', value: streamStatus === 'live' ? viewerCount.toLocaleString() : '0', change: '+24%', icon: Users, color: '#06b6d4' },
              { label: 'Peak Concurrent', value: ANALYTICS.peak.toLocaleString(), change: '+18%', icon: TrendingUp, color: '#22c55e' },
              { label: 'Stream Health', value: 'Excellent', change: '99.97% uptime', icon: Activity, color: '#C9A03F' },
              { label: 'Bandwidth Used', value: '4.2 TB', change: '+8%', icon: Wifi, color: '#a855f7' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-black border border-[#1F1F1F] rounded-xl p-3">
                  <Icon size={16} style={{ color: s.color }} className="mb-1" />
                  <p className="text-sm font-bold">{s.value}</p>
                  <p className="text-[10px] text-[#6B7280]">{s.label}</p>
                  <p className="text-[9px] text-emerald-400">{s.change}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════ WHITE LABEL ═══════ */}
        <div className="bg-[#0A0A0A] border border-[#C9A03F]/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#C9A03F]/10 flex items-center justify-center shrink-0">
              <Crown size={20} className="text-[#C9A03F]" />
            </div>
            <div>
              <h2 className="text-sm font-bold mb-1">White Label Ready</h2>
              <p className="text-xs text-[#6B7280] mb-3">
                JamZa Stream™ is fully rebrandable across the entire JamZia ecosystem.
                Every white-label partner gets their own streaming engine — Live, VOD, PPV, Cloud Studio,
                Asset Storage, and Monetization — all under their brand.
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
      </div>
    </div>
  );
}
