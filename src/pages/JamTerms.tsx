/* ═══════════════════════════════════════════════════════════
   JamTerms™ — Terms of Service
   JamZia Networks™ — The Everything App
   Powered by Ad9x Holdings, LLC
   ═══════════════════════════════════════════════════════════ */

import { Gavel, Shield, BookOpen, Globe, Lock, AlertTriangle } from 'lucide-react';

const SECTIONS = [
  {
    id: 'preface',
    title: 'Preface',
    icon: BookOpen,
    content: `Welcome to JamZia Networks™ — The Everything App. These Terms of Service ("Terms") govern your access to and use of the JamZia™ platform, including all subdomains, applications, APIs, and services operated by Ad9x Holdings, LLC ("Ad9x", "we", "us", or "our").

JamZia™ is a unified ecosystem of 48+ integrated platforms spanning media, commerce, finance, governance, education, mental health, and augmented reality. By accessing or using any part of JamZia™, you agree to be bound by these Terms. If you do not agree, you may not access or use JamZia™.

These Terms apply to all users, including individual consumers, creators, businesses, government entities, non-profit organizations, and white-label partners. Specific additional terms may apply to certain services — those terms are incorporated by reference.

The Fearless Revolution Foundation, as the first approved white-label partner, operates under these same Terms with additional provisions specific to non-profit trauma support services, outlined in Schedule A.`
  },
  {
    id: 'definitions',
    title: '1. Definitions',
    icon: BookOpen,
    content: `"JamZia" means the JamZia™ platform, including all 48+ sub-platforms, the JamZia Networks™ infrastructure, and all associated intellectual property owned by Ad9x Holdings, LLC.

"Ad9x" means Ad9x Holdings, LLC, a limited liability company, the sole owner and operator of JamZia Networks™.

"User" means any person or entity that accesses or uses JamZia™.

"WisdomPay" means the exclusive payment and wallet system integrated into JamZia™, operating on the XRP Ledger.

"Content" means any data, text, images, audio, video, software, or other materials uploaded, transmitted, or stored through JamZia™.

"White Label Partner" means an approved third party authorized to operate a branded instance of JamZia™, including Fearless Revolution Foundation.

"CBR" means Cotton Brick Road™, the gamified educational battle system within JamZia™.

"JamRep" means the automated replication engine that generates white-label instances of JamZia™.`
  },
  {
    id: 'acceptance',
    title: '2. Acceptance of Terms',
    icon: Shield,
    content: `By creating an account, accessing, or using JamZia™, you affirm that:

(a) You are at least 13 years of age (or the minimum legal age in your jurisdiction);
(b) You have the legal capacity to enter into these Terms;
(c) You will comply with all applicable laws and regulations;
(d) You will not use JamZia™ for any illegal, harmful, or fraudulent purpose;
(e) All information you provide is accurate, complete, and current.

For users accessing JamZia™ through a White Label Partner (such as Fearless Revolution Foundation), you are also bound by the White Label Partner's supplemental terms, which are incorporated herein by reference.`
  },
  {
    id: 'accounts',
    title: '3. User Accounts',
    icon: Lock,
    content: `To access certain features of JamZia™, you must create an account. You are responsible for:

(a) Maintaining the confidentiality of your account credentials;
(b) All activities that occur under your account;
(c) Immediately notifying us of any unauthorized use;
(d) Ensuring your account information remains accurate and up-to-date.

JamZia™ uses WisdomPay™ wallet-based authentication. No traditional passwords are stored on our servers. Your private keys remain under your sole custody. Ad9x is not responsible for lost private keys or wallet access.

We reserve the right to suspend or terminate accounts that violate these Terms or that engage in fraudulent, abusive, or illegal activity.`
  },
  {
    id: 'content',
    title: '4. Content & Intellectual Property',
    icon: Globe,
    content: `You retain ownership of Content you create and upload to JamZia™. By uploading Content, you grant Ad9x a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such Content solely for the purpose of operating and improving JamZia™.

Ad9x retains all ownership and intellectual property rights in JamZia™, including but not limited to:
- The JamZia™ name, logo, and branding
- The 11-layer architecture
- The JamRep™ replication engine
- The Cotton Brick Road™ game system
- The WisdomPay™ payment system
- All source code, algorithms, and proprietary technology

White Label Partners are granted a limited, revocable license to use the JamZia™ platform under the terms of their White Label Agreement. No ownership rights are transferred.`
  },
  {
    id: 'payments',
    title: '5. Payments & WisdomPay',
    icon: Lock,
    content: `All financial transactions on JamZia™ are processed exclusively through WisdomPay™ on the XRP Ledger. Ad9x does not custody user funds. All transactions are self-custodial.

By using WisdomPay™, you agree to:
(a) Pay all applicable fees, including transaction fees, platform fees, and gas costs;
(b) Maintain sufficient XRP in your wallet for network fees;
(c) Accept that transactions on the XRP Ledger are irreversible;
(d) Comply with all applicable tax obligations.

Refunds are governed by the specific platform's refund policy. Digital content purchases are generally non-refundable once accessed. Subscription cancellations take effect at the end of the current billing period.`
  },
  {
    id: 'prohibited',
    title: '6. Prohibited Conduct',
    icon: AlertTriangle,
    content: `You may not use JamZia™ to:

(a) Violate any applicable law or regulation;
(b) Infringe upon the intellectual property rights of others;
(c) Distribute malware, viruses, or other harmful code;
(d) Engage in harassment, hate speech, or discrimination;
(e) Promote violence, terrorism, or self-harm;
(f) Interfere with the integrity or security of JamZia™;
(g) Use bots, scrapers, or automated tools without authorization;
(h) Circumvent any security measure or access control;
(i) Attempt to reverse engineer any part of JamZia™;
(j) Use JamZia™ for money laundering or other financial crimes.

Violations may result in immediate account termination, forfeiture of earned rewards, and referral to appropriate authorities.`
  },
  {
    id: 'white-label',
    title: '7. White Label Partners',
    icon: Globe,
    content: `White Label Partners, including Fearless Revolution Foundation, operate under a separate White Label Agreement with Ad9x. Key provisions include:

(a) The White Label Partner must maintain JamZia™ branding attribution;
(b) The Partner may customize visual identity (colors, logos, domain) within approved parameters;
(c) All transactions still flow through WisdomPay™ and the XRP Ledger;
(d) The Partner is responsible for its own users and content moderation;
(e) Ad9x retains the right to audit Partner instances for compliance;
(f) Partner access may be revoked for Terms violations.

Fearless Revolution Foundation specifically operates as a non-profit trauma support platform. All therapy services comply with HIPAA and applicable mental health regulations. See Schedule A for non-profit-specific terms.`
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    icon: Shield,
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

(a) JAMZIA™ IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND;
(b) AD9X SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES;
(c) AD9X'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO AD9X IN THE 12 MONTHS PRECEDING THE CLAIM;
(d) AD9X IS NOT LIABLE FOR LOSSES DUE TO CRYPTOCURRENCY VOLATILITY, WALLET COMPROMISE, OR USER ERROR;
(e) AD9X IS NOT LIABLE FOR CONTENT POSTED BY USERS OR THIRD PARTIES.

These limitations do not apply where prohibited by law.`
  },
  {
    id: 'termination',
    title: '9. Termination',
    icon: AlertTriangle,
    content: `You may terminate your account at any time by following the account deletion process. Upon termination:

(a) Your access to JamZia™ will be revoked;
(b) Your Content may be retained for legal or audit purposes;
(c) Any outstanding financial obligations remain due;
(d) Provisions regarding intellectual property, liability, and dispute resolution survive termination.

Ad9x may suspend or terminate your account immediately for:
(a) Terms violations;
(b) Fraudulent or illegal activity;
(c) Extended inactivity (12+ months);
(d) Technical necessity or platform discontinuation.`
  },
  {
    id: 'governing',
    title: '10. Governing Law',
    icon: Gavel,
    content: `These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any dispute arising from these Terms shall be resolved through binding arbitration in Delaware, except where prohibited by law.

For users accessing JamZia™ through Fearless Revolution Foundation, supplemental jurisdiction provisions may apply based on the Foundation's registration and operating territory.

Class action waivers apply. You agree to resolve disputes on an individual basis.`
  },
  {
    id: 'changes',
    title: '11. Changes to Terms',
    icon: BookOpen,
    content: `Ad9x may update these Terms at any time. Material changes will be notified via:
(a) Email to registered users;
(b) In-app notification;
(c) Posting on the JamZia™ website.

Continued use after changes constitutes acceptance. If you do not agree to changes, you must discontinue use.

Last Updated: April 26, 2026`
  }
];

export default function JamTerms() {
  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 mb-2">
            <Gavel size={24} className="text-[#f59e0b]" />
            <h1 className="text-xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xs text-[#6B7280]">JamZia Networks™ — Effective April 26, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <section.icon size={16} className="text-[#f59e0b]" />
              <h2 className="text-sm font-bold text-white">{section.title}</h2>
            </div>
            <div className="text-xs text-[#A0AEC0] leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}

        <div className="text-center py-6">
          <p className="text-[10px] text-[#6B7280]">
            JamZia Networks™ • Powered by Ad9x Holdings, LLC • © 2026 All Rights Reserved
          </p>
          <p className="text-[9px] text-[#6B7280] mt-1">
            For questions: legal@ad9x.io • Fearless Revolution Foundation operates under White Label Agreement WL-001
          </p>
        </div>
      </div>
    </div>
  );
}
