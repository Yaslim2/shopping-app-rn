import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  sum: number;
};

type CartSliceState = {
  items: CartItem[];
  totalAmount: number;
};

const initialState: CartSliceState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        price: number;
      }>
    ) => {
      const addedProduct = action.payload;
      let existingProduct = state.items.find(
        (product) => product.id === addedProduct.id
      );
      if (existingProduct) {
        existingProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
          sum: existingProduct.sum + existingProduct.price,
        };
        const filteredProducts = state.items.filter(
          (product) => product.id !== addedProduct.id
        );

        const newProducts = [...filteredProducts, existingProduct];
        state.items = [...newProducts];
        state.totalAmount += addedProduct.price;
      } else {
        const newProduct: CartItem = {
          id: addedProduct.id,
          price: addedProduct.price,
          quantity: 1,
          sum: addedProduct.price,
          title: addedProduct.title,
        };
        state.items.push(newProduct);
        state.totalAmount += addedProduct.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== existingItem.id
          );
          state.totalAmount -= existingItem.price;
        } else {
          const newItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
            sum: existingItem.sum - existingItem.price,
          };
          state.items = state.items.filter(
            (item) => item.id !== existingItem.id
          );
          state.items = [...state.items, newItem];
          state.totalAmount -= existingItem.price;
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
