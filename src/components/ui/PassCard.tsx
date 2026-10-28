'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { IconVerifiedProof, IconCoffeeCup } from './FlaticonIcons';

export const PassCard: React.FC<{ onRedeemClick?: () => void }> = ({ onRedeemClick }) => {
  const { user, activePassToken, cafes, validateAndRedeemToken } = useApp();
  const [selectedCafeId, setSelectedCafeId] = useState(cafes[0]?.id || '');
  const [itemNote, setItemNote] = useState('Oat Flat White (Single Origin)');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const sub = user.subscription;
  const creditsLeft = sub?.creditsRemaining ?? 0;
  const progressPct = ((60 - activePassToken.secondsRemaining) / 60) * 100;

  const handleQuickRedeem = () => {
    setIsRedeeming(true);
    setSimResult(null);
    setTimeout(() => {
      const res = validateAndRedeemToken({
        tokenCode: activePassToken.code,
        cafeId: selectedCafeId,
        benefitId: 'ben_daily_craft',
        staffName: 'Barista Elena (Counter)',
        customNote: itemNote,
      });
      setIsRedeeming(false);
      setSimResult(res.message);
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto font-sans">
      {/* Tactile Letterpress Pass Stub */}
      <div className="bg-[#17110E] text-cream-50 border-2 border-espresso-900 shadow-2xl relative overflow-hidden">
        {/* Top Paper Header Strip */}
        <div className="p-5 sm:p-6 border-b border-espresso-800/80 bg-[#1D1613]">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] tracking-widest uppercase text-caramel-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                <span>AUTHENTIC COUNTER PASS</span>
              </div>
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-cream-50">
                CREMA COLLECTIVE
              </h3>
              <p className="font-editorial italic text-xs text-cream-400">
                {sub?.planName || 'Daily Craft Pass'} • Member: {user.name}
              </p>
            </div>

            <div className="text-right font-mono">
              <span className="text-[9px] uppercase tracking-widest text-cream-400 block">
                CREDITS
              </span>
              <span className="text-2xl font-black text-caramel-400">
                {creditsLeft}
                <span className="text-xs text-cream-500 font-normal"> / {sub?.creditsTotal || 8}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Perforation Punch Notch Divider */}
        <div className="relative flex items-center justify-between px-3 py-1 bg-[#17110E]">
          <div className="w-4 h-4 rounded-full bg-[#FAF7F2] -ml-5 border border-espresso-900"></div>
          <div className="flex-1 border-b border-dashed border-espresso-700/80 mx-2"></div>
          <div className="font-mono text-[9px] text-cream-500 uppercase tracking-widest px-1">
            PERFORATION // 60S ROTATING STUB
          </div>
          <div className="flex-1 border-b border-dashed border-espresso-700/80 mx-2"></div>
          <div className="w-4 h-4 rounded-full bg-[#FAF7F2] -mr-5 border border-espresso-900"></div>
        </div>

        {/* Dynamic Anti-Fraud Verification Panel */}
        <div className="p-6 space-y-5 bg-[#17110E]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cream-300 text-[11px] uppercase tracking-wider">
              <IconVerifiedProof size={14} className="text-emerald-400" />
              Dynamic Single-Use Token
            </span>
            <span className="text-caramel-400 text-[11px] font-bold flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              {activePassToken.secondsRemaining}s
            </span>
          </div>

          {/* Large High-Contrast Display Token */}
          <div className="p-4 bg-espresso-950 border border-espresso-800 text-center space-y-1">
            <div className="font-mono text-4xl sm:text-5xl font-black tracking-widest text-cream-50">
              {activePassToken.code}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-cream-400">
              Present live screen at partner register • Replaced every 60s
            </p>
          </div>

          {/* Countdown Linear Bar */}
          <div className="w-full bg-espresso-900 h-1 overflow-hidden">
            <div
              className="bg-caramel-500 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${100 - progressPct}%` }}
            />
          </div>

          {/* Anti-Fraud Disclaimer */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cream-400">
            <AlertCircle className="w-3.5 h-3.5 text-caramel-400 flex-shrink-0" />
            <span>Static screenshots fail automated counter validation.</span>
          </div>

          {/* Sandbox Counter Simulation Trigger */}
          <div className="pt-3 border-t border-espresso-800/80 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-cream-400">
              <span>Test Counter Tap (Sandbox)</span>
              <span className="text-caramel-400">Amber & Ember</span>
            </div>
            <button
              onClick={handleQuickRedeem}
              disabled={isRedeeming || creditsLeft <= 0}
              className="w-full py-2.5 px-3 bg-forest-900 hover:bg-forest-800 text-cream-50 font-display text-xs font-bold uppercase tracking-wider border border-forest-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <IconCoffeeCup size={14} className="text-caramel-300" />
              <span>{isRedeeming ? 'Validating on Barista Terminal...' : 'Simulate Counter Redemption'}</span>
            </button>
            {simResult && (
              <div className="p-2 bg-espresso-900 border border-emerald-500/40 text-[11px] font-mono text-emerald-400">
                ✓ {simResult}
              </div>
            )}
          </div>
        </div>

        {/* Ticket Bottom Colophon */}
        <div className="px-6 py-3 bg-[#110D0B] border-t border-espresso-900 flex items-center justify-between text-[10px] font-mono text-cream-500 uppercase tracking-widest">
          <span>PILOT PASS // CC-2026</span>
          <span>ACH GUARANTEE: $3.50/CUP</span>
        </div>
      </div>
    </div>
  );
};
