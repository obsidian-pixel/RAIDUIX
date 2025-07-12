'use client'

import { Settings, Palette, Layout } from 'lucide-react'
import PropertyEditor from './PropertyEditor'
import useAppStore from '@/stores/useAppStore'
import CanvasSettings from './CanvasSettings'
import LayoutSettings from './LayoutSettings'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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

          <Accordion type="multiple" defaultValue={['canvas-settings', 'layout-settings']}>
            <AccordionItem value="canvas-settings">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>Canvas Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CanvasSettings />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="layout-settings">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  <span>Layout</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <LayoutSettings />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  )
}