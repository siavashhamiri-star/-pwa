import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'fa' | 'en' | 'ar' | 'es' | 'zh' | 'hi' | 'ru';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'rtl' | 'ltr';
  flag: string;
  bcp47: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  fa: {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
    direction: 'rtl',
    flag: '🇮🇷',
    bcp47: 'fa-IR',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧',
    bcp47: 'en-US',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
    bcp47: 'ar-SA',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    flag: '🇪🇸',
    bcp47: 'es-ES',
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '简体中文',
    direction: 'ltr',
    flag: '🇨🇳',
    bcp47: 'zh-CN',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    flag: '🇮🇳',
    bcp47: 'hi-IN',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    direction: 'ltr',
    flag: '🇷🇺',
    bcp47: 'ru-RU',
  },
};

export interface Translations {
  appName: string;
  appTagline: string;
  navHome: string;
  navBusinesses: string;
  navRooms: string;
  navLeagues: string;
  navDashboard: string;
  navReferral: string;
  searchPlaceholder: string;
  login: string;
  logout: string;
  architecture: string;
  cicdBuilds: string;
  a11ySettings: string;
  talkBackSimulator: string;
  smartScreenReader: string;
  contrastNormal: string;
  contrastDark: string;
  contrastYellowBlack: string;
  readingGuide: string;
  dyslexiaFont: string;
  reducedMotion: string;
  simplifiedText: string;
  fontSize: string;
  buildHubTitle: string;
  buildHubDesc: string;
  pkgAabTitle: string;
  pkgAabDesc: string;
  pkgApkTitle: string;
  pkgApkDesc: string;
  pkgEpfTitle: string;
  pkgEpfDesc: string;
  pkgEpkTitle: string;
  pkgEpkDesc: string;
  renderTitle: string;
  cloudflareTitle: string;
  securityTitle: string;
  securityDesc: string;
  downloadBtn: string;
  copyBtn: string;
  copied: string;
  statusReady: string;
  languageSelect: string;
}

