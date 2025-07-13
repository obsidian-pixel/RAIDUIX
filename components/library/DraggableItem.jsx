"use client";

import { useState } from "react";
import ThemedButton from "@/components/themed/ThemedButton";
import ThemedInput from "@/components/themed/ThemedInput";
import ThemedCard from "@/components/themed/ThemedCard";
import ThemedBadge from "@/components/themed/ThemedBadge";
import ThemedCheckbox from "@/components/themed/ThemedCheckbox";
import ThemedSwitch from "@/components/themed/ThemedSwitch";
import ThemedSlider from "@/components/themed/ThemedSlider";
// Import other themed components as they are created
// For example:
// import ThemedAlert from '@/components/themed/ThemedAlert'
// import ThemedTable from '@/components/themed/ThemedTable'
// etc.

export default function DraggableItem({
  id,
  name,
  type,
  icon: Icon,
  chartType,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        id,
        name,
        type,
        chartType,
        // Pass the component's JSX for dropping
        component: e.currentTarget.outerHTML,
      })
    );
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const renderPreview = () => {
    // Dynamically map all themed components
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
    const previewProps = {
      InputOTP: { value: "", length: 6 },
      NavigationMenu: { items: ["Home", "Library"] },
      ContextMenu: { items: ["Edit", "Delete"] },
      Drawer: { title: "Drawer Title", content: "Drawer Content" },
      HoverCard: { trigger: "Hover me", content: "Hover card content" },
      Skeleton: { width: 80, height: 20 },
      Accordion: { items: [{ title: "Section 1", content: "Content 1" }] },
      Alert: { title: "Alert", description: "This is an alert." },
      Avatar: { name: "Jane Doe" },
      Badge: { text: "Badge", size: "sm" },
      Breadcrumb: { items: [{ label: "Home" }, { label: "Library" }] },
      Button: { label: "Button", size: "sm" },
      Card: { title: "Card", content: "Preview", size: "sm" },
      Carousel: {},
      Chart: { type: "bar", data: [10, 20, 30] },
      Checkbox: { label: "Checkbox", size: "sm" },
      Collapsible: { items: [{ title: "Collapse 1", content: "Content 1" }] },
      Input: { placeholder: "Input", size: "sm" },
      Modal: { open: false, title: "Modal Title", content: "Modal Content" },
      Pagination: { total: 10, current: 1 },
      Progress: { value: 60 },
      ScrollArea: { children: "Scroll Content" },
      Sheet: { open: false, title: "Sheet Title", content: "Sheet Content" },
      Slider: { value: 50, size: "sm" },
      Spinner: {},
      Switch: { label: "Switch", size: "sm" },
      Table: {
        rows: [
          {
            name: "John",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
          },
        ],
        size: "sm",
      },
      Tabs: {
        tabs: [
          { id: "tab1", label: "Tab 1" },
          { id: "tab2", label: "Tab 2" },
        ],
        size: "sm",
      },
      Toggle: {},
      ToggleGroup: {
        items: [
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ],
        size: "sm",
      },
      Tooltip: { content: "Tooltip text" },
    };

    const props = previewProps[type] || {};

    try {
      // Try to match any themed component automatically
      const themedType = themedComponents.find(
        (comp) => comp.toLowerCase() === type.replace(/-/g, "").toLowerCase()
      );
      if (themedType) {
        try {
          const ThemedComponent =
            require(`@/components/themed/Themed${themedType}`).default;
          return (
            <ThemedComponent {...props} {...(previewProps[themedType] || {})} />
          );
        } catch (err) {
          // fallback to text if import fails
        }
      }
      // Fallback for components without a specific preview
      return (
        <div className="w-full h-8 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">
          {name} Preview
        </div>
      );
    } catch (error) {
      console.error(`Error rendering preview for ${type}:`, error);
      return (
        <div className="w-full h-8 bg-destructive/20 rounded flex items-center justify-center text-xs text-destructive-foreground">
          Preview Error
        </div>
      );
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        group cursor-move p-3 glass-panel rounded-lg border border-border/30 transition-all
        hover:border-border/60 hover:shadow-md
        ${isDragging ? "opacity-50 scale-95" : ""}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          <span className="text-sm font-medium">{name}</span>
        </div>
        <div className="w-1 h-1 bg-muted-foreground/50 rounded-full group-hover:bg-muted-foreground transition-colors" />
      </div>

      {/* Preview */}
      <div className="pointer-events-none overflow-hidden">
        {renderPreview()}
      </div>
    </div>
  );
}
