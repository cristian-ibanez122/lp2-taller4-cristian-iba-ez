import Link from 'next/link'
import { CalendarDays, Monitor } from 'lucide-react'
import type { Videojuego } from '@/lib/types'
import { GameCover } from './game-cover'

interface GameCardProps {
  juego: Videojuego
  plataformaNombre?: string
}

export function GameCard({ juego, plataformaNombre }: GameCardProps) {
  return (
    <Link
      href={`/juego/${juego.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-video overflow-hidden">
        <GameCover
          src={juego.imagen_url}
          alt={`Portada de ${juego.titulo}`}
          className="size-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
        {juego.genero && (
          <span className="absolute left-3 top-3 rounded-full border border-primary/40 bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
            {juego.genero}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-pretty text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
          {juego.titulo}
        </h3>
        <dl className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Año de lanzamiento</dt>
            <CalendarDays className="size-4" aria-hidden="true" />
            <dd>{juego.anio_lanzamiento ?? '—'}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Plataforma</dt>
            <Monitor className="size-4 text-accent" aria-hidden="true" />
            <dd className="text-foreground/90">{plataformaNombre ?? 'Sin plataforma'}</dd>
          </div>
        </dl>
      </div>
    </Link>
  )
}
