import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostSearch from "../screens/PostSearch";
import PostDetails from "../screens/PostDetails";
import Post from "../screens/Post";

const Stack = createStackNavigator();

const PostStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      //   initialRouteName="postSearch"
    >
      <Stack.Screen name="postSearch" component={PostSearch} />
      <Stack.Screen name="postDetails" component={PostDetails} />
      <Stack.Screen name="post" component={Post} />
    </Stack.Navigator>
  );
};

export default PostStack;
