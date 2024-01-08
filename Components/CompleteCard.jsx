import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


const CompleteCard = () => {
  return (
    <View>
        <Text>Congratulations! You have officially completed SideQuest! Your journey is at its end...or is it?</Text>
        
    </View>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.6)', //the last number is for transparency incase you want to change it
      padding: 20,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000',
      alignItems: 'center',
      padding: 20,
      width: '80%', 
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

export default CompleteCard