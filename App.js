import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "twrnc";
import Feed from "./screens/Feed";
import { NavigationContainer } from "@react-navigation/native";
import TabStack from "./stack/TabStack";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button } from "react-native";
import Constants from "expo-constants";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./hooks/useAuth";
import Start from "./Start";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <AuthProvider>
      <Start />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
