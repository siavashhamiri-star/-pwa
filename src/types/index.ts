export type UserRole = 'CITIZEN' | 'BUSINESS_OWNER' | 'MENTOR' | 'MODERATOR' | 'ADMIN';

export type CreatorLeagueTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'CHAMPION';

export type LeagueTrack = 'CONNECTORS' | 'VALUE_CREATORS';

export type VerificationLevel = 0 | 1 | 2 | 3;
// LEVEL 0 — Unverified
// LEVEL 1 — Phone Verified
// LEVEL 2 — Profile Verified
// LEVEL 3 — Business/Professional Verification

export type AccessibilityNeed =
  | 'BLIND_LOW_VISION'
  | 'DEAF_HARD_OF_HEARING'
  | 'MOBILITY_WHEELCHAIR'
  | 'NEURODIVERGENT'
  | 'SENIOR_ELDERLY'
  | 'GENERAL_ALLY';

export type BusinessAccessibilityFeature =
  | 'WHEELCHAIR_RAMP'
  | 'ELEVATOR'
  | 'BRAILLE_MENU'
  | 'AUDIO_GUIDE'
  | 'SIGN_LANGUAGE_SUPPORT'
  | 'TEXT_BASED_ORDERING'
  | 'QUIET_ENVIRONMENT'
  | 'ACCESSIBLE_RESTROOM'
  | 'GUIDE_DOG_FRIENDLY'
  | 'HOME_DELIVERY';

export type VerificationStatus = 'UNVERIFIED' | 'SELF_DECLARED' | 'VERIFIED' | 'REJECTED';

export type BusinessStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';

export type XpEventType =
  | 'WELCOME_BONUS'
  | 'REFERRAL_COMPLETED'
  | 'BUSINESS_REGISTERED'
  | 'A11Y_AUDIT_CONTRIBUTED'
  | 'COMMUNITY_HELP'
  | 'GIFT_RECEIVED'
  | 'GIFT_SENT'
  | 'PROFILE_COMPLETED'
  | 'BADGE_EARNED'
  | 'ADMIN_AWARD';

export type XpEventSource =
  | 'SYSTEM'
  | 'REFERRAL_ENGINE'
  | 'BUSINESS_MODULE'
  | 'COMMUNITY_ROOM'
  | 'USER_GIFT'
  | 'ADMIN_PANEL';

export type AntiFraudStatus = 'VERIFIED' | 'FLAGGED' | 'CLEARED' | 'PENDING_AUDIT';

export interface XpEvent {
  id: string;
  userId: string;
  eventType: XpEventType;
  amount: number;
  timestamp: string;
  source: XpEventSource;
  relatedEntityId?: string;
  reason: string;
  antiFraudStatus: AntiFraudStatus;
}

export type XpTransaction = XpEvent;

export interface UserLeague {
  creatorLeague: CreatorLeagueTier;
  leagueTrack: LeagueTrack;
  weeklyRank: number;
  xpThisWeek: number;
  governanceEligible: boolean;
}

export interface UserConsentRecord {
  termsVersion: string; // e.g. "v2.4-2026"
  privacyVersion: string;
  acceptedAt: string;
  ipHash?: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  phoneNumber?: string;
  city: string;
  accessibilityNeed?: AccessibilityNeed;
  verificationLevel: VerificationLevel;
  xp: number;
  giftPoints: number;
  league: UserLeague;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  consentRecord: UserConsentRecord;
  blockedUserIds: string[];
  mutedUserIds: string[];
  createdAt: string;
}

export interface BusinessProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  accessibleFeatures?: string[];
}

export interface BusinessReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1 to 5
  accessibilityRating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface BusinessProfile {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  name: string;
  slogan: string;
  description: string;
  categoryId: string;
  city: string;
  address: string;
  phoneNumber: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  coverImage: string;
  galleryImages: string[];
  verificationStatus: VerificationStatus;
  verificationLevel: VerificationLevel;
  status: BusinessStatus;
  accessibilityFeatures: BusinessAccessibilityFeature[];
  specialDiscountsForDisabled: boolean;
  discountPercentage?: number;
  audioIntroUrl?: string;
  audioIntroText?: string;
  products: BusinessProduct[];
  reviews: BusinessReview[];
  rating: number;
  ratingCount: number;
  viewsCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  roomId?: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: UserRole;
  receiverId?: string;
  text: string;
  hasAudioTranscription?: boolean;
  audioDuration?: number;
  reactions?: Record<string, number>;
  createdAt: string;
}

