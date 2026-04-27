import { useState } from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Entry',
    price: 'Free',
    period: '',
    description: 'Get started with the basics',
    features: ['1 Platform', '5GB Storage', 'Basic Streaming', 'Community Support', 'Standard Analytics'],
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing creators',
    features: ['3 Platforms', '50GB Storage', 'HD Streaming', 'Email Support', 'Advanced Analytics', 'Basic Monetization'],
  },
  {
    name: 'Master',
    price: '$99',
    period: '/mo',
    description: 'For serious creators',
    features: ['6 Platforms', '250GB Storage', '4K Streaming', 'Priority Support', 'Full Monetization', 'Custom Branding', 'API Access'],
    highlighted: true,
  },
  {
    name: 'Prime',
    price: '$299',
    period: '/mo',
    description: 'For studios and teams',
    features: ['10 Platforms', '1TB Storage', '4K+ Streaming', 'Dedicated Support', 'White-label', 'Team Management', 'Advanced API'],
  },
  {
    name: 'Network',
    price: 'Custom',
    period: '',
    description: 'For enterprise networks',
    features: ['All 24+ Platforms', 'Unlimited Storage', 'Unlimited Streaming', 'Dedicated Manager', 'Full White-label', 'Custom Integrations', 'SLA Guarantee'],
  },
];

export default function RegistrationCTA() {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Master');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section id="register" className="relative bg-black pt-16 pb-24 px-6 z-10">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#081F5C]/30 border border-[#7096D1]/30 rounded-full text-xs font-semibold text-[#7096D1] mb-4">
          Layer 2: Platform Access
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
          From Free to Network
        </h2>
        <p className="text-[#A0AEC0] text-base max-w-lg mx-auto">
          Start free and scale as you grow. Every tier unlocks more of the JamZia ecosystem.
        </p>
      </div>

      {/* Plans — 5 tier grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-[1200px] mx-auto mb-10">
        {plans.map((plan) => (
          <button
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name)}
            className={`text-left rounded-[14px] p-[1px] transition-all cursor-pointer ${
              selectedPlan === plan.name ? 'jamzia-gradient-border' : 'bg-white/[0.06]'
            }`}
          >
            <div className="bg-[#0A0F1E] rounded-[14px] p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-sm font-bold text-white">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="text-[9px] font-bold text-black bg-[#F7F2EB] px-1.5 py-0.5 rounded-full uppercase">
                    Popular
                  </span>
                )}
              </div>
              <div className="mb-2">
                <span className="font-display text-2xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-[#6B7280] text-xs">{plan.period}</span>}
              </div>
              <p className="text-xs text-[#6B7280] mb-3">{plan.description}</p>
              <ul className="space-y-1.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-[#A0AEC0]">
                    <Check size={10} className="text-green-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>

      {/* Email capture */}
      <div className="max-w-[480px] mx-auto">
        <div className="rounded-[14px] p-[1px] jamzia-gradient-border">
          <div className="bg-[#0A0F1E] rounded-[14px] p-6 text-center">
            {submitted ? (
              <div className="py-2">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check size={20} className="text-green-400" />
                </div>
                <p className="text-white font-semibold text-sm">You are on the list!</p>
                <p className="text-xs text-[#6B7280] mt-1">Selected plan: <strong className="text-white">{selectedPlan}</strong></p>
              </div>
            ) : (
              <>
                <p className="text-xs text-[#6B7280] mb-3">
                  Selected: <strong className="text-white">{selectedPlan}</strong>
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-[#1A1F2E] text-white text-sm placeholder-[#6B7280] rounded-full px-4 py-2.5 outline-none border border-white/[0.08] focus:border-[#7096D1]/50"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#F7F2EB] text-black font-bold text-sm rounded-full hover:scale-[1.02] transition-transform cursor-pointer shrink-0"
                  >
                    Get Access Now
                  </button>
                </form>
              </>
            )}
            <p className="text-[10px] text-[#6B7280] mt-3">
              Yearly billing available • Cancel anytime • Powered by Ad9x™
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
