'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import {
  Lock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Coffee,
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { membershipPlans, completeCheckout, user, showToast } = useApp();

  const planIdParam = searchParams.get('planId') || 'plan_fellowship';
  const intervalParam = (searchParams.get('interval') as 'monthly' | 'annual') || 'monthly';

  const [selectedPlanId, setSelectedPlanId] = useState(planIdParam);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>(intervalParam);

  // Form state
  const [name, setName] = useState(user.name || 'Clara Sterling');
  const [email, setEmail] = useState(user.email || 'clara.sterling@example.com');
  const [zipCode, setZipCode] = useState('94107');
  const [testCardNumber, setTestCardNumber] = useState('•••• •••• •••• 4242');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Processing & simulated validation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const plan = membershipPlans.find((p) => p.id === selectedPlanId) || membershipPlans[1];

  // Pricing calculations
  const rawBase = billingInterval === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
  const taxAmount = Number((rawBase * 0.0825).toFixed(2));
  const totalAmount = (rawBase + taxAmount).toFixed(2);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!agreeTerms) {
      setErrorMsg('Please accept the membership cancellation & renewal terms to continue.');
      return;
    }

    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please complete all billing fields.');
      return;
    }

    setIsProcessing(true);

    // Simulate backend payment gateway validation & subscription provisioning
    setTimeout(() => {
      const success = completeCheckout(plan.id, billingInterval);
      setIsProcessing(false);

      if (success) {
        router.push(`/checkout/confirmation?planId=${plan.id}&interval=${billingInterval}&total=${totalAmount}`);
      } else {
        setErrorMsg('Payment gateway could not authorize the simulated transaction.');
        showToast('Checkout transaction failed', 'error');
      }
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 font-sans">
      {/* Top Banner */}
      <div className="border-b border-[#E5DBD0] pb-6 space-y-2">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-espresso-600">
          <Lock className="w-3.5 h-3.5 text-forest-800" />
          <span>ENROLLMENT DESK // SANDBOX SESSION</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-espresso-950">
          Complete Membership
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Checkout Payment Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#DFD2C0] space-y-6 shadow-sm">
          <form onSubmit={handleCheckoutSubmit} className="space-y-6">
            <div className="border-b border-[#E5DBD0] pb-3">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-espresso-950">
                1. Member Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-sans text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-sans text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
              </div>
            </div>

            <div className="border-b border-[#E5DBD0] pb-3 pt-2">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-espresso-950 flex items-center justify-between">
                <span>2. Payment Method</span>
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-[#F2EBE0] text-espresso-700">
                  SANDBOX PROTOTYPE
                </span>
              </h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 bg-[#FAF7F2] border border-[#DFD2C0] space-y-3">
                <div className="flex items-center justify-between font-bold text-espresso-950">
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-caramel-600" /> Test Credit Card
                  </span>
                  <span className="text-[10px] text-espresso-500">NO REAL CHARGE</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      disabled
                      value={testCardNumber}
                      className="w-full px-3 py-2 bg-white border border-[#DFD2C0] font-mono text-xs text-espresso-700"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      disabled
                      value="12/28 • 882"
                      className="w-full px-3 py-2 bg-white border border-[#DFD2C0] font-mono text-xs text-center text-espresso-700"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-espresso-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-800 flex-shrink-0" />
                  <span>
                    In production, credentials route directly to Stripe Elements tokenization.
                  </span>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-espresso-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded-none border-espresso-400 text-espresso-950 focus:ring-0"
                />
                <span className="leading-relaxed">
                  I agree to the recurring {billingInterval} billing of ${totalAmount} until canceled. I understand I can pause or cancel anytime in my Member Dashboard with zero cancellation fee.
                </span>
              </label>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-300 text-xs text-red-800 flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isProcessing}
              variant="primary"
              fullWidth
              size="lg"
              className="shadow-md"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AUTHORIZING SUBSCRIPTION...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CONFIRM & ACTIVATE PASS (${totalAmount})</span>
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Right Column: Order Summary & Selected Tier */}
        <div className="lg:col-span-5 bg-[#F2EBE0] p-6 sm:p-8 border border-[#DFD2C0] space-y-6">
          <div className="border-b border-[#DFD2C0] pb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 block mb-0.5">
              ORDER SUMMARY
            </span>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
              {plan.name}
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between text-espresso-700">
              <span>{billingInterval === 'monthly' ? 'Monthly Pass Fee:' : 'Annual Pass Fee:'}</span>
              <span className="font-bold text-espresso-950">${rawBase.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-espresso-700">
              <span>Estimated District Tax (8.25%):</span>
              <span className="font-bold text-espresso-950">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-[#DFD2C0] flex justify-between text-sm font-bold text-espresso-950">
              <span>TOTAL DUE TODAY:</span>
              <span className="font-display text-xl font-black">${totalAmount}</span>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#DFD2C0] space-y-2 font-mono text-[11px] text-espresso-700">
            <div className="font-bold uppercase text-espresso-950">
              TIER INCLUSIONS ({plan.drinkCreditsMonthly} CREDITS)
            </div>
            <ul className="space-y-1 text-espresso-600">
              <li>• Valid at 5 pilot roaster anchors</li>
              <li>• Free alternative milks on all orders</li>
              <li>• 15% discount on whole bean bags</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-mono text-xs">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
