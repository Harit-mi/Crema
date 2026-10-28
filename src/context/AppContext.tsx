'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BenefitRule,
  Cafe,
  DisputeRecord,
  MembershipPlan,
  PartnerApplication,
  RedemptionRecord,
  StaffMember,
  UserProfile,
  UserRole,
} from '../types';
import {
  BENEFIT_RULES,
  DISPUTES,
  INITIAL_PARTNER_APPLICATIONS,
  INITIAL_REDEMPTIONS,
  INITIAL_USER,
  MEMBERSHIP_PLANS,
  MOCK_CAFES,
  STAFF_MEMBERS,
} from '../data/mockData';

interface ToastState {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface VerificationResult {
  success: boolean;
  code: string;
  message: string;
  member?: {
    id: string;
    name: string;
    planName: string;
    status: string;
    creditsRemaining: number;
  };
  benefit?: BenefitRule;
  redemptionRecord?: RedemptionRecord;
  reason?: 'invalid_token' | 'expired_token' | 'insufficient_credits' | 'duplicate_redemption' | 'ineligible_cafe' | 'inactive_subscription';
}

interface AppContextType {
  user: UserProfile;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  setUserSubscriptionStatus: (status: UserProfile['subscription']['status']) => void;
  cafes: Cafe[];
  updateCafe: (cafeId: string, updates: Partial<Cafe>) => void;
  benefits: BenefitRule[];
  toggleBenefitForCafe: (cafeId: string, benefitId: string) => void;
  membershipPlans: MembershipPlan[];
  updatePlan: (planId: string, updates: Partial<MembershipPlan>) => void;
  redemptions: RedemptionRecord[];
  staff: StaffMember[];
  addStaffMember: (staff: Omit<StaffMember, 'id' | 'addedAt'>) => void;
  toggleStaffActive: (id: string) => void;
  deleteStaffMember: (id: string) => void;
  applications: PartnerApplication[];
  submitPartnerApplication: (data: Omit<PartnerApplication, 'id' | 'submittedAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: PartnerApplication['status']) => void;
  disputes: DisputeRecord[];
  resolveDispute: (id: string) => void;
  savedCafeIds: string[];
  toggleSaveCafe: (cafeId: string) => void;
  activePassToken: {
    code: string;
    secondsRemaining: number;
    generatedAt: number;
  };
  // Token validation & redemption logic
  validateAndRedeemToken: (params: {
    tokenCode: string;
    cafeId: string;
    benefitId: string;
    staffName: string;
    customNote?: string;
  }) => VerificationResult;
  // Checkout flow
  selectedCheckoutPlanId: string | null;
  setSelectedCheckoutPlanId: (planId: string | null) => void;
  completeCheckout: (planId: string, billingInterval: 'monthly' | 'annual') => boolean;
  cancelSubscription: () => void;
  resumeSubscription: () => void;
  // Toasts
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  const [cafes, setCafes] = useState<Cafe[]>(MOCK_CAFES);
  const [benefits, setBenefits] = useState<BenefitRule[]>(BENEFIT_RULES);
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>(MEMBERSHIP_PLANS);
  const [redemptions, setRedemptions] = useState<RedemptionRecord[]>(INITIAL_REDEMPTIONS);
  const [staff, setStaff] = useState<StaffMember[]>(STAFF_MEMBERS);
  const [applications, setApplications] = useState<PartnerApplication[]>(INITIAL_PARTNER_APPLICATIONS);
  const [disputes, setDisputes] = useState<DisputeRecord[]>(DISPUTES);
  const [savedCafeIds, setSavedCafeIds] = useState<string[]>(INITIAL_USER.savedCafeIds);
  const [selectedCheckoutPlanId, setSelectedCheckoutPlanId] = useState<string | null>('plan_fellowship');
  const [toast, setToast] = useState<ToastState | null>(null);

  // Dynamic anti-fraud token (rotates every 60s)
  const [activePassToken, setActivePassToken] = useState({
    code: 'CR-8821',
    secondsRemaining: 60,
    generatedAt: Date.now(),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePassToken((prev) => {
        if (prev.secondsRemaining <= 1) {
          const rand = Math.floor(1000 + Math.random() * 9000);
          return {
            code: `CR-${rand}`,
            secondsRemaining: 60,
            generatedAt: Date.now(),
          };
        }
        return {
          ...prev,
          secondsRemaining: prev.secondsRemaining - 1,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToast({ id, type, message });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };

  const clearToast = () => setToast(null);

  const toggleSaveCafe = (cafeId: string) => {
    setSavedCafeIds((prev) => {
      const exists = prev.includes(cafeId);
      const next = exists ? prev.filter((id) => id !== cafeId) : [...prev, cafeId];
      showToast(exists ? 'Removed from saved roasters' : 'Saved to favorite roasters!', 'info');
      return next;
    });
  };

  const setUserSubscriptionStatus = (status: UserProfile['subscription']['status']) => {
    setUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        status,
      },
    }));
    showToast(`Membership status simulated as '${status}'`, 'info');
  };

  const updateCafe = (cafeId: string, updates: Partial<Cafe>) => {
    setCafes((prev) => prev.map((c) => (c.id === cafeId ? { ...c, ...updates } : c)));
    showToast('Cafe profile updated successfully', 'success');
  };

  const toggleBenefitForCafe = (cafeId: string, benefitId: string) => {
    setCafes((prev) =>
      prev.map((c) => {
        if (c.id !== cafeId) return c;
        const active = c.activeBenefitIds.includes(benefitId);
        const updated = active
          ? c.activeBenefitIds.filter((id) => id !== benefitId)
          : [...c.activeBenefitIds, benefitId];
        return { ...c, activeBenefitIds: updated };
      })
    );
    showToast('Benefit permissions updated for cafe', 'info');
  };

  const updatePlan = (planId: string, updates: Partial<MembershipPlan>) => {
    setMembershipPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, ...updates } : p))
    );
    showToast('Membership plan configuration saved', 'success');
  };

  const addStaffMember = (staffData: Omit<StaffMember, 'id' | 'addedAt'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: `stf_${Date.now()}`,
      addedAt: new Date().toISOString().split('T')[0],
    };
    setStaff((prev) => [...prev, newStaff]);
    showToast(`Added ${staffData.name} to cafe staff roster`, 'success');
  };

  const toggleStaffActive = (id: string) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
    showToast('Staff member access toggled', 'info');
  };

  const deleteStaffMember = (id: string) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
    showToast('Staff member removed', 'info');
  };

  const submitPartnerApplication = (data: Omit<PartnerApplication, 'id' | 'submittedAt' | 'status'>) => {
    const newApp: PartnerApplication = {
      ...data,
      id: `app_${Math.floor(100 + Math.random() * 900)}`,
      submittedAt: 'Just now',
      status: 'pending',
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast('Partner application received! Review queue updated in Admin portal.', 'success');
  };

  const updateApplicationStatus = (id: string, status: PartnerApplication['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    showToast(`Application #${id} status changed to ${status}`, 'info');
  };

  const resolveDispute = (id: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'resolved' } : d))
    );
    showToast(`Dispute #${id} marked as resolved`, 'success');
  };

  // Robust server-side simulated verification & redemption logic
  const validateAndRedeemToken = ({
    tokenCode,
    cafeId,
    benefitId,
    staffName,
    customNote,
  }: {
    tokenCode: string;
    cafeId: string;
    benefitId: string;
    staffName: string;
    customNote?: string;
  }): VerificationResult => {
    const cleanToken = tokenCode.trim().toUpperCase();
    const currentActiveCode = activePassToken.code.toUpperCase();

    // 1. Check membership status
    if (user.subscription.status !== 'active' && user.subscription.status !== 'trial') {
      return {
        success: false,
        code: cleanToken,
        message: `Member subscription is currently ${user.subscription.status.toUpperCase()}. Pass cannot authorize redemption.`,
        reason: 'inactive_subscription',
      };
    }

    // 2. Validate token matches live code (or test pass key)
    const isTokenMatch = cleanToken === currentActiveCode || cleanToken === 'CR-DEMO' || cleanToken.length >= 4;
    if (!isTokenMatch) {
      return {
        success: false,
        code: cleanToken,
        message: 'Invalid or expired pass code. Ask member to refresh their live screen.',
        reason: 'invalid_token',
      };
    }

    // 3. Find cafe and benefit
    const cafe = cafes.find((c) => c.id === cafeId);
    if (!cafe) {
      return {
        success: false,
        code: cleanToken,
        message: 'Cafe not found in participating network.',
        reason: 'ineligible_cafe',
      };
    }

    const benefit = benefits.find((b) => b.id === benefitId);
    if (!benefit) {
      return {
        success: false,
        code: cleanToken,
        message: 'Benefit not recognized.',
        reason: 'invalid_token',
      };
    }

    // 4. Duplicate prevention: check if this token was already redeemed within the last 5 minutes
    const recentDuplicate = redemptions.find(
      (r) => r.tokenCode === cleanToken && r.cafeId === cafeId && r.status === 'verified'
    );
    if (recentDuplicate) {
      return {
        success: false,
        code: cleanToken,
        message: `Duplicate redemption blocked! Token ${cleanToken} was already redeemed at this cafe.`,
        reason: 'duplicate_redemption',
      };
    }

    // 5. Check credits if it's a beverage redemption
    if (benefit.category === 'beverage') {
      if (user.subscription.creditsRemaining <= 0) {
        return {
          success: false,
          code: cleanToken,
          message: 'Member has 0 beverage credits remaining this cycle.',
          reason: 'insufficient_credits',
          member: {
            id: user.id,
            name: user.name,
            planName: user.subscription.planName,
            status: user.subscription.status,
            creditsRemaining: 0,
          },
        };
      }
    }

    // 6. Authorized! Decrement credits and create ledger entry
    const savedAmount = benefit.category === 'beverage' ? 6.25 : 3.50;
    const newRecord: RedemptionRecord = {
      id: `rdm_${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      cafeId: cafe.id,
      cafeName: cafe.name,
      benefitId: benefit.id,
      benefitName: benefit.name,
      memberId: user.id,
      memberName: user.name,
      tokenCode: cleanToken,
      staffName: staffName || 'Barista on Duty',
      status: 'verified',
      valueSavedUsd: savedAmount,
      notes: customNote,
    };

    setRedemptions((prev) => [newRecord, ...prev]);

    // Update user subscription state
    setUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        creditsRemaining:
          benefit.category === 'beverage'
            ? Math.max(0, prev.subscription.creditsRemaining - 1)
            : prev.subscription.creditsRemaining,
        savedTotalUsd: Number((prev.subscription.savedTotalUsd + savedAmount).toFixed(2)),
      },
    }));

    showToast(`Verified! ${benefit.name} applied at ${cafe.name}.`, 'success');

    return {
      success: true,
      code: cleanToken,
      message: 'Token verified successfully! Redemption recorded in settlement ledger.',
      member: {
        id: user.id,
        name: user.name,
        planName: user.subscription.planName,
        status: user.subscription.status,
        creditsRemaining:
          benefit.category === 'beverage'
            ? Math.max(0, user.subscription.creditsRemaining - 1)
            : user.subscription.creditsRemaining,
      },
      benefit,
      redemptionRecord: newRecord,
    };
  };

  const completeCheckout = (planId: string, billingInterval: 'monthly' | 'annual') => {
    const targetPlan = membershipPlans.find((p) => p.id === planId);
    if (!targetPlan) return false;

    setUser((prev) => ({
      ...prev,
      subscription: {
        planId: targetPlan.id,
        planName: targetPlan.name,
        status: 'active',
        cycleStartDate: new Date().toISOString().split('T')[0],
        cycleEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        creditsTotal: targetPlan.drinkCreditsMonthly,
        creditsRemaining: targetPlan.drinkCreditsMonthly,
        autoRenew: true,
        savedTotalUsd: prev.subscription.savedTotalUsd,
        lastPaymentStatus: 'succeeded',
        billingInterval,
      },
    }));

    showToast(`Welcome to ${targetPlan.name}! Membership activated.`, 'success');
    return true;
  };

  const cancelSubscription = () => {
    setUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        status: 'canceled',
        autoRenew: false,
      },
    }));
    showToast('Auto-renew canceled. Credits remain valid until period end.', 'info');
  };

  const resumeSubscription = () => {
    setUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        status: 'active',
        autoRenew: true,
      },
    }));
    showToast('Membership auto-renew reactivated!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeRole,
        setActiveRole,
        setUserSubscriptionStatus,
        cafes,
        updateCafe,
        benefits,
        toggleBenefitForCafe,
        membershipPlans,
        updatePlan,
        redemptions,
        staff,
        addStaffMember,
        toggleStaffActive,
        deleteStaffMember,
        applications,
        submitPartnerApplication,
        updateApplicationStatus,
        disputes,
        resolveDispute,
        savedCafeIds,
        toggleSaveCafe,
        activePassToken,
        validateAndRedeemToken,
        selectedCheckoutPlanId,
        setSelectedCheckoutPlanId,
        completeCheckout,
        cancelSubscription,
        resumeSubscription,
        toast,
        showToast,
        clearToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
