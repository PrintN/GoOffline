import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ThemeContext';

const GuessTheNumberScreen: React.FC = () => {
  const [numberToGuess, setNumberToGuess] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  const { theme } = useContext(ThemeContext);

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
    <View style={theme.containerGuessTheNumber}>
      <Text style={theme.titleGuessTheNumber}>Guess the Number</Text>
      <TextInput
        style={theme.inputGuessTheNumber}
        keyboardType="numeric"
        placeholder="Enter your guess"
        value={guess}
        onChangeText={setGuess}
      />
      <TouchableOpacity style={theme.buttonGuessTheNumber} onPress={handleGuess}>
        <Text style={theme.buttonTextGuessTheNumber}>Submit Guess</Text>
      </TouchableOpacity>
      <Text style={theme.messageGuessTheNumber}>{message}</Text>
    </View>
  );
};

export default GuessTheNumberScreen;