import { NavigationProp } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import React from "react";
import { Image, StyleSheet, Text, View, Animated } from "react-native";
import { MovieModel, store } from "../store/MoviesStore";
import { MovieRating } from "./MovieRating";

export const MoviesForList = observer(function MoviesForList({
  movie,
  translateY,
  navigation,
}: {
  movie: Instance<typeof MovieModel>;
  translateY: Animated.AnimatedInterpolation;
  navigation: NavigationProp<any>;
}) {
  return (
    <Animated.View
      key={movie.key}
      style={[styles.movieContainer, { transform: [{ translateY }] }]}
    >
      <Image
        style={styles.moviePoster}
        source={{ uri: `${movie.poster}` }}
      ></Image>
      <Text style={[styles.movieShortDescription, { marginBottom: 10 }]}>
        {movie.title}
      </Text>
      <MovieRating movie={movie}></MovieRating>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        {movie.genre_ids.map((genre, index: number) => {
          if (index < 2) {
            return (
              <Text
                key={index}
                style={styles.movieGenres}
                onPress={() => {
                  store.setOneFatNothing(genre.name);
                  navigation.navigate("Genres");
                }}
              >
                {genre.name}
              </Text>
            );
          }
          return;
        })}
      </View>
      <Text numberOfLines={3} style={styles.movieDescText}>
        {movie.description}
      </Text>
    </Animated.View>
  );
});

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
