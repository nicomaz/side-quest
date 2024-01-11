import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import TriviaForCompletedQuest from "./TriviaForCompletedQuest";

const CompleteQuestTriviaModal = ({ isVisible, onClose, quest, onModalClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={async () => {
        await onClose(); 
        await onModalClose(); 
      }}
    >
      <View className="h-screen">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent} className="p-5">
            <TriviaForCompletedQuest quest={quest} />
            <TouchableOpacity
              className="bg-[#344c76] p-2 m-2 rounded-xl"
              style={styles.closeAndContinueButton}
              onPress={onClose}
            >
              <Text style={styles.closeAndContinueButtonText}>
                Begin Next Quest
              </Text>
            </TouchableOpacity>
          </View>
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
