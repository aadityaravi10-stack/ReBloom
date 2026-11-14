import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, Star } from 'lucide-react';
import Button from '../../../components/common/Button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background soft ambient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-100px] left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-purple-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Empowering 50,000+ Women Returning to Work</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.12]">
              Your Career Deserves <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Another Beginning.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A career break doesn't define your potential. Rediscover your skills, rebuild your confidence and find opportunities designed around your life.
            </p>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-base px-8 py-4 shadow-lg shadow-purple-500/25" icon={ArrowRight} iconPosition="right">
                  Restart Your Career
                </Button>
              </Link>
              <a href="#features" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-7 py-4">
                  Explore Opportunities
                </Button>
              </a>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-6 border-t border-purple-100/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero gap stigma</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Verified Returnships</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Mentorship & Flexibility</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-purple-500/20 via-pink-400/20 to-orange-300/20 rounded-[2.5rem] blur-xl opacity-70" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border border-purple-100 shadow-2xl bg-white">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Confident smiling professional woman returning to tech career"
                  className="w-full h-[420px] object-cover object-top hover:scale-102 transition-transform duration-500"
                />

                {/* Floating badge 1: Comeback story highlight */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-purple-100/90 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      4y
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">Career Gap: 4 Years</p>
                      <p className="text-[11px] text-purple-700 font-medium">Re-entered as Lead Product Designer</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Floating Badge 2: Top Right */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-purple-100 text-xs font-semibold text-purple-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>100% Comeback Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
