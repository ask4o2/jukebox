import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "twrnc";
import Feed from "./screens/Feed";
import { NavigationContainer } from "@react-navigation/native";
import TabStack from "./stack/TabStack";

export default function App() {
  return (
    <View style={tw.style(`flex-1`)}>
      <NavigationContainer>
        <TabStack />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
