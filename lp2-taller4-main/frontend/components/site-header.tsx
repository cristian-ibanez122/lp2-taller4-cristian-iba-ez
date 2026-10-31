'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Gamepad2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/plataformas', label: 'Plataformas' },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="GameFlow, ir al inicio">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
            <Gamepad2 className="size-5 text-primary-foreground" aria-hidden="true" />
          </span>
          <span className="font-heading text-lg font-bold tracking-tight">
            Game<span className="text-primary">Flow</span>
          </span>
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/' || pathname.startsWith('/juego')
                  : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
