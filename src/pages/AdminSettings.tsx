import { useState } from 'react';
import {
  Globe, Palette, Bell, Shield, Database,
  Save, CheckCircle,
} from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  settings: {
    id: string;
    label: string;
    description: string;
    type: 'toggle' | 'select' | 'text';
    value: string | boolean;
    options?: string[];
  }[];
}

const SETTINGS_DATA: SettingSection[] = [
  {
    id: 'general',
    title: 'General',
    icon: Globe,
    settings: [
      { id: 'site_name', label: 'Platform Name', description: 'Displayed in header and emails', type: 'text', value: 'JamZia™' },
      { id: 'timezone', label: 'Default Timezone', description: 'For all scheduled content', type: 'select', value: 'UTC', options: ['UTC', 'EST', 'PST', 'GMT'] },
      { id: 'language', label: 'Default Language', description: 'Primary interface language', type: 'select', value: 'English', options: ['English', 'Spanish', 'French', 'German', 'Japanese'] },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Palette,
    settings: [
      { id: 'dark_mode', label: 'Dark Mode Default', description: 'Default theme for new users', type: 'toggle', value: true },
      { id: 'brand_color', label: 'Primary Brand Color', description: 'Hex code for brand accent', type: 'text', value: '#7096D1' },
      { id: 'animations', label: 'UI Animations', description: 'Enable transition animations', type: 'toggle', value: true },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    settings: [
      { id: 'email_alerts', label: 'Admin Email Alerts', description: 'Critical system notifications', type: 'toggle', value: true },
      { id: 'mod_alerts', label: 'Moderation Alerts', description: 'Real-time moderation notifications', type: 'toggle', value: true },
      { id: 'revenue_alerts', label: 'Revenue Threshold Alerts', description: 'Notify on revenue milestones', type: 'toggle', value: false },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    settings: [
      { id: '2fa_required', label: 'Require 2FA for Admins', description: 'Two-factor for all admin accounts', type: 'toggle', value: true },
      { id: 'session_timeout', label: 'Session Timeout', description: 'Auto-logout after inactivity (minutes)', type: 'select', value: '60', options: ['15', '30', '60', '120', '240'] },
      { id: 'ip_whitelist', label: 'IP Whitelist', description: 'Comma-separated allowed admin IPs', type: 'text', value: '' },
    ],
  },
  {
    id: 'storage',
    title: 'Storage & Data',
    icon: Database,
    settings: [
      { id: 'cdn_domain', label: 'CDN Domain', description: 'Media asset delivery domain', type: 'text', value: 'cdn.jamzia.tv' },
      { id: 'backup_auto', label: 'Auto Backup', description: 'Daily automated backups', type: 'toggle', value: true },
      { id: 'retention', label: 'Data Retention', description: 'Days to retain deleted content', type: 'select', value: '90', options: ['30', '60', '90', '180', '365'] },
    ],
  },
  {
    id: 'whitelabel',
    title: 'White Label',
    icon: Palette,
    settings: [
      { id: 'wl_enabled', label: 'White Label Mode', description: 'Enable white-label instance for client', type: 'toggle', value: true },
      { id: 'wl_org_name', label: 'Organization Name', description: 'Displayed across all platforms', type: 'text', value: 'Fearless Revolution Foundation' },
      { id: 'wl_brand_name', label: 'Brand Name', description: 'App name (e.g., NoFearZia)', type: 'text', value: 'NoFearZia' },
      { id: 'wl_id', label: 'WL ID', description: 'White-label instance identifier', type: 'text', value: 'WL-001' },
      { id: 'wl_primary_color', label: 'Primary Color', description: 'Hex code for brand accent', type: 'text', value: '#4A90A4' },
      { id: 'wl_secondary_color', label: 'Secondary Color', description: 'Hex code for secondary accent', type: 'text', value: '#D4A574' },
      { id: 'wl_domain', label: 'Custom Domain', description: 'Client-facing domain', type: 'text', value: 'nofear.jamzia.tv' },
      { id: 'wl_status', label: 'Instance Status', description: 'Current deployment status', type: 'select', value: 'active', options: ['active', 'staging', 'maintenance', 'suspended'] },
    ],
  },
];

function SettingRow({ setting, onChange }: { setting: SettingSection['settings'][0]; onChange: (id: string, value: string | boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-xs font-medium text-white">{setting.label}</p>
        <p className="text-[10px] text-[#6B7280] mt-0.5">{setting.description}</p>
      </div>
      <div className="shrink-0">
        {setting.type === 'toggle' && (
          <button
            onClick={() => onChange(setting.id, !setting.value)}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${setting.value ? 'bg-[#7096D1]' : 'bg-white/[0.1]'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${setting.value ? 'left-5' : 'left-0.5'}`} />
          </button>
        )}
        {setting.type === 'select' && (
          <select
            value={setting.value as string}
            onChange={(e) => onChange(setting.id, e.target.value)}
            className="bg-[#050810] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-white focus:border-[#7096D1]/50 focus:outline-none"
          >
            {setting.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )}
        {setting.type === 'text' && (
          <input
            type="text"
            value={setting.value as string}
            onChange={(e) => onChange(setting.id, e.target.value)}
            className="bg-[#050810] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-white focus:border-[#7096D1]/50 focus:outline-none w-32 sm:w-48"
          />
        )}
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(SETTINGS_DATA);
  const [saved, setSaved] = useState(false);

  const handleChange = (sectionId: string, settingId: string, value: string | boolean) => {
    setSettings((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map((s) =>
                s.id === settingId ? { ...s, value } : s
              ),
            }
          : section
      )
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-white">Settings</h1>
          <p className="text-xs text-[#6B7280]">Configure platform-wide settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            saved
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
              : 'bg-gradient-to-r from-[#081F5C] to-[#7096D1] text-white hover:opacity-90'
          }`}
        >
          {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-4">
        {settings.map((section) => (
          <div key={section.id} className="bg-[#0A0F1E] border border-white/[0.06] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.04]">
              <div className="w-8 h-8 rounded-lg bg-[#7096D1]/10 flex items-center justify-center">
                <section.icon size={16} className="text-[#7096D1]" />
              </div>
              <h2 className="text-sm font-bold text-white">{section.title}</h2>
            </div>
            <div>
              {section.settings.map((setting) => (
                <SettingRow
                  key={setting.id}
                  setting={setting}
                  onChange={(id, value) => handleChange(section.id, id, value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
