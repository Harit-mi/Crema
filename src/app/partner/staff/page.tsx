'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { PartnerNav } from '../../../components/layout/PartnerNav';
import { Button } from '../../../components/ui/Button';
import {
  Users,
  ShieldCheck,
  Trash2,
  UserPlus,
  Key,
} from 'lucide-react';

export default function PartnerStaffManagementPage() {
  const { staff, addStaffMember, toggleStaffActive, deleteStaffMember, cafes, user } = useApp();

  const activeCafe = cafes.find((c) => c.id === user.activeCafeId) || cafes[0];
  const cafeStaff = staff.filter((s) => s.cafeId === activeCafe.id);

  // New staff modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<'barista' | 'manager'>('barista');
  const [newStaffPin, setNewStaffPin] = useState('2048');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) return;

    addStaffMember({
      cafeId: activeCafe.id,
      name: newStaffName.trim(),
      email: newStaffEmail.trim() || `${newStaffName.toLowerCase().replace(' ', '')}@${activeCafe.slug}.demo`,
      role: newStaffRole,
      active: true,
      shiftPin: newStaffPin,
    });

    setNewStaffName('');
    setNewStaffEmail('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      <PartnerNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#E5DBD0] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-widest text-caramel-600">
              <span className="w-2 h-2 bg-espresso-950"></span>
              <span>BARISTA ROSTER // PIN PROTOCOL</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-espresso-950">
              Barista Staff & Shift PINs
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600 mt-1 max-w-xl">
              Authorize baristas to operate the counter terminal. Redemptions are attributed to the active staff member for tip pooling and shift audit.
            </p>
          </div>

          <Button onClick={() => setShowAddModal(true)} variant="primary" size="md">
            <UserPlus className="w-4 h-4 mr-2 text-caramel-400" />
            <span>ADD BARISTA</span>
          </Button>
        </div>

        {/* Staff Roster Table */}
        <div className="bg-white border border-[#DFD2C0] divide-y divide-[#E5DBD0] font-mono text-xs shadow-sm">
          {cafeStaff.map((s) => (
            <div
              key={s.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF7F2]"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-display font-bold text-sm text-espresso-950 uppercase">{s.name}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#FAF7F2] border border-[#DFD2C0] text-espresso-700">
                    {s.role}
                  </span>
                  {!s.active && (
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-red-100 text-red-800">
                      INACTIVE
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-espresso-600 flex items-center gap-4">
                  <span>{s.email}</span>
                  <span className="text-caramel-700 font-bold">Shift PIN: {s.shiftPin}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStaffActive(s.id)}
                  className={`px-3 py-1 text-xs uppercase font-bold border transition-colors ${
                    s.active
                      ? 'bg-cream-100 text-espresso-900 border-[#DFD2C0] hover:border-espresso-950'
                      : 'bg-forest-900 text-cream-50 border-forest-950'
                  }`}
                >
                  {s.active ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => deleteStaffMember(s.id)}
                  className="p-1.5 text-espresso-400 hover:text-red-700 transition-colors"
                  title="Remove Barista"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add Barista */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white border-2 border-espresso-950 p-6 sm:p-8 w-full max-w-md space-y-5 shadow-2xl">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-caramel-600 block mb-1">
                  COUNTER ROSTER
                </span>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-espresso-950">
                  Add Barista to Roster
                </h3>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-espresso-950 focus:outline-none focus:border-espresso-950"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    Role on Bar
                  </label>
                  <select
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-espresso-950 focus:outline-none"
                  >
                    <option value="barista">Barista</option>
                    <option value="manager">Shift Lead / Manager</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-espresso-700 block mb-1">
                    4-Digit Counter PIN
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={newStaffPin}
                    onChange={(e) => setNewStaffPin(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DFD2C0] text-espresso-950 text-center font-bold tracking-widest focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5DBD0]">
                  <Button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Confirm & Add
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
