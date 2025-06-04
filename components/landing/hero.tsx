"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-indigo-100 via-white to-pink-100 py-32 relative">
      <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Simplify Data Analytics into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
            Actionable Insights
          </span>
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Our autonomous business analyst optimizes data analyst time, bringing
          to the table the right questions that create actions that make your
          business grow.
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Book a Demo
          </Button>
        </Link>
      </div>

      {/* Optional: gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(199,210,254,0.5)_0%,transparent_50%)]"></div>
    </section>
  );
}
