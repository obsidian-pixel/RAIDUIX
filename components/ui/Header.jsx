'use client'

import ColorModeToggle from './ColorModeToggle'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="h-16 pt-2 pb-2 glass-panel border-b border-border/50 flex items-center justify-between px-6">
      <Logo />
      <div className="flex items-center gap-4">
        <ColorModeToggle />
      </div>
    </header>
  )
}