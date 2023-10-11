import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Model from 'react-native-modal'
import { IconIon } from '../../constants/icons'


type RestaurantMenuType = {
  items: string[]
  isVisible:boolean,
  closeModel: React.Dispatch<React.SetStateAction<boolean>>,
}

const RestaurantMenu = ({ items, isVisible, closeModel }: RestaurantMenuType) => {

  return (
    <Model
      isVisible={isVisible}
      backdropOpacity={0.2}
      swipeThreshold={50}
      animationIn={"fadeInUp"}
      onBackdropPress={() => closeModel(!isVisible)}
      style={{ margin: 0, marginTop: 10, justifyContent: 'flex-end' }}

    >
      <TouchableOpacity className='flex justify-center mb-5 items-center' onPress={() => closeModel(!isVisible)} >
        <IconIon name="close-circle" size={52} color="#3f3f46" />
      </TouchableOpacity>

      <View className='rounded-t-3xl bg-white  w-full h-auto space-y-2  py-5'>
        <FlatList 
          data={items}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity className='flex-row  justify-between  items-center px-7 '>
              <Text className='text-gray-800 text-lg '>{item}</Text>
              <Text className='text-gray-800 text-lg'>9</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
    </Model>
  )
}

export default RestaurantMenu