'use client'

import { useState, useRef } from 'react'
import { Plus, Smartphone, Tablet, Monitor } from 'lucide-react'
import CanvasComponent from '@/components/canvas/CanvasComponent'
import useAppStore from '@/stores/useAppStore'
import Grid from '@/components/canvas/Grid'

export default function CanvasPanel() {
  const { 
    canvasComponents, addComponent, updateComponentPosition,
    clearCanvas, zoom, showGrid, snapToGrid, setSelectedComponent 
  } = useAppStore()
  
  const [deviceMode, setDeviceMode] = useState('desktop')
  const canvasRef = useRef(null)

  const deviceSizes = {
    mobile: { width: 375, name: 'Mobile' },
    tablet: { width: 768, name: 'Tablet' },
    desktop: { width: '100%', name: 'Desktop' }
  }
  
  const handleCanvasClick = () => {
    setSelectedComponent(null);
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const componentData = JSON.parse(e.dataTransfer.getData('application/json'))
    const canvasRect = canvasRef.current.getBoundingClientRect()
    
    // Adjust position for canvas zoom and offset
    let newPosition = {
      x: (e.clientX - canvasRect.left) / (zoom / 100),
      y: (e.clientY - canvasRect.top) / (zoom / 100)
    }

    // Snap to grid logic
    if (snapToGrid) {
      const gridSize = 20; // The size of the grid cells
      newPosition.x = Math.round(newPosition.x / gridSize) * gridSize;
      newPosition.y = Math.round(newPosition.y / gridSize) * gridSize;
    }

    addComponent({
      type: componentData.type,
      props: getDefaultProps(componentData.type, componentData.chartType),
      position: newPosition
    })
  }

  const getDefaultProps = (type, chartType) => {
    // This function remains the same as before
    const defaults = {
      button: { label: 'Button', variant: 'default', size: 'default' },
      input: { placeholder: 'Enter text...', type: 'text' },
      card: { title: 'Card Title', content: 'This is a card component.' },
      badge: { text: 'Badge', variant: 'default' },
      checkbox: { label: 'Checkbox', checked: false },
      switch: { label: 'Switch', checked: false },
      slider: { label: 'Slider', min: 0, max: 100, value: 50 },
      chart: { type: chartType || 'bar', title: 'Sample Chart' },
      accordion: { 
        items: [
          { title: 'Section 1', content: 'This is the content for section 1.' },
          { title: 'Section 2', content: 'This is the content for section 2.' }
        ] 
      },
      carousel: { 
        items: [
          { title: 'Slide 1', content: 'This is the first slide content.' },
          { title: 'Slide 2', content: 'This is the second slide content.' },
          { title: 'Slide 3', content: 'This is the third slide content.' }
        ] 
      },
      alert: { type: 'info', title: 'Information', message: 'This is an informational alert.' },
      progress: { value: 75, label: 'Progress' },
      table: {},
      avatar: { fallback: 'U', size: 'default' },
      breadcrumb: { 
        items: [
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Current Page', href: '/current' }
        ] 
      },
      pagination: { currentPage: 1, totalPages: 10 },
      modal: { isOpen: false, title: 'Modal Title' },
      tooltip: { content: 'This is a tooltip', children: 'Hover me' },
      spinner: { size: 'default', text: 'Loading...' },
      tabs: { 
        tabs: [
          { id: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
          { id: 'tab2', label: 'Tab 2', content: 'Content for tab 2' },
          { id: 'tab3', label: 'Tab 3', content: 'Content for tab 3' }
        ] 
      }
    };
    return defaults[type] || {};
  }
  
  return (
    <div className="h-full flex flex-col" onClick={handleCanvasClick}>
      {/* Canvas Controls */}
      <div className="p-4 border-b border-border/50 bg-card/30">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Canvas</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 glass-panel rounded-lg">
              {Object.entries(deviceSizes).map(([key, { name }]) => {
                const Icon = key === 'mobile' ? Smartphone : key === 'tablet' ? Tablet : Monitor
                return (
                  <button
                    key={key}
                    onClick={(e) => { e.stopPropagation(); setDeviceMode(key); }}
                    className={`p-1.5 rounded transition-all ${deviceMode === key ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    title={name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              })}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); clearCanvas(); }}
              className="px-3 py-1.5 text-sm glass-panel rounded-lg text-muted-foreground hover:text-foreground transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div 
        className="flex-1 overflow-auto bg-background"
      >
        <div
          ref={canvasRef}
          className="relative bg-card mx-auto my-8 transition-all duration-300"
          style={{
            width: deviceSizes[deviceMode].width,
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            minHeight: 'calc(100% - 4rem)'
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {showGrid && <Grid zoom={zoom} />}
          {canvasComponents.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-2">Drag components here</p>
                <p className="text-sm text-muted-foreground">
                  Start building your UI by dragging components from the library
                </p>
              </div>
            </div>
          ) : (
            canvasComponents.map((component, index) => (
              <CanvasComponent
                key={component.id}
                id={component.id}
                type={component.type}
                props={component.props}
                position={component.position}
                zIndex={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}