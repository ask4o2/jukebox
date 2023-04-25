import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";

const TrackCard = ({ item, handlePostSelect }) => {
  const value = item.tracks.map((track) => (
    <TouchableOpacity
      onPress={() =>
        handlePostSelect({
          name: track.name,
          artists: `${track.artists[0].name} ft ${
            track.artists.length > 1 && track.artists[1].name
          } `,
          image: track.image?.url,
          preview_url: track.preview_url,
          url: track.url,
        })
      }
      key={track.id}
    >
      <View style={tw.style("flex-row items-center ")}>
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
    </TouchableOpacity>
  ));

  return value;
};

export default TrackCard;
