'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { PartnerNav } from '../../components/layout/PartnerNav';
import { Button } from '../../components/ui/Button';
import {
  QrCode,
  Users,
  Settings,
  Sliders,
  History,
  ArrowRight,
} from 'lucide-react';

export default function PartnerDashboardOverviewPage() {
  const { cafes, user, redemptions, staff } = useApp();

  const activeCafe = cafes.find((c) => c.id === user.activeCafeId) || cafes[0];
  const cafeRedemptions = redemptions.filter((r) => r.cafeId === activeCafe.id);

  const totalShiftDrinks = cafeRedemptions.length;
  const shiftPayout = totalShiftDrinks * activeCafe.creditReimbursementRate;

  return (
    <div className="space-y-8 pb-16 font-sans">
      <PartnerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Welcome Header */}
        <div className="border-b border-[#E5DBD0] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-widest text-caramel-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse"></span>
              <span>ROASTERY OPERATING DESK // METRO ANCHOR</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-espresso-950">
              {activeCafe.name}
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600 mt-1 max-w-xl">
              Track in-store redemptions, adjust active member perks, manage barista PINs, and audit ACH payouts.
            </p>
          </div>

          <Link href="/partner/redemptions">
            <Button variant="primary" size="lg" className="shadow-md">
              <QrCode className="w-4 h-4 mr-2 text-caramel-400" />
              <span>OPEN COUNTER TERMINAL</span>
            </Button>
          </Link>
        </div>

        {/* Shift & Monthly Activity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-white p-5 border border-[#DFD2C0] space-y-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500">
              TODAY&apos;S VERIFIED CUPS
            </span>
            <div className="font-display text-3xl font-black text-espresso-950">
              {totalShiftDrinks} <span className="text-xs font-mono font-normal text-espresso-500">drinks</span>
            </div>
            <p className="text-[11px] text-forest-800 font-bold">100% verified single-use</p>
          </div>

          <div className="bg-white p-5 border border-[#DFD2C0] space-y-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500">
              ESTIMATED SHIFT PAYOUT
            </span>
            <div className="font-display text-3xl font-black text-forest-800">
              ${shiftPayout.toFixed(2)}
            </div>
            <p className="text-[11px] text-espresso-600">
              At ${activeCafe.creditReimbursementRate.toFixed(2)} / cup guaranteed
            </p>
          </div>

          <div className="bg-white p-5 border border-[#DFD2C0] space-y-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500">
              ACTIVE PERK RULES
            </span>
            <div className="font-display text-3xl font-black text-caramel-600">
              {activeCafe.activeBenefitIds.length} <span className="text-xs font-mono font-normal text-espresso-500">rules</span>
            </div>
            <Link
              href="/partner/benefits"
              className="text-[11px] text-espresso-950 font-bold hover:underline block uppercase"
            >
              Configure benefits →
            </Link>
          </div>

          <div className="bg-white p-5 border border-[#DFD2C0] space-y-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500">
              BARISTA STAFF ON ROSTER
            </span>
            <div className="font-display text-3xl font-black text-espresso-950">
              {staff.length} <span className="text-xs font-mono font-normal text-espresso-500">baristas</span>
            </div>
            <Link
              href="/partner/staff"
              className="text-[11px] text-espresso-950 font-bold hover:underline block uppercase"
            >
              Manage PINs →
            </Link>
          </div>
        </div>

        {/* Quick Action Station */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <Link
            href="/partner/profile"
            className="p-6 bg-white border border-[#DFD2C0] hover:border-espresso-950 transition-colors space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold uppercase text-espresso-950">Roastery Profile & Hours</span>
              <Settings className="w-4 h-4 text-caramel-600" />
            </div>
            <p className="text-espresso-600 font-sans text-xs">
              Update opening hours, signature bean lots, and equipment specifications.
            </p>
          </Link>

          <Link
            href="/partner/benefits"
            className="p-6 bg-white border border-[#DFD2C0] hover:border-espresso-950 transition-colors space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold uppercase text-espresso-950">Benefit Permissions</span>
              <Sliders className="w-4 h-4 text-caramel-600" />
            </div>
            <p className="text-espresso-600 font-sans text-xs">
              Toggle accepted perks and configure custom whole-bean discount rates.
            </p>
          </Link>

          <Link
            href="/partner/staff"
            className="p-6 bg-white border border-[#DFD2C0] hover:border-espresso-950 transition-colors space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold uppercase text-espresso-950">Staff & Shift PINs</span>
              <Users className="w-4 h-4 text-caramel-600" />
            </div>
            <p className="text-espresso-600 font-sans text-xs">
              Add baristas, update shift PINs, and audit counter scanner permissions.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
