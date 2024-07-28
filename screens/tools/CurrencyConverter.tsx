import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];

const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110,
  AUD: 1.4,
  CAD: 1.25,
  CHF: 0.91,
  CNY: 6.45,
  SEK: 8.6,
  NZD: 1.5,
};

const CurrencyConverterScreen: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const result = (value * exchangeRates[toCurrency]) / exchangeRates[fromCurrency];
      setConvertedValue(result.toFixed(2));
    }
  };

  const currencyOptions = currencies.map(currency => ({ key: currency, label: currency }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter value"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <ModalSelector
        data={currencyOptions}
        initValue={fromCurrency}
        onChange={(option) => setFromCurrency(option.key)}
        style={styles.picker}
        selectTextStyle={styles.pickerText}
        overlayStyle={styles.pickerOverlay}
        optionTextStyle={styles.pickerOptionText}
        cancelTextStyle={styles.pickerCancelText}
        selectStyle={styles.pickerSelect}
      />
      <Text style={styles.text}>To</Text>
      <ModalSelector
        data={currencyOptions}
        initValue={toCurrency}
        onChange={(option) => setToCurrency(option.key)}
        style={styles.picker}
        selectTextStyle={styles.pickerText}
        overlayStyle={styles.pickerOverlay}
        optionTextStyle={styles.pickerOptionText}
        cancelTextStyle={styles.pickerCancelText}
        selectStyle={styles.pickerSelect}
      />
      <TouchableOpacity style={styles.button} onPress={handleConvert}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
      {convertedValue !== '' && <Text style={styles.result}>{convertedValue}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#1DB954',
    fontSize: 34,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: 'black'
  },
  result: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  pickerText: {
    color: 'white',
    fontSize: 16,
  },
  pickerSelect: {
    borderWidth: 1,
    borderColor: '#1DB954',
    borderRadius: 5,
    padding: 10,
  },
  pickerOptionText: {
    color: 'black',
    fontSize: 16,
  },
  pickerCancelText: {
    color: '#1DB954',
    fontSize: 16,
  },
  pickerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default CurrencyConverterScreen;