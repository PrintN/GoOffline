import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import FastTranslator from 'fast-mlkit-translate-text';
import { ThemeContext } from '../ThemeContext';

const TranslationTool = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('German');
  const [targetLanguage, setTargetLanguage] = useState('English');

  const { theme } = useContext(ThemeContext);

  const languages = [
    { key: 'Afrikaans', label: 'Afrikaans' },
    { key: 'Arabic', label: 'Arabic' },
    { key: 'Belarusian', label: 'Belarusian' },
    { key: 'Bulgarian', label: 'Bulgarian' },
    { key: 'Bengali', label: 'Bengali' },
    { key: 'Catalan', label: 'Catalan' },
    { key: 'Czech', label: 'Czech' },
    { key: 'Welsh', label: 'Welsh' },
    { key: 'Danish', label: 'Danish' },
    { key: 'German', label: 'German' },
    { key: 'Greek', label: 'Greek' },
    { key: 'English', label: 'English' },
    { key: 'Esperanto', label: 'Esperanto' },
    { key: 'Spanish', label: 'Spanish' },
    { key: 'Estonian', label: 'Estonian' },
    { key: 'Persian', label: 'Persian' },
    { key: 'Finnish', label: 'Finnish' },
    { key: 'French', label: 'French' },
    { key: 'Irish', label: 'Irish' },
    { key: 'Galician', label: 'Galician' },
    { key: 'Gujarati', label: 'Gujarati' },
    { key: 'Hebrew', label: 'Hebrew' },
    { key: 'Hindi', label: 'Hindi' },
    { key: 'Croatian', label: 'Croatian' },
    { key: 'Haitian', label: 'Haitian' },
    { key: 'Hungarian', label: 'Hungarian' },
    { key: 'Indonesian', label: 'Indonesian' },
    { key: 'Icelandic', label: 'Icelandic' },
    { key: 'Italian', label: 'Italian' },
    { key: 'Japanese', label: 'Japanese' },
    { key: 'Georgian', label: 'Georgian' },
    { key: 'Kannada', label: 'Kannada' },
    { key: 'Korean', label: 'Korean' },
    { key: 'Lithuanian', label: 'Lithuanian' },
    { key: 'Latvian', label: 'Latvian' },
    { key: 'Macedonian', label: 'Macedonian' },
    { key: 'Marathi', label: 'Marathi' },
    { key: 'Malay', label: 'Malay' },
    { key: 'Maltese', label: 'Maltese' },
    { key: 'Dutch', label: 'Dutch' },
    { key: 'Norwegian', label: 'Norwegian' },
    { key: 'Polish', label: 'Polish' },
    { key: 'Portuguese', label: 'Portuguese' },
    { key: 'Romanian', label: 'Romanian' },
    { key: 'Russian', label: 'Russian' },
    { key: 'Slovak', label: 'Slovak' },
    { key: 'Slovenian', label: 'Slovenian' },
    { key: 'Albanian', label: 'Albanian' },
    { key: 'Swedish', label: 'Swedish' },
    { key: 'Swahili', label: 'Swahili' },
    { key: 'Tamil', label: 'Tamil' },
    { key: 'Telugu', label: 'Telugu' },
    { key: 'Thai', label: 'Thai' },
    { key: 'Tagalog', label: 'Tagalog' },
    { key: 'Turkish', label: 'Turkish' },
    { key: 'Ukrainian', label: 'Ukrainian' },
    { key: 'Urdu', label: 'Urdu' },
    { key: 'Vietnamese', label: 'Vietnamese' },
    { key: 'Chinese', label: 'Chinese' },
  ];

  useEffect(() => {
    const prepareLanguages = async () => {
      try {
        console.log('Preparing language models...');
        await FastTranslator.prepare({
          source: sourceLanguage,
          target: targetLanguage,
          downloadIfNeeded: true,
        });
        console.log('Language models prepared.');
      } catch (error) {
        console.error('Preparation error: ', error);
      }
    };

    prepareLanguages();
  }, [sourceLanguage, targetLanguage]);

  const translateTextHandler = async () => {
    try {
      const translation = await FastTranslator.translate(inputText, sourceLanguage, targetLanguage);
      setTranslatedText(translation);
    } catch (error) {
      console.error('Translation error: ', error);
    }
  };

  return (
    <View style={theme.containerTranslation}>
      <ModalSelector
        data={languages}
        initValue={sourceLanguage}
        onChange={(option) => setSourceLanguage(option.key)}
        style={theme.selectorTranslation}
        selectTextStyle={theme.selectTextTranslation}
      />
      <Text style={theme.textTranslation}>To</Text>
      <ModalSelector
        data={languages}
        initValue={targetLanguage}
        onChange={(option) => setTargetLanguage(option.key)}
        style={theme.selectorTranslation}
        selectTextStyle={theme.selectTextTranslation}
      />
      <TextInput
        style={theme.inputTranslation}
        placeholder="Enter text to translate"
        value={inputText}
        onChangeText={setInputText}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={theme.buttonTranslation} onPress={translateTextHandler}>
        <Text style={theme.buttonTextTranslation}>Translate</Text>
      </TouchableOpacity>
      <Text style={theme.translatedTextTranslation}>{translatedText}</Text>
    </View>
  );
};

export default TranslationTool;