import React from 'react';
import Card from '../common/Card';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeColor = 'purple',
}) {
  return (
    <Card className="p-5 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300">{title}</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
          {subtitle && <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-all shadow-xs">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {badgeText && (
        <div className="mt-3 pt-3 border-t border-purple-100 dark:border-purple-900/40">
          <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 px-2.5 py-0.5 rounded-md">
            {badgeText}
          </span>
        </div>
      )}
    </Card>
  );
}
