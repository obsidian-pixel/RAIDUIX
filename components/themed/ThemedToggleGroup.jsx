"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ThemedToggleGroup({
  items = [],
  size = "sm",
  variant = "default",
  ...props
}) {
  return (
    <ToggleGroup type="single" size={size} variant={variant} {...props}>
      {items.length > 0
        ? items.map((item, idx) => (
            <ToggleGroupItem
              key={item.value || idx}
              value={item.value}
              aria-label={item.label || item.value}
            >
              {item.label || item.value}
            </ToggleGroupItem>
          ))
        : [
            <ToggleGroupItem key="1" value="1" aria-label="Option 1">
              Option 1
            </ToggleGroupItem>,
            <ToggleGroupItem key="2" value="2" aria-label="Option 2">
              Option 2
            </ToggleGroupItem>,
            <ToggleGroupItem key="3" value="3" aria-label="Option 3">
              Option 3
            </ToggleGroupItem>,
          ]}
    </ToggleGroup>
  );
}
