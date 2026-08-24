import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  AccessibilityNeed,
  VerificationLevel,
  XpEvent,
  XpEventType,
  XpEventSource,
  AntiFraudStatus,
  UserConsentRecord,
} from '../types';

export const CURRENT_TERMS_VERSION = 'v2.4-2026';
export const CURRENT_PRIVACY_VERSION = 'v2.4-2026';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin',
    displayName: 'سیاوش حمیری (مدیر ارشد سامانه)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'ADMIN',
    city: 'تهران',
    bio: 'توسعه‌دهنده دسترسی‌پذیری و معمار سامانه یکپارچه شهر توانا',
    phoneNumber: '09120000001',
    accessibilityNeed: 'GENERAL_ALLY',
    verificationLevel: 3,
    xp: 3450,
    giftPoints: 500,
    league: {
      creatorLeague: 'CHAMPION',
      leagueTrack: 'VALUE_CREATORS',
      weeklyRank: 1,
      xpThisWeek: 850,
      governanceEligible: true,
    },
    referralCode: 'TAVANA-ADMIN',
    referralCount: 24,
    consentRecord: {
      termsVersion: CURRENT_TERMS_VERSION,
      privacyVersion: CURRENT_PRIVACY_VERSION,
      acceptedAt: '2025-01-10T10:00:00.000Z',
    },
    blockedUserIds: [],
    mutedUserIds: [],
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  {
    id: 'user-blind-artisan',
    displayName: 'مریم سلیمانی (سفالگر و صنایع دستی)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    role: 'BUSINESS_OWNER',
    city: 'اصفهان',
    bio: 'هنرمند روشندل و تولیدکننده سفالینه‌های لمسی و ظروف نقش‌برجسته خط بریل',
    phoneNumber: '09131112233',
    accessibilityNeed: 'BLIND_LOW_VISION',
    verificationLevel: 3,
    xp: 1850,
    giftPoints: 120,
    league: {
      creatorLeague: 'DIAMOND',
      leagueTrack: 'VALUE_CREATORS',
      weeklyRank: 3,
      xpThisWeek: 420,
      governanceEligible: true,
    },
    referralCode: 'MARYAM-A11Y',
    referralCount: 11,
    consentRecord: {
      termsVersion: CURRENT_TERMS_VERSION,
      privacyVersion: CURRENT_PRIVACY_VERSION,
      acceptedAt: '2025-02-15T09:30:00.000Z',
    },
    blockedUserIds: [],
    mutedUserIds: [],
    createdAt: '2025-02-15T09:30:00.000Z',
  },
  {
    id: 'user-deaf-coder',
    displayName: 'احسان کاظمی (توسعه‌دهنده نرم‌افزار و UI)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'BUSINESS_OWNER',
    city: 'مشهد',
    bio: 'برنامه‌نویس ناشنوا، متخصص طراحی رابط‌های کاربری وب و اپلیکیشن با رعایت استانداردهای WCAG',
    phoneNumber: '09152223344',
    accessibilityNeed: 'DEAF_HARD_OF_HEARING',
    verificationLevel: 3,
    xp: 1420,
    giftPoints: 80,
    league: {
      creatorLeague: 'GOLD',
      leagueTrack: 'VALUE_CREATORS',
      weeklyRank: 7,
      xpThisWeek: 310,
      governanceEligible: false,
    },
    referralCode: 'EHSAN-DEV',
    referralCount: 8,
    consentRecord: {
      termsVersion: CURRENT_TERMS_VERSION,
      privacyVersion: CURRENT_PRIVACY_VERSION,
      acceptedAt: '2025-03-01T14:00:00.000Z',
    },
    blockedUserIds: [],
    mutedUserIds: [],
    createdAt: '2025-03-01T14:00:00.000Z',
  },
  {
    id: 'user-wheelchair-baker',
    displayName: 'سارا نامدار (قنادی خانگی شیرینی‌آرا)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    role: 'BUSINESS_OWNER',
    city: 'شیراز',
    bio: 'تولیدکننده انواع شیرینی‌های سنتی و کیک‌های ارگانیک با بسته‌بندی مناسب و ارسال سریع',
    phoneNumber: '09173334455',
    accessibilityNeed: 'MOBILITY_WHEELCHAIR',
    verificationLevel: 2,
    xp: 980,
    giftPoints: 50,
    league: {
      creatorLeague: 'SILVER',
      leagueTrack: 'VALUE_CREATORS',
      weeklyRank: 12,
      xpThisWeek: 190,
      governanceEligible: false,
    },
    referralCode: 'SARA-SWEET',
    referralCount: 5,
    consentRecord: {
      termsVersion: CURRENT_TERMS_VERSION,
      privacyVersion: CURRENT_PRIVACY_VERSION,
      acceptedAt: '2025-04-10T11:20:00.000Z',
    },
    blockedUserIds: [],
    mutedUserIds: [],
    createdAt: '2025-04-10T11:20:00.000Z',
  },
  {
    id: 'user-mentor',
    displayName: 'دکتر علیرضا فروغی (مشاور کارآفرینی توانمندان)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'MENTOR',
    city: 'تهران',
    bio: 'مشاور بازاریابی دیجیتال و منتور رسمی توان‌یابان در اتاق‌های کسب‌وکار توانا',
    phoneNumber: '09123456789',
    accessibilityNeed: 'GENERAL_ALLY',
    verificationLevel: 3,
    xp: 2200,
    giftPoints: 300,
    league: {
      creatorLeague: 'DIAMOND',
      leagueTrack: 'CONNECTORS',
      weeklyRank: 2,
      xpThisWeek: 560,
      governanceEligible: true,
    },
    referralCode: 'FOROUGHI-MENTOR',
    referralCount: 19,
    consentRecord: {
      termsVersion: CURRENT_TERMS_VERSION,
      privacyVersion: CURRENT_PRIVACY_VERSION,
      acceptedAt: '2025-01-20T08:00:00.000Z',
    },
    blockedUserIds: [],
    mutedUserIds: [],
    createdAt: '2025-01-20T08:00:00.000Z',
  },
];

