'use client'

import { Moon, Sun } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function ColorModeToggle() {
  const { colorMode, setColorMode } = useAppStore()
  
  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }
  
  return (
    <button
      onClick={toggleColorMode}
      className="p-2 glass-panel rounded-lg text-muted-foreground hover:text-foreground transition-all hover:bg-accent/50"
      title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
    >
      {colorMode === 'light' ? 
        <Moon className="w-5 h-5" /> : 
        <Sun className="w-5 h-5" />
      }
    </button>
  )
}