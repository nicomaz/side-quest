import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const TriviaForCompletedQuest = ({questId}) => {
    const [trivia, setTrivia] = useState(null)

    useEffect(() => {
        console.log('questId:!!!!!!!!!!!!!!!!!!!', questId)
        const fetchTrivia = async () => {
            try {
                const docRef = doc(db, 'quests', questId)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const questData = docSnap.data()
                    setTrivia(questData.trivia)
                }
            } catch (error) {
                console.error('Error fetching trivia:', error.message)
            }
        }
        fetchTrivia()
    }, [questId])
  
    return (
        <View style={styles.container}>
          {trivia ? (
            <>
              <Text style={styles.title}>Trivia for Completed Quest</Text>
              <Text style={styles.triviaText}>{trivia}</Text>
            </>
          ) : (
            <Text style={styles.loadingText}>Loading trivia...</Text>
          )}
        </View>
      );
    };

export default TriviaForCompletedQuest

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginTop: 16,
      borderWidth: 1,
      borderColor: '#e8e8e8',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    triviaText: {
      fontSize: 16,
    },
    loadingText: {
      fontSize: 16,
      fontStyle: 'italic',
    },
  });