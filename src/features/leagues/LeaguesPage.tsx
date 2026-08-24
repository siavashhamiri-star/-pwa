import React, { useState } from 'react';
import {
  Award,
  Trophy,
  Sparkles,
  Zap,
  Gift,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LeagueBadge } from '../../components/common/Badge';
import { formatPersianNumber, toPersianDigits } from '../../utils/persian';
import { GiftPointsModal } from '../../components/modals/GiftPointsModal';
import { CreatorLeagueTier } from '../../types';

export const LeaguesPage: React.FC = () => {
  const { currentUser, usersList } = useAuth();
  const [selectedGiftUser, setSelectedGiftUser] = useState<{ id: string; name: string } | null>(null);

  // Sort users by XP
  const sortedUsers = [...usersList].sort((a, b) => b.xp - a.xp);

  const tiers: { tier: CreatorLeagueTier; title: string; minXp: number; benefits: string; color: string }[] = [
    {
      tier: 'BRONZE',
      title: 'لیگ برنز (سطح آغازین)',
      minXp: 0,
      benefits: 'امکان ثبت تا ۲ ویترین، ارسال پیام در تالارها',
      color: 'bg-amber-100 border-amber-300 text-amber-900',
    },
    {
      tier: 'SILVER',
      title: 'لیگ نقره‌ای (کوشا)',
      minXp: 500,
      benefits: 'دریافت نشان نقره‌ای، ثبت تا ۵ ویترین، اهدای امتیاز روزانه',
      color: 'bg-slate-200 border-slate-300 text-slate-800',
    },
    {
      tier: 'GOLD',
      title: 'لیگ طلایی (برتر)',
      minXp: 1500,
      benefits: 'نمایش در صفحه اول، اولویت در نتایج جستجو، ۱۰٪ پاداش معرفی بیشتر',
      color: 'bg-yellow-100 border-yellow-400 text-yellow-900',
    },
    {
      tier: 'DIAMOND',
      title: 'لیگ الماس (پیشگام)',
      minXp: 3500,
      benefits: 'نشان اختصاصی الماس، ویترین نامحدود، امکان منتورشیپ نوآوران',
      color: 'bg-cyan-100 border-cyan-300 text-cyan-900',
    },
    {
      tier: 'CHAMPION',
      title: 'قهرمان توانمند (Champion)',
      minXp: 7000,
      benefits: 'بالاترین رتبه، مشاور افتخاری، دسترسی به پنل بازبینی جامعه و هدایای ویژه',
      color: 'bg-purple-100 border-purple-400 text-purple-950',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-l from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-indigo-200 border border-white/20">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>سیستم رتبه‌بندی و ارتقای سازندگان توانمند</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              لیگ‌های سازندگان و قهرمانان شهر توانا
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl leading-relaxed">
              با فعالیت مستمر، معرفی کسب‌وکارها، ارزیابی مناسب‌سازی‌ها و مشارکت در گفتگوها، امتیاز XP کسب کرده و به لیگ‌های بالاتر صعود کنید.
            </p>
          </div>

          {currentUser && (
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-2 min-w-56">
              <div className="text-xs text-indigo-200 font-bold">وضعیت حساب شما</div>
              <div className="text-2xl font-black text-amber-300 font-latin">
                {formatPersianNumber(currentUser.xp)} XP
              </div>
              <LeagueBadge tier={currentUser.leagueTier} />
            </div>
          )}
        </div>
      </div>

      {/* Grid: Tiers and Rules */}
      <div className="space-y-4">
        <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          سطوح پنج‌گانه لیگ و مزایای هر سطح
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {tiers.map((t) => (
            <div
              key={t.tier}
              className={`p-4 rounded-2xl border ${t.color} space-y-2 flex flex-col justify-between`}
            >
              <div>
                <div className="font-black text-xs">{t.title}</div>
                <div className="text-[11px] font-bold mt-1 opacity-80">
                  حداقل: {formatPersianNumber(t.minXp)} XP
                </div>
              </div>
              <p className="text-[11px] leading-relaxed pt-2 border-t border-black/10">
                {t.benefits}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: XP Rules & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* XP Earning Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            جدول پاداش‌ها و راه‌های کسب XP
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
              <span className="font-bold text-slate-800">ثبت و ایجاد ویترین جدید</span>
              <span className="font-black text-indigo-700 font-latin">+۱۵۰ XP</span>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
              <span className="font-bold text-slate-800">دعوت از دوستان و سازندگان جدید</span>
              <span className="font-black text-indigo-700 font-latin">+۱۰۰ XP</span>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
              <span className="font-bold text-slate-800">ثبت نظر و ارزیابی دسترس‌پذیری</span>
              <span className="font-black text-indigo-700 font-latin">+۳۰ XP</span>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
              <span className="font-bold text-slate-800">ارسال پیام سازنده در اتاق‌های گفتگو</span>
              <span className="font-black text-indigo-700 font-latin">+۵ XP</span>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
              <span className="font-bold text-slate-800">دریافت نشان تأیید اصالت برای ویترین</span>
              <span className="font-black text-indigo-700 font-latin">+۲۰۰ XP</span>
            </div>
          </div>
        </div>

        {/* Live Leaderboard Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              جدول برترین‌های شهر توانا (Leaderboard)
            </h3>
            <span className="text-xs text-slate-500">به‌روزرسانی هفتگی</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 pb-2">
                  <th className="py-2.5 px-3 font-bold">رتبه</th>
                  <th className="py-2.5 px-3 font-bold">سازنده / شهروند</th>
                  <th className="py-2.5 px-3 font-bold">شهر</th>
                  <th className="py-2.5 px-3 font-bold">سطح لیگ</th>
                  <th className="py-2.5 px-3 font-bold">امتیاز کل</th>
                  <th className="py-2.5 px-3 font-bold text-center">اقدام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedUsers.map((user, index) => {
                  const isCurrent = currentUser?.id === user.id;
                  const rank = index + 1;

                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isCurrent ? 'bg-indigo-50/60 font-bold' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs font-latin ${
                            rank === 1
                              ? 'bg-amber-400 text-slate-950 shadow-xs'
                              : rank === 2
                              ? 'bg-slate-300 text-slate-900'
                              : rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'text-slate-600'
                          }`}
                        >
                          {toPersianDigits(rank)}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{user.displayName}</span>
                            {isCurrent && (
                              <span className="text-[10px] text-indigo-600 font-bold">حساب شما</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-slate-600">{user.city}</td>

                      <td className="py-3 px-3">
                        <LeagueBadge tier={user.leagueTier} showIcon={false} />
                      </td>

                      <td className="py-3 px-3 font-black text-indigo-700 font-latin">
                        {formatPersianNumber(user.xp)} XP
                      </td>

                      <td className="py-3 px-3 text-center">
                        {currentUser && currentUser.id !== user.id && (
                          <button
                            onClick={() => setSelectedGiftUser({ id: user.id, name: user.displayName })}
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                            title="اهدای امتیاز هدیه"
                          >
                            <Gift className="w-3.5 h-3.5 text-amber-600" />
                            <span>هدیه</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gift Modal */}
      {selectedGiftUser && (
        <GiftPointsModal
          isOpen={true}
          onClose={() => setSelectedGiftUser(null)}
          targetUserId={selectedGiftUser.id}
          targetUserName={selectedGiftUser.name}
        />
      )}
    </div>
  );
};
