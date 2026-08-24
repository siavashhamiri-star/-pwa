import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessProfile,
  Category,
  CommunityRoom,
  ChatMessage,
  XpTransaction,
  ReferralRecord,
  ModerationReport,
  AuditLog,
  VerificationStatus,
  VerificationLevel,
  BusinessStatus,
  ReportStatus,
  BusinessReview,
  OfflineSyncItem,
  RoomCategory,
} from '../types';
import { useAuth } from './AuthContext';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-crafts',
    title: 'صنایع دستی و هنرهای تجسمی',
    description: 'سفالگری لمسی، فرش‌بافی، معرق، چرم‌دوزی و آثار دست‌ساز توانمندان',
    icon: 'Palette',
    slug: 'handicrafts',
    color: 'indigo',
  },
  {
    id: 'cat-digital',
    title: 'خدمات دیجیتال و فناوری',
    description: 'برنامه‌نویسی، طراحی UI/UX دسترس‌پذیر، سئو، هوش مصنوعی و ورود اطلاعات',
    icon: 'Laptop',
    slug: 'digital-services',
    color: 'blue',
  },
  {
    id: 'cat-food',
    title: 'محصولات خوراکی و خانگی',
    description: 'شیرینی‌های سنتی، میوه خشک، ترشیجات بهداشتی، دمنوش‌های گیاهی و ارگانیک',
    icon: 'UtensilsCrossed',
    slug: 'food-products',
    color: 'amber',
  },
  {
    id: 'cat-consulting',
    title: 'آموزش، مشاوره و روانشناسی',
    description: 'مشاوره شغلی، زبان‌آموزی، تدریس خصوصی، مشاوره انگیزشی و توانبخشی',
    icon: 'GraduationCap',
    slug: 'education-consulting',
    color: 'emerald',
  },
  {
    id: 'cat-a11y-tech',
    title: 'تجهیزات و ابزارهای کمکی',
    description: 'عصای هوشمند، برجسته‌نگار بریل، ویلچر و ارگونومی، نرم‌افزارهای دسترس‌پذیری',
    icon: 'Accessibility',
    slug: 'assistive-technology',
    color: 'purple',
  },
  {
    id: 'cat-content',
    title: 'تولید محتوا، ترجمه و گویندگی',
    description: 'ترجمه متون، ویراستاری، گویندگی پادکست و کتاب صوتی، زیرنویس‌گذاری برای ناشنوایان',
    icon: 'Headphones',
    slug: 'content-translation',
    color: 'rose',
  },
];

