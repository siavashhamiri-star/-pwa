import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings, ContrastMode } from '../types';
import { speakText, stopSpeaking, playEarcon } from '../utils/speech';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  setFontScale: (scale: number) => void;
  setContrastMode: (mode: ContrastMode) => void;
  toggleScreenReaderVoice: () => void;
  toggleTalkBackSimulator: () => void;
  toggleReadingGuide: () => void;
  toggleDyslexiaFont: () => void;
  toggleReducedMotion: () => void;
  toggleSimplifiedTextMode: () => void;
  resetSettings: () => void;
  announce: (message: string, isAssertive?: boolean) => void;
  activeAnnouncement: string;
  isSpeaking: boolean;
  mouseY: number;
}

const defaultSettings: AccessibilitySettings = {
  fontScale: 1,
  lineHeight: 1.6,
  letterSpacing: 0,
  contrastMode: 'NORMAL',
  screenReaderVoiceEnabled: false,
  talkBackSimulatorEnabled: false,
  soundEffectsEnabled: true,
  readingGuideEnabled: false,
  dyslexiaFontEnabled: false,
  reducedMotion: false,
  simplifiedTextMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('tavana_a11y_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultSettings;
  });

  const [activeAnnouncement, setActiveAnnouncement] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [mouseY, setMouseY] = useState<number>(0);

  // Sync with document element and CSS variables
  useEffect(() => {
    localStorage.setItem('tavana_a11y_settings', JSON.stringify(settings));

    const root = document.documentElement;
    root.style.setProperty('--a11y-font-scale', `${settings.fontScale}`);
    root.style.setProperty('--a11y-line-height', `${settings.lineHeight}`);
    root.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}px`);

    // Contrast modes
    document.body.classList.remove('a11y-contrast-dark', 'a11y-contrast-yellow-black');
    if (settings.contrastMode === 'DARK') {
      document.body.classList.add('a11y-contrast-dark');
    } else if (settings.contrastMode === 'YELLOW_ON_BLACK') {
      document.body.classList.add('a11y-contrast-yellow-black');
    }

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
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const setFontScale = (scale: number) => {
    const clamped = Math.min(1.6, Math.max(0.85, scale));
    updateSettings({ fontScale: clamped });
    announce(`اندازه قلم به ${Math.round(clamped * 100)} درصد تغییر یافت`);
  };

  const setContrastMode = (mode: ContrastMode) => {
    updateSettings({ contrastMode: mode });
    let label = 'حالت نمایش استاندارد';
    if (mode === 'DARK') label = 'کنتراست تیره فعال شد';
    if (mode === 'YELLOW_ON_BLACK') label = 'کنتراست زرد روی مشکی برای کم‌بینایان فعال شد';
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
    announce(newVal ? 'قلم خواناتر فعال شد' : 'قلم استاندارد فعال شد');
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

  const resetSettings = () => {
    setSettings(defaultSettings);
    stopSpeaking();
    announce('تنظیمات دسترسی‌پذیری به حالت اولیه بازگشت');
  };

  const announce = (message: string, isAssertive: boolean = false) => {
    setActiveAnnouncement(message);

    if (settings.soundEffectsEnabled) {
      playEarcon(isAssertive ? 'ALERT' : 'SUCCESS');
    }

    if (settings.screenReaderVoiceEnabled || settings.talkBackSimulatorEnabled) {
      setIsSpeaking(true);
      speakText(message, () => {
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
        toggleScreenReaderVoice,
        toggleTalkBackSimulator,
        toggleReadingGuide,
        toggleDyslexiaFont,
        toggleReducedMotion,
        toggleSimplifiedTextMode,
        resetSettings,
        announce,
        activeAnnouncement,
        isSpeaking,
        mouseY,
      }}
    >
      <div style={{ fontSize: `${settings.fontScale}rem` }} className="w-full">
        {children}
        {/* Reading Guide Line */}
        {settings.readingGuideEnabled && (
          <div className="reading-guide-line" style={{ top: `${mouseY}px` }} aria-hidden="true" />
        )}
        {/* Live ARIA Region */}
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
