'use client'

import Link from 'next/link'
import { ArrowRight, Building2, CalendarDays, Monitor } from 'lucide-react'
import { usePlataformas } from '@/hooks/use-gameflow'
import { SampleDataNotice } from './sample-data-notice'

export function PlatformsList() {
  const { data, error, isLoading } = usePlataformas()

  if (isLoading && !data) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl bg-secondary" />
        ))}
      </div>
    )
  }

  if (error || !data) {
    return (
      <p className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
        No pudimos cargar las plataformas.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {data.source === 'ejemplo' && <SampleDataNotice />}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((p) => (
          <li key={p.id} className="flex">
            <Link
              href={`/?plataforma=${p.id}`}
              className="group flex w-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/15"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30">
                <Monitor className="size-6 text-foreground" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-xl font-semibold transition-colors group-hover:text-accent">
                  {p.nombre}
                </h2>
                {p.descripcion && (
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {p.descripcion}
                  </p>
                )}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {p.fabricante && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="size-4" aria-hidden="true" />
                    {p.fabricante}
                  </span>
                )}
                {p.anio_lanzamiento && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    {p.anio_lanzamiento}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                Ver juegos
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
