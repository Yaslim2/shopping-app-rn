import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { cartActions } from "../../../store/cartSlice";
import { fetchData } from "../../../store/productSlice";

import ProductItem from "../../../components/ProductItem";
import { Product } from "../../../models/Product";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { primaryColor } from "../../../constants";
type RootStackParamList = {
  ProductsOverview: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
};

const ProductsOverview = (
  props: NativeStackScreenProps<RootStackParamList, "ProductsOverview">
) => {
  const { addToCart } = cartActions;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const avaiableProducts = useSelector((state: RootState) => {
    const productsArray = [...state.product.avaiableProducts];
    return productsArray.sort((a: Product, b: Product) =>
      a.id > b.id ? 1 : -1
    );
  });

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      await dispatch(fetchData());
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  }, []);

  useEffect(() => {
    props.navigation.addListener("focus", loadData);
  }, [loadData]);

  const handleAddCart = (id: string) => {
    const selectedProduct = avaiableProducts.find(
      (product) => product.id === id
    )!;

    dispatch(
      addToCart({
        id,
        price: selectedProduct.price,
        title: selectedProduct.title,
      })
    );
  };
  const handleViewDetail = (id: string) => {
    props.navigation.navigate("ProductDetail", {
      product: avaiableProducts.find((product) => product.id === id)!,
    });
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

  if (!isLoading && avaiableProducts.length === 0) {
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
      onRefresh={loadData}
      refreshing={isLoading}
      data={avaiableProducts}
      renderItem={(itemData) => (
        <ProductItem onSelect={handleViewDetail} item={itemData.item}>
          <Button
            title="View details"
            color={primaryColor}
            onPress={handleViewDetail.bind(this, itemData.item.id)}
          />
          <Button
            title="Add to cart"
            color={primaryColor}
            onPress={handleAddCart.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverview;

const styles = StyleSheet.create({});
