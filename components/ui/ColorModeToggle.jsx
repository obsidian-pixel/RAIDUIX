"use client";

import { Moon, Sun } from "lucide-react";
import useAppStore from "@/stores/useAppStore";

export default function ColorModeToggle() {
  const { colorMode, setColorMode } = useAppStore();

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleColorMode}
      className="header-icon-button p-2 rounded-lg flex items-center justify-center"
      title={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      style={{ height: 40, width: 40 }}
    >
      {colorMode === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
