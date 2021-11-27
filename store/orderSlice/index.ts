import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../cartSlice/index";

type OrderType = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
};
type OrderSliceState = {
  orders: OrderType[];
};

const initialState: OrderSliceState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (
      state,
      action: PayloadAction<{ items: CartItem[]; totalAmount: number }>
    ) => {
      state.orders.push({
        id: new Date().getTime().toString(),
        date: new Date().toLocaleDateString("pt-BR"),
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      });

      console.log(state.orders);
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
