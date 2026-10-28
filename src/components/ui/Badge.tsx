import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'forest' | 'caramel' | 'espresso' | 'cream' | 'outline' | 'warning' | 'terroir';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cream',
  size = 'sm',
  className,
}) => {
  const baseStyles =
    'inline-flex items-center font-mono font-semibold tracking-widest uppercase transition-colors';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 border',
    md: 'text-[11px] px-2.5 py-1 border',
  };

  const variantStyles = {
    cream: 'bg-[#F2EBE0] text-espresso-800 border-[#DFD2C0]',
    forest: 'bg-forest-900 text-cream-50 border-forest-800',
    caramel: 'bg-caramel-50 text-caramel-700 border-caramel-400',
    espresso: 'bg-espresso-950 text-cream-100 border-espresso-800',
    warning: 'bg-amber-50 text-amber-900 border-amber-400',
    outline: 'bg-transparent text-espresso-700 border-espresso-300',
    terroir: 'bg-forest-50 text-forest-800 border-forest-300',
  };

  return (
    <span className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
      {children}
    </span>
  );
};
