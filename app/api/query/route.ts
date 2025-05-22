import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, dataset, table, limit, filters } = body

    // Validar parámetros
    if (!slug || !dataset || !table) {
      return NextResponse.json({ message: "Los parámetros slug, dataset y table son requeridos" }, { status: 400 })
    }

    // Construir parámetros de consulta
    const queryParams: Record<string, any> = {
      slug,
      dataset,
      table,
      limit: limit || 100,
    }

    // Si hay filtros, los añadimos como un parámetro JSON
    if (filters && Object.keys(filters).length > 0) {
      queryParams.filters = JSON.stringify(filters)
    }

    // Realizar la solicitud a la API de BigQuery
    const apiUrl = "https://big-query-client-api-497033857194.us-central1.run.app/api/read"

    const response = await axios.get(apiUrl, {
      params: queryParams,
    })

    // Devolver los datos obtenidos
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error al consultar la API:", error)

    // Manejar diferentes tipos de errores
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500
      const errorMessage = error.response?.data?.message || error.message || "Error al consultar la API"

      return NextResponse.json({ message: errorMessage }, { status: statusCode })
    }

    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
