import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, FileText, Briefcase, GraduationCap, Users } from 'lucide-react';
import Card from '../common/Card';

const iconMap = {
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Users,
};

export default function FeatureShortcutCard({
  title,
  description,
  iconName = 'Sparkles',
  badge = 'Coming Soon',
  color = 'purple',
  linkTo = '#',
}) {
  const Icon = iconMap[iconName] || Sparkles;
  const isAvailable = Boolean(linkTo && linkTo !== '#');

  const content = (
    <Card hoverEffect={isAvailable} className="p-5 flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              isAvailable
                ? 'text-purple-800 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800'
                : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
            }`}
          >
            {badge}
          </span>
        </div>
        <h4 className={`font-bold text-sm text-slate-900 dark:text-white transition-colors ${isAvailable ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400' : ''}`}>
          {title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-400">
        <span>{isAvailable ? 'Launch Module' : 'Coming Soon'}</span>
        {isAvailable ? (
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        ) : (
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">In Roadmap</span>
        )}
      </div>
    </Card>
  );

  if (linkTo && linkTo !== '#') {
    return <Link to={linkTo} className="block h-full">{content}</Link>;
  }

  return content;
}
