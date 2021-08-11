import { observer } from "mobx-react-lite";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { store } from "../store/MoviesStore";

export const FilterAndGenreList = observer(
  ({ navigation, isError, isLoading, isIdle, moviesData }: any) => {
    return (
      <View>
        {isError ? (
          <View
            style={{
              padding: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, margin: 50, fontWeight: "bold" }}>
              Something went wrong :(
            </Text>
          </View>
        ) : isLoading ? (
          <View
            style={{
              padding: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, margin: 50, fontWeight: "bold" }}>
              Loading...
            </Text>
          </View>
        ) : isIdle ? null : (
          <ScrollView>
            {moviesData.map((movie: any) => {
              return (
                <TouchableOpacity
                  key={movie.key}
                  activeOpacity={0.5}
                  onPress={() => {
                    store.setSelectedMovie(movie);
                    navigation.navigate("Details");
                  }}
                >
                  <Image
                    source={{ uri: movie.poster }}
                    style={{ width: 300, height: 450 }}
                  ></Image>
                  <Text>{movie.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
);
