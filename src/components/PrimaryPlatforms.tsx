import { brand } from '../config/brand';
import PlatformCard from './PlatformCard';

export default function PrimaryPlatforms() {
  const products = [
    brand.products.video,
    brand.products.audio,
  ];

  return (
    <section id="platforms" className="relative bg-black pt-24 pb-16 px-6 z-10">
      <div className="flex items-center justify-center gap-3">
        <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-[0.2em]">
          LAYER 1
        </span>
        <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold text-black bg-[#F7F2EB] uppercase rounded-md">
          PRIMARY
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[800px] mx-auto">
        {products.map((product, index) => (
          <PlatformCard
            key={product.name}
            icon={product.icon}
            title={product.name}
            description={product.description}
            layerLabel={product.layerLabel}
            cta={product.cta}
            href={product.href}
            delay={index * 100}
          />
        ))}
      </div>
    </section>
  );
}
