import { NavigationProp } from "@react-navigation/core";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { useDebounced } from "../hooks/useDebounced";
import { store } from "../store/MoviesStore";

export const FilterMovies = observer(
  ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [value, setValue] = React.useState("");
    const search = useDebounced(value, 1000);

    const { isLoading, isError, isIdle, data } = useQuery(
      ["FilteredMovies", search],
      () => {
        if (search === "") return;
        return store.fetchFilteredMovies(search);
        //it works sa samo rijci umisto value
      }
    );

    //primjer fetchanja samo po idu tj. dobivanje podatka po idu
    // function Todos({ todoId }) {
    //   const result = useQuery(['todos', todoId], () => fetchTodoById(todoId))
    // }
    //idk dali to rabin koristiti da postavin selectedMovie, ali oni us to nap za page routing
    return (
      <View>
        <TextInput
          value={value}
          onChangeText={(e) => setValue(e)}
          placeholder="go yes"
          style={{ marginTop: 100 }}
        ></TextInput>
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
      </View>
    );
  }
);