export const INITIAL_XP_EVENTS: XpEvent[] = [
  {
    id: 'xp-ev-1',
    userId: 'user-admin',
    eventType: 'ADMIN_AWARD',
    amount: 1000,
    timestamp: '2025-01-10T10:05:00.000Z',
    source: 'ADMIN_PANEL',
    reason: 'پاداش معماری و راه‌اندازی هسته مرکزی سامانه',
    antiFraudStatus: 'VERIFIED',
  },
  {
    id: 'xp-ev-2',
    userId: 'user-blind-artisan',
    eventType: 'BUSINESS_REGISTERED',
    amount: 150,
    timestamp: '2025-02-16T10:00:00.000Z',
    source: 'BUSINESS_MODULE',
    relatedEntityId: 'biz-1',
    reason: 'ثبت و ممیزی ویترین کارگاه سفال آوای نقش',
    antiFraudStatus: 'VERIFIED',
  },
  {
    id: 'xp-ev-3',
    userId: 'user-blind-artisan',
    eventType: 'REFERRAL_COMPLETED',
    amount: 100,
    timestamp: '2025-03-01T14:00:00.000Z',
    source: 'REFERRAL_ENGINE',
    relatedEntityId: 'user-deaf-coder',
    reason: 'دعوت و ثبت‌نام موفق احسان کاظمی',
    antiFraudStatus: 'VERIFIED',
  },
];

