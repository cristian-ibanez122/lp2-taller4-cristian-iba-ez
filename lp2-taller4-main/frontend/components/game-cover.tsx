'use client'

import { useState } from 'react'
import { Gamepad2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GameCoverProps {
  src?: string | null
  alt: string
  className?: string
}

export function GameCover({ src, alt, className }: GameCoverProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-primary/30 via-secondary to-accent/30',
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <Gamepad2 className="size-10 text-foreground/40" aria-hidden="true" />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- covers come from arbitrary API hosts
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  )
}
