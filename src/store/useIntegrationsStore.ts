import { create } from 'zustand';

export interface IntegrationService {
  id: string;
  name: string;
  description: string;
  category: 'storage' | 'streaming' | 'crm' | 'advertising' | 'monetization';
  status: 'connected' | 'disconnected' | 'pending' | 'error';
  features: string[];
  metrics: { label: string; value: string; change: string }[];
  config: Record<string, string>;
  platformHref: string;
}

const DEFAULT_SERVICES: IntegrationService[] = [
  {
    id: 'jamcloud',
    name: 'JamCloud',
    description: 'Distributed object storage with end-to-end encryption and global content delivery. Store files, media, backups, and application data with 99.99% uptime.',
    category: 'storage',
    status: 'connected',
    features: ['Object Storage', 'File Encryption', 'CDN Distribution', 'Backup & Restore', 'Multipart Upload', 'Access Controls'],
    metrics: [
      { label: 'Storage Used', value: '2.4 TB', change: '+12%' },
      { label: 'Files Stored', value: '1.2M', change: '+8%' },
      { label: 'Bandwidth', value: '8.7 TB/mo', change: '+23%' },
      { label: 'Uptime', value: '99.99%', change: '+0.01%' },
    ],
    config: { bucket: 'jamzia-media', region: 'global', encryption: 'AES-256-GCM' },
    platformHref: '/architecture',
  },
  {
    id: 'jamvideo',
    name: 'JamVideo',
    description: 'Live streaming and video-on-demand platform. Broadcast live events, transcode video to multiple formats, and deliver to any device worldwide.',
    category: 'streaming',
    status: 'connected',
    features: ['Live Streaming', 'VOD Transcoding', 'Multi-bitrate', 'Recording', 'Clip Creation', 'Playback API'],
    metrics: [
      { label: 'Streams', value: '3,420', change: '+34%' },
      { label: 'Viewers', value: '128K', change: '+56%' },
      { label: 'Minutes Streamed', value: '2.1M', change: '+41%' },
      { label: 'Transcoding Cost', value: '$0.002/min', change: '-15%' },
    ],
    config: { profile: '720p,1080p,4K', recording: 'enabled', cdn: 'jamzia-cdn' },
    platformHref: '/video',
  },
  {
    id: 'jamcrm',
    name: 'JamCRM',
    description: 'List building and customer relationship management. Capture leads, manage pipelines, automate outreach campaigns, and track conversions.',
    category: 'crm',
    status: 'connected',
    features: ['Lead Capture', 'Pipeline Management', 'Email Campaigns', 'Contact Segmentation', 'Automation Rules', 'Analytics Dashboard'],
    metrics: [
      { label: 'Total Leads', value: '45,230', change: '+18%' },
      { label: 'Active Lists', value: '124', change: '+5%' },
      { label: 'Open Rate', value: '32.4%', change: '+3.2%' },
      { label: 'Conversion', value: '4.8%', change: '+0.6%' },
    ],
    config: { lists: '12', autoresponder: 'enabled', segmentation: 'advanced' },
    platformHref: '/architecture',
  },
  {
    id: 'jamads-solo',
    name: 'JamAds Solo',
    description: 'Buy and sell solo advertising. Targeted email traffic from verified list owners with built-in click tracking and fraud detection.',
    category: 'advertising',
    status: 'connected',
    features: ['Solo Ad Marketplace', 'Click Tracking', 'Fraud Detection', 'Seller Ratings', 'Campaign Builder', 'ROI Analytics'],
    metrics: [
      { label: 'Active Campaigns', value: '86', change: '+12%' },
      { label: 'Clicks Delivered', value: '234K', change: '+28%' },
      { label: 'Avg CPC', value: '$0.45', change: '-8%' },
      { label: 'Seller Rating', value: '4.8/5', change: '+0.2' },
    ],
    config: { marketplace: 'open', minClicks: '100', fraudProtection: 'enabled' },
    platformHref: '/architecture',
  },
  {
    id: 'jamads-pro',
    name: 'JamAds Pro',
    description: 'Advanced advertising engine. Create, target, optimize, and monetize ad campaigns across JamZia platforms with AI-powered bidding.',
    category: 'advertising',
    status: 'connected',
    features: ['Ad Creation', 'AI Targeting', 'A/B Testing', 'Real-time Bidding', 'Budget Optimization', 'Revenue Sharing'],
    metrics: [
      { label: 'Active Ads', value: '1,240', change: '+22%' },
      { label: 'Impressions', value: '12.4M', change: '+45%' },
      { label: 'CTR', value: '3.2%', change: '+0.8%' },
      { label: 'Revenue', value: '$48.2K', change: '+34%' },
    ],
    config: { bidding: 'AI-optimized', format: 'banner,video,native', revenueShare: '70/30' },
    platformHref: '/architecture',
  },
  {
    id: 'jammonetize',
    name: 'JamMonetize',
    description: 'Content monetization suite. Subscriptions, pay-per-view, tipping, memberships, and creator revenue tools built-in.',
    category: 'monetization',
    status: 'connected',
    features: ['Subscriptions', 'Pay-per-view', 'Tips & Donations', 'Membership Tiers', 'Revenue Split', 'Payout Management'],
    metrics: [
      { label: 'Paid Subscribers', value: '12,400', change: '+19%' },
      { label: 'Monthly Revenue', value: '$89.2K', change: '+27%' },
      { label: 'Creator Payouts', value: '$62.4K', change: '+31%' },
      { label: 'Avg Revenue/User', value: '$7.20', change: '+8%' },
    ],
    config: { tiers: '3', split: '70/30', currency: 'USD' },
    platformHref: '/architecture',
  },
];

interface IntegrationsState {
  services: IntegrationService[];
  activeServiceId: string | null;
  toggleService: (id: string) => void;
  updateConfig: (id: string, key: string, value: string) => void;
  setActiveService: (id: string | null) => void;
}

export const useIntegrationsStore = create<IntegrationsState>()((set, get) => ({
  services: DEFAULT_SERVICES,
  activeServiceId: null,

  toggleService: (id) => {
    set({
      services: get().services.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'connected' ? 'disconnected' : 'connected' as IntegrationService['status'] }
          : s
      ),
    });
  },

  updateConfig: (id, key, value) => {
    set({
      services: get().services.map((s) =>
        s.id === id ? { ...s, config: { ...s.config, [key]: value } } : s
      ),
    });
  },

  setActiveService: (id) => set({ activeServiceId: id }),
}));
