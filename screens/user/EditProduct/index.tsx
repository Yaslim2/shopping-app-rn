import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import { Product } from "../../../models/Product";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { sendData } from "../../../store/productSlice";
import { asyncUpdate } from "../../../store/productSlice";

type RootStackParamList = {
  UserProducts: undefined;
  EditProducts?: { product?: Product };
};
// import { Container } from './styles';

const EditProduct = (
  props: NativeStackScreenProps<RootStackParamList, "EditProducts">
) => {
  const initialTitle = props.route.params?.product?.title;
  const initialImage = props.route.params?.product?.imageUrl;
  const initialPrice = props.route.params?.product?.price.toString();
  const initialDescription = props.route.params?.product?.description;

  const [title, setTitle] = useState<string>(initialTitle || "");

  const [image, setImage] = useState<string>(initialImage || "");

  const [price, setPrice] = useState<string>(initialPrice || "");

  const [description, setDescription] = useState<string>(
    initialDescription || ""
  );

  const dispatch = useDispatch();

  const handleSave = useCallback(async () => {
    if (props.route.params) {
      dispatch(
        asyncUpdate({
          description,
          title,
          imageUrl: image,
          id: props.route.params.product!.id,
        })
      );
    } else {
      dispatch(
        sendData({
          ownerId: "u1",
          description,
          title,
          imageUrl: image,
          price: Number(price),
        })
      );
    }
    props.navigation.goBack();
  }, [description, title, image, price]);

  const { navigation, route } = props;

  useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params?.product?.title
        ? "Edit product"
        : "New product",
      headerRight: () => {
        return (
          <Ionicons
            name="md-checkmark"
            color="#fff"
            size={23}
            onPress={handleSave}
          />
        );
      },
    });
  }, [handleSave, navigation, route]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
              autoCapitalize="sentences"
              autoCorrect
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={image}
              onChangeText={(text) => setImage(text)}
            />
          </View>
          {!props.route.params && (
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={(text) => setPrice(text)}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    elevation: 4,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontFamily: "open-sans",
  },
});

export default EditProduct;
