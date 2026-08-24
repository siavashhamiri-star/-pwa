import React from 'react';
import { Volume2, Radio } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ScreenReaderAnnouncer: React.FC = () => {
  const { isSpeaking, activeAnnouncement, settings } = useAccessibility();

  if (!isSpeaking && !settings.talkBackSimulatorEnabled) return null;
  if (!activeAnnouncement) return null;

  return (
    <div
      role="region"
      aria-label="اعلان زنده صفحه‌خوان و تالک‌بک"
      className="fixed top-20 right-5 z-50 max-w-md bg-slate-950/90 text-white p-3 rounded-2xl shadow-2xl border-2 border-indigo-400 backdrop-blur-md animate-bounce"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-indigo-500 rounded-lg text-white">
          <Volume2 className="w-4 h-4 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-[10px] text-indigo-300 font-bold mb-0.5">
            <span>{settings.talkBackSimulatorEnabled ? 'خروجی صوتی تالک‌بک اندروید (TalkBack)' : 'قرائت‌گر صوتی توانا'}</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Radio className="w-3 h-3 animate-ping" /> در حال پخش
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-100 line-clamp-2">
            {activeAnnouncement}
          </p>
        </div>
      </div>
    </div>
  );
};
