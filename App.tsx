import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import ProductsNavigator from "./navigation";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import store from "./store";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.log("Error on loading the fonts")}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ProductsNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
