import React from 'react';
import logoImg from '../../assets/rebloom-logo.png';

const sizeMap = {
  xs: { box: 'w-7 h-7 rounded-lg p-1', img: 'w-5 h-5' },
  sm: { box: 'w-8 h-8 rounded-xl p-1', img: 'w-6 h-6' },
  md: { box: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl p-1.5', img: 'w-7 h-7 sm:w-8 sm:h-8' },
  lg: { box: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-2', img: 'w-9 h-9 sm:w-10 sm:h-10' },
  xl: { box: 'w-16 h-16 sm:w-20 sm:h-20 rounded-3xl p-3', img: 'w-12 h-12 sm:w-16 sm:h-16' },
};

export default function ReBloomLogo({
  size = 'md',
  variant = 'badge',
  className = '',
  imgClassName = '',
}) {
  const currentSize = sizeMap[size] || sizeMap.md;

  if (variant === 'plain') {
    return (
      <img
        src={logoImg}
        alt="ReBloom Logo"
        className={`object-contain drop-shadow-[0_0_12px_rgba(236,72,153,0.4)] ${currentSize.img} ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center bg-[#080937] border border-purple-500/40 shadow-md shadow-purple-900/30 group-hover:shadow-purple-500/40 group-hover:border-pink-500/50 transition-all duration-300 shrink-0 ${currentSize.box} ${className}`}
    >
      <img
        src={logoImg}
        alt="ReBloom Butterfly Logo"
        className={`object-contain drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] ${currentSize.img} ${imgClassName}`}
      />
      {/* Ambient neon backglow */}
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-tr from-purple-600 to-pink-500 opacity-20 blur-xs pointer-events-none" />
    </div>
  );
}
