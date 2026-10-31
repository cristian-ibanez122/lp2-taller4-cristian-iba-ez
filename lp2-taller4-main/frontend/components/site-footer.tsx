export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>
          <span className="font-heading font-semibold text-foreground">GameFlow</span> · Catálogo de
          videojuegos
        </p>
        <p>Hecho con Next.js y FastAPI</p>
      </div>
    </footer>
  )
}
