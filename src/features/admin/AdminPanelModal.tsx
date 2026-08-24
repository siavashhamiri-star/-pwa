import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Building,
  Users,
  Search,
  X,
  Sparkles,
} from 'lucide-react';
import { useTavanaCity } from '../../context/TavanaCityContext';
import { useAuth } from '../../context/AuthContext';
import { VerificationBadge } from '../../components/common/Badge';
import { formatPersianDate, toPersianDigits } from '../../utils/persian';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const {
    businesses,
    reports,
    auditLogs,
    verifyBusiness,
    suspendBusiness,
    resolveReport,
  } = useTavanaCity();

  const [activeTab, setActiveTab] = useState<'BUSINESSES' | 'REPORTS' | 'AUDIT_LOGS'>('BUSINESSES');

  if (!isOpen) return null;

  return (
    <div
      id="modal-admin-control-panel"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-l from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base">مرکز نظارت، ممیزی و موازین توانا (Admin Hub)</h2>
              <p className="text-xs text-indigo-200">
                تأیید نشان اصالت، بررسی گزارش‌های تخلف، ممیزی دسترس‌پذیری و لاگ‌های امنیتی
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 text-xs font-bold gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('BUSINESSES')}
            className={`pb-3 transition-colors shrink-0 ${
              activeTab === 'BUSINESSES'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ممیزی ویترین‌ها ({toPersianDigits(businesses.length)})
          </button>

          <button
            onClick={() => setActiveTab('REPORTS')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'REPORTS'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            گزارش‌های نظارتی ({toPersianDigits(reports.filter((r) => r.status === 'PENDING').length)})
          </button>

          <button
            onClick={() => setActiveTab('AUDIT_LOGS')}
            className={`pb-3 transition-colors shrink-0 ${
              activeTab === 'AUDIT_LOGS'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            لاگ‌های ممیزی سیستم (Audit Logs)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* TAB 1: BUSINESSES */}
          {activeTab === 'BUSINESSES' && (
            <div className="space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 pb-2">
                      <th className="py-2.5 px-3 font-bold">نام ویترین</th>
                      <th className="py-2.5 px-3 font-bold">سازنده</th>
                      <th className="py-2.5 px-3 font-bold">شهر</th>
                      <th className="py-2.5 px-3 font-bold">وضعیت تأیید</th>
                      <th className="py-2.5 px-3 font-bold text-center">عملیات نظارتی</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {businesses.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-bold text-slate-900">{b.name}</td>
                        <td className="py-3 px-3 text-slate-600">{b.ownerName}</td>
                        <td className="py-3 px-3 text-slate-600">{b.city}</td>
                        <td className="py-3 px-3">
                          <VerificationBadge status={b.verificationStatus} />
                        </td>
                        <td className="py-3 px-3 text-center space-x-2 space-x-reverse">
                          {b.verificationStatus !== 'VERIFIED' && (
                            <button
                              onClick={() => verifyBusiness(b.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] cursor-pointer"
                            >
                              اعطای نشان اصالت (+۲۰۰ XP)
                            </button>
                          )}
                          {b.status === 'ACTIVE' ? (
                            <button
                              onClick={() => suspendBusiness(b.id)}
                              className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-bold text-[11px] cursor-pointer"
                            >
                              تعلیق موقت
                            </button>
                          ) : (
                            <span className="text-rose-600 font-bold text-[11px]">معلق شده</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: REPORTS */}
          {activeTab === 'REPORTS' && (
            <div className="space-y-3">
              {reports.length === 0 ? (
                <div className="p-8 text-center text-slate-400">هیچ گزارش ثبت‌شده‌ای وجود ندارد.</div>
              ) : (
                reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{rep.targetTitle}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          rep.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {rep.status === 'PENDING' ? 'در انتظار بررسی' : 'رسیدگی شده'}
                      </span>
                    </div>

                    <p className="text-slate-700 font-semibold">{rep.reason}</p>
                    <p className="text-slate-500 text-[11px]">{rep.description}</p>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                      <span>ثبت شده در: {formatPersianDate(rep.createdAt)}</span>
                      {rep.status === 'PENDING' && (
                        <button
                          onClick={() => resolveReport(rep.id, 'RESOLVED')}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold text-xs cursor-pointer"
                        >
                          تأیید رسیدگی و حل گزارش
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: AUDIT LOGS */}
          {activeTab === 'AUDIT_LOGS' && (
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-[11px]"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 block">{log.action}</span>
                    <span className="text-slate-500">توسط {log.actorName}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">
                    {formatPersianDate(log.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl"
          >
            بستن پنل نظارت
          </button>
        </div>
      </div>
    </div>
  );
};
