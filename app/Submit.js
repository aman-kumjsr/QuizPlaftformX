import React, { useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

import QuizComponent from "./QuizComponent";
import Options from "./Options";

const image = {
  uri: "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
};

const Submit = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOptoin] = useState(null);
  const fillAnimation = useRef(new Animated.Value(0)).current;

  const correctOptionIndex = 0;

  handleOptionSelect = (selectedIndex) => {
    setSelectedOptoin(selectedIndex);
  };

  const handleClick = () => {
    setShowContent(!showContent); // Used not operator to set showContent value true
    setIsSubmitting(true);
    if (selectedOption === correctOptionIndex) {
      setResult("won");
    } else {
      setResult("lost");
    }

    // Configure the fill animation
    Animated.timing(fillAnimation, {
      toValue: 100,
      duration: 2000, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      // Reset animation and state after completion
      // fillAnimation.setValue(0);
      setIsSubmitting(false);
    });
  };

  const borderAimation = new useRef(new Animated.Value(0)).current;

  const Optdata = ["Taj Mahal", "Qutub Minar", "Jantar Mantar"];

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.imageShadow}>
          {/* <Text style={styles.text}>Inside</Text> */}
          <View style={{ flex: 0.5 }}>
            <QuizComponent navigation={navigation} />
          </View>
          {showContent || (
            <View style={{ flex: 0.45 }}>
              <Options
                correctOptionIndex={correctOptionIndex}
                onOptionSelect={handleOptionSelect}
              />
            </View>
          )}

          <View style={{ marginBottom: 5, flex: 0.15 }}>
            {showContent ? (
              //Display the new content here
              <View>
                {Optdata.map((item, index) => (
                  <View key={index} style={styles.opt}>
                    <Text style={{ fontSize: 15, color: "#fff", padding: 5 }}>
                      {item}
                    </Text>

                    <Animated.View
                      style={{
                        width: "100%",
                        height: 42,
                        borderWidth: 1,
                        borderColor: "#fff",
                      }}
                    >
                      <Animated.View
                        style={{
                          width: fillAnimation.interpolate({
                            inputRange: [0, 100],
                            outputRange: ["0%", "100%"],
                          }),
                          height: 40,
                          backgroundColor: "green",
                        }}
                      />
                    </Animated.View>
                  </View>
                ))}
                <View>
                  {result == "won" ? (
                    <View>
                      <Text style={styles.Congrats}>Yay!!</Text>
                      <Text style={styles.Congrats}>You are correct!</Text>
                    </View>
                  ) : (
                    <Text style={styles.Congrats}>Try Again</Text>
                  )}
                </View>
                <Text style={{ textAlign: "center" }}>
                  <Text style={{ color: "#fff", fontSize: 24 }}>
                    You Scored
                  </Text>
                  <Text style={{ color: "#4B9EF9", fontSize: 24 }}>
                    80 Points!!
                  </Text>
                </Text>
              </View>
            ) : (
              <TouchableOpacity onPress={handleClick}>
                <Text
                  style={{
                    backgroundColor: "#5F1EBE",
                    padding: 15,
                    textAlign: "center",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  imageShadow: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 20,
  },
  opt: {
    padding: 10,
  },
  Congrats: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});

export default Submit;
