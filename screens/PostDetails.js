import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { Switch } from "react-native-paper";
import Indicator from "../components/Indicator";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "../features/user/userSlice";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { ImageBackground } from "react-native";

const CLIENT_ID = "581adbc1e5dd46078cd5039b0cb9df98";
const CLIENT_SECRET = "1eaac4c3b2b54e99a85a1aed76e215bd";

const PostDetails = () => {
  const dispatch = useDispatch();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [query, setQuery] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState(null);
  const [currentTab, setCurrentTab] = useState("Top");
  const [itemsToDisplay, setItemsToDisplay] = useState(null);

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

  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    axios({ ...authParameters, url: "https://accounts.spotify.com/api/token" })
      .then((response) => {
        setAccessToken(response.data.access_token);
        dispatch(updateAccessToken);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    results && setItemsToDisplay(results[currentTab.toLowerCase()]);
  }, [results]);

  // Fetch results
  useEffect(() => {
    const controller = new AbortController();

    const search = async (searchQuery) => {
      var searchParameters = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      try {
        var seachResults = await axios.get(
          `https://api.spotify.com/v1/search?q=${searchQuery}&type=album,artist,track,playlist,track,show,episode,audiobook`,
          {
            ...searchParameters,
            signal: controller.signal,
          }
        );
        // ...searchParameters,
        const data = await seachResults.data;
        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    query.length > 2 && search(query);
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <View style={tw.style("flex-1 bg-white")}>
      <View style={tw.style("flex-row pl-4 pr-5 py-5 gap-4")}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="black"
          style={tw`my-auto mx-auto`}
        />
        {/* Search box */}
        <View
          style={tw.style(
            "flex-1 h-[50px] border-black border-solid border-[1px] rounded-[20px] px-3 justify-center"
          )}
        >
          <TextInput
            placeholder="Track, Album, Artist"
            onChangeText={(value) => setQuery(value)}
            value={query}
            style={tw.style("text-[16px]", {
              fontFamily: "Quicksand-Regular",
            })}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={tw.style("flex-row h-[50px] ")}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw.style("px-[10px] h-[140px]")}
        >
          {results && (
            <>
              <TouchableOpacity onPress={() => setCurrentTab("Top")}>
                <Text
                  style={tw.style(
                    `text-[12px] ${
                      currentTab === "Top" ? "bg-white" : "bg-[#F4F1F1]"
                    } px-3 py-2 rounded-[10px] ml-[10px] border-solid ${
                      currentTab === "Top" ? "border-black" : "border-[#F4F1F1]"
                    } border-[1px]`,
                    { fontFamily: "Quicksand-Regular" }
                  )}
                >
                  Top
                </Text>
              </TouchableOpacity>
              {Object.keys(results)
                .map((key) =>
                  [
                    key.split("")[0].toUpperCase() +
                      key.split("").slice(1).join(""),
                  ].join("")
                )
                .map((tab, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentTab(tab);
                      setItemsToDisplay(results[tab.toLowerCase()]);
                    }}
                  >
                    <Text
                      key={index}
                      style={tw.style(
                        `text-[12px] px-3 py-2 ${
                          currentTab === tab ? "bg-white" : "bg-[#F4F1F1]"
                        } rounded-[10px] ml-[10px] border-solid ${
                          currentTab === tab
                            ? "border-black"
                            : "border-[#F4F1F1]"
                        } border-[1px]`,
                        { fontFamily: "Quicksand-Regular" }
                      )}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
            </>
          )}
          <View style={tw.style("w-[30px] ")}></View>
        </ScrollView>
      </View>

      <ScrollView style={tw.style("flex-1 gap-2 p-3")}>
        {/* No search results */}
        {(itemsToDisplay?.items.length < 1 ||
          itemsToDisplay?.items[0] === null) && (
          <Text
            style={tw.style("mt-5 text-[14px] text-center", {
              fontFamily: "Quicksand-Regular",
            })}
          >
            There are no {currentTab.toLowerCase()} to see here,
          </Text>
        )}

        {/* Artists */}
        {results &&
          currentTab.toLowerCase() === "artists" &&
          itemsToDisplay.items.map((item, id) => {
            return (
              <View
                style={tw.style("flex-row gap-[10px] items-center mb-[20px]")}
              >
                <Image
                  key={id}
                  source={{
                    uri: item["images"][0]?.url,
                  }}
                  style={tw.style("w-[100px] h-[100px] bg-black rounded-full")}
                />
                <View>
                  <Text
                    style={tw.style("text-[14px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            );
          })}

        {/* Albums */}
        {results &&
          currentTab.toLowerCase() === "albums" &&
          itemsToDisplay.items.map((item, id) => {
            return (
              <View
                style={tw.style("flex-row gap-[10px] items-center mb-[20px]")}
              >
                <Image
                  key={id}
                  source={{
                    uri: item?.images[0]?.url,
                  }}
                  style={tw.style("w-[100px] h-[100px] bg-black")}
                />
                <View style={tw.style("justify-around gap-[10px]")}>
                  <Text
                    style={tw.style("text-[14px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={tw.style("text-[11px] text-gray-500", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.artists[0].name}
                  </Text>
                </View>
              </View>
            );
          })}

        {/* Tracks */}
        {results &&
          currentTab.toLowerCase() === "tracks" &&
          itemsToDisplay.items.map((item, id) => {
            return (
              <View
                style={tw.style("flex-row gap-[10px] items-center mb-[20px]")}
              >
                <Image
                  key={id}
                  source={{
                    uri: item["album"]?.images[0]?.url,
                  }}
                  style={tw.style(
                    "w-[100px] h-[100px] bg-black rounded-[10px]"
                  )}
                />
                <View style={tw.style("justify-around gap-[10px]")}>
                  <Text
                    style={tw.style("text-[14px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={tw.style("text-[11px] gray-text-500", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.artists[0].name}
                  </Text>
                </View>
              </View>
            );
          })}

        {/* Playlists */}
        {results &&
          currentTab.toLowerCase() === "playlists" &&
          itemsToDisplay.items.map((item, id) => {
            return (
              <View
                style={tw.style("flex-row gap-[10px] items-center mb-[20px]")}
              >
                <Image
                  key={id}
                  source={{
                    uri: item?.images[0]?.url,
                  }}
                  style={tw.style(
                    "w-[100px] h-[100px] bg-black rounded-[10px]"
                  )}
                />
                <View style={tw.style("justify-around  gap-[10px]")}>
                  <Text
                    style={tw.style("text-[14px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={tw.style("text-[11px] text-gray-500", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.owner.display_name}
                  </Text>
                </View>
              </View>
            );
          })}

        {/* Shows */}
        {results &&
          currentTab.toLowerCase() === "shows" &&
          itemsToDisplay.items[0] !== null &&
          itemsToDisplay.items.map((item, id) => {
            return (
              <View
                style={tw.style("flex-row gap-[10px] items-center mb-[20px]")}
              >
                <Image
                  key={id}
                  source={{
                    uri: item?.images[0]?.url,
                  }}
                  style={tw.style(
                    "w-[100px] h-[100px] bg-black rounded-[10px]"
                  )}
                />
                <View style={tw.style("justify-around")}>
                  <Text
                    style={tw.style("text-[14px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={tw.style("text-[11px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.owner.display_name}
                  </Text>
                </View>
              </View>
            );
          })}

        {/* Episodes */}
        {results &&
          currentTab.toLowerCase() === "episodes" &&
          itemsToDisplay.items.map((item, id) => {
            return (
              <View
                style={tw.style("flex-row gap-[10px] items-center mb-[20px]")}
              >
                <Image
                  key={id}
                  source={{
                    uri: item?.images[0]?.url,
                  }}
                  style={tw.style(
                    "w-[100px] h-[100px] bg-black rounded-[10px]"
                  )}
                />
                <View style={tw.style("justify-around")}>
                  <Text
                    style={tw.style("text-[14px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={tw.style("text-[11px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {/* {item.owner.display_name} */}
                  </Text>
                </View>
              </View>
            );
          })}

        {/* Audiobooks */}
        {results &&
          currentTab.toLowerCase() === "audiobooks" &&
          itemsToDisplay.items.map((item, id) => {
            return (
              <View
                style={tw.style("flex-row gap-[10px] items-center mb-[20px]")}
              >
                <Image
                  key={id}
                  source={{
                    uri: item?.images[0]?.url,
                  }}
                  style={tw.style(
                    "w-[100px] h-[100px] bg-black rounded-[10px]"
                  )}
                />
                <View style={tw.style("justify-around")}>
                  <Text
                    style={tw.style("text-[14px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={tw.style("text-[11px]", {
                      fontFamily: "Quicksand-Medium",
                    })}
                  >
                    {item.authors.reduce(
                      (prev, curr) => prev + curr?.name + ", ",
                      ""
                    )}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>

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
