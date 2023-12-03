import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp, NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator, { TabStackParamsList } from './TabNavigator'
import LoginScreen from '../Screens/LoginScreen'
import SignUpScreen from '../Screens/SignUpScreen'
import SearchScreen from '../Screens/SearchScreen'


export type RootStackParamList = {
  Main: undefined,
  SignUpScreen: undefined,
  LoginScreen: undefined,
  SearchScreen: { placeholder :string}  | undefined
}


export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>


const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <RootStack.Screen name='SignUpScreen' component={SignUpScreen} />
        <RootStack.Screen name="Main" component={TabNavigator} />
        <RootStack.Screen name='SearchScreen' component={SearchScreen}  />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootNavigator