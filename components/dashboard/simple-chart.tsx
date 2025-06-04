// components/simple-chart.tsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  data: { value: number }[];
  color?: string;
};

export default function SimpleChart({ title, data, color = "#8884d8" }: Props) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">
          Sin datos para mostrar
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="index" hide />
            <YAxis hide />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}`}
              contentStyle={{ fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
