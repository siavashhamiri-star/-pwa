/**
 * ============================================================================
 * TAVANA FOUR-PILLAR ARCHITECTURE SPECIFICATION & DATA CONTRACTS
 * Version: 1.0 (Architecture-First / Single Source of Truth)
 * 
 * Pipeline Chain:
 * 1. Event Architecture -> 2. Trust & Transparency Layer -> 3. Accessibility Passport -> 4. Universal Action Layer
 * ============================================================================
 */

// ============================================================================
// PILLAR 1: TAVANA EVENT ARCHITECTURE (Central & Auditable)
// ============================================================================

export type TavanaEventType =
  | 'USER_REGISTERED'
  | 'PROFILE_UPDATED'
  | 'PROFILE_VERIFIED'
  | 'BUSINESS_CREATED'
  | 'BUSINESS_UPDATED'
  | 'BUSINESS_VERIFIED'
  | 'REFERRAL_CREATED'
  | 'REFERRAL_COMPLETED'
  | 'XP_GRANTED'
  | 'XP_TRANSFERRED'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'REWARD_GRANTED'
  | 'ROOM_JOINED'
  | 'ROOM_LEFT'
  | 'REPORT_CREATED'
  | 'REPORT_RESOLVED'
  | 'TRUST_STATUS_CHANGED'
  | 'ACCESSIBILITY_PROFILE_UPDATED';

export type EventAuditStatus = 'VERIFIED' | 'FLAGGED' | 'CLEARED' | 'PENDING_AUDIT';

export type EventClientSource = 'PWA_WEB' | 'ANDROID_NATIVE' | 'KIOSK_EPK' | 'BACKEND_SERVICE';

export interface EventSecurityContext {
  authLevel: number; // 0: Anonymous, 1: Phone, 2: Profile, 3: Verified Citizen/Biz
  clientType: EventClientSource;
  ipHash?: string;
  userAgent?: string;
  nonce?: string;
  signature?: string;
}

export interface EventRelatedEntity {
  type: 'USER' | 'BUSINESS' | 'ROOM' | 'REPORT' | 'REWARD' | 'XP_LEDGER' | 'PASSPORT';
  id: string;
  name?: string;
}

export interface TavanaEvent {
  eventId: string;
  eventType: TavanaEventType;
  actorId: string;
  timestamp: string;
  source: string;
  relatedEntity: EventRelatedEntity;
  metadata: Record<string, unknown>;
  securityContext: EventSecurityContext;
  auditStatus: EventAuditStatus;
}

// ============================================================================
// PILLAR 2: TAVANA TRUST & TRANSPARENCY LAYER (Evidence-Based & Explainable)
// ============================================================================

export type EvidenceVerificationStatus = 'VERIFIED' | 'SELF_DECLARED' | 'PENDING' | 'REJECTED';

export interface TrustEvidenceItem {
  id: string;
  claim: string;
  category: 'IDENTITY' | 'ACCESSIBILITY' | 'COMMERCE' | 'COMMUNITY';
  status: EvidenceVerificationStatus;
  verifiedAt?: string;
  verifiedBy?: string; // e.g. "TAVANA Certified Inspector #402" or "Automated SMS Gateway"
  proofDescription: string; // Plain-language, explainable reason (no black-box opaque numbers)
}

export interface IdentityTrustDimension {
  phoneVerified: boolean;
  profileCompleted: boolean;
  idDocumentReviewed: boolean;
  level: 0 | 1 | 2 | 3;
}

export interface AccessibilityTrustDimension {
  selfDeclaredFeaturesCount: number;
  physicallyAuditedFeaturesCount: number;
  hasBrailleSupportAudited: boolean;
  hasWheelchairRampAudited: boolean;
  hasSensoryGuidanceAudited: boolean;
}

export interface CommunityTrustDimension {
  activeDisputesCount: number;
  confirmedViolationsCount: number;
  positiveReviewsCount: number;
  peerEndorsementsCount: number;
}

export type AccountSafetyStatus = 'SAFE' | 'UNDER_REVIEW' | 'RESTRICTED' | 'SUSPENDED';

