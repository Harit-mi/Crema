'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '../../../context/AppContext';
import { Button } from '../../../components/ui/Button';
import {
  CheckCircle2,
  Compass,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { IconQrToken } from '../../../components/ui/FlaticonIcons';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { user, membershipPlans } = useApp();

  const planId = searchParams.get('planId') || user.subscription.planId;
  const plan = membershipPlans.find((p) => p.id === planId) || membershipPlans[1];
  const total = searchParams.get('total') || '36.81';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8 text-center font-sans">
      {/* Proof Stamp */}
      <div className="w-16 h-16 mx-auto bg-forest-900 text-cream-50 flex items-center justify-center border-2 border-forest-950 shadow-md">
        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
      </div>

      <div className="space-y-2">
        <span className="stamp-box text-forest-800 bg-forest-50 border-forest-300">
          PROVISIONED // ACTIVE CERTIFICATE
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-espresso-950">
          Welcome to the Collective
        </h1>
        <p className="font-editorial italic text-base sm:text-lg text-espresso-700 max-w-md mx-auto leading-relaxed">
          Your <strong>{plan.name}</strong> membership is initialized. You can now step up to any participating roaster counter.
        </p>
      </div>

      {/* Confirmation Receipt Box */}
      <div className="bg-white p-6 sm:p-8 border-2 border-espresso-950 shadow-md text-left space-y-4 max-w-md mx-auto font-mono text-xs">
        <div className="flex justify-between pb-3 border-b border-[#E5DBD0]">
          <span className="text-espresso-600">MEMBER:</span>
          <span className="font-bold text-espresso-950">{user.name}</span>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E5DBD0]">
          <span className="text-espresso-600">PLAN TIER:</span>
          <span className="font-bold text-espresso-950">{plan.name.toUpperCase()}</span>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E5DBD0]">
          <span className="text-espresso-600">BEVERAGE CREDITS:</span>
          <span className="font-bold text-forest-800">
            {user.subscription.creditsRemaining} CREDITS LOADED
          </span>
        </div>
        <div className="flex justify-between pb-3 border-b border-[#E5DBD0]">
          <span className="text-espresso-600">CYCLE DATES:</span>
          <span className="text-espresso-800">
            {user.subscription.cycleStartDate} – {user.subscription.cycleEndDate}
          </span>
        </div>
        <div className="flex justify-between text-espresso-950 pt-1 font-bold text-sm">
          <span>TOTAL PROCESSED:</span>
          <span className="font-display text-base font-black">${total}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link href="/my-membership" className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-md"
            leftIcon={<IconQrToken size={16} className="text-caramel-400" />}
          >
            OPEN LIVE MEMBER PASS
          </Button>
        </Link>
        <Link href="/explore" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Compass className="w-4 h-4 mr-2 text-espresso-700" />
            <span>EXPLORE PILOT ROASTERS</span>
          </Button>
        </Link>
      </div>

      <div className="pt-2 text-xs font-mono text-espresso-600 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-forest-800" />
        <span>Electronic proof dispatched to {user.email}</span>
      </div>
    </div>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-mono text-xs">Loading receipt...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
