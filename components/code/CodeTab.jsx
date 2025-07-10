'use client'

import { useState } from 'react'
import { Copy, Download, Check, Code } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function CodeTab() {
  const { canvasComponents, activeFramework, setActiveFramework } = useAppStore()
  const [copied, setCopied] = useState(false)
  
  const frameworks = [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue', icon: '🟢' },
    { id: 'angular', name: 'Angular', icon: '🔺' }
  ]
  
  const generateCode = () => {
    if (canvasComponents.length === 0) {
      return '// Add components to the canvas to see generated code'
    }
    
    switch (activeFramework) {
      case 'react':
        return generateReactCode()
      case 'vue':
        return generateVueCode()
      case 'angular':
        return generateAngularCode()
      default:
        return '// Select a framework to generate code'
    }
  }
  
  const generateReactCode = () => {
    const imports = ['import React from \'react\'']
    const components = canvasComponents.map(comp => {
      const props = Object.entries(comp.props)
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key}="${value}"`
          } else if (typeof value === 'boolean') {
            return value ? key : `${key}={false}`
          } else {
            return `${key}={${value}}`
          }
        })
        .join(' ')
      
      const componentName = comp.type.charAt(0).toUpperCase() + comp.type.slice(1)
      return `    <${componentName} ${props} />`
    })
    
    return `${imports.join('\n')}

export default function GeneratedComponent() {
  return (
    <div className="space-y-4">
${components.join('\n')}
    </div>
  )
}`
  }
  
  const generateVueCode = () => {
    const components = canvasComponents.map(comp => {
      const props = Object.entries(comp.props)
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key}="${value}"`
          } else if (typeof value === 'boolean') {
            return `:${key}="${value}"`
          } else {
            return `:${key}="${value}"`
          }
        })
        .join(' ')
      
      const componentName = comp.type.charAt(0).toUpperCase() + comp.type.slice(1)
      return `    <${componentName} ${props} />`
    })
    
    return `<template>
  <div class="space-y-4">
${components.join('\n')}
  </div>
</template>

<script>
export default {
  name: 'GeneratedComponent'
}
</script>`
  }
  
  const generateAngularCode = () => {
    const components = canvasComponents.map(comp => {
      const props = Object.entries(comp.props)
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `[${key}]="'${value}'"`
          } else if (typeof value === 'boolean') {
            return `[${key}]="${value}"`
          } else {
            return `[${key}]="${value}"`
          }
        })
        .join(' ')
      
      const componentName = `app-${comp.type}`
      return `    <${componentName} ${props}></${componentName}>`
    })
    
    return `<div class="space-y-4">
${components.join('\n')}
</div>`
  }
  
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateCode())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }
  
  const downloadCode = () => {
    const code = generateCode()
    const extensions = { react: 'jsx', vue: 'vue', angular: 'html' }
    const extension = extensions[activeFramework] || 'txt'
    const filename = `raiduix-export.${extension}`
    
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const code = generateCode()
  
  return (
    <div className="h-full flex flex-col">
      {/* Framework Selector */}
      <div className="p-4 border-b border-border/50 space-y-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Generated Code</h3>
        </div>
        
        <div className="flex items-center gap-1 p-1 glass-panel rounded-lg">
          {frameworks.map(({ id, name, icon }) => (
            <button
              key={id}
              onClick={() => setActiveFramework(id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm font-medium flex-1 justify-center
                ${activeFramework === id 
                  ? 'bg-primary/20 text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }
              `}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-3 py-2 glass-panel rounded-lg text-sm hover:bg-accent/50 transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={downloadCode}
            className="flex items-center gap-2 px-3 py-2 glass-panel rounded-lg text-sm hover:bg-accent/50 transition-all"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      
      {/* Code Display */}
      <div className="flex-1 p-4 overflow-auto">
        <pre className="text-sm bg-card/50 p-4 rounded-lg overflow-x-auto border border-border/50">
          <code className="text-foreground">{code}</code>
        </pre>
      </div>
    </div>
  )
}