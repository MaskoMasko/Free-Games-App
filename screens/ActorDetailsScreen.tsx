import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { getImagePath } from "../api/api";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";

export const ActorDetailsScreen = () => {
  return (
    <ScrollView>
      <Text style={styles.mainHeader}>{store.selectedActor?.name}</Text>
      <Image
        source={{
          uri: getImagePath(store.selectedActor?.profile_path!),
        }}
        style={styles.imageStyle}
      ></Image>
      <Text style={styles.detailsText}>
        Profession: {store.selectedActor?.known_for_department}
      </Text>
      <Text style={styles.detailsText}>
        Popularity: {store.selectedActor?.popularity}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.detailsText}>Movies:</Text>
        <View>
          {store.selectedActor?.known_for.map((movie, id) => {
            if (!movie.original_title) return;
            return (
              <Text key={id} style={styles.detailsText}>
                {movie.original_title}
              </Text>
            );
          })}
        </View>
      </View>
      <Text style={[styles.movieDescText, { marginTop: -5, marginLeft: 5 }]}>
        Ovo ne dela kako rabi ali idc..
      </Text>
      {/*zasto bi mi dali 2 razlicita obj i bili kao yes i zbog tega san posa no... */}
    </ScrollView>
  );
};
