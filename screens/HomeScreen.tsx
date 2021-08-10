import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import { MovieList } from "../components/MovieList";
import { store } from "../store/MoviesStore";

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
      <Text style={styles.mainHeader}>Top Movies</Text>
      <MovieList navigation={navigation}></MovieList>
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
