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
    gridColorMode,
    setGridColorMode,
  } = useAppStore();

  return (
    <div className="glass-panel p-4 rounded-lg">
      <div className="space-y-4">
        {/* Grid Color Mode */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Grid className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Grid Color</span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={gridColorMode || "auto"}
              onChange={(e) => setGridColorMode(e.target.value)}
              className="border rounded px-2 py-1 text-sm bg-background text-foreground"
              title="Grid color mode"
            >
              <option value="auto">Auto</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
            <span className="text-xs text-muted-foreground">
              Auto adapts to background
            </span>
          </div>
        </div>
        {/* Canvas Background Color */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PaintBucket className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Canvas Background</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={canvasBg || "#ffffff"}
              onChange={(e) => setCanvasBg(e.target.value)}
              className="w-10 h-6 p-0 border rounded cursor-pointer bg-transparent"
              title="Pick canvas background color"
            />
            <button
              className="px-2 py-1 text-xs rounded border bg-background text-muted-foreground hover:text-foreground"
              onClick={() => setCanvasBg(null)}
              title="Reset to theme background"
              type="button"
              disabled={!canvasBg}
            >
              Reset
            </button>
            {!canvasBg && (
              <span className="text-xs text-muted-foreground">
                Using theme background
              </span>
            )}
          </div>
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
