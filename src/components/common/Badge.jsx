import React from 'react';

const colorStyles = {
  purple: 'bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800',
  pink: 'bg-pink-100 dark:bg-pink-950/70 text-pink-900 dark:text-pink-200 border-pink-200 dark:border-pink-800',
  peach: 'bg-orange-100 dark:bg-orange-950/70 text-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800',
  gray: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700',
  green: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
  blue: 'bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800',
};

export default function Badge({
  children,
  color = 'purple',
  size = 'md',
  className = '',
  removable = false,
  onRemove,
}) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  const colorClass = colorStyles[color] || colorStyles.purple;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${sizeClasses} ${colorClass} ${className}`}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove && onRemove();
          }}
          className="hover:opacity-75 focus:outline-none text-current"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
}
