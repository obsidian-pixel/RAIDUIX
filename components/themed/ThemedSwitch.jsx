'use client'

import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedSwitch({ 
  label = 'Switch', 
  checked = false,
  onChange,
  size = 'default',
  disabled = false,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [isChecked, setIsChecked] = useState(checked)
  
  const handleChange = (e) => {
    const newChecked = e.target.checked
    setIsChecked(newChecked)
    onChange?.(newChecked)
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'relative flex items-center gap-3 cursor-pointer'
    const sizeClasses = {
      sm: 'text-sm',
      default: 'text-sm',
      lg: 'text-base'
    }
    
    const switchSizeClasses = {
      sm: 'w-8 h-4',
      default: 'w-10 h-5',
      lg: 'w-12 h-6'
    }
    
    const thumbSizeClasses = {
      sm: 'w-3 h-3',
      default: 'w-4 h-4',
      lg: 'w-5 h-5'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    const switchSizeClass = switchSizeClasses[size] || switchSizeClasses.default
    const thumbSizeClass = thumbSizeClasses[size] || thumbSizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          container: `${baseClasses} ${sizeClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
          switch: `
            ${switchSizeClass} rounded-full transition-all duration-200
            ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `,
          thumb: `
            ${thumbSizeClass} rounded-full bg-white shadow-md transition-all duration-200
            ${isChecked ? 'translate-x-full' : 'translate-x-0'}
          `
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
          switch: `
            ${switchSizeClass} rounded-full glass-panel border border-white/30 transition-all duration-200
            ${isChecked ? 'bg-white/20 border-white/50' : ''}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `,
          thumb: `
            ${thumbSizeClass} rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200
            ${isChecked ? 'translate-x-full' : 'translate-x-0'}
          `
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
          switch: `
            ${switchSizeClass} rounded-full transition-all duration-200
            ${colorMode === 'dark' 
              ? (isChecked ? 'bg-gradient-to-r from-blue-700 to-blue-800 shadow-inner' : 'skeuo-input-dark')
              : (isChecked ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-inner' : 'skeuo-input')
            }
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `,
          thumb: `
            ${thumbSizeClass} rounded-full transition-all duration-200
            ${colorMode === 'dark' 
              ? 'bg-gradient-to-br from-gray-300 to-gray-400 shadow-lg' 
              : 'bg-gradient-to-br from-white to-gray-100 shadow-lg'
            }
            ${isChecked ? 'translate-x-full' : 'translate-x-0'}
          `
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass}`,
          switch: `${switchSizeClass} rounded-full bg-gray-300`,
          thumb: `${thumbSizeClass} rounded-full bg-white`
        }
    }
  }
  
  const classes = getThemeClasses()
  
  return (
    <label className={classes.container}>
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div className={classes.switch}>
          <div className={classes.thumb} />
        </div>
      </div>
      <span className={disabled ? 'text-muted-foreground' : 'text-foreground'}>
        {label}
      </span>
    </label>
  )
}