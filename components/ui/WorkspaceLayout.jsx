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
        {leftPanelCollapsed ? (
          <button
            className="absolute left-0 top-1/2 z-30 -translate-y-1/2 bg-card/80 border border-border/50 rounded-r px-1 py-2 shadow hover:bg-accent transition"
            style={{ minWidth: 0 }}
            onClick={() => setLeftPanelCollapsed(false)}
            aria-label="Show Library Panel"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div
            className="border-r border-border/50 bg-card/50 relative flex flex-col"
            style={{
              width: `${leftPanelWidth}%`,
              minWidth: 40,
              transition: "width 0.2s",
            }}
          >
            <button
              className="absolute right-0 top-1/2 z-30 -translate-y-1/2 bg-card/80 border border-border/50 rounded-l px-1 py-2 shadow hover:bg-accent transition"
              style={{ minWidth: 0 }}
              onClick={() => setLeftPanelCollapsed(true)}
              aria-label="Hide Library Panel"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <LibraryPanel />
          </div>
        )}

        {/* Left Resize Handle */}
        {!leftPanelCollapsed && (
          <div
            className="w-1 resize-handle cursor-col-resize"
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
        {rightPanelCollapsed ? (
          <button
            className="absolute right-0 top-1/2 z-30 -translate-y-1/2 bg-card/80 border border-border/50 rounded-l px-1 py-2 shadow hover:bg-accent transition"
            style={{ minWidth: 0 }}
            onClick={() => setRightPanelCollapsed(false)}
            aria-label="Show Right Panel"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <div
            className="border-l border-border/50 bg-card/50 relative flex flex-col"
            style={{
              width: `${rightPanelWidth}%`,
              minWidth: 40,
              transition: "width 0.2s",
            }}
          >
            <button
              className="absolute left-0 top-1/2 z-30 -translate-y-1/2 bg-card/80 border border-border/50 rounded-r px-1 py-2 shadow hover:bg-accent transition"
              style={{ minWidth: 0 }}
              onClick={() => setRightPanelCollapsed(true)}
              aria-label="Hide Right Panel"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <RightPanel />
          </div>
        )}
      </div>
    </DndContext>
  );
}
