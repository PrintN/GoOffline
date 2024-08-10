import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ThemeContext, standardTheme, darkTheme, lightTheme } from './ThemeContext'; // Import themes

const SettingsScreen: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <View style={theme.containerSettingsScreen}>
      <Text style={theme.titleSettingsScreen}>Settings</Text>
      <Text style={theme.subtitleSettingsScreen}>Choose a Theme</Text>
      <TouchableOpacity
        style={theme.buttonSettingsScreen}
        onPress={() => setTheme(standardTheme)}
      >
        <Text style={theme.buttonTextSettingsScreen}>Standard Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={theme.buttonSettingsScreen}
        onPress={() => setTheme(darkTheme)}
      >
        <Text style={theme.buttonTextSettingsScreen}>Dark Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={theme.buttonSettingsScreen}
        onPress={() => setTheme(lightTheme)}
      >
        <Text style={theme.buttonTextSettingsScreen}>Light Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;