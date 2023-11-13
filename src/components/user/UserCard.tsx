import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { IconEntypo, IconMatCom } from '../../constants/icons'
import ItemSeparator from '../basic/ItemSeparator'


type btnType = {
  name: string
  icon: React.JSX.Element,
  fn?: () => void
}

type UserCardType = {
  title: string,
  data: btnType[],
}



const UserCard = ({ title, data, }: UserCardType) => {
  // console.log(`${title} usercard component`)

  return (
    <View className='space-x-4 space-y-3 bg-white px-4 py-6 w-full rounded-xl shadow-xl my-2'>
      <View className='flex-row items-center space-x-3 '>
        <View className='bg-red-500 w-1 h-full rounded-tr-xl rounded-br-xl  '></View>
        <Text className='text-xl text-gray-700 font-bold'>{title}</Text>
      </View>

      <FlatList
        scrollEnabled={false}
        keyExtractor={(item, index) => item.name + index.toString()}
        data={data}
        renderItem={({ item }) => (
          <ItemBtn
            fn={item.fn}
            name={item.name}
            icon={item.icon}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}


const ItemBtn = ({ name, icon, fn }: btnType) => {
  // console.log(`${name} press`)
  
  return (
    <TouchableOpacity className='flex-row items-center justify-between my-4' onPress={fn}>
      <View className='flex-row items-center space-x-4'>
        {icon}
        <Text className='text-lg text-gray-600 font-semibold'>{name}</Text>
      </View>
      <IconEntypo name='chevron-right' size={22} className='text-slate-400' />
    </TouchableOpacity>
  )
}


export default UserCard
