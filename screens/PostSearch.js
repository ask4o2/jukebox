import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { accessToken, searchApi } from "../utils/spotifyApi";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const PostSearch = () => {
  const { user } = useAuth();
  // console.log(user);
  const [input, setInput] = useState(null);

  const navigation = useNavigation();

  const types = ["album,artist, track, playlist"];

  // implement debouncing for search while typing
  const searchApi = (query, type) => {
    const encodedQuery = encodeURIComponent(query);

    const searchQuery = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track,artist,playlist,album&limit=10`;

    fetch(searchQuery, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInput("  ");
        navigation.navigate("post", { data: data });
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw.style("flex-row px-3 items-center")}>
        <AntDesign name="arrowleft" size={20} color="black" />
        <TextInput
          onChangeText={(text) => setInput(text)}
          value={input}
          placeholder="Track, Album, Artist"
          style={tw.style(" p-2 bg-gray-200 rounded-xl flex-1 ml-3")}
        />
        <TouchableOpacity
          onPress={() => searchApi(input, types)}
          style={tw`text-black mx-2 p-2 rounded bg-blue-200 border`}
        >
          <Text>search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostSearch;
