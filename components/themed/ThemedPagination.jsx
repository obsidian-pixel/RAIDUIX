'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

export default function ThemedPagination({ 
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisible = 5,
  size = 'default',
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [page, setPage] = useState(currentPage)
  
  const handlePageChange = (newPage) => {
    setPage(newPage)
    onPageChange?.(newPage)
  }
  
  const getVisiblePages = () => {
    const pages = []
    const half = Math.floor(maxVisible / 2)
    let start = Math.max(1, page - half)
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1)
      if (start > 2) {
        pages.push('...')
      }
    }
    
    // Add visible page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }
    
    return pages
  }
  
  const getThemeClasses = () => {
    const baseClasses = 'flex items-center gap-1'
    const sizeClasses = {
      sm: 'text-sm',
      default: 'text-sm',
      lg: 'text-base'
    }
    
    const buttonSizeClasses = {
      sm: 'w-8 h-8 text-sm',
      default: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    const buttonSizeClass = buttonSizeClasses[size] || buttonSizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          container: `${baseClasses} ${sizeClass}`,
          button: `${buttonSizeClass} rounded-full flex items-center justify-center transition-all hover:bg-gray-100 dark:hover:bg-gray-800`,
          active: `${buttonSizeClass} rounded-full flex items-center justify-center bg-blue-600 text-white`,
          disabled: `${buttonSizeClass} rounded-full flex items-center justify-center text-gray-400 cursor-not-allowed`
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass}`,
          button: `${buttonSizeClass} rounded-full flex items-center justify-center transition-all glass-button hover:bg-white/20`,
          active: `${buttonSizeClass} rounded-full flex items-center justify-center bg-white/30 text-white border border-white/50`,
          disabled: `${buttonSizeClass} rounded-full flex items-center justify-center text-white/40 cursor-not-allowed`
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass}`,
          button: `${buttonSizeClass} rounded-full flex items-center justify-center transition-all ${
            colorMode === 'dark' ? 'skeuo-button-dark hover:scale-95' : 'skeuo-button hover:scale-95'
          }`,
          active: `${buttonSizeClass} rounded-full flex items-center justify-center ${
            colorMode === 'dark' 
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-inner' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-inner'
          }`,
          disabled: `${buttonSizeClass} rounded-full flex items-center justify-center opacity-40 cursor-not-allowed`
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass}`,
          button: `${buttonSizeClass} rounded-md flex items-center justify-center transition-all hover:bg-accent`,
          active: `${buttonSizeClass} rounded-md flex items-center justify-center bg-primary text-primary-foreground`,
          disabled: `${buttonSizeClass} rounded-md flex items-center justify-center text-muted-foreground cursor-not-allowed`
        }
    }
  }
  
  const classes = getThemeClasses()
  const visiblePages = getVisiblePages()
  
  return (
    <nav className={classes.container} {...props}>
      {/* First Page */}
      {showFirstLast && page > 1 && (
        <button
          onClick={() => handlePageChange(1)}
          className={classes.button}
          title="First page"
        >
          ««
        </button>
      )}
      
      {/* Previous Page */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className={page === 1 ? classes.disabled : classes.button}
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      
      {/* Page Numbers */}
      {visiblePages.map((pageNum, index) => {
        if (pageNum === '...') {
          return (
            <div key={`ellipsis-${index}`} className={classes.button}>
              <MoreHorizontal className="w-4 h-4" />
            </div>
          )
        }
        
        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={pageNum === page ? classes.active : classes.button}
          >
            {pageNum}
          </button>
        )
      })}
      
      {/* Next Page */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className={page === totalPages ? classes.disabled : classes.button}
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
      
      {/* Last Page */}
      {showFirstLast && page < totalPages && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className={classes.button}
          title="Last page"
        >
          »»
        </button>
      )}
    </nav>
  )
}