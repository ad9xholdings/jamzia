/* ═══════════════════════════════════════════════════════════
   MediaLibrary — JamDAVE™ Asset Browser & Manager
   Playback · Delete · Visibility · UGC Feed
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import {
  HardDrive, Play, Trash2, Eye, Lock, Globe, Link2, RefreshCw,
  FileVideo, FileAudio, Image, File, Search, Filter, Grid3x3, List,
  ChevronRight, X, Check, AlertTriangle, Clock, BarChart3
} from 'lucide-react';
import { trpc } from '@/providers/trpc';

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'video' | 'audio' | 'image';
type FilterVisibility = 'all' | 'public' | 'unlisted' | 'private';

interface Asset {
  id: number;
  title: string;
  description: string | null;
  type: 'video' | 'audio' | 'image' | 'document';
  status: string;
  visibility: string;
  storageKey: string;
  sizeBytes: number | null;
  durationSeconds: number | null;
  viewCount: number | null;
  likeCount: number | null;
  createdAt: Date;
  thumbnailStorageKey: string | null;
  playbackUrl: string | null;
  category: string | null;
  isUgc: boolean | null;
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return `${m}:${s.toString().padStart(2, '0')}`;
  const h = Math.floor(m / 60);
  return `${h}:${(m % 60).toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'video': return <FileVideo size={18} className="text-[#ef4444]" />;
    case 'audio': return <FileAudio size={18} className="text-[#C9A03F]" />;
    case 'image': return <Image size={18} className="text-[#22c55e]" />;
    default: return <File size={18} className="text-[#6B7280]" />;
  }
}

export default function MediaLibrary() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterVis, setFilterVis] = useState<FilterVisibility>('all');
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [editVisibility, setEditVisibility] = useState<string | null>(null);

  const myMediaQuery = trpc.media.list.useQuery({ type: filterType, limit: 100, offset: 0 });
  const deleteMutation = trpc.media.delete.useMutation({
    onSuccess: () => { myMediaQuery.refetch(); setShowDelete(false); setSelectedAsset(null); },
  });
  const updateMutation = trpc.media.update.useMutation({
    onSuccess: () => { myMediaQuery.refetch(); setEditVisibility(null); },
  });
  const viewMutation = trpc.media.view.useMutation();

  const assets: Asset[] = (myMediaQuery.data || []).map((a: any) => ({
    ...a,
    createdAt: new Date(a.createdAt),
  }));

  const filteredAssets = assets.filter(a => {
    if (filterVis !== 'all' && a.visibility !== filterVis) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalStorage = assets.reduce((sum, a) => sum + (a.sizeBytes || 0), 0);
  const totalViews = assets.reduce((sum, a) => sum + Number(a.viewCount || 0), 0);

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
                <HardDrive size={20} className="text-[#7096D1]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Media Library</h1>
                <p className="text-[10px] text-[#6B7280]">JamDAVE™ Assets · Pro Tools · Studio One · Logic · Browse · Manage · Playback</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 px-4 py-2 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg">
                <span className="text-[10px] text-[#6B7280]"><BarChart3 size={10} className="inline mr-1" />{assets.length} files</span>
                <span className="text-[10px] text-[#6B7280]">{formatBytes(totalStorage)} used</span>
                <span className="text-[10px] text-[#6B7280]"><Eye size={10} className="inline mr-1" />{totalViews.toLocaleString()} views</span>
              </div>
              <button onClick={() => myMediaQuery.refetch()} className="p-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                <RefreshCw size={14} className={myMediaQuery.isRefetching ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Filters Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search assets..."
                className="pl-9 pr-4 py-2 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-sm outline-none focus:border-[#C9A03F] w-56 placeholder-[#6B7280]"
              />
            </div>
            {/* Type filter */}
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value as FilterType)}
              className="px-3 py-2 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-sm outline-none focus:border-[#C9A03F]"
            >
              <option value="all">All Types</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="image">Image</option>
            </select>
            {/* Visibility filter */}
            <select
              value={filterVis}
              onChange={e => setFilterVis(e.target.value as FilterVisibility)}
              className="px-3 py-2 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-sm outline-none focus:border-[#C9A03F]"
            >
              <option value="all">All Visibility</option>
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex items-center bg-[#1F1F1F] rounded-lg p-0.5">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#2A2A2A] text-white' : 'text-[#6B7280]'}`}>
              <Grid3x3 size={14} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#2A2A2A] text-white' : 'text-[#6B7280]'}`}>
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Assets Display */}
        {myMediaQuery.isLoading && (
          <div className="text-center py-16 text-[#6B7280]"><RefreshCw size={24} className="mx-auto animate-spin mb-2" />Loading assets...</div>
        )}
        {!myMediaQuery.isLoading && filteredAssets.length === 0 && (
          <div className="text-center py-16 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl">
            <HardDrive size={48} className="mx-auto text-[#1F1F1F] mb-4" />
            <p className="text-lg font-medium mb-1">No assets found</p>
            <p className="text-sm text-[#6B7280]">{search || filterVis !== 'all' || filterType !== 'all' ? 'Try adjusting your filters' : 'Upload your first file to get started'}</p>
          </div>
        )}

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                onClick={() => { setSelectedAsset(asset); viewMutation.mutate({ id: asset.id }); }}
                className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden cursor-pointer hover:border-[#C9A03F]/40 transition-colors group"
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-[#111] flex items-center justify-center relative">
                  {asset.type === 'video' && (
                    <>
                      <FileVideo size={32} className="text-[#ef4444]/30" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                        <div className="w-10 h-10 rounded-full bg-[#C9A03F] flex items-center justify-center">
                          <Play size={18} className="text-black ml-0.5" />
                        </div>
                      </div>
                      {asset.durationSeconds && (
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-[10px]">{formatDuration(asset.durationSeconds)}</span>
                      )}
                    </>
                  )}
                  {asset.type === 'audio' && <FileAudio size={32} className="text-[#C9A03F]/30" />}
                  {asset.type === 'image' && <Image size={32} className="text-[#22c55e]/30" />}
                  {asset.type === 'document' && <File size={32} className="text-[#6B7280]/30" />}
                  <div className="absolute top-2 left-2">{getTypeIcon(asset.type)}</div>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-medium truncate mb-1">{asset.title}</h3>
                  <div className="flex items-center justify-between text-[10px] text-[#6B7280]">
                    <span>{formatBytes(asset.sizeBytes)}</span>
                    <span className="flex items-center gap-1"><Eye size={10} />{Number(asset.viewCount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                      asset.visibility === 'public' ? 'bg-emerald-500/10 text-emerald-400' :
                      asset.visibility === 'private' ? 'bg-red-500/10 text-red-400' :
                      'bg-[#1F1F1F] text-[#6B7280]'
                    }`}>
                      {asset.visibility}
                    </span>
                    {asset.isUgc && <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#C9A03F]/10 text-[#C9A03F]">UGC</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1F1F1F]">
                  <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Asset</th>
                  <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Size</th>
                  <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Visibility</th>
                  <th className="text-right py-3 px-4 text-[#6B7280] font-medium">Views</th>
                  <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Date</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map(asset => (
                  <tr
                    key={asset.id}
                    onClick={() => { setSelectedAsset(asset); viewMutation.mutate({ id: asset.id }); }}
                    className="border-b border-[#1F1F1F]/50 hover:bg-[#1F1F1F]/30 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(asset.type)}
                        <span className="font-medium truncate max-w-[200px]">{asset.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize">{asset.type}</td>
                    <td className="py-3 px-4 text-[#6B7280]">{formatBytes(asset.sizeBytes)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        asset.visibility === 'public' ? 'bg-emerald-500/10 text-emerald-400' :
                        asset.visibility === 'private' ? 'bg-red-500/10 text-red-400' :
                        'bg-[#1F1F1F] text-[#6B7280]'
                      }`}>{asset.visibility}</span>
                    </td>
                    <td className="py-3 px-4 text-right">{Number(asset.viewCount || 0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-[#6B7280]">{asset.createdAt.toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <ChevronRight size={14} className="text-[#6B7280]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedAsset(null)}>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Preview area */}
            <div className="aspect-video bg-[#111] flex items-center justify-center relative rounded-t-2xl">
              {selectedAsset.type === 'video' && (
                <>
                  <FileVideo size={48} className="text-[#ef4444]/30" />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#C9A03F] flex items-center justify-center">
                      <Play size={24} className="text-black ml-1" />
                    </div>
                  </button>
                </>
              )}
              {selectedAsset.type === 'audio' && <FileAudio size={48} className="text-[#C9A03F]/30" />}
              {selectedAsset.type === 'image' && <Image size={48} className="text-[#22c55e]/30" />}
              <button onClick={() => setSelectedAsset(null)} className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80">
                <X size={14} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-lg font-bold">{selectedAsset.title}</h2>
                <p className="text-sm text-[#6B7280]">{selectedAsset.description || 'No description'}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black border border-[#1F1F1F] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-[#6B7280] mb-1">Size</p>
                  <p className="text-sm font-bold">{formatBytes(selectedAsset.sizeBytes)}</p>
                </div>
                <div className="bg-black border border-[#1F1F1F] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-[#6B7280] mb-1">Duration</p>
                  <p className="text-sm font-bold">{formatDuration(selectedAsset.durationSeconds)}</p>
                </div>
                <div className="bg-black border border-[#1F1F1F] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-[#6B7280] mb-1">Views</p>
                  <p className="text-sm font-bold">{Number(selectedAsset.viewCount || 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Visibility Editor */}
              <div>
                <label className="text-[10px] text-[#6B7280] uppercase mb-2 block">Visibility</label>
                <div className="flex items-center gap-2">
                  {['public', 'unlisted', 'private'].map(v => (
                    <button
                      key={v}
                      onClick={() => {
                        updateMutation.mutate({ id: selectedAsset.id, visibility: v as any });
                        setSelectedAsset(prev => prev ? { ...prev, visibility: v } : null);
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                        selectedAsset.visibility === v
                          ? v === 'public' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            v === 'private' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-[#C9A03F]/10 text-[#C9A03F] border border-[#C9A03F]/20'
                          : 'bg-black border border-[#1F1F1F] text-[#6B7280] hover:text-white'
                      }`}
                    >
                      {v === 'public' && <Globe size={12} />}
                      {v === 'unlisted' && <Link2 size={12} />}
                      {v === 'private' && <Lock size={12} />}
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Playback URL */}
              {selectedAsset.playbackUrl && (
                <div>
                  <label className="text-[10px] text-[#6B7280] uppercase mb-1 block">Playback URL</label>
                  <code className="block bg-black border border-[#1F1F1F] rounded-lg px-3 py-2 text-[10px] text-emerald-400 truncate">{selectedAsset.playbackUrl}</code>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowDelete(true)}
                  className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>

              {/* Confirm Delete */}
              {showDelete && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-400 mb-1">Delete this asset?</p>
                      <p className="text-xs text-[#6B7280] mb-3">This will remove the file from storage. This action cannot be undone.</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteMutation.mutate({ id: selectedAsset.id })}
                          disabled={deleteMutation.isPending}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          {deleteMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
                        </button>
                        <button
                          onClick={() => setShowDelete(false)}
                          className="px-4 py-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-lg text-xs transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
