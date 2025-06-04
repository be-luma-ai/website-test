import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "AI Insights in Seconds",
    description: "Get marketing insights instantly, without SQL or dashboards.",
    iconColor: "text-purple-500",
  },
  {
    title: "Cross-Channel Integration",
    description: "Google Ads, Meta Ads, TikTok, Analytics – all in one place.",
    iconColor: "text-green-500",
  },
  {
    title: "Funnel Optimization",
    description: "Find the drop-off points and increase your ROAS.",
    iconColor: "text-blue-500",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What you get with <span className="text-primary">BeLuma</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-muted rounded-lg p-6 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <CheckCircle className={`w-8 h-8 mb-4 ${feature.iconColor}`} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
