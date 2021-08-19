import React from "react";
import { Text, View } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";

export function Forsi() {
  return (
    <View>
      {store.ima ? (
        <Text style={styles.removeButtonText}>Already added that one...</Text>
      ) : (
        <Text style={styles.removeButtonText}>Added to favorites...</Text>
      )}
    </View>
  );
}
