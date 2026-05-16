import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  cartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((i) => 
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isCartOpen: true, // Auto open cart when adding
          });
        } else {
          set({ 
            items: [...currentItems, { ...item, quantity: 1 }],
            isCartOpen: true,
          });
        }
      },
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) => 
          i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
        )
      })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      cartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'florence-cart',
    }
  )
);
