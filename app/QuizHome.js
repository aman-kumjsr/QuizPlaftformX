import React from "react";
import { Button, View } from "react-native";
import QuizStart from "./QuizStart";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Submit from "./Submit";
import QuizComponent from "./QuizComponent";
export default function QuizHome() {
  const Stack = createNativeStackNavigator();
  return (
    // <View>
    //   <Button title="Start the Quiz" />
    // </View>
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
        {/* <Stack.Screen name="QuizHome" component={QuizHome} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
