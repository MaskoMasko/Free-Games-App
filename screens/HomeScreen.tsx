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
import { Recommended } from "../components/Recommended";
import { observer } from "mobx-react-lite";

const { spacing, colors } = theme;

export const HomeScreen = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    React.useEffect(() => {
      store.getGenresForRecommended();
    }, [store.selectedMovie]);

    const query = useQuery("genreList", () => {
      return store.fetchAllData("fetchGenreList", "");
    });

    if (!query.isSuccess) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator></ActivityIndicator>
        </View>
      );
    }

    return (
      <ScrollView>
        <BestRatedMovie navigation={navigation}></BestRatedMovie>
        <View style={{ alignSelf: "center" }}>
          <Text variant="boldText" mt="100" mb="50" fontSize={spacing.xl}>
            Top Movies
          </Text>
        </View>
        <MovieList navigation={navigation}></MovieList>
        <WatchItAgain navigation={navigation}></WatchItAgain>
        <Recommended navigation={navigation}></Recommended>
      </ScrollView>
    );
  }
);
