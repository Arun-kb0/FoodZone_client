import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const Stack = createNativeStackNavigator()
  
  return (
    <NavigationContainer>
     <RootNavigator/>
    </NavigationContainer>
  );
}
