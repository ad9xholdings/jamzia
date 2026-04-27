import { Outlet, NavLink, useLocation } from 'react-router';
import {
  LayoutDashboard, Users, Shield, BarChart3, Settings,
  ChevronRight, LogOut, Menu, X, Bell,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const ADMIN_NAV = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/moderation', label: 'Moderation', icon: Shield },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#0A0F1E] border-r border-white/[0.06] flex-col shrink-0">
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center">
              <LayoutDashboard size={18} className="text-[#F7F2EB]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Admin Panel</p>
              <p className="text-[9px] text-[#6B7280] uppercase tracking-wider">JamZia Networks</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#F7F2EB]/10 text-[#F7F2EB]'
                    : 'text-[#6B7280] hover:bg-white/[0.03] hover:text-white'
                }`
              }
            >
              <item.icon size={16} />
              <span className="flex-1">{item.label}</span>
              <ChevronRight size={12} className="text-[#6B7280] opacity-0 group-hover:opacity-100" />
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.06] space-y-3">
          <div className="bg-white/[0.02] rounded-xl p-3">
            <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">All Systems Operational</span>
            </div>
          </div>
          <a href="#/" className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-white transition-colors no-underline">
            <LogOut size={14} />
            back
          </a>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0A0F1E] border-b border-white/[0.06] flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 -ml-2 text-white cursor-pointer">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-sm font-bold text-white">Admin Panel</span>
        </div>
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-[#6B7280]" />
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#081F5C] to-[#7096D1] flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">A</span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#0A0F1E] border-r border-white/[0.06] pt-14" onClick={(e) => e.stopPropagation()}>
            <nav className="p-3 space-y-1">
              {ADMIN_NAV.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'bg-[#F7F2EB]/10 text-[#F7F2EB]' : 'text-[#6B7280]'
                    }`
                  }
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-white/[0.06]">
              <a href="#/" className="flex items-center gap-2 text-xs text-[#6B7280] no-underline">
                <LogOut size={14} /> back
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll pt-14 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
}
