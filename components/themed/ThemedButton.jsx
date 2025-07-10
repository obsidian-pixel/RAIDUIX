'use client'

import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedButton({ 
  label = 'Button', 
  variant = 'default', 
  size = 'default',
  disabled = false,
  onClick,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [isPressed, setIsPressed] = useState(false)
  
  const getThemeClasses = () => {
    const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      default: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return `
          ${baseClasses} ${sizeClass} rounded-md
          ${variant === 'default' 
            ? 'material-button text-white hover:bg-blue-600 focus:ring-blue-500' 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `
      
      case 'glass':
        return `
          ${baseClasses} ${sizeClass} rounded-lg glass-button
          ${variant === 'default' 
            ? 'text-white hover:bg-white/30 focus:ring-white/50' 
            : 'text-foreground hover:bg-accent/30 focus:ring-accent/50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `
      
      case 'skeuo':
        return `
          ${baseClasses} ${sizeClass} rounded-lg
          ${colorMode === 'dark' ? 'skeuo-button-dark text-white' : 'skeuo-button text-gray-900'}
          ${variant === 'default' ? '' : 'opacity-70'}
          ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
          ${isPressed ? 'scale-95' : ''}
        `
      
      default:
        return `${baseClasses} ${sizeClass} rounded-md bg-primary text-primary-foreground hover:bg-primary/90`
    }
  }
  
  const handleMouseDown = () => {
    if (activeTheme === 'skeuo') {
      setIsPressed(true)
    }
  }
  
  const handleMouseUp = () => {
    if (activeTheme === 'skeuo') {
      setIsPressed(false)
    }
  }
  
  const handleMouseLeave = () => {
    if (activeTheme === 'skeuo') {
      setIsPressed(false)
    }
  }
  
  return (
    <button
      className={getThemeClasses()}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {label}
    </button>
  )
}