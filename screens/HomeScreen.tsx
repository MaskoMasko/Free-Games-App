import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MovieList } from "../components/MovieList";

export function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Top Movies</Text>
      <MovieList navigation={navigation}></MovieList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  mainHeader: {
    fontSize: 36,
    fontWeight: "bold",
    transform: [{ translateY: 100 }],
    marginBottom: 30,
  },
});
