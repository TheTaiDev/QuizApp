import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/StartScreen";
import QuizHomeScreen from "./screens/QuizHomeScreen";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          initialRouteName="StartScreen"
        />
        <Stack.Screen name="QuizHomeScreen" component={QuizHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
