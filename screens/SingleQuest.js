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
import TextEntry from "../Components/TextEntry";

//TODO - quest completion, landmarks?
const SingleQuest = ({ route }) => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [filteredQuestionsArray, setFilteredQuestionsArray] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  //TODO - could be more dynamic
  const [givenAnswer, setGivenAnswer] = useState("");
  const { questions } = route.params;
  const { questId } = route.params;

  //TODO - get questions from firebase
  const getQuestions = () => {
    setSelectedOptions({});
    setGivenAnswer("");
    setShowResults(false);
    setQuestionsArray(questions);
    const filteredArr = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].questId === questId) {
        filteredArr.push(questions[i]);
      }
    }
    setFilteredQuestionsArray(filteredArr);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    //TODO - will need logic here for other question types
    filteredQuestionsArray.forEach((question, index) => {
      if (
        question.type === "multiple choice" &&
        question.options[selectedOptions[index] - 1] === question.correctAnswer
      ) {
        correctAnswers++;
      } else if (
        question.type === "text input" &&
        givenAnswer === question.correctAnswer
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
        data={filteredQuestionsArray}
        keyExtractor={(item, index) => index.toString()}
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
                item={item}
                index={index}
                givenAnswer={givenAnswer}
                setGivenAnswer={setGivenAnswer}
                showResults={showResults}
              />
            )}
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
            You scored {score} out of {filteredQuestionsArray.length}
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
