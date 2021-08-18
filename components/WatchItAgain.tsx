import { observer } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";

export const WatchItAgain = observer(({ navigation }: any) => {
  //to rabi staviti u onaj flatlist
  return (
    <View>
      <Text style={[styles.mainHeader, { marginLeft: 20, marginTop: 50 }]}>
        Watch It Again
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {store.watchedMovies.length != 0 ? (
          store.watchedMovies.map((movie, i) => {
            return (
              <View key={i}>
                <Image
                  source={{ uri: movie.poster }}
                  style={styles.moviePoster}
                ></Image>
                <Text style={styles.movieShortDescription}>{movie.title}</Text>
              </View>
            );
          })
        ) : (
          <Text>U haven't watch any movie...</Text>
        )}
      </ScrollView>
    </View>
  );
});