export interface TrustProfile {
  targetId: string;
  targetType: 'USER' | 'BUSINESS';
  safetyStatus: AccountSafetyStatus;
  identity: IdentityTrustDimension;
  accessibility: AccessibilityTrustDimension;
  community: CommunityTrustDimension;
  evidences: TrustEvidenceItem[];
  lastAuditedAt: string;
  explanationSummary: string; // Human-readable explanation of current trust standing
}

// ============================================================================
// PILLAR 3: TAVANA ACCESSIBILITY PASSPORT (Universal & Portable)
// ============================================================================

export interface VisualAccessibilityPreferences {
  fontScale: number; // 0.85 to 1.6
  lineHeight: number; // 1.4 to 2.2
  letterSpacing: number; // 0 to 4 px
  contrastMode: 'NORMAL' | 'HIGH_CONTRAST_LIGHT' | 'DARK' | 'YELLOW_ON_BLACK';
  darkMode: boolean;
  reducedMotion: boolean;
  dyslexiaFriendlyText: boolean;
  readingGuideEnabled: boolean;
  largeTouchTargets: boolean; // Enforce minimum 48px touch targets
}

export interface AuditoryAccessibilityPreferences {
  screenReaderEnabled: boolean;
  textToSpeech: boolean;
  speechToText: boolean;
  captions: boolean;
  soundEffectsEnabled: boolean;
  earconAudioCues: boolean;
  speechRate: number; // 0.8 to 1.5
  speechPitch: number;
}

export interface CognitiveAccessibilityPreferences {
  simplifiedText: boolean;
  cognitiveSimplification: boolean;
  easyToReadMode: boolean;
  focusAssistance: boolean;
  distractionFreeMode: boolean;
}

export interface MotorAccessibilityPreferences {
  voiceNavigation: boolean;
  keyboardNavigation: boolean;
  switchAccessCompatible: boolean;
  minimumTouchTargetPx: number;
}

export interface CommunicationAccessibilityPreferences {
  signLanguagePreference: boolean;
  brailleFormatPreference: boolean;
  preferredLanguage: string; // 'fa-IR'
}

export interface AccessibilityPassport {
  passportId: string;
  userId: string;
  version: string; // e.g. "1.0-universal"
  visual: VisualAccessibilityPreferences;
  auditory: AuditoryAccessibilityPreferences;
  cognitive: CognitiveAccessibilityPreferences;
  motor: MotorAccessibilityPreferences;
  communication: CommunicationAccessibilityPreferences;
  lastSyncedAt: string;
  isAiAssistedFallbackAvailable: boolean; // Works 100% locally even if AI/Cloud is offline
}

// ============================================================================
// PILLAR 4: UNIVERSAL ACTION LAYER (Input-Agnostic Execution Engine)
// ============================================================================

export type ActionInputType =
  | 'TOUCH'
  | 'KEYBOARD'
  | 'VOICE'
  | 'SCREEN_READER'
  | 'SWITCH_ACCESS'
  | 'TEXT_COMMAND';

export type UniversalActionType =
  | 'OPEN_BUSINESS'
  | 'SEARCH_BUSINESSES'
  | 'FILTER_BY_ACCESSIBILITY'
  | 'OPEN_ROOM'
  | 'JOIN_ROOM'
  | 'READ_PAGE'
  | 'CREATE_BUSINESS'
  | 'REPORT_CONTENT'
  | 'BLOCK_USER'
  | 'OPEN_PROFILE'
  | 'CHANGE_ACCESSIBILITY_SETTING'
  | 'SEND_GIFT_XP'
  | 'TRANSFER_ACCESSIBILITY_PASSPORT';

export interface UniversalActionIntent {
  intentId: string;
  actionType: UniversalActionType;
  inputSource: ActionInputType;
  rawInputText?: string;
  payload: Record<string, unknown>;
  requiresConfirmation: boolean; // Sensitive actions require explicit user affirmation
  confirmationPrompt?: string;
}

export interface UniversalActionResult {
  intentId: string;
  success: boolean;
  actionType: UniversalActionType;
  message: string;
  spokenFeedback?: string; // Voice-friendly announcement for blind users
  emittedEventId?: string; // Emitted TavanaEvent ID for audit log
  data?: Record<string, unknown>;
}

export interface UniversalActionHandler {
  canHandle: (action: UniversalActionIntent) => boolean;
  execute: (
    action: UniversalActionIntent,
    securityContext: EventSecurityContext
  ) => Promise<UniversalActionResult>;
}
