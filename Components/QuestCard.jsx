import { View, Text } from 'react-native'
import React from 'react'

const QuestCard = ({ title, text }) => {

    return (
        <View className="w-full bg-white rounded-lg my-5 p-5">
            <Text>{title}</Text>
            <Text>{text}</Text>
        </View>
    )
}

export default QuestCard