import { View, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";

const Post = () => {
  const SearchTag = ({ text }) => (
    <View style={tw.style("p-2 rounded-lg px-3 bg-gray-200 m-2")}>
      <Text style={tw.style("text-xs")}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw.style("flex-row px-3 items-center")}>
        <AntDesign name="arrowleft" size={20} color="black" />
        <TextInput
          placeholder="Track, Album, Artist"
          style={tw.style(" p-2 bg-gray-200 rounded-xl flex-1 ml-3")}
        />
      </View>

      <View style={tw.style("flex-row p-3")}>
        <SearchTag text="Tracks" />
        <SearchTag text="Albums" />
        <SearchTag text="Artists" />
        <SearchTag text="Playlists" />
      </View>

      <View style={tw.style("px-4 gap-4")}>
        <View style={tw.style("flex-row items-center")}>
          <View style={tw.style("h-18 w-18 bg-gray-200 ")}>
            <AntDesign
              name="picture"
              size={28}
              color="black"
              style={tw`my-auto mx-auto`}
            />
          </View>

          <View style={tw.style("ml-4")}>
            <Text style={tw.style("text-base")}>Unavailable </Text>
            <Text>Davido</Text>
          </View>
        </View>

        {/* divider */}
        <View style={tw.style("flex-row items-center")}>
          <View style={tw.style("h-18 w-18 bg-gray-200 rounded-full ")}>
            <AntDesign
              name="picture"
              size={28}
              color="black"
              style={tw`my-auto mx-auto`}
            />
          </View>

          <View style={tw.style("ml-4")}>
            <Text style={tw.style("text-base")}>Emmanuel otuonye </Text>
          </View>
        </View>

        {/* divider */}
        <View style={tw.style("flex-row items-center")}>
          <View style={tw.style("h-18 w-18 bg-gray-200 ")}>
            <AntDesign
              name="picture"
              size={28}
              color="black"
              style={tw`my-auto mx-auto`}
            />
          </View>

          <View style={tw.style("ml-4")}>
            <Text style={tw.style("text-base")}> Timeless Sounds </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Post;
