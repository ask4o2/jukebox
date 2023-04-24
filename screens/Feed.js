import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import {
  AntDesign,
  Feather,
  Octicons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const FeedCard = () => {
    const rotate = useSharedValue(0);
    const frontCardAnimatedStyles = useAnimatedStyle(() => {
      const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
      return {
        transform: [
          {
            rotateY: withTiming(`${rotateValue}deg`, { duration: 500 }),
          },
        ],
        backfaceVisibility: "hidden",
      };
    });
    const backCardAnimatedStyles = useAnimatedStyle(() => {
      const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
      return {
        transform: [
          {
            rotateY: withTiming(`${rotateValue}deg`, { duration: 500 }),
          },
        ],
        backfaceVisibility: "hidden",
        position: "absolute",
        width: "100%",
      };
    });
    return (
      <View
        style={tw.style("mt-6 mx-5 overflow-visible relative", {
          elevation: 15,
        })}
      >
        {/* Front Side */}

        <Animated.View
          style={tw.style("my-2 absolute", frontCardAnimatedStyles)}
        >
          <Pressable
            onPress={() => {
              rotate.value = rotate.value ? 0 : 1;
            }}
          >
            <View
              style={tw.style(
                "flex-row p-3 bg-white overflow-visible rounded-t-[20px] items-center",
                {
                  elevation: 15,
                }
              )}
            >
              {/* <Feather name="music" size={18} color="gray" /> */}
              <View style={tw.style("pl-[14px] h-[40px] justify-center")}>
                <Text
                  style={tw.style("leading-[20px] text-[14px]", {
                    fontFamily: "Quicksand-Medium",
                  })}
                >
                  Unavailable
                </Text>
                <Text
                  style={tw.style("leading-[16px] text-[11px]", {
                    fontFamily: "Quicksand-Medium",
                  })}
                >
                  Davido, Timeless
                </Text>
              </View>
            </View>

            <View>
              <Image
                style={tw.style(
                  "w-full h-[320px] rounded-b-[20px] bg-slate-400"
                )}
                source={{
                  uri: "https://media.premiumtimesng.com/wp-content/files/2023/03/Davido-Timeless-album-cover.jpg",
                }}
              />
              <TouchableOpacity
                style={tw.style(
                  "flex-row gap-2 bg-[#FFF1D9] py-[9px] pl-[15px] pr-[11px] absolute bottom-[17px] right-[14px] rounded-[12px]"
                )}
              >
                <Text style={tw.style("", { fontFamily: "Quicksand-Medium" })}>
                  Listen on
                </Text>
                <Entypo name="spotify" size={24} color="#233043" />
              </TouchableOpacity>
            </View>
          </Pressable>
        </Animated.View>
        {/* Back Side */}
        <Animated.View style={tw.style("my-2", backCardAnimatedStyles)}>
          <Pressable
            // style={tw.style("")}
            onPress={() => {
              rotate.value = rotate.value ? 0 : 1;
            }}
          >
            <View>
              <View
                style={tw.style(
                  "flex-row items-center pl-[17px] pr-[20px] pt-[5px] bg-white rounded-t-xl items-center h-[64px]"
                )}
              >
                {/* <Feather name="music" size={18} color="gray" /> */}
                <Image
                  source={{
                    uri: "https://media.premiumtimesng.com/wp-content/files/2023/03/Davido-Timeless-album-cover.jpg",
                  }}
                  style={tw.style("w-[37px] h-[37px] rounded-full")}
                />
                <View style={tw.style("flex-1 pl-4")}>
                  <View style={tw.style("flex-1 justify-center")}>
                    <Text>
                      <Text
                        style={tw.style("text-[12px]", {
                          fontFamily: "Quicksand-Regular",
                        })}
                      >
                        posted by{" "}
                      </Text>
                      <Text
                        style={tw.style("text-[14px]", {
                          fontFamily: "Quicksand-Medium",
                        })}
                      >
                        Jesjags01
                      </Text>
                    </Text>
                    <Text
                      style={tw.style("text-[12px]", {
                        fontFamily: "Quicksand-Regular",
                      })}
                    >
                      30 min ago
                    </Text>
                  </View>
                </View>
                <Octicons
                  name="kebab-horizontal"
                  style={tw.style({
                    transform: [{ rotateZ: "90deg" }],
                  })}
                  size={24}
                  color="#787676"
                />
              </View>

              <View
                style={tw.style(
                  "h-[320px] px-[17px] pt-4 bg-white rounded-b-[20px]"
                )}
              >
                <View style={tw.style("h-[40px] justify-center")}>
                  <Text
                    style={tw.style("leading-[20px] text-[14px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    Unavailable
                  </Text>
                  <Text
                    style={tw.style("leading-[16px] text-[11px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    Davido, Timeless
                  </Text>
                </View>
                <Text
                  style={tw.style(
                    "py-5 text-black leading-[16px] text-[12px]",
                    {
                      fontFamily: "Quicksand-Regular",
                    }
                  )}
                >
                  This song has been on repeat for days! The lyrics resonate
                  with me so deeply, it's like the artist wrote them just for
                  me. The melody is addictive, and I find myself singing it all
                  day long. I can't remember the last time I connected with a
                  track on such a personal level. It's amazing how music can
                  speak to our souls in ways that nothing else can.
                </Text>
              </View>
            </View>
            <View
              style={tw.style(
                "flex-row justify-between absolute bottom-0 py-5 bg-[#BEE6FF] rounded-b-[20px]"
              )}
            >
              <TouchableOpacity
                style={tw.style(
                  "text-[14px] flex-0.5 flex-row justify-center align-center gap-3",
                  {
                    fontFamily: "Quicksand-Medium",
                  }
                )}
              >
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={24}
                  color="black"
                />
                <Text
                  style={tw.style("text-[14px]", {
                    fontFamily: "Quicksand-Medium",
                  })}
                >
                  Like
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw.style(
                  "flex-0.5 flex-row justify-center align-center gap-3"
                )}
              >
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={24}
                  color="black"
                />
                <Text
                  style={tw.style("text-[14px]", {
                    fontFamily: "Quicksand-Medium",
                  })}
                >
                  Comment
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={tw`bg-[#FFF3E0]`}>
      <ScrollView style={tw.style("pt-2")} showsVerticalScrollIndicator={false}>
        {/* <Text style={tw.style("mt-6 pb-2")}>Feed</Text> */}

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
