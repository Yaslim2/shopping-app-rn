import React from "react";
import { Button, FlatList, Alert } from "react-native";
import ProductItem from "../../../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { primaryColor } from "../../../constants";
import { productActions } from "../../../store/productSlice";
import { cartActions, CartItem } from "../../../store/cartSlice";
import { Product } from "../../../models/Product/index";

// import { Container } from './styles';

type RootStackParamList = {
  UserProducts: undefined;
  EditProducts: { product: Product };
};

const UserProducts = (
  props: NativeStackScreenProps<RootStackParamList, "UserProducts">
) => {
  const { deleteProduct } = productActions;
  const { removeProduct } = cartActions;
  const dispatch = useDispatch();
  const userProducts = useSelector((state: RootState) => {
    const productsArray = [...state.product.userProducts];
    return productsArray.sort((a: Product, b: Product) =>
      a.id > b.id ? 1 : -1
    );
  });

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
          dispatch(deleteProduct({ id }));
        },
      },
    ]);
  };

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
