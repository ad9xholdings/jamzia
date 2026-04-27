import { brand } from '../config/brand';
import { useCountUp } from '../hooks/useCountUp';
import SormeSearch from './SormeSearch';

function StatItem({
  value,
  suffix,
  icon,
  label,
}: {
  value?: number;
  suffix?: string;
  icon?: string;
  label: string;
}) {
  const numericValue = value !== undefined ? useCountUp(value, 1500) : null;

  return (
    <div className="flex flex-col items-center gap-1.5">
      {icon ? (
        <span className="text-[28px] leading-none" role="img" aria-label="Global">
          {icon}
        </span>
      ) : (
        <span className="font-display text-[28px] font-bold text-white leading-none">
          {numericValue}
          {suffix}
        </span>
      )}
      <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-[0.15em]">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-black px-6"
    >
      {/* Logo + Brand + Tagline + Search — compact */}
      <div className="flex flex-col items-center -mt-6">
        <img
          src="/creators-engine.jpg"
          alt="JamZia The Everything App"
          className="w-28 sm:w-36 md:w-44 h-auto rounded-2xl mb-2"
        />
        <h1 className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-white text-center tracking-[-0.02em]">
          {brand.name}
          <sup className="text-sm sm:text-base lg:text-lg font-medium ml-1">™</sup>
        </h1>
        <p className="mt-2 text-xs sm:text-sm lg:text-base text-[#A0AEC0] text-center font-normal max-w-xs sm:max-w-md px-4">
          {brand.tagline}
        </p>
        <div className="mt-3 w-full max-w-[520px] relative z-20">
          <SormeSearch />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10">
        {brand.stats.map((stat, index) => (
          <StatItem
            key={index}
            value={stat.value}
            suffix={stat.suffix}
            icon={stat.icon}
            label={stat.label}
          />
        ))}
      </div>

      {/* Listen + Watch side-by-side */}
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <a
          href="#/listen"
          className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#ec4899]/10 border border-[#ec4899]/20 text-[#ec4899] font-bold rounded-full hover:bg-[#ec4899]/20 transition-colors no-underline flex items-center gap-2 text-sm"
        >
          <span>🎧</span> Listen
        </a>
        <a
          href="#/watch"
          className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] font-bold rounded-full hover:bg-[#ef4444]/20 transition-colors no-underline flex items-center gap-2 text-sm"
        >
          <span>▶️</span> Watch
        </a>
      </div>

      {/* Get Access Now — smaller */}
      <a
        href="#/landing"
        className="mt-3 px-5 sm:px-6 py-2 text-sm bg-[#F7F2EB] text-black font-bold rounded-full hover:scale-[1.02] transition-transform no-underline"
      >
        Get Access Now
      </a>

    </section>
  );
}
