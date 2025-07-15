"use client";

import useAppStore from "@/stores/useAppStore";
import { Ruler, Grid, Magnet, PaintBucket } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function CanvasSettings() {
  const {
    zoom,
    setZoom,
    showGrid,
    setShowGrid,
    snapToGrid,
    setSnapToGrid,
    canvasBg,
    setCanvasBg,
    gridSize,
    setGridSize,
  } = useAppStore();

  return (
    <div className="glass-panel p-4 rounded-lg">
      <div className="space-y-4">
        {/* Canvas Background Color */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PaintBucket className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Canvas Background</span>
          </div>
          <input
            type="color"
            value={canvasBg}
            onChange={(e) => setCanvasBg(e.target.value)}
            className="w-10 h-6 p-0 border rounded cursor-pointer bg-transparent"
            title="Pick canvas background color"
          />
        </div>
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
            <span className="text-sm w-12 text-center text-muted-foreground">
              {zoom}%
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Show Grid</span>
          </div>
          <Switch checked={showGrid} onCheckedChange={setShowGrid} />
        </div>
        {/* Grid Size */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Grid className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Grid Size</span>
          </div>
          <div className="flex items-center gap-2">
            <Slider
              value={[gridSize]}
              onValueChange={([v]) => setGridSize(v)}
              min={5}
              max={100}
              step={1}
            />
            <span className="text-sm w-10 text-center text-muted-foreground">
              {gridSize}px
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Magnet className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Snap to Grid</span>
          </div>
          <Switch checked={snapToGrid} onCheckedChange={setSnapToGrid} />
        </div>
      </div>
    </div>
  );
}
