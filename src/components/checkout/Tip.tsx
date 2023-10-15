import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import {  IconMat } from '../../constants/icons'
import React from 'react'

const Tip = () => {
  return (
    <View className='bg-white px-3 rounded-xl py-4 space-y-2'>
      <View>
        <Text className='text-lg font-semibold'>Tip your delivery partner</Text>
        <Text className='text-sm text-gray-500'>Your kindness means a lot! 100% of your tip will directly go to them</Text>
      </View>
      <ScrollView horizontal className='space-x-4'>
        <TouchableOpacity className='flex-row p-2 px-3  bg-slate-100 space-x-1 rounded-xl justify-center items-center'>
          <IconMat name="emoji-emotions" size={22} color="#86efac" />
          <Text className='font-bold'>1$</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-2 px-3  bg-slate-100 space-x-1 rounded-xl justify-center items-center'>
          <IconMat name="emoji-emotions" size={22} color="#a3e635" />
          <Text className='font-bold'>2$</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-2 px-3  bg-slate-100 space-x-1 rounded-xl justify-center items-center'>
          <IconMat name="emoji-emotions" size={22} color="#84cc16" />
          <Text className='font-bold'>5$</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row p-2 px-3  bg-slate-100 space-x-1 rounded-xl justify-center items-center'>
          <IconMat name="emoji-emotions" size={22} color="#65a30d" />
          <Text className='font-bold'>other</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default Tip