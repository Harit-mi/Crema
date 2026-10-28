'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Store,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Coffee,
  Users,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export default function PartnerApplyPage() {
  const { submitPartnerApplication, applications } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    cafeName: '',
    contactName: '',
    email: '',
    phone: '',
    neighborhood: '',
    address: '',
    currentRoaster: '',
    weeklyCoffeeVolume: '300-600 cups',
    seatingCapacity: 35,
    hasWifi: true,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cafeName || !formData.email || !formData.contactName) {
      alert('Please fill in required fields (Cafe Name, Contact Name, Email).');
      return;
    }

    submitPartnerApplication({
      cafeName: formData.cafeName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      neighborhood: formData.neighborhood || 'Historic Arts District',
      address: formData.address || '100 Main Street',
      currentRoaster: formData.currentRoaster || 'In-House Micro Roaster',
      weeklyCoffeeVolume: formData.weeklyCoffeeVolume,
      seatingCapacity: Number(formData.seatingCapacity),
      hasWifi: formData.hasWifi,
      notes: formData.notes,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header & Value Prop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <Badge variant="caramel" size="sm">
            Pilot Partner Intake
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-espresso-950 tracking-tight leading-tight">
            Partner with Crema Collective.
          </h1>
          <p className="text-base text-espresso-700 leading-relaxed">
            We are curating a tight cohort of 8 exceptional independent roasters for our pilot urban district. We guarantee high-margin foot traffic, direct beverage reimbursement, and zero hardware integration headaches.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-espresso-900 block">Territory Exclusivity</strong>
                <p className="text-xs text-espresso-600">
                  We cap partners to 1 roaster per 4-block radius to prevent internal cannibalization.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-espresso-900 block">Prompt Bi-Weekly Direct ACH</strong>
                <p className="text-xs text-espresso-600">
                  Every cup redeemed is reimbursed at $3.25 to $3.75, paid out every 14 days without chargeback risk.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-espresso-900 block">High-Margin Food Attach</strong>
                <p className="text-xs text-espresso-600">
                  Members spend an average of $4.80 on pastries, breakfast sandwiches, and whole beans when picking up their drink.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-forest-100 text-forest-800 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-espresso-950">
                Application Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-espresso-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.contactName}</strong>. Our head curator will review {formData.cafeName}&apos;s profile and reach out within 48 hours to schedule a coffee tasting visit.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      cafeName: '',
                      contactName: '',
                      email: '',
                      phone: '',
                      neighborhood: '',
                      address: '',
                      currentRoaster: '',
                      weeklyCoffeeVolume: '300-600 cups',
                      seatingCapacity: 35,
                      hasWifi: true,
                      notes: '',
                    });
                  }}
                  variant="outline"
                  size="sm"
                >
                  Submit Another
                </Button>
                <Link href="/admin">
                  <Button variant="forest" size="sm">
                    View in Admin Moderation
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-cream-200 pb-3 mb-2">
                <h3 className="font-serif text-xl font-bold text-espresso-950">
                  Pilot Partner Application
                </h3>
                <p className="text-xs text-espresso-600">No commitment required. 100% free pilot.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Cafe Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cafeName}
                    onChange={(e) => setFormData({ ...formData, cafeName: e.target.value })}
                    placeholder="e.g. Hearth & Kettle"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Owner or GM Name"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="owner@yourcafe.com"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Neighborhood / District
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="e.g. Arts District"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Primary Coffee Roaster Sourced
                  </label>
                  <input
                    type="text"
                    value={formData.currentRoaster}
                    onChange={(e) => setFormData({ ...formData, currentRoaster: e.target.value })}
                    placeholder="In-house or Roaster Partner"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Weekly Coffee Volume
                  </label>
                  <select
                    value={formData.weeklyCoffeeVolume}
                    onChange={(e) =>
                      setFormData({ ...formData, weeklyCoffeeVolume: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  >
                    <option value="Under 300 cups">Under 300 cups</option>
                    <option value="300-600 cups">300 – 600 cups</option>
                    <option value="600-1000 cups">600 – 1,000 cups</option>
                    <option value="1000+ cups">1,000+ cups</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.seatingCapacity}
                    onChange={(e) =>
                      setFormData({ ...formData, seatingCapacity: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                  Additional Notes or Cafe Story
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your bar setup, signature drinks, or bakery partner..."
                  className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-xs text-espresso-950 focus:outline-none focus:ring-2 focus:ring-forest-700"
                />
              </div>

              <Button type="submit" variant="forest" fullWidth size="lg" className="shadow-md">
                <span>Submit Partner Application</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
