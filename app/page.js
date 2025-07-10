'use client'

import { useEffect } from 'react'
import AppShell from '@/components/ui/AppShell'
import useAppStore from '@/stores/useAppStore'

export default function RaiduixApp() {
  const { colorMode } = useAppStore()
  
  useEffect(() => {
    // Apply theme class to html element
    const html = document.documentElement
    html.classList.toggle('dark', colorMode === 'dark')
  }, [colorMode])
  
  return (
    <div className={`App ${colorMode}`}>
      <AppShell />
    </div>
  )
}