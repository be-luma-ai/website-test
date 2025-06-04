// components/metric-card.tsx

import { ResponsiveContainer, LineChart, Line } from "recharts";

type Props = {
  title: string;
  value: string;
  subtitle: string;
  chartData: { value: number }[];
  color?: string;
};

export default function MetricCard({
  title,
  value,
  subtitle,
  chartData,
  color = "#8884d8",
}: Props) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col space-y-1 mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      {chartData.length > 0 ? (
        <div className="h-16 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground italic">
          Sin datos para gráfico
        </div>
      )}
    </div>
  );
}
