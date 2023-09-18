import { View, Text } from 'react-native'
import React from 'react'



type ListHeaderType = {
  title:string
}

const ListHeading = ({ title }: ListHeaderType) => {
  return (
    <View className='flex-row justify-center items-center space-x-3 py-2'>
      <View className=' bg-slate-200 shadow-2xl h-0.5 w-2/12 '></View>
      <Text className='text-lg uppercase tracking-widest font-light text-slate-500'>{title}</Text>
      <View className=' bg-slate-200 shadow-2xl h-0.5 w-2/12 '></View>
    </View>
  )
}

export default ListHeading