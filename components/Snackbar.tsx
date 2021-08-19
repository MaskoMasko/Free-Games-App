import React from "react";
import { Text, View } from "react-native";
import { Snackbar as Snack } from "react-native-paper";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";
import { Forsi } from "./Forsi";

export const Snackbar = (props: any) => {
  const { visible, text } = props;
  return (
    <Snack
      duration={3000}
      visible={visible}
      onDismiss={() => props.dismiss()}
      style={{
        backgroundColor: "orange",
        width: "95%",
        alignSelf: "center",
      }}
      action={{
        label: `${[text == "removed" ? "Undo" : ""]}`,
        onPress: () => {
          store.selectedMovie?.addToFavorites();
        },
      }}
    >
      <View>
        {text == "removed" ? (
          <Text style={styles.removeButtonText}>
            Removed {store.selectedMovie?.title} from favorites...
          </Text>
        ) : text == "add" ? (
          <Forsi></Forsi>
        ) : null}
      </View>
    </Snack>
  );
};
