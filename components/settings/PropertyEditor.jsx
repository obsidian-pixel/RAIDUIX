'use client'

import { useState } from 'react'
import { Type, Palette, Settings, ToggleLeft } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export default function PropertyEditor({ component }) {
  const { updateComponent } = useAppStore()
  
  const updateProp = (key, value) => {
    updateComponent(component.id, {
      props: {
        ...component.props,
        [key]: value
      }
    })
  }
  
  const renderControl = (key, value, type = 'text') => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => updateProp(key, e.target.value)}
            className="w-full px-3 py-2 glass-input rounded-lg text-sm"
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => updateProp(key, parseInt(e.target.value))}
            className="w-full px-3 py-2 glass-input rounded-lg text-sm"
          />
        )
      
      case 'boolean':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => updateProp(key, e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full transition-all ${value ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-all ${value ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`} />
            </div>
          </label>
        )
      
      case 'select':
        const options = getSelectOptions(component.type, key)
        return (
          <select
            value={value || ''}
            onChange={(e) => updateProp(key, e.target.value)}
            className="w-full px-3 py-2 glass-input rounded-lg text-sm"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      default:
        return null
    }
  }
  
  const getSelectOptions = (componentType, key) => {
    const options = {
      button: {
        variant: [
          { value: 'default', label: 'Default' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'outline', label: 'Outline' }
        ],
        size: [
          { value: 'sm', label: 'Small' },
          { value: 'default', label: 'Default' },
          { value: 'lg', label: 'Large' }
        ]
      },
      input: {
        type: [
          { value: 'text', label: 'Text' },
          { value: 'email', label: 'Email' },
          { value: 'password', label: 'Password' },
          { value: 'number', label: 'Number' }
        ],
        size: [
          { value: 'sm', label: 'Small' },
          { value: 'default', label: 'Default' },
          { value: 'lg', label: 'Large' }
        ]
      },
      badge: {
        variant: [
          { value: 'default', label: 'Default' },
          { value: 'secondary', label: 'Secondary' }
        ],
        size: [
          { value: 'sm', label: 'Small' },
          { value: 'default', label: 'Default' },
          { value: 'lg', label: 'Large' }
        ]
      }
    }
    
    return options[componentType]?.[key] || []
  }
  
  const getComponentProperties = () => {
    const commonProps = {
      button: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'variant', label: 'Variant', type: 'select' },
        { key: 'size', label: 'Size', type: 'select' },
        { key: 'disabled', label: 'Disabled', type: 'boolean' }
      ],
      input: [
        { key: 'placeholder', label: 'Placeholder', type: 'text' },
        { key: 'type', label: 'Type', type: 'select' },
        { key: 'size', label: 'Size', type: 'select' },
        { key: 'disabled', label: 'Disabled', type: 'boolean' }
      ],
      card: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'content', label: 'Content', type: 'text' },
        { key: 'size', label: 'Size', type: 'select' }
      ],
      badge: [
        { key: 'text', label: 'Text', type: 'text' },
        { key: 'variant', label: 'Variant', type: 'select' },
        { key: 'size', label: 'Size', type: 'select' }
      ],
      checkbox: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'checked', label: 'Checked', type: 'boolean' },
        { key: 'disabled', label: 'Disabled', type: 'boolean' }
      ],
      switch: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'checked', label: 'Checked', type: 'boolean' },
        { key: 'disabled', label: 'Disabled', type: 'boolean' }
      ],
      slider: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'min', label: 'Min', type: 'number' },
        { key: 'max', label: 'Max', type: 'number' },
        { key: 'value', label: 'Value', type: 'number' },
        { key: 'disabled', label: 'Disabled', type: 'boolean' }
      ]
    }
    
    return commonProps[component.type] || []
  }
  
  const properties = getComponentProperties()
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-border/50">
        <Settings className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold capitalize">{component.type} Properties</h3>
      </div>
      
      <div className="space-y-4">
        {properties.map(({ key, label, type }) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
            {renderControl(key, component.props[key], type)}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 glass-panel rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Theme Properties</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Theme-specific properties will appear here based on the selected theme
        </p>
      </div>
    </div>
  )
}