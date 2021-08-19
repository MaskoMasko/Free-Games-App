import { observer } from "mobx-react-lite";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";
import { Snackbar } from "./Snackbar";

export const FavoriteMoviesList = observer(() => {
  const [visible, setVisible] = React.useState(false);
  const dismiss = () => {
    setVisible(false);
  };
  return (
    <View style={{ height: "100%" }}>
      {store.favoriteMoviesList.length !== 0 ? (
        store.favoriteMoviesList.map((movie, index) => {
          return (
            <View
              key={index}
              style={[styles.favListItemContainer, { marginBottom: 0 }]}
            >
              <Text style={styles.favListItemText}>
                {movie?.title.toUpperCase()}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setVisible(true);
                  store.setSelectedMovie(movie.key);
                  store.removeFavoriteMovie(index);
                }}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text style={styles.noItemsInList}>
          You haven't added any movie to the list...
        </Text>
      )}
      <Snackbar
        visible={visible}
        dismiss={() => dismiss()}
        text="removed"
      ></Snackbar>
    </View>
  );
});
