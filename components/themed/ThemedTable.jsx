'use client'

import { ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import useAppStore from '@/stores/useAppStore'

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' }
]

export default function ThemedTable({ 
  data = sampleData,
  columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false },
    { key: 'status', label: 'Status', sortable: true }
  ],
  size = 'default',
  striped = true,
  hoverable = true,
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  
  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }
  
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0
    
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })
  
  const getThemeClasses = () => {
    const baseClasses = 'w-full overflow-hidden rounded-lg'
    const sizeClasses = {
      sm: 'text-sm',
      default: 'text-sm',
      lg: 'text-base'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return {
          container: `${baseClasses} ${sizeClass} material-card`,
          table: 'w-full',
          header: 'bg-gray-50 dark:bg-gray-800',
          headerCell: 'px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
          row: striped ? 'even:bg-gray-50 dark:even:bg-gray-800/50' : '',
          cell: `px-4 py-3 ${hoverable ? 'group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50 transition-colors' : ''}`
        }
      
      case 'glass':
        return {
          container: `${baseClasses} ${sizeClass} glass-panel border border-white/20`,
          table: 'w-full',
          header: 'bg-white/10',
          headerCell: 'px-4 py-3 text-left font-medium cursor-pointer hover:bg-white/20 transition-colors',
          row: striped ? 'even:bg-white/5' : '',
          cell: `px-4 py-3 ${hoverable ? 'group-hover:bg-white/10 transition-colors' : ''}`
        }
      
      case 'skeuo':
        return {
          container: `${baseClasses} ${sizeClass} ${colorMode === 'dark' ? 'skeuo-card-dark' : 'skeuo-card'}`,
          table: 'w-full',
          header: colorMode === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50',
          headerCell: 'px-4 py-3 text-left font-medium cursor-pointer hover:bg-opacity-80 transition-colors',
          row: striped ? (colorMode === 'dark' ? 'even:bg-gray-800/30' : 'even:bg-gray-50/50') : '',
          cell: `px-4 py-3 ${hoverable ? (colorMode === 'dark' ? 'group-hover:bg-gray-800/30' : 'group-hover:bg-gray-50/50') + ' transition-colors' : ''}`
        }
      
      default:
        return {
          container: `${baseClasses} ${sizeClass} bg-card border border-border`,
          table: 'w-full',
          header: 'bg-muted/50',
          headerCell: 'px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted transition-colors',
          row: striped ? 'even:bg-muted/20' : '',
          cell: `px-4 py-3 ${hoverable ? 'group-hover:bg-muted/30 transition-colors' : ''}`
        }
    }
  }
  
  const classes = getThemeClasses()
  
  return (
    <div className={classes.container} {...props}>
      <table className={classes.table}>
        <thead className={classes.header}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${classes.headerCell} ${column.sortable ? '' : 'cursor-default'}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp 
                        className={`w-3 h-3 ${sortColumn === column.key && sortDirection === 'asc' ? 'opacity-100' : 'opacity-30'}`}
                      />
                      <ChevronDown 
                        className={`w-3 h-3 -mt-1 ${sortColumn === column.key && sortDirection === 'desc' ? 'opacity-100' : 'opacity-30'}`}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={row.id || index} className={`group ${classes.row}`}>
              {columns.map((column) => (
                <td key={column.key} className={classes.cell}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}