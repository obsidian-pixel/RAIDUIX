"use client";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
export default function ThemedContextMenu({
  items = ["Edit", "Delete"],
  ...props
}) {
  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger className="px-2 py-1 bg-muted rounded">
        Right click me
      </ContextMenuTrigger>
      <ContextMenuContent>
        {items.map((item, idx) => (
          <ContextMenuItem key={idx}>{item}</ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
