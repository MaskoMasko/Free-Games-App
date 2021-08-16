import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View, Image } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";

export const BestRatedMovie = observer(() => {
  return (
    <View style={styles.container}>
      <Text style={[styles.mainHeader, { textAlign: "center" }]}>
        This one is the best RATTED
      </Text>
      <Image
        source={{ uri: store.bestRatedMovie?.poster }}
        style={styles.moviePoster}
      ></Image>
      <Text style={styles.movieShortDescription}>
        {store.bestRatedMovie?.title}
      </Text>
    </View>
  );
});
