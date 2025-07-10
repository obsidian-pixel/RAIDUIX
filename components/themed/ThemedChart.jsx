'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useAppStore from '@/stores/useAppStore'

const sampleData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 600 }
]

const pieData = [
  { name: 'A', value: 400, fill: '#8884d8' },
  { name: 'B', value: 300, fill: '#82ca9d' },
  { name: 'C', value: 300, fill: '#ffc658' },
  { name: 'D', value: 200, fill: '#ff7300' }
]

export default function ThemedChart({ 
  type = 'bar', 
  title = 'Chart',
  size = 'default',
  ...props 
}) {
  const { activeTheme, colorMode } = useAppStore()
  
  const getThemeClasses = () => {
    const baseClasses = 'rounded-lg transition-all duration-200'
    const sizeClasses = {
      sm: 'p-3 h-48',
      default: 'p-4 h-64',
      lg: 'p-6 h-80'
    }
    
    const sizeClass = sizeClasses[size] || sizeClasses.default
    
    switch (activeTheme) {
      case 'material':
        return `${baseClasses} ${sizeClass} material-card`
      case 'glass':
        return `${baseClasses} ${sizeClass} glass-panel border border-white/20`
      case 'skeuo':
        return `${baseClasses} ${sizeClass} ${colorMode === 'dark' ? 'skeuo-card-dark' : 'skeuo-card'}`
      default:
        return `${baseClasses} ${sizeClass} bg-card border border-border`
    }
  }
  
  const renderChart = () => {
    const chartProps = {
      width: '100%',
      height: '100%',
      data: type === 'pie' ? pieData : sampleData
    }
    
    switch (type) {
      case 'line':
        return (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        )
      
      case 'pie':
        return (
          <PieChart {...chartProps}>
            <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )
      
      default:
        return (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )
    }
  }
  
  return (
    <div className={getThemeClasses()} {...props}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="80%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}