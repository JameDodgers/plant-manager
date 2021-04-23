import React, { useEffect, useState } from 'react'

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import userImg from '../assets/profilepicture.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export default () => {
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    const loadStorageUserName = async () => {
      const userName = await AsyncStorage.getItem('@plantManager:user'); 
      setUserName(userName || '');
    }

    loadStorageUserName();
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Olá,
        </Text>
        <Text style={styles.userName}>
          {userName}
        </Text>
      </View>
      <Image
        style={styles.image}
        source={userImg}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  }
})