interface AuthContextType {
  currentUser: UserProfile | null;
  usersList: UserProfile[];
  xpEvents: XpEvent[];
  loginAs: (userId: string) => void;
  registerUser: (data: {
    displayName: string;
    role: UserRole;
    city: string;
    phoneNumber?: string;
    accessibilityNeed?: AccessibilityNeed;
    referredBy?: string;
  }) => UserProfile;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  awardXp: (
    amount: number,
    eventType: XpEventType,
    source: XpEventSource,
    reason: string,
    relatedEntityId?: string
  ) => void;
  sendGiftPoints: (targetUserId: string, amount: number) => { success: boolean; message: string };
  upgradeVerificationLevel: (userId: string, targetLevel: VerificationLevel) => void;
  acceptTermsConsent: () => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  muteUser: (userId: string) => void;
  unmuteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usersList, setUsersList] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_users');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_USERS;
  });

  const [xpEvents, setXpEvents] = useState<XpEvent[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_xp_events');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_XP_EVENTS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('tavana_current_user_id');
      if (saved) return saved;
    } catch {
      // fallback
    }
    return INITIAL_USERS[0].id;
  });

  const currentUser = usersList.find((u) => u.id === currentUserId) || usersList[0] || null;

  useEffect(() => {
    localStorage.setItem('tavana_users', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('tavana_xp_events', JSON.stringify(xpEvents));
  }, [xpEvents]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem('tavana_current_user_id', currentUserId);
    }
  }, [currentUserId]);

  const loginAs = (userId: string) => {
    setCurrentUserId(userId);
  };

  const registerUser = (data: {
    displayName: string;
    role: UserRole;
    city: string;
    phoneNumber?: string;
    accessibilityNeed?: AccessibilityNeed;
    referredBy?: string;
  }): UserProfile => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      displayName: data.displayName,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      role: data.role,
      city: data.city,
      phoneNumber: data.phoneNumber || '',
      accessibilityNeed: data.accessibilityNeed || 'GENERAL_ALLY',
      verificationLevel: data.phoneNumber ? 1 : 0,
      xp: 100, // Welcome bonus
      giftPoints: 20,
      league: {
        creatorLeague: 'BRONZE',
        leagueTrack: data.role === 'BUSINESS_OWNER' ? 'VALUE_CREATORS' : 'CONNECTORS',
        weeklyRank: usersList.length + 1,
        xpThisWeek: 100,
        governanceEligible: false,
      },
      referralCode: `TAVANA-${Math.floor(1000 + Math.random() * 9000)}`,
      referredBy: data.referredBy,
      referralCount: 0,
      consentRecord: {
        termsVersion: CURRENT_TERMS_VERSION,
        privacyVersion: CURRENT_PRIVACY_VERSION,
        acceptedAt: new Date().toISOString(),
      },
      blockedUserIds: [],
      mutedUserIds: [],
      createdAt: new Date().toISOString(),
    };

    // Register initial welcome XP Event
    const welcomeEvent: XpEvent = {
      id: `xp-ev-${Date.now()}`,
      userId: newUser.id,
      eventType: 'WELCOME_BONUS',
      amount: 100,
      timestamp: new Date().toISOString(),
      source: 'SYSTEM',
      reason: 'پاداش عضویت و ثبت‌نام اولیه در شهر توانا',
      antiFraudStatus: 'VERIFIED',
    };

    setXpEvents((prev) => [welcomeEvent, ...prev]);
    setUsersList((prev) => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    return newUser;
  };

  const logout = () => {
    setCurrentUserId('');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    setUsersList((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...data } : u))
    );
  };

  const acceptTermsConsent = () => {
    if (!currentUser) return;
    const updatedRecord: UserConsentRecord = {
      termsVersion: CURRENT_TERMS_VERSION,
      privacyVersion: CURRENT_PRIVACY_VERSION,
      acceptedAt: new Date().toISOString(),
    };
    updateProfile({ consentRecord: updatedRecord });
  };

  const awardXp = (
    amount: number,
    eventType: XpEventType,
    source: XpEventSource,
    reason: string,
    relatedEntityId?: string
  ) => {
    if (!currentUser) return;

    const newEvent: XpEvent = {
      id: `xp-ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: currentUser.id,
      eventType,
      amount,
      timestamp: new Date().toISOString(),
      source,
      relatedEntityId,
      reason,
      antiFraudStatus: 'VERIFIED',
    };

    setXpEvents((prev) => [newEvent, ...prev]);

    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          const newXp = Math.max(0, u.xp + amount);
          let newTier = u.league.creatorLeague;
          let govEligible = u.league.governanceEligible;

          if (newXp >= 7000) {
            newTier = 'CHAMPION';
            govEligible = true;
          } else if (newXp >= 3500) {
            newTier = 'DIAMOND';
            govEligible = true;
          } else if (newXp >= 1500) {
            newTier = 'GOLD';
          } else if (newXp >= 500) {
            newTier = 'SILVER';
          }

          return {
            ...u,
            xp: newXp,
            league: {
              ...u.league,
              creatorLeague: newTier,
              xpThisWeek: u.league.xpThisWeek + (amount > 0 ? amount : 0),
              governanceEligible: govEligible,
            },
          };
        }
        return u;
      })
    );
  };

  const sendGiftPoints = (
    targetUserId: string,
    amount: number
  ): { success: boolean; message: string } => {
    if (!currentUser) {
      return { success: false, message: 'کاربر وارد نشده است.' };
    }

    if (currentUser.id === targetUserId) {
      return { success: false, message: 'انتقال امتیاز به خود امکان‌پذیر نیست.' };
    }

    if (amount <= 0) {
      return { success: false, message: 'مقدار امتیاز نامعتبر است.' };
    }

    // Configurable Anti-Fraud Limit: Max 20% of current user's total XP or available giftPoints
    const maxTransferable = Math.max(currentUser.giftPoints || 0, Math.floor(currentUser.xp * 0.2));
    if (amount > maxTransferable) {
      return {
        success: false,
        message: `سقف انتقال در هر نوبت حداکثر ۲۰٪ موجودی (${maxTransferable} امتیاز) می‌باشد.`,
      };
    }

    if ((currentUser.giftPoints || 0) < amount && currentUser.xp < amount) {
      return { success: false, message: 'موجودی امتیاز هدیه شما کافی نیست.' };
    }

    const targetUser = usersList.find((u) => u.id === targetUserId);
    if (!targetUser) {
      return { success: false, message: 'کاربر مقصد یافت نشد.' };
    }

    // Record auditable XP events
    const giftSentEvent: XpEvent = {
      id: `xp-ev-${Date.now()}-out`,
      userId: currentUser.id,
      eventType: 'GIFT_SENT',
      amount: -amount,
      timestamp: new Date().toISOString(),
      source: 'USER_GIFT',
      relatedEntityId: targetUserId,
      reason: `اهدای ${amount} امتیاز به ${targetUser.displayName}`,
      antiFraudStatus: 'VERIFIED',
    };

    const giftReceivedEvent: XpEvent = {
      id: `xp-ev-${Date.now()}-in`,
      userId: targetUserId,
      eventType: 'GIFT_RECEIVED',
      amount: amount,
      timestamp: new Date().toISOString(),
      source: 'USER_GIFT',
      relatedEntityId: currentUser.id,
      reason: `دریافت ${amount} امتیاز هدیه از ${currentUser.displayName}`,
      antiFraudStatus: 'VERIFIED',
    };

    setXpEvents((prev) => [giftReceivedEvent, giftSentEvent, ...prev]);

    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            giftPoints: Math.max(0, (u.giftPoints || 0) - amount),
          };
        }
        if (u.id === targetUserId) {
          return {
            ...u,
            giftPoints: (u.giftPoints || 0) + amount,
            xp: u.xp + amount,
          };
        }
        return u;
      })
    );

    return { success: true, message: `${amount} امتیاز هدیه با موفقیت انتقال یافت.` };
  };

  const upgradeVerificationLevel = (userId: string, targetLevel: VerificationLevel) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, verificationLevel: targetLevel } : u))
    );
  };

  const blockUser = (userId: string) => {
    if (!currentUser) return;
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          const currentBlocked = u.blockedUserIds || [];
          if (!currentBlocked.includes(userId)) {
            return { ...u, blockedUserIds: [...currentBlocked, userId] };
          }
        }
        return u;
      })
    );
  };

  const unblockUser = (userId: string) => {
    if (!currentUser) return;
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            blockedUserIds: (u.blockedUserIds || []).filter((id) => id !== userId),
          };
        }
        return u;
      })
    );
  };

  const muteUser = (userId: string) => {
    if (!currentUser) return;
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          const currentMuted = u.mutedUserIds || [];
          if (!currentMuted.includes(userId)) {
            return { ...u, mutedUserIds: [...currentMuted, userId] };
          }
        }
        return u;
      })
    );
  };

  const unmuteUser = (userId: string) => {
    if (!currentUser) return;
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            mutedUserIds: (u.mutedUserIds || []).filter((id) => id !== userId),
          };
        }
        return u;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        usersList,
        xpEvents,
        loginAs,
        registerUser,
        logout,
        updateProfile,
        awardXp,
        sendGiftPoints,
        upgradeVerificationLevel,
        acceptTermsConsent,
        blockUser,
        unblockUser,
        muteUser,
        unmuteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

