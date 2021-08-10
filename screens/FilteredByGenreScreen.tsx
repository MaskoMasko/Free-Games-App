import { observer } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { FilterGenreList } from "../components/FilterGenreList";
import { store } from "../store/MoviesStore";

export const FilteredByGenreScreen = observer(({ navigation }: any) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.movieGenres}>{store.oneFatNothing2}</Text>
      </View>
      <FilterGenreList></FilterGenreList>
    </View>
  );
});

const styles = StyleSheet.create({
  movieGenres: {
    padding: 5,
    paddingHorizontal: 7,
    margin: 15,
    borderRadius: 15,
    color: "orange",
    borderWidth: 1,
    borderColor: "orange",
  },
});
