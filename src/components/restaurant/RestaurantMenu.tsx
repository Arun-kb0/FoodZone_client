import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Model from 'react-native-modal'
import { XCircleIcon } from 'react-native-heroicons/solid'

type RestaurantMenuType = {
  items: string[]
  isVisible:boolean,
  closeModel: React.Dispatch<React.SetStateAction<boolean>>
}

const RestaurantMenu = ({ items,isVisible,closeModel }: RestaurantMenuType) => {

  return (
    <Model
      isVisible={isVisible}
      backdropOpacity={0.2}
      swipeThreshold={50}
      animationIn={"fadeInUp"}
      style={{ margin: 0, marginTop: 10, justifyContent: 'flex-end' }}

    >
      <TouchableOpacity className='flex justify-center mb-5 items-center' onPress={() => closeModel(!isVisible)} >
        <XCircleIcon size={52} color="#3f3f46" />
      </TouchableOpacity>

      <View className='rounded-t-3xl bg-white  w-full h-auto space-y-2  py-5'>
        {items.map((item, i) => (
          <TouchableOpacity key={i} className='flex-row  justify-between  items-center px-7 '>
            <Text className='text-gray-800 text-lg '>{item}</Text>
            <Text className='text-gray-800 text-lg'>9</Text>
          </TouchableOpacity>
        ))}
      </View>
      
    </Model>
  )
}

export default RestaurantMenu