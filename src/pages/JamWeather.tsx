import { useState } from 'react';
import {
  Cloud, Sun, CloudRain, Wind, Droplets, Thermometer,
  Eye, Gauge, Sunrise, Sunset, MapPin, AlertTriangle
} from 'lucide-react';
import { brand } from '../config/brand';

const hourlyData = [
  { time: '6 AM', temp: 62, icon: Cloud, precip: 5, wind: 8 },
  { time: '9 AM', temp: 68, icon: Sun, precip: 0, wind: 6 },
  { time: '12 PM', temp: 76, icon: Sun, precip: 0, wind: 10 },
  { time: '3 PM', temp: 82, icon: Sun, precip: 0, wind: 12 },
  { time: '6 PM', temp: 78, icon: Cloud, precip: 10, wind: 9 },
  { time: '9 PM', temp: 70, icon: CloudRain, precip: 45, wind: 14 },
  { time: '12 AM', temp: 64, icon: CloudRain, precip: 60, wind: 11 },
  { time: '3 AM', temp: 60, icon: Cloud, precip: 20, wind: 7 },
];

const dailyData = [
  { day: 'Today', high: 82, low: 60, icon: Sun, condition: 'Sunny', precip: 10 },
  { day: 'Tue', high: 85, low: 62, icon: Sun, condition: 'Clear', precip: 5 },
  { day: 'Wed', high: 79, low: 58, icon: CloudRain, condition: 'Rain', precip: 70 },
  { day: 'Thu', high: 72, low: 55, icon: CloudRain, condition: 'Storms', precip: 85 },
  { day: 'Fri', high: 80, low: 59, icon: Cloud, condition: 'Partly Cloudy', precip: 15 },
  { day: 'Sat', high: 84, low: 61, icon: Sun, condition: 'Sunny', precip: 0 },
  { day: 'Sun', high: 81, low: 60, icon: Wind, condition: 'Windy', precip: 10 },
];

const airQuality = [
  { pollutant: 'PM2.5', value: 12, unit: 'μg/m³', status: 'Good', color: '#22c55e' },
  { pollutant: 'PM10', value: 28, unit: 'μg/m³', status: 'Good', color: '#22c55e' },
  { pollutant: 'O₃', value: 45, unit: 'ppb', status: 'Moderate', color: '#f59e0b' },
  { pollutant: 'NO₂', value: 18, unit: 'ppb', status: 'Good', color: '#22c55e' },
];

const alerts = [
  { type: 'severe', title: 'Severe Thunderstorm Watch', time: 'Wed 2:00 PM - 8:00 PM', desc: 'Damaging winds up to 70 mph and large hail possible' },
  { type: 'advisory', title: 'Heat Advisory', time: 'Thu 12:00 PM - 6:00 PM', desc: 'Heat index values up to 105°F expected' },
];

const details = [
  { label: 'Feels Like', value: '84°F', icon: Thermometer },
  { label: 'Humidity', value: '62%', icon: Droplets },
  { label: 'Wind', value: '12 mph SW', icon: Wind },
  { label: 'Visibility', value: '10 mi', icon: Eye },
  { label: 'Pressure', value: '30.12 in', icon: Gauge },
  { label: 'UV Index', value: '8 (Very High)', icon: Sun },
  { label: 'Sunrise', value: '6:14 AM', icon: Sunrise },
  { label: 'Sunset', value: '7:52 PM', icon: Sunset },
];

