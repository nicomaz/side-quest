import { View, Text } from 'react-native'
import React from 'react'

export default function SmallQuestCard({quest}) {

  return (
    <View className="bg-[#f2272b] w-40 h-32 rounded-lg mb-6 mx-1 mt-2 p-3">
      <Text className="text-lg text-white font-bold">{quest.title}</Text>
    </View>
  )
}