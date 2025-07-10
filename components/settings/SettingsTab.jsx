'use client'

import { Settings, Palette, Layout } from 'lucide-react'
import PropertyEditor from './PropertyEditor'
import useAppStore from '@/stores/useAppStore'

export default function SettingsTab() {
  const { selectedComponentId, getSelectedComponent } = useAppStore()
  const selectedComponent = getSelectedComponent()
  
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      {selectedComponent ? (
        <PropertyEditor component={selectedComponent} />
      ) : (
        <div className="p-4">
          <div className="text-center py-8">
            <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Component Selected</h3>
            <p className="text-muted-foreground text-sm">
              Select a component from the canvas to edit its properties
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Canvas Settings</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Global canvas settings and theme options
              </p>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Layout className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Layout</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Adjust canvas layout and responsive settings
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}