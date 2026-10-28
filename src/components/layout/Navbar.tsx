'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { UserRole } from '../../types';
import {
  Compass,
  Store,
  ShieldCheck,
  Menu,
  X,
  User,
  Sparkles,
  Gift,
  ArrowRight,
  Check,
} from 'lucide-react';
import { IconQrToken } from '../ui/FlaticonIcons';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, activeRole, setActiveRole, setUserSubscriptionStatus } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const navLinks = [
    { label: 'Directory', href: '/explore', icon: Compass },
    { label: 'Membership Tiers', href: '/membership', icon: Sparkles },
    { label: 'Member Benefits', href: '/my-benefits', icon: Gift },
    { label: 'Partner Desk', href: '/partner', icon: Store },
    { label: 'Administration', href: '/admin', icon: ShieldCheck },
  ];

  const isActive = (href: string) => {
    if (href === '/explore') return pathname === '/explore' || pathname.startsWith('/cafes');
    if (href === '/partner') return pathname.startsWith('/partner');
    if (href === '/membership') return pathname.startsWith('/membership');
    return pathname === href;
  };

  const sub = user.subscription;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md hairline-b">
        {/* Top Ticker Bar: Pilot Cohort Transparency */}
        <div className="bg-espresso-950 text-cream-200 py-1.5 px-4 text-[11px] font-mono tracking-widest uppercase flex items-center justify-between border-b border-espresso-900">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-caramel-400 rounded-full animate-pulse"></span>
            <span className="text-cream-400">METRO PILOT // BATCH 2026.1</span>
            <span className="text-cream-500 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-cream-300">5 CURATED ROASTERS • DIRECT COUNTER VERIFICATION</span>
          </div>
          <button
            onClick={() => setRoleModalOpen(true)}
            className="flex items-center gap-1.5 text-caramel-300 hover:text-caramel-200 transition-colors uppercase font-mono text-[10px] sm:text-[11px] flex-shrink-0"
          >
            <span>ROLE: <strong>{activeRole.replace('_', ' ')}</strong></span>
            <span className="text-cream-500">[SWITCH]</span>
          </button>
        </div>

        {/* Main Masthead Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Editorial Signature */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-baseline gap-3 group">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tightest text-espresso-950 group-hover:text-forest-900 transition-colors">
                  CREMA
                </span>
                <span className="font-editorial italic text-lg sm:text-xl text-caramel-600 font-normal">
                  collective
                </span>
              </Link>
              <div className="hidden xl:flex items-center border-l border-[#E5DBD0] pl-4 py-1 text-[10px] font-mono uppercase tracking-widest text-espresso-600">
                Independent Specialty Roasters Club
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-display">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors border ${
                      active
                        ? 'border-espresso-950 bg-espresso-950 text-cream-50'
                        : 'border-transparent text-espresso-800 hover:border-[#DFD2C0] hover:bg-[#F2EBE0]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Bar */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Digital Pass Quick Stub Button */}
              <Link
                href="/my-membership"
                className="flex items-center gap-2.5 px-4 py-2 border border-espresso-950 bg-espresso-950 text-cream-50 text-xs font-display font-bold uppercase tracking-wider hover:bg-forest-900 hover:border-forest-900 transition-colors shadow-sm"
              >
                <IconQrToken size={14} className="text-caramel-400" />
                <span>MEMBER PASS</span>
                {sub?.status === 'active' && (
                  <span className="px-1.5 py-0.2 bg-caramel-500 text-espresso-950 font-mono text-[10px] font-bold">
                    {sub.creditsRemaining} CR
                  </span>
                )}
              </Link>

              {/* User Account Link */}
              <Link
                href="/account"
                className="p-2 border border-[#DFD2C0] text-espresso-800 hover:border-espresso-950 hover:text-espresso-950 transition-colors"
                title="Account & Subscription"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                href="/my-membership"
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-espresso-950 text-cream-50 text-[11px] font-mono font-bold uppercase border border-espresso-950"
              >
                <IconQrToken size={14} className="text-caramel-400" />
                <span>PASS</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 border border-[#DFD2C0] text-espresso-950"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden hairline-t bg-[#FAF7F2] px-4 pt-4 pb-6 space-y-4">
            <div className="p-3 bg-[#F2EBE0] border border-[#DFD2C0] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-espresso-600 block">
                Active Perspective
              </span>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-espresso-950 uppercase">
                  {activeRole.replace('_', ' ')}
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setRoleModalOpen(true);
                  }}
                  className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold border border-espresso-900 bg-espresso-900 text-cream-50"
                >
                  Change Role
                </button>
              </div>
            </div>

            <div className="space-y-1 font-display">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-espresso-950 hover:bg-[#F2EBE0] border-b border-[#E5DBD0]"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-caramel-600" />
                </Link>
              ))}
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-display uppercase tracking-wider">
              <Link
                href="/my-benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 border border-[#DFD2C0] text-center font-bold text-espresso-900"
              >
                My Benefits
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 border border-[#DFD2C0] text-center font-bold text-espresso-900"
              >
                Account Desk
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Persona Switcher Modal */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#FAF7F2] border-2 border-espresso-950 w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setRoleModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-espresso-600 hover:text-espresso-950"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 mb-1">
                DEMO ENVIRONMENT // MULTI-SIDED SIMULATION
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-espresso-950 uppercase">
                Select Viewport Perspective
              </h3>
              <p className="text-xs text-espresso-700 mt-1">
                Crema Collective operates a multi-sided network. Switch perspective to inspect the customer, counter staff, roastery manager, or platform administrator flows.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  role: 'customer' as UserRole,
                  title: 'Discerning Member (Customer)',
                  desc: 'Clara S. • 8-cup craft subscription, dynamic TOTP pass, and cafe discovery.',
                  href: '/my-membership',
                },
                {
                  role: 'cafe_staff' as UserRole,
                  title: 'Barista Counter Terminal (Staff)',
                  desc: 'Amber & Ember shift • 6-digit token validation, duplicate prevention, payout audit.',
                  href: '/partner/redemptions',
                },
                {
                  role: 'cafe_manager' as UserRole,
                  title: 'Roastery Partner Desk (Manager)',
                  desc: 'Manage profile, operating hours, active benefits, and staff shift PINs.',
                  href: '/partner',
                },
                {
                  role: 'admin' as UserRole,
                  title: 'Network Administration (Curator)',
                  desc: 'Roaster onboarding queue, plan configuration, dispute mediation, and audit logs.',
                  href: '/admin',
                },
              ].map((item) => (
                <div
                  key={item.role}
                  onClick={() => {
                    setActiveRole(item.role);
                    setRoleModalOpen(false);
                  }}
                  className={`p-4 border cursor-pointer transition-all ${
                    activeRole === item.role
                      ? 'border-espresso-950 bg-espresso-950 text-cream-50'
                      : 'border-[#DFD2C0] bg-white hover:border-espresso-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm uppercase tracking-wide">
                      {item.title}
                    </span>
                    {activeRole === item.role && (
                      <span className="font-mono text-[10px] bg-caramel-500 text-espresso-950 px-1.5 py-0.5 font-bold uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      activeRole === item.role ? 'text-cream-300' : 'text-espresso-600'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Subscription Status Simulator */}
            <div className="pt-4 border-t border-[#E5DBD0] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-espresso-600 block">
                Simulate Clara&apos;s Membership Status
              </span>
              <div className="grid grid-cols-4 gap-2">
                {(['active', 'trial', 'past_due', 'expired'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setUserSubscriptionStatus(st)}
                    className={`py-1.5 px-2 text-[10px] font-mono uppercase font-bold border transition-colors ${
                      sub?.status === st
                        ? 'bg-forest-900 border-forest-900 text-cream-50'
                        : 'border-[#DFD2C0] bg-[#FAF7F2] text-espresso-700 hover:border-espresso-900'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
