'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { PartnerNav } from '../../../components/layout/PartnerNav';
import { Button } from '../../../components/ui/Button';
import {
  Save,
  Clock,
  Coffee,
  Store,
  ExternalLink,
} from 'lucide-react';

export default function PartnerProfilePage() {
  const { cafes, user, updateCafe, showToast } = useApp();

  const cafe = cafes.find((c) => c.id === user.activeCafeId) || cafes[0];

  const [name, setName] = useState(cafe.name);
  const [tagline, setTagline] = useState(cafe.tagline);
  const [roasterStory, setRoasterStory] = useState(cafe.roasterStory);
  const [address, setAddress] = useState(cafe.address);
  const [phone, setPhone] = useState(cafe.phone);
  const [contactEmail, setContactEmail] = useState(cafe.contactEmail);
  const [seatingCapacity, setSeatingCapacity] = useState(cafe.seatingCapacity);
  const [weekdaysHours, setWeekdaysHours] = useState(cafe.openingHours.monday || '7:00 AM – 5:30 PM');
  const [weekendsHours, setWeekendsHours] = useState(cafe.openingHours.saturday || '8:00 AM – 6:00 PM');
  const [beansInput, setBeansInput] = useState(cafe.signatureBeans.join(', '));
  const [drinksInput, setDrinksInput] = useState(cafe.specialtyDrinks.join(', '));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateCafe(cafe.id, {
      name,
      tagline,
      roasterStory,
      address,
      phone,
      contactEmail,
      seatingCapacity: Number(seatingCapacity),
      signatureBeans: beansInput.split(',').map((s) => s.trim()).filter(Boolean),
      specialtyDrinks: drinksInput.split(',').map((s) => s.trim()).filter(Boolean),
      openingHours: {
        ...cafe.openingHours,
        monday: weekdaysHours,
        tuesday: weekdaysHours,
        wednesday: weekdaysHours,
        thursday: weekdaysHours,
        friday: weekdaysHours,
        saturday: weekendsHours,
        sunday: weekendsHours,
        summary: `Mon–Fri ${weekdaysHours}, Sat–Sun ${weekendsHours}`,
      },
    });

    showToast('Cafe profile successfully saved and updated across directory!', 'success');
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      <PartnerNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-[#E5DBD0] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-widest text-caramel-600">
              <span className="w-2 h-2 bg-espresso-950"></span>
              <span>DIRECTORY DOSSIER // METRO PILOT ANCHOR</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-espresso-950">
              Roastery Profile & Hours
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600 mt-1">
              Changes reflect immediately on your public dossier at <Link href={`/cafes/${cafe.slug}`} className="font-bold underline">/cafes/{cafe.slug}</Link>.
            </p>
          </div>

          <Link href={`/cafes/${cafe.slug}`} target="_blank" className="font-mono text-xs text-caramel-600 hover:text-caramel-700 font-bold flex items-center gap-1 uppercase">
            <span>View Public Dossier</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Basic Identity */}
          <div className="bg-white p-6 sm:p-8 border border-[#DFD2C0] space-y-6 shadow-sm">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-espresso-950 pb-3 border-b border-[#E5DBD0]">
              1. Roastery Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Cafe / Roastery Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-sans text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Tagline / Aesthetic Specialty
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-sans text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                Roaster Heritage & Sourcing Story
              </label>
              <textarea
                rows={3}
                value={roasterStory}
                onChange={(e) => setRoasterStory(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-sans text-xs text-espresso-950 focus:outline-none focus:border-espresso-950 leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Hours & Location */}
          <div className="bg-white p-6 sm:p-8 border border-[#DFD2C0] space-y-6 shadow-sm">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-espresso-950 pb-3 border-b border-[#E5DBD0]">
              2. Location & Operating Hours
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-sans text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Seating Capacity
                </label>
                <input
                  type="number"
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-mono text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Monday – Friday Hours
                </label>
                <input
                  type="text"
                  value={weekdaysHours}
                  onChange={(e) => setWeekdaysHours(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-mono text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Saturday – Sunday Hours
                </label>
                <input
                  type="text"
                  value={weekendsHours}
                  onChange={(e) => setWeekendsHours(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-mono text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Coffee Beans & Signature Drinks */}
          <div className="bg-white p-6 sm:p-8 border border-[#DFD2C0] space-y-6 shadow-sm">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-espresso-950 pb-3 border-b border-[#E5DBD0]">
              3. Featured Harvests & Drink Menu
            </h2>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Signature Bean Origins (Comma separated)
                </label>
                <input
                  type="text"
                  value={beansInput}
                  onChange={(e) => setBeansInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-sans text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
                <span className="text-[10px] text-espresso-500 font-mono mt-1 block">
                  Eligible for 15% whole-bean member retail discount.
                </span>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Specialty Drinks on Bar (Comma separated)
                </label>
                <input
                  type="text"
                  value={drinksInput}
                  onChange={(e) => setDrinksInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] font-sans text-xs text-espresso-950 focus:outline-none focus:border-espresso-950"
                />
                <span className="text-[10px] text-espresso-500 font-mono mt-1 block">
                  Covered by 1 Craft Beverage member credit ($3.50 wholesale reimbursement).
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5DBD0]">
            <Button type="submit" variant="primary" size="lg" className="shadow-md">
              <Save className="w-4 h-4 mr-2 text-caramel-400" />
              <span>SAVE CHANGES & UPDATE DOSSIER</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
