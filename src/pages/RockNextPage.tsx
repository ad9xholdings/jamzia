/* RockNextPage — Simple static white-label page */

export default function RockNextPage() {
  return (
    <div className="min-h-[100dvh] text-white" style={{ background: 'linear-gradient(180deg, #0A0F1E 0%, #050810 100%)' }}>
      <div className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold"
               style={{ backgroundColor: '#00000020', border: '1px solid #00000040', color: '#FFFFFF' }}>
            ⚡
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">RockNext™</h1>
            <p className="text-[9px] text-[#6B7280]">RockNext Infrastructure</p>
          </div>
          <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#6B7280]">WL-002</span>
          <a href="#/" className="ml-auto text-[10px] text-[#6B7280] hover:text-white no-underline">RockNext™ Home</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl bg-white/[0.05] border border-white/[0.1]">
            ⚡
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-2 tracking-tight">RockNext™</h2>
          <p className="text-sm italic mb-2 text-[#A0AEC0]">Infrastructure That Scales</p>
          <p className="text-base text-[#A0AEC0] max-w-xl mx-auto mb-8">
            Global CDN orchestration, edge computing nodes, and infrastructure management for the RockNext ecosystem.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">200+</p>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Edge Nodes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">99.99%</p>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Uptime SLA</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">50ms</p>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Global Latency</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#/command" className="px-6 py-3 text-sm font-bold rounded-xl text-white no-underline bg-white/[0.1]">Explore Infrastructure</a>
            <a href="#/whitelabel" className="px-6 py-3 text-sm font-bold rounded-xl border border-white/[0.12] text-white no-underline">White Label Info</a>
          </div>
        </div>

        <div className="text-center py-8 border-t border-white/[0.06]">
          <p className="text-sm font-bold text-white">RockNext™ Infrastructure</p>
          <p className="text-xs italic text-[#A0AEC0]">&quot;Infrastructure That Scales&quot;</p>
          <p className="text-[9px] text-[#6B7280] mt-3">Powered by RockNext Infrastructure™</p>
          <p className="text-[9px] text-[#6B7280]">© 2026 Ad9x Holdings LLC</p>
        </div>
      </div>
    </div>
  );
}
