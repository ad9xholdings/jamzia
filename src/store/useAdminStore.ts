import { create } from 'zustand';

export interface AdminUser {
  id: string;
  name: string;
  handle: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'pending';
  joinedAt: string;
  lastActive: string;
  posts: number;
  followers: number;
  avatar: string;
}

export interface ModerationItem {
  id: string;
  type: 'post' | 'user' | 'comment';
  content: string;
  author: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reportedAt: string;
  reports: number;
}

export interface AnalyticsData {
  date: string;
  users: number;
  posts: number;
  engagements: number;
  revenue: number;
}

const MOCK_ADMIN_USERS: AdminUser[] = [
  { id: 'u1', name: 'JamZia Official', handle: 'jamzia', email: 'admin@jamzia.app', role: 'admin', status: 'active', joinedAt: '2024-01-15', lastActive: '2026-04-20T10:00:00Z', posts: 256, followers: 12500, avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=jamzia' },
  { id: 'u2', name: 'Elara Chen', handle: 'elara', email: 'elara@email.com', role: 'user', status: 'active', joinedAt: '2024-03-20', lastActive: '2026-04-20T09:30:00Z', posts: 189, followers: 3400, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elara' },
  { id: 'u3', name: 'Marcus Webb', handle: 'marcus', email: 'marcus@email.com', role: 'moderator', status: 'active', joinedAt: '2024-02-10', lastActive: '2026-04-20T08:45:00Z', posts: 312, followers: 5600, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus' },
  { id: 'u4', name: 'Nova AI Labs', handle: 'nova', email: 'nova@ailabs.com', role: 'user', status: 'active', joinedAt: '2024-04-01', lastActive: '2026-04-19T22:00:00Z', posts: 98, followers: 8900, avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=nova' },
  { id: 'u5', name: 'Kai Nakamura', handle: 'kai', email: 'kai@email.com', role: 'user', status: 'active', joinedAt: '2024-05-15', lastActive: '2026-04-20T07:15:00Z', posts: 445, followers: 2100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kai' },
  { id: 'u6', name: 'Zara Okafor', handle: 'zara', email: 'zara@email.com', role: 'user', status: 'suspended', joinedAt: '2024-06-01', lastActive: '2026-04-18T14:00:00Z', posts: 167, followers: 4500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zara' },
  { id: 'u7', name: 'Leo Santos', handle: 'leo', email: 'leo@email.com', role: 'user', status: 'active', joinedAt: '2024-06-20', lastActive: '2026-04-20T06:30:00Z', posts: 234, followers: 6700, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leo' },
  { id: 'u8', name: 'Aria Kim', handle: 'aria', email: 'aria@email.com', role: 'user', status: 'pending', joinedAt: '2024-07-10', lastActive: '2026-04-19T20:00:00Z', posts: 123, followers: 9800, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aria' },
];

const MOCK_MODERATION: ModerationItem[] = [
  { id: 'm1', type: 'post', content: 'Spam post promoting external service', author: 'u6', reason: 'Spam', status: 'pending', reportedAt: '2026-04-20T08:00:00Z', reports: 5 },
  { id: 'm2', type: 'post', content: 'Harassment in replies', author: 'u4', reason: 'Harassment', status: 'pending', reportedAt: '2026-04-20T07:30:00Z', reports: 3 },
  { id: 'm3', type: 'user', content: 'Bot account mass following', author: 'u5', reason: 'Bot activity', status: 'approved', reportedAt: '2026-04-19T15:00:00Z', reports: 12 },
  { id: 'm4', type: 'comment', content: 'Misinformation about platform', author: 'u2', reason: 'Misinformation', status: 'rejected', reportedAt: '2026-04-19T10:00:00Z', reports: 2 },
  { id: 'm5', type: 'post', content: 'Inappropriate content', author: 'u7', reason: 'Content policy', status: 'pending', reportedAt: '2026-04-20T09:00:00Z', reports: 8 },
  { id: 'm6', type: 'post', content: 'Copyright violation', author: 'u3', reason: 'Copyright', status: 'pending', reportedAt: '2026-04-20T06:00:00Z', reports: 4 },
];

const MOCK_ANALYTICS: AnalyticsData[] = [
  { date: '2026-04-14', users: 1240, posts: 856, engagements: 4200, revenue: 4200 },
  { date: '2026-04-15', users: 1180, posts: 923, engagements: 5100, revenue: 5100 },
  { date: '2026-04-16', users: 1350, posts: 789, engagements: 4800, revenue: 4800 },
  { date: '2026-04-17', users: 1420, posts: 1056, engagements: 6200, revenue: 6200 },
  { date: '2026-04-18', users: 1380, posts: 987, engagements: 5500, revenue: 5500 },
  { date: '2026-04-19', users: 1560, posts: 1123, engagements: 7100, revenue: 7100 },
  { date: '2026-04-20', users: 1620, posts: 1245, engagements: 7800, revenue: 7800 },
];

interface AdminState {
  users: AdminUser[];
  moderation: ModerationItem[];
  analytics: AnalyticsData[];
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (v: boolean) => void;
  updateUserStatus: (id: string, status: AdminUser['status']) => void;
  updateUserRole: (id: string, role: AdminUser['role']) => void;
  updateModerationStatus: (id: string, status: ModerationItem['status']) => void;
}

export const useAdminStore = create<AdminState>()((set, get) => ({
  users: MOCK_ADMIN_USERS,
  moderation: MOCK_MODERATION,
  analytics: MOCK_ANALYTICS,
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleMobileSidebar: () => set((s) => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
  setMobileSidebarOpen: (v) => set({ mobileSidebarOpen: v }),
  updateUserStatus: (id, status) => {
    set({ users: get().users.map((u) => (u.id === id ? { ...u, status } : u)) });
  },
  updateUserRole: (id, role) => {
    set({ users: get().users.map((u) => (u.id === id ? { ...u, role } : u)) });
  },
  updateModerationStatus: (id, status) => {
    set({ moderation: get().moderation.map((m) => (m.id === id ? { ...m, status } : m)) });
  },
}));
