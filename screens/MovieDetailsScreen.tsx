import React from "react";
import { View } from "react-native";
import { MovieDetails } from "../components/MovieDetails";
import { styles } from "../styles/styles";

export function MovieDetailsScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <MovieDetails navigation={navigation}></MovieDetails>
    </View>
  );
}
