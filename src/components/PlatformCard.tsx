import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';

interface PlatformCardProps {
  icon: string;
  title: string;
  description: string;
  layerLabel?: string;
  cta: string;
  href: string;
  compact?: boolean;
  delay?: number;
}

export default function PlatformCard({
  icon,
  title,
  description,
  layerLabel,
  cta,
  href,
  compact = false,
  delay = 0,
}: PlatformCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const iconSize = compact ? 'text-4xl' : 'text-[40px]';
  const titleSize = compact ? 'text-xl' : 'text-2xl';
  const descSize = compact ? 'text-sm' : 'text-[15px]';
  const padding = compact ? 'p-7' : 'p-8';
  const minHeight = compact ? 'min-h-[200px]' : 'min-h-[280px]';
  const descMargin = compact ? 'mt-3' : 'mt-4';

  const cardContent = (
    <div className={`bg-[#0A0F1E] rounded-[14px] ${padding} ${minHeight} flex flex-col`}>
      <div className="flex-1 flex flex-col">
        <span className={iconSize} role="img" aria-label={title}>
          {icon}
        </span>
        <p className={`${descSize} text-[#A0AEC0] ${descMargin} leading-relaxed`}>
          {description}
        </p>
        {layerLabel && (
          <p className="text-[13px] text-[#6B7280] mt-3">{layerLabel}</p>
        )}
        <span className="text-sm font-semibold text-white mt-3 hover:underline inline-block">
          {cta}
        </span>
      </div>
      <h3 className={`font-display ${titleSize} font-bold text-white mt-auto pt-6`}>
        {title}
        <sup className="text-[10px] font-medium ml-0.5">™</sup>
      </h3>
    </div>
  );

  return (
    <div
      ref={cardRef}
      className={`rounded-[14px] p-[1px] jamzia-gradient-border jamzia-card-hover cursor-pointer opacity-0 translate-y-4 transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {href.startsWith('/') ? (
        <Link to={href} className="block no-underline">
          {cardContent}
        </Link>
      ) : (
        <a href={href} className="block no-underline">
          {cardContent}
        </a>
      )}
    </div>
  );
}
