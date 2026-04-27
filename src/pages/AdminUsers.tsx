import { useState } from 'react';
import {
  Search, Shield, CheckCircle,
  TrendingUp, Users,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  tier: 'Entry' | 'Pro' | 'Master' | 'Prime' | 'Network';
  status: 'active' | 'suspended' | 'pending';
  joined: string;
  lastActive: string;
  platforms: number;
  revenue: number;
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', tier: 'Prime', status: 'active', joined: '2024-01-15', lastActive: '2 min ago', platforms: 8, revenue: 2840 },
  { id: '2', name: 'Marcus Davis', email: 'marcus@example.com', tier: 'Master', status: 'active', joined: '2024-02-20', lastActive: '5 min ago', platforms: 5, revenue: 1200 },
  { id: '3', name: 'Elena Rodriguez', email: 'elena@example.com', tier: 'Network', status: 'active', joined: '2023-11-08', lastActive: '1 hr ago', platforms: 12, revenue: 8500 },
  { id: '4', name: 'James Wilson', email: 'james@example.com', tier: 'Pro', status: 'suspended', joined: '2024-03-10', lastActive: '3 days ago', platforms: 2, revenue: 150 },
  { id: '5', name: 'Aisha Patel', email: 'aisha@example.com', tier: 'Entry', status: 'active', joined: '2024-04-01', lastActive: '12 min ago', platforms: 1, revenue: 0 },
  { id: '6', name: 'David Kim', email: 'david@example.com', tier: 'Prime', status: 'active', joined: '2023-09-22', lastActive: '45 min ago', platforms: 9, revenue: 4200 },
  { id: '7', name: 'Lisa Thompson', email: 'lisa@example.com', tier: 'Master', status: 'pending', joined: '2024-04-20', lastActive: 'Never', platforms: 0, revenue: 0 },
  { id: '8', name: 'Robert Brown', email: 'robert@example.com', tier: 'Pro', status: 'active', joined: '2024-01-30', lastActive: '2 hr ago', platforms: 3, revenue: 890 },
];

const TIER_COLORS: Record<string, string> = {
  Entry: 'bg-white/[0.04] text-[#6B7280]',
  Pro: 'bg-[#7096D1]/10 text-[#7096D1]',
  Master: 'bg-amber-500/10 text-amber-400',
  Prime: 'bg-purple-500/10 text-purple-400',
  Network: 'bg-emerald-500/10 text-emerald-400',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-400',
  suspended: 'bg-red-500/10 text-red-400',
  pending: 'bg-amber-500/10 text-amber-400',
};

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = MOCK_USERS.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'All' || u.tier === tierFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const stats = {
    total: MOCK_USERS.length,
    active: MOCK_USERS.filter((u) => u.status === 'active').length,
    prime: MOCK_USERS.filter((u) => u.tier === 'Prime' || u.tier === 'Network').length,
    revenue: MOCK_USERS.reduce((sum, u) => sum + u.revenue, 0),
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Users</h1>
          <p className="text-xs text-[#6B7280]">Manage accounts, tiers, and permissions</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#081F5C] to-[#7096D1] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer">
          + Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} className="text-[#7096D1]" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Total</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={14} className="text-emerald-400" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Active</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-purple-400" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Premium</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.prime}</p>
        </div>
        <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={14} className="text-amber-400" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Revenue</span>
          </div>
          <p className="text-xl font-bold text-white">${stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0F1E] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#6B7280] focus:border-[#7096D1]/50 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-[#0A0F1E] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white focus:border-[#7096D1]/50 focus:outline-none appearance-none"
          >
            <option value="All">All Tiers</option>
            <option value="Entry">Entry</option>
            <option value="Pro">Pro</option>
            <option value="Master">Master</option>
            <option value="Prime">Prime</option>
            <option value="Network">Network</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0A0F1E] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white focus:border-[#7096D1]/50 focus:outline-none appearance-none"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-[10px] text-[#6B7280] uppercase tracking-wider font-medium px-4 py-3">User</th>
                <th className="text-left text-[10px] text-[#6B7280] uppercase tracking-wider font-medium px-4 py-3">Tier</th>
                <th className="text-left text-[10px] text-[#6B7280] uppercase tracking-wider font-medium px-4 py-3">Status</th>
                <th className="text-left text-[10px] text-[#6B7280] uppercase tracking-wider font-medium px-4 py-3 hidden sm:table-cell">Joined</th>
                <th className="text-left text-[10px] text-[#6B7280] uppercase tracking-wider font-medium px-4 py-3 hidden md:table-cell">Last Active</th>
                <th className="text-right text-[10px] text-[#6B7280] uppercase tracking-wider font-medium px-4 py-3">Platforms</th>
                <th className="text-right text-[10px] text-[#6B7280] uppercase tracking-wider font-medium px-4 py-3">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-bold text-white">{user.name.split(' ').map((n) => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">{user.name}</p>
                        <p className="text-[10px] text-[#6B7280]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${TIER_COLORS[user.tier]}`}>{user.tier}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[user.status]}`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-[#A0AEC0]">{user.joined}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-[#A0AEC0]">{user.lastActive}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs text-white">{user.platforms}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs text-white">${user.revenue.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-[#6B7280]">
            <Users size={24} className="mx-auto mb-2 opacity-30" />
            <p className="text-xs">No users match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