export type RoomCategory =
  | 'HEALTH_DOCTORS'
  | 'LEGAL_JUSTICE'
  | 'TECH_ENGINEERING'
  | 'ART_HANDICRAFTS'
  | 'EDUCATION_MENTORING'
  | 'COMMERCE_BUSINESS'
  | 'VALUE_CREATORS'
  | 'CONNECTORS';

export interface CommunityRoom {
  id: string;
  title: string;
  description: string;
  category: string;
  roomType: RoomCategory;
  icon: string;
  activeUsersCount: number;
  messagesCount: number;
  isAccessibleFocus: boolean;
  isModerated: boolean;
  rules: string[];
}

export interface ReferralRecord {
  id: string;
  referrerId: string;
  referredUserId: string;
  referredUserName: string;
  status: 'COMPLETED' | 'PENDING' | 'FLAGGED';
  rewardXp: number;
  antiFraudStatus: AntiFraudStatus;
  createdAt: string;
}

export type ReportStatus = 'PENDING' | 'RESOLVED' | 'REJECTED';

export interface ModerationReport {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'BUSINESS' | 'USER' | 'MESSAGE' | 'REVIEW';
  targetId: string;
  targetTitle: string;
  reason: string;
  description: string;
  status: ReportStatus;
  adminNote?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  targetType: string;
  targetId: string;
  performedBy: string;
  performedByName: string;
  details: string;
  createdAt: string;
}

export interface PlatformReward {
  id: string;
  title: string;
  description: string;
  badgeName: string;
  tier: CreatorLeagueTier;
  icon: string;
  claimedByCount: number;
  period: 'WEEKLY' | 'MONTHLY' | 'SEASONAL';
}

export interface OfflineSyncItem {
  id: string;
  action: 'CREATE_BUSINESS' | 'POST_MESSAGE' | 'SUBMIT_REVIEW' | 'SEND_GIFT';
  payload: any;
  timestamp: string;
  synced: boolean;
}

export type ContrastMode = 'NORMAL' | 'HIGH_CONTRAST_LIGHT' | 'DARK' | 'YELLOW_ON_BLACK';

export type ColorBlindMode = 'NONE' | 'DEUTERANOPIA' | 'PROTANOPIA' | 'TRITANOPIA' | 'MONOCHROME';

export type AccessibilityPreset =
  | 'CUSTOM'
  | 'BLIND'
  | 'LOW_VISION'
  | 'DEAF'
  | 'HARD_OF_HEARING'
  | 'MOTOR_LIMITED'
  | 'COGNITIVE_DYSLEXIA'
  | 'SENIOR';

export interface AccessibilitySettings {
  // Visual
  fontScale: number; // 0.85 to 1.6
  lineHeight: number;
  letterSpacing: number;
  contrastMode: ContrastMode;
  colorBlindMode: ColorBlindMode;
  screenReaderVoiceEnabled: boolean;
  talkBackSimulatorEnabled: boolean;
  readingGuideEnabled: boolean;
  screenMagnifier: boolean;

  // Auditory
  soundEffectsEnabled: boolean;
  visualCaptionsEnabled: boolean;
  visualAlertFlashes: boolean;
  signLanguageAssistance: boolean;

  // Motor / Mobility
  largeTouchTargets: boolean;
  handTremorFilter: boolean;
  oneHandedMode: 'NONE' | 'LEFT' | 'RIGHT';
  keyboardNavigationAssistance: boolean;
  switchAccessEnabled: boolean;

  // Cognitive / Focus
  dyslexiaFontEnabled: boolean;
  reducedMotion: boolean;
  simplifiedTextMode: boolean;
  distractionFreeMode: boolean;

  // Passport Preset
  activePreset: AccessibilityPreset;
}

