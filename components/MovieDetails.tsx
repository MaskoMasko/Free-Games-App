import { observer } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { store } from "../store/MoviesStore";
import { CustomButton } from "./CustomButton";
import { NavigationProp } from "@react-navigation/core";
import { styles } from "../styles/styles";
import Text from "../styles/Text";
import theme from "../styles/theme";

const { spacing } = theme;

export const MovieDetails = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
      <ScrollView style={{ height: "100%", width: "100%" }}>
        <Text variant="boldText" fontSize={spacing.xl} m="m">
          {store.selectedMovie?.title}
        </Text>
        <Text fontSize={spacing.l} m="s">
          {" "}
          Genres:
        </Text>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 10 }}
        >
          {store.selectedMovie?.genre_ids.map((genre, index: number) => {
            return (
              <Text
                style={styles.movieGenres}
                key={index}
                onPress={() => {
                  store.resetGenrePageNumber();
                  store.setGenre(genre);
                  navigation.navigate("Genres");
                }}
              >
                {genre.name}
              </Text>
            );
          })}
        </View>
        <Image
          source={{ uri: store.selectedMovie?.poster }}
          style={styles.imageStyle}
        ></Image>
        <Text fontSize={spacing.l} mx="s">
          Release Date: {store.selectedMovie?.releaseDate}
        </Text>
        <Text fontSize={spacing.l} mx="s" mb="0">
          Summary
        </Text>
        <Text fontSize={spacing.m} m="s" mt="0">
          {store.selectedMovie?.description}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <CustomButton
            color="white"
            backgroundColor="black"
            title="GO BACK"
            onPress={() => {
              navigation.navigate("Home");
            }}
          ></CustomButton>
          <CustomButton
            backgroundColor="orange"
            color="black"
            title="ADD TO FAVORITES"
            onPress={() => {
              store.selectedMovie?.addToFavorites();
              navigation.navigate("Favorites");
            }}
          ></CustomButton>
        </View>
      </ScrollView>
    );
  }
);
