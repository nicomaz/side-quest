import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import MultipleChoice from "../Components/MultipleChoice";

const SingleQuest = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { props } = route.params;

  //TODO - get questions from firebase
  const getQuestions = () => {
    setSelectedOptions({});
    setShowResults(false);
    setQuestions([props]);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    //TODO - will need logic here for other question types
    questions.forEach((question, index) => {
      if (
        question.type === "multiple choice" &&
        question.options[selectedOptions[index] - 1] === question.correctAnswer
      ) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{item.text}</Text>

            {/* TODO - conditional rendering based on question type here -> map thru questions and sort by type */}
            <MultipleChoice
              item={item}
              index={index}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              showResults={showResults}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={showResults}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {showResults && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            You scored {score} out of {questions.length}
          </Text>
          <TouchableOpacity
            style={styles.tryAgainButton}
            onPress={getQuestions}
          >
            <Text style={styles.tryAgainButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SingleQuest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  questionContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  result: {
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  tryAgainButton: {
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});
