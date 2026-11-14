import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Button from '../../../components/common/Button';

export default function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-purple-900 via-purple-800 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Ambient background glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>Join ReBloom Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Your next chapter starts today.
            </h2>

            <p className="text-base sm:text-lg text-purple-100 max-w-xl mx-auto leading-relaxed">
              Step back into your professional journey with confidence. Explore career rediscovery tools and returnship opportunities designed around your life.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-purple-900 hover:bg-purple-50 font-bold px-8 shadow-xl hover:shadow-2xl"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Join as a Candidate
                </Button>
              </Link>
              <Link to="/register?role=employer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white font-medium px-8"
                >
                  Hire Returners (Employers)
                </Button>
              </Link>
            </div>

            <div className="pt-6 flex items-center justify-center gap-6 text-xs text-purple-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-pink-300" /> Free candidate membership
              </span>
              <span>•</span>
              <span>No gap stigma</span>
              <span>•</span>
              <span>Verified employers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
