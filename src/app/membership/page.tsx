'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { MembershipPlan } from '../../types';
import { Button } from '../../components/ui/Button';
import {
  Check,
  CheckCircle2,
  Calculator,
  ShieldCheck,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function MembershipPlansPage() {
  const router = useRouter();
  const { membershipPlans, user, setSelectedCheckoutPlanId } = useApp();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');

  // Interactive Weekly Coffee Habit Calculator
  const [weeklyCups, setWeeklyCups] = useState<number>(3);
  const avgRetailPrice = 6.25;
  const monthlyRetail = weeklyCups * 4.33 * avgRetailPrice;
  const targetPlan = membershipPlans.find((p) => p.id === 'plan_fellowship') || membershipPlans[1];
  const netMonthlyCost = billingInterval === 'monthly' ? targetPlan.priceMonthly : targetPlan.priceAnnual / 12;
  const netSavings = Math.max(0, Math.round(monthlyRetail - netMonthlyCost));

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedCheckoutPlanId(plan.id);
    router.push(`/checkout?planId=${plan.id}&interval=${billingInterval}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 font-sans">
      {/* Header Docket */}
      <div className="border-b border-[#E5DBD0] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 mb-1.5 flex items-center gap-2">
            <span className="w-2 h-2 bg-espresso-950"></span>
            <span>MEMBERSHIP PROTOCOL // PILOT COHORT</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-espresso-950">
            Membership Tiers
          </h1>
          <p className="font-editorial italic text-base sm:text-lg text-espresso-700 mt-2 max-w-xl">
            Predictable craft coffee costs, guaranteed roaster quality, and whole-bean privileges. Transparent rules with 1-click cancellation.
          </p>
        </div>

        {/* Billing Switcher */}
        <div className="p-1 bg-[#F2EBE0] border border-[#DFD2C0] flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-4 py-2 uppercase font-bold tracking-wider transition-colors ${
              billingInterval === 'monthly'
                ? 'bg-espresso-950 text-cream-50'
                : 'text-espresso-700 hover:text-espresso-950'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('annual')}
            className={`px-4 py-2 uppercase font-bold tracking-wider transition-colors ${
              billingInterval === 'annual'
                ? 'bg-espresso-950 text-cream-50'
                : 'text-espresso-700 hover:text-espresso-950'
            }`}
          >
            Annual Pass <span className="text-caramel-600 ml-1 font-mono">[-20%]</span>
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {membershipPlans.map((plan) => {
          const isCurrent = user.subscription?.planId === plan.id && user.subscription.status === 'active';
          const isUnavailable = plan.status === 'unavailable' || plan.status === 'draft';
          const price =
            billingInterval === 'monthly'
              ? plan.priceMonthly
              : Math.round(plan.priceAnnual / 12);

          return (
            <div
              key={plan.id}
              className={`p-8 bg-white border flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? 'border-2 border-espresso-950 shadow-xl relative'
                  : 'border-[#DFD2C0] shadow-sm'
              } ${isUnavailable ? 'opacity-60 grayscale' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 font-bold">
                    // TIER {plan.slug.toUpperCase()}
                  </span>
                  {plan.isPopular && (
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-espresso-950 text-cream-50 font-bold">
                      COLLECTIVE CHOICE
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-espresso-950">
                  {plan.name}
                </h3>
                <p className="font-editorial italic text-xs sm:text-sm text-espresso-700 mt-1 min-h-[36px]">
                  {plan.tagline}
                </p>

                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#E5DBD0]">
                  <span className="font-display text-5xl font-black text-espresso-950">
                    ${price}
                  </span>
                  <span className="text-xs font-mono text-espresso-600 uppercase">/ month</span>
                  {billingInterval === 'annual' && (
                    <span className="ml-2 font-mono text-[10px] text-forest-800 font-bold">
                      [BILLED ANNUALLY]
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-espresso-500 block">
                    INCLUDED PRIVILEGES
                  </span>
                  <ul className="space-y-3 font-sans">
                    {plan.benefitRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-espresso-900">
                        <Check className="w-4 h-4 text-forest-800 flex-shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-[#FAF7F2] border border-[#E5DBD0] font-mono text-[11px] text-espresso-600 space-y-1">
                    <div><strong>USAGE:</strong> {plan.usageLimits}</div>
                    <div><strong>TERMS:</strong> {plan.renewalTerms}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E5DBD0]">
                <Button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isUnavailable}
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  fullWidth
                  size="md"
                >
                  {isCurrent ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>CURRENT ACTIVE PASS</span>
                    </span>
                  ) : isUnavailable ? (
                    'TIER NOT AVAILABLE'
                  ) : (
                    `SELECT ${plan.name.toUpperCase()}`
                  )}
                </Button>
                <div className="text-center">
                  <Link
                    href={`/membership/${plan.id}`}
                    className="font-mono text-[11px] uppercase tracking-wider text-espresso-700 hover:text-espresso-950 underline"
                  >
                    View Exclusions & Legal Policy →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Savings Calculator */}
      <div className="bg-[#F2EBE0] border border-[#DFD2C0] p-8 sm:p-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-caramel-700 uppercase tracking-widest">
              <Calculator className="w-4 h-4" />
              <span>COFFEE VALUE AUDIT CALCULATOR</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-espresso-950">
              Calculate Your Craft Coffee Savings
            </h3>
            <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-sans">
              Third-wave single-origin pour-overs and oat milk flat whites average $6.00 to $6.50 in Metro City. See how collective buying reduces your monthly outlay while guaranteeing fair barista reimbursement:
            </p>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between font-mono text-xs font-bold text-espresso-950">
                <span>WEEKLY SPECIALTY INTAKE:</span>
                <span>{weeklyCups} CUPS / WEEK ({weeklyCups * 4} / MONTH)</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={weeklyCups}
                onChange={(e) => setWeeklyCups(Number(e.target.value))}
                className="w-full accent-espresso-950 h-2 bg-[#DFD2C0] rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-espresso-600 font-mono uppercase tracking-widest">
                <span>1 Cup (Weekend)</span>
                <span>3 Cups (Commuter)</span>
                <span>7 Cups (Aficionado)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 border border-[#DFD2C0] space-y-4 font-mono text-xs shadow-sm">
            <div className="flex justify-between pb-3 border-b border-[#E5DBD0]">
              <span className="text-espresso-600">Standard Out-of-Pocket Spend:</span>
              <span className="font-bold text-espresso-950">
                ${Math.round(monthlyRetail)} / month
              </span>
            </div>
            <div className="flex justify-between pb-3 border-b border-[#E5DBD0]">
              <span className="text-espresso-600">Crema Daily Craft Pass:</span>
              <span className="font-bold text-forest-800">${Math.round(netMonthlyCost)} / month</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-display text-sm uppercase font-bold text-espresso-950">
                Estimated Monthly Savings:
              </span>
              <span className="font-serif text-2xl font-extrabold text-forest-800">
                +${netSavings}
                <span className="text-xs font-sans text-espresso-600 font-normal"> / mo</span>
              </span>
            </div>
            <p className="text-[10px] text-espresso-500 font-mono text-center pt-2 border-t border-[#E5DBD0]">
              Includes unlimited alt-milk waivers and 15% off whole bean retail bags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
