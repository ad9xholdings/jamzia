import { useState } from 'react';
import {
  Shield, CheckCircle, XCircle, Eye, AlertTriangle,
  MessageSquare, Flag, Clock, ChevronRight,
} from 'lucide-react';

interface ModerationItem {
  id: string;
  type: 'post' | 'comment' | 'stream' | 'user';
  content: string;
  author: string;
  platform: string;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedAt: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'escalated';
  reporter?: string;
}

const MOCK_ITEMS: ModerationItem[] = [
  { id: '1', type: 'comment', content: 'Spam link in comment section', author: 'user_2847', platform: 'JamVideo', reason: 'Spam / Promotional', severity: 'medium', reportedAt: '2 min ago', status: 'pending', reporter: 'mod_auto' },
  { id: '2', type: 'post', content: 'Misinformation about health claims', author: 'wellness_guru', platform: 'JamWords', reason: 'Misinformation', severity: 'high', reportedAt: '8 min ago', status: 'pending', reporter: 'sarah_chen' },
  { id: '3', type: 'stream', content: 'Live stream with copyrighted music', author: 'dj_marcus', platform: 'JamLive', reason: 'Copyright', severity: 'medium', reportedAt: '15 min ago', status: 'reviewed', reporter: 'copyright_bot' },
  { id: '4', type: 'user', content: 'Harassment in direct messages', author: 'troll_account', platform: 'JamSocial', reason: 'Harassment', severity: 'critical', reportedAt: '22 min ago', status: 'escalated', reporter: 'elena_r' },
  { id: '5', type: 'comment', content: 'Offensive language in thread', author: 'anon_user', platform: 'JamNews', reason: 'Hate Speech', severity: 'high', reportedAt: '34 min ago', status: 'pending', reporter: 'community_mod' },
  { id: '6', type: 'post', content: 'Unauthorized affiliate links', author: 'deal_hunter', platform: 'JamShop', reason: 'Spam / Promotional', severity: 'low', reportedAt: '1 hr ago', status: 'resolved', reporter: 'mod_auto' },
  { id: '7', type: 'stream', content: 'Adult content flagged', author: 'streamer_x', platform: 'JamLive', reason: 'NSFW Content', severity: 'critical', reportedAt: '1 hr ago', status: 'pending', reporter: 'automated_scan' },
  { id: '8', type: 'comment', content: 'Phishing attempt in reply', author: 'support_fake', platform: 'JamTech', reason: 'Phishing', severity: 'critical', reportedAt: '2 hr ago', status: 'reviewed', reporter: 'security_bot' },
];

const SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-white/[0.04] text-[#6B7280]',
  medium: 'bg-amber-500/10 text-amber-400',
  high: 'bg-orange-500/10 text-orange-400',
  critical: 'bg-red-500/10 text-red-400',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  reviewed: 'bg-[#7096D1]/10 text-[#7096D1]',
  resolved: 'bg-emerald-500/10 text-emerald-400',
  escalated: 'bg-red-500/10 text-red-400',
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  post: <MessageSquare size={12} />,
  comment: <MessageSquare size={12} />,
  stream: <Eye size={12} />,
  user: <Flag size={12} />,
};

export default function AdminModeration() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'resolved' | 'escalated'>('all');

  const filtered = filter === 'all' ? MOCK_ITEMS : MOCK_ITEMS.filter((i) => i.status === filter);

  const stats = {
    pending: MOCK_ITEMS.filter((i) => i.status === 'pending').length,
    reviewed: MOCK_ITEMS.filter((i) => i.status === 'reviewed').length,
    resolved: MOCK_ITEMS.filter((i) => i.status === 'resolved').length,
    escalated: MOCK_ITEMS.filter((i) => i.status === 'escalated').length,
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-lg font-bold text-white">Moderation</h1>
        <p className="text-xs text-[#6B7280]">Review and resolve flagged content across all 46+ platforms</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button onClick={() => setFilter('pending')} className={`bg-[#0A0F1E] border rounded-xl p-4 text-left cursor-pointer transition-colors ${filter === 'pending' ? 'border-amber-500/30' : 'border-white/[0.06]'}`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Pending</span>
          </div>
          <p className="text-xl font-bold text-amber-400">{stats.pending}</p>
        </button>
        <button onClick={() => setFilter('reviewed')} className={`bg-[#0A0F1E] border rounded-xl p-4 text-left cursor-pointer transition-colors ${filter === 'reviewed' ? 'border-[#7096D1]/30' : 'border-white/[0.06]'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Eye size={14} className="text-[#7096D1]" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Reviewed</span>
          </div>
          <p className="text-xl font-bold text-[#7096D1]">{stats.reviewed}</p>
        </button>
        <button onClick={() => setFilter('resolved')} className={`bg-[#0A0F1E] border rounded-xl p-4 text-left cursor-pointer transition-colors ${filter === 'resolved' ? 'border-emerald-500/30' : 'border-white/[0.06]'}`}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={14} className="text-emerald-400" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Resolved</span>
          </div>
          <p className="text-xl font-bold text-emerald-400">{stats.resolved}</p>
        </button>
        <button onClick={() => setFilter('escalated')} className={`bg-[#0A0F1E] border rounded-xl p-4 text-left cursor-pointer transition-colors ${filter === 'escalated' ? 'border-red-500/30' : 'border-white/[0.06]'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={14} className="text-red-400" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Escalated</span>
          </div>
          <p className="text-xl font-bold text-red-400">{stats.escalated}</p>
        </button>
      </div>

      {/* Queue */}
      <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="p-3 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield size={14} className="text-[#7096D1]" /> Moderation Queue
          </h2>
          <span className="text-[10px] text-[#6B7280]">{filtered.length} items</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {filtered.map((item) => (
            <div key={item.id} className="p-4 hover:bg-white/[0.01] transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${SEVERITY_COLORS[item.severity].replace('text-', 'bg-').replace('bg-white/[0.04]', 'bg-white/[0.04]')}`}>
                  <span className={SEVERITY_COLORS[item.severity].split(' ')[1]}>{TYPE_ICONS[item.type]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-medium text-white">{item.content}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${SEVERITY_COLORS[item.severity]}`}>{item.severity}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${STATUS_COLORS[item.status]}`}>{item.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
                    <span>by {item.author}</span>
                    <span>on {item.platform}</span>
                    <span>reason: {item.reason}</span>
                    <span className="flex items-center gap-1"><Clock size={8} /> {item.reportedAt}</span>
                    {item.reporter && <span>reporter: {item.reporter}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-[#6B7280] hover:text-emerald-400 transition-colors cursor-pointer" title="Approve">
                    <CheckCircle size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#6B7280] hover:text-red-400 transition-colors cursor-pointer" title="Remove">
                    <XCircle size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[#7096D1]/10 text-[#6B7280] hover:text-[#7096D1] transition-colors cursor-pointer" title="View">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-[#6B7280]">
            <Shield size={24} className="mx-auto mb-2 opacity-30" />
            <p className="text-xs">No items in this queue</p>
          </div>
        )}
      </div>
    </div>
  );
}
