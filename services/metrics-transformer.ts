// 💡 Formato de salida:
// {
//   totalSpend: { value: "$12.4K", subtitle: "+15% vs. período anterior", chart: [...] },
//   roas: { value: "3.42", subtitle: "...", chart: [...] },
//   ...
// }

export function transformMetricsData(data: any[]) {
  if (!data || data.length === 0) {
    return {
      totalSpend: { value: "$0", subtitle: "No hay datos", chart: [] },
      cpc: { value: "$0", subtitle: "No hay datos", chart: [] },
      impressions: { value: "0", subtitle: "No hay datos", chart: [] },
      conversions: { value: "0", subtitle: "No hay datos", chart: [] },
      conversionRate: { value: "0%", subtitle: "No hay datos", chart: [] },
      roas: { value: "0", subtitle: "No hay datos", chart: [] },
    };
  }

  // 🗂️ Agrupar por fecha
  const grouped = data.reduce((acc, item) => {
    const date = item.date || "unknown";
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const sortedDates = Object.keys(grouped).sort();

  // 🧮 Métricas diarias
  const dailyMetrics = sortedDates.map((date) => {
    const rows = grouped[date];
    const spend = sum(rows, "spend");
    const clicks = sum(rows, "clicks");
    const impressions = sum(rows, "impressions");
    const conversions = sum(rows, "purchase");
    const revenue = sum(rows, "purchase_value");

    return {
      date,
      spend,
      clicks,
      impressions,
      conversions,
      revenue,
      cpc: clicks > 0 ? spend / clicks : 0,
      conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
      roas: spend > 0 ? revenue / spend : 0,
    };
  });

  const totalSpend = sum(data, "spend");
  const totalClicks = sum(data, "clicks");
  const totalImpressions = sum(data, "impressions");
  const totalConversions = sum(data, "purchase");
  const totalRevenue = sum(data, "purchase_value");

  const avgCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;
  const avgConversionRate =
    totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
  const avgROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  const formatCurrency = (v: number) =>
    v >= 1000 ? `$${(v / 1000).toFixed(1)}K` : `$${v.toFixed(2)}`;
  const formatNumber = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v}`;

  // 📈 Datos para gráficos
  const spendChart = dailyMetrics.map((d) => ({ value: d.spend }));
  const cpcChart = dailyMetrics.map((d) => ({ value: d.cpc }));
  const impressionsChart = dailyMetrics.map((d) => ({ value: d.impressions }));
  const conversionsChart = dailyMetrics.map((d) => ({ value: d.conversions }));
  const convRateChart = dailyMetrics.map((d) => ({ value: d.conversionRate }));
  const roasChart = dailyMetrics.map((d) => ({ value: d.roas }));

  // 📊 Comparación entre períodos
  const half = Math.floor(dailyMetrics.length / 2);
  const recent = dailyMetrics.slice(half);
  const previous = dailyMetrics.slice(0, half);

  const recentSpend = recent.reduce((s, d) => s + d.spend, 0);
  const previousSpend = previous.reduce((s, d) => s + d.spend, 0);
  const spendChange =
    previousSpend > 0
      ? ((recentSpend - previousSpend) / previousSpend) * 100
      : 0;

  const recentConv = recent.reduce((s, d) => s + d.conversions, 0);
  const previousConv = previous.reduce((s, d) => s + d.conversions, 0);
  const convChange =
    previousConv > 0 ? ((recentConv - previousConv) / previousConv) * 100 : 0;

  return {
    totalSpend: {
      value: formatCurrency(totalSpend),
      subtitle: `${spendChange >= 0 ? "+" : ""}${spendChange.toFixed(
        1
      )}% vs. período anterior`,
      chart: spendChart,
    },
    cpc: {
      value: formatCurrency(avgCPC),
      subtitle: `Promedio para el período seleccionado`,
      chart: cpcChart,
    },
    impressions: {
      value: formatNumber(totalImpressions),
      subtitle: `Total para el período seleccionado`,
      chart: impressionsChart,
    },
    conversions: {
      value: formatNumber(totalConversions),
      subtitle: `${convChange >= 0 ? "+" : ""}${convChange.toFixed(
        1
      )}% vs. período anterior`,
      chart: conversionsChart,
    },
    conversionRate: {
      value: `${avgConversionRate.toFixed(2)}%`,
      subtitle: `Promedio para el período seleccionado`,
      chart: convRateChart,
    },
    roas: {
      value: avgROAS.toFixed(2),
      subtitle: `Retorno por cada $1 invertido`,
      chart: roasChart,
    },
  };
}

export function extractInsights(data: any[]) {
  if (!data || data.length === 0) {
    return {
      topCampaign: null,
      underperformingCampaign: null,
      totalConversions: 0,
      conversionChange: 0,
      overallRoas: 0,
      targetRoas: 3.5,
    };
  }

  // 🔎 Agrupar por campaña
  const campaignGroups = data.reduce((acc, item) => {
    const campaign = item.campaign_name || "unknown";
    if (!acc[campaign]) acc[campaign] = [];
    acc[campaign].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  // 📊 Métricas por campaña
  const campaignMetrics = Object.entries(campaignGroups).map(
    ([name, group]) => {
      const spend = sum(group as any[], "spend");
      const revenue = sum(group as any[], "purchase_value");
      const conversions = sum(group as any[], "purchase");
      const roas = spend > 0 ? revenue / spend : 0;

      return {
        name: name ?? "Unknown",
        spend: spend ?? 0,
        revenue: revenue ?? 0,
        conversions: conversions ?? 0,
        roas: roas ?? 0,
      };
    }
  );

  const sorted = [...campaignMetrics].sort((a, b) => b.roas - a.roas);
  const topCampaign = sorted[0];
  const underperformingCampaign = sorted[sorted.length - 1];

  const totalConversions = sum(data, "purchase");
  const totalRevenue = sum(data, "purchase_value");
  const totalSpend = sum(data, "spend");
  const overallRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  // 📈 Comparación entre mitades del período
  const groupedByDate = data.reduce((acc, item) => {
    const date = item.date || "unknown";
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const sortedDates = Object.keys(groupedByDate).sort();
  const half = Math.floor(sortedDates.length / 2);
  const prev = sortedDates.slice(0, half);
  const recent = sortedDates.slice(half);

  const prevConversions = prev
    .flatMap((d) => groupedByDate[d])
    .reduce((s, i) => s + (Number(i.purchase) || 0), 0);

  const recentConversions = recent
    .flatMap((d) => groupedByDate[d])
    .reduce((s, i) => s + (Number(i.purchase) || 0), 0);

  const conversionChange =
    prevConversions > 0
      ? ((recentConversions - prevConversions) / prevConversions) * 100
      : 0;

  return {
    topCampaign,
    underperformingCampaign,
    totalConversions,
    conversionChange,
    overallRoas,
    targetRoas: 3.5,
  };
}

function sum(arr: any[], key: string) {
  return arr.reduce((total, item) => total + (Number(item[key]) || 0), 0);
}