export const INITIAL_BUSINESSES: BusinessProfile[] = [
  {
    id: 'biz-1',
    ownerId: 'user-blind-artisan',
    ownerName: 'مریم سلیمانی',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    name: 'کارگاه سفال لمسی «آوای نقش»',
    slogan: 'لمس زیبایی با سرانگشتان هنر و خط بریل',
    description:
      'تولید تخصصی ماگ‌ها، بشقاب‌ها و گلدان‌های سرامیکی با نقوش برجسته و جملات الهام‌بخش به خط بریل فارسی و لاتین. کلیه مراحل با دست و با کیفیت لعاب کوره‌ای انجام می‌شود.',
    categoryId: 'cat-crafts',
    city: 'اصفهان',
    address: 'اصفهان، خیابان چهارباغ عباسی، مجتمع هنر، طبقه همکف، پلاک ۱۲',
    phoneNumber: '09131112233',
    whatsappNumber: '09131112233',
    websiteUrl: 'https://avayenaghsh.ir',
    coverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
    ],
    verificationStatus: 'VERIFIED',
    verificationLevel: 3,
    status: 'ACTIVE',
    accessibilityFeatures: [
      'BRAILLE_MENU',
      'AUDIO_GUIDE',
      'WHEELCHAIR_RAMP',
      'TEXT_BASED_ORDERING',
      'HOME_DELIVERY',
    ],
    specialDiscountsForDisabled: true,
    discountPercentage: 20,
    audioIntroText: 'سلام! به کارگاه سفال آوای نقش خوش آمدید. من مریم سلیمانی هستم، هنرمند روشندل. با خرید این محصولات از تولید ملی و استقلال پایدار جامعه توان‌یابان حمایت می‌کنید.',
    products: [
      {
        id: 'prod-1',
        title: 'ماگ سرامیکی نقش‌برجسته خط بریل (جمله: امید زیباست)',
        description: 'ماگ دست‌ساز با خط بریل لمسی و لعاب بهداشتی ضدخش، قابل شستشو در ماشین ظرفشویی',
        price: 280000,
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500',
        inStock: true,
      },
      {
        id: 'prod-2',
        title: 'گلدان مینیمال لمسی مدل سپیدار',
        description: 'گلدان فرم‌داده شده با حس لامسه طبیعی و بافت مات ضد لغزش',
        price: 390000,
        imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500',
        inStock: true,
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        userId: 'user-admin',
        userName: 'سیاوش حمیری',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        rating: 5,
        accessibilityRating: 5,
        comment: 'کیفیت ساخت فوق‌العاده بالا و حس لامسه خطوط بریل واقعا بی‌نظیر است. بسته‌بندی عالی بود.',
        createdAt: '2025-05-10T11:00:00.000Z',
      },
    ],
    rating: 4.9,
    ratingCount: 14,
    viewsCount: 380,
    likesCount: 92,
    createdAt: '2025-02-16T10:00:00.000Z',
  },
  {
    id: 'biz-2',
    ownerId: 'user-deaf-coder',
    ownerName: 'احسان کاظمی',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    name: 'استودیو نرم‌افزار دسترس‌پذیر «روشا وب»',
    slogan: 'توسعه پورتال‌ها و اپلیکیشن‌های وب منطبق با استاندارد WCAG 2.1 AAA',
    description:
      'مشاوره، بازطراحی و اجرای استانداردهای دسترس‌پذیری برای وب‌سایت‌های دولتی و شرکتی توسط توسعه‌دهندگان متخصص ناشنوا و کم‌شنوا. ارتباطات کاملاً متنی و چابک.',
    categoryId: 'cat-digital',
    city: 'مشهد',
    address: 'مشهد، بلوار سجاد، پارک علم و فناوری، واحد ۲۰۴',
    phoneNumber: '09152223344',
    whatsappNumber: '09152223344',
    websiteUrl: 'https://roshaweb.dev',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    ],
    verificationStatus: 'VERIFIED',
    verificationLevel: 3,
    status: 'ACTIVE',
    accessibilityFeatures: [
      'TEXT_BASED_ORDERING',
      'SIGN_LANGUAGE_SUPPORT',
      'QUIET_ENVIRONMENT',
      'HOME_DELIVERY',
    ],
    specialDiscountsForDisabled: true,
    discountPercentage: 25,
    audioIntroText: 'استودیو روشا وب؛ تخصص ما ساخت پلتفرم‌هایی است که هیچ فردی به دلیل محدودیت جسمی از دسترسی به اطلاعات محروم نماند.',
    products: [
      {
        id: 'prod-3',
        title: 'ممیزی و آدیت کامل دسترس‌پذیری سایت (Accessibility Audit)',
        description: 'بررسی جامع با صفحه‌خوان‌ها، کنتراست رنگ و کیبورد به همراه گزارش فنی رفع باگ',
        price: 3500000,
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
        inStock: true,
      },
    ],
    reviews: [],
    rating: 5.0,
    ratingCount: 8,
    viewsCount: 290,
    likesCount: 64,
    createdAt: '2025-03-02T12:00:00.000Z',
  },
  {
    id: 'biz-3',
    ownerId: 'user-wheelchair-baker',
    ownerName: 'سارا نامدار',
    ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    name: 'قنادی خانگی «شیرینی‌آرا»',
    slogan: 'کیک و شیرینی خانگی ارگانیک با شکر قهوه‌ای و آرد بادام',
    description:
      'تهیه انواع شیرینی‌های سنتی شیراز، باقلوا، کلوچه مسقطی، و کوکی‌های بدون گلوتن مناسب افراد دیابتی یا با نیازهای ویژه تغذیه‌ای با ارسال اکسپرس درب منزل.',
    categoryId: 'cat-food',
    city: 'شیراز',
    address: 'شیراز، خیابان معالی‌آباد، کوچه بهار، پلاک ۵',
    phoneNumber: '09173334455',
    whatsappNumber: '09173334455',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    ],
    verificationStatus: 'SELF_DECLARED',
    verificationLevel: 2,
    status: 'ACTIVE',
    accessibilityFeatures: [
      'WHEELCHAIR_RAMP',
      'HOME_DELIVERY',
      'TEXT_BASED_ORDERING',
    ],
    specialDiscountsForDisabled: true,
    discountPercentage: 15,
    audioIntroText: 'طعم شیرین زندگی با محصولات تازه و رژیمی شیرینی‌آرا. ارسال با رعایت بهداشت کامل در ظروف بهداشتی زیست‌تخریب‌پذیر.',
    products: [
      {
        id: 'prod-4',
        title: 'بسته پذیرایی کوکی بادام بدون گلوتن و کم‌کالری (۱ کیلوگرم)',
        description: 'پخته شده با آرد بادام درجه یک و استویا طبیعی مناسب رژیم‌های سلامت',
        price: 340000,
        imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500',
        inStock: true,
      },
    ],
    reviews: [],
    rating: 4.8,
    ratingCount: 19,
    viewsCount: 410,
    likesCount: 105,
    createdAt: '2025-04-12T09:00:00.000Z',
  },
];

