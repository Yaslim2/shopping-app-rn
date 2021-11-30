import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../cartSlice/index";
import moment from "moment";

export type OrderType = {
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
        date: moment().locale("pt-br").format("DD/MM/YYYY"),
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      });
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
