"use client";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
export default function ThemedDrawer({
  title = "Drawer Title",
  content = "Drawer Content",
  ...props
}) {
  return (
    <Drawer {...props}>
      <DrawerTrigger className="px-2 py-1 bg-primary text-primary-foreground rounded">
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <h2 className="font-bold mb-2">{title}</h2>
          <div>{content}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
