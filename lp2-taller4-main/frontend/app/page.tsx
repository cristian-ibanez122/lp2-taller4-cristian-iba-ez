import { GameCatalog } from '@/components/game-catalog'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ plataforma?: string }>
}) {
  const { plataforma } = await searchParams
  const parsed = plataforma ? Number(plataforma) : NaN
  const initialPlataformaId = Number.isFinite(parsed) ? parsed : null

  return (
    <main className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_60%_60%_at_20%_0%,oklch(0.62_0.23_295/0.25),transparent),radial-gradient(ellipse_50%_50%_at_85%_10%,oklch(0.68_0.16_245/0.2),transparent)]"
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <header className="flex max-w-2xl flex-col gap-4">
          <span className="w-fit rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            Catálogo GameFlow
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Explora tu próximo{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              juego
            </span>
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            Descubre títulos de todas las plataformas, busca por nombre y encuentra la aventura que
            estás buscando.
          </p>
        </header>

        <GameCatalog key={initialPlataformaId ?? 'all'} initialPlataformaId={initialPlataformaId} />
      </div>
    </main>
  )
}
