import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

const TextEntry = ({
  item,
  index,
  givenAnswer,
  givenAnswers,
  setGivenAnswers,
  showResults,
  textInputKey,
}) => {
  const [textInputValue, setTextInputValue] = useState("");

  useEffect(() => {
    setTextInputValue("");
  }, [textInputKey]);

  const handleTextInputChange = (input) => {
    const updatedGivenAnswers = [...givenAnswers];
    updatedGivenAnswers[index] = input;
    setGivenAnswers(updatedGivenAnswers);
    setTextInputValue(input);
  };

  return (
    <>
      <Text style={styles.question}>{item.text}</Text>
      <View
        style={[
          styles.container,
          showResults &&
            givenAnswers[index].toLowerCase().trim() === item.correctAnswer.toLowerCase() &&
            styles.correctAnswer,
          showResults &&
            givenAnswers[index].toLowerCase().trim() !== item.correctAnswer.toLowerCase() &&
            styles.wrongAnswer,
        ]}
      >
        <TextInput
          key={String(textInputKey)}
          onChangeText={handleTextInputChange}
          placeholder="Enter your answer here"
          style={styles.input}
          editable={!showResults}
          selectTextOnFocus={!showResults}
          value={textInputValue}
        />
      </View>
    </>
  );
};

export default TextEntry;

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  container: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  correctAnswer: {
    borderColor: "green",
  },
  wrongAnswer: {
    borderColor: "red",
  },
  input: {},
});
