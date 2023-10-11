import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import {  IconFontawsm, IconIon, IconMat, } from '../../constants/icons'
import BackButton from '../basic/BackButton'


type restaurantTopBarType = {
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RestaurantTopBar = ({ setIsSearchOpen }: restaurantTopBarType) => {

  return (
    <View className='absolute bg-white w-full pt-10 pb-2 px-1 flex-row items-center  justify-between '>
      <BackButton />
      <View className='flex-row space-x-1 px-1 py-2'>
        <TouchableOpacity onPress={()=>setIsSearchOpen(prev=> !prev)}>
          <IconFontawsm name='search' size={27} color="#334155" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconIon name="heart-outline" size={30} color="#334155"/>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconMat name="more-vert" size={30} color="#334155" />
        </TouchableOpacity>
      </View>

    </View>
  )
}


export default RestaurantTopBar