export const INITIAL_ROOMS: CommunityRoom[] = [
  {
    id: 'room-health',
    title: 'اتاق سلامت و پزشکان حامی (Health & Medical)',
    description: 'مشاوره‌های عمومی سلامت، ارزیابی مراکز درمانی دسترس‌پذیر و تجهیزات توانبخشی',
    category: 'سلامت و درمان',
    roomType: 'HEALTH_DOCTORS',
    icon: 'Stethoscope',
    activeUsersCount: 32,
    messagesCount: 145,
    isAccessibleFocus: true,
    isModerated: true,
    rules: ['رعایت حفظ حریم خصوصی بیماران', 'عدم تجویز مستقیم داروهای تخصصی بدون ویزیت'],
  },
  {
    id: 'room-legal',
    title: 'اتاق حقوق و مشاوره قضایی دسترس‌پذیر (Legal & Rights)',
    description: 'راهنمایی قوانین حمایت از حقوق معلولان، استخدام، مستمری و مشاوره‌های حقوقی',
    category: 'حقوق و قوانین',
    roomType: 'LEGAL_JUSTICE',
    icon: 'Scale',
    activeUsersCount: 28,
    messagesCount: 98,
    isAccessibleFocus: true,
    isModerated: true,
    rules: ['استناد به مواد قانونی مصوب', 'رعایت اخلاق حرفه‌ای وکالت'],
  },
  {
    id: 'room-tech',
    title: 'اتاق مهندسان، توسعه‌دهندگان و فناوری‌های کمکی (Tech & A11y)',
    description: 'بحث پیرامون هوش مصنوعی، ابزارهای TalkBack، طراحی WCAG و توسعه نرم‌افزارهای کمکی',
    category: 'فناوری و مهندسی',
    roomType: 'TECH_ENGINEERING',
    icon: 'Cpu',
    activeUsersCount: 54,
    messagesCount: 320,
    isAccessibleFocus: true,
    isModerated: true,
    rules: ['به اشتراک‌گذاری کد تمیز و دسترس‌پذیر', 'پاسخگویی محترمانه به پرسش‌های فنی نوآموزان'],
  },
  {
    id: 'room-crafts',
    title: 'اتاق هنرمندان، صنایع‌دستی و طراحان (Art & Handicrafts)',
    description: 'معرفی دست‌سازه‌ها، سفالگری لمسی، خط بریل، معرق و هنرهای تجسمی توانمندان',
    category: 'هنر و خلاقیت',
    roomType: 'ART_HANDICRAFTS',
    icon: 'Palette',
    activeUsersCount: 41,
    messagesCount: 210,
    isAccessibleFocus: true,
    isModerated: false,
    rules: ['احترام به مالکیت معنوی آثار هنری', 'ارائه توضیحات متنی تصویر (Alt Text) برای آثار'],
  },
  {
    id: 'room-edu',
    title: 'اتاق آموزش، توانبخشی و مهارت‌آموزی (Education & Mentoring)',
    description: 'کارگاه‌های آنلاین، یادگیری مهارت‌های حرفه‌ای، زبان‌آموزی و انتقال تجارب زندگی مستقل',
    category: 'آموزش و توانبخشی',
    roomType: 'EDUCATION_MENTORING',
    icon: 'GraduationCap',
    activeUsersCount: 36,
    messagesCount: 160,
    isAccessibleFocus: true,
    isModerated: true,
    rules: ['زبان شفاف و قابل فهم', 'ارائه منابع آموزشی در فرمت‌های صوتی و متنی'],
  },
  {
    id: 'room-biz',
    title: 'اتاق کسب‌وکار، بازارچه و صادرات (Commerce & Market)',
    description: 'فرصت‌های شبکه‌سازی تجاری، ثبت سفارش‌های کلان و فروش مستقیم B2B و B2C',
    category: 'تجارت و اقتصاد',
    roomType: 'COMMERCE_BUSINESS',
    icon: 'Briefcase',
    activeUsersCount: 47,
    messagesCount: 185,
    isAccessibleFocus: true,
    isModerated: true,
    rules: ['صداقت در قیمت‌گذاری و معرفی کالا', 'تعهد به ارسال ایمن و به موقع'],
  },
  {
    id: 'room-values',
    title: 'تالار ارزش‌آفرینان برتر (Value Creators Hall)',
    description: 'میزگرد قهرمانان تولید، نوآوران کارآفرین و برترین‌های لیگ طلایی و الماس',
    category: 'تالار مشاهیر',
    roomType: 'VALUE_CREATORS',
    icon: 'Trophy',
    activeUsersCount: 22,
    messagesCount: 110,
    isAccessibleFocus: true,
    isModerated: true,
    rules: ['اشتراک تجارب موفقیت و تاب‌آوری', 'همیاری به استارتاپ‌های نوپا'],
  },
  {
    id: 'room-connectors',
    title: 'تالار سفیران ارتباط و معرفی (Connectors Hall)',
    description: 'شبکه مروجین فرهنگ دسترس‌پذیری، فعالان کمپین‌های اجتماعی و بازوان رشد شهر توانا',
    category: 'سفیران توانا',
    roomType: 'CONNECTORS',
    icon: 'Share2',
    activeUsersCount: 39,
    messagesCount: 175,
    isAccessibleFocus: true,
    isModerated: true,
    rules: ['ترویج فراگیری و برابری فرصت‌ها', 'استفاده از کدهای معرفی اخلاقی بدون اسپم'],
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    roomId: 'room-crafts',
    senderId: 'user-blind-artisan',
    senderName: 'مریم سلیمانی',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    senderRole: 'BUSINESS_OWNER',
    text: 'سلام به همه دوستان گرامی شهر توانا. سفارش‌های ماگ با خط بریل این هفته آماده ارسال به سراسر کشور است.',
    createdAt: '2025-05-12T08:30:00.000Z',
  },
  {
    id: 'msg-2',
    roomId: 'room-tech',
    senderId: 'user-deaf-coder',
    senderName: 'احسان کاظمی',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    senderRole: 'BUSINESS_OWNER',
    text: 'درود، من ماژول جدید ممیزی خودکار WCAG برای کدهای ری‌اکت را آماده کرده‌ام و در اختیار دوستان قرار می‌دهم.',
    createdAt: '2025-05-12T08:45:00.000Z',
  },
  {
    id: 'msg-3',
    roomId: 'room-values',
    senderId: 'user-mentor',
    senderName: 'دکتر علیرضا فروغی',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    senderRole: 'MENTOR',
    text: 'هم‌افزایی بی‌نظیری است. توصیه می‌کنم از سیستم امتیازدهی و هدایای XP شهر برای تجلیل از فعالیت‌های مشترک استفاده کنید.',
    createdAt: '2025-05-12T09:00:00.000Z',
  },
];

