"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Maria Fernández",
    title: "CMO at Client 1",
    quote:
      "BeLuma transformed the way we track and optimize our marketing spend. The AI assistant gives us insights instantly!",
    logo: "/client-logo-1.png",
    avatar: "/avatar-1.jpg",
  },
  {
    name: "Lucas Gómez",
    title: "Head of Growth at Client 2",
    quote:
      "We’ve consolidated all our data in one place. No more spreadsheets or switching between platforms.",
    logo: "/client-logo-2.png",
    avatar: "/avatar-2.jpg",
  },
  {
    name: "Ana Rivas",
    title: "Performance Manager at Client 3",
    quote:
      "The dashboard is beautiful and easy to use. But what really stands out are the actionable recommendations.",
    logo: "/client-logo-3.png",
    avatar: "/avatar-3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white dark:bg-zinc-900 py-20 border-t border-gray-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Trusted by modern marketers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg shadow-md text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                “{testimonial.quote}”
              </p>
              <div className="mt-6">
                <Image
                  src={testimonial.logo}
                  alt="client logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
