import { NextResponse } from "next/server"
import axios from "axios"

const API_URL = "https://big-query-client-api-497033857194.us-central1.run.app/api/read"

export async function GET(request: Request) {
  try {
    // Obtener los parámetros de la URL
    const { searchParams } = new URL(request.url)
    const params: Record<string, string> = {}

    // Convertir los searchParams a un objeto
    searchParams.forEach((value, key) => {
      params[key] = value
    })

    // Realizar la solicitud a la API externa
    const response = await axios.get(API_URL, { params })

    // Devolver los datos
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error en proxy API:", error)

    // Manejar diferentes tipos de errores
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500
      const errorMessage = error.response?.data?.message || error.message || "Error al consultar la API externa"

      return NextResponse.json({ error: errorMessage }, { status: statusCode })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
