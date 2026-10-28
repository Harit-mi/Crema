import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'forest' | 'outline' | 'ghost' | 'caramel' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-display font-semibold select-none rounded-[2px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none cursor-pointer';

  const sizeStyles = {
    xs: 'text-[11px] h-7 px-2.5 gap-1.5 font-mono tracking-wider',
    sm: 'text-xs h-8.5 px-3.5 gap-1.5 tracking-wider font-semibold',
    md: 'text-xs sm:text-sm h-10 px-5 gap-2 tracking-wide font-semibold',
    lg: 'text-sm sm:text-base h-12 px-6 gap-2.5 tracking-wide font-bold',
    xl: 'text-base sm:text-lg h-14 px-8 gap-3 tracking-wider font-bold',
  };

  const variantStyles = {
    primary:
      'bg-espresso-950 text-cream-50 hover:bg-espresso-900 border border-espresso-950 btn-tactile',
    forest:
      'bg-forest-900 text-cream-50 hover:bg-forest-800 border border-forest-950 btn-tactile',
    caramel:
      'bg-caramel-500 text-cream-50 hover:bg-caramel-600 border border-caramel-700 btn-tactile btn-tactile-caramel',
    secondary:
      'bg-cream-100 text-espresso-950 hover:bg-cream-200 border border-[#DFD2C0] hover:border-espresso-950 btn-tactile btn-tactile-secondary',
    outline:
      'bg-transparent text-espresso-950 border-2 border-espresso-950 hover:bg-espresso-950 hover:text-cream-50 transition-colors',
    ghost:
      'bg-transparent text-espresso-800 hover:text-espresso-950 hover:bg-cream-200/60',
    danger:
      'bg-red-700 text-cream-50 hover:bg-red-800 border border-red-900 btn-tactile',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};
