import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconFontawsm, IconIon, IconMatCom } from '../../constants/icons'

const MoreSettings = () => {
  return (
    <View>

      <View className='bg-white rounded-xl p-2 space-y-2 px-3 my-4'>
        <TouchableOpacity className='flex-row  border-b border-dashed p-1 space-x-3  '>
          <IconIon name="add-circle-outline" size={22} color="#1f2937" />
          <Text>add more items</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row  border-b border-dashed p-1 space-x-3 '>
          <IconFontawsm name="pencil-square-o" size={22} color="#1f2937" />
          <Text>add more items</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row  border-b border-dashed p-1 space-x-3 '>
          <IconMatCom name="silverware-fork-knife" size={22} color="#1f2937" />
          <Text>add more items</Text>
        </TouchableOpacity>
      </View>

      <View className='bg-gray-100 mx-2 my-3'>
        <TouchableOpacity className='flex-row rounded-xl p-2 space-x-3 bg-white  '>
          <IconMatCom name="brightness-percent" size={22} color='#312e81' />
          <Text>discount</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default MoreSettings