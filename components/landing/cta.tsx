// components/landing/cta.tsx

"use client";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-20 px-6 text-center rounded-2xl">
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        Start improving your performance today
      </h2>
      <p className="text-lg mb-8 max-w-xl mx-auto">
        Try BeLuma free for 14 days and see how our AI-powered tools can
        transform your campaigns.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button className="w-full sm:w-auto bg-white text-purple-600 font-semibold hover:bg-gray-100">
          Get Started Free
        </Button>
        <Button
          variant="secondary"
          className="w-full sm:w-auto bg-white text-gray-700 font-medium hover:bg-gray-100"
        >
          Watch Demo
        </Button>
      </div>
    </section>
  );
}
