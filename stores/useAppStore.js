import { create } from "zustand";

const useAppStore = create((set, get) => ({
  // Theme state
  activeTheme: "material", // 'material' | 'glass' | 'skeuo'
  colorMode: "dark", // 'light' | 'dark'

  // Canvas state
  canvasComponents: [],
  selectedComponentId: null,
  zoom: 100,
  showGrid: true,
  snapToGrid: true,
  canvasBg: "#f8fafc", // default background color
  gridSize: 20, // default grid size in px

  // Code generation state
  activeFramework: "react", // 'react' | 'vue' | 'angular'

  // UI state
  leftPanelWidth: 20,
  rightPanelWidth: 30,
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,

  // Actions
  setActiveTheme: (theme) => set({ activeTheme: theme }),
  setColorMode: (mode) => set({ colorMode: mode }),

  setZoom: (zoom) => set({ zoom }),
  setShowGrid: (showGrid) => set({ showGrid }),
  setSnapToGrid: (snapToGrid) => set({ snapToGrid }),
  setCanvasBg: (canvasBg) => set({ canvasBg }),
  setGridSize: (gridSize) => set({ gridSize }),

  // Canvas actions
  addComponent: (component) => {
    const newComponent = {
      id: Date.now().toString(),
      type: component.type,
      props: component.props || {},
      position: component.position || { x: 0, y: 0 },
      size: { width: "auto", height: "auto" },
    };
    set((state) => ({
      canvasComponents: [...state.canvasComponents, newComponent],
    }));
    return newComponent.id;
  },

  updateComponentPosition: (id, position) =>
    set((state) => ({
      canvasComponents: state.canvasComponents.map((c) =>
        c.id === id ? { ...c, position } : c
      ),
    })),

  removeComponent: (id) =>
    set((state) => ({
      canvasComponents: state.canvasComponents.filter((c) => c.id !== id),
      selectedComponentId:
        state.selectedComponentId === id ? null : state.selectedComponentId,
    })),

  updateComponent: (id, updates) =>
    set((state) => ({
      canvasComponents: state.canvasComponents.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),

  reorderComponents: (id, direction) =>
    set((state) => {
      const components = [...state.canvasComponents];
      const index = components.findIndex((c) => c.id === id);
      if (index === -1) return state;

      if (direction === "forward" && index < components.length - 1) {
        // Swap with the next element
        [components[index], components[index + 1]] = [
          components[index + 1],
          components[index],
        ];
      } else if (direction === "backward" && index > 0) {
        // Swap with the previous element
        [components[index], components[index - 1]] = [
          components[index - 1],
          components[index],
        ];
      }

      return { canvasComponents: components };
    }),

  setSelectedComponent: (id) => set({ selectedComponentId: id }),

  // Framework actions
  setActiveFramework: (framework) => set({ activeFramework: framework }),

  // Panel actions
  setPanelWidths: (left, right) =>
    set({
      leftPanelWidth: left,
      rightPanelWidth: right,
    }),
  setLeftPanelCollapsed: (collapsed) => set({ leftPanelCollapsed: collapsed }),
  setRightPanelCollapsed: (collapsed) =>
    set({ rightPanelCollapsed: collapsed }),

  // Utility actions
  clearCanvas: () =>
    set({
      canvasComponents: [],
      selectedComponentId: null,
    }),

  getSelectedComponent: () => {
    const state = get();
    return (
      state.canvasComponents.find((c) => c.id === state.selectedComponentId) ||
      null
    );
  },
}));

export default useAppStore;
