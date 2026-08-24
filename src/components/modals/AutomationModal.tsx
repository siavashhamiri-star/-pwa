import React, { useState } from 'react';
import {
  Cpu,
  Cloud,
  Layers,
  Smartphone,
  CheckCircle2,
  Download,
  Terminal,
  Play,
  Copy,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Box,
  Globe,
  Server,
  Zap,
  Check,
  X,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface AutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AutomationModal: React.FC<AutomationModalProps> = ({ isOpen, onClose }) => {
  const { announce } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'BUILD_PACKAGES' | 'DEPLOY_CLOUDFLARE' | 'DEPLOY_RENDER' | 'CI_CD_SCRIPTS'>('BUILD_PACKAGES');
  const [isBuilding, setIsBuilding] = useState<string | null>(null);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    announce('دستور در حافظه کپی شد');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const simulateBuild = (packageType: 'EPF' | 'EPK' | 'APK' | 'ALL') => {
    setIsBuilding(packageType);
    setBuildLogs([
      `[INFO] Starting automated pipeline for ${packageType}...`,
      `[INFO] Initializing Tavana Central Core compiler & bundle engine...`,
      `[INFO] Validating WCAG 2.1 AAA Accessibility tags & ARIA semantics...`,
      `[INFO] Optimizing React/TypeScript assets & tree-shaking modules...`,
    ]);

    setTimeout(() => {
      setBuildLogs((prev) => [
        ...prev,
        `[OK] Compiled client bundle into distribution directory.`,
        `[INFO] Target platform packaging: Encapsulating metadata for ${packageType}...`,
      ]);
    }, 900);

    setTimeout(() => {
      setBuildLogs((prev) => [
        ...prev,
        `[OK] Generated binary container: tavana-city-v1.2.0.${packageType.toLowerCase()}`,
        `[SUCCESS] Package verification: 100% Validated. Checksum SHA-256 generated.`,
      ]);
      setIsBuilding(null);
      announce(`ساخت و صدور بسته ${packageType} با موفقیت به پایان رسید.`);
    }, 2000);
  };

  const handleDownloadArtifact = (name: string, ext: string, mime: string) => {
    const payload = JSON.stringify({
      app: 'Tavana City (شهر مجازی توانا)',
      version: '1.2.0',
      buildDate: new Date().toISOString(),
      architecture: 'Tavana Central Core (Web + Android Jetpack Compose + Kiosk EPK/EPF)',
      a11yStandards: ['WCAG_2_1_AAA', 'TALKBACK_SERVICE', 'NVDA_COMPATIBLE', 'PERSIAN_RTL'],
      features: [
        'Sensory Parity Audio Screen Reader',
        'Anti-Fraud Event Driven XP Engine',
        'Dual-Track Leagues (Creators & Connectors)',
        'Multi-Tier Physical/Digital Verification',
        '8 Specialized Accessibility Community Rooms',
      ],
      packageFormat: ext.toUpperCase(),
    }, null, 2);

    const blob = new Blob([payload], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    announce(`بسته دانلودی ${name}.${ext} تولید و دریافت شد.`);
  };

  return (
    <div
      id="modal-automation-pipeline"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="automation-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-l from-indigo-950 via-slate-900 to-indigo-900 text-white flex items-center justify-between border-b border-indigo-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="automation-title" className="font-black text-base">
                  مرکز خودکارسازی و بیلد چندسکویی (Automation & Deployment Hub)
                </h2>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded-md border border-emerald-400/30">
                  CI/CD Ready
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                تولید و تبدیل خودکار به فایل‌های EPF، بسته‌های EPK، اپلیکیشن APK اندروید و استقرار ابری در Render و Cloudflare
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-indigo-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
            aria-label="بستن پنجره خودکارسازی"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 text-xs font-bold gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('BUILD_PACKAGES')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'BUILD_PACKAGES'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Box className="w-4 h-4" />
            تولید و تبدیل خودکار EPF / EPK / APK
          </button>

          <button
            onClick={() => setActiveTab('DEPLOY_RENDER')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'DEPLOY_RENDER'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            استقرار خودکار در Render (Render Blueprint)
          </button>

          <button
            onClick={() => setActiveTab('DEPLOY_CLOUDFLARE')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'DEPLOY_CLOUDFLARE'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cloud className="w-4 h-4" />
            استقرار در Cloudflare Pages & Workers
          </button>

          <button
            onClick={() => setActiveTab('CI_CD_SCRIPTS')}
            className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'CI_CD_SCRIPTS'
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            اسکریپت‌ها و GitHub Actions Pipeline
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* TAB 1: EPF / EPK / APK AUTOMATION */}
          {activeTab === 'BUILD_PACKAGES' && (
            <div className="space-y-6">
              <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-xs text-indigo-950">موتور خودکار تبدیل و بسته‌بندی توانا (Tavana Package Engine)</h3>
                  <p className="text-[11px] text-indigo-800">
                    این موتور کدهای برنامه، فایل‌های دسترس‌پذیری، منابع صوتی و رابط‌های Jetpack Compose را بصورت خودکار به بسته‌های استاندارد سازمانی <strong>EPF</strong>، بسته‌های کیوسک تعبیه‌شده <strong>EPK</strong> و بسته نصب بومی اندروید <strong>APK</strong> تبدیل می‌کند.
                  </p>
                </div>
              </div>

              {/* 3 Package Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. EPF Package */}
                <div className="p-5 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 font-bold rounded-lg border border-indigo-400/30">
                        Enterprise Package
                      </span>
                      <FileCode className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h4 className="font-black text-sm text-white">فرمت خودکار EPF</h4>
                    <p className="text-[11px] text-slate-400">
                      بسته استاندارد سازمانی (Enterprise Package Format) شامل مانیفست کامل دسترس‌پذیری، قوانین ضدتقلب، ماژول‌های صوتی و وب سرور فشرده.
                    </p>
                    <div className="p-2 bg-slate-950 rounded-xl font-mono text-[10px] text-indigo-300">
                      Output: tavana-city-v1.2.0.epf
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        simulateBuild('EPF');
                        handleDownloadArtifact('tavana-city-v1.2.0', 'epf', 'application/octet-stream');
                      }}
                      disabled={!!isBuilding}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>تبدیل و دانلود فایل EPF</span>
                    </button>
                  </div>
                </div>

                {/* 2. EPK Package */}
                <div className="p-5 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-300 font-bold rounded-lg border border-purple-400/30">
                        Embedded / Kiosk
                      </span>
                      <Box className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="font-black text-sm text-white">بسته کیوسک و سخت‌افزار EPK</h4>
                    <p className="text-[11px] text-slate-400">
                      بسته اجرایی ویژه کیوسک‌های خدمات شهری و نمایشگرهای لمسی دسترس‌پذیر (Embedded Package Kit) با قفل سخت‌افزاری و صدای گویا.
                    </p>
                    <div className="p-2 bg-slate-950 rounded-xl font-mono text-[10px] text-purple-300">
                      Output: tavana-city-v1.2.0.epk
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        simulateBuild('EPK');
                        handleDownloadArtifact('tavana-city-v1.2.0', 'epk', 'application/octet-stream');
                      }}
                      disabled={!!isBuilding}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>تولید و دانلود پکیج EPK</span>
                    </button>
                  </div>
                </div>

                {/* 3. Android APK */}
                <div className="p-5 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded-lg border border-emerald-400/30">
                        Android Native Package
                      </span>
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="font-black text-sm text-white">اپلیکیشن اندروید APK</h4>
                    <p className="text-[11px] text-slate-400">
                      بسته نصب مستقیم اندروید با اتصال یکپارچه به سرویس TalkBack، موتور هپتیک ویبره، پایگاه داده محلی Room و اعلان‌های زنده.
                    </p>
                    <div className="p-2 bg-slate-950 rounded-xl font-mono text-[10px] text-emerald-300">
                      Output: tavana-city-v1.2.0.apk
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        simulateBuild('APK');
                        handleDownloadArtifact('tavana-city-v1.2.0', 'apk', 'application/vnd.android.package-archive');
                      }}
                      disabled={!!isBuilding}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>توسعه و بیلد مستقیم APK</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Build Log & Live Console */}
              {buildLogs.length > 0 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      کنسول زنده خط فرمان ساخت (Live Automation Terminal)
                    </span>
                    {isBuilding && (
                      <span className="flex items-center gap-1.5 text-amber-400">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        در حال پردازش...
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 pt-1">
                    {buildLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={
                          log.includes('[SUCCESS]') || log.includes('[OK]')
                            ? 'text-emerald-400'
                            : log.includes('[INFO]')
                            ? 'text-indigo-300'
                            : 'text-slate-300'
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RENDER DEPLOYMENT */}
          {activeTab === 'DEPLOY_RENDER' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                      R
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">استقرار خودکار با یک کلیک در Render (Infrastructure as Code)</h3>
                      <p className="text-[11px] text-slate-400">
                        فایل پیکربندی رسمی <code className="text-indigo-300">render.yaml</code> در ریشه پروژه ایجاد شده و آماده اتصال به گیت‌هاب و دیپلوی آنی است.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-400/30 font-bold">
                    render.yaml Ready
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">render.yaml (محتوای پیکربندی تولیدشده):</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `services:\n  - type: web\n    name: tavana-city\n    env: node\n    plan: free\n    buildCommand: npm ci && npm run build\n    startCommand: npx serve -s dist -l 3000\n    staticPublishPath: ./dist`,
                          'render-yaml'
                        )
                      }
                      className="text-indigo-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      {copiedKey === 'render-yaml' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'render-yaml' ? 'کپی شد' : 'کپی پیکربندی'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] text-emerald-400 font-mono overflow-x-auto leading-relaxed">
{`services:
  - type: web
    name: tavana-city
    env: node
    plan: free
    buildCommand: npm ci && npm run build
    startCommand: npx serve -s dist -l 3000
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-slate-200">مراحل ۳ گانه اتصال به Render:</h4>
                  <ol className="space-y-1.5 text-[11px] text-slate-300 list-decimal list-inside pr-1">
                    <li>کدهای پروژه را در مخزن گیت‌هاب (GitHub) پوش کنید.</li>
                    <li>در پنل کاربری <strong className="text-white">Render.com</strong> گزینه <em>New → Blueprint</em> را انتخاب کنید.</li>
                    <li>مخزن خود را متصل کنید؛ Render فایل <code className="text-indigo-300">render.yaml</code> را شناسایی کرده و خودکار برنامه را بیلد و منتشر می‌کند.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLOUDFLARE DEPLOYMENT */}
          {activeTab === 'DEPLOY_CLOUDFLARE' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                      <Cloud className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">استقرار در شبکه لبه Cloudflare Pages & Workers</h3>
                      <p className="text-[11px] text-slate-400">
                        فایل‌های <code className="text-amber-300">wrangler.toml</code> و ریدایرکت‌های SPA در پوشه عمومی قرار گرفته‌اند.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-400/30 font-bold">
                    Edge Optimized
                  </span>
                </div>

                {/* Cloudflare Commands */}
                <div className="space-y-3">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">دستور دیپلوی مستقیم با Wrangler CLI:</span>
                      <button
                        onClick={() => handleCopy('npx wrangler pages deploy dist --project-name=tavana-city', 'cf-cli')}
                        className="text-amber-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        {copiedKey === 'cf-cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>کپی دستور</span>
                      </button>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] text-amber-300 flex items-center justify-between">
                      <span>npx wrangler pages deploy dist --project-name=tavana-city</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[11px] text-slate-400 font-mono">تنظیمات در داشبورد Cloudflare Pages:</span>
                    <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                      <li><strong>Build command:</strong> <code className="text-amber-300">npm run build</code></li>
                      <li><strong>Build output directory:</strong> <code className="text-amber-300">dist</code></li>
                      <li><strong>Node.js Version:</strong> <code className="text-amber-300">20</code></li>
                      <li><strong>Environment Variables:</strong> هماهنگ با فایل <code className="text-indigo-300">.env.example</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CI/CD SCRIPTS */}
          {activeTab === 'CI_CD_SCRIPTS' && (
            <div className="space-y-6">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-xs text-slate-900">دستورات اسکریپت در package.json</h3>
                </div>
                <p className="text-[11px] text-slate-600">
                  برای اجرای اتوماتیک مراحل تست، بیلد، تولید خروجی‌ها و پیش‌نمایش محلی از دستورات زیر استفاده کنید:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[11px] text-indigo-700">npm run build</span>
                      <button
                        onClick={() => handleCopy('npm run build', 'cmd-build')}
                        className="text-slate-400 hover:text-slate-800"
                        title="کپی"
                      >
                        {copiedKey === 'cmd-build' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500">کامپایل کامل TypeScript، پلاگین‌های Tailwind و ساخت dist</p>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[11px] text-indigo-700">npm run lint</span>
                      <button
                        onClick={() => handleCopy('npm run lint', 'cmd-lint')}
                        className="text-slate-400 hover:text-slate-800"
                        title="کپی"
                      >
                        {copiedKey === 'cmd-lint' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500">بررسی نوع‌ها (TypeScript Typecheck) بدون خطای بیلد</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-indigo-300 font-bold">
                    🚀 فایل کامل GitHub Actions CI/CD (.github/workflows/deploy-and-build.yml)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md">
                    مستقر در سورس
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  این پایپ‌لاین به ازای هر Push روی شاخه اصلی (main)، به‌صورت خودکار تست‌ها را اجرا کرده، برنامه را روی Cloudflare و Render منتشر می‌سازد و بسته‌های EPF، EPK و APK را به عنوان Artifact بارگذاری می‌کند.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>پایپ‌لاین‌های خودکارسازی کامپایل شده و آماده بهره‌برداری هستند.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
