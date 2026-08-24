import React from 'react';
import {
  Store,
  Users,
  Award,
  Share2,
  Accessibility,
  Search,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  HeartHandshake,
  MapPin,
  Star,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { useTavanaCity } from '../../context/TavanaCityContext';
import { useAuth } from '../../context/AuthContext';
import { BusinessCard } from '../businesses/BusinessCard';
import { BusinessProfile } from '../../types';
import { formatPersianNumber, toPersianDigits } from '../../utils/persian';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectBusiness: (business: BusinessProfile) => void;
  onOpenRegisterBusiness: () => void;
  onOpenArchitecture: () => void;
  onOpenAutomation?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectBusiness,
  onOpenRegisterBusiness,
  onOpenArchitecture,
  onOpenAutomation,
}) => {
  const { businesses, categories, rooms, searchQuery, setSearchQuery } = useTavanaCity();
  const { currentUser } = useAuth();

  // Top rated / verified businesses for hero showcase
  const featuredBusinesses = businesses
    .filter((b) => b.verificationStatus === 'VERIFIED')
    .slice(0, 3);

  const totalReviews = businesses.reduce((acc, b) => acc + (b.reviews?.length || 0), 0);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-indigo-950 via-indigo-900 to-slate-900 text-white p-6 sm:p-12 shadow-xl border border-indigo-800/40">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-indigo-200 text-xs font-bold border border-white/20 backdrop-blur-md">
            <Accessibility className="w-4 h-4 text-indigo-400" />
            <span>زیست‌بوم جامع و دسترس‌پذیر توان‌آفرینان ایران</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
            شهر مجازی توانا
            <span className="block text-indigo-300 text-lg sm:text-2xl font-bold mt-2">
              ویترین مهارت، هنر، تخصص و خدمات دسترس‌پذیر
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            محلی امن، محترمانه و استاندارد برای معرفی مستقیم کسب‌وکارهای توان‌یابان، خرید آگاهانه، گفتگو در تالارهای تخصصی و ارتقای سطح مناسب‌سازی شهری.
          </p>

          {/* Quick Search Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onNavigate('businesses');
                }}
                placeholder="جستجوی محصول، نام سازنده یا نوع مناسب‌سازی..."
                className="w-full pl-4 pr-11 py-3 bg-white text-slate-900 text-xs font-medium rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              onClick={() => onNavigate('businesses')}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <span>جستجو در ویترین‌ها</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Core Action Chips */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            <button
              onClick={onOpenRegisterBusiness}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" />
              <span>ثبت رایگان ویترین کسب‌وکار (+۱۵۰ XP)</span>
            </button>

            <button
              onClick={onOpenArchitecture}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 cursor-pointer flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-indigo-300" />
              <span>نمودار معماری کلان Tavana Core</span>
            </button>

            {onOpenAutomation && (
              <button
                onClick={onOpenAutomation}
                className="px-4 py-2 bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 text-white font-bold rounded-xl border border-indigo-400/40 cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>خودکارسازی و بیلد EPF / EPK / APK / Render</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Numerical Stats Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-indigo-600">
            <Store className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-indigo-50 px-2 py-0.5 rounded-md">سراسر کشور</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-latin">
            {formatPersianNumber(businesses.length)}
          </div>
          <div className="text-xs text-slate-500 font-bold">ویترین فعال و ثبت‌شده</div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-md">ممیزی‌شده</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-latin">
            {formatPersianNumber(businesses.filter((b) => b.verificationStatus === 'VERIFIED').length)}
          </div>
          <div className="text-xs text-slate-500 font-bold">دارای نشان اصالت توانا</div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-amber-600">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-amber-50 px-2 py-0.5 rounded-md">اتاق‌ها</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-latin">
            {formatPersianNumber(rooms.length)}
          </div>
          <div className="text-xs text-slate-500 font-bold">تالار گفتگوی فعال</div>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-purple-600">
            <Star className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-purple-50 px-2 py-0.5 rounded-md">مشارکت</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-latin">
            {formatPersianNumber(totalReviews)}
          </div>
          <div className="text-xs text-slate-500 font-bold">ارزیابی مناسب‌سازی و کیفیت</div>
        </div>
      </div>

      {/* Category Shortcuts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">دسته‌بندی اصناف و مهارت‌ها</h2>
          <button
            onClick={() => onNavigate('businesses')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const count = businesses.filter((b) => b.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate('businesses')}
                className="p-4 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-2xl text-center space-y-2 transition-all cursor-pointer shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center mx-auto transition-colors">
                  <Store className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-slate-900 line-clamp-1">{cat.title}</div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {toPersianDigits(count)} ویترین
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Verified Businesses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              ویترین‌های برگزیده و تأییدشده توانا
            </h2>
            <p className="text-xs text-slate-500">
              کسب‌وکارهای دارای ممیزی دسترس‌پذیری و بالاترین رضایت مشتریان
            </p>
          </div>
          <button
            onClick={() => onNavigate('businesses')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>مشاهده همه ویترین‌ها</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBusinesses.map((biz) => {
            const cat = categories.find((c) => c.id === biz.categoryId);
            return (
              <BusinessCard
                key={biz.id}
                business={biz}
                categoryTitle={cat?.title}
                onSelect={onSelectBusiness}
              />
            );
          })}
        </div>
      </div>

      {/* Shared Principles Banner */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-xl font-black flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-indigo-400" />
            اصول بنیادین زیست‌بوم شهر توانا (Dignity-First & Accessibility)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            این پلتفرم برای تحقق برابری فرصت‌های اقتصادی و اجتماعی، حذف موانع فیزیکی و دیجیتالی، و ارائه مستقیم هنر و تخصص توانمندان بدون هرگونه رویکرد خیریه‌ای پایه‌گذاری شده است.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1.5">
            <div className="font-bold text-indigo-400 text-xs">۱. دسترسی‌پذیری جهانی</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              طراحی مطابق با WAI-ARIA، صفحه‌خوان، تالک‌بک و پشتیبانی همه‌جانبه از کاربران با نیازهای ویژه.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1.5">
            <div className="font-bold text-indigo-400 text-xs">۲. ارتباط مستقیم خریدار و سازنده</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              ارتباط شفاف از طریق چت، تماس و پیام‌رسان‌ها بدون واسطه‌گری نامناسب.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1.5">
            <div className="font-bold text-indigo-400 text-xs">۳. گیمیفیکیشن و انگیزش XP</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              سیستم امتیازدهی، لیگ‌های سازندگان و هدایای ملموس برای فعالیت‌های ارزش‌آفرین.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
