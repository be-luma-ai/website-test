"use client";

import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import DataSources from "@/components/landing/data-sources";
import Testimonials from "@/components/landing/testimonials";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import CTA from "@/components/landing/cta";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient1 to-gradient2">
      <Hero />
      <Features />
      <DataSources />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}
