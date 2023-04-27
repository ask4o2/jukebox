import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import tw from "twrnc";
import { Audio } from "expo-av";
import useAuth from "../hooks/useAuth";
import FeedCard from "../components/FeedCard";

const Feed = ({}) => {
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

  const playSound = async (uri) => {
    if (soundObject === null) {
      soundObject = new Audio.Sound();
      console.log("play pressed...");

      soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

      try {
        await soundObject.loadAsync({
          uri: uri,
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

  return (
    <View style={tw`px-5`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={tw.style("mt-6 pb-2")}>Feed</Text>

        {/* Feed card */}
        <FeedCard
          feed={{
            artists: "Musa Keys ft Loui ",
            image:
              "https://i.scdn.co/image/ab67616d0000b273b68ffd51698d87a617e1a0c0",
            name: "Selema (Po Po)",
            preview_url:
              "https://p.scdn.co/mp3-preview/06082a22a29c11ecf1157d6efc6645bbc5aa825b?cid=74537f4101bc425db9b424fd8324cab3",
            url: "https://open.spotify.com/track/1bnWGzdaZw0FPZddeGk9yv",
          }}
          playSound={playSound}
          pauseSound={pauseSound}
        />

        {/* Feed card */}
        <FeedCard
          feed={{
            artists: " Davido ft Musa Keys  ",
            image:
              "https://i.scdn.co/image/ab67616d0000b273adfc1ac5836f96adac580271",
            name: "UNAVAILABLE (feat. Musa Keys)",
            preview_url:
              "https://p.scdn.co/mp3-preview/f4b21794b26cd51251d3f537eeb0c3d8b6d8a811?cid=74537f4101bc425db9b424fd8324cab3",
            url: "https://open.spotify.com/track/1bnWGzdaZw0FPZddeGk9yv",
          }}
          playSound={playSound}
          pauseSound={pauseSound}
        />

        {/* Feed card */}
        <FeedCard
          feed={{
            artists: "Musa Keys ft Loui ",
            image:
              "https://i.scdn.co/image/ab67616d0000b273b68ffd51698d87a617e1a0c0",
            name: "Selema (Po Po)",
            preview_url:
              "https://p.scdn.co/mp3-preview/06082a22a29c11ecf1157d6efc6645bbc5aa825b?cid=74537f4101bc425db9b424fd8324cab3",
            url: "https://open.spotify.com/track/1bnWGzdaZw0FPZddeGk9yv",
          }}
          playSound={playSound}
          pauseSound={pauseSound}
        />

        {/* Feed card */}
        <FeedCard
          feed={{
            artists: "Musa Keys ft Loui ",
            image:
              "https://i.scdn.co/image/ab67616d0000b273b68ffd51698d87a617e1a0c0",
            name: "Selema (Po Po)",
            preview_url:
              "https://p.scdn.co/mp3-preview/06082a22a29c11ecf1157d6efc6645bbc5aa825b?cid=74537f4101bc425db9b424fd8324cab3",
            url: "https://open.spotify.com/track/1bnWGzdaZw0FPZddeGk9yv",
          }}
          playSound={playSound}
          pauseSound={pauseSound}
        />
      </ScrollView>
    </View>
  );
};

export default Feed;
