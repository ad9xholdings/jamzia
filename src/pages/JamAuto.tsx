import { useState } from 'react';
import {
  Zap, Calendar, MessageSquare, Bot, Link2, Sparkles,
  Check, Clock, Globe, Video, BarChart3, PenTool,
  ChevronDown, ChevronUp, BookOpen, Layers, Star, DollarSign,
  Share2, Shield, Repeat
} from 'lucide-react';

const FEATURES = [
  { icon: Repeat, title: 'Unlimited Content Transformations', desc: 'Repurpose one piece into 20+ formats automatically' },
  { icon: Globe, title: 'Unlimited Platforms & Accounts', desc: 'Connect every social account you own — no caps' },
  { icon: MessageSquare, title: 'JamSocial DM Chatbots', desc: 'Auto-reply DMs 24/7 with on-brand responses' },
  { icon: MessageSquare, title: 'JamSocial Comment Automations', desc: 'Never miss a comment — auto-reply with context' },
  { icon: Link2, title: 'Link in Bio Builder', desc: 'Smart landing pages with click tracking' },
  { icon: Sparkles, title: 'AI Content Generation', desc: 'Captions, images, ideas — generated in seconds' },
  { icon: Layers, title: 'All Current & Future Integrations', desc: 'Every new platform we add — yours free' },
  { icon: Calendar, title: 'Visual Post Calendar', desc: 'Drag, drop, schedule — see your entire week' },
  { icon: Video, title: 'Video Content Support', desc: 'JamReels, JamShorts, JamTok — all formats handled' },
  { icon: BarChart3, title: 'Analytics & Engagement Tracking', desc: 'Know what works, double down on winners' },
  { icon: Shield, title: 'Platform-Specific Optimization', desc: 'What works on JamTok vs JamSocial vs JamForum' },
  { icon: PenTool, title: 'Blog + Long-Form Generation', desc: 'Turn short posts into full articles' },
];

