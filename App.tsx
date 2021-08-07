import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getMovies } from "./api";

interface Movie {
  title: string;
}

const fetchData = async () => {
  const movies = await getMovies();
  movies.map((e: Movie) => console.log(e.title));
};

export default function App() {
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
