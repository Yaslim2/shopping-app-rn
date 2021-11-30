import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import OrderItem from "../../../components/OrderItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Orders: undefined;
};

// import { Container } from './styles';

const Orders = (props: NativeStackScreenProps<RootStackParamList>) => {
  const orders = useSelector((state: RootState) => state.order.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(item) => <OrderItem item={item.item} />}
    />
  );
};

export default Orders;
