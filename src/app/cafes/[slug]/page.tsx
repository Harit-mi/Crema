'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '../../../context/AppContext';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import {
  Clock,
  Coffee,
  CheckCircle2,
  Heart,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
  Share2,
  Users,
} from 'lucide-react';
import {
  IconLocationPin,
  IconVerifiedProof,
  IconQrToken,
  IconCoffeeBeans,
} from '../../../components/ui/FlaticonIcons';

export default function CafeDetailPage() {
  const params = useParams();
  const { cafes, benefits, user, savedCafeIds, toggleSaveCafe, showToast } = useApp();

  const slug = params?.slug as string;
  const cafe = cafes.find((c) => c.slug === slug || c.id === slug);

  if (!cafe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <h2 className="font-display text-2xl font-bold uppercase text-espresso-950">Roastery Not Found</h2>
        <p className="text-sm text-espresso-600">The requested roaster dossier does not exist in our pilot directory.</p>
        <Link href="/explore">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Roaster Directory
          </Button>
        </Link>
      </div>
    );
  }

  const isSaved = savedCafeIds.includes(cafe.id);
  const cafeActiveBenefits = benefits.filter((b) => cafe.activeBenefitIds.includes(b.id));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans">
      {/* Top Back Navigation & Action Buttons */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5DBD0]">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-espresso-700 hover:text-espresso-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roaster Registry</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 border border-[#DFD2C0] bg-white text-espresso-700 hover:border-espresso-950 transition-colors"
            title="Share Profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleSaveCafe(cafe.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-mono uppercase font-bold tracking-wider transition-colors ${
              isSaved
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-espresso-900 border-[#DFD2C0] hover:border-espresso-950'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'SAVED' : 'SAVE ROASTER'}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Dossier Banner */}
      <div className="relative border border-espresso-950 bg-espresso-950 h-80 sm:h-[26rem] w-full overflow-hidden shadow-md">
        <img
          src={cafe.heroImage}
          alt={cafe.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 text-cream-50 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-caramel-500 text-espresso-950 font-bold">
                {cafe.verificationBadge}
              </span>
              <span className="font-mono text-xs text-cream-300 flex items-center gap-1">
                <IconLocationPin size={14} className="text-caramel-400" />
                {cafe.neighborhood.toUpperCase()}, {cafe.city.toUpperCase()}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-cream-50">
              {cafe.name}
            </h1>
            <p className="font-editorial italic text-sm sm:text-base text-cream-300 max-w-2xl font-light">
              &ldquo;{cafe.tagline}&rdquo;
            </p>
          </div>

          <Link href="/my-membership" className="flex-shrink-0">
            <Button
              variant="primary"
              size="md"
              className="bg-cream-50 text-espresso-950 hover:bg-cream-100 whitespace-nowrap"
              leftIcon={<IconQrToken size={16} className="text-caramel-600" />}
            >
              REDEEM PASS HERE
            </Button>
          </Link>
        </div>
      </div>

      {/* Verified vs Illustrative Information Disclosure */}
      <div className="p-4 bg-[#F2EBE0] border border-[#DFD2C0] font-mono text-xs text-espresso-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <IconVerifiedProof size={16} className="text-forest-800 flex-shrink-0" />
          <span>
            <strong>VERIFIED PILOT DOSSIER:</strong> Hours, signature lots, and per-cup counter reimbursement rates (${cafe.creditReimbursementRate.toFixed(2)}/cup) are confirmed with cafe ownership.
          </span>
        </div>
        <span className="text-[10px] text-espresso-600 uppercase tracking-widest">
          ANCHOR SINCE {cafe.partnerSince.toUpperCase()}
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Benefits Voucher, Story, Lots, Menu */}
        <div className="lg:col-span-8 space-y-10">
          {/* Active Member Benefits & Exact Redemption Conditions */}
          <div className="bg-[#181311] text-cream-50 border-2 border-espresso-900 p-6 sm:p-8 space-y-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-espresso-800">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-400 block">
                  COUNTER PRIVILEGES // TASTING PASS
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-cream-50">
                  Active Crema Member Benefits at {cafe.name}
                </h3>
              </div>
              <span className="stamp-box text-caramel-400 border-caramel-400 hidden sm:inline-flex">
                INCLUDED IN PASS
              </span>
            </div>

            <p className="text-xs text-cream-300 leading-relaxed font-sans">
              Present your live 60-second dynamic pass at the counter terminal. Barista staff confirm your code in 2 seconds to apply these verified privileges:
            </p>

            <div className="space-y-3.5 pt-1">
              {cafeActiveBenefits.map((ben) => (
                <div
                  key={ben.id}
                  className="p-4 bg-espresso-950 border border-espresso-800 space-y-1 text-xs text-cream-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-cream-50 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {ben.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-caramel-400">
                      // {ben.category}
                    </span>
                  </div>
                  <p className="text-xs text-cream-300 font-sans">{ben.description}</p>
                  <p className="text-[10px] text-cream-400 pt-1 font-mono">
                    <strong>Exact Terms:</strong> {ben.terms}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Roaster Heritage and Origin Story */}
          <div className="p-8 bg-white border border-[#DFD2C0] space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 block">
              ORIGIN PHILOSOPHY // ROASTER HERITAGE
            </span>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-espresso-950">
              The Roaster&apos;s Craft
            </h3>
            <p className="font-editorial text-base sm:text-lg text-espresso-800 leading-relaxed">
              {cafe.roasterStory}
            </p>
            <p className="text-xs text-espresso-600 leading-relaxed font-sans pt-2 border-t border-[#E5DBD0]">
              {cafe.description}
            </p>
          </div>

          {/* Signature Beans on Bar */}
          <div className="p-8 bg-white border border-[#DFD2C0] space-y-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 block mb-1">
                DIRECT-TRADE LOTS // TERROIR
              </span>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
                Featured Single-Origin Harvests
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {cafe.signatureBeans.map((bean, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FAF7F2] border border-[#DFD2C0] space-y-1.5"
                >
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-espresso-500">
                    LOT #{idx + 1} // LIGHT-OMNI
                  </span>
                  <h4 className="font-display text-base font-bold text-espresso-950 uppercase">{bean}</h4>
                  <p className="text-xs text-espresso-600">
                    Micro-batch roasted. Crema members receive 15% off whole-bean retail bags in-store.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty Drinks Covered by Credits */}
          <div className="p-8 bg-white border border-[#DFD2C0] space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5DBD0] pb-3">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
                Signature House Menu
              </h3>
              {cafe.menuUrl && (
                <a
                  href={cafe.menuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-espresso-800 hover:text-espresso-950 flex items-center gap-1 uppercase"
                >
                  <span>Full Cafe Menu</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="divide-y divide-[#E5DBD0] font-sans">
              {cafe.specialtyDrinks.map((drink, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between text-sm">
                  <span className="font-display font-bold text-espresso-950 uppercase text-xs sm:text-sm">{drink}</span>
                  <span className="font-mono text-[10px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 border border-forest-200">
                    COVERED BY 1 PASS CREDIT
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Location, Hours, Contact, Amenities */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#DFD2C0] p-6 space-y-6">
            {/* Opening Hours Breakdown */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-espresso-950 mb-3 flex items-center gap-1.5 pb-2 border-b border-[#E5DBD0]">
                <Clock className="w-3.5 h-3.5 text-caramel-600" /> Opening Hours
              </h4>
              <div className="space-y-1.5 text-xs text-espresso-800 divide-y divide-[#E5DBD0] font-mono">
                {cafe.openingHours.monday && (
                  <div className="flex justify-between py-1">
                    <span className="text-espresso-600">Monday</span>
                    <span className="font-medium">{cafe.openingHours.monday}</span>
                  </div>
                )}
                {cafe.openingHours.tuesday && (
                  <div className="flex justify-between py-1">
                    <span className="text-espresso-600">Tuesday</span>
                    <span className="font-medium">{cafe.openingHours.tuesday}</span>
                  </div>
                )}
                {cafe.openingHours.wednesday && (
                  <div className="flex justify-between py-1">
                    <span className="text-espresso-600">Wednesday</span>
                    <span className="font-medium">{cafe.openingHours.wednesday}</span>
                  </div>
                )}
                {cafe.openingHours.thursday && (
                  <div className="flex justify-between py-1">
                    <span className="text-espresso-600">Thursday</span>
                    <span className="font-medium">{cafe.openingHours.thursday}</span>
                  </div>
                )}
                {cafe.openingHours.friday && (
                  <div className="flex justify-between py-1">
                    <span className="text-espresso-600">Friday</span>
                    <span className="font-medium">{cafe.openingHours.friday}</span>
                  </div>
                )}
                {cafe.openingHours.saturday && (
                  <div className="flex justify-between py-1">
                    <span className="text-espresso-600">Saturday</span>
                    <span className="font-medium">{cafe.openingHours.saturday}</span>
                  </div>
                )}
                {cafe.openingHours.sunday && (
                  <div className="flex justify-between py-1">
                    <span className="text-espresso-600">Sunday</span>
                    <span className="font-medium">{cafe.openingHours.sunday}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Address & Map Link */}
            <div className="pt-4 border-t border-[#E5DBD0] space-y-2 font-mono text-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-espresso-500 block">
                LOCATION & ADDRESS
              </span>
              <p className="text-espresso-900 font-medium">{cafe.address}</p>
              <p className="text-espresso-600 text-[11px]">{cafe.neighborhood}, {cafe.city}</p>
              {cafe.mapUrl && (
                <a
                  href={cafe.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-caramel-600 font-bold hover:text-caramel-700 pt-1 uppercase"
                >
                  <IconLocationPin size={14} />
                  <span>Open in Maps</span>
                </a>
              )}
            </div>

            {/* Amenities & Bar Specs */}
            <div className="pt-4 border-t border-[#E5DBD0] space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-espresso-500 block">
                ATMOSPHERE & BAR SPECS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cafe.amenities.map((am, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] px-2 py-1 bg-[#FAF7F2] border border-[#DFD2C0] text-espresso-800 uppercase"
                  >
                    {am}
                  </span>
                ))}
              </div>
            </div>

            {/* Seating & Contact */}
            <div className="pt-4 border-t border-[#E5DBD0] space-y-1.5 font-mono text-xs text-espresso-700">
              <div className="flex justify-between">
                <span>Capacity:</span>
                <strong className="text-espresso-950">{cafe.seatingCapacity} seats</strong>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="text-espresso-950">{cafe.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
