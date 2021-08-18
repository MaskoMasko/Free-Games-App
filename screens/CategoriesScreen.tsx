import { NavigationProp } from "@react-navigation/core";
import React from "react";
import { CategoriesList } from "../components/CategoriesList";

export const CategoriesScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  return <CategoriesList navigation={navigation}></CategoriesList>;
};
