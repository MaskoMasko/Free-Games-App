import { observer } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { store } from "../store/MoviesStore";
import { CustomButton } from "./CustomButton";
import { NavigationProp } from "@react-navigation/core";
import { styles } from "../styles/styles";
import Text from "../styles/Text";
import theme from "../styles/theme";
import { Snackbar } from "./Snackbar";
import { Trailer } from "./Trailer";

const { spacing } = theme;

export const MovieDetails = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [showSnack, setShowSnack] = React.useState(false);

    const dismiss = () => {
      setShowSnack(false);
    };
    return (
      <View>
        <ScrollView style={{ height: "100%", width: "100%" }}>
          <Text variant="boldText" fontSize={spacing.xl} m="m">
            {store.selectedMovie?.title}
          </Text>
          <Text fontSize={spacing.l} m="s">
            Genres:
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 10 }}
          >
            {store.selectedMovie?.genre_ids.map((genre, index: number) => {
              return (
                <View key={index}>
                  <Text
                    style={styles.movieGenres}
                    onPress={() => {
                      store.setPagination("category", "reset");
                      store.setGenre(genre);
                      navigation.navigate("Genres");
                    }}
                  >
                    {genre.name}
                  </Text>
                </View>
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
          <Text fontSize={spacing.l} mx="s">
            Trailer
          </Text>
          <Text style={{ margin: 20 }}>
            OVODE VJV NI TRAILER ALI MI SE NE DA DNS TO NASIMAVATI! :)
          </Text>
          <Trailer></Trailer>
          <Text fontSize={spacing.l} mx="s" mb="0">
            Summary
          </Text>
          <Text fontSize={spacing.m} m="s" mt="0">
            {store.selectedMovie?.description}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <CustomButton
              color="white"
              backgroundColor="black"
              title="GO HOME"
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
                setShowSnack(true);
              }}
            ></CustomButton>
          </View>
        </ScrollView>
        <View>
          <Snackbar
            visible={showSnack}
            dismiss={() => dismiss()}
            text={"add"}
          ></Snackbar>
        </View>
      </View>
    );
  }
);
