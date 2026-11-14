import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  className = '',
  rows,
  as = 'input',
  children,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const baseInputClasses = `w-full rounded-xl border bg-white dark:bg-[#18132C] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 ${
    error
      ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500 focus:ring-rose-200 dark:focus:ring-rose-900/50'
      : 'border-purple-200/80 dark:border-purple-800/60 hover:border-purple-400 dark:hover:border-purple-600 focus:border-purple-500'
  } ${disabled ? 'bg-slate-100 dark:bg-slate-900/50 cursor-not-allowed opacity-75' : ''} ${
    Icon ? 'pl-10' : ''
  } ${isPassword ? 'pr-11' : ''}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
          {label}
          {required && <span className="text-purple-600 dark:text-purple-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {as === 'textarea' ? (
          <textarea
            id={id}
            rows={rows || 3}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseInputClasses} resize-y`}
            {...props}
          />
        ) : as === 'select' ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={baseInputClasses}
            {...props}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={baseInputClasses}
            {...props}
          />
        )}

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-semibold">
          <span>•</span> {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">{helperText}</p>
      ) : null}
    </div>
  );
}
