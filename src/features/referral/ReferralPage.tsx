import React, { useState } from 'react';
import {
  Share2,
  Copy,
  CheckCircle2,
  Gift,
  Users,
  Sparkles,
  Award,
  Send,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { formatPersianNumber, toPersianDigits } from '../../utils/persian';

export const ReferralPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { announce } = useAccessibility();
  const [copied, setCopied] = useState(false);

  const referralCode = currentUser?.referralCode || 'TAVANA-2025';
  const referralLink = `https://tavana.city/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    announce('لینک دعوت در کلیپ‌بورد کپی شد');
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = `درود! به «شهر توانا»، زیست‌بوم جامع و دسترس‌پذیر توانمندان و متخصصان بپیوندید و با کد معرف ${referralCode} هدیه خوش‌آمدگویی دریافت کنید: ${referralLink}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Hero */}
      <div className="bg-gradient-to-l from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-indigo-200 border border-white/20">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>باشگاه معرفان و هم‌افزایی شهروندان</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            دعوت از دوستان و دریافت پاداش‌های شگفت‌انگیز
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
            با دعوت از کارآفرینان، هنرمندان، متخصصان و علاقه‌مندان به عضویت در شهر توانا، به ازای هر عضو جدید ۱۰۰ امتیاز XP دریافت کرده و به دوست خود ۵۰ امتیاز خوش‌آمدگویی هدیه دهید.
          </p>
        </div>
      </div>

      {/* Referral Code & Share Link Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Gift className="w-5 h-5 text-indigo-600" />
          کد و پیوند اختصاصی دعوت شما
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Code Display */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-xs text-slate-500 font-bold">کد دعوت اختصاصی:</span>
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
              <span className="font-mono text-lg font-black text-indigo-700 tracking-wider">
                {referralCode}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'کپی شد' : 'کپی کد'}</span>
              </button>
            </div>
          </div>

          {/* Link Display */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-xs text-slate-500 font-bold">لینک مستقیم ثبت‌نام:</span>
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
              <span className="font-mono text-xs text-slate-600 truncate dir-ltr max-w-[200px] sm:max-w-xs">
                {referralLink}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'کپی شد' : 'کپی لینک'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-700">اشتراک‌گذاری مستقیم در:</span>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساپ</span>
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span>تلگرام / ایتا</span>
          </a>
        </div>
      </div>

      {/* 3 Step Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            ۱
          </div>
          <h3 className="font-bold text-xs text-slate-900">ارسال لینک اختصاصی</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            لینک یا کد دعوت خود را برای دوستان، همکاران و گروه‌های اجتماعی ارسال کنید.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            ۲
          </div>
          <h3 className="font-bold text-xs text-slate-900">ثبت‌نام و عضویت دوست شما</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            به محض ثبت‌نام اولیه، دوست شما ۵۰ امتیاز پاداش خوش‌آمدگویی دریافت می‌کند.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            ۳
          </div>
          <h3 className="font-bold text-xs text-slate-900">دریافت ۱۰۰ امتیاز XP</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            ۱۰۰ امتیاز XP بلافاصله به حساب شما واریز شده و رتبه شما در لیگ ارتقا می‌یابد.
          </p>
        </div>
      </div>
    </div>
  );
};