const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  fa: {
    appName: 'اتاق جوامع اصناف - اکوسیستم آفرینا توانا سیتی',
    appTagline: 'اتاق جوامع اصناف | اکوسیستم آفرینا توانا سیتی (زیست‌بوم جامع کسب‌وکارها، تشکل‌ها و اصناف دسترس‌پذیر)',
    navHome: 'ویترین شهر',
    navBusinesses: 'کسب‌وکارها',
    navRooms: 'اتاق جوامع اصناف',
    navLeagues: 'لیگ‌های ارزش‌آفرینی',
    navDashboard: 'پیشخوان من',
    navReferral: 'سفیران و دعوت',
    searchPlaceholder: 'جستجوی کسب‌وکار، مهارت، خدمت مناسب‌سازی‌شده...',
    login: 'ورود / عضویت',
    logout: 'خروج از حساب',
    architecture: 'معماری هسته توانا',
    cicdBuilds: 'بیلد و اتوماسیون (AAB/APK)',
    a11ySettings: 'تنظیمات دسترسی‌پذیری',
    talkBackSimulator: 'شبیه‌ساز TalkBack اندروید',
    smartScreenReader: 'قرائت‌گر صوتی گویا',
    contrastNormal: 'کنتراست استاندارد',
    contrastDark: 'کنتراست تیره',
    contrastYellowBlack: 'زرد روی مشکی (دید کم)',
    readingGuide: 'خط‌کش راهنمای مطالعه',
    dyslexiaFont: 'قلم خواناتر (دیسلکسیا)',
    reducedMotion: 'کاهش پویانمایی و حرکت',
    simplifiedText: 'حالت متون ساده‌سازی‌شده',
    fontSize: 'اندازه قلم و بزرگنمایی',
    buildHubTitle: 'مرکز خودکارسازی بیلد AAB / APK و استقرار چندسکویی',
    buildHubDesc: 'تولید بسته‌های Android App Bundle (AAB)، فایل‌های APK، فرمت‌های سازمانی EPF/EPK و استقرار Cloudflare و Render',
    pkgAabTitle: 'بسته رسمی گوگل پلی (AAB)',
    pkgAabDesc: 'Android App Bundle استاندارد گوگل پلی با ماژول‌های پویا و حجم بهینه‌شده',
    pkgApkTitle: 'اپلیکیشن اندروید (APK)',
    pkgApkDesc: 'فایل نصب مستقیم اندروید ویژه مایکت، کافه‌بازار و سایدلود با پشتیبانی TalkBack',
    pkgEpfTitle: 'فرمت سازمانی (EPF)',
    pkgEpfDesc: 'Enterprise Package Format شامل داده‌های ممیزی و مانیفست دسترس‌پذیری',
    pkgEpkTitle: 'پکیج کیوسک تعبیه‌شده (EPK)',
    pkgEpkDesc: 'بسته ویژه کیوسک‌های خدمات شهری و نمایشگرهای عمومی دسترس‌پذیر',
    renderTitle: 'استقرار خودکار در Render (Infrastructure as Code)',
    cloudflareTitle: 'استقرار در شبکه لبه Cloudflare Pages & Workers',
    securityTitle: 'معماری امن کلیدهای API و دروازه سرور',
    securityDesc: 'کلیدهای محرمانه و توکن‌های هوش مصنوعی کاملاً در سرور ایزوله شده و هرگز به کلاینت نشت نمی‌کنند.',
    downloadBtn: 'تولید و دانلود فایل',
    copyBtn: 'کپی دستور',
    copied: 'کپی شد!',
    statusReady: 'آماده انتشار',
    languageSelect: 'انتخاب زبان سامانه',
  },
  en: {
    appName: 'Guild Communities Chamber - Afrina Tavana City',
    appTagline: 'Guild Communities Chamber | Afrina Tavana City Ecosystem for Accessible Commerce',
    navHome: 'City Showcase',
    navBusinesses: 'Businesses',
    navRooms: 'Guild Communities Chamber',
    navLeagues: 'Value Leagues',
    navDashboard: 'My Dashboard',
    navReferral: 'Referral & Ambassadors',
    searchPlaceholder: 'Search businesses, skills, accessible services...',
    login: 'Sign In / Register',
    logout: 'Log Out',
    architecture: 'Tavana Core Architecture',
    cicdBuilds: 'CI/CD & Builds (AAB/APK)',
    a11ySettings: 'Accessibility Controls',
    talkBackSimulator: 'Android TalkBack Simulator',
    smartScreenReader: 'Smart Audio Reader',
    contrastNormal: 'Standard Contrast',
    contrastDark: 'Dark Contrast',
    contrastYellowBlack: 'Yellow on Black (Low Vision)',
    readingGuide: 'Reading Guide Ruler',
    dyslexiaFont: 'Dyslexia-Friendly Font',
    reducedMotion: 'Reduced Motion',
    simplifiedText: 'Simplified Plain Text Mode',
    fontSize: 'Font Size & Scaling',
    buildHubTitle: 'AAB / APK Automation & Multi-Platform Deployment Hub',
    buildHubDesc: 'Automated generation of Google Play AAB, Universal APK, Enterprise EPF/EPK and Cloudflare / Render pipelines',
    pkgAabTitle: 'Google Play Bundle (AAB)',
    pkgAabDesc: 'Official Android App Bundle with dynamic feature modules and asset splits',
    pkgApkTitle: 'Android Package (APK)',
    pkgApkDesc: 'Direct-install Android package for app stores and sideload with TalkBack support',
    pkgEpfTitle: 'Enterprise Package (EPF)',
    pkgEpfDesc: 'Enterprise Package Format containing auditable accessibility manifests',
    pkgEpkTitle: 'Embedded Kiosk Kit (EPK)',
    pkgEpkDesc: 'Hardware kiosk package for accessible public touchscreens and municipal stations',
    renderTitle: 'Render Automated Deployment (Infrastructure as Code)',
    cloudflareTitle: 'Cloudflare Pages & Workers Edge Deployment',
    securityTitle: 'Secure API Key Architecture & Server Gateway',
    securityDesc: 'API keys, AI secrets and sensitive tokens are strictly isolated server-side with zero client exposure.',
    downloadBtn: 'Generate & Download',
    copyBtn: 'Copy Command',
    copied: 'Copied!',
    statusReady: 'Release Ready',
    languageSelect: 'Select Platform Language',
  },
  ar: {
    appName: 'مدينة توانا الافتراضية',
    appTagline: 'المنظومة الشاملة للتمكين المهني وإتاحة الوصول لأصحاب الهمم',
    navHome: 'واجهة المدينة',
    navBusinesses: 'المتاجر والمهن',
    navRooms: 'غرف الحوار',
    navLeagues: 'دوريات القيمة',
    navDashboard: 'لوحة التحكم',
    navReferral: 'السفراء والإحالة',
    searchPlaceholder: 'البحث عن المتاجر والمهارات والخدمات المهيأة...',
    login: 'تسجيل الدخول / انضمام',
    logout: 'تسجيل الخروج',
    architecture: 'معمارية نواة توانا',
    cicdBuilds: 'البناء والأتمتة (AAB/APK)',
    a11ySettings: 'إعدادات إمكانية الوصول',
    talkBackSimulator: 'محاكي TalkBack لأندرويد',
    smartScreenReader: 'القارئ الصوتي الذكي',
    contrastNormal: 'التباين القياسي',
    contrastDark: 'التباين الداكن',
    contrastYellowBlack: 'أصفر على أسود (ضعاف البصر)',
    readingGuide: 'مسطرة مساعدة القراءة',
    dyslexiaFont: 'خط مناسب لعسر القراءة',
    reducedMotion: 'تقليل الحركة والرسوم',
    simplifiedText: 'وضع النصوص المبسطة',
    fontSize: 'حجم الخط والتكبير',
    buildHubTitle: 'مركز أتمتة حزم AAB / APK والنشر السحابي',
    buildHubDesc: 'توليد حزم Google Play AAB وملفات APK وتنسيقات EPF/EPK المؤسسية والنشر على Render و Cloudflare',
    pkgAabTitle: 'حزمة جوجل بلاي الرسمية (AAB)',
    pkgAabDesc: 'Android App Bundle الرسمي مع تقسيم ديناميكي للحجم لمتجر Google Play',
    pkgApkTitle: 'تطبيق أندرويد المباشر (APK)',
    pkgApkDesc: 'ملف التثبيت المباشر المتوافق مع شاشات اللمس وخدمات TalkBack',
    pkgEpfTitle: 'الحزمة المؤسسية (EPF)',
    pkgEpfDesc: 'Enterprise Package Format مع سجلات الوصول وبيانات التدقيق الشامل',
    pkgEpkTitle: 'حزمة الأكشاك التفاعلية (EPK)',
    pkgEpkDesc: 'حزمة مهيأة للأكشاك البلدية وشاشات الخدمة العامة الميسرة',
    renderTitle: 'النشر الآلي على خوادم Render',
    cloudflareTitle: 'النشر على شبكة Cloudflare Pages السحابية',
    securityTitle: 'معمارية مفاتيح API الآمنة وبوابة الخادم',
    securityDesc: 'مفاتيح الواجهات البرمجية والذكاء الاصطناعي معزولة بالكامل على الخادم ولا تتسرب إلى العميل أبداً.',
    downloadBtn: 'توليد وتحميل الملف',
    copyBtn: 'نسخ الأمر',
    copied: 'تم النسخ!',
    statusReady: 'جاهز للإطلاق',
    languageSelect: 'اختر لغة النظام',
  },
  es: {
    appName: 'Ciudad Tavana',
    appTagline: 'Ecosistema inclusivo para empoderamiento, empleo y accesibilidad universal',
    navHome: 'Escaparate Urbano',
    navBusinesses: 'Negocios',
    navRooms: 'Salas Comunitarias',
    navLeagues: 'Ligas de Valor',
    navDashboard: 'Mi Panel',
    navReferral: 'Embajadores y Referidos',
    searchPlaceholder: 'Buscar negocios, habilidades o servicios accesibles...',
    login: 'Iniciar Sesión / Registro',
    logout: 'Cerrar Sesión',
    architecture: 'Arquitectura Tavana Core',
    cicdBuilds: 'CI/CD y Compilación (AAB/APK)',
    a11ySettings: 'Controles de Accesibilidad',
    talkBackSimulator: 'Simulador Android TalkBack',
    smartScreenReader: 'Lector de Voz Inteligente',
    contrastNormal: 'Contraste Estándar',
    contrastDark: 'Contraste Oscuro',
    contrastYellowBlack: 'Amarillo sobre Negro (Baja Visión)',
    readingGuide: 'Guía de Lectura',
    dyslexiaFont: 'Fuente para Dislexia',
    reducedMotion: 'Movimiento Reducido',
    simplifiedText: 'Modo de Texto Simplificado',
    fontSize: 'Tamaño de Fuente',
    buildHubTitle: 'Centro de Automatización AAB / APK y Despliegue',
    buildHubDesc: 'Generación automatizada de paquetes Google Play AAB, APK universal, EPF/EPK y despliegues en Render y Cloudflare',
    pkgAabTitle: 'Paquete Google Play (AAB)',
    pkgAabDesc: 'Android App Bundle oficial con módulos dinámicos y peso optimizado',
    pkgApkTitle: 'Paquete Android (APK)',
    pkgApkDesc: 'Instalador directo compatible con tiendas de aplicaciones y TalkBack',
    pkgEpfTitle: 'Formato Empresarial (EPF)',
    pkgEpfDesc: 'Enterprise Package Format con especificaciones completas de accesibilidad',
    pkgEpkTitle: 'Paquete de Quiosco (EPK)',
    pkgEpkDesc: 'Paquete para pantallas táctiles de quioscos públicos y terminales de autoservicio',
    renderTitle: 'Despliegue Automatizado en Render',
    cloudflareTitle: 'Despliegue en Cloudflare Pages & Workers',
    securityTitle: 'Arquitectura Segura de Claves API y Pasarela de Servidor',
    securityDesc: 'Las claves de API y secretos de IA están estrictamente protegidos en el servidor sin filtración al cliente.',
    downloadBtn: 'Generar y Descargar',
    copyBtn: 'Copiar Comando',
    copied: '¡Copiado!',
    statusReady: 'Listo para Publicar',
    languageSelect: 'Seleccionar Idioma',
  },
  zh: {
    appName: '塔瓦纳包容之城 (Tavana City)',
    appTagline: '赋能残障群体、就业扶持与全方位无障碍数字生态',
    navHome: '城市橱窗',
    navBusinesses: '无障碍商家',
    navRooms: '社区交流室',
    navLeagues: '贡献联赛',
    navDashboard: '个人工作台',
    navReferral: '大使与推荐',
    searchPlaceholder: '搜索商家、专业技能或无障碍便民服务...',
    login: '登录 / 注册',
    logout: '退出登录',
    architecture: 'Tavana核心架构',
    cicdBuilds: 'CI/CD与构建 (AAB/APK)',
    a11ySettings: '无障碍辅助设置',
    talkBackSimulator: '安卓TalkBack模拟器',
    smartScreenReader: '智能语音朗读器',
    contrastNormal: '标准对比度',
    contrastDark: '深色高对比度',
    contrastYellowBlack: '黑底黄字 (弱视专用)',
    readingGuide: '阅读对齐辅助尺',
    dyslexiaFont: '阅读障碍友好字体',
    reducedMotion: '减弱动态效果',
    simplifiedText: '极简通俗文本模式',
    fontSize: '字体大小与缩放',
    buildHubTitle: 'AAB / APK 自动化构建与多端发布中心',
    buildHubDesc: '全自动生成 Google Play AAB 捆绑包、通用 APK、企业级 EPF/EPK 以及 Cloudflare / Render 部署',
    pkgAabTitle: '谷歌应用捆绑包 (AAB)',
    pkgAabDesc: 'Google Play 官方标准 AAB，支持动态分包分发与体积优化',
    pkgApkTitle: '安卓独立安装包 (APK)',
    pkgApkDesc: '支持本地直装，完美适配 TalkBack 读屏与无障碍触觉震动',
    pkgEpfTitle: '企业标准化归档 (EPF)',
    pkgEpfDesc: 'Enterprise Package Format 包含完整的无障碍审计清单与防作弊规则',
    pkgEpkTitle: '便民终端自助包 (EPK)',
    pkgEpkDesc: '面向市政大厅与公众触控大屏的嵌入式无障碍交互包',
    renderTitle: 'Render 云服务自动化部署 (IaC)',
    cloudflareTitle: 'Cloudflare Pages & Workers 边缘网络部署',
    securityTitle: 'API 密钥安全架构与服务端网关',
    securityDesc: '所有 API 密钥及 AI 模型秘钥全部托管于后端服务端，杜绝任何客户端泄露风险。',
    downloadBtn: '生成并下载包体',
    copyBtn: '复制命令',
    copied: '已复制！',
    statusReady: '发布就绪',
    languageSelect: '选择系统语言',
  },
  hi: {
    appName: 'तवाना सिटी (Tavana City)',
    appTagline: 'सशक्तिकरण, रोजगार और सार्वभौमिक सुलभता का समावेशी डिजिटल परितंत्र',
    navHome: 'शहर का शोकेस',
    navBusinesses: 'सुलभ व्यवसाय',
    navRooms: 'सामुदायिक कक्ष',
    navLeagues: 'योगदान लीग',
    navDashboard: 'मेरा डैशबोर्ड',
    navReferral: 'राजदूत और रेफरल',
    searchPlaceholder: 'व्यवसाय, कौशल या सुलभ सेवाएं खोजें...',
    login: 'लॉग इन / पंजीकरण',
    logout: 'लॉग आउट',
    architecture: 'तवाना कोर आर्किटेक्चर',
    cicdBuilds: 'CI/CD और बिल्ड (AAB/APK)',
    a11ySettings: 'सुलभता नियंत्रण',
    talkBackSimulator: 'टॉकबैक सिम्युलेटर',
    smartScreenReader: 'स्मार्ट वॉयस रीडर',
    contrastNormal: 'सामान्य कंट्रास्ट',
    contrastDark: 'डार्क कंट्रास्ट',
    contrastYellowBlack: 'काले पर पीला (कम दृष्टि)',
    readingGuide: 'रीडिंग रूलर गाइड',
    dyslexiaFont: 'डिस्लेक्सिया-अनुकूल फ़ॉन्ट',
    reducedMotion: 'कम गति (Reduced Motion)',
    simplifiedText: 'सरलीकृत पाठ मोड',
    fontSize: 'फ़ॉन्ट आकार',
    buildHubTitle: 'AAB / APK ऑटोमेशन और मल्टी-प्लेटफ़ॉर्म परिनियोजन केंद्र',
    buildHubDesc: 'Google Play AAB, यूनिवर्सल APK, उद्यम EPF/EPK और Cloudflare / Render पाइपलाइन का स्वचालित निर्माण',
    pkgAabTitle: 'Google Play बंडल (AAB)',
    pkgAabDesc: 'Google Play स्टोर के लिए आधिकारिक Android App Bundle डायनामिक मॉड्यूल के साथ',
    pkgApkTitle: 'एंड्रॉइड पैकेज (APK)',
    pkgApkDesc: 'TalkBack समर्थन के साथ सीधा एंड्रॉइड इंस्टॉलर फ़ाइल',
    pkgEpfTitle: 'एंटरप्राइज पैकेज (EPF)',
    pkgEpfDesc: 'Enterprise Package Format जिसमें सुलभता ऑडिट मेनिफेस्ट शामिल है',
    pkgEpkTitle: 'कियोस्क किट पैकेज (EPK)',
    pkgEpkDesc: 'सार्वजनिक टचस्क्रीन और सुलभ नागरिक कियोस्क के लिए एम्बेडेड पैकेज',
    renderTitle: 'Render ऑटोमेटेड डिप्लॉयमेंट',
    cloudflareTitle: 'Cloudflare Pages और Workers एज डिप्लॉयमेंट',
    securityTitle: 'सुरक्षित API कुंजी वास्तुकला और सर्वर गेटवे',
    securityDesc: 'सभी API कीज़ और AI सीक्रेट केवल सर्वर पर सुरक्षित रखे जाते हैं, क्लाइंट पर कभी उजागर नहीं होते।',
    downloadBtn: 'उत्पन्न और डाउनलोड करें',
    copyBtn: 'कमांड कॉपी करें',
    copied: 'कॉपी किया गया!',
    statusReady: 'रिलीज के लिए तैयार',
    languageSelect: 'भाषा चुनें',
  },
  ru: {
    appName: 'Город Тавана (Tavana City)',
    appTagline: 'Инклюзивная экосистема расширения возможностей, занятости и доступности',
    navHome: 'Витрина города',
    navBusinesses: 'Предприятия',
    navRooms: 'Тематические залы',
    navLeagues: 'Лиги ценностей',
    navDashboard: 'Мой кабинет',
    navReferral: 'Амбассадоры и рефералы',
    searchPlaceholder: 'Поиск доступных предприятий, услуг и мастеров...',
    login: 'Вход / Регистрация',
    logout: 'Выйти из аккаунта',
    architecture: 'Архитектура ядра Tavana',
    cicdBuilds: 'CI/CD и сборки (AAB/APK)',
    a11ySettings: 'Настройки доступности',
    talkBackSimulator: 'Симулятор TalkBack Android',
    smartScreenReader: 'Умный речевой чтец',
    contrastNormal: 'Стандартный контраст',
    contrastDark: 'Тёмный контраст',
    contrastYellowBlack: 'Жёлтый на чёрном (слабовидение)',
    readingGuide: 'Линейка для чтения',
    dyslexiaFont: 'Шрифт для дислексии',
    reducedMotion: 'Уменьшение движения',
    simplifiedText: 'Упрощенный режим текста',
    fontSize: 'Размер шрифта',
    buildHubTitle: 'Центр автоматизации AAB / APK и мультиплатформенного развертывания',
    buildHubDesc: 'Автоматическая сборка Google Play AAB, APK, корпоративных форматов EPF/EPK и пайплайнов Cloudflare / Render',
    pkgAabTitle: 'Пакет Google Play (AAB)',
    pkgAabDesc: 'Официальный Android App Bundle с динамическими модулями и оптимизированным размером',
    pkgApkTitle: 'Установочный пакет (APK)',
    pkgApkDesc: 'Прямой установочный файл Android с полной поддержкой службы TalkBack',
    pkgEpfTitle: 'Корпоративный пакет (EPF)',
    pkgEpfDesc: 'Enterprise Package Format с аудиторскими манифестами доступности',
    pkgEpkTitle: 'Пакет для киосков (EPK)',
    pkgEpkDesc: 'Встроенный пакет для доступных сенсорных терминалов и городских киосков',
    renderTitle: 'Автоматическое развертывание в Render (IaC)',
    cloudflareTitle: 'Развертывание в сети Cloudflare Pages & Workers',
    securityTitle: 'Безопасная архитектура API-ключей и серверный шлюз',
    securityDesc: 'Все ключи API и секреты ИИ изолированы на сервере и никогда не передаются на клиент.',
    downloadBtn: 'Собрать и скачать',
    copyBtn: 'Копировать команду',
    copied: 'Скопировано!',
    statusReady: 'Готово к релизу',
    languageSelect: 'Выбор языка системы',
  },
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  info: LanguageInfo;
  isRtl: boolean;
  supportedLanguages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('tavana_selected_lang') as SupportedLanguage;
      if (saved && SUPPORTED_LANGUAGES[saved]) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'fa';
  });

  const setLanguage = (newLang: SupportedLanguage) => {
    if (!SUPPORTED_LANGUAGES[newLang]) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem('tavana_selected_lang', newLang);
    } catch {
      // ignore
    }
  };

  const currentInfo = SUPPORTED_LANGUAGES[language];
  const isRtl = currentInfo.direction === 'rtl';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = currentInfo.direction;
    if (isRtl) {
      root.classList.add('rtl');
      root.classList.remove('ltr');
    } else {
      root.classList.add('ltr');
      root.classList.remove('rtl');
    }
  }, [language, currentInfo.direction, isRtl]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
        info: currentInfo,
        isRtl,
        supportedLanguages: Object.values(SUPPORTED_LANGUAGES),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