const STEPS_100 = Array.from({ length: 100 }, (_, i) => {
  const steps = [
    "Create your JamZia account and verify email",
    "Navigate to JamAuto from the platform dashboard",
    "Click 'Connect Accounts' to begin social integration",
    "Connect JamSocial Business account via Ad9x API",
    "Connect JamSocial Page for cross-posting",
    "Connect JamTok account with Creator permissions",
    "Connect JamNetwork professional profile",
    "Connect JamSocial thread posting",
    "Connect JamVideo channel for content scheduling",
    "Connect JamShop product catalog",
    "Connect JamSocial threads for automated posts",
    "Verify all connections are active (green checkmarks)",
    "Set your brand voice preferences in AI settings",
    "Upload brand colors, logo, and font preferences",
    "Define your target audience demographics",
    "Set content pillars (3-5 core topics)",
    "Configure posting frequency per platform",
    "Set optimal posting times by timezone",
    "Enable AI caption generation with tone selector",
    "Enable AI hashtag suggestions",
    "Enable AI image generation with style presets",
    "Create your first content template",
    "Build a carousel template for JamSocial",
    "Build a text-post template for JamSocial threads",
    "Build a video-script template for JamTok/JamReels",
    "Build a professional template for JamNetwork",
    "Build a product showcase template for JamShop",
    "Save all templates to your library",
    "Open the Monday Morning Workflow",
    "Let AI analyze last week's top performers",
    "Review AI-suggested content ideas for the week",
    "Select 5-7 ideas to develop into full posts",
    "Pick visuals from AI-generated image options",
    "Pick visuals from your connected cloud storage",
    "Upload custom images/video to the media library",
    "Apply your brand template to each selected post",
    "Let AI write platform-specific captions",
    "Review and edit AI captions to match voice",
    "Add platform-specific CTAs (swipe up, link in bio, comment)",
    "Schedule each post to optimal time slots",
    "View full week on the visual calendar",
    "Drag to rearrange posts for better flow",
    "Enable auto-publish for approved posts",
    "Set approval workflow if team members need review",
    "Configure comment automation triggers",
    "Write 10 default comment replies per content pillar",
    "Set keyword triggers for comment responses",
    "Configure DM automation for JamSocial",
    "Configure DM automation for JamSocial Messenger",
    "Build JamSocial chatbot conversation flows",
    "Set lead capture questions in chatbot",
    "Connect CRM for lead data export",
    "Set up JamProfile landing page",
    "Add trackable links to each post",
    "Configure UTM parameters for link tracking",
    "Enable engagement analytics dashboard",
    "Set weekly performance report email",
    "Set monthly growth report email",
    "Enable competitor monitoring (track 3 accounts)",
    "Set trend alerts for your industry hashtags",
    "Configure repost automation for user-generated content",
    "Set up story scheduling for JamSocial",
    "Set up JamReels scheduling with auto-hashtags",
    "Enable auto-crosspost from JamSocial to JamForum",
    "Enable auto-crosspost between JamTok and JamShorts",
    "Configure bulk upload for content batches",
    "Set evergreen content recycling queue",
    "Mark top 20 posts for auto-repost every 30 days",
    "Enable A/B testing for post times",
    "Set dark post testing for ad creative",
    "Configure team member roles and permissions",
    "Add up to 10 team seats (unlimited on Network tier)",
    "Set client approval portals for agency use",
    "White-label the dashboard with your agency branding",
    "Connect client social accounts via secure OAuth",
    "Generate client performance PDF reports",
    "Set up automated client billing integrations",
    "Configure Ad9x webhooks for external integrations",
    "Connect JamGroupChat for team notifications",
    "Connect JamDocs for content exports",
    "Enable two-factor authentication",
    "Set backup recovery email",
    "Export all content calendar to CSV backup",
    "Review AI-generated posts before they go live",
    "Test all automations with a private post",
    "Verify comment bot replies are on-brand",
    "Verify DM bot captures leads correctly",
    "Check Link in Bio page on mobile devices",
    "Review analytics after first 24 hours",
    "Adjust posting times based on early data",
    "Add more comment reply templates based on new questions",
    "Expand content pillars based on top performers",
    "Connect additional platforms as they launch",
    "Join the JamAuto creator community for tips",
    "Attend monthly JamAuto strategy webinars",
    "Submit feature requests to the product team",
    "Review quarterly platform updates and new features",
    "Celebrate your first 100 scheduled posts!",
  ];
  return { num: i + 1, text: steps[i] || `Step ${i + 1} — Continue optimizing your JamAuto workflow` };
});

const GLOSSARY = [
  { term: 'Content Transformation', def: 'Taking one piece of content and automatically reformatting it for multiple platforms (e.g., a blog post becomes a thread, a carousel, a reel script, and a JamNetwork article).' },
  { term: 'Content Lifecycle', def: 'The full journey of a post from ideation → creation → scheduling → publishing → engagement → analytics → repurposing.' },
  { term: 'Comment Automation', def: 'AI-powered responses to comments on your posts that trigger based on keywords, sentiment, or universal default replies.' },
  { term: 'DM Automation', def: 'Automatic direct message responses on JamSocial and JamGroupChat that nurture leads while you sleep.' },
  { term: 'Chatbot Builder', def: 'A visual flow builder that creates conversation paths for Messenger — qualifying leads, answering FAQs, and booking calls.' },
  { term: 'Link in Bio', def: 'A micro-landing page that lives in your social bio, tracking clicks and housing multiple links behind one URL.' },
  { term: 'Content Flywheel', def: 'A self-sustaining system where published content generates engagement data, which feeds AI recommendations, which creates better new content.' },
  { term: 'Evergreen Recycling', def: 'Automatically re-posting your best-performing content at intervals to maximize reach without manual work.' },
  { term: 'Platform-Specific Optimization', def: 'AI that knows what works where — short hooks for JamTok, professional tone for JamNetwork, visual-first for JamSocial.' },
  { term: 'White Label', def: 'Rebranding JamAuto as your own platform — your logo, your colors, your domain, your pricing.' },
];

