'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Coffee,
  ShieldCheck,
  Store,
  DollarSign,
  Lock,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="caramel" size="sm">
          Trust & Operations
        </Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-espresso-950 tracking-tight">
          How Crema Collective Works
        </h1>
        <p className="text-sm sm:text-base text-espresso-700 leading-relaxed">
          Transparent answers on membership mechanics, partner roaster economics, anti-fraud standards, and customer rights.
        </p>
      </div>

      {/* Section 1: Member Experience & Benefits */}
      <section id="terms" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3 border-b border-cream-200 pb-3">
          <Coffee className="w-6 h-6 text-forest-700" />
          <h2 className="font-serif text-2xl font-bold text-espresso-950">
            For Coffee Lovers & Subscribers
          </h2>
        </div>

        <div className="space-y-4 text-sm text-espresso-700">
          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              Which drinks are included in my monthly beverage credits?
            </h4>
            <p className="leading-relaxed">
              Every participating partner honors credits on: single-origin batch pour-overs, flat whites, traditional cappuccinos, cortados, lattes (hot or iced, any size), and cold brews. Specialty syrups, alternate milks (oat, almond), and extra espresso shots are always 100% complimentary for members. Rare auction lots (e.g. Panama Geisha) may carry a modest $2 barista surcharge.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              Do unused coffee credits roll over?
            </h4>
            <p className="leading-relaxed">
              Yes. If you have an active subscription on the Daily Craft Pass or Roaster&apos;s Guild tiers, up to 4 unused credits roll over into your next monthly cycle automatically. If you pause or cancel, your remaining credits stay valid until the exact end of your current 30-day billing period.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              How do I get the 15% discount on whole-bean coffee bags?
            </h4>
            <p className="leading-relaxed">
              When purchasing roasted beans at any partner shop, simply present your active Crema Pass. The barista selects &ldquo;Retail Bean Discount&rdquo; on their counter terminal, which immediately applies a 15% to 20% discount to your retail bag purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Zero-Friction Cancellation & Billing */}
      <section id="cancellation" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3 border-b border-cream-200 pb-3">
          <DollarSign className="w-6 h-6 text-caramel-600" />
          <h2 className="font-serif text-2xl font-bold text-espresso-950">
            Billing, Trials & Cancellation Guarantee
          </h2>
        </div>

        <div className="space-y-4 text-sm text-espresso-700">
          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              How does the 14-day pilot guarantee work?
            </h4>
            <p className="leading-relaxed">
              If during your first 14 days you decide Crema Collective isn&apos;t a fit for your routine, you can cancel in one click from your Member Dashboard and receive an unconditional 100% refund.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              Can I pause my subscription when traveling?
            </h4>
            <p className="leading-relaxed">
              Yes. You can pause your subscription for 1 to 3 months directly in your dashboard settings. You will not be billed while paused, and your account reactivates whenever you return.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Cafe Partner Economics & Reimbursement */}
      <section id="reimbursement" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3 border-b border-cream-200 pb-3">
          <Store className="w-6 h-6 text-forest-700" />
          <h2 className="font-serif text-2xl font-bold text-espresso-950">
            For Independent Cafe Owners
          </h2>
        </div>

        <div className="space-y-4 text-sm text-espresso-700">
          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              How are cafes reimbursed for drinks?
            </h4>
            <p className="leading-relaxed">
              We pay a fixed cost-plus reimbursement rate ($3.25 to $3.75 per coffee) on every redeemed drink credit. This covers your raw milk and coffee bean COGS (typically $0.85 to $1.15) plus a healthy margin contribution to barista labor. Reimbursements are transferred via direct ACH every 14 days.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              Do we need new POS hardware or software?
            </h4>
            <p className="leading-relaxed">
              No. Baristas use our browser-based Quick Validator on any counter iPad, mobile phone, or existing POS browser tab. Verifying a customer takes 1 to 2 seconds and requires zero cables or hardware installations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              How do you protect participating roasters from overcrowding?
            </h4>
            <p className="leading-relaxed">
              We maintain strict geographic caps: only 6 to 10 non-competing independent roasters are accepted per district. This guarantees each partner roaster receives meaningful incremental traffic without cannibalization.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Anti-Fraud & Operational Security */}
      <section id="fraud" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3 border-b border-cream-200 pb-3">
          <ShieldCheck className="w-6 h-6 text-forest-700" />
          <h2 className="font-serif text-2xl font-bold text-espresso-950">
            Anti-Fraud & Counter Security
          </h2>
        </div>

        <div className="space-y-4 text-sm text-espresso-700">
          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              Why can&apos;t a member screenshot their card and share it?
            </h4>
            <p className="leading-relaxed">
              Every Crema digital pass generates a rotating single-use 6-digit TOTP token paired with an animated live pulsing security badge. The token expires every 60 seconds. A static screenshot cannot pass the live counter validation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-2">
            <h4 className="font-serif text-base font-bold text-espresso-950">
              Are there redemption frequency limits?
            </h4>
            <p className="leading-relaxed">
              Yes. Members are capped at 2 beverage redemptions per 3-hour window. This completely prevents bad actors from ordering coffee rounds for whole office groups on a single personal pass.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Privacy & Data Ethics */}
      <section id="privacy" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3 border-b border-cream-200 pb-3">
          <Lock className="w-6 h-6 text-espresso-800" />
          <h2 className="font-serif text-2xl font-bold text-espresso-950">
            Privacy & Data Ethics
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-3 text-sm text-espresso-700 leading-relaxed">
          <p>
            We believe in radical data minimalism. We will never sell your personal information, email address, or dining habits to third-party ad brokers. Your payment details are tokenized through bank-grade PCI-DSS Level 1 compliant processors and never touch our application servers.
          </p>
          <p className="text-xs text-espresso-500">
            Last policy update: October 2026 • Certified for Pilot Cohort
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-cream-200/60 rounded-3xl p-8 sm:p-12 border border-cream-300 text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-espresso-950">
          Have a question we didn&apos;t answer?
        </h3>
        <p className="text-xs sm:text-sm text-espresso-700 max-w-md mx-auto">
          Our pilot founder and roaster liaison team answers every email personally within 24 hours.
        </p>
        <div className="pt-2">
          <a
            href="mailto:curator@cremacollective.demo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-espresso-900 text-cream-50 text-xs font-semibold hover:bg-espresso-800 transition-colors"
          >
            Email Founder Desk
          </a>
        </div>
      </div>
    </div>
  );
}
