import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { primaryColor } from "../../constants";
import CartItem from "../CartItem";
import { OrderType } from "../../store/orderSlice";

// import { Container } from './styles';

const OrderItem: React.FC<{ item: OrderType }> = (props) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          R$ {props.item.totalAmount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{props.item.date}</Text>
      </View>
      <Button
        color={primaryColor}
        title={showDetails ? "Hide details" : "Show details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />

      {showDetails && (
        <View style={styles.detailsContainer}>
          {props.item.items.map((cartItem) => (
            <CartItem deletable={false} key={cartItem.id} item={cartItem} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "#000",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailsContainer: {
    marginVertical: 15,
  },
});

export default OrderItem;
