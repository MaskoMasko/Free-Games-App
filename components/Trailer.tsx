import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useQuery } from "react-query";
import { store } from "../store/MoviesStore";
import { CustomButton } from "./CustomButton";
// import { WebView } from "react-native-webview";
//webview dela ali mi ni bas nisto

export const Trailer = () => {
  const [playing, setPlaying] = useState(false);
  const { data, isLoading } = useQuery("Trailes", () => {
    return store.fetchAllData("trailer", store.selectedMovie?.key);
  });
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{ flex: 1, alignSelf: "center" }}>
      <YoutubePlayer
        height={250}
        width={400}
        play={playing}
        videoId={data}
        onChangeState={onStateChange}
      />
      <CustomButton
        title={playing ? "PAUSE" : "PLAY"}
        color="white"
        backgroundColor="black"
        onPress={togglePlaying}
      ></CustomButton>
    </View>
  );
};

//   {/* <WebView
//     style={{ width: 400, height: 200 }}
//     javaScriptEnabled={true}
//     domStorageEnabled={true}
//     source={{
//       uri: "https://www.youtube.com/watch?v=LY19rHKAaAg",
//     }}
//   /> */}
