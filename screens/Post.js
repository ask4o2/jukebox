import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import TrackCard from "../components/TrackCard";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import PlaylistCard from "../components/PlaylistCard";

const Post = ({ navigation, route }) => {
  const { data } = route.params;

  // convert data object to array
  const parsedData = Object.values(data);

  const newData = parsedData.map((item, index) => {
    switch (index) {
      case 0:
        return {
          albums: item.items?.map((i) => ({
            id: i.id,
            href: i.href,
            name: i.name,
            total_tracks: i.total_tracks,
            image: i.images?.[0],
            url: i.external_urls?.spotify,
          })),
        };
        break;
      case 1:
        return {
          artists: item.items?.map((i) => {
            const { href, id, images, name, uri } = i;
            return { href, id, image: images[0], name, uri };
          }),
        };
        break;
      case 2:
        return {
          tracks: item.items?.map((i) => {
            const {
              name,
              artists,
              external_urls,
              album: { images },
              id,
              preview_url,
            } = i;

            return {
              id,
              name,
              preview_url,
              artists,
              url: external_urls?.spotify,
              image: images?.[0],
            };
          }),
        };
        break;
      case 3:
        return {
          playlists: item.items?.map((i) => {
            const { description, external_urls, id, images, name } = i;

            return {
              description,
              url: external_urls?.spotify,
              id,
              image: images?.[0],
              name,
            };
          }),
        };
        break;
      default:
        return item;
    }
  });

  const filterPostData = (option) => {
    switch (option) {
      case "tracks":
        setCurrentData(newData.filter((item) => item.tracks));
        setOption("tracks");
        break;
      case "albums":
        let current = newData.filter((item) => item.albums);
        setCurrentData(current);
        setOption("albums");
        break;
      case "artists":
        setCurrentData(newData.filter((item) => item.artists));
        setOption("artists");
        break;
      case "playlists":
        setCurrentData(newData.filter((item) => item.playlists));
        setOption("playlists");
        break;
      default:
        setCurrentData(newData);
    }
  };

  const [option, setOption] = useState("tracks");
  const [currentData, setCurrentData] = useState(
    newData.filter((item) => item.tracks)
  );

  const SearchTag = ({ text, active }) => (
    <View
      style={tw.style(
        "p-2 rounded-lg px-3 bg-gray-200 m-2 ",
        active && "border"
      )}
    >
      <Text style={tw.style("text-xs")}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw.style("flex-row px-3 items-center")}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <TextInput
          placeholder="Track, Album, Artist"
          style={tw.style(" p-2 bg-gray-200 rounded-xl flex-1 ml-3")}
        />
      </View>

      <View style={tw.style("flex-row p-3")}>
        <TouchableOpacity
          style={tw.style("")}
          onPress={() => filterPostData("tracks")}
        >
          <SearchTag text="Tracks" active={option === "tracks"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filterPostData("albums")}>
          <SearchTag text="Albums" active={option === "albums"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filterPostData("artists")}>
          <SearchTag text="Artists" active={option === "artists"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => filterPostData("playlists")}>
          <SearchTag text="Playlists" active={option === "playlists"} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw.style("px-4 pb-4 gap-4")}>
          {option === "tracks" &&
            currentData?.map((item) => <TrackCard item={item} key={item.id} />)}

          {option === "albums" &&
            currentData?.map((item) => <AlbumCard item={item} key={item.id} />)}

          {option === "artists" &&
            currentData?.map((item) => (
              <ArtistCard item={item} key={item.id} />
            ))}

          {option === "playlists" &&
            currentData?.map((item) => (
              <PlaylistCard item={item} key={item.id} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
