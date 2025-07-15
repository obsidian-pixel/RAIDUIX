"use client";

import useAppStore from "@/stores/useAppStore";

export default function ThemedBadge({
  text = "Badge",
  variant = "default",
  size = "default",
  ...props
}) {
  const { activeTheme, colorMode } = useAppStore();

  const getThemeClasses = () => {
    const baseClasses = `${
      fillParent
        ? "w-full h-full flex items-center justify-center"
        : "inline-flex items-center"
    } font-medium`;
    const sizeClasses = {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    };
    const sizeClass = sizeClasses[size] || sizeClasses.default;
    switch (activeTheme) {
      case "material":
        return `${baseClasses} ${sizeClass} rounded-full ${
          variant === "default"
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        }`;
      case "glass":
        return `${baseClasses} ${sizeClass} rounded-full glass-panel ${
          variant === "default"
            ? "text-blue-300 border border-blue-300/30"
            : "text-foreground border border-white/20"
        }`;
      case "skeuo":
        return `${baseClasses} ${sizeClass} rounded-full ${
          colorMode === "dark"
            ? "bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-inner"
            : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800 shadow-inner"
        }`;
      default:
        return `${baseClasses} ${sizeClass} rounded-full bg-primary text-primary-foreground`;
    }
  };
  const fillParent = false;
  return (
    <span className={getThemeClasses()} {...props}>
      {text}
    </span>
  );
}
