import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import { IconFontawsm, IconFontawsm5, IconFontisto, IconMat, IconMatCom } from '../../constants/icons'

const DeliveryInstructions = () => {
  return (
    <View className='bg-white shadow-lg space-x-2 space-y-3 mt-3 rounded-xl px-3 py-4 ' >
      <View>
        <Text className='text-gray-900 text-lg font-semibold '>Add delivery instructions</Text>
        <Text className='text-gray-500'>Help your delivery parnter to reach you faster</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}  className='bg-white shadow-lg '>

        <DeliveryInstruction
          icon={<IconMat name='keyboard-voice' size={22} color="#ef4444" />}
          name={'Record'}
          text={'Tap and hold'}
        />
        <DeliveryInstruction
          icon={<IconFontawsm5 name="door-closed" size={22} color="#1f2937" />}
          name={'LeaveAtDoor'}
          text={'Leave at door'}
        />
        <DeliveryInstruction
          icon={<IconFontisto name="person" size={22} color="#1f2937" />}
          name={'LeaveWithGuard'}
          text={'Leave with guard'}
        />

        <DeliveryInstruction
          icon={<IconFontawsm5 name="phone-slash" size={20} color="#1f2937" />}
          name={'AvoidCalls'}
          text={'Avoid calls'}
        />
        <DeliveryInstruction
          icon={<IconMatCom name="bell-off" size={22}  />}
          name={'DontRingBell'}
          text={"Don't ring bell"}
        />
        <DeliveryInstruction
          icon={<IconFontawsm5 name="dog" size={22} color="#1f2937" />}
          name={'PetAtHome'}
          text={'Pet at home'}
        />

      </ScrollView >
    </View>
  )
}

export default DeliveryInstructions

type deliveryInstructionType = {
  icon: ReactElement<any, any>
  name: string,
  text: string
}

const DeliveryInstruction = ({ icon, name, text }: deliveryInstructionType) => {
  
  return (
    <TouchableOpacity  className='py-2 px-4 mx-2 w-28 bg-gray-100 rounded-xl  justify-center items-center space-y-2 '>
      <View className='flex-row justify-between space-x-2'>
        {icon}
        <IconFontawsm name="check-square" size={22} color="#65a30d"/>
      </View>
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}