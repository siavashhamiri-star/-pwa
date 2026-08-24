import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, X } from 'lucide-react';
import { useTavanaCity } from '../../context/TavanaCityContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'BUSINESS' | 'USER' | 'MESSAGE' | 'REVIEW';
  targetId: string;
  targetTitle: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
}) => {
  const { submitReport } = useTavanaCity();
  const [reason, setReason] = useState('عدم انطباق امکانات مناسب‌سازی اعلام شده');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      targetType,
      targetId,
      targetTitle,
      reason,
      description,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setDescription('');
      onClose();
    }, 1800);
  };

  return (
    <div
      id="modal-report-issue"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">ثبت گزارش نظارتی و ایمنی</h3>
              <p className="text-xs text-rose-100">رسیدگی توسط تیم مدیریت و ناظران دسترسی‌پذیری</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
            <strong>مورد گزارش:</strong> {targetTitle}
          </div>

          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              گزارش شما با موفقیت ثبت شد و به صف بررسی ناظران افزوده گردید.
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">علت گزارش:</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
            >
              <option value="عدم انطباق امکانات مناسب‌سازی اعلام شده">عدم انطباق امکانات مناسب‌سازی اعلام شده</option>
              <option value="محتوای نامناسب، توهین‌آمیز یا ناقض کرامت">محتوای نامناسب، توهین‌آمیز یا ناقض کرامت</option>
              <option value="اطلاعات تماس نادرست یا تقلب">اطلاعات تماس نادرست یا تقلب</option>
              <option value="ارسال هرزنامه یا پیام‌های مزاحم">ارسال هرزنامه یا پیام‌های مزاحم</option>
              <option value="سایر موارد">سایر موارد</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">توضیحات و مستندات:</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="لطفاً شرح مختصری از مشاهده یا تخلف رخ داده را بنویسید..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
            >
              ارسال گزارش به مرکز نظارت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
