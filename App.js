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
import QuizComponent from "./app/QuizComponent";
import Options from "./app/Options";

const image = {
  uri: "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
};

const App = () => {
  const [result, setResult] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fillAnimation = useRef(new Animated.Value(0)).current;

  const handleClick = () => {
    setShowContent(!showContent);
    setIsSubmitting(true);

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

  const Optdata = ["Taj Mahal", "Qutub Minar", "Jantar Mantar"];

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.imageShadow}>
          {/* <Text style={styles.text}>Inside</Text> */}
          <View style={{ flex: 0.5 }}>
            <QuizComponent />
          </View>
          {showContent || (
            <View style={{ flex: 0.45 }}>
              <Options />
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
                        width: fillAnimation.interpolate({
                          inputRange: [0, 100],
                          outputRange: ["0%", "100%"],
                        }),
                        height: 40,
                        backgroundColor: "green",
                      }}
                    />
                  </View>
                ))}
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
});

export default App;
