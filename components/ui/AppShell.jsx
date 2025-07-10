'use client'

import Header from './Header'
import WorkspaceLayout from './WorkspaceLayout'

export default function AppShell() {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Header />
      <WorkspaceLayout />
    </div>
  )
}