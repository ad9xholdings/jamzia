import { useState } from 'react';
import {
  Glasses, Eye, Sparkles, Move, RotateCw, Compass, Play, Star, Download
} from 'lucide-react';
import { brand } from '../config/brand';

const experiences = [
  { id: 1, name: 'Neon City Walk', category: 'World', rating: 4.9, views: '2.1M', creator: 'RiverStudio', installs: '89K', icon: '🌃', color: 'purple' },
  { id: 2, name: 'Ancient Ruins Explorer', category: 'Education', rating: 4.8, views: '1.4M', creator: 'HistoryXR', installs: '67K', icon: '🏛️', color: 'amber' },
  { id: 3, name: 'Mars Colony Tour', category: 'Space', rating: 4.9, views: '3.2M', creator: 'NASA_JamZia', installs: '156K', icon: '🚀', color: 'red' },
  { id: 4, name: 'Ocean Depths Dive', category: 'Nature', rating: 4.7, views: '980K', creator: 'BluePlanetAR', installs: '45K', icon: '🌊', color: 'blue' },
  { id: 5, name: 'Abstract Art Gallery', category: 'Art', rating: 4.6, views: '720K', creator: 'ArtLens', installs: '34K', icon: '🎨', color: 'pink' },
  { id: 6, name: 'Dinosaur Encounter', category: 'Education', rating: 4.8, views: '2.8M', creator: 'PaleoXR', installs: '112K', icon: '🦕', color: 'green' },
];

const featured = {
  name: 'RiverShyre: Crystal Caverns',
  creator: 'River Studios',
  description: 'Explore luminous underground caverns filled with bioluminescent crystals. Walk, fly, and interact with a living cave ecosystem.',
  rating: 4.9,
  installs: '245K',
  duration: '15 min experience',
  features: ['Hand Tracking', 'Room Scale', 'Multiplayer']};

const categories = ['All', 'World', 'Education', 'Space', 'Nature', 'Art'];

export default function JamAR() {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? experiences : experiences.filter(e => e.category === activeCat);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2"><Glasses size={20} className="text-indigo-400" /><span className="font-display text-lg font-bold">{brand.prefix}AR</span></div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-400 mb-3">
            <Sparkles size={12} />RiverShyre Immersive
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Augmented Reality</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">Immersive experiences, spatial computing, and WebXR worlds. Step inside.</p>
        </div>

        {/* Featured Experience */}
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-1/3">
              <div className="aspect-square bg-indigo-500/10 rounded-2xl flex items-center justify-center text-6xl">
                💎
              </div>
            </div>
            <div className="sm:w-2/3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-semibold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">Featured</span>
                <span className="text-[9px] text-[#6B7280]">{featured.duration}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{featured.name}</h2>
              <p className="text-xs text-indigo-400 mb-3">by {featured.creator}</p>
              <p className="text-sm text-[#A0AEC0] mb-4">{featured.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.features.map(f => (
                  <span key={f} className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/20">{f}</span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-xl cursor-pointer hover:bg-indigo-600 transition-colors">
                  <Play size={14} /> Launch Experience
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 text-white text-sm rounded-xl cursor-pointer hover:bg-white/10 transition-colors border border-white/10">
                  <Download size={14} /> {featured.installs}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-4">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${activeCat === c ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-[#0A0F1E] text-[#6B7280] border border-white/[0.06]'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(e => (
            <div key={e.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 hover:border-indigo-500/20 transition-all group cursor-pointer">
              <div className="aspect-video bg-indigo-500/5 rounded-xl flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                {e.icon}
              </div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-white">{e.name}</p>
                <div className="flex items-center gap-1"><Star size={10} className="text-amber-400 fill-amber-400" /><span className="text-[10px] text-[#A0AEC0]">{e.rating}</span></div>
              </div>
              <p className="text-[10px] text-[#6B7280] mb-2">by {e.creator} • {e.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6B7280] flex items-center gap-1"><Eye size={10} />{e.views}</span>
                <span className="text-[10px] text-indigo-400">{e.installs} installs</span>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Move, title: 'Step Inside', desc: 'Use your device camera to enter AR worlds' },
            { icon: RotateCw, title: 'Interact', desc: 'Touch, move, and manipulate 3D objects' },
            { icon: Compass, title: 'Explore', desc: 'Navigate immersive spaces freely' },
          ].map(s => (
            <div key={s.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
              <s.icon size={24} className="mx-auto mb-2 text-indigo-400" />
              <p className="text-sm font-semibold text-white">{s.title}</p>
              <p className="text-[10px] text-[#6B7280] mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
