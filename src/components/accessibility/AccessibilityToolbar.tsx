import React, { useState } from 'react';
import {
  Accessibility,
  Volume2,
  VolumeX,
  Eye,
  Sun,
  Moon,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Sparkles,
  Smartphone,
  Check,
  X,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { toPersianDigits } from '../../utils/persian';

export const AccessibilityToolbar: React.FC = () => {
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
          announce(isOpen ? 'منوی دسترسی‌پذیری بسته شد' : 'منوی تنظیمات دسترسی‌پذیری باز شد');
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
          className="mt-3 w-84 sm:w-96 p-5 bg-white text-slate-900 rounded-3xl shadow-2xl border-2 border-indigo-500/30 space-y-4 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                <Accessibility className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">پنل استانداردهای دسترسی‌پذیری</h3>
                <p className="text-[11px] text-slate-500">منطبق بر استانداردهای WCAG 2.1 و TalkBack</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              aria-label="بستن منو"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Screen Reader & Speech Voice */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-indigo-600" />
                قرائت‌گر صوتی هوشمند (Screen Reader)
              </span>
              <button
                onClick={toggleScreenReaderVoice}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  settings.screenReaderVoiceEnabled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {settings.screenReaderVoiceEnabled ? 'فعال' : 'غیرفعال'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              روخوانی صوتی خودکار متون و اعلان‌های مهم با کلیک روی هر بخش
            </p>
          </div>

          {/* TalkBack & Android A11y Simulator */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-600" />
                شبیه‌ساز تالک‌بک اندروید (TalkBack)
              </span>
              <button
                onClick={toggleTalkBackSimulator}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  settings.talkBackSimulatorEnabled
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {settings.talkBackSimulatorEnabled ? 'روشن' : 'خاموش'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              شبیه‌سازی بازخوردهای صوتی و کادر فوکوس TalkBack اپلیکیشن نیتیو اندروید توانا
            </p>
          </div>

          {/* Font Scaling */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
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
                disabled={settings.fontScale <= 0.9}
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
                disabled={settings.fontScale >= 1.5}
                className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-1 text-xs cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                بزرگ‌تر
              </button>
            </div>
          </div>

          {/* High Contrast Themes */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-600" />
              حالت‌های کنتراست و خوانایی:
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
                استاندارد
              </button>
              <button
                onClick={() => setContrastMode('DARK')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                  settings.contrastMode === 'DARK'
                    ? 'border-indigo-600 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-900 text-slate-200'
                }`}
              >
                تیره (Dark)
              </button>
              <button
                onClick={() => setContrastMode('YELLOW_ON_BLACK')}
                className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                  settings.contrastMode === 'YELLOW_ON_BLACK'
                    ? 'border-yellow-400 bg-black text-yellow-300 ring-2 ring-yellow-400'
                    : 'border-slate-700 bg-black text-yellow-400'
                }`}
              >
                زرد روی مشکی
              </button>
            </div>
          </div>

          {/* Reading Ruler & Reduced Motion */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                خط‌کش راهنمای تمرکز مطالعه
              </span>
              <button
                onClick={toggleReadingGuide}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  settings.readingGuideEnabled
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {settings.readingGuideEnabled ? 'فعال' : 'غیرفعال'}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                کاهش حرکات و پویانمایی
              </span>
              <button
                onClick={toggleReducedMotion}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  settings.reducedMotion
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {settings.reducedMotion ? 'فعال' : 'غیرفعال'}
              </button>
            </div>
          </div>

          {/* Reset Action */}
          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              onClick={resetSettings}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 p-1"
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
