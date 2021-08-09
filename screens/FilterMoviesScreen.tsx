import React from "react";
import { StyleSheet, View } from "react-native";
import { FilterMovies } from "../components/FilterMovies";

export function FilterMoviesScreen() {
  return (
    <View style={styles.container}>
      <FilterMovies></FilterMovies>
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
