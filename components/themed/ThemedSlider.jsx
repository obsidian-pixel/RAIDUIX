'use client'

import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedSlider({ 
  label = 'Slider', 
  min = 0,
  max = 100,
  value = 50,
  onChange,
  size = 'default',
  disabled = false,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [currentValue, setCurrentValue] = useState(value)
  
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    setCurrentValue(newValue)
    onChange?.(newValue)
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'w-full'
    const sizeClasses = {
      sm: 'h-1',
      default: 'h-2',
      lg: 'h-3'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return `
          ${baseClasses} ${sizeClass} rounded-lg appearance-none bg-gray-200 dark:bg-gray-700
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          slider-thumb:appearance-none slider-thumb:w-5 slider-thumb:h-5 slider-thumb:rounded-full 
          slider-thumb:bg-blue-600 slider-thumb:cursor-pointer slider-thumb:shadow-md
        `
      
      case 'glass':
        return `
          ${baseClasses} ${sizeClass} rounded-lg appearance-none glass-panel
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          slider-thumb:appearance-none slider-thumb:w-5 slider-thumb:h-5 slider-thumb:rounded-full 
          slider-thumb:bg-white/80 slider-thumb:cursor-pointer slider-thumb:backdrop-blur-sm
        `
      
      case 'skeuo':
        return `
          ${baseClasses} ${sizeClass} rounded-lg appearance-none transition-all
          ${colorMode === 'dark' ? 'skeuo-input-dark' : 'skeuo-input'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          slider-thumb:appearance-none slider-thumb:w-5 slider-thumb:h-5 slider-thumb:rounded-full 
          slider-thumb:cursor-pointer slider-thumb:shadow-lg
          ${colorMode === 'dark' 
            ? 'slider-thumb:bg-gradient-to-br slider-thumb:from-gray-300 slider-thumb:to-gray-400' 
            : 'slider-thumb:bg-gradient-to-br slider-thumb:from-white slider-thumb:to-gray-100'
          }
        `
      
      default:
        return `${baseClasses} ${sizeClass} rounded-lg appearance-none bg-gray-200`
    }
  }
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm ${disabled ? 'text-muted-foreground' : 'text-foreground'}`}>
          {label}
        </span>
        <span className="text-sm text-muted-foreground">
          {currentValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        className={getThemeClasses()}
        {...props}
      />
    </div>
  )
}