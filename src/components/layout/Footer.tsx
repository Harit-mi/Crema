import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso-950 text-cream-200 border-t border-espresso-900 pt-16 pb-14 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Ledger Strip */}
        <div className="pb-10 border-b border-espresso-900 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-black tracking-tightest text-cream-50 uppercase">
                CREMA
              </span>
              <span className="font-editorial italic text-xl text-caramel-400">
                collective
              </span>
            </div>
            <p className="text-xs text-cream-400 font-mono mt-1 tracking-wider uppercase">
              METRO CITY INDEPENDENT SPECIALTY ROASTERS ALLIANCE // PROTOCOL v1.0
            </p>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] text-cream-400 uppercase tracking-widest">
            <div>PILOT ROASTERS: <strong className="text-cream-50">05 HUBS</strong></div>
            <div>COUNTER SETTLEMENT: <strong className="text-caramel-400">$3.25–$3.75/CUP</strong></div>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-espresso-900 text-xs">
          {/* Col 1 */}
          <div className="space-y-3 font-mono">
            <span className="text-[10px] uppercase tracking-widest text-caramel-400 font-bold block">
              // 01 COFFEE LOVERS
            </span>
            <ul className="space-y-2 text-cream-300">
              <li>
                <Link href="/explore" className="hover:text-cream-50 transition-colors">
                  Roaster Directory & Lots
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-cream-50 transition-colors">
                  Membership Tiers & Pricing
                </Link>
              </li>
              <li>
                <Link href="/my-membership" className="hover:text-cream-50 transition-colors">
                  Digital Pass & Counter Token
                </Link>
              </li>
              <li>
                <Link href="/my-benefits" className="hover:text-cream-50 transition-colors">
                  Active Perks & Rollover Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3 font-mono">
            <span className="text-[10px] uppercase tracking-widest text-caramel-400 font-bold block">
              // 02 CAFE PARTNERS
            </span>
            <ul className="space-y-2 text-cream-300">
              <li>
                <Link href="/partner" className="hover:text-cream-50 transition-colors">
                  Partner Dashboard & KPIs
                </Link>
              </li>
              <li>
                <Link href="/partner/redemptions" className="hover:text-cream-50 transition-colors">
                  Barista Counter Validator
                </Link>
              </li>
              <li>
                <Link href="/partner/profile" className="hover:text-cream-50 transition-colors">
                  Roastery Profile & Hours
                </Link>
              </li>
              <li>
                <Link href="/partner/benefits" className="hover:text-cream-50 transition-colors">
                  Benefit Rules & Rates
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3 font-mono">
            <span className="text-[10px] uppercase tracking-widest text-caramel-400 font-bold block">
              // 03 PLATFORM DESK
            </span>
            <ul className="space-y-2 text-cream-300">
              <li>
                <Link href="/admin" className="hover:text-cream-50 transition-colors">
                  Roaster Network Admin Desk
                </Link>
              </li>
              <li>
                <Link href="/redemptions" className="hover:text-cream-50 transition-colors">
                  Verified Redemption Ledger
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-cream-50 transition-colors">
                  Account, Billing & Pause
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-caramel-400 font-bold block">
              // 04 PILOT CHARTER
            </span>
            <div className="p-3 bg-espresso-900 border border-espresso-800 text-[11px] text-cream-300 leading-relaxed font-mono">
              <strong className="text-cream-100 block mb-1">Authentic Economics:</strong>
              Crema Collective is not a loss-leader voucher app. We guarantee minimum $3.25–$3.75 wholesale reimbursement per redeemed craft drink, keeping independent roasters profitable.
            </div>
          </div>
        </div>

        {/* Bottom Colophon & Icon Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-cream-500">
          <div>
            © 2026 CREMA COLLECTIVE • ALL RIGHTS RESERVED • PROTOTYPE COHORT
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px]">
            <Link href="/membership" className="hover:text-cream-300">
              TERMS & ROLLOVER
            </Link>
            <span>•</span>
            <Link href="/account" className="hover:text-cream-300">
              ONE-CLICK CANCELLATION
            </Link>
            <span>•</span>
            <span className="text-cream-400">
              Icons by <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-cream-200">Freepik / Smashicons (Flaticon)</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
