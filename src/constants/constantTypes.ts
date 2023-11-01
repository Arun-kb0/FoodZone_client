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


// * menuType
export type menuType = {
  _id:string,
  dishName: string,
  imageUrl: string,
  timeStamp: Date
}

// * restaurant type
type OpeningHoursType = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

export type restaurantType = {
  _id:string
  name: string,
  cuisine: string,
  deliveryDelay: string,
  imageUrl: string,
  distance: string,
  rating: number,
  menu:string[],
  openingHours: OpeningHoursType
  location: { lat: string, long: string }
  timeStamp: Date
}


// * dishType

export type dishType = {
  _id:string,
  dishName: string,
  description: string,
  imageUrl: string,
  price: number,
  rating: number,
  timeStamp: Date
}

export type dishesType = {
  _id: string,
  dishes: dishType[]
}


// * custom signUp type
export type customAuthResType = {
  accessToken: string,
  user: string,
  message: string,
}

