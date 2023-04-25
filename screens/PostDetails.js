import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { Switch } from "react-native-paper";
import Indicator from "../components/Indicator";
import { Image } from "react-native";

const PostDetails = ({ navigation, route }) => {
  const { post } = route.params;
  // console.log(post);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [postText, setPostText] = useState("");

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const CircleIcon = ({ iconName }) => (
    <View
      style={tw.style(
        "h-10 w-10 items-center justify-center rounded-full bg-gray-200"
      )}
    >
      {iconName && <AntDesign name="plus" size={18} color="black" />}
    </View>
  );

  return (
    <View style={tw.style("flex-1 bg-white")}>
      <View style={tw.style("flex-row p-3")}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text style={tw.style("flex-1 text-center")}>Add more details</Text>
      </View>

      <View style={tw.style("flex-row p-3 bg-gray-300 items-center")}>
        <View style={tw.style("h-18 w-18 bg-gray-200 ")}>
          <Image source={{ uri: post.image }} style={tw.style("h-18 w-18")} />
        </View>
        <View style={tw.style("ml-4")}>
          <Text style={tw.style("text-sm font-bold")}>{post.name} </Text>
          <Text style={tw`text-gray-600`}>{post.artists}</Text>
        </View>
      </View>

      <View style={tw.style("px-4 mt-6")}>
        <Text style={tw.style("text-[15px] pb-2")}>
          Do you want to share your thoughts on this song?
        </Text>

        <TextInput
          value={postText}
          onChangeText={(text) => setPostText(text)}
          placeholder="Start typing here..."
          textAlignVertical="top"
          numberOfLines={4}
          style={tw.style("rounded-xl bg-gray-200 p-2")}
        />

        {/* emoji select */}
        <View style={tw.style("mt-6")}>
          <Text style={tw.style("py-3")}>Select emotions</Text>
          <View style={tw.style("flex-row justify-between")}>
            <CircleIcon />
            <CircleIcon />
            <CircleIcon />
            <CircleIcon />
            <CircleIcon />
            <CircleIcon iconName />
          </View>
        </View>

        <View>
          <View style={tw.style("flex-row items-center justify-between")}>
            <Text>Show number of likes </Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>

          <View style={tw.style("flex-row items-center justify-between ")}>
            <Text>Show number of likes </Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
        </View>
      </View>

      {/* page indicators */}
      <View
        style={tw.style("flex-row mt-auto mx-auto w-3/5 py-4 justify-between ")}
      >
        <Indicator bgTrue />
        <Indicator bgTrue />
        <Indicator />
      </View>
    </View>
  );
};

export default PostDetails;
