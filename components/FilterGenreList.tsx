import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { store } from "../store/MoviesStore";

export const FilterGenreList = observer(({ navigation }: any) => {
  const { isLoading, isError, isIdle, data, isSuccess } = useQuery(
    ["FilteredMovies", store.oneFatNothing],
    async () => {
      const sacekaj = await store.fetchMoviesByGenre(store.oneFatNothing);
      //it works sa samo rijci umisto value
      return sacekaj;
    }
  );
  if (!isSuccess) {
    return <Text>WAITING FOR YOU MOM TO COME</Text>;
  }
  return (
    <ScrollView>
      {store.filteredMoviesByGenre.map((movie) => {
        return (
          <TouchableOpacity
            key={movie.key}
            activeOpacity={0.5}
            onPress={() => {
              store.setSelectedMovie(movie);
              navigation.navigate("Details");
            }}
          >
            <Image
              source={{ uri: movie.poster }}
              style={{ width: 300, height: 450 }}
            ></Image>
            <Text>{movie.title}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
});
