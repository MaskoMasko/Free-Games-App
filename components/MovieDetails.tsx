import { store } from "../store/MoviesStore";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { MoviesForList } from "./MoviesForList";
import { getDependencyTree } from "mobx";
import { CustomButton } from "./CustomButton";

export const MovieDetails = observer(({ navigation }: { navigation: any }) => {
  return (
    <ScrollView style={{ height: "100%", width: "100%" }}>
      <Text style={styles.mainHeader}>{store.selectedMovie?.title}</Text>
      <Text style={styles.detailsText}>Genres:</Text>
      <View style={{ flexDirection: "row" }}>
        {store.selectedMovie?.genres.map((genre: string, index: number) => {
          return (
            <Text style={styles.movieGenres} key={index}>
              {genre}
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
            navigation.navigate("Movies go YES");
          }}
        ></CustomButton>
        <CustomButton
          backgroundColor="orange"
          color="black"
          title="ADD TO FAVORITES"
          onPress={() => {
            store.addFavoriteMovie(store.selectedMovie?.key);
            navigation.navigate("Favorites");
          }}
        ></CustomButton>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  mainHeader: {
    fontSize: 32,
    margin: 10,
    fontWeight: "bold",
    marginBottom: 30,
  },
  movieGenres: {
    padding: 5,
    paddingHorizontal: 7,
    margin: 5,
    borderRadius: 15,
    color: "orange",
    borderWidth: 1,
    borderColor: "orange",
  },
  detailsText: { fontSize: 20, margin: 10 },
  imageStyle: { width: 370, height: 500, alignSelf: "center", margin: 20 },
});
