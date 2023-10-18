import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import QuizStart from "./QuizStart";

const QuizComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cancelContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("QuizStart")}>
          <Text style={styles.cancel}>&times;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            {
              fontSize: 28,
              fontWeight: "500",
              top: 120,
              lineHeight: 38,
              textAlign: "center",
            },
            styles.textContainer,
          ]}
        >
          7 Wonders
        </Text>
        <Text
          style={[
            {
              fontSize: 16,
              fontWeight: "400",
              top: 160,
              lineHeight: 26,
              textAlign: "center",
            },
            styles.textContainer,
          ]}
        >
          Which monument is the India's Seven wonder???
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
  },
  cancelContainer: {
    backgroundColor: "white",
    width: 18,
    alignItems: "flex-end",
    marginTop: 15,
    marginLeft: 300,
  },
  cancel: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    // padding: 20,
  },
});

export default QuizComponent;
