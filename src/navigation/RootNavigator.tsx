import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp, NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator, { TabStackParamsList } from './TabNavigator'
import RestaurantScreen from '../Screens/RestaurantScreen'
import { restaurantType } from '../constants/constantTypes'
import CheckoutScreen from '../Screens/CheckoutScreen'
import LoginScreen from '../Screens/LoginScreen'
import SignUpScreen from '../Screens/SignUpScreen'
import UserScreen from '../Screens/UserScreen'
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native'



import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeStackParamList } from './HomeStack'



// export type RootStackParamList = {
//   Main: undefined,
//   RestaurantScreen: { restaurant: restaurantType }
//   CheckoutScreen: { restaurantName: string }
//   LoginScreen: undefined,
//   SignUpScreen: undefined,
//   UserScreen:undefined,
// }



// const RootNavigator = () => {

//   const RootStack = createNativeStackNavigator<RootStackParamList>()

//   return (
//     <RootStack.Navigator>

//       <RootStack.Group>
//         <RootStack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
//         <RootStack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: true }} />
//         <RootStack.Screen name="Main" component={TabNavigator} />
//       </RootStack.Group>

//       {/* home group */}
//       <RootStack.Group
//         screenOptions={{
//           presentation: "modal",
//           animation: "slide_from_right"
//         }}
//       >
//         <RootStack.Screen name="RestaurantScreen" component={RestaurantScreen} />
//         <RootStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
//         <RootStack.Screen name="UserScreen" component={UserScreen} options={{ animation: "default" }} />
//       </RootStack.Group>



//     </RootStack.Navigator>
//   )
// }

// export default RootNavigator



export type RootStackParamList = {
  Main: undefined,
  SignUpScreen: undefined,
  LoginScreen: undefined,
}


export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>




const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <RootStack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: true }} />
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootNavigator