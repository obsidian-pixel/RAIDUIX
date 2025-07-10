'use client'

import { useState } from 'react'
import { Palette, Droplets, Box } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function ThemeToggle() {
  const { activeTheme, setActiveTheme } = useAppStore()
  
  const themes = [
    { id: 'material', name: 'Neo-Material', icon: Box },
    { id: 'glass', name: 'Glass', icon: Droplets },
    { id: 'skeuo', name: 'Skeuo', icon: Palette }
  ]
  
  return (
    <div className="flex items-center gap-1 p-1 glass-panel rounded-lg">
      {themes.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTheme(id)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium
            ${activeTheme === id 
              ? 'bg-primary/20 text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }
          `}
        >
          <Icon className="w-4 h-4" />
          {name}
        </button>
      ))}
    </div>
  )
}