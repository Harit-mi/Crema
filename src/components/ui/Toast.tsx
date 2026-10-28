'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-caramel-600 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-white border-forest-600/30 text-espresso-900',
    error: 'bg-white border-red-500/30 text-espresso-900',
    info: 'bg-white border-caramel-500/30 text-espresso-900',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div
        className={`flex items-center justify-between p-4 rounded-xl border shadow-lg ${bgStyles[toast.type]}`}
      >
        <div className="flex items-center gap-3">
          {icons[toast.type]}
          <p className="text-sm font-medium leading-snug">{toast.message}</p>
        </div>
        <button
          onClick={clearToast}
          className="ml-3 text-espresso-600 hover:text-espresso-900 transition-colors p-1"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
