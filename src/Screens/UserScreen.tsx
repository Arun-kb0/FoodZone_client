import {
  View, ScrollView, Text, SafeAreaView,
  TouchableOpacity
} from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import UserHeader from '../components/user/UserHeader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import Avatar from '../components/basic/Avatar'
import { IconAntD, IconFeather, IconFontawsm, IconIon, IconMat, IconMatCom } from '../constants/icons'
import UserCard from '../components/user/UserCard'
import UserBtn from '../components/user/UserBtn'
import { clearAuthData } from '../features/auth/authSlice'
import { DeliveryScreenNavigationProps } from '../navigation/TabNavigator'
import { mmkvkeys, storage } from '../constants/mmkvStorage'



const UserScreen = () => {
  const navigation = useNavigation<DeliveryScreenNavigationProps>()
  const dispatch = useDispatch()
  const { name } = useSelector((state: RootState) => state.authSlice)


  const foodOrders = {
    title: 'Food Orders',
    btns: [
      {
        name: 'Your orders',
        icon: <IconFeather name='shopping-bag' size={22} className='text-slate-400' />
      },
      {
        name: 'Favorite orders',
        icon: <IconIon name='heart-outline' size={22} className='text-slate-400' />
      },
      {
        name: 'Address book',
        icon: <IconFontawsm name='address-book-o' size={22} className='text-slate-400' />
      },
      {
        name: 'Free delivery',
        icon: <IconMat name='delivery-dining' size={22} className='text-slate-400' />
      },
    ]
  }

  const coupons = {
    title: 'Coupons',
    btns: [
      {
        name: 'Collect coupons',
        icon: < IconMatCom name='brightness-percent' size={22} className='text-slate-400' />
      }
    ]
  }

  const resturantAwards = {
    title: 'ResturantAwards',
    btns: [
      {
        name: 'Winning restaurants',
        icon: < IconMatCom name='trophy-outline' size={22} className='text-slate-400' />
      }
    ]
  }

  const more = {
    title: 'More',
    btns: [
      {
        name: 'About',
        icon: < IconAntD name='exclamationcircleo' size={22} className='text-slate-400' />,
        fn: undefined
      },
      {
        name: 'Settings',
        icon: <IconIon name='settings-outline' size={22} className='text-slate-400' />,
        fn:undefined
      },
      {
        name: 'Logout',
        icon: <IconAntD name='logout' size={22} className='text-slate-400' />,
        fn: () => {
          dispatch(clearAuthData())
          navigation.navigate('Home')
        }
      },
    ]
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <UserHeader />,
    })
  }, [])

  useEffect(() => {
    console.log('name user screen' , name)
    const token = storage.getString(mmkvkeys.accessToken)
    !token && navigation.navigate('Home')
  },[])

  return (
    <SafeAreaView className='mx-4 flex-1'>
      {/* account name */}
      <View className='flex-row items-center space-x-6 bg-white px-4 py-6 w-full rounded-xl shadow-xl mt-24' >
        <Avatar />
        <View className='flex-1'>
          <Text className='text-2xl font-semibold '>{storage.getString(mmkvkeys.name)}</Text>
          <TouchableOpacity className='flex-row items-center my-4'>
            <Text className='text-sm text-red-500 '>View activity </Text>
            <IconAntD name='caretright' size={15} className='text-red-500' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className='h-[90%] w-full mt-2' showsVerticalScrollIndicator={false}>
        <View className='flex items-center space-y-5 h-full mb-5'>

          <View className='flex-row justify-evenly items-center w-full'>
            <TouchableOpacity className='flex justify-center items-center bg-white px-2 py-4 my-2 rounded-xl h-24 w-[100px]'>
              <IconIon name='heart-outline' size={32} className='text-gray-600' />
              <Text className='text-lg text-gray-600'>Favourites</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex justify-center items-center bg-white px-2 py-4 my-2 rounded-xl h-24 w-[100px]'>
              <IconIon name='card-outline' size={32} className='text-gray-600' />
              <Text className='text-lg text-gray-600'>Payments</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex justify-center items-center bg-white px-2 py-4 h-24 w-[100px] 2my-2 rounded-xl '>
              <IconIon name='settings-outline' size={32} className='text-gray-600' />
              <Text className='text-lg text-gray-600'>Settings</Text>
            </TouchableOpacity>
          </View>


          {/* user buttons */}
          <UserBtn
            name={'Your profile'}
            icon={<IconAntD name='user' size={22} className='text-slate-400' />}
            component={<View className='bg-green-100 px-2 rounded-lg '>
              <Text className='text-lg text-green-500 '>67% completed</Text>
            </View>}
          />
          <UserBtn
            name={'Your rating'}
            icon={<IconAntD name='staro' size={22} className='text-slate-400' />}
            component={<View className='flex-row items-center  space-x-2 bg-gray-200 px-2 rounded-lg '>
              <Text className='text-lg'>3.78</Text>
              <IconAntD name='star' size={18} color='gold' />
            </View>}
          />

          {/* userCards */}
          <UserCard title={foodOrders.title} data={foodOrders.btns} />
          <UserCard title={coupons.title} data={coupons.btns} />
          <UserCard title={resturantAwards.title} data={resturantAwards.btns} />
          <UserCard title={more.title} data={more.btns} />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserScreen