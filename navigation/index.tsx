import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetail from "../screens/shop/ProductDetail";
import Orders from "../screens/shop/Orders";
import Cart from "../screens/shop/Cart";
import { primaryColor } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import UserProducts from "../screens/user/UserProducts";
import EditProduct from "../screens/user/EditProduct";

const ProductsStack = createNativeStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: "#fff",
          animation: "fade_from_bottom",
          headerTitleStyle: {
            fontFamily: "open-sans",
          },
          headerRight: () => {
            return (
              <Ionicons
                name="ios-cart"
                size={24}
                color="#fff"
                onPress={() => navigation.navigate("Cart")}
              />
            );
          },
          headerLeft: () => {
            return (
              <Ionicons
                style={{ marginRight: 20 }}
                name="ios-menu"
                size={23}
                color="#fff"
                onPress={() => navigation.toggleDrawer()}
              />
            );
          },
        };
      }}
    >
      <ProductsStack.Screen
        name="ProductsOverview"
        component={ProductsOverview}
        options={{
          title: "All products",
        }}
      />
      <ProductsStack.Screen
        options={{
          headerLeft: () => {
            return null;
          },
        }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <ProductsStack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerTitle: "Your cart",
          headerRight: () => {
            return null;
          },
          headerLeft: () => {
            return null;
          },
        }}
      />
    </ProductsStack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: "#fff",
          animation: "fade_from_bottom",
          headerTitleStyle: {
            fontFamily: "open-sans",
          },
          headerLeft: () => {
            return (
              <Ionicons
                style={{ marginRight: 20 }}
                name="ios-menu"
                size={23}
                color="#fff"
                onPress={() => navigation.toggleDrawer()}
              />
            );
          },
        };
      }}
    >
      <OrdersStack.Screen
        name="OrdersScreen"
        component={Orders}
        options={{ title: "Your orders" }}
      />
    </OrdersStack.Navigator>
  );
};

const AdminStack = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: "#fff",
          animation: "fade_from_bottom",
          headerTitleStyle: {
            fontFamily: "open-sans",
          },
          headerLeft: () => {
            return (
              <Ionicons
                style={{ marginRight: 20 }}
                name="ios-menu"
                size={23}
                color="#fff"
                onPress={() => navigation.toggleDrawer()}
              />
            );
          },
        };
      }}
    >
      <AdminStack.Screen
        name="UserProducts"
        component={UserProducts}
        options={({ navigation }) => {
          return {
            title: "Your products",
            headerRight: () => {
              return (
                <Ionicons
                  name="ios-add-circle-outline"
                  size={23}
                  color="#fff"
                  onPress={() => navigation.navigate("EditProducts")}
                />
              );
            },
          };
        }}
      />
      <AdminStack.Screen
        name="EditProducts"
        component={EditProduct}
        options={{ headerLeft: () => null }}
      />
    </AdminStack.Navigator>
  );
};

const ShopDrawer = createDrawerNavigator();

const ShopNavigator = () => (
  <ShopDrawer.Navigator
    screenOptions={{
      drawerActiveTintColor: primaryColor,
      headerShown: false,
      drawerLabelStyle: { fontFamily: "open-sans-bold" },
      drawerContentStyle: { backgroundColor: "#fdd8d8" },
    }}
  >
    <ShopDrawer.Screen
      options={{
        drawerIcon: (drawerConfig) => (
          <Ionicons name="ios-cart" size={23} color={drawerConfig.color} />
        ),
      }}
      name="Products"
      component={ProductsNavigator}
    />
    <ShopDrawer.Screen
      options={{
        drawerIcon: (drawerConfig) => (
          <Ionicons name="ios-list" size={23} color={drawerConfig.color} />
        ),
      }}
      name="Orders"
      component={OrdersNavigator}
    />

    <ShopDrawer.Screen
      options={{
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name="ios-person-sharp"
            size={23}
            color={drawerConfig.color}
          />
        ),
      }}
      component={AdminNavigator}
      name="Admin"
    />
  </ShopDrawer.Navigator>
);

export default ShopNavigator;
