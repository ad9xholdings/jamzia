import { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Zap, Star, ChevronRight } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'reward';
  timestamp: number;
  read: boolean;
  action?: string;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'SkyCoins Earned',
    message: 'You earned 250 SkyIvy from completing JamLearn Module 3',
    type: 'reward',
    timestamp: Date.now() - 120000,
    read: false,
    action: 'wallet',
  },
  {
    id: 'n2',
    title: 'Course Milestone',
    message: 'Phonics Adventure — Chapter 5 unlocked on Cotton Brick Road',
    type: 'success',
    timestamp: Date.now() - 900000,
    read: false,
    action: 'battle',
  },
  {
    id: 'n3',
    title: 'Multi-Sig Alert',
    message: 'Transaction rN7n...8Fj requires your approval (2 of 3 signed)',
    type: 'warning',
    timestamp: Date.now() - 1800000,
    read: false,
    action: 'pay',
  },
  {
    id: 'n4',
    title: 'New AR Content',
    message: 'Three new AR phonics creatures available in JamMastery',
    type: 'info',
    timestamp: Date.now() - 3600000,
    read: true,
    action: 'mastery',
  },
  {
    id: 'n5',
    title: 'Network Update',
    message: 'XRPL Mainnet TPS reached 1,502 — all systems operational',
    type: 'info',
    timestamp: Date.now() - 7200000,
    read: true,
  },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleAction = (n: Notification) => {
    markRead(n.id);
    setOpen(false);
    if (n.action) {
      const routeMap: Record<string, string> = {
        wallet: '/pay',
        battle: '/battle',
        pay: '/pay',
        mastery: '/mastery',
      };
      if (routeMap[n.action]) {
        window.location.hash = routeMap[n.action];
      }
    }
  };

  const timeAgo = (ts: number) => {
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 1) return 'now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const iconForType = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={14} className="text-emerald-400" />;
      case 'warning': return <AlertTriangle size={14} className="text-amber-400" />;
      case 'reward': return <Star size={14} className="text-amber-400" />;
      default: return <Zap size={14} className="text-[#7096D1]" />;
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-white/[0.04] text-[#A0AEC0] hover:text-white transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[340px] max-w-[calc(100vw-1rem)] bg-[#0A0F1E] border border-white/[0.08] rounded-2xl shadow-2xl z-[60] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/[0.06]">
            <p className="text-sm font-semibold text-white">Notifications</p>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[10px] text-[#7096D1] hover:text-[#F7F2EB] px-2 py-1 rounded hover:bg-white/[0.04] transition-colors cursor-pointer">
                  Mark all read
                </button>
              )}
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/[0.04] text-[#6B7280] cursor-pointer">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[360px] overflow-y-auto mobile-scroll divide-y divide-white/[0.04]">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-[#6B7280]">
                <Bell size={24} className="mx-auto mb-2 opacity-30" />
                <p className="text-xs">No notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleAction(n)}
                  className={`w-full text-left p-3 hover:bg-white/[0.02] transition-colors flex gap-2.5 cursor-pointer ${!n.read ? 'bg-white/[0.01]' : ''}`}
                >
                  <div className="mt-0.5 shrink-0">{iconForType(n.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-medium truncate ${!n.read ? 'text-white' : 'text-[#A0AEC0]'}`}>{n.title}</p>
                      {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#7096D1] shrink-0" />}
                    </div>
                    <p className="text-[10px] text-[#6B7280] mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[9px] text-[#6B7280]/60 mt-1">{timeAgo(n.timestamp)}</p>
                  </div>
                  {n.action && <ChevronRight size={12} className="text-[#6B7280]/40 shrink-0 self-center" />}
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-white/[0.06] text-center">
            <a href="#/command" onClick={() => setOpen(false)} className="text-[10px] text-[#7096D1] hover:text-[#F7F2EB] no-underline">
              View Command Center →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
