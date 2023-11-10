import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import CheckoutScreen from "../Screens/CheckoutScreen";
import RestaurantScreen from "../Screens/RestaurantScreen";
import { restaurantType } from "../constants/constantTypes";
import UserScreen from "../Screens/UserScreen";


export type HomeStackParamList = {
  Home: undefined
  RestaurantScreen: { restaurant: restaurantType }
  CheckoutScreen: { restaurantName: string },
  UserScreen: undefined
}


const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>()

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        
        presentation: "modal",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} options={{ animation: "default" }} />
      <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack