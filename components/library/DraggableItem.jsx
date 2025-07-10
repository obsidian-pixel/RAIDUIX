'use client'

import { useState } from 'react'
import ThemedButton from '@/components/themed/ThemedButton'
import ThemedInput from '@/components/themed/ThemedInput'
import ThemedCard from '@/components/themed/ThemedCard'
import ThemedBadge from '@/components/themed/ThemedBadge'
import ThemedCheckbox from '@/components/themed/ThemedCheckbox'
import ThemedSwitch from '@/components/themed/ThemedSwitch'
import ThemedSlider from '@/components/themed/ThemedSlider'
import ThemedChart from '@/components/themed/ThemedChart'
import ThemedAccordion from '@/components/themed/ThemedAccordion'
import ThemedCarousel from '@/components/themed/ThemedCarousel'
import ThemedAlert from '@/components/themed/ThemedAlert'
import ThemedProgress from '@/components/themed/ThemedProgress'
import ThemedTable from '@/components/themed/ThemedTable'
import ThemedAvatar from '@/components/themed/ThemedAvatar'
import ThemedBreadcrumb from '@/components/themed/ThemedBreadcrumb'
import ThemedPagination from '@/components/themed/ThemedPagination'
import ThemedModal from '@/components/themed/ThemedModal'
import ThemedTooltip from '@/components/themed/ThemedTooltip'
import ThemedSpinner from '@/components/themed/ThemedSpinner'
import ThemedTabs from '@/components/themed/ThemedTabs'

export default function DraggableItem({ id, name, type, icon: Icon, chartType }) {
  const [isDragging, setIsDragging] = useState(false)
  
  const handleDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.setData('application/json', JSON.stringify({
      id,
      name,
      type,
      chartType
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
      slider: { value: 50, size: 'sm' },
      chart: { type: chartType || 'bar', title: 'Chart', size: 'sm' },
      accordion: { 
        items: [{ title: 'Section 1', content: 'Content' }], 
        size: 'sm' 
      },
      carousel: { 
        items: [{ title: 'Slide 1', content: 'Content' }], 
        size: 'sm', 
        showDots: false, 
        showArrows: false, 
        autoPlay: false 
      },
      alert: { type: 'info', title: 'Alert', message: 'Message', size: 'sm' },
      progress: { value: 50, size: 'sm', showLabel: false },
      table: { 
        data: [{ name: 'John', email: 'john@test.com' }], 
        columns: [{ key: 'name', label: 'Name' }], 
        size: 'sm' 
      },
      avatar: { fallback: 'JD', size: 'sm' },
      breadcrumb: { 
        items: [{ label: 'Home', href: '/' }, { label: 'Page', href: '/page' }], 
        size: 'sm' 
      },
      pagination: { currentPage: 1, totalPages: 5, size: 'sm' },
      modal: { isOpen: false, title: 'Modal', size: 'sm' },
      tooltip: { content: 'Tooltip', size: 'sm', children: <span>Hover me</span> },
      spinner: { size: 'sm' },
      tabs: { 
        tabs: [{ id: 'tab1', label: 'Tab 1', content: 'Content' }], 
        size: 'sm' 
      }
    }
    
    const props = previewProps[type] || {}
    
    try {
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
        case 'chart':
          return <ThemedChart {...props} />
        case 'accordion':
          return <ThemedAccordion {...props} />
        case 'carousel':
          return <ThemedCarousel {...props} />
        case 'alert':
          return <ThemedAlert {...props} />
        case 'progress':
          return <ThemedProgress {...props} />
        case 'table':
          return <ThemedTable {...props} />
        case 'avatar':
          return <ThemedAvatar {...props} />
        case 'breadcrumb':
          return <ThemedBreadcrumb {...props} />
        case 'pagination':
          return <ThemedPagination {...props} />
        case 'modal':
          return <div className="text-xs text-muted-foreground">Modal (Click to open)</div>
        case 'tooltip':
          return <ThemedTooltip {...props} />
        case 'spinner':
          return <ThemedSpinner {...props} />
        case 'tabs':
          return <ThemedTabs {...props} />
        default:
          return <div className="w-full h-8 bg-muted/50 rounded" />
      }
    } catch (error) {
      return <div className="w-full h-8 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">Preview</div>
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
      <div className="pointer-events-none overflow-hidden">
        {renderPreview()}
      </div>
    </div>
  )
}