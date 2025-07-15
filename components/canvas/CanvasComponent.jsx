"use client";
import React from "react";

import { useState } from "react";
import { X, Move, ArrowUp, ArrowDown } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import ThemedButton from "@/components/themed/ThemedButton";
import ThemedInput from "@/components/themed/ThemedInput";
import ThemedCard from "@/components/themed/ThemedCard";
import ThemedBadge from "@/components/themed/ThemedBadge";
import ThemedCheckbox from "@/components/themed/ThemedCheckbox";
import ThemedSwitch from "@/components/themed/ThemedSwitch";
import ThemedSlider from "@/components/themed/ThemedSlider";
import useAppStore from "@/stores/useAppStore";

export default function CanvasComponent({ id, type, props, position, zIndex }) {
  const {
    selectedComponentId,
    setSelectedComponent,
    removeComponent,
    reorderComponents,
    updateComponentSize,
    canvasComponents,
  } = useAppStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const isSelected = selectedComponentId === id;
  const componentData = canvasComponents?.find((c) => c.id === id) || {};
  // Always use explicit pixel values for width/height to ensure resizability
  const [size, setSize] = useState({
    width: typeof componentData.width === "number" ? componentData.width : 200,
    height:
      typeof componentData.height === "number" ? componentData.height : 80,
  });
  const [resizing, setResizing] = useState(null);

  const style = {
    position: "absolute",
    top: `${position.y}px`,
    left: `${position.x}px`,
    zIndex,
    width: `${size.width}px`,
    height: `${size.height}px`,
    minWidth: 40,
    minHeight: 30,
    maxWidth: 1200,
    maxHeight: 1000,
    boxSizing: "border-box",
    ...(transform
      ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
      : {}),
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedComponent(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    removeComponent(id);
  };

  const handleReorder = (e, direction) => {
    e.stopPropagation();
    reorderComponents(id, direction);
  };

  // Resize logic
  // Accepts: 'top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left'
  const handleResizeStart = (edge, e) => {
    e.stopPropagation();
    setResizing({
      edge,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startTop: position.y,
      startLeft: position.x,
    });
    // Set cursor for edge/corner
    let cursor = "default";
    switch (edge) {
      case "top-left":
      case "bottom-right":
        cursor = "nwse-resize";
        break;
      case "top-right":
      case "bottom-left":
        cursor = "nesw-resize";
        break;
      case "top":
      case "bottom":
        cursor = "ns-resize";
        break;
      case "left":
      case "right":
        cursor = "ew-resize";
        break;
      default:
        cursor = "default";
    }
    document.body.style.cursor = cursor;
  };

  const handleResize = (e) => {
    if (!resizing) return;
    const {
      edge,
      startX,
      startY,
      startWidth,
      startHeight,
      startTop,
      startLeft,
    } = resizing;
    let deltaX = e.clientX - startX;
    let deltaY = e.clientY - startY;
    let newWidth = startWidth;
    let newHeight = startHeight;
    let newTop = startTop;
    let newLeft = startLeft;
    switch (edge) {
      case "top-left":
        newWidth = Math.max(40, startWidth - deltaX);
        newHeight = Math.max(30, startHeight - deltaY);
        newLeft = startLeft + deltaX;
        newTop = startTop + deltaY;
        break;
      case "top":
        newHeight = Math.max(30, startHeight - deltaY);
        newTop = startTop + deltaY;
        break;
      case "top-right":
        newWidth = Math.max(40, startWidth + deltaX);
        newHeight = Math.max(30, startHeight - deltaY);
        newTop = startTop + deltaY;
        break;
      case "right":
        newWidth = Math.max(40, startWidth + deltaX);
        break;
      case "bottom-right":
        newWidth = Math.max(40, startWidth + deltaX);
        newHeight = Math.max(30, startHeight + deltaY);
        break;
      case "bottom":
        newHeight = Math.max(30, startHeight + deltaY);
        break;
      case "bottom-left":
        newWidth = Math.max(40, startWidth - deltaX);
        newHeight = Math.max(30, startHeight + deltaY);
        newLeft = startLeft + deltaX;
        break;
      case "left":
        newWidth = Math.max(40, startWidth - deltaX);
        newLeft = startLeft + deltaX;
        break;
      default:
        break;
    }
    setSize({ width: newWidth, height: newHeight });
    if (updateComponentSize)
      updateComponentSize(id, {
        width: newWidth,
        height: newHeight,
        x: newLeft,
        y: newTop,
      });
    // Always update position for left/top edges
    if (["top-left", "bottom-left", "left"].includes(edge)) {
      position.x = newLeft;
    }
    if (["top-left", "top-right", "top"].includes(edge)) {
      position.y = newTop;
    }
  };

  const handleResizeEnd = () => {
    setResizing(null);
    document.body.style.cursor = "";
  };

  // Attach mousemove/mouseup listeners when resizing
  React.useEffect(() => {
    if (!resizing) return;
    const onMove = (e) => handleResize(e);
    const onUp = () => handleResizeEnd();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing]);

  const renderComponent = () => {
    try {
      // Dynamically support all themed components
      const themedComponents = [
        "Accordion",
        "Alert",
        "Avatar",
        "Badge",
        "Breadcrumb",
        "Button",
        "Card",
        "Carousel",
        "Chart",
        "Checkbox",
        "Collapsible",
        "Input",
        "Modal",
        "Pagination",
        "Progress",
        "ScrollArea",
        "Sheet",
        "Slider",
        "Spinner",
        "Switch",
        "Table",
        "Tabs",
        "Toggle",
        "ToggleGroup",
        "Tooltip",
        "InputOTP",
        "NavigationMenu",
        "ContextMenu",
        "Drawer",
        "HoverCard",
        "Skeleton",
      ];
      const themedType = themedComponents.find(
        (comp) => comp.toLowerCase() === type.replace(/-/g, "").toLowerCase()
      );
      if (themedType) {
        try {
          const ThemedComponent =
            require(`@/components/themed/Themed${themedType}`).default;
          return <ThemedComponent {...props} fillParent={true} />;
        } catch (err) {
          // fallback to text if import fails
        }
      }
      // Fallback for components without a specific preview
      return <div className="p-4 bg-muted/50 rounded">Component: {type}</div>;
    } catch (error) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          Error: {error.message}
        </div>
      );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`group transition-all ${
        isSelected ? "component-selected" : ""
      }`}
      onClick={handleClick}
    >
      {/* Drag Handle and Info */}
      <div
        className={`absolute -top-8 left-0 flex items-center gap-1 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs z-20 
          ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <div {...listeners} className="cursor-move p-1">
          <Move className="w-3 h-3" />
        </div>
        <span>{type}</span>
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={(e) => handleReorder(e, "backward")}
            className="p-0.5 hover:bg-white/20 rounded"
          >
            <ArrowDown className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => handleReorder(e, "forward")}
            className="p-0.5 hover:bg-white/20 rounded"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
          <button
            onClick={handleDelete}
            className="p-0.5 hover:bg-white/20 rounded"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Resize handles (corners & edges) */}
      {isSelected && (
        <>
          {/* Corners */}
          <div
            className="canvas-resize-handle top-left"
            onMouseDown={(e) => handleResizeStart("top-left", e)}
          />
          <div
            className="canvas-resize-handle top-right"
            onMouseDown={(e) => handleResizeStart("top-right", e)}
          />
          <div
            className="canvas-resize-handle bottom-left"
            onMouseDown={(e) => handleResizeStart("bottom-left", e)}
          />
          <div
            className="canvas-resize-handle bottom-right"
            onMouseDown={(e) => handleResizeStart("bottom-right", e)}
          />
          {/* Edges */}
          <div
            className="canvas-resize-handle top"
            onMouseDown={(e) => handleResizeStart("top", e)}
          />
          <div
            className="canvas-resize-handle bottom"
            onMouseDown={(e) => handleResizeStart("bottom", e)}
          />
          <div
            className="canvas-resize-handle left"
            onMouseDown={(e) => handleResizeStart("left", e)}
          />
          <div
            className="canvas-resize-handle right"
            onMouseDown={(e) => handleResizeStart("right", e)}
          />
        </>
      )}

      {renderComponent()}
    </div>
  );
}
