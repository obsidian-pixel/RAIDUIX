'use client'

import { useState } from 'react'
import { 
  Search, Square, Type, Image, Layout, Palette, ToggleLeft, 
  BarChart3, Accordion, Carousel, AlertTriangle, Activity,
  Table, User, Navigation, MoreHorizontal, Eye, Loader,
  Tabs, Grid, Calendar, Upload, Play, Bell
} from 'lucide-react'
import DraggableItem from '@/components/library/DraggableItem'

export default function LibraryPanel() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const componentCategories = [
    {
      name: 'Basic Components',
      icon: Square,
      items: [
        { id: 'button', name: 'Button', icon: Square, type: 'button' },
        { id: 'input', name: 'Input', icon: Type, type: 'input' },
        { id: 'card', name: 'Card', icon: Layout, type: 'card' },
        { id: 'badge', name: 'Badge', icon: Palette, type: 'badge' },
        { id: 'avatar', name: 'Avatar', icon: User, type: 'avatar' },
      ]
    },
    {
      name: 'Form Controls',
      icon: ToggleLeft,
      items: [
        { id: 'checkbox', name: 'Checkbox', icon: Square, type: 'checkbox' },
        { id: 'switch', name: 'Switch', icon: ToggleLeft, type: 'switch' },
        { id: 'slider', name: 'Slider', icon: Type, type: 'slider' },
      ]
    },
    {
      name: 'Data Visualization',
      icon: BarChart3,
      items: [
        { id: 'chart-bar', name: 'Bar Chart', icon: BarChart3, type: 'chart', chartType: 'bar' },
        { id: 'chart-line', name: 'Line Chart', icon: Activity, type: 'chart', chartType: 'line' },
        { id: 'chart-pie', name: 'Pie Chart', icon: Palette, type: 'chart', chartType: 'pie' },
        { id: 'table', name: 'Table', icon: Table, type: 'table' },
        { id: 'progress', name: 'Progress', icon: Activity, type: 'progress' },
      ]
    },
    {
      name: 'Layout & Navigation',
      icon: Layout,
      items: [
        { id: 'accordion', name: 'Accordion', icon: Accordion, type: 'accordion' },
        { id: 'tabs', name: 'Tabs', icon: Tabs, type: 'tabs' },
        { id: 'breadcrumb', name: 'Breadcrumb', icon: Navigation, type: 'breadcrumb' },
        { id: 'pagination', name: 'Pagination', icon: MoreHorizontal, type: 'pagination' },
      ]
    },
    {
      name: 'Interactive Components',
      icon: Carousel,
      items: [
        { id: 'carousel', name: 'Carousel', icon: Carousel, type: 'carousel' },
        { id: 'modal', name: 'Modal', icon: Square, type: 'modal' },
        { id: 'tooltip', name: 'Tooltip', icon: Eye, type: 'tooltip' },
      ]
    },
    {
      name: 'Feedback & Status',
      icon: AlertTriangle,
      items: [
        { id: 'alert', name: 'Alert', icon: AlertTriangle, type: 'alert' },
        { id: 'spinner', name: 'Spinner', icon: Loader, type: 'spinner' },
      ]
    }
  ]
  
  const filteredCategories = componentCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0)
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold mb-3">Components</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 glass-input rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <category.icon className="w-4 h-4" />
                {category.name}
              </div>
              
              <div className="space-y-2">
                {category.items.map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    icon={item.icon}
                    chartType={item.chartType}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No components found</p>
          </div>
        )}
      </div>
    </div>
  )
}