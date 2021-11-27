import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
} from "react-native";
import { primaryColor } from "../../constants";
import { Product } from "../../models/Product";

const ProductItem: React.FC<{
  item: Product;
  onAddCart: (id: string) => void;
  onViewDetail: (id: string) => void;
}> = (props) => {
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableNativeFeedback
          onPress={props.onViewDetail.bind(this, props.item.id)}
          useForeground
        >
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: props.item.imageUrl }}
              />
            </View>

            <View style={styles.details}>
              <Text style={styles.title}>{props.item.title}</Text>
              <Text style={styles.price}>R$ {props.item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.actions}>
              <Button
                color={primaryColor}
                title="View details"
                onPress={props.onViewDetail.bind(this, props.item.id)}
              />
              <Button
                color={primaryColor}
                title="Add to cart"
                onPress={props.onAddCart.bind(this, props.item.id)}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "#000",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  touchable: {
    overflow: "hidden",
  },
  details: {
    alignItems: "center",
    height: "20%",
    paddingVertical: 10,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 17,
  },
});

export default ProductItem;
