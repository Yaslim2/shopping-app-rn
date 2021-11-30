import React, { useEffect } from "react";
import { StyleSheet, FlatList, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { cartActions } from "../../../store/cartSlice";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  ProductsOverview: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
};

import ProductItem from "../../../components/ProductItem";
import { Product } from "../../../models/Product";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { primaryColor } from "../../../constants";

const ProductsOverview = (
  props: NativeStackScreenProps<RootStackParamList, "ProductsOverview">
) => {
  const { addToCart } = cartActions;
  const dispatch = useDispatch();

  const avaiableProducts = useSelector((state: RootState) => {
    const productsArray = [...state.product.avaiableProducts];
    return productsArray.sort((a: Product, b: Product) =>
      a.id > b.id ? 1 : -1
    );
  });

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

  return (
    <FlatList
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
