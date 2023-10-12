import React from "react";
import { View, Button, StyleSheet } from "react-native";
export default function QuizStart({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Start the Quiz"
        onPress={() => navigation.navigate("Submit")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
