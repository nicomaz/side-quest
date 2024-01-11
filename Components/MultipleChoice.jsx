import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

const MultipleChoice = ({
  item,
  index,
  selectedOptions,
  setSelectedOptions,
  showResults,
}) => {
  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    });
  };

  return (
    <View className="mx-5">
      <Text style={styles.question}>{item.text}</Text>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions[index] === 1 && styles.selectedOptions,
          showResults && selectedOptions[index] === 1 && styles.correctOption,
          showResults &&
            selectedOptions[index] === 1 &&
            item.options[selectedOptions[index] - 1] !== item.correctAnswer &&
            styles.wrongOption,
        ]}
        onPress={() => handleOptionSelect(index, 1)}
        disabled={showResults}
      >
        <Text>
          {item.options[0]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions[index] === 2 && styles.selectedOptions,
          showResults && selectedOptions[index] === 2 && styles.correctOption,
          showResults &&
            selectedOptions[index] === 2 &&
            item.options[selectedOptions[index] - 1] !== item.correctAnswer &&
            styles.wrongOption,
        ]}
        onPress={() => handleOptionSelect(index, 2)}
        disabled={showResults}
      >
        <Text>
          {item.options[1]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions[index] === 3 && styles.selectedOptions,
          showResults && selectedOptions[index] === 3 && styles.correctOption,
          showResults &&
            selectedOptions[index] === 3 &&
            item.options[selectedOptions[index] - 1] !== item.correctAnswer &&
            styles.wrongOption,
        ]}
        onPress={() => handleOptionSelect(index, 3)}
        disabled={showResults}
      >
        <Text>
          {item.options[2]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedOptions[index] === 4 && styles.selectedOptions,
          showResults && selectedOptions[index] === 4 && styles.correctOption,
          showResults &&
            selectedOptions[index] === 4 &&
            item.options[selectedOptions[index] - 1] !== item.correctAnswer &&
            styles.wrongOption,
        ]}
        onPress={() => handleOptionSelect(index, 4)}
        disabled={showResults}
      >
        <Text>
          {item.options[3]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MultipleChoice;

const styles = StyleSheet.create({
  option: {
    backgroundColor: "#eee",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#6D93D6",
  },
  selectedOptions: {
    backgroundColor: "#6D93D6",
    color: "white",
  },
  correctOption: {
    backgroundColor: "#59BA59",
  },
  wrongOption: {
    backgroundColor: "#F56262",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
