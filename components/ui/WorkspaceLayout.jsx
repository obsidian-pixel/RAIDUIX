'use client'

import { useState, useRef } from 'react'
import LibraryPanel from '@/components/panels/LibraryPanel'
import CanvasPanel from '@/components/panels/CanvasPanel'
import RightPanel from '@/components/panels/RightPanel'
import useAppStore from '@/stores/useAppStore'

export default function WorkspaceLayout() {
  const { leftPanelWidth, rightPanelWidth, setPanelWidths } = useAppStore()
  const [isResizing, setIsResizing] = useState(null)
  const containerRef = useRef(null)
  
  const handleMouseDown = (handle) => {
    setIsResizing(handle)
  }
  
  const handleMouseMove = (e) => {
    if (!isResizing || !containerRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const containerWidth = containerRect.width
    const mouseX = e.clientX - containerRect.left
    
    if (isResizing === 'left') {
      const newLeftWidth = Math.max(15, Math.min(40, (mouseX / containerWidth) * 100))
      setPanelWidths(newLeftWidth, rightPanelWidth)
    } else if (isResizing === 'right') {
      const newRightWidth = Math.max(25, Math.min(50, ((containerWidth - mouseX) / containerWidth) * 100))
      setPanelWidths(leftPanelWidth, newRightWidth)
    }
  }
  
  const handleMouseUp = () => {
    setIsResizing(null)
  }
  
  return (
    <div 
      ref={containerRef}
      className="flex-1 flex relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Left Panel - Component Library */}
      <div 
        className="border-r border-border/50 bg-card/50"
        style={{ width: `${leftPanelWidth}%` }}
      >
        <LibraryPanel />
      </div>
      
      {/* Left Resize Handle */}
      <div
        className="w-1 resize-handle cursor-col-resize"
        onMouseDown={() => handleMouseDown('left')}
      />
      
      {/* Center Panel - Canvas */}
      <div 
        className="flex-1 bg-background"
        style={{ width: `${100 - leftPanelWidth - rightPanelWidth}%` }}
      >
        <CanvasPanel />
      </div>
      
      {/* Right Resize Handle */}
      <div
        className="w-1 resize-handle cursor-col-resize"
        onMouseDown={() => handleMouseDown('right')}
      />
      
      {/* Right Panel - Settings & Code */}
      <div 
        className="border-l border-border/50 bg-card/50"
        style={{ width: `${rightPanelWidth}%` }}
      >
        <RightPanel />
      </div>
    </div>
  )
}