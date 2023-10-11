import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { IconFontawsm } from '../../constants/icons'
import BackButton from '../basic/BackButton'


type DishSearchType = {
  placeholder: string
}

const DishSearch = ({ placeholder }: DishSearchType) => {
  return (
    <View className='absolute w-full pt-10 pb-2 px-2 flex-row items-center  justify-around bg-white '>
      <BackButton/>
      <View className='flex-row justify-center items-center mx-1 px-3 rounded-xl  shadow-xl w-11/12  bg-gray-200'>
        <IconFontawsm name='search' size={22} color="#ef4444" />
        <TextInput
          className='py-2 px-3 rounded-xl text-lg w-11/12 bg-gray-200'
          placeholder={placeholder}
        />
      </View>
    </View>
  )
}

export default DishSearch