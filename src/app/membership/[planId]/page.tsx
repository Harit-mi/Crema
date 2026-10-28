'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '../../../context/AppContext';
import { Button } from '../../../components/ui/Button';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ShieldCheck,
  Coffee,
  ArrowRight,
  Store,
} from 'lucide-react';

export default function PlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { membershipPlans, cafes, setSelectedCheckoutPlanId, user } = useApp();

  const planId = params?.planId as string;
  const plan = membershipPlans.find((p) => p.id === planId || p.slug === planId);

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <h2 className="font-display text-2xl font-bold uppercase text-espresso-950">Plan Not Found</h2>
        <p className="text-sm text-espresso-600">The requested membership tier does not exist.</p>
        <Link href="/membership">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Membership Plans
          </Button>
        </Link>
      </div>
    );
  }

  const isCurrent = user.subscription?.planId === plan.id;

  const handleCheckout = () => {
    setSelectedCheckoutPlanId(plan.id);
    router.push(`/checkout?planId=${plan.id}&interval=monthly`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 font-sans">
      {/* Back Link */}
      <Link
        href="/membership"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-espresso-700 hover:text-espresso-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Membership Plans</span>
      </Link>

      {/* Plan Header Card */}
      <div className="bg-white border-2 border-espresso-950 p-8 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E5DBD0]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-caramel-600 font-bold">
              <span>// PROTOCOL TIER {plan.slug.toUpperCase()}</span>
              {plan.isPopular && <span className="text-forest-800">[FLAGSHIP]</span>}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-espresso-950">
              {plan.name}
            </h1>
            <p className="font-editorial italic text-sm text-espresso-700">{plan.tagline}</p>
          </div>

          <div className="text-left sm:text-right font-mono">
            <span className="font-display text-4xl sm:text-5xl font-black text-espresso-950">
              ${plan.priceMonthly}
            </span>
            <span className="text-xs text-espresso-600 block uppercase">/ month (or ${plan.priceAnnual}/yr)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            onClick={handleCheckout}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-md"
          >
            <span>PROCEED TO ENROLLMENT</span>
            <ArrowRight className="w-4 h-4 ml-2 text-caramel-400" />
          </Button>
          <span className="text-xs text-espresso-600 font-mono">
            Direct Barista Reimbursement Guaranteed
          </span>
        </div>
      </div>

      {/* Terms & Rules Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Included Privileges */}
        <div className="p-6 bg-white border border-[#DFD2C0] space-y-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-espresso-500 block">
            PRIVILEGES & INCLUSIONS
          </span>
          <ul className="space-y-2.5 text-xs text-espresso-900">
            {plan.benefitRules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-forest-800 flex-shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions & Legal Policy */}
        <div className="p-6 bg-[#FAF7F2] border border-[#DFD2C0] space-y-4 font-mono text-xs text-espresso-800">
          <span className="text-[10px] font-bold uppercase tracking-widest text-espresso-500 block">
            RULES, EXCLUSIONS & CANCELLATION
          </span>
          <div className="space-y-3 divide-y divide-[#E5DBD0]">
            <div className="pt-2">
              <strong className="block text-espresso-950 mb-0.5">USAGE QUOTA:</strong>
              {plan.usageLimits}
            </div>
            <div className="pt-2">
              <strong className="block text-espresso-950 mb-0.5">EXCLUSIONS:</strong>
              {plan.exclusions}
            </div>
            <div className="pt-2">
              <strong className="block text-espresso-950 mb-0.5">RENEWAL & CANCELLATION:</strong>
              {plan.renewalTerms}. {plan.cancellationPolicy}
            </div>
          </div>
        </div>
      </div>

      {/* Participating Pilot Roasters */}
      <div className="p-6 bg-white border border-[#DFD2C0] space-y-4">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-espresso-500 block">
          ELIGIBLE PILOT ANCHORS ({cafes.length} ROASTERIES)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cafes.map((cafe) => (
            <Link
              key={cafe.id}
              href={`/cafes/${cafe.slug}`}
              className="p-3 border border-[#E5DBD0] hover:border-espresso-950 transition-colors flex items-center justify-between font-mono text-xs"
            >
              <div>
                <span className="font-bold text-espresso-950 block">{cafe.name}</span>
                <span className="text-[10px] text-espresso-600">{cafe.neighborhood}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-caramel-600" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
