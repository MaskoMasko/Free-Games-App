import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";
import { useQuery } from "react-query";
import { useIsFocused } from "@react-navigation/core";

export const Recommended = observer(() => {
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
        <View>
          {data.map((genre: any, id: number) => {
            return (
              <View key={id}>
                {genre.results.splice(0, 5).map((movie: any, idx: number) => {
                  return (
                    <View key={idx} style={{ flexDirection: "row" }}>
                      <Text>{idx + 1} .</Text>
                      <Text>{movie.title}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
});
