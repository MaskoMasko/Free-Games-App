import { observer } from "mobx-react-lite";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";

export const FilterAndGenreList = observer(
  ({ navigation, isError, isLoading, isIdle, moviesData }: any) => {
    return (
      <View>
        {isError ? (
          <View style={styles.errorAndLoadingViews}>
            <Text style={styles.errorAndLoading}>Something went wrong :(</Text>
          </View>
        ) : isLoading ? (
          <View style={styles.errorAndLoadingViews}>
            <Text style={styles.errorAndLoading}>Loading...</Text>
          </View>
        ) : isIdle ? null : moviesData == false || !moviesData ? (
          <Text>Full of air... Just like your MOM!</Text>
        ) : (
          <FlatList
            data={moviesData}
            keyExtractor={(movie) => movie.key}
            renderItem={({ item: movie, index }) => {
              return (
                <TouchableOpacity
                  key={movie.key}
                  activeOpacity={0.5}
                  onPress={() => {
                    store.setSelectedMovie(movie);
                    navigation.navigate("Details");
                  }}
                  style={styles.filteredItemsContainer}
                >
                  <Image
                    source={{ uri: movie.poster }}
                    style={styles.filteredItemsImage}
                  ></Image>
                  <Text style={styles.filteredItemsText}>{movie.title}</Text>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        )}
      </View>
    );
  }
);
