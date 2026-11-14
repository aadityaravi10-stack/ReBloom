import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SupabaseConfigBanner from '../../components/common/SupabaseConfigBanner';
import HeroSection from './sections/HeroSection';
import MarqueeStrip from './sections/MarqueeStrip';
import AboutSection from './sections/AboutSection';
import HowItWorksSection from './sections/HowItWorksSection';
import FeaturesPreviewSection from './sections/FeaturesPreviewSection';
import SuccessStoriesSection from './sections/SuccessStoriesSection';
import CtaSection from './sections/CtaSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SupabaseConfigBanner />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <HowItWorksSection />
        <FeaturesPreviewSection />
        <SuccessStoriesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
