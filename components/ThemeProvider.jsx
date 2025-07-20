"use client";
import React, { useEffect } from "react";
import useAppStore from "@/stores/useAppStore";

export default function ThemeProvider({ children }) {
  const colorMode = useAppStore((state) => state.colorMode);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (colorMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [colorMode]);

  return <>{children}</>;
}
