import { observer } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { store } from "../store/MoviesStore";
import { NavigationProp } from "@react-navigation/core";
import { styles } from "../styles/styles";

export const WatchItAgain = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    //to rabi staviti u onaj flatlist
    return (
      <View>
        <Text style={[styles.mainHeader, { marginLeft: 20, marginTop: 50 }]}>
          Watch It Again
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingBottom: 100 }}
        >
          {store.watchedMovies.length != 0 ? (
            store.watchedMovies
              .slice()
              .reverse()
              .map((movie, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      store.setSelectedMovie(movie.key);
                      navigation.navigate("Details");
                    }}
                    activeOpacity={0.5}
                  >
                    <Image
                      source={{ uri: movie.poster }}
                      style={styles.moviePoster}
                    ></Image>
                    <Text style={styles.movieShortDescription}>
                      {movie.title}
                    </Text>
                  </TouchableOpacity>
                );
              })
          ) : (
            <Text
              style={[
                styles.movieShortDescription,
                { marginLeft: 20, marginTop: 40 },
              ]}
            >
              You haven't watch any movie...
            </Text>
          )}
        </ScrollView>
      </View>
    );
  }
);
