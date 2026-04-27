import { useState, type ReactNode } from 'react';
import { Maximize2, Minimize2, Swords, Users, X, MessageSquare } from 'lucide-react';

interface TriPanelLayoutProps {
  topPanel: ReactNode;
  middlePanel: ReactNode;
  bottomPanel: ReactNode;
  header?: ReactNode;
  brandColor?: string;
}

export default function TriPanelLayout({
  topPanel,
  middlePanel,
  bottomPanel,
  header,
  brandColor = '#7096D1',
}: TriPanelLayoutProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="h-[100dvh] bg-black text-white flex flex-col overflow-hidden">
      {/* Sticky App Header */}
      {header && (
        <div className="shrink-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
          {header}
        </div>
      )}

      {/* Fullscreen exit button */}
      {isFullscreen && (
        <button
          onClick={() => { setIsFullscreen(false); setChatOpen(true); }}
          className="fixed top-4 right-4 z-[100] flex items-center gap-2 px-3 py-2 bg-black/70 backdrop-blur-md rounded-xl border border-white/10 text-xs text-white hover:bg-white/10 transition-all"
        >
          <Minimize2 size={14} />
          Exit Fullscreen
        </button>
      )}

      {/* Top Panel — Challenges & Battles (25%) */}
      <div
        className={`shrink-0 border-b border-white/[0.06] transition-all duration-500 ease-in-out overflow-hidden ${
          isFullscreen ? 'h-0 opacity-0' : 'h-[25dvh] min-h-[160px] max-h-[220px]'
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Section label */}
          <div className="flex items-center gap-2 px-4 pt-2 pb-1">
            <Swords size={12} style={{ color: brandColor }} />
            <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: brandColor }}>
              Challenges & Battles
            </span>
          </div>
          {topPanel}
        </div>
      </div>

      {/* Middle Panel — Content (flex-1, shares space with chat in fullscreen) */}
      <div className="flex-1 transition-all duration-500 ease-in-out overflow-hidden relative">
        {middlePanel}

        {/* Fullscreen toggle — anchored to content corner */}
        {!isFullscreen && (
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-[10px] text-white/70 hover:text-white hover:bg-black/80 transition-all"
          >
            <Maximize2 size={12} />
            Fullscreen
          </button>
        )}
      </div>

      {/* Bottom Panel — Group Chat (25%, stays visible in fullscreen, user can close) */}
      <div
        className={`shrink-0 border-t border-white/[0.06] transition-all duration-500 ease-in-out overflow-hidden ${
          isFullscreen && !chatOpen ? 'h-0 opacity-0' : ''
        } ${
          isFullscreen && chatOpen ? 'h-[20dvh] min-h-[140px] max-h-[200px]' : ''
        } ${
          !isFullscreen ? 'h-[25dvh] min-h-[160px] max-h-[240px]' : ''
        }`}
      >
        <div className="h-full overflow-y-auto flex flex-col">
          {/* Section label */}
          <div className="flex items-center justify-between px-4 pt-2 pb-1 shrink-0">
            <div className="flex items-center gap-2">
              <Users size={12} style={{ color: brandColor }} />
              <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: brandColor }}>
                Group Chat
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-[#6B7280]">Live</span>
              {isFullscreen && (
                <button
                  onClick={() => setChatOpen(false)}
                  className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                  title="Hide chat"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-0">{bottomPanel}</div>
        </div>
      </div>

      {/* Floating chat reopen button — only in fullscreen when chat is closed */}
      {isFullscreen && !chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-2 px-4 py-2 bg-[#0A0F1E]/90 backdrop-blur-md rounded-full border border-white/10 text-xs text-white hover:bg-white/10 transition-all shadow-2xl"
        >
          <MessageSquare size={14} style={{ color: brandColor }} />
          Show Chat
        </button>
      )}
    </div>
  );
}
