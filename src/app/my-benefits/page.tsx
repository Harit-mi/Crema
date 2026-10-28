'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { BenefitStatus } from '../../types';
import { Button } from '../../components/ui/Button';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { IconQrToken, IconGiftPerk, IconCoffeeCup } from '../../components/ui/FlaticonIcons';

export default function MyBenefitsPage() {
  const { benefits, cafes, user } = useApp();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBenefits = benefits.filter((b) => {
    const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: BenefitStatus) => {
    switch (status) {
      case 'available':
        return (
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-forest-900 text-cream-50 font-bold border border-forest-950">
            Available Now
          </span>
        );
      case 'used':
        return (
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-[#FAF7F2] text-espresso-700 font-bold border border-[#DFD2C0]">
            Limit Reached
          </span>
        );
      case 'expired':
        return (
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-amber-50 text-amber-900 font-bold border border-amber-300">
            Expired
          </span>
        );
      case 'temporarily_unavailable':
        return (
          <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-[#F2EBE0] text-espresso-600 font-bold border border-[#DFD2C0]">
            Temporarily Paused
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 font-sans">
      {/* Header */}
      <div className="border-b border-[#E5DBD0] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-caramel-600 mb-1">
            <span className="w-2 h-2 bg-forest-800"></span>
            <span>MEMBER PERQUISITES // {user.subscription.planName.toUpperCase()}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-espresso-950">
            Your Privileges
          </h1>
          <p className="font-editorial italic text-sm sm:text-base text-espresso-700 mt-1">
            Review remaining credits, retail bean discounts, and roaster cupping invitations for your billing period.
          </p>
        </div>

        <Link href="/my-membership">
          <Button
            variant="primary"
            size="md"
            leftIcon={<IconQrToken size={16} className="text-caramel-400" />}
          >
            Open Dynamic Pass
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        {['all', 'beverage', 'discount', 'upgrade', 'experience'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 uppercase tracking-wider border transition-colors ${
              categoryFilter === cat
                ? 'bg-espresso-950 text-cream-50 border-espresso-950 font-bold'
                : 'bg-white text-espresso-700 border-[#DFD2C0] hover:border-espresso-950'
            }`}
          >
            {cat === 'all' ? 'All Privileges' : cat}
          </button>
        ))}
      </div>

      {/* Benefits Docket Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBenefits.map((b) => (
          <div
            key={b.id}
            className="p-6 bg-white border border-[#DFD2C0] space-y-4 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DBD0]">
                <span className="font-mono text-[9px] uppercase tracking-widest text-caramel-600 font-bold">
                  // {b.category.toUpperCase()}
                </span>
                {getStatusBadge(b.status)}
              </div>

              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
                {b.name}
              </h3>
              <p className="text-xs text-espresso-700 leading-relaxed font-sans">{b.description}</p>

              <div className="p-3 bg-[#FAF7F2] border border-[#E5DBD0] font-mono text-[11px] text-espresso-800 space-y-1">
                <div><strong>CONDITIONS:</strong> {b.terms}</div>
                {b.remainingUses !== undefined && (
                  <div>
                    <strong>QUOTA REMAINING:</strong>{' '}
                    <span className="text-forest-800 font-bold">{b.remainingUses} uses this cycle</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5DBD0] flex items-center justify-between font-mono text-[11px]">
              <span className="text-espresso-600">
                Accepted at {b.eligibleCafeIds.length} pilot roasteries
              </span>
              <Link
                href="/explore"
                className="text-espresso-950 hover:text-forest-800 font-bold uppercase flex items-center gap-1"
              >
                <span>Find Cafe</span>
                <ArrowRight className="w-3.5 h-3.5 text-caramel-600" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
