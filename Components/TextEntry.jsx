import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

const TextEntry = ({
  item,
  index,
  givenAnswer,
  setGivenAnswer,
  showResults,
}) => {
  return (
    <>
      <Text style={styles.question}>{item.text}</Text>
      <View
        style={[
          styles.container,
          showResults &&
            givenAnswer === item.correctAnswer &&
            styles.correctAnswer,
          showResults &&
            givenAnswer !== item.correctAnswer &&
            styles.wrongAnswer,
        ]}
      >
        <TextInput
          onChangeText={(input) => setGivenAnswer(input)}
          placeholder="Enter your answer here"
          style={styles.input}
          editable={!showResults}
          selectTextOnFocus={!showResults}
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
