import React from "react";
import { View } from "react-native";
import { MovieDetails } from "../components/MovieDetails";
import { styles } from "../styles/styles";
import { NavigationProp } from "@react-navigation/core";

export function MovieDetailsScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={styles.container}>
      <MovieDetails navigation={navigation}></MovieDetails>
    </View>
  );
}
