import { brand } from '../config/brand';

const ecosystem = [
  brand.products.live,
  brand.products.food,
  brand.products.social,
  brand.products.pay,
  brand.products.shop,
  brand.products.play,
  brand.products.learn,
  brand.products.ads,
  brand.products.cloud,
  brand.products.earth,
  brand.products.green,
  brand.products.grow,
  brand.products.weather,
  brand.products.wise,
  brand.products.box,
  brand.products.cat,
  brand.products.tech,
  brand.products.street,
  brand.products.ar,
  brand.products.tok,
  brand.products.words,
  brand.products.lab,
  brand.products.psych,
  brand.products.therapy,
  brand.products.docs,
  brand.products.pros,
];

export default function EcosystemPlatforms() {
  return (
    <section id="platforms" className="relative py-16 sm:py-20 px-6 z-10">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-center text-xs font-semibold text-[#7096D1] tracking-[0.2em] uppercase mb-3">
          Full Ecosystem
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center mb-8">
          28+ Integrated Platforms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {ecosystem.map((p) => (
            <a
              key={p.name}
              href={p.href.startsWith('http') ? p.href : `/#${p.href}`}
              className="group rounded-[14px] p-[1px] bg-white/[0.06] hover:jamzia-gradient-border transition-all duration-300 no-underline"
            >
              <div className="bg-[#0A0F1E] rounded-[14px] p-4 h-full flex flex-col items-start gap-2 min-h-0">
                <span className="text-2xl shrink-0">{p.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-white truncate">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-[#A0AEC0] leading-relaxed mt-0.5 line-clamp-2">
                    {p.description}
                  </p>
                </div>
                {p.cta && (
                  <span className="text-[10px] font-bold text-[#7096D1] mt-auto shrink-0">
                    {p.cta}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
