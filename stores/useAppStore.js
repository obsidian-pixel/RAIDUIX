import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // Theme state
  activeTheme: 'material', // 'material' | 'glass' | 'skeuo'
  colorMode: 'dark', // 'light' | 'dark'
  
  // Canvas state
  canvasComponents: [],
  selectedComponentId: null,
  
  // Code generation state
  activeFramework: 'react', // 'react' | 'vue' | 'angular'
  
  // UI state
  leftPanelWidth: 20,
  rightPanelWidth: 30,
  
  // Actions
  setActiveTheme: (theme) => set({ activeTheme: theme }),
  setColorMode: (mode) => set({ colorMode: mode }),
  
  // Canvas actions
  addComponent: (component) => set((state) => ({
    canvasComponents: [...state.canvasComponents, {
      id: Date.now().toString(),
      type: component.type,
      props: component.props || {},
      position: { x: 0, y: 0 },
      size: { width: 'auto', height: 'auto' }
    }]
  })),
  
  removeComponent: (id) => set((state) => ({
    canvasComponents: state.canvasComponents.filter(c => c.id !== id),
    selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId
  })),
  
  updateComponent: (id, updates) => set((state) => ({
    canvasComponents: state.canvasComponents.map(c => 
      c.id === id ? { ...c, ...updates } : c
    )
  })),
  
  reorderComponents: (fromIndex, toIndex) => set((state) => {
    const components = [...state.canvasComponents]
    const [removed] = components.splice(fromIndex, 1)
    components.splice(toIndex, 0, removed)
    return { canvasComponents: components }
  }),
  
  setSelectedComponent: (id) => set({ selectedComponentId: id }),
  
  // Framework actions
  setActiveFramework: (framework) => set({ activeFramework: framework }),
  
  // Panel actions
  setPanelWidths: (left, right) => set({ 
    leftPanelWidth: left, 
    rightPanelWidth: right 
  }),
  
  // Utility actions
  clearCanvas: () => set({ 
    canvasComponents: [], 
    selectedComponentId: null 
  }),
  
  getSelectedComponent: () => {
    const state = get()
    return state.canvasComponents.find(c => c.id === state.selectedComponentId) || null
  }
}))

export default useAppStore