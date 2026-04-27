/* ═══════════════════════════════════════════════════════════
   JamFamily — Family sharing hub
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { Users, Plus, Search, ChevronRight } from 'lucide-react';;

interface Item {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'archived';
  updated: string;
}

const INITIAL_ITEMS: Item[] = [
  { id: '1', name: 'JamFamily Item Alpha', status: 'active', updated: '2 min ago' },
  { id: '2', name: 'JamFamily Item Beta', status: 'pending', updated: '1 hr ago' },
  { id: '3', name: 'JamFamily Item Gamma', status: 'active', updated: '3 hr ago' },
  { id: '4', name: 'JamFamily Item Delta', status: 'archived', updated: '1 day ago' },
];

export default function JamFamily() {
  const [items] = useState<Item[]>(INITIAL_ITEMS);
  const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all');

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ec4899]/10 flex items-center justify-center">
                <Users size={20} className="text-[#ec4899]" />
              </div>
              <div>
                <h1 className="text-lg font-bold">JamFamily</h1>
                <p className="text-[10px] text-[#6B7280]">Family sharing hub · Collective General Technologies, LLC</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ec4899] hover:bg-[#ec4899]/80 text-black rounded-lg text-xs font-bold transition-colors">
              <Plus size={12} /> New
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: items.length.toString(), color: '#ec4899' },
            { label: 'Active', value: items.filter(i => i.status === 'active').length.toString(), color: '#22c55e' },
            { label: 'Pending', value: items.filter(i => i.status === 'pending').length.toString(), color: '#f59e0b' },
            { label: 'Archived', value: items.filter(i => i.status === 'archived').length.toString(), color: '#6B7280' },
          ].map(s => (
            <div key={s.label} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">{s.label}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'active', 'pending'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-[#ec4899] text-black' : 'bg-[#0A0A0A] text-[#6B7280] border border-[#1F1F1F]'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#1F1F1F] flex items-center gap-2">
            <Search size={14} className="text-[#6B7280]" />
            <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none flex-1 text-white placeholder-[#6B7280]" />
          </div>
          <div className="divide-y divide-[#1F1F1F]/50">
            {filtered.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-emerald-400' : item.status === 'pending' ? 'bg-[#f59e0b]' : 'bg-[#6B7280]'}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#6B7280]">{item.updated}</span>
                  <ChevronRight size={14} className="text-[#6B7280]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
