import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const GuessTheNumberScreen: React.FC = () => {
  const [numberToGuess, setNumberToGuess] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber)) {
      setMessage('Please enter a valid number');
      return;
    }
    if (guessNumber < numberToGuess) {
      setMessage('Too low!');
    } else if (guessNumber > numberToGuess) {
      setMessage('Too high!');
    } else {
      setMessage('Correct! You guessed the number!');
      setNumberToGuess(Math.floor(Math.random() * 100) + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter your guess"
        value={guess}
        onChangeText={setGuess}
      />
      <TouchableOpacity style={styles.button} onPress={handleGuess}>
        <Text style={styles.buttonText}>Submit Guess</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { fontSize: 34, color: '#1DB954', marginBottom: 20, fontWeight: 'bold' },
  input: { backgroundColor: 'white', padding: 10, marginBottom: 20, width: '80%', borderRadius: 5, color: 'black' },
  message: { color: 'white', fontSize: 20 },
  button: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default GuessTheNumberScreen;