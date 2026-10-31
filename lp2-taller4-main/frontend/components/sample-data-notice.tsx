import { Info } from 'lucide-react'

export function SampleDataNotice() {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
      <p>
        <span className="font-medium">Mostrando datos de ejemplo.</span>{' '}
        <span className="text-muted-foreground">
          La API de FastAPI aún no responde en <code className="font-mono text-xs">/api/</code>. Los
          datos reales aparecerán automáticamente al conectarla.
        </span>
      </p>
    </div>
  )
}
