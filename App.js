import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import SampleScreen from './screens/SampleScreen'
import SortableListScreen from './screens/SortableListScreen'
import GoogleDriveScreen from './screens/GoogleDriveScreen'
import StickyHeaderListScreen from './screens/StickyHeaderListScreen'
import ResponderScreen from './screens/ResponderScreen'
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
        <Stack.Screen name="GoogleDrive" component={GoogleDriveScreen} />
        <Stack.Screen name="StickyHeaderList" component={StickyHeaderListScreen} />
        <Stack.Screen name="Responder" component={ResponderScreen} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

