import { observer } from "mobx-react-lite";
import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "react-query";
import { ActorList } from "../components/ActorsList";
import { CustomButton } from "../components/CustomButton";
import { store } from "../store/MoviesStore";
import { styles } from "../styles/styles";

export const ActorsScreen = observer(({ navigation }: any) => {
  const { isLoading, isError, isIdle, data } = useQuery(
    ["Actors", store.actorsPageNumber],
    () => {
      return store.fetchAllData("fetchActors", "");
    }
  );
  if (store.actorsPageNumber == 501) {
    return (
      <View style={styles.errorAndLoadingViews}>
        <Text style={[styles.errorAndLoading, { width: 300 }]}>
          No More Data...
        </Text>
        <CustomButton
          color="white"
          backgroundColor="black"
          title="GO HOME"
          onPress={() => {
            store.setPagination("actors", "reset");
            navigation.navigate("Home");
          }}
        ></CustomButton>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.errorAndLoadingViews}>
        <Text style={styles.errorAndLoading}>Loading...</Text>
      </View>
    );
  }
  return <ActorList navigation={navigation} data={data}></ActorList>;
});
