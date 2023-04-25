import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";

const Login = ({ request, response, promptAsync }) => {
  return (
    <View style={tw.style("flex-1 justify-center items-center")}>
      <View style={tw.style("my-10")}>
        <Text style={tw.style("font-bold text-2xl my-3")}>Jukebox</Text>
        <Text>Recommend music the traditional way</Text>
      </View>

      <TouchableOpacity
        style={tw.style("flex-row items-center  p-3 rounded-lg bg-green-500")}
        onPress={() => promptAsync()}
      >
        <Entypo name="spotify" size={24} color="white" />
        <Text style={tw`pl-2 text-[16px] text-white`}> Login with spotify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
