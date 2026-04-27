/* ═══════════════════════════════════════════════════════════
   UploadStudio — UGC Upload with Drag-Drop + Progress
   JamDAVE™ Digital Audio/Video Engine · Decentralized Storage
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState, useRef, useCallback } from 'react';
import { Upload, X, FileVideo, FileAudio, Image, File, Check, AlertTriangle, Loader, ChevronRight } from 'lucide-react';

interface UploadFile {
  id: string;
  file: File;
  title: string;
  type: 'video' | 'audio' | 'image';
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'done' | 'error';
  error?: string;
}

export default function UploadStudio() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [visibility, setVisibility] = useState<'public' | 'unlisted' | 'private'>('public');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const getType = (f: File): 'video' | 'audio' | 'image' => {
    if (f.type.startsWith('video')) return 'video';
    if (f.type.startsWith('audio')) return 'audio';
    return 'image';
  };

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadFile[] = Array.from(fileList).map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      title: f.name.replace(/\.[^/.]+$/, ''),
      type: getType(f),
      progress: 0,
      status: 'pending',
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  const startUpload = (id: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id !== id) return f;
      /* Simulate upload */
      simulateUpload(id);
      return { ...f, status: 'uploading' as const };
    }));
  };

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f =>
          f.id === id ? { ...f, progress: 100, status: 'processing' as const } : f
        ));
        setTimeout(() => {
          setFiles(prev => prev.map(f =>
            f.id === id ? { ...f, status: 'done' as const } : f
          ));
        }, 2000);
      } else {
        setFiles(prev => prev.map(f =>
          f.id === id ? { ...f, progress } : f
        ));
      }
    }, 300);
  };

  const startAll = () => files.filter(f => f.status === 'pending').forEach(f => startUpload(f.id));

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C9A03F]/10 flex items-center justify-center"><Upload size={20} className="text-[#C9A03F]" /></div>
            <div><h1 className="text-lg font-bold">UploadStudio</h1><p className="text-[10px] text-[#6B7280]">JamDAVE™ Engine · Pro Tools · Studio One · Logic · Decentralized Storage</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Drop Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-[#C9A03F] bg-[#C9A03F]/5' : 'border-[#1F1F1F] hover:border-[#2A2A2A]'
          }`}
        >
          <input ref={inputRef} type="file" multiple accept="video/*,audio/*,image/*" className="hidden" onChange={e => handleFiles(e.target.files)} />
          <Upload size={48} className={`mx-auto mb-4 ${isDragging ? 'text-[#C9A03F]' : 'text-[#1F1F1F]'}`} />
          <p className="text-lg font-medium mb-1">Drag & drop files here</p>
          <p className="text-sm text-[#6B7280]">or click to browse · Video, Audio, Image · Pro Tools / Studio One / Logic project imports · up to 100GB</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1"><FileVideo size={12} />MP4, MOV, MKV</span>
            <span className="flex items-center gap-1"><FileAudio size={12} />MP3, WAV, AAC · Pro Tools Sessions · Studio One Projects · Logic Projects</span>
            <span className="flex items-center gap-1"><Image size={12} />JPG, PNG, WEBP</span>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{files.length} file{files.length > 1 ? 's' : ''} ready</h3>
              <button onClick={startAll} className="px-4 py-2 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black rounded-lg text-xs font-bold transition-colors">Upload All</button>
            </div>

            {files.map(f => (
              <div key={f.id} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  {f.type === 'video' ? <FileVideo size={20} className="text-[#ef4444]" /> :
                   f.type === 'audio' ? <FileAudio size={20} className="text-[#C9A03F]" /> :
                   <Image size={20} className="text-[#22c55e]" />}
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={f.title}
                      onChange={e => setFiles(prev => prev.map(p => p.id === f.id ? { ...p, title: e.target.value } : p))}
                      className="w-full bg-transparent text-sm font-medium outline-none border-b border-transparent focus:border-[#C9A03F] pb-0.5"
                    />
                    <p className="text-[10px] text-[#6B7280]">{(f.file.size / (1024 * 1024)).toFixed(1)} MB · {f.type}</p>
                  </div>
                  <button onClick={() => removeFile(f.id)} className="p-1 text-[#6B7280] hover:text-red-400"><X size={14} /></button>
                </div>

                {/* Progress */}
                {f.status !== 'pending' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className={f.status === 'done' ? 'text-emerald-400' : f.status === 'error' ? 'text-red-400' : 'text-[#C9A03F]'}>
                        {f.status === 'uploading' && <Loader size={10} className="inline animate-spin mr-1" />}
                        {f.status === 'processing' && <Loader size={10} className="inline animate-spin mr-1" />}
                        {f.status === 'done' && <Check size={10} className="inline mr-1" />}
                        {f.status === 'error' && <AlertTriangle size={10} className="inline mr-1" />}
                        {f.status === 'uploading' ? `Uploading ${f.progress.toFixed(0)}%` :
                         f.status === 'processing' ? 'Processing ABR variants...' :
                         f.status === 'done' ? 'Ready for playback' : f.error}
                      </span>
                      {f.status === 'done' && <ChevronRight size={12} className="text-[#6B7280]" />}
                    </div>
                    <div className="h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${f.status === 'done' ? 'bg-emerald-500' : f.status === 'error' ? 'bg-red-500' : 'bg-[#C9A03F]'}`} style={{ width: `${f.progress}%` }} />
                    </div>
                  </div>
                )}

                {f.status === 'pending' && (
                  <button onClick={() => startUpload(f.id)} className="mt-2 px-3 py-1 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg text-xs text-[#C9A03F]">Start Upload</button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Upload Settings */}
        {files.length > 0 && (
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <h3 className="text-sm font-medium mb-3">Upload Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Visibility</label>
                <select value={visibility} onChange={e => setVisibility(e.target.value as any)} className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F]">
                  <option value="public">Public — Anyone can view</option>
                  <option value="unlisted">Unlisted — Link only</option>
                  <option value="private">Private — Only you</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F]">
                  <option value="">Select...</option>
                  <option>Music</option><option>Gaming</option><option>Education</option>
                  <option>Technology</option><option>Business</option><option>Entertainment</option>
                  <option>Health</option><option>News</option><option>Community</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Tags (comma separated)</label>
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="jamzia, tutorial, live" className="w-full bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C9A03F] placeholder-[#6B7280]" />
              </div>
            </div>
          </div>
        )}

        {/* Pipeline Info */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
          <h3 className="text-sm font-medium mb-3">JamDAVE™ DAW Upload Pipeline</h3>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] overflow-x-auto">
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">Client</span>
            <ChevronRight size={12} />
            <span className="px-2 py-1 bg-[#C9A03F]/10 text-[#C9A03F] rounded">Presigned URL</span>
            <ChevronRight size={12} />
            <span className="px-2 py-1 bg-[#7096D1]/10 text-[#7096D1] rounded">Multipart PUT</span>
            <ChevronRight size={12} />
            <span className="px-2 py-1 bg-[#a855f7]/10 text-[#a855f7] rounded">JamDAVE™ Storage Node</span>
            <ChevronRight size={12} />
            <span className="px-2 py-1 bg-[#ec4899]/10 text-[#ec4899] rounded">ABR Transcode</span>
            <ChevronRight size={12} />
            <span className="px-2 py-1 bg-[#22c55e]/10 text-emerald-400 rounded">HLS/DASH Ready</span>
          </div>
          <p className="text-[10px] text-[#6B7280] mt-2">Files are uploaded directly to JamDAVE™ decentralized infrastructure via presigned URLs. No file data passes through JamZia servers. After upload, adaptive bitrate variants are generated automatically.</p>
        </div>
      </div>
    </div>
  );
}
