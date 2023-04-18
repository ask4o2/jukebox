import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, View } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import tw from "twrnc";

const Feed = () => {
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
