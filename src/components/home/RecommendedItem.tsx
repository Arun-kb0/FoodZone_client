import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ClockIcon } from 'react-native-heroicons/solid'


type RecommentedItemType = {
  restaurantName:string,
  restaurantType: string
  deliveryDelay: string ,
  imageUrl: string
}

const RecommendedItem = ({ restaurantName, restaurantType, deliveryDelay, imageUrl }: RecommentedItemType) => {
  return (
    <TouchableOpacity className='w-52 h-28 mx-2 mb-2 bg-white rounded-2xl  shadow-xl flex-row '>
      <Image
        source={{ uri: imageUrl }}
        className='w-3/6 h-auto rounded-l-2xl'
      />
      <View className='flex justify-center w-3/6 overflow-hidden whitespace-no-wrap truncate px-2 py-1 space-y-2 '>
        <Text className='text-sm first-letter:{uppercase} text-gray-700 font-semibold '>{restaurantName}</Text>
        <Text className='text-xs text-gray-500  first-letter:{uppercase}'>{ restaurantType}</Text>

        <View className='flex-row space-x-1'>
          <ClockIcon size={20} color="gray" />
          <Text className='text-gray-500 text-xs'>{`${deliveryDelay} min`}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

export default RecommendedItem