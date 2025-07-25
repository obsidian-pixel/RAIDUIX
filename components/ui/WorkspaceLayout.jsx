"use client";

import { useState, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import LibraryPanel from "@/components/panels/LibraryPanel";
import CanvasPanel from "@/components/panels/CanvasPanel";
import RightPanel from "@/components/panels/RightPanel";
import useAppStore from "@/stores/useAppStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkspaceLayout() {
  const {
    leftPanelWidth,
    rightPanelWidth,
    setPanelWidths,
    updateComponentPosition,
    snapToGrid,
    leftPanelCollapsed,
    rightPanelCollapsed,
    setLeftPanelCollapsed,
    setRightPanelCollapsed,
  } = useAppStore();
  const [isResizing, setIsResizing] = useState(null);
  const containerRef = useRef(null);

  const handleMouseDown = (handle) => {
    setIsResizing(handle);
  };

  const handleMouseMove = (e) => {
    if (!isResizing || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;

    if (isResizing === "left") {
      const newLeftWidth = Math.max(
        15,
        Math.min(40, (mouseX / containerWidth) * 100)
      );
      setPanelWidths(newLeftWidth, rightPanelWidth);
    } else if (isResizing === "right") {
      const newRightWidth = Math.max(
        25,
        Math.min(50, ((containerWidth - mouseX) / containerWidth) * 100)
      );
      setPanelWidths(leftPanelWidth, newRightWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(null);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const id = active.id;

    const component = useAppStore
      .getState()
      .canvasComponents.find((c) => c.id === id);
    if (!component) return;

    let newPosition = {
      x: component.position.x + delta.x,
      y: component.position.y + delta.y,
    };

    if (snapToGrid) {
      const gridSize = 20;
      newPosition.x = Math.round(newPosition.x / gridSize) * gridSize;
      newPosition.y = Math.round(newPosition.y / gridSize) * gridSize;
    }

    updateComponentPosition(id, newPosition);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        ref={containerRef}
        className="flex-1 flex relative"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Left Panel - Component Library */}
        {/* Left Panel Collapse/Expand Button - attached to top right outside panel */}
        {!leftPanelCollapsed && (
          <div
            className="border-r border-border/50 bg-card/50 relative flex flex-col min-w-0"
            style={{
              width: `${leftPanelWidth}%`,
              minWidth: 40,
              transition: "width 0.2s",
            }}
          >
            {/* Collapse button at top right OUTSIDE panel */}
            <button
              className="absolute -right-[45px] top-[70px] z-40 glass-panel border shadow-md rounded-sm w-9 h-9 flex items-center justify-center hover:bg-accent/70 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
              onClick={() => setLeftPanelCollapsed(true)}
              aria-label="Hide Library Panel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <LibraryPanel />
          </div>
        )}
        {leftPanelCollapsed && (
          <button
            className="absolute left-0 top-[70px] z-40 glass-panel border shadow-md rounded-sm w-9 h-9 flex items-center justify-center hover:bg-accent/70 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
            onClick={() => setLeftPanelCollapsed(false)}
            aria-label="Show Library Panel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Left Resize Handle */}
        {!leftPanelCollapsed && (
          <div
            className="w-[2px] resize-handle min-w-0 cursor-col-resize"
            onMouseDown={() => handleMouseDown("left")}
          />
        )}

        {/* Center Panel - Canvas */}
        <div
          className="flex-1 bg-background"
          style={{
            width:
              leftPanelCollapsed && rightPanelCollapsed
                ? "100%"
                : leftPanelCollapsed
                ? `${100 - rightPanelWidth}%`
                : rightPanelCollapsed
                ? `${100 - leftPanelWidth}%`
                : `${100 - leftPanelWidth - rightPanelWidth}%`,
            transition: "width 0.2s",
          }}
        >
          <CanvasPanel />
        </div>

        {/* Right Resize Handle */}
        {!rightPanelCollapsed && (
          <div
            className="w-1 resize-handle cursor-col-resize"
            onMouseDown={() => handleMouseDown("right")}
          />
        )}

        {/* Right Panel - Settings & Code */}
        {/* Right Panel Collapse/Expand Button - attached to top left outside panel */}
        {!rightPanelCollapsed && (
          <div
            className="border-l border-border/50 bg-card/50 relative flex flex-col"
            style={{
              width: `${rightPanelWidth}%`,
              minWidth: 40,
              transition: "width 0.2s",
            }}
          >
            {/* Collapse button at top left OUTSIDE panel */}
            <button
              className="absolute -left-[44px] top-[70px] z-40 glass-panel border shadow-md rounded-sm w-9 h-9 flex items-center justify-center hover:bg-accent/70 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
              onClick={() => setRightPanelCollapsed(true)}
              aria-label="Hide Right Panel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <RightPanel />
          </div>
        )}
        {rightPanelCollapsed && (
          <button
            className="absolute right-0 top-[70px] z-40 glass-panel border shadow-md rounded-sm w-9 h-9 flex items-center justify-center hover:bg-accent/70 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
            onClick={() => setRightPanelCollapsed(false)}
            aria-label="Show Right Panel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>
    </DndContext>
  );
}
