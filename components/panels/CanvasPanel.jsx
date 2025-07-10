'use client'

import { useState } from 'react'
import { Plus, Minus, RotateCcw, Smartphone, Tablet, Monitor } from 'lucide-react'
import CanvasComponent from '@/components/canvas/CanvasComponent'
import useAppStore from '@/stores/useAppStore'

export default function CanvasPanel() {
  const { canvasComponents, clearCanvas } = useAppStore()
  const [zoom, setZoom] = useState(100)
  const [deviceMode, setDeviceMode] = useState('desktop')
  
  const deviceSizes = {
    mobile: { width: 375, name: 'Mobile' },
    tablet: { width: 768, name: 'Tablet' },
    desktop: { width: 1200, name: 'Desktop' }
  }
  
  const handleZoomIn = () => setZoom(prev => Math.min(200, prev + 10))
  const handleZoomOut = () => setZoom(prev => Math.max(50, prev - 10))
  const handleResetZoom = () => setZoom(100)
  
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    const componentData = JSON.parse(e.dataTransfer.getData('application/json'))
    
    // Add component to canvas
    const { addComponent } = useAppStore.getState()
    addComponent({
      type: componentData.type,
      props: getDefaultProps(componentData.type)
    })
  }
  
  const getDefaultProps = (type) => {
    const defaults = {
      button: { label: 'Button', variant: 'default', size: 'default' },
      input: { placeholder: 'Enter text...', type: 'text' },
      card: { title: 'Card Title', content: 'This is a card component.' },
      badge: { text: 'Badge', variant: 'default' },
      checkbox: { label: 'Checkbox', checked: false },
      switch: { label: 'Switch', checked: false },
      slider: { label: 'Slider', min: 0, max: 100, value: 50 }
    }
    return defaults[type] || {}
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Canvas Controls */}
      <div className="p-4 border-b border-border/50 bg-card/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Canvas</span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-accent/50 rounded"
                title="Zoom out"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm min-w-[50px] text-center">{zoom}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-accent/50 rounded"
                title="Zoom in"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 hover:bg-accent/50 rounded"
                title="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Device Mode Toggle */}
            <div className="flex items-center gap-1 p-1 glass-panel rounded-lg">
              {Object.entries(deviceSizes).map(([key, { name }]) => {
                const Icon = key === 'mobile' ? Smartphone : key === 'tablet' ? Tablet : Monitor
                return (
                  <button
                    key={key}
                    onClick={() => setDeviceMode(key)}
                    className={`
                      p-1.5 rounded transition-all
                      ${deviceMode === key 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                    title={name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={clearCanvas}
              className="px-3 py-1.5 text-sm glass-panel rounded-lg text-muted-foreground hover:text-foreground transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 bg-gradient-to-br from-background to-muted/20 p-8 overflow-auto">
        <div className="flex justify-center">
          <div
            className="bg-card border border-border/50 rounded-lg shadow-lg transition-all duration-300 min-h-[400px]"
            style={{
              width: `${deviceSizes[deviceMode].width}px`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Canvas Content */}
            <div className="p-6">
              {canvasComponents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-muted/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-2">Drag components here</p>
                  <p className="text-sm text-muted-foreground">
                    Start building your UI by dragging components from the library
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {canvasComponents.map((component) => (
                    <CanvasComponent
                      key={component.id}
                      id={component.id}
                      type={component.type}
                      props={component.props}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}