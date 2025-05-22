"use client";

import { useState, useMemo } from "react";
import { usePerformanceData } from "@/hooks/use-performance-data";
import {
  transformMetricsData,
  extractInsights,
} from "@/services/metrics-transformer";
import AdsDashboard from "@/components/ads-dashboard";
import MediaSelector from "@/components/media-selector";
import DateRangePicker from "@/components/date-range-picker";

function isWithinLast90Days(start: string, end: string): boolean {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setDate(now.getDate() - 90);
  return new Date(start) >= cutoff && new Date(end) <= now;
}

export default function Page() {
  const [slug] = useState("gama");

  // 🔁 Server filters = cuándo se hace fetch a la API
  const [serverFilters, setServerFilters] = useState({
    slug,
    media: "all" as "meta_ads" | "google_ads" | "all",
    breakdowns: [],
    limit: 1000,
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
  });

  // 🧠 Client filters = se aplican sobre la data ya cargada
  const [clientFilters, setClientFilters] = useState<{
    platform?: string;
    campaign_id?: string;
    dateRange?: { start: string; end: string };
  }>({});

  // 🔁 Fetch inicial (90 días desde ayer)
  const account = usePerformanceData({ ...serverFilters, level: "account" });
  const campaign = usePerformanceData({ ...serverFilters, level: "campaign" });

  // 🔎 Filtro en el frontend (cliente) si se puede
  const filteredData = useMemo(() => {
    const all = [...(account.data || []), ...(campaign.data || [])];

    return all.filter((row) => {
      if (clientFilters.platform && row.platform !== clientFilters.platform)
        return false;
      if (
        clientFilters.campaign_id &&
        row.campaign_id !== clientFilters.campaign_id
      )
        return false;
      if (clientFilters.dateRange && row.date) {
        const rowDate = new Date(row.date);
        const start = new Date(clientFilters.dateRange.start);
        const end = new Date(clientFilters.dateRange.end);
        if (rowDate < start || rowDate > end) return false;
      }
      return true;
    });
  }, [account.data, campaign.data, clientFilters]);

  // 📊 Métricas + insights
  const metrics = useMemo(
    () => transformMetricsData(filteredData),
    [filteredData]
  );
  const insights = useMemo(() => extractInsights(filteredData), [filteredData]);

  const loading = account.loading || campaign.loading;
  const error = account.error || campaign.error;

  const handleDateChange = (start: string, end: string) => {
    if (isWithinLast90Days(start, end)) {
      // 👉 Filtramos en el cliente
      setClientFilters((prev) => ({ ...prev, dateRange: { start, end } }));
    } else {
      // 👉 Requiere data del servidor (tabla archive)
      setClientFilters((prev) => {
        const { dateRange, ...rest } = prev;
        return rest; // eliminamos filtro local
      });
      setServerFilters((prev) => ({ ...prev, startDate: start, endDate: end }));
    }
  };

  // 💬 UI según estado
  if (loading)
    return <p className="p-4 text-muted-foreground">Cargando datos...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;
  if (!loading && filteredData.length === 0) {
    return (
      <div className="p-6 space-y-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          No hay datos disponibles para las campañas o cuentas seleccionadas.
        </p>

        <div className="text-sm text-muted-foreground mt-2 space-y-1">
          <p>
            🎯 <strong>Cliente:</strong> {slug}
          </p>
          <p>
            🛰️ <strong>Medio:</strong> {serverFilters.media}
          </p>

          {serverFilters.startDate && serverFilters.endDate ? (
            <p>
              📆 <strong>Fecha:</strong> {serverFilters.startDate} →{" "}
              {serverFilters.endDate}
            </p>
          ) : clientFilters.dateRange ? (
            <p>
              📆 <strong>Fecha:</strong> {clientFilters.dateRange.start} →{" "}
              {clientFilters.dateRange.end}
            </p>
          ) : (
            <p>
              📆 <strong>Fecha:</strong> Últimos 90 días
            </p>
          )}

          {clientFilters.platform && (
            <p>
              📱 <strong>Plataforma:</strong> {clientFilters.platform}
            </p>
          )}
          {clientFilters.campaign_id && (
            <p>
              🎯 <strong>Campaña:</strong> {clientFilters.campaign_id}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ✅ Render principal
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <MediaSelector
        value={serverFilters.media}
        onChange={(media) => setServerFilters((prev) => ({ ...prev, media }))}
      />

      <DateRangePicker
        startDate={clientFilters.dateRange?.start || serverFilters.startDate}
        endDate={clientFilters.dateRange?.end || serverFilters.endDate}
        onChange={handleDateChange}
      />

      <AdsDashboard
        metrics={metrics}
        insights={insights}
        rawData={filteredData}
      />
    </div>
  );
}
