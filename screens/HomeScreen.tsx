import React from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { MovieList } from "../components/MovieList";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";
import { NavigationProp } from "@react-navigation/core";
import Text from "../styles/Text";
import theme from "../styles/theme";
import { BestRatedMovie } from "../components/BestRatedmovie";
import { WatchItAgain } from "../components/WatchItAgain";

const { spacing, colors } = theme;

export function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
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
    <ScrollView>
      <BestRatedMovie></BestRatedMovie>
      <Text variant="boldText" mt="100" mb="-50" fontSize={spacing.xl}>
        Top Movies
      </Text>
      <MovieList navigation={navigation}></MovieList>
      <WatchItAgain></WatchItAgain>
    </ScrollView>
  );
}
