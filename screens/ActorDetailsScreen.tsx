import React from "react";
import { Text, View, Image } from "react-native";
import { store } from "../store/MoviesStore";

export const ActorDetailsScreen = () => {
  return (
    <View>
      <Text>{store.selectedActor?.name}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${store.selectedActor?.profile_path}`,
        }}
        style={{ width: 300, height: 300 }}
      ></Image>
    </View>
  );
};
