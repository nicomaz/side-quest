import { View, Text, FlatList } from 'react-native'
import React from 'react'
import QuestCard from './QuestCard'

const quests = [
    { questionId: 1, title: 'Great Fire Quest', text: 'What year did the Great Fire of London occur?', options: ['1666', '1776', '1492', '1888'], correctAnswer: '1666' },
    { questionId: 2, title: 'Tower Bridge Quest', text: 'When was Tower Bridge officially opened?', options: ['1886', '1900', '1923', '1950'], correctAnswer: '1894' },
    { questionId: 3, title: 'Covent Garden Quest', text: 'Which famous market is located in Covent Garden?', text: 'Which famous market is located in Covent Garden?', options: ['Portobello Road Market', 'Camden Market', 'Covent Garden Market', 'Borough Market'] }
]

const QuestList = () => {
    return (
        <FlatList
            data={quests}
            keyExtractor={(quest) => quest.questionId}
            renderItem={({ item }) => <QuestCard {...item} />}
        />
    )
}

export default QuestList