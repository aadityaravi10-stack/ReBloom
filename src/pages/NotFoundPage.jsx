import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FBF9FE] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mb-6 shadow-soft">
        <Sparkles className="w-8 h-8" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-gray-800 mt-2">Page Not Found</h2>
      <p className="text-sm text-gray-500 max-w-sm mt-2 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="flex gap-3">
        <Link to="/">
          <Button variant="accent" size="md" icon={Home}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
