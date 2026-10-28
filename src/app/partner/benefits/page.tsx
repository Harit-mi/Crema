'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { PartnerNav } from '../../../components/layout/PartnerNav';
import { Button } from '../../../components/ui/Button';
import {
  Sliders,
  CheckCircle2,
  DollarSign,
  Coffee,
  ShieldCheck,
} from 'lucide-react';

export default function PartnerBenefitsConfigPage() {
  const { cafes, benefits, user, toggleBenefitForCafe } = useApp();

  const activeCafe = cafes.find((c) => c.id === user.activeCafeId) || cafes[0];

  return (
    <div className="space-y-8 pb-16 font-sans">
      <PartnerNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#E5DBD0] pb-6">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-widest text-caramel-600">
            <span className="w-2 h-2 bg-espresso-950"></span>
            <span>COUNTER PERMISSIONS // ROASTER {activeCafe.name.toUpperCase()}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-espresso-950">
            Permitted Member Benefits
          </h1>
          <p className="text-xs sm:text-sm text-espresso-600 mt-1 max-w-xl">
            Toggle which Crema Collective benefits are honored at your bar counters. Changes reflect immediately on member passes.
          </p>
        </div>

        {/* Guaranteed Reimbursement Rates Notice */}
        <div className="p-4 bg-[#F2EBE0] border border-[#DFD2C0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-forest-800 flex-shrink-0" />
            <div>
              <span className="font-bold text-espresso-950 block">
                AGREED BEVERAGE REIMBURSEMENT RATE
              </span>
              <span className="text-espresso-700">
                You receive <strong>${activeCafe.creditReimbursementRate.toFixed(2)}</strong> direct ACH per beverage credit redeemed.
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-forest-900 text-cream-50 border border-forest-950">
            GUARANTEED WHOLESALE PAYOUT
          </span>
        </div>

        {/* Benefits Toggle Matrix */}
        <div className="space-y-4 font-mono text-xs">
          {benefits.map((b) => {
            const isEnabled = activeCafe.activeBenefitIds.includes(b.id);

            return (
              <div
                key={b.id}
                className={`p-6 bg-white border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isEnabled ? 'border-espresso-950' : 'border-[#DFD2C0] opacity-75'
                }`}
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-base font-bold text-espresso-950 uppercase">{b.name}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#FAF7F2] border border-[#DFD2C0] text-caramel-600">
                      {b.category}
                    </span>
                  </div>
                  <p className="text-xs text-espresso-600 font-sans">{b.description}</p>
                  <p className="text-[10px] text-espresso-500 font-mono">
                    <strong>Terms:</strong> {b.terms}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleBenefitForCafe(activeCafe.id, b.id)}
                    className={`px-4 py-2 text-xs font-mono uppercase font-bold border transition-colors ${
                      isEnabled
                        ? 'bg-forest-900 text-cream-50 border-forest-950'
                        : 'bg-[#FAF7F2] text-espresso-700 border-[#DFD2C0] hover:border-espresso-950'
                    }`}
                  >
                    {isEnabled ? 'Honored at Bar ✓' : 'Disabled'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
