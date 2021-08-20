import React, { useCallback, useState } from "react";
import { Text, View, Platform, Button, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
// import { WebView } from "react-native-webview";
//webview dela ali mi ni bas nisto

export const Trailer = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
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
