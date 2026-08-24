import React from 'react';
import {
  Accessibility,
  HeartHandshake,
  ShieldCheck,
  Smartphone,
  Globe,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenDisclaimer: () => void;
  onOpenArchitecture: () => void;
  onOpenAutomation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenDisclaimer,
  onOpenArchitecture,
  onOpenAutomation,
}) => {
  const { announce } = useAccessibility();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Accessibility className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-white">شهر توانا</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              اکوسیستم یکپارچه و دسترس‌پذیر برای توانمندسازی اقتصادی، معرفی ویترین‌های صنفی و برقراری ارتباط با جامعه توان‌یابان.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>منطبق بر استانداردهای جهانی WCAG 2.1 AAA</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-white">بخش‌های اصلی سامانه</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('businesses');
                    announce('هدایت به ویترین کسب‌وکارها');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  فهرست ویترین‌های دسترسی‌پذیر
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('rooms');
                    announce('هدایت به اتاق‌های هم‌افزایی');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  اتاق‌های گفتگو و تبادل تجربه
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('leagues');
                    announce('هدایت به لیگ و امتیازات');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  رتبه‌بندی لیگ و امتیازات XP
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('referrals');
                    announce('هدایت به باشگاه دعوت');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  باشگاه معرفان و دریافت پاداش
                </button>
              </li>
            </ul>
          </div>

          {/* Shared Rules & Dignity */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-white">منشور و استانداردهای توانا</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenDisclaimer}
                  className="hover:text-indigo-400 transition-colors text-right"
                >
                  منشور کرامت و بیانیه سلب مسئولیت
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenArchitecture}
                  className="hover:text-indigo-400 transition-colors text-right flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  معماری Tavana Central Core
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAutomation}
                  className="hover:text-indigo-400 transition-colors text-right flex items-center gap-1.5 font-bold text-amber-400"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  مرکز خودکارسازی بیلد و استقرار (EPF, EPK, APK, Render, Cloudflare)
                </button>
              </li>
              <li>
                <span className="text-slate-500 text-[11px] block">
                  سازگار با صفحه‌خوان‌های NVDA، JAWS و TalkBack اندروید
                </span>
              </li>
            </ul>
          </div>

          {/* PWA and Android Badge */}
          <div className="space-y-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-indigo-400" />
              همگام با اپلیکیشن اندروید (Kotlin + Compose)
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              هسته مرکزی Tavana Core با معماری چندسکویی طراحی شده است و کلاینت‌های PWA Web و Native Android از یک پایگاه داده، قوانین امنیتی و سیستم امتیازدهی مشترک بهره می‌برند.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] px-2 py-1 bg-indigo-900/60 text-indigo-300 rounded-lg border border-indigo-500/30 font-bold">
                PWA Web Ready
              </span>
              <span className="text-[10px] px-2 py-1 bg-emerald-900/60 text-emerald-300 rounded-lg border border-emerald-500/30 font-bold">
                Android Jetpack Compose
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© ۲۰۲۵ شهر توانا (Tavana City) — تمامی حقوق برای جامعه توان‌آفرینان محفوظ است.</p>
          <div className="flex items-center gap-2 text-indigo-400 font-bold">
            <HeartHandshake className="w-4 h-4" />
            <span>با افتخار، برای برابری فرصت‌ها و شکوفایی استعدادها</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
