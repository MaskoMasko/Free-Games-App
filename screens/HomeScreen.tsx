import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import { MovieList } from "../components/MovieList";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";

export function HomeScreen({ navigation }: { navigation: any }) {
  const query = useQuery("genreList", () => {
    return store.fetchGenreList();
  });

  if (!query.isSuccess) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.mainHeader, { marginBottom: -50, marginTop: 70 }]}>
        Top Movies
      </Text>
      <MovieList navigation={navigation}></MovieList>
    </View>
  );
}
