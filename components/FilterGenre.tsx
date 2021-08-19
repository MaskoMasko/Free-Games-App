import { NavigationProp } from "@react-navigation/core";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useQuery } from "react-query";
import { store } from "../store/MoviesStore";
import { FilterAndGenreList } from "./ForFilterAndGenresList";
import { Text, View } from "react-native";
import { CustomButton } from "./CustomButton";
import { styles } from "../styles/styles";

export const FilterGenre = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const flatListRef = useRef<any>();
    const toTop = () => {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    };
    const { isLoading, isError, isIdle, data } = useQuery(
      ["FilteredMovies", store.genreId, store.genrePageNumber],
      () => {
        return store.fetchMoviesByGenre(store.genreId);
      },
      { keepPreviousData: true }
    );
    //ne dela ref
    return (
      <View style={{ marginBottom: 300 }}>
        <FilterAndGenreList
          navigation={navigation}
          isError={isError}
          // ref={flatListRef}
          isLoading={isLoading}
          isIdle={isIdle}
          moviesData={data}
        ></FilterAndGenreList>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <CustomButton
            title="Prev Page"
            color="white"
            backgroundColor="orange"
            onPress={() => {
              // toTop();
              store.decreaseGenrePageNumber();
            }}
          ></CustomButton>
          <Text style={styles.pageNumber}>{store.genrePageNumber}</Text>
          <CustomButton
            title="Next Page"
            color="white"
            backgroundColor="orange"
            onPress={() => {
              // toTop();
              store.increaseGenrePageNumber();
            }}
          ></CustomButton>
        </View>
      </View>
    );
  }
);
