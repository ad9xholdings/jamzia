/* ═══════════════════════════════════════════════════════════
   JamStudio — Cloud Recording Studio
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect } from 'react';
import {
  Mic, Play, Square, Pause,
  Volume2, Headphones, Download, Save,
  Plus, Trash2, Music, Circle, Wand2, Share2
} from 'lucide-react';

/* ── Types ── */
interface Track {
  id: string;
  name: string;
  type: 'audio' | 'midi' | 'drum';
  muted: boolean;
  solo: boolean;
  volume: number;
  pan: number;
  armed: boolean;
  color: string;
  clips: Clip[];
}

interface Clip {
  id: string;
  name: string;
  start: number;
  length: number;
  color: string;
}

interface Effect {
  name: string;
  active: boolean;
  params: { label: string; value: number }[];
}

/* ── Mock Data ── */
const TRACK_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#06b6d4', '#7096D1', '#a855f7', '#ec4899', '#f43f5e'];

const INITIAL_TRACKS: Track[] = [
  { id: 't1', name: 'Lead Vocal', type: 'audio', muted: false, solo: false, volume: 78, pan: 0, armed: true, color: '#ef4444', clips: [{ id: 'c1', name: 'Verse 1', start: 0, length: 16, color: '#ef444430' }] },
  { id: 't2', name: 'Backing Vox', type: 'audio', muted: false, solo: false, volume: 55, pan: -20, armed: false, color: '#f59e0b', clips: [{ id: 'c2', name: 'Chorus BV', start: 16, length: 16, color: '#f59e0b30' }] },
  { id: 't3', name: 'Acoustic Gtr', type: 'audio', muted: false, solo: false, volume: 65, pan: 15, armed: false, color: '#22c55e', clips: [{ id: 'c3', name: 'Gtr Take 3', start: 0, length: 32, color: '#22c55e30' }] },
  { id: 't4', name: 'Bass', type: 'audio', muted: false, solo: false, volume: 70, pan: 0, armed: false, color: '#7096D1', clips: [{ id: 'c4', name: 'Bass Line', start: 0, length: 32, color: '#7096D130' }] },
  { id: 't5', name: 'Drums', type: 'drum', muted: false, solo: false, volume: 72, pan: 0, armed: false, color: '#ec4899', clips: [{ id: 'c5', name: 'Drum Loop A', start: 0, length: 32, color: '#ec489930' }] },
  { id: 't6', name: 'Synth Pad', type: 'midi', muted: true, solo: false, volume: 45, pan: -30, armed: false, color: '#a855f7', clips: [{ id: 'c6', name: 'Pad Chords', start: 0, length: 48, color: '#a855f730' }] },
  { id: 't7', name: 'FX Sends', type: 'audio', muted: false, solo: false, volume: 35, pan: 0, armed: false, color: '#06b6d4', clips: [] },
];

const MASTER_EFFECTS: Effect[] = [
  { name: 'EQ', active: true, params: [{ label: 'Low', value: 40 }, { label: 'Mid', value: 60 }, { label: 'High', value: 75 }] },
  { name: 'Compressor', active: true, params: [{ label: 'Threshold', value: 65 }, { label: 'Ratio', value: 45 }, { label: 'Gain', value: 55 }] },
  { name: 'Reverb', active: true, params: [{ label: 'Size', value: 30 }, { label: 'Decay', value: 50 }, { label: 'Mix', value: 25 }] },
  { name: 'Limiter', active: true, params: [{ label: 'Ceiling', value: 90 }, { label: 'Release', value: 70 }] },
];

