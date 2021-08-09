import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { store } from "../store/MoviesStore";
import { MoviesForList } from "./MoviesForList";

const ITEM_WIDTH = 320;

interface MovieItemInterface {
  key: string;
  title: string;
  genres: string[];
  poster: string;
  backdrop: string;
  rating: number;
  description: string;
  releaseDate: string;
}

export const MovieList = observer(({ navigation }: { navigation: any }) => {
  const [movies, setMovies] = useState<any>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const fetchMovieData = async () => {
    const thismovies = await store.fetchData();
    setMovies([
      { key: "left-spacer" },
      ...store.movieList,
      { key: "right-spacer" },
    ]);
    // movies.map((e: Movie) => console.log(e.genres));
  };

  useEffect(() => {
    fetchMovieData();
    // store.fetchData();
  }, []);

  return (
    <View>
      <Animated.FlatList
        data={movies}
        keyExtractor={(movie: MovieItemInterface) => movie.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={(movie) => {
          if (!movie.item.poster) {
            return <View style={{ width: 45 }}></View>;
          }
          const inputRange = [
            (movie.index - 2) * ITEM_WIDTH,
            (movie.index - 1) * ITEM_WIDTH,
            movie.index * ITEM_WIDTH,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ marginTop: 130 }}
              onPress={() => {
                store.setSelectedMovie(movie.item.key);
                navigation.navigate("Details");
              }}
            >
              <MoviesForList
                movie={movie}
                translateY={translateY}
              ></MoviesForList>
            </TouchableOpacity>
          );
        }}
      ></Animated.FlatList>
    </View>
  );
});
