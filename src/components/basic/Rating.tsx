import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { StarIcon } from 'react-native-heroicons/solid'

type RatingType = {
  stars: 0 | 1 | 2 | 3 | 4 | 5,
  count: number
}


const Rating = ({ stars, count }: RatingType) => {
  
  const starArray = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index + 1}
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