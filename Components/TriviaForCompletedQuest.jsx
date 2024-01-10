import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TriviaForCompletedQuest = ({ quest }) => {
    const [trivia, setTrivia] = useState(null)

    useEffect(() => {
      setTrivia(quest.trivia)
    }, [quest])
  
    return (
        <View style={styles.container}>
          {trivia ? (
            <>
              <Text style={styles.title}>Your quest is complete, you are rewarded with knowledge:</Text>
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