import { observer } from "mobx-react-lite";
import React from "react";
import { Text } from "react-native";
import { store } from "../store/MoviesStore";

export const FilterMovies = observer(() => {
  React.useEffect(() => {
    store.filterData();
  }, []);

  return <Text>Yes i can see with my own eyes</Text>;
});
