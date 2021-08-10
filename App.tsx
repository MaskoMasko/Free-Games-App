import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import { HomeScreen } from "./screens/HomeScreen";
import { FavoritesScreen } from "./screens/FavoriteMoviesScreen";
import { MovieDetailsScreen } from "./screens/MovieDetailsScreen";
import { FilterMoviesScreen } from "./screens/FilterMoviesScreen";

const queryClient = new QueryClient();

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                  <Drawer.Screen
                    name="Filter"
                    component={FilterMoviesScreen}
                  ></Drawer.Screen>
                </Drawer.Navigator>
              );
            }}
          </Stack.Screen>
          <Stack.Screen
            name="Details"
            component={MovieDetailsScreen}
            options={{ title: "Movie Details" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
