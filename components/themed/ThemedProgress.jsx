'use client'

import useAppStore from '@/stores/useAppStore'

export default function ThemedProgress({ 
  value = 50, 
  max = 100,
  size = 'default',
  showLabel = true,
  label = 'Progress',
  variant = 'default',
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const getThemeClasses = () => {
    const baseClasses = 'w-full overflow-hidden transition-all duration-200'
    const sizeClasses = {
      sm: 'h-2',
      default: 'h-3',
      lg: 'h-4'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          container: `${baseClasses} ${sizeClass} rounded-full bg-gray-200 dark:bg-gray-700`,
          bar: `h-full transition-all duration-500 ease-out rounded-full ${
            variant === 'success' ? 'bg-green-600' :
            variant === 'warning' ? 'bg-yellow-600' :
            variant === 'error' ? 'bg-red-600' : 'bg-blue-600'
          }`
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass} rounded-full glass-panel border border-white/20`,
          bar: `h-full transition-all duration-500 ease-out rounded-full ${
            variant === 'success' ? 'bg-green-400/80' :
            variant === 'warning' ? 'bg-yellow-400/80' :
            variant === 'error' ? 'bg-red-400/80' : 'bg-blue-400/80'
          } backdrop-blur-sm`
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass} rounded-full ${
            colorMode === 'dark' ? 'skeuo-input-dark' : 'skeuo-input'
          }`,
          bar: `h-full transition-all duration-500 ease-out rounded-full ${
            variant === 'success' ? 
              (colorMode === 'dark' ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-green-500 to-green-600') :
            variant === 'warning' ? 
              (colorMode === 'dark' ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 'bg-gradient-to-r from-yellow-500 to-yellow-600') :
            variant === 'error' ? 
              (colorMode === 'dark' ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-red-500 to-red-600') :
              (colorMode === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-500 to-blue-600')
          } shadow-sm`
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass} rounded-full bg-muted`,
          bar: 'h-full transition-all duration-500 ease-out bg-primary rounded-full'
        }
    }
  }
  
  const classes = getThemeClasses()
  
  return (
    <div className="space-y-2" {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">{label}</span>
          <span className="text-muted-foreground">{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div className={classes.container}>
        <div 
          className={classes.bar}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}