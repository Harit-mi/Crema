'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { CafeCard } from '../../components/ui/CafeCard';
import {
  Search,
  X,
  Filter,
  Check,
} from 'lucide-react';
import { IconVerifiedProof, IconLocationPin } from '../../components/ui/FlaticonIcons';

export default function ExploreCafesPage() {
  const { cafes, benefits, user } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOfferFilter, setSelectedOfferFilter] = useState('all');
  const [onlyMyPlanEligible, setOnlyMyPlanEligible] = useState(false);

  // Extract filter options
  const neighborhoods = useMemo(() => {
    return ['all', ...Array.from(new Set(cafes.map((c) => c.neighborhood)))];
  }, [cafes]);

  const categories = [
    { id: 'all', label: 'All Roasteries [5]' },
    { id: 'micro_roastery', label: 'Direct Roasters [2]' },
    { id: 'botanical_bakery', label: 'Bakery & Botanical [1]' },
    { id: 'pour_over_bar', label: 'Pour-Over Labs [2]' },
  ];

  const offerFilters = [
    { id: 'all', label: 'All Benefits' },
    { id: 'drinks', label: 'Beverage Credits' },
    { id: 'alt_milk', label: 'Free Alt Milk' },
    { id: 'pastry', label: 'Bakery Perks' },
    { id: 'retail_beans', label: '15% Off Whole Beans' },
  ];

  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) => {
      // 1. Text search
      const matchesSearch =
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.signatureBeans.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
        cafe.specialtyDrinks.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Neighborhood
      const matchesNeighborhood =
        selectedNeighborhood === 'all' || cafe.neighborhood === selectedNeighborhood;

      // 3. Category matching
      let matchesCategory = true;
      if (selectedCategory === 'micro_roastery') {
        matchesCategory = cafe.name.includes('Roast') || cafe.amenities.some((a) => a.includes('Roasting'));
      } else if (selectedCategory === 'botanical_bakery') {
        matchesCategory = cafe.amenities.some((a) => a.includes('Greenhouse') || a.includes('Pastries') || a.includes('Bakery'));
      } else if (selectedCategory === 'pour_over_bar') {
        matchesCategory = cafe.amenities.some((a) => a.includes('Pour-over') || a.includes('Tasting'));
      }

      // 4. Offer filter
      let matchesOffer = true;
      if (selectedOfferFilter === 'drinks') {
        matchesOffer = cafe.activeBenefitIds.includes('ben_daily_craft');
      } else if (selectedOfferFilter === 'alt_milk') {
        matchesOffer = cafe.activeBenefitIds.includes('ben_alt_milk');
      } else if (selectedOfferFilter === 'pastry') {
        matchesOffer = cafe.activeBenefitIds.includes('ben_pastry_perk');
      } else if (selectedOfferFilter === 'retail_beans') {
        matchesOffer = cafe.activeBenefitIds.includes('ben_bean_discount');
      }

      // 5. Membership Plan Eligibility
      let matchesPlan = true;
      if (onlyMyPlanEligible) {
        const userPlanId = user.subscription.planId;
        const eligibleBenefits = benefits.filter((b) => b.eligiblePlanIds.includes(userPlanId));
        matchesPlan = eligibleBenefits.some((b) => cafe.activeBenefitIds.includes(b.id));
      }

      return matchesSearch && matchesNeighborhood && matchesCategory && matchesOffer && matchesPlan;
    });
  }, [cafes, searchQuery, selectedNeighborhood, selectedCategory, selectedOfferFilter, onlyMyPlanEligible, user, benefits]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 font-sans">
      {/* Header Dossier */}
      <div className="border-b border-[#E5DBD0] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 mb-1.5 flex items-center gap-2">
            <span className="w-2 h-2 bg-forest-800"></span>
            <span>DIRECTORY & ORIGIN LEDGER // METRO DISTRICTS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-espresso-950">
            Pilot Roasters
          </h1>
          <p className="font-editorial italic text-base sm:text-lg text-espresso-700 mt-2 max-w-xl">
            Five independent specialty roasteries honoring transparent direct trade, calibrated extractions, and single-origin clarity.
          </p>
        </div>

        {/* Pilot Verification Notice */}
        <div className="p-4 bg-[#F2EBE0] border border-[#DFD2C0] font-mono text-xs text-espresso-800 max-w-xs space-y-1">
          <div className="font-bold uppercase tracking-wider text-espresso-950 flex items-center gap-1.5">
            <IconVerifiedProof size={14} className="text-forest-800" />
            <span>COUNTER SETTLEMENT</span>
          </div>
          <p className="text-[11px] text-espresso-600">
            Every cafe partner accepts our 60s dynamic member pass with guaranteed instant wholesale reimbursement.
          </p>
        </div>
      </div>

      {/* Structured Filter Console */}
      <div className="p-6 bg-white border border-[#DFD2C0] space-y-6 shadow-sm">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-espresso-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roasters, single-origin lots, signature pour-overs, neighborhoods..."
            className="w-full pl-11 pr-10 py-3.5 bg-[#FAF7F2] border border-[#DFD2C0] font-mono text-xs sm:text-sm text-espresso-950 placeholder:text-espresso-400 focus:outline-none focus:border-espresso-950"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso-400 hover:text-espresso-800 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Category & Neighborhood Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-[#E5DBD0] text-xs">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-espresso-500 mr-1">
              BREWING STYLE:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-espresso-950 text-cream-50 border-espresso-950 font-bold'
                    : 'bg-[#FAF7F2] text-espresso-700 border-[#DFD2C0] hover:border-espresso-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Neighborhood & Plan Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-espresso-500 uppercase text-[10px]">NEIGHBORHOOD:</span>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="px-2.5 py-1 bg-[#FAF7F2] border border-[#DFD2C0] font-mono text-xs text-espresso-950 focus:outline-none"
              >
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>
                    {n === 'all' ? 'All Districts' : n}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-1.5 font-mono text-xs text-espresso-800 cursor-pointer pl-2 border-l border-[#DFD2C0]">
              <input
                type="checkbox"
                checked={onlyMyPlanEligible}
                onChange={(e) => setOnlyMyPlanEligible(e.target.checked)}
                className="rounded-none border-espresso-400 text-espresso-950 focus:ring-0"
              />
              <span className="uppercase text-[11px]">My Plan Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-espresso-600 pb-2">
          <span>SHOWING {filteredCafes.length} OF {cafes.length} VERIFIED ROASTERIES</span>
          {searchQuery && (
            <span className="text-caramel-700">QUERY: &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {filteredCafes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
          </div>
        ) : (
          <div className="p-16 bg-white border border-[#DFD2C0] text-center space-y-4">
            <div className="font-mono text-sm uppercase text-espresso-500">
              NO ROASTERS MATCHED &ldquo;{searchQuery}&rdquo;
            </div>
            <p className="text-xs text-espresso-600 max-w-sm mx-auto">
              Try resetting your search terms or selecting &ldquo;All Districts&rdquo; to browse all participating pilot roasters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedNeighborhood('all');
                setSelectedCategory('all');
                setSelectedOfferFilter('all');
              }}
              className="px-4 py-2 bg-espresso-950 text-cream-50 font-display text-xs uppercase font-bold tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
