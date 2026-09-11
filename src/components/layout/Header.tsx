import React, { useState } from 'react';
import {
  Store,
  Users,
  Award,
  Share2,
  LayoutDashboard,
  Shield,
  Layers,
  PlusCircle,
  LogIn,
  LogOut,
  Search,
  Accessibility,
  Menu,
  X,
  Volume2,
  Zap,
  Globe,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTavanaCity } from '../../context/TavanaCityContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLanguage } from '../../context/LanguageContext';
import { LeagueBadge } from '../common/Badge';
import { toPersianDigits, formatPersianNumber } from '../../utils/persian';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegisterBusiness: () => void;
  onOpenAuthModal: () => void;
  onOpenAdminModal: () => void;
  onOpenArchitectureModal: () => void;
  onOpenAutomationModal: () => void;
  onOpenAccessibilityPassport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegisterBusiness,
  onOpenAuthModal,
  onOpenAdminModal,
  onOpenArchitectureModal,
  onOpenAutomationModal,
  onOpenAccessibilityPassport,
}) => {
  const { currentUser, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useTavanaCity();
  const { announce } = useAccessibility();
  const { language, setLanguage, t, info, supportedLanguages } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.navHome, icon: Store },
    { id: 'businesses', label: t.navBusinesses, icon: Store },
    { id: 'rooms', label: t.navRooms, icon: Users },
    { id: 'leagues', label: t.navLeagues, icon: Award },
    { id: 'referrals', label: t.navReferral, icon: Share2 },
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Official Top Institutional Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white border-b border-indigo-500/20 py-1.5 px-4 sm:px-6 text-xs shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-black text-[11px] border border-amber-400/40">
              🏛️ اتاق جوامع اصناف
            </span>
            <span className="text-slate-400 text-[11px]">•</span>
            <span className="text-indigo-200 font-bold text-[11px] sm:text-xs">
              اکوسیستم آفرینا توانا سیتی (TavanaCity)
            </span>
            <span className="hidden md:inline text-slate-400 text-[11px]">•</span>
            <span className="hidden md:inline text-slate-300 text-[11px]">
              زیست‌بوم جامع کسب‌وکارها، تشکل‌های صنفی و کارآفرینان دسترس‌پذیر
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-200 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
              ✓ سامانه رسمی اصناف توانا
            </span>
            <span className="text-[10px] text-slate-400 font-mono">WCAG 2.1 AAA</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('home');
                announce('هدایت به صفحه اصلی اتاق جوامع اصناف - اکوسیستم آفرینا توانا سیتی');
              }}
              className="flex items-center gap-3 text-right group cursor-pointer focus:ring-2 focus:ring-indigo-500 rounded-2xl p-1"
              aria-label="صفحه اصلی اتاق جوامع اصناف - اکوسیستم آفرینا توانا سیتی"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Accessibility className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                    اتاق جوامع اصناف
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-700 font-bold rounded-md border border-indigo-100">
                    اکوسیستم آفرینا
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  اکوسیستم آفرینا توانا سیتی (TavanaCity)
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold" aria-label="ناوبری اصلی">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    announce(`ورود به بخش ${item.label}`);
                  }}
                  className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-black shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & User State */}
          <div className="flex items-center gap-2">
            {/* Accessibility Passport Hub Button */}
            <button
              onClick={() => {
                onOpenAccessibilityPassport?.();
                announce('باز شدن گذرنامه جامع دسترسی‌پذیری توانا');
              }}
              aria-label="گذرنامه جامع دسترسی‌پذیری و تنظیمات چندمعلولیتی"
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black rounded-xl border border-indigo-200 shadow-2xs cursor-pointer transition-colors"
            >
              <Accessibility className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span className="hidden md:inline">گذرنامه دسترسی‌پذیری</span>
              <span className="px-1.5 py-0.5 text-[9px] rounded-md bg-indigo-600 text-white font-mono leading-none">AAA</span>
            </button>

            {/* Automation Hub Button */}
            <button
              onClick={() => {
                onOpenAutomationModal();
                announce('مشاهده مرکز خودکارسازی بیلد و استقرار EPF, EPK, APK, Render و Cloudflare');
              }}
              aria-label="مرکز خودکارسازی بیلد و استقرار چندسکویی"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer border border-indigo-500/40"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>CI/CD & Builds</span>
            </button>

            {/* Architecture Core Inspector Button */}
            <button
              onClick={() => {
                onOpenArchitectureModal();
                announce('مشاهده معماری جامع هسته توانا و انطباق پلتفرم‌ها');
              }}
              aria-label="مشاهده معماری هسته مرکزی توانا و انطباق اندروید و وب"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-2xs border border-slate-700 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Tavana Core</span>
            </button>

            {/* Register Business CTA */}
            <button
              onClick={() => {
                onOpenRegisterBusiness();
                announce('باز شدن فرم ثبت ویترین کسب‌وکار');
              }}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ثبت ویترین (+۱۵۰ XP)</span>
            </button>

            {/* Admin Panel Trigger (if Admin) */}
            {currentUser?.role === 'ADMIN' && (
              <button
                onClick={() => {
                  onOpenAdminModal();
                  announce('ورود به پنل نظارت و مدیریت ارشد');
                }}
                className="p-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl border border-purple-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="پنل مدیریت ارشد"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden xl:inline">مرکز نظارت</span>
              </button>
            )}

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer border border-slate-200 transition-colors"
                aria-label={t.languageSelect}
                title={t.languageSelect}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-sm">{info.flag}</span>
                <span className="hidden xl:inline font-semibold">{info.nativeName}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute top-full mt-1.5 ltr:right-0 rtl:left-0 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    {t.languageSelect}
                  </div>
                  {supportedLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangMenuOpen(false);
                        announce(`زبان تغییر یافت به ${l.nativeName}`);
                      }}
                      className={`w-full px-3 py-2 text-xs font-bold flex items-center justify-between hover:bg-indigo-50 transition-colors cursor-pointer ${
                        language === l.code ? 'text-indigo-700 bg-indigo-50/70 font-black' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{l.flag}</span>
                        <span>{l.nativeName}</span>
                      </span>
                      {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile / Switcher */}
            {currentUser ? (
              <div className="flex items-center gap-2 pr-1 border-r border-slate-200">
                <button
                  onClick={onOpenAuthModal}
                  className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-right"
                  title="تغییر کاربر دمو یا مشاهده حساب"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.displayName}
                    className="w-8 h-8 rounded-full border border-indigo-500/30 object-cover"
                  />
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {currentUser.displayName}
                    </div>
                    <div className="text-[10px] text-indigo-600 font-black font-latin">
                      {formatPersianNumber(currentUser.xp)} XP
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>ورود / عضویت</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
              aria-label="باز کردن منوی موبایل"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-2">
            <nav className="grid grid-cols-2 gap-2 text-xs font-bold">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                      announce(`ورود به بخش ${item.label}`);
                    }}
                    className={`p-2.5 rounded-xl flex items-center gap-2 text-right ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {/* Mobile Language Switcher */}
              <div className="bg-slate-50 p-2 rounded-xl">
                <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{t.languageSelect}</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {supportedLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsMobileMenuOpen(false);
                        announce(`زبان تغییر یافت به ${l.nativeName}`);
                      }}
                      className={`p-1.5 rounded-lg text-center text-xs font-bold transition-colors ${
                        language === l.code ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base block">{l.flag}</span>
                      <span className="text-[10px] block truncate">{l.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAccessibilityPassport?.();
                }}
                className="w-full p-2.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-black flex items-center justify-center gap-2"
              >
                <Accessibility className="w-4 h-4 text-indigo-600" />
                <span>گذرنامه دسترسی‌پذیری توانا (WCAG 2.1 AAA)</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenArchitectureModal();
                }}
                className="w-full p-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                معماری جامع Tavana Central Core
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenRegisterBusiness();
                }}
                className="w-full p-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                ثبت ویترین کسب‌وکار (+۱۵۰ XP)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
