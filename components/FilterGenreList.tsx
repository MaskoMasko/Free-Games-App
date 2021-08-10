import { observer } from "mobx-react-lite";
import { NavigationProp } from "@react-navigation/core";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { store } from "../store/MoviesStore";

export const FilterGenreList = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const { isLoading, isError, isIdle, data } = useQuery(
      ["FilteredMovies", store.genreId],
      () => {
        return store.fetchMoviesByGenre(store.genreId);
      }
    );
    return (
      <View>
        {isError ? (
          <View
            style={{
              padding: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, margin: 50, fontWeight: "bold" }}>
              Something went wrong :(
            </Text>
          </View>
        ) : isLoading ? (
          <View
            style={{
              padding: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, margin: 50, fontWeight: "bold" }}>
              Loading...
            </Text>
          </View>
        ) : isIdle ? null : (
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
        )}
      </View>
    );
  }
);
