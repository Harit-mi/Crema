'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { PartnerNav } from '../../../components/layout/PartnerNav';
import { Button } from '../../../components/ui/Button';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  History,
} from 'lucide-react';
import { VerificationResult } from '../../../context/AppContext';

export default function PartnerRedemptionsVerificationPage() {
  const { cafes, user, benefits, validateAndRedeemToken, activePassToken, redemptions, staff } = useApp();

  const activeCafe = cafes.find((c) => c.id === user.activeCafeId) || cafes[0];
  const cafeRedemptions = redemptions.filter((r) => r.cafeId === activeCafe.id);

  // Form input state
  const [tokenInput, setTokenInput] = useState('');
  const [selectedBenefitId, setSelectedBenefitId] = useState('ben_daily_craft');
  const [selectedStaffName, setSelectedStaffName] = useState('Elena (Shift Lead)');
  const [customNote, setCustomNote] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    setIsVerifying(true);
    setResult(null);

    setTimeout(() => {
      const res = validateAndRedeemToken({
        tokenCode: tokenInput.trim(),
        cafeId: activeCafe.id,
        benefitId: selectedBenefitId,
        staffName: selectedStaffName,
        customNote,
      });

      setResult(res);
      setIsVerifying(false);
      if (res.success) {
        setTokenInput('');
        setCustomNote('');
      }
    }, 400);
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      <PartnerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-[#E5DBD0] pb-6">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-widest text-caramel-600">
            <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse"></span>
            <span>BARISTA COUNTER TERMINAL // LIVE REGISTER PROTOCOL</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-espresso-950">
            Staff Redemption Verification
          </h1>
          <p className="text-xs sm:text-sm text-espresso-600 mt-1 max-w-xl">
            Validate rotating 6-digit member tokens. Cryptographically blocks screenshots and prevents duplicate redemptions.
          </p>
        </div>

        {/* Main Grid: Counter Terminal on Left, Shift Activity on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Validator Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 border-2 border-espresso-950 shadow-md space-y-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5DBD0] gap-2">
              <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-espresso-950 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-caramel-600 flex-shrink-0" /> Enter Member Pass Code
              </h2>
              <span className="text-xs font-mono text-espresso-600 break-all">
                Customer live token: <strong className="text-espresso-950">{activePassToken.code}</strong>
              </span>
            </div>

            <form onSubmit={handleVerifySubmit} className="space-y-5">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-espresso-700 block mb-1.5">
                  6-Digit Pass Code
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder={activePassToken.code}
                    className="flex-1 px-4 py-3 bg-[#FAF7F2] border border-[#DFD2C0] font-mono text-lg sm:text-xl font-bold tracking-widest text-espresso-950 uppercase placeholder:text-espresso-300 focus:outline-none focus:border-espresso-950 min-w-0"
                  />
                  <Button
                    type="button"
                    onClick={() => setTokenInput(activePassToken.code)}
                    variant="outline"
                    size="sm"
                    className="text-xs whitespace-nowrap self-stretch sm:self-auto font-mono"
                  >
                    Paste Live Token
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-espresso-700 block mb-1.5">
                  Benefit Being Claimed
                </label>
                <select
                  value={selectedBenefitId}
                  onChange={(e) => setSelectedBenefitId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#DFD2C0] text-xs font-mono font-bold text-espresso-950 focus:outline-none focus:border-espresso-950"
                >
                  {benefits.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-espresso-700 block mb-1.5">
                    Staff on Duty
                  </label>
                  <select
                    value={selectedStaffName}
                    onChange={(e) => setSelectedStaffName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-xs font-mono text-espresso-900 focus:outline-none"
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={`${s.name} (${s.role})`}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-espresso-700 block mb-1.5">
                    Order Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="e.g. Oat flat white, single-origin"
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-xs font-mono text-espresso-900 focus:outline-none focus:border-espresso-950"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isVerifying}
                variant="primary"
                fullWidth
                size="lg"
                className="shadow-md"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Token & Member Eligibility...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Verify Code & Record Reimbursement</span>
                  </span>
                )}
              </Button>
            </form>

            {/* Verification Result Notification */}
            {result && (
              <div
                className={`p-5 border text-xs space-y-2 animate-in fade-in duration-200 font-mono ${
                  result.success
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-red-50 border-red-400 text-red-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {result.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <span>{result.message}</span>
                </div>

                {result.member && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-200 text-[11px]">
                    <div>
                      Member: <strong>{result.member.name}</strong> ({result.member.planName})
                    </div>
                    <div className="text-left sm:text-right">
                      Credits Remaining: <strong>{result.member.creditsRemaining}</strong>
                    </div>
                    <div>
                      Reimbursement Payout: <strong>+${activeCafe.creditReimbursementRate.toFixed(2)}</strong>
                    </div>
                    <div className="text-left sm:text-right text-emerald-700 font-bold">
                      Settlement Logged ✓
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Barista Visual Check Instructions */}
            <div className="p-4 bg-[#FAF7F2] border border-[#DFD2C0] text-xs text-espresso-700 space-y-2 font-mono">
              <span className="font-bold text-espresso-950 flex items-center gap-1.5 uppercase text-[10px]">
                <ShieldCheck className="w-4 h-4 text-forest-800" /> Anti-Fraud Guidelines for Staff
              </span>
              <ul className="space-y-1 text-[11px] text-espresso-600 list-disc list-inside">
                <li>Check for the live pulsing green dot on the customer&apos;s phone screen.</li>
                <li>Static screenshots will be rejected if the 60s countdown timer has expired.</li>
                <li>Double redemptions using the same token code are automatically rejected.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Shift Activity Feed & Statistics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 border border-[#DFD2C0] space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-espresso-500">
                  SHIFT VERIFIED VOLUME
                </span>
                <div className="font-display text-3xl font-black text-espresso-950">
                  {cafeRedemptions.length} <span className="text-xs text-espresso-500 font-normal font-mono">drinks</span>
                </div>
                <span className="text-[11px] font-mono text-forest-800 font-bold">Today&apos;s shift batch</span>
              </div>

              <div className="bg-white p-5 border border-[#DFD2C0] space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-espresso-500">
                  SHIFT REIMBURSEMENT
                </span>
                <div className="font-display text-3xl font-black text-forest-800">
                  ${(cafeRedemptions.length * activeCafe.creditReimbursementRate).toFixed(2)}
                </div>
                <span className="text-[11px] font-mono text-espresso-500">ACH transfer batch</span>
              </div>
            </div>

            {/* Shift Redemption Ledger */}
            <div className="bg-white border border-[#DFD2C0] space-y-3">
              <div className="p-4 border-b border-[#E5DBD0] flex items-center justify-between">
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-espresso-950 flex items-center gap-2">
                  <History className="w-4 h-4 text-caramel-600" /> Shift Verification Feed
                </h3>
                <span className="text-xs font-mono text-espresso-500">
                  {cafeRedemptions.length} records
                </span>
              </div>

              {cafeRedemptions.length > 0 ? (
                <div className="divide-y divide-[#E5DBD0] max-h-[460px] overflow-y-auto font-mono text-xs">
                  {cafeRedemptions.map((r) => (
                    <div
                      key={r.id}
                      className="p-3.5 flex items-center justify-between hover:bg-[#FAF7F2]"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-espresso-950">{r.benefitName}</span>
                          <span className="text-[10px] text-espresso-600 px-1.5 py-0.2 bg-[#F2EBE0] border border-[#DFD2C0]">
                            {r.tokenCode}
                          </span>
                        </div>
                        <p className="text-[11px] text-espresso-600">
                          {r.timestamp} • Member: <strong>{r.memberName}</strong> • Barista: {r.staffName}
                        </p>
                      </div>
                      <span className="font-bold text-forest-800 text-xs">
                        +${activeCafe.creditReimbursementRate.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-espresso-500">
                  No redemptions logged yet for this shift.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
