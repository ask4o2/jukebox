import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import Feed from "./screens/Feed";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import TabStack from "./stack/TabStack";
import LoginStack from "./stack/LoginStack";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { auth } from "./firebase";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Quicksand-Regular": require("./assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand/Quicksand-Medium.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand/Quicksand-Bold.ttf"),
  });

  useLayoutEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      } else {
        return null;
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  return (
    fontsLoaded && (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  );
}
const Container = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  console.log(isLoggedIn);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <View style={tw.style(`flex-1`)}>
      <NavigationContainer>
        {/* {auth.currentUser ? <TabStack /> : <LoginStack />} */}
        {isLoggedIn ? <TabStack /> : <LoginStack />}
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
};
