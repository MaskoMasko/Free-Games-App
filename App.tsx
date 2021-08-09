import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "./screens/HomeScreen";
import { FavoritesScreen } from "./screens/FavoriteMoviesScreen";
import { MovieDetailsScreen } from "./screens/MovieDetailsScreen";

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DrawerStack" options={{ headerShown: false }}>
          {() => {
            return (
              <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: "Movies go YES" }}
                />
                <Drawer.Screen
                  name="Favorites"
                  component={FavoritesScreen}
                ></Drawer.Screen>
              </Drawer.Navigator>
            );
          }}
        </Stack.Screen>
        <Stack.Screen
          name="Movie Details"
          component={MovieDetailsScreen}
          options={{ title: "Movie Details" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