export default function JamWeather() {
  const [location, setLocation] = useState('New York, NY');
  const [tab, setTab] = useState<'hourly' | 'daily'>('hourly');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Cloud size={20} className="text-blue-400" />
            <span className="font-display text-lg font-bold">{brand.prefix}Weather</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <main className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        {/* Location Input */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <MapPin size={16} className="text-blue-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent text-white text-lg font-semibold text-center outline-none border-b border-white/10 focus:border-blue-400/50 pb-1 w-48 sm:w-64"
          />
        </div>

        {/* Current Conditions */}
        <div className="text-center mb-8">
          <Sun size={64} className="mx-auto text-amber-400 mb-3" />
          <p className="font-display text-5xl sm:text-6xl font-bold text-white">82°F</p>
          <p className="text-[#A0AEC0] mt-1">Sunny • Feels like 84°</p>
          <div className="flex items-center justify-center gap-4 mt-3 text-sm text-[#A0AEC0]">
            <span>H: 85°</span>
            <span>L: 60°</span>
            <span className="flex items-center gap-1"><Droplets size={12} className="text-blue-400" />10%</span>
          </div>
        </div>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2 mb-6">
            {alerts.map((a, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-3 rounded-xl ${
                a.type === 'severe' ? 'bg-red-500/10 border border-red-500/20' : 'bg-amber-500/10 border border-amber-500/20'
              }`}>
                <AlertTriangle size={16} className={a.type === 'severe' ? 'text-red-400 shrink-0 mt-0.5' : 'text-amber-400 shrink-0 mt-0.5'} />
                <div>
                  <p className={`text-xs font-semibold ${a.type === 'severe' ? 'text-red-400' : 'text-amber-400'}`}>
                    {a.title}
                  </p>
                  <p className="text-[10px] text-[#6B7280] mt-0.5">{a.time}</p>
                  <p className="text-[10px] text-[#A0AEC0] mt-1">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hourly / Daily Toggle */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 mb-6">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTab('hourly')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                tab === 'hourly' ? 'bg-blue-500/20 text-blue-400' : 'text-[#6B7280] hover:text-white'
              }`}
            >
              Hourly
            </button>
            <button
              onClick={() => setTab('daily')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                tab === 'daily' ? 'bg-blue-500/20 text-blue-400' : 'text-[#6B7280] hover:text-white'
              }`}
            >
              7-Day
            </button>
          </div>

          {tab === 'hourly' && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {hourlyData.map((h) => (
                <div key={h.time} className="text-center p-3 rounded-xl bg-white/[0.02] min-w-[70px]">
                  <p className="text-[10px] text-[#6B7280] mb-1">{h.time}</p>
                  <h.icon size={18} className="mx-auto mb-1 text-[#A0AEC0]" />
                  <p className="text-sm font-semibold text-white">{h.temp}°</p>
                  <p className="text-[9px] text-blue-400">{h.precip}%</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'daily' && (
            <div className="space-y-2">
              {dailyData.map((d) => (
                <div key={d.day} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <span className="text-xs text-[#A0AEC0] w-14">{d.day}</span>
                  <d.icon size={16} className="text-[#A0AEC0]" />
                  <span className="text-[10px] text-[#6B7280] flex-1">{d.condition}</span>
                  <span className="text-[10px] text-blue-400 w-8 text-right">{d.precip}%</span>
                  <div className="flex items-center gap-2 w-24">
                    <span className="text-xs text-white font-medium">{d.high}°</span>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-amber-400 rounded-full" style={{ width: `${(d.high - 50) * 2}%` }} />
                    </div>
                    <span className="text-xs text-[#6B7280]">{d.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weather Details Grid */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-[#A0AEC0] mb-4">Current Details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {details.map((d) => (
              <div key={d.label} className="text-center p-3 rounded-xl bg-white/[0.02]">
                <d.icon size={18} className="mx-auto mb-2 text-blue-400" />
                <p className="text-sm font-semibold text-white">{d.value}</p>
                <p className="text-[10px] text-[#6B7280]">{d.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Air Quality */}
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-[#A0AEC0] mb-4 flex items-center gap-2">
            <Wind size={14} />
            Air Quality Index
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {airQuality.map((a) => (
              <div key={a.pollutant} className="text-center p-3 rounded-xl bg-white/[0.02]">
                <p className="text-lg font-bold" style={{ color: a.color }}>{a.value}</p>
                <p className="text-[10px] text-[#6B7280]">{a.unit}</p>
                <p className="text-xs font-semibold text-white mt-1">{a.pollutant}</p>
                <span className="text-[9px] px-2 py-0.5 rounded-full mt-1 inline-block" style={{ backgroundColor: `${a.color}20`, color: a.color }}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-4">Data: EPA AirNow • NOAA Air Quality Monitoring</p>
        </div>
      </main>
    </div>
  );
}
