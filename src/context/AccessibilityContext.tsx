import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings, ContrastMode, ColorBlindMode, AccessibilityPreset } from '../types';
import { speakText, stopSpeaking, playEarcon } from '../utils/speech';
import { useLanguage } from './LanguageContext';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  setFontScale: (scale: number) => void;
  setContrastMode: (mode: ContrastMode) => void;
  setColorBlindMode: (mode: ColorBlindMode) => void;
  toggleScreenReaderVoice: () => void;
  toggleTalkBackSimulator: () => void;
  toggleReadingGuide: () => void;
  toggleDyslexiaFont: () => void;
  toggleReducedMotion: () => void;
  toggleSimplifiedTextMode: () => void;
  toggleVisualCaptions: () => void;
  toggleVisualAlertFlashes: () => void;
  toggleSignLanguageAssistance: () => void;
  toggleLargeTouchTargets: () => void;
  toggleHandTremorFilter: () => void;
  setOneHandedMode: (mode: 'NONE' | 'LEFT' | 'RIGHT') => void;
  toggleKeyboardNavigationAssistance: () => void;
  toggleSwitchAccess: () => void;
  toggleDistractionFreeMode: () => void;
  toggleScreenMagnifier: () => void;
  applyPreset: (preset: AccessibilityPreset) => void;
  resetSettings: () => void;
  exportPassport: () => string;
  importPassport: (jsonStr: string) => boolean;
  announce: (message: string, isAssertive?: boolean) => void;
  activeAnnouncement: string;
  isSpeaking: boolean;
  mouseY: number;
  isVisualAlertActive: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontScale: 1,
  lineHeight: 1.6,
  letterSpacing: 0,
  contrastMode: 'NORMAL',
  colorBlindMode: 'NONE',
  screenReaderVoiceEnabled: false,
  talkBackSimulatorEnabled: false,
  readingGuideEnabled: false,
  screenMagnifier: false,
  soundEffectsEnabled: true,
  visualCaptionsEnabled: false,
  visualAlertFlashes: true,
  signLanguageAssistance: false,
  largeTouchTargets: false,
  handTremorFilter: false,
  oneHandedMode: 'NONE',
  keyboardNavigationAssistance: false,
  switchAccessEnabled: false,
  dyslexiaFontEnabled: false,
  reducedMotion: false,
  simplifiedTextMode: false,
  distractionFreeMode: false,
  activePreset: 'CUSTOM',
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { info } = useLanguage();
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('tavana_a11y_settings');
      if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return defaultSettings;
  });

  const [activeAnnouncement, setActiveAnnouncement] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isVisualAlertActive, setIsVisualAlertActive] = useState<boolean>(false);

  // Sync with document element, body classes and CSS variables
  useEffect(() => {
    try {
      localStorage.setItem('tavana_a11y_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }

    const root = document.documentElement;
    root.style.setProperty('--a11y-font-scale', `${settings.fontScale}`);
    root.style.setProperty('--a11y-line-height', `${settings.lineHeight}`);
    root.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}px`);

    // Contrast modes
    document.body.classList.remove(
      'a11y-contrast-dark',
      'a11y-contrast-yellow-black',
      'a11y-contrast-high-light'
    );
    if (settings.contrastMode === 'DARK') {
      document.body.classList.add('a11y-contrast-dark');
    } else if (settings.contrastMode === 'YELLOW_ON_BLACK') {
      document.body.classList.add('a11y-contrast-yellow-black');
    } else if (settings.contrastMode === 'HIGH_CONTRAST_LIGHT') {
      document.body.classList.add('a11y-contrast-high-light');
    }

    // Color Blindness modes
    document.body.classList.remove(
      'a11y-deuteranopia',
      'a11y-protanopia',
      'a11y-tritanopia',
      'a11y-monochrome'
    );
    if (settings.colorBlindMode === 'DEUTERANOPIA') {
      document.body.classList.add('a11y-deuteranopia');
    } else if (settings.colorBlindMode === 'PROTANOPIA') {
      document.body.classList.add('a11y-protanopia');
    } else if (settings.colorBlindMode === 'TRITANOPIA') {
      document.body.classList.add('a11y-tritanopia');
    } else if (settings.colorBlindMode === 'MONOCHROME') {
      document.body.classList.add('a11y-monochrome');
    }

    // Dyslexia font
    if (settings.dyslexiaFontEnabled) {
      document.body.classList.add('a11y-dyslexia-font');
    } else {
      document.body.classList.remove('a11y-dyslexia-font');
    }

    // Large touch targets
    if (settings.largeTouchTargets) {
      document.body.classList.add('a11y-large-targets');
    } else {
      document.body.classList.remove('a11y-large-targets');
    }

    // Distraction-free focus mode
    if (settings.distractionFreeMode) {
      document.body.classList.add('a11y-focus-mode');
    } else {
      document.body.classList.remove('a11y-focus-mode');
    }

    // One-handed ergonomic layout
    document.body.classList.remove('a11y-one-handed-left', 'a11y-one-handed-right');
    if (settings.oneHandedMode === 'LEFT') {
      document.body.classList.add('a11y-one-handed-left');
    } else if (settings.oneHandedMode === 'RIGHT') {
      document.body.classList.add('a11y-one-handed-right');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      document.body.classList.add('motion-reduce');
    } else {
      document.body.classList.remove('motion-reduce');
    }
  }, [settings]);

  // Track mouse for reading ruler guide
  useEffect(() => {
    if (!settings.readingGuideEnabled) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingGuideEnabled]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings, activePreset: 'CUSTOM' }));
  };

  const setFontScale = (scale: number) => {
    const clamped = Math.min(1.6, Math.max(0.85, scale));
    updateSettings({ fontScale: clamped });
    announce(`اندازه قلم به ${Math.round(clamped * 100)} درصد تغییر یافت`);
  };

  const setContrastMode = (mode: ContrastMode) => {
    updateSettings({ contrastMode: mode });
    let label = 'حالت کنتراست استاندارد';
    if (mode === 'DARK') label = 'کنتراست تیره فعال شد';
    if (mode === 'YELLOW_ON_BLACK') label = 'کنتراست زرد روی مشکی برای کم‌بینایان فعال شد';
    if (mode === 'HIGH_CONTRAST_LIGHT') label = 'کنتراست بالای روشن فعال شد';
    announce(label);
  };

  const setColorBlindMode = (mode: ColorBlindMode) => {
    updateSettings({ colorBlindMode: mode });
    let label = 'فیلتر کوررنگی خاموش شد';
    if (mode === 'DEUTERANOPIA') label = 'فیلتر سبزکوری (دوترانوپیا) فعال شد';
    if (mode === 'PROTANOPIA') label = 'فیلتر سرخ‌کوری (پروتانوپیا) فعال شد';
    if (mode === 'TRITANOPIA') label = 'فیلتر آبی‌کوری (تریتانوپیا) فعال شد';
    if (mode === 'MONOCHROME') label = 'حالت تک‌رنگی (تک‌فام) فعال شد';
    announce(label);
  };

  const toggleScreenReaderVoice = () => {
    const newVal = !settings.screenReaderVoiceEnabled;
    updateSettings({ screenReaderVoiceEnabled: newVal });
    if (newVal) {
      announce('قرائت‌گر صوتی هوشمند توانا فعال شد');
    } else {
      stopSpeaking();
      announce('قرائت‌گر صوتی غیرفعال شد');
    }
  };

  const toggleTalkBackSimulator = () => {
    const newVal = !settings.talkBackSimulatorEnabled;
    updateSettings({ talkBackSimulatorEnabled: newVal });
    announce(newVal ? 'شبیه‌ساز تالک‌بک و دستیار صوتی اندروید فعال شد' : 'شبیه‌ساز تالک‌بک متوقف شد');
  };

  const toggleReadingGuide = () => {
    const newVal = !settings.readingGuideEnabled;
    updateSettings({ readingGuideEnabled: newVal });
    announce(newVal ? 'خط‌کش راهنمای مطالعه فعال شد' : 'خط‌کش راهنما خاموش شد');
  };

  const toggleDyslexiaFont = () => {
    const newVal = !settings.dyslexiaFontEnabled;
    updateSettings({ dyslexiaFontEnabled: newVal });
    announce(newVal ? 'قلم خوانش‌پریشان با فاصله باز فعال شد' : 'قلم استاندارد فعال شد');
  };

  const toggleReducedMotion = () => {
    const newVal = !settings.reducedMotion;
    updateSettings({ reducedMotion: newVal });
    announce(newVal ? 'کاهش پویانمایی و حرکات فعال شد' : 'پویانمایی کامل فعال شد');
  };

  const toggleSimplifiedTextMode = () => {
    const newVal = !settings.simplifiedTextMode;
    updateSettings({ simplifiedTextMode: newVal });
    announce(newVal ? 'حالت متون ساده‌سازی‌شده فعال شد' : 'حالت متون ساده‌سازی‌شده خاموش شد');
  };

  const toggleVisualCaptions = () => {
    const newVal = !settings.visualCaptionsEnabled;
    updateSettings({ visualCaptionsEnabled: newVal });
    announce(newVal ? 'زیرنویس همزمان صوتی فعال شد' : 'زیرنویس خاموش شد');
  };

  const toggleVisualAlertFlashes = () => {
    const newVal = !settings.visualAlertFlashes;
    updateSettings({ visualAlertFlashes: newVal });
    announce(newVal ? 'هشدارهای نوری دیداری فعال شد' : 'هشدارهای نوری خاموش شد');
  };

  const toggleSignLanguageAssistance = () => {
    const newVal = !settings.signLanguageAssistance;
    updateSettings({ signLanguageAssistance: newVal });
    announce(newVal ? 'نشانگر و راهنمای زبان اشاره فعال شد' : 'راهنمای زبان اشاره خاموش شد');
  };

  const toggleLargeTouchTargets = () => {
    const newVal = !settings.largeTouchTargets;
    updateSettings({ largeTouchTargets: newVal });
    announce(newVal ? 'کلیدهای لمسی بزرگ (حداقل ۴۸ پیکسل) فعال شد' : 'اندازه کلیدها به حالت استاندارد بازگشت');
  };

  const toggleHandTremorFilter = () => {
    const newVal = !settings.handTremorFilter;
    updateSettings({ handTremorFilter: newVal });
    announce(newVal ? 'فیلتر لرزش دست و ضدکلیک تصادفی فعال شد' : 'فیلتر لرزش دست خاموش شد');
  };

  const setOneHandedMode = (mode: 'NONE' | 'LEFT' | 'RIGHT') => {
    updateSettings({ oneHandedMode: mode });
    let label = 'چیدمان ارگونومیک دو دست';
    if (mode === 'LEFT') label = 'حالت تک‌دست چپ فعال شد';
    if (mode === 'RIGHT') label = 'حالت تک‌دست راست فعال شد';
    announce(label);
  };

  const toggleKeyboardNavigationAssistance = () => {
    const newVal = !settings.keyboardNavigationAssistance;
    updateSettings({ keyboardNavigationAssistance: newVal });
    announce(newVal ? 'راهنمای ناوبری تمام‌صفحه‌کلید فعال شد' : 'راهنمای کیبورد خاموش شد');
  };

  const toggleSwitchAccess = () => {
    const newVal = !settings.switchAccessEnabled;
    updateSettings({ switchAccessEnabled: newVal });
    announce(newVal ? 'سازگاری با سوییچ اکسس و پدال‌های کمکی فعال شد' : 'سوییچ اکسس خاموش شد');
  };

  const toggleDistractionFreeMode = () => {
    const newVal = !settings.distractionFreeMode;
    updateSettings({ distractionFreeMode: newVal });
    announce(newVal ? 'حالت تمرکز و حذف حواس‌پرتی فعال شد' : 'حالت تمرکز خاموش شد');
  };

  const toggleScreenMagnifier = () => {
    const newVal = !settings.screenMagnifier;
    updateSettings({ screenMagnifier: newVal });
    announce(newVal ? 'ذره‌بین صفحه فعال شد' : 'ذره‌بین خاموش شد');
  };

  const applyPreset = (preset: AccessibilityPreset) => {
    if (preset === 'BLIND') {
      setSettings({
        ...defaultSettings,
        activePreset: 'BLIND',
        screenReaderVoiceEnabled: true,
        talkBackSimulatorEnabled: true,
        soundEffectsEnabled: true,
        contrastMode: 'YELLOW_ON_BLACK',
        largeTouchTargets: true,
        simplifiedTextMode: true,
        fontScale: 1.3,
      });
      announce('گذرنامه فعال شد: پروفایل نابینایان (صفحه‌خوان گویا، بازخورد صوتی و کنتراست زرد روی مشکی)');
    } else if (preset === 'LOW_VISION') {
      setSettings({
        ...defaultSettings,
        activePreset: 'LOW_VISION',
        fontScale: 1.45,
        contrastMode: 'YELLOW_ON_BLACK',
        readingGuideEnabled: true,
        largeTouchTargets: true,
        screenReaderVoiceEnabled: true,
      });
      announce('گذرنامه فعال شد: پروفایل کم‌بینایان (قلم بزرگ ۱۴۵٪، خط‌کش مطالعه و کنتراست حداکثری)');
    } else if (preset === 'DEAF') {
      setSettings({
        ...defaultSettings,
        activePreset: 'DEAF',
        soundEffectsEnabled: false,
        visualCaptionsEnabled: true,
        visualAlertFlashes: true,
        signLanguageAssistance: true,
      });
      announce('گذرنامه فعال شد: پروفایل ناشنوایان (زیرنویس همزمان دیداری، هشدارهای نوری و راهنمای اشاره)');
    } else if (preset === 'HARD_OF_HEARING') {
      setSettings({
        ...defaultSettings,
        activePreset: 'HARD_OF_HEARING',
        soundEffectsEnabled: true,
        visualCaptionsEnabled: true,
        visualAlertFlashes: true,
      });
      announce('گذرنامه فعال شد: پروفایل کم‌شنوایان (ترکیب صوت تقویتی و زیرنویس دیداری)');
    } else if (preset === 'MOTOR_LIMITED') {
      setSettings({
        ...defaultSettings,
        activePreset: 'MOTOR_LIMITED',
        largeTouchTargets: true,
        handTremorFilter: true,
        keyboardNavigationAssistance: true,
        switchAccessEnabled: true,
        reducedMotion: true,
      });
      announce('گذرنامه فعال شد: پروفایل توان‌یابان حرکتی (دکمه‌های ۵۶px، فیلتر لرزش دست و سوییچ اکسس)');
    } else if (preset === 'COGNITIVE_DYSLEXIA') {
      setSettings({
        ...defaultSettings,
        activePreset: 'COGNITIVE_DYSLEXIA',
        dyslexiaFontEnabled: true,
        distractionFreeMode: true,
        simplifiedTextMode: true,
        readingGuideEnabled: true,
        reducedMotion: true,
      });
      announce('گذرنامه فعال شد: پروفایل خوانش‌پریشی و تمرکز ذهنی (قلم بازخوانا، حذف عوامل حواس‌پرتی و زبان ساده)');
    } else if (preset === 'SENIOR') {
      setSettings({
        ...defaultSettings,
        activePreset: 'SENIOR',
        fontScale: 1.3,
        largeTouchTargets: true,
        simplifiedTextMode: true,
        soundEffectsEnabled: true,
        screenReaderVoiceEnabled: true,
      });
      announce('گذرنامه فعال شد: پروفایل سالمندان (قلم درشت، دکمه‌های بزرگ و دستیار صوتی گویا)');
    } else {
      resetSettings();
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    stopSpeaking();
    announce('تنظیمات دسترسی‌پذیری به حالت استاندارد اولیه بازگشت');
  };

  const exportPassport = (): string => {
    return JSON.stringify(
      {
        version: '2.0-universal',
        exportDate: new Date().toISOString(),
        compliance: 'WCAG 2.1 AAA',
        settings,
      },
      null,
      2
    );
  };

  const importPassport = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.settings) {
        setSettings({ ...defaultSettings, ...parsed.settings });
        announce('گذرنامه دسترسی‌پذیری با موفقیت بارگذاری و اعمال شد');
        return true;
      }
    } catch {
      announce('فایل یا کد گذرنامه نامعتبر است', true);
    }
    return false;
  };

  const announce = (message: string, isAssertive: boolean = false) => {
    setActiveAnnouncement(message);

    // Visual Flash Alert for Deaf & Hard of Hearing
    if (settings.visualAlertFlashes) {
      setIsVisualAlertActive(true);
      document.body.classList.add('a11y-flashing-alert');
      setTimeout(() => {
        setIsVisualAlertActive(false);
        document.body.classList.remove('a11y-flashing-alert');
      }, 700);
    }

    if (settings.soundEffectsEnabled) {
      playEarcon(isAssertive ? 'ALERT' : 'SUCCESS');
    }

    if (settings.screenReaderVoiceEnabled || settings.talkBackSimulatorEnabled) {
      setIsSpeaking(true);
      speakText(message, info.bcp47, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings,
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
        activeAnnouncement,
        isSpeaking,
        mouseY,
        isVisualAlertActive,
      }}
    >
      <div style={{ fontSize: `${settings.fontScale}rem` }} className="w-full">
        {children}

        {/* Reading Guide Line */}
        {settings.readingGuideEnabled && (
          <div className="reading-guide-line" style={{ top: `${mouseY}px` }} aria-hidden="true" />
        )}

        {/* Live Visual Captions Bar for Deaf and Hard of Hearing Users */}
        {settings.visualCaptionsEnabled && activeAnnouncement && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/95 text-amber-300 font-black text-sm sm:text-base rounded-2xl shadow-2xl border-2 border-amber-400/80 max-w-xl text-center pointer-events-none backdrop-blur-md animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center justify-center gap-2 mb-1 text-[11px] text-amber-200/70 font-sans">
              <span>🦻 زیرنویس گویا و بازخورد همزمان:</span>
            </div>
            <span>{activeAnnouncement}</span>
          </div>
        )}

        {/* Live ARIA Region for Native Screen Readers */}
        <div
          id="a11y-live-announcer"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {activeAnnouncement}
        </div>
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
