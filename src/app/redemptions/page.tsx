'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import {
  History,
  CheckCircle2,
  QrCode,
  Search,
} from 'lucide-react';

export default function RedemptionsHistoryPage() {
  const { redemptions, cafes, user } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCafe, setSelectedCafe] = useState('all');

  const filtered = redemptions.filter((r) => {
    const matchesSearch =
      r.benefitName.toLowerCase().includes(search.toLowerCase()) ||
      r.cafeName.toLowerCase().includes(search.toLowerCase()) ||
      r.tokenCode.toLowerCase().includes(search.toLowerCase());

    const matchesCafe = selectedCafe === 'all' || r.cafeId === selectedCafe;

    return matchesSearch && matchesCafe;
  });

  const totalSaved = redemptions.reduce((acc, curr) => acc + curr.valueSavedUsd, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 font-sans">
      {/* Top Header */}
      <div className="border-b border-[#E5DBD0] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-caramel-600 mb-1">
            <span className="w-2 h-2 bg-emerald-500"></span>
            <span>AUDIT LEDGER // MEMBER {user.name.toUpperCase()}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-espresso-950">
            Redemption History
          </h1>
          <p className="font-editorial italic text-sm sm:text-base text-espresso-700 mt-1">
            Every transaction is verified in real-time by counter staff with single-use cryptographic token timestamps.
          </p>
        </div>

        <Link href="/my-membership">
          <Button variant="primary" size="md">
            <QrCode className="w-4 h-4 mr-2 text-caramel-400" />
            <span>Open Dynamic Pass</span>
          </Button>
        </Link>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="bg-white p-5 border border-[#DFD2C0] space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-espresso-500">
            TOTAL IN-STORE REDEMPTIONS
          </span>
          <div className="font-display text-3xl font-black text-espresso-950">
            {redemptions.length}
          </div>
          <span className="text-xs text-espresso-600">Across {cafes.length} pilot roasters</span>
        </div>

        <div className="bg-white p-5 border border-[#DFD2C0] space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-espresso-500">
            CUMULATIVE RETAIL SAVINGS
          </span>
          <div className="font-display text-3xl font-black text-forest-800">
            ${totalSaved.toFixed(2)}
          </div>
          <span className="text-xs text-forest-800 font-bold">vs standard menu pricing</span>
        </div>

        <div className="bg-white p-5 border border-[#DFD2C0] space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-espresso-500">
            CREDITS REMAINING
          </span>
          <div className="font-display text-3xl font-black text-caramel-600">
            {user.subscription.creditsRemaining}
          </div>
          <span className="text-xs text-espresso-600">Cycle ends {user.subscription.cycleEndDate}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-[#DFD2C0] flex flex-col sm:flex-row gap-4 items-center justify-between font-mono text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-espresso-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search token code or drink..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-espresso-600 uppercase text-[10px]">Filter Roastery:</span>
          <select
            value={selectedCafe}
            onChange={(e) => setSelectedCafe(e.target.value)}
            className="px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-xs font-mono text-espresso-950 focus:outline-none"
          >
            <option value="all">All Pilot Roasters</option>
            {cafes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Monospace Ledger Reel */}
      <div className="bg-white border border-[#DFD2C0] divide-y divide-[#E5DBD0] font-mono text-xs shadow-sm">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-sm text-espresso-950 font-sans">{r.benefitName}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-[#FAF7F2] border border-[#DFD2C0] text-espresso-700">
                  TOKEN: <strong>{r.tokenCode}</strong>
                </span>
              </div>
              <p className="text-[11px] text-espresso-600">
                {r.timestamp} • Roastery: <strong className="text-espresso-900">{r.cafeName}</strong> • Barista: {r.staffName}
              </p>
              {r.notes && (
                <p className="text-[11px] text-caramel-700 italic">
                  Note: {r.notes}
                </p>
              )}
            </div>

            <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center">
              <span className="text-[10px] uppercase text-espresso-500">SAVINGS APPLIED</span>
              <span className="font-display text-base font-bold text-forest-800">
                +${r.valueSavedUsd.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
