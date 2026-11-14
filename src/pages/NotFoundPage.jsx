import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import ReBloomLogo from '../components/common/ReBloomLogo';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAF8FE] dark:bg-[#0B0813] text-slate-900 dark:text-white flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <div className="mb-6">
        <ReBloomLogo size="xl" />
      </div>

      <h1 className="text-5xl sm:text-6xl font-black text-slate-950 dark:text-white tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-2">Page Not Found</h2>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 max-w-sm mt-2 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="flex gap-3">
        <Link to="/">
          <Button variant="accent" size="md" icon={Home}>
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
