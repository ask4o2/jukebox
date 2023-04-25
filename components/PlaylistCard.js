import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";

const PlaylistCard = ({ item }) => {
  const value = item.playlists.map((pl) => (
    <View key={pl.id} style={tw.style("flex-row items-center")}>
      <View style={tw.style("h-18 w-18 bg-gray-200 rounded-lg ")}>
        <Image
          source={{ uri: pl.image?.url }}
          style={tw.style("h-18 w-18 rounded-lg")}
        />
      </View>

      <View style={tw.style("ml-4 flex-1")}>
        <Text style={tw.style("text-sm font-bold")}>{pl.name} </Text>
        <Text style={tw`text-[12px]`}>{pl.description}</Text>
      </View>
    </View>
  ));

  return value;
};

export default PlaylistCard;
