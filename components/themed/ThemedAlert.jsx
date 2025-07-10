'use client'

import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedAlert({ 
  type = 'info', 
  title = 'Alert',
  message = 'This is an alert message.',
  dismissible = true,
  size = 'default',
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) return null
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      case 'error':
        return <XCircle className="w-5 h-5" />
      case 'warning':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }
  
  const getTypeColors = () => {
    switch (type) {
      case 'success':
        return {
          material: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300',
          glass: 'bg-green-500/10 border-green-400/30 text-green-300',
          skeuo: colorMode === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
        }
      case 'error':
        return {
          material: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300',
          glass: 'bg-red-500/10 border-red-400/30 text-red-300',
          skeuo: colorMode === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'
        }
      case 'warning':
        return {
          material: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300',
          glass: 'bg-yellow-500/10 border-yellow-400/30 text-yellow-300',
          skeuo: colorMode === 'dark' ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
        }
      default:
        return {
          material: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300',
          glass: 'bg-blue-500/10 border-blue-400/30 text-blue-300',
          skeuo: colorMode === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
        }
    }
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'rounded-lg border transition-all duration-200 flex items-start gap-3'
    const sizeClasses = {
      sm: 'p-3 text-sm',
      default: 'p-4 text-sm',
      lg: 'p-6 text-base'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    const typeColors = getTypeColors()
    
    switch (activeTheme) {
      case 'material':
        return `${baseClasses} ${sizeClass} ${typeColors.material}`
      
      case 'glass':
        return `${baseClasses} ${sizeClass} glass-panel ${typeColors.glass}`
      
      case 'skeuo':
        return `${baseClasses} ${sizeClass} ${typeColors.skeuo} ${
          colorMode === 'dark' ? 'skeuo-card-dark' : 'skeuo-card'
        }`
      
      default:
        return `${baseClasses} ${sizeClass} bg-card border-border text-foreground`
    }
  }
  
  return (
    <div className={getThemeClasses()} {...props}>
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="opacity-90">{message}</p>
      </div>
      
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}