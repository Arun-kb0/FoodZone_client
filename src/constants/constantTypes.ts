import { CompositeNavigationProp } from "@react-navigation/native"
import { TabStackParamsList } from "../navigation/TabNavigator"
import { RootStackParamList } from "../navigation/RootNavigator"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"


// * navigation type for home
export type customeNavigateProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>

// * Restaruant object Type
export type RestaruantType = {
  id: number,
  restaurantName: string,
  restaurantType: string,
  deliveryDelay: string,
  imageUrl: string
}


// * menuType
export type menuType = {
  _id:string,
  dishName: string,
  imageUrl: string,
  timeStamp: Date
}