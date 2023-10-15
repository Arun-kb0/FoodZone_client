import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import CheckoutScreen from "../Screens/CheckoutScreen";
import RestaurantScreen from "../Screens/RestaurantScreen";
import { restaurantType } from "../constants/constantTypes";


type HomeStackParamList = {
  Home: undefined
  RestaurantScreen: { restaurant: restaurantType }
  CheckoutScreen: { restaurantName: string }
}
// ! work needed
const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack