import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import SampleScreen from './screens/SampleScreen'
import SortableListScreen from './screens/SortableListScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sample" component={SampleScreen} />
        <Stack.Screen name="SortableList" component={SortableListScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

