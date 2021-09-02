import React from "react";
import { View } from "react-native";
import { FavoriteMoviesList } from "../components/FavoriteMoviesList";
import { styles } from "../styles/styles";

export function FavoritesScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <FavoriteMoviesList navigation={navigation}></FavoriteMoviesList>
    </View>
  );
}
