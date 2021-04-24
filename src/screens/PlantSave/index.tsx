import React, { useState } from 'react'

import {
  Alert,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { addDays, format, isBefore } from 'date-fns'

import { SvgFromUri } from 'react-native-svg'

import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import waterDropImg from '../../assets/waterdrop.png'
import Button from '../../components/Button'

import { 
  // useRoute, // Alternative way to get routes
  RouteProp, 
  NavigationProp,
  ParamListBase, 
} from '@react-navigation/native'

import { 
  PlantProps, 
  savePlant 
} from '../../libs/storage'

import styles from './styles'

interface screenProps {
  route: RouteProp<ParamListBase, string>;
  navigation: NavigationProp<ParamListBase>;
}

interface Params {
  plant: PlantProps
}

const index = ({ route, navigation } : screenProps) => {
  // const routes = useRoute()
  const { plant } = route.params as Params;
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const handleChangeTime = (
    _: Event, 
    dateTime: Date | undefined) => {
      if(Platform.OS === 'android'){
        setShowDatePicker(showDatePicker => !showDatePicker);
      }
      
      if(dateTime) {
        let date = dateTime

        if(isBefore(dateTime, new Date())) {
          date = addDays(date, 1)
        }

        setSelectedDateTime(date)
      }
    }

  const openDateTimePickerOnAndroid = () => {
    setShowDatePicker(!showDatePicker)
  }

  const handleSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      })

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch(e) {
      Alert.alert('Não foi possível salvar. 😥')
    }
  }

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
        {
          showDatePicker &&
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
        }
        {
          Platform.OS === 'android' &&
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={openDateTimePickerOnAndroid}>
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, 'hh:mm a')}`}
              </Text>
            </TouchableOpacity>
        }
        <Button
          label={"Cadastrar planta"}
          onPress={handleSave}
        />
      </View>
    </View>
  )
}

export default index