import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import userImg from '../assets/profilepicture.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface headerProps {
  name : string
}

export default ({ name } : headerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Olá,
      </Text>
      <Text style={styles.userName}>
        {name}
      </Text>
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