// SingleQuest.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import MultipleChoice from "../Components/MultipleChoice";
import TextEntry from "../Components/TextEntry";
import { useNavigation } from "@react-navigation/native";

const SingleQuest = ({ route }) => {
  const navigation = useNavigation();
  const [questionsArray, setQuestionsArray] = useState([]);
  const [filteredQuestionsArray, setFilteredQuestionsArray] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [textInputKeys, setTextInputKeys] = useState([0, 1, 2]);
  const [givenAnswers, setGivenAnswers] = useState(
    Array.from({ length: textInputKeys.length }, () => "")
  );
  const { questions } = route.params;
  const { questId } = route.params;
  const { quest } = route.params;

  const getQuestions = () => {
    setSelectedOptions({});

    setGivenAnswers(Array.from({ length: textInputKeys.length }, () => ""));
    setShowResults(false);
    setQuestionsArray(questions);
    const filteredArr = questions.filter(
      (question) => question.questId === questId
    );
    setFilteredQuestionsArray(filteredArr);
    setTextInputKeys((prevKeys) => prevKeys.map((key) => key + 1));
  };

  const isAnswerCorrect = (question, index) => {
    const trimmedGivenAnswer = givenAnswers[index].trim();

    if (question.type === "multiple choice") {
      return (
        question.options[selectedOptions[index] - 1] === question.correctAnswer
      );
    } else if (question.type === "text input") {
      const trimmedCorrectAnswer = question.correctAnswer.trim();

      return (
        trimmedGivenAnswer.toLowerCase() === trimmedCorrectAnswer.toLowerCase()
      );
    } else if (question.type === "true or false") {
      return (
        trimmedGivenAnswer.toLowerCase() ===
        question.correctAnswer.toLowerCase()
      );
    }

    return false;
  };

  const handleSubmit = () => {
    let correctAnswers = 0;

    filteredQuestionsArray.forEach((question, index) => {
      if (isAnswerCorrect(question, index)) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setShowResults(true);
  };

  const handleCompleteQuest = () => {
    if(quest) {
      navigation.navigate("Home", { showModal: true, quest: quest });
    } else {
      console.error('questId is not available to singlequest')
    }
  }
    

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredQuestionsArray}
        keyExtractor={(item2, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            {/* TODO - better conditional rendering based on question type */}
            {item.type === "multiple choice" ? (
              <MultipleChoice
                item={item}
                index={index}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                showResults={showResults}
              />
            ) : (
              <TextEntry
                key={index}
                item={item}
                index={index}
                givenAnswers={givenAnswers}
                setGivenAnswers={setGivenAnswers}
                showResults={showResults}
                textInputKey={textInputKeys[index]}
              />
            )}
          </View>
        )}
      />
      {!showResults && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={showResults}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
      {showResults && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            You scored {score} out of {filteredQuestionsArray.length}
          </Text>
          <TouchableOpacity
            style={
              score === filteredQuestionsArray.length
                ? styles.completeQuestButton
                : styles.tryAgainButton
            }
            onPress={
              score === filteredQuestionsArray.length
                ? handleCompleteQuest
                : getQuestions
            }
          >
            <Text style={styles.tryAgainButtonText}>
              {score === filteredQuestionsArray.length
                ? "Complete Quest"
                : "Try Again"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

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
  completeQuestButton: {
    backgroundColor: "green",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default SingleQuest;
