import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DineInScreen from '../Screens/DineInScreen'
import HomeScreen from '../Screens/HomeScreen'
import { useNavigation } from '@react-navigation/native'
import { BuildingOffice2Icon, BuildingStorefrontIcon, HomeIcon } from 'react-native-heroicons/solid'


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
            return <HomeIcon size={32} color={focused ? "#dc2626" : "gray"} />
          } else if (route.name === 'DineIn') {
            return <BuildingStorefrontIcon size={32} color={focused ? "#dc2626" : "gray"} />
          }
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="DineIn" component={DineInScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default TabNavigator