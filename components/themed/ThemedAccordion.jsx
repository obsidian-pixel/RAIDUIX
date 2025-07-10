'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedAccordion({ 
  items = [
    { title: 'Section 1', content: 'This is the content for section 1.' },
    { title: 'Section 2', content: 'This is the content for section 2.' },
    { title: 'Section 3', content: 'This is the content for section 3.' }
  ],
  allowMultiple = false,
  size = 'default',
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [openItems, setOpenItems] = useState(new Set([0]))
  
  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    
    if (allowMultiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index)
      } else {
        newOpenItems.add(index)
      }
    } else {
      newOpenItems.clear()
      if (!openItems.has(index)) {
        newOpenItems.add(index)
      }
    }
    
    setOpenItems(newOpenItems)
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'w-full'
    const sizeClasses = {
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          container: `${baseClasses} ${sizeClass} space-y-2`,
          item: 'material-card rounded-lg overflow-hidden',
          header: 'p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
          content: 'p-4 pt-0 border-t border-gray-200 dark:border-gray-700'
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass} space-y-2`,
          item: 'glass-panel rounded-lg overflow-hidden border border-white/20',
          header: 'p-4 cursor-pointer hover:bg-white/10 transition-colors',
          content: 'p-4 pt-0 border-t border-white/10'
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass} space-y-3`,
          item: `rounded-lg overflow-hidden ${colorMode === 'dark' ? 'skeuo-card-dark' : 'skeuo-card'}`,
          header: 'p-4 cursor-pointer active:scale-98 transition-transform',
          content: 'p-4 pt-0'
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass} space-y-2`,
          item: 'bg-card border border-border rounded-lg overflow-hidden',
          header: 'p-4 cursor-pointer hover:bg-accent/50 transition-colors',
          content: 'p-4 pt-0 border-t border-border'
        }
    }
  }
  
  const classes = getThemeClasses()
  
  return (
    <div className={classes.container} {...props}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index)
        return (
          <div key={index} className={classes.item}>
            <div 
              className={`${classes.header} flex items-center justify-between`}
              onClick={() => toggleItem(index)}
            >
              <h3 className="font-medium">{item.title}</h3>
              <ChevronDown 
                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
            {isOpen && (
              <div className={classes.content}>
                <p className="text-muted-foreground">{item.content}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}