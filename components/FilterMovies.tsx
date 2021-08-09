import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { store } from "../store/MoviesStore";

export const FilterMovies = observer(({ navigation }: { navigation: any }) => {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (value === "") return;

    store.fetchFilteredMovies(value);
  }, [value]);

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={(e) => setValue(e)}
        placeholder="go yes"
      ></TextInput>
      {value === "" ? (
        <Text>Enter some value</Text>
      ) : (
        <ScrollView>
          {store.filteredMovies.map((e, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  store.setSelectedMovie(e.key);
                  navigation.navigate("Details");
                }}
              >
                <Image
                  source={{ uri: e.poster }}
                  style={{ width: 300, height: 450 }}
                ></Image>
                <Text>{e.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
});
