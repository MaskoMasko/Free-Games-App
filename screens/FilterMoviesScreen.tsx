import React from "react";
import { StyleSheet, View } from "react-native";
import { FilterMovies } from "../components/FilterMovies";

export function FilterMoviesScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <FilterMovies navigation={navigation}></FilterMovies>
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
