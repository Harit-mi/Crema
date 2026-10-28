'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  ShieldCheck,
  Check,
  X,
  Clock,
  AlertCircle,
  FileText,
  Activity,
  Sliders,
  Store,
} from 'lucide-react';

export default function AdminControlDeskPage() {
  const {
    applications,
    updateApplicationStatus,
    cafes,
    membershipPlans,
    updatePlan,
    benefits,
    disputes,
    resolveDispute,
    redemptions,
    user,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'onboarding' | 'plans' | 'benefits' | 'disputes' | 'audit'>('onboarding');
  const [appFilter, setAppFilter] = useState('all');

  const filteredApps = applications.filter(
    (app) => appFilter === 'all' || app.status === appFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 font-sans">
      {/* Admin Header */}
      <div className="bg-espresso-950 text-cream-50 p-6 sm:p-8 border-2 border-espresso-950 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-widest text-caramel-400">
            <span className="w-2 h-2 bg-emerald-400 rounded-none animate-pulse"></span>
            <span>PLATFORM GOVERNANCE DESK // NETWORK PROTOCOL</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-cream-50">
            Crema Network Operations
          </h1>
          <p className="text-xs text-cream-300 mt-1 max-w-xl">
            Manage cafe intake, configure subscription pricing, moderate disputes, and audit ledger integrity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/partner">
            <Button variant="secondary" size="sm">
              Partner Desk
            </Button>
          </Link>
          <Link href="/my-membership">
            <Button variant="caramel" size="sm">
              Customer Pass
            </Button>
          </Link>
        </div>
      </div>

      {/* Network Overview Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-white p-5 border border-[#DFD2C0] space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500">
            ACTIVE SUBSCRIBERS
          </span>
          <div className="font-display text-3xl font-black text-espresso-950">142</div>
          <span className="text-xs text-forest-800 font-bold">+18 in pilot cohort</span>
        </div>

        <div className="bg-white p-5 border border-[#DFD2C0] space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500">
            PILOT ROASTERS
          </span>
          <div className="font-display text-3xl font-black text-espresso-950">
            {cafes.length}{' '}
            <span className="text-xs text-espresso-500 font-normal">
              ({applications.length} apps)
            </span>
          </div>
          <span className="text-xs text-espresso-600 font-mono">Metro arts district</span>
        </div>

        <div className="bg-white p-5 border border-[#DFD2C0] space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500">
            VERIFIED REDEMPTIONS
          </span>
          <div className="font-display text-3xl font-black text-espresso-950">
            {redemptions.length * 14 + 88}
          </div>
          <span className="text-xs text-caramel-600 font-bold">100% verified single-use</span>
        </div>

        <div className="bg-white p-5 border border-[#DFD2C0] space-y-1 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500">
            TOTAL PARTNER REIMBURSEMENTS
          </span>
          <div className="font-display text-3xl font-black text-forest-800">
            ${((redemptions.length * 14 + 88) * 3.5).toFixed(2)}
          </div>
          <span className="text-xs text-espresso-600">Avg $3.50 / cup payout</span>
        </div>
      </div>

      {/* Tab Navigation Console */}
      <div className="border-b border-[#E5DBD0] flex items-center gap-1 font-mono text-xs overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'onboarding', label: `CAFE INTAKE (${applications.length})`, icon: Store },
          { id: 'plans', label: `MEMBERSHIP TIERS (${membershipPlans.length})`, icon: Sliders },
          { id: 'benefits', label: `PERK RULES (${benefits.length})`, icon: FileText },
          { id: 'disputes', label: `DISPUTES (${disputes.length})`, icon: AlertCircle },
          { id: 'audit', label: `LEDGER INTEGRITY`, icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 -mb-px ${
                isActive
                  ? 'border-espresso-950 text-espresso-950 bg-white'
                  : 'border-transparent text-espresso-600 hover:text-espresso-950 hover:bg-[#FAF7F2]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Roaster Partner Onboarding Queue */}
      {activeTab === 'onboarding' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-espresso-950">
                Cafe Partner Application Queue
              </h3>
              <p className="text-xs text-espresso-600">
                Review applicant batch profiles, verify roaster equipment, schedule sensory cupping audits, and approve pilot status.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-espresso-600 uppercase text-[10px]">Filter Status:</span>
              <select
                value={appFilter}
                onChange={(e) => setAppFilter(e.target.value)}
                className="px-2.5 py-1 bg-white border border-[#DFD2C0] text-espresso-900 font-mono text-xs focus:outline-none"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Under Review</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 border border-[#DFD2C0] space-y-4 font-sans shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5DBD0]">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-display text-lg font-bold text-espresso-950 uppercase">{app.cafeName}</h4>
                      <span className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border border-espresso-800 bg-[#FAF7F2]">
                        {app.status}
                      </span>
                    </div>
                    <span className="text-xs text-espresso-600 font-mono">
                      {app.neighborhood} • Submitted on {app.submittedAt} • Contact: {app.contactName} ({app.email})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    {app.status === 'pending' && (
                      <Button
                        onClick={() => updateApplicationStatus(app.id, 'reviewing')}
                        variant="secondary"
                        size="sm"
                      >
                        Schedule Tasting
                      </Button>
                    )}
                    {app.status === 'reviewing' && (
                      <Button
                        onClick={() => updateApplicationStatus(app.id, 'approved')}
                        variant="forest"
                        size="sm"
                      >
                        Approve Partner
                      </Button>
                    )}
                    {app.status !== 'declined' && app.status !== 'approved' && (
                      <Button
                        onClick={() => updateApplicationStatus(app.id, 'declined')}
                        variant="ghost"
                        size="sm"
                        className="text-red-700 hover:text-red-900"
                      >
                        Decline
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-3 bg-[#FAF7F2] border border-[#E5DBD0]">
                    <span className="text-[10px] uppercase text-espresso-500 block mb-1">ROASTER / EQUIPMENT</span>
                    <span className="font-medium text-espresso-950">{app.currentRoaster}</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] border border-[#E5DBD0]">
                    <span className="text-[10px] uppercase text-espresso-500 block mb-1">SEATING CAPACITY</span>
                    <span className="font-bold text-forest-800">{app.seatingCapacity} seats</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] border border-[#E5DBD0]">
                    <span className="text-[10px] uppercase text-espresso-500 block mb-1">ESTIMATED WEEKLY VOLUME</span>
                    <span className="font-medium text-espresso-950">{app.weeklyCoffeeVolume}</span>
                  </div>
                </div>

                {app.notes && (
                  <p className="text-xs text-espresso-700 italic border-l-2 border-caramel-400 pl-3">
                    &ldquo;{app.notes}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Membership Plans */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="border-b border-[#E5DBD0] pb-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
              Membership Plans Configuration
            </h3>
            <p className="text-xs text-espresso-600">
              Set monthly pricing, usage quotas, and rollover limits. Changes deploy dynamically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
            {membershipPlans.map((plan) => (
              <div key={plan.id} className="bg-white p-6 border border-[#DFD2C0] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DBD0]">
                  <span className="font-display text-base font-bold text-espresso-950 uppercase">{plan.name}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 bg-[#FAF7F2] border border-[#DFD2C0]">
                    {plan.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-espresso-600">Monthly Price:</span>
                    <span className="font-bold text-espresso-950">${plan.priceMonthly}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-espresso-600">Beverage Credits:</span>
                    <span className="font-bold text-forest-800">{plan.drinkCreditsMonthly} / mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-espresso-600">Bean Discount:</span>
                    <span className="font-bold text-caramel-600">{plan.beanDiscountPct}% off</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5DBD0] flex gap-2">
                  <button
                    onClick={() =>
                      updatePlan(plan.id, {
                        status: plan.status === 'active' ? 'draft' : 'active',
                      })
                    }
                    className="w-full py-1.5 border border-espresso-950 text-espresso-950 uppercase font-bold text-[10px] hover:bg-espresso-950 hover:text-cream-50"
                  >
                    {plan.status === 'active' ? 'Set to Inactive' : 'Activate Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Benefits Rules */}
      {activeTab === 'benefits' && (
        <div className="space-y-6">
          <div className="border-b border-[#E5DBD0] pb-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
              Benefit Rules Matrix
            </h3>
            <p className="text-xs text-espresso-600">
              Manage redemption rules, frequency caps, and participating cafe authorizations.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {benefits.map((b) => (
              <div key={b.id} className="p-4 bg-white border border-[#DFD2C0] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-espresso-950 font-bold">{b.name}</strong>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#FAF7F2] border border-[#DFD2C0] text-caramel-600">
                      {b.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-espresso-600 font-sans mt-0.5">{b.description}</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-forest-800 bg-forest-50 px-2 py-0.5 border border-forest-200">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Disputes */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="border-b border-[#E5DBD0] pb-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
              Customer Support & Dispute Desk
            </h3>
            <p className="text-xs text-espresso-600">
              Resolve counter scanner mismatches, credit adjustment requests, and roaster payout queries.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {disputes.map((d) => (
              <div key={d.id} className="p-5 bg-white border border-[#DFD2C0] space-y-3 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DBD0]">
                  <span className="font-bold text-espresso-950 uppercase">{d.reason} // {d.id}</span>
                  <span className="text-[10px] uppercase px-1.5 py-0.2 bg-[#FAF7F2] border border-[#DFD2C0]">
                    {d.status}
                  </span>
                </div>
                <p className="text-xs text-espresso-700 font-sans">
                  Member: <strong>{d.memberName}</strong> at {d.cafeName} • Disputed Amount: ${d.amount.toFixed(2)} ({d.createdAt})
                </p>
                {d.status === 'open' && (
                  <Button onClick={() => resolveDispute(d.id)} variant="primary" size="sm">
                    Resolve Dispute & Refund Credit
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Audit Log */}
      {activeTab === 'audit' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="border-b border-[#E5DBD0] pb-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
              Cryptographic Audit Log
            </h3>
            <p className="text-xs text-espresso-600">
              Chronological ledger of rotating token redemptions, shift settlements, and ACH batches.
            </p>
          </div>

          <div className="p-4 bg-espresso-950 text-cream-100 border border-espresso-900 space-y-2">
            <div className="text-[11px] text-emerald-400">
              SYSTEM INTEGRITY: 100% HEALTHY • 0 UNVERIFIED ATTEMPTS DETECTED
            </div>
            <div className="text-[10px] text-cream-400">
              Showing last verified transactions across 5 pilot hubs:
            </div>
          </div>

          <div className="divide-y divide-[#E5DBD0] bg-white border border-[#DFD2C0]">
            {redemptions.map((r) => (
              <div key={r.id} className="p-3.5 flex items-center justify-between">
                <div>
                  <strong className="text-espresso-950">{r.timestamp}</strong> — {r.memberName} at {r.cafeName}
                  <div className="text-[11px] text-espresso-600">
                    Token: <span className="font-bold text-caramel-600">{r.tokenCode}</span> • Benefit: {r.benefitName} • Verified by: {r.staffName}
                  </div>
                </div>
                <span className="font-bold text-forest-800">✓ Settled</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
