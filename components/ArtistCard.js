import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";

const ArtistCard = ({ item }) => {
  const value = item.artists.map((artist) => (
    <View key={artist.id} style={tw.style("flex-row items-center")}>
      <View style={tw.style("h-18 w-18 bg-gray-200 rounded-full ")}>
        <Image
          source={{ uri: artist.image?.url }}
          style={tw.style("h-18 w-18 rounded-full")}
        />
      </View>

      <View style={tw.style("ml-4")}>
        <Text style={tw.style("text-sm")}>{artist.name}</Text>
      </View>
    </View>
  ));

  return value;
};

export default ArtistCard;
