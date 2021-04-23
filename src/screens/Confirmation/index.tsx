import React from 'react'

import {
  SafeAreaView,
  Text,
  View,
} from 'react-native'

import { NavigationProp, ParamListBase } from '@react-navigation/native'

import Button from '../../components/Button'

import styles from './styles'

interface screenProps {
  navigation: NavigationProp<ParamListBase>
}

const index = ({ navigation } : screenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😄
        </Text>
        <Text style={styles.title}>
          Prontinho
        </Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas 
          plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button 
            label="Começar"
            onPress={() => {
              navigation.navigate('PlantSelect')
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default index