import { View, Text } from "react-native";
import tw from "twrnc";
import React from "react";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Post from "../screens/Post";
import Rooms from "../screens/Rooms";
import PostDetails from "../screens/PostDetails";

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={tw.style(" p-2 bg-gray-200 rounded-full ")}>
            <AntDesign name="picture" size={18} color="black" />
          </View>
        ),
        headerTitle: () => <Text style={tw`text-center`}>Jukebox</Text>,
        headerRight: () => <Feather name="bell" size={18} color="black" />,
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 15,
        },
        tabBarStyle: {
          backgroundColor: "lightgray",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={tw.style("bg-gray-200 p-3 rounded-full")}>
              <AntDesign name="home" size={16} color="black" />
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Feed"
        component={Feed}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={tw.style("bg-gray-200 p-3 rounded-full")}>
              <AntDesign name="plus" size={16} color="black" />
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Post"
        component={PostDetails}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={tw.style("bg-gray-200 p-3 rounded-full")}>
              <MaterialCommunityIcons
                name="music-rest-sixteenth"
                size={16}
                color="black"
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Rooms"
        component={Rooms}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
