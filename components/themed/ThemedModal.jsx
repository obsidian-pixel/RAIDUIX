'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedModal({ 
  isOpen = false,
  onClose,
  title = 'Modal Title',
  children,
  size = 'default',
  showCloseButton = true,
  closeOnOverlay = true,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  const getThemeClasses = () => {
    const baseClasses = 'relative rounded-lg shadow-xl transition-all transform'
    const sizeClasses = {
      sm: 'max-w-md',
      default: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-7xl'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          overlay: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50',
          modal: `${baseClasses} ${sizeClass} bg-white dark:bg-gray-900 w-full max-h-[90vh] overflow-hidden`,
          header: 'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
          content: 'px-6 py-4 overflow-y-auto max-h-[70vh]',
          footer: 'px-6 py-4 border-t border-gray-200 dark:border-gray-700'
        }
      
      case 'glass':
        return {
          overlay: 'fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50',
          modal: `${baseClasses} ${sizeClass} glass-panel border border-white/20 w-full max-h-[90vh] overflow-hidden`,
          header: 'px-6 py-4 border-b border-white/20',
          content: 'px-6 py-4 overflow-y-auto max-h-[70vh]',
          footer: 'px-6 py-4 border-t border-white/20'
        }
      
      case 'skeuo':
        return {
          overlay: 'fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50',
          modal: `${baseClasses} ${sizeClass} w-full max-h-[90vh] overflow-hidden ${
            colorMode === 'dark' ? 'skeuo-card-dark' : 'skeuo-card'
          }`,
          header: `px-6 py-4 border-b ${colorMode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`,
          content: 'px-6 py-4 overflow-y-auto max-h-[70vh]',
          footer: `px-6 py-4 border-t ${colorMode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`
        }
      
      default:
        return {
          overlay: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50',
          modal: `${baseClasses} ${sizeClass} bg-background border border-border w-full max-h-[90vh] overflow-hidden`,
          header: 'px-6 py-4 border-b border-border',
          content: 'px-6 py-4 overflow-y-auto max-h-[70vh]',
          footer: 'px-6 py-4 border-t border-border'
        }
    }
  }
  
  const classes = getThemeClasses()
  
  return (
    <div 
      className={classes.overlay}
      onClick={closeOnOverlay ? onClose : undefined}
      {...props}
    >
      <div 
        className={classes.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={classes.header}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-accent/50 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className={classes.content}>
          {children || (
            <div className="py-8">
              <p className="text-muted-foreground">Modal content goes here.</p>
            </div>
          )}
        </div>
        
        {/* Footer - can be customized */}
        <div className={classes.footer}>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 glass-panel rounded-lg text-sm hover:bg-accent/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}