import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { ThemeContext } from '../ThemeContext';

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

  const { theme } = useContext(ThemeContext);

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const result = (value * conversions[category][fromUnit]) / conversions[category][toUnit];
      setConvertedValue(result.toString());
    }
  };

  return (
    <View style={theme.containerConverter}>
      <Text style={theme.titleConverter}>Unit Converter</Text>

      <ModalSelector
        data={Object.keys(units).map((key) => ({ key, label: key.charAt(0).toUpperCase() + key.slice(1) }))}
        initValue="Select Category"
        onChange={(option) => setCategory(option.key)}
        style={theme.pickerConverter}
        selectTextStyle={theme.pickerTextConverter}
        overlayStyle={theme.pickerOverlayConverter}
        optionTextStyle={theme.pickerOptionTextConverter}
        cancelTextStyle={theme.pickerCancelTextConverter}
        selectStyle={theme.pickerSelectConverter}
      >
        <Text style={theme.pickerTextConverter}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
      </ModalSelector>

      <TextInput
        style={theme.inputConverter}
        keyboardType="numeric"
        placeholder="Enter value"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />

      <ModalSelector
        data={units[category].map((unit) => ({ key: unit, label: unit }))}
        initValue="Select To Unit"
        onChange={(option) => setToUnit(option.key)}
        style={theme.pickerConverter}
        selectTextStyle={theme.pickerTextConverter}
        overlayStyle={theme.pickerOverlayConverter}
        optionTextStyle={theme.pickerOptionTextConverter}
        cancelTextStyle={theme.pickerCancelTextConverter}
        selectStyle={theme.pickerSelectConverter}
      >
        <Text style={theme.pickerTextConverter}>{toUnit}</Text>
      </ModalSelector>
      <Text style={theme.textConverter}>To</Text>
      <ModalSelector
        data={units[category].map((unit) => ({ key: unit, label: unit }))}
        initValue="Select From Unit"
        onChange={(option) => setFromUnit(option.key)}
        style={theme.pickerConverter}
        selectTextStyle={theme.pickerTextConverter}
        overlayStyle={theme.pickerOverlayConverter}
        optionTextStyle={theme.pickerOptionTextConverter}
        cancelTextStyle={theme.pickerCancelTextConverter}
        selectStyle={theme.pickerSelectConverter}
      >
        <Text style={theme.pickerTextConverter}>{fromUnit}</Text>
      </ModalSelector>

      <TouchableOpacity style={theme.buttonConverter} onPress={handleConvert}>
        <Text style={theme.buttonTextConverter}>Convert</Text>
      </TouchableOpacity>

      {convertedValue !== '' && <Text style={theme.resultConverter}>{convertedValue}</Text>}
    </View>
  );
};

export default UnitConverterScreen;