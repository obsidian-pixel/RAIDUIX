'use client'

import useAppStore from '@/stores/useAppStore'

export default function ThemedSpinner({ 
  size = 'default',
  variant = 'default',
  text,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  
  const getThemeClasses = () => {
    const baseClasses = 'animate-spin rounded-full border-solid'
    const sizeClasses = {
      xs: 'w-4 h-4 border-2',
      sm: 'w-6 h-6 border-2',
      default: 'w-8 h-8 border-2',
      lg: 'w-12 h-12 border-3',
      xl: 'w-16 h-16 border-4'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return `${baseClasses} ${sizeClass} ${
          variant === 'primary' ? 'border-blue-600 border-t-transparent' :
          variant === 'success' ? 'border-green-600 border-t-transparent' :
          variant === 'warning' ? 'border-yellow-600 border-t-transparent' :
          variant === 'error' ? 'border-red-600 border-t-transparent' :
          'border-gray-300 border-t-transparent dark:border-gray-600'
        }`
      
      case 'glass':
        return `${baseClasses} ${sizeClass} ${
          variant === 'primary' ? 'border-blue-400 border-t-transparent' :
          variant === 'success' ? 'border-green-400 border-t-transparent' :
          variant === 'warning' ? 'border-yellow-400 border-t-transparent' :
          variant === 'error' ? 'border-red-400 border-t-transparent' :
          'border-white/50 border-t-transparent'
        }`
      
      case 'skeuo':
        return `${baseClasses} ${sizeClass} ${
          variant === 'primary' ? 
            (colorMode === 'dark' ? 'border-blue-400 border-t-transparent' : 'border-blue-600 border-t-transparent') :
          variant === 'success' ? 
            (colorMode === 'dark' ? 'border-green-400 border-t-transparent' : 'border-green-600 border-t-transparent') :
          variant === 'warning' ? 
            (colorMode === 'dark' ? 'border-yellow-400 border-t-transparent' : 'border-yellow-600 border-t-transparent') :
          variant === 'error' ? 
            (colorMode === 'dark' ? 'border-red-400 border-t-transparent' : 'border-red-600 border-t-transparent') :
            (colorMode === 'dark' ? 'border-gray-400 border-t-transparent' : 'border-gray-600 border-t-transparent')
        }`
      
      default:
        return `${baseClasses} ${sizeClass} border-primary border-t-transparent`
    }
  }
  
  return (
    <div className="flex items-center gap-3" {...props}>
      <div className={getThemeClasses()} />
      {text && (
        <span className="text-muted-foreground text-sm font-medium">
          {text}
        </span>
      )}
    </div>
  )
}