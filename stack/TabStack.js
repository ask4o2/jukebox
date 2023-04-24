import { View, Text } from "react-native";
import tw from "twrnc";
import React from "react";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Post from "../screens/Post";
import Rooms from "../screens/Rooms";
import PostDetails from "../screens/PostDetails";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

const TabStack = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const signOut = () => {
    auth.signOut().catch((error) => {
      console.log(error);
    });
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (!user) {
  //       dispatch(logoutUser());
  //     }

  //     return unsubscribe;
  //   });
  // }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => (
          <View style={tw.style(" p-2 bg-gray-200 rounded-full ")}>
            <TouchableOpacity onPress={signOut}>
              <AntDesign name="picture" size={18} color="black" />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: () => (
          <Text
            style={tw.style(`text-center text-[16px]`, {
              fontFamily: "Quicksand-Regular",
            })}
          >
            Jukebox
          </Text>
        ),
        headerRight: () => <Feather name="bell" size={18} color="black" />,
        headerStyle: { backgroundColor: "#FFF3E0" },
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 15,
        },
        tabBarStyle: {
          backgroundColor: "#FFDCA2",
          height: 50,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={tw.style(
                `flex-row gap-[5px] items-center ${
                  focused ? "bg-white" : "bg-transparent"
                } py-[5px] px-[15px] rounded-full`
              )}
            >
              <MaterialCommunityIcons
                name="home-outline"
                size={24}
                color="black"
              />
              {focused && (
                <Text
                  style={tw.style("text-[11px]", {
                    fontFamily: "Quicksand-Medium",
                  })}
                >
                  Home
                </Text>
              )}
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Feed"
        component={Feed}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={tw.style(
                `flex-row gap-[5px] items-center ${
                  focused ? "bg-white" : "bg-transparent"
                } py-[5px] px-[15px] rounded-full`
              )}
            >
              <AntDesign name="pluscircleo" size={20} color="black" />
              {focused && (
                <Text
                  style={tw.style("text-[11px]", {
                    fontFamily: "Quicksand-Medium",
                  })}
                >
                  Create
                </Text>
              )}
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Post"
        component={PostDetails}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={tw.style(
                `flex-row gap-[5px] items-center ${
                  focused ? "bg-white" : "bg-transparent"
                } py-[5px] px-[15px] rounded-full`
              )}
            >
              <MaterialCommunityIcons name="music" size={24} color="black" />
              {focused && (
                <Text
                  style={tw.style("text-[11px]", {
                    fontFamily: "Quicksand-Medium",
                  })}
                >
                  Rooms
                </Text>
              )}
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
