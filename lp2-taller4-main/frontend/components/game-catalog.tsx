'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { Search, SearchX, X } from 'lucide-react'
import { usePlataformas, useVideojuegos } from '@/hooks/use-gameflow'
import { cn } from '@/lib/utils'
import { GameCard } from './game-card'
import { SampleDataNotice } from './sample-data-notice'

interface GameCatalogProps {
  initialPlataformaId?: number | null
}

export function GameCatalog({ initialPlataformaId = null }: GameCatalogProps) {
  const [query, setQuery] = useState('')
  const [plataformaId, setPlataformaId] = useState<number | null>(initialPlataformaId)
  const deferredQuery = useDeferredValue(query)

  const { data: juegosResult, error, isLoading } = useVideojuegos(plataformaId)
  const { data: plataformasResult } = usePlataformas()

  const plataformas = plataformasResult?.data ?? []
  const plataformaById = useMemo(
    () => new Map(plataformas.map((p) => [p.id, p.nombre])),
    [plataformas],
  )

  const juegos = useMemo(() => {
    const term = deferredQuery.trim().toLocaleLowerCase('es')
    const list = juegosResult?.data ?? []
    return term ? list.filter((j) => j.titulo.toLocaleLowerCase('es').includes(term)) : list
  }, [juegosResult, deferredQuery])

  const usingSample = juegosResult?.source === 'ejemplo' || plataformasResult?.source === 'ejemplo'

  return (
    <section aria-labelledby="catalogo-titulo" className="flex flex-col gap-6">
      <h2 id="catalogo-titulo" className="sr-only">
        Catálogo
      </h2>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur sm:p-5">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="buscar" className="sr-only">
            Buscar videojuegos por título
          </label>
          <input
            id="buscar"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título..."
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-input bg-background pl-12 pr-11 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Limpiar búsqueda"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span id="filtro-plataforma" className="shrink-0 text-sm font-medium text-muted-foreground">
            Plataforma
          </span>
          <div
            role="group"
            aria-labelledby="filtro-plataforma"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]"
          >
            <FilterChip active={plataformaId === null} onClick={() => setPlataformaId(null)}>
              Todas
            </FilterChip>
            {plataformas.map((p) => (
              <FilterChip
                key={p.id}
                active={plataformaId === p.id}
                onClick={() => setPlataformaId(p.id)}
              >
                {p.nombre}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {usingSample && <SampleDataNotice />}

      <div className="flex items-center justify-between text-sm text-muted-foreground" aria-live="polite">
        {!isLoading && !error && (
          <p>
            {juegos.length} {juegos.length === 1 ? 'juego encontrado' : 'juegos encontrados'}
          </p>
        )}
      </div>

      {error ? (
        <EmptyState
          title="No pudimos cargar los videojuegos"
          description="Verifica que la API esté disponible e inténtalo de nuevo."
        />
      ) : isLoading && !juegosResult ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-video animate-pulse bg-secondary" />
              <div className="flex flex-col gap-3 p-4">
                <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      ) : juegos.length === 0 ? (
        <EmptyState
          title="Sin resultados"
          description="Prueba con otro título o selecciona una plataforma diferente."
        />
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {juegos.map((juego) => (
            <li key={juego.id} className="flex">
              <div className="flex w-full flex-col [&>a]:flex-1">
                <GameCard
                  juego={juego}
                  plataformaNombre={
                    juego.plataforma?.nombre ??
                    (juego.plataforma_id != null ? plataformaById.get(juego.plataforma_id) : undefined)
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all',
        active
          ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30'
          : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
      <SearchX className="size-10 text-muted-foreground" aria-hidden="true" />
      <p className="font-heading text-lg font-semibold">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
