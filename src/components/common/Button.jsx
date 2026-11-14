import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md border border-transparent focus:ring-purple-400',
  secondary: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 focus:ring-purple-300',
  accent: 'bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-soft hover:shadow-soft-lg border-none focus:ring-purple-400',
  outline: 'bg-white hover:bg-purple-50/50 text-gray-700 hover:text-purple-700 border border-gray-200 hover:border-purple-300 focus:ring-purple-300',
  ghost: 'bg-transparent hover:bg-purple-50 text-gray-600 hover:text-purple-700 border-transparent focus:ring-purple-200',
  danger: 'bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 font-semibold',
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
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';
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
