import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "react-query";
import { store } from "../store/MoviesStore";

export const FilterGenreList = observer(() => {
  const { isLoading, isError, isIdle, data } = useQuery(
    ["FilteredMovies"],
    async () => {
      const sacekaj = await store.fetchMoviesByGenre(store.oneFatNothing);
      //it works sa samo rijci umisto value
      return sacekaj;
    }
  );
  return (
    <View>
      {store.filteredMoviesByGenre.map((e, i) => {
        return (
          <View key={e.poster}>
            <Text>{e.title}</Text>
          </View>
        );
      })}
    </View>
  );
});
