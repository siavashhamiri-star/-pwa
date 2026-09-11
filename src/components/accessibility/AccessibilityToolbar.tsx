import React, { useState } from 'react';
import {
  Accessibility,
  Volume2,
  Eye,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Sparkles,
  Smartphone,
  Ear,
  Hand,
  Brain,
  Sliders,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { toPersianDigits } from '../../utils/persian';

interface AccessibilityToolbarProps {
  onOpenPassportModal?: () => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  onOpenPassportModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    setFontScale,
    setContrastMode,
    toggleScreenReaderVoice,
    toggleTalkBackSimulator,
    toggleReadingGuide,
    toggleDyslexiaFont,
    toggleReducedMotion,
    toggleVisualCaptions,
    toggleLargeTouchTargets,
    applyPreset,
    resetSettings,
    announce,
  } = useAccessibility();

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start font-sans">
      {/* Floating Trigger Button */}
      <button
        id="btn-accessibility-toolbar"
        onClick={() => {
          setIsOpen(!isOpen);
          announce(isOpen ? 'منوی دسترسی‌پذیری بسته شد' : 'منوی سریع دسترسی‌پذیری باز شد');
        }}
        aria-expanded={isOpen}
        aria-label="تنظیمات دسترسی‌پذیری و صفحه‌خوان شهر توانا"
        className="flex items-center gap-2.5 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-2xl shadow-xl border-2 border-indigo-300/40 transition-all cursor-pointer"
      >
        <Accessibility className="w-6 h-6 animate-pulse" />
        <span className="text-xs sm:text-sm font-black">ابزارهای دسترسی‌پذیری (A11y)</span>
      </button>

      {/* Expanded Modal / Popover */}
      {isOpen && (
        <div
          id="popover-a11y-settings"
          role="region"
          aria-label="پنل امکانات دسترس‌پذیری"
          className="mt-3 w-88 sm:w-96 p-4 sm:p-5 bg-white text-slate-900 rounded-3xl shadow-2xl border-2 border-indigo-500/30 space-y-3.5 max-h-[82vh] overflow-y-auto animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                <Accessibility className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">تنظیمات سریع دسترس‌پذیری</h3>
                <p className="text-[11px] text-slate-500">WCAG 2.1 AAA و پشتیبانی چندمعلولیتی</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer"
              aria-label="بستن منو"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Direct Passport Modal CTA */}
          {onOpenPassportModal && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenPassportModal();
                announce('باز شدن گذرنامه جامع دسترسی‌پذیری توانا');
              }}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 text-white rounded-2xl font-black text-xs flex items-center justify-between shadow-xs cursor-pointer border border-indigo-400/30"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-300" />
                <span>گذرنامه کامل و تنظیمات تفصیلی معلولین</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Quick Presets Carousel */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700">پروفایل‌های سریع ۱-کلیکی:</span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
              <button
                onClick={() => applyPreset('BLIND')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  settings.activePreset === 'BLIND'
                    ? 'border-yellow-500 bg-black text-yellow-300'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>نابینایان</span>
              </button>
              <button
                onClick={() => applyPreset('LOW_VISION')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  settings.activePreset === 'LOW_VISION'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-black'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>کم‌بینایان</span>
              </button>
              <button
                onClick={() => applyPreset('DEAF')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  settings.activePreset === 'DEAF'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-black'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Ear className="w-3.5 h-3.5" />
                <span>ناشنوایان</span>
              </button>
              <button
                onClick={() => applyPreset('MOTOR_LIMITED')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  settings.activePreset === 'MOTOR_LIMITED'
                    ? 'border-rose-600 bg-rose-50 text-rose-900 font-black'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Hand className="w-3.5 h-3.5" />
                <span>حرکتی</span>
              </button>
              <button
                onClick={() => applyPreset('COGNITIVE_DYSLEXIA')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  settings.activePreset === 'COGNITIVE_DYSLEXIA'
                    ? 'border-purple-600 bg-purple-50 text-purple-900 font-black'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>خوانش‌پریشی</span>
              </button>
              <button
                onClick={() => applyPreset('SENIOR')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  settings.activePreset === 'SENIOR'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 font-black'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Accessibility className="w-3.5 h-3.5" />
                <span>سالمندان</span>
              </button>
            </div>
          </div>

          {/* Font Scaling */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-indigo-600" />
                اندازه قلم (بزرگ‌نمایی متن):
              </span>
              <span className="text-xs font-black text-indigo-700 font-latin">
                {toPersianDigits(Math.round(settings.fontScale * 100))}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontScale(settings.fontScale - 0.1)}
                disabled={settings.fontScale <= 0.85}
                className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-1 text-xs cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
                کوچک‌تر
              </button>
              <button
                onClick={() => setFontScale(1)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
              >
                ۱۰۰٪
              </button>
              <button
                onClick={() => setFontScale(settings.fontScale + 0.1)}
                disabled={settings.fontScale >= 1.6}
                className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-1 text-xs cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                بزرگ‌تر
              </button>
            </div>
          </div>

          {/* High Contrast Themes */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-600" />
              کنتراست و روشنایی:
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                onClick={() => setContrastMode('NORMAL')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                  settings.contrastMode === 'NORMAL'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                عادی
              </button>
              <button
                onClick={() => setContrastMode('DARK')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                  settings.contrastMode === 'DARK'
                    ? 'border-indigo-600 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-900 text-slate-200'
                }`}
              >
                تیره
              </button>
              <button
                onClick={() => setContrastMode('YELLOW_ON_BLACK')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                  settings.contrastMode === 'YELLOW_ON_BLACK'
                    ? 'border-yellow-400 bg-black text-yellow-300 ring-2 ring-yellow-400'
                    : 'border-slate-700 bg-black text-yellow-400'
                }`}
              >
                زرد/مشکی
              </button>
            </div>
          </div>

          {/* Toggle Screen Reader & TalkBack */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-indigo-600" />
                قرائت‌گر صوتی (TTS)
              </span>
              <button
                onClick={toggleScreenReaderVoice}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  settings.screenReaderVoiceEnabled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {settings.screenReaderVoiceEnabled ? 'روشن' : 'خاموش'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Ear className="w-4 h-4 text-indigo-600" />
                زیرنویس همزمان گفتار
              </span>
              <button
                onClick={toggleVisualCaptions}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  settings.visualCaptionsEnabled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {settings.visualCaptionsEnabled ? 'روشن' : 'خاموش'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Hand className="w-4 h-4 text-indigo-600" />
                کلیدهای لمسی بزرگ (۴۸px)
              </span>
              <button
                onClick={toggleLargeTouchTargets}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  settings.largeTouchTargets
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {settings.largeTouchTargets ? 'روشن' : 'خاموش'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                خط‌کش راهنمای مطالعه
              </span>
              <button
                onClick={toggleReadingGuide}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  settings.readingGuideEnabled
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {settings.readingGuideEnabled ? 'روشن' : 'خاموش'}
              </button>
            </div>
          </div>

          {/* Reset Action */}
          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              onClick={resetSettings}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 p-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              بازنشانی کلیه تنظیمات
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
