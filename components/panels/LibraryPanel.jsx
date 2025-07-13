"use client";

import { useState } from "react";
import {
  Search,
  Square,
  Type,
  Image,
  Layout,
  Palette,
  ToggleLeft,
  BarChart3,
  ChevronRight,
  AlertTriangle,
  Activity,
  Table,
  User,
  Navigation,
  MoreHorizontal,
  Eye,
  Loader,
  Tabs,
  Grid,
  Calendar,
  Upload,
  Play,
  Bell,
  Folder,
  MessageSquare,
  PlusSquare,
  Sliders,
  ChevronsUpDown,
  MenuSquare,
  MousePointer,
  Move,
  PanelRight,
  Rows,
  Columns,
} from "lucide-react";
import DraggableItem from "@/components/library/DraggableItem";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LibraryPanel() {
  const [searchTerm, setSearchTerm] = useState("");

  const componentCategories = [
    {
      name: "Basic Components",
      icon: Square,
      items: [
        { id: "button", name: "Button", icon: Square, type: "button" },
        { id: "input", name: "Input", icon: Type, type: "input" },
        { id: "card", name: "Card", icon: Layout, type: "card" },
        { id: "badge", name: "Badge", icon: Palette, type: "badge" },
      ],
    },
    {
      name: "Form Controls",
      icon: ToggleLeft,
      items: [
        { id: "checkbox", name: "Checkbox", icon: Square, type: "checkbox" },
        { id: "switch", name: "Switch", icon: ToggleLeft, type: "switch" },
        { id: "slider", name: "Slider", icon: Type, type: "slider" },
        {
          id: "input-otp",
          name: "Input OTP",
          icon: PlusSquare,
          type: "input-otp",
        },
        { id: "toggle", name: "Toggle", icon: ToggleLeft, type: "toggle" },
        {
          id: "toggle-group",
          name: "Toggle Group",
          icon: Sliders,
          type: "toggle-group",
        },
      ],
    },
    {
      name: "Navigation",
      icon: Navigation,
      items: [
        {
          id: "navigation-menu",
          name: "Nav Menu",
          icon: MenuSquare,
          type: "navigation-menu",
        },
        {
          id: "context-menu",
          name: "Context Menu",
          icon: MousePointer,
          type: "context-menu",
        },
        { id: "tabs", name: "Tabs", icon: Tabs, type: "tabs" },
      ],
    },
    {
      name: "Layout",
      icon: Layout,
      items: [
        {
          id: "collapsible",
          name: "Collapsible",
          icon: ChevronsUpDown,
          type: "collapsible",
        },
        {
          id: "scroll-area",
          name: "Scroll Area",
          icon: Rows,
          type: "scroll-area",
        },
        { id: "sheet", name: "Sheet", icon: PanelRight, type: "sheet" },
        { id: "drawer", name: "Drawer", icon: Columns, type: "drawer" },
        {
          id: "hover-card",
          name: "Hover Card",
          icon: Move,
          type: "hover-card",
        },
      ],
    },
    {
      name: "Feedback",
      icon: MessageSquare,
      items: [
        { id: "alert", name: "Alert", icon: AlertTriangle, type: "alert" },
        { id: "skeleton", name: "Skeleton", icon: Layout, type: "skeleton" },
      ],
    },
    {
      name: "Other",
      icon: Folder,
      items: [{ id: "command", name: "Command", icon: Type, type: "command" }],
    },
  ];

  const filteredCategories = componentCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div
      className="flex flex-col min-w-0 min-h-0 bg-background border-r border-border/30"
      style={{ maxHeight: "calc(100vh - 64px)", height: "calc(100vh - 64px)" }}
    >
      {/* Header */}
      <div
        className="p-4 border-b border-border/50 sticky top-0 z-10 bg-background"
        style={{ height: "200px" }}
      >
        <h2 className="text-lg font-semibold mb-3">Components</h2>

        <div className="mb-4">
          <ThemeToggle />
        </div>

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
      <ScrollArea
        className="flex-1 w-full min-h-0 min-w-0 overflow-y-auto p-4"
        style={{ maxHeight: "calc(100vh - 64px)" }}
      >
        <div className="space-y-8 min-w-0 w-full">
          {filteredCategories.map((category) => (
            <div key={category.name} className="space-y-3 min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-1">
                <category.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{category.name}</span>
              </div>

              <div className="flex flex-col gap-3 w-full">
                {category.items.map((item) => (
                  <div className="w-full min-w-0">
                    <div className="bg-card rounded-xl shadow border border-border/30 p-4 flex items-center min-w-0 w-full transition hover:shadow-md">
                      <DraggableItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        icon={item.icon}
                        chartType={item.chartType}
                        className="w-full min-w-0"
                      />
                    </div>
                  </div>
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
      </ScrollArea>
    </div>
  );
}
