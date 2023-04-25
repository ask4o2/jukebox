import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";

const TrackCard = ({ item }) => {
  const value = item.tracks.map((track) => (
    <View key={track.id} style={tw.style("flex-row items-center ")}>
      <View style={tw.style("h-18 w-18 bg-gray-200 ")}>
        <Image
          source={{ uri: track.image?.url }}
          style={tw.style("h-18 w-18")}
        />
      </View>

      <View style={tw.style("ml-4 flex-1")}>
        <Text style={tw.style("text-[14px] font-bold")}>{track.name} </Text>
        <Text style={tw.style("text-xs")}>
          {track.artists[0]?.name}{" "}
          {track.artists[1]?.name && "ft " + track.artists[1].name}
        </Text>
      </View>
    </View>
  ));

  return value;
};

export default TrackCard;
