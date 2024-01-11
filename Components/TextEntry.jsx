import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

const TextEntry = ({
  item,
  index,
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
    <View className="mx-5">
      <Text style={styles.question} className=" mt-1">
        {item.text}
      </Text>
      <View
        className="flex flex-row text-base justify-between p-2 mb-3 bg-[#a9c0e8] focus:bg-[#699fff] rounded-lg"
        style={[
          styles.container,
          showResults &&
            givenAnswers[index].toLowerCase().trim() ===
              item.correctAnswer.toLowerCase() &&
            styles.correctAnswer,
          showResults &&
            givenAnswers[index].toLowerCase().trim() !==
              item.correctAnswer.toLowerCase() &&
            styles.wrongAnswer,
        ]}
      >
        <TextInput
          className="text-base"
          key={String(textInputKey)}
          onChangeText={handleTextInputChange}
          placeholder="Enter your answer here"
          placeholderTextColor="#676b99"
          style={styles.input}
          editable={!showResults}
          selectTextOnFocus={!showResults}
          value={textInputValue}
        />
      </View>
    </View>
  );
};

export default TextEntry;

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    borderColor: "#e8e8e8",
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 6,
  },
  correctAnswer: {
    borderColor: "green",
  },
  wrongAnswer: {
    borderColor: "red",
  },
  input: {},
});
