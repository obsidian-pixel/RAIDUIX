'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedCheckbox({ 
  label = 'Checkbox', 
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
    const baseClasses = 'relative flex items-center gap-2 cursor-pointer'
    const sizeClasses = {
      sm: 'text-sm',
      default: 'text-sm',
      lg: 'text-base'
    }
    
    const checkboxSizeClasses = {
      sm: 'w-4 h-4',
      default: 'w-5 h-5',
      lg: 'w-6 h-6'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    const checkboxSizeClass = checkboxSizeClasses[size] || checkboxSizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          container: `${baseClasses} ${sizeClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
          checkbox: `
            ${checkboxSizeClass} rounded border-2 border-gray-300 transition-all
            ${isChecked ? 'bg-blue-600 border-blue-600' : 'bg-white'}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
          checkbox: `
            ${checkboxSizeClass} rounded glass-panel border border-white/30 transition-all
            ${isChecked ? 'bg-white/20 border-white/50' : ''}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
          checkbox: `
            ${checkboxSizeClass} rounded transition-all
            ${colorMode === 'dark' 
              ? (isChecked ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-inner' : 'skeuo-input-dark')
              : (isChecked ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-inner' : 'skeuo-input')
            }
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass}`,
          checkbox: `${checkboxSizeClass} rounded border border-input`
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
        <div className={classes.checkbox}>
          {isChecked && (
            <Check className="w-full h-full p-0.5 text-white" strokeWidth={3} />
          )}
        </div>
      </div>
      <span className={disabled ? 'text-muted-foreground' : 'text-foreground'}>
        {label}
      </span>
    </label>
  )
}