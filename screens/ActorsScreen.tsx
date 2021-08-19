import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { store } from "../store/MoviesStore";
import { useQuery } from "react-query";
import { styles } from "../styles/styles";
import { observer } from "mobx-react-lite";

export const ActorsScreen = observer(({ navigation }: any) => {
  const { isLoading, isError, isIdle, data } = useQuery(
    ["Actors", store.actorsPageNumber],
    () => {
      return store.fetchActors();
    }
  );
  if (isLoading) {
    return <Text>loading...</Text>;
  }
  return (
    <View style={{ marginBottom: 70 }}>
      <FlatList
        data={data}
        keyExtractor={(actor) => actor.name}
        renderItem={({ item: actor, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                store.setActor(actor.name);
                navigation.navigate("ActorDetails");
              }}
              activeOpacity={0.3}
              style={{ backgroundColor: "orange", margin: 10, padding: 20 }}
            >
              <Text
                style={[
                  styles.favListItemText,
                  { color: "black", alignSelf: "flex-start" },
                ]}
              >
                {actor.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <CustomButton
          title="Prev Page"
          color="white"
          backgroundColor="orange"
          onPress={() => {
            // toTop();
            store.decreaseActorsPageNumber();
          }}
        ></CustomButton>
        <Text style={styles.pageNumber}>{store.actorsPageNumber}</Text>
        <CustomButton
          title="Next Page"
          color="white"
          backgroundColor="orange"
          onPress={() => {
            // toTop();
            store.increaseActorsPageNumber();
          }}
        ></CustomButton>
      </View>
    </View>
  );
});
