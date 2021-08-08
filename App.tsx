import React from "react";
import { StyleSheet, View } from "react-native";
import { MovieList } from "./components/MovieList";

export default function App() {
  return (
    <View style={styles.container}>
      <MovieList></MovieList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
