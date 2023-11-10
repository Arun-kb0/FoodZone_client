import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconEntypo } from '../../constants/icons'


type userBtnType = {
  name: string,
  icon: React.JSX.Element,
  component: React.JSX.Element
}

const UserBtn = ({ name,icon, component }: userBtnType) => {
  
  return (
    <TouchableOpacity className='w-full my-2 px-8 py-4 flex-row items-cente justify-between bg-white  w-flex-row space-x-4 rounded-xl'>
      <View className='flex-row items-center space-x-4'>
        {icon}
        <Text className='text-lg text-gray-600 font-semibold'>{ name}</Text>
      </View>
      <View className='flex-row items-center space-x-2'>
        {component}
        <IconEntypo name='chevron-right' size={22} className='text-slate-400' />
      </View>
    </TouchableOpacity>
  )
}

export default UserBtn