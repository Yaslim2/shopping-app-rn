import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cartActions } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { CartItem as CartItemType } from "../../store/cartSlice";
// import { Container } from './styles';

const CartItem: React.FC<{
  item: CartItemType;
}> = (props) => {
  const dispatch = useDispatch();
  const { removeFromCart } = cartActions;

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart({ id }));
  };
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.item.quantity}</Text>
        <Text style={styles.mainText}>{props.item.title}</Text>
      </View>
      <View style={styles.itemDataPrice}>
        <Text style={styles.mainText}>R$ {props.item.sum.toFixed(2)}</Text>
        <TouchableOpacity onPress={handleRemoveItem.bind(this, props.item.id)}>
          <Ionicons name="ios-trash" size={23} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 10,
    width: 320,
  },
  itemData: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
  },
  itemDataPrice: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    padding: 20,
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default CartItem;
