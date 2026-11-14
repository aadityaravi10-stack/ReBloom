import React from 'react';

const colorStyles = {
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  pink: 'bg-pink-100 text-pink-700 border-pink-200',
  peach: 'bg-orange-100 text-orange-800 border-orange-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
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
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${colorClass} ${className}`}
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
