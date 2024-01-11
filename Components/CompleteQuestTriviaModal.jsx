import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import TriviaForCompletedQuest from "./TriviaForCompletedQuest";

const CompleteQuestTriviaModal = ({ isVisible, onClose, quest, setRerender, setIsModalExited }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TriviaForCompletedQuest quest={quest}/>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeAndContinueButton}
            onPress={() => {
              onClose();
              setRerender(true)
              setIsModalExited(true) // triggers a re-render when the modal is closed
            }}
          >
            <Text style={styles.closeAndContinueButtonText}>
              Close modal and continute to nextquest all in one
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)", //the last number is for transparency incase you want to change it
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    padding: 20,
    width: "80%",
  },
  closeAndContinueButton: {
    backgroundColor: "green",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  closeAndContinueButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default CompleteQuestTriviaModal;