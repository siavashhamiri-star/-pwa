import React, { useState } from 'react';
import {
  Layers,
  Smartphone,
  Globe,
  ShieldCheck,
  Zap,
  Code2,
  CheckCircle2,
  X,
  Server,
  Accessibility,
  HeartHandshake,
  Lock,
  Award,
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SHARED_RULES' | 'CORE_SERVICES' | 'PLATFORMS'>('OVERVIEW');

  if (!isOpen) return null;

  return (
    <div
      id="modal-architecture-core"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-l from-indigo-900 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-xs">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="arch-title" className="font-black text-base flex items-center gap-2">
                معماری جامع زیست‌بوم شهر توانا (Tavana Central Core)
              </h2>
              <p className="text-xs text-indigo-200">
                هسته مرکزی، معماری دسترسی‌پذیری مشترک، اپلیکیشن PWA/Web و Android Native
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-indigo-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 text-xs font-bold gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'OVERVIEW'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            نمودار کلان اکوسیستم (Central Core)
          </button>

          <button
            onClick={() => setActiveTab('SHARED_RULES')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'SHARED_RULES'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            قوانین بنیادین مشترک (Shared Tavana Rules)
          </button>

          <button
            onClick={() => setActiveTab('CORE_SERVICES')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'CORE_SERVICES'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            موتورهای سرویس‌دهنده (XP, League, Chat)
          </button>

          <button
            onClick={() => setActiveTab('PLATFORMS')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'PLATFORMS'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            انطباق PWA Web و Android Jetpack Compose
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              {/* ASCII / Graphical Architecture Tree Card */}
              <div className="p-6 bg-slate-900 text-slate-100 rounded-3xl font-mono text-[11px] sm:text-xs overflow-x-auto shadow-inner border border-slate-800">
                <div className="text-center font-bold text-indigo-400 mb-2">
                  ══════════════════════════════════════════════════════
                </div>
                <div className="text-center font-black text-white text-sm">
                  🏢 TAVANA CENTRAL CORE (هسته مرکزی توانا)
                </div>
                <div className="text-center text-slate-400 text-[11px] mt-1">
                  Auth • Database • Storage • Security Rules • API & Events • XP • Referral • League
                </div>
                <div className="text-center font-bold text-indigo-400 mt-2">
                  ───────────────────────────┬───────────────────────────
                </div>
                <div className="text-center font-bold text-indigo-300">
                  ▼                           ▼
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 bg-slate-800/80 rounded-2xl border border-indigo-500/40 space-y-1.5">
                    <div className="font-bold text-indigo-300 flex items-center gap-1.5 text-xs">
                      <Globe className="w-4 h-4 text-indigo-400" />
                      TAVANA PWA / WEB
                    </div>
                    <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                      <li>React & TypeScript + Responsive UI</li>
                      <li>ARIA Live Regions & Web Speech API</li>
                      <li>Screen Reader & High-Contrast Modes</li>
                      <li>Offline Caching & Service Worker</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-800/80 rounded-2xl border border-emerald-500/40 space-y-1.5">
                    <div className="font-bold text-emerald-300 flex items-center gap-1.5 text-xs">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      TAVANA ANDROID APP
                    </div>
                    <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                      <li>Kotlin + Jetpack Compose Native UI</li>
                      <li>Deep TalkBack & AccessibilityService</li>
                      <li>Haptic Feedback & Sound Earcons</li>
                      <li>Background Sync & Local Room DB</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center font-bold text-amber-400 mt-4">
                  ▲                           ▲
                </div>
                <div className="text-center font-bold text-amber-400">
                  ───────────────────────────┴───────────────────────────
                </div>
                <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl text-center mt-2 space-y-1">
                  <div className="font-black text-amber-300 text-xs">
                    ⚖️ SHARED TAVANA RULES (قوانین و استانداردهای یکپارچه)
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    Accessibility-First • Dignity-First • Security & Privacy • XP/League/Referral • Moderation & Trust
                  </div>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                    <Accessibility className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs">دسترسی‌پذیری بدون استثنا</h3>
                  <p className="text-[11px] text-slate-600">
                    رعایت دقیق کنتراست‌های بصری، تگ‌های معنایی ARIA، شبیه‌سازی صفحه‌خوان و انطباق با پروتکل‌های نابینایان و ناشنوایان.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs">احترام و کرامت انسانی</h3>
                  <p className="text-[11px] text-slate-600">
                    رویکرد توانمندسازی اقتصادی و عزت‌نفس محور، پرهیز کامل از واژگان تحقیرآمیز و ترویج استقلال مالی سازندگان.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs">گیمیفیکیشن و هم‌افزایی</h3>
                  <p className="text-[11px] text-slate-600">
                    موتور امتیازدهی XP، لیگ‌های تولیدکنندگان، پاداش‌های معرفی و ارزیابی اشتراکی دسترسی‌پذیری کسب‌وکارها.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SHARED RULES */}
          {activeTab === 'SHARED_RULES' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                منشور ۵ گانه قوانین مشترک زیست‌بوم توانا (Shared Tavana Rules)
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      ۱
                    </span>
                    اصل اول: اولویت دسترسی‌پذیری (Accessibility-First)
                  </div>
                  <p className="text-[11px] text-slate-600 pr-7">
                    کلیه صفحات، فرم‌ها، منوها و دکمه‌ها در وب و اپلیکیشن اندروید باید بدون نیاز به ماوس و صرفاً با کیبورد یا نرم‌افزارهای صفحه‌خوان (NVDA، JAWS، TalkBack) کاملاً ناوبری و تفهیم شوند.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      ۲
                    </span>
                    اصل دوم: اولویت کرامت و استقلال (Dignity-First)
                  </div>
                  <p className="text-[11px] text-slate-600 pr-7">
                    پلتفرم مکانی برای ترحم یا اعانه نیست، بلکه زیست‌بوم تجاری و تخصصی برای بازتاب هنر، تخصص و خلاقیت توانمندان است. روابط بر پایه ارزش تجاری و احترام متقابل پایه‌گذاری شده است.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      ۳
                    </span>
                    اصل سوم: امنیت، حریم خصوصی و ضدآزار (Security & Anti-Harassment)
                  </div>
                  <p className="text-[11px] text-slate-600 pr-7">
                    کاربران اختیار کامل در مسدودسازی (Block) یا بی‌صدا کردن (Mute) افراد دارند. نظارت سخت‌گیرانه با سیستم گزارش تخلف و لاگ‌های بازرسی غیرقابل انکار همراه است.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      ۴
                    </span>
                    اصل چهارم: همبستگی پویا و سیستم رشد (XP / League / Referral)
                  </div>
                  <p className="text-[11px] text-slate-600 pr-7">
                    مشارکت در اتاق‌های گفتگو، ارزیابی مناسب‌سازی کسب‌وکارها، معرفی شهروندان و خرید از ویترین‌ها موجب ارتقای سطح لیگ و دریافت امتیازات هدیه قابل انتقال می‌گردد.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      ۵
                    </span>
                    اصل پنجم: شفافیت و نظارت جامعه‌محور (Trust & Community Audit)
                  </div>
                  <p className="text-[11px] text-slate-600 pr-7">
                    امکانات مناسب‌سازی درج شده برای هر فروشگاه توسط مراجعین بررسی و با بازخوردهای میدانی اعتبارسنجی می‌شود.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CORE SERVICES */}
          {activeTab === 'CORE_SERVICES' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900">سرویس‌های مرکزی مستقر در Tavana Central Core</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-xs text-indigo-700 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    ۱. موتور مدیریت هویت و حریم شخصی (Auth & RBAC)
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    پشتیبانی از نقش‌های Citizen, Business Owner, Mentor, Admin همراه با تنظیمات امنیتی فیلتر پیام و جلوگیری از اسپم.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-xs text-indigo-700 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    ۲. موتور محاسباتی XP و لیگ‌های سازندگان
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    محاسبه رتبه‌بندی هفتگی، سیستم اهدای امتیاز (Gift Points)، ترفیع سطح لیگ‌ها (Bronze تا Champion) و تخصیص جوایز.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-xs text-indigo-700 flex items-center gap-1.5">
                    <Server className="w-4 h-4" />
                    ۳. موتور کاتالوگ و اعتبارسنجی ویترین‌ها
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    ثبت و فیلتر ویژگی‌های دسترس‌پذیری ۱۰ گانه (رمپ، بریل، زبان اشاره و...) به همراه گالری تصاویر و فایل‌های صوتی معرفی.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-xs text-indigo-700 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    ۴. اتاق‌های گفتگوی زنده و استعلام مستقیم
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    ارتباط آنی در اتاق‌های موضوعی و چت یکپارچه با روخوانی صوتی سازگار با استانداردهای دسترسی‌پذیری.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PLATFORMS */}
          {activeTab === 'PLATFORMS' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900">
                انطباق و ساختار کلاینت‌های PWA Web و Kotlin Jetpack Compose
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2">
                  <div className="font-bold text-indigo-400 text-xs flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    PWA Web Client (React + TS)
                  </div>
                  <pre className="p-2.5 bg-slate-950 rounded-xl text-[10px] text-emerald-400 font-mono overflow-x-auto">
{`// React Accessible Button & Live Region
<button
  aria-label="افزودن ویترین جدید"
  aria-live="polite"
  onClick={handleCreate}
  className="focus:ring-4 focus:ring-indigo-500"
>
  ثبت کسب‌وکار
</button>`}
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    استفاده از Web Speech API، تگ‌های استاندارد WAI-ARIA، پشتیبانی آفلاین با Service Worker.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    Android App (Kotlin + Compose)
                  </div>
                  <pre className="p-2.5 bg-slate-950 rounded-xl text-[10px] text-emerald-400 font-mono overflow-x-auto">
{`// Jetpack Compose Accessibility Semantics
Button(
    onClick = { onRegisterClick() },
    modifier = Modifier.semantics {
        contentDescription = "ثبت ویترین جدید"
        role = Role.Button
    }
) {
    Text(text = "ثبت کسب‌وکار")
}`}
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    پشتیبانی کامل از TalkBack، AccessibilityService، طراحی Material Design 3 و هپتیک فیدبک.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            متوجه شدم و بستن
          </button>
        </div>
      </div>
    </div>
  );
};
