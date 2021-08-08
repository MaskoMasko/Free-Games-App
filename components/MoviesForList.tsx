import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const MoviesForList = ({ movie }: any) => {
  return (
    <View key={movie.item.key} style={styles.movieContainer}>
      <Image
        style={styles.moviePoster}
        source={{ uri: `${movie.item.poster}` }}
      ></Image>
      <Text style={styles.movieShortDescription}>{movie.item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    width: 300,
    height: 500,
    borderWidth: 2,
    borderColor: "black",
    alignSelf: "center",
    borderRadius: 20,
    margin: 10,
  },
  moviePoster: {
    width: 250,
    height: 300,
    margin: 20,
    alignSelf: "center",
    borderRadius: 20,
  },
  movieShortDescription: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
