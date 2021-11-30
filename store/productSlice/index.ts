import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "..";
import PRODUCTS from "../../assets/data/dummy-data";

type Product = {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
};

interface ProductFirebase {
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

type ProductSliceState = {
  avaiableProducts: Product[];
  userProducts: Product[];
  error: boolean;
};

const initialState: ProductSliceState = {
  avaiableProducts: [],
  userProducts: [],
  error: false,
};

export const asyncDelete = (id: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    await fetch(
      `https://react-http-b160c-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch(deleteProduct({ id }));
  };
};

export const asyncUpdate = (product: {
  id: string;
  description: string;
  title: string;
  imageUrl: string;
}): AppThunk => {
  return async (dispatch: AppDispatch) => {
    await fetch(
      `https://react-http-b160c-default-rtdb.firebaseio.com/products/${product.id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: product.title,
          imageUrl: product.imageUrl,
          description: product.description,
        }),
      }
    );
    dispatch(updateProduct(product));
  };
};

export const fetchData = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://react-http-b160c-default-rtdb.firebaseio.com/products.json"
      );

      const data = await response.json();
      const products: Product[] = [];
      for (let key in data) {
        products.push({
          id: key,
          description: data[key].description,
          imageUrl: data[key].imageUrl,
          ownerId: data[key].ownerId,
          price: data[key].price,
          title: data[key].title,
        });
      }
      dispatch(setProducts({ products }));
    } catch (e: any) {
      throw new Error();
    }
  };
};

export const sendData = (product: ProductFirebase): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://react-http-b160c-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            description: product.description,
            ownerId: product.ownerId,
          }),
        }
      );
      const data = await response.json();
      dispatch(
        createProduct({
          ...product,
          id: data.name,
        })
      );
    } catch (e) {
      console.log("Something went wrong...");
    }
  };
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
          id: action.payload.id,
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
    setProducts: (state, action: PayloadAction<{ products: Product[] }>) => {
      state.avaiableProducts = action.payload.products;

      state.userProducts = action.payload.products;
    },
  },
});

export const { createProduct, deleteProduct, updateProduct, setProducts } =
  productSlice.actions;

export default productSlice.reducer;
