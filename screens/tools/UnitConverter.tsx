import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const units = {
  length: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Inch', 'Foot', 'Yard', 'Mile'],
  weight: ['Kilogram', 'Gram', 'Milligram', 'Pound', 'Ounce'],
  volume: ['Liter', 'Milliliter', 'Cubic Meter', 'Cubic Centimeter', 'Cubic Inch', 'Cubic Foot'],
};

const conversions = {
  length: {
    Meter: 1,
    Kilometer: 0.001,
    Centimeter: 100,
    Millimeter: 1000,
    Inch: 39.3701,
    Foot: 3.28084,
    Yard: 1.09361,
    Mile: 0.000621371,
  },
  weight: {
    Kilogram: 1,
    Gram: 1000,
    Milligram: 1000000,
    Pound: 2.20462,
    Ounce: 35.274,
  },
  volume: {
    Liter: 1,
    Milliliter: 1000,
    'Cubic Meter': 0.001,
    'Cubic Centimeter': 1000,
    'Cubic Inch': 61.0237,
    'Cubic Foot': 0.0353147,
  },
};

const UnitConverterScreen: React.FC = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('Meter');
  const [toUnit, setToUnit] = useState('Kilometer');
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const result = (value * conversions[category][fromUnit]) / conversions[category][toUnit];
      setConvertedValue(result.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>

      <ModalSelector
        data={Object.keys(units).map((key) => ({ key, label: key.charAt(0).toUpperCase() + key.slice(1) }))}
        initValue="Select Category"
        onChange={(option) => setCategory(option.key)}
        style={styles.picker}
        cancelTextStyle={styles.pickerCancelText}
        optionTextStyle={styles.pickerOptionText}
        overlayStyle={styles.pickerOverlay}
      >
        <Text style={styles.pickerText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
      </ModalSelector>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter value"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />

      <ModalSelector
        data={units[category].map((unit) => ({ key: unit, label: unit }))}
        initValue="Select To Unit"
        onChange={(option) => setToUnit(option.key)}
        style={styles.picker}
        cancelTextStyle={styles.pickerCancelText}
        optionTextStyle={styles.pickerOptionText}
        overlayStyle={styles.pickerOverlay}
      >
        <Text style={styles.pickerText}>{toUnit}</Text>
      </ModalSelector>
      <Text style={styles.text}>To</Text>
      <ModalSelector
        data={units[category].map((unit) => ({ key: unit, label: unit }))}
        initValue="Select From Unit"
        onChange={(option) => setFromUnit(option.key)}
        style={styles.picker}
        cancelTextStyle={styles.pickerCancelText}
        optionTextStyle={styles.pickerOptionText}
        overlayStyle={styles.pickerOverlay}
      >
        <Text style={styles.pickerText}>{fromUnit}</Text>
      </ModalSelector>

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
    borderWidth: 1,
    borderColor: '#1DB954',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  pickerText: {
    color: 'black',
    fontSize: 16,
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

export default UnitConverterScreen;