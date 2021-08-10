import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Animated, TouchableOpacity, View, Text } from "react-native";
import { MovieModel, store } from "../store/MoviesStore";
import { MoviesForList } from "./MoviesForList";
import { useQuery } from "react-query";
import { getMovies } from "../api/api";
import { Instance } from "mobx-state-tree";
// import _ from "lodash";

const ITEM_WIDTH = 320;

export const MovieList = observer(function MovieList({
  navigation,
}: {
  navigation: any;
}) {
  const [movies, setMovies] = useState<Instance<typeof MovieModel>[]>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // const fetchMovieData = async () => {
  //   const thismovies = await store.fetchData();
  //   setMovies([
  //     { key: "left-spacer" },
  //     ...store.movieList,
  //     { key: "right-spacer" },
  //   ]);
  //   // movies.map((e: Movie) => console.log(e.genres));
  // };
  // useEffect(() => {
  //   fetchMovieData();
  //   // store.fetchData();
  // }, []);

  const { isLoading, isError, isIdle, data } = useQuery("Movies", async () => {
    const sacekaj = await store.fetchData();
    setMovies([{ key: "left-spacer" }, ...sacekaj, { key: "right-spacer" }]);
    // console.log(sacekaj);
    //sacekaj je isto kao data
    //dali moran async await u ovoj func?? porke nece bez?
    return sacekaj;
  });
  // console.log(data);
  //data array s objektima

  // const movieList = _.flatMap(data, (response: any) => response);
  //ja mislin da njega se ne mora falttenati jer je jadan array samo i think?

  if (isError) {
    return (
      <View
        style={{ padding: 32, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 30, margin: 50, fontWeight: "bold" }}>
          Something went wrong :(
        </Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View
        style={{ padding: 32, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 30, margin: 50, fontWeight: "bold" }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (isIdle) {
    return null;
  }

  return (
    <View>
      <Animated.FlatList
        data={movies}
        keyExtractor={(movie) => movie.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item: movie, index }) => {
          if (!movie.poster) {
            return <View style={{ width: 45 }}></View>;
          }
          const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
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
                store.setSelectedMovie(movie.key);
                navigation.navigate("Details");
              }}
            >
              <MoviesForList
                navigation={navigation}
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

// return (
//   <View>
//     <Animated.FlatList
//       data={movies}
//       keyExtractor={(movie: MovieItemInterface) => movie.key}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       snapToInterval={ITEM_WIDTH}
//       decelerationRate={0}
//       scrollEventThrottle={16}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//         { useNativeDriver: true }
//       )}
//       renderItem={(movie) => {
//         if (!movie.item.poster) {
//           return <View style={{ width: 45 }}></View>;
//         }
//         const inputRange = [
//           (movie.index - 2) * ITEM_WIDTH,
//           (movie.index - 1) * ITEM_WIDTH,
//           movie.index * ITEM_WIDTH,
//         ];
//         const translateY = scrollX.interpolate({
//           inputRange,
//           outputRange: [0, -50, 0],
//         });
//         return (
//           <TouchableOpacity
//             activeOpacity={0.5}
//             style={{ marginTop: 130 }}
//             onPress={() => {
//               store.setSelectedMovie(movie.item.key);
//               navigation.navigate("Details");
//             }}
//           >
//             <MoviesForList
//               movie={movie}
//               translateY={translateY}
//             ></MoviesForList>
//           </TouchableOpacity>
//         );
//       }}
//     ></Animated.FlatList>
//   </View>
// );
