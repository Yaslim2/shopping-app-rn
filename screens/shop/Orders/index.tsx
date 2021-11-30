import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import OrderItem from "../../../components/OrderItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchData } from "../../../store/orderSlice";
import { primaryColor } from "../../../constants";

type RootStackParamList = {
  Orders: undefined;
};

// import { Container } from './styles';

const Orders = (props: NativeStackScreenProps<RootStackParamList>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const orders = useSelector((state: RootState) => state.order.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await dispatch(fetchData());
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={primaryColor} size="large" />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 20 }}>
          No orders around here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(item) => <OrderItem item={item.item} />}
    />
  );
};

export default Orders;
