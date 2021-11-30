import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../cartSlice/index";
import moment from "moment";
import { AppDispatch, AppThunk } from "..";

export type OrderType = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
};

type OrderTypeFirebase = {
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

export const fetchData = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://react-http-b160c-default-rtdb.firebaseio.com/orders/u1.json"
      );

      const data = await response.json();
      const orders: OrderType[] = [];
      for (let key in data) {
        orders.push({
          id: key,
          totalAmount: data[key].totalAmount,
          date: data[key].date,
          items: data[key].items,
        });
      }
      dispatch(setOrders({ orders }));
    } catch (e: any) {
      throw new Error();
    }
  };
};

export const sendData = (order: OrderTypeFirebase): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://react-http-b160c-default-rtdb.firebaseio.com/orders/u1.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: order.items,
            totalAmount: order.totalAmount,
            date: order.date,
          }),
        }
      );
      const data = await response.json();
      dispatch(
        addOrder({
          ...order,
          id: data.name,
        })
      );
    } catch (e) {
      console.log("Something went wrong...");
    }
  };
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (
      state,
      action: PayloadAction<{
        id: string;
        items: CartItem[];
        totalAmount: number;
      }>
    ) => {
      state.orders.push({
        id: action.payload.id,
        date: moment().locale("pt-br").format("DD/MM/YYYY"),
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      });
    },
    setOrders: (state, action: PayloadAction<{ orders: OrderType[] }>) => {
      state.orders = action.payload.orders;
    },
  },
});

export const { addOrder, setOrders } = orderSlice.actions;

export default orderSlice.reducer;
