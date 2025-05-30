import { create } from "zustand";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

type AddToCartItem = Omit<CartItem, "quantity">;

interface CartState {
  items: CartItem[];
  addToCart: (newItem: AddToCartItem) => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addToCart: (newItem) => {
    set((currentState) => {
      const duplicateItems = [...currentState.items];

      const existingItemIndex = duplicateItems.findIndex(
        (item) => item.productId === newItem.productId,
      );

      if (existingItemIndex !== -1) {
        duplicateItems[existingItemIndex]!.quantity += 1;
      } else {
        duplicateItems.push({
          productId: newItem.productId,
          name: newItem.name,
          price: newItem.price,
          imageUrl: newItem.imageUrl,
          quantity: 1,
        });
      }

      return {
        ...currentState,
        items: duplicateItems,
      };
    });
  },
}));
