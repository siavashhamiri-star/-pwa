import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Award,
  Accessibility,
  Eye,
  Ear,
  HelpCircle,
} from 'lucide-react';
import {
  CreatorLeagueTier,
  VerificationStatus,
  BusinessAccessibilityFeature,
} from '../../types';

export const LeagueBadge: React.FC<{ tier: CreatorLeagueTier; showIcon?: boolean }> = ({
  tier,
  showIcon = true,
}) => {
  let label = 'لیگ برنز';
  let classes = 'bg-amber-100 text-amber-900 border-amber-300';

  if (tier === 'SILVER') {
    label = 'لیگ نقره‌ای';
    classes = 'bg-slate-200 text-slate-800 border-slate-300';
  } else if (tier === 'GOLD') {
    label = 'لیگ طلایی';
    classes = 'bg-yellow-100 text-yellow-900 border-yellow-400';
  } else if (tier === 'DIAMOND') {
    label = 'لیگ الماس';
    classes = 'bg-cyan-100 text-cyan-900 border-cyan-300';
  } else if (tier === 'CHAMPION') {
    label = 'قهرمان توانمند';
    classes = 'bg-purple-100 text-purple-950 border-purple-400 font-black ring-1 ring-purple-400';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${classes} shadow-2xs whitespace-nowrap`}
    >
      {showIcon && <Award className="w-3.5 h-3.5 shrink-0" />}
      {label}
    </span>
  );
};

export const VerificationBadge: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  if (status === 'VERIFIED') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs whitespace-nowrap">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        نشان اصالت توانا (تأییدشده)
      </span>
    );
  }

  if (status === 'SELF_DECLARED') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300 shadow-2xs whitespace-nowrap">
        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
        خوداظهاری سازنده
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
      <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
      بررسی نشده
    </span>
  );
};

export const AccessibilityFeatureBadge: React.FC<{ feature: BusinessAccessibilityFeature }> = ({
  feature,
}) => {
  const map: Record<BusinessAccessibilityFeature, { label: string; icon: string; bg: string }> = {
    WHEELCHAIR_RAMP: { label: 'رمپ استاندارد ویلچر', icon: 'Accessibility', bg: 'bg-blue-50 text-blue-900 border-blue-200' },
    ELEVATOR: { label: 'آسانسور دسترس‌پذیر', icon: 'Building', bg: 'bg-blue-50 text-blue-900 border-blue-200' },
    BRAILLE_MENU: { label: 'منو و بروشور خط بریل', icon: 'Eye', bg: 'bg-purple-50 text-purple-900 border-purple-200' },
    AUDIO_GUIDE: { label: 'راهنمای صوتی گویا', icon: 'Headphones', bg: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
    SIGN_LANGUAGE_SUPPORT: { label: 'پشتیبانی زبان اشاره', icon: 'Ear', bg: 'bg-teal-50 text-teal-900 border-teal-200' },
    TEXT_BASED_ORDERING: { label: 'سفارش‌گیری تمام متنی', icon: 'MessageSquare', bg: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
    QUIET_ENVIRONMENT: { label: 'محیط کم‌صدا و آرام', icon: 'VolumeX', bg: 'bg-amber-50 text-amber-900 border-amber-200' },
    ACCESSIBLE_RESTROOM: { label: 'سرویس بهداشتی دسترس‌پذیر', icon: 'Check', bg: 'bg-slate-100 text-slate-800 border-slate-200' },
    GUIDE_DOG_FRIENDLY: { label: 'پذیرش سگ راهنما', icon: 'Heart', bg: 'bg-rose-50 text-rose-900 border-rose-200' },
    HOME_DELIVERY: { label: 'ارسال درب منزل با هماهنگی', icon: 'Truck', bg: 'bg-cyan-50 text-cyan-900 border-cyan-200' },
  };

  const item = map[feature] || { label: feature, icon: 'Check', bg: 'bg-slate-100 text-slate-800 border-slate-200' };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${item.bg} whitespace-nowrap`}
    >
      <Accessibility className="w-3.5 h-3.5 shrink-0 opacity-80" />
      {item.label}
    </span>
  );
};
