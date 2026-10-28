'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  History,
  Store,
  Sparkles,
} from 'lucide-react';
import {
  IconVerifiedProof,
  IconCoffeeCup,
  IconQrToken,
} from '../../components/ui/FlaticonIcons';

export default function MyMembershipPassPage() {
  const { user, activePassToken, cafes, benefits, validateAndRedeemToken, resumeSubscription } = useApp();
  const sub = user.subscription;

  // Counter redemption simulation state
  const [selectedCafeId, setSelectedCafeId] = useState(cafes[0]?.id || '');
  const [selectedBenefitId, setSelectedBenefitId] = useState('ben_daily_craft');
  const [baristaName, setBaristaName] = useState('Elena (Counter Lead)');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [simResult, setSimResult] = useState<{
    success: boolean;
    message: string;
    details?: string;
  } | null>(null);

  const progressPct = ((60 - activePassToken.secondsRemaining) / 60) * 100;
  const isSuspended = sub.status === 'past_due' || sub.status === 'expired' || sub.status === 'canceled';

  const handleSimulateRedemption = () => {
    setIsRedeeming(true);
    setSimResult(null);

    setTimeout(() => {
      const res = validateAndRedeemToken({
        tokenCode: activePassToken.code,
        cafeId: selectedCafeId,
        benefitId: selectedBenefitId,
        staffName: baristaName,
        customNote: 'In-store member pass tap',
      });

      setIsRedeeming(false);
      setSimResult({
        success: res.success,
        message: res.message,
        details: res.success
          ? `Verified! Saved $${res.redemptionRecord?.valueSavedUsd.toFixed(2)}.`
          : `Failed: ${res.reason}`,
      });
    }, 450);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 font-sans">
      {/* Header */}
      <div className="border-b border-[#E5DBD0] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-caramel-600 mb-1.5">
            <span className="w-2 h-2 bg-emerald-500"></span>
            <span>TOKEN DISPATCH PROTOCOL // 60-SECOND CYCLE</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-espresso-950">
            Digital Member Pass
          </h1>
          <p className="font-editorial italic text-base sm:text-lg text-espresso-700 mt-1 max-w-lg">
            Present this live dynamic screen at any partner roaster. Single-use cryptographic tokens refresh every 60 seconds to eliminate screenshot sharing.
          </p>
        </div>

        <div className="p-3 bg-[#F2EBE0] border border-[#DFD2C0] font-mono text-xs text-espresso-800 space-y-0.5">
          <div>STATUS: <strong className="uppercase">{sub.status}</strong></div>
          <div className="text-[10px] text-espresso-600">CYCLE ENDS: {sub.cycleEndDate}</div>
        </div>
      </div>

      {/* State Warning Banners (if past due, expired, or trial) */}
      {sub.status === 'past_due' && (
        <div className="p-4 bg-amber-50 border border-amber-300 text-xs font-mono text-amber-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0" />
            <span>
              <strong>PAYMENT PENDING:</strong> Your last renewal payment failed. Pass is temporarily suspended.
            </span>
          </div>
          <Link href="/account">
            <Button variant="caramel" size="sm">
              Update Billing
            </Button>
          </Link>
        </div>
      )}

      {sub.status === 'expired' && (
        <div className="p-4 bg-red-50 border border-red-300 text-xs font-mono text-red-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0" />
            <span>
              <strong>MEMBERSHIP EXPIRED:</strong> Pass is inactive. Reactivate to continue redeeming craft coffee.
            </span>
          </div>
          <Button onClick={resumeSubscription} variant="primary" size="sm">
            Reactivate Pass
          </Button>
        </div>
      )}

      {/* The Tactile Digital Membership Card */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#17110E] text-cream-50 border-2 border-espresso-900 shadow-2xl relative overflow-hidden">
          {/* Card Header Strip */}
          <div className="p-6 border-b border-espresso-800/80 bg-[#1D1613]">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] tracking-widest uppercase text-caramel-400">
                  <span className={`w-2 h-2 rounded-full ${!isSuspended ? 'bg-emerald-400 animate-ping' : 'bg-red-400'}`} />
                  <span>{sub.status === 'active' ? 'VERIFIED MEMBER' : sub.status.toUpperCase()}</span>
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-cream-50">
                  CREMA PASS
                </h3>
                <p className="font-editorial italic text-xs text-cream-400">{sub.planName}</p>
              </div>

              <div className="text-right font-mono">
                <span className="text-[9px] uppercase tracking-widest text-cream-400 block">
                  BEVERAGE CREDITS
                </span>
                <span className="text-2xl font-black text-caramel-400">
                  {sub.creditsRemaining}
                  <span className="text-xs text-cream-500 font-normal"> / {sub.creditsTotal}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Perforation Punch Notch Divider */}
          <div className="relative flex items-center justify-between px-3 py-1 bg-[#17110E]">
            <div className="w-4 h-4 rounded-full bg-[#FAF7F2] -ml-5 border border-espresso-900"></div>
            <div className="flex-1 border-b border-dashed border-espresso-700/80 mx-2"></div>
            <div className="font-mono text-[9px] text-cream-500 uppercase tracking-widest px-1">
              ANTI-FRAUD // SINGLE-USE 60S STUB
            </div>
            <div className="flex-1 border-b border-dashed border-espresso-700/80 mx-2"></div>
            <div className="w-4 h-4 rounded-full bg-[#FAF7F2] -mr-5 border border-espresso-900"></div>
          </div>

          {/* Dynamic Anti-Fraud TOTP Verification Panel */}
          <div className="p-6 space-y-5 bg-[#17110E]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cream-300 text-[11px] uppercase tracking-wider">
                <IconVerifiedProof size={14} className="text-emerald-400" />
                Live Single-Use Token
              </span>
              <span className="text-caramel-400 text-[11px] font-bold flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                {activePassToken.secondsRemaining}s
              </span>
            </div>

            {/* Token Code Display */}
            <div className="p-4 bg-espresso-950 border border-espresso-800 text-center space-y-1">
              <div
                className={`font-mono text-4xl sm:text-5xl font-black tracking-widest text-cream-50 ${
                  isSuspended ? 'line-through opacity-50' : ''
                }`}
              >
                {isSuspended ? 'INACTIVE' : activePassToken.code}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-cream-400">
                {isSuspended
                  ? 'Resolve billing issue to generate tokens'
                  : 'Present live screen at barista counter'}
              </p>
            </div>

            {/* Countdown Linear Bar */}
            {!isSuspended && (
              <div className="w-full bg-espresso-900 h-1 overflow-hidden">
                <div
                  className="bg-caramel-500 h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${100 - progressPct}%` }}
                />
              </div>
            )}

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-cream-400">
              <AlertCircle className="w-3.5 h-3.5 text-caramel-400 flex-shrink-0" />
              <span>Screenshots fail counter validation automatically.</span>
            </div>

            {/* Member Details Footer on Card */}
            <div className="pt-3 border-t border-espresso-800/80 flex items-center justify-between font-mono text-xs text-cream-400">
              <div>
                <span className="text-[9px] uppercase tracking-widest block">MEMBER</span>
                <span className="font-bold text-cream-100">{user.name}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest block">VALID UNTIL</span>
                <span className="text-cream-200">{sub.cycleEndDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* In-Store Barista Tap Simulator */}
        <div className="mt-8 p-6 bg-white border border-[#DFD2C0] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#E5DBD0] pb-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-espresso-950 flex items-center gap-2">
              <IconCoffeeCup size={16} className="text-caramel-600" /> Test In-Store Redemption
            </h4>
            <span className="font-mono text-[10px] text-espresso-600 bg-[#FAF7F2] border border-[#DFD2C0] px-2 py-0.5">
              INTERACTIVE SANDBOX
            </span>
          </div>

          <p className="text-xs text-espresso-600 font-sans">
            Simulate stepping up to a partner register and presenting this live screen:
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                Participating Cafe Partner
              </label>
              <select
                value={selectedCafeId}
                onChange={(e) => setSelectedCafeId(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-espresso-950 focus:outline-none"
              >
                {cafes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.neighborhood})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                Select Member Benefit
              </label>
              <select
                value={selectedBenefitId}
                onChange={(e) => setSelectedBenefitId(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-espresso-950 focus:outline-none"
              >
                {benefits.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.category})
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleSimulateRedemption}
              disabled={isRedeeming || isSuspended}
              variant="primary"
              fullWidth
              size="md"
            >
              {isRedeeming ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authorizing on Counter Terminal...</span>
                </span>
              ) : (
                `Simulate Barista Verification (${sub.creditsRemaining} credits left)`
              )}
            </Button>

            {simResult && (
              <div
                className={`p-3 border text-xs font-mono space-y-1 ${
                  simResult.success
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-red-50 border-red-300 text-red-950'
                }`}
              >
                <div className="font-bold">{simResult.message}</div>
                {simResult.details && (
                  <div className="text-[11px] opacity-80">{simResult.details}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
