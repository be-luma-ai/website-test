// components/ads-dashboard.tsx

import MetricCard from "./metric-card";
import PerformanceHighlights from "./performance-highlights";
import SimpleChart from "./simple-chart";

type Props = {
  metrics: ReturnType<
    typeof import("@/services/metrics-transformer").transformMetricsData
  >;
  insights: ReturnType<
    typeof import("@/services/metrics-transformer").extractInsights
  >;
  rawData: any[];
};

export default function AdsDashboard({ metrics, insights, rawData }: Props) {
  return (
    <div className="space-y-8">
      {/* 📊 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Spend"
          value={metrics.totalSpend.value}
          subtitle={metrics.totalSpend.subtitle}
          chartData={metrics.totalSpend.chart}
          color="#8884d8"
        />
        <MetricCard
          title="CPC"
          value={metrics.cpc.value}
          subtitle={metrics.cpc.subtitle}
          chartData={metrics.cpc.chart}
          color="#FF8042"
        />
        <MetricCard
          title="Impressions"
          value={metrics.impressions.value}
          subtitle={metrics.impressions.subtitle}
          chartData={metrics.impressions.chart}
          color="#FFBB28"
        />
        <MetricCard
          title="Total Conversions"
          value={metrics.conversions.value}
          subtitle={metrics.conversions.subtitle}
          chartData={metrics.conversions.chart}
          color="#82ca9d"
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate.value}
          subtitle={metrics.conversionRate.subtitle}
          chartData={metrics.conversionRate.chart}
          color="#00C49F"
        />
        <MetricCard
          title="ROAS"
          value={metrics.roas.value}
          subtitle={metrics.roas.subtitle}
          chartData={metrics.roas.chart}
          color="#FF6666"
        />
      </div>

      {/* 📈 Gráfico (ej. spend por día) */}
      <div className="mt-8">
        <SimpleChart
          title="Spend diario"
          data={metrics.totalSpend.chart}
          color="#8884d8"
        />
      </div>

      {/* 💡 Insights */}
      <div className="mt-8">
        <PerformanceHighlights insights={insights} />
      </div>
    </div>
  );
}
