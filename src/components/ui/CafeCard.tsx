'use client';

import React from 'react';
import Link from 'next/link';
import { Cafe } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from './Badge';
import { Heart, ArrowRight } from 'lucide-react';
import { IconLocationPin, IconVerifiedProof, IconCoffeeBeans } from './FlaticonIcons';

interface CafeCardProps {
  cafe: Cafe;
}

export const CafeCard: React.FC<CafeCardProps> = ({ cafe }) => {
  const { savedCafeIds, toggleSaveCafe } = useApp();
  const isSaved = savedCafeIds.includes(cafe.id);

  return (
    <article className="group bg-white border border-[#DFD2C0] hover:border-espresso-950 transition-all duration-200 flex flex-col h-full font-sans shadow-sm">
      {/* Editorial Image Crop with Metadata Overlay */}
      <div className="relative h-56 w-full overflow-hidden bg-espresso-950">
        <img
          src={cafe.heroImage}
          alt={cafe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />

        {/* Top Proof Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-espresso-950 text-cream-50 border border-espresso-800 font-bold">
            {cafe.verificationBadge || 'PILOT ROASTER'}
          </span>
          {cafe.isVerifiedPartner && (
            <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-forest-900 text-cream-50 border border-forest-800 font-bold">
              ACCEPTS PASS
            </span>
          )}
        </div>

        {/* Bookmark Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaveCafe(cafe.id);
          }}
          className={`absolute top-3 right-3 p-2 border transition-all ${
            isSaved
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-espresso-950/80 text-cream-100 border-espresso-800 hover:bg-espresso-950'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Banner Title */}
        <div className="absolute bottom-3 left-4 right-4 text-cream-50">
          <div className="font-mono text-[10px] uppercase tracking-widest text-caramel-300 flex items-center gap-1 mb-0.5">
            <IconLocationPin size={12} className="text-caramel-400" />
            <span>{cafe.neighborhood}</span>
          </div>
          <h3 className="font-display text-xl font-bold uppercase tracking-tight text-cream-50 leading-tight">
            {cafe.name}
          </h3>
        </div>
      </div>

      {/* Body Dossier */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <p className="font-editorial italic text-sm text-espresso-800 line-clamp-2 leading-relaxed">
            &ldquo;{cafe.tagline}&rdquo;
          </p>

          {/* Terroir & Origin Beans */}
          <div className="p-3 bg-[#FAF7F2] border border-[#E5DBD0] space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-espresso-600">
              <span className="uppercase tracking-widest text-[9px]">FEATURED LOT</span>
              <span className="text-caramel-600 font-bold">15% RETAIL PERK</span>
            </div>
            <div className="font-display text-xs font-bold text-espresso-950 truncate">
              {cafe.signatureBeans[0] || 'Single Origin Lot'}
            </div>
          </div>
        </div>

        {/* Card Footer Link */}
        <div className="pt-3 border-t border-[#E5DBD0] flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase text-espresso-600 tracking-wider">
            REIMBURSED: <strong>${cafe.creditReimbursementRate.toFixed(2)}</strong>/CUP
          </div>
          <Link
            href={`/cafes/${cafe.slug}`}
            className="font-display text-xs font-bold uppercase tracking-wider text-espresso-950 hover:text-forest-900 flex items-center gap-1.5 transition-colors group-hover:translate-x-1"
          >
            <span>VIEW DOSSIER</span>
            <ArrowRight className="w-3.5 h-3.5 text-caramel-600" />
          </Link>
        </div>
      </div>
    </article>
  );
};
