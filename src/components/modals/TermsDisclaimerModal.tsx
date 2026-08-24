import React, { useState, useEffect } from 'react';
import { ShieldCheck, HeartHandshake, AlertCircle, CheckCircle2, X } from 'lucide-react';

interface TermsDisclaimerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const TermsDisclaimerModal: React.FC<TermsDisclaimerModalProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
      return;
    }
    const accepted = localStorage.getItem('tavana_terms_accepted');
    if (!accepted) {
      setIsOpen(true);
    }
  }, [controlledIsOpen]);

  const handleAccept = () => {
    localStorage.setItem('tavana_terms_accepted', 'true');
    setIsOpen(false);
    if (controlledOnClose) controlledOnClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-terms-disclaimer"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-l from-indigo-900 to-slate-900 text-white flex items-center justify-between border-b border-indigo-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="disclaimer-title" className="font-bold text-base">
                منشور کرامت و بیانیه سلب مسئولیت شهر توانا
              </h2>
              <p className="text-xs text-indigo-200">
                قوانین اخلاقی، حقوقی و تسهیل‌گری در زیست‌بوم توان‌آفرینان
              </p>
            </div>
          </div>
          {controlledOnClose && (
            <button
              onClick={() => {
                setIsOpen(false);
                controlledOnClose();
              }}
              className="text-indigo-300 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl text-indigo-950 font-medium">
            شهر توانا (Tavana City) یک بستر تسهیل‌گر اجتماعی و پل ارتباطی مستقیم میان توان‌یابان، مشتریان و حامیان است.
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ۱. کرامت، استقلال و توانمندسازی واقعی
              </h3>
              <p className="text-slate-600 text-[11px]">
                کلیه فعالیت‌ها با هدف افزایش استقلال اقتصادی و مشارکت اجتماعی سازندگان انجام می‌شود. هرگونه ادبیات ترحم‌آمیز یا رفتارهای خلاف شأن انسانی در پلتفرم ممنوع است.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                ۲. نقش پلتفرم به عنوان تسهیل‌گر و معرف (Facilitator)
              </h3>
              <p className="text-slate-600 text-[11px]">
                پلتفرم طرف قرارداد خرید و فروش یا طرف تراکنش مالی مستقیم میان خریدار و فروشنده نیست و مسئولیتی در قبال کیفیت، زمان‌بندی یا تسویه حساب‌های خارج از سامانه ندارد. توصیه می‌شود از روش‌های ارتباطی امن و تأیید هویت صنفی استفاده فرمایید.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                ۳. راستی‌آزمایی امکانات دسترس‌پذیری
              </h3>
              <p className="text-slate-600 text-[11px]">
                نشان‌های تأیید بر اساس بازخورد و ممیزی میدانی جامعه توانا صادر می‌گردد. در صورت مغایرت وضعیت مناسب‌سازی با مشخصات مندرج در صفحه، کاربران می‌توانند از دکمه ثبت گزارش تخلف استفاده نمایند.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            پذیرش این منشور به منزله احترام به حقوق جامعه تواناست.
          </span>
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            مطالعه کردم و می‌پذیرم
          </button>
        </div>
      </div>
    </div>
  );
};
