import { brand } from '../config/brand';

const platformLinks = [
  { name: 'JamVideo', href: '/video' },
  { name: 'JamAudio', href: '/audio' },
  { name: 'JamSocial', href: '/social' },
  { name: 'JamShop', href: '/shop' },
  { name: 'JamFood', href: '/food' },
  { name: 'JamPay', href: '/pay' },
  { name: 'JamLive', href: '/live' },
  { name: 'JamPlay', href: '/architecture' },
  { name: 'JamLearn', href: '/courses' },
  { name: 'JamAds', href: '/architecture' },
  { name: 'JamCRM', href: '/integrations' },
  { name: 'JamCloud', href: '/architecture' },
  { name: 'JamEarth', href: '/earth' },
  { name: 'JamGreen', href: '/green' },
  { name: 'JamGrow', href: '/grow' },
  { name: 'JamWeather', href: '/weather' },
  { name: 'JamWise', href: '/wise' },
  { name: 'JamBox', href: '/box' },
  { name: 'JamCat', href: '/cat' },
  { name: 'JamTech', href: '/tech' },
  { name: 'JamStreet', href: '/street' },
  { name: 'JamAR', href: '/ar' },
  { name: 'JamTok', href: '/tok' },
  { name: 'JamWords', href: '/words' },
  { name: 'JamLab', href: '/lab' },
  { name: 'JamKind', href: '/kind' },
  { name: 'JamTribute', href: '/tribute' },
  { name: 'JamScale', href: '/scale' },
  { name: 'JamMed', href: '/med' },
  { name: 'JamDEX', href: '/dex' },
  { name: 'JamGrants', href: '/grants' },
  { name: 'JamCredits', href: '/credits' },
  { name: 'JamCom', href: '/com' },
  { name: 'JamFed', href: '/fed' },
  { name: 'JamState', href: '/state' },
  { name: 'JamLocal', href: '/local' },
  { name: 'JamLaw', href: '/law' },
  { name: 'JamCPA', href: '/cpa' },
  { name: 'JamDoctor', href: '/doctor' },
  { name: 'JamCode', href: '/code' },
  { name: 'JamLawyer', href: '/lawyer' },
  { name: 'JamAccountant', href: '/accountant' },
  { name: 'JamMastery', href: '/mastery' },
  { name: 'JamAuto', href: '/auto' },
  { name: 'JamPsych', href: '/psych' },
  { name: 'JamTherapy', href: '/therapy' },
  { name: 'JamBattle', href: '/battle' },
  { name: 'JamNews', href: '/news' },
  { name: 'NoFearZia', href: '/nofear' },
];

export default function Footer() {
  return (
    <footer id="about" className="relative bg-black border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-3">
        {/* JamZia Logo */}
        <a href="#/" className="no-underline">
          <img
            src="/creators-engine.jpg"
            alt={`${brand.name} ${brand.subline}`}
            className="h-10 w-auto rounded-lg mb-1"
          />
        </a>

        <p className="font-display text-base font-semibold text-white">
          {brand.name}™ — {brand.subline}
        </p>
        <p className="text-[13px] text-[#6B7280]">
          www.{brand.domain}
        </p>
        <p className="text-xs text-[#6B7280]">
          All payments processed by {brand.company} • &copy; {brand.footer.copyrightYear} {brand.name}™
        </p>

        {/* Legal & System Links */}
        <div className="w-full mt-3 pt-3 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="#/terms" className="text-[10px] text-[#6B7280] hover:text-[#7096D1] transition-colors no-underline">Terms</a>
            <a href="#/privacy" className="text-[10px] text-[#6B7280] hover:text-[#7096D1] transition-colors no-underline">Privacy</a>
            <a href="#/docs" className="text-[10px] text-[#6B7280] hover:text-[#7096D1] transition-colors no-underline">Docs</a>
            <a href="#/api" className="text-[10px] text-[#6B7280] hover:text-[#7096D1] transition-colors no-underline">API</a>
            <a href="#/status" className="text-[10px] text-[#6B7280] hover:text-[#7096D1] transition-colors no-underline">Status</a>
            <a href="#/rep" className="text-[10px] text-[#f59e0b] hover:text-[#f59e0b] transition-colors no-underline">JamRep™</a>
            <a href="#/ledger" className="text-[10px] text-[#C9A03F] hover:text-[#C9A03F] transition-colors no-underline">Ledger</a>
          </div>
        </div>
        <div className="w-full mt-2">
          <p className="text-[10px] text-[#6B7280] mb-1.5">
            {brand.parentNetwork}™ — {brand.stats[0]?.value}{brand.stats[0]?.suffix || '+'} {brand.stats[0]?.label || 'Platforms'}
          </p>
          <div className="flex gap-x-2 gap-y-1 flex-wrap justify-center overflow-x-auto pb-1 max-h-24 sm:max-h-none overflow-y-auto sm:overflow-y-visible mobile-scroll">
            {platformLinks.map(p => (
              <a
                key={p.name}
                href={`#${p.href}`}
                className="text-[9px] sm:text-[10px] text-[#6B7280] hover:text-[#7096D1] transition-colors whitespace-nowrap no-underline"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
