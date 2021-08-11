import React from "react";
import { View } from "react-native";
import { FavoriteMoviesList } from "../components/FavoriteMoviesList";
import { styles } from "../styles/styles";

export function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <FavoriteMoviesList></FavoriteMoviesList>
    </View>
  );
}