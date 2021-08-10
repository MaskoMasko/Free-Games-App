import { observer } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { FilterGenreList } from "../components/FilterGenreList";
import { store } from "../store/MoviesStore";

export const FilteredByGenreScreen = observer(({ navigation }: any) => {
  return (
    <View>
      <Text>{store.oneFatNothing}</Text>
      <FilterGenreList></FilterGenreList>
    </View>
  );
});
