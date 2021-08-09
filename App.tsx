import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "./screens/HomeScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { MovieDetailsScreen } from "./screens/MovieDetailsScreen";

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Movies go YES" component={HomeScreen} />
        <Drawer.Screen
          name="settings"
          component={SettingsScreen}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Movie Details"
          component={MovieDetailsScreen}
        ></Drawer.Screen>
      </Drawer.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
