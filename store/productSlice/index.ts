import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PRODUCTS from "../../assets/data/dummy-data";

type Product = {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
};

type ProductSliceState = {
  avaiableProducts: Product[];
  userProducts: Product[];
};

const initialState: ProductSliceState = {
  avaiableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
