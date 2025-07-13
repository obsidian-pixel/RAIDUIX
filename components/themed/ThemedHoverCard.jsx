"use client";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
export default function ThemedHoverCard({
  trigger = "Hover me",
  content = "Hover card content",
  ...props
}) {
  return (
    <HoverCard {...props}>
      <HoverCardTrigger className="px-2 py-1 bg-muted rounded">
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent className="p-2 bg-popover rounded shadow">
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}
