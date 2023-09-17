import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'

export default function Search() {
  return (
    <View className='flex-row bg-white justify-between items-center mx-4 px-2  rounded-xl absolute z-50 top-20'>
      <TextInput
        className='py-2 px-4 bg-white rounded-xl text-lg w-11/12 '
        placeholder='Search'
      />
      <MagnifyingGlassIcon size={22} color="gray"/>
    </View>
  )
}

const styles = StyleSheet.create({})