import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './Navigation';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Navigation />
    </>
  );
};

export default App;
