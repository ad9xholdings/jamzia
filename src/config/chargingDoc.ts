/* ═══════════════════════════════════════════════════════════
   CHARGING DOCUMENT CONFIG — v2.1 Validator
   Ad9x Holdings, LLC — Cuz Cotton Technical Lead
   ═══════════════════════════════════════════════════════════ */

export const CHARGING_DOC = {
  version: '2.1',
  effectiveDate: '2025-01-01',
  lastUpdated: '2026-04-24',
  owner: 'Ad9x Holdings, LLC',
  classification: 'Internal / Audit-Controlled',

  thresholds: {
    pass: 90,
    warning: 75,
    fail: 0,
  },

  nativeAPIs: [
    'Camera',
    'GPS',
    'Accelerometer',
    'Gyroscope',
    'Push Notifications',
    'Biometrics',
    'Local File Access',
    'Background Processing',
  ],

  securityRequirements: [
    'Certificate Pinning',
    'TLS 1.3+',
    'OWASP Mobile Top 10',
    'Secure Keychain/Keystore',
    'Token Rotation',
    'Session Expiration',
  ],

  architecturePatterns: [
    'MVVM or Clean Architecture',
    'Dependency Injection',
    'Repository Pattern',
    'Interface/Protocol-driven',
  ],

  arDimensions: [
    { name: 'Depth Estimation', min: 5, critical: true },
    { name: 'Occlusion', min: 5, critical: false },
    { name: 'Lighting', min: 5, critical: false },
    { name: 'Spatial Anchoring', min: 5, critical: true },
    { name: 'Physics', min: 5, critical: false },
    { name: 'Texture Quality', min: 5, critical: false },
    { name: 'Tracking Stability', min: 7, critical: true },
    { name: 'Performance (FPS)', min: 7, critical: true },
    { name: 'Multi-User', min: 5, critical: false },
    { name: 'Environmental Understanding', min: 5, critical: false },
  ],

  auditSchedule: {
    automated: '3 hours',
    manual: 'daily',
    full: 'weekly',
  },

  reportFormats: ['md', 'json'],
  storagePath: '/home/ubuntu/audit_logs/',

  requiredEndpoints: [
    { path: '/', purpose: 'Corporate Landing Page' },
    { path: '/app', purpose: 'Application Portal' },
    { path: '/api', purpose: 'API Endpoint Root' },
    { path: '/docs', purpose: 'Developer Documentation' },
    { path: '/status', purpose: 'System Status' },
  ],

  urlCompliance: {
    status: 200,
    sslMinDays: 30,
    maxRedirects: 2,
    brokenLinksTolerance: 0,
    responseTimeP95: 3000,
    uptime: 99.9,
  },
} as const;

/* ── Validator ── */
export function validateChargingDoc(config: Record<string, unknown>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.version) errors.push('Missing version field');
  if (!config.owner) errors.push('Missing owner field');

  const thresholds = config.thresholds as Record<string, number> | undefined;
  if (!thresholds) {
    errors.push('Missing thresholds');
  } else {
    if (thresholds.pass < thresholds.warning) {
      errors.push('Pass threshold must be >= warning threshold');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
