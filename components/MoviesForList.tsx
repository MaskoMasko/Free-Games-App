import { NavigationProp } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import React from "react";
import { Image, Text, View, Animated, TouchableHighlight } from "react-native";
import { MovieModel, store } from "../store/MoviesStore";
import { MovieRating } from "./MovieRating";
import { styles } from "../styles/styles";

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
                  store.setGenre(genre);
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
