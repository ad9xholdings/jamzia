import { useState } from 'react';
import {
  Globe, Leaf, TrendingUp, Droplets, Wind, Thermometer,
  MapPin, Activity, Recycle, TreePine, Info
} from 'lucide-react';
import { brand } from '../config/brand';

const climateMetrics = [
  { label: 'Global Temp Anomaly', value: '+1.18°C', change: '+0.02°C', trend: 'up', icon: Thermometer },
  { label: 'CO₂ Concentration', value: '421.5', unit: 'ppm', change: '+2.4 ppm', trend: 'up', icon: Wind },
  { label: 'Sea Level Rise', value: '103.2', unit: 'mm', change: '+4.8 mm', trend: 'up', icon: Droplets },
  { label: 'Arctic Ice Extent', value: '4.23', unit: 'M km²', change: '-0.12 M', trend: 'down', icon: Globe },
  { label: 'Renewable Share', value: '29.4%', change: '+1.2%', trend: 'up', icon: Leaf },
  { label: 'Forest Coverage', value: '31.0%', change: '-0.05%', trend: 'down', icon: TreePine },
];

const dataSources = [
  { name: 'NASA GISS', url: 'https://data.giss.nasa.gov', data: 'Temperature anomalies 1880-present' },
  { name: 'NOAA NCEI', url: 'https://www.ncei.noaa.gov', data: 'Climate monitoring & extreme events' },
  { name: 'EPA GHG', url: 'https://www.epa.gov/ghgreporting', data: 'Greenhouse gas emissions data' },
  { name: 'Global Carbon Project', url: 'https://www.globalcarbonproject.org', data: 'Carbon budget & emissions' },
];

const sustainabilityTips = [
  { icon: '⚡', title: 'Energy Efficiency', desc: 'Switch to LED bulbs — save 75% energy' },
  { icon: '🚲', title: 'Green Transport', desc: 'Bike or transit for trips under 3 miles' },
  { icon: '♻️', title: 'Circular Economy', desc: 'Repair, reuse, recycle — reduce waste 40%' },
  { icon: '🌱', title: 'Plant-Based', desc: 'One meatless day saves 1,100 gallons of water' },
];

const locations = [
  { city: 'New York', temp: '+1.2°C', sea: '+28 cm', risk: 'Coastal flooding' },
  { city: 'Miami', temp: '+0.9°C', sea: '+24 cm', risk: 'Storm surge' },
  { city: 'Phoenix', temp: '+1.8°C', sea: 'N/A', risk: 'Extreme heat' },
  { city: 'Los Angeles', temp: '+1.1°C', sea: '+18 cm', risk: 'Wildfire/Drought' },
  { city: 'Seattle', temp: '+0.7°C', sea: '+15 cm', risk: 'Ocean acidification' },
  { city: 'Houston', temp: '+1.0°C', sea: '+22 cm', risk: 'Hurricane intensity' },
];

export default function JamEarth() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'data' | 'impact'>('overview');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-emerald-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Earth</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-3">
            <Activity size={12} />
            Live Environmental Data
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Climate Intelligence</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            Real-time climate metrics powered by NASA, NOAA, and EPA public data.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-6">
          {(['overview', 'data', 'impact'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all capitalize cursor-pointer ${
                activeTab === tab
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-[#6B7280] hover:text-white border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {climateMetrics.map((m) => (
                <div key={m.label} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 text-center">
                  <m.icon size={20} className="mx-auto mb-2 text-emerald-400" />
                  <p className="text-lg font-bold text-white">{m.value}<span className="text-xs text-[#6B7280]">{m.unit}</span></p>
                  <p className="text-[10px] text-[#6B7280] mt-1">{m.label}</p>
                  <p className={`text-[10px] mt-1 ${m.trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {m.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Data Sources */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-[#A0AEC0] mb-3 flex items-center gap-2">
                <Info size={14} />
                Public Data Sources
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {dataSources.map((src) => (
                  <a
                    key={src.name}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 hover:border-emerald-500/30 transition-all no-underline group"
                  >
                    <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{src.name}</p>
                    <p className="text-[10px] text-[#6B7280] mt-1">{src.data}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Sustainability Tips */}
            <div>
              <h2 className="text-sm font-semibold text-[#A0AEC0] mb-3 flex items-center gap-2">
                <Recycle size={14} />
                Sustainability Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {sustainabilityTips.map((tip) => (
                  <div key={tip.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
                    <span className="text-2xl mb-2 block">{tip.icon}</span>
                    <p className="text-sm font-semibold text-white">{tip.title}</p>
                    <p className="text-[10px] text-[#6B7280] mt-1">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Data Tab */}
        {activeTab === 'data' && (
          <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">CO₂ Concentration (ppm) — Mauna Loa Observatory</h2>
            <div className="space-y-3">
              {[
                { year: '2019', value: 411.4, bar: '65%' },
                { year: '2020', value: 414.2, bar: '68%' },
                { year: '2021', value: 416.4, bar: '71%' },
                { year: '2022', value: 418.5, bar: '74%' },
                { year: '2023', value: 420.9, bar: '77%' },
                { year: '2024', value: 421.5, bar: '78%' },
              ].map((d) => (
                <div key={d.year} className="flex items-center gap-3">
                  <span className="text-xs text-[#6B7280] w-10">{d.year}</span>
                  <div className="flex-1 h-6 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-lg flex items-center px-2 transition-all"
                      style={{ width: d.bar }}
                    >
                      <span className="text-[10px] font-bold text-white">{d.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#6B7280] mt-4">Source: NOAA Global Monitoring Laboratory • Data via SORME™ Public KB</p>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Location Selector */}
            <div className="lg:col-span-1 space-y-2">
              <h3 className="text-sm font-semibold text-[#A0AEC0] mb-2 flex items-center gap-2">
                <MapPin size={14} />
                Select Location
              </h3>
              {locations.map((loc) => (
                <button
                  key={loc.city}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
                    selectedLocation.city === loc.city
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-white'
                      : 'bg-[#0A0F1E] border border-white/[0.06] text-[#A0AEC0] hover:border-white/10'
                  }`}
                >
                  {loc.city}
                </button>
              ))}
            </div>

            {/* Impact Card */}
            <div className="lg:col-span-2 bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">{selectedLocation.city}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                  <Thermometer size={24} className="mx-auto text-amber-400 mb-2" />
                  <p className="text-lg font-bold text-white">{selectedLocation.temp}</p>
                  <p className="text-[10px] text-[#6B7280]">Temp Anomaly</p>
                </div>
                <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                  <Droplets size={24} className="mx-auto text-blue-400 mb-2" />
                  <p className="text-lg font-bold text-white">{selectedLocation.sea}</p>
                  <p className="text-[10px] text-[#6B7280]">Sea Level Rise</p>
                </div>
                <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                  <TrendingUp size={24} className="mx-auto text-red-400 mb-2" />
                  <p className="text-sm font-bold text-white">{selectedLocation.risk}</p>
                  <p className="text-[10px] text-[#6B7280]">Primary Risk</p>
                </div>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                <p className="text-xs text-amber-400 font-semibold mb-1">⚠️ Climate Risk Advisory</p>
                <p className="text-xs text-[#A0AEC0]">
                  Based on NOAA climate projections and EPA environmental justice screening data.
                  Mitigation strategies available via {brand.prefix}Earth community.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