export const INITIAL_XP_TRANSACTIONS: XpTransaction[] = [
  {
    id: 'xp-1',
    userId: 'user-admin',
    eventType: 'BUSINESS_REGISTERED',
    amount: 150,
    source: 'BUSINESS_MODULE',
    reason: 'ثبت و انتشار ویترین دسترسی‌پذیر در شهر توانا',
    antiFraudStatus: 'VERIFIED',
    timestamp: '2025-05-01T10:00:00.000Z',
  },
  {
    id: 'xp-2',
    userId: 'user-admin',
    eventType: 'A11Y_AUDIT_CONTRIBUTED',
    amount: 50,
    source: 'SYSTEM',
    reason: 'تأیید و ثبت بازخورد ممیزی دسترس‌پذیری اماکن',
    antiFraudStatus: 'VERIFIED',
    timestamp: '2025-05-02T14:30:00.000Z',
  },
  {
    id: 'xp-3',
    userId: 'user-admin',
    eventType: 'REFERRAL_COMPLETED',
    amount: 100,
    source: 'REFERRAL_ENGINE',
    reason: 'پاداش معرفی عضو جدید فعال به اکوسیستم توانا',
    antiFraudStatus: 'VERIFIED',
    timestamp: '2025-05-03T18:00:00.000Z',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    action: 'VERIFY_BUSINESS',
    targetType: 'BUSINESS',
    targetId: 'biz-1',
    performedBy: 'user-admin',
    performedByName: 'سیاوش حمیری',
    details: 'اعطای نشان رسمی تأیید توانا به کارگاه سفال آوای نقش پس از ارزیابی استانداردهای بریل',
    createdAt: '2025-05-01T09:00:00.000Z',
  },
  {
    id: 'log-2',
    action: 'SYSTEM_BOOTSTRAP',
    targetType: 'SYSTEM',
    targetId: 'core-1',
    performedBy: 'user-admin',
    performedByName: 'سیاوش حمیری',
    details: 'استقرار نسخه یکپارچه Tavana Central Core & PWA Engine',
    createdAt: '2025-05-01T08:00:00.000Z',
  },
];

