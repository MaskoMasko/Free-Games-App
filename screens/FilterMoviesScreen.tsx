import React from "react";
import { View } from "react-native";
import { FilterMovies } from "../components/FilterMovies";
import { styles } from "../styles/styles";

export function FilterMoviesScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <FilterMovies navigation={navigation}></FilterMovies>
    </View>
  );
}
