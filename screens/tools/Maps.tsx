import { useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext, standardTheme, darkTheme, lightTheme } from '../ThemeContext'; // Import themes

const OfflineMap = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <View style={theme.container}>
    <Text style={theme.textMaps}>Maps (Coming Soon)</Text>
  </View>
  );
  };

export default OfflineMap;