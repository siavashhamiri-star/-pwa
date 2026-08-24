import React, { useState } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  PlusCircle,
  Accessibility,
  MapPin,
  Tag,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useTavanaCity } from '../../context/TavanaCityContext';
import { BusinessProfile, BusinessAccessibilityFeature } from '../../types';
import { BusinessCard } from './BusinessCard';
import { toPersianDigits } from '../../utils/persian';

interface BusinessListPageProps {
  onSelectBusiness: (business: BusinessProfile) => void;
  onOpenRegisterBusiness: () => void;
}

const ALL_A11Y_FEATURES: { id: BusinessAccessibilityFeature; label: string }[] = [
  { id: 'WHEELCHAIR_RAMP', label: 'رمپ استاندارد ویلچر' },
  { id: 'BRAILLE_MENU', label: 'منو و کاتالوگ بریل' },
  { id: 'AUDIO_GUIDE', label: 'راهنمای صوتی گویا' },
  { id: 'SIGN_LANGUAGE_SUPPORT', label: 'پشتیبانی زبان اشاره' },
  { id: 'TEXT_BASED_ORDERING', label: 'سفارش‌گیری تمام متنی' },
  { id: 'QUIET_ENVIRONMENT', label: 'محیط کم‌صدا و آرام' },
  { id: 'HOME_DELIVERY', label: 'ارسال با هماهنگی' },
];

export const BusinessListPage: React.FC<BusinessListPageProps> = ({
  onSelectBusiness,
  onOpenRegisterBusiness,
}) => {
  const {
    businesses,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedA11yFeature,
    setSelectedA11yFeature,
    selectedCity,
    setSelectedCity,
  } = useTavanaCity();

  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyWithDiscount, setOnlyWithDiscount] = useState(false);

  // Extract unique cities
  const cities = Array.from(new Set(businesses.map((b) => b.city)));

  // Filter logic
  const filteredBusinesses = businesses.filter((b) => {
    if (b.status === 'SUSPENDED') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchDesc = b.description.toLowerCase().includes(q);
      const matchCity = b.city.toLowerCase().includes(q);
      const matchOwner = b.ownerName.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCity && !matchOwner) return false;
    }

    if (selectedCategory && b.categoryId !== selectedCategory) {
      return false;
    }

    if (selectedA11yFeature && !b.accessibilityFeatures.includes(selectedA11yFeature as BusinessAccessibilityFeature)) {
      return false;
    }

    if (selectedCity && b.city !== selectedCity) {
      return false;
    }

    if (onlyVerified && b.verificationStatus !== 'VERIFIED') {
      return false;
    }

    if (onlyWithDiscount && !b.specialDiscountsForDisabled) {
      return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedA11yFeature(null);
    setSelectedCity(null);
    setOnlyVerified(false);
    setOnlyWithDiscount(false);
  };

  const hasActiveFilters =
    !!searchQuery ||
    !!selectedCategory ||
    !!selectedA11yFeature ||
    !!selectedCity ||
    onlyVerified ||
    onlyWithDiscount;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            ویترین کسب‌وکارهای دسترس‌پذیر
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            مشاهده، جستجو و خرید مستقیم از تولیدکنندگان و متخصصان جامعه توان‌یابان
          </p>
        </div>

        <button
          onClick={onOpenRegisterBusiness}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>ثبت رایگان ویترین (+۱۵۰ XP)</span>
        </button>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
        {/* Search Bar & City Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام کسب‌وکار، محصولات، مهارت‌ها یا نام سازنده..."
              className="w-full pl-3 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div>
            <select
              value={selectedCity || ''}
              onChange={(e) => setSelectedCity(e.target.value || null)}
              className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            >
              <option value="">همه شهرها ({toPersianDigits(cities.length)})</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">دسته‌بندی اصناف:</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === null
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              همه رسته‌ها ({toPersianDigits(businesses.length)})
            </button>
            {categories.map((cat) => {
              const count = businesses.filter((b) => b.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.title} ({toPersianDigits(count)})
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessibility Features Filter Chips */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Accessibility className="w-4 h-4 text-indigo-600" />
            فیلتر بر اساس امکانات دسترس‌پذیری:
          </label>
          <div className="flex flex-wrap gap-2">
            {ALL_A11Y_FEATURES.map((feat) => {
              const isSelected = selectedA11yFeature === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => setSelectedA11yFeature(isSelected ? null : feat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-900 text-white ring-2 ring-indigo-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  {feat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Checkbox Toggles & Clear */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>فقط دارای نشان تأیید اصالت توانا</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyWithDiscount}
                onChange={(e) => setOnlyWithDiscount(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>دارای تخفیف ویژه برای توان‌یابان</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              حذف همه فیلترها
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-bold text-slate-600">
          نمایش {toPersianDigits(filteredBusinesses.length)} ویترین فعال در سراسر ایران
        </span>
      </div>

      {/* Business Cards Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <Accessibility className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">هیچ ویترینی با این مشخصات یافت نشد.</h3>
          <p className="text-xs text-slate-500">می‌توانید فیلترها را تغییر داده یا ویترین جدیدی ثبت کنید.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-100"
          >
            پاک کردن فیلترها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => {
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
      )}
    </div>
  );
};
