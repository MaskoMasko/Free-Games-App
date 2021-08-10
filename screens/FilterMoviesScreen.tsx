import React from "react";
import { View } from "react-native";
import { FilterMovies } from "../components/FilterMovies";
import { styles } from "../styles/styles";
import { NavigationProp } from "@react-navigation/core";

export function FilterMoviesScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={styles.container}>
      <FilterMovies navigation={navigation}></FilterMovies>
    </View>
  );
}
