import React from "react";
import { StyleSheet, View } from "react-native";
import { MovieDetails } from "../components/MovieDetails";

export function MovieDetailsScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <MovieDetails navigation={navigation}></MovieDetails>
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
