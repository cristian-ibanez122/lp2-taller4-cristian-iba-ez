import type { Metadata } from 'next'
import { PlatformsList } from '@/components/platforms-list'

export const metadata: Metadata = {
  title: 'Plataformas',
  description: 'Consolas y sistemas disponibles en el catálogo de GameFlow.',
}

export default function PlataformasPage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <header className="flex max-w-2xl flex-col gap-3">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Plataformas</h1>
        <p className="text-pretty text-lg text-muted-foreground">
          Elige una plataforma para ver todos sus videojuegos en el catálogo.
        </p>
      </header>
      <PlatformsList />
    </main>
  )
}
