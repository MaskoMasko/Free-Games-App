import { NavigationProp } from "@react-navigation/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { useQuery } from "react-query";
import { useDebounced } from "../hooks/useDebounced";
import { store } from "../store/MoviesStore";
import { FilterAndGenreList } from "./ForFilterAndGenresList";
import { styles } from "../styles/styles";
import { CustomButton } from "./CustomButton";

export const FilterMovies = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [value, setValue] = React.useState("");
    const search = useDebounced(value, 1000);

    const { isLoading, isError, isIdle, data } = useQuery(
      ["FilteredMovies", search, store.pageNumber],
      () => {
        if (search === "") return;
        return store.fetchFilteredMovies(search);
      }
    );
    return (
      <View style={{ marginBottom: 400, width: "100%" }}>
        <TextInput
          value={value}
          onChangeText={(e) => setValue(e)}
          placeholder="go yes"
          style={{
            marginTop: 140,
            borderRadius: 5,
            borderColor: "grey",
            borderWidth: 2,
            padding: 10,
            marginHorizontal: 20,
            marginBottom: -20,
          }}
        ></TextInput>
        <Text></Text>
        <FilterAndGenreList
          navigation={navigation}
          isError={isError}
          isLoading={isLoading}
          isIdle={isIdle}
          moviesData={store.filteredMovies}
        ></FilterAndGenreList>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <CustomButton
            title="Prev Page"
            color="white"
            backgroundColor="orange"
            onPress={() => store.decreasePageNumber()}
          ></CustomButton>
          <Text style={styles.pageNumber}>{store.pageNumber}</Text>
          <CustomButton
            title="Next Page"
            color="white"
            backgroundColor="orange"
            onPress={() => store.increasePageNumber()}
          ></CustomButton>
        </View>
      </View>
    );
  }
);
