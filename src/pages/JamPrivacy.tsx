/* ═══════════════════════════════════════════════════════════
   JamPrivacy™ — Privacy Policy
   JamZia Networks™ — The Everything App
   Powered by Ad9x Holdings, LLC
   ═══════════════════════════════════════════════════════════ */

import { Shield, Eye, Lock, Database, Globe, Cookie, UserCheck, Trash2 } from 'lucide-react';

const SECTIONS = [
  {
    id: 'preface',
    title: 'Preface',
    icon: Eye,
    content: `Ad9x Holdings, LLC ("Ad9x", "we", "us") respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use JamZia™ — The Everything App and all associated platforms (collectively, "JamZia").

JamZia™ is a unified ecosystem of 48+ platforms. This policy applies across all platforms, including those operated by White Label Partners such as Fearless Revolution Foundation, which maintains its own supplemental privacy practices for trauma support services.

By using JamZia™, you consent to the practices described in this Privacy Policy. If you do not agree, please do not use JamZia™.`
  },
  {
    id: 'collect',
    title: '1. Information We Collect',
    icon: Database,
    content: `We collect the following categories of information:

A. Account Information: Wallet address (via WisdomPay), username, email (optional), profile information.

B. Usage Data: Pages visited, features used, time spent, click patterns, search queries, device type, browser, operating system, IP address.

C. Content: Any material you upload, post, or transmit through JamZia™, including media, messages, comments, and creations.

D. Transaction Data: Payment history, wallet balances, transaction hashes, gas usage, brick earnings, scholarship awards.

E. Academic Data (JamLearn/JamPsych): Course progress, quiz scores, GPA, report cards, grade levels, credit hours, battle outcomes on Cotton Brick Road.

F. Health Data (JamPsych/JamTherapy): For users of mental health services, we collect session notes (encrypted), therapist assignments, and progress metrics. This data is subject to HIPAA protections where applicable.`
  },
  {
    id: 'use',
    title: '2. How We Use Information',
    icon: UserCheck,
    content: `We use your information to:

(a) Provide, maintain, and improve JamZia™ services;
(b) Process transactions through WisdomPay™;
(c) Personalize your experience and recommendations;
(d) Track academic progress and grade advancement;
(e) Facilitate therapy matching and session scheduling;
(f) Send notifications, updates, and marketing communications (with opt-out);
(g) Detect fraud, abuse, and security threats;
(h) Comply with legal obligations;
(i) Generate anonymized analytics and research data.

We do NOT sell your personal information to third parties. We do NOT use your Content for training AI models without explicit consent.`
  },
  {
    id: 'wisdompay',
    title: '3. WisdomPay & Blockchain Data',
    icon: Lock,
    content: `All financial transactions on JamZia™ occur on the XRP Ledger through WisdomPay™. Blockchain transactions are inherently public and immutable. This means:

(a) Transaction amounts, timestamps, and wallet addresses are publicly visible on the XRP Ledger;
(b) We cannot delete, modify, or hide blockchain transactions;
(c) Your wallet address serves as your primary identifier;
(d) We do not have access to your private keys;
(e) Off-chain data (profile info, content) is stored separately and not on the blockchain.

For white-label instances (Fearless Revolution Foundation), transaction data remains on the shared XRP Ledger with appropriate attribution.`
  },
  {
    id: 'cookies',
    title: '4. Cookies & Tracking',
    icon: Cookie,
    content: `JamZia™ uses cookies and similar technologies for:

(a) Authentication and session management;
(b) Preferences and settings storage;
(c) Analytics and performance monitoring;
(d) Security and fraud prevention.

Third-party cookies: We do not use third-party advertising cookies. Analytics are conducted through our own infrastructure or privacy-preserving tools.

You may disable cookies in your browser, but this may limit functionality.`
  },
  {
    id: 'share',
    title: '5. Data Sharing',
    icon: Globe,
    content: `We share information only in the following circumstances:

(a) With White Label Partners (like Fearless Revolution Foundation) — limited to data necessary for their service provision;
(b) With service providers under strict confidentiality agreements (hosting, analytics);
(c) When required by law, court order, or legal process;
(d) To protect the rights, property, or safety of Ad9x, users, or the public;
(e) In connection with a merger, acquisition, or sale of assets (with notice);
(f) With your explicit consent.

White Label Partners are contractually bound to privacy standards equal to or exceeding this Policy.`
  },
  {
    id: 'security',
    title: '6. Data Security',
    icon: Lock,
    content: `We implement industry-standard security measures:

(a) TLS 1.3 encryption for all data in transit;
(b) AES-256 encryption for sensitive data at rest;
(c) Regular security audits and penetration testing;
(d) Role-based access controls (RBAC);
(e) Multi-factor authentication for admin accounts;
(f) Automated threat detection and response.

No system is 100% secure. You are responsible for maintaining the security of your wallet and credentials. Report security issues to security@ad9x.io.`
  },
  {
    id: 'hipaa',
    title: '7. HIPAA & Health Data',
    icon: Shield,
    content: `For users of JamPsych™ and JamTherapy™, health-related data is subject to HIPAA protections where applicable:

(a) All therapy session data is encrypted end-to-end;
(b) Only licensed therapists and authorized medical staff may access health records;
(c) Audit logs track all access to health data;
(d) Business Associate Agreements (BAAs) are in place with all therapy providers;
(e) Users may request their health data at any time;
(f) Data retention follows medical record retention laws.

Fearless Revolution Foundation, as a trauma support non-profit, maintains additional safeguards for victim-sensitive data, including enhanced encryption and limited access protocols.`
  },
  {
    id: 'rights',
    title: '8. Your Rights',
    icon: UserCheck,
    content: `Depending on your jurisdiction, you may have the right to:

(a) Access the personal information we hold about you;
(b) Correct inaccurate or incomplete information;
(c) Delete your personal information (subject to legal retention requirements);
(d) Object to or restrict certain processing activities;
(e) Data portability — receive your data in a structured format;
(f) Withdraw consent for optional data uses;
(g) Lodge a complaint with a data protection authority.

To exercise these rights, contact privacy@ad9x.io. We will respond within 30 days.`
  },
  {
    id: 'retention',
    title: '9. Data Retention',
    icon: Trash2,
    content: `We retain your information for as long as necessary to:

(a) Provide JamZia™ services;
(b) Comply with legal obligations;
(c) Resolve disputes;
(d) Enforce our agreements;
(e) Maintain blockchain audit trails (indefinitely, as ledgers are immutable).

Upon account deletion:
(a) Profile data is removed within 30 days;
(b) Content may be anonymized or retained for legal purposes;
(c) Transaction data remains on the XRP Ledger;
(d) Academic records are retained per educational record laws.`
  },
  {
    id: 'children',
    title: '10. Children\'s Privacy',
    icon: Shield,
    content: `JamZia™ is not intended for children under 13 without parental consent. The JamLearn™ educational platform (Mrs. Cotton's Academy) and JamPsych™ (Miss Cotton's Academy) include content appropriate for minors with appropriate safeguards:

(a) COPPA-compliant data collection for users under 13;
(b) Parental consent required for account creation;
(c) Limited data collection for educational users;
(d) No targeted advertising to minors;
(e) Content moderation appropriate for all ages.

If you believe we have collected data from a child without appropriate consent, contact privacy@ad9x.io immediately.`
  },
  {
    id: 'contact',
    title: '11. Contact Us',
    icon: Globe,
    content: `For privacy questions, data requests, or complaints:

Email: privacy@ad9x.io
Address: Ad9x Holdings, LLC, Wilmington, DE 19801
DPO: dpo@ad9x.io

For Fearless Revolution Foundation-specific privacy matters:
Email: privacy@fearlessrevolution.org

Last Updated: April 26, 2026`
  }
];

export default function JamPrivacy() {
  return (
    <div className="min-h-[100dvh] bg-[#050810] text-white">
      <div className="bg-[#0A0F1E] border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <a href="#/" className="text-[10px] text-[#6B7280] hover:text-white no-underline transition-colors mb-2 inline-block">back</a>
          <div className="flex items-center gap-3 mb-2">
            <Shield size={24} className="text-[#22c55e]" />
            <h1 className="text-xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xs text-[#6B7280]">JamZia Networks™ — Effective April 26, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <section.icon size={16} className="text-[#22c55e]" />
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
            Fearless Revolution Foundation — White Label Partner WL-001 • HIPAA Compliant
          </p>
        </div>
      </div>
    </div>
  );
}
