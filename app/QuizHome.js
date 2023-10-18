import React from "react";
import QuizStart from "./QuizStart";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Submit from "./Submit";
export default function QuizHome() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="QuizStart"
          component={QuizStart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Submit"
          component={Submit}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
