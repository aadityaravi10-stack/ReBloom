import React, { useState } from 'react';
import { AlertCircle, Database, Check, Copy, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import Modal from './Modal';
import Button from './Button';

export default function SupabaseConfigBanner() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // If already configured, no warning banner needed
  if (isSupabaseConfigured) return null;

  const envSample = `VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  const copyEnv = () => {
    navigator.clipboard.writeText(envSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border-b border-purple-200/60 px-4 py-2.5 text-xs sm:text-sm text-purple-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-semibold text-purple-900">Supabase Setup Notice:</span>
            <span className="text-gray-700 hidden sm:inline">
              Real-time database and authentication require your Supabase URL & Anon Key in <code className="bg-purple-100/80 px-1.5 py-0.5 rounded text-purple-800 font-mono text-xs">.env</code>.
            </span>
            <span className="text-gray-700 sm:hidden">
              Database setup required.
            </span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 font-semibold text-purple-700 hover:text-purple-900 underline hover:no-underline text-xs sm:text-sm"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Setup Instructions & SQL</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Connect ReBloom to Supabase"
        subtitle="Follow these simple steps to link your Supabase database and authentication."
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5 text-sm text-gray-600">
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
            <h4 className="font-semibold text-purple-900 mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-purple-600" />
              Why do I see this?
            </h4>
            <p className="text-xs text-purple-800 leading-relaxed">
              Per requirements, ReBloom uses real Supabase authentication and Row Level Security rather than fake mock auth. Configure your free Supabase project to activate user signups, candidate profiles, and employer dashboards.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">1</span>
              <div>
                <p className="font-medium text-gray-900">Create a free Supabase Project</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sign in to{' '}
                  <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-purple-600 underline inline-flex items-center gap-0.5">
                    supabase.com <ExternalLink className="w-3 h-3 inline" />
                  </a>{' '}
                  and create a new project.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">2</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Execute the Database Schema</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  In your Supabase project, navigate to <strong>SQL Editor</strong> &gt; <strong>New Query</strong>, and paste the code from <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">supabase/schema.sql</code>.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">3</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">Configure Environment Variables in .env</p>
                  <button
                    onClick={copyEnv}
                    className="text-xs text-purple-700 hover:text-purple-900 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Example'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 mb-2">
                  Find your <strong>Project URL</strong> and <strong>Anon Key</strong> under <em>Project Settings &gt; API</em>.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{envSample}
                </pre>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">4</span>
              <div>
                <p className="font-medium text-gray-900">Restart Vite Development Server</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Save the <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">.env</code> file and restart with <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">npm run dev</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
