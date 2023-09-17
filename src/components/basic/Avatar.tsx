import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'



const Avatar = () => {
  return (
    <View>
      <Image
        source={{ uri: "https://images.pexels.com/photos/18298275/pexels-photo-18298275/free-photo-of-black-and-white-city-fashion-people.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" }}
        className='w-14 h-14 rounded-full '
      />
    </View>
  )
}

export default Avatar