/* ── Waveform visual ── */
function WaveformVis({ color, active }: { color: string; active: boolean }) {
  const bars = Array.from({ length: 40 }, () => Math.random() * 24 + 4);
  return (
    <div className="flex items-end gap-[2px] h-8 flex-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all"
          style={{
            height: active ? `${h}px` : '2px',
            backgroundColor: color,
            opacity: active ? 0.7 : 0.15,
            transitionDuration: `${200 + Math.random() * 300}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Component ── */
export default function JamStudio() {
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [showEffects, setShowEffects] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Transport */
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentTime(t => (t + 0.1) % 64);
      }, 100);
    }
  };

  const toggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsRecording(true);
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentTime(t => (t + 0.1) % 64);
      }, 100);
    }
  };

  const stop = () => {
    setIsPlaying(false);
    setIsRecording(false);
    setCurrentTime(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  /* Track controls */
  const toggleMute = (id: string) => {
    setTracks(prev => prev.map(t => t.id === id ? { ...t, muted: !t.muted } : t));
    setSaveStatus('unsaved');
  };

  const toggleSolo = (id: string) => {
    setTracks(prev => prev.map(t => t.id === id ? { ...t, solo: !t.solo } : t));
    setSaveStatus('unsaved');
  };

  const setVolume = (id: string, vol: number) => {
    setTracks(prev => prev.map(t => t.id === id ? { ...t, volume: vol } : t));
    setSaveStatus('unsaved');
  };

  const addTrack = () => {
    const color = TRACK_COLORS[tracks.length % TRACK_COLORS.length];
    setTracks(prev => [...prev, {
      id: `t${Date.now()}`,
      name: `Track ${prev.length + 1}`,
      type: 'audio',
      muted: false, solo: false,
      volume: 70, pan: 0, armed: false, color,
      clips: [],
    }]);
    setSaveStatus('unsaved');
  };

  const deleteTrack = (id: string) => {
    setTracks(prev => prev.filter(t => t.id !== id));
    setSaveStatus('unsaved');
  };

  const saveProject = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  const formatTime = (t: number) => {
    const bars = Math.floor(t / 4) + 1;
    const beats = Math.floor(t % 4) + 1;
    const ticks = Math.floor((t % 1) * 100);
    return `${bars}.${beats}.${ticks.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header / Transport */}
      <div className="border-b border-[#1F1F1F] bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ec4899]/10 flex items-center justify-center">
                <Mic size={20} className="text-[#ec4899]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamStudio</h1>
                <p className="text-[10px] text-[#6B7280]">Cloud Recording Studio · BlackDiamond Records</p>
              </div>
            </div>

            {/* Transport Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleRecord}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#1F1F1F] text-red-400 hover:bg-red-500/20'}`}
              >
                <Circle size={18} />
              </button>
              <button onClick={stop} className="w-10 h-10 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#6B7280] hover:text-white transition-colors">
                <Square size={16} />
              </button>
              <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-[#7096D1] hover:bg-[#5a7fc0] flex items-center justify-center text-white transition-colors">
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>
              <div className="bg-black border border-[#1F1F1F] rounded-lg px-4 py-2 text-center min-w-[100px]">
                <p className="text-lg font-mono font-bold">{formatTime(currentTime)}</p>
              </div>
              <div className="flex items-center gap-2 bg-black border border-[#1F1F1F] rounded-lg px-3 py-2">
                <span className="text-[10px] text-[#6B7280]">BPM</span>
                <input
                  type="number"
                  value={bpm}
                  onChange={e => setBpm(Number(e.target.value))}
                  className="w-12 bg-transparent text-sm font-bold text-center outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={saveProject} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F1F] rounded-lg text-xs hover:bg-[#2A2A2A] transition-colors">
                <Save size={12} />
                {saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : 'Save'}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F1F] rounded-lg text-xs hover:bg-[#2A2A2A] transition-colors">
                <Download size={12} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Ruler */}
      <div className="border-b border-[#1F1F1F] bg-black">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center h-8 ml-[220px]">
            {Array.from({ length: 17 }, (_, i) => (
              <div key={i} className="flex-1 border-l border-[#1F1F1F] pl-1">
                <span className="text-[9px] text-[#6B7280]">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-4 py-2 space-y-1">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`flex items-center gap-0 rounded-lg border transition-colors ${
                selectedTrack === track.id ? 'border-[#7096D1]/50 bg-[#7096D1]/5' : 'border-transparent hover:bg-white/[0.02]'
              }`}
            >
              {/* Track Header */}
              <div className="w-[220px] shrink-0 p-2 bg-[#0A0A0A] rounded-l-lg">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: track.color }} />
                  <span className="text-xs font-medium truncate flex-1">{track.name}</span>
                  <button onClick={(e) => { e.stopPropagation(); toggleMute(track.id); }} className={`p-1 rounded ${track.muted ? 'bg-red-500/20 text-red-400' : 'text-[#6B7280] hover:text-white'}`}>
                    <Volume2 size={10} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleSolo(track.id); }} className={`p-1 rounded ${track.solo ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'text-[#6B7280] hover:text-white'}`}>
                    <Headphones size={10} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteTrack(track.id); }} className="p-1 rounded text-[#6B7280] hover:text-red-400">
                    <Trash2 size={10} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={track.volume}
                    onChange={e => setVolume(track.id, Number(e.target.value))}
                    onClick={e => e.stopPropagation()}
                    className="flex-1 h-1 accent-[#7096D1]"
                  />
                  <span className="text-[9px] text-[#6B7280] w-6 text-right">{track.volume}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex-1 relative h-16 bg-black/50 rounded-r-lg overflow-hidden">
                {/* Beat grid */}
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div key={i} className="flex-1 border-r border-[#1F1F1F]/30" />
                  ))}
                </div>

                {/* Playhead */}
                {isPlaying && (
                  <div
                    className="absolute top-0 bottom-0 w-px bg-[#7096D1] z-20"
                    style={{ left: `${(currentTime / 64) * 100}%` }}
                  >
                    <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-[#7096D1] rotate-45" />
                  </div>
                )}

                {/* Clips */}
                {track.clips.map(clip => (
                  <div
                    key={clip.id}
                    className="absolute top-1 bottom-1 rounded border border-white/10 flex items-center px-2 text-[10px] font-medium overflow-hidden cursor-pointer hover:border-white/30 transition-colors"
                    style={{
                      left: `${(clip.start / 64) * 100}%`,
                      width: `${(clip.length / 64) * 100}%`,
                      backgroundColor: clip.color,
                    }}
                  >
                    {clip.name}
                  </div>
                ))}

                {/* Waveform (for armed track) */}
                {track.armed && (
                  <div className="absolute inset-0 flex items-center px-2 opacity-30">
                    <WaveformVis color={track.color} active={isPlaying} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Add Track */}
          <button
            onClick={addTrack}
            className="w-full py-3 border-2 border-dashed border-[#1F1F1F] rounded-lg text-[#6B7280] hover:text-white hover:border-[#2A2A2A] flex items-center justify-center gap-2 text-xs transition-colors"
          >
            <Plus size={14} />
            Add Track
          </button>
        </div>
      </div>

      {/* Bottom Panel: Effects / Mixer */}
      <div className="border-t border-[#1F1F1F] bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowEffects(!showEffects)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${showEffects ? 'text-[#7096D1]' : 'text-[#6B7280] hover:text-white'}`}>
                <Wand2 size={12} />
                Master Effects
              </button>
              <span className="text-xs text-[#6B7280]">|</span>
              <span className="text-xs text-[#6B7280]">{tracks.length} Tracks</span>
              <span className="text-xs text-[#6B7280]">{tracks.filter(t => t.type === 'audio').length} Audio</span>
              <span className="text-xs text-[#6B7280]">{tracks.filter(t => t.type === 'midi').length} MIDI</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] bg-[#1F1F1F] rounded-lg text-[#6B7280] hover:text-white">
                <Share2 size={10} />
                Share
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] bg-[#ec4899]/10 rounded-lg text-[#ec4899]">
                <Music size={10} />
                Publish to JamMusic
              </button>
            </div>
          </div>

          {showEffects && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MASTER_EFFECTS.map(fx => (
                <div key={fx.name} className="bg-black border border-[#1F1F1F] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">{fx.name}</span>
                    <button className={`w-6 h-3 rounded-full transition-colors ${fx.active ? 'bg-emerald-500' : 'bg-[#1F1F1F]'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white shadow transition-transform ${fx.active ? 'translate-x-3' : ''}`} />
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {fx.params.map(p => (
                      <div key={p.label}>
                        <div className="flex justify-between text-[9px] text-[#6B7280] mb-0.5">
                          <span>{p.label}</span>
                          <span>{p.value}%</span>
                        </div>
                        <div className="h-1 bg-[#1F1F1F] rounded-full overflow-hidden">
                          <div className="h-full bg-[#7096D1] rounded-full" style={{ width: `${p.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
