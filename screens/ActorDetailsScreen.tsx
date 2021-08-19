import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";

export const ActorDetailsScreen = () => {
  return (
    <ScrollView>
      <Text style={styles.mainHeader}>{store.selectedActor?.name}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${store.selectedActor?.profile_path}`,
        }}
        style={styles.imageStyle}
      ></Image>
      <Text>Profession: {store.selectedActor?.known_for_department}</Text>
      <Text>Popularity: {store.selectedActor?.popularity}</Text>
      <Text>Movies: </Text>
      <View style={{ flexDirection: "row" }}>
        {store.selectedActor?.known_for.map((movie, id) => {
          return <Text key={id}>{movie.original_title}</Text>;
        })}
      </View>
      <Text>Ovo ne dela kako rabi ali idc..</Text>
      {/*zasto bi mi dali 2 razlicita obj i bili kao yes i zbog tega san posa no... */}
    </ScrollView>
  );
};
