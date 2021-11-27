import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { cartActions } from "../../../store/cartSlice";

type RootStackParamList = {
  ProductsOverview: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Orders: undefined;
};
import ProductItem from "../../../components/ProductItem";
import { Product } from "../../../models/Product";

const ProductsOverview = (
  props: NativeStackScreenProps<RootStackParamList, "ProductsOverview">
) => {
  const { addToCart } = cartActions;
  const dispatch = useDispatch();

  const avaiableProducts = useSelector(
    (state: RootState) => state.product.avaiableProducts
  );

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
        <ProductItem
          onViewDetail={handleViewDetail}
          onAddCart={handleAddCart}
          item={itemData.item}
        />
      )}
    />
  );
};

export default ProductsOverview;

const styles = StyleSheet.create({});
