import React, { useState } from 'react';
import {
  Store,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Accessibility,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTavanaCity } from '../../context/TavanaCityContext';
import { BusinessAccessibilityFeature, BusinessProduct } from '../../types';

interface RegisterBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const A11Y_OPTIONS: { id: BusinessAccessibilityFeature; label: string }[] = [
  { id: 'WHEELCHAIR_RAMP', label: 'رمپ استاندارد و بدون پله برای تردد ویلچر' },
  { id: 'ELEVATOR', label: 'آسانسور دسترس‌پذیر با دکمه‌های برجسته و گویا' },
  { id: 'BRAILLE_MENU', label: 'منو، بروشور یا کاتالوگ با خط بریل' },
  { id: 'AUDIO_GUIDE', label: 'توضیحات و راهنمای صوتی گویا' },
  { id: 'SIGN_LANGUAGE_SUPPORT', label: 'پشتیبانی و امکان مکالمه به زبان اشاره' },
  { id: 'TEXT_BASED_ORDERING', label: 'فرآیند سفارش‌گیری و پشتیبانی کاملاً متنی' },
  { id: 'QUIET_ENVIRONMENT', label: 'محیط کم‌صدا و مناسب افراد حساس به صدا' },
  { id: 'ACCESSIBLE_RESTROOM', label: 'سرویس بهداشتی مناسب‌سازی شده' },
  { id: 'GUIDE_DOG_FRIENDLY', label: 'پذیرش و همراهی سگ راهنما' },
  { id: 'HOME_DELIVERY', label: 'ارسال درب منزل با هماهنگی اختصاصی' },
];

export const RegisterBusinessModal: React.FC<RegisterBusinessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser } = useAuth();
  const { categories, addBusiness } = useTavanaCity();

  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-crafts');
  const [city, setCity] = useState(currentUser?.city || 'تهران');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');
  const [whatsappNumber, setWhatsappNumber] = useState(currentUser?.phoneNumber || '');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800');
  const [accessibilityFeatures, setAccessibilityFeatures] = useState<BusinessAccessibilityFeature[]>([
    'TEXT_BASED_ORDERING',
    'HOME_DELIVERY',
  ]);
  const [specialDiscountsForDisabled, setSpecialDiscountsForDisabled] = useState(true);
  const [discountPercentage, setDiscountPercentage] = useState(15);
  const [audioIntroText, setAudioIntroText] = useState('');

  // Sample Product state
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(250000);
  const [productDescription, setProductDescription] = useState('');
  const [productsList, setProductsList] = useState<BusinessProduct[]>([]);

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleFeature = (feat: BusinessAccessibilityFeature) => {
    if (accessibilityFeatures.includes(feat)) {
      setAccessibilityFeatures(accessibilityFeatures.filter((f) => f !== feat));
    } else {
      setAccessibilityFeatures([...accessibilityFeatures, feat]);
    }
  };

  const handleAddProduct = () => {
    if (!productTitle.trim()) return;
    const newProd: BusinessProduct = {
      id: `prod-${Date.now()}`,
      title: productTitle.trim(),
      description: productDescription.trim(),
      price: productPrice,
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500',
      inStock: true,
    };
    setProductsList([...productsList, newProd]);
    setProductTitle('');
    setProductDescription('');
  };

  const handleRemoveProduct = (id: string) => {
    setProductsList(productsList.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    addBusiness({
      ownerId: currentUser.id,
      ownerName: currentUser.displayName,
      ownerAvatar: currentUser.avatar,
      name,
      slogan,
      description,
      categoryId,
      city,
      address: address || `${city} - ثبت شده در سامانه شهر توانا`,
      phoneNumber,
      whatsappNumber,
      websiteUrl,
      coverImage,
      galleryImages: [coverImage],
      verificationStatus: 'SELF_DECLARED',
      status: 'ACTIVE',
      accessibilityFeatures,
      specialDiscountsForDisabled,
      discountPercentage,
      audioIntroText,
      products: productsList,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      id="modal-register-business"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-l from-indigo-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 id="reg-title" className="font-bold text-base">
                ثبت ویترین جدید در شهر توانا (+۱۵۰ XP)
              </h3>
              <p className="text-xs text-indigo-200">
                معرفی کسب‌وکار، مهارت و خدمات به جامعه بزرگ توانمندان و حامیان
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-indigo-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              ویترین شما با موفقیت ایجاد و منتشر شد! ۱۵۰ امتیاز به حساب شما منظور گردید.
            </div>
          )}

          {/* Section 1: Basic Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-1">
              مشخصات عمومی کسب‌وکار یا کارگاه
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">نام ویترین یا کسب‌وکار:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مانند: کارگاه سفال نقش‌برجسته امید"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">رسته و دسته‌بندی:</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">شعار یا عبارت کلیدی کوتاه:</label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="مانند: تولید دست‌سازه‌های چوبی با حس لامسه طبیعی"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">شرح کامل فعالیت و خدمات:</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="درباره نحوه تولید، تخصص‌ها، شرایط ارسال و سوابق کاری خود بنویسید..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Section 2: Accessibility Criteria */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-indigo-600" />
              امکانات و شرایط دسترس‌پذیری این کسب‌وکار (خوداظهاری)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {A11Y_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                    accessibilityFeatures.includes(opt.id)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={accessibilityFeatures.includes(opt.id)}
                    onChange={() => toggleFeature(opt.id)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-[11px]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Audio Intro & Special Discount */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-1">
              راهنمای صوتی و تخفیف ویژه
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">متن راهنمای صوتی گویا برای نابینایان:</label>
              <textarea
                rows={2}
                value={audioIntroText}
                onChange={(e) => setAudioIntroText(e.target.value)}
                placeholder="متنی که صفحه‌خوان و دکمه راهنمای صوتی برای مراجعین روشندل پخش می‌کند..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={specialDiscountsForDisabled}
                  onChange={(e) => setSpecialDiscountsForDisabled(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600"
                />
                <span>اعطای تخفیف ویژه برای مشتریان توان‌یاب</span>
              </label>

              {specialDiscountsForDisabled && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-600">درصد تخفیف:</span>
                  <input
                    type="number"
                    min={5}
                    max={80}
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    className="w-16 p-1.5 rounded-lg border border-slate-200 text-xs text-center font-bold"
                  />
                  <span className="text-[11px] text-slate-600">٪</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Contact & Location */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-xs border-b border-slate-100 pb-1">
              اطلاعات تماس و آدرس
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">شهر محل استقرار:</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">شماره تماس مستقیم:</label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0912..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none dir-ltr font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">آدرس فیزیکی کارگاه یا محل تحویل:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="خیابان، پلاک، طبقه (یا درج عبارت: فعالیت غیرحضوری و آنلاین)"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
            >
              انصراف
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>انتشار ویترین و دریافت امتیاز</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
