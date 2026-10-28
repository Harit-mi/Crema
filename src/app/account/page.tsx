'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import {
  User,
  CreditCard,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  ArrowRight,
} from 'lucide-react';

export default function AccountPage() {
  const { user, cancelSubscription, resumeSubscription, setUserSubscriptionStatus, activeRole, setActiveRole, showToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  const sub = user.subscription;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Profile information updated', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 font-sans">
      {/* Header Profile Box */}
      <div className="bg-white p-6 sm:p-8 border border-[#DFD2C0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-espresso-950 text-cream-50 font-display text-2xl font-black flex items-center justify-center border border-espresso-900 shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-espresso-950">{user.name}</h1>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-forest-900 text-cream-50 font-bold">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-espresso-600 font-mono mt-0.5">{user.email}</p>
            <span className="text-[10px] text-espresso-500 font-mono uppercase tracking-wider">
              MEMBER SINCE {user.memberSince.toUpperCase()}
            </span>
          </div>
        </div>

        <Link href="/my-membership">
          <Button variant="primary" size="md">
            <QrCode className="w-4 h-4 mr-2 text-caramel-400" />
            <span>Open Member Pass</span>
          </Button>
        </Link>
      </div>

      {/* Subscription & Billing Card */}
      <div className="bg-white p-6 sm:p-8 border border-[#DFD2C0] space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DBD0]">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
              Subscription & Membership Tier
            </h2>
            <p className="text-xs text-espresso-600 font-sans">
              Manage your plan, renewal interval, and payment credentials.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-espresso-950 bg-espresso-950 text-cream-50">
            {sub.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-4 bg-[#FAF7F2] border border-[#DFD2C0] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500 block">
              ACTIVE PROTOCOL TIER
            </span>
            <div className="font-display text-lg font-bold uppercase text-espresso-950">{sub.planName}</div>
            <p className="text-espresso-700 font-sans">
              {sub.creditsRemaining} of {sub.creditsTotal} beverage credits remaining this cycle.
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#DFD2C0] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-500 block">
              BILLING DATES
            </span>
            <div className="text-espresso-950 font-bold">
              {sub.cycleStartDate} – {sub.cycleEndDate}
            </div>
            <p className="text-espresso-600 font-sans">
              Automatic renewal: {sub.autoRenew ? 'Active' : 'Turned off (expires at cycle end)'}
            </p>
          </div>
        </div>

        {/* Cancellation & Pause Actions */}
        <div className="pt-4 border-t border-[#E5DBD0] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="font-bold text-espresso-950 uppercase block">1-CLICK CANCELLATION GUARANTEE</span>
            <span className="text-[11px] text-espresso-600 font-sans">
              Pause or cancel anytime without call centers or retention penalties.
            </span>
          </div>

          {sub.autoRenew ? (
            <Button onClick={cancelSubscription} variant="outline" size="sm" className="w-full sm:w-auto">
              Cancel Auto-Renew
            </Button>
          ) : (
            <Button onClick={resumeSubscription} variant="primary" size="sm" className="w-full sm:w-auto">
              Turn Auto-Renew Back On
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
