'use client'

import { Moon, Sun } from 'lucide-react'
import ColorModeToggle from './ColorModeToggle'
import useAppStore from '@/stores/useAppStore'

export default function Header() {
  const { colorMode } = useAppStore()
  
  return (
    <header className="h-16 glass-panel border-b border-border/50 flex items-center justify-between px-6">
      
      {/* Central controls */}
      <div className="flex items-center gap-4">
        <div className="w-px h-6 bg-border/50" />
        <ColorModeToggle />
      </div>
      
      {/* Right side - can add more controls later */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Visual UI Builder
        </span>
      </div>
    </header>
  )
}