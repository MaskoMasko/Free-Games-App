import React from "react";
import { StyleSheet, View } from "react-native";
import { FavoriteMoviesList } from "../components/FavoriteMoviesList";

export function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <FavoriteMoviesList></FavoriteMoviesList>
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
    transform: [{ translateY: 100 }],
    marginBottom: 30,
  },
});
