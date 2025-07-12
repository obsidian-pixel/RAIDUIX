'use client'

import useAppStore from '@/stores/useAppStore'
import { Ruler, Grid, Magnet } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

export default function CanvasSettings() {
  const { zoom, setZoom, showGrid, setShowGrid, snapToGrid, setSnapToGrid } = useAppStore()

  return (
    <div className="glass-panel p-4 rounded-lg">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Zoom</span>
          </div>
          <div className="flex items-center gap-2">
            <Slider
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={10}
              max={200}
              step={5}
            />
            <span className="text-sm w-12 text-center text-muted-foreground">{zoom}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Show Grid</span>
          </div>
          <Switch
            checked={showGrid}
            onCheckedChange={setShowGrid}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Magnet className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Snap to Grid</span>
          </div>
          <Switch
            checked={snapToGrid}
            onCheckedChange={setSnapToGrid}
          />
        </div>
      </div>
    </div>
  )
}