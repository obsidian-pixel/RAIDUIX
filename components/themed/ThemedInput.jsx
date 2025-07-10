'use client'

import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedInput({ 
  placeholder = 'Enter text...', 
  type = 'text',
  size = 'default',
  disabled = false,
  value,
  onChange,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [isFocused, setIsFocused] = useState(false)
  
  const getThemeClasses = () => {
    const baseClasses = 'transition-all duration-200 focus:outline-none'
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      default: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return `
          ${baseClasses} ${sizeClass} w-full
          material-input rounded-t-md
          ${isFocused ? 'ring-2 ring-blue-500' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `
      
      case 'glass':
        return `
          ${baseClasses} ${sizeClass} w-full rounded-lg glass-input
          text-foreground placeholder:text-muted-foreground
          ${isFocused ? 'ring-2 ring-white/30' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `
      
      case 'skeuo':
        return `
          ${baseClasses} ${sizeClass} w-full rounded-lg
          ${colorMode === 'dark' ? 'skeuo-input-dark text-white' : 'skeuo-input text-gray-900'}
          placeholder:text-muted-foreground
          ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
        `
      
      default:
        return `${baseClasses} ${sizeClass} w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2`
    }
  }
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={getThemeClasses()}
      disabled={disabled}
      {...props}
    />
  )
}