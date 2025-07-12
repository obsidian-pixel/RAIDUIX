'use client'

import { Layout } from 'lucide-react'

export default function LayoutSettings() {
  return (
    <div className="glass-panel p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Layout className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">Layout</span>
      </div>
      <div className="text-xs text-muted-foreground">
        Responsive and layout controls will be available here.
      </div>
    </div>
  )
}