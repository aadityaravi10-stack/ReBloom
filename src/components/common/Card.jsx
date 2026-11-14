import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  bordered = true,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#130E24] text-slate-900 dark:text-slate-100 rounded-2xl transition-all duration-200 ${
        bordered ? 'border border-purple-100/80 dark:border-purple-800/40' : ''
      } ${
        hoverEffect
          ? 'hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-glow/15 hover:border-purple-300 dark:hover:border-purple-700/60 cursor-pointer'
          : 'shadow-soft dark:shadow-none'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
