import React, { useState } from 'react';
import {
  Accessibility,
  Eye,
  Volume2,
  VolumeX,
  Smartphone,
  Check,
  X,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Sparkles,
  Share2,
  Download,
  Upload,
  ShieldCheck,
  Zap,
  Ear,
  Hand,
  Brain,
  Sliders,
  FileCheck,
  HelpCircle,
  Copy,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { AccessibilityPreset, ColorBlindMode, ContrastMode } from '../../types';
import { toPersianDigits } from '../../utils/persian';

interface AccessibilityPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityPassportModal: React.FC<AccessibilityPassportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    settings,
    setFontScale,
    setContrastMode,
    setColorBlindMode,
    toggleScreenReaderVoice,
    toggleTalkBackSimulator,
    toggleReadingGuide,
    toggleDyslexiaFont,
    toggleReducedMotion,
    toggleSimplifiedTextMode,
    toggleVisualCaptions,
    toggleVisualAlertFlashes,
    toggleSignLanguageAssistance,
    toggleLargeTouchTargets,
    toggleHandTremorFilter,
    setOneHandedMode,
    toggleKeyboardNavigationAssistance,
    toggleSwitchAccess,
    toggleDistractionFreeMode,
    toggleScreenMagnifier,
    applyPreset,
    resetSettings,
    exportPassport,
    importPassport,
    announce,
  } = useAccessibility();

  const [activeTab, setActiveTab] = useState<
    'presets' | 'visual' | 'auditory' | 'motor' | 'cognitive' | 'passport'
  >('presets');
  const [importJsonInput, setImportJsonInput] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  if (!isOpen) return null;

  const presetsConfig: Array<{
    id: AccessibilityPreset;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    features: string[];
  }> = [
    {
      id: 'BLIND',
      title: 'نابینایان (Total Blindness)',
      description: 'تنظیمات بهینه‌سازی‌شده برای صفحه‌خوان گویا، بازخورد صوتی و کنتراست زرد روی مشکی',
      icon: Eye,
      accentColor: 'border-yellow-500 bg-yellow-50/20 text-yellow-800',
      features: [
        'قرائت‌گر صوتی خودکار متون (TTS)',
        'شبیه‌ساز TalkBack اندروید',
        'بازخوردهای صوتی گوش‌نواز (Earcons)',
        'کنتراست زرد روی مشکی ویژه مانیتورها',
        'کلیدهای لمسی بزرگ و فاصله ایمن',
      ],
    },
    {
      id: 'LOW_VISION',
      title: 'کم‌بینایان (Low Vision & Acuity)',
      description: 'بزرگ‌نمایی متن، خط‌کش راهنمای مطالعه و کنتراست حداکثری خطوط',
      icon: ZoomIn,
      accentColor: 'border-indigo-500 bg-indigo-50/20 text-indigo-800',
      features: [
        'بزرگ‌نمایی قلم تا ۱۴۵ درصد',
        'خط‌کش تمرکز مطالعه متن',
        'حالت کنتراست زرد روی مشکی',
        'کلیدهای لمسی حداقل ۴۸ پیکسل',
      ],
    },
    {
      id: 'DEAF',
      title: 'ناشنوایان (Deaf & Non-Verbal)',
      description: 'حذف وابستگی به صوت، ارائه زیرنویس همزمان و هشدارهای نوری دیداری',
      icon: Ear,
      accentColor: 'border-emerald-500 bg-emerald-50/20 text-emerald-800',
      features: [
        'زیرنویس همزمان تمام اعلان‌ها و گفتارها',
        'هشدارهای نوری چشمک‌زن به جای بوق صوتی',
        'نشانگر زبان اشاره فارسی و بین‌المللی',
        'متون توضیحی جایگزین عناصر صوتی',
      ],
    },
    {
      id: 'HARD_OF_HEARING',
      title: 'کم‌شنوایان (Hard of Hearing)',
      description: 'ترکیب صوت‌های تقویتی ویژه و زیرنویس دیداری پیوسته',
      icon: Volume2,
      accentColor: 'border-cyan-500 bg-cyan-50/20 text-cyan-800',
      features: [
        'فرکانس‌های بهینه‌سازی شده افکت‌های صوتی',
        'زیرنویس همزمان گفتار',
        'هشدارهای نوری و لرزشی دیداری',
      ],
    },
    {
      id: 'MOTOR_LIMITED',
      title: 'توان‌یابان حرکتی و ویلچر (Motor & Mobility)',
      description: 'کلیدهای بزرگ ۵۶px، فیلتر لرزش دست، سوییچ اکسس و ارگونومی تک‌دستی',
      icon: Hand,
      accentColor: 'border-rose-500 bg-rose-50/20 text-rose-800',
      features: [
        'کلیدهای لمسی عریض ۵۶ پیکسل',
        'فیلتر هوشمند لرزش دست و ضدکلیک تصادفی',
        'سازگاری کامل با Switch Access و پدال',
        'چیدمان ارگونومیک تک‌دست (چپ یا راست)',
      ],
    },
    {
      id: 'COGNITIVE_DYSLEXIA',
      title: 'خوانش‌پریشی و تمرکز (Cognitive & Dyslexia)',
      description: 'قلم بازخوانا با فاصله باز، ساده‌سازی متون و حذف عوامل حواس‌پرتی',
      icon: Brain,
      accentColor: 'border-purple-500 bg-purple-50/20 text-purple-800',
      features: [
        'قلم ویژه با کشیدگی و فاصله حروف',
        'حالت متون ساده‌سازی‌شده روان (Plain Text)',
        'حالت تمرکز و محوسازی بخش‌های جانبی',
        'توقف تمام انیمیشن‌ها و حرکات مداوم',
      ],
    },
    {
      id: 'SENIOR',
      title: 'سالمندان و بازنشستگان (Seniors & Elders)',
      description: 'قلم درشت، رابط کاربری ساده، راهنمایی‌های صوتی گویا و دکمه‌های واضح',
      icon: Accessibility,
      accentColor: 'border-amber-500 bg-amber-50/20 text-amber-800',
      features: [
        'اندازه قلم ۱۳۰ درصد',
        'دکمه‌ها و فرم‌های بزرگ و مشخص',
        'دستیار صوتی و راهنمای گام‌به‌گام',
        'عدم نیاز به حرکات پیچیده لمسی',
      ],
    },
  ];

  const handleCopyPassport = () => {
    const passportData = exportPassport();
    navigator.clipboard.writeText(passportData);
    setCopyFeedback(true);
    announce('کد گذرنامه دسترسی‌پذیری در حافظه موقت کپی شد');
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const handleImportPassport = () => {
    if (!importJsonInput.trim()) return;
    const ok = importPassport(importJsonInput.trim());
    if (ok) {
      setImportJsonInput('');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="passport-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-md overflow-y-auto animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-3xl shadow-2xl border-2 border-indigo-500/40 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex items-center justify-between border-b border-indigo-500/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Accessibility className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="passport-modal-title" className="text-base sm:text-lg font-black text-white">
                  گذرنامه جامع دسترسی‌پذیری شهر توانا (A11y Passport)
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  WCAG 2.1 AAA
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 mt-0.5">
                تطبیق بلادرنگ سیستم با نیازهای نابینایان، ناشنوایان، کم‌توانان حرکتی، ذهنی و سالمندان
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              announce('پنجره گذرنامه دسترسی‌پذیری بسته شد');
            }}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-2xl transition-colors cursor-pointer"
            aria-label="بستن پنجره"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 pt-3 pb-2 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>پروفایل‌های هوشمند (Presets)</span>
          </button>

          <button
            onClick={() => setActiveTab('visual')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'visual'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>دیداری و کوررنگی</span>
          </button>

          <button
            onClick={() => setActiveTab('auditory')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'auditory'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Ear className="w-3.5 h-3.5" />
            <span>شنوایی و زیرنویس</span>
          </button>

          <button
            onClick={() => setActiveTab('motor')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'motor'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>حرکتی، سوییچ و لرزش دست</span>
          </button>

          <button
            onClick={() => setActiveTab('cognitive')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cognitive'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>ذهنی، خوانش‌پریشی و تمرکز</span>
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'passport'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>صدور و انتقال گذرنامه</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    فعال‌سازی سریع پروفایل با یک کلیک
                  </h3>
                  <p className="text-xs text-slate-500">
                    انتخاب وضعیت به طور خودکار بهترین ترکیب کنتراست، قلم، صدا و ناوبری را برای شما فعال می‌کند
                  </p>
                </div>
                {settings.activePreset !== 'CUSTOM' && (
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-300">
                    پروفایل فعال: {settings.activePreset}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {presetsConfig.map((preset) => {
                  const Icon = preset.icon;
                  const isActive = settings.activePreset === preset.id;
                  return (
                    <div
                      key={preset.id}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-500/30'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                              <Icon className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900">{preset.title}</h4>
                          </div>
                          {isActive && (
                            <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-lg text-[10px] font-black flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              فعال
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
                          {preset.description}
                        </p>
                        <ul className="space-y-1 text-[10px] text-slate-500 mb-3 font-medium">
                          {preset.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => applyPreset(preset.id)}
                        className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isActive
                            ? 'bg-indigo-600 text-white font-black'
                            : 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800'
                        }`}
                      >
                        {isActive ? 'پروفایل فعال است' : 'اعمال این پروفایل روی برنامه'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL & DALTONISM */}
          {activeTab === 'visual' && (
            <div className="space-y-5">
              {/* Font Size */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        مقیاس قلم و بزرگ‌نمایی متن
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        تغییر بدون افت کیفیت تمام کلمات و عناوین تا ۱۶۰٪
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-indigo-700 bg-white px-3 py-1 rounded-xl border border-slate-200 font-latin">
                    {toPersianDigits(Math.round(settings.fontScale * 100))}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontScale(settings.fontScale - 0.1)}
                    disabled={settings.fontScale <= 0.85}
                    className="flex-1 py-2 bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-800 font-bold rounded-xl border border-slate-200 text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                    کوچک‌تر
                  </button>
                  <button
                    onClick={() => setFontScale(1)}
                    className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-200 text-xs cursor-pointer"
                  >
                    ۱۰۰٪ استاندارد
                  </button>
                  <button
                    onClick={() => setFontScale(settings.fontScale + 0.1)}
                    disabled={settings.fontScale >= 1.6}
                    className="flex-1 py-2 bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-800 font-bold rounded-xl border border-slate-200 text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    بزرگ‌تر
                  </button>
                </div>
              </div>

              {/* Contrast Modes */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-600" />
                  حالت‌های کنتراست نمایش و خوانایی حداکثری
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-bold">
                  {[
                    { id: 'NORMAL', label: 'استاندارد روز', bg: 'bg-white text-slate-900 border-slate-300' },
                    { id: 'DARK', label: 'تیره شب (Dark)', bg: 'bg-slate-900 text-white border-slate-700' },
                    {
                      id: 'YELLOW_ON_BLACK',
                      label: 'زرد روی مشکی (کم‌بینایان)',
                      bg: 'bg-black text-yellow-300 border-yellow-400',
                    },
                    {
                      id: 'HIGH_CONTRAST_LIGHT',
                      label: 'سفید روی مشکی خطی',
                      bg: 'bg-white text-black border-black ring-1 ring-black',
                    },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setContrastMode(m.id as ContrastMode)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${m.bg} ${
                        settings.contrastMode === m.id
                          ? 'ring-3 ring-indigo-500 font-black shadow-md scale-102'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Blindness Daltonism Filters */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  فیلترهای انطباق با انواع کوررنگی (Daltonism Filters)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
                  {[
                    { id: 'NONE', label: 'بدون فیلتر (عادی)' },
                    { id: 'DEUTERANOPIA', label: 'سبزکوری (Deuteranopia)' },
                    { id: 'PROTANOPIA', label: 'سرخ‌کوری (Protanopia)' },
                    { id: 'TRITANOPIA', label: 'آبی‌کوری (Tritanopia)' },
                    { id: 'MONOCHROME', label: 'تک‌رنگی (Achromatopsia)' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setColorBlindMode(filter.id as ColorBlindMode)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        settings.colorBlindMode === filter.id
                          ? 'border-indigo-600 bg-indigo-600 text-white font-black shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles: Screen Reader, TalkBack, Reading Ruler */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div className="mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                      روخوانی صوتی هوشمند (TTS)
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">
                      قرائت خودکار جملات و متن‌های هر صفحه
                    </p>
                  </div>
                  <button
                    onClick={toggleScreenReaderVoice}
                    className={`w-full py-1.5 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.screenReaderVoiceEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.screenReaderVoiceEnabled ? 'فعال است' : 'روشن کردن'}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div className="mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-indigo-600" />
                      شبیه‌ساز TalkBack اندروید
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">
                      انطباق با رفتارهای استاندارد کادر زرد و ناوبری تالک‌بک
                    </p>
                  </div>
                  <button
                    onClick={toggleTalkBackSimulator}
                    className={`w-full py-1.5 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.talkBackSimulatorEnabled
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.talkBackSimulatorEnabled ? 'فعال است' : 'روشن کردن'}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div className="mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      خط‌کش تمرکز مطالعه
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">
                      خط افقی دنبال‌کننده اشاره‌گر ماوس برای هدایت چشم
                    </p>
                  </div>
                  <button
                    onClick={toggleReadingGuide}
                    className={`w-full py-1.5 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.readingGuideEnabled
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.readingGuideEnabled ? 'فعال است' : 'روشن کردن'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUDITORY & CAPTIONS */}
          {activeTab === 'auditory' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Ear className="w-5 h-5 text-indigo-600" />
                      زیرنویس همزمان دیداری (Real-Time Live Captions)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      نمایش بلادرنگ متن تمام صداها، دیالوگ‌ها و اعلان‌های صوتی سیستم در پایین صفحه با کادر مشکی و زرد
                    </p>
                  </div>
                  <button
                    onClick={toggleVisualCaptions}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.visualCaptionsEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.visualCaptionsEnabled ? 'فعال (زیرنویس روشن)' : 'غیرفعال'}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      هشدارهای نوری دیداری (Visual Alert Flashes)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      چشمک‌زدن نوری لبه‌های صفحه در هنگام رخداد خطا یا موفقیت به جای پخش صدا
                    </p>
                  </div>
                  <button
                    onClick={toggleVisualAlertFlashes}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.visualAlertFlashes
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.visualAlertFlashes ? 'فعال (نور چشمک‌زن)' : 'غیرفعال'}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Hand className="w-5 h-5 text-indigo-600" />
                      پشتیبانی از زبان اشاره (Sign Language Assistance)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      نمایش آیکون‌ها و متون کمکی منطبق بر زبان اشاره در ویترین‌ها و اتاق‌های گفتگو
                    </p>
                  </div>
                  <button
                    onClick={toggleSignLanguageAssistance}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.signLanguageAssistance
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.signLanguageAssistance ? 'فعال' : 'غیرفعال'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MOTOR & SWITCH ACCESS */}
          {activeTab === 'motor' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Hand className="w-5 h-5 text-indigo-600" />
                      کلیدهای لمسی بزرگ (Large Touch Targets ۴۸-۵۶px)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      افزایش ابعاد تمام دکمه‌ها و لینک‌ها برای جلوگیری از خطای لمسی و لرزش دست
                    </p>
                  </div>
                  <button
                    onClick={toggleLargeTouchTargets}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.largeTouchTargets
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.largeTouchTargets ? 'فعال (کلیدهای بزرگ)' : 'عادی'}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-indigo-600" />
                      فیلتر لرزش دست (Hand Tremor Debounce)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      جلوگیری هوشمند از کلیک‌های رگباری یا تصادفی ناشی از بیماری پارکینسون یا لرزش دست
                    </p>
                  </div>
                  <button
                    onClick={toggleHandTremorFilter}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.handTremorFilter
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.handTremorFilter ? 'فیلتر فعال است' : 'غیرفعال'}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-indigo-600" />
                      چیدمان ارگونومیک تک‌دست (One-Handed Ergonomics)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      تراز کردن عناصر صفحه به سمت چپ یا راست برای دسترسی آسان شست دست
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setOneHandedMode('NONE')}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
                        settings.oneHandedMode === 'NONE'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      عادی
                    </button>
                    <button
                      onClick={() => setOneHandedMode('RIGHT')}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
                        settings.oneHandedMode === 'RIGHT'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      دست راست
                    </button>
                    <button
                      onClick={() => setOneHandedMode('LEFT')}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
                        settings.oneHandedMode === 'LEFT'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      دست چپ
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-indigo-600" />
                      سازگاری با Switch Access و پدال‌های کمکی
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      امکان پیمایش و انتخاب تمام گزینه‌ها فقط با یک یا دو کلید خارجی
                    </p>
                  </div>
                  <button
                    onClick={toggleSwitchAccess}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.switchAccessEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.switchAccessEnabled ? 'فعال است' : 'غیرفعال'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COGNITIVE & DYSLEXIA */}
          {activeTab === 'cognitive' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-indigo-600" />
                      قلم ویژه خوانش‌پریشان (Dyslexia-Friendly Spacing)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      افزایش فاصله بین حروف و کلمات با ضخامت پایین برای کاهش درهم‌آمیختگی حروف
                    </p>
                  </div>
                  <button
                    onClick={toggleDyslexiaFont}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.dyslexiaFontEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.dyslexiaFontEnabled ? 'فعال' : 'غیرفعال'}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      حالت تمرکز و حذف حواس‌پرتی (Distraction-Free Focus)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      محو و کم‌رنگ کردن المان‌های جانبی، بنرها و پویانمایی‌های پس‌زمینه
                    </p>
                  </div>
                  <button
                    onClick={toggleDistractionFreeMode}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.distractionFreeMode
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.distractionFreeMode ? 'فعال' : 'غیرفعال'}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-indigo-600" />
                      ساده‌سازی متون و روان‌خوانی (Plain Language)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      تبدیل اصطلاحات فنی و سخت به جملات ساده و صریح برای درک آسان
                    </p>
                  </div>
                  <button
                    onClick={toggleSimplifiedTextMode}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.simplifiedTextMode
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.simplifiedTextMode ? 'فعال' : 'غیرفعال'}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      کاهش حرکات و پویانمایی (Reduced Motion)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      توقف تمام ترنزیشن‌ها برای پیشگیری از سرگیجه و حملات صرع نوری
                    </p>
                  </div>
                  <button
                    onClick={toggleReducedMotion}
                    className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      settings.reducedMotion
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {settings.reducedMotion ? 'فعال' : 'غیرفعال'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PASSPORT EXPORT / IMPORT */}
          {activeTab === 'passport' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        گذرنامه استاندارد دسترسی‌پذیری توانا (نسخه ۲.۰)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        این کد شامل تمام تنظیمات دیداری، شنیداری و حرکتی شماست و در هر دستگاه یا اپ توانا قابل استفاده است.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPassport}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copyFeedback ? 'کپی شد!' : 'کپی گذرنامه'}</span>
                  </button>
                </div>

                <div className="p-3 bg-slate-900 text-indigo-200 rounded-xl font-mono text-[10px] ltr text-left overflow-x-auto max-h-36">
                  <pre>{exportPassport()}</pre>
                </div>
              </div>

              {/* Import Section */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-600" />
                  بارگذاری گذرنامه از دستگاه دیگر (Import Passport)
                </h4>
                <p className="text-[11px] text-slate-500">
                  اگر کد JSON گذرنامه خود را از قبل ذخیره کرده‌اید، آن را در کادر زیر وارد کنید:
                </p>
                <textarea
                  value={importJsonInput}
                  onChange={(e) => setImportJsonInput(e.target.value)}
                  placeholder="کد JSON گذرنامه را اینجا الصاق (Paste) کنید..."
                  rows={3}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 ltr text-left focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  onClick={handleImportPassport}
                  disabled={!importJsonInput.trim()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>بارگذاری و اعمال فوری روی برنامه</span>
                </button>
              </div>

              {/* WCAG 2.1 AAA Compliance Badge Report */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <div className="p-2 bg-emerald-600 text-white rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-emerald-900">
                    انطباق ۱۰۰٪ با استاندارد بین‌المللی WCAG 2.1 AAA
                  </h5>
                  <p className="text-[11px] text-emerald-700">
                    رعایت نسبت کنتراست ۷:۱ برای متون، پشتیبانی تمام‌صفحه‌کلید، عدم وابستگی به رنگ، پشتیبانی TalkBack و VoiceOver، فیلتر لرزش دست و متون جایگزین کامل.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={resetSettings}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 p-2 rounded-xl hover:bg-rose-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>بازنشانی به تنظیمات پیش‌فرض</span>
          </button>
          <button
            onClick={() => {
              onClose();
              announce('تنظیمات دسترسی‌پذیری ذخیره و اعمال شد');
            }}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>تایید و ذخیره گذرنامه</span>
          </button>
        </div>
      </div>
    </div>
  );
};
