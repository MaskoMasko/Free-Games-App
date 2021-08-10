import { observer } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { store } from "../store/MoviesStore";
import { CustomButton } from "./CustomButton";
import { styles } from "../styles/styles";

export const MovieDetails = observer(({ navigation }: { navigation: any }) => {
  return (
    <ScrollView style={{ height: "100%", width: "100%" }}>
      <Text style={styles.mainHeader}>{store.selectedMovie?.title}</Text>
      <Text style={styles.detailsText}> Genres:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 10 }}>
        {store.selectedMovie?.genre_ids.map((genre, index: number) => {
          return (
            <Text
              style={styles.movieGenres}
              key={index}
              onPress={() => {
                store.setOneFatNothing(genre);
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
      <Text style={styles.detailsText}>
        Release Date: {store.selectedMovie?.releaseDate}
      </Text>
      <Text style={[styles.detailsText, { marginBottom: 0 }]}>Summary</Text>
      <Text style={{ fontSize: 15, margin: 10 }}>
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
});