export const INITIAL_REPORTS: ModerationReport[] = [
  {
    id: 'rep-1',
    reporterId: 'user-blind-artisan',
    reporterName: 'مریم سلیمانی',
    targetType: 'BUSINESS',
    targetId: 'biz-test',
    targetTitle: 'فروشگاه تستی بدون امکانات دسترس‌پذیری',
    reason: 'عدم انطباق با استانداردهای اظهارشده',
    description: 'در صفحه اعلام شده رمپ وجود دارد اما پله‌های شیب‌دار بدون دستگیره دارد.',
    status: 'PENDING',
    createdAt: '2025-05-11T16:00:00.000Z',
  },
];

interface TavanaCityContextType {
  categories: Category[];
  businesses: BusinessProfile[];
  rooms: CommunityRoom[];
  messages: ChatMessage[];
  directMessages: ChatMessage[];
  xpTransactions: XpTransaction[];
  referrals: ReferralRecord[];
  reports: ModerationReport[];
  auditLogs: AuditLog[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  selectedA11yFeature: string | null;
  setSelectedA11yFeature: (feat: string | null) => void;
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
  addBusiness: (business: Omit<BusinessProfile, 'id' | 'createdAt' | 'rating' | 'ratingCount' | 'viewsCount' | 'likesCount' | 'reviews'>) => BusinessProfile;
  updateBusinessVerification: (businessId: string, status: VerificationStatus) => void;
  updateBusinessStatus: (businessId: string, status: BusinessStatus) => void;
  addReviewToBusiness: (businessId: string, review: Omit<BusinessReview, 'id' | 'createdAt' | 'userId' | 'userName' | 'userAvatar'>) => void;
  sendMessageToRoom: (roomId: string, text: string) => void;
  sendDirectMessage: (receiverId: string, text: string) => void;
  submitReport: (report: Omit<ModerationReport, 'id' | 'createdAt' | 'status' | 'reporterId' | 'reporterName'>) => void;
  reviewReport: (reportId: string, status: ReportStatus, note?: string) => void;
  likeBusiness: (businessId: string) => void;
}

const TavanaCityContext = createContext<TavanaCityContextType | undefined>(undefined);

export const TavanaCityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, awardXp } = useAuth();

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [businesses, setBusinesses] = useState<BusinessProfile[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_businesses');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_BUSINESSES;
  });

  const [rooms] = useState<CommunityRoom[]>(INITIAL_ROOMS);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MESSAGES;
  });

  const [directMessages, setDirectMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_dm');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [xpTransactions, setXpTransactions] = useState<XpTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_xp_tx');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_XP_TRANSACTIONS;
  });

  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [reports, setReports] = useState<ModerationReport[]>(INITIAL_REPORTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedA11yFeature, setSelectedA11yFeature] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('tavana_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('tavana_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('tavana_dm', JSON.stringify(directMessages));
  }, [directMessages]);

  useEffect(() => {
    localStorage.setItem('tavana_xp_tx', JSON.stringify(xpTransactions));
  }, [xpTransactions]);

  const logAudit = (action: string, targetType: string, targetId: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action,
      targetType,
      targetId,
      performedBy: currentUser?.id || 'anonymous',
      performedByName: currentUser?.displayName || 'کاربر مهمان',
      details,
      createdAt: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addBusiness = (data: Omit<BusinessProfile, 'id' | 'createdAt' | 'rating' | 'ratingCount' | 'viewsCount' | 'likesCount' | 'reviews'>): BusinessProfile => {
    const newBiz: BusinessProfile = {
      ...data,
      id: `biz-${Date.now()}`,
      rating: 5.0,
      ratingCount: 1,
      viewsCount: 1,
      likesCount: 0,
      reviews: [],
      createdAt: new Date().toISOString(),
    };

    setBusinesses((prev) => [newBiz, ...prev]);
    logAudit('CREATE_BUSINESS', 'BUSINESS', newBiz.id, `ایجاد ویترین کسب‌وکار: ${newBiz.name}`);
    awardXp(150, 'ثبت ویترین کسب‌وکار جدید', 'CREATE_SHOWCASE', newBiz.id);

    // Add XP tx
    if (currentUser) {
      setXpTransactions((prev) => [
        {
          id: `xp-${Date.now()}`,
          userId: currentUser.id,
          eventType: 'BUSINESS_REGISTERED',
          amount: 150,
          source: 'BUSINESS_MODULE',
          relatedEntityId: newBiz.id,
          reason: `ثبت ویترین جدید «${newBiz.name}»`,
          antiFraudStatus: 'VERIFIED',
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    return newBiz;
  };

  const updateBusinessVerification = (businessId: string, status: VerificationStatus) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === businessId ? { ...b, verificationStatus: status } : b))
    );
    logAudit('UPDATE_VERIFICATION', 'BUSINESS', businessId, `تغییر نشان احراز به ${status}`);
  };

  const updateBusinessStatus = (businessId: string, status: BusinessStatus) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === businessId ? { ...b, status: status } : b))
    );
    logAudit('UPDATE_STATUS', 'BUSINESS', businessId, `تغییر وضعیت ویترین به ${status}`);
  };

  const addReviewToBusiness = (
    businessId: string,
    reviewData: Omit<BusinessReview, 'id' | 'createdAt' | 'userId' | 'userName' | 'userAvatar'>
  ) => {
    if (!currentUser) return;
    const newReview: BusinessReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.displayName,
      userAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
    };

    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id === businessId) {
          const updatedReviews = [newReview, ...b.reviews];
          const avg = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
          return {
            ...b,
            reviews: updatedReviews,
            rating: Number(avg.toFixed(1)),
            ratingCount: updatedReviews.length,
          };
        }
        return b;
      })
    );

    awardXp(30, 'ثبت نظر و ارزیابی دسترس‌پذیری ویترین', 'REVIEW_SUBMISSION', businessId);
    setXpTransactions((prev) => [
      {
        id: `xp-${Date.now()}`,
        userId: currentUser.id,
        eventType: 'A11Y_AUDIT_CONTRIBUTED',
        amount: 30,
        source: 'COMMUNITY_ROOM',
        relatedEntityId: businessId,
        reason: `ثبت نظر و ارزیابی دسترس‌پذیری برای ویترین`,
        antiFraudStatus: 'VERIFIED',
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const sendMessageToRoom = (roomId: string, text: string) => {
    if (!currentUser || !text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId,
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatar,
      senderRole: currentUser.role,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    awardXp(5, 'مشارکت فعال در اتاق گفتگو', 'COMMUNITY_CHAT', roomId);
  };

  const sendDirectMessage = (receiverId: string, text: string) => {
    if (!currentUser || !text.trim()) return;
    const newDm: ChatMessage = {
      id: `dm-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatar,
      senderRole: currentUser.role,
      receiverId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setDirectMessages((prev) => [...prev, newDm]);
  };

  const submitReport = (reportData: Omit<ModerationReport, 'id' | 'createdAt' | 'status' | 'reporterId' | 'reporterName'>) => {
    const newReport: ModerationReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      reporterId: currentUser?.id || 'guest',
      reporterName: currentUser?.displayName || 'شهروند گزارشگر',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);
    logAudit('SUBMIT_REPORT', reportData.targetType, reportData.targetId, `گزارش: ${reportData.reason}`);
  };

  const reviewReport = (reportId: string, status: ReportStatus, note?: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status, adminNote: note } : r))
    );
    logAudit('REVIEW_REPORT', 'REPORT', reportId, `بررسی گزارش با وضعیت ${status}`);
  };

  const likeBusiness = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === businessId ? { ...b, likesCount: b.likesCount + 1 } : b))
    );
  };

  return (
    <TavanaCityContext.Provider
      value={{
        categories,
        businesses,
        rooms,
        messages,
        directMessages,
        xpTransactions,
        referrals,
        reports,
        auditLogs,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedA11yFeature,
        setSelectedA11yFeature,
        selectedCity,
        setSelectedCity,
        addBusiness,
        updateBusinessVerification,
        updateBusinessStatus,
        addReviewToBusiness,
        sendMessageToRoom,
        sendDirectMessage,
        submitReport,
        reviewReport,
        likeBusiness,
      }}
    >
      {children}
    </TavanaCityContext.Provider>
  );
};

export const useTavanaCity = () => {
  const context = useContext(TavanaCityContext);
  if (!context) {
    throw new Error('useTavanaCity must be used within a TavanaCityProvider');
  }
  return context;
};
