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
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 group-hover:scale-110 group-hover:bg-purple-100 transition-all">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {badgeText && (
        <div className="mt-3 pt-3 border-t border-purple-50">
          <span className="text-[11px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
            {badgeText}
          </span>
        </div>
      )}
    </Card>
  );
}