const DIY_BLUEPRINT = [
  { phase: 'Phase 1: Foundation (Days 1-3)', items: ['Set up hosting with Network Solutions', 'Point domain to hosting', 'Install SSL certificate', 'Create .htaccess for SPA routing', 'Upload React build to public_html'] },
  { phase: 'Phase 2: Branding (Days 4-5)', items: ['Edit brand.ts with your name, colors, domain', 'Replace cotton-castle.jpg with your button image', 'Update all 50+ platform references', 'Customize Navbar dropdown columns', 'Write your own hero section copy'] },
  { phase: 'Phase 3: Platforms (Days 6-14)', items: ['Build each platform page with 11-layer architecture', 'Connect real APIs (replace mock data)', 'Set up Ad9x Mesh Storage storage credentials', 'Configure SORME search sources', 'Add your own courses to JamMastery'] },
  { phase: 'Phase 4: Gaming (Days 15-20)', items: ['Customize Castle game creatures and rules', 'Add new Knowledge Nodes to JamMastery', 'Create your own Do Good deeds', 'Adjust token economics', 'Set up tournament scheduling'] },
  { phase: 'Phase 5: Launch (Days 21-30)', items: ['Test all 50+ routes end-to-end', 'Run Lighthouse audit (aim 90+)', 'Test on iOS Safari and Android Chrome', 'Set up analytics tracking', 'Go live — share your URL'] },
];

