import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";

const FeedCard = ({ playSound, pauseSound, feed }) => {
  let { preview_url, image, name, url } = feed;

  console.log(preview_url);

  return (
    <View style={tw.style("my-2")}>
      <View
        style={tw.style("flex-row p-3 bg-gray-200 rounded-t-xl items-center")}
      >
        <Feather name="music" size={18} color="gray" />
        <View style={tw.style("flex-1 pl-4")}>
          <Text>{feed.name}</Text>
          <Text>{feed.artists}</Text>
        </View>
      </View>

      {/* <View> */}
      <Image
        style={tw.style("w-full h-[300px] rounded-b-xl")}
        source={{
          uri: image,
        }}
      />
      {/* </View> */}

      {/* play sound */}
      <TouchableOpacity onPress={() => playSound(preview_url)}>
        <Text style={tw`p-3 text-center mt-2 border w-30 rounded-full`}>
          Play sound
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pauseSound()}>
        <Text style={tw`p-3 text-center mt-2 border w-30 rounded-full`}>
          Pause sound
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedCard;
