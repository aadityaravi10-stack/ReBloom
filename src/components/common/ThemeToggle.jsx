import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle({ className = '', showLabel = false, size = 'md' }) {
  const { theme, isDark, toggleTheme } = useTheme();

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const buttonSizes = {
    sm: 'p-1.5 rounded-lg text-xs',
    md: 'p-2 rounded-xl text-sm',
    lg: 'p-2.5 rounded-2xl text-base',
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`inline-flex items-center gap-2 transition-all duration-300 cursor-pointer select-none border ${
        isDark
          ? 'bg-purple-950/40 hover:bg-purple-900/60 text-amber-300 border-purple-500/30 hover:border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
          : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-300 shadow-sm'
      } ${buttonSizes[size] || buttonSizes.md} ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className={`${iconSizes[size] || iconSizes.md} transition-transform duration-500 rotate-0 hover:rotate-45 text-amber-300`} />
        ) : (
          <Moon className={`${iconSizes[size] || iconSizes.md} transition-transform duration-500 -rotate-12 hover:rotate-0 text-purple-700`} />
        )}
      </div>

      {showLabel && (
        <span className="font-semibold text-xs tracking-wide">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
}
