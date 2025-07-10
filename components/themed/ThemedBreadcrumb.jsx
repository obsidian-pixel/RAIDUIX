'use client'

import { ChevronRight, Home } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedBreadcrumb({ 
  items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb', href: '/components/breadcrumb' }
  ],
  separator = 'chevron',
  size = 'default',
  maxItems = 0,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  
  const getSeparator = () => {
    switch (separator) {
      case 'slash':
        return <span className="text-muted-foreground">/</span>
      case 'dash':
        return <span className="text-muted-foreground">-</span>
      default:
        return <ChevronRight className="w-4 h-4 text-muted-foreground" />
    }
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'flex items-center gap-2'
    const sizeClasses = {
      sm: 'text-sm',
      default: 'text-sm',
      lg: 'text-base'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          container: `${baseClasses} ${sizeClass}`,
          item: 'flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors',
          link: 'text-blue-600 dark:text-blue-400 hover:underline',
          current: 'text-gray-900 dark:text-gray-100 font-medium'
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass}`,
          item: 'flex items-center gap-1 hover:text-white/90 transition-colors',
          link: 'text-blue-300 hover:text-white',
          current: 'text-white font-medium'
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass}`,
          item: `flex items-center gap-1 transition-colors ${
            colorMode === 'dark' ? 'hover:text-blue-300' : 'hover:text-blue-600'
          }`,
          link: colorMode === 'dark' ? 'text-blue-300' : 'text-blue-600',
          current: 'font-medium'
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass}`,
          item: 'flex items-center gap-1 hover:text-primary transition-colors',
          link: 'text-primary hover:underline',
          current: 'text-foreground font-medium'
        }
    }
  }
  
  const classes = getThemeClasses()
  
  // Handle maxItems truncation
  let displayItems = items
  if (maxItems > 0 && items.length > maxItems) {
    const start = items.slice(0, 1)
    const end = items.slice(-2)
    displayItems = [...start, { label: '...', truncated: true }, ...end]
  }
  
  return (
    <nav className={classes.container} {...props}>
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1
        const isFirst = index === 0
        
        return (
          <div key={index} className="flex items-center gap-2">
            <div className={classes.item}>
              {item.icon && (
                <item.icon className="w-4 h-4" />
              )}
              
              {item.truncated ? (
                <span className="text-muted-foreground">...</span>
              ) : isLast ? (
                <span className={classes.current}>{item.label}</span>
              ) : (
                <a 
                  href={item.href} 
                  className={classes.link}
                  onClick={(e) => e.preventDefault()}
                >
                  {item.label}
                </a>
              )}
            </div>
            
            {!isLast && (
              <div className="flex items-center">
                {getSeparator()}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}