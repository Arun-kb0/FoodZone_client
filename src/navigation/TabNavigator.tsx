import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DineInScreen from '../Screens/DineInScreen'
import HomeScreen from '../Screens/HomeScreen'
import { useNavigation } from '@react-navigation/native'
import { IconEntypo, IconMat } from '../constants/icons'


export type TabStackParamsList = {
  Home: undefined,
  DineIn: undefined
}


const TabNavigator = () => {
  const Tab = createBottomTabNavigator<TabStackParamsList>()
  const navigation = useNavigation()


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#dc2626",
        tabBarInactiveTintColor: "gray",

        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <IconEntypo name="home" size={32} color={focused ? "#dc2626" : "gray"}/>
          } else if (route.name === 'DineIn') {
            return <IconMat name="dinner-dining" size={32} color={focused ? "#dc2626" : "gray"} />
          }
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="DineIn" component={DineInScreen}/>
    </Tab.Navigator>
  )
}

export default TabNavigator

