import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetail from "../screens/shop/ProductDetail";
import Cart from "../screens/shop/Cart";
import { primaryColor } from "../constants";

const ProductsStack = createNativeStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: primaryColor,
        },
        headerTintColor: "#fff",
        animation: "fade_from_bottom",
        headerTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
    >
      <ProductsStack.Screen
        name="ProductsOverview"
        component={ProductsOverview}
        options={{ title: "All products" }}
      />
      <ProductsStack.Screen name="ProductDetail" component={ProductDetail} />
      <ProductsStack.Screen name="Cart" component={Cart} />
    </ProductsStack.Navigator>
  );
};

export default ProductsNavigator;
