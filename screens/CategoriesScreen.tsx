import { NavigationProp } from "@react-navigation/core";
import React from "react";
import { Text, View } from "react-native";
import { CategoriesList } from "../components/CategoriesList";
import { styles } from "../styles/styles";

export const CategoriesScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  return (
    <View>
      <Text style={styles.mainHeader}>Categories</Text>
      <CategoriesList navigation={navigation}></CategoriesList>
    </View>
  );
};
