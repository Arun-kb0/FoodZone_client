import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconEntypo, IconFontisto } from '../../constants/icons'
import Avatar from '../basic/Avatar'
import { useNavigation } from '@react-navigation/native'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'


const Address = () => {
  const navigation = useNavigation<DeliveryScreenNavigationProps>()

  return (
    <View className='flex-row justify-between items-center bg-yellow-200 w-full space-x-3 px-4 pb-3 h-32 '>
      <View className='w-10/12'>
        <View className='flex-row' >
          <IconFontisto name="map-marker-alt" size={22} color="red" />
          <Text className='text-lg font-semibold px-2'>Home</Text>
          <TouchableOpacity>
            <IconEntypo name='chevron-down' size={30} color={'#334155'} />
          </TouchableOpacity>
        </View>
        <Text className='text-sm '>address (h) puliyanmp o karakkattuparambil ,anga,aly</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
        <Avatar />
      </TouchableOpacity>
    </View>
  )
}

export default Address