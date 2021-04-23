import React, { useState } from 'react'

import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { format, isBefore } from 'date-fns'

import { getBottomSpace } from 'react-native-iphone-x-helper'

import { SvgFromUri } from 'react-native-svg'


import waterDropImg from '../../assets/waterdrop.png'
import Button from '../../components/Button'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

import { 
  // useRoute, // Alternative way to get routes
  RouteProp, 
  ParamListBase 
} from '@react-navigation/native'
import { color } from 'react-native-reanimated'


interface screenProps {
  route: RouteProp<ParamListBase, string>;
}

interface Params {
  plant: {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: number;
      repeat_every: string;
    }
  }
}

const index = ({ route } : screenProps) => {
  // const route = useRoute();
  const { plant } = route.params as Params;

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />
        <Text style={styles.plantName}>
          {plant.name}
        </Text>
        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image
            style={styles.tipImage}
            source={waterDropImg}
          />
          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>
        <Button
          label={"Cadastrar planta"}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
})

export default index