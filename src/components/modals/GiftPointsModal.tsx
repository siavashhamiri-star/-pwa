import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatPersianNumber, toPersianDigits } from '../../utils/persian';

interface GiftPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserId?: string;
  targetUserName?: string;
}

export const GiftPointsModal: React.FC<GiftPointsModalProps> = ({
  isOpen,
  onClose,
  targetUserId: initialTargetId,
  targetUserName: initialTargetName,
}) => {
  const { currentUser, usersList, sendGiftPoints } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string>(initialTargetId || '');
  const [amount, setAmount] = useState<number>(20);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen || !currentUser) return null;

  const availableGifts = currentUser.giftPoints || 0;
  const eligibleUsers = usersList.filter((u) => u.id !== currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      setStatusMessage({ type: 'error', text: 'لطفاً یک کاربر را برای اهدای امتیاز انتخاب کنید.' });
      return;
    }
    if (amount <= 0 || amount > availableGifts) {
      setStatusMessage({ type: 'error', text: 'موجودی امتیاز هدیه شما کافی نمی‌باشد.' });
      return;
    }

    const success = sendGiftPoints(selectedUserId, amount);
    if (success) {
      setStatusMessage({ type: 'success', text: `تعداد ${toPersianDigits(amount)} امتیاز هدیه با موفقیت اهدا گردید.` });
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
      }, 1800);
    }
  };

  return (
    <div
      id="modal-gift-points"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-l from-amber-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">اهدای امتیاز هدیه (Gift Points)</h3>
              <p className="text-xs text-amber-100">تقدیر از تلاش و هنر سازندگان توانمند</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-amber-950">
            <span className="font-bold">موجودی امتیاز هدیه شما:</span>
            <span className="font-black text-sm font-latin text-amber-800">
              {formatPersianNumber(availableGifts)} امتیاز
            </span>
          </div>

          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              {statusMessage.text}
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">انتخاب دریافت‌کننده:</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              required
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="">-- انتخاب شهروند یا سازنده --</option>
              {eligibleUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.displayName} ({u.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">مقدار امتیاز ارسالی:</label>
            <div className="flex gap-2 mb-2">
              {[10, 25, 50, 100].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(val)}
                  disabled={val > availableGifts}
                  className={`flex-1 py-1.5 rounded-xl font-bold border text-xs cursor-pointer ${
                    amount === val
                      ? 'border-amber-600 bg-amber-500 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-40'
                  }`}
                >
                  {toPersianDigits(val)}
                </button>
              ))}
            </div>
            <input
              type="number"
              min={1}
              max={availableGifts}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
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
              disabled={availableGifts <= 0}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-black rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              ارسال هدیه
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
