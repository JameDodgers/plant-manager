import React, { useState } from 'react'

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

import { NavigationProp, ParamListBase } from '@react-navigation/native'

import Button from '../../components/Button'

import colors from '../../styles/colors'
import styles from './styles'

interface screenProps {
  navigation: NavigationProp<ParamListBase>
}

const index = ({ navigation } : screenProps) => {
  const [isFocused, setFocused] = useState(false)
  const [isFilled, setFilled] = useState(false)
  const [name, setName] = useState<string>()
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <View style={styles.form}>
                <View style={styles.header}>
                  <Text style={styles.emoji}>
                    { isFilled ? '😄' : '😃' }
                  </Text>
                  <Text style={styles.title}>
                    Como podemos {'\n'}
                    chamar você?
                  </Text>
                </View>
                <TextInput 
                  style={[
                    styles.input, 
                    (isFocused || isFilled) && 
                    { borderColor: colors.green }
                  ]}
                  placeholder="Digite um nome"
                  onBlur={() => {
                    setFocused(false)
                    setFilled(!!name)
                  }}
                  onFocus={() => {
                    setFilled(!!name)
                    setFocused(true)
                  }}
                  onChangeText={(value) => {
                    setFilled(!!value)
                    setName(value)
                  }}
                />
                <View style={styles.footer}>
                  <Button
                    label="Confirmar"
                    onPress={() => {
                      navigation.navigate('Confirmation')
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default index