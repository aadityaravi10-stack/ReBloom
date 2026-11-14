import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md border border-transparent focus:ring-purple-400',
  secondary:
    'bg-purple-50 dark:bg-purple-950/70 hover:bg-purple-100 dark:hover:bg-purple-900/80 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800 focus:ring-purple-400',
  accent:
    'bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-md hover:shadow-lg border-none focus:ring-purple-400',
  outline:
    'bg-white dark:bg-[#18132C] hover:bg-purple-50 dark:hover:bg-purple-900/40 text-slate-800 dark:text-slate-200 hover:text-purple-700 dark:hover:text-white border border-purple-200 dark:border-purple-800/80 focus:ring-purple-300',
  ghost:
    'bg-transparent hover:bg-purple-50 dark:hover:bg-purple-950/50 text-slate-700 dark:text-slate-200 hover:text-purple-700 dark:hover:text-white border-transparent focus:ring-purple-300',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-400 shadow-sm',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 font-bold',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#0B0813] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
