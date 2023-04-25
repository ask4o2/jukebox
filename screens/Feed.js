import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import tw from "twrnc";
import { Audio } from "expo-av";
import useAuth from "../hooks/useAuth";

const Feed = () => {
  let soundObject = null;

  // get playback status
  const _onPlaybackStatusUpdate = (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        soundObject.unloadAsync();
        soundObject = null;
      }
      if (playbackStatus.didJustFinish) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        // soundObject.unloadAsync();
        soundObject = null;
      }
    }
  };

  const playSound = async () => {
    if (soundObject === null) {
      soundObject = new Audio.Sound();
      console.log("play pressed...");

      soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

      try {
        await soundObject.loadAsync({
          uri: "https://p.scdn.co/mp3-preview/f4b21794b26cd51251d3f537eeb0c3d8b6d8a811?cid=74537f4101bc425db9b424fd8324cab3",
        });

        soundObject.playAsync();
        console.log("song playing..");
      } catch (err) {
        console.log(err);
      }
    } else {
      soundObject.playAsync();
    }
  };

  const pauseSound = () => {
    soundObject.pauseAsync();
    console.log("song paused..");
  };

  const FeedCard = () => (
    <View style={tw.style("my-2")}>
      <View
        style={tw.style("flex-row p-3 bg-gray-200 rounded-t-xl items-center")}
      >
        <Feather name="music" size={18} color="gray" />
        <View style={tw.style("flex-1 pl-4")}>
          <Text>Unavailable</Text>
          <Text>Davido, Timeless</Text>
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

  return (
    <View style={tw`px-5`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={tw.style("mt-6 pb-2")}>Feed</Text>

        {/* Feed card */}
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </ScrollView>
    </View>
  );
};

export default Feed;
