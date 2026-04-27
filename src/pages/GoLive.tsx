/* ═══════════════════════════════════════════════════════════
   GoLive — JamDAVE™ Live Streaming
   RTMP Ingest · HLS Playback · Viewer Analytics
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef } from 'react';
import {
  Radio, Play, Square, Copy, Check, Eye, Users, Video, Settings,
  Clock, ChevronRight, AlertTriangle, RefreshCw, Globe, Lock,
  DollarSign, MessageSquare, Trash2, ExternalLink
} from 'lucide-react';
import { trpc } from '@/providers/trpc';

interface Stream {
  id: number;
  title: string;
  description: string | null;
  status: 'idle' | 'live' | 'ended' | 'error';
  streamKey: string;
  rtmpIngestUrl: string;
  hlsPlaybackUrl: string | null;
  webrtcPlaybackUrl: string | null;
  currentViewers: number;
  totalViewers: number;
  peakViewers: number;
  chatEnabled: boolean;
  recordingEnabled: boolean;
  monetizationType: string;
  category: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
  createdAt: Date;
}

export default function GoLive() {
  const [activeTab, setActiveTab] = useState<'streams' | 'create' | 'settings'>('streams');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewerSim, setViewerSim] = useState(0);
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    category: '',
    chatEnabled: true,
    recordingEnabled: true,
    monetizationType: 'free' as string,
  });

  /* tRPC queries/mutations */
  const myStreamsQuery = trpc.stream.myStreams.useQuery({ limit: 20 });
  const createStream = trpc.stream.create.useMutation({
    onSuccess: () => {
      myStreamsQuery.refetch();
      setActiveTab('streams');
      setCreateForm({ title: '', description: '', category: '', chatEnabled: true, recordingEnabled: true, monetizationType: 'free' });
    },
  });
  const goLiveMutation = trpc.stream.goLive.useMutation({
    onSuccess: () => myStreamsQuery.refetch(),
  });
  const endStreamMutation = trpc.stream.endStream.useMutation({
    onSuccess: () => myStreamsQuery.refetch(),
  });
  const deleteStream = trpc.stream.delete.useMutation({
    onSuccess: () => myStreamsQuery.refetch(),
  });

  const streams: Stream[] = (myStreamsQuery.data || []).map((s: any) => ({
    ...s,
    startedAt: s.startedAt ? new Date(s.startedAt) : null,
    endedAt: s.endedAt ? new Date(s.endedAt) : null,
    createdAt: new Date(s.createdAt),
  }));

  const liveStream = streams.find(s => s.status === 'live');

  /* Simulate viewer count changes for live stream */
  useEffect(() => {
    if (!liveStream) { setViewerSim(0); return; }
    setViewerSim(liveStream.currentViewers);
    const interval = setInterval(() => {
      setViewerSim(prev => {
        const change = Math.floor(Math.random() * 10) - 3;
        return Math.max(0, prev + change);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [liveStream?.id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreate = () => {
    if (!createForm.title.trim()) return;
    createStream.mutate({
      title: createForm.title,
      description: createForm.description || undefined,
      category: createForm.category || undefined,
      chatEnabled: createForm.chatEnabled,
      recordingEnabled: createForm.recordingEnabled,
      monetizationType: createForm.monetizationType as any,
    });
  };

  const formatDuration = (start: Date | null, end?: Date | null) => {
    if (!start) return '00:00:00';
    const endTime = end || new Date();
    const diff = Math.floor((endTime.getTime() - start.getTime()) / 1000);
    const h = Math.floor(diff / 3600).toString().padStart(2, '0');
    const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
    const s = (diff % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Radio size={20} className="text-red-500" />
              </div>
              <div>
                <h1 className="text-lg font-bold">GoLive</h1>
                <p className="text-[10px] text-[#6B7280]">JamDAVE™ Engine · Live Stream DAW Sessions · RTMP/HLS/WebRTC</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {liveStream && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-medium text-red-400">LIVE</span>
                  <span className="text-[10px] text-[#6B7280]">{formatDuration(liveStream.startedAt)}</span>
                </div>
              )}
              {['streams', 'create', 'settings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === tab ? 'bg-[#C9A03F] text-black' : 'bg-[#1F1F1F] text-[#6B7280] hover:text-white'
                  }`}
                >
                  {tab === 'streams' && 'My Streams'}
                  {tab === 'create' && 'Create Stream'}
                  {tab === 'settings' && 'Encoder Settings'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* LIVE NOW Banner */}
        {liveStream && (
          <div className="mb-6 bg-[#0A0A0A] border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-bold text-red-400">STREAMING NOW</span>
                </div>
                <h2 className="text-xl font-bold mb-1">{liveStream.title}</h2>
                <p className="text-sm text-[#6B7280] mb-4">{liveStream.description || 'No description'}</p>
                <div className="flex items-center gap-6 text-xs">
                  <span className="flex items-center gap-1.5"><Eye size={14} className="text-red-400" />{viewerSim} watching now</span>
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-[#7096D1]" />{liveStream.totalViewers} total</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#C9A03F]" />{formatDuration(liveStream.startedAt)} elapsed</span>
                  <span className="flex items-center gap-1.5"><MessageSquare size={14} className="text-emerald-400" />{liveStream.chatEnabled ? 'Chat on' : 'Chat off'}</span>
                </div>
              </div>
              <button
                onClick={() => endStreamMutation.mutate({ streamId: liveStream.id })}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
              >
                <Square size={16} /> End Stream
              </button>
            </div>

            {/* Playback URLs */}
            <div className="mt-4 pt-4 border-t border-[#1F1F1F] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">HLS Playback URL</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-xs text-emerald-400 truncate">{liveStream.hlsPlaybackUrl}</code>
                  <button onClick={() => copyToClipboard(liveStream.hlsPlaybackUrl || '')} className="p-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">WebRTC Playback URL</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-xs text-[#7096D1] truncate">{liveStream.webrtcPlaybackUrl || 'Not configured'}</code>
                  <button onClick={() => liveStream.webrtcPlaybackUrl && copyToClipboard(liveStream.webrtcPlaybackUrl)} className="p-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Streams List */}
        {activeTab === 'streams' && (
          <div className="space-y-4">
            {myStreamsQuery.isLoading && (
              <div className="text-center py-12 text-[#6B7280]"><RefreshCw size={24} className="mx-auto animate-spin mb-2" />Loading streams...</div>
            )}
            {!myStreamsQuery.isLoading && streams.length === 0 && (
              <div className="text-center py-16 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl">
                <Radio size={48} className="mx-auto text-[#1F1F1F] mb-4" />
                <p className="text-lg font-medium mb-1">No streams yet</p>
                <p className="text-sm text-[#6B7280] mb-4">Create your first stream and go live</p>
                <button onClick={() => setActiveTab('create')} className="px-6 py-2 bg-[#C9A03F] text-black rounded-lg text-sm font-bold">Create Stream</button>
              </div>
            )}
            {streams.map(stream => (
              <div key={stream.id} className={`bg-[#0A0A0A] border rounded-xl p-5 ${stream.status === 'live' ? 'border-red-500/30' : 'border-[#1F1F1F]'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {stream.status === 'live' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                      {stream.status === 'idle' && <span className="w-2 h-2 rounded-full bg-[#6B7280]" />}
                      {stream.status === 'ended' && <span className="w-2 h-2 rounded-full bg-[#7096D1]" />}
                      <h3 className="font-medium">{stream.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        stream.status === 'live' ? 'bg-red-500/10 text-red-400' :
                        stream.status === 'idle' ? 'bg-[#1F1F1F] text-[#6B7280]' :
                        'bg-[#7096D1]/10 text-[#7096D1]'
                      }`}>{stream.status.toUpperCase()}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] mb-2">{stream.description || 'No description'}</p>
                    <div className="flex items-center gap-4 text-[10px] text-[#6B7280]">
                      <span className="flex items-center gap-1"><Video size={10} />{stream.category || 'Uncategorized'}</span>
                      <span className="flex items-center gap-1"><Eye size={10} />{stream.totalViewers} views</span>
                      <span className="flex items-center gap-1"><Users size={10} />Peak: {stream.peakViewers}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{stream.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {stream.status === 'idle' && (
                      <button
                        onClick={() => goLiveMutation.mutate({ streamId: stream.id })}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Play size={14} /> Go Live
                      </button>
                    )}
                    {stream.status === 'live' && (
                      <button
                        onClick={() => endStreamMutation.mutate({ streamId: stream.id })}
                        className="px-4 py-2 bg-[#1F1F1F] hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Square size={14} /> End
                      </button>
                    )}
                    <button
                      onClick={() => { if (confirm('Delete this stream?')) deleteStream.mutate({ streamId: stream.id }); }}
                      className="p-2 text-[#6B7280] hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Stream details expanded */}
                {stream.status === 'idle' && (
                  <div className="mt-3 pt-3 border-t border-[#1F1F1F]">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#6B7280]">RTMP URL:</span>
                      <code className="text-[10px] bg-black border border-[#1F1F1F] rounded px-2 py-1 text-[#C9A03F] truncate max-w-md">{stream.rtmpIngestUrl}</code>
                      <button onClick={() => copyToClipboard(stream.rtmpIngestUrl)} className="text-[#6B7280] hover:text-white"><Copy size={10} /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Create Stream Form */}
        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-1">Create New Stream</h2>
            <p className="text-sm text-[#6B7280] mb-6">Set up your stream configuration and get your RTMP key</p>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Stream Title *</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={e => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="My Awesome Live Stream"
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C9A03F] placeholder-[#6B7280]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Description</label>
                <textarea
                  value={createForm.description}
                  onChange={e => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What is your stream about?"
                  rows={3}
                  className="w-full bg-black border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C9A03F] placeholder-[#6B7280] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Category</label>
                  <select
                    value={createForm.category}
                    onChange={e => setCreateForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#C9A03F]"
                  >
                    <option value="">Select category...</option>
                    <option>Music</option><option>Gaming</option><option>Education</option>
                    <option>Technology</option><option>Business</option><option>Entertainment</option>
                    <option>Health</option><option>News</option><option>Community</option>
                    <option>Sports</option><option>Creative</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Monetization</label>
                  <select
                    value={createForm.monetizationType}
                    onChange={e => setCreateForm(prev => ({ ...prev, monetizationType: e.target.value }))}
                    className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-3 text-sm outline-none focus:border-[#C9A03F]"
                  >
                    <option value="free">Free — Open to all</option>
                    <option value="subscriber_only">Subscribers Only</option>
                    <option value="pay_per_view">Pay Per View</option>
                    <option value="donation">Donations Enabled</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.chatEnabled}
                    onChange={e => setCreateForm(prev => ({ ...prev, chatEnabled: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#1F1F1F] accent-[#C9A03F]"
                  />
                  <MessageSquare size={14} className="text-[#6B7280]" /> Enable Chat
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.recordingEnabled}
                    onChange={e => setCreateForm(prev => ({ ...prev, recordingEnabled: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#1F1F1F] accent-[#C9A03F]"
                  />
                  <Video size={14} className="text-[#6B7280]" /> Record Stream
                </label>
              </div>

              <div className="pt-4 border-t border-[#1F1F1F]">
                <button
                  onClick={handleCreate}
                  disabled={!createForm.title.trim() || createStream.isPending}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  {createStream.isPending ? <RefreshCw size={16} className="animate-spin" /> : <Radio size={16} />}
                  Create Stream & Get RTMP Key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Encoder Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* RTMP Config */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><Settings size={18} /> Encoder Configuration</h2>
              <p className="text-sm text-[#6B7280] mb-4">Use these settings in OBS, Streamlabs, or any RTMP encoder</p>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">RTMP Server URL</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-black border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm text-[#C9A03F]">rtmp://live.jamzia.tv:1935/live</code>
                    <button onClick={() => copyToClipboard('rtmp://live.jamzia.tv:1935/live')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                {liveStream && (
                  <div>
                    <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Stream Key</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-black border border-[#1F1F1F] rounded-lg px-4 py-3 text-sm text-red-400">
                        {showKey ? liveStream.streamKey : '••••••••••••••••••••••••••'}
                      </code>
                      <button onClick={() => setShowKey(!showKey)} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors text-[#6B7280]">
                        {showKey ? <Lock size={16} /> : <Eye size={16} />}
                      </button>
                      <button onClick={() => copyToClipboard(liveStream.streamKey)} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recommended Settings */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Recommended Encoder Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Video Bitrate', value: '4,500 - 6,000 kbps', note: 'For 1080p60' },
                  { label: 'Audio Bitrate', value: '160 kbps', note: 'AAC, 48kHz' },
                  { label: 'Keyframe Interval', value: '2 seconds', note: 'Required for HLS' },
                  { label: 'Resolution', value: '1920x1080', note: '1080p recommended' },
                  { label: 'FPS', value: '60 or 30', note: 'Match your content' },
                  { label: 'Encoder', value: 'x264 / NVENC', note: 'Hardware preferred' },
                ].map(s => (
                  <div key={s.label} className="bg-black border border-[#1F1F1F] rounded-xl p-4">
                    <p className="text-[10px] text-[#6B7280] uppercase mb-1">{s.label}</p>
                    <p className="text-sm font-bold">{s.value}</p>
                    <p className="text-[10px] text-[#6B7280]">{s.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Info */}
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6">
              <h2 className="text-sm font-bold mb-3">JamDAVE™ Live DAW Pipeline</h2>
              <div className="flex items-center gap-2 text-xs text-[#6B7280] overflow-x-auto">
                <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded">OBS / Encoder</span>
                <ChevronRight size={12} />
                <span className="px-2 py-1 bg-[#C9A03F]/10 text-[#C9A03F] rounded">RTMP Ingest</span>
                <ChevronRight size={12} />
                <span className="px-2 py-1 bg-[#a855f7]/10 text-[#a855f7] rounded">Transmux</span>
                <ChevronRight size={12} />
                <span className="px-2 py-1 bg-[#7096D1]/10 text-[#7096D1] rounded">HLS Segments</span>
                <ChevronRight size={12} />
                <span className="px-2 py-1 bg-[#ec4899]/10 text-[#ec4899] rounded">CDN Edge</span>
                <ChevronRight size={12} />
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">Viewers</span>
              </div>
              <p className="text-[10px] text-[#6B7280] mt-2">
                Your stream flows from encoder → RTMP ingest server → transmux to HLS → CDN global edge → viewers.
                Latency target: 3-5 seconds. Recordings are stored automatically in JamDAVE™ JamDAVE™ decentralized storage.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
