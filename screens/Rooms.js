import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Rooms = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Text style={tw.style("my-auto text-center")}>Let's build Rooms</Text>
    </SafeAreaView>
  );
};

export default Rooms;
