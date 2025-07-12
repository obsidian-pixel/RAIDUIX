import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function ThemedScrollArea({ tags, ...props }) {
  const allTags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )
  
  return (
    <ScrollArea className="h-72 w-48 rounded-md border" {...props}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {allTags.map((tag) => (
          <>
            <div className="text-sm" key={tag}>
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}