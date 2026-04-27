import { X, Rocket, Hammer, Calendar, CheckCircle, ExternalLink, Clock, Users, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useComingSoonStore } from '../stores/comingSoonStore';
import { getPlatformInfo } from '../config/platformRegistry';

export default function ComingSoonModal() {
  const { isOpen, route, close } = useComingSoonStore();
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const info = getPlatformInfo(route);
  if (!info) return null;
  
  const isLive = info.status === 'live' || info.status === 'beta';
  
  const statusConfig = {
    live: { label: 'LIVE', color: '#10B981', bg: '#10B98120' },
    beta: { label: 'BETA', color: '#F59E0B', bg: '#F59E0B20' },
    alpha: { label: 'ALPHA', color: '#F97316', bg: '#F9731620' },
    coming_soon: { label: 'COMING SOON', color: '#7096D1', bg: '#7096D120' },
    planned: { label: 'PLANNED', color: '#6B7280', bg: '#6B728020' },
  };
  
  const status = statusConfig[info.status];
  
  // Calculate days until July 4, 2026
  const deadline = new Date('2026-07-04');
  const today = new Date();
  const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={close}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className="relative p-6 pb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A03F]/10 to-[#7096D1]/10" />
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: status.bg }}
                >
                  {isLive ? (
                    <CheckCircle className="w-6 h-6" style={{ color: status.color }} />
                  ) : (
                    <Rocket className="w-6 h-6" style={{ color: status.color }} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{info.name}</h2>
                  <span 
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: status.bg, color: status.color }}
                  >
                    {status.label}
                  </span>
                </div>
              </div>
              <button 
                onClick={close}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Deadline Banner */}
            <div className="bg-gradient-to-r from-[#C9A03F]/20 to-[#7096D1]/20 border border-[#C9A03F]/20 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-[#C9A03F]" />
                <span className="text-xs font-bold text-[#C9A03F] uppercase tracking-wider">Collective General Technologies, LLC</span>
              </div>
              <p className="text-sm text-white/80">
                Delivery deadline: <span className="text-white font-bold">July 4, 2026</span>
                <span className="text-white/50 ml-2">({daysLeft} days remaining)</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-4 space-y-4">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/50">Build Progress</span>
              <span className="text-xs font-bold" style={{ color: status.color }}>{info.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{ 
                  width: `${info.progress}%`, 
                  background: `linear-gradient(90deg, ${status.color}, ${status.color}88)` 
                }}
              />
            </div>
          </div>
          
          {/* What It Is NOW */}
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-[#10B981]" />
              <h3 className="text-sm font-bold text-white">What Works Now</h3>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{info.nowDesc}</p>
          </div>
          
          {/* What Collective General Will Build */}
          <div className="bg-[#C9A03F]/5 rounded-xl p-4 border border-[#C9A03F]/10">
            <div className="flex items-center gap-2 mb-2">
              <Hammer className="w-4 h-4 text-[#C9A03F]" />
              <h3 className="text-sm font-bold text-white">What Collective General Will Build</h3>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{info.futureDesc}</p>
          </div>
          
          {/* Related Live Platforms */}
          {info.relatedLive.length > 0 && (
            <div>
              <p className="text-xs text-white/40 mb-2">Try these live platforms while you wait:</p>
              <div className="flex flex-wrap gap-2">
                {info.relatedLive.map((r) => {
                  const related = getPlatformInfo(r);
                  if (!related) return null;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        close();
                        navigate(r);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/[0.06] hover:bg-white/10 hover:border-white/10 transition-all text-xs text-white/70"
                    >
                      <Zap className="w-3 h-3 text-[#C9A03F]" />
                      {related.name}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Category */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
            <Users className="w-3 h-3 text-white/30" />
            <span className="text-[10px] text-white/30">Category: <span className="text-white/50">{info.category}</span></span>
            <span className="text-white/20 mx-1">|</span>
            <Clock className="w-3 h-3 text-white/30" />
            <span className="text-[10px] text-white/30">Route: <span className="text-white/50">{info.route}</span></span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#C9A03F]" />
              <span className="text-xs text-white/40">
                Built by <span className="text-[#C9A03F] font-semibold">Collective General Technologies, LLC</span>
              </span>
            </div>
            {isLive && (
              <button
                onClick={() => {
                  close();
                  navigate(route);
                }}
                className="px-4 py-2 bg-[#C9A03F] hover:bg-[#d4aa4a] text-black text-xs font-bold rounded-lg transition-colors"
              >
                Enter Platform
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
