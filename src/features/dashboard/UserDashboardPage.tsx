import React, { useState } from 'react';
import {
  User,
  Store,
  Award,
  Share2,
  Settings,
  Shield,
  PlusCircle,
  Clock,
  Heart,
  Gift,
  CheckCircle2,
  Trash2,
  Eye,
  MessageSquare,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTavanaCity } from '../../context/TavanaCityContext';
import { LeagueBadge, VerificationBadge } from '../../components/common/Badge';
import { BusinessProfile } from '../../types';
import { formatPersianNumber, toPersianDigits, formatPersianDate } from '../../utils/persian';
import { GiftPointsModal } from '../../components/modals/GiftPointsModal';

interface UserDashboardPageProps {
  onSelectBusiness: (business: BusinessProfile) => void;
  onOpenRegisterBusiness: () => void;
  onOpenArchitectureModal: () => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  onSelectBusiness,
  onOpenRegisterBusiness,
  onOpenArchitectureModal,
}) => {
  const { currentUser, updateProfile } = useAuth();
  const { businesses, deleteBusiness } = useTavanaCity();

  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'MY_BUSINESSES' | 'SECURITY' | 'ACTIVITY'>('OVERVIEW');
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  // Edit Profile fields
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [city, setCity] = useState(currentUser?.city || 'تهران');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!currentUser) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
        <User className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-base font-bold text-slate-900">جهت دسترسی به داشبورد، لطفاً وارد شوید.</h2>
      </div>
    );
  }

  const myBusinesses = businesses.filter((b) => b.ownerId === currentUser.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      bio,
      city,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-indigo-500/40 shadow-sm"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentUser.displayName}
                </h1>
                <LeagueBadge tier={currentUser.leagueTier} />
              </div>
              <p className="text-xs text-slate-500 max-w-md">{currentUser.bio || 'شهروند فعال شهر توانا'}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-600 pt-1">
                <span>📍 شهر: {currentUser.city}</span>
                <span>•</span>
                <span>نقش: {currentUser.role}</span>
                <span>•</span>
                <span>کد معرف: <strong className="font-mono text-indigo-700">{currentUser.referralCode}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-2xl text-center min-w-32">
              <span className="text-[10px] text-indigo-600 font-bold block">مجموع امتیاز XP</span>
              <span className="text-xl font-black text-indigo-900 font-latin">
                {formatPersianNumber(currentUser.xp)}
              </span>
            </div>

            <button
              onClick={() => setIsGiftOpen(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>اهدای امتیاز ({toPersianDigits(currentUser.giftPoints || 0)})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Sub-navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-2 gap-2 text-xs font-bold shadow-2xs overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('OVERVIEW')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeSubTab === 'OVERVIEW'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          نمای کلی و ویرایش پروفایل
        </button>

        <button
          onClick={() => setActiveSubTab('MY_BUSINESSES')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeSubTab === 'MY_BUSINESSES'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          ویترین‌های من ({toPersianDigits(myBusinesses.length)})
        </button>

        <button
          onClick={() => setActiveSubTab('SECURITY')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeSubTab === 'SECURITY'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          امنیت و حریم شخصی
        </button>

        <button
          onClick={() => setActiveSubTab('ACTIVITY')}
          className={`px-4 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeSubTab === 'ACTIVITY'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          تاریخچه فعالیت‌ها و امتیازات
        </button>
      </div>

      {/* SUBTAB 1: OVERVIEW */}
      {activeSubTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-black text-slate-900">ویرایش مشخصات هویتی و عمومی</h2>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                مشخصات حساب شما با موفقیت ذخیره گردید.
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">شهر محل سکونت یا کار:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">بیوگرافی و شرح مختصر مهارت‌ها:</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-black text-slate-900">اقدامات سریع</h2>
            <div className="space-y-2 text-xs">
              <button
                onClick={onOpenRegisterBusiness}
                className="w-full p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold rounded-xl flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-indigo-600" />
                  ثبت ویترین جدید
                </span>
                <span className="text-[10px] text-indigo-600">+۱۵۰ XP</span>
              </button>

              <button
                onClick={onOpenArchitectureModal}
                className="w-full p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold rounded-xl flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-600" />
                  مشاهده ساختار مرکزی Tavana Core
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MY BUSINESSES */}
      {activeSubTab === 'MY_BUSINESSES' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900">ویترین‌های ثبت‌شده توسط شما</h2>
              <p className="text-xs text-slate-500">مدیریت، ویرایش محصولات و بررسی وضعیت اعتبارسنجی</p>
            </div>
            <button
              onClick={onOpenRegisterBusiness}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ثبت ویترین جدید</span>
            </button>
          </div>

          {myBusinesses.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3 shadow-xs">
              <Store className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">شما هنوز هیچ ویترینی ثبت نکرده‌اید.</h3>
              <p className="text-xs text-slate-500">با ثبت اولین کسب‌وکار، ۱۵۰ امتیاز XP دریافت کنید!</p>
              <button
                onClick={onOpenRegisterBusiness}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                ثبت اولین ویترین
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myBusinesses.map((biz) => (
                <div
                  key={biz.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={biz.coverImage}
                      alt={biz.name}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-900">{biz.name}</h4>
                        <VerificationBadge status={biz.verificationStatus} />
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{biz.description}</p>
                      <div className="text-[10px] text-slate-400">
                        {toPersianDigits(biz.products.length)} محصول ثبت‌شده • {toPersianDigits(biz.reviews.length)} نظر
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onSelectBusiness(biz)}
                      className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>مشاهده صفحه عمومی</span>
                    </button>

                    <button
                      onClick={() => deleteBusiness(biz.id)}
                      className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف ویترین</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: SECURITY */}
      {activeSubTab === 'SECURITY' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            تنظیمات امنیت، فیلتر هرزنامه و حریم خصوصی
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">فهرست افراد مسدود شده (Blacklist)</span>
              <p className="text-[11px] text-slate-500">
                افراد مسدود شده قادر به ارسال پیام مستقیم به شما یا اظهارنظر در ویترین‌های شما نخواهند بود.
              </p>
              <div className="pt-2 text-[11px] text-slate-400">
                {currentUser.blockedUserIds && currentUser.blockedUserIds.length > 0
                  ? `${toPersianDigits(currentUser.blockedUserIds.length)} کاربر مسدود شده است.`
                  : 'در حال حاضر هیچ کاربری در لیست مسدودی شما قرار ندارد.'}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">مجوزهای دسترسی صوتی و صفحه‌خوان</span>
              <p className="text-[11px] text-slate-500">
                دسترسی به Web Speech API و صدای تالک‌بک برای این مرورگر فعال و تأیید شده است.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: ACTIVITY */}
      {activeSubTab === 'ACTIVITY' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            تاریخچه تراکنش‌های امتیاز و فعالیت‌های اخیر
          </h2>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">عضویت در پلتفرم و ثبت‌نام اولیه</span>
                <span className="text-[10px] text-slate-400">ثبت سیستمی</span>
              </div>
              <span className="font-black text-emerald-700 font-latin">+۵۰ XP</span>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">ثبت ویترین و تالار گفتگو</span>
                <span className="text-[10px] text-slate-400">فعالیت مستمر</span>
              </div>
              <span className="font-black text-emerald-700 font-latin">+۱۵۰ XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Gift Modal */}
      <GiftPointsModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />
    </div>
  );
};
