import { create } from "zustand";

interface CartState {
  items: number[];
  addToCart: () => void;
}

const useBearStore = create<CartState>()((set) => ({
  items: [],
  addToCart: () => {},
}));
