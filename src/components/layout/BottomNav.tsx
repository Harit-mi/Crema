'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { Compass, QrCode, Gift, History, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { user, activeRole } = useApp();

  // If active role is partner or admin on non-customer routes, do not show customer bottom nav
  if (activeRole !== 'customer' && (pathname.startsWith('/partner') || pathname.startsWith('/admin'))) {
    return null;
  }

  const navItems = [
    { label: 'Directory', href: '/explore', icon: Compass },
    { label: 'Perks', href: '/my-benefits', icon: Gift },
    {
      label: 'Pass',
      href: '/my-membership',
      icon: QrCode,
      isSpecial: true,
      badge: user.subscription?.status === 'active' ? user.subscription.creditsRemaining : undefined,
    },
    { label: 'Ledger', href: '/redemptions', icon: History },
    { label: 'Desk', href: '/account', icon: User },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#DFD2C0] py-1.5 px-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === '/explore' && pathname.startsWith('/cafes'));

          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-4 relative group"
              >
                <div
                  className={`w-12 h-12 border-2 flex items-center justify-center transition-transform active:scale-95 shadow-md ${
                    isActive
                      ? 'bg-forest-900 border-forest-950 text-cream-50'
                      : 'bg-espresso-950 border-espresso-950 text-cream-50'
                  }`}
                >
                  <Icon className="w-5 h-5 text-caramel-400" />
                </div>
                <span className="text-[9px] font-mono font-bold mt-1 uppercase tracking-wider text-espresso-950">
                  {item.label}
                </span>
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-caramel-500 text-espresso-950 font-mono text-[9px] font-black border border-espresso-950">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 transition-colors ${
                isActive
                  ? 'text-espresso-950 font-bold'
                  : 'text-espresso-600 hover:text-espresso-950'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[9px] font-mono uppercase tracking-wider leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
