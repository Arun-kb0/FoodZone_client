import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { IconFontawsm } from '../../constants/icons'


type SearchType = {
  placeholder: string,
  isTrasparent:boolean
}

export const Search = ({ placeholder, isTrasparent }: SearchType) => {
  return (
    <View className={`absolute w-full pt-10 pb-4 px-2 flex-row items-center  justify-around ${isTrasparent ? 'bg-transparent' : 'bg-yellow-200' } `}>
      <View className='flex-row bg-white justify-center items-center mx-1 px-3 rounded-xl  shadow-xl'>
        <IconFontawsm name='search' size={22} color="#ef4444" />
        <TextInput
          className='py-2 px-3 bg-white rounded-xl text-lg w-11/12 '
          placeholder={placeholder}
        />
      </View>
    </View>
  )
}

export default Search