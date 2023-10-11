import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Animated } from "react-native";

const Options = ({ selectedIndices }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // Sample data for the FlatList

  const data = [
    { id: "1", text: "Taj Mahal" },

    { id: "2", text: "Qutub Minar" },

    { id: "3", text: "Jantar Mantar" },

    // Add more items here
  ];

  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedItemIndex;
    // const isSelectedAnimated = selectedIndices.includes(index);

    // if (result) {
    //   return (
    //     <View>
    //       <Text>{item.text}</Text>
    //     </View>
    //   );
    // }

    return (
      <TouchableOpacity
        onPress={() => setSelectedItemIndex(index)}
        style={{
          backgroundColor: isSelected ? "white" : "rgba(0,0,0,0.6)", // Change the background color conditionally

          padding: 16,

          marginBottom: 20,

          borderWidth: 1,

          borderColor: "#fff",
        }}
      >
        <Text
          style={{
            color: isSelected ? "black" : "white",

            textAlign: "center",
          }}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={{ marginBottom: 50, border: 1 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Options;
