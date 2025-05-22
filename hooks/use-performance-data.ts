// hooks/use-performance-data.ts

import { useEffect, useState } from "react"
import { fetchPerformance, Media, Level } from "@/services/api-service"

type Params = {
  slug: string
  media: Media | "all"
  level: Level
  breakdowns?: string[]
  startDate?: string
  endDate?: string
  limit?: number
  filters?: Record<string, string>
}

export function usePerformanceData(params: Params) {
  const [data, setData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isCancelled = false
    setLoading(true)
    setError(null)

    fetchPerformance(params)
      .then((result) => {
        if (!isCancelled) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [
    params.slug,
    params.media,
    params.level,
    JSON.stringify(params.breakdowns || []),
    params.startDate,
    params.endDate,
    JSON.stringify(params.filters || {}),
    params.limit,
  ])

  return { data, loading, error }
}
