'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import {
  Store,
  QrCode,
  Settings,
  Users,
  TrendingUp,
  Sliders,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const PartnerNav: React.FC = () => {
  const pathname = usePathname();
  const { cafes, user, activeRole } = useApp();

  const activeCafe = cafes.find((c) => c.id === user.activeCafeId) || cafes[0];

  const links = [
    { label: 'Counter Terminal', href: '/partner/redemptions', icon: QrCode, badge: 'LIVE' },
    { label: 'Shift KPIs', href: '/partner', icon: TrendingUp },
    { label: 'Roastery Profile & Hours', href: '/partner/profile', icon: Settings },
    { label: 'Benefit Permissions', href: '/partner/benefits', icon: Sliders },
    { label: 'Staff PINs', href: '/partner/staff', icon: Users },
  ];

  return (
    <div className="bg-espresso-950 text-cream-50 border-b border-espresso-900 sticky top-[6.5rem] sm:top-24 z-30 shadow-md w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3 min-w-0">
          {/* Cafe & Role Info */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-8 h-8 border border-caramel-500/40 bg-espresso-900 text-caramel-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
              <Store className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold tracking-tight text-cream-100 uppercase truncate">
                  {activeCafe.name}
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 border border-caramel-500/60 text-caramel-300 uppercase tracking-widest">
                  {activeRole === 'cafe_manager' ? 'MANAGER DESK' : 'COUNTER TERMINAL'}
                </span>
              </div>
              <span className="text-[10px] text-cream-400 font-mono tracking-wider block truncate">
                {activeCafe.neighborhood.toUpperCase()} // DIRECT SETTLEMENT: ${activeCafe.creditReimbursementRate.toFixed(2)}/CUP
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto min-w-0">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex-shrink-0 border ${
                    isActive
                      ? 'bg-cream-50 text-espresso-950 border-cream-50'
                      : 'text-cream-300 hover:text-cream-50 border-transparent hover:border-espresso-700 hover:bg-espresso-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1 py-0.2 bg-emerald-500 text-espresso-950 font-mono text-[9px] font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
