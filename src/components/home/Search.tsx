import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { IconFontawsm } from '../../constants/icons'


type SearchType = {
  placeholder:string
}

export const Search = ({ placeholder }: SearchType) => {
  return (
    <View className='flex-row bg-white justify-center items-center mx-1 px-3 rounded-xl  shadow-xl  '>
      <IconFontawsm name='search' size={22} color="#ef4444" />
      <TextInput
        className='py-2 px-3 bg-white rounded-xl text-lg w-11/12 '
        placeholder={placeholder}
      />
    </View>
  )
}

export default Search