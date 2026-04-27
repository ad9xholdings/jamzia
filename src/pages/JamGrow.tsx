import { useState } from 'react';
import {
  Sprout, Sun, CloudRain, Wind, Thermometer, Droplets,
  Calendar, MapPin, TrendingUp, AlertTriangle
} from 'lucide-react';
import { brand } from '../config/brand';

const cropData = [
  { crop: 'Corn', stage: 'Silking', health: 92, water: '62%', temp: '82°F', emoji: '🌽' },
  { crop: 'Soybeans', stage: 'Pod Fill', health: 88, water: '58%', temp: '79°F', emoji: '🫘' },
  { crop: 'Wheat', stage: 'Heading', health: 95, water: '71%', temp: '75°F', emoji: '🌾' },
  { crop: 'Tomatoes', stage: 'Fruiting', health: 85, water: '45%', temp: '85°F', emoji: '🍅' },
  { crop: 'Lettuce', stage: 'Leaf Growth', health: 90, water: '78%', temp: '68°F', emoji: '🥬' },
  { crop: 'Blueberries', stage: 'Harvest', health: 97, water: '65%', temp: '74°F', emoji: '🫐' },
];

const weeklyForecast = [
  { day: 'Mon', icon: Sun, temp: '84°', rain: '0%', condition: 'Sunny' },
  { day: 'Tue', icon: Sun, temp: '86°', rain: '10%', condition: 'Clear' },
  { day: 'Wed', icon: CloudRain, temp: '79°', rain: '65%', condition: 'Rain' },
  { day: 'Thu', icon: CloudRain, temp: '76°', rain: '80%', condition: 'Storms' },
  { day: 'Fri', icon: Sun, temp: '82°', rain: '15%', condition: 'Partly Cloudy' },
  { day: 'Sat', icon: Sun, temp: '85°', rain: '5%', condition: 'Sunny' },
  { day: 'Sun', icon: Wind, temp: '81°', rain: '20%', condition: 'Windy' },
];

const usdaReports = [
  { title: 'Crop Production', date: 'Apr 2026', source: 'USDA NASS', desc: 'Corn planted at 15%, up 3% from last year' },
  { title: 'World Agricultural Supply', date: 'Apr 2026', source: 'USDA WASDE', desc: 'Soybean ending stocks projected lower' },
  { title: 'Drought Monitor', date: 'Apr 2026', source: 'USDA/NOAA', desc: '32% of US experiencing drought conditions' },
  { title: 'Export Sales', date: 'Apr 2026', source: 'USDA FAS', desc: 'Wheat exports up 12% week-over-week' },
];

const alerts = [
  { level: 'warning', msg: 'Heat advisory: temps expected to reach 95°F Wed-Thu', icon: AlertTriangle },
  { level: 'info', msg: 'Optimal planting window for soybeans: Apr 25 - May 10', icon: Calendar },
];

export default function JamGrow() {
  const [selectedCrop, setSelectedCrop] = useState(cropData[0]);
  const [location, setLocation] = useState('Iowa, US');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Sprout size={20} className="text-green-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Grow</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs font-semibold text-green-400 mb-3">
            <Sprout size={12} />
            Smart Agriculture
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Farm Intelligence</h1>
          <p className="text-[#A0AEC0] text-sm max-w-lg mx-auto">
            Crop monitoring, weather forecasting, and USDA data for smarter farming.
          </p>
        </div>

        {/* Location + Alerts */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-2 bg-[#0A0F1E] border border-white/[0.06] rounded-xl px-4 py-3">
            <MapPin size={16} className="text-green-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-white text-sm outline-none"
            />
          </div>
          <div className="flex-1 flex gap-2 overflow-x-auto">
            {alerts.map((a, i) => (
              <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs whitespace-nowrap ${
                a.level === 'warning' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
              }`}>
                <a.icon size={12} />
                {a.msg}
              </div>
            ))}
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-[#A0AEC0] mb-4 flex items-center gap-2">
            <CloudRain size={14} />
            7-Day Agricultural Forecast
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {weeklyForecast.map((d) => (
              <div key={d.day} className="text-center p-2 rounded-xl bg-white/[0.02]">
                <p className="text-[10px] text-[#6B7280] mb-1">{d.day}</p>
                <d.icon size={18} className="mx-auto mb-1 text-[#A0AEC0]" />
                <p className="text-xs font-semibold text-white">{d.temp}</p>
                <p className="text-[9px] text-blue-400">{d.rain}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Crop List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-sm font-semibold text-[#A0AEC0] mb-2 flex items-center gap-2">
              <Sprout size={14} />
              Active Crops
            </h3>
            {cropData.map((c) => (
              <button
                key={c.crop}
                onClick={() => setSelectedCrop(c)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  selectedCrop.crop === c.crop
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-[#0A0F1E] border border-white/[0.06] hover:border-white/10'
                }`}
              >
                <span className="text-xl">{c.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{c.crop}</p>
                  <p className="text-[10px] text-[#6B7280]">{c.stage}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${c.health >= 90 ? 'text-green-400' : c.health >= 80 ? 'text-amber-400' : 'text-red-400'}`}>
                    {c.health}%
                  </p>
                  <p className="text-[9px] text-[#6B7280]">Health</p>
                </div>
              </button>
            ))}
          </div>

          {/* Crop Detail */}
          <div className="lg:col-span-2 bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{selectedCrop.emoji}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedCrop.crop}</h3>
                <p className="text-xs text-[#6B7280]">Growth Stage: {selectedCrop.stage}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                <Thermometer size={20} className="mx-auto text-amber-400 mb-2" />
                <p className="text-lg font-bold text-white">{selectedCrop.temp}</p>
                <p className="text-[10px] text-[#6B7280]">Temperature</p>
              </div>
              <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                <Droplets size={20} className="mx-auto text-blue-400 mb-2" />
                <p className="text-lg font-bold text-white">{selectedCrop.water}</p>
                <p className="text-[10px] text-[#6B7280]">Soil Moisture</p>
              </div>
              <div className="text-center p-4 bg-white/[0.02] rounded-xl">
                <TrendingUp size={20} className="mx-auto text-green-400 mb-2" />
                <p className="text-lg font-bold text-white">{selectedCrop.health}%</p>
                <p className="text-[10px] text-[#6B7280]">Health Score</p>
              </div>
            </div>

            {/* Health Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-[10px] text-[#6B7280] mb-1">
                <span>Crop Health</span>
                <span>{selectedCrop.health}/100</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${selectedCrop.health}%`,
                    backgroundColor: selectedCrop.health >= 90 ? '#22c55e' : selectedCrop.health >= 80 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* USDA Reports */}
        <div>
          <h2 className="text-sm font-semibold text-[#A0AEC0] mb-3 flex items-center gap-2">
            <TrendingUp size={14} />
            USDA Data via SORME™ Public KB
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {usdaReports.map((r) => (
              <div key={r.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
                <p className="text-xs font-semibold text-white">{r.title}</p>
                <p className="text-[10px] text-green-400 mt-0.5">{r.source} • {r.date}</p>
                <p className="text-[10px] text-[#A0AEC0] mt-2">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
