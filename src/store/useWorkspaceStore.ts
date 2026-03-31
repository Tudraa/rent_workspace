import { create } from 'zustand';
import { Product } from '../data/products';

interface SelectedOtherItem {
  product: Product;
  quantity: number;
}

interface CanvasItem extends Product {
  instanceId?: string; // Opsional jika ingin pakai nama berbeda
  initialX?: number;
}

interface WorkspaceState {
  desk: Product | null;
  chair: Product | null;
  monitors: CanvasItem[]; // Gunakan CanvasItem
  accessories: CanvasItem[]; // Gunakan CanvasItem
  otherItems: SelectedOtherItem[];
  focusedItemId: string | null;

  setDesk: (desk: Product) => void;
  setChair: (chair: Product) => void;
  addMonitor: (monitor: Product) => void;
  removeMonitor: (id: string) => void;
  addAccessory: (acc: Product) => void;
  removeAccessory: (id: string) => void; // Ubah nama parameter agar jelas
  removeChair: () => void;
  removeDesk: () => void;
  setFocusedItemId: (id: string | null) => void;

  updateOtherItemQuantity: (product: Product, amount: number) => void;
  setMonitors: (monitors: CanvasItem[]) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  desk: null,
  chair: null,
  monitors: [],
  accessories: [],
  otherItems: [],
  focusedItemId: null,

  setFocusedItemId: (id) => set({ focusedItemId: id }),
  setDesk: (desk) => set({ desk }),
  setChair: (chair) => set({ chair }),
  removeChair: () => set({ chair: null }),
  removeDesk: () => set({ desk: null }),
  setMonitors: (monitors) => set({ monitors }),

  addAccessory: (product) => set((state) => {
    const uniqueId = `${product.id}-${Date.now()}`;
    return {
      accessories: [...state.accessories, { ...product, id: uniqueId }]
    };
  }),

  removeAccessory: (idToRemove) => set((state) => ({
    accessories: state.accessories.filter(acc => acc.id !== idToRemove)
  })),

  addMonitor: (monitor) => set((state) => {
    if (state.monitors.length >= 3) {
      alert("Max 3 monitor.");
      return state;
    }

    const spacing = 250;
    const initialX = (state.monitors.length - 1) * spacing;

    const uniqueMonitor = {
      ...monitor,
      id: `${monitor.id}-${Date.now()}`,
      initialX: initialX,
    };

    return { monitors: [...state.monitors, uniqueMonitor] };
  }),

  removeMonitor: (idToRemove) => set((state) => ({
    monitors: state.monitors.filter((m) => m.id !== idToRemove)
  })),

  updateOtherItemQuantity: (product, amount) => set((state) => {
    const existingIndex = state.otherItems.findIndex(item => item.product.id === product.id);

    if (existingIndex !== -1) {
      const newItems = [...state.otherItems];
      const newQuantity = newItems[existingIndex].quantity + amount;

      if (newQuantity <= 0) {
        return { otherItems: state.otherItems.filter(item => item.product.id !== product.id) };
      }

      newItems[existingIndex].quantity = newQuantity;
      return { otherItems: newItems };
    } else if (amount > 0) {
      return { otherItems: [...state.otherItems, { product, quantity: 1 }] };
    }
    return state;
  }),
}));