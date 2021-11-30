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
  reducers: {
    deleteProduct: (state, action: PayloadAction<{ id: string }>) => {
      state.userProducts = state.userProducts.filter(
        (product) => product.id !== action.payload.id
      );
      state.avaiableProducts = state.avaiableProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },
    createProduct: (state, action: PayloadAction<Product>) => {
      state.userProducts = [
        ...state.userProducts,
        {
          id: action.payload.id,
          ownerId: action.payload.ownerId,
          description: action.payload.description,
          imageUrl: action.payload.imageUrl,
          price: action.payload.price,
          title: action.payload.title,
        },
      ];
      state.avaiableProducts = [
        ...state.avaiableProducts,
        {
          id: new Date().getTime().toString(),
          ownerId: action.payload.ownerId,
          description: action.payload.description,
          imageUrl: action.payload.imageUrl,
          price: action.payload.price,
          title: action.payload.title,
        },
      ];
    },
    updateProduct: (
      state,
      action: PayloadAction<{
        id: string;
        imageUrl: string;
        description: string;
        title: string;
      }>
    ) => {
      const existingProduct = state.userProducts.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        const updatedProduct: Product = {
          id: existingProduct.id,
          ownerId: existingProduct.ownerId,
          description: action.payload.description,
          imageUrl: action.payload.imageUrl,
          price: existingProduct.price,
          title: action.payload.title,
        };
        state.userProducts = state.userProducts.filter(
          (product) => product.id !== action.payload.id
        );
        state.avaiableProducts = state.avaiableProducts.filter(
          (product) => product.id !== action.payload.id
        );
        state.userProducts = [...state.userProducts, updatedProduct];
        state.avaiableProducts = [...state.avaiableProducts, updatedProduct];
      }
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
