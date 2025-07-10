'use client'

import { User } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedAvatar({ 
  src,
  alt = 'Avatar',
  fallback,
  size = 'default',
  variant = 'circle',
  status,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'relative inline-flex items-center justify-center overflow-hidden transition-all duration-200'
    const sizeClasses = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      default: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg',
      xl: 'w-20 h-20 text-xl'
    }
    
    const variantClasses = {
      circle: 'rounded-full',
      square: 'rounded-lg'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    const variantClass = variantClasses[variant] || variantClasses.circle
    
    switch (activeTheme) {
      case 'material':
        return `${baseClasses} ${sizeClass} ${variantClass} bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium`
      
      case 'glass':
        return `${baseClasses} ${sizeClass} ${variantClass} glass-panel border border-white/30 text-white font-medium`
      
      case 'skeuo':
        return `${baseClasses} ${sizeClass} ${variantClass} font-medium ${
          colorMode === 'dark' 
            ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200 shadow-inner' 
            : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 shadow-inner'
        }`
      
      default:
        return `${baseClasses} ${sizeClass} ${variantClass} bg-muted text-muted-foreground font-medium`
    }
  }
  
  const getStatusClasses = () => {
    if (!status) return ''
    
    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500'
    }
    
    const statusSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      default: 'w-3 h-3',
      lg: 'w-4 h-4',
      xl: 'w-5 h-5'
    }
    
    return `absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-white dark:border-gray-800`
  }
  
  return (
    <div className={getThemeClasses()} {...props}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : fallback ? (
        <span>{getInitials(fallback)}</span>
      ) : (
        <User className="w-1/2 h-1/2" />
      )}
      
      {status && <div className={getStatusClasses()} />}
    </div>
  )
}