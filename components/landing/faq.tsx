// components/landing/faq.tsx

"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "What is BeLuma?",
    answer:
      "BeLuma is an AI-powered marketing analytics platform that helps you understand and optimize your ad campaigns across multiple channels like Google and Meta.",
  },
  {
    question: "Can I integrate data from multiple ad platforms?",
    answer:
      "Yes, BeLuma supports data integration from multiple platforms such as Google Ads, Meta Ads, and more.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Absolutely! You can try BeLuma free for 14 days with full access to all features.",
  },
  {
    question: "How do AI Insights work?",
    answer:
      "Our AI analyzes your performance data to provide actionable insights, detect anomalies, and suggest improvements based on your campaign goals.",
  },
  {
    question: "Can I invite team members?",
    answer:
      "Yes, BeLuma allows you to collaborate by inviting your team to access the dashboard and insights.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {FAQS.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm cursor-pointer transition hover:shadow-md"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-600 text-sm">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