export default function JamAuto() {
  const [openSection, setOpenSection] = useState<string | null>('features');
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [openGlossary, setOpenGlossary] = useState<string | null>(null);

  const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0A1628]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors">back</a>
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-amber-400" />
            <span className="font-display font-bold">JamAuto™</span>
          </div>
          <div className="w-20" />
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-4 py-8">
        {/* ═══ HERO ═══ */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 mb-4">
            <Clock size={12} /> Open on Monday. Your week is done in 10 minutes.
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4">Content Automation<br />That Never Sleeps</h1>
          <p className="text-[#A0AEC0] text-sm max-w-xl mx-auto mb-6">
            JamAuto is the only content automation platform focused on the <strong className="text-white">entire content lifecycle</strong> —
            plan, create, schedule, publish, engage, and analyze across every major platform in one clean dashboard.
          </p>

          {/* Monday Workflow */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5 max-w-lg mx-auto text-left">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Your Monday Morning</p>
            <div className="space-y-2">
              {[
                'AI analyzes last week\'s top performers',
                'AI writes your captions for the week',
                'You pick your visuals',
                'Click once — scheduled to JamSocial, JamTok, JamNetwork, and more',
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#A0AEC0]">
                  <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                  {s}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6B7280] mt-3 italic">
              No tab-switching. No burnout. Just content going live while you go live your life.
            </p>
          </div>
        </div>

        {/* ═══ FEATURES ═══ */}
        <div className="mb-8">
          <button onClick={() => toggle('features')} className="w-full flex items-center justify-between py-3 border-b border-white/[0.06]">
            <span className="text-lg font-bold text-white flex items-center gap-2"><Star size={18} className="text-amber-400" /> JamAuto Features</span>
            {openSection === 'features' ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
          </button>
          {openSection === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4 hover:border-amber-500/20 transition-all">
                  <f.icon size={20} className="text-amber-400 mb-2" />
                  <p className="text-sm font-bold text-white">{f.title}</p>
                  <p className="text-xs text-[#A0AEC0] mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══ ENGAGEMENT ENGINE ═══ */}
        <div className="mb-8">
          <button onClick={() => toggle('engagement')} className="w-full flex items-center justify-between py-3 border-b border-white/[0.06]">
            <span className="text-lg font-bold text-white flex items-center gap-2"><Bot size={18} className="text-cyan-400" /> Engagement on Autopilot</span>
            {openSection === 'engagement' ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
          </button>
          {openSection === 'engagement' && (
            <div className="pt-4 space-y-3">
              {[
                { title: 'Comments? Automatically replied to.', desc: 'Keyword-triggered replies that feel human. 24/7.' },
                { title: 'Leads? Triggered into your DMs.', desc: 'Interested commenters get a personalized DM sequence.' },
                { title: 'Reels blowing up? Bots work overtime.', desc: 'Viral posts get enhanced reply priority and lead routing.' },
              ].map((e, i) => (
                <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
                  <MessageSquare size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">{e.title}</p>
                    <p className="text-xs text-[#A0AEC0]">{e.desc}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-[#6B7280] italic text-center">
                It's like having an assistant who never misses a comment and always replies on brand — even when you're off-grid.
              </p>
            </div>
          )}
        </div>

        {/* ═══ PRICING ═══ */}
        <div className="mb-8">
          <button onClick={() => toggle('pricing')} className="w-full flex items-center justify-between py-3 border-b border-white/[0.06]">
            <span className="text-lg font-bold text-white flex items-center gap-2"><DollarSign size={18} className="text-emerald-400" /> Lifetime Deal Pricing</span>
            {openSection === 'pricing' ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
          </button>
          {openSection === 'pricing' && (
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* One-time */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/30 rounded-2xl p-6">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Best Value</p>
                <p className="text-3xl font-bold text-white mt-1">$597</p>
                <p className="text-xs text-[#6B7280]">One-time. Forever yours.</p>
                <div className="mt-4 space-y-2">
                  {['Unlimited content transformations', 'Unlimited platforms & accounts', 'AI content generation', 'All future updates', 'No monthly fees ever'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#A0AEC0]">
                      <Check size={12} className="text-emerald-400 shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment plan */}
              <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-6">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Payment Plan</p>
                <p className="text-3xl font-bold text-white mt-1">$27.70</p>
                <p className="text-xs text-[#6B7280]">/month for 36 months ($997 total)</p>
                <p className="text-[10px] text-amber-400 mt-2">Same lifetime access. Just spread out.</p>
                <div className="mt-4 space-y-2">
                  {['Same unlimited features', 'Same all future updates', 'Cancel anytime after 12 months', 'No credit check required'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#A0AEC0]">
                      <Check size={12} className="text-amber-400 shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══ TL;DR ═══ */}
        <div className="mb-8">
          <button onClick={() => toggle('tldr')} className="w-full flex items-center justify-between py-3 border-b border-white/[0.06]">
            <span className="text-lg font-bold text-white flex items-center gap-2"><Zap size={18} className="text-yellow-400" /> TL;DR — Why JamAuto Slaps</span>
            {openSection === 'tldr' ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
          </button>
          {openSection === 'tldr' && (
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Create once, post everywhere (auto-formatted)',
                'Works on Mac, PC, and mobile (fully web-based)',
                'Built-in AI for ideas, captions & images',
                'No tech setup — connect accounts and go',
                'Integrates with all major platforms (20+)',
                'Includes all future updates (4–5x/year)',
                'Normally $47/month — today $597 one-time',
                'Pricing goes to $97 soon, then monthly',
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#A0AEC0]">
                  <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />{t}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══ 100 STEPS ═══ */}
        <div className="mb-8">
          <button onClick={() => toggle('steps')} className="w-full flex items-center justify-between py-3 border-b border-white/[0.06]">
            <span className="text-lg font-bold text-white flex items-center gap-2"><Layers size={18} className="text-purple-400" /> 100-Step Implementation Checklist</span>
            {openSection === 'steps' ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
          </button>
          {openSection === 'steps' && (
            <div className="pt-4">
              <div className="max-h-[60vh] overflow-y-auto space-y-1 pr-2">
                {(showAllSteps ? STEPS_100 : STEPS_100.slice(0, 25)).map((s) => (
                  <div key={s.num} className="flex items-start gap-2 text-xs text-[#A0AEC0] py-1 border-b border-white/[0.03]">
                    <span className="text-[10px] font-bold text-purple-400 w-6 shrink-0">{s.num}</span>
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>
              {!showAllSteps && (
                <button onClick={() => setShowAllSteps(true)} className="w-full py-2 mt-2 text-xs text-purple-400 hover:text-white transition-colors text-center">
                  Show all 100 steps ↓
                </button>
              )}
            </div>
          )}
        </div>

        {/* ═══ GLOSSARY ═══ */}
        <div className="mb-8">
          <button onClick={() => toggle('glossary')} className="w-full flex items-center justify-between py-3 border-b border-white/[0.06]">
            <span className="text-lg font-bold text-white flex items-center gap-2"><BookOpen size={18} className="text-blue-400" /> Glossary of Terms</span>
            {openSection === 'glossary' ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
          </button>
          {openSection === 'glossary' && (
            <div className="pt-4 space-y-2">
              {GLOSSARY.map((g) => (
                <div key={g.term} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-3">
                  <button onClick={() => setOpenGlossary(openGlossary === g.term ? null : g.term)} className="w-full flex items-center justify-between text-left">
                    <p className="text-sm font-bold text-white">{g.term}</p>
                    {openGlossary === g.term ? <ChevronUp size={14} className="text-[#6B7280]" /> : <ChevronDown size={14} className="text-[#6B7280]" />}
                  </button>
                  {openGlossary === g.term && <p className="text-xs text-[#A0AEC0] mt-2 leading-relaxed">{g.def}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══ WHITE LABEL PREFACE ═══ */}
        <div className="mb-8">
          <button onClick={() => toggle('whitelabel')} className="w-full flex items-center justify-between py-3 border-b border-white/[0.06]">
            <span className="text-lg font-bold text-white flex items-center gap-2"><Share2 size={18} className="text-pink-400" /> White Label Guide for Ad Agencies</span>
            {openSection === 'whitelabel' ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
          </button>
          {openSection === 'whitelabel' && (
            <div className="pt-4 space-y-4 text-sm text-[#A0AEC0] leading-relaxed">
              <p>
                JamAuto is included in the JamZia Networks™ white-label ecosystem. As an Ad Agency partner,
                you can rebrand JamAuto as your own content automation platform — your logo, your colors,
                your domain, your pricing.
              </p>
              <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
                <p className="text-white font-bold mb-2">What's Included ($597 one-time):</p>
                <ul className="space-y-1 text-xs">
                  <li>• Full source code access (React + TypeScript + Vite)</li>
                  <li>• White-label dashboard with your branding</li>
                  <li>• Client portal for account management</li>
                  <li>• Automated client billing integration</li>
                  <li>• PDF performance reports with your logo</li>
                  <li>• All 50+ JamZia platform modules</li>
                  <li>• Lifetime updates (4–5 releases per year)</li>
                </ul>
              </div>
              <div className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
                <p className="text-white font-bold mb-2">Payment Plan Option:</p>
                <p className="text-xs">
                  $997 total over 36 months = <strong className="text-amber-400">$27.70/month</strong>.
                  Same lifetime access. Same all features. Just easier on cash flow.
                </p>
              </div>
              <p className="italic">
                This is your blueprint. Every step documented. Every file explained.
                Build it yourself or have us deploy it — the choice is yours.
              </p>
            </div>
          )}
        </div>

        {/* ═══ DIY BLUEPRINT ═══ */}
        <div className="mb-8">
          <button onClick={() => toggle('blueprint')} className="w-full flex items-center justify-between py-3 border-b border-white/[0.06]">
            <span className="text-lg font-bold text-white flex items-center gap-2"><PenTool size={18} className="text-orange-400" /> DIY Blueprint (30 Days)</span>
            {openSection === 'blueprint' ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
          </button>
          {openSection === 'blueprint' && (
            <div className="pt-4 space-y-4">
              {DIY_BLUEPRINT.map((phase, i) => (
                <div key={i} className="bg-[#0A0F1E] border border-white/[0.06] rounded-2xl p-4">
                  <p className="text-sm font-bold text-orange-400 mb-2">{phase.phase}</p>
                  <ul className="space-y-1">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-[#A0AEC0]">
                        <Check size={12} className="text-orange-400 mt-0.5 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══ CTA ═══ */}
        <div className="text-center py-8 border-t border-white/[0.06]">
          <p className="text-xl font-bold text-white mb-2">Ready to Automate Your Content?</p>
          <p className="text-sm text-[#A0AEC0] mb-4">
            Join JamZia Networks™ and get JamAuto + 43+ platforms for one lifetime price.
          </p>
          <a href="#/landing" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all no-underline">
            <Zap size={16} /> Get Access Now
          </a>
          <p className="text-[10px] text-[#6B7280] mt-3">
            Powered by Ad9x™ • JamZia Networks™ • All rights reserved
          </p>
        </div>
      </main>
    </div>
  );
}
