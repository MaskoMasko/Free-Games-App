import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/core";
import { Animated, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { MovieModel, store } from "../store/MoviesStore";
import { MoviesForList } from "./MoviesForList";
import { styles } from "../styles/styles";
import Text from "../styles/Text";
import theme from "../styles/theme";
// import _ from "lodash";

const { spacing } = theme;
const ITEM_WIDTH = 320;

export const MovieList = observer(function MovieList({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [movies, setMovies] = useState<Instance<typeof MovieModel>[]>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const { isLoading, isError, isIdle, data } = useQuery("Movies", async () => {
    const sacekaj = await store.fetchAllData("fetchData", "");
    const bestRating = sacekaj
      .map((e: Instance<typeof MovieModel>) => e.rating)
      .sort((a: number, b: number) => b - a)[0];
    store.getBestRatedMovie(bestRating);
    setMovies([{ key: "left-spacer" }, ...sacekaj, { key: "right-spacer" }]);
    return sacekaj;
  });
  // const movieList = _.flatMap(data, (response: any) => response);
  //ja mislin da njega se ne mora falttenati jer je jadan array samo i think?

  if (isError) {
    return (
      <View style={styles.errorAndLoadingViews}>
        <Text variant="boldText" fontSize={spacing.l}>
          Something went wrong :(
        </Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.errorAndLoadingViews}>
        <Text variant="boldText" fontSize={spacing.l} mt="50">
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
