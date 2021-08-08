import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MovieRating } from "./MovieRating";

export const MoviesForList = ({ movie }: any) => {
  return (
    <View key={movie.item.key} style={styles.movieContainer}>
      <Image
        style={styles.moviePoster}
        source={{ uri: `${movie.item.poster}` }}
      ></Image>
      <Text style={[styles.movieShortDescription, { marginBottom: 10 }]}>
        {movie.item.title}
      </Text>
      <MovieRating movie={movie}></MovieRating>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={styles.movieGenres}>
          {movie.item.genres[0].toLowerCase()}
        </Text>
        {movie.item.genres[1] ? (
          <Text style={styles.movieGenres}>
            {movie.item.genres[1].toLowerCase()}
          </Text>
        ) : null}
      </View>
      <Text numberOfLines={3} style={styles.movieDescText}>
        {movie.item.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    width: 300,
    height: 500,
    // borderWidth: 2,
    // borderColor: "black",
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
  movieGenres: {
    padding: 5,
    paddingHorizontal: 7,
    margin: 5,
    borderRadius: 15,
    color: "orange",
    borderWidth: 1,
    borderColor: "orange",
  },
  movieDescText: {
    margin: 10,
    marginHorizontal: 25,
    fontSize: 12,
    fontWeight: "bold",
  },
});