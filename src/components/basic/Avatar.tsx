import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { IconFontawsm5 } from '../../constants/icons'


type avatarType = {
  photo: string | null
  name: string | null
}

const Avatar = () => {
  const { name, photo } = useSelector((state: RootState) => state.authSlice)

  return (
    <View>
      {photo
        ? <Image
          // source={{ uri: "https://images.pexels.com/photos/18298275/pexels-photo-18298275/free-photo-of-black-and-white-city-fashion-people.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" }}
          source={{ uri: photo }}
          className='w-14 h-14 rounded-full '
        />
        : <IconFontawsm5 name='user' size={45} className='bg-slate-100 text-gray-700 p-2 rounded-full w-14 h-14 ' />

      }
    </View>
  )
}

export default Avatar
