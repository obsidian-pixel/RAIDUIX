"use client";
import { NavigationMenu } from "@/components/ui/navigation-menu";
export default function ThemedNavigationMenu({
  items = ["Home", "Library"],
  ...props
}) {
  return (
    <NavigationMenu {...props}>
      {items.map((item, idx) => (
        <div key={idx} className="px-2 py-1">
          {item}
        </div>
      ))}
    </NavigationMenu>
  );
}
