import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  MessageSquare,
  Globe,
  Share2,
  Heart,
  Star,
  ShieldCheck,
  Volume2,
  VolumeX,
  Tag,
  AlertTriangle,
  Gift,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { BusinessProfile } from '../../types';
import { VerificationBadge, AccessibilityFeatureBadge } from '../../components/common/Badge';
import { formatPersianCurrency, formatPersianNumber, toPersianDigits, formatPersianDate } from '../../utils/persian';
import { useAuth } from '../../context/AuthContext';
import { useTavanaCity } from '../../context/TavanaCityContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { speakText, stopSpeaking } from '../../utils/speech';
import { ReportModal } from '../../components/modals/ReportModal';
import { GiftPointsModal } from '../../components/modals/GiftPointsModal';

interface BusinessShowcaseModalProps {
  business: BusinessProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessShowcaseModal: React.FC<BusinessShowcaseModalProps> = ({
  business,
  isOpen,
  onClose,
}) => {
  const { currentUser } = useAuth();
  const { addReviewToBusiness, sendDirectMessage, likeBusiness } = useTavanaCity();
  const { announce } = useAccessibility();

  const [activeTab, setActiveTab] = useState<'ABOUT' | 'PRODUCTS' | 'REVIEWS' | 'CONTACT'>('ABOUT');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  // Review Form state
  const [rating, setRating] = useState(5);
  const [a11yRating, setA11yRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Direct message quick state
  const [dmText, setDmText] = useState('');
  const [dmSent, setDmSent] = useState(false);

  if (!isOpen || !business) return null;

  const handleToggleAudioIntro = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      announce('پخش راهنمای صوتی متوقف شد');
    } else {
      const textToRead =
        business.audioIntroText ||
        `${business.name} در شهر ${business.city}. ${business.description}`;
      setIsPlayingAudio(true);
      announce('در حال پخش راهنمای صوتی ویترین');
      speakText(textToRead, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      announce('برای ثبت نظر ابتدا باید وارد حساب کاربری شوید', true);
      return;
    }
    addReviewToBusiness(business.id, {
      rating,
      accessibilityRating: a11yRating,
      comment,
    });
    setReviewSuccess(true);
    setComment('');
    setTimeout(() => setReviewSuccess(false), 2500);
    announce('نظر و ارزیابی شما با موفقیت ثبت گردید و ۳۰ امتیاز دریافت کردید');
  };

  const handleSendDm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !dmText.trim()) return;
    sendDirectMessage(business.ownerId, dmText);
    setDmSent(true);
    setDmText('');
    setTimeout(() => setDmSent(false), 3000);
    announce('پیام مستقیم شما برای صاحب ویترین ارسال شد');
  };

  return (
    <div
      id="modal-business-showcase"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="showcase-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Cover Header */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10 cursor-pointer"
            aria-label="بستن صفحه ویترین"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Info & Verification */}
          <div className="absolute top-4 right-4 flex flex-wrap gap-2">
            <VerificationBadge status={business.verificationStatus} />
          </div>

          {/* Bottom Title & Owner Info */}
          <div className="absolute bottom-4 right-4 left-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div>
              <h2 id="showcase-title" className="text-lg sm:text-2xl font-black">
                {business.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">
                {business.slogan || business.city}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudioIntro}
                className="px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs shadow-xs cursor-pointer"
                aria-label="پخش راهنمای صوتی گویا"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-amber-300" />
                    <span>توقف صدا</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>راهنمای صوتی گویا</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsGiftOpen(true)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>اهدای هدیه</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 text-xs font-bold gap-3 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('ABOUT')}
            className={`pb-3 transition-colors shrink-0 ${
              activeTab === 'ABOUT'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            درباره و امکانات دسترس‌پذیری
          </button>
          <button
            onClick={() => setActiveTab('PRODUCTS')}
            className={`pb-3 transition-colors shrink-0 ${
              activeTab === 'PRODUCTS'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            محصولات و خدمات ({toPersianDigits(business.products.length)})
          </button>
          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`pb-3 transition-colors shrink-0 ${
              activeTab === 'REVIEWS'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            نظرات و ارزیابی شهروندان ({toPersianDigits(business.reviews.length)})
          </button>
          <button
            onClick={() => setActiveTab('CONTACT')}
            className={`pb-3 transition-colors shrink-0 ${
              activeTab === 'CONTACT'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ارتباط مستقیم و ثبت سفارش
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* TAB 1: ABOUT */}
          {activeTab === 'ABOUT' && (
            <div className="space-y-6">
              {/* Creator Info Box */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={business.ownerAvatar}
                    alt={business.ownerName}
                    className="w-12 h-12 rounded-xl object-cover border border-indigo-200"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-xs">صاحب‌امتیاز و سازنده: {business.ownerName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">شهر محل استقرار: {business.city}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => likeBusiness(business.id)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                    <span>{toPersianDigits(business.likesCount)}</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-900">معرفی و شرح خدمات</h3>
                <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line">
                  {business.description}
                </p>
              </div>

              {/* Accessibility Checklist */}
              <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  شناسنامه و امکانات دسترس‌پذیری تأییدشده
                </h3>
                <div className="flex flex-wrap gap-2">
                  {business.accessibilityFeatures.map((feat) => (
                    <AccessibilityFeatureBadge key={feat} feature={feat} />
                  ))}
                </div>
              </div>

              {/* Location & Address */}
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  نشانی کارگاه یا دفتر:
                </div>
                <p className="text-slate-600 pr-5">{business.address}</p>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'PRODUCTS' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900">کاتالوگ اقلام و محصولات قابل سفارش</h3>
              {business.products.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                  هنوز محصولی در این ویترین ثبت نشده است. برای سفارش با سازنده تماس بگیرید.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {business.products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-3 shadow-2xs"
                    >
                      <div className="space-y-2">
                        <img
                          src={prod.imageUrl}
                          alt={prod.title}
                          className="w-full h-36 object-cover rounded-xl bg-slate-100"
                        />
                        <h4 className="font-bold text-xs text-slate-900">{prod.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div className="font-black text-indigo-700 text-xs font-latin">
                          {formatPersianCurrency(prod.price)}
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('CONTACT');
                            setDmText(`درود، مایل به سفارش محصول «${prod.title}» هستم.`);
                          }}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[11px] cursor-pointer"
                        >
                          ثبت سفارش
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'REVIEWS' && (
            <div className="space-y-6">
              {/* Review Submission Form */}
              <form onSubmit={handleReviewSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <h4 className="font-bold text-xs text-slate-900">ثبت ارزیابی و تجربه مراجعین (+۳۰ XP)</h4>

                {reviewSuccess && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    نظر شما با موفقیت ثبت شد و به امتیازات شما افزوده گردید.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">امتیاز کلی کیفیت:</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-200 text-xs bg-white"
                    >
                      <option value={5}>۵ ستاره - عالی</option>
                      <option value={4}>۴ ستاره - خیلی خوب</option>
                      <option value={3}>۳ ستاره - متوسط</option>
                      <option value={2}>۲ ستاره - ضعیف</option>
                      <option value={1}>۱ ستاره - نامناسب</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">امتیاز رعایت دسترس‌پذیری:</label>
                    <select
                      value={a11yRating}
                      onChange={(e) => setA11yRating(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-slate-200 text-xs bg-white"
                    >
                      <option value={5}>۵ ستاره - کاملاً استاندارد</option>
                      <option value={4}>۴ ستاره - مناسب</option>
                      <option value={3}>۳ ستاره - نیازمند بهبود جزئی</option>
                      <option value={2}>۲ ستاره - عدم انطباق با ادعا</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="توضیحات و بازخورد درباره کیفیت محصول یا وضعیت مناسب‌سازی..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  ارسال ارزیابی من
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-900">نظرات ثبت‌شده</h4>
                {business.reviews.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
                  </div>
                ) : (
                  business.reviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={rev.userAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-bold text-slate-800 text-xs">{rev.userName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{formatPersianDate(rev.createdAt)}</span>
                      </div>
                      <p className="text-xs text-slate-600">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT */}
          {activeTab === 'CONTACT' && (
            <div className="space-y-6">
              {/* Quick Direct Message */}
              <form onSubmit={handleSendDm} className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-3">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  ارسال پیام مستقیم درون‌برنامه‌ای به سازنده
                </h4>

                {dmSent && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold">
                    پیام شما در صندوق پیام‌های سازنده ثبت گردید.
                  </div>
                )}

                <textarea
                  rows={3}
                  required
                  value={dmText}
                  onChange={(e) => setDmText(e.target.value)}
                  placeholder="پیام، استعلام قیمت، زمان تحویل یا نحوه مناسب‌سازی خاص مورد نیازتان را بنویسید..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  ارسال پیام مستقیم
                </button>
              </form>

              {/* Direct Phone & WhatsApp Contacts */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-900">سایر راه‌های ارتباطی مستقیم:</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${business.phoneNumber}`}
                    className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2.5 text-slate-800 font-bold text-xs"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>تماس تلفنی: {business.phoneNumber}</span>
                  </a>

                  {business.whatsappNumber && (
                    <a
                      href={`https://wa.me/${business.whatsappNumber.replace(/^0/, '98')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-900 font-bold text-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>گفتگو در واتساپ / ایتا</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={() => setIsReportOpen(true)}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>گزارش مغایرت یا تخلف</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl"
          >
            بستن پنجره
          </button>
        </div>
      </div>

      {/* Sub-Modals */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="BUSINESS"
        targetId={business.id}
        targetTitle={business.name}
      />

      <GiftPointsModal
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
        targetUserId={business.ownerId}
        targetUserName={business.ownerName}
      />
    </div>
  );
};
