import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Post = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Text style={tw.style("my-auto text-center")}>Post screen</Text>
    </SafeAreaView>
  );
};

export default Post;
