// api-service.ts

// Tipos para claridad
export type Media = "meta_ads" | "google_ads"
export type Level = "account" | "campaign" | "adset" | "ad"

type FetchParams = {
  slug: string
  media: Media | "all"
  level: Level
  breakdowns?: string[]
  startDate?: string // YYYY-MM-DD
  endDate?: string   // YYYY-MM-DD
  limit?: number
  filters?: Record<string, string>
}

// 🧠 Cache en memoria para evitar llamadas duplicadas
const memoryCache: Record<string, any[]> = {}

// 🔑 Clave única por combinación de parámetros
function getCacheKey(params: FetchParams): string {
  return JSON.stringify({
    ...params,
    breakdowns: params.breakdowns?.sort(),
    filters: Object.entries(params.filters || {}).sort(),
  })
}

// 🧠 Devuelve el nombre base de la tabla según fecha
function buildTableName(level: Level, date: string, breakdowns?: string[], archive = false): string {
  const base = `${level}_performance${breakdowns && breakdowns.length > 0 ? `_${breakdowns.join("_")}` : ""}`
  return `${base}${archive ? "_archive" : ""}_${date}`
}

// 📆 Devuelve la fecha YYYYMMDD de ayer
function getYesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10).replace(/-/g, "")
}

// 🧠 Lógica para determinar qué fechas de corte hay que consultar
function getCutoffDatesForRange(start: string, end: string): string[] {
  const MS_PER_DAY = 1000 * 60 * 60 * 24
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / MS_PER_DAY)

  // Siempre usamos ayer como fecha de corte
  const current = getYesterday()
  const archive = `${current}_archive`

  // Si la fecha cubre más de 90 días, usamos también la tabla archive
  return diffDays > 90 ? [current, archive] : [current]
}

// 📡 Llama al endpoint de Cloud Run vía proxy local
async function fetchFromAPI(params: URLSearchParams): Promise<any[]> {
  const res = await fetch(`/api/proxy?${params.toString()}`)
  if (!res.ok) throw new Error("Error al consultar la API externa")
  return await res.json()
}

// 🎯 Función principal para pedir datos
export async function fetchPerformance({
  slug,
  media,
  level,
  breakdowns = [],
  startDate,
  endDate,
  limit = 1000,
  filters = {},
}: FetchParams): Promise<any[]> {
  const cacheKey = getCacheKey({ slug, media, level, breakdowns, startDate, endDate, limit, filters })
  if (memoryCache[cacheKey]) return memoryCache[cacheKey]

  const cutoffDates = startDate && endDate
    ? getCutoffDatesForRange(startDate, endDate)
    : [getYesterday()] // default: llamada inicial

  // 🔁 Si media = "all", consultamos ambas en paralelo
  const medias = media === "all" ? ["meta_ads", "google_ads"] : [media]

  // Generamos todas las combinaciones dataset + tabla a consultar
  const requests = []

  for (const m of medias) {
    for (const cutoff of cutoffDates) {
      const archive = cutoff.includes("archive")
      const date = archive ? cutoff.replace("_archive", "") : cutoff
      const table = buildTableName(level, date, breakdowns, archive)

      const params = new URLSearchParams({
        slug,
        dataset: m,
        table,
        limit: String(limit),
      })

      // Agregamos filtros dinámicos
      if (startDate) params.set("start_date", startDate)
      if (endDate) params.set("end_date", endDate)
      for (const [key, val] of Object.entries(filters)) {
        params.set(key, val)
      }

      requests.push(fetchFromAPI(params))
    }
  }

  // ⏱️ Ejecutamos todos los fetches en paralelo y los unimos
  const results = await Promise.all(requests)
  const combined = results.flat()

  // 🧠 Guardamos en caché y devolvemos
  memoryCache[cacheKey] = combined
  return combined
}
