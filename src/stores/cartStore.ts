import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types/product';

interface CartState {
  items: CartItem[];
  wishlist: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  setQty: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

function clampQty(qty: number) {
  if (Number.isNaN(qty)) return 1;
  return Math.max(1, Math.min(99, qty));
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      addToCart: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id);
        const next = existing
          ? items.map((i) => (i.id === product.id ? { ...i, quantity: clampQty(i.quantity + 1) } : i))
          : [...items, { ...product, quantity: 1 }];
        set({ items: next });
      },
      removeFromCart: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },
      setQty: (productId, quantity) => {
        const q = clampQty(quantity);
        set({ items: get().items.map((i) => (i.id === productId ? { ...i, quantity: q } : i)) });
      },
      clearCart: () => set({ items: [] }),
      toggleWishlist: (productId) => {
        const w = get().wishlist;
        set({ wishlist: w.includes(productId) ? w.filter((id) => id !== productId) : [...w, productId] });
      },
      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter((id) => id !== productId) });
      },
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'popkart-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, wishlist: s.wishlist }),
    }
  )
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
