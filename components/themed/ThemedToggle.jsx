'use client'
import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

export default function ThemedToggle({ ...props }) {
  return (
    <Toggle aria-label="Toggle bold" {...props}>
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}