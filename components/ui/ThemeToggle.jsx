"use client";

import { useState } from "react";
import { Palette, Droplets, Box } from "lucide-react";
import useAppStore from "@/stores/useAppStore";

export default function ThemeToggle() {
  const { activeTheme, setActiveTheme } = useAppStore();

  const themes = [
    { id: "material", name: "Material", icon: Box },
    { id: "glass", name: "Glass", icon: Droplets },
    { id: "skeuo", name: "Skeuo", icon: Palette },
  ];

  return (
    <div
      className="flex items-center p-2 gmin-w-0lass-panel rounded-lg border border-border/40 shadow-sm w-full max-w-md mx-auto gap-2 overflow-x-auto custom-scrollbar"
      style={{ WebkitOverflowScrolling: "touch", minHeight: "48px" }}
    >
      {themes.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTheme(id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition-all text-base font-medium outline-none min-w-[120px] max-w-xs
            focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 min-w-0
            ${
              activeTheme === id
                ? "bg-primary/10 text-primary shadow border border-primary/30 min-w-0"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/30 border border-transparent min-w-0"
            }
          `}
          tabIndex={0}
          aria-pressed={activeTheme === id}
        >
          <Icon className="w-5 h-5 shrink-0 min-w-0" />
          <span className="whitespace-nowrap truncate max-w-[100px] min-w-0">
            {name}
          </span>
        </button>
      ))}
    </div>
  );
}
