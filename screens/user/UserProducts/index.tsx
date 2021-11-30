import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Alert,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import ProductItem from "../../../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { primaryColor } from "../../../constants";
import { asyncDelete, fetchData } from "../../../store/productSlice";
import { cartActions } from "../../../store/cartSlice";
import { Product } from "../../../models/Product/index";

// import { Container } from './styles';

type RootStackParamList = {
  UserProducts: undefined;
  EditProducts: { product: Product };
};

const UserProducts = (
  props: NativeStackScreenProps<RootStackParamList, "UserProducts">
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { removeProduct } = cartActions;
  const dispatch = useDispatch();
  const userProducts = useSelector((state: RootState) => {
    const productsArray = [...state.product.userProducts];
    return productsArray.sort((a: Product, b: Product) =>
      a.id > b.id ? 1 : -1
    );
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        await dispatch(fetchData());
        setIsLoading(false);
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };
    props.navigation.addListener("focus", loadData);
  }, []);

  const handleSelect = (id: string) => {
    props.navigation.navigate("EditProducts", {
      product: userProducts.find((product) => product.id === id)!,
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert("Are you sure?", "Do you really wanna delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(removeProduct({ id }));
          dispatch(asyncDelete(id));
        },
      },
    ]);
  };

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 20 }}>
          Something went wrong...
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color={primaryColor} size="large" />
      </View>
    );
  }

  if (!isLoading && userProducts.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 20 }}>
          No products around here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(item) => (
        <ProductItem onSelect={handleSelect} item={item.item}>
          <Button
            title="Edit product"
            onPress={handleSelect.bind(this, item.item.id)}
            color={primaryColor}
          />
          <Button
            title="Delete product"
            onPress={handleDelete.bind(this, item.item.id)}
            color={primaryColor}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProducts;
