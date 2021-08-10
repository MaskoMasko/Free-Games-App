import { NavigationProp } from "@react-navigation/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { useQuery } from "react-query";
import { store } from "../store/MoviesStore";
import { FilterAndGenreList } from "./ForFilterAndGenresList";

export const FilterGenre = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const { isLoading, isError, isIdle, data } = useQuery(
      ["FilteredMovies", store.genreId],
      () => {
        return store.fetchMoviesByGenre(store.genreId);
      }
    );
    return (
      <FilterAndGenreList
        navigation={navigation}
        isError={isError}
        isLoading={isLoading}
        isIdle={isIdle}
        moviesData={store.filteredMoviesByGenre}
      ></FilterAndGenreList>
    );
  }
);
