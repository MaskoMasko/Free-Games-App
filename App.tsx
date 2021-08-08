import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MovieList } from "./components/MovieList";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Top Movies</Text>
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
  mainHeader: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 100,
  },
});
