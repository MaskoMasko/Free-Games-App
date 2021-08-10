import { NavigationProp } from "@react-navigation/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { TextInput, View } from "react-native";
import { useQuery } from "react-query";
import { useDebounced } from "../hooks/useDebounced";
import { store } from "../store/MoviesStore";
import { FilterAndGenreList } from "./ForFilterAndGenresList";

export const FilterMovies = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [value, setValue] = React.useState("");
    const search = useDebounced(value, 1000);

    const { isLoading, isError, isIdle, data } = useQuery(
      ["FilteredMovies", search],
      () => {
        if (search === "") return;
        return store.fetchFilteredMovies(search);
      }
    );
    return (
      <View>
        <TextInput
          value={value}
          onChangeText={(e) => setValue(e)}
          placeholder="go yes"
          style={{ marginTop: 100 }}
        ></TextInput>
        <FilterAndGenreList
          navigation={navigation}
          isError={isError}
          isLoading={isLoading}
          isIdle={isIdle}
          moviesData={store.filteredMovies}
        ></FilterAndGenreList>
      </View>
    );
  }
);
