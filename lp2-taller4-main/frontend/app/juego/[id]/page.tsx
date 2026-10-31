import type { Metadata } from 'next'
import { GameDetail } from '@/components/game-detail'

export const metadata: Metadata = {
  title: 'Detalle del videojuego',
}

export default async function JuegoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <GameDetail id={id} />
}
