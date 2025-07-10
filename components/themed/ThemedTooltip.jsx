'use client'

import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedTooltip({ 
  content = 'Tooltip text',
  children,
  position = 'top',
  delay = 0,
  size = 'default',
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  
  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId)
    const id = setTimeout(() => setIsVisible(true), delay)
    setTimeoutId(id)
  }
  
  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId)
    setIsVisible(false)
  }
  
  const getPositionClasses = () => {
    const positions = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    }
    return positions[position] || positions.top
  }
  
  const getArrowClasses = () => {
    const arrows = {
      top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
      bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
      left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
      right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
    }
    return arrows[position] || arrows.top
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'absolute z-50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 pointer-events-none'
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      default: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return `${baseClasses} ${sizeClass} bg-gray-900 text-white shadow-lg`
      
      case 'glass':
        return `${baseClasses} ${sizeClass} glass-panel border border-white/30 text-white backdrop-blur-md`
      
      case 'skeuo':
        return `${baseClasses} ${sizeClass} ${
          colorMode === 'dark' 
            ? 'bg-gray-800 text-white shadow-2xl' 
            : 'bg-white text-gray-900 shadow-2xl border border-gray-200'
        }`
      
      default:
        return `${baseClasses} ${sizeClass} bg-popover text-popover-foreground border border-border shadow-md`
    }
  }
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      {...props}
    >
      {children}
      
      {isVisible && (
        <div className={`${getThemeClasses()} ${getPositionClasses()}`}>
          {content}
          <div 
            className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`}
            style={{
              borderTopColor: activeTheme === 'material' ? '#1f2937' : 
                             activeTheme === 'glass' ? 'rgba(255, 255, 255, 0.2)' :
                             activeTheme === 'skeuo' ? (colorMode === 'dark' ? '#374151' : '#ffffff') :
                             'hsl(var(--popover))'
            }}
          />
        </div>
      )}
    </div>
  )
}