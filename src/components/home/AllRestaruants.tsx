import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ListHeading from '../basic/ListHeading'
import { ClockIcon, MinusCircleIcon } from 'react-native-heroicons/solid'



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


const AllRestaruants = () => {
  return (
    <ScrollView className='mt-3'>
      <ListHeading title='All restaruants' />


      <View className='flex justify-center items-center'>
        {
          recomentedData.map((restaurant) => (
            <RestaruantCard
              key={restaurant.id}
              restaurantName={restaurant.restaurantName}
              restaurantType={restaurant.restaurantType}
              deliveryDelay={restaurant.deliveryDelay}
              imageUrl={restaurant.imageUrl}
            />
          ))
        }
      </View>

    </ScrollView>
  )
}

export default AllRestaruants




type restaruantCardType = {
  restaurantName: string,
  restaurantType: string
  deliveryDelay: string,
  imageUrl: string,
  kilometer?: number,

}

const RestaruantCard = ({ restaurantName, restaurantType, deliveryDelay, imageUrl }: restaruantCardType) => {

  return (
    <TouchableOpacity className='h-52 w-11/12 pb-2 bg-white rounded-2xl shadow-xl mb-4 space-x-4'>
      <Image
        source={{ uri: imageUrl }}
        className='w-full h-4/6 rounded-t-2xl '
      />
      <Text className='text-lg font-semibold text-gray-700'>{restaurantName}</Text>

      <View className='flex-row items-center space-x-2'>
        <Text className='text-slate-500'>{restaurantType}</Text>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
        <Text className='text-slate-500'>{restaurantType}</Text>
      </View>

      <View className='flex-row space-x-2 items-center'>
        <View className='flex-row space-x-1'>
          <ClockIcon size={22} color="gray" />
          <Text className='text-slate-500'>{`${deliveryDelay} min`}</Text>
        </View>
        <View className=' bg-slate-600 w-1.5 h-1.5 rounded-full '></View>
        <Text className='text-slate-500'>{`9 km`}</Text>
      </View>
    </TouchableOpacity>
  )
}


