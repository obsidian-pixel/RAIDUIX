'use client'

import { useState } from 'react'
import { X, Move } from 'lucide-react'
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
import useAppStore from '@/stores/useAppStore'

export default function CanvasComponent({ id, type, props }) {
  const { selectedComponentId, setSelectedComponent, removeComponent } = useAppStore()
  const [isHovered, setIsHovered] = useState(false)
  
  const isSelected = selectedComponentId === id
  
  const handleClick = (e) => {
    e.stopPropagation()
    setSelectedComponent(id)
  }
  
  const handleDelete = (e) => {
    e.stopPropagation()
    removeComponent(id)
  }
  
  const renderComponent = () => {
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
          return <ThemedModal {...props} />
        case 'tooltip':
          return <ThemedTooltip {...props} />
        case 'spinner':
          return <ThemedSpinner {...props} />
        case 'tabs':
          return <ThemedTabs {...props} />
        default:
          return <div className="p-4 bg-muted/50 rounded">Unknown component: {type}</div>
      }
    } catch (error) {
      return <div className="p-4 bg-red-100 text-red-800 rounded">Error rendering {type}: {error.message}</div>
    }
  }
  
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative group cursor-pointer transition-all
        ${isSelected ? 'component-selected' : ''}
        ${isHovered && !isSelected ? 'component-hover' : ''}
      `}
    >
      {/* Selection/Hover Controls */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-8 left-0 flex items-center gap-1 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs z-10">
          <Move className="w-3 h-3" />
          <span>{type}</span>
          <button
            onClick={handleDelete}
            className="ml-1 p-0.5 hover:bg-white/20 rounded"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {/* Component Content */}
      {renderComponent()}
    </div>
  )
}