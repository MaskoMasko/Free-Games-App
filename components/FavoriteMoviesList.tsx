import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { store } from "../store/MoviesStore";
import { CustomButton } from "./CustomButton";

export const FavoriteMoviesList = observer(() => {
  return (
    <View style={{ height: "100%" }}>
      {store.favoriteMoviesList.length !== 0 ? (
        store.favoriteMoviesList.map((movie, index) => {
          return (
            <View
              key={index}
              style={{
                width: 370,
                backgroundColor: "orange",
                margin: 20,
                minHeight: 50,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                  alignSelf: "center",
                  marginLeft: 10,
                  width: 200,
                }}
              >
                {movie?.title.toUpperCase()}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  store.removeFavoriteMovie(index);
                }}
                style={{
                  backgroundColor: "black",
                  marginRight: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  width: 100,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  REMOVE
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            width: 350,
            marginTop: 300,
          }}
        >
          You haven't added any movie to the list...
        </Text>
      )}
    </View>
  );
});
