export type UserRole = 'customer' | 'cafe_staff' | 'cafe_manager' | 'admin';

export type MembershipStatus = 'active' | 'trial' | 'past_due' | 'expired' | 'canceled';

export type BenefitStatus = 'available' | 'used' | 'expired' | 'temporarily_unavailable';

export type BenefitCategory = 'beverage' | 'discount' | 'upgrade' | 'experience';

export interface BenefitRule {
  id: string;
  name: string;
  category: BenefitCategory;
  description: string;
  terms: string;
  frequency: 'daily' | 'monthly' | 'unlimited';
  usageLimitMonthly?: number;
  remainingUses?: number;
  eligibleCafeIds: string[]; // 'all' or array of cafe IDs
  eligiblePlanIds: string[];
  status: BenefitStatus;
  discountPct?: number;
  maxDiscountUsd?: number;
}

export interface CafeHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  summary: string;
}

export interface Cafe {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  neighborhood: string;
  address: string;
  city: string;
  mapUrl: string;
  heroImage: string;
  galleryImages: string[];
  roasterStory: string;
  openingHours: CafeHours;
  signatureBeans: string[];
  specialtyDrinks: string[];
  menuUrl?: string;
  amenities: string[];
  isVerifiedPartner: boolean;
  partnerSince: string;
  verificationBadge: string; // e.g. "Verified Specialty Partner"
  creditReimbursementRate: number; // e.g., $3.50
  activeBenefitIds: string[];
  seatingCapacity: number;
  phone: string;
  contactEmail: string;
}

export interface MembershipPlan {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  billingFrequency: 'monthly' | 'annual';
  drinkCreditsMonthly: number; // 0 for perk-only
  beanDiscountPct: number;
  benefitRules: string[];
  usageLimits: string;
  exclusions: string;
  renewalTerms: string;
  cancellationPolicy: string;
  eligibleCafeCount: number;
  status: 'active' | 'unavailable' | 'draft';
  isPopular?: boolean;
}

export interface UserSubscription {
  planId: string;
  planName: string;
  status: MembershipStatus;
  cycleStartDate: string;
  cycleEndDate: string;
  creditsTotal: number;
  creditsRemaining: number;
  autoRenew: boolean;
  savedTotalUsd: number;
  lastPaymentStatus: 'succeeded' | 'pending' | 'failed';
  billingInterval: 'monthly' | 'annual';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  memberSince: string;
  avatarUrl?: string;
  activeCafeId?: string; // If role is 'cafe_staff' or 'cafe_manager'
  subscription: UserSubscription;
  savedCafeIds: string[];
}

export interface RedemptionRecord {
  id: string;
  timestamp: string;
  cafeId: string;
  cafeName: string;
  benefitId: string;
  benefitName: string;
  memberId: string;
  memberName: string;
  tokenCode: string;
  staffName: string;
  status: 'verified' | 'failed' | 'duplicate_prevented';
  valueSavedUsd: number;
  notes?: string;
}

export interface StaffMember {
  id: string;
  cafeId: string;
  name: string;
  email: string;
  role: 'barista' | 'manager';
  active: boolean;
  addedAt: string;
  shiftPin: string;
}

export interface PartnerApplication {
  id: string;
  cafeName: string;
  contactName: string;
  email: string;
  phone: string;
  neighborhood: string;
  address: string;
  city?: string;
  currentRoaster: string;
  weeklyCoffeeVolume: string;
  seatingCapacity: number;
  hasWifi?: boolean;
  notes?: string;
  submittedAt: string;
  status: 'pending' | 'reviewing' | 'approved' | 'declined';
}

export interface DisputeRecord {
  id: string;
  redemptionId: string;
  cafeName: string;
  memberName: string;
  amount: number;
  reason: string;
  status: 'open' | 'investigating' | 'resolved';
  createdAt: string;
}
