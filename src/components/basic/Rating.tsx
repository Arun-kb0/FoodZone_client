import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { IconAntD } from '../../constants/icons'

type RatingType = {
  stars: number,
  count: number
}


const Rating = ({ stars, count }: RatingType) => {

  const starArray = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => (
      <IconAntD
        key={index}
        name="star"
        size={17}
        color={index < stars ? "gold" : "#94a3b8"}
      />
    ));
  }, [stars])


  return (
    <View className='flex-row items-center'>
      {starArray}
      <Text className='text-gray-700 mx-2'>{count} ratings</Text>
    </View>
  )
}

export default Rating