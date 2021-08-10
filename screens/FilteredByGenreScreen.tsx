import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View } from "react-native";
import { FilterGenreList } from "../components/FilterGenreList";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";
import { NavigationProp } from "@react-navigation/core";

export const FilteredByGenreScreen = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.movieGenres}>{store.genreName}</Text>
        </View>
        <FilterGenreList navigation={navigation}></FilterGenreList>
      </View>
    );
  }
);
