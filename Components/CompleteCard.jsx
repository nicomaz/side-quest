import { View, Text, Modal, TouchableOpacity, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useState } from 'react'


const CompleteCard = () => {
  const [displayModal, setDisplayModal] = useState(false)

const handleRestart = () => {
  setDisplayModal(true)
}
  return (
    <View className="bg-[#fff5ed] mx-1 px-2 rounded-xl mb-2 mt-6 p-3">
        <Text className="text-[#D01A1E] text-base mt-2 ml-2 font-bold">Congratulations! You have officially completed SideQuest! Your journey is at its end...or is it?</Text>
        <TouchableOpacity
            className="mt-2 bg-[#D01A1E] p-1 py-4 rounded-full shadow w-32 self-center"
            onPress={handleRestart}
          >
            <Text className="text-base p-1 font-bold text-center text-white">
              Start a New Journey!
            </Text>
          </TouchableOpacity>
    </View>
  )
}


export default CompleteCard