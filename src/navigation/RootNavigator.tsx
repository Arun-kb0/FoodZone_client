import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import RestaurantScreen from '../Screens/RestaurantScreen'
import { RestaruantType, restaurantType } from '../constants/constantTypes'

export type RootStackParamList = {
  Main: undefined,
  RestaurantScreen: {restaurant:restaurantType}
}


const RootNavigator = () => {

  const RootStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
        <RootStack.Screen name="RestaurantScreen" component={RestaurantScreen}
          options={{ headerShown:false }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootNavigator
