import React, { useState } from 'react';
import {
  User,
  Shield,
  Briefcase,
  HeartHandshake,
  CheckCircle2,
  LogIn,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LeagueBadge } from '../../components/common/Badge';
import { formatPersianNumber } from '../../utils/persian';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, usersList, switchUser, login, logout } = useAuth();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    login(phone, name || 'شهروند گرامی');
    onClose();
  };

  return (
    <div
      id="modal-auth-manager"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-l from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">مدیریت حساب کاربری و نقش‌ها</h3>
              <p className="text-xs text-indigo-200">جابجایی بین نقش‌های نمایشی یا ورود با شماره همراه</p>
            </div>
          </div>
          <button onClick={onClose} className="text-indigo-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Current Status */}
          {currentUser && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-12 h-12 rounded-xl object-cover border border-indigo-300"
                />
                <div>
                  <div className="font-black text-sm text-slate-900">{currentUser.displayName}</div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-2 mt-0.5">
                    <span>نقش: {currentUser.role}</span>
                    <span>•</span>
                    <span className="font-bold text-indigo-700 font-latin">
                      {formatPersianNumber(currentUser.xp)} XP
                    </span>
                  </div>
                </div>
              </div>
              <LeagueBadge tier={currentUser.leagueTier} />
            </div>
          )}

          {/* Quick Demo Switcher */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-900 border-b border-slate-100 pb-1">
              انتخاب سریع حساب‌های دمو و سناریوهای کاربری:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {usersList.map((u) => {
                const isCurrent = currentUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      onClose();
                    }}
                    className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      isCurrent
                        ? 'border-indigo-600 bg-indigo-50/90 ring-2 ring-indigo-500'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-xs text-slate-900">{u.displayName}</div>
                        <div className="text-[10px] text-slate-500">{u.role}</div>
                      </div>
                    </div>
                    {isCurrent && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Phone Login */}
          <form onSubmit={handleCustomLogin} className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-bold text-xs text-slate-900">یا ورود با مشخصات دلخواه:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="tel"
                placeholder="شماره موبایل (مثال: 0912...)"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none dir-ltr font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              ورود به عنوان کاربر جدید
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {currentUser && (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              خروج از حساب فعلی
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl mr-auto"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
