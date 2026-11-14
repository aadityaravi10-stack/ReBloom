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
      className={`bg-white rounded-2xl ${
        bordered ? 'border border-purple-100/70' : ''
      } ${
        hoverEffect
          ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg hover:border-purple-200 cursor-pointer'
          : 'shadow-soft'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
