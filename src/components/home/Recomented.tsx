import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { ClockIcon } from 'react-native-heroicons/solid'
import RecommendedItem from './RecommendedItem'

import ListHeading from '../basic/ListHeading'



const recomentedData = [
  {
    id: 1,
    restaurantName: "Restaurant A",
    restaurantType: "Italian",
    deliveryDelay: "10-20",
    imageUrl: "https://images.pexels.com/photos/17216084/pexels-photo-17216084/free-photo-of-croissants-and-fruit-behind.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    restaurantName: "Restaurant B",
    restaurantType: "Mexican",
    deliveryDelay: "40-50",
    imageUrl: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    restaurantName: "Restaurant C",
    restaurantType: "Japanese",
    deliveryDelay: "20-30",
    imageUrl: "https://images.pexels.com/photos/17593640/pexels-photo-17593640/free-photo-of-food-restaurant-spoon-drinks.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    restaurantName: "Restaurant x",
    restaurantType: "Japanese",
    deliveryDelay: "10-15",
    imageUrl: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]


const Recommended = () => {
  return (
    <View className='px-1 py-2 w-auto'>

      <ListHeading title='Recomented for you' />

      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {
          recomentedData.map((restaurant) => (
            <RecommendedItem
              key={restaurant.id}
              restaurantName={restaurant.restaurantName}
              restaurantType={restaurant.restaurantType}
              deliveryDelay={restaurant.deliveryDelay}
              imageUrl={restaurant.imageUrl}
            />
          ))
        }

      </ScrollView>

    </View>
  )
}

export default Recommended 