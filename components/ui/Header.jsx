'use client'

import { Sparkles, Moon, Sun } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import ColorModeToggle from './ColorModeToggle'
import useAppStore from '@/stores/useAppStore'

export default function Header() {
  const { colorMode } = useAppStore()
  
  return (
    <header className="h-16 glass-panel border-b border-border/50 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Raiduix
        </h1>
      </div>
      
      {/* Central controls */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
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