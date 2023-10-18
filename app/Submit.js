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

const Submit = ({ navigation, percentages }) => {
  const [result, setResult] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const [selectedOption, setSelectedOptoin] = useState(null);

  const correctOptionIndex = 0;

  const vote1 = 54;
  const vote2 = 22;
  const vote3 = 15;
  const totalVote = vote1 + vote2 + vote3;

  const calcOptionVote = () => {
    const percentVote1 = (vote1 / totalVote) * 100;
    const percentVote2 = (vote2 / totalVote) * 100;
    const percentVote3 = (vote3 / totalVote) * 100;

    return { percentVote1, percentVote2, percentVote3 };
  };

  percentages = calcOptionVote(vote1, vote2, vote3);
  const percentageValues = Object.values(percentages);

  const fillAnimations = percentageValues.map(
    () => useRef(new Animated.Value(0)).current
  );
  for (let i = 0; i < percentageValues.length; i++) {
    fillAnimations.push(useRef(new Animated.Value(0)).current);
  }

  handleOptionSelect = (selectedIndex) => {
    setSelectedOptoin(selectedIndex);
  };

  const handleClick = () => {
    setShowContent(!showContent); // Used not operator to set showContent value true

    if (selectedOption === correctOptionIndex) {
      setResult("won");
    } else {
      setResult("lost");
    }

    // Configure the fill animation

    for (let i = 0; i < percentageValues.length; i++) {
      const percentage = percentageValues[i];
      Animated.timing(fillAnimations[i], {
        toValue: percentage,
        duration: 2000, // Adjust the duration as needed
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        // Reset animation and state after completion
        // fillAnimation.setValue(0);
      });
    }
  };

  const borderAimation = new useRef(new Animated.Value(0)).current;

  const Optdata = ["Taj Mahal", "Qutub Minar", "Jantar Mantar"];

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.imageShadow}>
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

          <View style={{ marginBottom: 30, flex: 0.15 }}>
            {showContent ? (
              //Display the new content here
              <View>
                {Object.keys(percentages).map((key, index) => (
                  <View key={index} style={styles.opt}>
                    <Text style={{ fontSize: 15, color: "#fff", padding: 5 }}>
                      {Optdata[index]}
                    </Text>

                    <Animated.View
                      style={{
                        width: "100%",
                        height: 42,
                        borderWidth: 1,
                        borderColor: "#fff",
                        position: "relative",
                      }}
                    >
                      <Animated.View
                        style={{
                          width: fillAnimations[index].interpolate({
                            inputRange: [0, 100],
                            outputRange: ["0%", "100%"],
                          }),
                          height: 40,
                          backgroundColor: "green",
                        }}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 22,
                            color: "#fff",
                            fontSize: 15,
                          }}
                        >
                          {index === 0
                            ? `${Math.ceil(percentages.percentVote1)}%` // Object percentages is used to
                              ? `${parseInt(percentages.percentVote2)}%` //  display the percent
                              : index === 1
                            : `${parseInt(percentages.percentVote3)}%`}
                          {/* {`${parseInt(
                            percentages[`percentVote${index + 1}`]
                          )}%`} */}
                        </Text>
                      </View>
                    </Animated.View>
                  </View>
                ))}
                <View>
                  {result == "won" ? (
                    <View>
                      <Text style={styles.Congrats}>Yay !!</Text>
                      <Text style={styles.Congrats}>You are correct!</Text>
                    </View>
                  ) : (
                    <Text style={styles.Congrats}>Try Again</Text>
                  )}
                </View>
                <Text style={{ textAlign: "center" }}>
                  <Text style={{ color: "#fff", fontSize: 24 }}>
                    You Scored{" "}
                  </Text>
                  <Text style={{ color: "#4B9EF9", fontSize: 24 }}>
                    80 Points
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
                    borderRadius: 5,
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
    marginBottom: 5,
  },
});

export default Submit;
