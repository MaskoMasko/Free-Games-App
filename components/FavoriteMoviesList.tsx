import React from "react";
import { Text, View, Button } from "react-native";
import { observer } from "mobx-react-lite";
import { store } from "../store/MoviesStore";

export const FavoriteMoviesList = observer(() => {
  return (
    <View>
      {store.favoriteMoviesList.map((movie, index) => {
        return (
          <View key={index}>
            <Text>{movie?.title}</Text>
            <Button
              title="remove this one"
              onPress={() => {
                store.removeFavoriteMovie(index);
              }}
            ></Button>
          </View>
        );
      })}
    </View>
  );
});
