import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
