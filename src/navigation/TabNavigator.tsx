import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DineInScreen from '../Screens/DineInScreen'
import HomeScreen from '../Screens/HomeScreen'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { IconEntypo, IconMat } from '../constants/icons'
import HomeStack from './HomeStack'


import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { CompositeNavigationProp } from '@react-navigation/native'
import { HomeStackParamList } from './HomeStack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ResturantTopTabNav from './ResturantTopTabNav'



// export type TabStackParamsList = {
//   Home: undefined,
//   DineIn: undefined
// }

// const TabNavigator = () => {
//   const Tab = createBottomTabNavigator<TabStackParamsList>()
//   const navigation = useNavigation()


//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: false
//     })
//   }, [])


//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarActiveTintColor: "#dc2626",
//         tabBarInactiveTintColor: "gray",

//         tabBarIcon: ({ focused, color, size }) => {
//           if (route.name === 'Home') {
//             return <IconEntypo name="home" size={32} color={focused ? "#dc2626" : "gray"}/>
//           } else if (route.name === 'DineIn') {
//             return <IconMat name="dinner-dining" size={32} color={focused ? "#dc2626" : "gray"} />
//           }
//         }
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="DineIn" component={DineInScreen}/>
//     </Tab.Navigator>
//   )
// }

// export default TabNavigator


export type TabStackParamsList = {
  Delivery: undefined,
  DineIn: undefined
}


export type DeliveryScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, 'Delivery'>,
  NativeStackNavigationProp<HomeStackParamList>
  >



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

        tabBarStyle:((route)=> {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ""
          const routeNameList = ["RestaurantScreen", "UserScreen", "CheckoutScreen"]
          // console.log("routeName -------- ", routeName)
          if (routeNameList.includes(routeName)) {
            return { display: 'none'}
          }
          return 
        })(route),

        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Delivery') {
            return <IconMat name="delivery-dining" size={42} color={focused ? "#dc2626" : "gray"} />

          } else if (route.name === 'DineIn') {
            return <IconMat name="dinner-dining" size={42} color={focused ? "#dc2626" : "gray"} />
          }
        }
      })}
    >
      <Tab.Screen name="Delivery" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="DineIn" component={DineInScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator

