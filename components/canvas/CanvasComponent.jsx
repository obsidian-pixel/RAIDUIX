'use client'

import { useState } from 'react'
import { X, Move, ArrowUp, ArrowDown } from 'lucide-react'
import { useDraggable } from '@dnd-kit/core'
import ThemedButton from '@/components/themed/ThemedButton'
import ThemedInput from '@/components/themed/ThemedInput'
import ThemedCard from '@/components/themed/ThemedCard'
import ThemedBadge from '@/components/themed/ThemedBadge'
import ThemedCheckbox from '@/components/themed/ThemedCheckbox'
import ThemedSwitch from '@/components/themed/ThemedSwitch'
import ThemedSlider from '@/components/themed/ThemedSlider'
import useAppStore from '@/stores/useAppStore'

export default function CanvasComponent({ id, type, props, position, zIndex }) {
  const { selectedComponentId, setSelectedComponent, removeComponent, reorderComponents } = useAppStore()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  
  const isSelected = selectedComponentId === id
  
  const style = {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
    zIndex,
    ...(transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : {}),
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setSelectedComponent(id)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    removeComponent(id)
  }
  
  const handleReorder = (e, direction) => {
    e.stopPropagation()
    reorderComponents(id, direction)
  }

  const renderComponent = () => {
    try {
      switch (type) {
        case 'button': return <ThemedButton {...props} />
        case 'input': return <ThemedInput {...props} />
        case 'card': return <ThemedCard {...props} />
        case 'badge': return <ThemedBadge {...props} />
        case 'checkbox': return <ThemedCheckbox {...props} />
        case 'switch': return <ThemedSwitch {...props} />
        case 'slider': return <ThemedSlider {...props} />
        default: return <div className="p-4 bg-muted/50 rounded">Component: {type}</div>
      }
    } catch (error) {
      return <div className="p-4 bg-red-100 text-red-800 rounded">Error: {error.message}</div>
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`group transition-all ${isSelected ? 'component-selected' : ''}`}
      onClick={handleClick}
    >
      {/* Drag Handle and Info */}
      <div 
        className={`absolute -top-8 left-0 flex items-center gap-1 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs z-20 
          ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        <div {...listeners} className="cursor-move p-1">
          <Move className="w-3 h-3" />
        </div>
        <span>{type}</span>
        <div className="flex items-center gap-1 ml-2">
          <button onClick={(e) => handleReorder(e, 'backward')} className="p-0.5 hover:bg-white/20 rounded"><ArrowDown className="w-3 h-3" /></button>
          <button onClick={(e) => handleReorder(e, 'forward')} className="p-0.5 hover:bg-white/20 rounded"><ArrowUp className="w-3 h-3" /></button>
          <button onClick={handleDelete} className="p-0.5 hover:bg-white/20 rounded"><X className="w-3 h-3" /></button>
        </div>
      </div>

      {renderComponent()}
    </div>
  )
}