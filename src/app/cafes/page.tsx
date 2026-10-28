'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CafeCard } from '../../components/ui/CafeCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Search, Filter, MapPin, Coffee, SlidersHorizontal, X } from 'lucide-react';

export default function CafesPage() {
  const { cafes } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');

  // Extract unique neighborhoods & amenities
  const neighborhoods = useMemo(() => {
    const list = Array.from(new Set(cafes.map((c) => c.neighborhood)));
    return ['all', ...list];
  }, [cafes]);

  const amenitiesList = [
    'all',
    'High-speed Fiber Wi-Fi',
    'Quiet Laptop Zones',
    'Dog-friendly Courtyard',
    'Pour-over Tasting Flight',
    'Pet Friendly',
  ];

  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) => {
      const matchesSearch =
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.signatureBeans.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
        cafe.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesNeighborhood =
        selectedNeighborhood === 'all' || cafe.neighborhood === selectedNeighborhood;

      const matchesAmenity =
        selectedAmenity === 'all' || cafe.amenities.includes(selectedAmenity);

      return matchesSearch && matchesNeighborhood && matchesAmenity;
    });
  }, [cafes, searchQuery, selectedNeighborhood, selectedAmenity]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedNeighborhood('all');
    setSelectedAmenity('all');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedNeighborhood !== 'all' || selectedAmenity !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <Badge variant="caramel" size="sm">
            Curated Pilot Roster
          </Badge>
          <span className="text-xs text-espresso-600 font-mono">
            Metro Historic Arts District
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-espresso-950 tracking-tight">
          Explore Independent Roasters
        </h1>
        <p className="text-sm sm:text-base text-espresso-700 leading-relaxed">
          Every cafe in the Crema Collective network is independently operated, sources ethically, and honors your member pass with pride.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Text Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-espresso-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by roaster name, single origin, or neighborhood..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-espresso-950 placeholder:text-espresso-400 focus:outline-none focus:ring-2 focus:ring-forest-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso-400 hover:text-espresso-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Neighborhood Select */}
          <div className="md:col-span-3">
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm font-medium text-espresso-900 focus:outline-none focus:ring-2 focus:ring-forest-700"
            >
              <option value="all">All Neighborhoods ({cafes.length})</option>
              {neighborhoods
                .filter((n) => n !== 'all')
                .map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
            </select>
          </div>

          {/* Amenity Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedAmenity}
              onChange={(e) => setSelectedAmenity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm font-medium text-espresso-900 focus:outline-none focus:ring-2 focus:ring-forest-700"
            >
              <option value="all">All Atmospheres & Amenities</option>
              {amenitiesList
                .filter((a) => a !== 'all')
                .map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cream-100 text-xs text-espresso-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-espresso-900">
              Showing {filteredCafes.length} of {cafes.length} roasters
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-forest-700 hover:text-forest-900 font-semibold underline ml-2"
              >
                Clear all filters
              </button>
            )}
          </div>
          <span className="text-espresso-500 font-mono text-[11px]">
            Filtered dynamically in pilot zone
          </span>
        </div>
      </div>

      {/* Cafe Grid */}
      {filteredCafes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-cream-200 max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-cream-200 text-espresso-600 flex items-center justify-center">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-espresso-950">
            No Roasters Matched Your Search
          </h3>
          <p className="text-sm text-espresso-600 leading-relaxed">
            We couldn’t find any cafes matching &ldquo;{searchQuery}&rdquo;. Try clearing filters or searching for specific bean varieties like Ethiopian Guji or Kenyan Peaberry.
          </p>
          <Button onClick={clearAllFilters} variant="outline" size="sm">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
