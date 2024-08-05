import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import ToolScreen from './screens/ToolScreen';
import GuidesScreen from './screens/GuidesScreen';

import { ThemeContext } from './screens/ThemeContext'; // Import only ThemeContext

const Tab = createBottomTabNavigator();

const Navigation: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Tools':
                iconName = 'hammer';
                break;
              case 'Guides':
                iconName = 'book';
                break;
              case 'Settings':
                iconName = 'settings';
                break;
              default:
                iconName = 'home';
            }

            return (
              <Ionicons
                name={iconName}
                size={theme.iconSize || size}
                color={focused ? theme.iconActiveColor : theme.iconColor}
              />
            );
          },
          tabBarActiveTintColor: theme.activeTintColor,
          tabBarInactiveTintColor: theme.inactiveTintColor,
          tabBarStyle: theme.tabBarStyle,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tools" component={ToolScreen} />
        <Tab.Screen name="Guides" component={GuidesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;