import { TouchableOpacity } from 'react-native'
import React from 'react'
import { IconEntypo } from '../../constants/icons'
import { useNavigation } from '@react-navigation/native'
import { DeliveryScreenNavigationProps } from '../../navigation/TabNavigator'

const BackButton = () => {
  const navigation = useNavigation<DeliveryScreenNavigationProps>()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <IconEntypo name='chevron-left' size={30} color={'#334155'} />
    </TouchableOpacity>
  )
}

export default BackButton