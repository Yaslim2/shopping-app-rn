import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { primaryColor } from "../../../constants";
import { Product } from "../../../models/Product/index";
import { cartActions } from "../../../store/cartSlice/index";
import { RootState } from "../.../../../../store/index";
import { Ionicons } from "@expo/vector-icons";

// import { Container } from './styles';

type RootStackParamList = {
  ProductsOverview: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Orders: undefined;
};
const ProductDetail = (
  props: NativeStackScreenProps<RootStackParamList, "ProductDetail">
) => {
  const avaiableItems = useSelector(
    (state: RootState) => state.product.avaiableProducts
  );
  const { addToCart } = cartActions;
  const dispatch = useDispatch();
  const product = props.route.params.product;

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: product.title,
      headerRight: () => (
        <Ionicons
          name="ios-cart"
          size={24}
          color="#fff"
          onPress={() => props.navigation.navigate("Cart")}
        />
      ),
    });
  }, []);

  const handleAddToCart = (id: string) => {
    const selectedItem = avaiableItems.find((item) => item.id === id);
    dispatch(
      addToCart({
        id,
        price: selectedItem!.price,
        title: selectedItem!.title,
      })
    );
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={primaryColor}
          title="Add to cart"
          onPress={handleAddToCart.bind(this, product.id)}
        />
      </View>
      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});

export default ProductDetail;
