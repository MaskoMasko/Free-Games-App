import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";
import { CustomButton } from "./CustomButton";

export const ActorList = ({ navigation, data }: any) => {
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
            store.setPagination("actors", "decrease");
          }}
        ></CustomButton>
        <Text style={styles.pageNumber}>{store.actorsPageNumber}</Text>
        <CustomButton
          title="Next Page"
          color="white"
          backgroundColor="orange"
          onPress={() => {
            // toTop();
            store.setPagination("actors", "increase");
          }}
        ></CustomButton>
      </View>
    </View>
  );
};
