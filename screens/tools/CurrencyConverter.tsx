import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { ThemeContext } from '../ThemeContext';

const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
  'KRW', 'MXN', 'SGD', 'HKD', 'NOK', 'INR', 'BRL', 'RUB', 'TRY', 'ZAR'
];

const exchangeRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.77,
  JPY: 144.68,
  AUD: 1.49,
  CAD: 1.35,
  CHF: 0.87,
  CNY: 7.27,
  SEK: 10.71,
  NZD: 1.59,
  KRW: 1314.45,
  MXN: 18.06,
  SGD: 1.35,
  HKD: 7.85,
  NOK: 10.48,
  INR: 83.43,
  BRL: 5.15,
  RUB: 95.72,
  TRY: 27.20,
  ZAR: 19.25,
};

const CurrencyConverterScreen: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');

  const { theme } = useContext(ThemeContext);

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const result = (value * exchangeRates[toCurrency]) / exchangeRates[fromCurrency];
      setConvertedValue(result.toFixed(2));
    }
  };

  const currencyOptions = currencies.map(currency => ({ key: currency, label: currency }));

  return (
    <View style={theme.containerConverter}>
      <Text style={theme.titleConverter}>Currency Converter</Text>
      <TextInput
        style={theme.inputConverter}
        keyboardType="numeric"
        placeholder="Enter value"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <ModalSelector
        data={currencyOptions}
        initValue={fromCurrency}
        onChange={(option) => setFromCurrency(option.key)}
        style={theme.pickerConverter}
        selectTextStyle={theme.pickerTextConverter}
        overlayStyle={theme.pickerOverlayConverter}
        optionTextStyle={theme.pickerOptionTextConverter}
        cancelTextStyle={theme.pickerCancelTextConverter}
        selectStyle={theme.pickerSelectConverter}
      />
      <Text style={theme.textConverter}>To</Text>
      <ModalSelector
        data={currencyOptions}
        initValue={toCurrency}
        onChange={(option) => setToCurrency(option.key)}
        style={theme.pickerConverter}
        selectTextStyle={theme.pickerTextConverter}
        overlayStyle={theme.pickerOverlayConverter}
        optionTextStyle={theme.pickerOptionTextConverter}
        cancelTextStyle={theme.pickerCancelTextConverter}
        selectStyle={theme.pickerSelectConverter}
      />
      <TouchableOpacity style={theme.buttonConverter} onPress={handleConvert}>
        <Text style={theme.buttonTextConverter}>Convert</Text>
      </TouchableOpacity>
      {convertedValue !== '' && <Text style={theme.resultConverter}>{convertedValue}</Text>}
    </View>
  );
};

export default CurrencyConverterScreen;