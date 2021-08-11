import { NavigationProp } from "@react-navigation/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { useQuery } from "react-query";
import { store } from "../store/MoviesStore";
import { FilterAndGenreList } from "./ForFilterAndGenresList";
import { Text, View } from "react-native";
import { CustomButton } from "./CustomButton";
import { styles } from "../styles/styles";

export const FilterGenre = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const { isLoading, isError, isIdle, data } = useQuery(
      ["FilteredMovies", store.genreId, store.genrePageNumber],
      () => {
        return store.fetchMoviesByGenre(store.genreId);
      }
    );
    return (
      <View style={{ marginBottom: 300 }}>
        <FilterAndGenreList
          navigation={navigation}
          isError={isError}
          isLoading={isLoading}
          isIdle={isIdle}
          moviesData={store.filteredMoviesByGenre}
        ></FilterAndGenreList>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <CustomButton
            title="Prev Page"
            color="white"
            backgroundColor="orange"
            onPress={() => store.decreaseGenrePageNumber()}
          ></CustomButton>
          <Text style={styles.pageNumber}>{store.genrePageNumber}</Text>
          <CustomButton
            title="Next Page"
            color="white"
            backgroundColor="orange"
            onPress={() => store.increaseGenrePageNumber()}
          ></CustomButton>
        </View>
      </View>
    );
  }
);
