'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { CafeCard } from '../components/ui/CafeCard';
import { PassCard } from '../components/ui/PassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Sparkles,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Sliders,
  TrendingUp,
} from 'lucide-react';
import {
  IconCoffeeCup,
  IconMembershipCard,
  IconQrToken,
  IconVerifiedProof,
  IconCafeShop,
  IconCoffeeBeans,
} from '../components/ui/FlaticonIcons';

export default function HomePage() {
  const { cafes, membershipPlans, user } = useApp();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [weeklyCups, setWeeklyCups] = useState(4);

  // Dynamic coffee math calculator
  const retailPerCup = 6.0;
  const monthlyCostRetail = weeklyCups * 4 * retailPerCup;
  const fellowshipPlanPrice = billingInterval === 'monthly' ? 34 : Math.round(326 / 12);
  const monthlySavings = Math.max(0, monthlyCostRetail - fellowshipPlanPrice);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 font-sans">
      {/* 1. EDITORIAL ASYMMETRIC HERO */}
      <section className="pt-8 sm:pt-14 pb-16 sm:pb-24 hairline-b bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Pilot Docket Registry Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E5DBD0] text-[11px] font-mono uppercase tracking-widest text-espresso-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-caramel-500 rounded-none"></span>
              <span>SPECIALTY ROASTERS REGISTRY // METRO COHORT</span>
            </div>
            <div className="flex items-center gap-4 text-espresso-600">
              <span>PILOT HUBS: <strong>05 ANCHORS</strong></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">SETTLEMENT: <strong>$3.25–$3.75/CUP</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start pt-10 sm:pt-16">
            {/* Left Column: Bold Typography & Proposition */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="stamp-box text-caramel-700 bg-caramel-50/80 border-caramel-400">
                  CURATED CAFE PASS // EDITION 2026.1
                </span>

                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-espresso-950 tracking-tightest uppercase leading-[0.92]">
                  THE DAILY <br />
                  <span className="font-editorial italic font-normal text-caramel-600 lowercase tracking-normal">
                    craft ritual,
                  </span> <br />
                  RECLAIMED.
                </h1>

                <p className="font-editorial text-lg sm:text-2xl text-espresso-800 leading-relaxed max-w-xl">
                  Step into Metro City’s handpicked independent roasters. Predictable monthly single-origin credits, zero surcharge on alternative milks, and 15% off whole-bean bags.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link href="/membership">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto shadow-md"
                    rightIcon={<ArrowRight className="w-4 h-4 text-caramel-400" />}
                  >
                    EXPLORE MEMBERSHIP TIERS
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    INSPECT 5 PILOT ROASTERS
                  </Button>
                </Link>
              </div>

              {/* Architectural Telemetry Box */}
              <div className="p-4 bg-[#F2EBE0] border border-[#DFD2C0] font-mono text-xs text-espresso-800 space-y-1">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-espresso-950">
                  <IconVerifiedProof size={16} className="text-forest-800" />
                  <span>TRANSPARENT PILOT COMMITMENT</span>
                </div>
                <p className="text-[11px] text-espresso-700 leading-relaxed">
                  No venture-subsidized price dumping. Participating roasteries receive guaranteed minimum $3.25 to $3.75 wholesale reimbursement on every redeemed cup, logged in our open public audit ledger.
                </p>
              </div>
            </div>

            {/* Right Column: Physical Ticket Pass Presentation */}
            <div className="lg:col-span-5 flex justify-center">
              <PassCard />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PILOT ROASTERS DIRECTORY (EDITORIAL RAIL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E5DBD0] gap-4 mb-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 mb-1">
              CURATED SANCTUARIES // VERIFIED ANCHORS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-espresso-950">
              The Roasters&apos; Docket
            </h2>
          </div>
          <Link
            href="/explore"
            className="font-display text-xs font-bold uppercase tracking-widest text-espresso-900 hover:text-forest-900 flex items-center gap-2"
          >
            <span>VIEW ALL 5 ROASTER PROFILES</span>
            <ArrowRight className="w-4 h-4 text-caramel-600" />
          </Link>
        </div>

        {/* 3-Column Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cafes.slice(0, 3).map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      </section>

      {/* 3. THE EXCHANGE PROTOCOL (HOW IT WORKS) */}
      <section className="bg-espresso-950 text-cream-50 py-20 sm:py-28 border-y border-espresso-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-400">
              ZERO HARDWARE FRICTION // ROTATING PASS PROTOCOL
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-cream-50">
              How The Exchange Works
            </h2>
            <p className="font-editorial italic text-base sm:text-lg text-cream-300">
              No punch cards lost in pockets. No QR code screenshots shared across group chats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-espresso-900 pt-10">
            {/* Step 01 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-display text-4xl font-black text-caramel-400">
                  01 //
                </div>
                <IconMembershipCard size={28} className="text-caramel-400/80" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-cream-50">
                Choose Your Monthly Quota
              </h3>
              <p className="text-xs text-cream-300 leading-relaxed font-sans">
                Select between our perk-only Explorer tier or our 8-to-16 craft beverage passes. Unused credits roll over automatically with active membership.
              </p>
            </div>

            {/* Step 02 */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-espresso-900 pt-8 md:pt-0 md:pl-8">
              <div className="flex items-center justify-between">
                <div className="font-display text-4xl font-black text-caramel-400">
                  02 //
                </div>
                <IconQrToken size={28} className="text-caramel-400/80" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-cream-50">
                Live 60s Dynamic Token
              </h3>
              <p className="text-xs text-cream-300 leading-relaxed font-sans">
                Step up to the counter and present your live pass. The 6-digit rotating code is verified in 2 seconds on the barista terminal. Screenshot sharing is cryptographically blocked.
              </p>
            </div>

            {/* Step 03 */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-espresso-900 pt-8 md:pt-0 md:pl-8">
              <div className="flex items-center justify-between">
                <div className="font-display text-4xl font-black text-caramel-400">
                  03 //
                </div>
                <IconCoffeeCup size={28} className="text-caramel-400/80" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-cream-50">
                Direct Roaster Settlement
              </h3>
              <p className="text-xs text-cream-300 leading-relaxed font-sans">
                Each verified redemption triggers an automatic wholesale credit payout to the cafe partner. You savor single-origin excellence; roasters thrive sustainably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE COFFEE ECONOMICS & MEMBERSHIP DOCKET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-[#F2EBE0] border border-[#DFD2C0] space-y-12 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#DFD2C0]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 block mb-1">
                COFFEE ECONOMICS AUDIT
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-espresso-950">
                Calculate Your Craft Coffee Savings
              </h2>
              <p className="text-xs sm:text-sm text-espresso-700 mt-1 max-w-lg">
                Specialty flat whites and Chemex pour-overs average $6.00 in Metro City. See how collective buying reduces your monthly outlay while guaranteeing fair barista reimbursement.
              </p>
            </div>

            {/* Billing Interval Toggle */}
            <div className="flex items-center gap-2 p-1 bg-[#FAF7F2] border border-[#DFD2C0]">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                  billingInterval === 'monthly'
                    ? 'bg-espresso-950 text-cream-50'
                    : 'text-espresso-700 hover:text-espresso-950'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('annual')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                  billingInterval === 'annual'
                    ? 'bg-espresso-950 text-cream-50'
                    : 'text-espresso-700 hover:text-espresso-950'
                }`}
              >
                Annual <span className="text-caramel-600 font-black ml-1">[-20%]</span>
              </button>
            </div>
          </div>

          {/* Interactive Calculator Slider Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-baseline font-mono text-xs">
                <span className="uppercase text-espresso-700">Weekly Craft Coffee Intake:</span>
                <span className="font-bold text-espresso-950 text-sm">
                  {weeklyCups} cups / week ({weeklyCups * 4} / month)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={weeklyCups}
                onChange={(e) => setWeeklyCups(Number(e.target.value))}
                className="w-full h-2 bg-[#E5DBD0] rounded-none appearance-none cursor-pointer accent-espresso-950"
              />
              <div className="flex justify-between text-[10px] font-mono text-espresso-500 uppercase tracking-widest">
                <span>1 Cup (Casual)</span>
                <span>4 Cups (Habitual)</span>
                <span>7 Cups (Aficionado)</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 bg-white border border-[#DFD2C0] flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase text-espresso-500 tracking-wider block">
                  ESTIMATED NET MONTHLY SAVINGS
                </span>
                <div className="font-display text-3xl sm:text-4xl font-black text-forest-800">
                  +${monthlySavings.toFixed(0)} <span className="text-xs font-mono font-normal text-espresso-600">/ mo</span>
                </div>
              </div>
              <span className="stamp-box text-forest-800 bg-forest-50 border-forest-300">
                INCL. 15% BEAN PERK
              </span>
            </div>
          </div>
        </div>

        {/* 3 Tier Docket Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {membershipPlans.map((plan) => {
            const isCurrent = user.subscription?.planId === plan.id && user.subscription.status === 'active';
            const price = billingInterval === 'monthly' ? plan.priceMonthly : Math.round(plan.priceAnnual / 12);

            return (
              <div
                key={plan.id}
                className={`border p-8 flex flex-col justify-between transition-all bg-white ${
                  plan.isPopular
                    ? 'border-2 border-espresso-950 shadow-lg'
                    : 'border-[#DFD2C0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 font-bold">
                      {plan.slug.toUpperCase()}
                    </span>
                    {plan.isPopular && (
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-forest-900 text-cream-50 font-bold">
                        COLLECTIVE FLAGSHIP
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-espresso-950">
                    {plan.name}
                  </h3>
                  <p className="font-editorial italic text-xs text-espresso-700 mt-1 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#E5DBD0]">
                    <span className="font-display text-5xl font-black text-espresso-950">
                      ${price}
                    </span>
                    <span className="text-xs font-mono text-espresso-600 uppercase">/ month</span>
                    {billingInterval === 'annual' && (
                      <span className="ml-2 font-mono text-[10px] text-forest-800 font-bold">
                        [ANNUAL TICKET]
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-espresso-500 font-bold block">
                      PRIVILEGES & ROLLOVER
                    </span>
                    <ul className="space-y-2.5">
                      {plan.benefitRules.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-espresso-900">
                          <Check className="w-4 h-4 text-forest-800 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#E5DBD0]">
                  <Link href={`/checkout?planId=${plan.id}&interval=${billingInterval}`}>
                    <Button
                      variant={plan.isPopular ? 'primary' : 'outline'}
                      fullWidth
                      size="md"
                    >
                      {isCurrent ? (
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>CURRENT PASS</span>
                        </span>
                      ) : (
                        `SELECT ${plan.name.toUpperCase()}`
                      )}
                    </Button>
                  </Link>
                  <p className="text-center font-mono text-[10px] text-espresso-500 uppercase tracking-wider">
                    PAUSE OR CANCEL WITH 1 CLICK IN DASHBOARD
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FOR CAFE OWNERS & ROASTERIES */}
      <section className="bg-espresso-950 text-cream-50 py-20 border-t border-espresso-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="stamp-box text-caramel-400 border-caramel-500/50">
                FOR INDEPENDENT ROASTERS // PARTNER PROGRAM
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-cream-50 leading-tight">
                Turn neighborhood explorers into recurring craft regulars.
              </h2>

              <p className="font-editorial text-base sm:text-lg text-cream-300 leading-relaxed max-w-xl">
                Joining Crema Collective requires zero expensive POS integration and zero listing fees. We reimburse every beverage credit at agreed cost-plus rates while bringing you high-margin bakery and retail bean buyers.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="p-4 bg-espresso-900 border border-espresso-800 space-y-1">
                  <div className="font-display text-2xl font-bold text-caramel-400">$3.25–$3.75</div>
                  <div className="text-[10px] text-cream-400 uppercase">Guaranteed Per-Cup Payout</div>
                </div>
                <div className="p-4 bg-espresso-900 border border-espresso-800 space-y-1">
                  <div className="font-display text-2xl font-bold text-cream-50">2 Seconds</div>
                  <div className="text-[10px] text-cream-400 uppercase">Counter Verification Speed</div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/partner">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-cream-50 text-espresso-950 hover:bg-cream-100"
                    rightIcon={<ArrowRight className="w-4 h-4 text-caramel-600" />}
                  >
                    EXPLORE ROASTERY PARTNER PORTAL
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 bg-espresso-900 border border-espresso-800 space-y-4 font-mono text-xs text-cream-300">
              <div className="font-bold uppercase tracking-widest text-caramel-400 text-sm">
                PILOT ANCHOR REQUIREMENTS
              </div>
              <ul className="space-y-3 divide-y divide-espresso-800/80">
                <li className="pt-3 flex items-start gap-2">
                  <span className="text-caramel-400">01.</span>
                  <span>Roasts on premises or direct partnerships with traceable farmgate origin lots.</span>
                </li>
                <li className="pt-3 flex items-start gap-2">
                  <span className="text-caramel-400">02.</span>
                  <span>Calibrated extraction standards (espresso dialed twice daily).</span>
                </li>
                <li className="pt-3 flex items-start gap-2">
                  <span className="text-caramel-400">03.</span>
                  <span>Barista staff trained on 6-digit TOTP counter verification.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
