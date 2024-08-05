import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './Navigation';
import { ThemeProvider } from './screens/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
