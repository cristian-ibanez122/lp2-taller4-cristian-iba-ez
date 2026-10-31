'use client'

import useSWR from 'swr'
import { fetchPlataformas, fetchVideojuego, fetchVideojuegos } from '@/lib/api'

const swrOptions = { revalidateOnFocus: false, keepPreviousData: true }

export function useVideojuegos(plataformaId: number | null) {
  return useSWR(['videojuegos', plataformaId], () => fetchVideojuegos(plataformaId), swrOptions)
}

export function useVideojuego(id: string) {
  return useSWR(['videojuego', id], () => fetchVideojuego(id), swrOptions)
}

export function usePlataformas() {
  return useSWR('plataformas', fetchPlataformas, swrOptions)
}
