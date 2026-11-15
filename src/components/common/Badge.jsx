import React from 'react';

const colorStyles = {
  purple:
    'bg-purple-50 text-purple-900 border-purple-300/80 shadow-xs dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-500/50 dark:shadow-[0_0_12px_rgba(168,85,247,0.2)]',
  pink:
    'bg-pink-50 text-pink-900 border-pink-300/80 shadow-xs dark:bg-pink-950/50 dark:text-pink-200 dark:border-pink-500/50 dark:shadow-[0_0_12px_rgba(244,114,182,0.2)]',
  peach:
    'bg-amber-50 text-amber-950 border-amber-300/80 shadow-xs dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-500/40 dark:shadow-[0_0_12px_rgba(245,158,11,0.18)]',
  gray:
    'bg-slate-100 text-slate-800 border-slate-300/80 dark:bg-slate-800/70 dark:text-slate-200 dark:border-slate-700',
  green:
    'bg-emerald-50 text-emerald-900 border-emerald-300/80 shadow-xs dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-500/40',
  blue:
    'bg-sky-50 text-sky-900 border-sky-300/80 shadow-xs dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-500/40',
};

export default function Badge({
  children,
  color = 'purple',
  size = 'md',
  className = '',
  removable = false,
  onRemove,
}) {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs';
  const colorClass = colorStyles[color] || colorStyles.purple;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border transition-all duration-200 ${sizeClasses} ${colorClass} ${className}`}
    >
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove && onRemove();
          }}
          className="hover:bg-black/10 dark:hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center font-bold text-xs leading-none transition-colors ml-0.5 cursor-pointer text-current"
          aria-label="Remove item"
        >
          ×
        </button>
      )}
    </span>
  );
}
