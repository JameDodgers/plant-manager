import React from 'react'

import {
  SafeAreaView,
  Text,
  View,
} from 'react-native'

import { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native'

import Button from '../../components/Button'

import styles from './styles'

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug',
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😁'
}

interface screenProps {
  route: RouteProp<ParamListBase, string>
  navigation: NavigationProp<ParamListBase>
}

const index = ({ 
  route, 
  navigation 
  } : screenProps) => {
  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen
  } = route.params as Params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
        <View style={styles.footer}>
          <Button 
            label={buttonTitle}
            onPress={() => {
              navigation.navigate(nextScreen)
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default index