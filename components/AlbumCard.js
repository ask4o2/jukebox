import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const AlbumCard = ({ item }) => {
  const value = item.albums.map((i) => (
    <View
      key={i.id}
      style={tw.style("flex-row items-center shadow-sm rounded")}
    >
      <View style={tw.style("h-18 w-18 bg-gray-200 ")}>
        <Image source={{ uri: i.image.url }} style={tw`h-18 w-18 rounded`} />
      </View>

      <View style={tw.style("ml-4 flex-1")}>
        <Text style={tw.style("font-bold ")}> {i.name}</Text>
        <Text style={tw.style("text-xs")}> Tracks: {i.total_tracks}</Text>
      </View>
    </View>
  ));

  return value;
};

export default AlbumCard;
