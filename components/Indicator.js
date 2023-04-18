import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const Indicator = ({ bgTrue }) => (
  <View
    style={tw.style(
      "w-15 h-2 rounded-full bg-gray-200",
      bgTrue && "bg-gray-400"
    )}
  />
);

export default Indicator;
