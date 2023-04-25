import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "twrnc";
import Feed from "./screens/Feed";
import { NavigationContainer } from "@react-navigation/native";
import TabStack from "./stack/TabStack";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest, ResponseType } from "expo-auth-session";
import { Button } from "react-native";
import Constants from "expo-constants";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthProvider from "./hooks/useAuth";
import useAuth from "./hooks/useAuth";

// WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const spotifyOptions = {
  responseType: ResponseType.Token,
  clientId: "74537f4101bc425db9b424fd8324cab3",
  clientSecret: "0801707479e74d24952efd8438d1dba9",
  scopes: ["user-read-email", "playlist-modify-public"],
  usePKCE: false,
  redirectUri: "exp://192.168.43.150:19000",
};

export default function Start() {
  const { user, setUser } = useAuth();

  const [request, response, promptAsync] = useAuthRequest(
    spotifyOptions,
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setUser(access_token);

      const saveToStorage = async () =>
        AsyncStorage.setItem("@accessToken", access_token);

      saveToStorage();
    }
  }, [response, AsyncStorage]);

  return (
    <View style={tw.style(`flex-1`)}>
      {user ? (
        <NavigationContainer>
          <TabStack />
        </NavigationContainer>
      ) : (
        <Login
          request={request}
          response={response}
          promptAsync={promptAsync}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}
