import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { store } from "../store/MoviesStore";
import { NavigationProp } from "@react-navigation/core";
import { styles } from "../styles/styles";
// import { MovieRating } from "./MovieRating";

export const BestRatedMovie = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          store.setSelectedMovie(store.bestRatedMovie?.key);
          navigation.navigate("Details");
        }}
        style={[styles.container]}
      >
        <Text style={[styles.mainHeader, { textAlign: "center" }]}>
          Best Rated Movie
        </Text>
        <Image
          source={{ uri: store.bestRatedMovie?.poster }}
          style={styles.moviePoster}
        ></Image>
        <Text style={styles.movieShortDescription}>
          {store.bestRatedMovie?.title}
        </Text>
        {/* why tf nemoren koristiit movie rating??!??!?!?*/}
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginRight: 10,
              marginBottom: 5,
            }}
          >
            {store.bestRatedMovie?.rating}
          </Text>
          <Image
            source={{
              uri: "https://www.iconsdb.com/icons/preview/color/FCC203/star-2-xxl.png",
            }}
            style={{ width: 30, height: 30 }}
          ></Image>
        </View>
      </TouchableOpacity>
    );
  }
);
