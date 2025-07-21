"use client";

import useAppStore from "@/stores/useAppStore";

export default function ThemedCard({
  title = "Card Title",
  content = "This is a card component.",
  size = "default",
  ...props
}) {
  const { activeTheme, colorMode } = useAppStore();

  const getThemeClasses = () => {
    const baseClasses = "p-6 transition-all duration-200";
    const sizeClasses = {
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    };

    const sizeClass = sizeClasses[size] || sizeClasses.default;

    switch (activeTheme) {
      case "material":
        return `
          ${baseClasses} ${sizeClass} rounded-lg
          material-card hover:shadow-lg
        `;

      case "glass":
        return `
          ${baseClasses} ${sizeClass} rounded-lg glass-panel
          border border-white/20
        `;

      case "skeuo":
        return `
          ${baseClasses} ${sizeClass} rounded-lg
          ${colorMode === "dark" ? "skeuo-card-dark" : "skeuo-card"}
        `;

      default:
        return `${baseClasses} ${sizeClass} rounded-lg border bg-card text-card-foreground shadow-sm`;
    }
  };

  return (
    <div
      className={
        getThemeClasses() +
        (props.fillParent
          ? " w-full h-full flex flex-col min-w-0 items-center justify-center"
          : "")
      }
      {...props}
    >
      <h3 className="text-lg font-semibold mb-2 min-w-0">{title}</h3>
      <p className="text-muted-foreground min-w-0">{content}</p>
    </div>
  );
}
