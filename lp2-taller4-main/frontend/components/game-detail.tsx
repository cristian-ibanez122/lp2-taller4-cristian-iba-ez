'use client'

import Link from 'next/link'
import { ArrowLeft, Building2, CalendarDays, Monitor, Tag } from 'lucide-react'
import { usePlataformas, useVideojuego } from '@/hooks/use-gameflow'
import { GameCover } from './game-cover'
import { SampleDataNotice } from './sample-data-notice'

export function GameDetail({ id }: { id: string }) {
  const { data: juegoResult, error, isLoading } = useVideojuego(id)
  const { data: plataformasResult } = usePlataformas()

  const juego = juegoResult?.data
  const plataforma =
    (juego?.plataforma?.fabricante || juego?.plataforma?.descripcion ? juego.plataforma : null) ??
    plataformasResult?.data.find((p) => p.id === juego?.plataforma_id) ??
    juego?.plataforma ??
    null

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver al catálogo
      </Link>

      {isLoading && !juegoResult ? (
        <DetailSkeleton />
      ) : error || !juego ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
          <p className="font-heading text-xl font-semibold">Videojuego no encontrado</p>
          <p className="text-sm text-muted-foreground">
            El juego que buscas no existe o la API no está disponible.
          </p>
        </div>
      ) : (
        <>
          {juegoResult?.source === 'ejemplo' && <SampleDataNotice />}

          <article className="flex flex-col gap-8">
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <GameCover
                src={juego.imagen_url}
                alt={`Portada de ${juego.titulo}`}
                className="aspect-video w-full sm:aspect-[21/9]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-8">
                {juego.genero && (
                  <span className="w-fit rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {juego.genero}
                  </span>
                )}
                <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                  {juego.titulo}
                </h1>
              </div>
            </div>

<div className="grid gap-6 lg:grid-cols-3 lg:items-start">
              <section
                aria-labelledby="descripcion"
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 lg:col-span-2"
              >
                <h2 id="descripcion" className="text-xl font-semibold">
                  Descripción
                </h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {juego.descripcion ?? 'Este videojuego aún no tiene descripción.'}
                </p>
                <dl className="mt-2 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
                  <InfoItem icon={CalendarDays} label="Año de lanzamiento" value={juego.anio_lanzamiento} />
                  <InfoItem icon={Tag} label="Género" value={juego.genero} />
                </dl>
              </section>

              <aside
                aria-labelledby="plataforma"
                className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-primary/10 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent/20">
                    <Monitor className="size-5 text-accent" aria-hidden="true" />
                  </span>
                  <h2 id="plataforma" className="text-xl font-semibold">
                    Plataforma
                  </h2>
                </div>
                {plataforma ? (
                  <>
                    <p className="font-heading text-2xl font-bold">{plataforma.nombre}</p>
                    {plataforma.descripcion && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {plataforma.descripcion}
                      </p>
                    )}
                    <dl className="grid gap-4 border-t border-border pt-4">
                      <InfoItem icon={Building2} label="Fabricante" value={plataforma.fabricante} />
                      <InfoItem
                        icon={CalendarDays}
                        label="Lanzamiento"
                        value={plataforma.anio_lanzamiento}
                      />
                    </dl>
                    <Link
                      href={`/?plataforma=${plataforma.id}`}
                      className="mt-auto rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
                    >
                      Ver más juegos de {plataforma.nombre}
                    </Link>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Sin información de plataforma.</p>
                )}
              </aside>
            </div>
          </article>
        </>
      )}
    </main>
  )
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value?: string | number | null
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div>
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="font-medium">{value ?? '—'}</dd>
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true">
      <div className="aspect-video w-full animate-pulse rounded-3xl bg-secondary sm:aspect-[21/9]" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-56 animate-pulse rounded-2xl bg-secondary lg:col-span-2" />
        <div className="h-56 animate-pulse rounded-2xl bg-secondary" />
      </div>
    </div>
  )
}
