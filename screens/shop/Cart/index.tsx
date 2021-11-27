import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { primaryColor, secondaryColor } from "../../../constants";
import { Product } from "../../../models/Product";
import { RootState } from "../../../store";
import CartItem from "../../../components/CartItem";
import { CartItem as CartItemType } from "../../../store/cartSlice";
// import { Container } from './styles';
import { orderActions } from "../../../store/orderSlice/index";

type RootStackParamList = {
  ProductsOverview: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Orders: undefined;
};

const Cart = (
  props: NativeStackScreenProps<RootStackParamList, "ProductDetail">
) => {
  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  );
  const { addOrder } = orderActions;
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => {
    const cart = [...state.cart.items];
    return cart.sort((a: CartItemType, b: CartItemType) =>
      a.id > b.id ? 1 : -1
    );
  });

  const handleOrder = () => {
    dispatch(addOrder({ items: cartItems, totalAmount: cartTotalAmount }));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}> R$ {cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          disabled={cartItems.length === 0}
          color={secondaryColor}
          title="Order now"
          onPress={handleOrder}
        />
      </View>

      <FlatList
        data={cartItems}
        renderItem={(itemData) => <CartItem item={itemData.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: primaryColor,
  },
});

export default Cart;
