'use client'

import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedTabs({ 
  tabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content for tab 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content for tab 3' }
  ],
  defaultTab = 'tab1',
  variant = 'default',
  size = 'default',
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  const getThemeClasses = () => {
    const baseClasses = 'w-full'
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
          tabList: variant === 'pills' ? 
            'flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg' :
            'flex border-b border-gray-200 dark:border-gray-700',
          tab: variant === 'pills' ?
            'px-4 py-2 rounded-lg transition-all font-medium' :
            'px-4 py-2 border-b-2 border-transparent transition-all font-medium hover:border-gray-300 dark:hover:border-gray-600',
          activeTab: variant === 'pills' ?
            'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' :
            'border-blue-600 text-blue-600 dark:text-blue-400',
          inactiveTab: variant === 'pills' ?
            'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200' :
            'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
          content: 'mt-4 p-4'
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass}`,
          tabList: variant === 'pills' ? 
            'flex gap-1 p-1 glass-panel rounded-lg' :
            'flex border-b border-white/20',
          tab: variant === 'pills' ?
            'px-4 py-2 rounded-lg transition-all font-medium' :
            'px-4 py-2 border-b-2 border-transparent transition-all font-medium hover:border-white/30',
          activeTab: variant === 'pills' ?
            'bg-white/20 text-white border border-white/30' :
            'border-white text-white',
          inactiveTab: variant === 'pills' ?
            'text-white/70 hover:text-white' :
            'text-white/70 hover:text-white',
          content: 'mt-4 p-4'
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass}`,
          tabList: variant === 'pills' ? 
            `flex gap-2 p-2 rounded-lg ${colorMode === 'dark' ? 'skeuo-card-dark' : 'skeuo-card'}` :
            `flex border-b ${colorMode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`,
          tab: variant === 'pills' ?
            `px-4 py-2 rounded-lg transition-all font-medium ${colorMode === 'dark' ? 'skeuo-button-dark' : 'skeuo-button'}` :
            'px-4 py-2 border-b-2 border-transparent transition-all font-medium',
          activeTab: variant === 'pills' ?
            'scale-95 shadow-inner' :
            `${colorMode === 'dark' ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}`,
          inactiveTab: variant === 'pills' ?
            'hover:scale-98' :
            `${colorMode === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`,
          content: 'mt-4 p-4'
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass}`,
          tabList: variant === 'pills' ? 
            'flex gap-1 p-1 bg-muted rounded-lg' :
            'flex border-b border-border',
          tab: variant === 'pills' ?
            'px-4 py-2 rounded-lg transition-all font-medium' :
            'px-4 py-2 border-b-2 border-transparent transition-all font-medium hover:border-muted-foreground',
          activeTab: variant === 'pills' ?
            'bg-background text-foreground shadow-sm' :
            'border-primary text-primary',
          inactiveTab: variant === 'pills' ?
            'text-muted-foreground hover:text-foreground' :
            'text-muted-foreground hover:text-foreground',
          content: 'mt-4 p-4'
        }
    }
  }
  
  const classes = getThemeClasses()
  const activeTabData = tabs.find(tab => tab.id === activeTab)
  
  return (
    <div className={classes.container} {...props}>
      {/* Tab List */}
      <div className={classes.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${classes.tab} ${
              activeTab === tab.id ? classes.activeTab : classes.inactiveTab
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className={classes.content}>
        {activeTabData?.content || (
          <p className="text-muted-foreground">No content available</p>
        )}
      </div>
    </div>
  )
}