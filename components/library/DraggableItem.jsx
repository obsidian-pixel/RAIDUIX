'use client'

import { useState } from 'react'
import ThemedButton from '@/components/themed/ThemedButton'
import ThemedInput from '@/components/themed/ThemedInput'
import ThemedCard from '@/components/themed/ThemedCard'
import ThemedBadge from '@/components/themed/ThemedBadge'
import ThemedCheckbox from '@/components/themed/ThemedCheckbox'
import ThemedSwitch from '@/components/themed/ThemedSwitch'
import ThemedSlider from '@/components/themed/ThemedSlider'

export default function DraggableItem({ id, name, type, icon: Icon }) {
  const [isDragging, setIsDragging] = useState(false)
  
  const handleDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.setData('application/json', JSON.stringify({
      id,
      name,
      type
    }))
    e.dataTransfer.effectAllowed = 'copy'
  }
  
  const handleDragEnd = () => {
    setIsDragging(false)
  }
  
  const renderPreview = () => {
    const previewProps = {
      button: { label: 'Button', size: 'sm' },
      input: { placeholder: 'Input', size: 'sm' },
      card: { title: 'Card', content: 'Preview', size: 'sm' },
      badge: { text: 'Badge', size: 'sm' },
      checkbox: { label: 'Checkbox', size: 'sm' },
      switch: { label: 'Switch', size: 'sm' },
      slider: { value: 50, size: 'sm' }
    }
    
    const props = previewProps[type] || {}
    
    switch (type) {
      case 'button':
        return <ThemedButton {...props} />
      case 'input':
        return <ThemedInput {...props} />
      case 'card':
        return <ThemedCard {...props} />
      case 'badge':
        return <ThemedBadge {...props} />
      case 'checkbox':
        return <ThemedCheckbox {...props} />
      case 'switch':
        return <ThemedSwitch {...props} />
      case 'slider':
        return <ThemedSlider {...props} />
      default:
        return <div className="w-full h-8 bg-muted/50 rounded" />
    }
  }
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        group cursor-move p-3 glass-panel rounded-lg border border-border/30 transition-all
        hover:border-border/60 hover:shadow-md
        ${isDragging ? 'opacity-50 scale-95' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{name}</span>
        </div>
        <div className="w-1 h-1 bg-muted-foreground/50 rounded-full group-hover:bg-muted-foreground transition-colors" />
      </div>
      
      {/* Preview */}
      <div className="pointer-events-none">
        {renderPreview()}
      </div>
    </div>
  )
}