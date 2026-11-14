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

  const content = (
    <Card hoverEffect className="p-5 flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
            {badge}
          </span>
        </div>
        <h4 className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-2 border-t border-purple-50/60 flex items-center justify-between text-xs font-semibold text-purple-700">
        <span>Explore Module</span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </Card>
  );

  if (linkTo && linkTo !== '#') {
    return <Link to={linkTo} className="block h-full">{content}</Link>;
  }

  return content;
}
