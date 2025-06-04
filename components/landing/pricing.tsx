"use client";

import { Button } from "@/components/ui/button";

const pricingTiers = [
  {
    title: "Basic",
    description: "Up to $1M/year ad spend. Meta & Google only.",
    price: "$499.00 USD",
    features: [
      "Meta & Google integrations",
      "Up to 50 reports/month",
      "1 included workflow",
      "Standard templates",
    ],
    cta: "Get Started",
  },
  {
    title: "Professional",
    description: "Up to $10M/year ad spend. All major platforms.",
    price: "$1,999.00 USD",
    features: [
      "30+ platform integrations",
      "Up to 500 reports/month",
      "3 customizable workflows",
      "Advanced analytics",
    ],
    cta: "Get Started",
  },
  {
    title: "Enterprise",
    description: "Custom plans for $10M+/year ad spend.",
    price: "Custom",
    features: [
      "Unlimited integrations & reports",
      "Private hosting options",
      "Advanced security (SOC2, SSO)",
      "AI-driven recommendations",
    ],
    cta: "Contact Sales",
  },
];

export default function PricingPage() {
  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-white to-slate-100"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Prices that can fit you best
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Our AI-powered tool turns data into insights, empowering your growth
          through beautiful and intuitive reporting.
        </p>

        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.title}
              className="bg-white shadow-xl border border-gray-200 rounded-xl p-8 w-full max-w-md mx-auto"
            >
              <h3 className="text-2xl font-semibold mb-2">{tier.title}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              <p className="text-3xl font-bold mb-6">{tier.price}</p>
              <ul className="text-left text-gray-600 mb-6 space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <span className="mr-2 text-purple-500">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">{tier.cta}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
