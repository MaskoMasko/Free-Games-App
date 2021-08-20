import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";
import { useQuery } from "react-query";
import { useIsFocused } from "@react-navigation/core";
import { getImagePath } from "../api/api";

export const Recommended = observer(({ navigation }: any) => {
  const isFocused = useIsFocused();
  const { isLoading, data, isError } = useQuery(
    "Recommended",
    () => {
      return store.fetchAllData("recommended", store.genresForRecommended);
    },
    { enabled: isFocused }
  );
  if (isLoading) {
    return (
      <View style={styles.errorAndLoadingViews}>
        <Text style={styles.errorAndLoading}>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View style={styles.errorAndLoadingViews}>
        <Text style={styles.errorAndLoading}>Error...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={[styles.mainHeader, { marginLeft: 20, marginTop: 50 }]}>
        Recommended
      </Text>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((genre: any, id: number) => {
            return (
              <View key={id} style={{ flexDirection: "row" }}>
                {genre.results.splice(0, 5).map((movie: any, idx: number) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => {}}
                      activeOpacity={0.5}
                    >
                      <Image
                        source={{ uri: getImagePath(movie.poster_path) }}
                        style={styles.moviePoster}
                      ></Image>
                      <Text
                        style={[
                          styles.movieShortDescription,
                          { width: 200, alignSelf: "center", marginBottom: 30 },
                        ]}
                      >
                        {movie.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
});
