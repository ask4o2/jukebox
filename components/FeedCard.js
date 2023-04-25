import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";

const FeedCard = ({ playSound, pauseSound, feed }) => (
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
        uri: "https://media.premiumtimesng.com/wp-content/files/2023/03/Davido-Timeless-album-cover.jpg",
      }}
    />
    {/* </View> */}

    {/* play sound */}
    <TouchableOpacity onPress={playSound}>
      <Text style={tw`p-3 text-center mt-2 border w-30 rounded-full`}>
        Play sound
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={pauseSound}>
      <Text style={tw`p-3 text-center mt-2 border w-30 rounded-full`}>
        Pause sound
      </Text>
    </TouchableOpacity>
  </View>
);

export default FeedCard;
