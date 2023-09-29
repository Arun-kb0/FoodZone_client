import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconAntD,IconEntypo,IconMat, } from '../../constants/icons'
import { useNavigation } from '@react-navigation/native'
import { customeNavigateProp } from '../../constants/constantTypes'

const RestaurantTopBar = () => {

  const navigation = useNavigation<customeNavigateProp>()

  return (
    <View className='absolute z-50 bg-white w-full rounded-xl py-2 px-1 flex-row items-center justify-between  '>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <IconEntypo name='chevron-left' size={30} color={'#334155'} />
      </TouchableOpacity>

      <View className='flex-row space-x-1 px-1'>
        <TouchableOpacity>
          <IconAntD name="search1" size={30} color="#334155" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconMat name="favorite-border" size={30} color="#334155" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconMat name="more-vert" size={30} color="#334155" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default RestaurantTopBar